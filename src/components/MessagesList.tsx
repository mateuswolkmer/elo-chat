import { currentSessionAtom, shouldShowMessagesListAtom } from "../atoms";
import { useAtom } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { SPRING_SETTINGS } from "../constants";
import { twMerge } from "tailwind-merge";

export const MessagesList: React.FC = () => {
  const [currentSession] = useAtom(currentSessionAtom);
  const [shouldShow] = useAtom(shouldShowMessagesListAtom);

  return (
    <AnimatePresence>
      {shouldShow && (
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
          className="flex flex-col gap-2 absolute bottom-32 right-0 w-96"
        >
          {currentSession?.messages.map((message, i) => (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_SETTINGS }}
              key={i}
              className={twMerge(
                "max-w-80 py-2 px-4 rounded-3xl text-foreground",
                message.from === "user"
                  ? "self-end bg-primary-light"
                  : "self-start bg-primary dark"
              )}
            >
              {message.content}
            </motion.p>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
