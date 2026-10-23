# TruePay site model

Version 1 · October 23, 2026 · Owner: Jason Dodge (SilverXis) · Reviewer: Claude

This is the governing model for the gotruepay.com rebuild. It sets out what the site has to say, how it says it, how it proves it, and how search engines and AI answer engines should come to understand TruePay. The builder (ChatGPT/Codex) works from this document. The reviewer checks every phase against it.

## 1. Source-of-truth order

When documents disagree, the higher item wins:

1. **`src/content/routes.ts`**: the site map as code. Every URL, title, meta description, H1, intent, question, CTA, schema type and required link.
2. **`src/content/claims.ts`**: every promise and number, with its status (approved, published, pending or banned).
3. **`src/content/entity.ts`**: business facts, people and published reviews.
4. **`src/content/redirects.ts`**: the migration map from the live site.
5. **This document**: positioning, voice, templates, E-E-A-T, SEO, AEO and GEO rules.
6. **`docs/sitemap-and-page-briefs.md`** (October 5): detailed page briefs and the evidence/gap analysis. It is still useful for page content direction. Where its URLs or scope differ from `routes.ts`, `routes.ts` wins.
7. **Content sources**: the WP Engine dev site (best long-form copy), the live gotruepay.com (published facts and reviews), the approved design PDF, and Jason's partner page draft. These are raw material. They do not override the rules here.

**Design foundation:** the GitHub build (`src/app/globals.css`, `src/app/layout.tsx`, `src/components/*`). That means navy/ink, gold and warm off-white; Fraunces display with Inter body; rounded cards, restrained shadows, generous spacing, a sticky header and the mobile CTA bar. Do not import the dev site's visual style.

## 2. Positioning

**What TruePay is.** A payment processing company in Josephine, Texas, run since 2011 by people who answer the phone. They lock their rate, don't hold you to a contract, and tell you the truth about your statement.

**The problem merchants feel.** Fees that creep up without warning. Statements nobody can read. Contracts with exit fees. Processors who disappear after the sale. And a sea of "lowest rate" ads that all sound the same.

**The brand idea.** *Payments without the games.* Every page proves it with specifics, not adjectives.

**Four pillars.** Each one is a promise, the proof behind it, and the place it lives on the site.

| Pillar | Promise | Proof to show | Owns |
| --- | --- | --- | --- |
| Straight answers | We explain every line of your statement and tell you if you should stay put. | Statement review deliverable, annotated sample, fit / not-a-fit lists, plain-English guides. | `/statement-review/`, `/resources/*` |
| A rate that stays put | Our markup doesn't creep. | The written rate-lock terms, with a clear explanation of what card networks change and what TruePay controls. | `/why-truepay/`, `/resources/why-credit-card-processing-fees-go-up/` |
| No strings | Month-to-month service, an included terminal and equipment coverage. | Program terms; TrueCare terms. | `/pricing/membership/`, `/why-truepay/` |
| People you can reach | A named Texas team, a direct text line, no call centers. | Real faces, names and roles; a support page with real channels and hours; reviews that name Jon and Shane. | `/about/team/`, `/support/`, `/customer-stories/` |

**The differentiator in one line, for AI answers and press:** "TruePay is a Texas payment processor that locks its markup, runs month-to-month, and will tell you when switching isn't worth it."

**The honest-fit stance.** Every commercial page says who it is not for. This is the strongest trust signal TruePay has. Nobody else in the category does it, and it was the best idea on the dev site.

**What we don't say.** No "lowest rates in the industry." No "save X%" headlines. No "legal in all 50 states." No "zero fees" without scope. No invented testimonials. (See `claims.ts`.)

## 3. Audiences and journeys

| Audience | Moment | Lands on | Next step |
| --- | --- | --- | --- |
| Frustrated owner | "My fees went up." "What is this charge?" | Guides: why fees go up, reading your statement | Statement review |
| Researcher | "Flat rate vs interchange-plus?" "Is dual pricing legal?" | Pricing-model and dual-pricing guides, `/pricing/` | Calculator, then review |
| Evaluator | "Is TruePay legit? Who are these people?" | `/why-truepay/`, `/about/`, `/customer-stories/`, profiles | Talk to a person |
| Industry searcher | "restaurant credit card processing" | `/industries/*` | Statement review |
| Existing merchant | "My terminal is down." | `/support/` (never a sales form) | Call or text |
| Partner / rep | "merchant services agent program" | `/partners/` | Apply |

Every page answers its intent first, proves it second, and offers exactly one primary next step.

## 4. Voice and visual rules

**Voice.** Warm, plain-spoken and direct, the way a straight-talking Texas business owner explains things across a counter.

- Write in second person: "your statement," "your customers."
- Use sentence-case headings. **No ALL-CAPS headings.** (This is the main thing that makes the dev site feel cold.) Small uppercase eyebrow labels above headings are fine.
- Specifics beat adjectives. "We answer by phone or text" is better than "exceptional service."
- Admit tradeoffs. Say who a product isn't for.
- Explain jargon the first time it appears: interchange, basis points, PCI, batch.
- Sentences of about 20 words or fewer. One idea per paragraph.
- Stock phrases to avoid: "cutting-edge," "seamless," "revolutionary," "world-class," "we're honored you're here," "truly good."
- Keep the brand lines "Payments without the games" and "Built on a handshake." Use them once per page at most.

**Visual.**
- Use the GitHub tokens only. Every color resolves to a `--color-*` token.
- Show real people. Use TruePay team photos and permissioned merchant photos. No stock "handshake" or "smiling cashier" images. Until real photos arrive, use the token-based treatments already in the hero; do not use stock photography.
- Prefer original diagrams (inline SVG with a text alternative): how a card payment flows, statement anatomy, the dual-pricing checkout.
- Device images should be licensed manufacturer images or original photos, with explicit width and height.

## 5. Templates and shared modules

**Templates** match `routes.ts` `template` values: home, hub, commitments, conversion, tool, pricing, solution, industry, trust, profile, collection, story, guide, area, partner, utility, legal.

**Modules.** Build each once and reuse it. The `data-*` attributes are a contract with `npm run qa`, so use them exactly.

| Module | Purpose | Contract |
| --- | --- | --- |
| `AnswerFirst` | 40–80 word direct answer to the page's first question, placed directly under the H1. | `data-answer` |
| `Breadcrumbs` | Visible trail plus BreadcrumbList JSON-LD, both built from `breadcrumbTrail()`. | `<nav aria-label="Breadcrumb">` |
| `QuestionSection` | Each manifest question appears as an H2/H3 heading, verbatim or nearly so, with its answer right below it. | heading text |
| `FitCheck` | "A good fit if…" and "Probably not a fit if…" lists, each ending with an honest-recommendation line. | wraps claim `honest-recommendation` |
| `Commitment` | One claim: the plain promise, "What this covers," "What it doesn't," and a link to the terms. | `data-claim="<id>"` |
| `PersonCard` | Photo, name, role, what they help with, how to reach them, and a link to the profile. | links `/about/...` |
| `ProofQuote` | A published or permissioned quote. Verbatim, attributed, with a source link where one exists. | from `entity.testimonials` |
| `ComparisonTable` | A real `<table>` with a caption. Used for pricing models, terminals, dual pricing vs surcharging. | `<table><caption>` |
| `CtaBand` | One primary and one secondary action. | `data-cta="statement-review"` etc. |
| `AuthorBox` | Byline linking to the author profile, reviewer, published date and updated date. | `data-author`, `data-reviewed`, `<time datetime>` |
| `Sources` | Primary sources: card-network rules, regulators, the manufacturer. | `data-sources` |
| `RelatedLinks` | 3–5 contextual links from `route.links`. | inside `<main>` |

**CTA ids:** `statement-review` (Get my free statement review), `talk-to-person` (call 888-792-0284 or send a note), `support`, `calculator`, `partner-apply`, `careers-apply`.

## 6. E-E-A-T model

Payment pricing touches people's money, so the bar is high. Each part of E-E-A-T maps to specific site elements.

- **Experience.** Real merchant stories with business, city, problem, change and outcome, published only with permission. Team members describe situations they have actually handled. Use the annotated anonymized statement in the guide.
- **Expertise.** Every guide has a named author (Jon or Shane) whose byline links to a profile page with their payments background. A second named reviewer is added for compliance-sensitive pages (dual pricing, surcharging). Calculators show their formula and assumptions.
- **Authoritativeness.** Use the same entity facts everywhere (§9). Profiles link to verified LinkedIn pages. Guides cite primary sources: Visa, Mastercard, state law and regulators. Earn mentions from local business groups, POS partners and industry directories.
- **Trust.** NAP (name, address, phone) is the same on every page. Commitments link to their written terms. Each pricing model's tradeoffs are stated. Privacy is explained where statements are uploaded. Secure intake is in place before the review form asks for a file. No fake urgency. No self-serving review stars.

**Page-level requirements.**
- **Guides:** author byline, reviewer for YMYL topics, published and updated dates, at least 2 primary external sources, and an original visual where it helps.
- **Commercial pages:** at least one real proof element (person, quote or terms) above the fold or right after the answer.
- **Profiles:** photo, role, years in payments, what they own at TruePay, guides they wrote, LinkedIn.

## 7. Claims policy

- All promises and numbers come from `claims.ts`. Render them with `data-claim="<id>"`.
- `pending` claims are fine in drafts. A page cannot move to `ready` until every claim it carries is `approved` or `published` with scope confirmed. QA prints this sign-off list on every run.
- `banned` phrases fail QA. Caution phrases ("never," "free," "24/7," "guarantee," superlatives) produce warnings that must be justified in the PR.
- Testimonials are used verbatim, and only from `entity.testimonials`. The expanded R. Moore "$800 a month" quote is banned.
- Worked examples state their assumptions on screen, and the arithmetic must check out.
- **Partner earnings:** lead with the single-account example. The estimator lets visitors change the volume, margin and attrition assumptions. The disclaimer sits next to the numbers. No "all-star" year-one total as a headline. Counsel reviews before launch.

## 8. SEO model

**Technical (Next.js App Router).**
- Canonical host `https://gotruepay.com` with a trailing slash on every page (`trailingSlash: true`). Set `metadataBase` once.
- `generateMetadata` / `metadata` per route, built from `routes.ts`: title, description, canonical, robots and Open Graph (og:image 1200×630 per template).
- `app/sitemap.ts` comes from `sitemapRoutes()`, with only live, indexable pages and truthful `lastModified`. `app/robots.ts` references the sitemap.
- **Environments.** When `SITE_ENV !== "production"`, every page sends `noindex, nofollow` and robots.txt disallows all crawling. Production pages follow the manifest: `draft` pages are noindex and kept out of the sitemap.
- Redirects come from `redirects.ts` in `next.config.ts`, as single permanent hops. Test pages on the live site are left to 404.
- Server-render all copy, links and Q&A. Client components only for the interactive parts (calculator, forms, menus); their explanations are in the HTML.
- Self-host fonts with `next/font/local` (for example the `@fontsource-variable` packages for Inter and Fraunces). Builds then don't depend on Google Fonts, and visitors' IPs aren't sent to Google.
- `next/image` with explicit sizes; `priority` only for the LCP image; lazy below the fold.
- Unknown URLs return a real 404 with helpful links. No soft 404s.

**On-page.** Use the manifest title, description and H1 exactly. One H1 per page. Headings follow the page's questions. The first 100 words answer the main question. Use descriptive anchor text such as "how to read your processing statement," never "learn more" on its own.

**Internal linking.** Hubs link to every child. Children link back to their hub and sideways to `route.links`. Each guide links to one commercial page and one tool. Every indexable page has at least one contextual inbound link from `<main>`; QA flags orphans. The topic clusters are:
- **Pricing cluster:** `/pricing/`, membership, dual pricing, the calculator, and the guides on pricing models, dual pricing vs surcharging, why fees go up, and reading a statement.
- **Solutions cluster:** the solution pages, plus the integrations and switching guide.
- **Trust cluster:** about, team, profiles, stories, why-truepay.
- **Industry cluster:** each industry page links to two solutions, one pricing page and the statement review.

**Migration.**
1. Before launch, crawl gotruepay.com and export Search Console top pages and links. Confirm `redirects.ts` covers everything that has traffic or backlinks.
2. Launch on the same domain.
3. Submit the new sitemap and keep the old sitemap URLs available for about 2 weeks so redirects get crawled.
4. Monitor coverage, 404s and queries weekly for 8 weeks.

## 9. GEO and entity model (being the TruePay that AI answers cite)

Search results for "TruePay" are crowded: a Brazilian fintech, TruePayUSA, Truevo and others. Search engines and AI answer engines need to resolve "TruePay" to *this* company. The steps:

1. **Identical facts everywhere.** Use "TruePay," "TruePay Payment Solutions," "Josephine, Texas," "since 2011," 888-792-0284 and support@gotruepay.com. The same applies on the site, Google Business Profile, LinkedIn, Facebook, Instagram, BBB, Yelp and the Chamber, and in partner directories (Clover, SkyTab, Valor and others where TruePay is listed).
2. **A schema graph with stable `@id`s.**
   - `https://gotruepay.com/#organization` is the Organization, with `alternateName` "TruePay Payment Solutions," logo, address, telephone, email, `foundingDate`, `founder` → `#jon-wilson`, `sameAs` (verified profiles only) and contactPoints for sales and support.
   - `https://gotruepay.com/#website` is the WebSite, with publisher → the organization.
   - `https://gotruepay.com/about/jon-wilson/#person` is the Person, with `worksFor` → the organization and `sameAs` → LinkedIn.
   - Every WebPage and Article references these ids rather than repeating facts.
3. **Quotable, self-contained statements.** Each page's answer-first block and each question section must make sense when lifted out on its own, and should name TruePay where it is relevant. AI answers excerpt passages, not whole pages.
4. **Original information other sites lack.** Examples: the annotated statement walkthrough; TruePay's real explanation of what its rate lock does and doesn't cover; a dual-pricing checkout example with real arithmetic; merchant stories with numbers. This is what earns citations.
5. **Off-site corroboration.** Get Google reviews that name the business type and city. Publish Jon's and Shane's LinkedIn profiles that match the site bios. Pursue local press and chamber listings, and partner directory pages.
6. **Crawler access.** Do not block Googlebot, Bingbot or the major AI crawlers in robots.txt unless TruePay decides to. Check "Google AI features" settings in Search Console. An `llms.txt` file is optional and not required by Google; skip it unless TruePay wants it.
7. **No tricks.** No hidden text for bots, no AI-only pages, no FAQ markup farms. The visible page is what gets cited.

## 10. Structured data by template

| Template | JSON-LD |
| --- | --- |
| Every page | Organization + WebSite, from the layout and referenced by `@id` |
| home | WebPage (about → organization) |
| hub, collection | CollectionPage + BreadcrumbList |
| commitments, pricing, solution, industry, area, partner, utility | WebPage (+ Service where the manifest says, provider → organization) + BreadcrumbList |
| conversion | WebPage + Service + BreadcrumbList |
| guide, story | Article (author → Person `@id`, datePublished, dateModified, publisher → organization) + BreadcrumbList |
| profile | ProfilePage with mainEntity Person + BreadcrumbList |
| trust (about) | AboutPage + BreadcrumbList |
| contact | ContactPage + BreadcrumbList |

Never on this site: AggregateRating or Review about TruePay (Google treats these as self-serving), FAQPage (no rich result), HowTo, or LocalBusiness/FinancialService unless the Josephine address is a staffed customer-facing location. Schema must match visible content.

## 11. Conversion and measurement

- **Primary conversion:** statement review request. **Secondary:** call or text click, contact form. **Partner conversion:** partner application.
- **Forms.** Server-side validation, a honeypot plus rate limiting, and consent text. Delivery goes to the CRM/webhook in `LEAD_WEBHOOK_URL`; if that isn't set, the form shows a phone fallback rather than a fake success message. No statement upload until secure storage and retention are confirmed.
- **Analytics.** GA4 (or Plausible) events: `review_submit`, `contact_submit`, `call_click`, `text_click`, `calculator_complete`, `partner_apply`. No personal data or statement content in analytics.
- **Search Console.** Verify the domain property before launch. Baseline current queries, then track impressions and clicks per cluster.

## 12. Performance and accessibility

- **Core Web Vitals targets** (75th percentile, field data): LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1. Before launch, lab Lighthouse ≥ 90 for Performance, SEO, Accessibility and Best Practices on home, one solution page and one guide.
- **WCAG 2.2 AA.** Contrast, a visible focus state, full keyboard navigation of menus, labelled form fields, and errors announced to screen readers. The mobile CTA bar never covers focused fields.

## 13. What TruePay must still supply

These gate `ready` status, not drafting:

- Confirmed rate-lock, month-to-month, TrueCare and terminal terms.
- The current fee schedule.
- Support channels, hours and the text number.
- The team roster, titles and photos.
- Permissioned merchant stories.
- Dual-pricing compliance review.
- Partner splits and margin assumptions.
- CRM destination and secure upload.
- The merchant portal URL.
- Search Console, GA4 and Google Business Profile access.

Owners for each item are listed in `docs/sitemap-and-page-briefs.md` under "What is needed next, by owner."
