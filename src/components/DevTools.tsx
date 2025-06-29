import { twMerge } from "tailwind-merge";

import { useAtom } from "jotai";
import { serviceStatusAtom } from "../atoms";
import { SERVICE_STATUS } from "../constants";

export const DevTools: React.FC = () => {
  const [serviceStatus, setServiceStatus] = useAtom(serviceStatusAtom);

  return (
    <div className="elo:fixed elo:flex elo:flex-col elo:gap-1 elo:left-10 elo:bottom-10 elo:w-60 elo:p-2 elo:bg-background-dark elo:text-foreground-dark elo:rounded-lg elo:overflow-hidden elo:text-sm elo:opacity-50 elo:hover:opacity-100 elo:transition-opacity">
      <h2 className="elo:text-center elo:font-bold">Elo Widget dev tools</h2>

      <div className="elo:w-full elo:h-px elo:bg-foreground-dark/15 elo:mt-1"></div>

      <h3>Set status:</h3>
      {Object.entries(SERVICE_STATUS).map(([status, { color, label }]) => {
        const isActive = serviceStatus === status;

        return (
          <button
            key={status}
            className={twMerge(
              "elo:text-left elo:border-1 elo:rounded-md elo:flex elo:gap-2 elo:px-2 elo:items-center elo:cursor-pointer",
              isActive
                ? `elo:border-[var(--color)]`
                : `elo:border-[var(--color)]/25`
            )}
            onClick={() => setServiceStatus(status as any)}
            style={
              { "--color": `var(--elo-color-${color})` } as React.CSSProperties
            }
          >
            <div
              className={twMerge(
                "elo:size-1 elo:rounded-full elo:grid elo:place-items-center",
                isActive ? `elo:bg-[var(--color)]` : "elo:bg-foreground-dark/25"
              )}
            >
              {isActive && (
                <div
                  className={twMerge(
                    "elo:animate-ping elo:rounded-full elo:size-[120%]",
                    `elo:bg-[var(--color)]`
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
