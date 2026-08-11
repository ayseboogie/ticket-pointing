import { describe, expect, it } from "vitest";
import {
  avatarColorClass,
  createDeckStamp,
  createRoundId,
  deckStampBeats,
  decks,
  normalizeColor,
  normalizeName,
  normalizeRoomCode,
  parseRoundId,
  roundIdBeats,
  selectedColorClass,
} from "./useTicketPointing";

describe("normalizeRoomCode", () => {
  it("lowercases, trims, and replaces unsafe characters", () => {
    expect(normalizeRoomCode("  Team Alpha!!  ")).toBe("team-alpha");
  });

  it("strips leading/trailing dashes and caps length at 60", () => {
    expect(normalizeRoomCode("---hello---")).toBe("hello");
    expect(normalizeRoomCode("a".repeat(80))).toHaveLength(60);
  });

  it("returns an empty string for blank input", () => {
    expect(normalizeRoomCode("")).toBe("");
    expect(normalizeRoomCode(undefined)).toBe("");
    expect(normalizeRoomCode("   ")).toBe("");
  });
});

describe("normalizeName / normalizeColor", () => {
  it("normalizes names case-insensitively and trims whitespace", () => {
    expect(normalizeName("  Ayse  ")).toBe("ayse");
    expect(normalizeName(undefined)).toBe("");
  });

  it("normalizes colors and falls back to blue", () => {
    expect(normalizeColor("  Pink ")).toBe("pink");
    expect(normalizeColor(undefined)).toBe("blue");
    expect(normalizeColor("")).toBe("blue");
  });
});

describe("avatarColorClass / selectedColorClass", () => {
  it("maps known colors to Tailwind classes", () => {
    expect(avatarColorClass("Green")).toBe("bg-emerald-500");
    expect(avatarColorClass("Teal")).toBe("bg-teal-500");
    expect(selectedColorClass("Pink")).toContain("bg-pink-500");
    expect(selectedColorClass("Indigo")).toContain("border-indigo-500");
  });

  it("falls back to blue for unknown colors", () => {
    expect(avatarColorClass("chartreuse")).toBe("bg-blue-500");
    expect(selectedColorClass("nope")).toContain("bg-blue-500");
  });
});

describe("decks", () => {
  it("exposes the standard 1–8 deck and fibonacci sequence", () => {
    expect(decks.standard).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(decks.fibonacci).toEqual([1, 2, 3, 5, 8, 13, 21]);
  });
});

describe("round IDs", () => {
  it("createRoundId pads epoch/mintedAt and is parseable", () => {
    const id = createRoundId(3);
    const parsed = parseRoundId(id);

    expect(id.split(".")).toHaveLength(3);
    expect(parsed.epoch).toBe(3);
    expect(parsed.mintedAt).toBeGreaterThan(0);
  });

  it("parseRoundId tolerates malformed values", () => {
    expect(parseRoundId("")).toEqual({ epoch: 0, mintedAt: 0 });
    expect(parseRoundId("not-a-round")).toEqual({ epoch: 0, mintedAt: 0 });
  });

  describe("roundIdBeats", () => {
    it("treats empty current as primordial (any real round wins)", () => {
      expect(roundIdBeats("00000001.000000000000001.a", "")).toBe(true);
      expect(roundIdBeats("", "00000001.000000000000001.a")).toBe(false);
    });

    it("rejects identical or empty candidates", () => {
      const id = "00000001.000000000000100.abc";
      expect(roundIdBeats(id, id)).toBe(false);
      expect(roundIdBeats("", id)).toBe(false);
    });

    it("prefers a higher epoch (newer reset wins)", () => {
      const older = "00000001.000000000000999.zzz";
      const newer = "00000002.000000000000001.aaa";
      expect(roundIdBeats(newer, older)).toBe(true);
      expect(roundIdBeats(older, newer)).toBe(false);
    });

    it("within an epoch prefers the earlier mintedAt (simultaneous reset convergence)", () => {
      const earlier = "00000002.000000000000010.bbb";
      const later = "00000002.000000000000020.aaa";
      expect(roundIdBeats(earlier, later)).toBe(true);
      expect(roundIdBeats(later, earlier)).toBe(false);
    });

    it("breaks remaining ties lexicographically", () => {
      const a = "00000002.000000000000010.aaa";
      const b = "00000002.000000000000010.bbb";
      expect(roundIdBeats(a, b)).toBe(true);
      expect(roundIdBeats(b, a)).toBe(false);
    });
  });
});

describe("deck stamps", () => {
  it("createDeckStamp is zero-padded and includes the client id", () => {
    const stamp = createDeckStamp("client-42");
    expect(stamp.endsWith(".client-42")).toBe(true);
    expect(stamp.split(".")[0]).toHaveLength(15);
  });

  describe("deckStampBeats", () => {
    it("treats empty current as primordial", () => {
      expect(deckStampBeats("000000000000001.a", "")).toBe(true);
      expect(deckStampBeats("", "000000000000001.a")).toBe(false);
    });

    it("uses last-write-wins lexicographic order", () => {
      const older = "000000000000100.aaa";
      const newer = "000000000000200.bbb";
      expect(deckStampBeats(newer, older)).toBe(true);
      expect(deckStampBeats(older, newer)).toBe(false);
      expect(deckStampBeats(newer, newer)).toBe(false);
    });
  });
});
