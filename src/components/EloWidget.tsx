import React, { useEffect, useRef } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useClickOutside } from "../hooks/useClickOutside";
import {
  isPastSessionsOpenAtom,
  isWidgetOpenAtom,
  serviceStatusAtom,
} from "../atoms";
import { UserInput } from "./UserInput";
import { PastSessions } from "./PastSessions";
import { EmailInput } from "./EmailInput";
import { HTMLMotionProps, motion } from "motion/react";
import { SPRING_SETTINGS } from "../constants";
import { MessagesList } from "./MessagesList";
import { initGoogle } from "../api/chat";
import { twMerge } from "tailwind-merge";
import { DevTools } from "./DevTools";

export type EloWidgetProps = HTMLMotionProps<"div"> & {
  googleApiKey?: string;
  googleModelId?: string;
  enableDevTools?: boolean;
};

export const EloWidget: React.FC<EloWidgetProps> = (props) => {
  const {
    googleApiKey,
    googleModelId = "gemini-2.5-flash",
    enableDevTools = true,
    className,
    ...rest
  } = props;

  const isServiceOnline = useAtomValue(serviceStatusAtom) === "online";
  const isServiceMaintenance =
    useAtomValue(serviceStatusAtom) === "maintenance";
  const isServiceOffline = useAtomValue(serviceStatusAtom) === "offline";

  const [isOpen, setIsOpen] = useAtom(isWidgetOpenAtom);
  const setIsPastSessionsOpen = useSetAtom(isPastSessionsOpenAtom);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (googleApiKey) {
      initGoogle({ apiKey: googleApiKey, modelId: googleModelId });
    }
  }, [googleApiKey]);

  const handleClose = () => {
    setIsOpen(false);
    setIsPastSessionsOpen(false);
  };

  useClickOutside(widgetRef, handleClose, isOpen);

  return (
    <>
      <motion.div
        ref={widgetRef}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05, transition: { delay: 0 } }}
        transition={{
          ...SPRING_SETTINGS,
          delay: 0.5,
        }}
        className={twMerge(
          "elo:fixed elo:bottom-4 elo:right-4 elo:lg:bottom-10 elo:lg:right-10 elo:text-foreground elo:z-50 elo:group",
          className
        )}
        onClick={() => setIsOpen(true)}
        {...rest}
      >
        <svg
          width="65"
          height="71"
          viewBox="0 0 37 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="elo:cursor-pointer"
        >
          <defs>
            <clipPath id="elo-clip">
              <path
                d="M19.6436 7.65217C13.2225 7.65217 8.16525 12.8269 8.16525 19.1304C8.16525 26.5824 14.1045 32.5217 21.5567 32.5217V24.8696C25.9015 24.8696 29.2088 21.5659 29.2088 17.2174C29.2088 11.6978 25.1896 7.65217 19.6436 7.65217Z"
                transform="scale(1.75)"
              />
            </clipPath>
          </defs>
          <path
            className={twMerge(
              "elo:transition-all",
              isServiceOnline && "elo:fill-primary-light",
              isServiceMaintenance && "elo:fill-secondary-light",
              isServiceOffline && "elo:fill-secondary"
            )}
            d="M19.6436 7.65217C13.2225 7.65217 8.16525 12.8269 8.16525 19.1304C8.16525 26.5824 14.1045 32.5217 21.5567 32.5217V40.1739C9.87825 40.1739 0.513123 30.8086 0.513123 19.1304C0.513123 8.65771 8.93955 0 19.6436 0C29.4318 0 36.861 7.48766 36.861 17.2174C36.861 25.795 30.1248 32.5217 21.5567 32.5217V24.8696C25.9015 24.8696 29.2088 21.5659 29.2088 17.2174C29.2088 11.6978 25.1896 7.65217 19.6436 7.65217Z"
          />
          <path
            className={twMerge(
              "elo:transition-all",
              isServiceOnline && "elo:fill-primary",
              isServiceMaintenance && "elo:fill-secondary",
              isServiceOffline && "elo:fill-secondary"
            )}
            d="M19.6436 7.65217C13.2225 7.65217 8.16525 12.8269 8.16525 19.1304C8.16525 26.5824 14.1045 32.5217 21.5567 32.5217V24.8696C25.9015 24.8696 29.2088 21.5659 29.2088 17.2174C29.2088 11.6978 25.1896 7.65217 19.6436 7.65217Z"
          />
        </svg>
        <div
          className="elo:absolute elo:inset-0 elo:size-full elo:overflow-hidden elo:pointer-events-none"
          style={{
            clipPath: "url(#elo-clip)",
            WebkitClipPath: "url(#elo-clip)",
          }}
        >
          <div
            className={twMerge(
              "elo:absolute elo:right-4 elo:rounded-3xl elo:size-full elo:bg-gradient-to-bl elo:to-background/10 elo:opacity-25 elo:group-hover:opacity-100 elo:transition-all elo:duration-1000",
              isServiceOnline &&
                "elo:from-secondary/50 elo:top-6 elo:animate-[spin_10s_linear_infinite] ",
              isServiceMaintenance &&
                "elo:from-secondary-light/50 elo:top-8 elo:animate-[spin_20s_linear_infinite] ",
              isServiceOffline && "elo:from-secondary-light/50 elo:top-10"
            )}
          />
          <div
            className={twMerge(
              "elo:absolute elo:left-4 elo:rounded-3xl elo:size-full elo:bg-gradient-to-br elo:to-background/10 elo:opacity-25 elo:group-hover:opacity-100 elo:transition-all elo:duration-1000",
              isServiceOnline &&
                "elo:from-secondary elo:top-6 elo:animate-[spin_5s_linear_infinite]",
              isServiceMaintenance &&
                "elo:from-secondary-light elo:top-8 elo:animate-[spin_15s_linear_infinite]",
              isServiceOffline && "elo:from-secondary-light elo:top-10"
            )}
          />
        </div>

        <UserInput />
        {isServiceOnline && <EmailInput />}
        {isServiceOnline && <PastSessions />}
        {isServiceOnline && <MessagesList />}
      </motion.div>

      {Boolean(enableDevTools) && <DevTools />}
    </>
  );
};
