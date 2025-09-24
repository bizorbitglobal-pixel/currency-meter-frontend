"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold text-gray-800">CSM</h1>
        <div className="flex items-center gap-4">
          {/* Internal blog link with Next.js Link */}
          <Link href="/blog" className="text-gray-700 hover:text-blue-600">
            Blog
          </Link>

          {/* External link (can stay as <a>) */}
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
          >
            Get it on Playstore
          </a>
        </div>
      </div>
    </nav>
  );
}
