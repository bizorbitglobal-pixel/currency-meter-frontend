"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is a Currency Strength Meter?",
    answer:
      "A Currency Strength Meter is a forex trading tool that compares the strength of major currencies in real-time, helping traders identify the strongest and weakest currencies.",
  },
  {
    question: "How does a Currency Strength Meter work?",
    answer:
      "It analyzes price movements across different forex pairs and calculates relative strength or weakness for each currency, giving you a quick market overview.",
  },
  {
    question: "Which currency is the strongest today?",
    answer:
      "The strongest currency changes throughout the day depending on market movements. You can view live updates directly in our tool.",
  },
  {
    question: "Can I use the Currency Strength Meter for free?",
    answer:
      "Yes! Our Currency Strength Meter is completely free to use with real-time updates for traders worldwide.",
  },
  {
    question: "Is the Currency Strength Meter suitable for beginners?",
    answer:
      "Absolutely. Beginners can use it to quickly understand market sentiment and make more informed forex trading decisions.",
  },
];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index);
  };

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-gray-900 dark:text-gray-100">
          Frequently Asked Questions
        </h2>

        {/* FAQ List */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? "border-blue-500 bg-white shadow-lg dark:bg-gray-900 dark:border-blue-400"
                  : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md dark:bg-gray-900 dark:border-gray-700"
              }`}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full px-6 sm:px-8 py-5 text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 focus:outline-none"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-6 h-6 text-gray-600 dark:text-gray-300 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                  }`}
                />
              </button>

              {/* Answer Panel */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden px-6 sm:px-8 pb-5 text-gray-700 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Glow Line */}
        <div className="mt-16 h-[1px] w-48 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
      </div>
    </section>
  );
}
