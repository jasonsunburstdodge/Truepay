"use client";

import { industries } from "@/lib/industries";
import { useIndustrySelection } from "@/components/industry-selection-context";

// PENDING CLIENT SIGN-OFF: the industries list and copy rendered here are a
// proposed addition, not sourced from TruePay's existing site or confirmed
// by the client. Confirm before launch (see src/lib/industries.ts).
export function IndustriesSection() {
  const { selectIndustry } = useIndustrySelection();

  return (
    <section
      id="industries"
      className="border-y border-border bg-surface-alt py-16"
      aria-label="Industries served"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="section-eyebrow text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Built for businesses like yours
        </p>
        <h2 className="font-display mt-3 max-w-lg text-3xl text-ink sm:text-4xl">
          We know your industry&apos;s payment problems.
        </h2>

        <div className="industry-grid mt-10">
          {industries.map((industry) => (
            <button
              key={industry.slug}
              type="button"
              data-industry={industry.slug}
              onClick={() => selectIndustry(industry.slug)}
              className="industry-card group flex flex-col items-start rounded-[var(--radius-lg)] border border-border bg-white p-6 text-left transition-all hover:-translate-y-1 hover:border-gold hover:shadow-[var(--shadow-card-hover)]"
            >
              <span className="industry-icon mb-3 block text-3xl" aria-hidden="true">
                {industry.icon}
              </span>
              <h3 className="text-base font-semibold text-ink">{industry.label}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                {industry.blurb}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
