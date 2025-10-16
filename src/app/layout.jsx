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
    "Currency Strength Meter | Live Forex Strength Tool (2025)",
  description:
    "Live Currency Strength Meter — free real-time forex strength tool showing strongest and weakest currencies. Track USD, EUR, GBP, JPY, and more with live updates.",
  keywords: keywords,
  openGraph: {
    title: "Currency Strength Meter | Live Forex Strength Tool (2025)",
    description:
      "Analyze live forex trends and currency strengths to find the strongest and weakest currencies instantly.",
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
    title: "Currency Strength Meter | Live Forex Strength Tool (2025)",
    description:
      "Track the strongest and weakest forex currencies in real time with our live currency strength tool.",
    images: ["https://www.currencystrengthsmeters.com/og-image.png"],
  },
  icons: { icon: "/favicon.ico" },
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
