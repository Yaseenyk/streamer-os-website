import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, Gauge, Play, ShieldCheck, Workflow } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Pricing from '@/components/Pricing';
import InlineSignup from '@/components/InlineSignup';
import { ProductShot } from '@/components/ProductShot';
import { SHOTS } from '@/lib/shots';

// Server component: no framer-motion and no hydration cost for the sections
// below the hero. Motion is plain CSS (the sos-* classes in globals.css) and
// all copy is in the exported HTML. Only InlineSignup and the pricing CTA
// buttons are client islands.

// Fixed 2px bar that fills as the page scrolls (CSS scroll-driven animation).
function ScrollProgress() {
  return (
    <div
      aria-hidden
      className="sos-progress fixed inset-x-0 top-0 z-[60] h-0.5 bg-[linear-gradient(to_right,#22d3ee,#a855f7)]"
    />
  );
}

// Slow-drifting radial blobs behind the hero.
const BLOBS = [
  'sos-blob-a left-[-12%] top-[-22%] h-[460px] w-[460px] bg-cyan-500/20',
  'sos-blob-b right-[-8%] top-[2%] h-[420px] w-[420px] bg-purple-600/20',
  'sos-blob-c left-[34%] bottom-[-28%] h-[400px] w-[400px] bg-cyan-400/10',
];

function MeshBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {BLOBS.map((cls) => (
        <div key={cls} className={`absolute rounded-full blur-[120px] ${cls}`} />
      ))}
    </div>
  );
}

// Glass tile with a CSS hover highlight.
function BentoCard({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-cyan-400/30 hover:bg-white/[0.05] ${className}`}
    >
      <div className="relative h-full">{children}</div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Marquee — infinite tech-stack / performance ticker
// ---------------------------------------------------------------------------
const MARQUEE_ITEMS = [
  '1.8% CPU footprint',
  'Your frames stay with the game',
  'Nothing leaves your PC',
  'No account, no cloud',
  'Scenes switch themselves',
  'Works with OBS out of the box',
  'Twitch + YouTube',
  '$29 once — not a subscription',
];

function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-white/[0.015] py-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-[linear-gradient(to_right,#05070A,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-[linear-gradient(to_left,#05070A,transparent)]"
      />
      <div className="sos-marquee flex w-max">
        {[0, 1].map((set) => (
          <div key={set} className="flex shrink-0 items-center" aria-hidden={set === 1}>
            {MARQUEE_ITEMS.map((item) => (
              <span
                key={item}
                className="flex items-center gap-8 whitespace-nowrap px-8 font-mono text-sm text-zinc-400"
              >
                {item}
                <span className="text-cyan-400/60">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// HeroFeatures — the three pillars, stated above the fold. Each tile is a
// teaser that hands off to its own feature page; the bento grid further down
// is where they get the full treatment.
// ---------------------------------------------------------------------------
const HERO_FEATURES = [
  {
    icon: Workflow,
    label: 'Auto-Hype Director',
    detail: 'Chat peaks and your OBS scene switches itself.',
    href: '/features/auto-hype',
  },
  {
    icon: Gauge,
    label: '1.8% CPU',
    detail: 'Sustained under a live 1080p60 game.',
    href: '/features/performance',
  },
  {
    icon: ShieldCheck,
    label: 'Zero-Cloud',
    detail: 'No account, no backend, nothing leaves the PC.',
    href: '/features/zero-cloud',
  },
];

function HeroFeatures() {
  return (
    <div className="mt-12 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
      {HERO_FEATURES.map(({ icon: Icon, label, detail, href }) => (
        <Link
          key={href}
          href={href}
          className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition-colors hover:border-cyan-400/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        >
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-400">
            <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-1 text-sm font-semibold text-zinc-100">
              {label}
              <ArrowRight
                className="h-3.5 w-3.5 -translate-x-1 text-cyan-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                aria-hidden
              />
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-zinc-400">{detail}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <MeshBackground />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 sm:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* Copy — left */}
          <div className="text-left">
            <span
              className="sos-rise mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Launching February 2027 · Windows
            </span>

            <h1
              className="sos-rise text-balance text-4xl font-semibold leading-[1.06] tracking-tight sm:text-6xl"
            >
              Your OBS scenes{' '}
              <span className="bg-[linear-gradient(to_right,#22d3ee,#a855f7)] bg-clip-text text-transparent">
                switch themselves
              </span>{' '}
              when chat spikes.
            </h1>

            <p className="sos-rise mt-6 max-w-xl text-lg text-zinc-400">
              streamerOS is a Windows app that runs next to OBS Studio (an app, not an
              operating system). It reads your Twitch or YouTube chat on your own PC,
              cuts to the right scene when chat velocity or a Super Chat crosses your
              threshold, and marks the moment for clipping — at under 2% CPU. No
              account, no cloud, $29 once.
            </p>

            <div className="sos-rise mt-8">
              <InlineSignup variant="bare" source="hero" cta="Get the beta" className="text-left" />
              {siteConfig.demoUrl && (
                <a
                  href={siteConfig.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2.5 text-sm font-semibold text-cyan-300 transition-colors hover:bg-cyan-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  <Play className="h-4 w-4" aria-hidden />
                  Try the live demo
                  <span className="font-normal text-cyan-300/60">· sample data, runs in your browser</span>
                </a>
              )}
              <p className="mt-4 text-sm text-zinc-500">
                Not ready yet?{' '}
                <Link
                  href="/features"
                  className="text-zinc-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-cyan-300 hover:decoration-cyan-400/50"
                >
                  See what it does first
                </Link>
              </p>
            </div>
          </div>

          {/* The actual app — right */}
          <div>
            <ProductShot shot={SHOTS.dashboard} priority sizes="(max-width: 1024px) 100vw, 720px" />
          </div>
        </div>

        <div className="mt-16">
          <HeroFeatures />
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// ProductTour — every claim on this page shown rather than asserted. Each row
// is a real capture of the build running on Windows, paired with what it does.
// ---------------------------------------------------------------------------
interface TourStop {
  shot: (typeof SHOTS)[keyof typeof SHOTS];
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
}

// Every shot in this tour must already exist in public/screenshots/ — ProductShot
// renders the <img> unconditionally. Slots still waiting for a capture belong on
// the feature pages, whose ScreenshotStrip skips missing files.
const TOUR: TourStop[] = [
  {
    shot: SHOTS.chatTriage,
    eyebrow: 'Chat Triage',
    title: 'Chat, sorted the moment it lands.',
    body: 'Every message is tagged as it arrives — viewers, members, Super Chats — with toxic and spam lines filtered out of the viewer feed before you read them. The counts along the top are live, so you can watch the room fill without scrolling.',
    href: '/features/live-cockpit', linkLabel: 'See the Live Cockpit',
  },
  {
    shot: SHOTS.revenue,
    eyebrow: 'Super Chat Revenue',
    title: 'What the stream earned, before you hit End.',
    body: 'Every Super Chat lands in a ledger on your PC and is totalled for the stream — exact per currency, plus an approximate total in ₹, $ or whatever you choose, at exchange rates you set yourself.',
    href: '/features/live-cockpit#revenue', linkLabel: 'How revenue is tallied',
  },
  {
    shot: SHOTS.autoDirector,
    eyebrow: 'Auto-Hype Director',
    title: 'Wire a trigger to a scene once, then stop touching it.',
    body: 'Drop a trigger, a logic gate and an action onto the canvas — chat velocity above five, switch to Hype Cam — and the rule runs itself for the rest of the stream. No scripting, and no hotkey to remember mid-fight.',
    href: '/features/auto-hype', linkLabel: 'See the Auto-Hype Director',
  },
  {
    shot: SHOTS.viralMoments,
    eyebrow: 'Viral Moments',
    title: 'The spike, measured while it is still happening.',
    body: 'streamerOS tracks messages per second against your own baseline for this stream, so a heat ratio well above 1x means the moment is genuinely bigger than your normal — not merely busy. That is the timestamp your clip wants.',
    href: '/features/viral-moments', linkLabel: 'See Viral Moments',
  },
  {
    shot: SHOTS.sentiment,
    eyebrow: 'Sentiment Horizon',
    title: 'Whether the room is hyped or turning.',
    body: 'A local model scores the last few seconds of chat and holds the reading between beats, so the bar glides instead of flickering. One number for the mood of the room, without reading a single line — and it reads Hinglish chat as well as English.',
    href: '/features/live-cockpit#sentiment', linkLabel: 'How sentiment is scored',
  },
  {
    shot: SHOTS.obsBridge,
    eyebrow: 'OBS Bridge',
    title: 'Native scene control, with nothing to break.',
    body: 'streamerOS talks straight to OBS over WebSocket v5, so there is no plugin to reinstall after an OBS update. Your scenes sync into a deck you can hit directly, and the status bar shows what it costs while your game runs.',
    href: '/features/obs-bridge', linkLabel: 'See the OBS Bridge',
  },
  {
    shot: SHOTS.clipLibrary,
    eyebrow: 'Clip Library',
    title: 'Your best clips, already found.',
    body: 'Recordings are scored by what chat actually did — peak velocity, Super Chats, sentiment swing — then ranked. Instead of scrubbing an eight-hour VOD, you open the list and the good bits are at the top.',
    href: '/features/clip-library', linkLabel: 'See the Clip Library',
  },
  {
    shot: SHOTS.sponsorCrm,
    eyebrow: 'Sponsor CRM',
    title: 'Every deal on one board, on your machine.',
    body: 'Leads move from prospect to contacted to negotiating to won, with the deal value on each card and a running open-pipeline total. It is a SQLite file on your disk — not a subscription, and not a spreadsheet you forget.',
    href: '/features/sponsor-crm', linkLabel: 'See the Sponsor CRM',
  },
  {
    shot: SHOTS.chatArchive,
    eyebrow: 'Chat Archive',
    title: 'Last week’s chat, one search away.',
    body: 'Every line of chat is saved to your own disk, stream by stream. Search it by word or username, label the big nights, redact a line or export a whole stream — and it stays readable even if you never buy a licence.',
    href: '/features/chat-archive', linkLabel: 'See the Chat Archive',
  },
  {
    shot: SHOTS.aura,
    eyebrow: 'Aura Studio',
    title: 'Overlays that react to the room.',
    body: 'Pick a design from the gallery and it shifts from Calm to Hype on its own as your game and chat heat up, served to OBS straight from your PC. Want your own look? Build it in the Aura Scene Builder.',
    href: '/features/aura-studio', linkLabel: 'See Aura Studio',
  },
];

// The rupee sign is the only character on this page outside Inter's base Latin
// subset; rendering it in Inter pulls in the 85 KB latin-ext font file for one
// glyph. A system font draws it just as well, so the file is never requested.
function withRupee(text: string): ReactNode {
  return text.split('₹').flatMap((part, i) =>
    i === 0 ? [part] : [<span key={i} className="font-[ui-sans-serif,system-ui,'Segoe_UI',sans-serif]">{'₹'}</span>, part],
  );
}

function ProductTour() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <div className="sos-reveal mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
          The actual app
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Nothing below is a mockup.
        </h2>
        <p className="mt-4 text-zinc-400">
          {TOUR.length} screens from the build that ships in February 2027, and what
          each one is for.
        </p>
      </div>

      <div className="mt-16 space-y-20 sm:space-y-24">
        {TOUR.map((stop, i) => (
          <div key={stop.shot.src} className="sos-reveal grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            {/* Alternate sides so the eye zig-zags down the page. */}
            <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
              <ProductShot shot={stop.shot} caption={false} sizes="(max-width: 1024px) 100vw, 560px" />
            </div>
            <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
              <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
                {stop.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
                {stop.title}
              </h3>
              <p className="mt-4 text-zinc-400">{withRupee(stop.body)}</p>
              <Link
                href={stop.href}
                className="mt-5 inline-flex items-center gap-1.5 font-mono text-sm text-cyan-400 transition-colors hover:text-cyan-300"
              >
                {stop.linkLabel}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Bento features
// ---------------------------------------------------------------------------
function BentoFeatures() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:py-28">
      <div className="sos-reveal max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">Features</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          A cockpit that earns its place on your CPU.
        </h2>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {/* Auto-Hype Director — showpiece tile */}
        <div className="lg:col-span-2 lg:row-span-2">
          <BentoCard className="h-full">
            <div className="flex h-full flex-col p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-400">
                <Workflow className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-zinc-100">Auto-Hype Director</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
                Wire chat-velocity and Super Chat triggers through logic gates into
                OBS actions — a visual node graph that switches your scene, plays a
                sound or saves a replay clip the instant the room peaks.
              </p>
              <div className="mt-6 flex-1">
                <ProductShot
                  shot={SHOTS.autoDirector}
                  caption={false}
                  sizes="(max-width: 1024px) 100vw, 640px"
                />
              </div>
            </div>
          </BentoCard>
        </div>

        {/* 1.8% CPU */}
        <div>
          <BentoCard className="h-full min-h-[210px]">
            <div className="flex h-full flex-col p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-400">
                <Gauge className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </div>
              <p className="mt-auto bg-[linear-gradient(to_right,#22d3ee,#a855f7)] bg-clip-text pt-6 font-mono text-5xl font-semibold text-transparent">
                1.8%
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                Sustained CPU under a live 1080p60 game. Your frames stay yours.
              </p>
            </div>
          </BentoCard>
        </div>

        {/* Zero-Cloud */}
        <div>
          <BentoCard className="h-full min-h-[210px]">
            <div className="flex h-full flex-col p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-400">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="mt-auto pt-6 text-lg font-semibold text-zinc-100">Zero-Cloud</h3>
              <p className="mt-2 text-sm text-zinc-400">
                No account, no backend. Your chat and audio never leave the machine.
              </p>
            </div>
          </BentoCard>
        </div>

        {/* OBS WebSocket */}
        <div>
          <BentoCard className="h-full min-h-[210px]">
            <div className="flex h-full flex-col p-7">
              <span className="inline-flex w-fit items-center rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-zinc-300">
                OBS · WebSocket v5
              </span>
              <h3 className="mt-auto pt-6 text-lg font-semibold text-zinc-100">
                Native scene control
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Talks straight to OBS — no fragile plugins to keep alive.
              </p>
            </div>
          </BentoCard>
        </div>

        {/* Pricing — wide tile */}
        <div className="lg:col-span-2">
          <BentoCard className="h-full min-h-[210px]">
            <div className="flex h-full flex-col justify-between gap-6 p-7 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-semibold text-zinc-100">
                  One payment. Not a subscription.
                </h3>
                <p className="mt-2 max-w-sm text-sm text-zinc-400">
                  Try everything free for 7 days, then $29 once and it is yours —
                  no renewal, no account, no cloud. Pre-register before launch and
                  you get the beta first, a 3-month trial and the next major version
                  included.
                </p>
              </div>
              <Link
                href="/pricing"
                className="inline-flex shrink-0 items-center gap-1.5 font-mono text-sm text-cyan-400 transition-colors hover:text-cyan-300"
              >
                See pricing
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// How it works — scroll-linked timeline
// ---------------------------------------------------------------------------
const STEPS = [
  {
    title: 'Connect Telemetry',
    body: 'Point streamerOS at your Twitch or YouTube chat. It starts reading velocity and sentiment in real time — entirely on your machine.',
  },
  {
    title: 'Map Your Logic',
    body: 'Drag trigger, logic, and action nodes onto the canvas. You decide what “hype” means for your stream.',
  },
  {
    title: 'Never Miss a Hype Moment',
    body: 'When the room peaks, streamerOS fires your scene change instantly. You stay in the game; the broadcast runs itself.',
  },
];

function TimelineStep({
  index,
  title,
  body,
  isLast,
}: {
  index: number;
  title: string;
  body: string;
  isLast: boolean;
}) {
  return (
    <div className="flex gap-6">
      {/* rail */}
      <div className="flex flex-col items-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-400/80 bg-[#05070A] font-mono text-sm font-semibold text-cyan-400">
          {index + 1}
        </div>
        {!isLast && (
          <div className="mt-2 w-px flex-1 bg-[linear-gradient(to_bottom,#22d3ee,#a855f7)]" />
        )}
      </div>

      {/* copy */}
      <div className={isLast ? 'pb-0' : 'pb-14'}>
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
          Step {index + 1}
        </p>
        <h3 className="mt-1.5 text-xl font-semibold text-zinc-100">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">{body}</p>
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section className="border-t border-white/5">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:py-28">
        <div className="sos-reveal">
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            From chat noise to scene cuts.
          </h2>
          <p className="mt-3 text-zinc-400">Three steps. Then it runs itself.</p>
        </div>

        <div className="mt-14">
          {STEPS.map((step, i) => (
            <TimelineStep
              key={step.title}
              index={i}
              title={step.title}
              body={step.body}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Wall of Love: removed. The earlier placeholder quotes were fabricated; add a
// testimonials section only once there are real, attributable quotes.

// ---------------------------------------------------------------------------
// Common OBS problems — plain links to the guides people already find us for.
// ---------------------------------------------------------------------------
const OBS_GUIDES = [
  { href: '/blog/obs-psycho-visual-tuning-explained', label: 'Psycho Visual Tuning: on or off?' },
  { href: '/blog/obs-advanced-scene-switcher-guide', label: 'Advanced Scene Switcher setup and recipes' },
  { href: '/blog/obs-cpu-usage-preset-explained', label: 'Which OBS CPU Usage Preset to use' },
  { href: '/blog/obs-encoding-overloaded-fix', label: 'Fixing "Encoding overloaded"' },
  { href: '/blog/best-obs-settings-for-low-cpu-streaming', label: 'Best OBS settings for a low-end PC' },
];

function CommonProblems() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-8 pt-4">
      <h2 className="text-xl font-semibold tracking-tight text-zinc-100">Common OBS problems</h2>
      <ul className="mt-4 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
        {OBS_GUIDES.map((g) => (
          <li key={g.href}>
            <Link
              href={g.href}
              className="text-zinc-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-cyan-300 hover:decoration-cyan-400/50"
            >
              {g.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page body. The JSON-LD for this route lives in the server component at
// app/page.tsx — React never executes a <script> rendered on the client, so it
// cannot sit in here.
// ---------------------------------------------------------------------------
export default function HomeContent() {
  return (
    <>
      <ScrollProgress />
      <main>
        <Hero />
        <Marquee />
        <BentoFeatures />
        <ProductTour />
        <HowItWorks />
        {/* TODO: Restore Wall of Love when real quotes are acquired */}
        <Pricing />
        <CommonProblems />
      </main>
    </>
  );
}
