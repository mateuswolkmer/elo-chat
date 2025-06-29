import React, { useEffect, useState } from "react";
import {
  shouldShowEmailInputAtom,
  signedInEmailAtom,
  currentSessionAtom,
} from "../atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { SPRING_SETTINGS } from "../constants";
import { twMerge } from "tailwind-merge";
import { SignInIcon } from "./icons/SignInIcon";
import { validateEmail } from "../utils/emailValidation";
import { useSessionReducer } from "../hooks/useSessionReducer";

export type EmailInputProps = {};

export const EmailInput: React.FC<EmailInputProps> = () => {
  const showEmailInput = useAtomValue(shouldShowEmailInputAtom);
  const setSignedInEmail = useSetAtom(signedInEmailAtom);
  const currentSession = useAtomValue(currentSessionAtom);

  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    error?: string;
  }>({ isValid: false });

  const { sessionDispatch } = useSessionReducer(email);

  useEffect(() => {
    setIsExpanded(isFocused || Boolean(email));
  }, [isFocused, email]);

  useEffect(() => {
    setValidationResult(validateEmail(email));
  }, [email]);

  const isSendDisabled = !email.trim() || !validationResult.isValid;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSendDisabled) {
      setEmail("");
      setSignedInEmail(email);

      // If there's a current session with messages, save it for the new user
      if (currentSession && currentSession.messages.length > 0) {
        sessionDispatch({ type: "LOGIN_USER", email, currentSession });
      } else {
        sessionDispatch({ type: "INITIALIZE_USER", email });
      }
    }
  };

  return (
    <AnimatePresence>
      {showEmailInput && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: isFocused || isHovered ? 1 : 0.5,
            right: isExpanded ? "calc(var(--spacing) * 2.5)" : "0rem",
            width: isExpanded
              ? "calc(var(--spacing) * 60)"
              : "calc(var(--spacing) * 36)",
          }}
          exit={{
            scale: 0,
            opacity: 0,
            transition: {
              delay: 0,
            },
          }}
          transition={{
            scale: {
              ...SPRING_SETTINGS,
              delay: 0.5,
            },
            opacity: {
              ...SPRING_SETTINGS,
              // delay: 0.5,
            },
            right: { ...SPRING_SETTINGS, damping: 20 },
            width: { ...SPRING_SETTINGS, duration: 0.1 },
          }}
          style={{
            transformOrigin: "bottom right",
          }}
          className={twMerge(
            "absolute bottom-20 h-10 bg-primary-light rounded-full p-1"
          )}
        >
          <div className="relative size-full grid grid-cols-[1fr_auto] gap-2 items-center">
            <input
              type="email"
              className={twMerge(
                "w-full h-full rounded-full py-2 pl-4 focus:outline-none text-sm col-start-1 row-start-1 placeholder:text-foreground/25",
                !isExpanded && "col-span-2 z-1"
              )}
              placeholder="test@email.com"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <AnimatePresence>
              {isExpanded && (
                <motion.button
                  type="submit"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={SPRING_SETTINGS}
                  className={twMerge(
                    "m-1 p-1 rounded-full row-start-1 col-start-2 transition-colors",
                    isSendDisabled
                      ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                      : "bg-primary dark text-foreground cursor-pointer"
                  )}
                  disabled={isSendDisabled}
                  title={validationResult.error}
                >
                  <SignInIcon className="size-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
};
