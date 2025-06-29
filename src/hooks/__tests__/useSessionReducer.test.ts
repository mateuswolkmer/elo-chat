import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { Provider } from "jotai";
import { useSessionReducer } from "../useSessionReducer";
import { UIMessage } from "ai";

describe("useSessionReducer", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with empty state for new email", () => {
    const { result } = renderHook(() => useSessionReducer("test@example.com"), {
      wrapper: Provider,
    });

    expect(result.current.allUserSessions).toEqual({});
    expect(result.current.currentSession).toBeNull();
    expect(typeof result.current.sessionDispatch).toBe("function");
  });

  it("should add a message and create a new session", () => {
    const { result } = renderHook(() => useSessionReducer("test@example.com"), {
      wrapper: Provider,
    });

    const userMessage: UIMessage = {
      role: "user",
      parts: [{ type: "text", text: "Hello" }],
      id: "1",
    };

    act(() => {
      result.current.sessionDispatch({
        type: "ADD_MESSAGE",
        message: userMessage,
      });
    });

    // Should have a current session
    expect(result.current.currentSession).not.toBeNull();
    expect(result.current.currentSession?.messages).toHaveLength(1);
    expect(result.current.currentSession?.messages[0]).toEqual(userMessage);

    // Should have the session in allUserSessions
    expect(result.current.allUserSessions["test@example.com"]).toHaveLength(1);
    expect(
      result.current.allUserSessions["test@example.com"][0].messages
    ).toHaveLength(1);
  });

  it("should add a message to existing session", () => {
    const { result } = renderHook(() => useSessionReducer("test@example.com"), {
      wrapper: Provider,
    });

    const userMessage: UIMessage = {
      role: "user",
      parts: [{ type: "text", text: "Hello" }],
      id: "1",
    };

    const assistantMessage: UIMessage = {
      role: "assistant",
      parts: [{ type: "text", text: "Hi there!" }],
      id: "2",
    };

    // Add first message
    act(() => {
      result.current.sessionDispatch({
        type: "ADD_MESSAGE",
        message: userMessage,
      });
    });

    // Add second message
    act(() => {
      result.current.sessionDispatch({
        type: "ADD_MESSAGE",
        message: assistantMessage,
      });
    });

    // Should have both messages in current session
    expect(result.current.currentSession?.messages).toHaveLength(2);
    expect(result.current.currentSession?.messages[0]).toEqual(userMessage);
    expect(result.current.currentSession?.messages[1]).toEqual(
      assistantMessage
    );

    // Should have both messages in allUserSessions
    expect(
      result.current.allUserSessions["test@example.com"][0].messages
    ).toHaveLength(2);
  });

  it("should update the last assistant message", () => {
    const { result } = renderHook(() => useSessionReducer("test@example.com"), {
      wrapper: Provider,
    });

    const userMessage: UIMessage = {
      role: "user",
      parts: [{ type: "text", text: "Hello" }],
      id: "1",
    };

    const assistantMessage: UIMessage = {
      role: "assistant",
      parts: [{ type: "text", text: "Hi there!" }],
      id: "2",
    };

    // Add messages
    act(() => {
      result.current.sessionDispatch({
        type: "ADD_MESSAGE",
        message: userMessage,
      });
    });

    act(() => {
      result.current.sessionDispatch({
        type: "ADD_MESSAGE",
        message: assistantMessage,
      });
    });

    // Update the last message
    act(() => {
      result.current.sessionDispatch({
        type: "UPDATE_LAST_MESSAGE",
        text: "Updated response!",
      });
    });

    // Should have updated the last message
    const lastMessage = result.current.currentSession?.messages[1];
    expect(lastMessage?.parts[0]).toHaveProperty("text", "Updated response!");
    const allSessionsLastMessage =
      result.current.allUserSessions["test@example.com"][0].messages[1];
    expect(allSessionsLastMessage.parts[0]).toHaveProperty(
      "text",
      "Updated response!"
    );
  });

  it("should set a session", () => {
    const { result } = renderHook(() => useSessionReducer("test@example.com"), {
      wrapper: Provider,
    });

    const newSession = {
      title: "Test Session",
      date: "2024-01-01",
      messages: [],
    };

    act(() => {
      result.current.sessionDispatch({
        type: "SET_SESSION",
        session: newSession,
      });
    });

    expect(result.current.currentSession).toEqual(newSession);
  });

  it("should initialize user with empty array", () => {
    const { result } = renderHook(() => useSessionReducer("test@example.com"), {
      wrapper: Provider,
    });

    act(() => {
      result.current.sessionDispatch({
        type: "INITIALIZE_USER",
        email: "test@example.com",
      });
    });

    // Should have initialized with empty array
    expect(result.current.allUserSessions["test@example.com"]).toEqual([]);
  });

  it("should handle null signedInEmail gracefully", () => {
    const { result } = renderHook(() => useSessionReducer(null), {
      wrapper: Provider,
    });

    const userMessage: UIMessage = {
      role: "user",
      parts: [{ type: "text", text: "Hello" }],
      id: "1",
    };

    act(() => {
      result.current.sessionDispatch({
        type: "ADD_MESSAGE",
        message: userMessage,
      });
    });

    // Should not crash and should not add to sessions
    expect(result.current.allUserSessions).toEqual({});
  });

  it("should persist sessions in localStorage", () => {
    const { result, unmount } = renderHook(
      () => useSessionReducer("test@example.com"),
      {
        wrapper: Provider,
      }
    );

    const userMessage: UIMessage = {
      role: "user",
      parts: [{ type: "text", text: "Hello" }],
      id: "1",
    };

    act(() => {
      result.current.sessionDispatch({
        type: "ADD_MESSAGE",
        message: userMessage,
      });
    });

    // Unmount and remount
    unmount();

    const { result: newResult } = renderHook(
      () => useSessionReducer("test@example.com"),
      {
        wrapper: Provider,
      }
    );

    // Should still have the session persisted
    expect(newResult.current.allUserSessions["test@example.com"]).toHaveLength(
      1
    );
  });

  it("should save current session when user logs in", () => {
    // First, create a session while logged out
    const { result: loggedOutResult } = renderHook(
      () => useSessionReducer(null),
      {
        wrapper: Provider,
      }
    );

    const userMessage: UIMessage = {
      role: "user",
      parts: [{ type: "text", text: "Hello" }],
      id: "1",
    };

    // Add a message while logged out
    act(() => {
      loggedOutResult.current.sessionDispatch({
        type: "ADD_MESSAGE",
        message: userMessage,
      });
    });

    // Should have a current session but no user sessions
    expect(loggedOutResult.current.currentSession).not.toBeNull();
    expect(loggedOutResult.current.allUserSessions).toEqual({});

    // Now log in with a new email
    const { result: loggedInResult } = renderHook(
      () => useSessionReducer("newuser@example.com"),
      {
        wrapper: Provider,
      }
    );

    // Login with the current session
    act(() => {
      loggedInResult.current.sessionDispatch({
        type: "LOGIN_USER",
        email: "newuser@example.com",
        currentSession: loggedOutResult.current.currentSession,
      });
    });

    // Should have saved the session for the new user
    expect(
      loggedInResult.current.allUserSessions["newuser@example.com"]
    ).toHaveLength(1);
    expect(
      loggedInResult.current.allUserSessions["newuser@example.com"][0].messages
    ).toHaveLength(1);
    expect(loggedInResult.current.currentSession).toEqual(
      loggedOutResult.current.currentSession
    );
  });

  it("should not save empty session when user logs in", () => {
    const { result } = renderHook(() => useSessionReducer("test@example.com"), {
      wrapper: Provider,
    });

    // Try to login with no current session
    act(() => {
      result.current.sessionDispatch({
        type: "LOGIN_USER",
        email: "test@example.com",
        currentSession: null,
      });
    });

    // Should not have created any sessions
    expect(result.current.allUserSessions["test@example.com"]).toBeUndefined();
  });

  it("should rename 'New Session' to first message content", () => {
    const { result } = renderHook(() => useSessionReducer("test@example.com"), {
      wrapper: Provider,
    });

    // Create a new session
    const newSession = {
      title: "New Session",
      date: new Date().toISOString(),
      messages: [],
    };

    act(() => {
      result.current.sessionDispatch({
        type: "SET_SESSION",
        session: newSession,
      });
    });

    // Add a message to the new session
    const userMessage: UIMessage = {
      role: "user",
      parts: [{ type: "text", text: "Hello, this is my first message" }],
      id: "1",
    };

    act(() => {
      result.current.sessionDispatch({
        type: "ADD_MESSAGE",
        message: userMessage,
      });
    });

    // The session title should be renamed to the message content
    expect(result.current.currentSession?.title).toBe(
      "Hello, this is my first message"
    );

    // The session in allUserSessions should also be renamed
    const userSessions = result.current.allUserSessions["test@example.com"];
    expect(userSessions[userSessions.length - 1].title).toBe(
      "Hello, this is my first message"
    );
  });

  it("should not rename session if title is not 'New Session'", () => {
    const { result } = renderHook(() => useSessionReducer("test@example.com"), {
      wrapper: Provider,
    });

    // Create a session with a custom title
    const customSession = {
      title: "Custom Session",
      date: new Date().toISOString(),
      messages: [],
    };

    act(() => {
      result.current.sessionDispatch({
        type: "SET_SESSION",
        session: customSession,
      });
    });

    // Add a message to the session
    const userMessage: UIMessage = {
      role: "user",
      parts: [{ type: "text", text: "Hello, this is my first message" }],
      id: "1",
    };

    act(() => {
      result.current.sessionDispatch({
        type: "ADD_MESSAGE",
        message: userMessage,
      });
    });

    // The session title should remain unchanged
    expect(result.current.currentSession?.title).toBe("Custom Session");
  });
});
