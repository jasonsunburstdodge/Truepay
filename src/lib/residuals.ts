/**
 * Partner residual illustration (pure functions, unit-tested in scripts/qa/residuals.test.ts).
 *
 * monthly residual from one account = monthly volume × TruePay margin × partner share
 * Active accounts each month: previous × (1 − attrition) + new accounts signed that month.
 * New accounts are assumed to start processing in the month they sign.
 */
export type ResidualInputs = {
  volumePerAccount: number; // $ per month
  newAccountsPerMonth: number;
  marginPct: number; // TruePay applicable profit, % of volume
  sharePct: number; // partner share of that profit, %
  attritionPct: number; // % of active accounts lost each month
  months?: number;
};

export function singleAccountMonthly(i: Pick<ResidualInputs, "volumePerAccount" | "marginPct" | "sharePct">) {
  return i.volumePerAccount * (i.marginPct / 100) * (i.sharePct / 100);
}

export function projectResiduals(i: ResidualInputs) {
  const months = i.months ?? 12;
  const perAccount = singleAccountMonthly(i);
  let active = 0;
  let total = 0;
  const series: { month: number; activeAccounts: number; residual: number }[] = [];
  for (let m = 1; m <= months; m++) {
    active = active * (1 - i.attritionPct / 100) + i.newAccountsPerMonth;
    const residual = active * perAccount;
    total += residual;
    series.push({ month: m, activeAccounts: active, residual });
  }
  return { perAccount, finalMonthly: series[series.length - 1]?.residual ?? 0, finalActive: active, total, series };
}
