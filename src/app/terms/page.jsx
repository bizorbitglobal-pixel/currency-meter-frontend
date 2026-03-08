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
        <p className="text-gray-700 dark:text-gray-300">
          These Terms and Conditions generally govern your use of the Currency Strength Meter website and its services. By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Currency Strength Meter if you do not agree to take all of the terms and conditions stated on this page. The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and any or all Agreements: "Client", "You" and "Your" refers to you, the person accessing this website and accepting the Company's terms and conditions.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">2. Intellectual Property Rights</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Other than the content you own, under these Terms, Currency Strength Meter and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website for your personal, non-commercial use, subject to restrictions set in these terms and conditions.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">3. Restrictions</h2>
        <p className="text-gray-700 dark:text-gray-300">
          You are specifically restricted from all of the following actions without prior written consent:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
          <li>Publishing any Website material in any other media, including framing our content on other websites;</li>
          <li>Selling, sublicensing and/or otherwise commercializing any Website material;</li>
          <li>Publicly performing and/or showing any Website material;</li>
          <li>Using this Website in any way that is or may be damaging to this Website or our reputation;</li>
          <li>Using this Website in any way that impacts user access to this Website or places an unreasonable load on our infrastructure;</li>
          <li>Using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
          <li>Engaging in any data mining, data harvesting, data extracting, scraping, or any other similar automated activity in relation to this Website.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">4. No Warranties</h2>
        <p className="text-gray-700 dark:text-gray-300">
          This Website is provided "as is," with all faults, and Currency Strength Meter express no representations or warranties, of any kind related to this Website or the materials contained on this Website. We do not warrant that the website will be constantly available, or available at all; or that the information on this website is complete, true, accurate or non-misleading. Also, nothing contained on this Website shall be interpreted as advising you.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">5. Operational Disclaimer</h2>
        <p className="text-gray-700 dark:text-gray-300">
          This tool, including the Live Currency Strength Meter, is for educational and informational purposes only. Forex trading carries a high level of risk and may not be suitable for all investors. The high degree of leverage offered in forex markets can work against you as well as for you. Before deciding to trade foreign exchange or any other financial instrument, you should carefully consider your investment objectives, level of experience, and risk appetite.
        </p>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          The data provided on this site is aggregated from third-party liquidity providers and is not guaranteed to be 100% accurate, complete, or updated in real-time. We are not responsible for any trading losses you may incur as a result of using this website, its tools, or its educational content. Past performance of any trading system or methodology is not necessarily indicative of future results.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">6. Limitation of Liability</h2>
        <p className="text-gray-700 dark:text-gray-300">
          In no event shall Currency Strength Meter, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract, tort, or otherwise. Currency Strength Meter, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website, including but not limited to loss of profits, trading losses, or business interruption.
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
