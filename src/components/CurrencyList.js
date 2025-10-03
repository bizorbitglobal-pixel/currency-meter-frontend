"use client";
import { useEffect, useState, useRef } from "react";
import CurrencyCard from "./CurrencyCard";
import Button from "./Button";
import { fetchCurrencyData } from "../api/currencyApi";

export default function CurrencyList() {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);

  const loadData = async () => {
    setLoading(true);
    setProgress(0);
    setElapsedTime(0);

    // Start timer
    timerRef.current = setInterval(() => {
      setElapsedTime((t) => t + 1);
    }, 1000);

    // Fake progress animation
    progressRef.current = setInterval(() => {
      setProgress((p) => (p < 95 ? p + 5 : p)); // stops at 95 until fetch finishes
    }, 1000);

    try {
      const data = await fetchCurrencyData();
      setCurrencies(data);
    } catch (err) {
      console.error("Error fetching currencies:", err);
    } finally {
      clearInterval(timerRef.current);
      clearInterval(progressRef.current);

      // Finish progress to 100%
      setProgress(100);

      // Small delay so user sees 100%
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
        setElapsedTime(0);
      }, 1000);
    }
  };

  useEffect(() => {
    loadData();
    return () => {
      clearInterval(timerRef.current);
      clearInterval(progressRef.current);
    };
  }, []);

  return (
    <div className="flex justify-center py-10">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-5xl relative overflow-hidden">
        {/* Top Progress Bar */}
        {loading && (
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
            <div
              className="h-1 bg-green-500 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

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

        <div className="p-8">
          <div className="flex flex-wrap justify-center gap-6">
            {currencies.map((currency) => (
              <CurrencyCard
                key={currency.code}
                code={currency.code}
                strength={currency.strength}
                trend={currency.trend}
              />
            ))}

            {/* Histogram legend */}
            <div className="flex flex-start w-full text-xs font-medium gap-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}
