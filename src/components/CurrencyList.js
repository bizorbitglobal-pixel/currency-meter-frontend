"use client";
import { useEffect, useState } from "react";
import CurrencyCard from "./CurrencyCard";
import Button from "./Button";
import { fetchCurrencyData } from "../api/currencyApi";

export default function CurrencyList() {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [marketStatus, setMarketStatus] = useState("Open");

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

  // Determine Forex market open/close based on UTC time
  const getMarketStatus = () => {
    const now = new Date();
    const day = now.getUTCDay(); // 0 = Sunday, 6 = Saturday
    const hour = now.getUTCHours();

    const isOpen =
      (day > 0 && day < 5) || // Monday–Thursday always open
      (day === 0 && hour >= 22) || // Sunday after 22:00 UTC
      (day === 5 && hour < 22); // Friday before 22:00 UTC

    return isOpen ? "Open" : "Closed";
  };

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const updateMarketStatus = () => {
      setMarketStatus(getMarketStatus());
    };
    updateMarketStatus();
    const interval = setInterval(updateMarketStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  // Auto-refresh every minute
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("🔄 Auto refreshing currency data...");
      loadData();
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const ShimmerCard = () => (
    <div className="flex flex-col items-center bg-gray-50 rounded-xl w-16 sm:w-28 p-2 sm:p-3 shadow-md relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="h-3 w-10 bg-gray-300 rounded mb-2"></div>
        <div className="flex flex-col-reverse gap-[3px] mb-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-[10px] w-[22px] bg-gray-300 rounded-md" />
          ))}
        </div>
        <div className="text-[10px] text-gray-400 italic text-center mt-1">
          Loading...
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Custom shimmer animation */}
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
          {/* Top loading bar */}
          {loading && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
              <div className="h-1 bg-green-500 animate-pulse w-full" />
            </div>
          )}

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 p-4 rounded-t-2xl bg-gray-50 border-b border-gray-200">
            <div className="text-sm font-medium text-gray-700">
              <span className="text-black">Market:</span>{" "}
              <span
                className={`font-semibold ${
                  marketStatus === "Open" ? "text-green-600" : "text-red-600"
                }`}
              >
                {marketStatus}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-gray-900 text-center order-first sm:order-none">
              Currency Strength Meter
            </h2>

            <Button
              onClick={loadData}
              disabled={loading}
              className={`text-sm sm:text-base bg-white text-gray-900 border border-gray-300 rounded-full px-5 py-2 shadow-sm hover:bg-blue-50 hover:border-blue-400 transition-all flex items-center gap-2 ${
                loading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {loading ? `Refreshing... (${elapsedTime}s)` : "Refresh"}
            </Button>
          </div>

          {/* Currency Grid */}
          <div className="p-4 sm:p-8">
            {loading && currencies.length === 0 ? (
              <div className="grid grid-cols-4 sm:flex sm:flex-row sm:overflow-x-auto gap-2 sm:gap-6 justify-items-center">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ShimmerCard key={i} />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2 sm:gap-6 justify-items-center">
                  {currencies.map((currency) => (
                    <CurrencyCard
                      key={currency.code}
                      code={currency.code}
                      strength={currency.strength}
                      trend={currency.trend}
                      marketStatus={marketStatus}
                    />
                  ))}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap justify-center text-[11px] sm:text-xs font-semibold text-gray-700 sm:text-gray-600 gap-3 sm:gap-5 mt-4">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 bg-red-500 rounded-sm shadow-sm"></div>
                    <span className="opacity-90">Weak</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 bg-yellow-400 rounded-sm shadow-sm"></div>
                    <span className="opacity-90">Neutral</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 bg-green-500 rounded-sm shadow-sm"></div>
                    <span className="opacity-90">Strong</span>
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
