"use client";

import clsx from "clsx";
import {
  avatarColorClass,
  selectedColorClass,
  type Participant,
  type PresencePayload,
} from "./useTicketPointing";
import {
  hasRpsLocked,
  isRpsMove,
  isRpsPlayer,
  rpsMoveMeta,
  rpsMoves,
  rpsSeatForName,
  type RpsGame,
  type RpsMove,
  type RpsResult,
} from "./rps";

type RockPaperScissorsProps = {
  isJoined: boolean;
  selectedName: string | null;
  selectedColor: string;
  participants: Participant[];
  presenceByName: Record<string, PresencePayload>;
  rpsGame: RpsGame | null;
  rpsResult: RpsResult;
  startRps: (opponentName: string) => void;
  chooseRpsMove: (move: RpsMove) => void;
  dismissRps: () => void;
  rematchRps: () => void;
};

const playerColor = (
  name: string,
  presenceByName: Record<string, PresencePayload>,
) => presenceByName[name]?.color;

const PlayerChip = ({ name, color }: { name: string; color?: string }) => (
  <span className="inline-flex items-center gap-2">
    <span
      className={clsx(
        "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-white",
        avatarColorClass(color),
      )}
    >
      {name.slice(0, 1).toUpperCase()}
    </span>
    <span className="font-semibold text-slate-800">{name}</span>
  </span>
);

const RevealedMove = ({
  name,
  color,
  move,
}: {
  name: string;
  color?: string;
  move?: RpsMove;
}) => (
  <div className="flex flex-1 flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-5">
    <PlayerChip name={name} color={color} />
    {move ? (
      <>
        <span className="text-4xl" aria-hidden>
          {rpsMoveMeta[move].emoji}
        </span>
        <span className="text-sm font-semibold text-slate-700">
          {rpsMoveMeta[move].label}
        </span>
      </>
    ) : (
      <span className="text-sm text-slate-400">—</span>
    )}
  </div>
);

const RockPaperScissors = ({
  isJoined,
  selectedName,
  selectedColor,
  participants,
  presenceByName,
  rpsGame,
  rpsResult,
  startRps,
  chooseRpsMove,
  dismissRps,
  rematchRps,
}: RockPaperScissorsProps) => {
  const opponents = participants.filter(
    (participant) =>
      participant.name.trim().toLowerCase() !==
      (selectedName ?? "").trim().toLowerCase(),
  );
  const iAmPlayer = rpsGame ? isRpsPlayer(rpsGame, selectedName) : false;
  const mySeat = rpsGame ? rpsSeatForName(rpsGame, selectedName) : null;
  const myMove =
    mySeat && isRpsMove(rpsGame?.moves[mySeat])
      ? rpsGame?.moves[mySeat]
      : undefined;
  const iHaveLocked =
    rpsGame && selectedName ? hasRpsLocked(rpsGame, selectedName) : false;
  const waitingOn = rpsGame
    ? [rpsGame.challenger, rpsGame.opponent].filter(
        (name) => !hasRpsLocked(rpsGame, name),
      )
    : [];

  return (
    <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        Rock Paper Scissors
      </p>
      <div className="mt-3 border-t border-slate-200" />

      {rpsGame ? (
        <div className="mt-4">
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <PlayerChip
              name={rpsGame.challenger}
              color={playerColor(rpsGame.challenger, presenceByName)}
            />
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              vs
            </span>
            <PlayerChip
              name={rpsGame.opponent}
              color={playerColor(rpsGame.opponent, presenceByName)}
            />
          </div>

          {rpsResult.complete ? (
            <div className="mt-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <RevealedMove
                  name={rpsGame.challenger}
                  color={playerColor(rpsGame.challenger, presenceByName)}
                  move={
                    isRpsMove(rpsGame.moves[rpsGame.challenger])
                      ? rpsGame.moves[rpsGame.challenger]
                      : undefined
                  }
                />
                <RevealedMove
                  name={rpsGame.opponent}
                  color={playerColor(rpsGame.opponent, presenceByName)}
                  move={
                    isRpsMove(rpsGame.moves[rpsGame.opponent])
                      ? rpsGame.moves[rpsGame.opponent]
                      : undefined
                  }
                />
              </div>
              <p className="mt-4 text-center text-base font-semibold text-slate-900">
                {rpsResult.tie
                  ? "Tie! Pick again to settle it."
                  : `${rpsResult.winner} takes the ticket!`}
              </p>
            </div>
          ) : iAmPlayer ? (
            <div className="mt-4">
              <div className="grid grid-cols-3 gap-3">
                {rpsMoves.map((move) => {
                  const meta = rpsMoveMeta[move];
                  const isSelected = myMove === move;

                  return (
                    <button
                      key={move}
                      type="button"
                      disabled={iHaveLocked}
                      aria-label={meta.label}
                      className={clsx(
                        "flex flex-col items-center gap-1 rounded-2xl border px-3 py-5 text-sm font-semibold transition",
                        isSelected
                          ? selectedColorClass(selectedColor)
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
                        iHaveLocked && !isSelected
                          ? "cursor-not-allowed opacity-50"
                          : "",
                      )}
                      onClick={() => chooseRpsMove(move)}
                    >
                      <span className="text-3xl" aria-hidden>
                        {meta.emoji}
                      </span>
                      {meta.label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-center text-sm text-slate-500">
                {iHaveLocked
                  ? `Locked in. Waiting for ${waitingOn[0] ?? "your opponent"}…`
                  : "Pick your throw. It stays hidden until both of you lock in."}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-center text-sm text-slate-500">
              {waitingOn.length === 2
                ? "Waiting for both players to throw…"
                : waitingOn.length === 1
                  ? `Waiting for ${waitingOn[0]} to throw…`
                  : "Match in progress."}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {rpsResult.complete ? (
              <button
                type="button"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
                onClick={rematchRps}
              >
                Play again
              </button>
            ) : null}
            <button
              type="button"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              onClick={dismissRps}
            >
              Dismiss
            </button>
          </div>
        </div>
      ) : !isJoined ? (
        <p className="mt-3 text-sm text-slate-400">
          Join the room to challenge a teammate.
        </p>
      ) : opponents.length === 0 ? (
        <p className="mt-3 text-sm text-slate-400">
          Waiting for a teammate — you need two people to play.
        </p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          {opponents.map((opponent) => (
            <button
              key={opponent.name}
              type="button"
              className={clsx(
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                selectedColorClass(opponent.color),
              )}
              onClick={() => startRps(opponent.name)}
            >
              Challenge {opponent.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RockPaperScissors;
