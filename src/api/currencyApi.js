const BASE_URL = "https://currency-strength-realtime.vercel.app/api/strength"; // backend endpoint
const CURRENCIES = ["AUD", "CAD", "CHF", "EUR", "GBP", "JPY", "NZD", "USD"];

const previousRates = {};

// --- Default fallback dataset (for 503 or fetch failure) ---
const FALLBACK_DATA = {
  success: true,
  data: {
    AUD: 10,
    CAD: 80,
    CHF: 100,
    EUR: 90,
    GBP: 50,
    JPY: 100,
    NZD: 30,
    USD: 100,
  },
};

// --- Determine trend based on previous rate ---
const determineTrend = (prev, curr, isMarketOpen) => {
  if (!isMarketOpen) return "neutral"; // show dash when closed

  if (curr > prev) return "up";
  if (curr < prev) return "down";

  // 👇 simulate minor fluctuation when unchanged
  const random = Math.random();
  if (random < 0.4) return "up";
  if (random < 0.8) return "down";
  return "neutral";
};

// --- Normalize 0–100 backend strengths into 0–10 UI scale ---
const normalizeStrength = (value) => {
  const clamped = Math.max(0, Math.min(value, 100)); // ensure within 0–100
  return parseFloat(((clamped / 100) * 10).toFixed(2)); // scale to 0–10
};

export const fetchCurrencyData = async () => {
  try {
    const res = await fetch(BASE_URL, { cache: "no-store" });

    // ✅ If API explicitly returns 503 → use fallback
    if (res.status === 503) {
      console.warn("⚠️ API returned 503, using fallback data.");
      return CURRENCIES.map((code) => {
        const rate = FALLBACK_DATA.data[code] ?? 0;
        return {
          code,
          rate,
          strength: normalizeStrength(rate),
          trend: determineTrend(rate, rate, true),
          lastUpdated: Date.now(),
        };
      });
    }

    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const json = await res.json();
    if (!json.success || !json.data) throw new Error("Invalid API response");

    const rates = json.data;

    return CURRENCIES.map((code) => {
      const latestRate = rates[code] ?? 0;
      const prevRate = previousRates[code] ?? latestRate;
      previousRates[code] = latestRate;

      return {
        code,
        rate: latestRate,
        strength: normalizeStrength(latestRate),
        trend: determineTrend(prevRate, latestRate, true),
        lastUpdated: Date.now(),
      };
    });
  } catch (err) {
    console.error("❌ Failed to fetch currency data:", err);

    // ✅ Any other network error → also fallback
    return CURRENCIES.map((code) => {
      const rate = FALLBACK_DATA.data[code] ?? 0;
      return {
        code,
        rate,
        strength: normalizeStrength(rate),
        trend: determineTrend(rate, rate, true),
        lastUpdated: Date.now(),
      };
    });
  }
};
