import { SliceComponentProps } from "@prismicio/react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useMemo, useRef, useState } from "react";
import { getSupabaseClient } from "@/utils/supabaseClient";
import {
  createRpsGameId,
  isRpsGame,
  isRpsMove,
  isRpsPlayer,
  mergeRpsGame,
  rpsPayloadForSync,
  rpsResult as computeRpsResult,
  rpsSeatForName,
  type RpsGame,
  type RpsMove,
  type RpsResult,
} from "./rps";

type TicketPointingSlice = SliceComponentProps<any>["slice"];

export type Participant = {
  name: string;
  color?: string;
};

export type PresencePayload = {
  clientId: string;
  name?: string;
  color?: string;
  selectedValue: number | null;
  roundId: string;
};

// Card values everyone in a room points with (Fibonacci).
export const cardValues = [1, 2, 3, 5, 8, 13, 21];

// Allowed avatar colors
export const colorOptions = [
  "Blue",
  "Green",
  "Indigo",
  "Pink",
  "Orange",
  "Purple",
  "Red",
  "Teal",
  "Amber",
  "Cyan",
];

// Normalize color inputs for comparisons
export const normalizeColor = (color?: string) =>
  color?.trim().toLowerCase() || "blue";

// Normalize names for case-insensitive comparisons
export const normalizeName = (name?: string) =>
  name?.trim().toLowerCase() ?? "";

// Among people who actually voted, whether they all picked the same number.
// Ignores joined users with no selection. Needs at least two votes.
export const unanimousSelectedValue = (
  selections: Array<number | null | undefined>,
): number | null => {
  const votes = selections.filter(
    (selection): selection is number => typeof selection === "number",
  );
  if (votes.length < 2) {
    return null;
  }

  return votes.every((selection) => selection === votes[0]) ? votes[0] : null;
};

// Tailwind class for participant avatar background
export const avatarColorClass = (color?: string) => {
  switch (normalizeColor(color)) {
    case "amber":
      return "bg-amber-500";
    case "cyan":
      return "bg-cyan-500";
    case "green":
      return "bg-emerald-500";
    case "indigo":
      return "bg-indigo-500";
    case "orange":
      return "bg-orange-500";
    case "pink":
      return "bg-pink-500";
    case "purple":
      return "bg-purple-500";
    case "red":
      return "bg-red";
    case "teal":
      return "bg-teal-500";
    default:
      return "bg-blue-500";
  }
};

// Tailwind class for selected buttons/badges
export const selectedColorClass = (color?: string) => {
  switch (normalizeColor(color)) {
    case "amber":
      return "border-amber-500 bg-amber-500 text-white";
    case "cyan":
      return "border-cyan-500 bg-cyan-500 text-white";
    case "green":
      return "border-emerald-600 bg-emerald-600 text-white";
    case "indigo":
      return "border-indigo-500 bg-indigo-500 text-white";
    case "orange":
      return "border-orange-500 bg-orange-500 text-white";
    case "pink":
      return "border-pink-500 bg-pink-500 text-white";
    case "purple":
      return "border-purple-500 bg-purple-500 text-white";
    case "red":
      return "border-red bg-red text-white";
    case "teal":
      return "border-teal-500 bg-teal-500 text-white";
    default:
      return "border-blue-500 bg-blue-500 text-white";
  }
};

// Unique client IDs for presence tracking
const createClientId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return String(Date.now());
};

// Orderable round IDs: "epoch.mintedAt.random". Resets bump the epoch so a
// newer reset always wins; within an epoch the earliest-minted round wins, so
// simultaneous resets converge on the same winner on every client.
export const createRoundId = (epoch = 0) =>
  `${String(epoch).padStart(8, "0")}.${String(Date.now()).padStart(15, "0")}.${createClientId()}`;

export const parseRoundId = (roundId: string) => {
  const [epoch, mintedAt] = roundId.split(".");
  return { epoch: Number(epoch) || 0, mintedAt: Number(mintedAt) || 0 };
};

// Whether candidate should replace current as the room's active round. The
// empty string is the shared "primordial" round every client starts in; any
// real round beats it, and it never beats anything.
export const roundIdBeats = (candidate: string, current: string) => {
  if (!candidate || candidate === current) {
    return false;
  }
  if (!current) {
    return true;
  }

  const a = parseRoundId(candidate);
  const b = parseRoundId(current);
  if (a.epoch !== b.epoch) {
    return a.epoch > b.epoch;
  }
  if (a.mintedAt !== b.mintedAt) {
    return a.mintedAt < b.mintedAt;
  }

  return candidate < current;
};

// Sanitize a room code so it works safely inside a channel name / URL
export const normalizeRoomCode = (code?: string) =>
  (code ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

// Per-browser preference: remember the user's last room between visits.
const ROOM_STORAGE_KEY = "ticket-pointing:last-room";

// Stable per-tab identity so a refresh reuses the same presence key instead of
// appearing as a brand-new client in the room. Kept in sessionStorage so two
// tabs in one browser never share a presence key (and overwrite each other).
const CLIENT_ID_STORAGE_KEY = "ticket-pointing:client-id";

// Per-room display name + color so refresh can auto-rejoin the same seat.
const ROOM_IDENTITY_STORAGE_KEY = "ticket-pointing:room-identity";

type StoredIdentity = {
  name: string;
  color: string;
  selectedValue?: number | null;
  roundId?: string;
};

const readStoredValue = (key: string): string | null => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeStoredValue = (key: string, value: string) => {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore write failures (private mode / storage disabled)
  }
};

const getOrCreateStoredClientId = () => {
  if (typeof window === "undefined") {
    return createClientId();
  }
  try {
    const stored = window.sessionStorage.getItem(CLIENT_ID_STORAGE_KEY);
    if (stored) {
      return stored;
    }
    const id = createClientId();
    window.sessionStorage.setItem(CLIENT_ID_STORAGE_KEY, id);
    return id;
  } catch {
    // Storage disabled: fall back to an id that lives as long as this hook
    return createClientId();
  }
};

const readStoredRoomIdentities = (): Record<string, StoredIdentity> => {
  const raw = readStoredValue(ROOM_IDENTITY_STORAGE_KEY);
  if (!raw) {
    return {};
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return {};
    }
    const result: Record<string, StoredIdentity> = {};
    Object.entries(parsed as Record<string, unknown>).forEach(
      ([room, value]) => {
        if (
          value &&
          typeof value === "object" &&
          typeof (value as Record<string, unknown>).name === "string" &&
          typeof (value as Record<string, unknown>).color === "string"
        ) {
          const name = (value as StoredIdentity).name.trim();
          const color = (value as StoredIdentity).color.trim();
          if (name && color) {
            result[room] = { name, color };
          }
        }
      },
    );
    return result;
  } catch {
    return {};
  }
};

const readStoredRoomIdentity = (roomCode: string): StoredIdentity | null =>
  readStoredRoomIdentities()[roomCode] ?? null;

const writeStoredRoomIdentity = (
  roomCode: string,
  name: string,
  color: string,
  selectedValue: number | null = null,
  roundId = "",
) => {
  const stored = readStoredRoomIdentities();
  stored[roomCode] = { name, color, selectedValue, roundId };
  writeStoredValue(ROOM_IDENTITY_STORAGE_KEY, JSON.stringify(stored));
};

const clearStoredRoomIdentity = (roomCode: string) => {
  const stored = readStoredRoomIdentities();
  if (!(roomCode in stored)) {
    return;
  }
  delete stored[roomCode];
  writeStoredValue(ROOM_IDENTITY_STORAGE_KEY, JSON.stringify(stored));
};

// Reconnect backoff after the room channel drops: 1s, 2s, 4s ... capped, with
// jitter so a room-wide blip doesn't make everyone resubscribe in lockstep.
const RECONNECT_BASE_MS = 1000;
const RECONNECT_MAX_MS = 15000;
const RECONNECT_JITTER_MS = 500;

const reconnectDelayMs = (attempt: number) =>
  Math.min(RECONNECT_BASE_MS * 2 ** attempt, RECONNECT_MAX_MS) +
  Math.random() * RECONNECT_JITTER_MS;

type ConnectionState = "idle" | "connecting" | "connected" | "error";

type TicketPointingHookResult = {
  hasMounted: boolean;
  supabase: ReturnType<typeof getSupabaseClient>;
  roomCode: string;
  roomInput: string;
  roomTitle: string;
  shareUrl: string;
  allowReveal: boolean;
  participants: Participant[];
  isJoined: boolean;
  selectedName: string | null;
  selectedColor: string;
  pendingName: string;
  pendingColor: string;
  joinError: string | null;
  selectedValue: number | null;
  revealed: boolean;
  roundId: string;
  connectionState: ConnectionState;
  error: string | null;
  presenceByName: Record<string, PresencePayload>;
  activeSelections: Record<string, number | null>;
  hasAvailableColor: boolean;
  cardValues: number[];
  isColorTaken: (color: string) => boolean;
  isNameTaken: (name: string) => boolean;
  setRoomInput: (value: string) => void;
  applyRoomCode: (code?: string) => void;
  setPendingNameChoice: (name: string) => void;
  setPendingColorChoice: (color: string) => void;
  joinRoom: () => void;
  leaveRoom: () => void;
  handleSelectValue: (value: number) => void;
  handleReveal: () => void;
  handleReset: () => void;
  rpsGame: RpsGame | null;
  rpsResult: RpsResult;
  startRps: (opponentName: string) => void;
  chooseRpsMove: (move: RpsMove) => void;
  dismissRps: () => void;
  rematchRps: () => void;
};

export const useTicketPointing = (
  slice: TicketPointingSlice,
): TicketPointingHookResult => {
  // Supabase client (browser-only) - from utils/supabaseClient.ts
  const [supabase, setSupabase] = useState(() => getSupabaseClient());
  const [hasMounted, setHasMounted] = useState(false);
  // Realtime channel handle (presence + broadcast)
  const channelRef = useRef<RealtimeChannel | null>(null);

  // Room metadata from Prismic slice (used as defaults only)
  const defaultRoomCode =
    normalizeRoomCode(
      typeof slice.primary?.room_id === "string" ? slice.primary.room_id : "",
    ) || "default-room";
  const roomTitle =
    typeof slice.primary?.room_title === "string" && slice.primary.room_title
      ? slice.primary.room_title
      : "Ticket Pointing";
  const allowReveal =
    slice.primary?.allow_reveal === undefined
      ? true
      : Boolean(slice.primary?.allow_reveal);

  // Active room code (drives the realtime channel) + the editable input field
  const [roomCode, setRoomCode] = useState<string>(defaultRoomCode);
  const [roomInput, setRoomInput] = useState<string>(defaultRoomCode);
  const [shareUrl, setShareUrl] = useState<string>("");

  // Local UI state for current user
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("Blue");
  const [pendingName, setPendingName] = useState<string>("");
  const [pendingColor, setPendingColor] = useState("Blue");
  const [joinError, setJoinError] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  // Current round. Starts as the shared primordial round (""), so clients
  // that load an empty room at the same time are already converged; real
  // round IDs are only minted by resets.
  const [roundId, setRoundId] = useState("");
  // Stable client ID for presence tracking (persisted so refresh reuses the
  // same seat instead of minting a new anonymous client).
  const clientId = useMemo(() => getOrCreateStoredClientId(), []);
  // Raw presence state keyed by clientId
  const [presenceByClientId, setPresenceByClientId] = useState<
    Record<string, PresencePayload>
  >({});
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("idle");
  const [error, setError] = useState<string | null>(null);
  // True after the first presence sync for the current channel subscription.
  const [presenceReady, setPresenceReady] = useState(false);
  // Bumped to tear down and rebuild the room channel after it drops.
  const [reconnectNonce, setReconnectNonce] = useState(0);
  const reconnectAttemptRef = useRef(0);
  // Prevents auto-rejoin from retrying forever when the stored seat is taken.
  const autoRejoinAttemptedRef = useRef<string | null>(null);
  // Active rock-paper-scissors match for who takes the ticket.
  const [rpsGame, setRpsGame] = useState<RpsGame | null>(null);

  // Refs used inside realtime callbacks so the channel subscribes once per
  // room and never has to reconnect just because local state changed.
  const revealedRef = useRef(revealed);
  const roundIdRef = useRef(roundId);
  const selectedNameRef = useRef(selectedName);
  const selectedColorRef = useRef(selectedColor);
  const selectedValueRef = useRef(selectedValue);
  const rpsGameRef = useRef(rpsGame);

  useEffect(() => {
    rpsGameRef.current = rpsGame;
  }, [rpsGame]);

  useEffect(() => {
    revealedRef.current = revealed;
  }, [revealed]);

  useEffect(() => {
    roundIdRef.current = roundId;
  }, [roundId]);

  useEffect(() => {
    selectedNameRef.current = selectedName;
  }, [selectedName]);

  useEffect(() => {
    selectedColorRef.current = selectedColor;
  }, [selectedColor]);

  useEffect(() => {
    selectedValueRef.current = selectedValue;
  }, [selectedValue]);

  // On mount: read the room from the URL (?room=) so links are shareable
  useEffect(() => {
    setHasMounted(true);

    // Room precedence: a shared ?room= link wins, then the last room this
    // browser used, then the Prismic slice default.
    const params = new URLSearchParams(window.location.search);
    const urlRoom = normalizeRoomCode(params.get("room") ?? "");
    const storedRoom = normalizeRoomCode(
      readStoredValue(ROOM_STORAGE_KEY) ?? "",
    );
    const initialRoom = urlRoom || storedRoom;
    if (initialRoom) {
      setRoomCode(initialRoom);
      setRoomInput(initialRoom);
    }

    // Prefill join form from this browser's last seat so refresh feels like
    // returning to the same room even before auto-rejoin completes.
    const storedIdentity = readStoredRoomIdentity(initialRoom || roomCode);
    if (storedIdentity) {
      setPendingName(storedIdentity.name);
      setPendingColor(storedIdentity.color);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hasMounted) {
      setSupabase(getSupabaseClient());
    }
  }, [hasMounted]);

  // Keep the shareable URL in sync with the active room
  useEffect(() => {
    if (!hasMounted) {
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.set("room", roomCode);
    setShareUrl(url.toString());
    window.history.replaceState(null, "", url.toString());

    // Remember this room so it reopens on the user's next visit
    writeStoredValue(ROOM_STORAGE_KEY, roomCode);
  }, [hasMounted, roomCode]);

  const applyIncomingRps = (
    incoming: RpsGame | null,
    dismissId?: string | null,
  ) => {
    const next = mergeRpsGame(rpsGameRef.current, incoming, dismissId);
    if (next === rpsGameRef.current) {
      return next;
    }
    rpsGameRef.current = next;
    setRpsGame(next);
    return next;
  };

  const broadcastRps = (
    incoming: RpsGame | null,
    dismissId?: string | null,
  ) => {
    applyIncomingRps(incoming, dismissId);
    channelRef.current?.send({
      type: "broadcast",
      event: "rps-sync",
      payload: { game: incoming, dismissId: dismissId ?? null },
    });
  };

  // Join Supabase realtime room: presence + broadcast
  useEffect(() => {
    if (!supabase) {
      return;
    }

    const channel = supabase.channel(`room:${roomCode}`, {
      config: { presence: { key: clientId } },
    });

    // Set on cleanup so the CLOSED status from our own unsubscribe isn't
    // mistaken for a dropped connection.
    let disposed = false;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

    // Rebuild the channel after a backoff. Idempotent: several failure
    // statuses can arrive for one drop.
    const scheduleReconnect = () => {
      if (reconnectTimer) {
        return;
      }
      const delay = reconnectDelayMs(reconnectAttemptRef.current);
      reconnectAttemptRef.current += 1;
      reconnectTimer = setTimeout(() => {
        setReconnectNonce((nonce) => nonce + 1);
      }, delay);
    };

    channelRef.current = channel;
    setConnectionState("connecting");
    setPresenceReady(false);
    rpsGameRef.current = null;
    setRpsGame(null);

    // Presence sync: rebuild clientId -> presence map
    channel.on("presence", { event: "sync" }, () => {
      const state = channel.presenceState<PresencePayload>();
      const nextPresence: Record<string, PresencePayload> = {};

      Object.values(state).forEach((presenceList) => {
        presenceList.forEach((presence) => {
          if (presence?.clientId) {
            nextPresence[presence.clientId] = presence;
          }
        });
      });

      setPresenceByClientId(nextPresence);
      setPresenceReady(true);

      // Converge on the winning round advertised by peers. Heals clients
      // that missed a reset broadcast (e.g. after a brief reconnect).
      let bestRoundId = roundIdRef.current;
      Object.values(nextPresence).forEach((presence) => {
        if (
          typeof presence.roundId === "string" &&
          roundIdBeats(presence.roundId, bestRoundId)
        ) {
          bestRoundId = presence.roundId;
        }
      });
      if (bestRoundId !== roundIdRef.current) {
        roundIdRef.current = bestRoundId;
        setRoundId(bestRoundId);
        setSelectedValue(null);
        setRevealed(false);
      }
    });

    // New joiners request the latest round/reveal state; reply addressed to
    // the requester only, so established clients never adopt each other's
    // state from these replies.
    channel.on("broadcast", { event: "state-request" }, ({ payload }) => {
      channel.send({
        type: "broadcast",
        event: "state-sync",
        payload: {
          revealed: revealedRef.current,
          roundId: roundIdRef.current,
          rps: rpsPayloadForSync(rpsGameRef.current),
          target: payload?.requesterId ?? null,
        },
      });
    });

    // Apply room state updates from other clients
    channel.on("broadcast", { event: "state-sync" }, ({ payload }) => {
      if (!payload) {
        return;
      }

      // Targeted replies (join handshake) are only for the requester;
      // untargeted syncs (reveal/reset) apply to everyone.
      if (payload.target && payload.target !== clientId) {
        return;
      }

      const incomingRoundId =
        typeof payload.roundId === "string" ? payload.roundId : null;

      if (
        incomingRoundId &&
        roundIdBeats(incomingRoundId, roundIdRef.current)
      ) {
        roundIdRef.current = incomingRoundId;
        setRoundId(incomingRoundId);
        setSelectedValue(null);
      }

      // Only apply the revealed flag when the message refers to the round we
      // are (now) on, so a laggy reply about a superseded round can't
      // reveal or hide the current one.
      if (
        typeof payload.revealed === "boolean" &&
        (!incomingRoundId || incomingRoundId === roundIdRef.current)
      ) {
        setRevealed(payload.revealed);
      }

      // Adopt an in-flight RPS match from the join handshake. Ignore null —
      // a dedicated rps-sync dismiss is the real clear, so a laggy handshake
      // can't wipe a game this client just started.
      if (isRpsGame(payload.rps)) {
        applyIncomingRps(payload.rps);
      }
    });

    channel.on("broadcast", { event: "rps-sync" }, ({ payload }) => {
      if (!payload) {
        return;
      }
      if (isRpsGame(payload.game)) {
        applyIncomingRps(payload.game);
        return;
      }
      if (payload.game === null) {
        const dismissId =
          typeof payload.dismissId === "string" ? payload.dismissId : null;
        applyIncomingRps(null, dismissId);
      }
    });

    // Subscribe and publish initial presence
    channel.subscribe((status) => {
      if (disposed) {
        return;
      }

      if (status === "SUBSCRIBED") {
        reconnectAttemptRef.current = 0;
        setConnectionState("connected");
        setError(null);
        channel.track({
          clientId,
          name: selectedNameRef.current ?? undefined,
          color: selectedNameRef.current ? selectedColorRef.current : undefined,
          selectedValue: selectedValueRef.current,
          roundId: roundIdRef.current,
        });
        channel.send({
          type: "broadcast",
          event: "state-request",
          payload: { requesterId: clientId },
        });
      }

      if (status === "CHANNEL_ERROR") {
        setConnectionState("error");
        setError("Unable to connect to the room channel. Retrying…");
        scheduleReconnect();
      }

      // A join that never completes, or a channel closed out from under us
      // (network drop, laptop sleep, server-side close): retry instead of
      // leaving a stale "connected" room.
      if (status === "TIMED_OUT" || status === "CLOSED") {
        setConnectionState("connecting");
        setError("Connection lost. Reconnecting…");
        scheduleReconnect();
      }
    });

    return () => {
      disposed = true;
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
      channel.unsubscribe();
      supabase.removeChannel(channel);
      channelRef.current = null;
      setConnectionState("idle");
    };
    // Subscribe once per room (and again only after a drop); presence updates
    // flow through the track effect below, so local state changes never force
    // a channel reconnect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, roomCode, clientId, reconnectNonce]);

  // Keep presence updated as local state changes
  useEffect(() => {
    if (!channelRef.current) {
      return;
    }

    channelRef.current.track({
      clientId,
      name: selectedName ?? undefined,
      color: selectedName ? selectedColor : undefined,
      selectedValue,
      roundId,
    });
  }, [clientId, selectedName, selectedColor, selectedValue, roundId]);

  // Names already claimed by other clients (case-insensitive)
  const takenNames = useMemo(() => {
    const next = new Set<string>();
    Object.values(presenceByClientId).forEach((presence) => {
      if (presence.name && presence.clientId !== clientId) {
        next.add(normalizeName(presence.name));
      }
    });
    return next;
  }, [presenceByClientId, clientId]);

  const isNameTaken = (name: string) => takenNames.has(normalizeName(name));

  // Convenience map: name -> presence (participants are whoever is present)
  const presenceByName = useMemo(() => {
    const next: Record<string, PresencePayload> = {};
    Object.values(presenceByClientId).forEach((presence) => {
      if (!presence.name) {
        return;
      }

      if (!next[presence.name] || presence.clientId === clientId) {
        next[presence.name] = presence;
      }
    });
    return next;
  }, [presenceByClientId, clientId]);

  // Dynamic participant list, derived from live presence, stable ordering
  const participants: Participant[] = useMemo(
    () =>
      Object.values(presenceByName)
        .map((presence) => ({
          name: presence.name as string,
          color: presence.color,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [presenceByName],
  );

  // Colors already used by other clients
  const usedColors = useMemo(() => {
    const next = new Set<string>();
    Object.values(presenceByClientId).forEach((presence) => {
      if (presence.clientId === clientId || !presence.color) {
        return;
      }
      next.add(normalizeColor(presence.color));
    });
    return next;
  }, [presenceByClientId, clientId]);

  const isColorTaken = (color: string) => usedColors.has(normalizeColor(color));

  const getAvailableColor = () =>
    colorOptions.find((color) => !isColorTaken(color)) ?? "Blue";

  const hasAvailableColor = colorOptions.some((color) => !isColorTaken(color));

  // Default the pending color to something available while joining
  useEffect(() => {
    if (selectedName) {
      return;
    }
    if (isColorTaken(pendingColor) && hasAvailableColor) {
      setPendingColor(getAvailableColor());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usedColors, selectedName]);

  // Prefill + auto-rejoin using the identity this browser last used in the room.
  // Waits until presence has synced so we don't steal a name someone else holds.
  useEffect(() => {
    if (selectedName || connectionState !== "connected" || !presenceReady) {
      return;
    }

    const identity = readStoredRoomIdentity(roomCode);
    if (!identity) {
      return;
    }

    // Always restore the join form so a failed auto-rejoin still feels like
    // the same room (same name/color ready to submit).
    setPendingName(identity.name);
    if (
      !isColorTaken(identity.color) ||
      normalizeColor(identity.color) === normalizeColor(pendingColor)
    ) {
      setPendingColor(identity.color);
    }

    if (autoRejoinAttemptedRef.current === roomCode) {
      return;
    }
    autoRejoinAttemptedRef.current = roomCode;

    if (isNameTaken(identity.name)) {
      setJoinError(
        "Your previous name is already taken in this room. Pick another to rejoin.",
      );
      return;
    }

    const color = isColorTaken(identity.color)
      ? getAvailableColor()
      : identity.color;

    if (isColorTaken(color)) {
      setJoinError("All colors are currently taken. Please wait for one.");
      return;
    }

    setPendingColor(color);
    setSelectedColor(color);
    setSelectedName(identity.name);
    setJoinError(null);
    writeStoredRoomIdentity(
      roomCode,
      identity.name,
      color,
      identity.selectedValue ?? null,
      identity.roundId ?? "",
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    connectionState,
    presenceReady,
    roomCode,
    presenceByClientId,
    selectedName,
  ]);

  // After auto-rejoin (or a manual join that restored storage), put back the
  // vote for the still-active round so a refresh doesn't wipe a cast point.
  useEffect(() => {
    if (!selectedName || selectedValue !== null) {
      return;
    }

    const identity = readStoredRoomIdentity(roomCode);
    if (
      !identity ||
      normalizeName(identity.name) !== normalizeName(selectedName) ||
      identity.roundId !== roundId ||
      typeof identity.selectedValue !== "number"
    ) {
      return;
    }

    if (!cardValues.includes(identity.selectedValue)) {
      return;
    }

    // Don't resurrect a vote into a revealed round from a stale tab if the
    // room already moved on — matching roundId above covers the common case.
    setSelectedValue(identity.selectedValue);
  }, [selectedName, selectedValue, roomCode, roundId]);

  // Keep the persisted seat in sync while joined (name/color/vote/round).
  useEffect(() => {
    if (!hasMounted || !selectedName) {
      return;
    }
    writeStoredRoomIdentity(
      roomCode,
      selectedName,
      selectedColor,
      selectedValue,
      roundId,
    );
  }, [
    hasMounted,
    roomCode,
    selectedName,
    selectedColor,
    selectedValue,
    roundId,
  ]);

  // Selection visibility scoped to current round
  const activeSelections = useMemo(() => {
    const selectionMap: Record<string, number | null> = {};

    participants.forEach((participant) => {
      const presence = presenceByName[participant.name];

      if (presence && presence.roundId === roundId) {
        selectionMap[participant.name] = presence.selectedValue ?? null;
      } else {
        selectionMap[participant.name] = null;
      }
    });

    return selectionMap;
  }, [participants, presenceByName, roundId]);

  const isJoined = Boolean(selectedName);

  const rpsResult = useMemo(() => computeRpsResult(rpsGame), [rpsGame]);

  // Local selection; presence is updated via effect
  const handleSelectValue = (value: number) => {
    setSelectedValue(value);
  };

  // Reveal values for everyone in the room
  const handleReveal = () => {
    if (!channelRef.current) {
      return;
    }

    channelRef.current.send({
      type: "broadcast",
      event: "state-sync",
      payload: { revealed: true, roundId },
    });
    setRevealed(true);
  };

  // Start a new round (new roundId)
  const handleReset = () => {
    if (!channelRef.current) {
      return;
    }

    // Bump the epoch so this reset beats the current round on every client,
    // even under concurrent resets or skewed clocks.
    const nextRoundId = createRoundId(parseRoundId(roundId).epoch + 1);
    roundIdRef.current = nextRoundId;
    setSelectedValue(null);
    setRevealed(false);
    setRoundId(nextRoundId);
    channelRef.current.send({
      type: "broadcast",
      event: "state-sync",
      payload: { revealed: false, roundId: nextRoundId },
    });
  };

  const startRps = (opponentName: string) => {
    const name = selectedName?.trim();
    const opponent = opponentName.trim();
    if (!name || !opponent || normalizeName(name) === normalizeName(opponent)) {
      return;
    }

    const game: RpsGame = {
      id: createRpsGameId(clientId, rpsGameRef.current?.id),
      challenger: name,
      opponent,
      locked: [],
      moves: {},
    };
    broadcastRps(game);
  };

  const chooseRpsMove = (move: RpsMove) => {
    const game = rpsGameRef.current;
    const name = selectedName?.trim();
    if (!game || !name || !isRpsMove(move)) {
      return;
    }

    const seat = rpsSeatForName(game, name);
    if (!seat || !isRpsPlayer(game, name)) {
      return;
    }

    const result = computeRpsResult(game);
    if (result.complete) {
      return;
    }
    if (
      game.locked.some(
        (lockedName) => normalizeName(lockedName) === normalizeName(seat),
      )
    ) {
      return;
    }
    if (isRpsMove(game.moves[seat])) {
      return;
    }

    broadcastRps({
      ...game,
      locked: [...game.locked, seat],
      moves: { ...game.moves, [seat]: move },
    });
  };

  const dismissRps = () => {
    const game = rpsGameRef.current;
    if (!game) {
      return;
    }
    broadcastRps(null, game.id);
  };

  const rematchRps = () => {
    const game = rpsGameRef.current;
    if (!game) {
      return;
    }

    broadcastRps({
      id: createRpsGameId(clientId, game.id),
      challenger: game.challenger,
      opponent: game.opponent,
      locked: [],
      moves: {},
    });
  };

  const setPendingNameChoice = (name: string) => {
    setPendingName(name);
    setJoinError(null);
  };

  const setPendingColorChoice = (color: string) => {
    setPendingColor(color);
    setJoinError(null);
  };

  // Confirm join with a typed name + chosen color
  const joinRoom = () => {
    const name = pendingName.trim();

    if (!name) {
      setJoinError("Enter your name to join.");
      return;
    }
    if (isNameTaken(name)) {
      setJoinError("That name is already taken in this room.");
      return;
    }
    if (!hasAvailableColor) {
      setJoinError("All colors are currently taken. Please wait for one.");
      return;
    }
    if (isColorTaken(pendingColor)) {
      setJoinError("That color is already taken. Choose another.");
      return;
    }

    // Keep the room's current roundId (adopted via the join handshake) so
    // this client's votes are visible to everyone else. Minting a new local
    // roundId here would desync selections across clients.
    setSelectedColor(pendingColor);
    setSelectedName(name);
    setSelectedValue(null);
    setJoinError(null);
    writeStoredRoomIdentity(roomCode, name, pendingColor, null, roundId);
  };

  // Leave the room (frees the name/color for others)
  const leaveRoom = () => {
    const game = rpsGameRef.current;
    if (game && selectedName && isRpsPlayer(game, selectedName)) {
      broadcastRps(null, game.id);
    }
    clearStoredRoomIdentity(roomCode);
    autoRejoinAttemptedRef.current = roomCode;
    setSelectedName(null);
    setSelectedValue(null);
    setJoinError(null);
  };

  // Switch to a different team room (own realtime channel + URL)
  const applyRoomCode = (code?: string) => {
    const nextCode = normalizeRoomCode(code ?? roomInput);
    if (!nextCode || nextCode === roomCode) {
      setRoomInput(nextCode || roomCode);
      return;
    }

    // Reset all room-scoped state before reconnecting to the new channel;
    // back to the primordial round until the new room's state is adopted
    setSelectedName(null);
    setSelectedValue(null);
    setRevealed(false);
    setPresenceByClientId({});
    setRoundId("");
    rpsGameRef.current = null;
    setRpsGame(null);
    autoRejoinAttemptedRef.current = null;
    // Prefill join form from this browser's last seat in the target room.
    const storedIdentity = readStoredRoomIdentity(nextCode);
    setPendingName(storedIdentity?.name ?? "");
    setPendingColor(storedIdentity?.color ?? "Blue");
    setJoinError(null);
    setRoomInput(nextCode);
    setRoomCode(nextCode);
  };

  return {
    hasMounted,
    supabase,
    roomCode,
    roomInput,
    roomTitle,
    shareUrl,
    allowReveal,
    participants,
    isJoined,
    selectedName,
    selectedColor,
    pendingName,
    pendingColor,
    joinError,
    selectedValue,
    revealed,
    roundId,
    connectionState,
    error,
    presenceByName,
    activeSelections,
    hasAvailableColor,
    cardValues,
    isColorTaken,
    isNameTaken,
    setRoomInput,
    applyRoomCode,
    setPendingNameChoice,
    setPendingColorChoice,
    joinRoom,
    leaveRoom,
    handleSelectValue,
    handleReveal,
    handleReset,
    rpsGame,
    rpsResult,
    startRps,
    chooseRpsMove,
    dismissRps,
    rematchRps,
  };
};
