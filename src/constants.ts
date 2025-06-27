import { Transition } from "motion";

export const SPRING_SETTINGS: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const SESSIONS_MOCK: {
  [key: string]: { title: string; date: string }[];
} = {
  "mateuswsouza@gmail.com": [
    {
      title: "How to add my driver's license to my car insurrance",
      date: "2025-06-26",
    },
    {
      title: "What are the taxes for buying grocceries in the USA",
      date: "2025-06-20",
    },
  ],
};
