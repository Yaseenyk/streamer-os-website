'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import type { PostMeta } from '@/lib/posts';

type SortOrder = 'newest' | 'oldest';

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

  // Unique tags across all posts, alphabetised, with "All" pinned first.
  const tags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [posts]);

  const visiblePosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts
      .filter((p) => activeTag === 'All' || p.tags.includes(activeTag))
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

        {/* Category pills — horizontally scrollable, hidden scrollbar */}
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tags.map((tag) => {
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

      {/* Results */}
      {visiblePosts.length > 0 ? (
        <section className="mt-10 grid gap-5 sm:grid-cols-2">
          {visiblePosts.map((post) => (
            <Link
              key={post.slug}
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
          ))}
        </section>
      ) : (
        <div className="mt-10 rounded-xl border border-white/10 bg-slate-950/40 p-12 text-center">
          <p className="text-sm font-medium text-zinc-300">No posts found</p>
          <p className="mt-1 text-xs text-zinc-500">
            Try a different search term or category.
          </p>
        </div>
      )}
    </div>
  );
}
