import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Currency Strength Meter | Live Forex Currency Strength & Weakness Analysis | Live Currency Strength Meter | Currency Strength Indicator | Forex Heatmap / Strength Meter",
  description:
    "Analyze real-time forex currency strength and weakness. Identify the strongest and weakest currencies instantly to improve your trading decisions. Free Currency Strength Meter tool for traders.",
  keywords: [
    "currency strength meter",
    "live forex strength",
    "forex currency strength",
    "strongest currency today",
    "weakest currency today",
    "real-time forex analysis",
    "forex trading tool",
    "currency comparison",
    "forex heatmap",
    "forex market analysis",
    "forex strength indicator",
    "best currency strength meter 2025",
    "live currency strength meter free",
    "forex strength vs weakness indicator",
    "currency strength ranking today",
    "currency strength dashboard live",
    "multi-currency comparison tool",
    "forex meter strongest and weakest",
    "real time forex strength tool",
    "currency strength indicator mt4 alternative",
    "currency strength heatmap live",
    "forex market sentiment strength",
    "forex correlation and strength meter",
    "forex currency power indicator",
    "compare strongest vs weakest forex pairs",
    "forex strength and weakness analyzer",
    "forex trend strength indicator",
    "currency index strength comparison",
    "forex pair correlation heatmap",
    "daily forex strength and weakness report",
    "real-time forex market scanner",
    "free online forex strength calculator",
    "currency strength index for traders",
    "forex volatility and strength meter",
    "currency strength meter app",
    "currency strength meter for beginners",
    "currency strength trading strategies",
    "forex strength meter best settings",
    "currency strength meter explained",
    "forex pair strength comparison",
    "currency strength analysis today",
    "currency strength meter for scalping",
    "forex scalping currency strength",
    "best forex indicators for beginners",
    "currency strength meter download",
    "currency strength vs currency weakness",
    "forex strongest currency right now",
    "weakest forex currency live",
    "how to trade with currency strength meter",
    "currency strength strategy forex",
    "free forex tools for traders",
    "forex currency index strength",
    "real-time forex indicator free",
    "currency meter forex software",
    "best forex heatmap 2025",
    "currency meter indicator download",
    "forex pairs correlation indicator",
    "currency meter live trading",
    "forex daily strength and weakness",
    "currency power meter online",
    "forex strength index chart",
    "how to read forex currency strength",
    "forex market sentiment live",
    "strongest forex pairs to trade",
    "weakest forex pairs to avoid",
    "forex market scanner free",
    "forex trading tools for beginners",
    "forex advanced analysis tools",
    "forex volume strength indicator",
    "real-time forex charting tools",
    "forex news and strength meter",
    "forex volatility indicator free",
    "forex day trading currency strength",
    "best forex pairs today",
    "forex meter strongest pairs",
    "forex meter weakness finder",
    "currency pair trend strength",
    "currency meter trading system",
    "currency meter with live updates",
    "currency index trading strategies",
    "forex breakout and strength meter",
    "currency heatmap trading guide",
    "forex fundamental strength indicator",
    "forex currency performance tracker",
    "currency power index forex",
    "forex market monitoring tool",
    "currency strength signals free",
    "forex pair analyzer live",
    "forex momentum strength indicator",
    "forex strength meter vs heatmap",
    "forex real-time market dashboard",
    "forex trend power indicator",
    "forex confluence with currency strength",
    "forex major pairs strength today",
    "forex cross pairs weakness today",
    "currency strength meter for intraday trading",
    "currency strength meter for swing trading",
    "best currency strength meter indicator",
    "currency strength meter tradingview",
    "currency strength meter mt5 alternative",
    "currency strength meter app android",
    "currency strength meter ios app",
    "currency strength meter without repaint",
    "currency strength meter with alerts",
    "forex live currency comparison",
    "forex currency power strength",
    "forex strength meter real time app",
    "forex best strength meter online",
    "forex strength meter advanced",
    "currency strength heatmap free",
    "currency strength strategy pdf",
    "forex currency analyzer live",
    "forex strongest weakest pairs live",
    "forex weekly strength and weakness",
    "forex monthly strength chart",
    "forex sentiment analysis tool",
    "forex real-time signal strength",
    "currency meter with historical data",
    "forex power strength dashboard",
    "forex multi timeframe strength meter",
    "forex market heatmap indicator",
    "forex pairs analyzer free",
    "forex live market scanner",
    "forex top performing currency",
    "forex weakest performing currency",
    "forex cross pair strength analysis",
    "forex currency basket trading",
    "forex strength meter vs rsi",
    "forex volume and strength indicator",
    "forex oscillator vs strength meter",
    "forex major currency index",
    "forex minor currency index",
    "forex exotic pairs strength meter",
    "forex multi-pair scanner",
    "forex trend analyzer live",
    "forex daily trend strength",
    "forex trading confluence tools",
    "forex news impact on strength",
    "forex strength and divergence",
    "forex multi-indicator strength meter",
    "forex strength meter with dashboard",
    "forex live market summary",
    "forex trade entry strength tool",
    "forex reversal strength indicator",
    "forex breakout currency strength",
    "forex scalping with strength meter",
    "forex swing trading strength setup",
    "forex position trading with strength",
    "forex day trading live meter",
    "forex global currency strength",
    "forex major vs minor comparison",
    "forex technical vs fundamental strength",
    "forex cross strength indicator",
    "forex hedging with strength meter",
    "forex arbitrage with currency strength",
    "forex risk sentiment strength",
    "forex volatility and weakness",
    "forex USD strength today",
    "forex EUR strength today",
    "forex GBP strength today",
    "forex JPY strength today",
    "forex AUD strength today",
    "forex CAD strength today",
    "forex CHF strength today",
    "forex NZD strength today",
    "forex dollar index vs strength meter",
    "forex commodity currencies strength",
    "forex currency strength live chart",
    "forex strength dashboard advanced",
    "forex AI strength meter",
    "forex machine learning strength tool",
    "forex automated strength analysis",
    "forex algorithm strength meter",
    "forex predictive currency strength",
    "forex historical performance meter",
    "forex sentiment index live",
    "forex strength based strategy",
    "forex correlation and strength dashboard",
    "forex trading heatmap live",
    "forex advanced market scanner",
    "forex strength meter with alerts",
    "forex push notification strength meter",
    "forex email alert strength analysis",
    "forex trend and sentiment meter",
    "forex live correlation tool",
    "forex live dashboard signals",
    "forex market screener with strength",
    "forex crypto and forex strength meter",
    "forex gold strength today",
    "forex oil impact on currency strength",
    "forex stock indices and strength",
    "forex combined strength dashboard",
    "forex trading app with strength meter",
    "forex mobile currency meter",
    "forex multi-device strength sync",
    "forex web based strength meter",
    "forex lightweight strength tool",
    "forex cloud strength analyzer",
    "forex API for currency strength",
    "forex developer tools strength meter",
    "forex customizable dashboard meter"
  ],
  openGraph: {
    title: "Currency Strength Meter | Live Forex Currency Strength & Weakness Analysis | Live Currency Strength Meter | Currency Strength Indicator | Forex Heatmap / Strength Meter",
    description:
      "Track live forex currency strength with our free Currency Strength Meter. Instantly compare the strongest and weakest currencies in real-time to boost your forex trading strategies and improve market analysis.",
    url: "https://www.currencystrengthsmeters.com/",
    siteName: "Currency Strength Meter",
    images: [
      {
        url: "https://www.currencystrengthsmeters.com/og-image.png",
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
    title: "Currency Strength Meter | Live Forex Currency Strength & Weakness Analysis | Live Currency Strength Meter | Currency Strength Indicator | Forex Heatmap / Strength Meter",
    description:
      "Track live forex currency strength with our free Currency Strength Meter. Instantly compare the strongest and weakest currencies in real-time to boost your forex trading strategies and improve market analysis.",
    images: ["https://www.currencystrengthsmeters.com/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense verification meta */}
        <meta
          name="google-adsense-account"
          content="ca-pub-7433238339097067"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        {/* JSON-LD Structured Data for Organization */}
        <Script id="organization-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            url: "https://www.currencystrengthsmeters.com",
            logo: "https://www.currencystrengthsmeters.com/favicon-32x32.png",
          })}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Analytics />

        {/* ✅ Google Analytics gtag.js */}
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

        {/* ✅ Google AdSense script */}
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js?client=ca-pub-7433238339097067"
          crossOrigin="anonymous"
        />

        {/* ✅ AdSense Ad Slot */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-7433238339097067"
          data-ad-slot="1627966618"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <Script id="adsense-init" strategy="afterInteractive">
          {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </Script>
      </body>
    </html>
  );
}
