export type PartnerEstimateInputs = {
  monthlyVolume: number;
  accountsPerMonth: number;
  marginPercent: number;
  sharePercent: number;
  attritionPercent: number;
};
/** New accounts contribute one full month; attrition applies to prior cohorts first.
 * Fractional active accounts are expected values, not a count of actual merchants.
 * Keep full precision throughout; round currency only when displaying it.
 */
export function estimatePartnerResiduals(input: PartnerEstimateInputs) {
  const { monthlyVolume, accountsPerMonth, marginPercent, sharePercent, attritionPercent } = input;
  if (Object.values(input).some(v => !Number.isFinite(v)) || monthlyVolume < 0 || monthlyVolume > 1e9 || !Number.isInteger(accountsPerMonth) || accountsPerMonth < 0 || accountsPerMonth > 100 || [marginPercent, sharePercent, attritionPercent].some(v => v < 0 || v > 100)) return null;
  const singleAccountMonthly = monthlyVolume * marginPercent / 100 * sharePercent / 100;
  let activeAccounts = 0;
  let cumulative = 0;
  const months = Array.from({ length: 12 }, (_, i) => {
    activeAccounts = activeAccounts * (1 - attritionPercent / 100) + accountsPerMonth;
    const residual = activeAccounts * singleAccountMonthly;
    cumulative += residual;
    return { month: i + 1, activeAccounts, residual, cumulative };
  });
  return { singleAccountMonthly, months, lastMonth: months[11], total: cumulative };
}
