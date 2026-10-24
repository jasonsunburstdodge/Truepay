import test from "node:test";
import assert from "node:assert/strict";
import { copyStyleViolations } from "./copy-style";
test("AP gate rejects long dashes in main copy while preserving verbatim blockquotes", () => {
  assert.deepEqual(copyStyleViolations('<main><p>Monday-Friday, 8 a.m. to 6 p.m.</p><blockquote>Original — quote – text.</blockquote></main>'), []);
  assert.deepEqual(copyStyleViolations('<main><p>Two — clauses and 2–4%.</p></main>'), ['—', '–']);
  assert.deepEqual(copyStyleViolations('<header>Outside — main</header><main><script>const x="—";</script><p>Good copy.</p></main>'), []);
});
