import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createMockSupabase } from "@/test/mockSupabase";
import { useTicketPointing } from "./useTicketPointing";

vi.mock("@/utils/supabaseClient", () => ({
  getSupabaseClient: vi.fn(),
}));

import { getSupabaseClient } from "@/utils/supabaseClient";

const getSupabaseClientMock = vi.mocked(getSupabaseClient);

const slice = {
  primary: {
    room_id: "default-room",
    room_title: "Ticket Pointing",
    allow_reveal: true,
  },
};

describe("useTicketPointing", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.history.replaceState(null, "", "/");
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  const mountConnected = async () => {
    const { supabase, channel } = createMockSupabase();
    getSupabaseClientMock.mockReturnValue(supabase as any);

    const view = renderHook(() => useTicketPointing(slice as any));

    await waitFor(() => {
      expect(view.result.current.hasMounted).toBe(true);
    });

    act(() => {
      channel.completeSubscribe("SUBSCRIBED");
    });

    await waitFor(() => {
      expect(view.result.current.connectionState).toBe("connected");
    });

    return { ...view, channel, supabase };
  };

  const joinAs = (
    result: { current: ReturnType<typeof useTicketPointing> },
    name: string,
    color = "Blue",
  ) => {
    act(() => {
      result.current.setPendingNameChoice(name);
      result.current.setPendingColorChoice(color);
    });
    act(() => {
      result.current.joinRoom();
    });
  };

  it("keeps the presence key per tab (sessionStorage), not per browser", async () => {
    const { channel, supabase } = await mountConnected();

    const clientId = window.sessionStorage.getItem("ticket-pointing:client-id");
    expect(clientId).toBeTruthy();
    expect(window.localStorage.getItem("ticket-pointing:client-id")).toBeNull();
    expect(supabase.channel).toHaveBeenCalledWith(
      "room:default-room",
      expect.objectContaining({
        config: { presence: { key: clientId } },
      }),
    );
    expect(channel.track).toHaveBeenCalledWith(
      expect.objectContaining({ clientId }),
    );
  });

  it.each(["TIMED_OUT", "CLOSED"])(
    "rebuilds the channel after a %s status and recovers",
    async (status) => {
      const { result, channel, supabase } = await mountConnected();
      expect(supabase.channel).toHaveBeenCalledTimes(1);

      vi.useFakeTimers();
      act(() => {
        channel.completeSubscribe(status);
      });

      expect(result.current.connectionState).toBe("connecting");
      expect(result.current.error).toMatch(/reconnecting/i);

      // Repeat failure statuses for the same drop must not stack timers
      act(() => {
        channel.completeSubscribe(status);
      });

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(supabase.channel).toHaveBeenCalledTimes(2);

      act(() => {
        channel.completeSubscribe("SUBSCRIBED");
      });

      expect(result.current.connectionState).toBe("connected");
      expect(result.current.error).toBeNull();
    },
  );

  it("does not reconnect when the channel closes because the hook unmounted", async () => {
    const { channel, supabase, unmount } = await mountConnected();

    vi.useFakeTimers();
    unmount();
    act(() => {
      channel.completeSubscribe("CLOSED");
      vi.advanceTimersByTime(20000);
    });

    expect(supabase.channel).toHaveBeenCalledTimes(1);
  });

  it("uses the slice room id by default and builds a share URL", async () => {
    const { result } = await mountConnected();

    expect(result.current.roomCode).toBe("default-room");
    expect(result.current.roomTitle).toBe("Ticket Pointing");
    expect(result.current.shareUrl).toContain("room=default-room");
  });

  it("prefers ?room= from the URL over the slice default", async () => {
    window.history.replaceState(null, "", "/?room=Team%20Beta");
    const { result } = await mountConnected();

    expect(result.current.roomCode).toBe("team-beta");
    expect(result.current.roomInput).toBe("team-beta");
  });

  it("rejects joining without a name", async () => {
    const { result } = await mountConnected();

    act(() => {
      result.current.joinRoom();
    });

    expect(result.current.isJoined).toBe(false);
    expect(result.current.joinError).toBe("Enter your name to join.");
  });

  it("joins with a typed name and selected color", async () => {
    const { result } = await mountConnected();

    joinAs(result, "Ayse", "Pink");

    expect(result.current.isJoined).toBe(true);
    expect(result.current.selectedName).toBe("Ayse");
    expect(result.current.selectedColor).toBe("Pink");
    expect(result.current.joinError).toBeNull();
  });

  it("blocks joining when another presence already holds the name", async () => {
    const { result, channel } = await mountConnected();

    channel.presenceState.mockReturnValue({
      "peer-1": [
        {
          clientId: "peer-1",
          name: "Ayse",
          color: "Blue",
          selectedValue: null,
          roundId: "",
        },
      ],
    });

    act(() => {
      channel.emit("presence", "sync");
    });

    joinAs(result, "ayse", "Green");

    expect(result.current.isJoined).toBe(false);
    expect(result.current.joinError).toBe(
      "That name is already taken in this room.",
    );
    expect(result.current.isNameTaken("Ayse")).toBe(true);
  });

  it("blocks joining when the chosen color is taken", async () => {
    const { result, channel } = await mountConnected();

    channel.presenceState.mockReturnValue({
      "peer-1": [
        {
          clientId: "peer-1",
          name: "Sam",
          color: "Pink",
          selectedValue: null,
          roundId: "",
        },
      ],
    });

    act(() => {
      channel.emit("presence", "sync");
    });

    joinAs(result, "Ayse", "Pink");

    expect(result.current.isJoined).toBe(false);
    expect(result.current.joinError).toBe(
      "That color is already taken. Choose another.",
    );
    expect(result.current.isColorTaken("Pink")).toBe(true);
  });

  it("selects a card value from the Fibonacci cards", async () => {
    const { result } = await mountConnected();

    joinAs(result, "Ayse");

    expect(result.current.cardValues).toEqual([1, 2, 3, 5, 8, 13, 21]);

    act(() => {
      result.current.handleSelectValue(13);
    });

    expect(result.current.selectedValue).toBe(13);
  });

  it("reveals and resets via broadcast, minting a newer round on reset", async () => {
    const { result, channel } = await mountConnected();

    joinAs(result, "Ayse");

    act(() => {
      result.current.handleSelectValue(3);
      result.current.handleReveal();
    });

    expect(result.current.revealed).toBe(true);
    expect(channel.send).toHaveBeenCalledWith(
      expect.objectContaining({
        event: "state-sync",
        payload: expect.objectContaining({ revealed: true }),
      }),
    );

    const previousRound = result.current.roundId;

    act(() => {
      result.current.handleReset();
    });

    expect(result.current.revealed).toBe(false);
    expect(result.current.selectedValue).toBeNull();
    expect(result.current.roundId).not.toBe(previousRound);
  });

  it("ignores a targeted state-sync meant for another client", async () => {
    const { result, channel } = await mountConnected();

    act(() => {
      channel.emit("broadcast", "state-sync", {
        revealed: true,
        target: "someone-else",
      });
    });

    expect(result.current.revealed).toBe(false);
  });

  it("builds participants and activeSelections from presence for the current round", async () => {
    const { result, channel } = await mountConnected();

    // Establish a real round first so presence votes can be scoped against it
    joinAs(result, "Host");
    act(() => {
      result.current.handleReset();
    });
    const activeRound = result.current.roundId;

    channel.presenceState.mockReturnValue({
      "peer-1": [
        {
          clientId: "peer-1",
          name: "Sam",
          color: "Teal",
          selectedValue: 8,
          roundId: activeRound,
        },
      ],
      "peer-2": [
        {
          clientId: "peer-2",
          name: "Alex",
          color: "Orange",
          selectedValue: 3,
          roundId: "00000000.000000000000001.stale",
        },
      ],
    });

    act(() => {
      channel.emit("presence", "sync");
    });

    await waitFor(() => {
      expect(result.current.participants.map((p) => p.name)).toEqual([
        "Alex",
        "Sam",
      ]);
    });

    // Only Sam's vote matches the active round; Alex's is from a stale round
    expect(result.current.activeSelections.Sam).toBe(8);
    expect(result.current.activeSelections.Alex).toBeNull();
  });

  it("leaves the room and clears the stored seat", async () => {
    const { result } = await mountConnected();

    joinAs(result, "Ayse", "Green");

    expect(
      window.localStorage.getItem("ticket-pointing:room-identity"),
    ).toContain("Ayse");

    act(() => {
      result.current.leaveRoom();
    });

    expect(result.current.isJoined).toBe(false);
    expect(result.current.selectedName).toBeNull();
    expect(window.localStorage.getItem("ticket-pointing:room-identity")).toBe(
      "{}",
    );
  });

  it("switches rooms and resets join/vote state", async () => {
    const { result, supabase } = await mountConnected();

    joinAs(result, "Ayse");

    act(() => {
      result.current.handleSelectValue(2);
    });

    act(() => {
      result.current.applyRoomCode("team-omega");
    });

    expect(result.current.roomCode).toBe("team-omega");
    expect(result.current.isJoined).toBe(false);
    expect(result.current.selectedValue).toBeNull();
    expect(result.current.revealed).toBe(false);
    expect(supabase.channel).toHaveBeenCalledWith(
      "room:team-omega",
      expect.any(Object),
    );
  });

  it("auto-rejoins from a stored room identity once presence is ready", async () => {
    window.localStorage.setItem(
      "ticket-pointing:room-identity",
      JSON.stringify({
        "default-room": { name: "Ayse", color: "Cyan" },
      }),
    );

    const { result, channel } = await mountConnected();

    channel.presenceState.mockReturnValue({});
    act(() => {
      channel.emit("presence", "sync");
    });

    await waitFor(() => {
      expect(result.current.selectedName).toBe("Ayse");
      expect(result.current.selectedColor).toBe("Cyan");
      expect(result.current.isJoined).toBe(true);
    });
  });

  it("starts an RPS challenge and settles a winner after both throws", async () => {
    const { result, channel } = await mountConnected();

    joinAs(result, "Ayse", "Pink");

    channel.presenceState.mockReturnValue({
      "peer-1": [
        {
          clientId: "peer-1",
          name: "Sam",
          color: "Teal",
          selectedValue: null,
          roundId: "",
        },
      ],
    });
    act(() => {
      channel.emit("presence", "sync");
    });

    act(() => {
      result.current.startRps("Sam");
    });

    expect(result.current.rpsGame?.challenger).toBe("Ayse");
    expect(result.current.rpsGame?.opponent).toBe("Sam");
    expect(channel.send).toHaveBeenCalledWith(
      expect.objectContaining({
        event: "rps-sync",
        payload: expect.objectContaining({
          game: expect.objectContaining({
            challenger: "Ayse",
            opponent: "Sam",
          }),
        }),
      }),
    );

    act(() => {
      result.current.chooseRpsMove("rock");
    });
    expect(result.current.rpsGame?.moves.Ayse).toBe("rock");
    expect(result.current.rpsResult.complete).toBe(false);

    const gameId = result.current.rpsGame?.id;
    act(() => {
      channel.emit("broadcast", "rps-sync", {
        game: {
          id: gameId,
          challenger: "Ayse",
          opponent: "Sam",
          locked: ["Sam"],
          moves: { Sam: "scissors" },
        },
      });
    });

    expect(result.current.rpsResult).toEqual({
      complete: true,
      winner: "Ayse",
      tie: false,
    });
  });

  it("dismisses and rematches over rps-sync", async () => {
    const { result, channel } = await mountConnected();

    joinAs(result, "Ayse");
    act(() => {
      result.current.startRps("Sam");
    });

    const firstId = result.current.rpsGame?.id;
    act(() => {
      result.current.rematchRps();
    });
    expect(result.current.rpsGame?.id).not.toBe(firstId);
    expect(result.current.rpsGame?.moves).toEqual({});

    act(() => {
      result.current.dismissRps();
    });
    expect(result.current.rpsGame).toBeNull();
    expect(channel.send).toHaveBeenCalledWith(
      expect.objectContaining({
        event: "rps-sync",
        payload: expect.objectContaining({ game: null }),
      }),
    );
  });

  it("adopts a peer RPS match from the join handshake", async () => {
    const { result, channel } = await mountConnected();

    act(() => {
      channel.emit("broadcast", "state-sync", {
        rps: {
          id: "000000000000500.peer",
          challenger: "Sam",
          opponent: "Alex",
          locked: ["Sam", "Alex"],
          moves: { Sam: "paper", Alex: "rock" },
        },
      });
    });

    await waitFor(() => {
      expect(result.current.rpsResult).toEqual({
        complete: true,
        winner: "Sam",
        tie: false,
      });
    });
  });
});
