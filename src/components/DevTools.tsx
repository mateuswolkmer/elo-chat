import { twMerge } from "tailwind-merge";

import { useAtom } from "jotai";
import { serviceStatusAtom } from "../atoms";
import { SERVICE_STATUS } from "../constants";

export const DevTools: React.FC = () => {
  const [serviceStatus, setServiceStatus] = useAtom(serviceStatusAtom);

  return (
    <div className="fixed flex flex-col gap-1 left-10 bottom-10 w-60 p-2 bg-background dark text-foreground rounded-lg overflow-hidden text-sm opacity-50 hover:opacity-100 transition-opacity">
      <h2 className="text-center font-bold">Elo Widget dev tools</h2>

      <div className="w-full h-px bg-foreground/15 mt-1"></div>

      <h3 className="">Set status:</h3>
      {Object.entries(SERVICE_STATUS).map(([status, { color, label }]) => {
        const isActive = serviceStatus === status;

        return (
          <button
            key={status}
            className={twMerge(
              "text-left border-1 rounded-md flex gap-2 px-2 items-center cursor-pointer",
              isActive ? `border-[var(--color)]` : `border-[var(--color)]/25`
            )}
            onClick={() => setServiceStatus(status as any)}
            style={
              { "--color": `var(--color-${color})` } as React.CSSProperties
            }
          >
            <div
              className={twMerge(
                "size-1 rounded-full grid place-items-center",
                isActive ? `bg-[var(--color)]` : "bg-foreground/25"
              )}
            >
              {isActive && (
                <div
                  className={twMerge(
                    "animate-ping rounded-full size-[120%]",
                    `bg-[var(--color)]`
                  )}
                />
              )}
            </div>
            {label}
          </button>
        );
      })}
    </div>
  );
};
