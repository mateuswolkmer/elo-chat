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
            right: isExpanded ? "0.625rem" : "0rem",
            width: isExpanded ? "15rem" : "9rem",
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
            "elo:absolute elo:bottom-20 elo:h-10 elo:bg-primary-light elo:rounded-full elo:p-1"
          )}
        >
          <div className="elo:relative elo:size-full elo:grid elo:grid-cols-[1fr_auto] elo:gap-2 elo:items-center">
            <input
              type="email"
              className={twMerge(
                "elo:w-full elo:h-full elo:rounded-full elo:py-2 elo:pl-4 elo:focus:outline-none elo:text-sm elo:col-start-1 elo:row-start-1 elo:placeholder:text-foreground/50",
                !isExpanded && "elo:col-span-2 elo:z-1"
              )}
              placeholder="your@email.com"
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
                    "elo:m-1 elo:p-1 elo:rounded-full elo:row-start-1 elo:col-start-2 elo:transition-colors",
                    isSendDisabled
                      ? "elo:bg-gray-300 elo:text-gray-400 elo:cursor-not-allowed"
                      : "elo:bg-primary elo:text-foreground-dark elo:cursor-pointer"
                  )}
                  disabled={isSendDisabled}
                  title={validationResult.error}
                >
                  <SignInIcon className="elo:size-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
};
