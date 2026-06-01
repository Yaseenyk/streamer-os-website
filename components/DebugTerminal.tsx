import { CircleAlert, TerminalSquare } from 'lucide-react';

export interface DebugCase {
  issue: string;
  steps: string[];
}

// Terminal-style troubleshooting block shared across the docs feature pages.
export function DebugTerminal({
  cases,
  title = 'cockpit — diagnostics',
}: {
  cases: DebugCase[];
  title?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#070a0f] font-mono text-sm shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3">
        <TerminalSquare className="h-4 w-4 text-cyan-400" aria-hidden />
        <span className="text-xs text-zinc-400">{title}</span>
      </div>
      <div className="space-y-6 p-5 sm:p-6">
        {cases.map((c) => (
          <div key={c.issue}>
            <p className="flex items-center gap-2 text-zinc-200">
              <CircleAlert className="h-4 w-4 shrink-0 text-red-400" aria-hidden />
              <span className="text-red-300">Issue:</span> {c.issue}
            </p>
            <div className="mt-2 space-y-1 pl-6">
              {c.steps.map((step) => (
                <p key={step} className="flex gap-2 text-zinc-400">
                  <span aria-hidden className="select-none text-emerald-400">
                    →
                  </span>
                  <span>{step}</span>
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
