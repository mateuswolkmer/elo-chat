import { atom } from "jotai";
import { SESSIONS_MOCK } from "./constants";

// general atoms
export const isWidgetOpenAtom = atom(false);
export const serviceStatusAtom = atom<"online" | "offline" | "maintenance">(
  "online"
);

// user input atoms
export const inputTextAtom = atom<string>("");

export const signedInEmailAtom = atom<string | null>(null);

// data atoms
export const sessionsAtom = atom<{ title: string; date: string }[]>((get) => {
  const email = get(signedInEmailAtom);
  return email ? SESSIONS_MOCK[email] : [];
});

// layout atoms
export const showUserInputAtom = atom((get) => {
  return get(isWidgetOpenAtom);
});
export const showEmailInputAtom = atom((get) => {
  return get(isWidgetOpenAtom) && !Boolean(get(signedInEmailAtom));
});
export const showPastSessionsAtom = atom((get) => {
  return (
    get(isWidgetOpenAtom) &&
    Boolean(get(signedInEmailAtom)) &&
    !Boolean(get(inputTextAtom))
  );
});
