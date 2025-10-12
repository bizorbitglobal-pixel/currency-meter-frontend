"use client";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function CurrencyBar({ code, strength, trend }) {
  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-3">
      {/* Title */}
      <div className="flex items-center gap-1 mb-2">
        <span className="font-medium">{code}</span>
        {trend === "up" && <ArrowUp size={14} className="text-green-500" />}
        {trend === "down" && <ArrowDown size={14} className="text-red-500" />}
      </div>

      {/* Bar blocks */}
      <div className="flex flex-col-reverse gap-1 sm:gap-2 mb-2 sm:mb-3">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className={`w-6 h-4 rounded-sm ${idx < strength ? "bg-green-500" : "bg-gray-200"
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
