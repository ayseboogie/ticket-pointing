import { SliceComponentProps } from "@prismicio/react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useMemo, useRef, useState } from "react";
import { getSupabaseClient } from "@/utils/supabaseClient";

type TicketPointingSlice = SliceComponentProps<any>["slice"];

export type Participant = {
  name: string;
  color?: string;
};

export type PresencePayload = {
  clientId: string;
  name?: string;
  color?: string;
  selectedValue: number | null;
  roundId: string;
};

// Card values shown in the UI
export const cardValues = Array.from({ length: 8 }, (_, index) => index + 1);
// Allowed avatar colors
export const colorOptions = [
  "Blue",
  "Green",
  "Indigo",
  "Pink",
  "Orange",
  "Purple",
  "Red",
  "Teal",
  "Amber",
  "Cyan",
];

// Normalize color inputs for comparisons
export const normalizeColor = (color?: string) =>
  color?.trim().toLowerCase() || "blue";

// Normalize names for case-insensitive comparisons
export const normalizeName = (name?: string) =>
  name?.trim().toLowerCase() ?? "";

// Tailwind class for participant avatar background
export const avatarColorClass = (color?: string) => {
  switch (normalizeColor(color)) {
    case "amber":
      return "bg-amber-500";
    case "cyan":
      return "bg-cyan-500";
    case "green":
      return "bg-emerald-500";
    case "indigo":
      return "bg-indigo-500";
    case "orange":
      return "bg-orange-500";
    case "pink":
      return "bg-pink-500";
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

// Tailwind class for selected buttons/badges
export const selectedColorClass = (color?: string) => {
  switch (normalizeColor(color)) {
    case "amber":
      return "border-amber-500 bg-amber-500 text-white";
    case "cyan":
      return "border-cyan-500 bg-cyan-500 text-white";
    case "green":
      return "border-emerald-600 bg-emerald-600 text-white";
    case "indigo":
      return "border-indigo-500 bg-indigo-500 text-white";
    case "orange":
      return "border-orange-500 bg-orange-500 text-white";
    case "pink":
      return "border-pink-500 bg-pink-500 text-white";
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

// Unique IDs for rounds and clients
const createRoundId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return String(Date.now());
};

// Sanitize a room code so it works safely inside a channel name / URL
export const normalizeRoomCode = (code?: string) =>
  (code ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

type ConnectionState = "idle" | "connecting" | "connected" | "error";

type TicketPointingHookResult = {
  hasMounted: boolean;
  supabase: ReturnType<typeof getSupabaseClient>;
  roomCode: string;
  roomInput: string;
  roomTitle: string;
  shareUrl: string;
  allowReveal: boolean;
  participants: Participant[];
  isJoined: boolean;
  selectedName: string | null;
  selectedColor: string;
  pendingName: string;
  pendingColor: string;
  joinError: string | null;
  selectedValue: number | null;
  revealed: boolean;
  roundId: string;
  connectionState: ConnectionState;
  error: string | null;
  presenceByName: Record<string, PresencePayload>;
  activeSelections: Record<string, number | null>;
  hasAvailableColor: boolean;
  isColorTaken: (color: string) => boolean;
  isNameTaken: (name: string) => boolean;
  setRoomInput: (value: string) => void;
  applyRoomCode: (code?: string) => void;
  setPendingNameChoice: (name: string) => void;
  setPendingColorChoice: (color: string) => void;
  joinRoom: () => void;
  leaveRoom: () => void;
  handleSelectValue: (value: number) => void;
  handleReveal: () => void;
  handleReset: () => void;
};

export const useTicketPointing = (
  slice: TicketPointingSlice,
): TicketPointingHookResult => {
  // Supabase client (browser-only) - from utils/supabaseClient.ts
  const [supabase, setSupabase] = useState(() => getSupabaseClient());
  const [hasMounted, setHasMounted] = useState(false);
  // Realtime channel handle (presence + broadcast)
  const channelRef = useRef<RealtimeChannel | null>(null);

  // Room metadata from Prismic slice (used as defaults only)
  const defaultRoomCode =
    normalizeRoomCode(
      typeof slice.primary?.room_id === "string" ? slice.primary.room_id : "",
    ) || "default-room";
  const roomTitle =
    typeof slice.primary?.room_title === "string" && slice.primary.room_title
      ? slice.primary.room_title
      : "Ticket Pointing";
  const allowReveal =
    slice.primary?.allow_reveal === undefined
      ? true
      : Boolean(slice.primary?.allow_reveal);

  // Active room code (drives the realtime channel) + the editable input field
  const [roomCode, setRoomCode] = useState<string>(defaultRoomCode);
  const [roomInput, setRoomInput] = useState<string>(defaultRoomCode);
  const [shareUrl, setShareUrl] = useState<string>("");

  // Local UI state for current user
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("Blue");
  const [pendingName, setPendingName] = useState<string>("");
  const [pendingColor, setPendingColor] = useState("Blue");
  const [joinError, setJoinError] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [roundId, setRoundId] = useState(createRoundId);
  // Stable client ID for presence tracking
  const clientId = useMemo(() => createRoundId(), []);
  // Raw presence state keyed by clientId
  const [presenceByClientId, setPresenceByClientId] = useState<
    Record<string, PresencePayload>
  >({});
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("idle");
  const [error, setError] = useState<string | null>(null);

  // Refs used inside realtime callbacks so the channel subscribes once per
  // room and never has to reconnect just because local state changed.
  const revealedRef = useRef(revealed);
  const roundIdRef = useRef(roundId);
  const selectedNameRef = useRef(selectedName);
  const selectedColorRef = useRef(selectedColor);
  const selectedValueRef = useRef(selectedValue);

  useEffect(() => {
    revealedRef.current = revealed;
  }, [revealed]);

  useEffect(() => {
    roundIdRef.current = roundId;
  }, [roundId]);

  useEffect(() => {
    selectedNameRef.current = selectedName;
  }, [selectedName]);

  useEffect(() => {
    selectedColorRef.current = selectedColor;
  }, [selectedColor]);

  useEffect(() => {
    selectedValueRef.current = selectedValue;
  }, [selectedValue]);

  // On mount: read the room from the URL (?room=) so links are shareable
  useEffect(() => {
    setHasMounted(true);

    const params = new URLSearchParams(window.location.search);
    const urlRoom = normalizeRoomCode(params.get("room") ?? "");
    if (urlRoom) {
      setRoomCode(urlRoom);
      setRoomInput(urlRoom);
    }
  }, []);

  useEffect(() => {
    if (hasMounted) {
      setSupabase(getSupabaseClient());
    }
  }, [hasMounted]);

  // Keep the shareable URL in sync with the active room
  useEffect(() => {
    if (!hasMounted) {
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.set("room", roomCode);
    setShareUrl(url.toString());
    window.history.replaceState(null, "", url.toString());
  }, [hasMounted, roomCode]);

  // Join Supabase realtime room: presence + broadcast
  useEffect(() => {
    if (!supabase) {
      return;
    }

    const channel = supabase.channel(`room:${roomCode}`, {
      config: { presence: { key: clientId } },
    });

    channelRef.current = channel;
    setConnectionState("connecting");

    // Presence sync: rebuild clientId -> presence map
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

    // New joiners request the latest round/reveal state; reply addressed to
    // the requester only, so established clients never adopt each other's
    // state from these replies.
    channel.on("broadcast", { event: "state-request" }, ({ payload }) => {
      channel.send({
        type: "broadcast",
        event: "state-sync",
        payload: {
          revealed: revealedRef.current,
          roundId: roundIdRef.current,
          target: payload?.requesterId ?? null,
        },
      });
    });

    // Apply room state updates from other clients
    channel.on("broadcast", { event: "state-sync" }, ({ payload }) => {
      if (!payload) {
        return;
      }

      // Targeted replies (join handshake) are only for the requester;
      // untargeted syncs (reveal/reset) apply to everyone.
      if (payload.target && payload.target !== clientId) {
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

    // Subscribe and publish initial presence
    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        setConnectionState("connected");
        channel.track({
          clientId,
          name: selectedNameRef.current ?? undefined,
          color: selectedNameRef.current ? selectedColorRef.current : undefined,
          selectedValue: selectedValueRef.current,
          roundId: roundIdRef.current,
        });
        channel.send({
          type: "broadcast",
          event: "state-request",
          payload: { requesterId: clientId },
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
    // Subscribe once per room; presence updates flow through the track effect
    // below, so local state changes never force a channel reconnect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, roomCode, clientId]);

  // Keep presence updated as local state changes
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

  // Names already claimed by other clients (case-insensitive)
  const takenNames = useMemo(() => {
    const next = new Set<string>();
    Object.values(presenceByClientId).forEach((presence) => {
      if (presence.name && presence.clientId !== clientId) {
        next.add(normalizeName(presence.name));
      }
    });
    return next;
  }, [presenceByClientId, clientId]);

  const isNameTaken = (name: string) => takenNames.has(normalizeName(name));

  // Convenience map: name -> presence (participants are whoever is present)
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

  // Dynamic participant list, derived from live presence, stable ordering
  const participants: Participant[] = useMemo(
    () =>
      Object.values(presenceByName)
        .map((presence) => ({
          name: presence.name as string,
          color: presence.color,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [presenceByName],
  );

  // Colors already used by other clients
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

  const hasAvailableColor = colorOptions.some((color) => !isColorTaken(color));

  // Default the pending color to something available while joining
  useEffect(() => {
    if (selectedName) {
      return;
    }
    if (isColorTaken(pendingColor) && hasAvailableColor) {
      setPendingColor(getAvailableColor());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usedColors, selectedName]);

  // Selection visibility scoped to current round
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

  const isJoined = Boolean(selectedName);

  // Local selection; presence is updated via effect
  const handleSelectValue = (value: number) => {
    setSelectedValue(value);
  };

  // Reveal values for everyone in the room
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

  // Start a new round (new roundId)
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

  const setPendingNameChoice = (name: string) => {
    setPendingName(name);
    setJoinError(null);
  };

  const setPendingColorChoice = (color: string) => {
    setPendingColor(color);
    setJoinError(null);
  };

  // Confirm join with a typed name + chosen color
  const joinRoom = () => {
    const name = pendingName.trim();

    if (!name) {
      setJoinError("Enter your name to join.");
      return;
    }
    if (isNameTaken(name)) {
      setJoinError("That name is already taken in this room.");
      return;
    }
    if (!hasAvailableColor) {
      setJoinError("All colors are currently taken. Please wait for one.");
      return;
    }
    if (isColorTaken(pendingColor)) {
      setJoinError("That color is already taken. Choose another.");
      return;
    }

    // Keep the room's current roundId (adopted via the join handshake) so
    // this client's votes are visible to everyone else. Minting a new local
    // roundId here would desync selections across clients.
    setSelectedColor(pendingColor);
    setSelectedName(name);
    setSelectedValue(null);
    setJoinError(null);
  };

  // Leave the room (frees the name/color for others)
  const leaveRoom = () => {
    setSelectedName(null);
    setSelectedValue(null);
    setJoinError(null);
  };

  // Switch to a different team room (own realtime channel + URL)
  const applyRoomCode = (code?: string) => {
    const nextCode = normalizeRoomCode(code ?? roomInput);
    if (!nextCode || nextCode === roomCode) {
      setRoomInput(nextCode || roomCode);
      return;
    }

    // Reset all room-scoped state before reconnecting to the new channel
    setSelectedName(null);
    setSelectedValue(null);
    setRevealed(false);
    setPresenceByClientId({});
    setRoundId(createRoundId());
    setJoinError(null);
    setRoomInput(nextCode);
    setRoomCode(nextCode);
  };

  return {
    hasMounted,
    supabase,
    roomCode,
    roomInput,
    roomTitle,
    shareUrl,
    allowReveal,
    participants,
    isJoined,
    selectedName,
    selectedColor,
    pendingName,
    pendingColor,
    joinError,
    selectedValue,
    revealed,
    roundId,
    connectionState,
    error,
    presenceByName,
    activeSelections,
    hasAvailableColor,
    isColorTaken,
    isNameTaken,
    setRoomInput,
    applyRoomCode,
    setPendingNameChoice,
    setPendingColorChoice,
    joinRoom,
    leaveRoom,
    handleSelectValue,
    handleReveal,
    handleReset,
  };
};
