export default function Head() {
  return (
    <>
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
      