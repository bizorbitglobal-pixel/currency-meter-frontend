import AddSlot from "@/components/AddSlot";
import RedirectButton from "@/components/RedirectButton";

// ✅ SEO Metadata
export const metadata = {
  title: "Contact Us | Currency Strength Meter",
  description:
    "Contact the Currency Strength Meter team for questions, feedback, or partnerships. We’re here to help with forex tools and live market insights.",
};

export default function ContactPage() {
  return (
    <div className="font-sans max-w-4xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <AddSlot />
      <section>
        <h2 className="text-xl font-semibold mb-2">
          We’d Love to Hear from You
        </h2>
        <p>
          At <strong>Currency Strength Meter</strong>, we value your feedback
          and inquiries. Whether you have a question about our tools, need
          support, or wish to collaborate, feel free to reach out to us.
        </p>
       
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          Support & Technical Assistance
        </h2>
        <p>
          If you’re experiencing any issues with the{" "}
          <strong>Live Currency Strength Meter</strong>, facing loading
          problems, or have feature requests, our technical support team is
          ready to assist. We aim to respond to all queries within 24–48 hours.
        </p>
       
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          Business & Partnership Inquiries
        </h2>
        <p>
          Interested in partnering with us, integrating our forex data, or
          promoting your trading platform? Contact our business development team
          for collaboration opportunities.
        </p>
       
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        <p>
          📧 <strong>Email:</strong>{" "}
          <a
            href="mailto:bizorbit.global@gmail.com"
            className="text-blue-600 hover:underline"
          >
            bizorbit.global@gmail.com
          </a>
        </p>
        <p>
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
        <p>
          📍 <strong>Location:</strong> Online Forex Analytics Platform – Global
          Access
        </p>
       
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Stay Connected</h2>
        <p>
          Follow us for live forex insights, strength updates, and trading tips:
        </p>

       
      </section>
      <div className="relative isolate">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-900/50 -z-10" />
        <RedirectButton />
      </div>

     

      <footer className="mt-20 py-10 border-t text-gray-500 text-sm">
        <div className="max-w-4xl mx-auto text-center">
          <p>© 2025 Currency Strength Meter. All rights reserved.</p>
         
        </div>
      </footer>
    </div>
  );
}
