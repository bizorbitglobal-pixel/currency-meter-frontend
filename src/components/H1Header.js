"use client";
import { useState, useEffect } from "react";

export default function H1Header() {
  const [blink, setBlink] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setBlink((b) => !b), 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center text-center py-4 sm:py-8 select-none px-2">
      {/* Main Heading */}
      <h1
        className={`
          text-2xl sm:text-4xl font-extrabold tracking-wide transition-all duration-300
          ${
            hovered
              ? "text-emerald-600 drop-shadow-[0_0_6px_#38bdf8]"
              : "text-emerald-600"
          }
        `}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Live Currency Strength Meter
        <span
          className={`
            inline-block ml-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full align-middle
            ${
              blink
                ? "bg-emerald-500 shadow-[0_0_8px_#34d399]"
                : "bg-emerald-100"
            }
            transition-all duration-200
          `}
          title="Live status"
        ></span>
      </h1>

      {/* Tagline */}
      <p className="mt-3 text-xs sm:text-sm text-gray-600 max-w-md">
        Real-time forex strength tool — track strongest and weakest currencies live.
      </p>
    </div>
  );
}
