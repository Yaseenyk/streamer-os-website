import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PerformanceSimulator from '@/components/PerformanceSimulator';
import { DebugTerminal, type DebugCase } from '@/components/DebugTerminal';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  // Root layout applies the `%s · streamerOS` template.
  title: 'Performance & Footprint',
  description:
    'Why streamerOS holds a 1.8% CPU footprint — the Tauri/Rust architecture, ' +
    'an interactive Electron comparison, and CPU-usage troubleshooting.',
};

const DEBUG_CASES: DebugCase[] = [
  {
    issue: 'streamerOS is using more than 2% CPU.',
    steps: [
      "Ensure 'Hardware Acceleration' is enabled in your OS settings.",
      'Check if you have excessive third-party plugins loaded into the OBS WebSocket.',
    ],
  },
];

export default function PerformanceDocPage() {
  return (
    <article className="max-w-3xl">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
          Docs · Features
        </p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          The ultra-lightweight footprint
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          streamerOS holds a 1.8% CPU budget under a live game. That’s not
          tuning — it’s the architecture. Here’s why, and how to keep it there.
        </p>
      </Reveal>

      {/* Section 1 — What it does */}
      <section className="mt-16">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight">What it does</h2>
          <div className="mt-4 space-y-4 leading-relaxed text-zinc-400">
            <p>
              Most desktop streaming tools are built on{' '}
              <strong className="text-zinc-200">Electron</strong> — which ships
              an entire Chromium browser and a Node.js runtime with every app.
              Those background processes idle at hundreds of megabytes of RAM
              and a steady slice of CPU before you’ve done anything at all.
            </p>
            <p>
              streamerOS is built on{' '}
              <strong className="text-zinc-200">Tauri</strong>. We dropped the
              heavy Chromium and Node.js processes entirely, in favour of a
              compiled <strong className="text-zinc-200">Rust core</strong> and
              the operating system’s own{' '}
              <strong className="text-zinc-200">native webview</strong> for the
              interface. The result is a binary that starts in seconds, sits at
              a fraction of the memory, and yields its spare cycles back to your
              game.
            </p>
            <p>
              Less abstraction between the app and the metal means the heavy
              lifting — telemetry, sentiment, scene logic — runs in native code,
              not a sandboxed browser tab.
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
            Below are two resource monitors side by side: streamerOS on its Rust
            core, and a typical Electron app. Hit{' '}
            <strong className="text-zinc-200">Simulate Game Launch</strong> and
            watch the architectural difference under load — the Electron runtime
            spikes into the red, while streamerOS barely moves.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <PerformanceSimulator />
        </Reveal>
      </section>

      {/* Section 3 — How to debug */}
      <section className="mt-16">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight">How to debug</h2>
          <p className="mt-4 leading-relaxed text-zinc-400">
            If your footprint creeps above the 1.8% budget, the cause is almost
            always the environment around streamerOS rather than the core itself:
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
            Feel it on your own machine.
          </h2>
          <p className="mt-3 text-zinc-400">
            Numbers are one thing. Download v1.0-GA and watch Task Manager stay
            quiet while you play.
          </p>
          <Link
            href="/download"
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-cyan-400 transition-colors hover:text-cyan-300"
          >
            Download v1.0-GA
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
      </section>
    </article>
  );
}
