"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-950/80"
          : "bg-white dark:bg-gray-950"
      }`}
    >
      <div className="flex items-center justify-between max-w-6xl mx-auto px-6 py-4">
        {/* Left logo/title */}
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-gray-100">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={50}
            className="inline-block mr-2"
          />
        </Link>

        {/* Right navigation */}
        <nav className="flex items-center gap-6">
          <Link
            href="/blog"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
