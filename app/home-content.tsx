'use client';

import {
  useCallback,
  useSyncExternalStore,
  type MouseEvent,
  type ReactNode,
} from 'react';
import Link from 'next/link';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import { ArrowRight, Gauge, ShieldCheck, Workflow } from 'lucide-react';
import Pricing from '@/components/Pricing';
import InlineSignup from '@/components/InlineSignup';
import { ProductShot } from '@/components/ProductShot';
import { SHOTS } from '@/lib/shots';

// ---------------------------------------------------------------------------
// Motion vocabulary
// ---------------------------------------------------------------------------
const EASE = [0.22, 1, 0.36, 1] as const;

// framer-motion's own useReducedMotion reads the media query during the very
// first client render, while the server has no media query and always renders
// as "no preference". Branching markup or style props straight off it therefore
// guarantees a hydration mismatch for anyone with Reduced Motion enabled.
//
// useSyncExternalStore solves exactly this: React uses the server snapshot for
// both SSR and the hydrating render, then re-renders with the real value. It
// also tracks later changes to the setting, which framer's hook does not.
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function useReducedMotionSafe() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// ---------------------------------------------------------------------------
// ScrollProgress — fixed 2px bar that fills as the page scrolls
// ---------------------------------------------------------------------------
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-[linear-gradient(to_right,#22d3ee,#a855f7)]"
    />
  );
}

// ---------------------------------------------------------------------------
// useCardMotion — per-card mouse tracking. Spotlight coordinates AND 3D tilt
// live entirely in MotionValues (tilt smoothed with useSpring), so neither
// effect ever triggers a React re-render.
// ---------------------------------------------------------------------------
const MAX_TILT = 8; // degrees

function useCardMotion() {
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const tiltXRaw = useMotionValue(0);
  const tiltYRaw = useMotionValue(0);
  const rotateX = useSpring(tiltXRaw, { stiffness: 150, damping: 17 });
  const rotateY = useSpring(tiltYRaw, { stiffness: 150, damping: 17 });

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mx.set(x);
      my.set(y);
      // normalise to -0.5..0.5, then map to a tilt
      tiltXRaw.set(-(y / rect.height - 0.5) * MAX_TILT);
      tiltYRaw.set((x / rect.width - 0.5) * MAX_TILT);
    },
    [mx, my, tiltXRaw, tiltYRaw],
  );

  const onMouseLeave = useCallback(() => {
    tiltXRaw.set(0);
    tiltYRaw.set(0);
  }, [tiltXRaw, tiltYRaw]);

  return { mx, my, rotateX, rotateY, onMouseMove, onMouseLeave };
}

// ---------------------------------------------------------------------------
// BentoCard — glass tile with a mouse-tracked spotlight (background + masked
// border ring) and a physics-sprung 3D hover tilt.
// ---------------------------------------------------------------------------
function BentoCard({ className = '', children }: { className?: string; children: ReactNode }) {
  const reduce = useReducedMotionSafe();
  const { mx, my, rotateX, rotateY, onMouseMove, onMouseLeave } = useCardMotion();
  const glow = useMotionTemplate`radial-gradient(280px circle at ${mx}px ${my}px, rgba(34,211,238,0.14), transparent 70%)`;
  const borderGlow = useMotionTemplate`radial-gradient(360px circle at ${mx}px ${my}px, rgba(34,211,238,0.55), transparent 65%)`;

  return (
    <motion.article
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        transformPerspective: 900,
      }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-white/20 ${className}`}
    >
      {/* mouse-tracked background spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      {/* mouse-tracked border spotlight — gradient masked down to a 1px ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: borderGlow,
          padding: '1px',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div className="relative h-full">{children}</div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// MeshBackground — slow-drifting multi-colour radial blobs (the gradient mesh)
// ---------------------------------------------------------------------------
const BLOBS = [
  {
    className: 'left-[-12%] top-[-22%] h-[460px] w-[460px] bg-cyan-500/20',
    anim: { x: [0, 80, 0], y: [0, 50, 0], scale: [1, 1.2, 1] },
    duration: 22,
  },
  {
    className: 'right-[-8%] top-[2%] h-[420px] w-[420px] bg-purple-600/20',
    anim: { x: [0, -70, 0], y: [0, 60, 0], scale: [1, 1.15, 1] },
    duration: 27,
  },
  {
    className: 'left-[34%] bottom-[-28%] h-[400px] w-[400px] bg-cyan-400/10',
    anim: { x: [0, 50, 0], y: [0, -45, 0], scale: [1.1, 1, 1.1] },
    duration: 31,
  },
];

function MeshBackground() {
  const reduce = useReducedMotionSafe();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[120px] ${blob.className}`}
          animate={reduce ? undefined : blob.anim}
          transition={reduce ? undefined : { duration: blob.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Marquee — infinite tech-stack / performance ticker
// ---------------------------------------------------------------------------
const MARQUEE_ITEMS = [
  'Powered by Rust',
  '1.8% CPU footprint',
  'Zero-Cloud',
  'OBS WebSocket v5',
  'Twitch + YouTube',
  'One-time $29 licence',
  'Local-first',
  'Tauri + Next.js',
];

function Marquee() {
  const reduce = useReducedMotionSafe();
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
      <motion.div
        className="flex w-max"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={reduce ? undefined : { duration: 34, repeat: Infinity, ease: 'linear' }}
      >
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
      </motion.div>
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
  const reduce = useReducedMotionSafe();
  const { scrollY } = useScroll();
  const shotY = useTransform(scrollY, [0, 700], [0, 60]);

  return (
    <section className="relative overflow-hidden">
      <MeshBackground />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 sm:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* Copy — left */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="text-left">
            <motion.span
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Launching November 2026 · Windows
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-balance text-4xl font-semibold leading-[1.06] tracking-tight sm:text-6xl"
            >
              Run your stream like{' '}
              <span className="bg-[linear-gradient(to_right,#22d3ee,#a855f7)] bg-clip-text text-transparent">
                mission control
              </span>
              .
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg text-zinc-400">
              streamerOS is a Rust-powered desktop cockpit for Twitch &amp; YouTube
              streamers. Automate your OBS scenes, read your chat&apos;s pulse, and
              keep every frame for your game.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8">
              <InlineSignup variant="bare" source="hero" cta="Get 3 months free" className="text-left" />
              <p className="mt-4 text-sm text-zinc-500">
                Not ready yet?{' '}
                <Link
                  href="/features"
                  className="text-zinc-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-cyan-300 hover:decoration-cyan-400/50"
                >
                  See what it does first
                </Link>
              </p>
            </motion.div>
          </motion.div>

          {/* The actual app — right */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            style={reduce ? undefined : { y: shotY }}
          >
            <ProductShot shot={SHOTS.dashboard} priority sizes="(max-width: 1024px) 100vw, 720px" />
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <HeroFeatures />
        </motion.div>
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

const TOUR: TourStop[] = [
  {
    shot: SHOTS.chatTriage,
    eyebrow: 'Chat Triage',
    title: 'Chat, sorted the moment it lands.',
    body: 'Every message is tagged as it arrives — viewers, members, Super Chats — with toxic and spam lines filtered out before you read them. The counts along the top are live, so you can watch the room fill without scrolling.',
    href: '/features/viral-moments', linkLabel: 'How chat signals work',
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
    body: 'A local model scores the last few seconds of chat and holds the reading between beats, so the bar glides instead of flickering. One number for the mood of the room, without reading a single line.',
    href: '/features/viral-moments', linkLabel: 'How sentiment is scored',
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
];

function ProductTour() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
          The actual app
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Nothing below is a mockup.
        </h2>
        <p className="mt-4 text-zinc-400">
          Seven screens from the build that ships in November, and what each one
          is for.
        </p>
      </motion.div>

      <div className="mt-16 space-y-20 sm:space-y-24">
        {TOUR.map((stop, i) => (
          <motion.div
            key={stop.shot.src}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
          >
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
              <p className="mt-4 text-zinc-400">{stop.body}</p>
              <Link
                href={stop.href}
                className="mt-5 inline-flex items-center gap-1.5 font-mono text-sm text-cyan-400 transition-colors hover:text-cyan-300"
              >
                {stop.linkLabel}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </motion.div>
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
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-2xl"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">Features</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          A cockpit that earns its place on your CPU.
        </h2>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-10 grid gap-4 lg:grid-cols-3"
      >
        {/* Auto-Hype Director — showpiece tile */}
        <motion.div variants={fadeUp} className="lg:col-span-2 lg:row-span-2">
          <BentoCard className="h-full">
            <div className="flex h-full flex-col p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-400">
                <Workflow className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-zinc-100">Auto-Hype Director</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
                Wire chat-velocity and sentiment triggers through logic gates into
                OBS scene actions — a visual node graph that switches your scene
                the instant the room peaks.
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
        </motion.div>

        {/* 1.8% CPU */}
        <motion.div variants={fadeUp}>
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
        </motion.div>

        {/* Zero-Cloud */}
        <motion.div variants={fadeUp}>
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
        </motion.div>

        {/* OBS WebSocket */}
        <motion.div variants={fadeUp}>
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
        </motion.div>

        {/* Open source — wide tile */}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <BentoCard className="h-full min-h-[210px]">
            <div className="flex h-full flex-col justify-between gap-6 p-7 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-semibold text-zinc-100">
                  One payment. Not a subscription.
                </h3>
                <p className="mt-2 max-w-sm text-sm text-zinc-400">
                  Try everything free for 7 days, then $29 once and it is yours —
                  no renewal, no account, no cloud. Pre-register before launch and
                  your trial is 3 months instead of 7 days.
                </p>
              </div>
              <Link
                href="/#pricing"
                className="inline-flex shrink-0 items-center gap-1.5 font-mono text-sm text-cyan-400 transition-colors hover:text-cyan-300"
              >
                See pricing
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </BentoCard>
        </motion.div>
      </motion.div>
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

const stepVariants: Variants = { dim: {}, lit: {} };
const nodeVariants: Variants = {
  dim: {
    borderColor: 'rgba(255,255,255,0.15)',
    color: 'rgba(255,255,255,0.4)',
    boxShadow: '0 0 0px rgba(34,211,238,0)',
  },
  lit: {
    borderColor: 'rgba(34,211,238,0.8)',
    color: 'rgb(34,211,238)',
    boxShadow: '0 0 22px rgba(34,211,238,0.45)',
    transition: { duration: 0.5, ease: EASE },
  },
};
const lineVariants: Variants = {
  dim: { scaleY: 0 },
  lit: { scaleY: 1, transition: { duration: 0.6, ease: EASE } },
};
const stepTextVariants: Variants = {
  dim: { opacity: 0.4, y: 6 },
  lit: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

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
  const reduce = useReducedMotionSafe();
  return (
    <motion.div
      variants={stepVariants}
      initial={reduce ? 'lit' : 'dim'}
      // `whileInView` stays set whatever the motion preference is. Dropping it
      // to undefined for reduced motion left the step with no target: the
      // preference resolves after mount, by which point `initial` has already
      // been applied, so the copy stayed at the dim variant's 0.4 opacity for
      // good. Reduced motion is handled by making the transition instant here
      // instead, so the content always ends up lit.
      whileInView="lit"
      transition={reduce ? { duration: 0 } : undefined}
      viewport={{ once: true, amount: 0.55 }}
      className="flex gap-6"
    >
      {/* rail */}
      <div className="flex flex-col items-center">
        <motion.div
          variants={nodeVariants}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-[#05070A] font-mono text-sm font-semibold"
        >
          {index + 1}
        </motion.div>
        {!isLast && (
          <div className="mt-2 w-px flex-1 bg-white/10">
            <motion.div
              variants={lineVariants}
              className="h-full w-px origin-top bg-[linear-gradient(to_bottom,#22d3ee,#a855f7)]"
            />
          </div>
        )}
      </div>

      {/* copy */}
      <motion.div variants={stepTextVariants} className={isLast ? 'pb-0' : 'pb-14'}>
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
          Step {index + 1}
        </p>
        <h3 className="mt-1.5 text-xl font-semibold text-zinc-100">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">{body}</p>
      </motion.div>
    </motion.div>
  );
}

function HowItWorks() {
  return (
    <section className="border-t border-white/5">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:py-28">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            From chat noise to scene cuts.
          </h2>
          <p className="mt-3 text-zinc-400">Three steps. Then it runs itself.</p>
        </motion.div>

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

// ---------------------------------------------------------------------------
// Wall of Love — temporarily removed.
// TODO: Restore Wall of Love when real quotes are acquired. The block below is
// commented out because the testimonials were fabricated placeholders, and we
// cannot ship fabricated quotes to production. Uncomment and swap in real,
// attributable quotes to restore it.
// ---------------------------------------------------------------------------
/*
interface Testimonial {
  name: string;
  handle: string;
  initial: string;
  tone: 'cyan' | 'purple';
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Nova Reyes',
    handle: '@NovaOnAir',
    initial: 'N',
    tone: 'cyan',
    quote:
      'I watched Task Manager the whole first stream. 1.8% CPU — it just isn’t there. My game finally gets the whole machine.',
  },
  {
    name: 'Kai Whitlock',
    handle: '@KaiClutch',
    initial: 'K',
    tone: 'purple',
    quote:
      'The Auto-Hype Director cut to my raid scene before I even saw chat move. It reads the room better than I do.',
  },
  {
    name: 'Mira Sol',
    handle: '@MiraStreams',
    initial: 'M',
    tone: 'cyan',
    quote:
      'Zero-cloud, open source, featherweight. Someone finally built the tool streamers actually deserve.',
  },
  {
    name: 'Dex Almeida',
    handle: '@DexLive',
    initial: 'D',
    tone: 'purple',
    quote:
      'Not one dropped frame since I switched. My VODs have never looked this clean.',
  },
  {
    name: 'Priya Anand',
    handle: '@PriyaPlays',
    initial: 'P',
    tone: 'cyan',
    quote:
      'Mapped three trigger nodes once. Now my scenes run on the energy of the room — it feels like having a producer.',
  },
  {
    name: 'Theo Brandt',
    handle: '@TheoOnTwitch',
    initial: 'T',
    tone: 'purple',
    quote:
      'Elite engineering, honestly. 1.8% CPU under a live game is a flex — and they earned it.',
  },
];

const AVATAR_TONE: Record<Testimonial['tone'], string> = {
  cyan: 'bg-[linear-gradient(to_bottom_right,#22d3ee,#0284c7)]',
  purple: 'bg-[linear-gradient(to_bottom_right,#a855f7,#6366f1)]',
};

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="mr-5 w-[340px] shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-[#05070A] ${AVATAR_TONE[t.tone]}`}
        >
          {t.initial}
        </div>
        <figcaption>
          <p className="text-sm font-semibold text-zinc-100">{t.name}</p>
          <p className="text-xs text-zinc-500">{t.handle}</p>
        </figcaption>
      </div>
      <blockquote className="mt-4 text-sm leading-relaxed text-zinc-300">{t.quote}</blockquote>
    </figure>
  );
}

function WallOfLove() {
  const reduce = useReducedMotionSafe();
  return (
    <section className="border-t border-white/5 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
            Wall of Love
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Streamers stop noticing it’s there.
          </h2>
          <p className="mt-3 text-zinc-400">
            The best compliment a tool can earn is no compliment at all.
          </p>
        </motion.div>
      </div>

      <div className="relative mt-12 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-[linear-gradient(to_right,#05070A,transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-[linear-gradient(to_left,#05070A,transparent)]"
        />
        <motion.div
          className="flex w-max"
          animate={reduce ? undefined : { x: ['-50%', '0%'] }}
          transition={reduce ? undefined : { duration: 46, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 1].map((set) => (
            <div key={set} className="flex shrink-0" aria-hidden={set === 1}>
              {TESTIMONIALS.map((t) => (
                <TestimonialCard key={t.handle} t={t} />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
*/

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
      </main>
    </>
  );
}
