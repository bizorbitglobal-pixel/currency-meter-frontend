"use client";

import Button from "./Button";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 shadow-sm bg-white">
      {/* Left logo/title */}
      <h1 className="text-xl font-bold">Currency Strength Meter</h1>

      {/* Right buttons */}
      <div className="flex items-center gap-4">
        <a href="/blog" className="hover:text-blue-600">Blog</a>
      </div>
    </header>
  );
}
