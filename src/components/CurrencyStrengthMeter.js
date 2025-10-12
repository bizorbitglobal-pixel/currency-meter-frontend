"use client";
import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

export default function CurrencyStrengthMeter() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [marketStatus, setMarketStatus] = useState("Closed");

  // Fetch JSON data
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/strength.json", { cache: "no-store" });
      const json = await res.json();
      setData(json.currencies);
    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  // Detect Forex Market Open/Closed (UTC)
  const getMarketStatus = () => {
    const now = new Date();
    const day = now.getUTCDay();
    const hour = now.getUTCHours();
    const open =
      (day > 0 && day < 5) ||
      (day === 0 && hour >= 22) ||
      (day === 5 && hour < 22);
    return open ? "Open" : "Closed";
  };

  useEffect(() => {
    fetchData();
    setMarketStatus(getMarketStatus());
    const interval = setInterval(() => setMarketStatus(getMarketStatus()), 60000);
    return () => clearInterval(interval);
  }, []);

  // --- Shimmer Placeholder ---
  const ShimmerCard = () => (
    <div className="flex flex-col items-center bg-gray-50 rounded-lg w-16 sm:w-24 p-2 sm:p-3 shadow-sm overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="h-3 w-8 bg-gray-300 rounded mb-2"></div>
        <div className="flex flex-col-reverse gap-[2px] mb-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-[8px] w-[18px] sm:h-[10px] sm:w-[22px] bg-gray-300 rounded-sm"
            />
          ))}
        </div>
        <div className="h-2 w-6 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  // --- Trend Icon ---
  const renderTrendIcon = (trend) => {
    if (trend === "up")
      return (
        <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 animate-bounce" />
      );
    if (trend === "down")
      return (
        <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 animate-bounce" />
      );
    return <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />;
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow rounded-2xl max-w-5xl mx-auto mt-6 sm:mt-10">
      {/* ---------- Header ---------- */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6 mb-6">
        {/* Title */}
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900 text-center sm:text-left">
          Currency Strength Meter
        </h2>

        {/* Market Status */}
        <div className="text-sm sm:text-base font-medium text-gray-700">
          Market:{" "}
          <span
            className={`font-semibold ${
              marketStatus === "Open" ? "text-green-600" : "text-red-600"
            }`}
          >
            {marketStatus}
          </span>
        </div>

        {/* Refresh Button */}
        <button
          onClick={fetchData}
          disabled={loading}
          className={`text-xs sm:text-sm px-4 py-2 rounded-full border border-gray-300 shadow-sm transition-all duration-200 ${
            loading
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white hover:bg-blue-50 hover:border-blue-400"
          }`}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* ---------- Grid / Loader ---------- */}
      {loading ? (
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-6 justify-items-center">
          {Array.from({ length: 8 }).map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-6 justify-items-center">
          {data.map((currency) => (
            <div key={currency.code} className="text-center">
              {/* Bars */}
              <div className="flex flex-col-reverse h-32 sm:h-40 justify-start items-center">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-5 sm:w-8 h-[8px] sm:h-[10px] my-[1px] sm:my-0.5 rounded-sm transition-all duration-300 ${
                      i < currency.strength
                        ? currency.strength < 3
                          ? "bg-red-500"
                          : currency.strength < 7
                          ? "bg-yellow-400"
                          : "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Currency label + trend */}
              <div className="flex items-center justify-center gap-[2px] sm:gap-1 mt-2">
                <span className="font-semibold text-[10px] sm:text-sm">
                  {currency.code}
                </span>
                {renderTrendIcon(currency.trend)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------- Custom Shimmer Animation ---------- */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -450px 0;
          }
          100% {
            background-position: 450px 0;
          }
        }
        .animate-shimmer {
          background-size: 800px 104px;
          animation: shimmer 1.8s infinite linear;
        }
      `}</style>
    </div>
  );
}
