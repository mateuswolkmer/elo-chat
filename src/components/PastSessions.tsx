import React from "react";
import {
  userSessionsAtom,
  shouldShowPastSessionsAtom,
  signedInEmailAtom,
  isPastSessionsOpenAtom,
} from "../atoms";
import { useAtom, useAtomValue } from "jotai";
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
  const [signedInEmail, setSignedInEmail] = useAtom(signedInEmailAtom);

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
              className="elo:absolute elo:bottom-20 elo:right-0 elo:flex elo:gap-2"
            >
              {/* Sign out button */}
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  ...SPRING_SETTINGS,
                  delay: 0.5,
                }}
                className="elo:text-nowrap elo:h-10 elo:rounded-full elo:bg-primary elo:p-2 elo:text-foreground-dark"
                onClick={handleSignOut}
              >
                <SignOutIcon className="elo:size-6" />
              </motion.button>
              {/* Sessions button */}
              <button
                className="elo:text-nowrap elo:h-10 elo:rounded-full elo:bg-primary elo:py-2 elo:px-4 elo:text-foreground-dark"
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
                className="elo:max-w-widget elo:absolute elo:bottom-20 elo:right-0 elo:w-60 elo:py-2 elo:bg-primary elo:text-foreground-dark elo:rounded-3xl elo:overflow-hidden"
              >
                <motion.div
                  className="elo:flex elo:flex-col elo:size-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="elo:relative">
                    <button
                      className="elo:absolute elo:top-0 elo:left-2 elo:cursor-pointer elo:hover:scale-105 elo:transition-transform"
                      title="New session"
                      onClick={handleNewSession}
                    >
                      <NewIcon className="elo:size-6" />
                    </button>
                    <motion.h2
                      className="elo:font-bold elo:text-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                    >
                      Sessions
                    </motion.h2>
                    <button
                      className="elo:absolute elo:top-0 elo:right-2 elo:cursor-pointer elo:hover:scale-105 elo:transition-transform"
                      onClick={() => setIsOpen(false)}
                    >
                      <CollapseIcon className="elo:size-6" />
                    </button>
                  </div>
                  <div className="elo:w-full elo:h-px elo:bg-foreground-dark/15 elo:mt-1"></div>
                  {!sessions?.length && (
                    <p className="elo:text-sm elo:py-4 elo:text-center">
                      No sessions yet
                    </p>
                  )}
                  {sessions?.map((session, i) => {
                    const isActive = currentSession?.title === session.title;

                    return (
                      <motion.div
                        key={session.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        className="elo:flex elo:flex-col elo:rounded-lg elo:w-full"
                      >
                        {i > 0 && (
                          <div className="elo:w-full elo:h-px elo:bg-foreground-dark/15 elo:mx-2"></div>
                        )}
                        <button
                          className={twMerge(
                            "elo:flex elo:flex-col elo:items-start elo:w-full elo:px-4 elo:py-2 elo:transition-colors elo:cursor-pointer elo:text-left",
                            isActive
                              ? "elo:bg-info/50"
                              : "elo:hover:bg-info/25 "
                          )}
                          title={session.title}
                          onClick={() => handleSelectSession(i)}
                        >
                          <h3 className="elo:text-md elo:truncate elo:w-full">
                            {session.title}
                          </h3>
                          <span className="elo:text-foreground-dark/50 elo:text-xs">
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
                  <span className="elo:text-center elo:text-sm elo:opacity-50 elo:mt-1">
                    {signedInEmail}
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};
