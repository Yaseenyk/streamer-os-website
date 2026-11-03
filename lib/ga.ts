// Google Analytics 4 events. window.gaEvent is defined by the tag in the root layout, which also
// adds first-touch source/medium/campaign to every event. Never throws: analytics must not break a submit.
declare global {
  interface Window {
    gaEvent?: (name: string, params?: Record<string, unknown>) => void;
  }
}

export function gaEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  try {
    window.gaEvent?.(name, params);
  } catch {
    /* ignore */
  }
}
