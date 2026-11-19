"use client";

import { useState } from "react";
import { Container, Heading } from "@/components/primitives";
import { FadeIn } from "@/components/motion/FadeIn";
import { motion, useReducedMotion } from "motion/react";

interface ArchitectureSnippet {
  id: string;
  tabLabel: string;
  project: string;
  system: string;
  language: string;
  telemetry: {
    label: string;
    value: string;
  }[];
  explanation: string;
  code: string;
}

const SNIPPETS: ArchitectureSnippet[] = [
  {
    id: "sign-to-voice",
    tabLabel: "01 / ASL Wasm Engine",
    project: "Sign-to-Voice",
    system: "Client-Side Computer Vision & Speech Synthesis",
    language: "typescript",
    telemetry: [
      { label: "Execution", value: "WebAssembly / WebGL" },
      { label: "Target FPS", value: "30-60 FPS Native" },
      { label: "Cloud GPU Cost", value: "$0.00 / user" },
      { label: "Latency", value: "~12ms on-device" },
    ],
    explanation:
      "Continuous webcam stream processed locally via WebAssembly hand landmark detector. Inferred gesture token maps to sign language vocabulary and dispatches utterance directly through the browser Web Speech Synthesis API without round-trip latency.",
    code: `// Real-time ASL hand gesture inference loop on client hardware
export async function processVideoFrame(
  video: HTMLVideoElement,
  detector: HandLandmarker,
  synthesizer: SpeechSynthesis
): Promise<TranslationResult | null> {
  const timestamp = performance.now();
  const detection = await detector.detectForVideo(video, timestamp);

  if (!detection.landmarks || detection.landmarks.length === 0) {
    return null;
  }

  // 21 normalized 3D hand coordinates (x, y, z)
  const landmarks = detection.landmarks[0];
  const gestureToken = classifyGestureTopology(landmarks, {
    confidenceThreshold: 0.88,
    normalizeOrientation: true,
  });

  if (gestureToken && gestureToken !== previousToken) {
    // Zero cloud GPU streaming; instantaneous voice dispatch
    const utterance = new SpeechSynthesisUtterance(gestureToken.spokenText);
    utterance.rate = 1.05;
    synthesizer.speak(utterance);
    return { token: gestureToken.label, latencyMs: performance.now() - timestamp };
  }
  return null;
}`,
  },
  {
    id: "receipt-sorter",
    tabLabel: "02 / Vision Document Ledger",
    project: "ReceiptSorter",
    system: "Offline-First OCR & SQLite Storage",
    language: "python",
    telemetry: [
      { label: "Model", value: "Local Vision OCR" },
      { label: "Storage", value: "Persistent SQLite" },
      { label: "Privacy", value: "100% Offline" },
      { label: "Accuracy", value: ">98% line-item match" },
    ],
    explanation:
      "Invoices and physical receipts are parsed offline using bounding-box spatial coordinates. The document normalizer parses vendor, date, line items, and tax totals before committing them to an ACID-compliant local SQLite ledger.",
    code: `# Local vision extraction and schema normalization
def normalize_and_commit_receipt(image_bytes: bytes, db: sqlite3.Connection) -> InvoiceRecord:
    # 1. Extract raw bounding boxes and text via local vision engine
    raw_tokens = local_ocr_engine.extract_spatial_tokens(image_bytes)
    
    # 2. Geometric heuristic clustering (matching prices to item rows)
    line_items, total, tax = parse_receipt_geometry(raw_tokens)
    
    # 3. Commit atomically to encrypted local SQLite ledger
    with db:
        cursor = db.cursor()
        cursor.execute(
            """
            INSERT INTO receipts (vendor, total_amount, tax, timestamp, raw_hash)
            VALUES (?, ?, ?, datetime('now'), sha256(?))
            RETURNING id;
            """,
            (line_items.vendor, total, tax, image_bytes)
        )
        receipt_id = cursor.fetchone()[0]
        
    return InvoiceRecord(id=receipt_id, total=total, items_count=len(line_items))`,
  },
  {
    id: "crochet-diaryy",
    tabLabel: "03 / App Router Webhook",
    project: "The Crochet Diaryy",
    system: "E-Commerce Payment Reconciliation",
    language: "typescript",
    telemetry: [
      { label: "Framework", value: "Next.js 15 App Router" },
      { label: "Database", value: "PostgreSQL / Prisma ORM" },
      { label: "Auth", value: "NextAuth.js v5" },
      { label: "Gateway", value: "Razorpay Webhooks" },
    ],
    explanation:
      "Idempotent Razorpay webhook route handler verifying cryptographic HMAC-SHA256 signatures before updating PostgreSQL order state and triggering transactional customer receipts via Resend.",
    code: `// app/api/webhooks/razorpay/route.ts
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  // Verify HMAC-SHA256 webhook authenticity
  const expectedSig = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest("hex");

  if (signature !== expectedSig) {
    return new Response("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(rawBody);
  if (event.event === "payment.captured") {
    const { order_id, id: payment_id } = event.payload.payment.entity;

    // Idempotent state transition in PostgreSQL
    const order = await prisma.order.update({
      where: { razorpayOrderId: order_id },
      data: { status: "PAID", paymentId: payment_id },
    });

    await sendOrderConfirmationEmail(order);
  }

  return Response.json({ received: true });
}`,
  },
];

export function ArchitectureConsole() {
  const [activeTab, setActiveTab] = useState(SNIPPETS[0].id);
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const currentSnippet = SNIPPETS.find((s) => s.id === activeTab) || SNIPPETS[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <section className="py-12 sm:py-16 border-t border-border-hairline bg-surface/30">
      <Container>
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted mb-2">
                <span className="text-accent font-medium">[ARCH-01]</span>
                <span className="text-border-subtle">/</span>
                <span>System Architecture & Code Logic</span>
              </div>
              <Heading as="h3" size="lg">
                Under the Hood: Engineering Decisions
              </Heading>
            </div>
            <p className="text-xs font-mono text-text-muted max-w-sm">
              Real production logic extracts demonstrating client-side execution, offline-first reliability, and clean API boundaries.
            </p>
          </div>
        </FadeIn>

        {/* Console Container */}
        <FadeIn delay={0.06}>
          <div className="border border-border-strong bg-surface rounded-xs overflow-hidden shadow-xl">
            {/* Top Bar with System Selector Tabs */}
            <div className="flex flex-wrap items-center justify-between border-b border-border-hairline bg-surface-subtle/70 px-4 py-2 text-xs font-mono">
              <div className="flex flex-wrap items-center gap-1">
                {SNIPPETS.map((snippet) => {
                  const isActive = snippet.id === activeTab;
                  return (
                    <button
                      key={snippet.id}
                      type="button"
                      onClick={() => setActiveTab(snippet.id)}
                      className={`relative px-3 py-1.5 rounded-2xs text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${
                        isActive
                          ? "text-text-primary font-medium"
                          : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      {isActive && !shouldReduceMotion && (
                        <motion.span
                          layoutId="activeSnippetIndicator"
                          className="absolute inset-0 bg-surface border border-border-strong rounded-2xs shadow-xs"
                          transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        />
                      )}
                      <span className="relative z-10">{snippet.tabLabel}</span>
                    </button>
                  );
                })}
              </div>

              {/* Copy Code Button */}
              <div className="flex items-center gap-3 pt-2 sm:pt-0">
                <span className="text-[10px] text-text-muted uppercase tracking-widest hidden md:inline-block">
                  {currentSnippet.project}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-mono rounded-2xs border border-border-subtle bg-surface hover:border-accent hover:text-accent transition-colors inline-flex items-center gap-1 cursor-pointer"
                  title="Copy snippet to clipboard"
                >
                  <span>{copied ? "Copied!" : "Copy Snippet"}</span>
                  <span className="text-text-muted">{copied ? "✓" : "⧉"}</span>
                </button>
              </div>
            </div>

            {/* Telemetry Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-border-hairline bg-surface-subtle/30 divide-x divide-border-hairline font-mono text-[10px]">
              {currentSnippet.telemetry.map((t) => (
                <div key={t.label} className="px-3.5 py-2">
                  <span className="text-text-muted block text-[9px] uppercase tracking-wider">
                    {t.label}
                  </span>
                  <span className="text-text-primary font-medium">{t.value}</span>
                </div>
              ))}
            </div>

            {/* Explanation Note */}
            <div className="px-4 py-2.5 border-b border-border-hairline/60 bg-surface text-xs text-text-secondary flex items-start gap-2">
              <span className="text-accent font-mono text-[11px] shrink-0 mt-0.5">ℹ</span>
              <p className="leading-relaxed font-sans text-[12px]">{currentSnippet.explanation}</p>
            </div>

            {/* Code Body */}
            <div className="relative p-4 sm:p-5 overflow-x-auto bg-canvas font-mono text-xs text-text-primary selection:bg-accent selection:text-white max-h-[360px] overflow-y-auto">
              <pre className="leading-relaxed">
                <code>{currentSnippet.code}</code>
              </pre>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
