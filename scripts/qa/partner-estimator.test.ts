import test from "node:test";
import assert from "node:assert/strict";
import { estimatePartnerResiduals } from "../../src/lib/partner-estimator";
import { partnerProgram } from "../../src/content/partner-program";
const input = { monthlyVolume: 50000, accountsPerMonth: 1, marginPercent: 1, sharePercent: 50, attritionPercent: 2 };
const close = (a: number, b: number) => assert.ok(Math.abs(a-b) < 1e-7, `${a} != ${b}`);
test("single-account residual uses applicable profit and the registered path share", () => {
  assert.equal(partnerProgram.defaultMarginPercent, 1);
  assert.equal(partnerProgram.defaultAttritionPercent, 2);
  assert.equal(estimatePartnerResiduals({ ...input, sharePercent: partnerProgram.salesRepPercent })!.singleAccountMonthly, 250);
  assert.equal(estimatePartnerResiduals({ ...input, sharePercent: partnerProgram.referralPercent })!.singleAccountMonthly, 100);
});
test("cohorts reconcile with a closed-form survival sum and cumulative monthly payouts", () => {
  const r = estimatePartnerResiduals(input)!;
  assert.equal(r.months[0].residual, 250);
  close(r.months[1].activeAccounts, 1.98);
  close(r.months[1].cumulative, 745);
  for (const m of r.months) close(m.activeAccounts, (1 - .98 ** m.month) / .02);
  const independentTotal = 250 * Array.from({length:12}, (_, i) => (1 - .98 ** (i+1))/.02).reduce((a,b)=>a+b,0);
  close(r.total, independentTotal);
});
test("attrition boundaries, zero additions and edited margin change the actual calculation", () => {
  const noLoss = estimatePartnerResiduals({...input, accountsPerMonth: 2, monthlyVolume: 100000, attritionPercent: 0})!;
  assert.equal(noLoss.lastMonth.residual,12000);
  assert.equal(noLoss.total,78000);
  const fullLoss = estimatePartnerResiduals({...input, attritionPercent: 100})!;
  assert.equal(fullLoss.lastMonth.activeAccounts,1);
  assert.equal(fullLoss.total,3000);
  assert.equal(estimatePartnerResiduals({...input, accountsPerMonth:0})!.total,0);
  assert.equal(estimatePartnerResiduals({...input, marginPercent:1.75})!.singleAccountMonthly,437.5);
  assert.equal(estimatePartnerResiduals({...input, monthlyVolume:0})!.total,0);
});
test("invalid estimator inputs return no misleading result", () => {
  for (const bad of [{monthlyVolume:NaN},{marginPercent:Infinity},{marginPercent:-1},{sharePercent:101},{attritionPercent:-1},{attritionPercent:101},{accountsPerMonth:1.5},{accountsPerMonth:101},{monthlyVolume:1e10}]) assert.equal(estimatePartnerResiduals({...input,...bad}),null);
});
