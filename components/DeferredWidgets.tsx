'use client';

import { useEffect, useState, type ComponentType } from 'react';

type WidgetsProps = { isOpen: boolean; onClose: () => void };

/**
 * One deferred step for everything that is not needed to paint or read the page:
 * the pre-registration dialog and the support chat button. They share a single
 * chunk (components/Widgets.tsx), requested once, at the first of: a user
 * interaction, the browser going idle after load (3 s cap), or the dialog being
 * opened. Until then a CSS-only placeholder holds the chat button's spot, so
 * nothing shifts when it arrives.
 */
export default function DeferredWidgets({ isOpen, onClose }: WidgetsProps) {
  const [Widgets, setWidgets] = useState<ComponentType<WidgetsProps> | null>(null);
  const [wanted, setWanted] = useState(false);

  useEffect(() => {
    if (wanted) return;
    const start = () => setWanted(true);
    const events = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const;
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));

    let idleId: number | undefined;
    let timerId: number | undefined;
    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(start, { timeout: 3000 });
      } else {
        timerId = window.setTimeout(start, 3000);
      }
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      events.forEach((e) => window.removeEventListener(e, start));
      window.removeEventListener('load', schedule);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, [wanted]);

  const load = wanted || isOpen;
  useEffect(() => {
    if (!load || Widgets) return;
    let alive = true;
    import('@/components/Widgets').then((m) => {
      if (alive) setWidgets(() => m.default);
    });
    return () => {
      alive = false;
    };
  }, [load, Widgets]);

  if (Widgets) return <Widgets isOpen={isOpen} onClose={onClose} />;

  return (
    <div
      aria-hidden
      className="sos-skeleton pointer-events-none fixed bottom-6 right-6 z-[100] h-14 w-14 rounded-full bg-cyan-400/25"
    />
  );
}
