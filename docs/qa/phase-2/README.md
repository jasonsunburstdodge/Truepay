# Phase 2: Pricing and differentiation

Source verified: `jasonsunburstdodge/Truepay`, stacked on `chatgpt/phase-1-conversion` at `6fe2e35a7443fdccf5c4ad4b0d7e1c2d5ae01136`. Read [Claude’s Phase 1 PASS](https://github.com/jasonsunburstdodge/Truepay/pull/4#issuecomment-6373415719), AGENTS.md, site model, design system, Phase 2 plan, route manifest, claims and entity before implementation. Branch: `chatgpt/phase-2-pricing`. No merge or deployment.

## Built

- `/why-truepay/`: seven expanded Commitment cards, each with the registered promise, coverage, exclusions and claim marker. `#fine-print` renders the exact available register scopes. Scope fields that are unanswered questions are explicitly presented as questions for the proposal, not confirmed benefits. All manifest questions and a sourced fit check are included.
- `/pricing/`: direct answer about rates, four source-based rate factors, semantic model comparison table, fair treatment of low-volume flat-rate pricing, Membership/Dual pricing chooser, calculator and review links.
- `/pricing/membership/`: interchange-plus explanation, five registered program claims, coverage links and fee-schedule/proposal guidance. No historical numeric fee schedule has been promoted to current pricing.
- `/pricing/dual-pricing/`: exactly one server-computed checkout example using integer cents: assumed cash price $100.00 + assumed difference $4.00 = displayed card price and receipt $104.00. Explicitly excludes tax, tip, discounts and other charges; it is not a rate quote or calculation of merchant net cost. Covers signage, prompt, receipt, debit/state-law review, fit and a short neutral distinction from surcharge/cash discount. Only the two required dual-pricing claims are rendered here.
- Every new page uses RouteHero/AnswerFirst, manifest questions and metadata, CtaBand and RelatedLinks. All four routes are draft.
- Shared question H2s now use 32–40px. RelatedLinks renders every built manifest destination as a white 24px-radius card row. This automatically adds newly built destinations to home and earlier pages. Home commitment cards now expose `/why-truepay/#fine-print`; home also has an explicit dual-pricing explanation link.
- The manifest-driven pricing dropdown is positioned below its parent without resizing the header and works by hover or keyboard focus. Mobile navigation keeps child links visible when open.

## Evidence and validation

- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm run test:foundation`: 9/9 PASS, including checkout arithmetic/boundaries and the existing real-acknowledgement lead API contract.
- `npm run qa -- --phase 2`: **0 FAIL · 28 WARN · 43 INFO (10 pages)**. See [production report](qa-report.md).
- `npm run qa -- --phase 2 --preview`: **0 FAIL · 28 WARN · 43 INFO (10 pages)**. See [preview report](qa-report-preview.md); preview noindex headers/disallow-all robots remain enforced.
- `CHROME_PATH=/path/to/chromium node --import tsx scripts/qa/phase-2-browser.mjs`: PASS. [Browser results](browser-results.json) cover all ten built pages at 390px/1440px, every built required contextual link, all section-question font sizes, white card rows, literal claim scopes, expanded commitment explanations, example arithmetic, noindex metadata, removed legacy review links, keyboard dropdown/mobile menu, no-JavaScript content and zero runtime errors.
- Eight final full-page screenshots, one per new page at each requested width, are alongside this file. Visually checked navy/gold Inter design, heading contrast, responsive cards and horizontal comparison-table scrolling.
- [Exact rendered promises and full marked text](rendered-claims.md), plus [machine-readable claim capture](rendered-claims.json), include every claim across all built routes, not just Phase 2. Closed disclosure contents are included in full marked text.
- [Every WARN and its disposition](warning-disposition.md). All missing destinations remain planned; all built required links pass browser assertions. Free-review warnings concern the scoped no-charge statement review. The short noindex thank-you description remains the binding manifest wording.

## Source mapping

Retrieved the listed raw sources during implementation, using them as copy evidence only; the claims register overrides their overbroad claims:

- [Dev differentiation](https://truepaydev.wpenginepowered.com/what-makes-us-different/): honesty, monthly choice, disclosed charges and people answering phones.
- [Live homepage, Our Commitment to You](https://gotruepay.com/): registered rate lock, month-to-month, TrueCare and US-based support. Unconfirmed text-line/hours and blanket pricing/legal claims are omitted.
- [Dev pricing](https://truepaydev.wpenginepowered.com/pricing/): four rate factors and flat/tiered/cost-plus structures. Biased superlatives are replaced with conditional comparisons and whole-bill tradeoffs.
- [Dev homepage fit/not-a-fit](https://truepaydev.wpenginepowered.com/): cash/card, margin pressure, cashless, online/subscription and current-cost considerations, rewritten in sentence case without quantified savings.
- [Live Membership](https://gotruepay.com/membership-program/): program framing/terminal/TrueCare. Historical dollar and percentage prices are intentionally omitted pending finance’s current schedule.
- [Live dual-pricing program](https://gotruepay.com/dual-pricing-program/): cash/card structure. The claims register replaces its blanket assertions. The example is expressly hypothetical and computed, as requested; it makes no legal conclusion or actual rate claim.

## Register changes and open questions

`routes.ts` is isolated in its own commit: only four planned → draft transitions. Titles, descriptions, H1s, questions, CTA IDs, links and sources are unchanged. `claims.ts` and `entity.ts` are unchanged. `content/commitments.ts` contains sourced explanatory coverage/exclusions and fit lists; promises still read the register. FitCheck defaults to its existing honest-recommendation line; dual pricing opts out to honor Phase 2’s two-claim limit.

TruePay still needs to confirm the QA sign-off table before launch: especially markup/monthly-fee lock and exceptions, cancellation and equipment-return terms, fee schedule, terminal eligibility/model/ownership, TrueCare coverage/exclusions/timing and dual-pricing structure/debit treatment/disclosures/remaining costs. The inherited contact/support/coverage/testimonial sign-offs also remain open. No claim was approved or expanded. The lead form and API were not changed; missing `LEAD_WEBHOOK_URL` continues to show the phone fallback without fake success.
