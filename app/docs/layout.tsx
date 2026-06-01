import type { ReactNode } from 'react';
import SidebarNav from '@/components/SidebarNav';

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 lg:flex-row lg:gap-12 lg:py-20">
      {/* Sidebar */}
      <aside className="lg:w-56 lg:shrink-0">
        <div className="lg:sticky lg:top-24">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            Documentation
          </p>
          <SidebarNav />
        </div>
      </aside>

      {/* Content */}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
