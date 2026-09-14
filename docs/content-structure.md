# streamerOS Marketing Site — Content & Structure

A reference for what this site contains and how it is organised. This is the
**marketing site only**; the streamerOS desktop app lives in a separate
repository. Rewritten 2026-09-11 — the previous version described a
"free and open source + Supporter Edition" model the product no longer has.

## At a glance

- **Framework:** Next.js 16 (App Router) with `output: 'export'` — `next build`
  emits a fully static site into `out/`, deployed to GitHub Pages at
  https://streamerosai.com. **A push to `main` deploys.**
- **Styling:** Tailwind CSS v4, dark theme — near-black `#05070A`, cyan
  (`#22d3ee`) → purple (`#a855f7`) accents, zinc text.
- **Animation:** Framer Motion. **Icons:** lucide-react. **Font:** Inter.
- **Build:** `npm run build` runs `next build`, then emits directory indexes and
  redirects, and verifies the sitemap and every internal link.
- **Read `AGENTS.md` first** — Next 16 differs from older versions; consult
  `node_modules/next/dist/docs/` before using an API the site does not already use.

## Product positioning

streamerOS is a Rust-powered desktop cockpit for YouTube Live and Twitch
streamers that runs alongside OBS Studio. The site sells three things on almost
every page:

1. **Performance** — 1.8% CPU under a live 1080p60 game (core app).
2. **Automation that acts** — the Auto-Hype Director, plus a local AI sidekick.
3. **Zero-cloud** — no account, no backend; chat, audio and stream data stay on
   the user's PC.

**Pricing:** free 7-day trial (3 months for pre-registrants), then **$29 once**.
After the trial the features that act during a live stream lock; the user's own
data (dashboard metrics, Clip Library, Chat Archive, last stream report) and 10
AI chat messages a day stay free. Keys are verified offline and tied to one PC's
Installation ID.

**Launch:** November 2026, Windows 10/11. CTAs are pre-registration until
`siteConfig.downloadUrl` / `supporterCheckoutUrl` are set.

**Markets:** global, with a dedicated page for Indian creators (Hinglish-aware
chat sentiment, ₹ Super Chat totals, YouTube Live without API keys). The AI
Sidekick answers in English today — do not claim Hinglish replies until the
Hinglish persona in the product's `AI_SYSTEM_PROMPTS.md` §1 is wired into the app.

## The feature catalog — `lib/features.ts`

The single source of truth for features. The header menu, footer, `/features`
grid and counts all read it. Add or rename a feature there, not in a component.
The `featureList` in `app/layout.tsx` JSON-LD mirrors it by hand.

| Group | Features (page) |
| --- | --- |
| Live | Live Cockpit (`/features/live-cockpit`), Super Chat Revenue (`#revenue`), Sentiment Horizon (`#sentiment`), Viral Moments (`/features/viral-moments`), Chat Archive (`/features/chat-archive`) |
| Production | OBS Bridge (`/features/obs-bridge`), Aura Studio (`/features/aura-studio`), Aura Scene Builder (`/features/aura-scene`) |
| Automation | Auto-Hype Director (`/features/auto-hype`), Clip Library (`/features/clip-library`), Shorts Factory (`/features/shorts-factory`) |
| Local AI | AI Sidekick (`/features/ai-sidekick`), Creator Memory (`#memory`), Viral Engine (`/features/viral-engine`), Brand Guard (`/features/brand-guard`) |
| Business | Sponsor CRM (`/features/sponsor-crm`), Media Kit Generator (`/features/media-kit`) |

Cross-cutting promises (not features): `/features/performance`,
`/features/zero-cloud`.

## Site map

| Route | Purpose |
| --- | --- |
| `/` | Home — hero, marquee, bento, product tour, how it works, pricing |
| `/features` | Full catalog, grouped, with India callout and foundations |
| `/features/*` | 15 feature guides (see the catalog table) plus performance and zero-cloud |
| `/for/indian-streamers` | Landing page for Indian creators |
| `/pricing` | Tiers, business-model comparison, caveats, FAQ |
| `/vs/streamlabs` | Comparison page |
| `/download` | Pre-registration, system requirements, install steps |
| `/playbook`, `/blog`, `/blog/[slug]` | Content (39 posts in `content/blog/`) |
| `/docs`, `/docs/installation` | Docs hub (MDX) |
| `/faq`, `/changelog`, `/about`, `/contact` | Support and company |
| `/privacy`, `/terms` | Legal |

## Shared building blocks

| Piece | Role |
| --- | --- |
| `components/Header.tsx`, `Footer.tsx` | Navigation, both driven by `lib/features.ts` |
| `components/Pricing.tsx` | The tier cards, rendered on `/` and `/pricing` |
| `components/Screenshot.tsx`, `ScreenshotStrip.tsx` | Real app captures; **skip files that do not exist yet** (server components) |
| `components/ProductShot.tsx` | Renders a capture unconditionally — only for PNGs that exist |
| `lib/shots.ts` | Every capture slot with alt text; slots awaiting a capture are marked |
| `components/FeatureFaq.tsx` | FAQ accordion + FAQPage JSON-LD per page |
| `components/PreRegisterModal.tsx`, `InlineSignup.tsx` | Pre-registration (EmailJS) |
| `components/SupportChatbot.tsx` + `api/` | Support chat: a Cloudflare Worker answering from `docs/knowledge-base.md` (re-ingest after editing it) |

## Honesty rules the copy follows

- Every feature claim is checked against the product repo. Shorts Factory, Brand
  Guard and Creator Memory are launch features (decided 2026-09-11).
- Auto-Hype Director triggers are chat velocity and Super Chats. Sentiment is
  shown in the cockpit but is not a working automation trigger — do not claim it.
- The privacy page lists every outbound connection the app makes; a new
  connection in the app means an edit there in the same change.
- No fabricated testimonials (the Wall of Love is commented out until real quotes
  exist), no invented release history, no rupee price.

## Known gaps before launch

See `docs/launch-readiness.md` and `docs/session-logs/2026-09-11.md`. In short:
checkout and download URLs, code signing, product screenshots for the new pages,
a demo video, real testimonials, and two product-side launch blockers (FFmpeg
not bundled for Shorts Factory; Aura Scene's OBS renderer not served by the
installed app).
