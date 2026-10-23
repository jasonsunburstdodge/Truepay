"use client";

import { useState } from "react";
import { projectResiduals, singleAccountMonthly } from "@/lib/residuals";
import { track } from "@/lib/analytics";

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

type Role = "rep" | "referral";
const SHARE: Record<Role, number> = { rep: 50, referral: 20 };

export function ResidualEstimator() {
  const [role, setRole] = useState<Role>("rep");
  const [volume, setVolume] = useState(50000);
  const [accounts, setAccounts] = useState(4);
  const [margin, setMargin] = useState(1);
  const [attrition, setAttrition] = useState(2);
  const [used, setUsed] = useState(false);

  const share = SHARE[role];
  const inputs = { volumePerAccount: volume, newAccountsPerMonth: accounts, marginPct: margin, sharePct: share, attritionPct: attrition };
  const one = singleAccountMonthly(inputs);
  const p = projectResiduals(inputs);

  const touch = () => {
    if (!used) {
      track("estimator_used");
      setUsed(true);
    }
  };

  const num = (id: string, label: string, value: number, set: (n: number) => void, opts: { step: number; min: number; max: number; prefix?: string; suffix?: string }) => (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <div className="mt-1.5 flex items-center rounded-md border border-border bg-paper px-3 focus-within:border-navy">
        {opts.prefix && <span className="text-text-muted">{opts.prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={opts.step}
          min={opts.min}
          max={opts.max}
          value={value}
          onChange={(e) => {
            touch();
            const n = Number(e.target.value);
            set(Number.isFinite(n) ? Math.min(Math.max(n, opts.min), opts.max) : opts.min);
          }}
          className="num w-full bg-transparent py-2.5 pl-1.5 text-text outline-none"
        />
        {opts.suffix && <span className="text-text-muted">{opts.suffix}</span>}
      </div>
    </div>
  );

  return (
    <div className="grid gap-6 rounded-[var(--radius-lg)] border border-border bg-paper p-6 shadow-[var(--shadow-card)] sm:p-8" data-claim="partner-estimator">
      <fieldset>
        <legend className="text-sm font-semibold text-ink">How would you work with TruePay?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["rep", "referral"] as Role[]).map((r) => (
            <label key={r} className={`cursor-pointer rounded-md border px-4 py-2 text-sm font-semibold ${role === r ? "border-navy bg-navy text-white" : "border-border text-navy"}`}>
              <input
                type="radio"
                name="role"
                value={r}
                checked={role === r}
                onChange={() => {
                  touch();
                  setRole(r);
                }}
                className="sr-only"
              />
              {r === "rep" ? "Sales rep · 50% share" : "Referral partner · 20% share"}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {num("est-volume", "Monthly card volume per account", volume, setVolume, { step: 5000, min: 0, max: 5_000_000, prefix: "$" })}
        {num("est-accounts", "New accounts per month", accounts, setAccounts, { step: 1, min: 0, max: 100 })}
        {num("est-margin", "TruePay profit on volume", margin, setMargin, { step: 0.05, min: 0, max: 3, suffix: "%" })}
        {num("est-attrition", "Accounts lost per month", attrition, setAttrition, { step: 0.5, min: 0, max: 20, suffix: "%" })}
      </div>

      <div className="grid gap-4 md:grid-cols-3" aria-live="polite">
        <div className="rounded-md bg-navy p-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/65">One account, per month</p>
          <p className="num mt-1 font-display text-3xl">{usd(one)}</p>
          <p className="num mt-1 text-xs text-white/70">
            {usd(volume)} × {margin}% × {share}%
          </p>
        </div>
        <div className="rounded-md bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Monthly residual in month 12</p>
          <p className="num mt-1 font-display text-3xl text-ink">{usd(p.finalMonthly)}</p>
          <p className="num mt-1 text-xs text-text-muted">From about {Math.round(p.finalActive)} active accounts after {attrition}% monthly attrition</p>
        </div>
        <div className="rounded-md bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Total earned in months 1–12</p>
          <p className="num mt-1 font-display text-3xl text-ink">{usd(p.total)}</p>
          <p className="num mt-1 text-xs text-text-muted">If you sign {accounts} accounts every month</p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-text-muted">
        Illustration only. It multiplies the numbers above: volume × TruePay&apos;s applicable profit × your share, and assumes new accounts start processing the month they sign.
        TruePay&apos;s real profit on an account depends on its pricing program and card mix, and accounts change volume or leave. Actual residuals follow your written partner
        agreement. Nothing here is a promise of income.
      </p>
    </div>
  );
}
