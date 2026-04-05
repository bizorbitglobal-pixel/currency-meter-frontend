import Breadcrumbs from "@/components/Breadcrumbs";
import AddSlot from "@/components/AddSlot";
import Script from "next/script";

export const metadata = {
  title: "FAQ | Currency Strength Meter",
  description: "Frequently asked questions about the Currency Strength Meter, forex trading, and how to use our tools for better trading decisions."
};

const faqs = [
  {
    question: "What is a Currency Strength Meter?",
    answer:
      "A Currency Strength Meter is a tool that visually displays the relative strength of major currencies in real time, helping traders identify the strongest and weakest currencies for better trading decisions."
  },
  {
    question: "How does the Currency Strength Meter work?",
    answer:
      "It analyzes price movements across multiple forex pairs and calculates the relative strength or weakness for each currency, giving you a quick overview of the market."
  },
  {
    question: "Is the Currency Strength Meter free to use?",
    answer:
      "Yes! Our tool is completely free and updates in real time for all users."
  },
  {
    question: "Can beginners use the Currency Strength Meter?",
    answer:
      "Absolutely. The tool is designed for both beginners and experienced traders to quickly understand market sentiment and make more informed trading decisions."
  },
  {
    question: "How often is the data updated?",
    answer:
      "The data is updated every few seconds to reflect the latest market conditions."
  },
  {
    question: "What forex pairs are supported?",
    answer:
      "We support all major and minor forex pairs, covering 28 pairs in total."
  },
  {
    question: "Can I use the meter for day trading or swing trading?",
    answer:
      "Yes, the meter is useful for both short-term and long-term trading strategies."
  },
  {
    question: "Do you offer educational resources?",
    answer:
      "Yes, check our blog for in-depth guides, strategies, and trading tips."
  },
  {
    question: "How do I contact support?",
    answer:
      "Use our contact form or email us directly at bizorbit.global@gmail.com."
  }
];

export default function FAQPage() {
  // Build FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
  return (
    <div className="font-sans max-w-4xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <Breadcrumbs />
      <AddSlot />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {faqs.map((faq, idx) => (
          <div key={idx} className="py-6">
            <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
            <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
          </div>
        ))}
      </div>
      <AddSlot />
      {/* JSON-LD FAQPage Schema for SEO */}
      <Script
        id="faqpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
