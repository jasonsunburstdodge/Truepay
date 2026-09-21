"use client";

import { useMemo, useState } from "react";
import { industryBySlug } from "@/lib/industries";
import { useIndustrySelection } from "@/components/industry-selection-context";
import { useCountUp } from "@/lib/use-count-up";

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function RateCalculator() {
  const { selectedIndustry } = useIndustrySelection();
  const context = selectedIndustry ? industryBySlug.get(selectedIndustry) : undefined;

  // Live inputs — bound to onChange, not a submit/click handler, so the
  // effective rate recalculates as the user types (brief task 8).
  const [monthlyVolume, setMonthlyVolume] = useState("25000");
  const [monthlyFees, setMonthlyFees] = useState("750");

  const volume = Number(monthlyVolume) || 0;
  const fees = Number(monthlyFees) || 0;
  const effectiveRate = volume > 0 ? (fees / volume) * 100 : 0;

  const animatedRate = useCountUp(effectiveRate);
  const displayRate = useMemo(() => animatedRate.toFixed(2), [animatedRate]);

  return (
    <section id="calculator" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="rounded-[var(--radius-lg)] border border-border bg-white p-6 shadow-[var(--shadow-card)] sm:p-10">
        <p className="section-eyebrow text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Effective rate calculator
        </p>
        <h2 className="font-display mt-2 text-2xl text-ink sm:text-3xl">
          See what you&apos;re really paying.
        </h2>

        {context ? (
          <div
            id="calculator-context"
            className="calculator-context mt-6 rounded-md border-l-4 border-gold bg-cream px-5 py-4 text-sm leading-relaxed text-text"
          >
            <p className="calculator-industry-tag">
              <strong>{context.label}:</strong> {context.calculatorNote}
            </p>
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-text">Monthly card volume</span>
            <div className="mt-1.5 flex items-center rounded-md border border-border bg-paper px-3 focus-within:border-navy">
              <span className="text-text-muted">$</span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(e.target.value)}
                className="w-full bg-transparent py-3 pl-1.5 text-text outline-none"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-text">Monthly processing fees</span>
            <div className="mt-1.5 flex items-center rounded-md border border-border bg-paper px-3 focus-within:border-navy">
              <span className="text-text-muted">$</span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                value={monthlyFees}
                onChange={(e) => setMonthlyFees(e.target.value)}
                className="w-full bg-transparent py-3 pl-1.5 text-text outline-none"
              />
            </div>
          </label>
        </div>

        <div className="mt-8 rounded-md bg-navy px-6 py-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
            Your effective rate
          </p>
          <p className="rate-value font-display mt-1 text-5xl text-white">
            {displayRate}
            <span className="text-2xl text-white/60">%</span>
          </p>
          <p className="mt-2 text-xs text-white/50">
            {formatCurrency(fees)} in fees on {formatCurrency(volume)} in volume
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-text-muted">
          This is your own math from the numbers above — not an industry average or
          a guaranteed savings estimate.
        </p>

        <div className="mt-6 text-center">
          <a
            href="#review"
            className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-bright"
          >
            Get my free statement review
          </a>
        </div>
      </div>
    </section>
  );
}
