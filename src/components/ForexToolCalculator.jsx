"use client";

import { useEffect, useMemo, useState } from "react";

const PAIRS = [
  "AUD/CAD", "AUD/CHF", "AUD/JPY", "AUD/NZD", "AUD/USD",
  "CAD/CHF", "CAD/JPY",
  "CHF/JPY",
  "EUR/AUD", "EUR/CAD", "EUR/CHF", "EUR/GBP", "EUR/JPY", "EUR/NZD", "EUR/USD",
  "GBP/AUD", "GBP/CAD", "GBP/CHF", "GBP/JPY", "GBP/NZD", "GBP/USD",
  "NZD/CAD", "NZD/CHF", "NZD/JPY", "NZD/USD",
  "USD/CAD", "USD/CHF", "USD/JPY",
];
const ACCOUNT_CURRENCIES = ["USD", "EUR", "GBP", "AUD", "CAD"];
const PIP_ACCOUNT_CURRENCIES = ["USD", "EUR", "GBP"];
const FX_TO_USD = {
  USD: 1,
  EUR: 1.09,
  GBP: 1.27,
  JPY: 0.0068,
  AUD: 0.66,
  NZD: 0.61,
  CAD: 0.74,
  CHF: 1.14,
};
const PAIR_PIP_VALUES = {
  "EUR/USD": 10,
  "GBP/USD": 10,
  "USD/JPY": 9.1,
  "AUD/USD": 10,
  "USD/CAD": 7.3,
  "USD/CHF": 10.9,
  "NZD/USD": 10,
  "EUR/JPY": 9.1,
  "GBP/JPY": 9.1,
};
const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "EUR ",
  GBP: "GBP ",
  AUD: "AUD ",
  CAD: "CAD ",
  JPY: "JPY ",
  NZD: "NZD ",
  CHF: "CHF ",
};
const CORRELATIONS = {
  "EUR/USD|GBP/USD": 0.86,
  "EUR/USD|USD/CHF": -0.82,
  "GBP/USD|AUD/USD": 0.71,
  "USD/JPY|EUR/JPY": 0.63,
  "AUD/USD|NZD/USD": 0.88,
  "USD/CAD|AUD/USD": -0.56,
};
const SESSION_WINDOWS = [
  { name: "Sydney", open: 22, close: 7 },
  { name: "Tokyo", open: 0, close: 9 },
  { name: "London", open: 8, close: 17 },
  { name: "New York", open: 13, close: 22 },
];

function Card({ label, value, hint, tone = "default" }) {
  const toneClass =
    tone === "green"
      ? "text-emerald-600 dark:text-emerald-400"
      : tone === "red"
        ? "text-red-600 dark:text-red-400"
        : tone === "blue"
          ? "text-blue-600 dark:text-blue-400"
          : "text-slate-900 dark:text-white";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{label}</p>
      <p className={`mt-2 text-2xl font-extrabold ${toneClass}`}>{value}</p>
      {hint ? <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{hint}</p> : null}
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
      />
    </label>
  );
}

function Select({ label, children, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</span>
      <select
        {...props}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
      >
        {children}
      </select>
    </label>
  );
}

function sessionOpen(hour, session) {
  if (session.open < session.close) {
    return hour >= session.open && hour < session.close;
  }
  return hour >= session.open || hour < session.close;
}

function formatMoney(value, currency = "USD") {
  const symbol = CURRENCY_SYMBOLS[currency] || `${currency} `;
  return `${symbol}${Number(value || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function calculateCompoundProjection(startBalance, periods, gainPct) {
  const start = Number(startBalance) || 0;
  const totalPeriods = Math.max(0, Number(periods) || 0);
  const gainRate = (Number(gainPct) || 0) / 100;
  const endingBalance = start * ((1 + gainRate) ** totalPeriods);
  const totalGain = start > 0 ? ((endingBalance - start) / start) * 100 : 0;

  return {
    endingBalance,
    totalGain,
  };
}

export default function ForexToolCalculator({ slug }) {
  const [clock, setClock] = useState(() => new Date(0)); // Initialize with epoch to prevent hydration mismatch
  const [positionSize, setPositionSize] = useState({
    balance: "10000",
    currency: "USD",
    pair: "EUR/USD",
    risk: "1",
    stop: "20",
  });
  const [pipValue, setPipValue] = useState({
    pair: "EUR/USD",
    accountCurrency: "USD",
    pipAmount: "1.0",
    lot: "1.00",
  });
  const [riskReward, setRiskReward] = useState({
    direction: "long",
    entry: "150",
    stop: "145",
    target: "162.5",
    units: "100",
  });
  const [profitCalc, setProfitCalc] = useState({
    pair: "EUR/USD",
    periodDays: "1",
    lot: "1.00",
    open: "1.13728",
    close: "1.13678",
    side: "short",
  });
  const [profitResult, setProfitResult] = useState(null);
  const [goldCalc, setGoldCalc] = useState({ balance: "10000", risk: 1.5, stop: "50", price: "2400" });
  const [compound, setCompound] = useState({ balance: "1000", periods: "5", gain: "20" });
  const [compoundResult, setCompoundResult] = useState(() => calculateCompoundProjection(1000, 5, 20));
  const [volatility, setVolatility] = useState({ range: 80, stop: 25, target: 50 });
  const [correlation, setCorrelation] = useState({ pair1: "EUR/USD", pair2: "GBP/USD" });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setClock(new Date());

    if (slug === "forex-session-clock" || slug === "live-market-session-status") {
      const timer = setInterval(() => setClock(new Date()), 1000);
      return () => clearInterval(timer);
    }
  }, [slug]);

  const content = useMemo(() => {
    switch (slug) {
      case "position-size-calculator": {
        const balanceValue = Number.parseFloat(positionSize.balance) || 0;
        const riskValue = Number.parseFloat(positionSize.risk) || 0;
        const stopValue = Number.parseFloat(positionSize.stop) || 0;
        const pipPerStandardLot = PAIR_PIP_VALUES[positionSize.pair] || 10;
        const riskAmount = (balanceValue * riskValue) / 100;
        const lots = stopValue > 0 && pipPerStandardLot > 0
          ? riskAmount / (stopValue * pipPerStandardLot)
          : 0;
        const units = lots * 100000;
        const miniLots = lots * 10;
        const microLots = lots * 100;
        const riskProfile =
          riskValue <= 1
            ? "Conservative"
            : riskValue <= 2
              ? "Moderate"
              : "Aggressive";
        return (
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-400">
                  Risk Management Calculator
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                  Position Size Calculator
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                {riskProfile}: {riskValue.toFixed(1)}% risk
              </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Account Currency
                  </label>
                  <select
                    value={positionSize.currency}
                    onChange={(e) => setPositionSize({ ...positionSize, currency: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-lg font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  >
                    {ACCOUNT_CURRENCIES.map((currency) => (
                      <option key={currency} value={currency} className="bg-white text-slate-900">
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Account Balance
                  </label>
                  <input
                    type="number"
                    value={positionSize.balance}
                    onChange={(e) => setPositionSize({ ...positionSize, balance: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-lg font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Risk Percentage
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={positionSize.risk}
                    onChange={(e) => setPositionSize({ ...positionSize, risk: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-lg font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Stop Loss (pips)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={positionSize.stop}
                    onChange={(e) => setPositionSize({ ...positionSize, stop: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-lg font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Currency Pair
                  </label>
                  <select
                    value={positionSize.pair}
                    onChange={(e) => setPositionSize({ ...positionSize, pair: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-lg font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  >
                    {PAIRS.map((pair) => (
                      <option key={pair} value={pair} className="bg-white text-slate-900">
                        {pair}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                  <p className="font-semibold text-slate-900 dark:text-white">Pip Reference</p>
                  <p className="mt-2">
                    For {positionSize.pair}, 1 pip is approximately {formatMoney(pipPerStandardLot, positionSize.currency)} per standard lot.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 flex items-center gap-3 border-b border-slate-200 pb-3 dark:border-slate-800">
                  <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">Results</h3>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-white">
                    ↓
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Amount at Risk</p>
                    <p className="mt-2 break-words text-4xl font-extrabold leading-tight text-blue-600 dark:text-blue-400 sm:text-5xl">{formatMoney(riskAmount, positionSize.currency)}</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Position Size (units)</p>
                    <p className="mt-2 break-words text-4xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-5xl">{Math.round(units).toLocaleString()}</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Standard Lots</p>
                    <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{lots.toFixed(2)}</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Mini Lots</p>
                    <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{miniLots.toFixed(0)}</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Micro Lots</p>
                    <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{microLots.toFixed(0)}</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                      Trade Summary
                    </p>
                    <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                      <div className="flex items-center justify-between">
                        <span>Account Balance</span>
                        <span className="font-bold text-slate-900 dark:text-white">{formatMoney(balanceValue, positionSize.currency)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Risk %</span>
                        <span className="font-bold text-slate-900 dark:text-white">{riskValue.toFixed(2)}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Stop Loss</span>
                        <span className="font-bold text-slate-900 dark:text-white">{stopValue} pips</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Pair</span>
                        <span className="font-bold text-slate-900 dark:text-white">{positionSize.pair}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Pip Value / Std Lot</span>
                        <span className="font-bold text-slate-900 dark:text-white">{formatMoney(pipPerStandardLot, positionSize.currency)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-4 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
              Pip values use standard market approximations. Actual lot sizing may vary by broker, contract specification, and live conversion rates.
            </div>
          </div>
        );
      }
      case "pip-value-calculator": {
        const [baseCurrency, quoteCurrency] = pipValue.pair.split("/");
        const pipSize = quoteCurrency === "JPY" ? 0.01 : 0.0001;
        const lotValue = Math.max(Number.parseFloat(pipValue.lot) || 0, 0);
        const pipAmount = Math.max(Number.parseFloat(pipValue.pipAmount) || 0, 0);
        const units = lotValue * 100000;

        const pipValueInQuote = pipAmount * pipSize * units;

        let pipValueInAccount = 0;
        let conversionHint = "Converted using quote/account currency approximation rates.";

        if (pipValue.accountCurrency === quoteCurrency) {
          pipValueInAccount = pipValueInQuote;
          conversionHint = `Quote currency already matches account currency (${quoteCurrency}).`;
        } else {
          const quoteToUsd = FX_TO_USD[quoteCurrency];
          const accountToUsd = FX_TO_USD[pipValue.accountCurrency];
          if (quoteToUsd && accountToUsd) {
            pipValueInAccount = (pipValueInQuote * quoteToUsd) / accountToUsd;
            conversionHint = `Converted ${quoteCurrency} to ${pipValue.accountCurrency} via USD cross approximation.`;
          }
        }

        const onePipPerLot = pipSize * 100000;
        const pipValuePerStdLot = quoteCurrency === pipValue.accountCurrency
          ? onePipPerLot
          : ((onePipPerLot * (FX_TO_USD[quoteCurrency] || 1)) / (FX_TO_USD[pipValue.accountCurrency] || 1));

        return (
          <div className="rounded-[28px] border border-slate-200 bg-gradient-to-b from-white to-slate-50/80 p-6 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-900 sm:p-8">
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-400">Pip Impact Model</p>
                <h3 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">Pip Value Calculator</h3>
              </div>
              <div className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 sm:w-auto sm:justify-start sm:text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                Live quote approximation
              </div>
            </div>

            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-600 dark:text-slate-300">Symbol</label>
                <select
                  value={pipValue.pair}
                  onChange={(e) => setPipValue({ ...pipValue, pair: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-2xl font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white sm:px-6 sm:py-4 sm:text-3xl"
                >
                  {PAIRS.map((pair) => (
                    <option key={pair} value={pair}>{pair.replace("/", "")}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600 dark:text-slate-300">Pip amount</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={pipValue.pipAmount}
                  onChange={(e) => setPipValue({ ...pipValue, pipAmount: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xl font-semibold tabular-nums text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white sm:px-6 sm:py-4 sm:text-2xl"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600 dark:text-slate-300">Volume, lots</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={pipValue.lot}
                  onChange={(e) => setPipValue({ ...pipValue, lot: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xl font-semibold tabular-nums text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white sm:px-6 sm:py-4 sm:text-2xl"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600 dark:text-slate-300">Account currency</label>
                <select
                  value={pipValue.accountCurrency}
                  onChange={(e) => setPipValue({ ...pipValue, accountCurrency: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xl font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white sm:px-6 sm:py-4 sm:text-2xl"
                >
                  {PIP_ACCOUNT_CURRENCIES.map((currency) => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Calculation results</h3>
                <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Pip value</span>
                  <p className="mt-2 break-words text-3xl font-extrabold text-blue-600 dark:text-blue-400 sm:text-4xl">
                  {formatMoney(pipValueInAccount, pipValue.accountCurrency)}
                  </p>
                </div>
                <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <p>
                    1 pip per standard lot: <span className="font-semibold text-slate-900 dark:text-white">{formatMoney(pipValuePerStdLot, pipValue.accountCurrency)}</span>
                  </p>
                  <p>{conversionHint}</p>
                </div>
              </div>
            </div>
          </div>
        );
      }
      case "risk-reward-calculator": {
        const parseValue = (value) => {
          if (value === "" || value === "." || value === "-" || value === "-.") return 0;
          const parsed = Number.parseFloat(value);
          return Number.isFinite(parsed) ? parsed : 0;
        };

        const entryValue = parseValue(riskReward.entry);
        const stopValue = parseValue(riskReward.stop);
        const targetValue = parseValue(riskReward.target);
        const unitsValue = Math.max(parseValue(riskReward.units), 0);

        const isLong = riskReward.direction === "long";
        const hasEntry = entryValue > 0;
        const hasStop = stopValue > 0;
        const hasTarget = targetValue > 0;

        let stopError = "";
        if (hasStop && hasEntry) {
          if (isLong && stopValue >= entryValue) {
            stopError = "Stop loss must be less than entry price for long trades";
          }
          if (!isLong && stopValue <= entryValue) {
            stopError = "Stop loss must be greater than entry price for short trades";
          }
        }
        if (!stopError && hasStop && hasTarget) {
          if (isLong && stopValue >= targetValue) {
            stopError = "Stop loss must be less than profit target for long trades";
          }
          if (!isLong && stopValue <= targetValue) {
            stopError = "Stop loss must be greater than profit target for short trades";
          }
        }

        let targetError = "";
        if (hasTarget && hasEntry) {
          if (isLong && targetValue <= entryValue) {
            targetError = "Profit target must be greater than entry price for long trades";
          }
          if (!isLong && targetValue >= entryValue) {
            targetError = "Profit target must be less than entry price for short trades";
          }
        }

        const hasValidationError = Boolean(stopError || targetError);
        const hasCompleteInputs = entryValue > 0 && stopValue > 0 && targetValue > 0 && unitsValue > 0;
        const canCalculate = hasCompleteInputs && !hasValidationError;

        const riskPerUnit = canCalculate
          ? (isLong ? entryValue - stopValue : stopValue - entryValue)
          : 0;
        const rewardPerUnit = canCalculate
          ? (isLong ? targetValue - entryValue : entryValue - targetValue)
          : 0;
        const rewardToRiskRatio = canCalculate && riskPerUnit > 0 ? rewardPerUnit / riskPerUnit : 0;
        const minWinRate = rewardToRiskRatio > 0 ? 100 / (1 + rewardToRiskRatio) : 0;
        const potentialLoss = canCalculate ? riskPerUnit * unitsValue : 0;
        const potentialProfit = canCalculate ? rewardPerUnit * unitsValue : 0;
        const stopHint = riskReward.direction === "long" ? "Stop Loss Price (below)" : "Stop Loss Price (above)";
        const targetHint = riskReward.direction === "long" ? "Take Profit Price (above)" : "Take Profit Price (below)";

        const formatDollar = (value) => `$${Number(value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        const formatRatioRightSide = (value) => {
          if (!Number.isFinite(value) || value <= 0) return "0";
          return value.toFixed(2).replace(/\.00$/, "").replace(/(\.\d*[1-9])0$/, "$1");
        };
        const ratioDisplay = canCalculate ? `1 : ${formatRatioRightSide(rewardToRiskRatio)}` : "-";
        const potentialLossDisplay = canCalculate ? `-${formatDollar(potentialLoss)}` : "-";
        const potentialProfitDisplay = canCalculate ? `+${formatDollar(potentialProfit)}` : "-";
        const riskPerUnitDisplay = canCalculate ? formatDollar(riskPerUnit) : "-";
        const rewardPerUnitDisplay = canCalculate ? formatDollar(rewardPerUnit) : "-";
        const breakEvenDisplay = canCalculate ? `${minWinRate.toFixed(1)}%` : "-";

        return (
          <div className="rounded-[28px] border border-slate-200 bg-gradient-to-b from-white to-slate-50/80 p-6 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-900 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-400">Position Type</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setRiskReward({ ...riskReward, direction: "long" })}
                className={`rounded-2xl border px-6 py-4 text-xl font-bold transition ${riskReward.direction === "long"
                  ? "border-violet-500 bg-gradient-to-r from-violet-500 to-violet-600 text-white"
                  : "border-slate-200 bg-white text-slate-500 hover:border-violet-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                  }`}
              >
                Long
              </button>
              <button
                type="button"
                onClick={() => setRiskReward({ ...riskReward, direction: "short" })}
                className={`rounded-2xl border px-6 py-4 text-xl font-bold transition ${riskReward.direction === "short"
                  ? "border-violet-500 bg-gradient-to-r from-violet-500 to-violet-600 text-white"
                  : "border-slate-200 bg-white text-slate-500 hover:border-violet-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                  }`}
              >
                Short
              </button>
            </div>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-400">Trade Setup</p>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">Entry Price</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={riskReward.entry}
                  onChange={(e) => setRiskReward({ ...riskReward, entry: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-2xl font-semibold text-slate-900 outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">Position Size (units)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={riskReward.units}
                  onChange={(e) => setRiskReward({ ...riskReward, units: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-2xl font-semibold text-slate-900 outline-none transition focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">{stopHint}</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={riskReward.stop}
                  onChange={(e) => setRiskReward({ ...riskReward, stop: e.target.value })}
                  className={`w-full rounded-2xl border bg-white px-5 py-3 text-2xl font-semibold text-slate-900 outline-none transition dark:bg-slate-900 dark:text-white ${stopError
                    ? "border-red-400 focus:border-red-500 dark:border-red-500"
                    : "border-slate-200 focus:border-violet-500 dark:border-slate-700"
                    }`}
                />
                {stopError ? <p className="mt-2 text-sm text-red-500">{stopError}</p> : null}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">{targetHint}</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={riskReward.target}
                  onChange={(e) => setRiskReward({ ...riskReward, target: e.target.value })}
                  className={`w-full rounded-2xl border bg-white px-5 py-3 text-2xl font-semibold text-slate-900 outline-none transition dark:bg-slate-900 dark:text-white ${targetError
                    ? "border-red-400 focus:border-red-500 dark:border-red-500"
                    : "border-slate-200 focus:border-violet-500 dark:border-slate-700"
                    }`}
                />
                {targetError ? <p className="mt-2 text-sm text-red-500">{targetError}</p> : null}
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-700">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-400">Risk / Reward Analysis</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-2xl border border-violet-300 bg-violet-50/40 px-6 py-5 dark:border-violet-700 dark:bg-violet-950/20">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Risk : Reward</p>
                  <p className="mt-2 text-4xl font-extrabold text-violet-600 dark:text-violet-300">{ratioDisplay}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Potential Loss</p>
                  <p className="mt-2 text-4xl font-extrabold text-red-500">{potentialLossDisplay}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Potential Profit</p>
                  <p className="mt-2 text-4xl font-extrabold text-emerald-500">{potentialProfitDisplay}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Risk Per Unit</p>
                  <p className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-white">{riskPerUnitDisplay}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Reward Per Unit</p>
                  <p className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-white">{rewardPerUnitDisplay}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Break-even Win Rate</p>
                  <p className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-white">{breakEvenDisplay}</p>
                </div>
              </div>
            </div>
          </div>
        );
      }
      case "profit-calculator": {
        const handleCalculate = () => {
          try {
            const openPrice = Number.parseFloat(profitCalc.open) || 0;
            const closePrice = Number.parseFloat(profitCalc.close) || 0;
            const volumeLots = Number.parseFloat(profitCalc.lot) || 0;
            const days = Number.parseInt(profitCalc.periodDays, 10) || 1;
            const [baseCurr, quoteCurr] = profitCalc.pair.split("/");
            const isLong = profitCalc.side === "long";

            if (openPrice === 0 || closePrice === 0 || volumeLots === 0) {
              alert("Please enter valid Open, Close, and Volume values");
              return;
            }

            const priceDiff = closePrice - openPrice;
            const pipDirection = isLong ? priceDiff : -priceDiff;
            
            const units = volumeLots * 100000;
            const profitInQuote = pipDirection * units;

            let profitInUsd = profitInQuote;
            if (quoteCurr !== "USD" && FX_TO_USD[quoteCurr]) {
              profitInUsd = profitInQuote * FX_TO_USD[quoteCurr];
            }

            setProfitResult({
              profit: profitInUsd,
              grossProfit: profitInUsd,
            });
          } catch (error) {
            console.error("Calculation error:", error);
            alert("Error calculating profit: " + error.message);
          }
        };

        const showResults = Boolean(profitResult);
        const formatResult = (value) => {
          const absValue = Math.abs(value || 0);
          return `$${absValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        };

        const profitTone = showResults && profitResult.profit < 0 ? "text-red-500" : "text-slate-900 dark:text-white";
        const grossTone = showResults && profitResult.grossProfit < 0 ? "text-red-500" : "text-slate-900 dark:text-white";

        return (
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-400">
                  Trade P&amp;L Calculator
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                  Forex Profit Calculator
                </h2>
              </div>
              <div className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 sm:w-auto sm:justify-start sm:text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                {profitCalc.side === "long" ? "BUY" : "SELL"} · {profitCalc.pair}
              </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">Currency Pair</label>
                  <select
                    value={profitCalc.pair}
                    onChange={(e) => { setProfitCalc({ ...profitCalc, pair: e.target.value }); setProfitResult(null); }}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-lg font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  >
                    {PAIRS.map((pair) => (
                      <option key={pair} value={pair} className="bg-white text-slate-900">{pair}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">Trade Side</label>
                  <select
                    value={profitCalc.side}
                    onChange={(e) => { setProfitCalc({ ...profitCalc, side: e.target.value }); setProfitResult(null); }}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-lg font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  >
                    <option value="long" className="bg-white text-slate-900">BUY (Long)</option>
                    <option value="short" className="bg-white text-slate-900">SELL (Short)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">Volume (lots)</label>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => { setProfitCalc({ ...profitCalc, lot: (Math.max(0.01, Number(profitCalc.lot) - 0.01)).toFixed(2) }); setProfitResult(null); }} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-xl font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:text-blue-400">−</button>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={profitCalc.lot}
                      onChange={(e) => { setProfitCalc({ ...profitCalc, lot: e.target.value }); setProfitResult(null); }}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-center text-lg font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    />
                    <button type="button" onClick={() => { setProfitCalc({ ...profitCalc, lot: (Number(profitCalc.lot) + 0.01).toFixed(2) }); setProfitResult(null); }} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-xl font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:text-blue-400">+</button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">Period (days)</label>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => { setProfitCalc({ ...profitCalc, periodDays: String(Math.max(1, Number(profitCalc.periodDays) - 1)) }); setProfitResult(null); }} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-xl font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:text-blue-400">−</button>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={profitCalc.periodDays}
                      onChange={(e) => { setProfitCalc({ ...profitCalc, periodDays: e.target.value }); setProfitResult(null); }}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-center text-lg font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    />
                    <button type="button" onClick={() => { setProfitCalc({ ...profitCalc, periodDays: String(Number(profitCalc.periodDays) + 1) }); setProfitResult(null); }} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-xl font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:text-blue-400">+</button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">Open Price</label>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => { setProfitCalc({ ...profitCalc, open: (Math.max(0, Number(profitCalc.open) - 0.0001)).toFixed(5) }); setProfitResult(null); }} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-xl font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:text-blue-400">−</button>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={profitCalc.open}
                      onChange={(e) => { setProfitCalc({ ...profitCalc, open: e.target.value }); setProfitResult(null); }}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-center text-lg font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    />
                    <button type="button" onClick={() => { setProfitCalc({ ...profitCalc, open: (Number(profitCalc.open) + 0.0001).toFixed(5) }); setProfitResult(null); }} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-xl font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:text-blue-400">+</button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">Close Price</label>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => { setProfitCalc({ ...profitCalc, close: (Math.max(0, Number(profitCalc.close) - 0.0001)).toFixed(5) }); setProfitResult(null); }} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-xl font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:text-blue-400">−</button>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={profitCalc.close}
                      onChange={(e) => { setProfitCalc({ ...profitCalc, close: e.target.value }); setProfitResult(null); }}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-center text-lg font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    />
                    <button type="button" onClick={() => { setProfitCalc({ ...profitCalc, close: (Number(profitCalc.close) + 0.0001).toFixed(5) }); setProfitResult(null); }} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-xl font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:text-blue-400">+</button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCalculate}
                  className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-bold text-white shadow-md transition hover:bg-blue-700 active:scale-[0.98]"
                >
                  Calculate Profit
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 flex items-center gap-3 border-b border-slate-200 pb-3 dark:border-slate-800">
                  <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">Results</h3>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-white">
                    ↓
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Profit / Loss</p>
                    <p className={`mt-2 break-words text-4xl font-extrabold leading-tight sm:text-5xl ${showResults ? profitTone : "text-slate-900 dark:text-white"}`}>
                      {showResults ? `${profitResult.profit < 0 ? "-" : "+"}${formatResult(profitResult.profit)}` : "—"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Gross Profit</p>
                    <p className={`mt-2 break-words text-3xl font-extrabold leading-tight sm:text-4xl ${showResults ? grossTone : "text-slate-900 dark:text-white"}`}>
                      {showResults ? `${profitResult.grossProfit < 0 ? "-" : "+"}${formatResult(profitResult.grossProfit)}` : "—"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">Trade Summary</p>
                    <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                      <div className="flex items-center justify-between">
                        <span>Pair</span>
                        <span className="font-bold text-slate-900 dark:text-white">{profitCalc.pair}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Direction</span>
                        <span className={`font-bold ${profitCalc.side === "long" ? "text-green-600" : "text-red-500"}`}>{profitCalc.side === "long" ? "BUY" : "SELL"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Volume</span>
                        <span className="font-bold text-slate-900 dark:text-white">{profitCalc.lot} lots</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Open → Close</span>
                        <span className="font-bold text-slate-900 dark:text-white">{profitCalc.open} → {profitCalc.close}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-4 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
              Profit is calculated using standard lot size (100,000 units). Results are approximate and exclude swap, commission, and spread costs.
            </div>
          </div>
        );
      }
      case "forex-session-clock": {
        const day = clock.getUTCDay();
        const hour = clock.getUTCHours();
        const preciseHour = hour + clock.getUTCMinutes() / 60;

        // Unified market status & active session logic
        const open = (day > 0 && day < 5) || (day === 0 && hour >= 22) || (day === 5 && hour < 22);
        const active = open
          ? SESSION_WINDOWS.filter((session) => sessionOpen(preciseHour, session))
          : [];

        const activeNames = active.map((session) => session.name).join(", ");
        const marketStatus = open && active.length > 0 ? `Open now: ${activeNames}` : "Market Closed";

        return (
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-400">
                  Live Session Tracker
                </p>
                <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
                  Forex Session Clock
                </h2>
              </div>
              <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${open && active.length > 0 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"}`}>
                <span className={`h-2.5 w-2.5 rounded-full ${open && active.length > 0 ? "animate-pulse bg-emerald-500" : "bg-amber-500"}`} />
                {marketStatus}
              </div>
            </div>

            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Current UTC Time</p>
                <p className="mt-2 text-4xl font-extrabold text-blue-600 dark:text-blue-400">{clock.toUTCString().slice(17, 25)}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Updates live to reflect active market windows.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Status</p>
                <p className={`mt-2 text-3xl font-extrabold ${open && active.length > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                  {open && active.length > 0 ? "Market momentum live" : "Market Closed"}
                </p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {open && active.length > 0 ? `Open sessions: ${activeNames}` : "No major forex session is active right now."}
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {SESSION_WINDOWS.map((session) => {
                const isOpen = open && sessionOpen(preciseHour, session);
                return (
                  <div
                    key={session.name}
                    className={`rounded-2xl border p-4 transition ${isOpen ? "border-emerald-300 bg-emerald-50 shadow-sm shadow-emerald-200/60 dark:border-emerald-700 dark:bg-emerald-900/20" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"}`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{session.name}</p>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${isOpen ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>
                        <span className={`h-2 w-2 rounded-full ${isOpen ? "animate-pulse bg-emerald-500" : "bg-slate-400"}`} />
                        {isOpen ? "Open" : "Closed"}
                      </span>
                    </div>
                    <p className="mt-3 text-xl font-extrabold text-slate-900 dark:text-white">
                      {`${String(session.open).padStart(2, "0")}:00 - ${String(session.close).padStart(2, "0")}:00 UTC`}
                    </p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      {isOpen ? "Open now and highlighted live." : "Awaiting next opening window."}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
      case "live-market-session-status": {
        const day = clock.getUTCDay();
        const hour = clock.getUTCHours();
        const open = (day > 0 && day < 5) || (day === 0 && hour >= 22) || (day === 5 && hour < 22);
        const active = open ? SESSION_WINDOWS.filter((session) => sessionOpen(hour + clock.getUTCMinutes() / 60, session)) : [];
        return (
          <div className="grid gap-4 md:grid-cols-3">
            <Card label="Market status" value={open ? "Open" : "Closed"} hint="Weekend and UTC timing aware." tone={open ? "green" : "red"} />
            <Card label="Active sessions" value={active.map((s) => s.name).join(", ") || "None"} hint="Useful for timing entries and volatility." tone="blue" />
            <Card label="UTC day" value={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day]} hint={clock.toUTCString().slice(17, 25)} tone="default" />
          </div>
        );
      }
      case "gold-lot-size-calculator": {
        const balance = Number(goldCalc.balance) || 0;
        const risk = Number(goldCalc.risk) || 0;
        const stopPips = Number(goldCalc.stop) || 0;
        const goldPrice = Number(goldCalc.price) || 0;

        const pipValuePerLot = 10;
        const dollarsPerPipPerOunce = 0.1;
        const stopPerOunce = stopPips * dollarsPerPipPerOunce;
        const riskAmount = (balance * risk) / 100;
        const lots = stopPips > 0 ? riskAmount / (stopPips * pipValuePerLot) : 0;
        const troyOunces = lots * 100;
        const pipValue = lots * pipValuePerLot;
        const notionalValue = troyOunces * goldPrice;

        const lotUnits = Math.max(0, Math.round(lots * 100));
        const standardLots = Math.floor(lotUnits / 100);
        const miniLots = Math.floor((lotUnits % 100) / 10);
        const microLots = lotUnits % 10;

        const riskPresets = [0.5, 1, 1.5, 2, 3];
        const stopPresets = [20, 50, 100, 200, 500];
        return (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.98fr]">
              <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">XAU/USD specifications</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">1 pip = $0.10 price movement · 1 standard lot = 100 troy oz · Pip value = $10/lot</p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Account Balance</label>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                    <span className="mr-2 text-lg font-bold text-slate-400 dark:text-slate-500">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={goldCalc.balance}
                      onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, "");
                        const normalized = onlyDigits.replace(/^0+(?=\d)/, "");
                        setGoldCalc({ ...goldCalc, balance: normalized || "0" });
                      }}
                      className="w-full bg-transparent text-2xl font-semibold text-slate-900 outline-none dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Risk Percentage</label>
                    <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">{risk.toFixed(1)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={goldCalc.risk}
                    onChange={(e) => setGoldCalc({ ...goldCalc, risk: Number(e.target.value) })}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-blue-600 dark:bg-slate-700"
                  />
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {riskPresets.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setGoldCalc({ ...goldCalc, risk: preset })}
                        className={`rounded-xl border px-3 py-2 text-sm font-bold transition ${Math.abs(risk - preset) < 0.001 ? "border-blue-500 bg-blue-600 text-white" : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"}`}
                      >
                        {preset}%
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Stop Loss (Pips)</label>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={String(stopPips)}
                      onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, "");
                        const normalized = onlyDigits.replace(/^0+(?=\d)/, "");
                        setGoldCalc({ ...goldCalc, stop: normalized || "0" });
                      }}
                      className="w-full bg-transparent text-2xl font-semibold text-slate-900 outline-none dark:text-white"
                    />
                    <span className="text-lg font-bold text-slate-400 dark:text-slate-500">pips</span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {stopPresets.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setGoldCalc({ ...goldCalc, stop: String(preset) })}
                        className={`rounded-xl border px-3 py-2 text-sm font-bold transition ${stopPips === preset ? "border-blue-500 bg-blue-600 text-white" : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"}`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Current Gold Price (XAU/USD)</label>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                    <span className="mr-2 text-lg font-bold text-slate-400 dark:text-slate-500">$</span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={goldCalc.price}
                      onChange={(e) => {
                        const sanitized = e.target.value.replace(/[^0-9.]/g, "");
                        const firstDot = sanitized.indexOf(".");
                        const normalizedDots = firstDot === -1
                          ? sanitized
                          : `${sanitized.slice(0, firstDot + 1)}${sanitized.slice(firstDot + 1).replace(/\./g, "")}`;
                        const normalizedLeading = normalizedDots.replace(/^0+(?=\d)/, "");
                        setGoldCalc({ ...goldCalc, price: normalizedLeading || "0" });
                      }}
                      className="w-full bg-transparent text-2xl font-semibold text-slate-900 outline-none dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Calculation Results</p>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Recommended Position Size</p>
                  <p className="mt-2 break-words text-4xl font-extrabold leading-tight text-blue-600 dark:text-blue-400 sm:text-5xl">{lots.toFixed(2)}<span className="ml-2 text-xl font-bold sm:text-2xl">lots</span></p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{troyOunces.toFixed(2)} troy ounces</p>
                </div>

                <div className="space-y-4">
                  <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Risk Amount</p>
                    <p className="mt-2 text-3xl font-extrabold leading-tight tabular-nums text-slate-900 dark:text-white sm:text-4xl">${riskAmount.toFixed(2)}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{risk.toFixed(1)}% of balance</p>
                  </div>
                  <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Pip Value</p>
                    <p className="mt-2 text-3xl font-extrabold leading-tight tabular-nums text-slate-900 dark:text-white sm:text-4xl">${pipValue.toFixed(2)}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">per pip movement</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Lot Breakdown</p>
                  <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center dark:border-slate-800 dark:bg-slate-900">
                      <p className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{standardLots}</p>
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">Standard</p>
                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">100 oz</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center dark:border-slate-800 dark:bg-slate-900">
                      <p className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{miniLots}</p>
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">Mini</p>
                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">10 oz</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center dark:border-slate-800 dark:bg-slate-900">
                      <p className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{microLots}</p>
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">Micro</p>
                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">1 oz</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
                  <div className="flex items-center justify-between border-b border-slate-200 py-2 text-sm dark:border-slate-700">
                    <span className="text-slate-500 dark:text-slate-400">Notional Value</span>
                    <span className="font-bold text-slate-900 dark:text-white">${notionalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 py-2 text-sm dark:border-slate-700">
                    <span className="text-slate-500 dark:text-slate-400">Gold Price Used</span>
                    <span className="font-bold text-slate-900 dark:text-white">${goldPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / oz</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Stop Loss</span>
                    <span className="font-bold text-slate-900 dark:text-white">{stopPips} pips (${stopPerOunce.toFixed(2)} per oz)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
              Educational model using fixed pip assumptions for XAU/USD. Live contract specs, spread, and broker margin rules may differ.
            </div>
          </div>
        );
      }
      case "compounding-calculator": {
        const startBalance = Number.parseFloat(compound.balance) || 0;
        const periods = Math.max(0, Number.parseInt(compound.periods, 10) || 0);
        const gainPerPeriod = Number.parseFloat(compound.gain) || 0;

        const handleCompoundCalculate = () => {
          setCompoundResult(calculateCompoundProjection(startBalance, periods, gainPerPeriod));
        };

        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Starting balance</label>
                <input
                  type="number"
                  value={compound.balance}
                  onChange={(e) => setCompound({ ...compound, balance: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Number of periods</label>
                <input
                  type="number"
                  value={compound.periods}
                  onChange={(e) => setCompound({ ...compound, periods: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Gain % per period</label>
                <input
                  type="number"
                  value={compound.gain}
                  onChange={(e) => setCompound({ ...compound, gain: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-start">
              <button
                type="button"
                onClick={handleCompoundCalculate}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-700"
              >
                Calculate
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card
                label="Ending balance"
                value={compoundResult.endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                hint="Projected balance after selected periods."
                tone="blue"
              />
              <Card
                label="Total gain"
                value={`${compoundResult.totalGain.toFixed(1)}%`}
                hint="Percentage growth from the starting balance."
                tone="green"
              />
            </div>
          </div>
        );
      }
      case "volatility-calculator": {
        const stopShare = volatility.range > 0 ? (volatility.stop / volatility.range) * 100 : 0;
        const targetShare = volatility.range > 0 ? (volatility.target / volatility.range) * 100 : 0;
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Input label="Average daily range (pips)" type="number" value={volatility.range} onChange={(e) => setVolatility({ ...volatility, range: Number(e.target.value) })} />
              <Input label="Planned stop loss (pips)" type="number" value={volatility.stop} onChange={(e) => setVolatility({ ...volatility, stop: Number(e.target.value) })} />
              <Input label="Target distance (pips)" type="number" value={volatility.target} onChange={(e) => setVolatility({ ...volatility, target: Number(e.target.value) })} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card label="Stop vs range" value={`${stopShare.toFixed(1)}%`} hint="How much of the average daily range your stop uses." tone="red" />
              <Card label="Target vs range" value={`${targetShare.toFixed(1)}%`} hint="How much of the average daily range your target expects." tone="blue" />
            </div>
          </div>
        );
      }
      case "correlation-tool": {
        const key = `${correlation.pair1}|${correlation.pair2}`;
        const reverseKey = `${correlation.pair2}|${correlation.pair1}`;
        const value = CORRELATIONS[key] ?? CORRELATIONS[reverseKey] ?? 0.12;
        const interpretation = value > 0.7 ? "Strong positive correlation" : value < -0.7 ? "Strong negative correlation" : Math.abs(value) > 0.4 ? "Moderate correlation" : "Weak correlation";
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Select label="Pair one" value={correlation.pair1} onChange={(e) => setCorrelation({ ...correlation, pair1: e.target.value })}>{PAIRS.map((pair) => <option key={pair}>{pair}</option>)}</Select>
              <Select label="Pair two" value={correlation.pair2} onChange={(e) => setCorrelation({ ...correlation, pair2: e.target.value })}>{PAIRS.map((pair) => <option key={pair}>{pair}</option>)}</Select>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card label="Correlation score" value={value.toFixed(2)} hint="Sample educational correlation estimate." tone={value >= 0 ? "blue" : "red"} />
              <Card label="Interpretation" value={interpretation} hint="Use this to judge whether combined exposure may duplicate or offset risk." tone="green" />
            </div>
          </div>
        );
      }
      default:
        return <Card label="Tool" value="Coming soon" hint="This tool module is being prepared." />;
    }
  }, [slug, positionSize, pipValue, riskReward, profitCalc, profitResult, clock, goldCalc, compound, compoundResult, volatility, correlation]);

  if (
    slug === "position-size-calculator"
    || slug === "pip-value-calculator"
    || slug === "risk-reward-calculator"
    || slug === "profit-calculator"
    || slug === "gold-lot-size-calculator"
    || slug === "compounding-calculator"
    || slug === "forex-session-clock"
  ) {
    return content;
  }

  return <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950/40">{content}</div>;
}