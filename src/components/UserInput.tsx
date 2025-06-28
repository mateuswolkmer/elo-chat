import React from "react";
import { isWidgetOpenAtom, serviceStatusAtom } from "../atoms";
import { useAtomValue } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { SendIcon } from "./icons/SendIcon";
import { twMerge } from "tailwind-merge";
import { SERVICE_STATUS, SPRING_SETTINGS } from "../constants";
import { useAiChat } from "../hooks/useAiChat";

export type UserInputProps = {};

export const UserInput: React.FC<UserInputProps> = () => {
  const isOpen = useAtomValue(isWidgetOpenAtom);

  const serviceStatus = useAtomValue(serviceStatusAtom);
  const isServiceOnline = serviceStatus === "online";
  const isServiceMaintenance = serviceStatus === "maintenance";
  const isServiceOffline = serviceStatus === "offline";

  const { inputText, setInputText, isLoading, isSendDisabled, handleSubmit } =
    useAiChat();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ width: "calc(var(--spacing) * 14)", opacity: 0 }}
          animate={{ width: "calc(var(--spacing) * 96)", opacity: 1 }}
          exit={{ width: "calc(var(--spacing) * 14)", opacity: 0 }}
          transition={SPRING_SETTINGS}
          className={twMerge(
            "absolute top-0 right-0 overflow-hidden h-14 rounded-full p-2",
            isServiceOnline && "bg-primary-light",
            isServiceMaintenance && "bg-secondary-light",
            isServiceOffline && "bg-secondary dark"
          )}
        >
          <div className="relative size-full grid grid-cols-[1fr_auto] gap-2">
            <input
              type="text"
              className="w-full h-full rounded-full py-2 px-4 focus:outline-none placeholder:text-foreground/25"
              placeholder={SERVICE_STATUS[serviceStatus].inputPlaceholder}
              autoFocus
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading || !isServiceOnline}
            />
            {isServiceOnline && (
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
            )}
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
};
