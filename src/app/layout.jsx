import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import keywords from "./keywords.json";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title:
    "Currency Strength Meter - Live Forex Strength Indicator (2025)",
  description:
    "Currency Strength Meter is a live forex strength indicator that helps traders to identify the strongest and weakest currencies in real time.It exists for MT4, MT5, TradingView, and as a web-based tool. We can help you improve your forex trading strategy by providing accurate currency strength analysis.",
  keywords: keywords,
  openGraph: {
    title: "Currency Strength Meter - Live Forex Strength Indicator (2025)",
    description:
      "Currency Strength Meter is a live forex strength indicator that helps traders to identify the strongest and weakest currencies in real time.It exists for MT4, MT5, TradingView, and as a web-based tool. We can help you improve your forex trading strategy by providing accurate currency strength analysis.",
    url: "https://www.currencystrengthsmeters.com/",
    images: [
      {
        url: "https://www.currencystrengthsmeters.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Currency Strength Meter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Currency Strength Meter - Live Forex Strength Indicator (2025)",
    description:
      "Currency Strength Meter is a live forex strength indicator that helps traders to identify the strongest and weakest currencies in real time.It exists for MT4, MT5, TradingView, and as a web-based tool. We can help you improve your forex trading strategy by providing accurate currency strength analysis.",
    images: ["https://www.currencystrengthsmeters.com/og-image.png"],
  },
  icons: { icon: "/favicon.ico" },
  appleIcon: "/apple-touch-icon.png",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Currency Strength Meter",
    "url": "https://www.currencystrengthsmeters.com/",
    "description": "Currency Strength Meter is a live forex strength indicator that helps traders to identify the strongest and weakest currencies in real time. We can help you improve your forex trading strategy by providing accurate currency strength analysis.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.currencystrengthsmeters.com/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.className}`}>
        {children}
        <Analytics />

        {/* ✅ Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-P81G6N8EHJ"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P81G6N8EHJ');
          `}
        </Script>

        {/* ✅ Google AdSense */}
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js?client=ca-pub-7433238339097067"
          crossOrigin="anonymous"
        />

        {/* ✅ GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M3ZWWFT8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      </body>
    </html>
  );
}
