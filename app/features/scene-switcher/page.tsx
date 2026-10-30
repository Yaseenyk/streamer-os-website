import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, Minus, X } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';
import FeatureFaq from '@/components/FeatureFaq';
import JsonLd from '@/components/JsonLd';
import { ScreenshotStrip } from '@/components/ScreenshotStrip';
import { Screenshot } from '@/components/Screenshot';
import { SHOTS } from '@/lib/shots';
import { breadcrumbJsonLd, type FaqEntry } from '@/lib/seo';
import { SITE_URL } from '@/config/site';

// This page answers "obs scene switcher" and "obs automatic scene switcher" —
// searchers who want OBS to change scenes for them. It is not a new product
// feature: it is the OBS Bridge (manual switching) and the Auto-Hype Director
// (automatic switching) described from the searcher's side, with the honest
// comparison against the free plugin most of them will also be looking at.
// Every product claim here is in docs/knowledge-base.md.
export const metadata: Metadata = {
  title: { absolute: 'OBS Automatic Scene Switcher That Watches Your Chat — streamerOS' },
  description:
    'An OBS scene switcher that switches on chat velocity and Super Chats, over OBS WebSocket v5 with no plugin. How it compares with Advanced Scene Switcher, and when the free plugin is the better pick.',
  alternates: { canonical: `${SITE_URL}/features/scene-switcher` },
};

const FAQ_ITEMS: FaqEntry[] = [
  {
    q: 'Does OBS have a built-in automatic scene switcher?',
    a: 'Yes. OBS Studio ships an Automatic Scene Switcher under the Tools menu that switches scenes when a named window has focus. For anything beyond window focus — a process starting, audio, timers, Twitch events — the free Advanced Scene Switcher plugin covers it. Neither measures how fast your chat is moving, which is what streamerOS adds.',
  },
  {
    q: 'What does the streamerOS scene switcher react to?',
    a: 'Chat velocity (messages per second compared with a threshold you set) and Super Chat amounts, combined with AND/OR logic in the Auto-Hype Director. When a rule becomes true it switches the OBS scene once, rather than firing on every tick while chat stays busy. It does not watch processes, windows or audio — the free tools do that well already.',
  },
  {
    q: 'Does it need an OBS plugin?',
    a: 'No. streamerOS connects to OBS Studio over OBS WebSocket v5, which is built into OBS 28 and later, on the same PC at 127.0.0.1. There is nothing to install inside OBS and nothing to reinstall after an OBS update.',
  },
  {
    q: 'Can I use it alongside Advanced Scene Switcher?',
    a: 'Yes, and that is the sensible setup: keep the plugin for machine-side rules such as “game launches → Gameplay”, and let streamerOS handle the chat-driven switch. Make sure only one tool owns each scene change, or they will undo each other.',
  },
  {
    q: 'Does it work with YouTube Live as well as Twitch?',
    a: 'Yes. Twitch chat is read over an anonymous, read-only connection; YouTube chat is read from the YouTube page open in your own browser, so there is no API key and no Google sign-in. streamerOS reads chat and never posts to it.',
  },
  {
    q: 'What does it cost, and what is the catch?',
    a: 'A free 7-day trial with every feature, then $29 once; pre-registering before the February 2027 launch extends the trial to three months. The honest limits: it is Windows 10/11 only, it needs OBS Studio 28 or later, and chat-driven switching only helps if your chat is active enough to have a baseline.',
  },
];

type Verdict = 'yes' | 'no' | 'partial';

interface Row {
  label: string;
  streameros: { verdict: Verdict; note: string };
  plugin: { verdict: Verdict; note: string };
}

// Plugin facts are from its OBS forum resource page and GitHub README, checked
// 2026-10-23 for the Advanced Scene Switcher guide; streamerOS facts from the
// knowledge base. Structural facts only, so the table stays true over time.
const ROWS: Row[] = [
  {
    label: 'Price',
    streameros: { verdict: 'partial', note: '$29 once after a free trial' },
    plugin: { verdict: 'yes', note: 'Free and open source' },
  },
  {
    label: 'Where it runs',
    streameros: { verdict: 'yes', note: 'A separate app, over OBS WebSocket v5' },
    plugin: { verdict: 'yes', note: 'Inside OBS, as a plugin' },
  },
  {
    label: 'Process and window triggers',
    streameros: { verdict: 'no', note: 'Not a trigger type' },
    plugin: { verdict: 'yes', note: 'Process, Window, Idle and more' },
  },
  {
    label: 'Audio, media, timer and hotkey triggers',
    streameros: { verdict: 'no', note: 'Not trigger types' },
    plugin: { verdict: 'yes', note: 'All available as macro conditions' },
  },
  {
    label: 'Switch on how fast chat is moving',
    streameros: { verdict: 'yes', note: 'Chat velocity against your threshold' },
    plugin: { verdict: 'no', note: 'Reacts to single messages and events' },
  },
  {
    label: 'Switch on a Super Chat amount',
    streameros: { verdict: 'yes', note: 'Threshold you set, YouTube Live' },
    plugin: { verdict: 'no', note: 'Twitch condition covers Twitch events' },
  },
  {
    label: 'Survives an OBS update',
    streameros: { verdict: 'yes', note: 'No plugin to rebuild' },
    plugin: { verdict: 'partial', note: 'Needs the build for your OBS version' },
  },
  {
    label: 'Operating systems',
    streameros: { verdict: 'partial', note: 'Windows 10/11 only' },
    plugin: { verdict: 'yes', note: 'Windows, macOS, Linux' },
  },
  {
    label: 'Manual scene deck and live-scene sync',
    streameros: { verdict: 'yes', note: 'OBS Bridge deck and cockpit switcher' },
    plugin: { verdict: 'partial', note: 'Hotkey conditions; OBS has its own scene list' },
  },
];

const VERDICT_ICON = {
  yes: <Check className="h-4 w-4 shrink-0 text-cyan-400" strokeWidth={2.5} aria-label="Yes" />,
  no: <X className="h-4 w-4 shrink-0 text-zinc-600" strokeWidth={2.5} aria-label="No" />,
  partial: <Minus className="h-4 w-4 shrink-0 text-amber-400/80" strokeWidth={2.5} aria-label="Partly" />,
};

function Cell({ verdict, note, accent }: { verdict: Verdict; note: string; accent?: boolean }) {
  return (
    <td className={`border-b border-white/5 px-4 py-3.5 align-top ${accent ? 'bg-cyan-400/[0.03]' : ''}`}>
      <div className="flex items-start gap-2.5">
        {VERDICT_ICON[verdict]}
        <span className={`text-sm ${accent ? 'text-zinc-200' : 'text-zinc-400'}`}>{note}</span>
      </div>
    </td>
  );
}

const STEPS = [
  {
    title: 'Connect OBS once',
    body:
      'Turn on the WebSocket server in OBS (Tools → WebSocket Server Settings). streamerOS finds OBS on the same PC and syncs your scenes into a deck. If you set a password, paste it into the OBS Bridge form.',
  },
  {
    title: 'Pick what should trigger the switch',
    body:
      'In the Auto-Hype Director, add a chat-velocity trigger (messages per second above a number you choose) or a Super Chat trigger (amount above a number you choose). Combine two with AND or OR if you want both.',
  },
  {
    title: 'Pick the scene, and the way back',
    body:
      'Wire the trigger to a Switch Scene action. A rule fires once when its condition becomes true, so OBS is not hammered while chat stays hot. Add the inverse rule, or keep a hotkey, so the stream always has a route home.',
  },
];

export default function SceneSwitcherPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Features', path: '/features' },
          { name: 'OBS Scene Switcher', path: '/features/scene-switcher' },
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
              An OBS automatic scene switcher that watches your chat
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              OBS can already switch scenes when a window gains focus, and the free
              Advanced Scene Switcher plugin covers processes, audio and timers.
              streamerOS adds the trigger neither has: how fast your chat is moving.
              It switches scenes over OBS WebSocket v5, with no plugin.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The short answer */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Which OBS scene switcher do you actually need?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-6 space-y-4 text-zinc-400">
              <p className="leading-relaxed">
                <strong className="text-zinc-200">Window focus only:</strong> use the
                Automatic Scene Switcher already in OBS, under Tools. Free, installed,
                enough for “browser in front → hide the game capture”.
              </p>
              <p className="leading-relaxed">
                <strong className="text-zinc-200">Process, audio, timer, idle, Twitch
                events:</strong> install the free{' '}
                <Link href="/blog/obs-advanced-scene-switcher-guide" className="text-cyan-400 underline underline-offset-2">
                  Advanced Scene Switcher
                </Link>{' '}
                plugin. It is the right tool for machine-side rules and it costs nothing.
              </p>
              <p className="leading-relaxed">
                <strong className="text-zinc-200">Chat getting busy, or a Super Chat
                landing:</strong> that needs something that measures chat and talks to
                OBS. That is what streamerOS does, and the rest of this page is about
                that one job. Rules for all three are in{' '}
                <Link href="/blog/auto-switch-obs-scenes-guide" className="text-cyan-400 underline underline-offset-2">
                  how to auto-switch OBS scenes
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Three steps, no scripting.
            </h2>
            <p className="mt-3 text-zinc-400">
              The manual side is the OBS Bridge: your scenes as a deck, with the live
              scene highlighted even when you change it inside OBS. The automatic side
              is the Auto-Hype Director, a node editor of triggers, logic and actions.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-zinc-100">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Screenshot
        src="/screenshots/auto-director.webp"
        alt="The Auto-Hype Director node canvas with a chat velocity trigger wired through an AND gate into an OBS scene switch action"
        caption="A chat-velocity trigger wired to a scene switch"
      />

      {/* Comparison with the plugin */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              streamerOS vs the OBS Advanced Scene Switcher plugin
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-400">
              Most people searching for an OBS scene switcher will find the plugin
              first, and for machine-side rules it is the better choice. This table
              is where each one is strong, including the rows where streamerOS loses.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border-b border-white/15 px-4 py-3 text-left font-medium text-zinc-500" />
                    <th className="border-b border-cyan-400/40 bg-cyan-400/[0.06] px-4 py-3 text-left font-semibold text-cyan-300">
                      streamerOS
                    </th>
                    <th className="border-b border-white/15 px-4 py-3 text-left font-semibold text-zinc-300">
                      Advanced Scene Switcher
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.label}>
                      <th
                        scope="row"
                        className="border-b border-white/5 px-4 py-3.5 text-left align-top font-medium text-zinc-300"
                      >
                        {row.label}
                      </th>
                      <Cell verdict={row.streameros.verdict} note={row.streameros.note} accent />
                      <Cell verdict={row.plugin.verdict} note={row.plugin.note} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 text-sm leading-relaxed text-zinc-400">
              The two are not rivals for the same job. Advanced Scene Switcher reacts to
              events — a process starting, a key press, a single chat message, a new
              subscriber. It has no measure of how fast chat is moving compared with
              your normal pace, so “chat just exploded” is not a condition you can set
              without counting messages yourself. streamerOS measures exactly that, and
              only that, and runs beside the plugin rather than instead of it. The full
              plugin walkthrough, with macro recipes and fixes for when it does not
              switch, is in the{' '}
              <Link href="/blog/obs-advanced-scene-switcher-guide" className="text-cyan-400 underline underline-offset-2">
                Advanced Scene Switcher guide
              </Link>
              .
            </p>
            <p className="mt-3 text-xs text-zinc-500">
              Plugin rows reflect its forum resource page as read on 23 October 2026 and
              may change with new releases. streamerOS rows describe v1.0, launching
              February 2027.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What it does not do */}
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What this scene switcher does not do
            </h2>
            <p className="mt-3 text-zinc-400">
              Stated before the sign-up button, so nobody pays to find out.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-4">
              {[
                'It does not switch on a game launching, a window gaining focus, audio levels or a timer. Use OBS’s own switcher or the free plugin for those.',
                'It does not post to chat, run commands or moderate. It reads chat only.',
                'It is Windows 10/11 only and needs OBS Studio 28 or later with the WebSocket server enabled.',
                'It is $29 once after a 7-day trial. If two machine-side rules are all you need, the free tools are the right answer and this page has told you so.',
              ].map((text) => (
                <li key={text} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" strokeWidth={2.5} aria-hidden />
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <FeatureFaq items={FAQ_ITEMS} />

      <ScreenshotStrip
        heading="The manual side and the automatic side."
        blurb="The OBS Bridge deck, the cockpit scene switcher and the Auto-Hype Director, captured from the running app."
        shots={[SHOTS.obsBridge, SHOTS.sceneSwitcher, SHOTS.streamDeck, SHOTS.autoDirector, SHOTS.velocityStats]}
      />

      <section className="mx-auto max-w-3xl px-6 pb-4">
        <h2 className="text-xl font-semibold tracking-tight">Related guides</h2>
        <ul className="mt-4 space-y-2 text-zinc-400">
          <li>
            <Link href="/blog/auto-switch-obs-scenes-guide" className="text-cyan-400 underline underline-offset-2">
              How to auto-switch OBS scenes, including from chat activity
            </Link>
          </li>
          <li>
            <Link href="/blog/obs-advanced-scene-switcher-guide" className="text-cyan-400 underline underline-offset-2">
              OBS Advanced Scene Switcher: setup guide and macro recipes
            </Link>
          </li>
          <li>
            <Link href="/blog/obs-websocket-setup-guide" className="text-cyan-400 underline underline-offset-2">
              OBS WebSocket setup guide
            </Link>
          </li>
          <li>
            <Link href="/features/obs-bridge" className="text-cyan-400 underline underline-offset-2">
              OBS Bridge
            </Link>
            {' · '}
            <Link href="/features/auto-hype" className="text-cyan-400 underline underline-offset-2">
              Auto-Hype Director
            </Link>
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Let chat call the scene.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Free for 7 days with every feature, then $29 once. Pre-register before the
              February 2027 launch and the trial runs three months.
            </p>
            <LaunchBadge className="mt-8" />
            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PreRegisterButton className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#05070A] transition hover:bg-cyan-300">
                Get the beta
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
