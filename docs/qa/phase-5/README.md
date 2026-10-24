# Phase 5: Resources

## Source continuity and scope

SOURCE VERIFIED EDITABLE: `jasonsunburstdodge/Truepay`, reviewed Phase 4 parent `64bf0b029e329da917afd0dcca899231ecb8dfa9`. Read AGENTS.md, design system, site model, build plan, routes, claims, entity and redirects. Claude’s [PR #7 review](https://github.com/jasonsunburstdodge/Truepay/pull/7#issuecomment-6378949702) was read directly. The source was clean before branching; Phase 4 remains the recovery parent. Work is only on `chatgpt/phase-5-resources`, with no merge or deployment.

## Pushed checkpoints

1. `49bc440`: requested review fixes first. Single Holt-only individual-results qualifier; removed the two cautious collection paragraphs; warm two-sentence call invitation; removed collection self-links from cards while retaining archived sources. Optional team polish suppresses repeated contact links on that grid and adds one beneath it; profile links remain.
2. `aa0ebac`: dedicated manifest change: seven planned → draft transitions and guide link-budget reconciliation. Titles, descriptions, H1s, questions and source lists are unchanged. Pricing-model primary CTA is calculator; statement secondary CTA becomes talk-to-person. The exact link-budget instruction takes precedence over the previous duplicate pricing/tool paths. Every guide now has one commercial destination, one calculator/review destination and two siblings; the switching author-profile link remains via its byline.
3. `e61a108`: statement guide and shared typed content/Article foundation; fictional original statement SVG.
4. `ff525e3`: pricing-model guide and code-computed three-volume comparison.
5. `4facb15`: neutral dual-pricing/surcharging/cash-discount guide, with network rules and dated New York/Massachusetts source checks.
6. `111deea`: fee increases, network changes versus processor markup and registered rate-lock scope.
7. `cd179e7`: switching guide with contract, equipment/lease, compatibility, timeline and day-one checklist.
8. `9240c2d`: processing guide and original tap-to-deposit flow.
9. `28fdf3d`: resources hub, source HTTP checks and example-total test.

The final polish and QA checkpoint tightens two-sentence hero summaries, prevents arbitrary guide fields overwriting Article author/publisher references, and records a regression check. All six guides were committed and pushed individually before that final verification.

## What was built

The hub links to all six guides. Typed guide records include manifest title/description, entity author/reviewer slugs, fixed creation/update dates, and primary-source metadata with access dates. Every manifest question is an H2 with a direct answer first. Guide heroes are two sentences and 40–80 words. All copy, sources, diagrams, links and dates are server-rendered.

Guide bylines are shared with the profiles’ authored-guide lists. The reviewer label is **Review assigned to**, with a visible draft note: naming an appropriate reviewer does not pretend that Jon or Shane has already personally reviewed the new draft. Ghostwritten author credits and datePublished identify the draft edition; all remain noindex and require the named people’s approval before ready/live.

Every guide uses exactly one commercial link and one tool link inside main, plus two sibling guides. The shared header/footer/mobile bar remain global navigation and are excluded from this editorial link count. CTA duplication in the guide body is suppressed. Existing manifest-driven RelatedLinks automatically makes the new resource links available on earlier pages. Browser checks verify all built required links and inbound contextual links for every indexable route; noindex thank-you remains reachable only through an acknowledged lead submission.

Every guide includes an honest, specific not-a-fit note. The pricing table, statement SVG and fee-change example are clearly fictional, with assumptions visible. There are no new statistics, typical-savings claims, guaranteed migration timelines or broad compliance claims. Sources are network rules, Federal Reserve, state government/statutes, Authorize.net documentation, Visa developer documentation and Treasury; no competitor blogs are cited. The Treasury funding schedule is explicitly not applied to TruePay.

## Evidence

- lint: PASS; typecheck: PASS; test:foundation: **10/10 PASS**.
- Production and preview Phase 5 QA: **0 FAIL · 41 WARN · 10 INFO (30 pages)**.
- Browser: **60 page/viewport checks**, 14 new-page screenshots at 390px/1440px, 6 actual Article graphs, all built required links, link budgets, bylines/times, 40–80 word answers, question heading scale, review fixes, noindex, SSR, unknown-guide/story 404s and no runtime errors or viewport overflow.
- `source-checks.json`: every cited URL returned HTTP 200 with nonempty content; every guide has at least two verified loading primary sources. Relevant source text was also read via web retrieval. The two state examples are dated October 24, 2026, not a complete legal map or legal clearance.
- `article-schema-checks.json` and each `*-rendered.jsonld`/`*-validator-input.html`: registered author/publisher/worksFor/date bindings checked against actual rendered HTML.
- [External Google Article validator result](schema-validation.md): one valid Article, no critical issues; optional missing image documented.
- `warning-disposition.md`: all 41 warnings individually justified; complete claims sign-off table in `qa-report.md` and the PR.

The original Playwright Chrome download returned a truncated archive in this runtime. Browser verification used Chromium from the npm-distributed `@sparticuz/chromium@153.0.0` package, extracted only to /tmp; package.json and lockfile are unchanged. No browser binary or dependency artifact is committed.

## Before publication

Jon/Shane must approve the draft author credits and complete the assigned review, especially the network/state-law guide; these are not legal credentials. Recheck current rules for each actual location/program. Approve editorial imagery if desired; the missing optional image warning is retained. Confirm existing entity role/roster items and the claim-register sign-off items. Publication remains an owner/reviewer status decision; no route was promoted beyond draft.
