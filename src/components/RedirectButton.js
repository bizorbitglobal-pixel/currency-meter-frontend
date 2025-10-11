"use client";

import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function RedirectButton() {
  return (
    <div className="flex justify-center mt-8 mb-14">
      <Link href="/" passHref>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 250, damping: 15 }}
          className="
            relative flex items-center justify-center gap-3 px-8 py-4
            text-lg font-semibold
            rounded-xl overflow-hidden
            bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
            text-white shadow-lg shadow-blue-200/40 dark:shadow-blue-900/40
            hover:shadow-blue-400/40
            transition-all duration-500 ease-out
          "
        >
          <span className="relative z-10">Check Currency Strength Meter</span>
          <FaArrowRight className="relative z-10 text-xl transition-transform duration-300 group-hover:translate-x-2" />

          {/* Glow layer */}
          <span className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-indigo-500/30 opacity-0 hover:opacity-100 blur-xl transition-opacity duration-500"></span>
        </motion.button>
      </Link>
    </div>
  );
}
