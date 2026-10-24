# Phase 6 review evidence

QA: 0 FAIL · 43 WARN · 10 INFO (39 pages)

- `npm run lint`: PASS, no ESLint warnings.
- `npm run typecheck`: PASS.
- `npm run test:foundation`: PASS, 14 tests.
- `npm run qa -- --phase 6`: PASS; production report saved here.
- `npm run qa -- --phase 6 --preview`: PASS; preview noindex/robots report saved separately.
- Browser: PASS, 78 route/viewport checks, no overflow or runtime errors; 20 full-page screenshots.
- Originality: no duplicate body sentence over eight words across 39 pages; all 28 industry pairs pass the stricter one-sentence limit. Only verbatim quotes and shared commitment fine print are exempt.
- Rendered main content passes AP dash checks outside blockquotes. Banned filler and duplicate CTA headlines fail the regular QA gate. Unit tests exercise each new rule.
- Seven linked manufacturer/government sources returned HTTP 200. Source checks retain the URL and final response. Approved product scope remains bounded by the reviewed solutions register and design PDF pages 10-13.

## Scope and editorial decisions

Nine draft routes use the existing navy, gold, Inter and white-card system. Each industry has five manifest questions, two solution recommendations and its own workflow, pricing tradeoffs, setup steps and support questions. No industry attribution was invented for existing customer reviews, so the new pages have no testimonials. Medical/dental makes no HIPAA promise; nonprofits has no special-pricing claim.

The first checkpoint fixes Phase 5 author display. No guide has reviewedAt, so none renders Reviewed by. Written by and AP-formatted publication/update dates remain visible. Dates are draft edition dates, not evidence of human approval. Every named author must read and approve their guide before launch. Short guide heroes precede the byline; the detailed 40-80 word answer-first block starts the body before the first H2. This implements the client's explicit hero instruction while preserving the answer-first reading order.

Separate commits contain manifest questions, the AP sweep and the specificity/duplicate-copy sweep. Each industry page was committed and pushed individually. Earlier pages now expose the newly built manifest links. Existing shared forms, calculator explanations, claim cards and solution support copy were rewritten with their page's task to satisfy the sitewide duplicate gate without exempting those modules.

Product names and bounded features come from approved sources; workflow recommendations describe what to test, not promises of universal compatibility. Cards retain warm promises while shared commitment scope remains in fine print. No entity facts or verbatim quotes changed.

See [all warning dispositions](warning-disposition.md), [production QA](qa-report.md), [preview QA](qa-report-preview.md), [browser results](browser-results.json), [originality results](originality-results.json), [industry checks](industry-checks.json), [guide review fixes](guide-review-fixes.json) and [source checks](source-checks.json).

## Screenshots

Full-page captures were visually reviewed at both widths. No third-party or generated photography was added.

| Route | Mobile | Desktop |
| --- | --- | --- |
| /industries/ | [390px](industries-390.jpg) | [1440px](industries-1440.jpg) |
| /industries/restaurants/ | [390px](restaurants-390.jpg) | [1440px](restaurants-1440.jpg) |
| /industries/retail/ | [390px](retail-390.jpg) | [1440px](retail-1440.jpg) |
| /industries/salons-spas/ | [390px](salons-spas-390.jpg) | [1440px](salons-spas-1440.jpg) |
| /industries/medical-dental/ | [390px](medical-dental-390.jpg) | [1440px](medical-dental-1440.jpg) |
| /industries/home-services/ | [390px](home-services-390.jpg) | [1440px](home-services-1440.jpg) |
| /industries/auto-services/ | [390px](auto-services-390.jpg) | [1440px](auto-services-1440.jpg) |
| /industries/professional-services/ | [390px](professional-services-390.jpg) | [1440px](professional-services-1440.jpg) |
| /industries/nonprofits/ | [390px](nonprofits-390.jpg) | [1440px](nonprofits-1440.jpg) |

Additional Phase 5 fix samples: [guide 390px](guide-authorship-390.jpg), [guide 1440px](guide-authorship-1440.jpg).

## Owner questions before launch

- Jon/finance: confirm the Membership markup, listed fees and rate-lock scope in the QA sign-off table.
- Operations: confirm equipment availability, installation coverage and written support/TrueCare terms for each actual business.
- Jon and Shane: personally read and approve the named guides. A reviewer must actually review before reviewedAt is set.
- Confirm Mandie's approved biography's absolute wording. No replacement fact was invented.
- Confirm the remaining claim-register items in the QA sign-off table; draft route status does not approve them for launch.
