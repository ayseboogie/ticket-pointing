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
  default: () => null,
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
});
