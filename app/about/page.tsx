import type { Metadata } from 'next';
import { Gauge, ShieldCheck, Workflow, type LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Why we built streamerOS — a Rust-powered, local-first streaming cockpit born ' +
    'out of frustration with bloated tools, dropped frames, and missed hype moments.',
  alternates: { canonical: 'https://streamerosai.com/about' },
};

interface Value {
  icon: LucideIcon;
  title: string;
  body: string;
}

const VALUES: Value[] = [
  {
    icon: Gauge,
    title: 'Performance First',
    body: 'A Rust core, profiled against a live game until it disappeared into the background. 1.8% CPU is a promise, not a peak.',
  },
  {
    icon: ShieldCheck,
    title: 'Absolute Privacy',
    body: 'Local-first isn’t a setting — it’s the architecture. No server, ours or anyone else’s, ever sees your chat or your audio.',
  },
  {
    icon: Workflow,
    title: 'Unleashed Automation',
    body: 'The Auto-Hype Director reads the room so you don’t have to. Your scenes follow your stream’s energy, automatically.',
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
      {/* Hero */}
      <section>
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
            Our story
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Built by Streamers. Engineered for Performance.
          </h1>
        </Reveal>
      </section>

      {/* The Origin Story — narrow, prose-heavy reading column */}
      <section className="mt-14 sm:mt-16">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            The Origin Story
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-6 max-w-prose space-y-4 leading-relaxed text-slate-300">
            <p>
              streamerOS started as a complaint. We were streamers before we were
              builders — and every night, the same two problems. Our “lightweight”
              broadcast tools quietly ate CPU until a clutch moment turned into a
              stutter. And the best beats of the stream — the raid, the comeback,
              the chat going feral — slipped past while we fumbled for a scene hotkey.
            </p>
            <p>
              So we built the tool we wanted. A Rust core, measured obsessively, that
              holds a 1.8% CPU footprint under a live game. An automation engine — the
              Auto-Hype Director — that watches chat velocity and sentiment and
              switches scenes the instant the room peaks. And an architecture that is
              local-first by construction: your chat, your audio, your audience never
              leave your machine.
            </p>
            <p>
              streamerOS is open-source and free, because the people who go live every
              night deserve tools built with the same care they put into their
              broadcast — and because the surest way to earn a streamer’s trust is to
              let them read every line.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Core values */}
      <section className="mt-16 sm:mt-20">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Core values
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {VALUES.map((value, i) => {
            const { icon: Icon, title, body } = value;
            return (
              <Reveal key={title} delay={i * 0.08} className="h-full">
                <article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-400/40 hover:bg-white/[0.06]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-cyan-400">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-zinc-100">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
