import { existsSync } from 'node:fs';
import path from 'node:path';
import { ProductShot, type Shot } from '@/components/ProductShot';

export type { Shot };

/**
 * A run of real product captures.
 *
 * The site sells a visual desktop app, so each feature page carries several
 * shots of that feature rather than one. Files are checked at build time and
 * missing ones are skipped, so a strip degrades to whatever exists instead of
 * rendering broken images — the whole section disappears if none are present.
 *
 * Server component: it reads the filesystem, so it must not be imported into
 * anything marked 'use client'.
 */
export function ScreenshotStrip({
  heading,
  blurb,
  shots,
}: {
  heading: string;
  blurb?: string;
  shots: Shot[];
}) {
  const present = shots.filter((s) => existsSync(path.join(process.cwd(), 'public', s.src)));
  if (present.length === 0) return null;

  const [lead, ...others] = present;

  // These captures range from a tall chat column to a wide chart strip, and an
  // image cannot be split across columns. CSS `columns` balances heuristically
  // and repeatedly left one side hundreds of pixels short, so the split is
  // computed here instead.
  //
  // Every item renders at the same width, so its height is `aspectRatio` plus a
  // fixed cost for the caption and the gap beneath it — that constant matters,
  // because a column of several short shots is much taller than their aspect
  // ratios alone suggest. With a handful of items an exhaustive search is
  // cheap and gives the provably closest split, where greedy does not.
  const CAPTION_AND_GAP = 0.14; // as a fraction of the column width
  const cost = (shot: Shot) => shot.height / shot.width + CAPTION_AND_GAP;

  const columns = ((): Shot[][] => {
    if (others.length < 2) return [others, []];
    const total = others.reduce((sum, shot) => sum + cost(shot), 0);
    let bestMask = 1;
    let bestDiff = Infinity;
    for (let mask = 1; mask < (1 << others.length) - 1; mask += 1) {
      let left = 0;
      for (let i = 0; i < others.length; i += 1) if (mask & (1 << i)) left += cost(others[i]);
      const diff = Math.abs(total - 2 * left);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestMask = mask;
      }
    }
    const left: Shot[] = [];
    const right: Shot[] = [];
    others.forEach((shot, i) => ((bestMask & (1 << i)) ? left : right).push(shot));
    return [left, right];
  })();

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
          The actual app
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h2>
        {blurb ? <p className="mt-4 text-zinc-400">{blurb}</p> : null}
      </div>

      <ProductShot
        shot={lead}
        className="mt-12"
        sizes="(max-width: 1024px) 100vw, 1024px"
        rounded="rounded-2xl"
      />

      {others.length > 0 && (
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {columns.map((column, i) => (
            <div key={i} className="flex flex-col gap-8">
              {column.map((shot) => (
                <ProductShot key={shot.src} shot={shot} sizes="(max-width: 640px) 100vw, 480px" />
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
