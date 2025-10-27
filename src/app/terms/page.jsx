import AddSlot from "@/components/AddSlot";
import RedirectButton from "@/components/RedirectButton";

// ✅ This works because this file is a Server Component by default
export const metadata = {
  title: "Terms & Conditions | Currency Meter",
  description:
    "Review our Terms and Conditions to understand user rights, responsibilities, and legal guidelines for using the Currency Meter forex strength platform.",
};


export default function TermsPage() {
  return (
    <div className="font-sans max-w-4xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      <AddSlot />
      <div className="relative isolate">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-900/50 -z-10" />
        <RedirectButton />
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p>
          By accessing or using this website, you agree to comply with these
          Terms & Conditions. If you do not agree, please do not use our site.
        </p>
        
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">2. Use of Service</h2>
        <p>
          You agree to use this website only for lawful purposes. You may not
          attempt to interfere with the site’s functionality or misuse its
          content.
        </p>
        
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">3. Intellectual Property</h2>
        <p>
          All content, trademarks, and data on this website are owned by us and
          protected under copyright law. Unauthorized use is strictly
          prohibited.
        </p>
        
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">4. Disclaimer</h2>
        <p>
          We make no warranties regarding accuracy, reliability, or completeness
          of the information provided. Your use of the site is at your own risk.
        </p>
        
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          5. Limitation of Liability
        </h2>
        <p>
          We are not liable for any damages arising from the use of this website
          or reliance on its content.
        </p>
      </section>
      <RedirectButton />

      
      <footer className="mt-20 py-10 border-t text-gray-500 text-sm">
        <div className="max-w-4xl mx-auto text-center">
          <p>© 2025 Currency Strength Meter. All rights reserved.</p>
          
        </div>
      </footer>
    </div>
  );
}
