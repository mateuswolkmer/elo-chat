import React from "react";
import {
  userSessionsAtom,
  shouldShowPastSessionsAtom,
  signedInEmailAtom,
  isPastSessionsOpenAtom,
} from "../atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { CollapseIcon } from "./icons/CollapseIcon";
import { SPRING_SETTINGS } from "../constants";
import { SignOutIcon } from "./icons/SignOutIcon";
import { twMerge } from "tailwind-merge";
import { useSessionReducer } from "../hooks/useSessionReducer";
import { NewIcon } from "./icons/NewIcon";

export type PastSessionsProps = {};

export const PastSessions: React.FC<PastSessionsProps> = () => {
  const sessions = useAtomValue(userSessionsAtom);
  const showPastSessions = useAtomValue(shouldShowPastSessionsAtom);
  const setSignedInEmail = useSetAtom(signedInEmailAtom);
  const signedInEmail = useAtomValue(signedInEmailAtom);

  const [isOpen, setIsOpen] = useAtom(isPastSessionsOpenAtom);
  const { currentSession, sessionDispatch } = useSessionReducer(signedInEmail);

  const handleSelectSession = (sessionIndex: number) => {
    sessionDispatch({ type: "SET_SESSION", session: sessions[sessionIndex] });
    setIsOpen(false);
  };

  const handleSignOut = () => {
    setSignedInEmail(null);
    sessionDispatch({ type: "SET_SESSION", session: null });
  };

  const handleNewSession = () => {
    const newSession = {
      title: "New Session",
      date: new Date().toISOString(),
      messages: [],
    };

    sessionDispatch({ type: "SET_SESSION", session: newSession });
    setIsOpen(false);
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
                Sessions
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
                    <button
                      className="absolute top-0 left-2 cursor-pointer hover:scale-105 transition-transform"
                      title="New session"
                      onClick={handleNewSession}
                    >
                      <NewIcon className="size-6" />
                    </button>
                    <motion.h2
                      className="font-bold text-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                    >
                      Sessions
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
                            "flex flex-col items-start w-full px-4 py-2 transition-colors cursor-pointer text-left",
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
