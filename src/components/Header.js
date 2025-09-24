"use client";

import Link from "next/link";
import Button from "./Button";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 shadow-sm bg-white">
      {/* Left logo/title */}
      <h1 className="text-xl font-bold">Currency Strength Meter</h1>

      {/* Right navigation */}
      <div className="flex items-center gap-4">
        <Link href="/blog" className="hover:text-blue-600">
          Blog
        </Link>
      </div>
    </header>
  );
}
