import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AutoHypeSimulator from '@/components/AutoHypeSimulator';
import { DebugTerminal, type DebugCase } from '@/components/DebugTerminal';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  // Root layout applies the `%s · streamerOS` template.
  title: 'Auto-Hype Director',
  description:
    'How the Auto-Hype Director works — a guided, interactive walkthrough of ' +
    'streamerOS’s node-based scene-automation engine, plus troubleshooting steps.',
};

// --- Debug terminal ---------------------------------------------------------
const DEBUG_CASES: DebugCase[] = [
  {
    issue: "OBS isn't switching scenes",
    steps: [
      'Check the WebSocket v5 connection status in the bottom-left of the cockpit.',
      'Ensure port 4455 is open (OBS → Tools → WebSocket Server Settings).',
      'Confirm the scene names in your Action nodes match OBS exactly — they are case-sensitive.',
    ],
  },
  {
    issue: "Nodes aren't firing",
    steps: [
      'Verify your Twitch channel is actively synced in the Connection Drawer.',
      'Check that at least one Trigger node has a live data source bound to it.',
      'Open the Engine log and confirm telemetry (velocity / sentiment) is updating in real time.',
    ],
  },
];

// --- Page -------------------------------------------------------------------
export default function AutoHypeDocPage() {
  return (
    <article className="max-w-3xl">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
          Docs · Features
        </p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          The Auto-Hype Director
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          A visual, node-based engine that turns your stream’s live signals into
          automatic OBS scene cuts — so the broadcast reacts the instant the
          room does.
        </p>
      </Reveal>

      {/* Section 1 — What it does */}
      <section className="mt-16">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight">What it does</h2>
          <div className="mt-4 space-y-4 leading-relaxed text-zinc-400">
            <p>
              The Auto-Hype Director continuously reads two live signals from
              your chat — <strong className="text-zinc-200">velocity</strong>{' '}
              (how fast messages are arriving) and{' '}
              <strong className="text-zinc-200">sentiment</strong> (the emotional
              tone, from hype to silence). You wire those signals through logic
              gates into actions, and the engine fires them the moment your
              conditions are met.
            </p>
            <p>
              It’s edge-triggered: a rule fires once on the transition, never in
              a loop — so OBS gets a single clean scene cut, not a flood. Every
              evaluation happens locally, in memory, as part of the same Rust
              core that holds the 1.8% CPU budget.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Section 2 — Interactive walkthrough */}
      <section className="mt-16">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight">
            How it works — try it
          </h2>
          <p className="mt-4 leading-relaxed text-zinc-400">
            This is a live, simplified model of the engine. Use the{' '}
            <strong className="text-zinc-200">Control Panel</strong> on the left
            to inject signals, and watch the data packet travel down the node
            graph into a real scene switch on the right.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-400">
            <li className="flex gap-2">
              <span aria-hidden className="text-cyan-400">
                1.
              </span>
              Hit <span className="text-cyan-300">Spike Chat Velocity</span> —
              velocity and sentiment jump, and the engine cuts to the HYPE scene.
            </li>
            <li className="flex gap-2">
              <span aria-hidden className="text-purple-400">
                2.
              </span>
              Hit <span className="text-purple-300">Simulate Silence</span> —
              chat falls quiet and the engine drops you into Focus Mode.
            </li>
            <li className="flex gap-2">
              <span aria-hidden className="text-zinc-500">
                3.
              </span>
              Hit <span className="text-zinc-300">Reset</span> to return to a
              calm baseline.
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <AutoHypeSimulator />
        </Reveal>
      </section>

      {/* Section 3 — How to debug */}
      <section className="mt-16">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight">How to debug</h2>
          <p className="mt-4 leading-relaxed text-zinc-400">
            If a rule isn’t behaving, work top-down: confirm the connection,
            then the triggers, then the action. The two most common issues and
            their fixes:
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-6">
          <DebugTerminal cases={DEBUG_CASES} />
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mt-16 border-t border-white/5 pt-12">
        <Reveal>
          <h2 className="text-xl font-semibold tracking-tight">
            See the plays it powers.
          </h2>
          <p className="mt-3 text-zinc-400">
            The Playbook walks through real streaming scenarios the Auto-Hype
            Director handles automatically.
          </p>
          <Link
            href="/playbook"
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-cyan-400 transition-colors hover:text-cyan-300"
          >
            Read the Playbook
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
      </section>
    </article>
  );
}
