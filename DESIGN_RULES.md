# Design Rules & Architectural Guardrails

Portfolio for Somya Moonat (`somyamoonat.tech`)
Design Direction: Editorial, restrained, confident. Think a curated publication, high-end studio catalogue, or Swiss architectural monograph.

---

### Non-Negotiable Hard Rules

1. **No SaaS Visual Tropes**:
   - Strictly NO purple/blue-to-pink gradients.
   - Strictly NO gradient text effects.
   - Strictly NO frosted glass / glassmorphism (`backdrop-blur` heavy containers with glowing borders).
   - Strictly NO neon glowing blobs, floating orbs, or animated particle nets.

2. **Iconography & Visual Artifacts**:
   - Strictly NO emojis as icons or bullet points (e.g., no 👋, 🚀, 💻, 🔥).
   - Strictly NO stock-looking 3x3 icon grids.
   - Use a single consistent, minimal icon set sparingly (Lucide or raw SVGs: arrows, external link, github, linkedin, email), or typography and symbols (`→`, `*`, `[01]`) instead.

3. **Hero & Tone of Voice**:
   - Strictly NO "Hi, I'm Somya 👋" or "Welcome to my portfolio".
   - Strictly NO clichés: "passionate developer", "crafting digital experiences", "turning coffee into code", "solving problems with code".
   - Copy must be crisp, specific, confident, and factual. Focus on technical capability, engineering domains, and concrete deliverables.

4. **Structural Layout & Rhythm**:
   - Strictly NO repeating identical rounded cards with drop shadows everywhere.
   - Vary structural rhythm: use hairline grid borders (`border-neutral-200 / border-neutral-800`), index lists, editorial tabular data, split asymmetrical columns, and generous whitespace.
   - Structural markers: subtle technical corner marks, section counters (`01 / PROJECTS`), and monospace metadata badges.

5. **Palette Discipline**:
   - Maximum of ONE accent colour.
   - High-contrast, balanced neutral base with verified WCAG AA (and AAA where possible) contrast ratios.
   - Default to crisp dark mode or refined warm-paper light mode, keeping contrast stark and intentional.

6. **Typography**:
   - Use a distinctive, editorial type pairing (via `next/font/google`).
   - Under no circumstances default to plain Inter, Roboto, or system sans-serif alone.
   - Pair an expressive, authoritative display face (e.g., editorial serif like *Newsreader* / *Playfair Display* or sharp grotesque/monospaced like *Space Grotesk* / *Syne* / *Instrument Serif*) with a hyper-legible body face (e.g., *Plus Jakarta Sans*, *Geist*, *IBM Plex Sans* or *JetBrains Mono* for technical labels).

7. **Purposeful Motion**:
   - Motion is subtle, tactile, and purposeful (smooth micro-transitions, crisp scroll reveals, precise link underlines, state shifts).
   - Never decorative, floaty, or distracting.
   - Always respect `prefers-reduced-motion` at every level.

8. **Scale & Typographic Hierarchy**:
   - Strict spacing scale (8pt grid cadence).
   - High typographic dynamic range: clear contrast between expansive display titles, clinical uppercase labels (`tracking-widest text-xs uppercase`), and comfortable reading prose.
