import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  Activity,
  Archive,
  ArrowRight,
  Handshake,
  Hash,
  IndianRupee,
  KeyRound,
  Lock,
  MessageSquareText,
  MessagesSquare,
  Scissors,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';
import FeatureFaq from '@/components/FeatureFaq';
import JsonLd from '@/components/JsonLd';
import { ScreenshotStrip } from '@/components/ScreenshotStrip';
import { SHOTS } from '@/lib/shots';
import { breadcrumbJsonLd, type FaqEntry } from '@/lib/seo';
import { SITE_URL } from '@/config/site';

export const metadata: Metadata = {
  // Root layout applies the `%s · streamerOS` template.
  title: 'For Indian Streamers — Hinglish Chat and ₹ Super Chats',
  description:
    'Chat sentiment that reads Hinglish, Super Chats totalled in ₹ and YouTube ' +
    'Live chat with no API key — on your own PC. Ships February 2027.',
  alternates: { canonical: `${SITE_URL}/for/indian-streamers` },
};

// Every answer stays inside what the November build actually does. Checked
// against the product source on 2026-09-11: Hinglish is handled by the chat
// sentiment classifier's prompt; the AI Sidekick's prompt is English, so this
// page does not claim Hinglish replies. The caveats (Windows only, fast chats,
// English-only Brand Guard, no mobile game detection) are here on purpose —
// this audience will find them anyway.
const FAQ_ITEMS: FaqEntry[] = [
  {
    q: 'Does streamerOS understand Hinglish?',
    a: 'Its chat sentiment does. Sentiment Horizon’s local model is built to read Roman-script Hindi mixed with English, so “Bhai sahi hai” scores positive and “cringe yaar” mildly negative, and the mood reading follows what your viewers actually mean. The AI Sidekick currently replies in English, and Brand Guard — which listens to your mic — uses an English-focused speech model for now.',
  },
  {
    q: 'Do I need a YouTube API key or a Google sign-in for YouTube Live chat?',
    a: 'No. streamerOS reads your live chat locally from your own browser window, so there is no API key, no Google sign-in and no quota to run out of mid-stream. A YouTube Data API key is optional and adds exactly one thing: your exact subscriber count. If you add one, it is stored in Windows Credential Manager.',
  },
  {
    q: 'Does it work with Twitch as well?',
    a: 'Yes. Twitch chat is read over an anonymous, read-only connection, so there is nothing to log into there either.',
  },
  {
    q: 'Can I pay in rupees? What does it cost?',
    a: 'The licence is priced in US dollars: free for 7 days, then $29 once — not a subscription. There is no separate rupee price. Pre-register before the February 2027 launch and your trial runs 3 months instead of 7 days. The ₹ you see in the revenue panel is a display currency for your Super Chat totals, not the price of the app.',
  },
  {
    q: 'What PC do I need?',
    a: 'A Windows 10 or 11 PC with OBS Studio installed — streamerOS works alongside OBS rather than replacing it. We recommend 16 GB of RAM and an 8-core CPU, plus an RTX 3060-class GPU for the local AI features such as sentiment. There is no macOS or mobile version.',
  },
  {
    q: 'Does it detect BGMI or other mobile games?',
    a: 'No. Foreground game detection covers PC games — Valorant, CS2, GTA V, Fortnite, Apex Legends, Minecraft and PUBG: Battlegrounds on PC among them. It does not detect BGMI or any mobile game. The chat features read your YouTube or Twitch chat rather than the game, and Viral Engine can write titles from a description you type instead of a detected game.',
  },
  {
    q: 'Is my chat uploaded anywhere?',
    a: 'No. There is no account and no backend. Chat and audio are processed on your PC and never uploaded, and the Chat Archive lives on your own disk — search it, label it, export it, or delete it.',
  },
  {
    q: 'Will it catch every message on a very fast chat?',
    a: 'Not always. On very fast chats — big esports streams moving at 20 or more messages a second — the browser reader may not capture every single message. Chat velocity and hype detection still work at those speeds.',
  },
];

// ---------------------------------------------------------------------------
// "Built for how you stream" — each card points at the page that proves it.
// ---------------------------------------------------------------------------
interface Card {
  icon: LucideIcon;
  title: string;
  body: string;
  href: string;
  cta: string;
}

const CARDS: Card[] = [
  {
    icon: Activity,
    title: 'Sentiment that reads Hinglish',
    body: '“Bhai sahi hai” scores positive, “cringe yaar” mildly negative. The mood of your chat, from toxic to hype, as it happens.',
    href: '/features/live-cockpit#sentiment',
    cta: 'Sentiment',
  },
  {
    icon: IndianRupee,
    title: 'Super Chats totalled in ₹',
    body: 'Exact totals for every currency, plus an approximate rupee total at exchange rates you set.',
    href: '/features/live-cockpit#revenue',
    cta: 'Revenue',
  },
  {
    icon: KeyRound,
    title: 'YouTube Live, no API key',
    body: 'Chat is read from your own browser window. No Google sign-in, no quota to hit halfway through a stream.',
    href: '#youtube-live',
    cta: 'How it works',
  },
  {
    icon: MessageSquareText,
    title: 'A sidekick that checks the numbers',
    body: 'Ask “how much have I made in Super Chats this stream?” and it answers from your own ledger — or switches your OBS scene when you ask.',
    href: '/features/ai-sidekick',
    cta: 'AI Sidekick',
  },
  {
    icon: Archive,
    title: 'Every stream’s chat, kept',
    body: 'Saved on your disk to search, label and export — and it stays free after the trial.',
    href: '/features/chat-archive',
    cta: 'Chat Archive',
  },
  {
    icon: Scissors,
    title: 'From hype spike to Short',
    body: 'Viral Moments marks spikes live, Clip Library ranks recordings by hype, and Shorts Factory crops the moment to 9:16.',
    href: '/features/viral-moments',
    cta: 'Viral Moments',
  },
  {
    icon: Hash,
    title: 'Titles from what chat loved',
    body: 'Viral Engine writes three YouTube titles and hashtags from your game and what chat is reacting to.',
    href: '/features/viral-engine',
    cta: 'Viral Engine',
  },
  {
    icon: Handshake,
    title: 'Brand deals, organised',
    body: 'Track sponsor conversations in one pipeline and build a media-kit PDF from your own YouTube and Twitch analytics exports.',
    href: '/features/sponsor-crm',
    cta: 'Sponsor CRM',
  },
];

function FeatureCard({ card }: { card: Card }) {
  const { icon: Icon, title, body, href, cta } = card;
  return (
    <Link href={href} className="block h-full">
      <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-cyan-400/40 hover:bg-white/[0.06]">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-400">
          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </span>
        <h3 className="mt-5 text-lg font-semibold text-zinc-100">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{body}</p>
        <p className="mt-4 flex items-center gap-1.5 border-t border-white/5 pt-4 text-sm font-medium text-cyan-200/80">
          {cta}
          <ArrowRight
            className="h-4 w-4 text-cyan-400 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </p>
      </article>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Static faux-UI panels — these only LOOK like the desktop app's chat feed,
// Sentiment Horizon and Stream Revenue panels. Usernames, messages and numbers
// are sample data (11 Super Chats, ≈ ₹5,135 at the bundled default rates).
// Nothing here talks to anything.
// ---------------------------------------------------------------------------

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
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
        <span className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-zinc-400" strokeWidth={1.75} aria-hidden />
          <span className="text-xs font-semibold text-zinc-300">{title}</span>
        </span>
        {meta && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">{meta}</span>
        )}
      </div>
      <div className="mt-4 flex flex-1 flex-col gap-3">{children}</div>
    </div>
  );
}

/** One line in the faux chat feed. */
function ChatLine({ user, children }: { user: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-sm">
      <span className="shrink-0 font-mono text-xs font-semibold text-cyan-300">{user}</span>
      <span className="min-w-0 text-zinc-200">{children}</span>
    </div>
  );
}

/** One currency line in the faux revenue ledger. */
function CurrencyRow({ code, count, amount }: { code: string; count: number; amount: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5">
      <span className="flex items-center gap-3">
        <span className="w-9 font-mono text-xs font-semibold text-zinc-300">{code}</span>
        <span className="text-xs text-zinc-500">
          {count} Super Chat{count === 1 ? '' : 's'}
        </span>
      </span>
      <span className="font-mono text-sm text-zinc-100">{amount}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function IndianStreamersPage() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: 'For Indian streamers', path: '/for/indian-streamers' }])} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] opacity-50" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
              For Indian streamers
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Built for chats that say “bhai, sahi hai”.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              streamerOS runs next to OBS on your own Windows PC. Chat sentiment that
              reads Hinglish, every Super Chat totalled in rupees, YouTube Live chat
              with no API key, and a local AI that answers from your stream. No
              account, and your chat never leaves your machine.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col items-center gap-4">
              <PreRegisterButton className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#05070A] transition hover:bg-cyan-300">
                Pre-register for 3 months free
                <ArrowRight className="h-4 w-4" aria-hidden />
              </PreRegisterButton>
              <LaunchBadge />
              <p className="text-xs text-zinc-500">
                Free for 7 days at launch, then $29 once — not a subscription.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Built for how you stream */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Built for how you stream.
            </h2>
            <p className="mt-3 leading-relaxed text-zinc-400">
              For when your chat switches between Hindi and English mid-sentence,
              your Super Chats arrive in more than one currency, and you would rather
              not fight the YouTube API just to read your own chat.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CARDS.map((card, i) => (
              <Reveal key={card.title} delay={(i % 4) * 0.06}>
                <FeatureCard card={card} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Faux panels — Hinglish chat + sentiment, ₹ revenue */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
              Your chat, read right
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Hinglish chat understood. Super Chats counted in rupees.
            </h2>
            <p className="mt-4 text-zinc-400">
              Sentiment Horizon scores Hinglish chat the way your viewers mean it, and
              the revenue panel does the currency maths. Both run on your PC.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <Panel icon={MessagesSquare} title="Live chat" meta="Local · Ollama">
                <ChatLine user="rohit_op">bhai kya clutch tha 🔥</ChatLine>
                <ChatLine user="anjali.gg">sahi hai yaar, full hype</ChatLine>
                <ChatLine user="kabir07">next match bhi stream pe?</ChatLine>
                <ChatLine user="desi_sniper">GG bhai 💯</ChatLine>
                <ChatLine user="meera">cringe yaar ye skin 😂</ChatLine>
                <div className="mt-auto rounded-lg border border-purple-400/30 bg-purple-400/[0.06] px-3 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                      <Activity className="h-3.5 w-3.5 text-purple-300" strokeWidth={2} aria-hidden />
                      Sentiment Horizon
                    </span>
                    <span className="text-sm font-semibold text-purple-200">🔥 HYPE · +0.62</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <span aria-hidden className="block h-full w-[81%] rounded-full bg-gradient-to-r from-purple-400/70 to-cyan-300" />
                  </div>
                </div>
              </Panel>
            </Reveal>

            <Reveal delay={0.08}>
              <Panel icon={IndianRupee} title="Stream revenue" meta="Display: ₹ INR">
                <CurrencyRow code="INR" count={6} amount="₹2,500.00" />
                <CurrencyRow code="USD" count={3} amount="$20.00" />
                <CurrencyRow code="EUR" count={1} amount="€5.00" />
                <CurrencyRow code="GBP" count={1} amount="£5.00" />
                <div className="mt-1 flex items-center justify-between gap-4 rounded-lg border border-cyan-400/30 bg-cyan-400/[0.06] px-3 py-3">
                  <span>
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                      Total · 11 Super Chats
                    </span>
                    <span className="mt-0.5 block text-[11px] text-zinc-500">Approximate</span>
                  </span>
                  <span className="text-2xl font-semibold text-cyan-200">≈ ₹5,135</span>
                </div>
                <p className="mt-auto border-t border-white/5 pt-3 font-mono text-[11px] leading-relaxed text-zinc-500">
                  Your rates: 1 USD ≈ ₹83 · 1 EUR ≈ ₹90 · 1 GBP ≈ ₹105. Set by you,
                  no live FX lookup.
                </p>
              </Panel>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <p className="mt-6 text-center text-xs text-zinc-500">
              Illustrations with sample chat and numbers. Real captures of the app are further down.
            </p>
          </Reveal>
        </div>
      </section>

      {/* YouTube Live without the API hassle */}
      <section id="youtube-live" className="scroll-mt-20 border-b border-white/5">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              YouTube Live without the API hassle.
            </h2>
            <p className="mt-3 leading-relaxed text-zinc-400">
              No Google Cloud project, no key to paste in, no sign-in screen.
              streamerOS reads your chat locally, from the same browser window you
              already watch it in.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: KeyRound,
                title: 'No key, no sign-in, no quota',
                body: 'Chat is read from your own browser window on your PC. Nothing to set up in Google Cloud and no daily quota to run out of.',
              },
              {
                icon: ShieldCheck,
                title: 'An API key is optional',
                body: 'Add a YouTube Data API key only if you want your exact subscriber count. It is kept in Windows Credential Manager.',
              },
              {
                icon: MessagesSquare,
                title: 'Twitch works too',
                body: 'Twitch chat comes in over an anonymous, read-only connection — no login there either.',
              },
              {
                icon: Lock,
                title: 'It stays on your PC',
                body: 'No account and no backend. Chat and audio are processed on your machine and never uploaded.',
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="flex h-full gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-400">
                    <item.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold text-zinc-100">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <p className="mt-8 border-l-2 border-amber-400/50 pl-4 text-sm leading-relaxed text-zinc-400">
              <strong className="text-zinc-200">One honest limit:</strong> on very fast
              chats — big esports streams moving at 20+ messages a second — the browser
              reader may not capture every single message. Chat velocity and hype
              detection still work.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Dashboard leads the strip: it is the one wide capture, and the first
          shot that exists renders full-width. */}
      <ScreenshotStrip
        heading="Hinglish chat, rupees and the whole cockpit."
        blurb="Captures of streamerOS running on Windows — the same build that ships in November."
        shots={[
          SHOTS.dashboard,
          SHOTS.hinglishChat,
          SHOTS.revenueInr,
          SHOTS.chatTriage,
          SHOTS.sentiment,
          SHOTS.viralEngine,
        ]}
      />

      <FeatureFaq items={FAQ_ITEMS} />

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Three months free if you register before launch.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              streamerOS ships in February 2027. Pre-register now and your trial runs
              three months instead of seven days — enough streams to know if it fits.
              After that it is $29 once, not a subscription.
            </p>
            <LaunchBadge className="mt-8" />
            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PreRegisterButton className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#05070A] transition hover:bg-cyan-300">
                Claim 3 months free
                <ArrowRight className="h-4 w-4" aria-hidden />
              </PreRegisterButton>
              <Link
                href="/pricing"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold text-zinc-200 transition-all duration-200 hover:border-white/20 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                See pricing
              </Link>
              <Link
                href="/features"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold text-zinc-200 transition-all duration-200 hover:border-white/20 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                All features
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
