import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import keywords from "./keywords.json";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({ subsets: ["latin"] });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: "#ffffff",
};

export const metadata = {
  title: "Currency Strength Meter - Live Forex Strength Indicator | Free Trading Tool",
  description:
    "Free real-time Currency Strength Meter helps forex traders identify the strongest and weakest currencies instantly. Analyze 28 forex pairs and spot high-probability trading opportunities with our live currency strength indicator.",
  keywords: keywords,
  applicationName: "Currency Strength Meter",
  appleWebApp: {
    title: "Currency Strength Meter",
  },
  other: {
    "google-adsense-account": "ca-pub-7433238339097067",
  },
  openGraph: {
    title: "Currency Strength Meter - Free Live Forex Strength Indicator",
    description:
      "Free real-time Currency Strength Meter—your professional forex analysis tool. Identify strongest and weakest currencies, analyze 28 forex pairs, and make better trading decisions. Beginner-friendly, no fees.",
    url: "https://www.currencystrengthsmeters.com/",
    siteName: "Currency Strength Meter",
    images: [
      {
        url: "https://www.currencystrengthsmeters.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Currency Strength Meter - Live Forex Analysis Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Currency Strength Meter - Live Forex Analysis",
    description:
      "Free real-time forex strength meter. Identify strongest and weakest currencies, analyze forex pairs live, and improve your trading strategy with our professional currency analysis tool.",
    images: ["https://www.currencystrengthsmeters.com/og-image.png"],
  },
  icons: { icon: "/favicon.ico" },
  appleIcon: "/apple-touch-icon.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className}`}
      >
        {children}
        <CookieConsent />
        <Analytics />

        {/* ✅ JSON-LD: Organization Schema */}
        <Script
          id="json-ld-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Currency Strength Meter",
              url: "https://www.currencystrengthsmeters.com",
              logo: "https://www.currencystrengthsmeters.com/favicon-32x32.png",
              sameAs: [
                "https://www.facebook.com/",
                "https://twitter.com/",
                "https://www.linkedin.com/",
              ],
            }),
          }}
        />

        {/* ✅ JSON-LD: Website Schema */}
        <Script
          id="json-ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Currency Strength Meter",
              alternateName: "Live Currency Strength Meter",
              url: "https://www.currencystrengthsmeters.com",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.currencystrengthsmeters.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "Currency Strength Meter",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.currencystrengthsmeters.com/favicon-32x32.png",
                },
              },
            }),
          }}
        />

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
