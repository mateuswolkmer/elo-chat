import React from "react";
import { currentSessionAtom, inputTextAtom, isWidgetOpenAtom } from "../atoms";
import { useAtom } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { SendIcon } from "./icons/SendIcon";
import { twMerge } from "tailwind-merge";
import { SPRING_SETTINGS } from "../constants";
import { Message } from "../types";

export type UserInputProps = {};

export const UserInput: React.FC<UserInputProps> = () => {
  const [isOpen] = useAtom(isWidgetOpenAtom);
  const [inputText, setInputText] = useAtom(inputTextAtom);
  const [_, setCurrentSession] = useAtom(currentSessionAtom);

  const isSendDisabled = !inputText.trim();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSendDisabled) {
      setCurrentSession((prev) => {
        const newMessage: Message = { from: "user", content: inputText };
        // TODO remove mock message
        const newEloMessage: Message = {
          from: "elo",
          content: "I'm just some mock data.",
        };

        if (!prev)
          return {
            title: inputText,
            messages: [newMessage, newEloMessage],
            date: new Date().toISOString(),
          };
        return {
          ...prev,
          messages: [...prev.messages, newMessage, newEloMessage],
        };
      });
      setInputText("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ width: "calc(var(--spacing) * 14)", opacity: 0 }}
          animate={{ width: "calc(var(--spacing) * 96)", opacity: 1 }}
          exit={{ width: "calc(var(--spacing) * 14)", opacity: 0 }}
          transition={SPRING_SETTINGS}
          className="absolute top-0 right-0 overflow-hidden h-14 bg-primary-light rounded-full p-2"
        >
          <div className="relative size-full grid grid-cols-[1fr_auto] gap-2">
            <input
              type="text"
              className="w-full h-full rounded-full py-2 px-4 focus:outline-none"
              // TODO animate placeholder
              placeholder="I'm Elo, your financial asistant!"
              autoFocus
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <motion.button
              type="submit"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, ease: "circInOut", delay: 0.5 }}
              className={twMerge(
                "m-1 mr-1.5 p-1 bg-primary dark text-foreground rounded-full transition-opacity",
                isSendDisabled ? "opacity-50" : "cursor-pointer"
              )}
              disabled={isSendDisabled}
            >
              <SendIcon className="size-6" />
            </motion.button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
};
