import { useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  inputTextAtom,
  isPastSessionsOpenAtom,
  serviceStatusAtom,
  signedInEmailAtom,
} from "../atoms";
import { chat } from "../api/chat";
import { UIMessage } from "ai";
import { THINKING_MESSAGE } from "../constants";
import { useSessionReducer } from "./useSessionReducer";

export const useAiChat = () => {
  const isServiceOnline = useAtomValue(serviceStatusAtom) === "online";
  const [inputText, setInputText] = useAtom(inputTextAtom);
  const signedInEmail = useAtomValue(signedInEmailAtom);
  const [isLoading, setIsLoading] = useState(false);
  const setIsPastSessionsOpen = useSetAtom(isPastSessionsOpenAtom);

  const { sessionDispatch } = useSessionReducer(signedInEmail);

  const isSendDisabled = !inputText.trim() || isLoading || !isServiceOnline;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSendDisabled) {
      setIsLoading(true);
      setInputText("");
      setIsPastSessionsOpen(false);

      try {
        // Add the new user message to the session
        const newUserMessage: UIMessage = {
          role: "user",
          parts: [{ type: "text", text: inputText }],
          id: Date.now().toString(),
        };

        sessionDispatch({ type: "ADD_MESSAGE", message: newUserMessage });

        const existingMessages: UIMessage[] = [];

        const allMessages = [...existingMessages, newUserMessage];

        const result = await chat(allMessages);

        if (result) {
          const aiMessage: UIMessage = {
            role: "assistant",
            parts: [{ type: "text", text: THINKING_MESSAGE }],
            id: Date.now().toString() + "-ai",
          };

          sessionDispatch({ type: "ADD_MESSAGE", message: aiMessage });

          // Stream the AI response
          let fullResponse = "";
          for await (const chunk of result.textStream) {
            fullResponse += chunk;
            sessionDispatch({
              type: "UPDATE_LAST_MESSAGE",
              text: fullResponse,
            });
          }
        }
      } catch (error) {
        console.error("Chat error:", error);

        // Add error message to session
        const errorMessage: UIMessage = {
          role: "assistant",
          parts: [
            {
              type: "text",
              text: "Sorry, I encountered an error. Please try again.",
            },
          ],
          id: Date.now().toString() + "-error",
        };

        sessionDispatch({ type: "ADD_MESSAGE", message: errorMessage });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    inputText,
    setInputText,
    isLoading,
    isSendDisabled,
    handleSubmit,
  };
};
