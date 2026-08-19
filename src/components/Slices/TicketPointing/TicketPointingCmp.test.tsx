import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createMockSupabase } from "@/test/mockSupabase";
import TicketPointingCmp from "./TicketPointingCmp";

vi.mock("@/utils/supabaseClient", () => ({
  getSupabaseClient: vi.fn(),
}));

vi.mock("canvas-confetti", () => ({
  default: vi.fn(),
}));

vi.mock("@/components/Suspense/SuspenseImage.tsx", () => ({
  default: ({
    image,
  }: {
    image?: { url?: string | null; alt?: string | null };
  }) => (image?.url ? <img src={image.url} alt={image.alt ?? ""} /> : null),
}));

import { getSupabaseClient } from "@/utils/supabaseClient";

const getSupabaseClientMock = vi.mocked(getSupabaseClient);

const slice = {
  primary: {
    room_id: "squad-1",
    room_title: "Sprint Pointing",
    allow_reveal: true,
  },
};

describe("TicketPointingCmp", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState(null, "", "/");
    vi.clearAllMocks();
  });

  it("shows a configuration message when Supabase env is missing", async () => {
    getSupabaseClientMock.mockReturnValue(null);

    render(<TicketPointingCmp slice={slice as any} />);

    expect(
      await screen.findByText(/Supabase is not configured/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Sprint Pointing")).toBeInTheDocument();
  });

  it("uses the Prismic background image behind the player", async () => {
    getSupabaseClientMock.mockReturnValue(null);

    render(
      <TicketPointingCmp
        slice={
          {
            primary: {
              ...slice.primary,
              background_image: {
                url: "https://example.com/room-bg.jpg",
                alt: "Pointing room background",
                dimensions: { width: 1600, height: 900 },
              },
            },
          } as any
        }
      />,
    );

    expect(
      await screen.findByAltText("Pointing room background"),
    ).toHaveAttribute("src", "https://example.com/room-bg.jpg");
  });

  it("renders the room UI and allows joining + selecting a card", async () => {
    const user = userEvent.setup();
    const { supabase, channel } = createMockSupabase();
    getSupabaseClientMock.mockReturnValue(supabase as any);

    render(<TicketPointingCmp slice={slice as any} />);

    expect(await screen.findByText(/Room · squad-1/i)).toBeInTheDocument();

    // Finish channel subscribe so connection state settles
    channel.completeSubscribe("SUBSCRIBED");

    const nameInput = await screen.findByPlaceholderText("Your name");
    await user.type(nameInput, "Ayse");
    await user.click(screen.getByRole("button", { name: "Pink" }));
    await user.click(screen.getByRole("button", { name: "Join" }));

    await waitFor(() => {
      expect(screen.getByText(/You're in as Ayse/i)).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "5" }));

    expect(screen.getByRole("button", { name: "5" })).toHaveClass(
      "bg-pink-500",
    );
    expect(screen.getByText("Locked until Reset")).toBeInTheDocument();
  });

  it("copies the invite link to the clipboard", async () => {
    const user = userEvent.setup();
    const { supabase, channel } = createMockSupabase();
    getSupabaseClientMock.mockReturnValue(supabase as any);

    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<TicketPointingCmp slice={slice as any} />);
    channel.completeSubscribe("SUBSCRIBED");

    expect(
      await screen.findByRole("button", { name: /Copy invite link/i }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Copy invite link/i }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalled();
      expect(writeText.mock.calls[0][0]).toContain("room=squad-1");
    });
    expect(
      await screen.findByRole("button", { name: /Link copied!/i }),
    ).toBeInTheDocument();
  });

  it("lets two joined people play rock paper scissors for a ticket", async () => {
    const user = userEvent.setup();
    const { supabase, channel } = createMockSupabase();
    getSupabaseClientMock.mockReturnValue(supabase as any);

    render(<TicketPointingCmp slice={slice as any} />);
    channel.completeSubscribe("SUBSCRIBED");

    const nameInput = await screen.findByPlaceholderText("Your name");
    await user.type(nameInput, "Ayse");
    await user.click(screen.getByRole("button", { name: "Join" }));

    await waitFor(() => {
      expect(screen.getByText(/You're in as Ayse/i)).toBeInTheDocument();
    });

    const clientId = window.localStorage.getItem("ticket-pointing:client-id");
    channel.presenceState.mockReturnValue({
      [clientId ?? "local"]: [
        {
          clientId: clientId ?? "local",
          name: "Ayse",
          color: "Blue",
          selectedValue: null,
          roundId: "",
        },
      ],
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
    channel.emit("presence", "sync");

    expect(
      await screen.findByRole("button", { name: /Challenge Sam/i }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Challenge Sam/i }));

    expect(await screen.findByText("vs")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Rock" }));
    expect(screen.getByText(/Locked in/i)).toBeInTheDocument();

    const sendCalls = channel.send.mock.calls.filter(
      (call) => call[0]?.event === "rps-sync",
    );
    const gameId = sendCalls.at(-1)?.[0]?.payload?.game?.id as string;

    channel.emit("broadcast", "rps-sync", {
      game: {
        id: gameId,
        challenger: "Ayse",
        opponent: "Sam",
        locked: ["Sam"],
        moves: { Sam: "scissors" },
      },
    });

    expect(
      await screen.findByText(/Ayse takes the ticket!/i),
    ).toBeInTheDocument();
  });
});
