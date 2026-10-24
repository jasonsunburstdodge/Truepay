import test from "node:test";
import assert from "node:assert/strict";
import { pricingExample } from "../../src/content/guides/pricing-example";

test("fictional comparison totals independently reconcile at all three volumes", () => {
  const expected = [
    { volume: 2000, transactions: 40, flatCents: 5800, tieredCents: 7220, plusCents: 7000 },
    { volume: 10000, transactions: 200, flatCents: 29000, tieredCents: 30100, plusCents: 25000 },
    { volume: 50000, transactions: 1000, flatCents: 145000, tieredCents: 144500, plusCents: 115000 },
  ];
  for (const row of expected) assert.deepEqual(pricingExample(row.volume), row);
});
