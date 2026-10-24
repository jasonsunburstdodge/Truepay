# Phase 3: Solutions

## Source continuity

SOURCE VERIFIED EDITABLE: `jasonsunburstdodge/Truepay`, branch `chatgpt/phase-3-solutions`, stacked on `chatgpt/phase-2-pricing` at `c3a5a07e427534c73eca710491cc6da97dffa8f7`. Both remote branches pointed to that same commit before implementation; there were no existing Phase 3 changes to overwrite. That parent remains the recovery point. [Claude’s Phase 2 PASS and voice notes](https://github.com/jasonsunburstdodge/Truepay/pull/5#issuecomment-6373838671) were read along with AGENTS.md, design system, site model, build plan, routes, claims, entity and redirect map. No merge, deployment or claim approval was performed.

The live product pages, route-listed dev pages and supplied [approved design PDF](https://drive.google.com/file/d/1nnLhjNRNYlyB0YqmLF4b835Zm5clYwbr/view) were inspected in this conversation. The PDF’s POS sequence and pages 10–13 were checked directly through the connected Drive source. Product facts remain limited to those sources. No manufacturer artwork license was assumed: no product images were added.

## Built

- `/solutions/`: counter/table/field/online/invoice/keep-my-POS chooser linking to all six children; POS versus terminal explanation; setup, pricing and review links.
- `/solutions/point-of-sale/`: Clover, SkyTab, Paradise POS, MobileBytes, SkyTab Mobile and SkyTab Glass comparison, workflow/fit, all manifest questions and the six-step POS setup sequence. Registered `setup-training` wording remains pending operations sign-off.
- `/solutions/terminals/`: one comparison across VL100, VL110, VL500, Dejavoo QD4 and Clover Flex. Device-level features come from the approved PDF, page 11. Names for incoming Clover Mini and Station Duo URLs are also retained, with a POS link. Included-terminal/TrueCare promises read the register and link to the central equipment scope.
- `/solutions/mobile-payments/`: portable VL500/Flex and Valor Pay app options, connectivity/receipt questions and an explicit RCKT mobile POS reference for its redirected URL. No phone-only acceptance, offline authorization or RCKT feature spec is inferred.
- `/solutions/online-payments/`: Authorize.net/eProcessing Network choices, website/setup/whole-cost questions and billing/pricing links. Shared source reporting/accounting themes are not assigned as universal per-gateway features.
- `/solutions/integrations/`: version/gateway/processor checklist and systems named in the route’s sources. The table is a discussion list, not a universal compatibility matrix. No unsupported POS compatibility list or savings result is asserted.
- `/solutions/billing-software/`: Biller Genie/MantaPay comparison, invoice/payment/reconciliation workflow, QuickBooks edition/version and scheduling questions. ACH, plan-specific scheduling and current dollar fees are not invented.

All six child pages use one server-rendered SolutionPage with manifest metadata/H1/questions/CTAs, AnswerFirst, fit/tradeoff, day-to-day workflow, a real comparison table, source links, setup, help/support, RelatedLinks and CtaBand. Every table visibly states **Ask us to confirm availability for your business.** It also appears in each caption. Tables scroll within their regions on mobile rather than stretching the viewport.

## Phase 2 voice and contextual links

Commitment cards now show the registered promise and one plain link. Coverage, exclusions and every literal available register scope live together at `/why-truepay/#fine-print`; the written-terms invitation appears once there. No pending scope question was turned into a confirmed benefit. Shorter cards also apply on home and Membership.

Every built page now has two short hero sentences, including all four Phase 2 pages and both conditional thank-you states. The detailed answers remain in body Q&A, comparisons and fine print. Hero length follows the user/reviewer voice correction over the older 40–80-word module guideline.

RelatedLinks automatically exposes every newly built required destination on home, Membership and all other built pages. Homepage payment cards now link directly to terminal/POS/mobile/online choices. The solutions hub links all children and every child links back to it. No required built destination is missing, and no solution is an orphan.

## Validation

- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm run test:foundation`: 9/9 PASS, including lead-delivery failure/acknowledgement contracts and the unchanged dual-pricing checkout arithmetic.
- `npm run qa -- --phase 3`: **0 FAIL · 41 WARN · 20 INFO (17 pages)**. [Production report](qa-report.md).
- `npm run qa -- --phase 3 --preview`: **0 FAIL · 41 WARN · 20 INFO (17 pages)**. [Preview report](qa-report-preview.md), including noindex headers and disallow-all robots.
- `CHROME_PATH=/path/to/chromium node --import tsx scripts/qa/phase-3-browser.mjs`: PASS. [Browser results](browser-results.json) cover 34 page/viewport checks, all 22 solution redirects (one 308 hop to a 200), product-name retention, no orphans, every built required link, two-sentence heroes, 32–40px question headings, central scope, source rows, keyboard/mobile navigation, no-JS content and zero runtime errors.
- Sixteen full-page JPEGs: each new page at 390px/1440px, plus the revised Why TruePay page at both widths. All were visually inspected for the partner-page design, cards, typography, tables and responsive layout.
- [Every WARN and disposition](warning-disposition.md), [product/source inventory](source-inventory.md), [rendered claims](rendered-claims.json). All claims still need the sign-offs reported by QA; none was promoted.

A stale generated Turbopack cache initially failed the build. Moving that generated directory aside and rebuilding resolved it; all final checks above pass. No source workaround or dependency change was introduced.

## Register changes and open questions

`routes.ts` has a separate commit containing only seven planned → draft transitions. Manifest titles, H1s, descriptions, questions, CTAs, links and sources remain unchanged. `claims.ts`, `entity.ts` and `redirects.ts` are unchanged. `content/solutions.ts` holds the sourced option inventory and customer-facing explanatory copy. `content/commitments.ts` simplifies explanations without changing registered promise wording; those explanations now render only in fine print.

Before ready/live, TruePay must confirm current device/system availability, exact model/connectivity (the PDF and old VL110 page differ), product/plan features, software versions, QuickBooks/ACH/scheduling scope, current pricing and support/installation arrangements. The six-step POS process is a draft operations commitment, not a promise of on-site installation everywhere or immediate availability. No universal offline, security-certification, compatibility or savings claim was added. Existing rate-lock, cancellation, equipment, support/contact and testimonial sign-offs remain open in the QA table.

The three redirect-link warnings are source citations to the historically published SkyTab Mobile, SkyTab Glass and Valor Pay app pages, not navigation CTAs. Their destination pages now name the products and the source inventory preserves the original references. They are explicitly justified in the PR. Other missing links are later-phase planned pages; the no-charge review caution and short noindex thank-you description retain the Phase 2 review’s accepted scope.
