# Instructions for AI coding agents (ChatGPT / Codex) working on this repo

You are building gotruepay.com for TruePay, a payment processing company in Josephine, Texas. A reviewer checks every pull request against the rules below, using `npm run qa`. Work that ignores them will be sent back.

## Read first, every session

1. `docs/site-model.md`: positioning, voice, templates, E-E-A-T, SEO, AEO and GEO rules.
2. `src/content/routes.ts`: the site map as code. Titles, descriptions, H1s, questions, CTAs, schema and required links.
3. `src/content/claims.ts`: every promise and number you may use, and the banned ones.
4. `src/content/entity.ts`: business facts, people and published reviews.
5. `docs/chatgpt-build-plan.md`: the phase you are on and its acceptance criteria.

## Non-negotiables

- **Design.** Keep this repo's design system, which matches Jason's ChatGPT build: tokens in `src/app/globals.css`, heavy tight Inter headlines (`.font-display`), navy gradient heroes with arcs (`.hero-navy` + `HeroArcs`), gold eyebrows, white rounded cards, navy and blue-gray section bands, sticky navy header, mobile CTA bar. Do not copy the look of the WordPress dev site. Use sentence-case headings, never ALL CAPS (small eyebrow labels excepted).
- **Metadata from the manifest.** Titles, descriptions, H1s, canonicals, breadcrumbs, nav, `sitemap.xml` and JSON-LD are generated from `routes.ts`. Don't hard-code a different title, description or H1. If you think one should change, edit `routes.ts` in its own commit and explain why in the PR.
- **No invented facts.** No numbers, people, titles, reviews, certifications, partner names, hours or features that aren't in `entity.ts`, `claims.ts` or a source listed on the route. If something is missing, write around it or leave the module out. Never render placeholders, "TBD", lorem ipsum or "John Doe".
- **Claims come from the register.** Render every promise or number from `claims.ts` and mark the element `data-claim="<id>"`. Never use a `banned` claim. Testimonials come only from `entity.testimonials`, verbatim.
- **QA contracts.** Use exactly: `data-answer` (answer-first block directly under the H1), `data-cta="<cta id>"`, `data-author` (byline linking to `/about/...`), `data-reviewed` or `<time datetime>`, `data-sources`, `<nav aria-label="Breadcrumb">`.
- **Server-render content.** Client components only for interactive parts. All copy, links and Q&A must be in the HTML.
- **Status field.** You may move a route's `status` from `planned` to `draft` when you build it. Only the reviewer moves it to `ready`. Only Jason moves it to `live`.
- **Environment safety.** Every non-production environment must send `noindex` and a disallow-all robots.txt.
- **No secrets.** Never commit secrets or credentials. Use environment variables (`LEAD_WEBHOOK_URL`, `SITE_ENV`, analytics IDs).
- **Gate before every PR.** Run `npm run lint`, `npm run typecheck` and `npm run qa -- --phase <n>`. A PR must have **0 FAIL**. Every WARN must be fixed or justified in the PR description.

## Pull request format

Title: `Phase <n>: <name>`. Description must include:

1. What was built: the routes and modules.
2. The QA summary line and the full WARN list, each one either fixed or justified.
3. The "Claims needing TruePay sign-off" table from `qa-report.md`.
4. Any change to `routes.ts`, `claims.ts` or `entity.ts`, with the reason.
5. Mobile (390px) and desktop (1440px) screenshots of each new page.
6. Open questions for TruePay.
