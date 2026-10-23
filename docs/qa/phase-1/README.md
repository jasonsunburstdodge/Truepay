# Phase 1: Conversion and help core

Editable source verified: `jasonsunburstdodge/Truepay`, stacked on `chatgpt/phase-0-foundation` at `8e6e595e9514d6f4646011b955077d9dec863a00`. [Claude’s Phase 0 PASS](https://github.com/jasonsunburstdodge/Truepay/pull/3#issuecomment-6372836182) and its three follow-up items were read before implementation. The requested branch is `chatgpt/phase-1-conversion`; no merge or deployment was performed.

## Scope

- `/statement-review/`: manifest metadata/H1/questions, direct answer, review deliverables, four-step process, contact-only intake, privacy guidance, M. Holt’s verbatim attributed quote and working request form. Reviewer identity and turnaround remain unspecified until confirmed; no PersonCard asserts unverified review ownership.
- `/effective-rate-calculator/`: live calculator, accessible invalid-input feedback, server-rendered formula/example, questions and review CTA. The explicitly optional “typical effective rate” question was removed from the manifest because no supported range exists in the supplied sources.
- `/support/`: published phone/email, what to have ready and support questions. No sales form, unconfirmed support hours/text number or unverified portal link.
- `/contact/`: reason selector routes existing merchants to support and offers a call for partners until that page is built. Includes the contact form, NAP, registered draft office-hours/follow-up claims and required contextual links.
- `/thank-you/`: noindex confirmation after acknowledged delivery, with no personal data in the URL. A short-lived HttpOnly SameSite receipt cookie selects delivered-request copy. Direct visits show neutral instructions rather than claiming a new submission succeeded. It does not confirm receipt of a statement file.
- Shared RouteHero uses manifest metadata, H1, CTAs and linked JSON-LD, plus Breadcrumbs and AnswerFirst. All new routes are `draft`; no route was promoted to ready/live.

The partner-page design remains unchanged: navy/gold, gradient/arcs, Inter, white rounded cards and cool bands. The wordmark now has a literal space and visible CSS spacing between **True** (800) and **pay** (300); the SVG treatment also has a gap. Testimonial links are suppressed until `/customer-stories/` is built. The original source URLs remain in the entity register for provenance. Homepage and new-page links resolve to built manifest routes; planned destinations are not rendered.

## Lead delivery and analytics

`LEAD_WEBHOOK_URL` is server-only. The API validates every field, requires explicit consent, rejects the honeypot, bounds request size, checks the origin and applies basic per-process rate limiting. It posts only the allowed fields as JSON; no personal data is logged. Requests time out, redirects are rejected and non-success responses do not trigger a confirmation. Use HTTPS for the operational webhook; HTTP loopback is allowed for local integration tests.

The API returns 503 when configuration is missing and 502 when delivery fails. Both forms show “Something went wrong. Please call 888-792-0284” and stay on the form. Only a successful webhook acknowledgement issues the receipt and permits client navigation to `/thank-you/`. No upload is present.

Five GA4 events are available through `NEXT_PUBLIC_GA_ID`: review_submit, contact_submit, call_click, text_click and calculator_complete. With no ID, analytics is a no-op. Events do not contain form values, financial inputs or query strings; automatic page views are disabled. Allowed UTM fields persist in session storage across the homepage-to-form journey and are delivered with the consented lead; other query parameters are ignored.

The limiter is deliberately basic and local to each server process. Deployment must supply trustworthy forwarded-IP headers and, if multiple instances are used, a shared/edge limiter. The actual CRM/webhook and GA property still need configuration.

## Verification

- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm run test:foundation`: **8 tests PASS**. Retains Phase 0 checks and adds payload/consent/honeypot/bounds validation, delivery acknowledgement/failure, origin/proxy handling, limiter expiry, analytics privacy and UTM persistence.
- `npm run qa -- --phase 1`: **QA: 0 FAIL · 21 WARN · 45 INFO  (6 pages)**.
- `npm run qa -- --phase 1 --preview`: **0 FAIL**, same WARN/INFO counts, including preview noindex headers and disallow-all robots. All draft pages stay out of the sitemap.
- `CHROME_PATH=/path/to/chromium npm run qa:browser`: all six pages checked at 390px and 1440px. Checks include exact manifest text/schema, contextual links, no overflow, server-rendered content, wordmark gap/weights, removed quote links, menu keyboard use, calculator validation/arithmetic, reason routing, consent, honeypot, rate limiting, successful and failed delivery, missing configuration, receipt-based thank-you copy and no runtime errors.

The browser integration starts its own local webhook and two actual Next servers: one configured and one without a webhook. It delivers review and contact requests at both widths (four successes), checks the captured body, then verifies 502, 503 and 429 responses. The captured fictitious request is in [lead-webhook-example.json](lead-webhook-example.json); no real customer information or webhook secret is included.

Source mapping for the four-step review: manifest-listed dev pricing source (“send statement / break down charges / compare models / decide”) and the existing page brief. The first step was adapted to require an approved intake method before sharing a statement. Registered claims and entity data remain authoritative.

## Register changes and open items

`routes.ts` is isolated in its own commit: five planned → draft changes and removal of the unsourced typical-rate question. Titles, descriptions, H1s, CTA ids, source lists and required links are unchanged. `claims.ts` and `entity.ts` are unchanged.

Before approval/launch, TruePay must confirm the ten claims listed in the QA sign-off table, especially rate-lock scope, remaining dual-pricing costs, current coverage, office hours, follow-up timing and permission/context for M. Holt. Support hours, text number, portal, review owner, delivery time and secure statement intake remain unconfirmed and are not promised. Configure the real lead destination and analytics property, and approve final consent/privacy handling.

The thank-you description is intentionally kept exactly as the binding manifest provides it, despite the automated short-description warning. Missing links point only to planned later-phase pages and should be added as those routes ship. The free-review warnings refer to the scoped no-charge statement-review offer; no equipment or savings guarantee is implied.

## Screenshots

| Page | 390px | 1440px |
| --- | --- | --- |
| Statement review | [Mobile](statement-review-390.jpg) | [Desktop](statement-review-1440.jpg) |
| Calculator | [Mobile](effective-rate-calculator-390.jpg) | [Desktop](effective-rate-calculator-1440.jpg) |
| Support | [Mobile](support-390.jpg) | [Desktop](support-1440.jpg) |
| Contact | [Mobile](contact-390.jpg) | [Desktop](contact-1440.jpg) |
| Thank you after delivery | [Mobile](thank-you-390.jpg) | [Desktop](thank-you-1440.jpg) |
| Updated homepage | [Mobile](home-390.jpg) | [Desktop](home-1440.jpg) |
