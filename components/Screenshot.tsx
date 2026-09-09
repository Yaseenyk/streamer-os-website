import { existsSync } from 'node:fs';
import path from 'node:path';
import Image from 'next/image';

/**
 * A product screenshot that appears the moment the file exists.
 *
 * The site sells a visual desktop app and shows none of it, which is the
 * single biggest conversion gap on it. Rather than commit placeholder art or
 * broken <img> tags, this checks for the file at build time and renders
 * nothing until it is there. Drop a PNG into public/screenshots/, rebuild,
 * and the section appears — no code change.
 *
 * Server component: it reads the filesystem, so it must not be imported into
 * anything marked 'use client'.
 */
export function Screenshot({
  src,
  alt,
  caption,
  priority = false,
  width = 1600,
  height = 900,
}: {
  /** Path under /public, e.g. "/screenshots/dashboard.png" */
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  if (!existsSync(path.join(process.cwd(), 'public', src))) return null;

  return (
    <figure className="mx-auto mt-12 w-full max-w-5xl px-6">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_0_60px_-15px_rgba(34,211,238,0.25)]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="h-auto w-full"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center font-mono text-xs uppercase tracking-widest text-zinc-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
