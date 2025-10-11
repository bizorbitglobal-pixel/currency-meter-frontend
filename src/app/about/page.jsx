import AddSlot from "@/components/AddSlot";
import RedirectButton from "@/components/RedirectButton";

// ✅ SEO Metadata
export const metadata = {
  title: "About | Currency Strength Meter",
  description:
    "Learn more about Currency Strength Meter — the real-time forex analysis tool that helps traders identify the strongest and weakest currencies for smarter trading decisions.",
};

export default function AboutPage() {
  return (
    <div className="font-sans max-w-4xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold mb-6">About</h1>
      <AddSlot />
      <div className="relative isolate">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-900/50 -z-10" />
        <RedirectButton />
      </div>
      <section>
        <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
        <p>
          At <strong>Currency Strength Meter</strong>, our mission is to empower
          forex traders with accurate, real-time insights into global currency
          strength and weakness. We aim to help traders make informed trading
          decisions through clear data visualization and live forex analytics.
        </p>
        <AddSlot />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">What We Offer</h2>
        <p>
          Our platform provides a <strong>Live Currency Strength Meter</strong>{" "}
          that updates in real-time, displaying which currencies are performing
          strongly and which are weakening. Whether you trade major pairs,
          minors, or exotics, our tool helps you quickly assess market momentum
          and correlation strength.
        </p>
        <AddSlot />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Why Traders Trust Us</h2>
        <p>
          We focus on simplicity, speed, and accuracy. Our data-driven approach
          ensures the
          <strong>Currency Strength Meter</strong> remains a trusted resource
          for day traders, swing traders, and professional forex analysts
          worldwide.
        </p>
        <AddSlot />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">How It Works</h2>
        <p>
          Our system analyzes multiple forex pairs simultaneously to calculate
          the relative strength of each currency. The result is presented in an
          easy-to-read visual dashboard, allowing users to identify{" "}
          <strong>strongest</strong> and <strong>weakest</strong>
          currencies instantly — all in real time.
        </p>
        <AddSlot />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Our Commitment</h2>
        <p>
          We are committed to continuous improvement and innovation in forex
          data analysis. As the global forex market evolves, we strive to
          enhance our tools with the latest technology and user-focused
          features.
        </p>
        <AddSlot />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p>
          Have questions or feedback? We’d love to hear from you. Reach out via
          our{" "}
          <a href="/contact" className="text-blue-600 hover:underline">
            Contact Page
          </a>{" "}
          to share suggestions or inquiries.
        </p>
      </section>

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
