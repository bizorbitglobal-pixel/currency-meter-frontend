const BASE_URL = "https://api.frankfurter.app";
const CURRENCIES = ["AUD", "CAD", "CHF", "EUR", "GBP", "JPY", "NZD", "USD"];
const API_URL = `${BASE_URL}/latest?base=USD&symbols=${CURRENCIES.join(",")}`;

// Simple USD-based strength calculation
const calculateStrength = (rate) => {
  if (rate < 1) return 8;       // Very strong vs USD
  if (rate < 2) return 6;       // Moderately strong
  if (rate < 50) return 4;      // Neutral/weak
  return 2;                     // Very weak
};

export const fetchCurrencyData = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`Frankfurter API error: ${res.status}`);
    }

    const data = await res.json();

    if (data && data.rates) {
      const updated = Object.entries(data.rates).map(([code, rate]) => ({
        code,
        strength: calculateStrength(rate),
        trend: "neutral", // can be enhanced later
      }));

      // Ensure USD is included manually (Frankfurter omits base currency)
      if (!updated.find((c) => c.code === "USD")) {
        updated.push({ code: "USD", strength: 5, trend: "neutral" });
      }

      return updated;
    }

    return [];
  } catch (error) {
    console.error("API fetch failed:", error);
    return [];
  }
};
