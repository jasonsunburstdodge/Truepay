# ChatGPT build plan for gotruepay.com

How to use this: give ChatGPT (Codex, connected to GitHub `jasonsunburstdodge/Truepay`) one phase at a time. Start each phase with the **kickoff block** below plus that phase's prompt. When ChatGPT opens the pull request, send the PR link to Claude with "review phase N". Claude pulls the branch, runs QA, reads the diff and the copy, and replies with one of two things:

- **PASS:** you merge the PR and Claude moves the reviewed routes to `ready`.
- **FIX LIST:** a ready-to-paste prompt for ChatGPT.

Nothing launches until Phase 8 passes and Jon has signed off the claims list.

If you use ChatGPT without repo access, paste the kickoff block and the phase prompt, attach `AGENTS.md`, `docs/site-model.md` and the `src/content/*.ts` files, and ask for complete files rather than snippets.

---

## Kickoff block (paste at the top of every phase)

```
You are building gotruepay.com for TruePay in the GitHub repo jasonsunburstdodge/Truepay
(Next.js App Router, TypeScript, Tailwind v4). Before writing code, read AGENTS.md,
docs/site-model.md, src/content/routes.ts, src/content/claims.ts and src/content/entity.ts.
Those files are binding. Branch from the default branch as phase-<n>-<short-name>.
Build only what this phase asks. When done: run npm run lint, npm run typecheck and
npm run qa -- --phase <n>; fix every FAIL; fix or justify every WARN; then open a PR
using the format in AGENTS.md. Do not invent facts, numbers, people, reviews or features.
If a fact you need is missing, leave that module out and list it under "Open questions".
```

---

## Phase 0: Foundation and homepage

```
PHASE 0 — Foundation and homepage.

Goal: turn the existing homepage build into a site framework driven by src/content/*,
with technical SEO, schema and the shared modules every later page uses.

1. Design + fonts: implement docs/design-system.md (Jason's ChatGPT partner-page look)
   as the tokens in src/app/globals.css. Remove Fraunces entirely. Self-host Inter with
   next/font/local and @fontsource-variable/inter (builds must not need Google Fonts).
2. Config: next.config.ts → trailingSlash: true; redirects() built from
   src/content/redirects.ts (permanent: true); headers() adds
   "X-Robots-Tag: noindex, nofollow" to every response when process.env.SITE_ENV !== "production".
3. Entity: merge src/lib/site-config.ts into src/content/entity.ts and delete site-config.ts.
   Update all imports. Testimonials must come from entity.testimonials (verbatim).
4. SEO library (src/lib/seo.ts): buildMetadata(path) reads routes.ts and returns
   title, description, alternates.canonical (https://gotruepay.com + path),
   robots (noindex when SITE_ENV !== "production" OR status is draft/planned OR
   !indexable), openGraph (title, description, url, siteName "TruePay", type, locale en_US,
   images: a 1200×630 og image), twitter card. Set metadataBase once in the root layout.
5. Schema library (src/lib/schema.ts) + <JsonLd> server component:
   organizationNode (@id https://gotruepay.com/#organization, name, alternateName
   "TruePay Payment Solutions", url, logo, telephone, email, address, foundingDate,
   founder → #person of Jon, sameAs from entity.sameAs, contactPoint sales + customer support),
   websiteNode (#website, publisher → #organization), webPageNode(route) with the right type
   per template (see site-model §10), breadcrumbNode(path) from breadcrumbTrail(),
   serviceNode(route), personNode(person), articleNode(route, author, dates).
   Organization + WebSite render in the root layout; page nodes render per page and
   reference ids instead of repeating facts. Never output Review, AggregateRating,
   FAQPage or HowTo.
6. app/sitemap.ts from sitemapRoutes() with lastModified; app/robots.ts: production
   allows all + "Sitemap: https://gotruepay.com/sitemap.xml"; non-production
   "Disallow: /". app/not-found.tsx: real 404 with links to /, /pricing/,
   /statement-review/, /contact/.
7. Navigation: header and footer built from primaryNav/utilityNav in routes.ts,
   showing ONLY routes whose status is not "planned" (no links to unbuilt pages).
   Full keyboard- and screen-reader-friendly mobile menu. Header keeps the phone
   number and the "Get my free statement review" button (data-cta="statement-review").
   Footer: NAP from entity (888-792-0284, 200 Monarch Ln, Josephine, TX 75173,
   support@gotruepay.com), social links, Privacy and Terms (when built), copyright.
   Add a "Skip to content" link.
8. Shared modules in src/components/modules/ exactly as specified in site-model §5:
   AnswerFirst, Breadcrumbs (visible + JSON-LD), QuestionSection, FitCheck, Commitment,
   PersonCard, ProofQuote, ComparisonTable, CtaBand, AuthorBox, Sources, RelatedLinks,
   honoring every data-* contract.
9. Homepage (/): rebuild in the order given in the "/" route notes in routes.ts, using
   the modules. Title, description and H1 come from the manifest. Hero: H1 "Payments
   without the games." with an AnswerFirst line explaining who TruePay is in one or
   two sentences, two CTAs (statement-review, talk-to-person). Use the dev site's
   fit / not-a-fit dual pricing content via FitCheck, rewritten in sentence case and
   using claims dual-pricing-cost and honest-recommendation (no "eliminates this
   expense entirely", no "2–4%"). Commitments strip uses claims rate-lock,
   month-to-month, us-support (data-claim), linking to /why-truepay/#fine-print
   only once that page exists. The "30+ states" line becomes claim "coverage".
   Answer each of the four homepage questions in visible headings or text.
   Remove the R. Moore expanded quote everywhere; use only published quotes.
   Keep the calculator preview and the review form.
10. Set "/" status to "draft" in routes.ts (it stays noindex until the reviewer
   approves it).

Acceptance: npm run qa -- --phase 0 shows 0 FAIL. The root layout outputs valid
Organization + WebSite JSON-LD. Redirect checks pass (308 to the mapped destination).
robots.txt and sitemap.xml behave per environment. Lighthouse mobile on / is
≥ 90 for SEO, Accessibility and Best Practices.
```

## Phase 1: Conversion and help core

```
PHASE 1 — Conversion and help core: /statement-review/, /effective-rate-calculator/,
/support/, /contact/, /thank-you/, and the lead pipeline.

1. Lead pipeline: replace src/app/api/lead/route.ts with server-side validation
   (zod or equivalent), a honeypot field, basic rate limiting, consent checkbox text,
   and delivery to process.env.LEAD_WEBHOOK_URL (POST JSON: form type, name, business,
   email, phone, industry, message, page path, UTM params). If LEAD_WEBHOOK_URL is
   unset or delivery fails, the form shows "Something went wrong. Please call
   888-792-0284" and never a fake success. On success, route to /thank-you/
   (noindex, no personal data in the URL). No file upload yet: the review page
   explains how to send a statement once intake is confirmed (claim review-turnaround
   stays pending).
2. /statement-review/: AnswerFirst; "What you'll get" (line-by-line explanation,
   effective rate, side-by-side comparison, honest recommendation, from pdf:p17
   via the brief); the 4-step process from the dev site /pricing/ section, rewritten;
   who reviews it (PersonCard, only confirmed people); privacy note; the form;
   QuestionSection for the manifest questions; ProofQuote (M. Holt via claim
   holt-quote, labeled as one customer's experience).
3. /effective-rate-calculator/: move the calculator to its own page. Validate
   empty/zero/negative inputs with accessible error text. Render the formula
   (total fees ÷ total card sales × 100) and one worked example as HTML text.
   Answer "What is a typical effective rate?" only with a sourced range; otherwise
   drop that question from routes.ts in its own commit and say so in the PR.
   Fire a calculator_complete analytics event (no values sent).
4. /support/: real channels from entity/claims (phone; text line and hours stay
   pending claims, so render them only if confirmed, otherwise phone + email only),
   "What to have ready" checklist, merchant portal link only if
   entity.externalLinks.merchantPortal has a value. No sales form on this page.
5. /contact/: reason selector (new business / existing merchant → links to /support/ /
   partner → /partners/ once built), form, phone, email, address, office hours
   (claim office-hours, pending), follow-up expectation (claim follow-up-time).
6. Analytics: a small src/lib/analytics.ts wrapper (GA4 via NEXT_PUBLIC_GA_ID, no-op
   if unset) with events review_submit, contact_submit, call_click, text_click,
   calculator_complete. Never send form contents.
7. Set each built route's status to "draft". Link the homepage to these pages where
   the manifest requires it.

Acceptance: 0 FAIL on npm run qa -- --phase 1. Form validated end to end against a test
webhook (e.g. a request bin URL) with the request body shown in the PR.
```

## Phase 2: Pricing and differentiation

```
PHASE 2 — /why-truepay/, /pricing/, /pricing/membership/, /pricing/dual-pricing/.

1. /why-truepay/ is TruePay's differentiator page. For each commitment (rate-lock,
   month-to-month, truecare, free-terminal, us-support, no-hidden-fees,
   honest-recommendation) use the Commitment module: plain promise, "What this
   covers", "What it doesn't", data-claim. Include a section with id="fine-print"
   that states the scope text from claims.ts (e.g. the rate lock covers TruePay's
   markup; card-network interchange can change for every processor). Add a
   "Who TruePay isn't right for" FitCheck. Source copy: dev /what-makes-us-different/
   and the live site's "Our Commitment to You", rewritten in the site voice.
2. /pricing/: the "honest answer to 'what are your rates?'" section and the four rate
   factors from the dev /pricing/ page; a ComparisonTable of flat rate vs tiered vs
   cost-plus (fair to flat rate: name when it can fit, e.g. very low volume); a
   Membership vs Dual pricing chooser (two cards + "not sure? get a review").
   Link the calculator and the pricing-model guide (the guide link appears once it exists).
3. /pricing/membership/: how interchange-plus works in plain words, what's included
   (claims cost-plus, rate-lock, month-to-month, free-terminal, truecare), "Fees that
   still apply" (list only confirmed items; otherwise say the full schedule comes with
   your proposal), who it's best for.
4. /pricing/dual-pricing/: how it works; one worked checkout example with stated
   assumptions and correct arithmetic (e.g. a $100 item, card price shown, receipt line),
   computed in code, not hand-typed; what customers see (signage, receipt, terminal
   prompt); FitCheck from the dev homepage; differences vs surcharging and cash discount
   (short, linking to the neutral guide once it exists); claims dual-pricing-rules and
   dual-pricing-cost only. No "legal in all 50 states", "100% compliant" or "zero fees".
5. Every page: AnswerFirst, QuestionSection for each manifest question, CtaBand, RelatedLinks.
6. Update the homepage commitments strip to link to /why-truepay/#fine-print.

Acceptance: 0 FAIL on npm run qa -- --phase 2. Every caution WARN justified. The PR
lists each claim's exact rendered wording.
```

## Phase 3: Solutions

```
PHASE 3 — /solutions/ hub and the six solution pages in routes.ts.

1. Hub: a "how do you take payments?" chooser (counter, table, field, online, invoices,
   keep my POS) linking to each child; short POS vs terminal explainer.
2. Each solution page: AnswerFirst; who it's for; how it works day to day; options in a
   ComparisonTable (terminals: VL100, VL110, VL500, Dejavoo QD4, Clover Flex; POS:
   Clover, SkyTab, Paradise, MobileBytes; online: Authorize.net, eProcessing Network;
   billing: Biller Genie, MantaPay). Only list specs that appear in the cited live
   pages or pdf pages, and mark each table "Ask us to confirm availability for
   your business". Then the setup process (claim setup-training: the six steps from
   pdf:p10 for POS), "What if something breaks?" (support + truecare where relevant),
   QuestionSection, CtaBand.
3. Images: licensed manufacturer product images or none. next/image with explicit
   sizes and descriptive alt text ("Valor VL500 wireless card terminal").
4. /solutions/integrations/: never "works with everything"; describe how compatibility
   is checked and list only systems named in the sources.
5. Replace the old product-page URLs' content: every redirected product
   (/vl-100/, /clover-flex/, etc.) should land on a page that mentions that product by name.

Acceptance: 0 FAIL on npm run qa -- --phase 3; every redirect destination in this cluster
returns 200; no orphaned solution pages.
```

## Phase 4: Trust and people

```
PHASE 4 — /about/, /about/team/, /about/jon-wilson/, /about/shane-spears/,
/customer-stories/ (+ the [slug] story template, unpublished), /service-areas/.

1. /about/: origin story from dev /our-story/ (Jon watched business owners get taken
   advantage of; built a better way in 2011), told concisely and in sentence case. Then the
   handshake principle → link to /why-truepay/, the people → /about/team/, and
   facts from entity.ts. No animated counters that render "0" in the HTML
   (the dev site's counters show 0 to crawlers).
2. /about/team/: PersonCards only for people in entity.people, with real photos when supplied
   (no initials placeholders, no "Lorem Ipsum"). Show what each person helps with and
   how to reach them.
3. Profiles: ProfilePage + Person JSON-LD (jobTitle, worksFor #organization,
   sameAs LinkedIn if present, alternateName where set), a background section,
   "What I handle at TruePay", guides authored (auto-listed from resources once built).
4. /customer-stories/: published testimonials verbatim with source links, grouped
   by theme (service, savings, setup). M. Holt only via claim holt-quote. A short
   "Are you a TruePay customer? Leave a Google review" block (link only when the
   GBP review URL is in entity). Build the story template at
   app/customer-stories/[slug]/page.tsx with generateStaticParams returning
   no stories yet, ready for permissioned stories.
5. /service-areas/: claim coverage; how local vs remote help works; the existing
   coverage graphic labeled illustrative; no per-city pages.

Acceptance: 0 FAIL on npm run qa -- --phase 4. Person JSON-LD validates in the Rich
Results Test or the Schema.org validator (paste the result in the PR).
```

## Phase 5: Resources (the AEO/GEO engine)

```
PHASE 5 — /resources/ hub and the six guides in routes.ts.

Content model: create src/content/guides/<slug>.mdx (or typed TS) with frontmatter:
title, description, author (person slug), reviewer (person slug, optional),
datePublished, dateModified, sources [{title, url, publisher, accessed}].

Every guide:
1. H1 from manifest; AuthorBox (byline → profile, reviewer if any, published/updated
   <time datetime>); AnswerFirst (40–80 words that fully answer the main question and
   make sense quoted on their own).
2. Each manifest question as an H2, answered in the first one or two sentences under it,
   then detail. Use ComparisonTable where comparing; one original diagram (inline SVG
   with a text alternative) where it explains a flow.
3. Primary sources only (Visa/Mastercard rules pages, Federal Reserve, state
   statutes, manufacturer docs) in a Sources module with ≥ 2 links. No competitor
   blog citations.
4. Exactly one commercial link (pricing/solution) and one tool link (calculator or
   review), plus RelatedLinks to two sibling guides.
5. Article JSON-LD (author → Person @id, publisher → #organization, dates).
6. Fair and specific: say when TruePay's option is not the best choice.

Guide-specific:
- how-to-read-your-processing-statement: annotated example statement as an original
  SVG mock with clearly fictional numbers labeled "example".
- flat-rate-vs-tiered-vs-interchange-plus: worked cost table at three monthly volumes,
  computed in code with assumptions shown.
- dual-pricing-vs-surcharging-vs-cash-discount: neutral; reviewer required; cite current
  card-network surcharge rules and note state differences with dates.
- why-credit-card-processing-fees-go-up: separate network changes (affect everyone)
  from processor markup and new fees (what a rate lock prevents); link /why-truepay/.
- how-to-switch-payment-processors: contract/ETF check, equipment ownership/leases,
  POS compatibility, timeline, day-one checklist.
- how-credit-card-processing-works: the flow from tap to deposit, who takes what.

Acceptance: 0 FAIL on npm run qa -- --phase 5 (guides FAIL without author, dates,
sources and answer-first). Word count is not a target; completeness is.
```

## Phase 6: Industries

```
PHASE 6 — /industries/ hub and the eight industry pages.

Each page must be genuinely different, not a template swap with the noun changed:
1. AnswerFirst for that industry.
2. "How payments work in a <industry>": the specific workflow (e.g. restaurants:
   pre-auth and tip adjust, splitting checks, pay-at-table; home services: on-site
   payment, no signal, invoices).
3. Recommended setup: two or three options from the solution pages that fit,
   with why.
4. Membership vs dual pricing for this industry: honest tradeoffs (e.g. customer
   perception in salons).
5. Setup and support; real proof only if a published quote fits the industry.
6. 3–5 industry-specific questions (add them to routes.ts questions in a separate
   commit, replacing the generic ones).
7. CtaBand + links from the manifest.
Medical/dental: no HIPAA or compliance promises. Nonprofits: no special-pricing claims
unless confirmed.

Acceptance: 0 FAIL on npm run qa -- --phase 6; reviewer spot-checks that no two
industry pages share more than a sentence of body copy.
```

## Phase 7: Partners, careers and legal

```
PHASE 7 — /partners/, /careers/, /privacy-policy/, /terms/.

1. /partners/: port Jason's partner page (navy/gold, "Your relationships can build
   recurring income.") into the site's design system and modules. Two paths:
   Sales rep vs Referral partner (claim partner-split). Residual estimator as a client
   component: inputs for monthly volume, accounts per month, estimated margin (default
   from claim partner-estimator, editable) and monthly attrition (default 2%, editable).
   Show the single-account monthly example FIRST. Totals sit beside their assumptions
   and disclaimer. No "all-star" headline totals. Fit section ("We're looking for
   people who already serve local businesses…"), training link (entity.externalLinks.training),
   application form through the Phase 1 pipeline with formType "partner".
2. /careers/: roles from live /careers/ and dev /work-with-us/ only if current; otherwise
   a general interest form and a link to /partners/.
3. /privacy-policy/: migrate the live policy text and add a section for website forms.
   Mark the page for legal review in the PR. /terms/: website terms covering
   calculators/illustrations; legal review.

Acceptance: 0 FAIL on npm run qa -- --phase 7; the estimator's math is unit-tested
(include the test).
```

## Phase 8: Launch readiness

```
PHASE 8 — Launch readiness. No new pages.

1. Run npm run qa (all phases) and npm run qa -- --preview against the preview deployment;
   both 0 FAIL.
2. Lighthouse mobile on /, /pricing/dual-pricing/, /solutions/terminals/,
   /resources/how-to-read-your-processing-statement/: ≥ 90 in all four categories;
   attach reports.
3. Accessibility pass: keyboard-only walkthrough of nav, forms, calculator, estimator;
   axe DevTools scan with 0 serious issues; attach results.
4. Verify every URL in the live sitemap (see docs/site-map.md) on the preview
   returns 200 or a single 308 to a 200.
5. Write docs/launch-checklist.md: DNS/hosting cutover, SITE_ENV=production,
   www→apex and http→https, Search Console domain property + sitemap submission,
   GA4 check, Google Business Profile website URL, noindex on the WP Engine dev
   site, a 2-week post-launch monitoring plan.
Do not flip any route to "live"; Jason does that after the reviewer's final pass and
Jon's sign-off on the claims list.
```

---

## Review protocol (what Claude checks on every PR)

1. **Automated:** `npm run qa -- --phase N` on the PR branch must show 0 FAIL. Every WARN must be justified.
2. **Manifest fidelity:** titles, descriptions, H1s, questions, CTAs and links match `routes.ts`, or changes are justified in their own commit.
3. **Truthfulness:** every promise traces to `claims.ts`, every quote to `entity.testimonials`, every spec to a cited source. No invented facts.
4. **Helpfulness (people-first):** the page fully answers its intent; the answer-first block stands on its own; tradeoffs and "not a fit" are stated; it is better than the top results for the same question.
5. **Voice:** sentence case, plain English, specifics, warmth; none of the stock phrases in site-model §4.
6. **E-E-A-T:** real people, bylines, dates, sources, terms links; nothing self-serving in schema.
7. **Entity/GEO:** NAP and name identical; schema `@id`s are linked, not duplicated; passages quotable.
8. **Technical:** server-rendered content, image sizes and alt text, no client-only copy, mobile layout, keyboard access.

Verdict: **PASS** (merge; reviewer sets routes to `ready`) or **FIX LIST** (a paste-ready prompt for ChatGPT).
