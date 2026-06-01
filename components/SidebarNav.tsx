'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Docs section groups. Only routes that actually exist are linked, to avoid
// dead links — add entries here as new doc pages ship.
const DOC_SECTIONS = [
  {
    title: 'Features',
    links: [
      { label: 'Auto-Hype Director', href: '/docs/auto-hype' },
      { label: 'Performance & Footprint', href: '/docs/performance' },
    ],
  },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-5 space-y-6" aria-label="Docs">
      {DOC_SECTIONS.map((section) => (
        <div key={section.title}>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
            {section.title}
          </p>
          <ul className="mt-2 space-y-1 border-l border-white/10">
            {section.links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`-ml-px block border-l py-1.5 pl-4 text-sm transition-colors ${
                      isActive
                        ? 'border-cyan-400 bg-cyan-400/5 font-medium text-cyan-300'
                        : 'border-transparent text-zinc-400 hover:border-cyan-400 hover:text-zinc-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
