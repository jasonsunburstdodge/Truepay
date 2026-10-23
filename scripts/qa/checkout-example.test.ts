import { test } from "node:test";
import assert from "node:assert/strict";
import { checkoutExample, money } from "../../src/lib/checkout-example";
test("checkout keeps displayed card price and receipt equal without adding the difference twice", () => {
  const result = checkoutExample(10000, 400);
  assert.equal(result.cardCents, 10400);
  assert.equal(result.receiptCents, result.cardCents);
  assert.equal(result.cardCents - result.cashCents, result.differenceCents);
  assert.equal(money(result.receiptCents), "$104.00");
  assert.equal(money(checkoutExample(99, 1).receiptCents), "$1.00");
  for (const args of [
    [0, 400],
    [-1, 400],
    [100, -1],
    [1.1, 2],
    [NaN, 2],
    [100, Infinity],
    [Number.MAX_SAFE_INTEGER, 1],
  ]) {
    assert.throws(
      () => checkoutExample(...(args as [number, number])),
      RangeError,
    );
  }
});
