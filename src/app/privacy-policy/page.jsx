// app/privacy-policy/page.js

import AddSlot from "@/components/AddSlot";
import RedirectButton from "@/components/RedirectButton";

export const metadata = {
  title: "Privacy Policy | Currency Meter",
  description:
    "Learn about our privacy practices and how we protect your data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="font-sans max-w-4xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <AddSlot />
      <RedirectButton />

      <section>
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>
          We respect your privacy and are committed to protecting it through this Privacy Policy.
          This document outlines how we collect, use, and safeguard your information when you use our website.
        </p>
        <AddSlot />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
        <p>
          We may collect personal information such as your IP address, device details, and browsing
          activity. We also use Google AdSense, which may use cookies to personalize ads.
        </p>
        <AddSlot />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">3. Use of Information</h2>
        <p>
          The data we collect is used to provide better services, improve user experience,
          and serve relevant advertisements. We do not sell or rent your personal data.
        </p>
        <AddSlot />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">4. Third-Party Ads</h2>
        <p>
          Our site displays ads provided by Google AdSense. These third parties may use cookies
          to serve relevant ads based on your interests.
        </p>
        <AddSlot />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
        <p>
          You may opt out of personalized ads at any time through your Google Ads settings.
          You also have the right to request deletion of your data from our records.
        </p>
      </section>
      <RedirectButton />

      <AddSlot />
      <footer className="mt-20 py-10 border-t text-gray-500 text-sm">
        <div className="max-w-4xl mx-auto text-center">
          <p>© 2025 Currency Strength Meter. All rights reserved.</p>
          <AddSlot />
        </div>
      </footer>
    </div>
  );
}
