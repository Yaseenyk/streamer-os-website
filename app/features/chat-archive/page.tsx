import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  Archive,
  ArrowRight,
  Bot,
  Check,
  Download,
  Eraser,
  HardDrive,
  Search,
  ShieldCheck,
  Tag,
  Trash2,
  Upload,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';
import FeatureFaq from '@/components/FeatureFaq';
import JsonLd from '@/components/JsonLd';
import { ScreenshotStrip } from '@/components/ScreenshotStrip';
import { SHOTS } from '@/lib/shots';
import { Screenshot } from '@/components/Screenshot';
import { breadcrumbJsonLd, type FaqEntry } from '@/lib/seo';

export const metadata: Metadata = {
  // Root layout applies the `%s · streamerOS` template.
  title: 'Chat Archive — Feature Guide',
  description:
    'streamerOS saves every YouTube and Twitch chat line to a local database ' +
    'on your PC, grouped by stream. Search it, label streams, redact messages ' +
    'and export archives — nothing is uploaded.',
  alternates: { canonical: 'https://streamerosai.com/features/chat-archive' },
};

// Answers stay within what the desktop app actually does (API_SPECIFICATION
// §8.6, §Z.10). No full-text search engine, analytics, viewer profiles or
// cloud backup — do not add claims for any of them.
const FAQ_ITEMS: FaqEntry[] = [
  {
    q: 'Do I have to turn chat saving on?',
    a: 'No. Once your YouTube or Twitch chat is connected, streamerOS saves every live chat line automatically and groups it by stream session. There is nothing extra to switch on.',
  },
  {
    q: 'Where is my chat stored? Is it uploaded anywhere?',
    a: 'In a local SQLite database under the streamerOS data folder on your PC. Nothing is uploaded, and there is no cloud backup — if you want a copy somewhere else, export the stream and keep that file with the rest of your backups.',
  },
  {
    q: 'What does it store about my viewers?',
    a: "Public chat as it appeared on your stream: each message with its username, time and type — a regular message, a Super Chat with its amount, or a membership milestone. It is public information, but it is still people's names and words on your disk, so you stay in control: redact any single message or delete a whole stream's chat whenever you want.",
  },
  {
    q: 'How does search work?',
    a: 'Type a word or a name and it matches message text and usernames, ignoring upper and lower case. You can filter by message type and search one stream or all of them. It is a straightforward text match, not a fuzzy search, and each search returns up to a few hundred messages so it stays quick — pick a single stream or a message type to narrow a big result.',
  },
  {
    q: 'Can I export my chat, or open an old archive?',
    a: 'Yes. Export saves a stream as a compressed (gzipped) JSON file in the chat-archives folder inside your streamerOS workspace. Import opens an archive file so you can read it in the app — the file needs to be inside your workspace folder, so copy it there first if it lives somewhere else.',
  },
  {
    q: 'Can the AI Sidekick use my saved chat?',
    a: 'Yes. Ask something like "what did people say about the new skin last stream?" and the Sidekick searches your saved chat with its chat-archive tool before it answers. The search runs against the database on your PC, and if nothing matches, it tells you so instead of making messages up.',
  },
  {
    q: 'What happens to my archive when the trial ends?',
    a: 'It stays readable for free. streamerOS is free for 7 days, then $29 once; the licence covers the tools that act during a live stream. Your saved chat is your data, and an expired trial never hides or deletes it.',
  },
];

// ---------------------------------------------------------------------------
// Static faux-UI panels — these only LOOK like the desktop app's Chat Archive.
// The real, searchable archive lives in the streamerOS desktop app; this site
// just explains it. Every stream name, username and message is illustrative.
// ---------------------------------------------------------------------------

const INLINE_LINK =
  'text-zinc-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-cyan-300 hover:decoration-cyan-400/50';

/** Faux panel shell — mirrors the desktop app's card chrome. */
function Panel({
  icon: Icon,
  title,
  meta,
  children,
}: {
  icon: LucideIcon;
  title: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full max-w-sm rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <Icon className="h-4 w-4 text-zinc-400" strokeWidth={1.75} aria-hidden />
        <span className="text-xs font-semibold text-zinc-300">{title}</span>
        {meta && <span className="ml-auto font-mono text-[10px] text-zinc-500">{meta}</span>}
      </div>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

/** A past stream inside the faux "Streams" list. */
function SessionRow({
  label,
  when,
  msgs,
  superChats,
  active,
}: {
  label: string;
  when: string;
  msgs: string;
  superChats: number;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border px-3 py-2 ${
        active ? 'border-cyan-400/40 bg-cyan-400/[0.06]' : 'border-white/5 bg-white/[0.02]'
      }`}
    >
      <p className={`truncate text-sm font-medium ${active ? 'text-cyan-200' : 'text-zinc-200'}`}>
        {label}
      </p>
      <p className="mt-0.5 flex flex-wrap items-center gap-x-2 font-mono text-[10px] text-zinc-500">
        <span>{when}</span>
        <span className="text-zinc-700">·</span>
        <span>{msgs} msgs</span>
        {superChats > 0 && (
          <>
            <span className="text-zinc-700">·</span>
            <span className="text-cyan-300/80">{superChats} SC</span>
          </>
        )}
      </p>
    </div>
  );
}

/** A message-type filter chip. */
function FilterChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-medium ${
        active
          ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200'
          : 'border-white/10 bg-white/5 text-zinc-400'
      }`}
    >
      {label}
    </span>
  );
}

/** A saved chat message inside the faux archive. `text` may carry a highlight. */
function ArchiveLine({
  time,
  user,
  text,
  amount,
  redact,
}: {
  time: string;
  user: string;
  text: ReactNode;
  amount?: string;
  redact?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-2 rounded-md px-2.5 py-1.5 ${
        redact ? 'border border-white/10 bg-white/[0.04]' : ''
      }`}
    >
      <span className="mt-0.5 w-10 shrink-0 font-mono text-[10px] text-zinc-600">{time}</span>
      <span className="min-w-0 flex-1 text-sm leading-snug">
        <span className="font-semibold text-zinc-200">{user}</span>
        {amount && <span className="ml-1.5 font-mono text-xs text-cyan-300">{amount}</span>}
        <span className="text-zinc-600">: </span>
        <span className="text-zinc-400">{text}</span>
      </span>
      {redact && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-red-500/30 text-red-400/80">
          <Eraser className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
        </span>
      )}
    </div>
  );
}

/** The search term, highlighted inside a faux result. */
function Hit({ children }: { children: ReactNode }) {
  return <span className="rounded bg-cyan-400/15 px-0.5 text-cyan-200">{children}</span>;
}

/** A small faux action button (non-interactive). */
function FauxButton({
  icon: Icon,
  label,
  tone = 'neutral',
}: {
  icon: LucideIcon;
  label: string;
  tone?: 'neutral' | 'primary' | 'danger';
}) {
  const shell =
    tone === 'primary'
      ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200'
      : tone === 'danger'
        ? 'border-red-500/30 bg-red-500/[0.04] text-red-300'
        : 'border-white/10 bg-white/5 text-zinc-300';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[11px] font-semibold ${shell}`}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Ownership cards
// ---------------------------------------------------------------------------
interface Guarantee {
  icon: LucideIcon;
  title: string;
  body: string;
}

const GUARANTEES: Guarantee[] = [
  {
    icon: HardDrive,
    title: 'Stored on your PC',
    body:
      'Chat is saved to a local database in the streamerOS data folder. Nothing ' +
      'is uploaded, and there is no cloud copy.',
  },
  {
    icon: Eraser,
    title: 'You decide what stays',
    body:
      'It keeps public usernames and messages as they appeared on stream. Redact ' +
      'a single line or delete a whole stream whenever you want.',
  },
  {
    icon: ShieldCheck,
    title: 'Readable after the trial',
    body:
      'When the trial ends, your archive stays readable for free. It is your ' +
      'data.',
  },
];

// ---------------------------------------------------------------------------
// Step scaffold — a vertical timeline. Each step pairs an explanation with a
// static mock of the view it describes.
// ---------------------------------------------------------------------------
interface StepProps {
  index: number;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  last?: boolean;
  mock: ReactNode;
}

function Step({ index, icon: Icon, eyebrow, title, body, last, mock }: StepProps) {
  return (
    <Reveal className="relative grid gap-8 pb-16 last:pb-0 lg:grid-cols-2 lg:gap-12">
      {/* Timeline rail + marker (left column, large screens) */}
      <div className="flex gap-5">
        <div className="relative flex flex-col items-center">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#05070A] text-cyan-300">
            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </span>
          {!last && (
            <span aria-hidden className="mt-2 w-px flex-1 bg-gradient-to-b from-white/15 to-transparent" />
          )}
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
            Step {index} · {eyebrow}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
          <p className="mt-3 leading-relaxed text-zinc-400">{body}</p>
        </div>
      </div>

      {/* The faux view for this step */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">{mock}</div>
    </Reveal>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function ChatArchiveGuidePage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Features', path: '/features' },
          { name: 'Chat Archive', path: '/features/chat-archive' },
        ])}
      />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] opacity-50" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
              Feature Guide
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Every stream&rsquo;s chat, saved on your PC.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Chat scrolls past in seconds. Chat Archive keeps it. Every YouTube and
              Twitch chat line is saved automatically, grouped by stream, so you can
              find the question you missed, the name you meant to shout out or the
              moment chat lost it. Nothing is uploaded.
            </p>
          </Reveal>
        </div>
      </section>

      <Screenshot
        src="/screenshots/chat-archive.png"
        alt="The streamerOS Chat Archive with a list of past streams and a search across saved chat, held locally on the PC"
        caption="Your chat history, on your disk"
        width={SHOTS.chatArchive.width}
        height={SHOTS.chatArchive.height}
      />

      {/* Walkthrough */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            From live chat to a searchable history in four steps.
          </h2>
          <p className="mt-4 text-zinc-400">
            Stream &rarr; Search &rarr; Label &rarr; Export. The same chat you triage
            live in the{' '}
            <Link href="/features/live-cockpit" className={INLINE_LINK}>
              Live Cockpit
            </Link>{' '}
            is still there after you go offline.
          </p>
        </Reveal>

        <div className="mt-16">
          {/* Step 1 — It saves itself */}
          <Step
            index={1}
            icon={HardDrive}
            eyebrow="It saves itself"
            title="Go live. Chat is saved as it lands."
            body="Every chat line from YouTube or Twitch is written to a local SQLite database in the streamerOS data folder on your PC, grouped by stream. Each stream shows up in your list with its start and end time, message count and Super Chat count. Nothing is uploaded."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <HardDrive className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Saved on this PC
                </p>
                <Panel icon={Archive} title="Streams" meta="3 saved">
                  <SessionRow
                    label="Valorant ranked night"
                    when="Sep 9 · 20:02–23:41"
                    msgs="2,318"
                    superChats={14}
                    active
                  />
                  <SessionRow
                    label="Just Chatting Q&A"
                    when="Sep 7 · 19:30–21:05"
                    msgs="906"
                    superChats={3}
                  />
                  <SessionRow
                    label="Speedrun practice"
                    when="Sep 5 · 21:10–23:52"
                    msgs="1,142"
                    superChats={0}
                  />
                </Panel>
              </div>
            }
          />

          {/* Step 2 — Search */}
          <Step
            index={2}
            icon={Search}
            eyebrow="Find anything"
            title="Search one stream, or all of them."
            body="Search across message text and usernames — upper or lower case doesn't matter. Filter to regular messages, Super Chats or membership milestones, and look inside a single stream or across every stream you've saved."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Search className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  All streams
                </p>
                <Panel icon={Search} title="Search chat">
                  <div className="flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-white/5 px-3 py-2">
                    <Search className="h-3.5 w-3.5 shrink-0 text-zinc-500" aria-hidden />
                    <span className="text-sm text-zinc-200">skin</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pb-1">
                    <FilterChip label="All" active />
                    <FilterChip label="Viewers" />
                    <FilterChip label="Members" />
                    <FilterChip label="Super Chats" />
                  </div>
                  <ArchiveLine
                    time="21:14"
                    user="pixelpanda"
                    text={
                      <>
                        where do you get that <Hit>skin</Hit>?
                      </>
                    }
                  />
                  <ArchiveLine
                    time="21:15"
                    user="rahul.plays"
                    amount="₹200.00"
                    text={
                      <>
                        new <Hit>skin</Hit> looks insane on stream
                      </>
                    }
                  />
                  <ArchiveLine
                    time="22:40"
                    user="mira_draws"
                    text={
                      <>
                        the <Hit>Skin</Hit> reload animation tho
                      </>
                    }
                  />
                </Panel>
              </div>
            }
          />

          {/* Step 3 — Label and tidy */}
          <Step
            index={3}
            icon={Tag}
            eyebrow="Label and tidy"
            title="Name your streams. Remove what you don't want kept."
            body="Give a stream a label like “Valorant ranked night” so it's easy to find later. Redact a single message, or delete a whole stream's chat in one go."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Tag className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Manage stream
                </p>
                <Panel icon={Tag} title="Selected stream">
                  <div className="flex items-center gap-2">
                    <span className="min-w-0 flex-1 truncate rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200">
                      Valorant ranked night
                    </span>
                    <FauxButton icon={Check} label="Save" />
                  </div>
                  <ArchiveLine time="20:31" user="spam_bot_42" text="free followers at …" redact />
                  <ArchiveLine time="20:32" user="nightowl_gg" text="that retake was so good" />
                  <div className="flex flex-wrap gap-2 pt-1">
                    <FauxButton icon={Trash2} label="Delete stream" tone="danger" />
                  </div>
                </Panel>
                <div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] px-3 py-2 text-sm text-emerald-200/90">
                  <Check className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={2.5} aria-hidden />
                  Label saved &mdash; one message redacted.
                </div>
              </div>
            }
          />

          {/* Step 4 — Export or import */}
          <Step
            index={4}
            icon={Download}
            eyebrow="Export or import"
            title="Keep a copy as a file."
            body="Export a stream as a compressed (gzipped) JSON file — it lands in the chat-archives folder inside your streamerOS workspace. To read an archive again, import it from inside your workspace and browse it in the app."
            last
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Download className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Workspace / chat-archives
                </p>
                <div className="flex flex-wrap gap-2">
                  <FauxButton icon={Download} label="Export" tone="primary" />
                  <FauxButton icon={Upload} label="Import archive" />
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] px-3 py-2 text-sm text-emerald-200/90">
                  <Check className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={2.5} aria-hidden />
                  Exported to chat-archives as .json.gz
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-purple-400/30 bg-purple-400/[0.06] px-3 py-2 text-sm text-zinc-300">
                  <Upload className="h-4 w-4 shrink-0 text-purple-300" strokeWidth={1.75} aria-hidden />
                  <span className="min-w-0 truncate">
                    Viewing imported archive: Valorant ranked night
                  </span>
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* AI Sidekick */}
      <section className="border-t border-white/5">
        <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
              With the AI Sidekick
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Ask your chat history a question.
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-400">
              The{' '}
              <Link href="/features/ai-sidekick" className={INLINE_LINK}>
                AI Sidekick
              </Link>{' '}
              can search your saved chat for you. Ask &ldquo;what did people say about
              the new skin last stream?&rdquo; and it looks through the archive with its
              chat-archive tool before it answers. The search runs against the database
              on your PC, and if nothing matches, it says so instead of inventing
              messages.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
              <div className="ml-auto w-fit max-w-[85%] rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200">
                what did people say about the new skin last stream?
              </div>
              <div className="flex w-fit items-center gap-1.5 rounded-full border border-purple-400/30 bg-purple-400/[0.06] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-purple-300">
                <Search className="h-3 w-3" aria-hidden />
                Searched saved chat
              </div>
              <div className="flex max-w-[92%] gap-2.5 rounded-xl border border-purple-400/30 bg-purple-400/[0.06] px-3 py-2.5">
                <Bot className="mt-0.5 h-4 w-4 shrink-0 text-purple-300" strokeWidth={1.75} aria-hidden />
                <div className="space-y-2 text-sm text-zinc-300">
                  <p>
                    I found messages about the skin in Valorant ranked night. A few of
                    them:
                  </p>
                  <p className="border-l-2 border-white/10 pl-2.5 text-zinc-400">
                    pixelpanda: where do you get that skin?
                  </p>
                  <p className="border-l-2 border-white/10 pl-2.5 text-zinc-400">
                    rahul.plays: new skin looks insane on stream
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ownership */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Your chat, your call.
            </h2>
            <p className="mt-4 text-zinc-400">
              An archive of real people&rsquo;s messages should be handled with care. Here
              is exactly what happens to it.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {GUARANTEES.map((g, i) => {
              const Icon = g.icon;
              return (
                <Reveal key={g.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-zinc-100">
                      {g.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-zinc-400">{g.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-zinc-500">
              More on how streamerOS keeps your data local in{' '}
              <Link href="/features/zero-cloud" className={INLINE_LINK}>
                Zero-Cloud Privacy
              </Link>
              . What the trial and the one-time licence include is on the{' '}
              <Link href="/pricing" className={INLINE_LINK}>
                pricing page
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <FeatureFaq items={FAQ_ITEMS} />

      <ScreenshotStrip
        heading="Your chat history, in the app."
        blurb="The archive, a labelled stream, and the live panels the chat comes from."
        shots={[SHOTS.chatArchive, SHOTS.chatArchiveSession, SHOTS.chatTriage, SHOTS.revenue]}
      />

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Keep every stream&rsquo;s chat.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Chat Archive ships at launch in November 2026. Free for 7 days, then $29
              once — and your archive stays readable either way.
            </p>
            <LaunchBadge className="mt-8" />
            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PreRegisterButton className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#05070A] transition hover:bg-cyan-300">
                Pre-Register for Launch
                <ArrowRight className="h-4 w-4" aria-hidden />
              </PreRegisterButton>
              <Link
                href="/features"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold text-zinc-200 transition-all duration-200 hover:border-white/20 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                Back to all features
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
