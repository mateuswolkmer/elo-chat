import { Transition } from "motion";

export const SPRING_SETTINGS: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const SERVICE_STATUS = {
  online: {
    color: "primary-light",
    label: "online",
    inputPlaceholder: "I'm Elo, your financial asistant!",
  },
  maintenance: {
    color: "secondary-light",
    label: "maintenance",
    inputPlaceholder: "Elos is going under maintenance.",
  },
  offline: {
    color: "secondary",
    label: "offline",
    inputPlaceholder: "Elos is currently offline.",
  },
} as const;

export const SESSIONS_MOCK: {
  [key: string]: {
    title: string;
    date: string;
    messages: { from: "user" | "elo"; content: string }[];
  }[];
} = {
  "mateuswsouza@gmail.com": [
    {
      title: "How to add my driver's license to my car insurrance",
      date: "2025-06-26",
      messages: [
        {
          from: "user",
          content: "How to add my driver's license to my car insurrance",
        },
        {
          from: "elo",
          content:
            "I'm sorry, I can't help with that. I'm just a financial assistant.",
        },
        { from: "user", content: "What do you mean?" },
        { from: "elo", content: "I'm just some mock data." },
      ],
    },
    {
      title: "What are the taxes for buying grocceries in the USA",
      date: "2025-06-20",
      messages: [
        {
          from: "user",
          content: "What are the taxes for buying grocceries in the USA",
        },
        {
          from: "elo",
          content:
            "I'm sorry, I can't help with that. I'm just a financial assistant.",
        },
      ],
    },
  ],
};
