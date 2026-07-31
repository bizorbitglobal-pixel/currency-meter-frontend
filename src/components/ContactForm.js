"use client";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Enter a valid email address.";
    }
    if (!formData.message.trim()) {
      tempErrors.message = "Message cannot be empty.";
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear field-specific error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setStatusMessage(
          "Thank you for reaching out! Your message has been sent to our team at bizorbit.global@gmail.com.",
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setStatusMessage(
          result.error || "Something went wrong. Please try again.",
        );
      }
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        "Network error. Please check your internet connection and try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Contact Form Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Get in Touch With Us
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions about our forex trading tools, analytics, or
            services? Fill out the form below or drop us an email directly at{" "}
            <a
              href="mailto:bizorbit.global@gmail.com"
              className="text-blue-600 dark:text-blue-400 font-semibold underline"
            >
              bizorbit.global@gmail.com
            </a>
            .
          </p>
        </div>

        {/* Contact Form Card */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto space-y-6 border border-gray-100 dark:border-gray-700"
        >
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all dark:bg-gray-700 dark:text-white ${
                errors.name
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              }`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all dark:bg-gray-700 dark:text-white ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          {/* Subject Field */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all"
              placeholder="How can we help you?"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Your Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all dark:bg-gray-700 dark:text-white resize-none ${
                errors.message
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              }`}
              placeholder="Write your detailed query or message here..."
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.message}
              </p>
            )}
          </div>

          {/* Status Alert Banner */}
          {statusMessage && (
            <div
              className={`p-4 rounded-xl text-sm font-medium transition-all ${
                status === "success"
                  ? "bg-green-50 text-green-800 dark:bg-green-900/40 dark:text-green-200 border border-green-200 dark:border-green-800"
                  : "bg-red-50 text-red-800 dark:bg-red-900/40 dark:text-red-200 border border-red-200 dark:border-red-800"
              }`}
            >
              {statusMessage}
            </div>
          )}

          {/* Submit Button with Animated Loader */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg ${
              status === "submitting"
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.99] dark:bg-blue-700 dark:hover:bg-blue-800"
            }`}
          >
            {status === "submitting" ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Sending Message...</span>
              </>
            ) : (
              <span>Send Message</span>
            )}
          </button>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Replies are dispatched to your email within 24 to 48 business hours.
          </p>
        </form>

        {/* 600+ Words SEO-Rich Content Section */}
        <section className="w-full max-w-full mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 sm:p-12 border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 space-y-8 leading-relaxed">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Comprehensive Customer Support & Communication Center
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Dedicated to delivering institutional-grade support and inquiries
              handling.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Why Communication Matters in Modern Financial Trading
            </h3>
            <p>
              Navigating global financial markets, currency evaluation meters,
              and technical risk management tools requires access to clear,
              timely, and precise support. Whether you are an individual retail
              trader utilizing relative strength dashboards to spot
              high-probability market divergences or an institutional enterprise
              looking to collaborate, effective lines of communication remain
              the backbone of operational confidence.
            </p>
            <p>
              At BizOrbit Global, we prioritize transparency and technical
              excellence. Our dedicated support team handles a diverse array of
              inquiries—ranging from platform performance metrics and algorithm
              interpretations to enterprise licensing and partnership inquiries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Technical Inquiries & Feedback
              </h4>
              <p className="text-sm">
                Need guidance on interpreting real-time currency strength matrix
                scores or position size calculations? Our technical experts
                ensure that your tools run seamlessly and provide clear
                explanations on dataset updates.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Business Partnerships & Media
              </h4>
              <p className="text-sm">
                We actively seek strategic partnerships with liquidity
                providers, fintech innovators, and educational platforms. Reach
                out directly to discuss customized integration opportunities.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              How We Process Your Submissions
            </h3>
            <p>
              When you submit a message through our encrypted web form, your
              information is processed through validation security layers before
              being routed directly to our inbox at{" "}
              <strong>bizorbit.global@gmail.com</strong>. Here is what happens
              after you hit submit:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>
                <strong>Automated Ticket Logging:</strong> Your submission
                generates a secure query ticket categorized by subject matter
                (e.g., Technical Bug, General Inquiry, Partnership).
              </li>
              <li>
                <strong>Triage & Review:</strong> Queries are reviewed during
                standard trading hours to ensure urgent market-related feedback
                is prioritized appropriately.
              </li>
              <li>
                <strong>Direct Response:</strong> A qualified support specialist
                or developer will reply directly to the email address provided
                in your form payload.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Frequently Asked Questions (FAQ)
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <h5 className="font-bold text-gray-900 dark:text-white">
                  What is the expected response timeframe?
                </h5>
                <p className="text-gray-600 dark:text-gray-400">
                  Our standard SLA for inquiries is 24 to 48 business hours.
                  However, market-critical feedback often receives faster
                  evaluation during peak trading sessions.
                </p>
              </div>
              <div>
                <h5 className="font-bold text-gray-900 dark:text-white">
                  Can I send attachments or screenshots?
                </h5>
                <p className="text-gray-600 dark:text-gray-400">
                  If you need to share log files or chart screenshots, please
                  initiate the query through the form above. Once you receive
                  our automated email confirmation, you can reply directly to{" "}
                  <strong>bizorbit.global@gmail.com</strong> with your file
                  attachments.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl border border-blue-100 dark:border-blue-800 text-sm">
            <h4 className="text-base font-bold text-blue-900 dark:text-blue-200 mb-1">
              Direct Communication Channel
            </h4>
            <p className="text-blue-800 dark:text-blue-300">
              Prefer using your personal email client? Feel free to copy our
              email address directly:{" "}
              <a
                href="mailto:bizorbit.global@gmail.com"
                className="font-bold underline"
              >
                bizorbit.global@gmail.com
              </a>
              . Include detailed information regarding your query to help us
              assist you faster.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
