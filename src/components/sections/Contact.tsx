"use client";

import { useState } from "react";
import { profileData } from "@/content/profile";
import { Container, Section, Heading, Button } from "@/components/primitives";
import { FadeIn } from "@/components/motion/FadeIn";

export function Contact() {
  const { contact, socials } = profileData;

  // Copy email state
  const [copied, setCopied] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    // Client-side quick check
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: "error",
        message: "Please fill in all required fields before submitting.",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({
          type: "success",
          message: result.message || "Thank you! Your message has been sent successfully.",
        });
        setFormData({ name: "", email: "", message: "", honeypot: "" });
      } else {
        setStatus({
          type: "error",
          message: result.error || "Unable to send message. Please try emailing directly.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Network error occurred. Please try emailing directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact" spacing="lg" bordered>
      <Container>
        {/* Section Header */}
        <FadeIn>
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent mb-3">
              <span>[06]</span>
              <span className="text-text-muted">/</span>
              <span className="text-text-secondary">CONTACT</span>
            </div>
            <Heading as="h2" size="xl">
              Get in Touch
            </Heading>
            {/* Warm line inviting people to reach out */}
            <p className="mt-3 text-base sm:text-lg text-text-secondary max-w-[65ch] leading-relaxed">
              I’m always open to discussing full-stack engineering roles, machine learning research, interesting project ideas, or simply having a thoughtful technical conversation.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Large Copyable Email + Resume + Socials */}
          <div className="lg:col-span-6">
            <FadeIn delay={0.05}>
              <div className="space-y-10">
                {/* Large Copyable Email Link */}
                <div className="space-y-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-accent block">
                    Direct Inbox
                  </span>

                  <div className="p-6 sm:p-8 border border-border-hairline bg-surface/60 corner-ticks space-y-4">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="group block text-left w-full rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer"
                      title="Click to copy email address"
                      aria-label="Copy email address"
                    >
                      <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-text-primary group-hover:text-accent transition-colors block break-all font-normal">
                        {contact.email}
                      </span>
                    </button>

                    <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-2 border border-border-hairline bg-surface-subtle px-3 py-1.5 text-text-secondary hover:text-text-primary hover:border-text-secondary active:bg-surface rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors cursor-pointer"
                      >
                        <span>{copied ? "✓ Copied to clipboard" : "Copy email address"}</span>
                      </button>

                      <a
                        href={`mailto:${contact.email}`}
                        className="text-text-muted hover:text-accent transition-colors py-1.5 px-2 rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        Open mail client ↗
                      </a>
                    </div>
                  </div>
                </div>

                {/* Resume Download Link */}
                <div className="space-y-3 pt-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-text-muted block">
                    Curriculum Vitae
                  </span>
                  <div>
                    <Button
                      variant="secondary"
                      href={contact.resumeUrl}
                      target="_blank"
                    >
                      <span>Download résumé</span>
                      <span className="text-text-muted">↗</span>
                    </Button>
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-3 pt-4 border-t border-border-hairline">
                  <span className="font-mono text-xs uppercase tracking-widest text-text-muted block">
                    Network & Profiles
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    {socials.github && (
                      <a
                        href={socials.github.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 border border-border-hairline bg-surface/40 hover:border-border-strong hover:bg-surface-subtle/50 transition-colors flex items-center justify-between rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        <span className="text-text-primary">{socials.github.label}</span>
                        <span className="text-text-muted">↗</span>
                      </a>
                    )}
                    {socials.linkedin && (
                      <a
                        href={socials.linkedin.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 border border-border-hairline bg-surface/40 hover:border-border-strong hover:bg-surface-subtle/50 transition-colors flex items-center justify-between rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        <span className="text-text-primary">{socials.linkedin.label}</span>
                        <span className="text-text-muted">↗</span>
                      </a>
                    )}
                    {socials.x && (
                      <a
                        href={socials.x.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 border border-border-hairline bg-surface/40 hover:border-border-strong hover:bg-surface-subtle/50 transition-colors flex items-center justify-between rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        <span className="text-text-primary">{socials.x.label}</span>
                        <span className="text-text-muted">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Editorial Contact Form */}
          <div className="lg:col-span-6">
            <FadeIn delay={0.1}>
              <div className="border border-border-hairline bg-surface p-6 sm:p-8 md:p-10 corner-ticks space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-accent block mb-2">
                    Message Terminal
                  </span>
                  <h3 className="font-serif text-2xl text-text-primary font-normal">
                    Send a note directly.
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                    Leave your details and a short message. Responses are usually sent within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field (hidden from genuine users to trap spam bots) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="hp_field">Do not fill this field</label>
                    <input
                      id="hp_field"
                      type="text"
                      name="honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact_name"
                      className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary"
                    >
                      Your Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact_name"
                      type="text"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-surface-subtle border border-border-hairline px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus-visible:ring-1 focus-visible:ring-accent font-sans transition-colors duration-150"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact_email"
                      className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary"
                    >
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact_email"
                      type="email"
                      name="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-surface-subtle border border-border-hairline px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus-visible:ring-1 focus-visible:ring-accent font-sans transition-colors duration-150"
                    />
                  </div>

                  {/* Message field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact_message"
                      className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary"
                    >
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="contact_message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell me about the role, technical challenge, or project..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-surface-subtle border border-border-hairline px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus-visible:ring-1 focus-visible:ring-accent font-sans transition-colors duration-150 resize-y"
                    />
                  </div>

                  {/* Feedback status message */}
                  {status.type !== "idle" && (
                    <div
                      role="alert"
                      className={`p-3 text-xs font-mono leading-relaxed border ${
                        status.type === "success"
                          ? "border-green-600/30 bg-green-500/10 text-green-400"
                          : "border-accent/30 bg-accent/10 text-accent"
                      }`}
                    >
                      {status.message}
                    </div>
                  )}

                  {/* Submit button with loading state */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold bg-text-primary text-canvas px-6 py-3 hover:bg-accent hover:text-white active:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
                    >
                      {loading ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-canvas animate-ping" />
                          <span>Sending message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send message</span>
                          <span className="text-accent group-hover:text-white select-none">→</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}
