import React, { useRef } from "react";
import { useAtom } from "jotai";
import { useClickOutside } from "../hooks/useClickOutside";
import { isWidgetOpenAtom } from "../atoms";
import { UserInput } from "./UserInput";
import { PastSessions } from "./PastSessions";
import { EmailInput } from "./EmailInput";
import { motion } from "motion/react";
import { SPRING_SETTINGS } from "../constants";

export type EloWidgetProps = {};

export const EloWidget: React.FC<EloWidgetProps> = () => {
  const [isOpen, setIsOpen] = useAtom(isWidgetOpenAtom);
  const widgetRef = useRef<HTMLDivElement>(null);

  useClickOutside(widgetRef, () => setIsOpen(false), isOpen);

  return (
    <motion.div
      ref={widgetRef}
      initial={{ scale: 0, rotate: 90 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.05, transition: { delay: 0 } }}
      whileTap={{ rotate: isOpen ? 0 : -20 }}
      transition={{
        scale: { ...SPRING_SETTINGS, delay: 0.5 },
        rotate: { ...SPRING_SETTINGS },
      }}
      className="absolute bottom-10 right-10 text-foreground"
      onClick={() => setIsOpen(true)}
    >
      <svg
        width="65"
        height="71"
        viewBox="0 0 37 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer"
      >
        <path
          className="fill-primary-light"
          d="M19.6436 7.65217C13.2225 7.65217 8.16525 12.8269 8.16525 19.1304C8.16525 26.5824 14.1045 32.5217 21.5567 32.5217V40.1739C9.87825 40.1739 0.513123 30.8086 0.513123 19.1304C0.513123 8.65771 8.93955 0 19.6436 0C29.4318 0 36.861 7.48766 36.861 17.2174C36.861 25.795 30.1248 32.5217 21.5567 32.5217V24.8696C25.9015 24.8696 29.2088 21.5659 29.2088 17.2174C29.2088 11.6978 25.1896 7.65217 19.6436 7.65217Z"
        />
        <path
          className="fill-primary"
          d="M19.6436 7.65217C13.2225 7.65217 8.16525 12.8269 8.16525 19.1304C8.16525 26.5824 14.1045 32.5217 21.5567 32.5217V24.8696C25.9015 24.8696 29.2088 21.5659 29.2088 17.2174C29.2088 11.6978 25.1896 7.65217 19.6436 7.65217Z"
        />
      </svg>
      {/* TODO: add animated waves */}

      <UserInput />
      <EmailInput />
      <PastSessions />
    </motion.div>
  );
};
