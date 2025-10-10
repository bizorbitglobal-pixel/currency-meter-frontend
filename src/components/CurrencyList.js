"use client";
import { useEffect, useState } from "react";
import CurrencyCard from "./CurrencyCard";
import Button from "./Button";
import { fetchCurrencyData } from "../api/currencyApi";

export default function CurrencyList() {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const loadData = async () => {
    setLoading(true);
    setElapsedTime(0);

    const timer = setInterval(() => {
      setElapsedTime((t) => t + 1);
    }, 1000);

    try {
      const data = await fetchCurrencyData();
      setCurrencies(data);
    } catch (err) {
      console.error("Error fetching currencies:", err);
    } finally {
      clearInterval(timer);
      setElapsedTime(0);
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  // Auto-refresh every 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("🔄 Auto refreshing currency data...");
      loadData();
    }, 2 * 60 * 1000); // 2 minutes = 120,000 ms

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Shimmer card (skeleton placeholder)
  const ShimmerCard = () => (
  <div className="flex flex-col items-center bg-white-100 rounded-xl w-28 p-3 shadow-md overflow-hidden relative">
    {/* Gradient shimmer background */}
    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />

    <div className="relative z-10 flex flex-col items-center w-full">
      {/* Header line */}
      <div className="h-4 w-16 bg-gray-300 rounded mb-3"></div>

      {/* Strength bars */}
      <div className="flex flex-col-reverse gap-2 mb-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-5 w-16 bg-gray-300 rounded-md" />
        ))}
      </div>
      {/* Loading message */}
      <div className="text-[10px] sm:text-xs text-gray-500 italic text-center mt-1">
        Please wait for live currency strengths...
      </div>

      {/* Footer line */}
      <div className="h-3 w-10 bg-gray-300 rounded mb-2"></div>
    </div>
  </div>
);


  return (
    <>
      {/* Custom shimmer animation style */}
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

      <div className="flex justify-center py-10">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-6xl relative overflow-hidden">
          {/* Top Progress Bar */}
          {loading && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
              <div className="h-1 bg-green-500 animate-pulse w-full" />
            </div>
          )}

          {/* Header */}
          <div
            className="flex items-center justify-between p-4 rounded-t-2xl shadow-sm"
            style={{ backgroundColor: "#F8F8FF" }}
          >
            <span className="font-semibold">
              <span className="text-black">Market:</span>{" "}
              <span className="text-green-600">Open</span>
            </span>

            <h2 className="text-xl font-bold text-center flex-1">
              Currency Strength Meter
            </h2>

            <Button
              onClick={loadData}
              disabled={loading}
              className={`bg-white text-black rounded-full px-4 py-2 shadow hover:bg-gray-100 transition flex items-center gap-2 ${
                loading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {loading ? `Refreshing... (${elapsedTime}s)` : "Refresh"}
            </Button>
          </div>

          {/* Currencies Row */}
          <div className="p-8">
            {loading && currencies.length === 0 ? (
              <div className="grid grid-cols-2 gap-6 sm:flex sm:flex-row sm:overflow-x-auto">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ShimmerCard key={i} />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-6 sm:flex sm:flex-row sm:overflow-x-auto">
                  {currencies.map((currency) => (
                    <CurrencyCard
                      key={currency.code}
                      code={currency.code}
                      strength={currency.strength}
                      trend={currency.trend}
                    />
                  ))}
                </div>

                {/* Histogram Legend */}
                <div className="flex flex-start w-full text-xs font-medium gap-4 mt-6">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 bg-red-500 rounded-sm"></div>
                    Weak
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 bg-yellow-400 rounded-sm"></div>
                    Neutral
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 bg-green-500 rounded-sm"></div>
                    Strong
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
