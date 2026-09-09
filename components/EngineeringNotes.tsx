import { Reveal } from '@/components/Reveal';
import { BUILDER, type EngineeringNote } from '@/config/engineering';

/**
 * The working-out behind a claim this site makes, linked from the page that
 * makes it. A performance page that asserts 1.8% CPU and shows no method is
 * asking to be taken on faith; these are where the number came from.
 */
export function EngineeringNotes({
  notes,
  heading = 'How this was measured',
  intro,
}: {
  notes: EngineeringNote[];
  heading?: string;
  intro?: string;
}) {
  if (notes.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-6 pb-20 sm:pb-24">
      <Reveal>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{heading}</h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-4 max-w-prose leading-relaxed text-zinc-400">
          {intro ?? 'These are the engineering notes behind the numbers on this page, written up as the work happened by '}
          <a
            href={BUILDER.url}
            className="rounded text-cyan-400 underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            {BUILDER.name}
          </a>
          .
        </p>
      </Reveal>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {notes.map((note, i) => (
          <Reveal key={note.href} delay={i * 0.06} className="h-full">
            <a
              href={note.href}
              className="block h-full rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-cyan-400/40 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              <h3 className="text-base font-semibold tracking-tight text-zinc-100">{note.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{note.blurb}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
