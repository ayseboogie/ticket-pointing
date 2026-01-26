import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Singleton client to avoid re-creating connections
let supabaseClient: SupabaseClient | null = null;

// Browser-only client init using public env vars
export const getSupabaseClient = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  if (!url || !anonKey) {
    return null;
  }

  // Lazy init once per browser session
  if (!supabaseClient) {
    supabaseClient = createClient(url, anonKey);
  }

  return supabaseClient;
};
