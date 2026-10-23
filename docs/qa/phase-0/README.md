# Phase 0 review evidence

Source: `jasonsunburstdodge/Truepay`, base `claude/truepay-site-model` at `91f648ad6cc7c6808c7231fb47c3b9b2e56a42c6`. The editable source and phase scope were verified before implementation. The base remains recoverable; no deployment or route promotion was performed.

## Implemented

- Homepage and real 404 page; shared AnswerFirst, Breadcrumbs, QuestionSection, FitCheck, Commitment, PersonCard, ProofQuote, ComparisonTable, CtaBand, AuthorBox, Sources and RelatedLinks modules.
- Binding navy/gold design tokens, Inter variable font self-hosted through `next/font/local`, gold shield and wordmark, gradient/arcs, white cards, responsive navigation and mobile contact bar.
- Manifest-based metadata, schema graph, navigation, sitemap, robots and permanent migration redirects. Planned destinations remain unbuilt; no placeholder pages were introduced.
- Entity consolidation: removed the duplicate site configuration, retained its coverage list only as reconciliation evidence, and removed the unsupported aggregate savings interpretation. Reviews use the canonical entity file verbatim.
- Calculator preview retains real initial server-rendered arithmetic, input validation and live updates. Review form retained; until Phase 1 provides verified delivery, the endpoint returns 503 and the form gives a phone fallback. No contact details are logged, and no successful delivery is simulated.

## Checks

`npm run lint`, `npm run typecheck`, and `npm run test:foundation` pass. The latter covers metadata/status/environment isolation, schema references, canonical breadcrumb paths, planned-route navigation and banned-claim rejection.

`npm run qa -- --phase 0` and `npm run qa -- --phase 0 --preview` both report:

**QA: 0 FAIL · 10 WARN · 46 INFO  (1 pages)**

The preview run additionally verifies the noindex response header. Preview robots disallows all crawling. Production robots allows crawling, but the draft homepage stays noindex and the sitemap excludes it. Every mapped migration source returns its single 308; later-phase destinations are reported as unbuilt INFO. Unknown URLs return 404.

`CHROME_PATH=/path/to/chromium npm run qa:browser` passes at 390px and 1440px: no horizontal overflow, Inter, server-rendered answers/questions, linked schema, keyboard menu opening/Tab/Escape/focus return, calculator validation and arithmetic, safe form failure, mobile CTA not covering focused form fields, and actual 404 responses. Use `npx playwright install chromium` if no browser is available. `QA_BASE` can target an already running production build instead.

Mobile Lighthouse: **98 Performance · 100 Accessibility · 100 Best Practices · 66 SEO**. The only failed SEO audit is `is-crawlable`, because `/` must remain `draft` and `noindex` under AGENTS.md. SEO is **100** in the separately labeled diagnostic excluding that one audit. The raw 66 is preserved; the indexing restriction was never removed. This is an acceptance-criteria conflict for the reviewer, not a claim that raw Lighthouse SEO met 90. Recheck the full score after reviewer approval and launch authorization.

The Lighthouse HTML reports are gzip-compressed; decompress with `gzip -dc <file.html.gz> > report.html`. The JSON preserves the raw scores/audit details but omits embedded screenshot data; viewport captures are supplied separately. Browser tests emit both raw and diagnostic reports.

## Complete WARN disposition

| WARN | Disposition |
| --- | --- |
| 7 occurrences of “free” | Kept: manifest-prescribed statement-review offer and CTA. The review section states there is no charge; no equipment or savings promise is implied. |
| Missing contextual `/why-truepay/` link | Deferred to Phase 2; route is planned. Commitment scope is available in the homepage disclosures; no broken link is published. |
| Missing contextual `/pricing/` link | Deferred to Phase 2; route is planned. |
| Missing contextual `/pricing/dual-pricing/` link | Deferred to Phase 2; homepage has the scoped fit discussion. |
| Missing contextual `/solutions/` link | Deferred to Phase 3; homepage offers phone conversations for each payment context. |
| Missing contextual `/industries/` link | Deferred to Phase 6; route is planned. |
| Missing contextual `/customer-stories/` link | Deferred to Phase 4; published quotes and original-source citations are present. |
| Missing contextual `/about/team/` link | Deferred to Phase 4; real entity bios are present, without links to unbuilt profiles. |
| Missing contextual `/effective-rate-calculator/` link | Deferred to Phase 1; working calculator is at `/#calculator`. |
| Original review citation `/reviews/` redirects | Kept: this is the absolute, original public source from `entity.testimonials`, not a new local page link. QA treats same-domain absolute citations as local migration links. The migrated collection is Phase 4. |

## Content-register changes

`routes.ts`, `claims.ts` and `redirects.ts` are unchanged. `/` was already `draft` on the base branch. No route is marked ready or live.

`entity.ts` has its own commit. It consolidates existing coverage provenance without publishing the unverified count, and points Organization.logo to the code-native shield/wordmark asset specified by the binding design system. The two supplied raster files are not present in the repository; the square-logo reference remains unused. Canonical bios and testimonials are unchanged apart from formatting. Pending photos and profile links are omitted until available/built.

The QA launcher uses `node --import tsx` to avoid a CLI IPC socket dependency, binds explicitly to 127.0.0.1, bounds startup fetches, and starts Next directly so it can clean up its child process. Preview builds now use preview SITE_ENV, rather than building as production and only changing the server environment. The existing checks were retained; the preview header check was added.

## Open questions for TruePay and reviewer

- Confirm rate-lock scope (markup and monthly fees), exceptions, and written terms; confirm cancellation fees and equipment returns.
- Confirm remaining dual-pricing costs, coverage, Jon’s preferred public name and Shane’s title. Supply original headshots; no invented portraits or initials were used.
- Provide the Phase 1 lead destination and secure intake process. No upload or turnaround promise is present.
- Confirm the code-native shield/wordmark treatment or supply final artwork matching the chosen navy/gold design.
- Reviewer: accept the documented draft noindex exception to the raw Lighthouse SEO threshold, then recheck full crawlability when launch is authorized. Keep the route draft during this review.

## Screenshots

| Page | Mobile | Desktop |
| --- | --- | --- |
| Homepage | [390px](home-390.jpg) | [1440px](home-1440.jpg) |
| 404 | [390px](not-found-390.jpg) | [1440px](not-found-1440.jpg) |

The complete sign-off table is in [production QA](qa-production.md) and [preview QA](qa-preview.md).
