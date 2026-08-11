import { beforeEach, describe, expect, it, vi } from "vitest";

describe("getSupabaseClient", () => {
  beforeEach(() => {
    vi.resetModules();
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY = "anon-key";
  });

  it("returns null when URL or key is missing", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;

    const { getSupabaseClient } = await import("@/utils/supabaseClient");
    expect(getSupabaseClient()).toBeNull();
  });

  it("creates a singleton client when env is present in the browser", async () => {
    const createClient = vi.fn(() => ({ from: vi.fn() }));
    vi.doMock("@supabase/supabase-js", () => ({ createClient }));

    const { getSupabaseClient } = await import("@/utils/supabaseClient");
    const first = getSupabaseClient();
    const second = getSupabaseClient();

    expect(first).toBeTruthy();
    expect(second).toBe(first);
    expect(createClient).toHaveBeenCalledTimes(1);
    expect(createClient).toHaveBeenCalledWith(
      "https://example.supabase.co",
      "anon-key",
    );
  });
});
