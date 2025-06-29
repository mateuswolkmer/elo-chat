import { UIMessage } from "ai";

export type Session = {
  title: string;
  date: string;
  messages: UIMessage[];
};
