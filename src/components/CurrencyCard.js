"use client";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

export default function CurrencyCard({ code, strength = 0, trend }) {
  // Normalize strength to max 8 bars
  const normalizedStrength = Math.min(Math.max(strength, 0), 8);

  // Determine color for each bar
  const getBarColor = (index) => {
    if (index >= normalizedStrength) return "bg-gray-200"; // empty
    if (normalizedStrength <= 2) return "bg-red-500"; // weak
    if (normalizedStrength <= 5) return "bg-yellow-400"; // neutral
    return "bg-green-500"; // strong
  };

  // Trend icon with animation
  const renderTrendIcon = () => {
    if (strength > 5)
      return <ArrowUp className="w-5 h-5 text-green-500 animate-bounce" />;
    if (strength < 5)
      return <ArrowDown className="w-5 h-5 text-red-500 animate-bounce" />;
    return <Minus className="w-5 h-5 text-gray-400" />;
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-xl w-28 p-3 shadow-md transition-transform hover:scale-105">
      {/* Code and Trend */}
      <div className="flex items-center gap-2 font-semibold mb-3 text-gray-800">
        {code}
        {renderTrendIcon()}
      </div>

      {/* Strength bars (bottom to top fill) */}
      <div className="flex flex-col-reverse gap-2 mb-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`h-5 w-16 rounded-md transition-all duration-500 ${getBarColor(i)}`}
          />
        ))}
      </div>

      {/* Strength label */}
      <div className="text-xs text-gray-500">{strength.toFixed(2)}</div>
    </div>
  );
}
