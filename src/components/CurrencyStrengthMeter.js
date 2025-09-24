"use client";
import { useEffect, useState } from "react";

export default function CurrencyStrengthMeter() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/strength.json")
      .then((res) => res.json())
      .then((json) => setData(json.currencies));
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded-2xl max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Currency Strength Meter</h2>
        <button
          onClick={() => window.location.reload()}
          className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-8 gap-6">
        {data.map((currency) => (
          <div key={currency.code} className="text-center">
            {/* Bars */}
            <div className="flex flex-col-reverse h-40 justify-start items-center">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-3 my-0.5 rounded-sm transition-all duration-300 ${i < currency.strength ? "bg-green-500" : "bg-gray-200"
                    }`}
                />
              ))}
            </div>
            {/* Label */}
            <span className="mt-2 block font-semibold">{currency.code}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
