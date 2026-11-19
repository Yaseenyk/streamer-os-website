import Link from 'next/link';
import { ArrowRight, BookOpen, FileText, HelpCircle, Library, Play } from 'lucide-react';
import { siteConfig } from '@/config/site';
import InlineSignup from '@/components/InlineSignup';
import { ProductShot } from '@/components/ProductShot';
import { SHOTS } from '@/lib/shots';
import { GLOSSARY } from '@/lib/glossary';
import { getAllPostMeta, type PostMeta } from '@/lib/posts';

// Server component. Since 19 Nov 2026 the home page leads with the site's free
// guides; the streamerOS app is unreleased (planned February 2027) and gets one
// labelled section near the end. Motion is plain CSS (sos-* in globals.css);
// the h1 is plain server HTML with a transform-only animation, so it paints
// at first render (it is the LCP element). Only InlineSignup is a client island.

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

// ---------------------------------------------------------------------------
// Guide topics. Slugs only: titles and descriptions come from the posts, and a
// slug that is not an indexable post (missing, or noindexed with `seeAlso`) is
// skipped. Any indexable post not listed here lands in "More guides".
// ---------------------------------------------------------------------------
const TOPICS: { id: string; label: string; blurb: string; slugs: string[] }[] = [
  {
    id: 'obs-settings',
    label: 'OBS settings and performance',
    blurb: 'Encoder, bitrate and preset choices, and how to find what is costing you frames.',
    slugs: [
      'best-obs-settings-for-low-cpu-streaming',
      'obs-encoding-overloaded-fix',
      'obs-dropped-frames-find-the-cpu-hog',
      'nvenc-vs-x264-for-streaming',
      'obs-bitrate-settings-for-twitch',
      'obs-cpu-usage-preset-explained',
      'obs-psycho-visual-tuning-explained',
      'obs-high-cpu-usage-busy-chat-companion-apps',
      'obs-mic-too-quiet-measure-before-you-boost',
      'obs-replay-buffer-settings-the-setup-that-works',
    ],
  },
  {
    id: 'scenes',
    label: 'Scene switching, plugins and automation',
    blurb: 'Hotkeys, Advanced Scene Switcher, scripts, OBS WebSocket, and what to automate first.',
    slugs: [
      'auto-switch-obs-scenes-guide',
      'obs-advanced-scene-switcher-guide',
      'obs-scene-switcher-hotkey-the-setup-that-works',
      'obs-automatic-scene-switcher-not-switching',
      'obs-websocket-setup-guide',
      'obs-websocket-connection-failed-three-failures',
      'optimizing-desktop-ipc-obs-websocket-latency',
      'obs-scripts-guide',
      'obs-timer-plugin',
      'stream-automation-101',
    ],
  },
  {
    id: 'chat',
    label: 'Live chat',
    blurb: 'Reading chat on one monitor, chat docks and overlays, saving logs, and reading the mood.',
    slugs: [
      'how-to-read-chat-while-streaming-one-monitor',
      'obs-chat-dock-missing',
      'twitch-chat-overlay-obs',
      'how-to-save-youtube-live-chat-and-twitch-chat-logs',
      'what-is-chat-velocity',
      'how-to-read-chat-sentiment-in-real-time',
    ],
  },
  {
    id: 'clips',
    label: 'Clips, Shorts and files',
    blurb: 'Finding highlights, cutting vertical Shorts, and keeping VODs where you can find them.',
    slugs: [
      'auto-clip-twitch-highlights',
      'how-to-make-youtube-shorts-from-a-live-stream',
      'streaming-workspace-folder-setup',
    ],
  },
  {
    id: 'money',
    label: 'Sponsors, Super Chats and growth',
    blurb: 'Getting a first sponsor, pricing a deal, media kits, Super Chat rules and platform choice.',
    slugs: [
      'sponsors-for-small-streamers',
      'how-much-to-charge-for-stream-sponsorships',
      'how-to-make-a-streamer-media-kit',
      'how-to-track-sponsor-deals-as-a-streamer',
      'youtube-super-chat-requirements-eligibility-and-setup',
      'how-to-track-super-chat-revenue',
      'twitch-vs-youtube-for-new-streamers',
    ],
  },
  {
    id: 'ai-privacy',
    label: 'Local AI, privacy and tool choice',
    blurb: 'Running Ollama on Windows, free AI setups, what cloud tools send, and the alternatives.',
    slugs: [
      'run-ollama-on-windows-guide',
      'ai-tools-for-streamers-the-setup-that-works',
      'ai-co-host-for-streaming-the-setup-that-works',
      'what-stream-tools-send-to-the-cloud',
      'streamlabs-alternative-local-first',
    ],
  },
];

function groupPosts(posts: PostMeta[]) {
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  const used = new Set<string>();
  const groups = TOPICS.map((topic) => {
    const items = topic.slugs.flatMap((slug) => {
      const post = bySlug.get(slug);
      if (!post) return [];
      used.add(slug);
      return [post];
    });
    return { ...topic, items };
  }).filter((g) => g.items.length > 0);
  const rest = posts.filter((p) => !used.has(p.slug));
  if (rest.length > 0) {
    groups.push({ id: 'more', label: 'More guides', blurb: 'Newest first.', slugs: [], items: rest });
  }
  return groups;
}

// ---------------------------------------------------------------------------
// Hero: what the site is for a reader today.
// ---------------------------------------------------------------------------
function Hero({ guideCount }: { guideCount: number }) {
  return (
    <section className="relative overflow-hidden">
      <MeshBackground />
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-24 sm:pt-28">
        <span className="sos-rise mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          {guideCount} free guides · no sign-up to read
        </span>

        <h1 className="sos-rise max-w-4xl text-balance text-4xl font-semibold leading-[1.06] tracking-tight sm:text-6xl">
          OBS and streaming guides for{' '}
          <span className="bg-[linear-gradient(to_right,#22d3ee,#a855f7)] bg-clip-text text-transparent">
            Twitch and YouTube
          </span>{' '}
          streamers.
        </h1>

        <p className="sos-rise mt-6 max-w-2xl text-lg text-zinc-400">
          Step-by-step answers to the problems streamers search for: OBS encoder, bitrate and
          low-CPU settings, dropped frames, scene switching, reading chat on one monitor, clips
          and Shorts, and sponsorships for small channels. Plus a playbook of stream automations,
          a glossary of chat terms, and setup docs.
        </p>

        <div className="sos-rise mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#guides"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-[#05070A] transition-colors hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            Browse the guides
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <Link
            href="/playbook"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition-colors hover:border-cyan-400/40 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            Read the playbook
          </Link>
        </div>

        <p className="mt-6 max-w-2xl text-sm text-zinc-500">
          Written by{' '}
          <Link
            href="/about"
            className="text-zinc-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-cyan-300"
          >
            Yaseen Khatib
          </Link>
          , an independent developer building streamerOS, a Windows companion app for OBS that
          is not released yet.
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Guides by topic: every indexable post, grouped.
// ---------------------------------------------------------------------------
function GuideTopics({ groups }: { groups: ReturnType<typeof groupPosts> }) {
  return (
    <section id="guides" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 sm:py-20">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">Guides by topic</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Pick the problem you have.
        </h2>
      </div>

      <nav aria-label="Guide topics" className="mt-6 flex flex-wrap gap-2">
        {groups.map((g) => (
          <a
            key={g.id}
            href={`#${g.id}`}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
          >
            {g.label}
          </a>
        ))}
      </nav>

      <div className="mt-12 space-y-14">
        {groups.map((g) => (
          <div key={g.id} id={g.id} className="sos-reveal scroll-mt-24">
            <h3 className="text-xl font-semibold tracking-tight text-zinc-100">{g.label}</h3>
            <p className="mt-1 text-sm text-zinc-400">{g.blurb}</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-cyan-400/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  >
                    <span className="text-sm font-semibold leading-snug text-zinc-100 group-hover:text-cyan-300">
                      {post.title}
                    </span>
                    <span className="mt-2 line-clamp-3 text-xs leading-relaxed text-zinc-400">
                      {post.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-12 text-sm text-zinc-400">
        <Link href="/blog" className="inline-flex items-center gap-1.5 font-semibold text-cyan-400 hover:text-cyan-300">
          All guides, newest first
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </p>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Reference: playbook, glossary, docs, FAQ.
// ---------------------------------------------------------------------------
const REFERENCE = [
  {
    icon: BookOpen,
    title: 'The Streamer’s Playbook',
    body: 'Five stream moments written up as automation rules: a facecam push-in on a hype spike, a Super Chat celebration, a focus cut, a BRB break and a saved clip.',
    href: '/playbook',
  },
  {
    icon: Library,
    title: 'Glossary',
    body: 'Sourced definitions of terms streamers meet in chat and in moderation settings.',
    href: '/glossary',
  },
  {
    icon: FileText,
    title: 'Docs',
    body: 'System requirements, connecting OBS WebSocket, running a local model with Ollama, and where data is kept.',
    href: '/docs',
  },
  {
    icon: HelpCircle,
    title: 'FAQ',
    body: 'Short answers about the app: how it connects to OBS, privacy, requirements, cost and licensing.',
    href: '/faq',
  },
];

function Reference() {
  return (
    <section className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">Reference</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Playbook, glossary and docs.</h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REFERENCE.map(({ icon: Icon, title, body, href }) => (
            <Link
              key={href}
              href={href}
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-cyan-400/30 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-400">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="mt-4 text-base font-semibold text-zinc-100 group-hover:text-cyan-300">{title}</span>
              <span className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</span>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-sm font-semibold text-zinc-200">Glossary entries</h3>
          <ul className="mt-3 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-3">
            {GLOSSARY.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={`/glossary/${entry.slug}`}
                  className="text-zinc-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-cyan-300 hover:decoration-cyan-400/50"
                >
                  {entry.term}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// The app: one clearly labelled section. It is not released; nothing here
// offers a download.
// ---------------------------------------------------------------------------
function AppComingSoon() {
  return (
    <section id="app" className="border-t border-white/5 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
              Coming February 2027 · not released yet
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              streamerOS app: coming February 2027
            </h2>
            <p className="mt-4 text-zinc-400">
              The developer of these guides is building streamerOS, a Windows 10 and 11 app that
              runs next to OBS Studio (an app, not an operating system). It reads Twitch or
              YouTube chat on your own PC, can switch OBS scenes when chat activity or a Super
              Chat crosses a threshold you set, and marks moments for clipping. No account and no
              cloud service.
            </p>
            <p className="mt-3 text-sm text-zinc-500">
              There is no download yet. February 2027 is the planned launch, built by one
              developer, so it is a plan rather than a promise; the{' '}
              <Link href="/changelog" className="text-zinc-300 underline decoration-white/20 underline-offset-4 hover:text-cyan-300">
                changelog
              </Link>{' '}
              says if it moves.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              {siteConfig.demoUrl && (
                <a
                  href={siteConfig.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2.5 text-sm font-semibold text-cyan-300 transition-colors hover:bg-cyan-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  <Play className="h-4 w-4" aria-hidden />
                  Try the browser demo
                  <span className="font-normal text-cyan-300/60">· sample data</span>
                </a>
              )}
              <Link
                href="/features"
                className="inline-flex items-center gap-1.5 font-mono text-sm text-cyan-400 transition-colors hover:text-cyan-300"
              >
                What it will do
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <InlineSignup
              className="mt-8"
              source="home-app"
              heading="Join the early-access list"
              blurb="Free, email only, not a purchase. You get the beta builds before the public launch and a short build-log email about once a month."
              cta="Join the list"
            />
          </div>

          <div>
            <ProductShot shot={SHOTS.dashboard} sizes="(max-width: 1024px) 100vw, 640px" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function HomeContent() {
  const posts = await getAllPostMeta();
  const groups = groupPosts(posts);
  return (
    <>
      <ScrollProgress />
      <main>
        <Hero guideCount={posts.length} />
        <GuideTopics groups={groups} />
        <Reference />
        <AppComingSoon />
      </main>
    </>
  );
}
