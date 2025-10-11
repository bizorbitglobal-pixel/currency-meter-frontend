export default function Head() {
  return (
    <>
      {/* ✅ Basic Meta Tags */}
      <meta name="application-name" content="Currency Strength Meter" />
      <meta name="apple-mobile-web-app-title" content="Currency Strength Meter" />
      <meta name="google-adsense-account" content="ca-pub-7433238339097067" />
      <meta
        name="theme-color"
        content="#ffffff"
      />

      {/* ✅ Favicons */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* ✅ JSON-LD: Organization Schema */}
      <script
        type="application/ld+json"
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
      <script
        type="application/ld+json"
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

      {/* ✅ JSON-LD: FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is a Currency Strength Meter?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A Currency Strength Meter is a forex trading tool that compares the strength of major currencies in real-time, helping traders identify the strongest and weakest currencies.",
                },
              },
              {
                "@type": "Question",
                name: "How does a Currency Strength Meter work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It analyzes price movements across different forex pairs and calculates relative strength or weakness for each currency, giving you a quick market overview.",
                },
              },
              {
                "@type": "Question",
                name: "Which currency is the strongest today?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The strongest currency changes throughout the day depending on market movements. You can view live updates directly in our tool.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use the Currency Strength Meter for free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes! Our Currency Strength Meter is completely free to use with real-time updates for traders worldwide.",
                },
              },
              {
                "@type": "Question",
                name: "Is the Currency Strength Meter suitable for beginners?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Absolutely. Beginners can use it to quickly understand market sentiment and make more informed forex trading decisions.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
