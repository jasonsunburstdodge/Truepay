"use client";

import { useState } from "react";
import { projectResiduals, singleAccountMonthly } from "@/lib/residuals";
import { track } from "@/lib/analytics";

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const range = (lo: number, hi: number) => `${usd(lo)}–${usd(hi)}`;

/** Estimated TruePay applicable profit as % of volume (claim: partner-estimator; pending finance confirmation). */
const MARGIN_LOW = 1;
const MARGIN_HIGH = 1.75;
const REP = 50;
const REFERRAL = 20;

const card = "rounded-[var(--radius-lg)] bg-paper p-6 shadow-[var(--shadow-card)] sm:p-10";

function MoneyInput({ id, label, value, onChange }: { id: string; label: string; value: number; onChange: (n: number) => void }) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="flex max-w-xl items-center rounded-[var(--radius-md)] border-2 border-border bg-paper px-5 focus-within:border-navy">
        <span className="text-2xl text-slate" aria-hidden="true">
          $
        </span>
        <input
          id={id}
          inputMode="numeric"
          value={value ? String(value) : ""}
          onChange={(e) => {
            const n = Number(e.target.value.replace(/[^\d]/g, ""));
            onChange(Number.isFinite(n) ? Math.min(n, 10_000_000) : 0);
          }}
          className="num w-full bg-transparent py-4 pl-3 text-3xl font-extrabold tracking-[-0.04em] text-ink outline-none sm:text-4xl"
        />
      </div>
    </div>
  );
}

function Chips<T extends string | number>({ options, value, onPick, label }: { options: { v: T; label: string }[]; value: T; onPick: (v: T) => void; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2.5">
      {options.map((o) => (
        <button
          key={String(o.v)}
          type="button"
          aria-pressed={value === o.v}
          onClick={() => onPick(o.v)}
          className={`rounded-[var(--radius-sm)] border px-4 py-2.5 text-[1.02rem] font-bold tracking-[-0.01em] transition-colors ${
            value === o.v ? "border-navy bg-navy text-white" : "border-border bg-surface-alt text-navy hover:border-navy"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function ResultCard({ dark, label, value, sub }: { dark?: boolean; label: string; value: string; sub: string }) {
  return (
    <div className={`rounded-[var(--radius-md)] p-6 sm:p-7 ${dark ? "bg-navy text-white" : "bg-surface-alt text-ink"}`}>
      <p className={`text-[1rem] ${dark ? "text-mist" : "text-slate"}`}>{label}</p>
      <p className="num mt-2 text-[2.3rem] font-extrabold leading-none tracking-[-0.05em] sm:text-5xl">{value}</p>
      <p className={`mt-3 text-[0.95rem] ${dark ? "text-mist" : "text-slate"}`}>{sub}</p>
    </div>
  );
}

export function ResidualEstimator() {
  const [volume, setVolume] = useState(100000);
  const [paceVolume, setPaceVolume] = useState(50000);
  const [pace, setPace] = useState(4);
  const [attrition, setAttrition] = useState(2);
  const [used, setUsed] = useState(false);
  const touch = () => {
    if (!used) {
      track("estimator_used");
      setUsed(true);
    }
  };

  const one = (share: number, margin: number) => singleAccountMonthly({ volumePerAccount: volume, marginPct: margin, sharePct: share });
  const build = (margin: number) => projectResiduals({ volumePerAccount: paceVolume, newAccountsPerMonth: pace, marginPct: margin, sharePct: REP, attritionPct: attrition });
  const lo = build(MARGIN_LOW);
  const hi = build(MARGIN_HIGH);

  return (
    <div className="grid gap-8" data-claim="partner-estimator">
      <div className={card}>
        <p className="eyebrow">Estimate residuals</p>
        <h3 className="font-display mt-3 text-[1.9rem] text-ink sm:text-[2.4rem]">What one account could earn you.</h3>
        <p className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-text-muted">Enter an account&apos;s monthly card volume. We&apos;ll estimate TruePay&apos;s profit range for a dual pricing account and your share of it.</p>
        <div className="mt-6 grid gap-4">
          <MoneyInput
            id="est-volume"
            label="Monthly card volume for one account"
            value={volume}
            onChange={(n) => {
              touch();
              setVolume(n);
            }}
          />
          <Chips
            label="Example volumes"
            value={volume}
            onPick={(v) => {
              touch();
              setVolume(v);
            }}
            options={[
              { v: 50000, label: "$50,000" },
              { v: 100000, label: "$100,000" },
              { v: 250000, label: "$250,000" },
            ]}
          />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2" aria-live="polite">
          <ResultCard dark label="Rep · estimated monthly" value={range(one(REP, MARGIN_LOW), one(REP, MARGIN_HIGH))} sub={`About ${range(one(REP, MARGIN_LOW) * 12, one(REP, MARGIN_HIGH) * 12)} per year`} />
          <ResultCard label="Partner · estimated monthly" value={range(one(REFERRAL, MARGIN_LOW), one(REFERRAL, MARGIN_HIGH))} sub={`About ${range(one(REFERRAL, MARGIN_LOW) * 12, one(REFERRAL, MARGIN_HIGH) * 12)} per year`} />
        </div>
        <p className="mt-5 text-[0.95rem] leading-relaxed text-text-muted">
          Illustration: volume × {MARGIN_LOW}%–{MARGIN_HIGH}% estimated TruePay profit × {REP}% rep share or {REFERRAL}% referral share. Annual figures assume the same volume and profit for 12 months.
          No earnings are guaranteed.
        </p>
      </div>

      <div className={card}>
        <p className="eyebrow">Build over time</p>
        <h3 className="font-display mt-3 text-[1.9rem] text-ink sm:text-[2.4rem]">See how recurring residuals could build.</h3>
        <p className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-text-muted">Pick a pace of new accounts each month, each processing the volume below. Accounts that leave reduce the total, so set an attrition rate too.</p>
        <div className="mt-6 grid gap-4">
          <Chips
            label="New accounts per month"
            value={pace}
            onPick={(v) => {
              touch();
              setPace(v);
            }}
            options={[
              { v: 4, label: "4 accounts a month" },
              { v: 8, label: "8 accounts a month" },
              { v: 15, label: "15 accounts a month" },
            ]}
          />
          <MoneyInput
            id="est-pace-volume"
            label="Monthly card volume per account"
            value={paceVolume}
            onChange={(n) => {
              touch();
              setPaceVolume(n);
            }}
          />
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="est-attrition" className="text-[0.98rem] font-semibold text-ink">
              Accounts lost each month
            </label>
            <div className="flex items-center rounded-[var(--radius-sm)] border-2 border-border bg-paper px-3 focus-within:border-navy">
              <input
                id="est-attrition"
                type="number"
                inputMode="decimal"
                min={0}
                max={20}
                step={0.5}
                value={attrition}
                onChange={(e) => {
                  touch();
                  const n = Number(e.target.value);
                  setAttrition(Number.isFinite(n) ? Math.min(Math.max(n, 0), 20) : 0);
                }}
                className="num w-16 bg-transparent py-2 text-lg font-bold text-ink outline-none"
              />
              <span className="text-slate">%</span>
            </div>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2" aria-live="polite">
          <ResultCard dark label="Total rep residuals earned during year one" value={range(lo.total, hi.total)} sub="Across months 1 through 12" />
          <ResultCard label="Monthly rep residual in month 12" value={range(lo.finalMonthly, hi.finalMonthly)} sub={`From about ${Math.round(lo.finalActive)} active accounts`} />
        </div>
        <p className="mt-5 text-[0.95rem] leading-relaxed text-text-muted">
          Assumes {pace} new accounts begin processing in the month signed, each processes {usd(paceVolume)} every month, {attrition}% of active accounts leave each month, and TruePay earns{" "}
          {MARGIN_LOW}%–{MARGIN_HIGH}% applicable profit. Rep receives {REP}% of that profit. Actual results vary and follow your written partner agreement; this is an illustration, not an earnings
          guarantee.
        </p>
      </div>
    </div>
  );
}
