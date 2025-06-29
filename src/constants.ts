import { Transition } from "motion";
import { UIMessage } from "ai";

export const SPRING_SETTINGS: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const THINKING_MESSAGE = "Thinking...";

export const SERVICE_STATUS = {
  online: {
    color: "primary-light",
    label: "online",
    inputPlaceholder: "I'm Elo, your financial asistant!",
  },
  maintenance: {
    color: "secondary-light",
    label: "maintenance",
    inputPlaceholder: "Elo is going under maintenance.",
  },
  offline: {
    color: "secondary",
    label: "offline",
    inputPlaceholder: "Elo is currently offline.",
  },
} as const;

export const SESSIONS_MOCK: {
  [key: string]: {
    title: string;
    date: string;
    messages: UIMessage[];
  }[];
} = {
  "mateuswsouza@gmail.com": [
    {
      title: "How to add my driver's license to my car insurrance",
      date: "2025-06-26",
      messages: [
        {
          role: "user",
          parts: [
            {
              type: "text",
              text: "How to add my driver's license to my car insurrance",
            },
          ],
          id: "msg-0",
        },
        {
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "I'm sorry, I can't help with that. I'm just a financial assistant.",
            },
          ],
          id: "msg-1",
        },
        {
          role: "user",
          parts: [{ type: "text", text: "What do you mean?" }],
          id: "msg-2",
        },
        {
          role: "assistant",
          parts: [{ type: "text", text: "I'm just some mock data." }],
          id: "msg-3",
        },
      ],
    },
    {
      title: "What are the taxes for buying grocceries in the USA",
      date: "2025-06-20",
      messages: [
        {
          role: "user",
          parts: [
            {
              type: "text",
              text: "What are the taxes for buying grocceries in the USA",
            },
          ],
          id: "msg-0",
        },
        {
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "I'm sorry, I can't help with that. I'm just a financial assistant.",
            },
          ],
          id: "msg-1",
        },
      ],
    },
  ],
};
