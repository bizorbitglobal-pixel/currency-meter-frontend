"use client";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

export default function CurrencyCard({ code, strength = 0, trend, marketStatus }) {
  const normalizedStrength = Math.min(Math.max(strength, 0), 10);

  // --- Color Logic for Each Bar ---
  const getBarColor = (index) => {
    if (index >= normalizedStrength) return "bg-gray-200";
    if (normalizedStrength <= 2) return "bg-red-500";
    if (normalizedStrength <= 6) return "bg-yellow-400";
    return "bg-green-500";
  };

  // --- Trend Icon (Only when Market is Open) ---
  const renderTrendIcon = () => {
    if (marketStatus !== "Open") {
      // Market Closed → show dash
      return <Minus className="w-3 h-3 sm:w-5 sm:h-5 text-gray-400" />;
    } else {
      if (trend === "up")
        return <ArrowUp className="w-3 h-3 sm:w-5 sm:h-5 text-green-500 animate-bounce" />;
      if (trend === "down")
        return <ArrowDown className="w-3 h-3 sm:w-5 sm:h-5 text-red-500 animate-bounce" />;
      return <Minus className="w-3 h-3 sm:w-5 sm:h-5 text-gray-400" />;
    }
  };

  return (
    <div
      className="
        flex flex-col items-center bg-white rounded-lg
        w-[60px] sm:w-28 p-2 sm:p-3 shadow-sm
        transition-transform hover:scale-105
      "
    >
      {/* Currency Code + Trend */}
      <div
        className="
          flex items-center justify-center gap-[2px] sm:gap-2
          font-semibold mb-2 sm:mb-3 text-gray-800
          text-[10px] sm:text-base
        "
      >
        {code}
        {renderTrendIcon()}
      </div>

      {/* Bars */}
      <div className="flex flex-col-reverse gap-[3px] sm:gap-2 mb-2 sm:mb-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`h-[10px] w-[22px] sm:h-5 sm:w-16 rounded-md shadow-sm transition-all duration-500 ${getBarColor(
              i
            )}`}
          />
        ))}
      </div>

      {/* Strength Value */}
      <div className="text-[10px] sm:text-xs text-gray-500">
        {strength.toFixed(2)}
      </div>
    </div>
  );
}
