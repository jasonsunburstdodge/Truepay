import test from "node:test";
import assert from "node:assert/strict";
import { bodySentences, duplicateSentences, headingTexts } from "./duplicate-copy";
test("duplicate gate checks long body sentences across pages and only exempts quotes and commitment scope", () => {
  const repeated = 'Ask the office to match the deposit to the final invoice.';
  const html = `<main><p>${repeated}</p><blockquote><p>A quoted customer sentence is preserved exactly as it was published.</p></blockquote><section id="fine-print"><p>A shared written commitment can explain its limits in the fine print.</p></section></main>`;
  assert.equal(bodySentences(html).length, 1);
  assert.deepEqual(bodySentences("<main><ul><li>Visa payment system: interchange, merchant discount and fees · Visa · Accessed Oct. 24, 2026</li></ul></main>"), []);
  const dup = duplicateSentences([{path:'/a/',sentences:bodySentences(html)},{path:'/b/',sentences:bodySentences(html)}]);
  assert.equal(dup.length, 1);
  assert.deepEqual(dup[0].paths, ['/a/','/b/']);
  assert.equal(duplicateSentences([{path:'/a/',sentences:bodySentences('<main><p>Eight words do not count as a long sentence</p></main>')}]).length,0);
});

test("heading originality includes short H2s and eyebrows without sentence punctuation", () => {
  const html = '<main><p class="eyebrow">Compare your options</p><h2>Start with the counter</h2><blockquote><h2>Original quote</h2></blockquote></main>';
  assert.deepEqual(headingTexts(html), ['compare your options', 'start with the counter']);
  assert.equal(duplicateSentences([{path:'/a/',sentences:headingTexts(html)},{path:'/b/',sentences:headingTexts(html)}]).length,2);
});
