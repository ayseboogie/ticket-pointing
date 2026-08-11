import { vi } from "vitest";

type Handler = (payload?: any) => void;

export type MockChannel = {
  on: ReturnType<typeof vi.fn>;
  subscribe: ReturnType<typeof vi.fn>;
  track: ReturnType<typeof vi.fn>;
  send: ReturnType<typeof vi.fn>;
  unsubscribe: ReturnType<typeof vi.fn>;
  presenceState: ReturnType<typeof vi.fn>;
  /** Fire a registered realtime listener by type/event */
  emit: (type: string, event: string, payload?: any) => void;
  /** Complete the subscribe handshake as connected */
  completeSubscribe: (status?: string) => void;
};

export const createMockChannel = (): MockChannel => {
  const handlers = new Map<string, Handler[]>();
  let subscribeCallback: ((status: string) => void) | null = null;

  const channel: MockChannel = {
    on: vi.fn((type: string, filter: { event: string }, handler: Handler) => {
      const key = `${type}:${filter.event}`;
      const list = handlers.get(key) ?? [];
      list.push(handler);
      handlers.set(key, list);
      return channel;
    }),
    subscribe: vi.fn((callback?: (status: string) => void) => {
      subscribeCallback = callback ?? null;
      return channel;
    }),
    track: vi.fn(() => Promise.resolve("ok")),
    send: vi.fn(() => Promise.resolve("ok")),
    unsubscribe: vi.fn(() => Promise.resolve("ok")),
    presenceState: vi.fn(() => ({})),
    emit: (type, event, payload) => {
      const key = `${type}:${event}`;
      (handlers.get(key) ?? []).forEach((handler) => {
        if (type === "presence") {
          handler();
        } else {
          handler({ payload });
        }
      });
    },
    completeSubscribe: (status = "SUBSCRIBED") => {
      subscribeCallback?.(status);
    },
  };

  return channel;
};

export const createMockSupabase = (channel = createMockChannel()) => {
  const removeChannel = vi.fn();
  const supabase = {
    channel: vi.fn(() => channel),
    removeChannel,
  };

  return { supabase, channel, removeChannel };
};
