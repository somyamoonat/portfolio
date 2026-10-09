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

## Environment Variables

The project includes a `.env.example` file documenting all environment variables:

| Variable | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `RESEND_API_KEY` | Optional | API Key from [Resend](https://resend.com) for sending emails from the contact form. | `re_123456789...` |
| `CONTACT_FROM_EMAIL` | Optional | Verified sender address in Resend. Default: `"Portfolio Contact <onboarding@resend.dev>"` | `"Somya Moonat <hello@somyamoonat.tech>"` |
| `CONTACT_TO_EMAIL` | Optional | Inbox address where contact submissions are delivered. Default: `somya.moonat@gmail.com` | `somya.moonat@gmail.com` |

> **Graceful Fallback**: If `RESEND_API_KEY` is omitted, the `/api/contact` endpoint operates in simulated mode during development, printing form submissions to the server console and returning a valid response to the client.

To configure locally:
```bash
cp .env.example .env.local
```

---

## Local Development & Validation

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Code linting
npm run lint

# 4. Production build test
npm run build
```

---

## Deploying to Vercel

### Step 1: Push Code to GitHub
Ensure all changes are committed and pushed to your GitHub repository:
```bash
git add .
git commit -m "feat: prepare production portfolio for Vercel deployment"
git push origin main
```

### Step 2: Import into Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **"Add New..."** → **"Project"**.
3. Under **Import Git Repository**, select `somyamoonat/portfolio`.
4. Leave **Framework Preset** as **Next.js** (detected automatically).
5. (Optional) Expand **Environment Variables** and add:
   - `RESEND_API_KEY` (if you want live contact form emails).
   - `CONTACT_FROM_EMAIL` (e.g. `Portfolio Contact <onboarding@resend.dev>` or your verified domain sender).
   - `CONTACT_TO_EMAIL` (your destination email).
6. Click **Deploy**.

---

## Custom Domain Setup (`somyamoonat.tech`)

### Step 1: Add Domain in Vercel
1. Go to your project on Vercel → **Settings** → **Domains**.
2. Enter `somyamoonat.tech` and click **Add**.
3. Vercel will prompt you to configure `www.somyamoonat.tech` as well. Select **"Redirect to somyamoonat.tech"** (recommended for SEO canonicalization).

### Step 2: Configure DNS Records at Domain Registrar
Log in to your domain registrar (e.g., Namecheap, GoDaddy, Cloudflare, Google Domains, Porkbun) and add the following DNS records:

| Type | Name / Host | Value / Target | TTL | Purpose |
| :---: | :---: | :---: | :---: | :--- |
| **A** | `@` (or leave blank) | `76.76.21.21` | Automatic / 300 | Points apex domain `somyamoonat.tech` to Vercel edge network |
| **CNAME** | `www` | `cname.vercel-dns.com.` | Automatic / 300 | Directs `www.somyamoonat.tech` to Vercel (redirecting to apex) |

*Note: Once updated, DNS propagation typically completes within 5–30 minutes, after which Vercel will automatically provision a free SSL/TLS certificate.*
