# Phase 7 review evidence

QA: 0 FAIL · 48 WARN · 4 INFO (43 pages)

## Baseline and checkpoints

SOURCE VERIFIED EDITABLE: jasonsunburstdodge/Truepay, reviewed Phase 6 commit bfd7532f3cc2e8fd289725026a638a6221dfeb51. Claude’s PASS and three cleanup items were read from PR #9 comment 6387003735 on Oct. 24, 2026. AGENTS.md, the design system, site model, Phase 7 build plan and content registers governed this branch. The original baseline remains on chatgpt/phase-6-industries; no merge or deployment was performed.

- f3e8a11: first commit, Phase 6 review fixes. Solution headings/eyebrows now describe the actual system task. The duplicate gate also checks every main H2 and editorial eyebrow at any length. Other existing template labels were made specific so that this stricter rule passes sitewide. Role metadata remains a factual role label, outside editorial eyebrows.
- d6e2368: partner page, residual model, 50%/20% path values from the claim register and shared validated opportunity intake.
- 7b45398: separate careers metadata correction, removing the implication of verified job vacancies.
- 6979f8e: careers general interest page, without current job listings or JobPosting markup.
- fd41f45: published privacy text migrated, plus current website-form handling.
- d986dbb: drafted website terms; both legal routes explicitly require counsel review.
- 4148796: policy fidelity test, source snapshots, browser checks and contextual terms/team links.
- 9d2f613: remove redundant SkyTab prompt repeated inside the POS answers.

Each new page was committed and pushed separately. All four new routes remain draft, noindex and outside the live sitemap.

## Checks

- npm run lint: PASS, no ESLint warnings.
- npm run typecheck: PASS.
- npm run test:foundation: PASS, 21 tests.
- npm run qa -- --phase 7: PASS, production report retained here.
- npm run qa -- --phase 7 --preview: PASS, separate preview report.
- Browser: 86 route/viewport checks, no overflow or runtime errors, exact manifest metadata/H1/questions/links, unknown-story/industry 404s and legacy partner/career redirects.
- Originality: no repeated body sentence over eight words, no duplicated H2/eyebrow at any length and all 28 industry pairs within the one-sentence limit. Only verbatim quotes and shared commitment fine print are excluded.
- AP: rendered main outside quotes has no em dash, en dash or ampersand. New and migrated dates use AP month formatting. Entity biographies and verbatim quotes retain their approved words; only job-title ampersands were changed.
- Estimator: single-account values are server-rendered as $250/$100 at $50,000 volume and 1% margin. The editable 1% default is the lower bound of the registered draft’s 1%-1.75% assumption; the editable 2% attrition is an assumed model input, not a retention statistic. The claim register owns the machine-readable share/default values.
- The model applies attrition to prior cohorts, then adds new full-month accounts. It starts from no existing portfolio, keeps volume/margin fixed and rounds only for display. Independent closed-form tests verify cohorts, cumulative payouts, zero/100% attrition, edited margin, no accounts and invalid inputs. Totals sit with the assumptions/disclaimer, never as an earnings headline.
- Browser edits verify $875/$350 single-account results at $100,000 and 1.75%; two referral accounts/month at zero attrition produce $8,400 in month 12 and $54,600 total. At 100% attrition the same scenario produces $700/month and $8,400 total. Invalid inputs show no numerical estimate.
- Forms: partner and careers are validated form types in the Phase 1 pipeline. Partner includes a validated path selection; optional work/business background does not block an introduction. Consent, honeypot, limits, origin checks, timeout and acknowledgement requirements remain. No resume or statement upload was added.
- Browser confirms both forms return 503/phone fallback with no webhook, set no receipt cookie and do not redirect. Unit tests also check real acknowledgement, forwarding the proper form type/path, rejected consent and delivery failures using a mock intake, never real client messages.
- Opportunity success uses the existing thank-you page with a form-type cookie containing no personal data. Analytics adds partner_apply/careers_apply without field values.

See [production QA](qa-report.md), [preview QA](qa-report-preview.md), [all warning dispositions](warning-disposition.md), [browser checks](browser-results.json), [originality checks](originality-results.json), [estimator edits](estimator-browser-results.json), [form fallbacks](form-browser-results.json) and [source loads](source-checks.json).

## Source and legal review

The live privacy policy, live careers page, dev work-with-us page, TruePay training site and referral page returned HTTP 200. The live/dev career descriptions lack current dated requisitions, so this build solicits general interest rather than treating the old sales/support descriptions as verified vacancies. No salary, hiring timing or HR role was invented.

The privacy snapshot is the published July 16, 2024 policy retrieved Oct. 24, 2026. Its seven sections and all substantive paragraphs are preserved with AP punctuation and sentence-case headings. A migration test compares word-for-word against the captured source after ignoring punctuation; contact fields match entity. The new section describes the actual form fields, intake delivery, absence of file uploads, session campaign tags, calculator/event data and five-minute confirmation cookies.

**Legal review is required before launch for both /privacy-policy/ and /terms/.** The legacy SMS paragraph broadly treats phone provision as consent. It is retained as published, with a nearby clarification and the new website-forms section limiting website contact permission to responding to the request, not promotional SMS enrollment. Counsel must approve this reconciliation and the actual SMS program, intake processors, retention and rights-handling procedures. No retention period, data residency, vendor certification or statutory compliance promise was invented. The terms are a new website/calculator draft, not supplied counsel-approved merchant or partner terms. The QA sign-off table explicitly includes both legal drafts.

Jon/finance and counsel must confirm partner splits, applicable profit, margin assumptions and payout conditions. The separate up-to-$1,000 referral offer is marked with referral-reward, is not added to residual estimates and is not represented as automatically combinable with a residual agreement. Training links use entity.externalLinks.training; unsupported training-site statistics and its conflicting roster were not imported.

## Screenshots

Full-page captures were visually reviewed. No new photography was used.

| Route | 390px | 1440px |
| --- | --- | --- |
| /partners/ | [Mobile](partners-390.jpg) | [Desktop](partners-1440.jpg) |
| /careers/ | [Mobile](careers-390.jpg) | [Desktop](careers-1440.jpg) |
| /privacy-policy/ | [Mobile](privacy-policy-390.jpg) | [Desktop](privacy-policy-1440.jpg) |
| /terms/ | [Mobile](terms-390.jpg) | [Desktop](terms-1440.jpg) |

Phase 6 solution review fixes: [390px](solution-review-fixes-390.jpg), [1440px](solution-review-fixes-1440.jpg).

## Open owner questions

1. Jon/finance: confirm the 50%/20% shares, applicable-profit definition, margin assumptions, residual rights and separate referral reward trigger/timing. Counsel must review earnings language.
2. Counsel/operations: approve both legal drafts, particularly the legacy SMS/new-form distinction, intake vendor disclosure, retention and rights request handling.
3. Which employment vacancies, if any, have current descriptions, dates and application instructions? None is asserted here.
4. Confirm the remaining prelaunch claim-register items and guide author approvals in the QA sign-off table. Four INFO items remain deliberately omitted unconfirmed review turnaround, support hours/text line or Jon’s 2006 date living on his profile instead of about.
