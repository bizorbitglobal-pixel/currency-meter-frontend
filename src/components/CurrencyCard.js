import { ArrowUp, ArrowDown } from "lucide-react";

export default function CurrencyCard({ code, strength, trend }) {
  // Determine color based on strength
  const getBarColor = (index) => {
    if (index >= strength) return "bg-gray-200"; // empty bar
    if (strength <= 2) return "bg-red-500";     // weak
    if (strength >= 6) return "bg-green-500";   // strong
    return "bg-yellow-400";                     // neutral
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-xl w-28 p-3 shadow-md">
      {/* Code and Trend */}
      <div className="flex items-center gap-2 font-semibold mb-3">
        {code}
        {trend === "up" && <ArrowUp className="w-5 h-5 text-green-500" />}
        {trend === "down" && <ArrowDown className="w-5 h-5 text-red-500" />}
      </div>

      {/* Strength bars (bottom to top fill) */}
      <div className="flex flex-col-reverse gap-2 mb-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`h-5 w-16 rounded-md ${getBarColor(i)}`}
          />
        ))}
      </div>
    </div>
  );
}
