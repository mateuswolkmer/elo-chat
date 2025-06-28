import { useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { currentSessionAtom, inputTextAtom, serviceStatusAtom } from "../atoms";
import { Message } from "../types";
import { chat } from "../api/chat";

export const useAiChat = () => {
  const isServiceOnline = useAtomValue(serviceStatusAtom) === "online";
  const [inputText, setInputText] = useAtom(inputTextAtom);
  const setCurrentSession = useSetAtom(currentSessionAtom);
  const [isLoading, setIsLoading] = useState(false);

  const isSendDisabled = !inputText.trim() || isLoading || !isServiceOnline;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSendDisabled) {
      setIsLoading(true);

      try {
        setCurrentSession((prev) => {
          const newMessage: Message = {
            from: "user",
            content: inputText,
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

        const result = await chat([
          {
            role: "user",
            parts: [{ type: "text", text: inputText }],
            id: Date.now().toString(),
          },
        ]);

        if (result) {
          setCurrentSession((prev) => {
            if (!prev) return prev;

            const aiMessage: Message = {
              from: "elo",
              content: "Thinking...",
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

              if (lastMessage && lastMessage.from === "elo") {
                lastMessage.content = fullResponse;
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

          const errorMessage: Message = {
            from: "elo",
            content: "Sorry, I encountered an error. Please try again.",
          };

          return {
            ...prev,
            messages: [...prev.messages, errorMessage],
          };
        });
      } finally {
        setIsLoading(false);
        setInputText("");
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
