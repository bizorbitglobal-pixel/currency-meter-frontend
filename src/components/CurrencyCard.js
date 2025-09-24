import { ArrowUp, ArrowDown } from "lucide-react";

export default function CurrencyCard({ code, strength, trend }) {
  return (
    <div className="flex flex-col items-center bg-white rounded-xl w-24">
      {/* Code and Trend */}
      <div className="flex items-center gap-2 font-semibold mb-3">
        {code}
        {trend === "up" && <ArrowUp className="w-5 h-5 text-green-500" />}
        {trend === "down" && <ArrowDown className="w-5 h-5 text-red-500" />}
      </div>

      {/* Strength bars */}
      <div className="flex flex-col gap-2 mt-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`h-5 w-16 rounded-md ${i < strength ? "bg-green-500" : "bg-gray-200"}`}
          />
        ))}
      </div>
    </div>
  );
}
