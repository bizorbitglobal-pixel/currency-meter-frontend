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
        <section className="w-full bg-gray-50 py-16">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-900">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-xl bg-white shadow transition hover:shadow-md"
                        >
                            <button
                                className="flex justify-between items-center w-full px-8 py-5 text-lg font-semibold text-gray-900 focus:outline-none"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span>{faq.question}</span>
                                <ChevronDown
                                    className={`w-6 h-6 transition-transform duration-200 ${
                                        openIndex === index ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {openIndex === index && (
                                <div className="px-8 pb-6 pt-2 text-gray-700 text-base">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
