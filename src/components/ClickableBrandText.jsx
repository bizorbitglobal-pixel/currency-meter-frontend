"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const BRAND_TEXT = "Currency Strength Meter";
const LINK_CLASS =
  "inline-flex items-center font-medium text-blue-600 underline-offset-2 transition-colors duration-200 hover:text-blue-700 hover:underline";

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function ClickableBrandText() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const textNodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;

        if (!parent) return NodeFilter.FILTER_REJECT;
        if (
          parent.closest("a, script, style, noscript, svg, code, pre, button, textarea, input") ||
          parent.hasAttribute("data-no-linkify")
        ) {
          return NodeFilter.FILTER_REJECT;
        }

        const value = node.textContent || "";
        return value.toLowerCase().includes(BRAND_TEXT.toLowerCase())
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      },
    });

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach((textNode) => {
      const textContent = textNode.textContent || "";
      if (!textContent.includes(BRAND_TEXT)) return;

      const parts = textContent.split(new RegExp(`(${escapeRegExp(BRAND_TEXT)})`, "gi"));
      if (parts.length <= 1) return;

      const fragment = document.createDocumentFragment();

      parts.forEach((part) => {
        if (part.toLowerCase() === BRAND_TEXT.toLowerCase()) {
          const link = document.createElement("a");
          link.href = "/";
          link.className = LINK_CLASS;
          link.textContent = BRAND_TEXT;
          link.setAttribute("aria-label", `Go to ${BRAND_TEXT} homepage`);
          fragment.appendChild(link);
        } else {
          fragment.appendChild(document.createTextNode(part));
        }
      });

      textNode.parentNode?.replaceChild(fragment, textNode);
    });
  }, [pathname]);

  return null;
}
