import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useRef } from "react";
import { useClickOutside } from "../useClickOutside";

describe("useClickOutside", () => {
  let mockHandler: ReturnType<typeof vi.fn>;
  let mockRef: React.RefObject<HTMLDivElement>;

  beforeEach(() => {
    mockHandler = vi.fn();
    mockRef = { current: document.createElement("div") };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call handler when clicking outside the element", () => {
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(mockRef.current);
      useClickOutside(ref, mockHandler);
      return ref;
    });

    // Simulate click outside
    const outsideElement = document.createElement("button");
    document.body.appendChild(outsideElement);

    const clickEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });
    outsideElement.dispatchEvent(clickEvent);

    expect(mockHandler).toHaveBeenCalledTimes(1);

    document.body.removeChild(outsideElement);
  });

  it("should not call handler when clicking inside the element", () => {
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(mockRef.current);
      useClickOutside(ref, mockHandler);
      return ref;
    });

    // Simulate click inside
    const clickEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });
    mockRef.current!.dispatchEvent(clickEvent);

    expect(mockHandler).not.toHaveBeenCalled();
  });

  it("should not call handler when ref.current is null", () => {
    const nullRef = { current: null };

    renderHook(() => {
      const ref = useRef<HTMLDivElement | null>(nullRef.current);
      useClickOutside(ref, mockHandler);
      return ref;
    });

    // Simulate click outside
    const outsideElement = document.createElement("button");
    document.body.appendChild(outsideElement);

    const clickEvent = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });
    outsideElement.dispatchEvent(clickEvent);

    expect(mockHandler).not.toHaveBeenCalled();

    document.body.removeChild(outsideElement);
  });

  it("should not add event listener when enabled is false", () => {
    const addEventListenerSpy = vi.spyOn(document, "addEventListener");

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(mockRef.current);
      useClickOutside(ref, mockHandler, false);
      return ref;
    });

    expect(addEventListenerSpy).not.toHaveBeenCalled();

    addEventListenerSpy.mockRestore();
  });

  it("should add event listener when enabled is true", () => {
    const addEventListenerSpy = vi.spyOn(document, "addEventListener");

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(mockRef.current);
      useClickOutside(ref, mockHandler, true);
      return ref;
    });

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );

    addEventListenerSpy.mockRestore();
  });

  it("should remove event listener on cleanup", () => {
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(mockRef.current);
      useClickOutside(ref, mockHandler);
      return ref;
    });

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });

  it("should handle multiple clicks correctly", () => {
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(mockRef.current);
      useClickOutside(ref, mockHandler);
      return ref;
    });

    // Simulate multiple clicks outside
    const outsideElement1 = document.createElement("button");
    const outsideElement2 = document.createElement("button");
    document.body.appendChild(outsideElement1);
    document.body.appendChild(outsideElement2);

    const clickEvent1 = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });
    const clickEvent2 = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });

    outsideElement1.dispatchEvent(clickEvent1);
    outsideElement2.dispatchEvent(clickEvent2);

    expect(mockHandler).toHaveBeenCalledTimes(2);

    document.body.removeChild(outsideElement1);
    document.body.removeChild(outsideElement2);
  });
});
