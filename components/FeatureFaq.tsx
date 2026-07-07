import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { faqPageJsonLd, type FaqEntry } from '@/lib/seo';

/**
 * Per-feature FAQ block: a native `<details>` accordion (same styling as the
 * global /faq page) plus FAQPage JSON-LD generated from the same items, so the
 * structured data always matches what's on screen.
 */
export default function FeatureFaq({ items }: { items: FaqEntry[] }) {
  return (
    <section className="border-t border-white/5">
      <JsonLd data={faqPageJsonLd(items)} />
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        <Reveal>
          <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
            Frequently asked questions.
          </h2>
        </Reveal>
        <div className="mt-10 space-y-3">
          {items.map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i, 4) * 0.05}>
              <details className="group rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-colors hover:border-white/20">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                  <span className="text-sm font-medium text-zinc-100 sm:text-base">{item.q}</span>
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-cyan-400 transition-transform duration-300 group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-400">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-sm text-zinc-500">
            More questions answered on the{' '}
            <Link href="/faq" className="text-cyan-400 underline-offset-2 hover:underline">
              full FAQ
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
