import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { publishedPrivacyIntro, publishedPrivacySections } from "../../src/content/privacy-policy";
const words = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').replace(/\s+/g,' ').trim();
test("published privacy paragraphs survive migration with punctuation-only edits", () => {
  const source = JSON.parse(readFileSync(new URL('../../docs/qa/phase-7/sources/privacy-policy-published.json', import.meta.url),'utf8')) as { paragraphs: string[] };
  const migrated = [publishedPrivacyIntro, ...publishedPrivacySections.flatMap(s=>[...s.paragraphs,...('items' in s?s.items??[]:[]),...('after' in s?s.after??[]:[])]), 'If you have any questions or concerns about this Privacy Policy, please get in touch with us at:', 'TruePay Email: support@gotruepay.com', 'Phone: 888-792-0284'];
  assert.equal(words(migrated.join(' ')),words(source.paragraphs.join(' ')));
});
