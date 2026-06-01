import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Signal Lost',
  description: 'The transmission you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      {/* Cyberpunk scanline / glow backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(34,211,238,0.12),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:100%_4px]"
      />

      <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400/80">
        Error 404
      </p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white sm:text-7xl">
        404 — Signal Lost.
      </h1>
      <p className="mt-5 max-w-md text-lg text-zinc-400">
        The transmission you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="mt-10 inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-cyan-400/60 hover:bg-cyan-400/[0.08] hover:text-cyan-200"
      >
        Re-establish connection
      </Link>
    </main>
  );
}
