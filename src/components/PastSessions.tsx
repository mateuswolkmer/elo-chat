import React from "react";
import {
  userSessionsAtom,
  shouldShowPastSessionsAtom,
  signedInEmailAtom,
  isPastSessionsOpenAtom,
  currentSessionAtom,
} from "../atoms";
import { useAtom } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { CollapseIcon } from "./icons/CollapseIcon";
import { SPRING_SETTINGS } from "../constants";
import { SignOutIcon } from "./icons/SignOutIcon";
import { twMerge } from "tailwind-merge";

export type PastSessionsProps = {};

export const PastSessions: React.FC<PastSessionsProps> = () => {
  const [sessions] = useAtom(userSessionsAtom);
  const [currentSession, setCurrentSession] = useAtom(currentSessionAtom);
  const [showPastSessions] = useAtom(shouldShowPastSessionsAtom);
  const [_, setSignedInEmail] = useAtom(signedInEmailAtom);

  const [isOpen, setIsOpen] = useAtom(isPastSessionsOpenAtom);

  const handleSelectSession = (sessionIndex: number) => {
    setCurrentSession(sessions[sessionIndex]);
    setIsOpen(false);
  };

  const handleSignOut = () => {
    setSignedInEmail(null);
    setCurrentSession(null);
  };

  return (
    <AnimatePresence>
      {showPastSessions && (
        <>
          {!isOpen && (
            <motion.div
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0,
                opacity: 0,
              }}
              transition={SPRING_SETTINGS}
              style={{
                transformOrigin: "bottom right",
              }}
              className="absolute bottom-20 right-0 flex gap-2"
            >
              {/* Sign out button */}
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  ...SPRING_SETTINGS,
                  delay: 0.5,
                }}
                className="text-nowrap h-10 rounded-full bg-primary p-2 dark text-foreground"
                onClick={handleSignOut}
              >
                <SignOutIcon className="size-6" />
              </motion.button>
              {/* Sessions button */}
              <button
                className="text-nowrap h-10 rounded-full bg-primary py-2 px-4 dark text-foreground"
                onClick={() => setIsOpen(true)}
              >
                Past sessions
              </button>
            </motion.div>
          )}
          {/* Sessions list */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{
                  scale: 0,
                  opacity: 0,
                  transformOrigin: "bottom right",
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 35,
                  duration: 0.3,
                }}
                className="absolute bottom-20 right-0 w-60 py-2 bg-primary dark text-foreground rounded-3xl overflow-hidden"
              >
                <motion.div
                  className="flex flex-col size-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="relative">
                    <motion.h2
                      className="font-bold text-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                    >
                      Past sessions
                    </motion.h2>
                    <button
                      className="absolute top-0 right-2 cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setIsOpen(false)}
                    >
                      <CollapseIcon className="size-6" />
                    </button>
                  </div>
                  <div className="w-full h-px bg-foreground/15 mt-1"></div>
                  {!sessions?.length && (
                    <p className="text-sm py-4 text-center">No sessions yet</p>
                  )}
                  {sessions?.map((session, i) => {
                    const isActive = currentSession?.title === session.title;

                    return (
                      <motion.div
                        key={session.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        className="flex flex-col rounded-lg w-full"
                      >
                        {i > 0 && (
                          <div className="w-full h-px bg-foreground/15 mx-2"></div>
                        )}
                        <button
                          className={twMerge(
                            "flex flex-col items-start w-full px-4 py-2 transition-colors cursor-pointer",
                            isActive ? "bg-info/50" : "hover:bg-info/25 "
                          )}
                          title={session.title}
                          onClick={() => handleSelectSession(i)}
                        >
                          <h3 className="text-md truncate w-full">
                            {session.title}
                          </h3>
                          <span className="text-foreground/50 text-xs">
                            {new Date(session.date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}{" "}
                            {isActive && "• Active"}
                          </span>
                        </button>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};
