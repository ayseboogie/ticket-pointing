import { SliceComponentProps } from "@prismicio/react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useMemo, useRef, useState } from "react";
import { getSupabaseClient } from "@/utils/supabaseClient";

type TicketPointingSlice = SliceComponentProps<any>["slice"];

export type Participant = {
  name: string;
};

export type PresencePayload = {
  clientId: string;
  name?: string;
  color?: string;
  selectedValue: number | null;
  roundId: string;
};

// Card values shown in the UI
export const cardValues = Array.from(
  { length: 16 },
  (_, index) => (index + 1) / 2,
);
// Allowed avatar colors
export const colorOptions = [
  "Blue",
  "Green",
  "Orange",
  "Purple",
  "Red",
  "Teal",
];

// Normalize color inputs for comparisons
export const normalizeColor = (color?: string) =>
  color?.trim().toLowerCase() || "blue";

// Tailwind class for participant avatar background
export const avatarColorClass = (color?: string) => {
  switch (normalizeColor(color)) {
    case "green":
      return "bg-emerald-500";
    case "orange":
      return "bg-orange-500";
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
    case "green":
      return "border-emerald-600 bg-emerald-600 text-white";
    case "orange":
      return "border-orange-500 bg-orange-500 text-white";
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

// Unique IDs for rounds and clients
const createRoundId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return String(Date.now());
};

type TicketPointingHookResult = {
  hasMounted: boolean;
  supabase: ReturnType<typeof getSupabaseClient>;
  roomId: string;
  roomTitle: string;
  allowReveal: boolean;
  participants: Participant[];
  selectedName: string | null;
  selectedColor: string;
  pendingName: string | null;
  pendingColor: string;
  isColorModalOpen: boolean;
  colorError: string | null;
  selectedValue: number | null;
  revealed: boolean;
  roundId: string;
  connectionState: "idle" | "connecting" | "connected" | "error";
  error: string | null;
  takenNames: Set<string>;
  presenceByName: Record<string, PresencePayload>;
  activeSelections: Record<string, number | null>;
  hasAvailableColor: boolean;
  isColorTaken: (color: string) => boolean;
  openColorModal: (name: string) => void;
  closeColorModal: () => void;
  setPendingColorChoice: (color: string) => void;
  joinRoom: () => void;
  handleSelectValue: (value: number) => void;
  handleReveal: () => void;
  handleReset: () => void;
};

export const useTicketPointing = (
  slice: TicketPointingSlice,
): TicketPointingHookResult => {
  // Supabase client (browser-only) - from utils/supabaseClient.ts
  const [supabase, setSupabase] = useState(() => getSupabaseClient());
  const [hasMounted, setHasMounted] = useState(false);
  // Realtime channel handle (presence + broadcast)
  const channelRef = useRef<RealtimeChannel | null>(null);

  // Room metadata from Prismic slice
  const roomId =
    typeof slice.primary?.room_id === "string" && slice.primary.room_id.trim()
      ? slice.primary.room_id.trim()
      : "default-room";
  const roomTitle =
    typeof slice.primary?.room_title === "string" && slice.primary.room_title
      ? slice.primary.room_title
      : "Ticket Pointing";
  const allowReveal = Boolean(slice.primary?.allow_reveal);

  // Normalized participant list
  const participants: Participant[] = useMemo(() => {
    const rawParticipants = slice.primary?.participants ?? [];

    return rawParticipants
      .map((participant: { name?: string }) => ({
        name: participant.name?.trim() ?? "",
      }))
      .filter((participant: Participant) => participant.name.length > 0);
  }, [slice.primary]);

  // Local UI state for current user
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("Blue");
  const [pendingName, setPendingName] = useState<string | null>(null);
  const [pendingColor, setPendingColor] = useState("Blue");
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [colorError, setColorError] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [roundId, setRoundId] = useState(createRoundId);
  // Stable client ID for presence tracking
  const clientId = useMemo(() => createRoundId(), []);
  // Raw presence state keyed by clientId
  const [presenceByClientId, setPresenceByClientId] = useState<
    Record<string, PresencePayload>
  >({});
  const [connectionState, setConnectionState] = useState<
    "idle" | "connecting" | "connected" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  // Refs used inside realtime callbacks
  const revealedRef = useRef(revealed);
  const roundIdRef = useRef(roundId);

  // Avoid mismatches between SSR/CSR
  useEffect(() => {
    revealedRef.current = revealed;
  }, [revealed]);

  // Recreate client once mounted (browser-only)
  useEffect(() => {
    roundIdRef.current = roundId;
  }, [roundId]);

  // Join Supabase realtime room: presence + broadcast
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      setSupabase(getSupabaseClient());
    }
  }, [hasMounted]);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    const channel = supabase.channel(`room:${roomId}`, {
      config: { presence: { key: clientId } },
    });

    channelRef.current = channel;
    setConnectionState("connecting");

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
    });

    // New joiners request the latest round/reveal state
    channel.on("broadcast", { event: "state-request" }, () => {
      channel.send({
        type: "broadcast",
        event: "state-sync",
        payload: { revealed: revealedRef.current, roundId: roundIdRef.current },
      });
    });

    // Apply room state updates from other clients
    channel.on("broadcast", { event: "state-sync" }, ({ payload }) => {
      if (!payload) {
        return;
      }

      if (typeof payload.revealed === "boolean") {
        setRevealed(payload.revealed);
      }

      if (typeof payload.roundId === "string") {
        const isNewRound = payload.roundId !== roundIdRef.current;
        setRoundId(payload.roundId);
        if (isNewRound) {
          setSelectedValue(null);
        }
      }
    });

    // Subscribe and publish initial presence
    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        setConnectionState("connected");
        channel.track({
          clientId,
          name: selectedName ?? undefined,
          color: selectedName ? selectedColor : undefined,
          selectedValue,
          roundId,
        });
        channel.send({
          type: "broadcast",
          event: "state-request",
          payload: {},
        });
      }

      if (status === "CHANNEL_ERROR") {
        setConnectionState("error");
        setError("Unable to connect to the room channel.");
      }
    });

    return () => {
      channel.unsubscribe();
      supabase.removeChannel(channel);
      channelRef.current = null;
      setConnectionState("idle");
    };
  }, [supabase, roomId, clientId, selectedName, selectedColor]);

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

  // Prevent duplicate name selection
  const takenNames = useMemo(() => {
    const next = new Set<string>();
    Object.values(presenceByClientId).forEach((presence) => {
      if (presence.name && presence.clientId !== clientId) {
        next.add(presence.name);
      }
    });
    return next;
  }, [presenceByClientId, clientId]);

  // Convenience map: name -> presence
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

    const nextRoundId = createRoundId();
    setSelectedValue(null);
    setRevealed(false);
    setRoundId(nextRoundId);
    channelRef.current.send({
      type: "broadcast",
      event: "state-sync",
      payload: { revealed: false, roundId: nextRoundId },
    });
  };

  // Begin join flow for a selected participant
  const openColorModal = (name: string) => {
    const nextColor = isColorTaken(selectedColor)
      ? getAvailableColor()
      : selectedColor;
    setPendingName(name);
    setPendingColor(nextColor);
    setColorError(null);
    setIsColorModalOpen(true);
  };

  const closeColorModal = () => {
    setIsColorModalOpen(false);
    setPendingName(null);
    setColorError(null);
  };

  const setPendingColorChoice = (color: string) => {
    setPendingColor(color);
    setColorError(null);
  };

  // Confirm join, set user identity, and reset round state locally
  const joinRoom = () => {
    if (!pendingName) {
      return;
    }
    if (isColorTaken(pendingColor)) {
      setColorError("That color is already taken. Choose another.");
      return;
    }
    setSelectedColor(pendingColor);
    setSelectedName(pendingName);
    setRoundId(createRoundId());
    setSelectedValue(null);
    setIsColorModalOpen(false);
    setColorError(null);
  };

  return {
    hasMounted,
    supabase,
    roomId,
    roomTitle,
    allowReveal,
    participants,
    selectedName,
    selectedColor,
    pendingName,
    pendingColor,
    isColorModalOpen,
    colorError,
    selectedValue,
    revealed,
    roundId,
    connectionState,
    error,
    takenNames,
    presenceByName,
    activeSelections,
    hasAvailableColor,
    isColorTaken,
    openColorModal,
    closeColorModal,
    setPendingColorChoice,
    joinRoom,
    handleSelectValue,
    handleReveal,
    handleReset,
  };
};
