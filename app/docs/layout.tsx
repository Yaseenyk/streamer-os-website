'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { nav } from './_nav';

// usePathname() returns the path without basePath, matching the hrefs in _nav;
// next/link re-applies basePath on the rendered anchors automatically.
export default function DocsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex max-w-6xl gap-10 px-6 py-12 md:py-16">
      <aside className="hidden w-56 shrink-0 md:block">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Documentation
        </p>
        <nav className="flex flex-col gap-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? 'bg-cyan-400/10 font-medium text-cyan-300'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
      </aside>

      <article className="prose prose-invert max-w-none flex-1 prose-headings:scroll-mt-24 prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-code:text-cyan-300">
        {children}
      </article>
    </div>
  );
}
