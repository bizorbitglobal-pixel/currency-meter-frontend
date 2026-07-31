export const runtime = "nodejs";
import nodemailer from "nodemailer";

// Initialize transporter
function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;

  if (!user || !pass) {
    console.warn("⚠️ EMAIL_USER or EMAIL_PASSWORD missing in .env.local! Using dev log mode.");
    return {
      sendMail: async (mailOptions) => {
        console.log("[dev-smtp] Skipping actual sendMail. Mail payload:", mailOptions);
        return { accepted: [mailOptions.to], messageId: "dev-local" };
      },
    };
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: pass,
    },
  });
}

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const transporter = getTransporter();
    const senderEmail = process.env.EMAIL_USER || "bizorbit.global@gmail.com";

    // 1. Notification Email for Admin
    const adminMailOptions = {
      from: `"Currency Strength Meter" <${senderEmail}>`,
      to: "bizorbit.global@gmail.com",
      replyTo: email, // Lets you reply directly to the user from your Gmail inbox
      subject: `New Contact Submission: ${subject || "No Subject"}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 15px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Sender Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || "No Subject"}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; white-space: pre-wrap;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
    };

    // 2. Auto-Confirmation Email for User
    const userMailOptions = {
      from: `"Currency Strength Meter" <${senderEmail}>`,
      to: email,
      subject: "We received your message - Currency Strength Meter",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Hello ${name},</h2>
          <p>Thank you for contacting Currency Strength Meter. We've received your message and will get back to you within 24-48 hours.</p>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 15px 0;">
          <!-- <p><strong>Your message copy:</strong></p>
          <p style="background-color: #f9fafb; padding: 12px; border-radius: 6px;">${message.replace(/\n/g, "<br>")}</p> -->
          <!-- <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 15px 0;"> -->
          <p>Best regards,<br><strong>The Currency Strength Meter Team</strong></p>
        </div>
      `,
    };

    // Send both emails simultaneously
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return Response.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return Response.json(
      { error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}