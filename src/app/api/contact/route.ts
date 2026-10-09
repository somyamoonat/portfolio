import { NextResponse } from "next/server";
import { Resend } from "resend";
import { profileData } from "@/content/profile";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, honeypot } = body;

    // 1. Honeypot check for spam bots
    if (honeypot && String(honeypot).trim() !== "") {
      // Silently accept bot submission without dispatching email
      return NextResponse.json(
        { success: true, message: "Inquiry received." },
        { status: 200 }
      );
    }

    // 2. Strict server-side validation
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid name (2-100 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail) || trimmedEmail.length > 254) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!trimmedMessage || trimmedMessage.length < 10 || trimmedMessage.length > 4000) {
      return NextResponse.json(
        { success: false, error: "Message must be between 10 and 4,000 characters." },
        { status: 400 }
      );
    }

    // 3. Resend Email Dispatch
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      // Graceful fallback when Resend API key is not yet configured
      console.log(
        `[Contact API Dev Simulation] Message from ${trimmedName} (${trimmedEmail}):\n${trimmedMessage}`
      );
      return NextResponse.json(
        {
          success: true,
          message:
            "Thank you for reaching out! Your message was received (simulated dispatch mode — add RESEND_API_KEY for live email delivery).",
        },
        { status: 200 }
      );
    }

    const resend = new Resend(resendApiKey);
    const toEmail = process.env.CONTACT_TO_EMAIL || profileData.contact.email;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: trimmedEmail,
      subject: `New Inquiry from ${trimmedName} — somyamoonat.tech`,
      text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}\n\nSent via somyamoonat.tech contact terminal.`,
    });

    if (error) {
      console.error("[Resend Error]", error);
      return NextResponse.json(
        {
          success: false,
          error: "Unable to deliver message at this moment. Please email directly.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Thank you for getting in touch. I will respond promptly." },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Contact API Error]", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again or email directly." },
      { status: 500 }
    );
  }
}
