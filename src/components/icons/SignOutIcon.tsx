import React from "react";
import { IconProps } from "./types";

export const SignOutIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
      className={className}
    >
      <path d="M763-84 488-359q-32 54-87 86.5T280-240q-100 0-170-70T40-480q0-66 32.5-121t86.5-87l-75-75q-11-11-11-27.5T84-819q12-12 28.5-12t28.5 12l678 679q11 11 11.5 27.5T819-84q-11 11-28 11t-28-11Zm180-396q0 8-2.5 15t-8.5 13L805-325q-6 6-13.5 9t-12.5 3q-8 0-14-1.5t-12-5.5L650-423l50-37 72 54 75-74-40-40H553l-80-80h350q8 0 15.5 3t13.5 9l80 80q6 6 8.5 13t2.5 15ZM280-320q51 0 90.5-27.5T428-419l-56-56-48.5-48.5L275-572l-56-56q-44 18-71.5 57.5T120-480q0 66 47 113t113 47Zm0-80q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Z" />
    </svg>
  );
};
