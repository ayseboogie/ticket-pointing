"use client";

import { SliceComponentProps } from "@prismicio/react";
import type { ImageField } from "@prismicio/client";
import clsx from "clsx";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";
import {
  avatarColorClass,
  cardValues,
  colorOptions,
  selectedColorClass,
  useTicketPointing,
} from "./useTicketPointing";
import PointingLoader from "./PointingLoader";

type TicketPointingCmpProps = Pick<SliceComponentProps<any>, "slice"> & {
  footerLogo?: ImageField;
};

const TicketPointingCmp = ({ slice, footerLogo }: TicketPointingCmpProps) => {
  const {
    hasMounted,
    supabase,
    roomId,
    roomTitle,
    allowReveal,
    participants,
    selectedName,
    selectedColor,
    pendingName,
    pendingColor,
    isColorModalOpen,
    colorError,
    selectedValue,
    revealed,
    connectionState,
    error,
    takenNames,
    presenceByName,
    activeSelections,
    hasAvailableColor,
    isColorTaken,
    openColorModal,
    closeColorModal,
    setPendingColorChoice,
    joinRoom,
    handleSelectValue,
    handleReveal,
    handleReset,
  } = useTicketPointing(slice);

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
            {footerLogo ? (
              <SuspenseImage
                image={footerLogo}
                className="h-16 w-auto max-w-[200px] shrink-0 object-contain sm:h-10 sm:max-w-[200px] md:h-20 md:max-w-[240px]"
              />
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
                  onClick={() => openColorModal(participant.name)}
                >
                  {participant.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
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
                    onClick={() => setPendingColorChoice(color)}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
            {colorError ? (
              <p className="mt-3 text-sm text-red-600">{colorError}</p>
            ) : null}
            {!hasAvailableColor ? (
              <p className="mt-3 text-sm text-red-600">
                All colors are currently taken. Please wait for one to free up.
              </p>
            ) : null}
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
                onClick={closeColorModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className={clsx(
                  "rounded-full border px-4 py-2 text-sm font-medium transition",
                  pendingName &&
                    !isColorTaken(pendingColor) &&
                    hasAvailableColor
                    ? selectedColorClass(pendingColor)
                    : "cursor-not-allowed border-slate-100 text-slate-300",
                )}
                disabled={
                  !pendingName ||
                  isColorTaken(pendingColor) ||
                  !hasAvailableColor
                }
                onClick={joinRoom}
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

export default TicketPointingCmp;
