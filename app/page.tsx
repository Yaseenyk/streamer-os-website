'use client';

import { useCallback, type MouseEvent, type ReactNode } from 'react';
import Link from 'next/link';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import { ArrowRight, Gauge, ShieldCheck, Workflow } from 'lucide-react';
import Pricing from '@/components/Pricing';
import { NodeGraph } from '@/components/NodeGraph';
import { usePreRegister } from '@/components/PreRegisterModal';

// ---------------------------------------------------------------------------
// Motion vocabulary
// ---------------------------------------------------------------------------
const EASE = [0.22, 1, 0.36, 1] as const;

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
  const reduce = useReducedMotion();
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
  const reduce = useReducedMotion();
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
  '100% Open Source',
  'Local-first',
  'Tauri + Next.js',
];

function Marquee() {
  const reduce = useReducedMotion();
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
// ShineLink — primary CTA with a periodic sweeping shine
// ---------------------------------------------------------------------------
function ShineLink({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const { open } = usePreRegister();
  return (
    <button
      type="button"
      onClick={open}
      className="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#05070A] transition hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
    >
      {!reduce && (
        <motion.span
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(100deg,transparent_40%,rgba(255,255,255,0.55)_50%,transparent_60%)]"
          initial={{ x: '-110%' }}
          animate={{ x: '110%' }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 3.4, ease: 'easeInOut' }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// HeroWindow — a stylised faux app window (the immersive "UI block")
// ---------------------------------------------------------------------------
const WINDOW_STATS = [
  { label: 'CPU', value: '1.8%' },
  { label: 'Memory', value: '152 MB' },
  { label: 'Status', value: 'LIVE' },
];

function HeroWindow() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-x-12 -bottom-12 top-12 rounded-full bg-cyan-500/10 blur-[100px]"
      />
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0e15]/85 shadow-2xl shadow-black/60 backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="ml-3 font-mono text-xs text-zinc-500">streamerOS — live</span>
        </div>

        <div className="grid grid-cols-3 gap-3 p-5">
          {WINDOW_STATS.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                {stat.label}
              </p>
              <p className="mt-1 font-mono text-lg font-semibold text-cyan-400">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="px-5 pb-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            Chat velocity
          </p>
          <svg viewBox="0 0 600 150" className="mt-2 w-full" role="img" aria-label="Chat velocity chart">
            <defs>
              <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#22D3EE" stopOpacity="0.28" />
                <stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 120 L60 96 L120 108 L180 64 L240 84 L300 44 L360 74 L420 32 L480 58 L540 22 L600 46 L600 150 L0 150 Z"
              fill="url(#area)"
            />
            <polyline
              points="0,120 60,96 120,108 180,64 240,84 300,44 360,74 420,32 480,58 540,22 600,46"
              fill="none"
              stroke="#22D3EE"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="540" cy="22" r="5" fill="#22D3EE" />
            <circle cx="540" cy="22" r="10" fill="#22D3EE" fillOpacity="0.25" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  const headlineY = useTransform(scrollY, [0, 700], [0, -100]);
  const headlineOpacity = useTransform(scrollY, [0, 520], [1, 0]);
  const windowY = useTransform(scrollY, [0, 700], [0, 80]);
  const windowScale = useTransform(scrollY, [0, 700], [1, 0.93]);

  return (
    <section className="relative overflow-hidden">
      <MeshBackground />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] opacity-40" />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 sm:pt-36">
        <motion.div style={reduce ? undefined : { y: headlineY, opacity: headlineOpacity }}>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center"
          >
            <motion.span
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Launching September 2026 · Windows
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl"
            >
              Run your stream like{' '}
              <span className="bg-[linear-gradient(to_right,#22d3ee,#a855f7)] bg-clip-text text-transparent">
                mission control
              </span>
              .
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl">
              streamerOS is a Rust-powered desktop cockpit for Twitch &amp; YouTube
              streamers. Automate your OBS scenes, read your chat&apos;s pulse, and
              keep every frame for your game.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ShineLink>Pre-Register for Launch</ShineLink>
              <Link
                href="/features"
                className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-zinc-200 transition-all duration-200 hover:border-white/30 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                Explore the features
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          style={reduce ? undefined : { y: windowY, scale: windowScale }}
          className="mt-16 sm:mt-20"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -12, 0] }}
            transition={reduce ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            >
              <HeroWindow />
            </motion.div>
          </motion.div>
        </motion.div>
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
              <div className="mt-6 flex-1 rounded-xl border border-white/10 bg-[#0a0e15]/60 p-3 sm:p-5">
                <NodeGraph className="w-full" />
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
                <h3 className="text-lg font-semibold text-zinc-100">Free, and open source.</h3>
                <p className="mt-2 max-w-sm text-sm text-zinc-400">
                  streamerOS costs $0 and always will. An optional $29 Supporter
                  Edition keeps indie development alive.
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
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={stepVariants}
      initial={reduce ? 'lit' : 'dim'}
      whileInView={reduce ? undefined : 'lit'}
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
  const reduce = useReducedMotion();
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
// Page
// ---------------------------------------------------------------------------
// Creator profile graph. The SoftwareApplication node lives globally in the
// root layout (@id …/#application); here we add the ProfilePage/Person and link
// the app's author to this person by @id so the two resolve as one entity graph.
const creatorJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': 'https://streamerosai.com/#creator',
      mainEntity: {
        '@type': 'Person',
        '@id': 'https://streamerosai.com/#person',
        name: 'Yaseen Khatib',
        jobTitle: 'Senior Full-Stack Developer',
        email: 'contact@streamerosai.com',
        knowsAbout: ['TypeScript', 'Node.js', 'Systems Architecture', 'OBS WebSocket Protocol'],
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creatorJsonLd).replace(/</g, '\\u003c') }}
      />
      <ScrollProgress />
      <main>
        <Hero />
        <Marquee />
        <BentoFeatures />
        <HowItWorks />
        {/* TODO: Restore Wall of Love when real quotes are acquired */}
        <Pricing />
      </main>
    </>
  );
}
