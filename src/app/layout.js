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
  title:
    "Currency Strength Meter |  Live Currency Strength Meter | Live Forex Currency Strength & Weakness Analysis | Currency Strength Indicator",
  siteName: "Currency Strength Meter",
  description:
    "Currency Strength Meter is a live forex tool that tracks the strength and weakness of global currencies. Use our Currency Strength Meter to analyze real-time forex trends and identify the strongest and weakest currencies instantly. The Currency Strength Meter helps traders make better trading decisions with accurate data and easy analysis. Best Currency Strength Meter for forex traders.",
  keywords: [
    "currency strength meter",
    "forex strength meter",
    "currency strength",
    "currency strength meter mt4",
    "currency strength chart",
    "live currency strength meter",
    "forex currency strength meter",
    "currency meter",
    "currency strength meter daily",
    "forex meter",
    "currency strength indicator mt4",
    "live charts currency strength meter",
    "forex currency strength",
    "free currency strength meter",
    "forex meter live",
    "forex strength",
    "best currency strength meter",
    "currency strength meter mt4 free download",
    "trend meter indicator mt4",
    "currency strength metre",
    "forex currency meter",
    "currency meter mt4",
    "currency strength index",
    "fx currency strength meter",
    "currency relative strength indicator mt4",
    "finviz forex currency strength meter",
    "livecharts currency strength",
    "currency strength chart live",
    "marketmilk currency strength",
    "currency meter indicator",
    "usd strength meter",
    "28 pairs currency strength indicator",
    "5 minute currency strength meter",
    "accurate currency strength meter",
    "accurate currency strength meter live",
    "accurate currency strength meter mt4",
    "accustrength currency strength meter",
    "adam khoo currency strength meter",
    "adam khoo currency strength meter free download",
    "all currency strength meter",
    "babypips currency strength",
    "babypips currency strength meter",
    "babypips strength meter",
    "best currency meter",
    "best currency strength indicator",
    "best currency strength indicator free download",
    "best currency strength indicator mt4",
    "best currency strength meter 2021",
    "best currency strength meter mt4",
    "best currency strength meter mt4 download",
    "best currency strength meter online",
    "best forex currency strength meter",
    "best forex strength meter",
    "best free currency strength meter",
    "calculate currency strength",
    "coin strength meter",
    "csm currency strength meter",
    "ctrader currency strength meter",
    "currency chart meter",
    "currency exchange meter",
    "currency heat meter",
    "currency heatwave pc",
    "currency live meter",
    "currency live strength meter",
    "currency market strength",
    "currency meter chart",
    "currency meter indicator mt4",
    "currency meter live",
    "currency meter mt5",
    "currency meter online",
    "currency meter strength download",
    "currency meter strength indicator",
    "currency meter strength live",
    "currency momentum meter",
    "currency momentum strength meter",
    "currency pair meter",
    "currency pair strength",
    "currency pair strength indicator mt4",
    "currency pair strength meter",
    "currency power indicator mt4",
    "currency power meter",
    "currency power meter indicator",
    "currency power meter indicator mt4",
    "currency quake currency strength meter",
    "currency quake meter",
    "currency signal strength",
    "currency strength indicator",
    "fx blue currency strength",
    "absolute currency strength for mt4",
    "advanced currency strength28 indicator",
    "advanced currency strength28 indicator free download",
    "advanced dashboard for currency strength and speed",
    "aud currency strength",
    "bluefx currency strength",
    "british pound strength",
    "currency index indicator",
    "currency index indicator mt4",
    "currency index strength",
    "currency indicator mt4",
    "currency relative strength",
    "currency slope strength",
    "currency slope strength indicator mt4",
    "currency strength analysis",
    "currency strength and weakness",
    "currency strength and weakness indicator",
    "currency strength app",
    "currency strength by country",
    "currency strength chart mt4",
    "currency strength com",
    "currency strength comparison",
    "currency strength dashboard",
    "currency strength dashboard mt4",
    "currency strength ea",
    "currency strength ea mt4",
    "currency strength expert advisor",
    "currency strength graph",
    "currency strength index mt4",
    "currency strength indicator download",
    "currency strength indicator free download",
    "currency strength indicator mt4 free download",
    "currency strength indicator mt5",
    "currency strength indicator online",
    "currency strength list",
    "currency strength live",
    "currency strength live charts",
    "currency strength meter adam khoo",
    "currency strength meter adam khoo download",
    "currency strength meter babypips",
    "currency strength meter calculation",
    "currency strength meter chart",
    "currency strength meter com",
    "currency strength meter dashboard",
    "currency strength meter download mt5",
    "currency strength meter ea",
    "currency strength meter ex4",
    "currency strength meter finviz",
    "currency strength meter for mt5",
    "currency strength meter free download",
    "currency strength meter fx blue",
    "currency strength meter indicator",
    "currency strength meter indicator free download",
    "currency strength meter indicator mt4",
    "currency strength meter indicator mt4 download",
    "currency strength meter indicator mt4 free download",
    "currency strength meter indicator mt5",
    "currency strength meter live chart",
    "currency strength meter livecharts",
    "currency strength meter livecharts co uk",
    "currency strength meter mq4",
    "currency strength meter mql5",
    "currency strength meter mt4 adam khoo",
    "currency strength meter mt4 download",
    "currency strength meter mt5",
    "currency strength meter mt5 download",
    "currency strength meter mt5 free download",
    "currency strength meter online",
    "currency strength meter online free",
    "currency strength meter org",
    "currency strength meter real time",
    "currency strength meter strategy",
    "currency strength meter today",
    "currency strength meter website",
    "currency strength meter with time frame",
    "currency strength mq4",
    "currency strength mt4",
    "currency strength mt5",
    "currency strength oanda",
    "currency strength online",
    "currency strength predictor",
    "currency strength quake",
    "currency strength strategy",
    "currency strength table",
    "currency strength today",
    "currency strength trader",
    "currency strength trading",
    "currency strength trading strategy",
    "currency strength website",
    "currency trade meter",
    "currency trend meter",
    "currencystrengthmeter com website",
    "current currency strength",
    "current currency strength meter",
    "daily currency strength and weakness analysis",
    "dashboard currency meter v3 mq4",
    "download currency strength indicator mt4",
    "download currency strength meter for pc",
    "download currency strength meter mt4",
    "eur usd strength meter",
    "euro currency strength",
    "finviz com forex ashx finviz currency strength meter",
    "finviz currency meter",
    "finviz currency strength",
    "finviz currency strength meter",
    "finviz forex currency strength",
    "foreign currency strength",
    "foreign currency strength meter",
    "forex currency meter indicator",
    "forex currency meter v3",
    "forex currency pair strength",
    "forex currency strength chart",
    "forex currency strength dashboard",
    "forex currency strength indicator",
    "forex currency strength meter indicator",
    "forex currency strength meter live",
    "forex currency strength meter mt4",
    "forex currency strength meter online",
    "forex live currency strength",
    "forex market strength",
    "forex meter currency",
    "forex meter indicator",
    "forex meter indicator free",
    "forex momentum meter",
    "forex pair strength",
    "forex pair strength meter",
    "forex relative strength",
    "forex strength chart",
    "forex strength index",
    "forex strength indicator",
    "forex strength meter indicator",
    "forex strength meter live",
    "forex strength meter online",
    "forex trend meter",
    "forex watchers currency strength",
    "forexfactory currency strength meter",
    "forexmeter",
    "free currency strength",
    "free currency strength indicator mt4",
    "free currency strength meter for windows",
    "free currency strength meter indicator mt4",
    "free currency strength meter mt4",
    "free download currency strength meter indicator mt4",
    "free forex currency power dashboard",
    "fx blue currency strength meter",
    "fx blue relative currency strength",
    "fx currency strength",
    "gbp currency strength",
    "gbp strength meter",
    "indicator currency strength meter",
    "jpy currency strength",
    "jpy strength",
    "jpy strength index",
    "lc currency strength meter",
    "live chart strength meter",
    "live charts currency meter",
    "live currency meter",
    "live currency strength indicator",
    "live currency strength meter online",
    "live forex currency strength meter",
    "live forex strength meter",
    "live strength meter",
    "livechart forex currency strength",
    "livecharts co uk strength meter",
    "livecharts currency meter",
    "livecharts currency strength meter",
    "livecharts strength meter",
    "logikfx currency strength meter",
    "logikfx macro currency strength",
    "macro currency strength meter",
    "macro currency strength meter by logikfx",
    "market strength meter",
    "marketmilk currency strength meter",
    "momentum meter indicator mt4 download",
    "money strength meter",
    "most accurate currency strength meter",
    "mt4 currency power",
    "mt4 currency strength indicator free download",
    "mt5 currency strength meter",
    "multi time frame currency strength meter mt4",
    "myfxbook currency strength",
    "oanda currency strength meter",
    "piranha profits currency strength meter",
    "piranha profits currency strength meter download",
    "professional multi currency strength tool",
    "quantum currency strength indicator",
    "quantum currency strength indicator free download",
    "rand strength today",
    "rsi currency strength meter",
    "sgd currency strength",
    "sgd strength",
    "strength currency chart",
    "strength currency pair",
    "strength index currency",
    "strength indicator mt4",
    "strength meter currency",
    "strength meter indicator",
    "strength meter indicator mt4",
    "strong weak currency indicator",
    "the best currency strength meter",
    "the currency strength meter",
    "the currency strength meter download",
    "trend strength indicator mt5",
    "triopips currency strength meter",
    "true currency strength meter",
    "usd currency meter",
    "usd currency strength",
    "usd currency strength today",
    "usd strength indicator",
    "weekly currency strength meter",
    "world currency meter",
    "world currency strength",
    "www currency strength com",
    "www currency strength meter",
    "www currency strength meter com",
    "currencystrengthmeter.org",
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
    "forex customizable dashboard meter",
    "best currency strength meter online free",
    "most accurate currency strength meter",
    "forex real-time currency strength comparison",
    "forex live currency strength ranking",
    "forex currency strength meter for professionals",
    "forex currency strength meter for experts",
  ],
  openGraph: {
    title:
      "Currency Strength Meter |  Live Currency Strength Meter | Live Forex Currency Strength & Weakness Analysis | Currency Strength Indicator",
    description:
      "Currency Strength Meter is a live forex tool that tracks the strength and weakness of global currencies. Use our Currency Strength Meter to analyze real-time forex trends and identify the strongest and weakest currencies instantly. The Currency Strength Meter helps traders make better trading decisions with accurate data and easy analysis. Best Currency Strength Meter for forex traders.",
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
    title:
      "Currency Strength Meter | Live Forex Currency Strength & Weakness Analysis | Live Currency Strength Meter | Currency Strength Indicator | Forex Heatmap / Strength Meter",
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
        <meta name="google-adsense-account" content="ca-pub-7433238339097067" />
        <meta name="application-name" content="Currency Strength Meter" />
        <meta
          name="apple-mobile-web-app-title"
          content="Currency Strength Meter"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        {/* JSON-LD Structured Data for Organization */}
        <Script id="organization-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            url: "https://www.currencystrengthsmeters.com",
            logo: "https://www.currencystrengthsmeters.com/favicon-32x32.png",
          })}
        </Script>
         {/* ✅ Your EffectiveGate ad script */}
        <div className="flex justify-center w-full my-4">
          <div id="container-7076df2eeb869e5e6f25661a6c818963" />
        </div>

        <Script
          id="effectivegate-ad"
          src="//pl27824467.effectivegatecpm.com/7076df2eeb869e5e6f25661a6c818963/invoke.js"
          async
          data-cfasync="false"
          strategy="lazyOnload"
        />
        <Script id="website-structured-data" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Currency Strength Meter",
            alternateName: "Live Currency Strength Meter",
            url: "https://www.currencystrengthsmeters.com/",
            publisher: {
              "@type": "Organization",
              name: "Currency Strength Meter",
              url: "https://www.currencystrengthsmeters.com",
              logo: {
                "@type": "ImageObject",
                url: "https://www.currencystrengthsmeters.com/favicon.ico",
              },
            },
          })}
        </Script>
        {/* ✅ Google Tag Manager (Script) */}
        {/* <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-M3ZWWFT8');
            `,
          }}
        /> */}
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
        {/* ✅ Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M3ZWWFT8"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>
      </body>
    </html>
  );
}
