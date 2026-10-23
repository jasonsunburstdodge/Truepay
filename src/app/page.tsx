import type { Metadata } from "next";
import { getRoute } from "@/content/routes";
import { homeContent } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { pageGraph } from "@/lib/schema";
import { BlockView } from "@/components/blocks";
import { CtaBand, CtaRow } from "@/components/page-parts";
import { JsonLd } from "@/components/site-chrome";
import { Rich } from "@/components/rich";
import { ShieldMark } from "@/components/brand";
import { exampleStatement } from "@/components/diagrams";

export const metadata: Metadata = buildMetadata("/");

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

export default function Home() {
  const route = getRoute("/")!;
  const s = exampleStatement;
  return (
    <>
      <JsonLd data={pageGraph("/")} />
      <section className="relative overflow-hidden bg-navy-deep text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }}
        />
        <div className="container-tp relative grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div className="grid gap-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Payment processing · Josephine, Texas · Since 2011</p>
            <h1 className="font-display text-[2.6rem] leading-[1.05] sm:text-6xl">{route.h1}</h1>
            <p data-answer className="max-w-xl text-lg leading-relaxed text-white/85">
              <Rich text={homeContent.answer} />
            </p>
            <CtaRow route={route} onDark />
          </div>

          <figure className="rounded-[var(--radius-lg)] bg-paper p-5 text-text shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:p-6">
            <figcaption className="flex items-center gap-2 text-sm font-semibold text-ink">
              <ShieldMark className="h-5 w-5" /> What a statement review looks at
            </figcaption>
            <ul className="mt-4 grid gap-2.5 text-sm">
              {s.lines.map((l) => (
                <li key={l.key} className="flex items-start gap-3 border-b border-border pb-2.5 last:border-0">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-navy text-[0.7rem] text-white">{l.key}</span>
                  <span className="flex-1">{l.label}</span>
                  <span className="num font-medium text-ink">{usd(l.amount)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-baseline justify-between rounded-md bg-surface px-3 py-2 text-sm">
              <span className="font-semibold text-ink">Effective rate</span>
              <span className="num font-display text-2xl text-navy">{s.rate.toFixed(2)}%</span>
            </p>
            <p className="mt-2 text-xs text-text-muted">Example with fictional numbers on {usd(s.sales)} in monthly card sales.</p>
          </figure>
        </div>
      </section>

      {homeContent.blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
      <CtaBand route={route} />
    </>
  );
}
