import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  ClipboardList,
  DollarSign,
  Handshake,
  Kanban,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { PreRegisterButton, LaunchBadge } from '@/components/PreRegisterModal';

export const metadata: Metadata = {
  // Root layout applies the `%s · streamerOS` template.
  title: 'Sponsor CRM — Feature Guide',
  description:
    'A lead pipeline built for creators — track every sponsor conversation ' +
    'from first DM to signed deal, stored locally on your own machine.',
  alternates: { canonical: 'https://streamerosai.com/features/sponsor-crm' },
};

// ---------------------------------------------------------------------------
// Static pipeline "chips" — these only LOOK like the desktop CRM's lead cards.
// The real, interactive board lives in the streamerOS desktop app; this site
// just explains it. Tints map to the app's stage palette: new=cyan,
// contacted=purple, negotiating=amber, won=emerald.
// ---------------------------------------------------------------------------
type StageTone = 'new' | 'contacted' | 'negotiating' | 'won';

const STAGE_TONE: Record<StageTone, { ring: string; icon: string; dot: string }> = {
  new: {
    ring: 'border-cyan-400/40 bg-cyan-400/[0.06]',
    icon: 'text-cyan-300',
    dot: 'bg-cyan-400',
  },
  contacted: {
    ring: 'border-purple-400/40 bg-purple-400/[0.06]',
    icon: 'text-purple-300',
    dot: 'bg-purple-400',
  },
  negotiating: {
    ring: 'border-amber-400/40 bg-amber-400/[0.06]',
    icon: 'text-amber-300',
    dot: 'bg-amber-400',
  },
  won: {
    ring: 'border-emerald-400/40 bg-emerald-400/[0.06]',
    icon: 'text-emerald-300',
    dot: 'bg-emerald-400',
  },
};

function LeadCard({
  tone,
  brand,
  contact,
  value,
}: {
  tone: StageTone;
  brand: string;
  contact: string;
  value: string;
}) {
  const t = STAGE_TONE[tone];
  return (
    <div className={`w-full rounded-xl border ${t.ring} p-3 backdrop-blur-sm`}>
      <div className="flex items-center gap-3">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 ${t.icon}`}>
          <Building2 className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-zinc-100">{brand}</p>
          <p className="truncate text-xs text-zinc-500">{contact}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5 border-t border-white/5 pt-2">
        <DollarSign className={`h-3.5 w-3.5 ${t.icon}`} strokeWidth={1.75} aria-hidden />
        <span className="text-xs font-medium text-zinc-300">{value}</span>
      </div>
    </div>
  );
}

/** A single labelled control row inside the faux "Add lead" / inspector panel. */
function FieldRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
      <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">{label}</span>
      <span className={`text-sm font-medium ${accent ? 'text-cyan-300' : 'text-zinc-200'}`}>
        {value}
      </span>
    </div>
  );
}

/** Faux form / inspector panel — mirrors the desktop app's lead editor. */
function FormPanel({ icon: Icon, title, rows }: { icon: LucideIcon; title: string; rows: ReactNode }) {
  return (
    <div className="w-full max-w-xs rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <Icon className="h-4 w-4 text-zinc-400" strokeWidth={1.75} aria-hidden />
        <span className="text-xs font-semibold text-zinc-300">{title}</span>
      </div>
      <div className="mt-3 space-y-2">{rows}</div>
    </div>
  );
}

/** A single kanban column holding one or more lead cards. */
function PipelineColumn({
  tone,
  label,
  children,
}: {
  tone: StageTone;
  label: string;
  children: ReactNode;
}) {
  const t = STAGE_TONE[tone];
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <div className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} aria-hidden />
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step scaffold — a vertical timeline. Each step pairs an explanation with a
// static mock of the CRM view it describes.
// ---------------------------------------------------------------------------
interface StepProps {
  index: number;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  last?: boolean;
  mock: ReactNode;
}

function Step({ index, icon: Icon, eyebrow, title, body, last, mock }: StepProps) {
  return (
    <Reveal className="relative grid gap-8 pb-16 last:pb-0 lg:grid-cols-2 lg:gap-12">
      {/* Timeline rail + marker (left column, large screens) */}
      <div className="flex gap-5">
        <div className="relative flex flex-col items-center">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#05070A] text-cyan-300">
            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </span>
          {!last && (
            <span aria-hidden className="mt-2 w-px flex-1 bg-gradient-to-b from-white/15 to-transparent" />
          )}
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
            Step {index} · {eyebrow}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
          <p className="mt-3 leading-relaxed text-zinc-400">{body}</p>
        </div>
      </div>

      {/* The faux CRM view for this step */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">{mock}</div>
    </Reveal>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function SponsorCrmGuidePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px] opacity-50" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">
              Feature Guide
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Turn DMs into deals.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              A creator-first CRM that tracks every sponsor from first message to
              signed contract — all on your machine. Leads move across a pipeline
              board, and every detail lives in a lead inspector, persisted locally
              in SQLite with no cloud.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Walkthrough */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            From first DM to signed deal in three steps.
          </h2>
          <p className="mt-4 text-zinc-400">
            Capture &rarr; Pipeline &rarr; Inspector. Stop letting sponsor leads
            die in a messy inbox and a forgotten spreadsheet.
          </p>
        </Reveal>

        <div className="mt-16">
          {/* Step 1 — Capture the lead */}
          <Step
            index={1}
            icon={Handshake}
            eyebrow="Capture the lead"
            title="Add the sponsor the moment they DM you."
            body="When the first sponsor DM lands, open Sponsor CRM and add it as a lead. Fill in the brand, your contact, an estimated deal value, and where it came from — the lead is saved straight to SQLite on your own machine."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <ClipboardList className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                  Add lead
                </p>
                <FormPanel
                  icon={ClipboardList}
                  title="New Lead"
                  rows={
                    <>
                      <FieldRow label="Brand" value="Nova Energy" />
                      <FieldRow label="Contact" value="@nova_deals" />
                      <FieldRow label="Est. value" value="$4,500" accent />
                      <FieldRow label="Source" value="Instagram DM" />
                    </>
                  }
                />
              </div>
            }
          />

          {/* Step 2 — Move it across the pipeline */}
          <Step
            index={2}
            icon={Kanban}
            eyebrow="Move it across the pipeline"
            title="Drag the lead through your pipeline stages."
            body="The pipeline board lays every deal out as a card. Drag a lead from New to Contacted to Negotiating and finally to Won as the conversation progresses — one glance tells you exactly where every sponsor stands."
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Kanban className="h-3.5 w-3.5 text-purple-300" aria-hidden />
                  Pipeline board
                </p>
                <div className="flex gap-3 overflow-x-auto">
                  <PipelineColumn tone="new" label="New">
                    <LeadCard tone="new" brand="Aero Labs" contact="@aero" value="$1,200" />
                  </PipelineColumn>
                  <PipelineColumn tone="contacted" label="Contacted">
                    <LeadCard tone="contacted" brand="Nova Energy" contact="@nova_deals" value="$4,500" />
                  </PipelineColumn>
                  <PipelineColumn tone="negotiating" label="Negotiating">
                    <LeadCard tone="negotiating" brand="Peak Gear" contact="@peakgear" value="$8,000" />
                  </PipelineColumn>
                  <PipelineColumn tone="won" label="Won">
                    <LeadCard tone="won" brand="Flux Audio" contact="@fluxhq" value="$6,750" />
                  </PipelineColumn>
                </div>
              </div>
            }
          />

          {/* Step 3 — Track every detail in the inspector */}
          <Step
            index={3}
            icon={Users}
            eyebrow="Track every detail"
            title="Open a lead to see and edit the full deal."
            body="Click any card to open the lead inspector. Read or update the brand, value, current stage, and free-form notes on the conversation — every edit writes back to your local database, so the whole deal history stays on your machine."
            last
            mock={
              <div className="space-y-4">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  <Users className="h-3.5 w-3.5 text-emerald-300" aria-hidden />
                  Lead inspector
                </p>
                <FormPanel
                  icon={Building2}
                  title="Nova Energy"
                  rows={
                    <>
                      <FieldRow label="Value" value="$4,500" accent />
                      <FieldRow label="Stage" value="Negotiating" />
                      <FieldRow label="Notes" value="Wants 2 posts + story" />
                    </>
                  }
                />
                <div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] px-3 py-2 text-sm text-emerald-200/90">
                  <Check className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={2.5} aria-hidden />
                  Stored locally &mdash; in SQLite on your own machine.
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Keep every sponsor on your own machine.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Sponsor CRM ships in the streamerOS GA build — a full lead pipeline
              stored locally in SQLite, with no cloud and no lock-in.
            </p>
            <LaunchBadge className="mt-8" />
            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PreRegisterButton className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#05070A] transition hover:bg-cyan-300">
                Pre-Register for Launch
                <ArrowRight className="h-4 w-4" aria-hidden />
              </PreRegisterButton>
              <Link
                href="/features"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold text-zinc-200 transition-all duration-200 hover:border-white/20 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                Back to all features
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
