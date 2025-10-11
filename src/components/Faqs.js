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
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-gray-50 py-16 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-900 dark:text-gray-100">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-xl shadow-sm transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white dark:bg-gray-800 border-blue-400 shadow-md"
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-semibold text-gray-900 dark:text-gray-100 focus:outline-none"
                >
                  {faq.question}
                  <ChevronDown
                    className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-blue-500" : ""
                    }`}
                  />
                </button>

                {/* Answer with animation */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-5 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
