// app/privacy-policy/page.js

import AddSlot from "@/components/AddSlot";
import RedirectButton from "@/components/RedirectButton";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "Privacy Policy | Currency Meter",
  description:
    "Read our Privacy Policy to learn how Currency Meter securely collects, stores, and protects your personal data while providing real-time forex analysis tools.",
};


export default function PrivacyPolicy() {
  return (
    <div className="font-sans max-w-4xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="mb-6">
        <Breadcrumbs />
      </div>
      <AddSlot />
      <RedirectButton />

      <section>
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>
          Welcome to Currency Strength Meter ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
        </p>
        <p className="mt-2">
          When you visit our website https://www.currencystrengthsmeters.com, and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy policy, we describe our privacy policy. We seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
        <p>
          We employ the use of cookies. By accessing Currency Strength Meter, you agreed to use cookies in agreement with the Currency Strength Meter's Privacy Policy.
        </p>
        <h3 className="text-lg font-medium mt-2">Personal Information</h3>
        <p>
          We do not collect any personal information (such as your name, email address, or phone number) unless you voluntarily provide it to us through our contact forms.
        </p>
        <h3 className="text-lg font-medium mt-2">Log Files</h3>
        <p>
          Currency Strength Meter follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as a part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">3. Cookies and Web Beacons</h2>
        <p>
          Like any other website, Currency Strength Meter uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">4. Google DoubleClick DART Cookie</h2>
        <p>
          Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">5. Privacy Rights (CCPA & GDPR)</h2>
        <p>
          Under the CCPA, among other rights, California consumers have the right to request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.
        </p>
        <p className="mt-2">
          We would like to make sure you are fully aware of all of your data protection rights (GDPR). Every user is entitled to the following: The right to access, The right to rectification, The right to erasure, The right to restrict processing, The right to object to processing, and The right to data portability.
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
