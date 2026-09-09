export interface ShotSource {
  /** Path under /public, e.g. "/screenshots/dashboard.png" */
  src: string;
  width: number;
  height: number;
}

export interface Shot extends ShotSource {
  /** What is actually on screen. Not the product pitch. */
  alt: string;
  /** Short line under the image. */
  caption: string;
  /**
   * A tighter crop for phones. A 1600px-wide app window scaled to a 390px
   * screen is legible as "an app" and nothing more — no label, no number, no
   * chat line survives. This is the one region of that view worth showing
   * small, cropped so the app's own text lands near its original size.
   */
  mobile?: ShotSource;
}

/**
 * A real product capture, framed consistently.
 *
 * Uses <picture> rather than two toggled <img> elements so exactly one file is
 * fetched — a hidden <img> is still downloaded by most browsers, which would
 * put the full desktop screenshot on a phone connection for nothing.
 *
 * next/image cannot emit <picture>, and this export is `unoptimized`, so a
 * plain <img> loses nothing here. Space is reserved per breakpoint via
 * aspect-ratio custom properties, so neither layout shifts while loading.
 */
export function ProductShot({
  shot,
  caption = true,
  priority = false,
  sizes = '(max-width: 1024px) 100vw, 1024px',
  className = '',
  rounded = 'rounded-xl',
}: {
  shot: Shot;
  caption?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  rounded?: string;
}) {
  const m = shot.mobile;
  const style = {
    '--shot-ar': `${shot.width} / ${shot.height}`,
    '--shot-ar-m': m ? `${m.width} / ${m.height}` : `${shot.width} / ${shot.height}`,
  } as React.CSSProperties;

  return (
    <figure className={className}>
      <div
        style={style}
        className={`overflow-hidden border border-white/10 bg-white/[0.02] shadow-[0_0_70px_-25px_rgba(34,211,238,0.35)] [aspect-ratio:var(--shot-ar-m)] sm:[aspect-ratio:var(--shot-ar)] ${rounded}`}
      >
        <picture>
          {m ? <source media="(max-width: 639px)" srcSet={m.src} width={m.width} height={m.height} /> : null}
          <img
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            sizes={sizes}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : undefined}
            className="block h-full w-full object-cover object-top"
          />
        </picture>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-widest text-zinc-500">
          {shot.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
