import { test } from "node:test";
import assert from "node:assert/strict";
import { projectResiduals, singleAccountMonthly } from "../../src/lib/residuals";
import { exampleStatement, exampleDualPricing } from "../../src/components/diagrams";

test("single account residual = volume × margin × share", () => {
  assert.equal(singleAccountMonthly({ volumePerAccount: 50000, marginPct: 1, sharePct: 50 }), 250);
  assert.ok(Math.abs(singleAccountMonthly({ volumePerAccount: 50000, marginPct: 1.75, sharePct: 20 }) - 175) < 1e-9);
});

test("no attrition matches the partner draft's 4-account example (low end)", () => {
  const p = projectResiduals({ volumePerAccount: 50000, newAccountsPerMonth: 4, marginPct: 1, sharePct: 50, attritionPct: 0 });
  assert.equal(p.finalActive, 48);
  assert.equal(p.finalMonthly, 12000);
  assert.equal(p.total, 78000); // matches the $78,000 low end on the draft partner page
});

test("attrition lowers the totals", () => {
  const a = projectResiduals({ volumePerAccount: 50000, newAccountsPerMonth: 4, marginPct: 1, sharePct: 50, attritionPct: 2 });
  assert.ok(a.total < 78000 && a.finalActive < 48);
});

test("example statement arithmetic", () => {
  assert.equal(Math.round(exampleStatement.total * 100) / 100, 659.95);
  assert.equal(exampleStatement.rate.toFixed(2), "2.64");
});

test("dual pricing example arithmetic", () => {
  assert.equal(exampleDualPricing.cardPrice, 104);
});
