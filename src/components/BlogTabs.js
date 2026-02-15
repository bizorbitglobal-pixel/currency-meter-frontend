"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function BlogTabs() {
  const tabs = ["Overview", "Key Points"];
  const [active, setActive] = useState("Overview");

  // Highlight active tab when scrolling
  useEffect(() => {
    const handleScroll = () => {
      let current = "Overview";
      for (const tab of tabs) {
        const el = document.getElementById(tab.toLowerCase().replace(" ", "-"));
        if (el && window.scrollY >= el.offsetTop - 200) current = tab;
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="sticky top-20 z-30 mb-10">
      <div className="flex justify-center gap-3 sm:gap-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        {tabs.map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              onClick={() => scrollTo(tab.toLowerCase().replace(" ", "-"))}
              className={`relative px-4 sm:px-6 py-2 text-sm sm:text-base font-medium transition-all duration-300 
                ${isActive
                  ? "text-blue-700 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-500"
                }
              `}
            >
              {tab}

              {isActive && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
