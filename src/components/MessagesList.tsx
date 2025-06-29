import { currentSessionAtom, shouldShowMessagesListAtom } from "../atoms";
import { useAtomValue } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { SPRING_SETTINGS, THINKING_MESSAGE } from "../constants";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef } from "react";

export const MessagesList: React.FC = () => {
  const currentSession = useAtomValue(currentSessionAtom);
  const shouldShow = useAtomValue(shouldShowMessagesListAtom);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [currentSession?.messages, shouldShow]);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          ref={containerRef}
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
          className="max-w-widget flex flex-col gap-2 absolute bottom-40 right-0 w-96 max-h-[50vh] rounded-lg"
          // without this, it always adds a scrollbar during animationx
          onAnimationComplete={() => {
            if (containerRef.current) {
              containerRef.current.style.overflowY = "auto";
            }
          }}
          onAnimationStart={() => {
            if (containerRef.current) {
              containerRef.current.style.overflowY = "hidden";
            }
          }}
        >
          {currentSession?.messages.map((message, i) => {
            const messageText = message.parts.find(
              (part) => part.type === "text"
            )?.text;

            if (!messageText) return null;

            const isAssistant = message.role === "assistant";
            const isThinking = messageText === THINKING_MESSAGE && isAssistant;

            return (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...SPRING_SETTINGS,
                  // delay: isAssistant ? 1 : 0,
                }}
                key={i}
                className={twMerge(
                  "max-w-80 py-2 px-4 rounded-3xl text-foreground",
                  message.role === "user"
                    ? "self-end bg-primary-light"
                    : "self-start bg-primary dark"
                )}
              >
                <span className={twMerge(isThinking && "animate-pulse")}>
                  {!isAssistant
                    ? messageText
                    : messageText.split("").map((letter, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.1, delay: index * 0.005 }}
                        >
                          {letter}
                        </motion.span>
                      ))}
                </span>
              </motion.p>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
