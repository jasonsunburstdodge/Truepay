"use client";

import Link from "next/link";
import { useState } from "react";
import { track } from "@/lib/analytics";

const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

function parse(v: string): { value: number | null; error?: string } {
  if (v.trim() === "") return { value: null, error: "Enter an amount." };
  const n = Number(v.replace(/[$,\s]/g, ""));
  if (!Number.isFinite(n)) return { value: null, error: "Use numbers only, like 25000." };
  if (n < 0) return { value: null, error: "Amounts can't be negative." };
  return { value: n };
}

/** Effective rate = total processing fees ÷ total card sales × 100, for the same statement period. */
export function effectiveRate(sales: number, fees: number) {
  return sales > 0 ? (fees / sales) * 100 : null;
}

export function RateCalculator() {
  const [sales, setSales] = useState("25000");
  const [fees, setFees] = useState("787.50");
  const [tracked, setTracked] = useState(false);

  const s = parse(sales);
  const f = parse(fees);
  const salesError = s.error ?? (s.value === 0 ? "Card sales must be more than $0." : undefined);
  const feesError = f.error ?? (s.value !== null && f.value !== null && f.value > s.value ? "Fees are larger than sales. Check you used the same month for both." : undefined);
  const rate = !salesError && !feesError && s.value !== null && f.value !== null ? effectiveRate(s.value, f.value) : null;

  const onBlur = () => {
    if (rate !== null && !tracked) {
      track("calculator_complete");
      setTracked(true);
    }
  };

  const field = (id: string, label: string, help: string, value: string, set: (v: string) => void, error?: string) => (
    <div>
      <label htmlFor={id} className="text-[1.02rem] font-bold text-ink">
        {label}
      </label>
      <p id={`${id}-help`} className="text-sm text-slate">
        {help}
      </p>
      <div className={`mt-2 flex items-center rounded-[var(--radius-md)] border-2 bg-paper px-4 focus-within:border-navy ${error ? "border-warn" : "border-border"}`}>
        <span className="text-2xl text-slate" aria-hidden="true">
          $
        </span>
        <input
          id={id}
          inputMode="decimal"
          value={value}
          onChange={(e) => set(e.target.value)}
          onBlur={onBlur}
          aria-invalid={!!error}
          aria-describedby={`${id}-help${error ? ` ${id}-err` : ""}`}
          className="num w-full bg-transparent py-3.5 pl-2 text-3xl font-extrabold tracking-[-0.04em] text-ink outline-none"
        />
      </div>
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1 text-sm text-warn">
          {error}
        </p>
      )}
    </div>
  );

  return (
    <div className="rounded-[var(--radius-lg)] bg-paper p-6 shadow-[var(--shadow-card)] sm:p-10">
      <p className="eyebrow">Effective rate calculator</p>
      <h2 className="font-display mt-3 text-[1.9rem] text-ink sm:text-[2.4rem]">See what you&apos;re really paying.</h2>
      <p className="mb-6 mt-3 text-[1.02rem] text-text-muted">Filled in with example numbers. Replace them with the totals from one month of your statement.</p>
      <div className="grid gap-6 sm:grid-cols-2">
        {field("calc-sales", "Card sales for one month", "Total card volume on your statement", sales, setSales, salesError)}
        {field("calc-fees", "Total processing fees, same month", "Every fee on the statement, added together", fees, setFees, feesError)}
      </div>
      <div className="mt-7 grid gap-2 rounded-[var(--radius-md)] bg-navy px-7 py-7" aria-live="polite">
        <p className="text-[1rem] text-mist">Your effective rate</p>
        <p className="num text-6xl font-extrabold leading-none tracking-[-0.05em] text-white">{rate === null ? "–" : `${rate.toFixed(2)}%`}</p>
        {rate !== null && s.value !== null && f.value !== null && (
          <p className="num text-[0.95rem] text-mist">
            {money(f.value)} in fees ÷ {money(s.value)} in card sales
          </p>
        )}
      </div>
      <p className="mt-5 text-[0.95rem] leading-relaxed text-text-muted">
        This is your own math from your own statement, not an estimate of what you would pay with TruePay. Want to know what&apos;s driving it?{" "}
        <Link href="/statement-review/#review-form" className="inline-link font-semibold">
          Get a free statement review
        </Link>
        .
      </p>
    </div>
  );
}
