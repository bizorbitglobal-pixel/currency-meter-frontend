"use client";
import { useEffect, useState } from "react";
import CurrencyCard from "./CurrencyCard";
import Button from "./Button";
import { fetchCurrencyData } from "../api/currencyApi";

export default function CurrencyList() {
  const [currencies, setCurrencies] = useState([]);

  const loadData = async () => {
    const data = await fetchCurrencyData();
    setCurrencies(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex justify-center py-10">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-5xl">
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
            className="bg-white text-black rounded-full px-4 py-2 shadow hover:bg-gray-100 transition"
          >
            Refresh
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
