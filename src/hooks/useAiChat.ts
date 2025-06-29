import { useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  currentSessionAtom,
  inputTextAtom,
  isPastSessionsOpenAtom,
  serviceStatusAtom,
} from "../atoms";
import { chat } from "../api/chat";
import { UIMessage } from "ai";
import { THINKING_MESSAGE } from "../constants";

export const useAiChat = () => {
  const isServiceOnline = useAtomValue(serviceStatusAtom) === "online";
  const [inputText, setInputText] = useAtom(inputTextAtom);
  const [currentSession, setCurrentSession] = useAtom(currentSessionAtom);
  const [isLoading, setIsLoading] = useState(false);
  const setIsPastSessionsOpen = useSetAtom(isPastSessionsOpenAtom);

  const isSendDisabled = !inputText.trim() || isLoading || !isServiceOnline;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSendDisabled) {
      setIsLoading(true);
      setInputText("");
      setIsPastSessionsOpen(false);

      try {
        // Use existing session messages as UIMessage[]
        const existingMessages: UIMessage[] = currentSession?.messages || [];

        // Add the new user message to the session
        setCurrentSession((prev) => {
          const newMessage: UIMessage = {
            role: "user",
            parts: [{ type: "text", text: inputText }],
            id: Date.now().toString(),
          };

          if (!prev)
            return {
              title: inputText,
              messages: [newMessage],
              date: new Date().toISOString(),
            };
          return {
            ...prev,
            messages: [...prev.messages, newMessage],
          };
        });

        // Add the new user message to the messages array for the API call
        const newUserMessage: UIMessage = {
          role: "user",
          parts: [{ type: "text", text: inputText }],
          id: Date.now().toString(),
        };

        const allMessages = [...existingMessages, newUserMessage];

        const result = await chat(allMessages);

        if (result) {
          setCurrentSession((prev) => {
            if (!prev) return prev;

            const aiMessage: UIMessage = {
              role: "assistant",
              parts: [{ type: "text", text: THINKING_MESSAGE }],
              id: Date.now().toString() + "-ai",
            };

            return {
              ...prev,
              messages: [...prev.messages, aiMessage],
            };
          });

          // Stream the AI response
          let fullResponse = "";
          for await (const chunk of result.textStream) {
            fullResponse += chunk;

            setCurrentSession((prev) => {
              if (!prev) return prev;

              const updatedMessages = [...prev.messages];
              const lastMessage = updatedMessages[updatedMessages.length - 1];

              if (lastMessage && lastMessage.role === "assistant") {
                lastMessage.parts = [{ type: "text", text: fullResponse }];
              }

              return {
                ...prev,
                messages: updatedMessages,
              };
            });
          }
        }
      } catch (error) {
        console.error("Chat error:", error);

        // Add error message to session
        setCurrentSession((prev) => {
          if (!prev) return prev;

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

          return {
            ...prev,
            messages: [...prev.messages, errorMessage],
          };
        });
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
