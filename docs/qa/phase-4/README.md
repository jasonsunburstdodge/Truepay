# Phase 4: Trust and people

## Verified source and pushed checkpoints

SOURCE VERIFIED EDITABLE: `jasonsunburstdodge/Truepay`, stacked on `chatgpt/phase-3-solutions` at `c93877f364aabf20a2d0b2b5bc12598a5aefe824`. The repo was clean before branching. [Claude’s Phase 3 review](https://github.com/jasonsunburstdodge/Truepay/pull/6#issuecomment-6378579149), AGENTS.md, design system, site model, build plan, routes, entity, claims and redirect map were read. The reviewed Phase 3 parent remains the recovery point. No merge or deployment.

The following checkpoints were pushed to `chatgpt/phase-4-trust` during implementation:

1. `40552e0817b678d670003582882b70208b27e8a6`: the three review fixes only. Removed the three circular spec rows, retained SkyTab Mobile/SkyTab Glass/Valor Pay app names without unverified specifications, kept availability text only in table captions and corrected practice.
2. `b6d326d1f3f8ecc28d0673407c9f15c453bbc007`: seven Phase 4 planned → draft transitions, including the unpublished story template, plus verified archived testimonial source references. Titles/H1s/questions/CTAs/required links are unchanged.
3. `9571792bfa5dff2a3f0589f7138266db4ff99cef`: trust-page and shared-module implementation, saved before final browser evidence.

## Built

- `/about/`: origin story from the route-listed dev/live pages, named leadership from entity, static 2011 HTML, Josephine address, handshake/commitment links and team/profile/story/coverage links. No animated counters or invented ownership percentages.
- `/about/team/`: only the five people in `entity.people`, with registered bios, roles, expertise and the shared contact channel. No initials, fake portraits, stock people or placeholder names. Until real photos are supplied, a gold rule and typography carry the no-photo treatment.
- `/about/jon-wilson/` and `/about/shane-spears/`: ProfilePage + Person JSON-LD, stable profile IDs, matching mainEntity, `worksFor` → `https://gotruepay.com/#organization`, source-based background, responsibilities and all questions. Jon’s alternate name is retained; no unverified LinkedIn URL or Person.sameAs is invented. Jon’s 2006 experience reads the registered pending claim, not an invented duration.
- Authored-guide listing is derived from built guide routes and recorded bylines in `content/authorship.ts`. No guide bylines have yet been supplied/built, so no authorship is invented. Phase 5 should record the actual byline as each guide ships; profiles then list it automatically.
- `/customer-stories/`: all five entity testimonials verbatim, grouped around service, cost/value and systems/setup discussion. M. Holt appears only inside the marked `holt-quote` figure, attributed and qualified as an individual result. No expanded Moore quote, rating schema, invented business identity or Google review request link.
- `/customer-stories/[slug]/`: unpublished permission-gated story template. Its data registry is empty, `generateStaticParams()` returns no stories and `dynamicParams=false`. Unknown slugs, including an unapproved Holt story, return 404 without template placeholders. Future published stories require actual permission, identity, dates, sources and a registered author.
- `/service-areas/`: registered coverage wording, contact-first state/local/remote questions and the existing marker graphic labeled illustrative in its title, alt and caption. The graphic’s old “confirmed” wording is removed; no current state count, on-site availability claim or city pages are created.

All new pages use the existing navy/gold Inter partner-page design, two short hero sentences, SSR questions, warm white cards and manifest metadata. RelatedLinks now exposes all built required trust destinations across earlier pages. Profile links also activate in existing PersonCards. Pages remain draft/noindex and out of the sitemap.

## Source continuity for testimonials

The current live `/reviews/` page contains the registered testimonials but has no original Google/Facebook review permalinks. At launch that URL redirects to the collection itself. To preserve source links without circular citations, the existing `sourceUrl` fields remain intact and each testimonial gains a separate verified `archivedSourceUrl`.

The Internet Archive CDX result identified a successful HTML capture at `20260413133352`; that capture was opened and checked for all five named reviews, including M. Holt. The rendered link is clearly labeled **Published on TruePay · archived source**. This is a preserved TruePay publication, not an assertion of third-party review verification. The entity register’s exact quote text controls display, including the approved Holt excerpt and Moore punctuation. No review quote, name or status was rewritten.

- Original publication: https://gotruepay.com/reviews/
- Verified archived publication: https://web.archive.org/web/20260413133352/https://gotruepay.com/reviews/
- CDX evidence: https://web.archive.org/cdx/search/cdx?url=gotruepay.com/reviews/&output=json&filter=statuscode:200&filter=mimetype:text/html&collapse=digest

Additional source pages inspected: dev `/our-story/`, dev `/our-team/`, live `/about-us/` and live `/coast-to-coast-customer-network/`. Entity/claims override conflicting names, roles, coverage and the dev placeholder roster. Existing pictures on those sites were not assumed to be supplied/approved headshots.

## Verification and evidence

- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm run test:foundation`: 9/9 PASS.
- `npm run qa -- --phase 4`: **0 FAIL · 42 WARN · 17 INFO (23 pages)**. [Production report](qa-report.md).
- `npm run qa -- --phase 4 --preview`: **0 FAIL · 42 WARN · 17 INFO (23 pages)**. [Preview report](qa-report-preview.md), including noindex headers/disallow-all robots.
- `CHROME_PATH=/path/to/chromium node --import tsx scripts/qa/phase-4-browser.mjs`: PASS. [Browser evidence](browser-results.json) covers 46 page/viewport checks, 12 new-page screenshots, two rendered profile graphs, all built required contextual links, no orphans, two-sentence heroes, 32–40px question headings, verbatim/source-linked reviews, no-photo cards, illustrative coverage, trust redirects, unpublished-story 404s, no-JS content, static 2011 HTML and keyboard/mobile navigation. No viewport overflow or runtime errors.
- [Person graph checks](person-schema-checks.json) verify the actual rendered JSON-LD against entity fields and graph bindings. Exact submitted profile JSON-LD and HTML validator inputs are included for reproduction. External Rich Results Test evidence is recorded alongside these files.
- [Every WARN and disposition](warning-disposition.md); the complete TruePay sign-off table is in the QA report and PR.

## Remaining confirmation

The entity’s role/roster/spelling/public-appearance notes remain before-ready checks, including Shane’s title, Mandie’s spelling/title, Tim’s public listing and Adam’s role. Real headshots, confirmed LinkedIn links and GBP review URL remain outstanding. No Google review link is rendered without the GBP URL.

The pre-existing equipment, cancellation/rate-lock, contact/support, coverage and testimonial permissions remain on the claims sign-off table. The 2006 experience claim is pending Jon’s confirmation. Coverage stays broad and qualified; the legacy marker list is not treated as a current service footprint. No current reviewer, turnaround, text number or representative location is invented.
