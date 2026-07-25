"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderLinkedText(text, linkEntries, regex, hrefByLabel) {
  if (!text || !regex) return text;

  const output = [];
  let lastIndex = 0;
  let match = regex.exec(text);

  while (match) {
    const [matchedText] = match;
    const index = match.index;

    if (index > lastIndex) {
      output.push(text.slice(lastIndex, index));
    }

    const href = hrefByLabel.get(matchedText.toLowerCase());
    if (href) {
      output.push(
        <Link key={`${matchedText}-${index}`} href={href} className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
          {matchedText}
        </Link>
      );
    } else {
      output.push(matchedText);
    }

    lastIndex = index + matchedText.length;
    match = regex.exec(text);
  }

  if (lastIndex < text.length) {
    output.push(text.slice(lastIndex));
  }

  return output.length > 0 ? output : text;
}

export default function ToolFaqAccordion({ faqs, title, linkEntries }) {
  const [openIndex, setOpenIndex] = useState(null);

  const { regex, hrefByLabel } = useMemo(() => {
    if (!Array.isArray(linkEntries) || linkEntries.length === 0) {
      return { regex: null, hrefByLabel: new Map() };
    }

    const deduped = [];
    const seen = new Set();
    for (const item of linkEntries) {
      const key = item.label.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        deduped.push(item);
      }
    }

    const sorted = deduped.sort((a, b) => b.label.length - a.label.length);
    const labels = sorted.map((item) => escapeRegExp(item.label));
    const hrefMap = new Map(sorted.map((item) => [item.label.toLowerCase(), item.href]));

    return {
      regex: labels.length > 0 ? new RegExp(`\\b(${labels.join("|")})\\b`, "gi") : null,
      hrefByLabel: hrefMap,
    };
  }, [linkEntries]);

  return (
    <section className="w-full bg-gray-50 py-16 transition-colors duration-300 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="mb-10 text-center text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          {title}
        </h2>

        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-xl border shadow-sm transition-all duration-300 ${
                  isOpen
                    ? "border-blue-400 bg-white shadow-md dark:bg-gray-800"
                    : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left text-lg font-semibold text-gray-900 focus:outline-none dark:text-gray-100"
                >
                  {faq.question}
                  <ChevronDown
                    className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-blue-500" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-5 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    {renderLinkedText(faq.answer, linkEntries, regex, hrefByLabel)}
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
