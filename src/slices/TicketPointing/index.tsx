"use client";

import { SliceComponentProps } from "@prismicio/react";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/utils/supabaseClient";

type Participant = {
  name: string;
};

type PresencePayload = {
  clientId: string;
  name?: string;
  color?: string;
  selectedValue: number | null;
  roundId: string;
};

const cardValues = Array.from({ length: 16 }, (_, index) => (index + 1) / 2);
const colorOptions = ["Blue", "Green", "Orange", "Purple", "Red", "Teal"];

const normalizeColor = (color?: string) =>
  color?.trim().toLowerCase() || "blue";

const avatarColorClass = (color?: string) => {
  switch (normalizeColor(color)) {
    case "green":
      return "bg-emerald-500";
    case "orange":
      return "bg-orange-500";
    case "purple":
      return "bg-purple-500";
    case "red":
      return "bg-red";
    case "teal":
      return "bg-teal-500";
    default:
      return "bg-blue-500";
  }
};

const selectedColorClass = (color?: string) => {
  switch (normalizeColor(color)) {
    case "green":
      return "border-emerald-600 bg-emerald-600 text-white";
    case "orange":
      return "border-orange-500 bg-orange-500 text-white";
    case "purple":
      return "border-purple-500 bg-purple-500 text-white";
    case "red":
      return "border-red bg-red text-white";
    case "teal":
      return "border-teal-500 bg-teal-500 text-white";
    default:
      return "border-blue-500 bg-blue-500 text-white";
  }
};

const createRoundId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return String(Date.now());
};

/**
 * Component for "TicketPointing" Slices.
 */
const TicketPointing = ({ slice }: SliceComponentProps<any>) => {
  const [supabase, setSupabase] = useState(() => getSupabaseClient());
  const [hasMounted, setHasMounted] = useState(false);
  const channelRef = useRef<RealtimeChannel | null>(null);

  const roomId =
    typeof slice.primary?.room_id === "string" && slice.primary.room_id.trim()
      ? slice.primary.room_id.trim()
      : "default-room";
  const roomTitle =
    typeof slice.primary?.room_title === "string" && slice.primary.room_title
      ? slice.primary.room_title
      : "Ticket Pointing";
  const allowReveal = Boolean(slice.primary?.allow_reveal);

  const participants: Participant[] = useMemo(() => {
    const rawParticipants = slice.primary?.participants ?? [];

    return rawParticipants
      .map((participant: { name?: string }) => ({
        name: participant.name?.trim() ?? "",
      }))
      .filter((participant: Participant) => participant.name.length > 0);
  }, [slice.primary]);

  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("Blue");
  const [pendingName, setPendingName] = useState<string | null>(null);
  const [pendingColor, setPendingColor] = useState("Blue");
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [colorError, setColorError] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [roundId, setRoundId] = useState(createRoundId);
  const clientId = useMemo(() => createRoundId(), []);
  const [presenceByClientId, setPresenceByClientId] = useState<
    Record<string, PresencePayload>
  >({});
  const [connectionState, setConnectionState] = useState<
    "idle" | "connecting" | "connected" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const revealedRef = useRef(revealed);
  const roundIdRef = useRef(roundId);

  useEffect(() => {
    revealedRef.current = revealed;
  }, [revealed]);

  useEffect(() => {
    roundIdRef.current = roundId;
  }, [roundId]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      setSupabase(getSupabaseClient());
    }
  }, [hasMounted]);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    const channel = supabase.channel(`room:${roomId}`, {
      config: { presence: { key: clientId } },
    });

    channelRef.current = channel;
    setConnectionState("connecting");

    channel.on("presence", { event: "sync" }, () => {
      const state = channel.presenceState<PresencePayload>();
      const nextPresence: Record<string, PresencePayload> = {};

      Object.values(state).forEach((presenceList) => {
        presenceList.forEach((presence) => {
          if (presence?.clientId) {
            nextPresence[presence.clientId] = presence;
          }
        });
      });

      setPresenceByClientId(nextPresence);
    });

    channel.on("broadcast", { event: "state-request" }, () => {
      channel.send({
        type: "broadcast",
        event: "state-sync",
        payload: { revealed: revealedRef.current, roundId: roundIdRef.current },
      });
    });

    channel.on("broadcast", { event: "state-sync" }, ({ payload }) => {
      if (!payload) {
        return;
      }

      if (typeof payload.revealed === "boolean") {
        setRevealed(payload.revealed);
      }

      if (typeof payload.roundId === "string") {
        const isNewRound = payload.roundId !== roundIdRef.current;
        setRoundId(payload.roundId);
        if (isNewRound) {
          setSelectedValue(null);
        }
      }
    });

    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        setConnectionState("connected");
        channel.track({
          clientId,
          name: selectedName ?? undefined,
          color: selectedName ? selectedColor : undefined,
          selectedValue,
          roundId,
        });
        channel.send({
          type: "broadcast",
          event: "state-request",
          payload: {},
        });
      }

      if (status === "CHANNEL_ERROR") {
        setConnectionState("error");
        setError("Unable to connect to the room channel.");
      }
    });

    return () => {
      channel.unsubscribe();
      supabase.removeChannel(channel);
      channelRef.current = null;
      setConnectionState("idle");
    };
  }, [supabase, roomId, clientId, selectedName, selectedColor]);

  useEffect(() => {
    if (!channelRef.current) {
      return;
    }

    channelRef.current.track({
      clientId,
      name: selectedName ?? undefined,
      color: selectedName ? selectedColor : undefined,
      selectedValue,
      roundId,
    });
  }, [clientId, selectedName, selectedColor, selectedValue, roundId]);

  const takenNames = useMemo(() => {
    const next = new Set<string>();
    Object.values(presenceByClientId).forEach((presence) => {
      if (presence.name && presence.clientId !== clientId) {
        next.add(presence.name);
      }
    });
    return next;
  }, [presenceByClientId, clientId]);

  const presenceByName = useMemo(() => {
    const next: Record<string, PresencePayload> = {};
    Object.values(presenceByClientId).forEach((presence) => {
      if (!presence.name) {
        return;
      }

      if (!next[presence.name] || presence.clientId === clientId) {
        next[presence.name] = presence;
      }
    });
    return next;
  }, [presenceByClientId, clientId]);

  const usedColors = useMemo(() => {
    const next = new Set<string>();
    Object.values(presenceByClientId).forEach((presence) => {
      if (presence.clientId === clientId || !presence.color) {
        return;
      }
      next.add(normalizeColor(presence.color));
    });
    return next;
  }, [presenceByClientId, clientId]);

  const isColorTaken = (color: string) => usedColors.has(normalizeColor(color));

  const getAvailableColor = () =>
    colorOptions.find((color) => !isColorTaken(color)) ?? "Blue";

  const activeSelections = useMemo(() => {
    const selectionMap: Record<string, number | null> = {};

    participants.forEach((participant) => {
      const presence = presenceByName[participant.name];

      if (presence && presence.roundId === roundId) {
        selectionMap[participant.name] = presence.selectedValue ?? null;
      } else {
        selectionMap[participant.name] = null;
      }
    });

    return selectionMap;
  }, [participants, presenceByName, roundId]);

  const handleSelectValue = (value: number) => {
    setSelectedValue(value);
  };

  const handleReveal = () => {
    if (!channelRef.current) {
      return;
    }

    channelRef.current.send({
      type: "broadcast",
      event: "state-sync",
      payload: { revealed: true, roundId },
    });
    setRevealed(true);
  };

  const handleReset = () => {
    if (!channelRef.current) {
      return;
    }

    const nextRoundId = createRoundId();
    setSelectedValue(null);
    setRevealed(false);
    setRoundId(nextRoundId);
    channelRef.current.send({
      type: "broadcast",
      event: "state-sync",
      payload: { revealed: false, roundId: nextRoundId },
    });
  };

  if (!hasMounted) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">{roomTitle}</h2>
          <p className="mt-3 text-sm text-slate-600">Loading room...</p>
        </div>
      </section>
    );
  }

  if (!supabase) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">{roomTitle}</h2>
          <p className="mt-3 text-sm text-slate-600">
            Supabase is not configured. Add `NEXT_PUBLIC_SUPABASE_URL` and
            `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` to enable real-time
            pointing.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Room ID: {roomId}
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">
              {roomTitle}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {revealed ? "Revealed" : "Hidden"} · {connectionState}
            </p>
            {error ? (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className={clsx(
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                allowReveal
                  ? "border-slate-200 text-slate-700 hover:border-slate-300"
                  : "cursor-not-allowed border-slate-100 text-slate-300",
              )}
              disabled={!allowReveal}
              onClick={handleReveal}
            >
              Reveal
            </button>
            <button
              type="button"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-700">
            Select your name to join the room.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {participants.map((participant) => {
              const isTaken = takenNames.has(participant.name);
              const isSelected = participant.name === selectedName;

              return (
                <button
                  key={participant.name}
                  type="button"
                  className={clsx(
                    "rounded-full border px-3 py-1 text-sm font-medium transition",
                    isSelected
                      ? selectedColorClass(selectedColor)
                      : "border-slate-200 text-slate-700 hover:border-slate-300",
                    isTaken ? "cursor-not-allowed opacity-50" : "",
                  )}
                  disabled={isTaken}
                  onClick={() => {
                    const nextColor = isColorTaken(selectedColor)
                      ? getAvailableColor()
                      : selectedColor;
                    setPendingName(participant.name);
                    setPendingColor(nextColor);
                    setColorError(null);
                    setIsColorModalOpen(true);
                  }}
                >
                  {participant.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Cards
          </h3>
          <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-8">
            {cardValues.map((value) => (
              <button
                key={value}
                type="button"
                disabled={!selectedName}
                className={clsx(
                  "rounded-2xl border px-3 py-6 text-lg font-semibold transition",
                  selectedValue === value
                    ? selectedColorClass(selectedColor)
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
                  !selectedName ? "cursor-not-allowed opacity-50" : "",
                )}
                onClick={() => handleSelectValue(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Participants
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {participants.map((participant) => {
              const selection = activeSelections[participant.name];
              const presence = presenceByName[participant.name];
              const isJoined = Boolean(presence);
              const showValue = revealed && selection !== null;
              const displayColor = presence?.color;

              return (
                <div
                  key={participant.name}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={clsx(
                        "h-10 w-10 rounded-full text-sm font-semibold",
                        displayColor
                          ? clsx("text-white", avatarColorClass(displayColor))
                          : "bg-slate-100 text-slate-400",
                      )}
                    >
                      <span className="flex h-full w-full items-center justify-center">
                        {participant.name.slice(0, 1).toUpperCase()}
                      </span>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {participant.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {isJoined ? "Joined" : "Not joined"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={clsx(
                      "min-w-[64px] rounded-full px-3 py-1 text-center text-sm font-semibold",
                      showValue
                        ? "bg-slate-900 text-white"
                        : selection !== null
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-400",
                    )}
                  >
                    {showValue
                      ? selection
                      : selection !== null
                        ? "Selected"
                        : "—"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {isColorModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900">
              Choose your color
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Pick a color for {pendingName ?? "your name"}.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {colorOptions.map((color) => {
                const taken = isColorTaken(color);
                const isSelected = pendingColor === color;

                return (
                  <button
                    key={color}
                    type="button"
                    className={clsx(
                      "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition",
                      isSelected
                        ? selectedColorClass(color)
                        : "border-slate-200 text-slate-600 hover:border-slate-300",
                      taken ? "cursor-not-allowed opacity-40" : "",
                    )}
                    disabled={taken}
                    onClick={() => {
                      setPendingColor(color);
                      setColorError(null);
                    }}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
            {colorError ? (
              <p className="mt-3 text-sm text-red-600">{colorError}</p>
            ) : null}
            {!colorOptions.some((color) => !isColorTaken(color)) ? (
              <p className="mt-3 text-sm text-red-600">
                All colors are currently taken. Please wait for one to free up.
              </p>
            ) : null}
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
                onClick={() => {
                  setIsColorModalOpen(false);
                  setPendingName(null);
                  setColorError(null);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className={clsx(
                  "rounded-full border px-4 py-2 text-sm font-medium transition",
                  pendingName &&
                    !isColorTaken(pendingColor) &&
                    colorOptions.some((color) => !isColorTaken(color))
                    ? selectedColorClass(pendingColor)
                    : "cursor-not-allowed border-slate-100 text-slate-300",
                )}
                disabled={
                  !pendingName ||
                  isColorTaken(pendingColor) ||
                  !colorOptions.some((color) => !isColorTaken(color))
                }
                onClick={() => {
                  if (!pendingName) {
                    return;
                  }
                  if (isColorTaken(pendingColor)) {
                    setColorError(
                      "That color is already taken. Choose another.",
                    );
                    return;
                  }
                  setSelectedColor(pendingColor);
                  setSelectedName(pendingName);
                  setRoundId(createRoundId());
                  setSelectedValue(null);
                  setIsColorModalOpen(false);
                  setColorError(null);
                }}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default TicketPointing;
