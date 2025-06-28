export type Message = {
  from: "user" | "elo";
  content: string;
};

export type Session = {
  title: string;
  date: string;
  messages: Message[];
};
