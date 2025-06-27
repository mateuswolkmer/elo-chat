import { atom } from "jotai";

export const isOpenAtom = atom(false);
export const statusAtom = atom<"online" | "offline" | "maintenance">("online");

export const sessionsAtom = atom<{ title: string; date: string }[]>([
  {
    title: "How to add my driver's license to my car insurrance",
    date: "2025-06-26",
  },
  {
    title: "What are the taxes for buying grocceries in the USA",
    date: "2025-06-20",
  },
]);
