"use client";
import { useState } from "react";
import CurrencyCard from "./CurrencyCard";
import Button from "./Button";

const initialData = [
  { code: "AUD", strength: 6, trend: "neutral" },
  { code: "CAD", strength: 7, trend: "neutral" },
  { code: "CHF", strength: 8, trend: "up" },
  { code: "EUR", strength: 4, trend: "neutral" },
  { code: "GBP", strength: 3, trend: "neutral" },
  { code: "JPY", strength: 2, trend: "down" },
  { code: "NZD", strength: 5, trend: "neutral" },
  { code: "USD", strength: 6, trend: "neutral" },
];

export default function CurrencyList() {
  const [currencies, setCurrencies] = useState(initialData);

  const refresh = () => {
    setCurrencies((prev) =>
      prev.map((c) => ({
        ...c,
        strength: Math.floor(Math.random() * 9),
      }))
    );
  };

  return (
    <div className="flex justify-center py-10">
      {/* Card Section */}
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-5xl">
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
            onClick={refresh}
            className="bg-white text-black rounded-full px-4 py-2 shadow hover:bg-gray-100 transition"
          >
            Refresh
          </Button>
        </div>

        {/* Body */}
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
          </div>
        </div>
      </div>
    </div>
  );
}
