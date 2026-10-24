/** Fictional proposals for teaching, not network rates, market averages or TruePay quotes. */
export const pricingAssumptions = {
  ticketDollars: 50,
  volumes: [2000, 10000, 50000],
  flat: { basisPoints: 270, perItemCents: 10, monthlyCents: 0 },
  tiered: { weights: [0.5, 0.3, 0.2], basisPoints: [200, 300, 380], perItemCents: 10, monthlyCents: 1500 },
  plus: { underlyingBasisPoints: 165, underlyingPerItemCents: 10, markupBasisPoints: 30, markupPerItemCents: 5, monthlyCents: 2500 },
};
export function pricingExample(volume: number) {
  const a = pricingAssumptions;
  const transactions = volume / a.ticketDollars;
  const percentageCents = (bps: number) => volume * bps / 100;
  return {
    volume, transactions,
    flatCents: Math.round(percentageCents(a.flat.basisPoints) + transactions * a.flat.perItemCents + a.flat.monthlyCents),
    tieredCents: Math.round(a.tiered.weights.reduce((sum, weight, i) => sum + percentageCents(a.tiered.basisPoints[i]) * weight, 0) + transactions * a.tiered.perItemCents + a.tiered.monthlyCents),
    plusCents: Math.round(percentageCents(a.plus.underlyingBasisPoints + a.plus.markupBasisPoints) + transactions * (a.plus.underlyingPerItemCents + a.plus.markupPerItemCents) + a.plus.monthlyCents),
  };
}
