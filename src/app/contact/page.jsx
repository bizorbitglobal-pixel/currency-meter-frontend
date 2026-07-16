import AddSlot from "@/components/AddSlot";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";

// ✅ SEO Metadata
export const metadata = {
  title: "Contact Currency Strength Meter | Get Support & Feedback",
  description:
    "Contact the Currency Strength Meter team for questions, feedback, technical support, or partnership opportunities. We're here to help improve your forex trading experience.",
  keywords: [
    "contact currency strength meter",
    "forex tool support",
    "customer support",
    "technical assistance",
    "feedback",
    "currency strength meter help"
  ]
};

export default function ContactPage() {
  return (
    <div className="font-sans max-w-4xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="mb-6">
        <Breadcrumbs />
      </div>
      <AddSlot />
      <section>
        <h2 className="text-xl font-semibold mb-2">
          We’d Love to Hear from You
        </h2>
        <p>
          At <strong>Currency Strength Meter</strong>, we value your feedback, questions, and partnership inquiries. Our dedicated support and business development teams are here to help. Whether you have a quick question about our tools, need technical assistance, or want to explore collaboration opportunities, we're ready to assist you promptly.
        </p>
        <p className="mt-3">
          We believe in building strong relationships with our users, partners, and the broader forex trading community. Every message you send helps us improve our platform and serve traders better.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Use the form below to send us any questions, feedback, or partnership inquiries. Please include as much detail as possible so we can respond accurately and quickly.
        </p>
        <ContactForm />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          Support & Technical Assistance
        </h2>
        <p>
          If you're experiencing any issues with the <strong>Live Currency Strength Meter</strong>, facing loading problems, or have feature requests, our technical support team is ready to assist. We aim to respond to all queries within 24–48 hours during business days.
        </p>
        <p className="mt-3">
          Common support topics include:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
          <li><strong>Data accuracy:</strong> Understanding why the meter shows certain strength values and how the algorithm works</li>
          <li><strong>Technical issues:</strong> Browser compatibility, loading problems, display bugs, or platform-specific issues</li>
          <li><strong>Feature requests:</strong> Suggestions for new indicators, analysis tools, or platform improvements</li>
          <li><strong>Account linking:</strong> Connecting the meter to your trading platform or broker account</li>
          <li><strong>Educational support:</strong> Questions about trading strategies, how to interpret the meter, or forex fundamentals</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          Business & Partnership Inquiries
        </h2>
        <p>
          Interested in partnering with us, integrating our forex data, or promoting your trading platform? Contact our business development team for collaboration opportunities.
        </p>
        <p className="mt-3">
          We explore partnerships in these key areas:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
          <li><strong>Broker partnerships:</strong> White-label integration of our strength meter for trading platforms</li>
          <li><strong>Data licensing:</strong> API access to our strength calculation engine for third-party developers</li>
          <li><strong>Educational affiliates:</strong> Cross-promotion with forex education sites and trading communities</li>
          <li><strong>Trading tools integration:</strong> Embedding our meter in charting or analysis software</li>
          <li><strong>Content collaboration:</strong> Co-created research, trading guides, or market analysis</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Direct Contact</h2>
        <p>
          Prefer to reach out directly? Use any of the contact methods below:
        </p>
        <p className="mt-4">
          📧 <strong>Email:</strong>{" "}
          <a
            href="mailto:bizorbit.global@gmail.com"
            className="text-blue-600 hover:underline"
          >
            bizorbit.global@gmail.com
          </a>
        </p>
        <p className="mt-2">
          🌐 <strong>Website:</strong>{" "}
          <a
            href="https://www.currencystrengthsmeters.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            www.currencystrengthsmeters.com
          </a>
        </p>
        <p className="mt-2">
          📍 <strong>Service Type:</strong> Online Forex Analytics Platform – Global Access (24/5 forex market hours)
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Response Time & Expectations</h2>
        <p>
          We typically respond to all inquiries within <strong>24-48 hours</strong> during business days. For urgent technical support or partnership inquiries, please mark your message as "URGENT" in the subject line, and we'll prioritize your request.
        </p>
        <p className="mt-3">
          Response time may vary during weekends or public holidays, but we monitor our inbox regularly to ensure no message goes unaddressed for too long.
        </p>
      </section>

      <AddSlot />
    </div>
  );
}
