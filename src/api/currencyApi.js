const API_URL =
  "https://api.currencylayer.com/live?access_key=d71119345598612a7f326efca0d4e074&source=USD&currencies=EUR,GBP,CAD,PLN,INR";

// Simple USD-based strength calculation
const calculateStrength = (rate) => {
  if (rate < 1) return 8;       // Strong vs USD
  if (rate < 2) return 6;       // Moderately strong
  if (rate < 50) return 4;      // Neutral/weak
  return 2;                     // Very weak
};

export const fetchCurrencyData = async () => {
  try {
    const res = await fetch(API_URL)
    const data = await res.json();

    if (data.success && data.quotes) {
      const updated = Object.entries(data.quotes).map(([pair, rate]) => {
        const code = pair.replace("USD", ""); // e.g. USDEUR → EUR
        return {
          code,
          strength: calculateStrength(rate),
          trend: "neutral", // later we can add trend logic
        };
      });

      // Add USD itself as neutral reference
      updated.push({ code: "USD", strength: 5, trend: "neutral" });

      return updated;
    }
    return [];
  } catch (error) {
    console.error("API fetch failed:", error);
    return [];
  }
};
