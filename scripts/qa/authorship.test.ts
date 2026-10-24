import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AuthorBox } from "../../src/components/modules/AuthorBox";
import { people } from "../../src/content/entity";
test("author box shows actual dated review only and readable calendar dates", () => {
  const props = { author: people[0], reviewer: people[1], datePublished: "2026-10-24", dateModified: "2026-10-24" };
  const draft = renderToStaticMarkup(createElement(AuthorBox, props));
  assert.match(draft, /Written by/);
  assert.match(draft, /datetime="2026-10-24">Oct\. 24, 2026/i);
  assert.doesNotMatch(draft, /Reviewed by|Review assigned|Draft guide|data-reviewed/);
  const reviewed = renderToStaticMarkup(createElement(AuthorBox, { ...props, reviewedAt: "2026-10-24" }));
  assert.match(reviewed, /data-reviewed/);
  assert.match(reviewed, /Reviewed by/);
});
