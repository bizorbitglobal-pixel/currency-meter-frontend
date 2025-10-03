"use client";
import { useEffect, useState } from "react";

export default function CurrencyStrengthMeter() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // loader starts hidden

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await fetch("/strength.json", { cache: "no-store" }); // disable cache
      const json = await res.json();
      setData(json.currencies);
    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      // 👇 force loader to stay visible for at least 1s
      setTimeout(() => setLoading(false), 1000);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded-2xl max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Currency Strength Meter</h2>
        <button
          onClick={fetchData}
          disabled={loading}
          className={`px-3 py-1 text-sm rounded transition-colors duration-200 ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-8 gap-6">
          {data.map((currency) => (
            <div key={currency.code} className="text-center">
              <div className="flex flex-col-reverse h-40 justify-start items-center">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-3 my-0.5 rounded-sm transition-all duration-300 ${
                      i < currency.strength ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="mt-2 block font-semibold">{currency.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
