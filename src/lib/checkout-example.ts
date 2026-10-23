/** Hypothetical teaching example, not a TruePay rate, quote or tax calculation. */
export function checkoutExample(cashCents: number, differenceCents: number) {
  if (
    ![cashCents, differenceCents].every(Number.isSafeInteger) ||
    cashCents <= 0 ||
    differenceCents < 0 ||
    !Number.isSafeInteger(cashCents + differenceCents)
  ) {
    throw new RangeError(
      "Prices must be positive safe whole cents; the difference cannot be negative.",
    );
  }
  const cardCents = cashCents + differenceCents;
  return { cashCents, differenceCents, cardCents, receiptCents: cardCents };
}
export const money = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    cents / 100,
  );
