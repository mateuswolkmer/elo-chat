import { useCallback } from "react";
import { useAtom } from "jotai";
import { allUserSessionsAtom, currentSessionAtom } from "../atoms";
import { Session } from "../types";
import { UIMessage } from "ai";
import { SESSIONS_MOCK } from "../constants";

type SessionActionWithoutEmail =
  | { type: "ADD_MESSAGE"; message: UIMessage }
  | { type: "UPDATE_LAST_MESSAGE"; text: string }
  | { type: "SET_SESSION"; session: Session | null }
  | { type: "INITIALIZE_USER"; email: string }
  | { type: "LOGIN_USER"; email: string; currentSession: Session | null };

const sessionReducer = (
  state: { [email: string]: Session[] },
  action: SessionActionWithoutEmail & { signedInEmail: string | null }
): { [email: string]: Session[] } => {
  switch (action.type) {
    case "ADD_MESSAGE": {
      const { message, signedInEmail } = action;
      if (!signedInEmail) return state;
      const userSessions = state[signedInEmail] || [];

      if (userSessions.length === 0) {
        const newSession: Session = {
          title:
            message.parts[0]?.type === "text"
              ? message.parts[0].text
              : "New Session",
          messages: [message],
          date: new Date().toISOString(),
        };
        return {
          ...state,
          [signedInEmail]: [newSession],
        };
      } else {
        const updatedSessions = [...userSessions];
        const lastSession = updatedSessions[updatedSessions.length - 1];

        // If this is the first message and session title is "New Session", rename it
        let newTitle = lastSession.title;
        if (
          lastSession.messages.length === 0 &&
          lastSession.title === "New Session"
        ) {
          newTitle =
            message.parts[0]?.type === "text"
              ? message.parts[0].text
              : "New Session";
        }

        updatedSessions[updatedSessions.length - 1] = {
          ...lastSession,
          title: newTitle,
          messages: [...lastSession.messages, message],
        };
        return {
          ...state,
          [signedInEmail]: updatedSessions,
        };
      }
    }
    case "UPDATE_LAST_MESSAGE": {
      const { text, signedInEmail } = action;
      if (!signedInEmail) return state;
      const userSessions = state[signedInEmail] || [];
      if (userSessions.length === 0) return state;
      const updatedSessions = [...userSessions];
      const lastSession = updatedSessions[updatedSessions.length - 1];
      const updatedMessages = [...lastSession.messages];
      const lastMessage = updatedMessages[updatedMessages.length - 1];
      if (lastMessage && lastMessage.role === "assistant") {
        lastMessage.parts = [{ type: "text", text }];
      }
      updatedSessions[updatedSessions.length - 1] = {
        ...lastSession,
        messages: updatedMessages,
      };
      return {
        ...state,
        [signedInEmail]: updatedSessions,
      };
    }
    case "SET_SESSION": {
      const { session, signedInEmail } = action;
      if (!signedInEmail) return state;
      if (!session) {
        return state;
      }
      const userSessions = state[signedInEmail] || [];
      const sessionIndex = userSessions.findIndex(
        (s) => s.title === session.title
      );
      if (sessionIndex >= 0) {
        const updatedSessions = [...userSessions];
        updatedSessions[sessionIndex] = session;
        return {
          ...state,
          [signedInEmail]: updatedSessions,
        };
      } else {
        return {
          ...state,
          [signedInEmail]: [...userSessions, session],
        };
      }
    }
    case "INITIALIZE_USER": {
      const { email } = action;
      if (!state[email]) {
        return {
          ...state,
          [email]: SESSIONS_MOCK[email] || [],
        };
      }
      return state;
    }
    case "LOGIN_USER": {
      const { email, currentSession } = action;
      if (!currentSession || currentSession.messages.length === 0) return state;

      const userSessions = state[email] || [];
      const newSession: Session = {
        ...currentSession,
        date: new Date().toISOString(),
      };

      return {
        ...state,
        [email]: [...userSessions, newSession],
      };
    }
    default:
      return state;
  }
};

export const useSessionReducer = (signedInEmail: string | null) => {
  const [allUserSessions, setAllUserSessions] = useAtom(allUserSessionsAtom);
  const [currentSession, setCurrentSession] = useAtom(currentSessionAtom);

  // Custom dispatch that handles both current session and all user sessions
  const sessionDispatch = useCallback(
    (action: SessionActionWithoutEmail) => {
      const fullAction = { ...action, signedInEmail };

      switch (action.type) {
        case "ADD_MESSAGE": {
          const newMessage = action.message;
          setCurrentSession((prev) => {
            if (!prev) {
              const newSession = {
                title:
                  newMessage.parts[0]?.type === "text"
                    ? newMessage.parts[0].text
                    : "New Session",
                messages: [newMessage],
                date: new Date().toISOString(),
              };
              return newSession;
            }

            // If this is the first message and session title is "New Session", rename it
            let newTitle = prev.title;
            if (prev.messages.length === 0 && prev.title === "New Session") {
              newTitle =
                newMessage.parts[0]?.type === "text"
                  ? newMessage.parts[0].text
                  : "New Session";
            }

            return {
              ...prev,
              title: newTitle,
              messages: [...prev.messages, newMessage],
            };
          });
          break;
        }
        case "UPDATE_LAST_MESSAGE": {
          const text = action.text;
          setCurrentSession((prev) => {
            if (!prev) return prev;
            const updatedMessages = [...prev.messages];
            const lastMessage = updatedMessages[updatedMessages.length - 1];
            if (lastMessage && lastMessage.role === "assistant") {
              lastMessage.parts = [{ type: "text", text }];
            }
            return {
              ...prev,
              messages: updatedMessages,
            };
          });
          break;
        }
        case "SET_SESSION": {
          setCurrentSession(action.session);
          break;
        }
        case "LOGIN_USER": {
          const { currentSession } = action;
          setCurrentSession(currentSession);
          break;
        }
      }

      // Update all user sessions
      setAllUserSessions((prev) => sessionReducer(prev, fullAction));
    },
    [setAllUserSessions, setCurrentSession, signedInEmail]
  );

  return {
    allUserSessions,
    currentSession,
    sessionDispatch,
  };
};
