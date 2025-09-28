import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Currency Strength Meter | Live Forex Currency Strength & Weakness Analysis",
  description:
    "Analyze real-time forex currency strength and weakness. Identify the strongest and weakest currencies instantly to improve your trading decisions. Free Currency Strength Meter tool for traders.",
  keywords:
    "currency strength meter, live forex strength, forex currency strength, strongest currency today, weakest currency today, real-time forex analysis, forex trading tool, currency comparison, forex heatmap, forex market analysis, forex strength indicator",
  openGraph: {
    title: "Currency Strength Meter | Real-Time Forex Strength Analysis",
    description:
      "Track live forex currency strength with our free Currency Strength Meter. Instantly compare the strongest and weakest currencies in real-time to boost your forex trading strategies and improve market analysis.",
    url: "https://www.currencystrengthmeter.com",
    siteName: "Currency Strength Meter",
    images: [
      {
        url: "https://www.currencystrengthmeter.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Currency Strength Meter",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Currency Strength Meter | Real-Time Forex Strength Analysis",
    description:
      "Track live forex currency strength with our free Currency Strength Meter. Instantly compare the strongest and weakest currencies in real-time to boost your forex trading strategies and improve market analysis.",
    images: ["https://www.currencystrengthmeter.com/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* ✅ Next.js injects metadata here automatically */}
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}

        {/* Google AdSense script should be placed here */}
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXX"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
