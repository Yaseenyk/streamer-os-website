'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { PostMeta } from '@/lib/posts';

type SortOrder = 'newest' | 'oldest';

// Curated category set — the pills map over this fixed list instead of every
// frontmatter tag, so the filter UI stays clean regardless of how posts are
// tagged. A post matches a category if its tags include it (case-insensitive).
const CATEGORIES = ['All', 'Engineering', 'Guides', 'Performance', 'Local AI', 'OBS Studio'];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function InteractiveBlogGrid({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [sort, setSort] = useState<SortOrder>('newest');

  // --- Dynamic scroll masks for the pill row ---
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollMasks = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 1);
    // -1 guards against sub-pixel rounding at the far right edge.
    setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollMasks();
    el.addEventListener('scroll', updateScrollMasks, { passive: true });
    // ResizeObserver catches viewport resizes, font loads, and content changes.
    const ro = new ResizeObserver(updateScrollMasks);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateScrollMasks);
      ro.disconnect();
    };
  }, [updateScrollMasks]);

  // Built in JS (not Tailwind arbitrary values) to dodge calc()/underscore
  // escaping pitfalls. `undefined` => no mask => fully opaque edge.
  const maskImage = useMemo(() => {
    const fadeStart = 'black calc(100% - 3rem)';
    const fadeEnd = 'black 3rem';
    if (canScrollLeft && canScrollRight)
      return `linear-gradient(to right, transparent, ${fadeEnd}, ${fadeStart}, transparent)`;
    if (canScrollRight)
      return `linear-gradient(to right, ${fadeStart}, transparent)`;
    if (canScrollLeft)
      return `linear-gradient(to right, transparent, ${fadeEnd})`;
    return undefined;
  }, [canScrollLeft, canScrollRight]);

  const visiblePosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const tag = activeTag.toLowerCase();
    return posts
      .filter(
        (p) => activeTag === 'All' || p.tags.some((t) => t.toLowerCase() === tag),
      )
      .filter(
        (p) =>
          q === '' ||
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      )
      .sort((a, b) =>
        sort === 'newest'
          ? b.date.localeCompare(a.date)
          : a.date.localeCompare(b.date),
      );
  }, [posts, query, activeTag, sort]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts…"
              aria-label="Search posts"
              className="w-full rounded-lg border border-white/10 bg-slate-950/40 py-2.5 pl-10 pr-4 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-colors focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOrder)}
            aria-label="Sort posts by date"
            className="rounded-lg border border-white/10 bg-slate-950/40 px-4 py-2.5 text-sm text-zinc-300 outline-none transition-colors focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* Category pills — parent carries the dynamic edge-fade mask; the inner
            flex row scrolls. The after: pseudo-element is a real flex item that
            forces physical scroll clearance past the last pill. */}
        <div style={{ maskImage, WebkitMaskImage: maskImage }}>
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden after:w-4 after:shrink-0 after:content-['']"
          >
            {CATEGORIES.map((tag) => {
              const active = tag === activeTag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full border px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors ${
                    active
                      ? 'border-cyan-400/50 bg-cyan-400/10 text-cyan-300'
                      : 'border-white/10 bg-slate-950/40 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-10">
        <motion.div layout className="grid gap-5 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visiblePosts.map((post) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full cursor-pointer rounded-xl border border-white/10 bg-slate-950/40 p-6 backdrop-blur-md transition-all duration-200 hover:scale-[1.01] hover:border-cyan-500/40 hover:bg-slate-950/60 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  <article className="flex h-full flex-col">
                    {post.tags.length > 0 && (
                      <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
                        {post.tags.join(' · ')}
                      </p>
                    )}
                    <h2 className="mt-3 text-xl font-semibold tracking-tight text-zinc-100 transition-colors group-hover:text-white">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      {post.description}
                    </p>
                    <p className="mt-auto pt-6 text-xs text-zinc-500">
                      By {post.author} · {formatDate(post.date)}
                    </p>
                  </article>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state — fades in once the grid empties out */}
        <AnimatePresence>
          {visiblePosts.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-white/10 bg-slate-950/40 p-12 text-center"
            >
              <p className="text-sm font-medium text-zinc-300">No posts found</p>
              <p className="mt-1 text-xs text-zinc-500">
                Try a different search term or category.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
