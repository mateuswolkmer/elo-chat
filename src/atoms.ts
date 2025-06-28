import { atom } from "jotai";
import { SESSIONS_MOCK } from "./constants";
import { Session } from "./types";
import { atomWithStorage } from "jotai/utils";

// general atoms
export const isWidgetOpenAtom = atom(false);
export const serviceStatusAtom = atom<"online" | "offline" | "maintenance">(
  "online"
);

// user input atoms
export const inputTextAtom = atom<string>("");

export const signedInEmailAtom = atomWithStorage<string | null>(
  "elo_signedInEmail",
  null
);

// data atoms
export const currentSessionAtom = atomWithStorage<Session | null>(
  "elo_currentSession",
  null
);
export const userSessionsAtom = atom<Session[]>((get) => {
  const email = get(signedInEmailAtom);
  return email ? SESSIONS_MOCK[email] : [];
});

// layout atoms
export const isPastSessionsOpenAtom = atom(false);

export const shouldShowUserInputAtom = atom((get) => get(isWidgetOpenAtom));
export const shouldShowMessagesListAtom = atom(
  (get) => get(isWidgetOpenAtom) && !get(isPastSessionsOpenAtom)
);
export const shouldShowEmailInputAtom = atom(
  (get) => get(isWidgetOpenAtom) && !Boolean(get(signedInEmailAtom))
);
export const shouldShowPastSessionsAtom = atom(
  (get) => get(isWidgetOpenAtom) && Boolean(get(signedInEmailAtom))
);
