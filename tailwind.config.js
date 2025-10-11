/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "#334155",
            h1: { fontWeight: "700", color: "#0f172a" },
            h2: { fontWeight: "600", color: "#1e3a8a" },
            p: { color: "#475569" },
            a: {
              color: "#2563eb",
              "&:hover": { textDecoration: "underline" },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
