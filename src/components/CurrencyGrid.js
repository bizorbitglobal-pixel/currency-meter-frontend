"use client";
import CurrencyBar from "./CurrencyBar";

export default function CurrencyGrid({ data }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 w-full max-w-6xl">
      {data.map((currency) => (
        <CurrencyBar
          key={currency.code}
          code={currency.code}
          strength={currency.strength}
          trend={currency.trend}
        />
      ))}
    </div>
  );
}
