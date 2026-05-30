import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Disclaimer Section */}
        <div className="mb-8 pb-8 border-b border-gray-700">
          <p className="text-xs text-gray-400 mb-2">
            <strong>Disclaimer:</strong> Currency Strength Meter is provided for educational purposes only. Forex trading involves substantial risk. Always use demo accounts first and never risk capital you cannot afford to lose. Consult a qualified financial advisor before trading.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Currency Strength Meter. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/about" className="hover:text-white transition">
              About
            </Link>
            <Link href="/privacy-policy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Contact Us
            </Link>
            <Link href="/faq" className="hover:text-white transition">
              FAQ
            </Link>
            <Link href="/resources" className="hover:text-white transition">
              Resources
            </Link>
          </div>
        </div>

        {/* AdSense Compliance Notice */}
        <div className="mt-6 pt-6 border-t border-gray-700 text-xs text-gray-500">
          <p>
            This site uses Google AdSense for personalized advertising. We respect your privacy and comply with GDPR and CCPA regulations. See our Privacy Policy for more information.
          </p>
        </div>
      </div>
    </footer>
  );
}
