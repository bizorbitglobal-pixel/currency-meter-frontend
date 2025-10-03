import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

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
    url: "https://www.currencystrengthsmeters.com/",
    siteName: "Currency Strength Meter",
    images: [
      {
        url: "https://www.currencystrengthsmeters.com//og-image.png",
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
    images: ["https://www.currencystrengthsmeters.com/og-image.png"],
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
        <Analytics />
        {/* Google Tag Manager */}
        {/* <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-M3ZWWFT8');</script> */}
       {/* End Google Tag Manager  */}
       {/* Google Tag Manager (noscript) */}
      {/* <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M3ZWWFT8"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> */}
      {/* End Google Tag Manager (noscript) */}
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
