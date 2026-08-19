import { describe, expect, it } from "vitest";
import {
  createRpsGameId,
  isRpsGame,
  isRpsMove,
  isRpsPlayer,
  mergeRpsGame,
  rpsGameIdBeats,
  rpsPayloadForSync,
  rpsResult,
  rpsSeatForName,
  type RpsGame,
} from "./rps";

const game = (overrides: Partial<RpsGame> = {}): RpsGame => ({
  id: "000000000000100.a",
  challenger: "Ayse",
  opponent: "Sam",
  locked: [],
  moves: {},
  ...overrides,
});

describe("rps helpers", () => {
  it("accepts only rock/paper/scissors", () => {
    expect(isRpsMove("rock")).toBe(true);
    expect(isRpsMove("paper")).toBe(true);
    expect(isRpsMove("scissors")).toBe(true);
    expect(isRpsMove("lizard")).toBe(false);
  });

  it("identifies a valid game snapshot", () => {
    expect(isRpsGame(game())).toBe(true);
    expect(isRpsGame(null)).toBe(false);
    expect(isRpsGame({ id: "x" })).toBe(false);
  });

  it("maps a player to their seat, case-insensitively", () => {
    const match = game();
    expect(rpsSeatForName(match, "ayse")).toBe("Ayse");
    expect(rpsSeatForName(match, "SAM")).toBe("Sam");
    expect(rpsSeatForName(match, "Alex")).toBeNull();
    expect(isRpsPlayer(match, "Ayse")).toBe(true);
    expect(isRpsPlayer(match, "Alex")).toBe(false);
  });
});

describe("rpsResult", () => {
  it("is incomplete until both throws are in", () => {
    expect(rpsResult(null).complete).toBe(false);
    expect(rpsResult(game({ moves: { Ayse: "rock" } })).complete).toBe(false);
  });

  it("detects a tie", () => {
    expect(
      rpsResult(
        game({
          locked: ["Ayse", "Sam"],
          moves: { Ayse: "paper", Sam: "paper" },
        }),
      ),
    ).toEqual({ complete: true, winner: null, tie: true });
  });

  it("picks the winner with standard rules", () => {
    expect(
      rpsResult(
        game({
          locked: ["Ayse", "Sam"],
          moves: { Ayse: "rock", Sam: "scissors" },
        }),
      ).winner,
    ).toBe("Ayse");
    expect(
      rpsResult(
        game({
          locked: ["Ayse", "Sam"],
          moves: { Ayse: "paper", Sam: "scissors" },
        }),
      ).winner,
    ).toBe("Sam");
  });
});

describe("rpsGameIdBeats / createRpsGameId", () => {
  it("treats empty current as primordial", () => {
    expect(rpsGameIdBeats("000000000000001.a", "")).toBe(true);
    expect(rpsGameIdBeats("", "000000000000001.a")).toBe(false);
  });

  it("uses last-write-wins lexicographic order", () => {
    expect(rpsGameIdBeats("000000000000200.b", "000000000000100.a")).toBe(true);
    expect(rpsGameIdBeats("000000000000100.a", "000000000000200.b")).toBe(
      false,
    );
    expect(rpsGameIdBeats("000000000000100.a", "000000000000100.a")).toBe(
      false,
    );
  });

  it("stamps include a padded time and the client id", () => {
    const id = createRpsGameId("client-9");
    expect(id.endsWith(".client-9")).toBe(true);
    expect(id.split(".")[0]).toHaveLength(15);
    expect(id.split(".").length).toBeGreaterThanOrEqual(3);
  });

  it("can mint an id that beats a previous game", () => {
    const first = createRpsGameId("client-9");
    const rematch = createRpsGameId("client-9", first);
    expect(rpsGameIdBeats(rematch, first)).toBe(true);
  });
});

describe("mergeRpsGame", () => {
  it("adopts the first incoming game", () => {
    const incoming = game();
    expect(mergeRpsGame(null, incoming)).toEqual(incoming);
  });

  it("dismisses when incoming is null", () => {
    expect(mergeRpsGame(game(), null, "000000000000100.a")).toBeNull();
    expect(mergeRpsGame(game(), null)).toBeNull();
  });

  it("ignores a stale dismiss for a newer game", () => {
    const current = game({ id: "000000000000200.b" });
    expect(mergeRpsGame(current, null, "000000000000100.a")).toEqual(current);
  });

  it("merges locks and moves for the same game id", () => {
    const current = game({ locked: ["Ayse"], moves: { Ayse: "rock" } });
    const incoming = game({ locked: ["Sam"], moves: { Sam: "paper" } });
    const merged = mergeRpsGame(current, incoming);

    expect(merged?.locked).toEqual(["Ayse", "Sam"]);
    expect(merged?.moves).toEqual({ Ayse: "rock", Sam: "paper" });
  });

  it("replaces an older game with a newer id", () => {
    const current = game({ id: "000000000000100.a" });
    const incoming = game({
      id: "000000000000200.b",
      locked: ["Sam"],
      moves: { Sam: "scissors" },
    });
    expect(mergeRpsGame(current, incoming)).toEqual(incoming);
  });

  it("keeps the current game when the incoming id is older", () => {
    const current = game({ id: "000000000000200.b" });
    const incoming = game({ id: "000000000000100.a" });
    expect(mergeRpsGame(current, incoming)).toEqual(current);
  });

  it("returns the same reference when nothing changed", () => {
    const current = game({ locked: ["Ayse"], moves: { Ayse: "rock" } });
    expect(
      mergeRpsGame(
        current,
        game({ locked: ["Ayse"], moves: { Ayse: "rock" } }),
      ),
    ).toBe(current);
  });
});

describe("rpsPayloadForSync", () => {
  it("strips incomplete moves so late joiners cannot see a lone throw", () => {
    const incomplete = game({ locked: ["Ayse"], moves: { Ayse: "rock" } });
    expect(rpsPayloadForSync(incomplete)).toEqual({
      ...incomplete,
      moves: {},
    });
  });

  it("keeps moves once both players have thrown", () => {
    const complete = game({
      locked: ["Ayse", "Sam"],
      moves: { Ayse: "rock", Sam: "paper" },
    });
    expect(rpsPayloadForSync(complete)).toEqual(complete);
  });

  it("passes through a missing game", () => {
    expect(rpsPayloadForSync(null)).toBeNull();
  });
});
