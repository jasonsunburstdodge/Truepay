import type { Metadata } from "next";
import { getRoute } from "@/content/routes";
import { homeContent } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { pageGraph } from "@/lib/schema";
import { BlockView } from "@/components/blocks";
import { CtaBand, CtaRow, HeroArcs } from "@/components/page-parts";
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
      <section className="hero-navy">
        <HeroArcs />
        <div className="container-tp relative grid gap-12 py-14 sm:py-24 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div className="grid gap-6">
            <p className="eyebrow eyebrow-gold">Payment processing · Josephine, Texas · Since 2011</p>
            <h1 className="font-display display-xl text-[3.1rem] sm:text-7xl">{route.h1}</h1>
            <p data-answer className="max-w-xl text-lg leading-relaxed text-mist sm:text-xl">
              <Rich text={homeContent.answer} />
            </p>
            <div className="pt-1">
              <CtaRow route={route} onDark />
            </div>
          </div>

          <figure className="rounded-[var(--radius-lg)] bg-paper p-6 text-text shadow-[0_30px_70px_rgba(0,0,0,0.35)] sm:p-8">
            <p className="eyebrow">Free statement review</p>
            <figcaption className="mt-2 flex items-center gap-2 text-2xl font-extrabold tracking-[-0.04em] text-ink">
              <ShieldMark className="h-6 w-6" /> What we look at
            </figcaption>
            <ul className="mt-5 grid border-t border-border text-[0.95rem]">
              {s.lines.map((l) => (
                <li key={l.key} className="flex items-start gap-3 border-b border-border py-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-navy text-xs font-bold text-gold">{l.key}</span>
                  <span className="flex-1 text-text">{l.label}</span>
                  <span className="num font-bold text-ink">{usd(l.amount)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-baseline justify-between rounded-[var(--radius-md)] bg-navy px-5 py-4 text-white">
              <span className="text-sm font-semibold text-mist">Effective rate</span>
              <span className="num text-4xl font-extrabold tracking-[-0.05em]">{s.rate.toFixed(2)}%</span>
            </div>
            <p className="mt-3 text-xs text-text-muted">Example with fictional numbers on {usd(s.sales)} in monthly card sales.</p>
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
