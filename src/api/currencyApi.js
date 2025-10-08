const BASE_URL = "https://currency-strength-meter-node-backen.vercel.app/api/fetch-data"; // backend endpoint
const CURRENCIES = ["AUD", "CAD", "CHF", "EUR", "GBP", "JPY", "NZD", "USD"];

const previousRates = {};

// Determine trend based on previous rate
const determineTrend = (prev, curr) => {
  if (curr > prev) return "up";
  if (curr < prev) return "down";
  return "neutral";
};

// Convert all currency rates to 0–10 strength scale with logarithmic normalization
const calculateStrengths = (rates) => {
  const logRates = {};
  for (const [code, rate] of Object.entries(rates)) {
    // Avoid log(0) and negative values
    logRates[code] = Math.log(rate > 0 ? rate : 1e-6);
  }

  const values = Object.values(logRates);
  const max = Math.max(...values);
  const min = Math.min(...values);

  const strengths = {};
  for (const [code, value] of Object.entries(logRates)) {
    let strength = max === min ? 5 : ((value - min) / (max - min)) * 10;

    // ✅ Ensure minimum visible bar (avoid “zero” strength)
    if (strength < 1) strength = 1;

    strengths[code] = parseFloat(strength.toFixed(2));
  }

  return strengths;
};

export const fetchCurrencyData = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const json = await res.json();
    if (!json.success || !json.currencies) return [];

    // Build rates object from backend response
    const rates = {};
    CURRENCIES.forEach((code) => {
      const rate = json.currencies[code]?.rate ?? 1;
      rates[code] = rate;
    });

    // Calculate 0–10 strengths
    const strengths = calculateStrengths(rates);

    // Prepare data for UI
    return CURRENCIES.map((code) => {
      const latestRate = rates[code];
      const prevRate = previousRates[code] ?? latestRate;
      previousRates[code] = latestRate;

      return {
        code,
        rate: latestRate,
        strength: strengths[code],
        trend: determineTrend(prevRate, latestRate),
        lastUpdated: json.currencies[code]?.lastUpdated ?? Date.now(),
      };
    });
  } catch (err) {
    console.error("Failed to fetch currency data:", err);
    return [];
  }
};
