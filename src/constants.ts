import { Transition } from "motion";

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
