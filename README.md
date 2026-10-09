# Somya Moonat — Personal Portfolio (`somyamoonat.tech`)

Editorial, restrained, and confident personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS v4, Motion, and Google Fonts.

---

## Architecture & Principles

- **Single Source of Truth**: All personal content (bio, projects, experience, education, skills, contact links) is managed in [`src/content/profile.ts`](src/content/profile.ts). Update this file to modify content without touching UI components.
- **Strict Design Guardrails**: Adheres to [`DESIGN_RULES.md`](DESIGN_RULES.md). No SaaS visual tropes, no glowing orbs/gradients, no emoji icons, maximum of one accent colour (**Signal Vermilion `#E84A27`**), and high-contrast WCAG AA compliance.
- **Type Pairing**:
  - **Display**: `Instrument Serif` (sharp, intellectual editorial serif)
  - **Body / Interface**: `Plus Jakarta Sans` (contemporary sans-serif)
  - **Technical Labels / Indices**: `JetBrains Mono` (monospace indicators and dates)
- **Zero-Flash Theme System**: Synchronous blocking script in `<head>` ensures zero flash of unstyled content (FOUC) across light and dark themes.

---

## Contact Form & Resend Setup

The contact section includes an editorial form integrated with a Next.js route handler (`/api/contact`) powered by [Resend](https://resend.com), featuring honeypot spam protection, server-side validation, and client feedback.

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Resend API Key (obtain from https://resend.com/api-keys)
RESEND_API_KEY=re_your_api_key_here

# Optional: Verified sender email (default: onboarding@resend.dev)
CONTACT_FROM_EMAIL="Portfolio Contact <onboarding@resend.dev>"

# Optional: Destination email (default: somya.moonat@gmail.com)
CONTACT_TO_EMAIL=somya.moonat@gmail.com
```

> **Note on Simulated Mode**: If `RESEND_API_KEY` is not set, the contact API runs in graceful simulation mode during local development, logging the message to the server console and returning a friendly success message to the frontend without crashing.

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port specified by the CLI) in your browser.

---

## Production Build

```bash
npm run build
```

Prerenders 100% static HTML routes with zero server runtime overhead. Ready for immediate deployment to Vercel.
