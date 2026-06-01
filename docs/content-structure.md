# streamerOS Marketing Site — Content & Structure

A reference for what content this site contains and how it is organized. This
is the **marketing site only**; the streamerOS desktop app lives in a separate
repository.

## At a glance

- **Framework:** Next.js 16 (App Router) — `output: 'export'`, so `next build`
  emits a fully static site into `out/` with no Node runtime.
- **Styling:** Tailwind CSS v4. Dark theme throughout — near-black background
  `#05070A`, cyan (`#22d3ee`) → purple (`#a855f7`) accent gradient, zinc text.
- **Animation:** Framer Motion (scroll reveals, parallax hero, marquees, tilt).
- **Icons:** Lucide React.
- **Font:** Inter (via `next/font/google`).
- **Run locally:** `npm run dev` → http://localhost:3000.

## Product positioning (the message the whole site sells)

streamerOS is pitched as a **Rust-powered, ultra-lightweight desktop "cockpit"
for Twitch & YouTube streamers**. Three recurring pillars appear on nearly
every page:

1. **Performance** — holds a **1.8% CPU** footprint under a live 1080p60 game
   (~152 MB RAM).
2. **Auto-Hype Director** — a visual, node-based engine that switches OBS scenes
   automatically when chat velocity/sentiment peaks.
3. **Zero-Cloud / local-first** — no account, no backend; chat & audio never
   leave the machine.

Commercial model: **free & open source forever**, with an optional **$29
one-time Supporter Edition** (cosmetic badge + early AI-model access).

Current version messaging: **v1.0-GA, Windows 10/11 only**.

## Site map

Every route is a static page under `app/`. Shared chrome (`Header`, `Footer`)
wraps all pages via `app/layout.tsx`.

| Route | File | Purpose |
| --- | --- | --- |
| `/` | `app/page.tsx` | Home / landing page |
| `/features` | `app/features/page.tsx` | Feature deep-dive |
| `/download` | `app/download/page.tsx` | Download + system requirements + install steps |
| `/about` | `app/about/page.tsx` | Origin story + core values |
| `/changelog` | `app/changelog/page.tsx` | Release history timeline |
| `/faq` | `app/faq/page.tsx` | Accordion FAQ |
| `/contact` | `app/contact/page.tsx` | Contact form |
| `/privacy` | `app/privacy/page.tsx` | Privacy policy (legal) |
| `/terms` | `app/terms/page.tsx` | Terms of service (legal) |

Note: there is **no standalone `/pricing` route** — pricing is a section on the
home page, linked everywhere as `/#pricing`.

## Layout & global structure

- `app/layout.tsx` — root layout. Sets all SEO metadata (title template
  `%s · streamerOS`, description, keywords, OpenGraph, Twitter card, robots),
  dark `themeColor`/`colorScheme` viewport, loads Inter, and renders
  `<Header />` + page `children` + `<Footer />`.
- `app/globals.css` — Tailwind layer + global tokens.

### Header (`components/Header.tsx`)
Sticky, blurred top bar. Logo (gradient "S" mark + wordmark), desktop nav
(**Features, Pricing, FAQ, Changelog**), a cyan **Download** CTA, and a
full-screen animated mobile drawer with body-scroll locking.

### Footer (`components/Footer.tsx`)
Four columns:
- **Brand** — logo + tagline.
- **Product** — Features, Download, Pricing, Changelog.
- **Company** — About, FAQ, Contact.
- **Legal** — Privacy, Terms.
- Bottom bar: copyright + social icons (X, Discord, GitHub — currently `href="#"`
  placeholders).

## Page-by-page content

### Home (`/`)
Section order, all composed in `app/page.tsx`:
1. **Scroll progress bar** — fixed gradient bar tracking scroll.
2. **Hero** — badge "v1.0-GA · now available for Windows", headline
   *"Run your stream like mission control."*, sub-copy, CTAs
   (Download v1.0-GA / Explore the features), and an animated faux-app
   "HeroWindow" showing CPU/Memory/Status stats + a chat-velocity chart.
3. **Marquee** — infinite ticker of tech/perf claims (Powered by Rust, 1.8% CPU,
   Zero-Cloud, OBS WebSocket v5, Tauri + Next.js, etc.).
4. **Bento features** — glass tiles with mouse-tracked spotlight + 3D tilt:
   Auto-Hype Director (showpiece with node-graph SVG), 1.8% CPU, Zero-Cloud,
   Native scene control (OBS WebSocket v5), and a wide "Free & open source" tile.
5. **How it works** — scroll-lit 3-step timeline: Connect Telemetry → Map Your
   Logic → Never Miss a Hype Moment.
6. **Wall of Love** — testimonial marquee. ⚠️ **Placeholder/fabricated
   testimonials** (6 fictional streamers) — an in-code comment flags they must
   be replaced with real quotes before launch.
7. **Pricing** (`components/Pricing.tsx`) — two tiers: **Free Core ($0)** and
   **Supporter Edition ($29 one-time, "Most loved")**.

### Features (`/features`)
Hero, then three alternating **deep-dive** sections (Performance, Auto-Hype
Director, Zero-Cloud) each with copy, checkmark bullets, and a visual
(perf-stats panel, node-graph SVG, "stays on your machine" list). Then a
**supporting features** grid of 6 (sponsor media kits, brand-safety guard,
viral hook markers, local AI sidekick, native OBS control, open source), and a
download CTA.

### Download (`/download`)
Hero, a highlighted **download card** (v1.0-GA, Windows 10/11, 64-bit, free, no
account), **system requirements** table (Win 10/11, 16 GB RAM, 8-core CPU,
RTX 3060-class GPU for local AI), 3-step **install** guide, and a link to the
changelog. ⚠️ Download button currently points at `#` (TODO: real release
binary).

### About (`/about`)
Origin story ("Built out of frustration with our own tools") + **Core values**
grid (Performance, Privacy, Automation).

### Changelog (`/changelog`)
Vertical timeline of 3 releases: **v1.0-GA (May 2026, Stable, current)**,
v1.0-RC (April 2026), v0.9 (Feb 2026). ⚠️ Code comment notes the pre-GA entries
are illustrative placeholders.

### FAQ (`/faq`)
8-item single-open **accordion** (`components/FaqAccordion.tsx`) covering
pricing, performance, privacy/data, OBS, supported platforms (Win only, no
macOS/Linux yet), what the Auto-Hype Director is, hardware needs, and support.
Closes with a "contact us" card.

### Contact (`/contact`)
Renders `components/ContactForm.tsx` — a client form (name, email, subject,
message) that POSTs JSON to `NEXT_PUBLIC_FORM_ENDPOINT` with submitting/success/
error states. Requires that env var to be set at build time or it shows an error.

### Privacy (`/privacy`) & Terms (`/terms`)
Static legal pages. Privacy emphasizes zero-cloud architecture and enumerates
the only network connections (opt-in update check, public chat ingestion,
one-time speech-model download). Terms covers open-source licensing, "as is"
warranty disclaimer, and the Supporter Edition. Both dated **May 22, 2026**
(marked TODO for real publication date).

## Shared components (`components/`)

| Component | Used by | Role |
| --- | --- | --- |
| `Header.tsx` | layout | Sticky nav + mobile drawer |
| `Footer.tsx` | layout | 4-column footer + socials |
| `Pricing.tsx` | home | Free/Supporter tier cards |
| `FaqAccordion.tsx` | faq | Animated single-open accordion |
| `ContactForm.tsx` | contact | Client form → external endpoint |
| `Reveal.tsx` | features, download, changelog, faq | Shared scroll fade-and-rise primitive |

## Static assets (`public/`)
- `grid.svg` — faint grid background used in page heroes.
- `node-graph.svg` — Auto-Hype Director illustration (home + features).
- Next.js defaults: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`,
  `window.svg`.
- ⚠️ **Missing:** `/og.png` (referenced by OpenGraph/Twitter metadata) is not
  present — flagged as a TODO in `app/layout.tsx`.

## Configuration & environment
- `next.config.ts` — `output: 'export'`, `images.unoptimized: true`.
- `NEXT_PUBLIC_FORM_ENDPOINT` (see `.env.example`) — the only env var; the
  contact form POSTs here. Inlined at build time, so it must be set **before**
  `next build`.

## Known placeholders / pre-launch TODOs
Surfaced from in-code comments while documenting:
- Fabricated **testimonials** on the home page (must be replaced).
- Illustrative **changelog** entries (v1.0-RC, v0.9).
- **Download** and **pricing CTA** links point at `#` (no real binary/checkout).
- Missing **`/public/og.png`** social-share image.
- Production **domain** (`https://streameros.app`), legal **dates**, and
  download **system specs** are marked TODO.
- Footer **social links** are `#` placeholders without real URLs.
