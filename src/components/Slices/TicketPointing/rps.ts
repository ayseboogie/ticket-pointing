export type RpsMove = "rock" | "paper" | "scissors";

export type RpsGame = {
  id: string;
  challenger: string;
  opponent: string;
  // Names that have locked in a throw. Moves stay hidden in the UI until both
  // players have one, and incomplete games omit moves from join-handshake sync.
  locked: string[];
  moves: Partial<Record<string, RpsMove>>;
};

export type RpsResult = {
  complete: boolean;
  winner: string | null;
  tie: boolean;
};

export const rpsMoves: RpsMove[] = ["rock", "paper", "scissors"];

export const rpsMoveMeta: Record<RpsMove, { label: string; emoji: string }> = {
  rock: { label: "Rock", emoji: "✊" },
  paper: { label: "Paper", emoji: "✋" },
  scissors: { label: "Scissors", emoji: "✌️" },
};

const rpsBeats: Record<RpsMove, RpsMove> = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

export const isRpsMove = (value: unknown): value is RpsMove =>
  value === "rock" || value === "paper" || value === "scissors";

export const isRpsGame = (value: unknown): value is RpsGame => {
  if (!value || typeof value !== "object") {
    return false;
  }
  const game = value as Record<string, unknown>;
  return (
    typeof game.id === "string" &&
    typeof game.challenger === "string" &&
    typeof game.opponent === "string" &&
    Array.isArray(game.locked) &&
    game.locked.every((name) => typeof name === "string") &&
    Boolean(game.moves) &&
    typeof game.moves === "object"
  );
};

let rpsGameSeq = 0;

const formatRpsGameId = (timestamp: number, seq: number, clientId: string) =>
  `${String(timestamp).padStart(15, "0")}.${String(seq).padStart(8, "0")}.${clientId}`;

export const createRpsGameId = (clientId: string, beats = "") => {
  rpsGameSeq += 1;
  let timestamp = Date.now();
  let id = formatRpsGameId(timestamp, rpsGameSeq, clientId);
  while (beats && !rpsGameIdBeats(id, beats)) {
    rpsGameSeq += 1;
    timestamp += 1;
    id = formatRpsGameId(timestamp, rpsGameSeq, clientId);
  }
  return id;
};

// Last-write-wins, same shape as deck stamps: newer id replaces the current game.
export const rpsGameIdBeats = (candidate: string, current: string) => {
  if (!candidate || candidate === current) {
    return false;
  }
  if (!current) {
    return true;
  }

  return candidate > current;
};

const namesMatch = (a?: string, b?: string) =>
  (a ?? "").trim().toLowerCase() === (b ?? "").trim().toLowerCase();

export const rpsSeatForName = (
  game: RpsGame,
  name?: string | null,
): string | null => {
  if (!name) {
    return null;
  }
  if (namesMatch(name, game.challenger)) {
    return game.challenger;
  }
  if (namesMatch(name, game.opponent)) {
    return game.opponent;
  }
  return null;
};

export const isRpsPlayer = (game: RpsGame, name?: string | null) =>
  rpsSeatForName(game, name) !== null;

export const hasRpsLocked = (game: RpsGame, name: string) => {
  const seat = rpsSeatForName(game, name);
  if (!seat) {
    return false;
  }

  return (
    game.locked.some((lockedName) => namesMatch(lockedName, seat)) ||
    isRpsMove(game.moves[seat])
  );
};

export const rpsResult = (game: RpsGame | null): RpsResult => {
  if (!game) {
    return { complete: false, winner: null, tie: false };
  }

  const challengerMove = game.moves[game.challenger];
  const opponentMove = game.moves[game.opponent];
  if (!isRpsMove(challengerMove) || !isRpsMove(opponentMove)) {
    return { complete: false, winner: null, tie: false };
  }
  if (challengerMove === opponentMove) {
    return { complete: true, winner: null, tie: true };
  }

  const winner =
    rpsBeats[challengerMove] === opponentMove ? game.challenger : game.opponent;

  return { complete: true, winner, tie: false };
};

const uniqueNames = (names: string[]) => {
  const seen = new Set<string>();
  const next: string[] = [];
  names.forEach((name) => {
    const key = name.trim().toLowerCase();
    if (!key || seen.has(key)) {
      return;
    }
    seen.add(key);
    next.push(name);
  });
  return next;
};

const sameStringSet = (a: string[], b: string[]) => {
  if (a.length !== b.length) {
    return false;
  }
  const bKeys = new Set(b.map((name) => name.trim().toLowerCase()));
  return a.every((name) => bKeys.has(name.trim().toLowerCase()));
};

const sameMoves = (
  a: Partial<Record<string, RpsMove>>,
  b: Partial<Record<string, RpsMove>>,
) => {
  const aKeys = Object.keys(a).filter((key) => isRpsMove(a[key]));
  const bKeys = Object.keys(b).filter((key) => isRpsMove(b[key]));
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  return aKeys.every((key) => {
    const match = bKeys.find((other) => namesMatch(other, key));
    return match ? a[key] === b[match] : false;
  });
};

export const mergeRpsGame = (
  current: RpsGame | null,
  incoming: RpsGame | null,
  dismissId?: string | null,
): RpsGame | null => {
  if (incoming === null) {
    if (!current) {
      return null;
    }
    if (
      !dismissId ||
      dismissId === current.id ||
      rpsGameIdBeats(dismissId, current.id)
    ) {
      return null;
    }
    return current;
  }

  if (!current) {
    return incoming;
  }

  if (incoming.id === current.id) {
    const moves = { ...current.moves, ...incoming.moves };
    const locked = uniqueNames([
      ...current.locked,
      ...incoming.locked,
      ...Object.keys(moves).filter((name) => isRpsMove(moves[name])),
    ]);

    if (
      sameStringSet(locked, current.locked) &&
      sameMoves(moves, current.moves)
    ) {
      return current;
    }

    return { ...current, locked, moves };
  }

  return rpsGameIdBeats(incoming.id, current.id) ? incoming : current;
};

// Late joiners should learn who has thrown without seeing a lone move.
export const rpsPayloadForSync = (game: RpsGame | null): RpsGame | null => {
  if (!game) {
    return null;
  }

  const result = rpsResult(game);
  if (result.complete) {
    return game;
  }

  return { ...game, moves: {} };
};
