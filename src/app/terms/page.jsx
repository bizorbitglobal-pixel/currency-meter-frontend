import AddSlot from "@/components/AddSlot";
import RedirectButton from "@/components/RedirectButton";
import Breadcrumbs from "@/components/Breadcrumbs";

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
      <div className="mb-6">
        <Breadcrumbs />
      </div>
      <AddSlot />
      <div className="relative isolate">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-900/50 -z-10" />
        <RedirectButton />
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>
          These Terms and Conditions generally govern your use of the Currency Strength Meter website and its services. By accessing this website, we assume you accept these terms and conditions. Do not continue to use Currency Strength Meter if you do not agree to take all of the terms and conditions stated on this page.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">2. Intellectual Property Rights</h2>
        <p>
          Other than the content you own, under these Terms, Currency Strength Meter and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">3. Restrictions</h2>
        <p>
          You are specifically restricted from all of the following:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Publishing any Website material in any other media;</li>
          <li>Selling, sublicensing and/or otherwise commercializing any Website material;</li>
          <li>Publicly performing and/or showing any Website material;</li>
          <li>Using this Website in any way that is or may be damaging to this Website;</li>
          <li>Using this Website in any way that impacts user access to this Website;</li>
          <li>Using this Website contrary to applicable laws and regulations;</li>
          <li>Engaging in any data mining, data harvesting, data extracting or any other similar activity.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">4. No Warranties</h2>
        <p>
          This Website is provided "as is," with all faults, and Currency Strength Meter express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">5. Operational Disclaimer</h2>
        <p>
          This tool is for informational purposes only. Forex trading carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade foreign exchange, you should carefully consider your investment objectives, level of experience, and risk appetite.
        </p>
        <p className="mt-2">
          The data provided on this site is not guaranteed to be accurate or complete and we are not responsible for any trading losses you may incur.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">6. Limitation of Liability</h2>
        <p>
          In no event shall Currency Strength Meter, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Currency Strength Meter, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
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
