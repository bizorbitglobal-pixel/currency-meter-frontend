"use client";

import { useEffect, useState } from "react";

function colorFor(percent) {
  if (percent >= 90) return "bg-red-500";
  if (percent >= 70) return "bg-amber-500";
  return "bg-blue-600";
}

// Animates from 0 to the real value on mount so the bar visibly "fills in".
export default function UsageProgressBar({ percent, compact = false }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(percent), 50);
    return () => clearTimeout(t);
  }, [percent]);

  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`w-full rounded-full bg-slate-200 dark:bg-gray-800 overflow-hidden ${compact ? "h-1.5" : "h-2.5"}`}
    >
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${colorFor(percent)}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
