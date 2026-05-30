"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [accepted, setAccepted] = useState(null);

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem("cookieConsent");
    if (savedConsent === null) {
      setShowConsent(true);
    } else {
      setAccepted(savedConsent === "accepted");
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setAccepted(true);
    setShowConsent(false);
    // Enable tracking scripts here if needed
    window.location.reload();
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setAccepted(false);
    setShowConsent(false);
  };

  if (!showConsent || accepted !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 sm:p-6 shadow-2xl z-50 border-t border-gray-700">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Cookie & Data Consent</h3>
            <p className="text-sm text-gray-300 mb-3 sm:mb-0">
              We use cookies and analytics to improve your experience and understand how you use our site. We also use{" "}
              <strong>Google AdSense</strong> for advertising and <strong>Google Analytics</strong> for site analytics. By clicking "Accept", you consent to the use of these technologies for personalized ads and analytics.{" "}
              <Link href="/privacy-policy" className="text-blue-400 hover:underline font-semibold">
                Learn more
              </Link>
            </p>
          </div>

          <div className="flex gap-3 flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={handleReject}
              className="flex-1 sm:flex-none px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-sm transition"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-sm transition"
            >
              Accept All
            </button>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleReject}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-white transition"
          aria-label="Close consent banner"
        >
          <X size={20} />
        </button>

        {/* Legal info footer */}
        <div className="mt-3 text-xs text-gray-400 border-t border-gray-700 pt-3">
          <p>
            We use functional cookies (essential for site operation) and analytical cookies (Google Analytics). 
            By accepting, you also consent to Google AdSense personalized advertising. You can manage preferences in{" "}
            <Link href="/privacy-policy" className="text-blue-400 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
