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
          initial={{ width: "3.5rem", opacity: 0 }}
          animate={{ width: "24rem", opacity: 1 }}
          exit={{ width: "3.5rem", opacity: 0 }}
          transition={SPRING_SETTINGS}
          className={twMerge(
            "elo:max-w-widget elo:absolute elo:top-0 elo:right-0 elo:overflow-hidden elo:h-14 elo:rounded-full elo:p-2",
            isServiceOnline && "elo:bg-primary-light elo:text-foreground ",
            isServiceMaintenance &&
              "elo:bg-secondary-light elo:text-foreground",
            isServiceOffline && "elo:bg-secondary elo:text-foreground-dark"
          )}
        >
          <div className="elo:relative elo:size-full elo:grid elo:grid-cols-[1fr_auto] elo:gap-2">
            <input
              type="text"
              className="elo:w-full elo:h-full elo:rounded-full elo:py-2 elo:px-4 elo:focus:outline-none elo:placeholder:text-foreground/50"
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
                  "elo:m-1 elo:mr-1.5 elo:p-1 elo:bg-primary elo:text-foreground-dark elo:rounded-full elo:transition-opacity",
                  isSendDisabled ? "elo:opacity-50" : "elo:cursor-pointer"
                )}
                disabled={isSendDisabled}
              >
                <SendIcon className="elo:size-6" />
              </motion.button>
            )}
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
};
