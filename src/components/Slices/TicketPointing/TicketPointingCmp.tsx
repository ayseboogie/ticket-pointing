"use client";

import { SliceComponentProps } from "@prismicio/react";
import type { ImageField } from "@prismicio/client";
import clsx from "clsx";
import confetti from "canvas-confetti";
import { useEffect, useMemo, useRef, useState } from "react";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";
import {
  avatarColorClass,
  colorOptions,
  normalizeColor,
  selectedColorClass,
  useTicketPointing,
} from "./useTicketPointing";
import PointingLoader from "./PointingLoader";

type TicketPointingCmpProps = Pick<SliceComponentProps<any>, "slice"> & {
  footerLogo?: ImageField;
};

const confettiColorByName: Record<string, string> = {
  blue: "#3B82F6",
  green: "#059669",
  indigo: "#6366F1",
  pink: "#EC4899",
  orange: "#F97316",
  purple: "#A855F7",
  red: "#8C1E14",
  teal: "#14B8A6",
  amber: "#F59E0B",
  cyan: "#06B6D4",
};

// UI for the Ticket Pointing room
const TicketPointingCmp = ({ slice, footerLogo }: TicketPointingCmpProps) => {
  const {
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
    cardValues,
    deck,
    deckOptions,
    setDeck,
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
  } = useTicketPointing(slice);
  const wasRevealedRef = useRef(false);
  const [copied, setCopied] = useState(false);
  const unanimousSelection = useMemo(() => {
    const joinedParticipants = participants.filter((participant) =>
      Boolean(presenceByName[participant.name]),
    );

    const joinedSelections = joinedParticipants
      .map((participant) => activeSelections[participant.name])
      .filter((selection): selection is number => selection !== null);

    if (joinedSelections.length < 2) {
      return null;
    }

    const [firstSelection, ...restSelections] = joinedSelections;
    return restSelections.every((selection) => selection === firstSelection)
      ? firstSelection
      : null;
  }, [participants, presenceByName, activeSelections, roundId]);
  const confettiColors = useMemo(
    () =>
      colorOptions.map(
        (colorName) =>
          confettiColorByName[normalizeColor(colorName)] ?? "#3B82F6",
      ),
    [],
  );

  useEffect(() => {
    const justRevealed = revealed && !wasRevealedRef.current;
    wasRevealedRef.current = revealed;

    if (!justRevealed || unanimousSelection === null) {
      return;
    }

    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.7 },
      colors: confettiColors,
    });
    window.setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.65 },
        colors: confettiColors,
      });
    }, 180);
  }, [revealed, unanimousSelection, confettiColors]);

  const handleCopyShare = () => {
    if (!shareUrl || !navigator?.clipboard) {
      return;
    }
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  };

  // Avoid SSR/CSR mismatches while the client initializes
  if (!hasMounted) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">{roomTitle}</h2>
          <PointingLoader />
        </div>
      </section>
    );
  }

  // Supabase config missing -> show helpful message
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
          <div className="flex items-center gap-4 sm:gap-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Room · {roomCode}
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
            {footerLogo ? (
              <SuspenseImage
                image={footerLogo}
                className="h-16 w-auto max-w-[200px] shrink-0 object-contain sm:h-10 sm:max-w-[200px] md:h-20 md:max-w-[240px]"
              />
            ) : null}
          </div>
          {/* Room-level controls */}
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

        {/* Team room switcher: each room is an isolated, shareable session */}
        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-700">
            Team room — share this room with your team so you all point
            together.
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="flex-1">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Room code
              </span>
              <input
                type="text"
                value={roomInput}
                onChange={(event) => setRoomInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    applyRoomCode();
                  }
                }}
                placeholder="team-alpha"
                className="mt-1 w-full rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-800 focus:border-slate-400 focus:outline-none"
              />
            </label>
            <button
              type="button"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              onClick={() => applyRoomCode()}
            >
              Switch room
            </button>
            <button
              type="button"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              onClick={handleCopyShare}
            >
              {copied ? "Link copied!" : "Copy invite link"}
            </button>
          </div>
        </div>

        {/* Join flow: type your own name + pick a color */}
        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">
          {isJoined ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className={clsx(
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white",
                    avatarColorClass(selectedColor),
                  )}
                >
                  {selectedName?.slice(0, 1).toUpperCase()}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    You&apos;re in as {selectedName}
                  </p>
                  <p className="text-xs text-slate-400">
                    Pick a card below to cast your point.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
                onClick={leaveRoom}
              >
                Leave
              </button>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium text-slate-700">
                Enter your name to join the room.
              </p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="text"
                  value={pendingName}
                  onChange={(event) => setPendingNameChoice(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      joinRoom();
                    }
                  }}
                  placeholder="Your name"
                  maxLength={40}
                  className={clsx(
                    "w-full rounded-full border px-4 py-2 text-sm text-slate-800 focus:outline-none sm:max-w-xs",
                    pendingName.trim() && isNameTaken(pendingName)
                      ? "border-red-300 focus:border-red-400"
                      : "border-slate-200 focus:border-slate-400",
                  )}
                />
                <button
                  type="button"
                  className={clsx(
                    "rounded-full border px-5 py-2 text-sm font-medium transition",
                    pendingName.trim() &&
                      !isNameTaken(pendingName) &&
                      !isColorTaken(pendingColor) &&
                      hasAvailableColor
                      ? selectedColorClass(pendingColor)
                      : "cursor-not-allowed border-slate-100 text-slate-300",
                  )}
                  disabled={
                    !pendingName.trim() ||
                    isNameTaken(pendingName) ||
                    isColorTaken(pendingColor) ||
                    !hasAvailableColor
                  }
                  onClick={joinRoom}
                >
                  Join
                </button>
              </div>
              <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
                Pick your color
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
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
                      onClick={() => setPendingColorChoice(color)}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>
              {joinError ? (
                <p className="mt-3 text-sm text-red-600">{joinError}</p>
              ) : null}
              {!hasAvailableColor ? (
                <p className="mt-3 text-sm text-red-600">
                  All colors are currently taken. Please wait for one to free
                  up.
                </p>
              ) : null}
            </div>
          )}
        </div>

        {/* Card selection (local + presence-driven) */}
        <div className="mt-6">
          {/* Deck picker — remembered per browser */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Deck
            </span>
            {deckOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={clsx(
                  "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition",
                  deck === option.id
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 text-slate-600 hover:border-slate-300",
                )}
                onClick={() => setDeck(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
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

        {/* Room status: who joined + selection state */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Participants ({participants.length})
          </h3>
          {participants.length === 0 ? (
            <p className="mt-4 text-sm text-slate-400">
              No one has joined yet. Be the first to enter your name above.
            </p>
          ) : (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {participants.map((participant) => {
                const selection = activeSelections[participant.name];
                const presence = presenceByName[participant.name];
                const participantJoined = Boolean(presence);
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
                          {participantJoined ? "Joined" : "Not joined"}
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
          )}
        </div>
      </div>
    </section>
  );
};

export default TicketPointingCmp;
