"use client";

import { useState } from "react";
import { profileData } from "@/content/profile";
import { Container, Section, Heading, Button } from "@/components/primitives";
import { FadeIn } from "@/components/motion/FadeIn";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export function Contact() {
  const { personal, contact, socials } = profileData;
  const shouldReduceMotion = useReducedMotion();

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
            {/* Location & Availability Status with pulsing ring */}
            <div className="flex items-center gap-2.5 font-mono text-xs text-text-muted mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span>{personal.location} · {personal.status.statusText}</span>
            </div>

            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-text-muted mb-3">
              <span className="text-text-secondary font-medium">08</span>
              <span className="text-border-subtle">/</span>
              <span className="tracking-widest">Contact</span>
            </div>
            <Heading as="h2" size="xl">
              Initiate a Conversation
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
                  <span className="font-mono text-xs uppercase tracking-wider text-text-primary font-medium block">
                    Direct Inbox
                  </span>

                  <div className="p-6 sm:p-8 border border-border-hairline glass-card hover-glow space-y-4">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="group block text-left w-full min-h-[44px] py-1.5 rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer"
                      title="Click to copy email address"
                      aria-label="Copy email address"
                    >
                      <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-text-primary group-hover:text-accent transition-colors block break-all font-normal">
                        {contact.email}
                      </span>
                    </button>

                    <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
                      <motion.button
                        type="button"
                        whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-2 border border-border-hairline bg-surface-subtle px-4 py-2.5 min-h-[44px] text-text-secondary hover:text-text-primary hover:border-text-secondary active:bg-surface rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors cursor-pointer"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {copied ? (
                            <motion.span
                              key="copied"
                              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                              className="text-accent font-semibold inline-flex items-center gap-1.5"
                            >
                              ✓ Copied to clipboard
                            </motion.span>
                          ) : (
                            <motion.span
                              key="copy"
                              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                              Copy email address
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>

                      <a
                        href={`mailto:${contact.email}`}
                        className="inline-flex items-center text-text-muted hover:text-accent transition-colors py-2.5 px-3 min-h-[44px] rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
                      <motion.a
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                              y: -2,
                              x: 2,
                              transition: { type: "spring", stiffness: 400, damping: 25 },
                            }
                        }
                        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                        href={socials.github.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 border border-border-hairline glass-card hover-glow transition-colors flex items-center justify-between rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        <span className="text-text-primary">{socials.github.label}</span>
                        <span className="text-text-muted">↗</span>
                      </motion.a>
                    )}
                    {socials.linkedin && (
                      <motion.a
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                              y: -2,
                              x: 2,
                              transition: { type: "spring", stiffness: 400, damping: 25 },
                            }
                        }
                        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                        href={socials.linkedin.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 border border-border-hairline glass-card hover-glow transition-colors flex items-center justify-between rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        <span className="text-text-primary">{socials.linkedin.label}</span>
                        <span className="text-text-muted">↗</span>
                      </motion.a>
                    )}
                    {socials.x && (
                      <motion.a
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                              y: -2,
                              x: 2,
                              transition: { type: "spring", stiffness: 400, damping: 25 },
                            }
                        }
                        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                        href={socials.x.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 border border-border-hairline glass-card hover-glow transition-colors flex items-center justify-between rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        <span className="text-text-primary">{socials.x.label}</span>
                        <span className="text-text-muted">↗</span>
                      </motion.a>
                    )}
                    {socials.leetcode && (
                      <motion.a
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                              y: -2,
                              x: 2,
                              transition: { type: "spring", stiffness: 400, damping: 25 },
                            }
                        }
                        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                        href={socials.leetcode.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 border border-border-hairline glass-card hover-glow transition-colors flex items-center justify-between rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        <span className="text-text-primary">{socials.leetcode.label}</span>
                        <span className="text-text-muted">↗</span>
                      </motion.a>
                    )}
                    {socials.codechef && (
                      <motion.a
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                              y: -2,
                              x: 2,
                              transition: { type: "spring", stiffness: 400, damping: 25 },
                            }
                        }
                        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                        href={socials.codechef.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 border border-border-hairline glass-card hover-glow transition-colors flex items-center justify-between rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        <span className="text-text-primary">{socials.codechef.label}</span>
                        <span className="text-text-muted">↗</span>
                      </motion.a>
                    )}
                    {socials.codeforces && (
                      <motion.a
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                              y: -2,
                              x: 2,
                              transition: { type: "spring", stiffness: 400, damping: 25 },
                            }
                        }
                        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                        href={socials.codeforces.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 border border-border-hairline glass-card hover-glow transition-colors flex items-center justify-between rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        <span className="text-text-primary">{socials.codeforces.label}</span>
                        <span className="text-text-muted">↗</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Editorial Contact Form */}
          <div className="lg:col-span-6">
            <FadeIn delay={0.1}>
              <div className="border border-border-hairline glass-card hover-glow p-6 sm:p-8 md:p-10 space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-text-primary font-medium block mb-2">
                    Written Inquiry
                  </span>
                  <h3 className="font-serif text-2xl text-text-primary font-normal">
                    Send a note directly.
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                    Leave your details and a short message. Responses are usually seen within 24 hours.
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
                      className="w-full bg-surface-subtle/80 border border-border-hairline px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus-visible:ring-1 focus-visible:ring-accent font-sans transition-all duration-150 rounded-xs"
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
                      className="w-full bg-surface-subtle/80 border border-border-hairline px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus-visible:ring-1 focus-visible:ring-accent font-sans transition-all duration-150 rounded-xs"
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
                      className="w-full bg-surface-subtle/80 border border-border-hairline px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus-visible:ring-1 focus-visible:ring-accent font-sans transition-all duration-150 resize-y rounded-xs"
                    />
                  </div>

                  {/* Animated feedback status message */}
                  <AnimatePresence>
                    {status.type !== "idle" && (
                      <motion.div
                        role="alert"
                        initial={{ opacity: 0, height: 0, y: -6 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -6 }}
                        transition={{ type: "spring", stiffness: 350, damping: 26 }}
                        className={`overflow-hidden p-3 text-xs font-mono leading-relaxed border rounded-xs ${status.type === "success"
                            ? "border-green-600/30 bg-green-500/10 text-green-400"
                            : "border-accent/30 bg-accent/10 text-accent"
                          }`}
                      >
                        {status.message}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit button with tactile spring animation */}
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={
                        shouldReduceMotion || loading
                          ? undefined
                          : {
                            scale: 1.02,
                            y: -1,
                            transition: { type: "spring", stiffness: 450, damping: 25 },
                          }
                      }
                      whileTap={
                        shouldReduceMotion || loading
                          ? undefined
                          : {
                            scale: 0.98,
                            y: 0,
                            transition: { type: "spring", stiffness: 450, damping: 25 },
                          }
                      }
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold bg-text-primary text-canvas px-6 py-3 hover:bg-accent hover:text-white active:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 rounded-none shadow-[0_2px_10px_-4px_rgba(0,0,0,0.15)]"
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
                    </motion.button>
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
