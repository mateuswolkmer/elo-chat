import React, { useRef } from "react";
import { useAtom } from "jotai";
import { useClickOutside } from "../hooks/useClickOutside";
import { isOpenAtom, sessionsAtom } from "../atoms";

export type EloWidgetProps = {};

export const EloWidget: React.FC<EloWidgetProps> = () => {
  const [sessions] = useAtom(sessionsAtom);
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const widgetRef = useRef<HTMLDivElement>(null);

  useClickOutside(widgetRef, () => setIsOpen(false), isOpen);

  return (
    <div
      ref={widgetRef}
      className="absolute bottom-10 right-10 text-foreground"
      onClick={() => setIsOpen(true)}
    >
      <svg
        width="65"
        height="71"
        viewBox="0 0 37 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-primary-light"
          d="M19.6436 7.65217C13.2225 7.65217 8.16525 12.8269 8.16525 19.1304C8.16525 26.5824 14.1045 32.5217 21.5567 32.5217V40.1739C9.87825 40.1739 0.513123 30.8086 0.513123 19.1304C0.513123 8.65771 8.93955 0 19.6436 0C29.4318 0 36.861 7.48766 36.861 17.2174C36.861 25.795 30.1248 32.5217 21.5567 32.5217V24.8696C25.9015 24.8696 29.2088 21.5659 29.2088 17.2174C29.2088 11.6978 25.1896 7.65217 19.6436 7.65217Z"
        />
        <path
          className="fill-primary"
          d="M19.6436 7.65217C13.2225 7.65217 8.16525 12.8269 8.16525 19.1304C8.16525 26.5824 14.1045 32.5217 21.5567 32.5217V24.8696C25.9015 24.8696 29.2088 21.5659 29.2088 17.2174C29.2088 11.6978 25.1896 7.65217 19.6436 7.65217Z"
        />
      </svg>
      {/* TODO: add animated waves */}
      {/* User Input */}
      {isOpen && (
        <div className="absolute top-0 right-0">
          <div className="w-96 h-14 bg-primary-light rounded-full p-2">
            <input
              type="text"
              className="w-full h-full rounded-full py-2 px-4 focus:outline-none"
              placeholder="I'm Elo, your financial asistant!"
            />
          </div>
        </div>
      )}
      {/* Email Input */}
      <div className="absolute bottom-20 right-0">
        <div className="w-40 h-10 bg-primary-light rounded-full p-2">
          <input
            type="text"
            className="w-full h-full rounded-full py-2 px-4 focus:outline-none text-sm"
            placeholder="test@email.com"
          />
        </div>
      </div>
      {/* Sessions button */}
      <div className="absolute bottom-20 right-44">
        <button className="text-nowrap h-10 rounded-full bg-primary py-2 px-4 dark text-foreground">
          Past sessions
        </button>
      </div>
      {/* Sessions list */}
      <div className="absolute bottom-20 right-0 w-60 min-h-40 py-2 bg-primary dark rounded-3xl flex flex-col gap-1">
        <h2 className="text-foreground font-bold text-center">Past sessions</h2>
        <div className="w-full h-px bg-foreground/15"></div>
        {sessions.map((session, i) => (
          <div
            key={session.title}
            className="flex flex-col px-2 py-1 gap-2 rounded-lg hover:bg-primary/10 w-full"
          >
            {i > 0 && <div className="w-full h-px bg-foreground/15"></div>}
            <div className="flex flex-col cursor-pointer" title={session.title}>
              <h3 className="text-foreground text-md truncate">
                {session.title}
              </h3>
              <span className="text-foreground/50 text-xs">
                {new Date(session.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
