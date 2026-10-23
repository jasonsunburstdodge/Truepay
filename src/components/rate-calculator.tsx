"use client";
import Link from "next/link";
import { useState } from "react";
export function RateCalculator() {
  const [sales, setSales] = useState("25000");
  const [fees, setFees] = useState("750");
  const valid =
    sales.trim() !== "" &&
    fees.trim() !== "" &&
    Number.isFinite(Number(sales)) &&
    Number.isFinite(Number(fees)) &&
    Number(sales) > 0 &&
    Number(fees) >= 0;
  const rate = valid ? (Number(fees) / Number(sales)) * 100 : null;
  return (
    <div className="card calculator">
      <div className="calculator-inputs">
        <label htmlFor="card-sales">
          Monthly card sales
          <div className="money-input">
            <span aria-hidden="true">$</span>
            <input
              id="card-sales"
              type="number"
              inputMode="decimal"
              min="0.01"
              step="any"
              value={sales}
              onChange={(e) => setSales(e.target.value)}
              aria-describedby={!valid ? "calculator-error" : "calculator-note"}
            />
          </div>
        </label>
        <label htmlFor="card-fees">
          Total monthly processing fees
          <div className="money-input">
            <span aria-hidden="true">$</span>
            <input
              id="card-fees"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              aria-describedby={!valid ? "calculator-error" : "calculator-note"}
            />
          </div>
        </label>
        <p id="calculator-note" className="note">
          Use fees and card sales from the same month. Include all processing
          fees shown on that statement.
        </p>
        {!valid && (
          <p id="calculator-error" role="alert">
            Enter card sales greater than zero and fees of zero or more.
          </p>
        )}
      </div>
      <div className="result" aria-live="polite" aria-atomic="true">
        <p className="eyebrow">Your effective rate</p>
        <p className="big-number">
          {rate === null ? "—" : `${rate.toFixed(2)}%`}
        </p>
        <p>Total fees ÷ card sales × 100</p>
      </div>
      <p className="note calculator-example">
        Illustration: $750 in fees ÷ $25,000 in card sales × 100 ={" "}
        {((750 / 25000) * 100).toFixed(2)}%. This is arithmetic from your
        inputs, not a savings estimate or an industry average.
      </p>
      <Link
        href="/#review"
        data-cta="statement-review"
        className="button primary"
      >
        Get my free statement review <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
