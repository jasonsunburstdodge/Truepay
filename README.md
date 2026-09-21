# TruePay Homepage

Rebuild of the TruePay marketing homepage — payment processing, transparent
pricing, and lead capture. Built with Next.js (App Router) + TypeScript +
Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pre-build review

The original rebuild brief assumed an existing TruePay codebase (existing
homepage template, design tokens, CRM/webhook-connected lead form, and
image assets to audit). This repository was **empty** when this project
started — there was nothing to locate or reuse. Decisions made as a result:

1. **Homepage template** — none existed; built from scratch as a standard
   Next.js App Router page (`src/app/page.tsx`) composed from section
   components in `src/components/`.
2. **Design tokens** — none existed. `src/app/globals.css` defines the
   initial token set (navy/ink for trust, warm off-white surfaces, gold
   accent), matching the palette already implied by the brief's own
   reference CSS. Treat these as a starting system pending confirmation
   against real TruePay brand guidelines.
3. **Lead form submission** — no CRM/webhook integration existed to match.
   `src/app/api/lead/route.ts` is a placeholder Route Handler that logs
   submissions; swap its body for the real integration (HubSpot, Salesforce,
   a custom webhook, etc.) before launch, keeping the `selected_industry`
   hidden-field name so industry-tagged leads keep flowing through.
4. **Routing** — Next.js App Router can support dedicated pages like
   `/industries/restaurants` without restructuring the nav. Not built now;
   flagged as a phase-2 SEO opportunity (see `src/components/site-header.tsx`).
   The Industries nav dropdown currently links to the homepage `#industries`
   anchor.
5. **Image/asset handling** — no hero photography or coverage-map asset
   existed. The hero (`src/components/hero.tsx`) uses a CSS/token-based
   treatment instead of a placeholder stock photo, so nothing misrepresents
   real TruePay brand imagery — swap in a real photo with `next/image` and
   `priority` (not lazy — it's the page's LCP element) when available. The
   "coverage map" (`src/components/coverage-section.tsx`,
   `public/images/coverage-map.svg`) is an illustrative, non-cartographic
   graphic of TruePay's confirmed coverage states, lazy-loaded since it's
   below the fold.

## Content sourcing

Company facts, testimonials, and the pricing example in `src/lib/site-config.ts`
are taken verbatim from the rebuild brief (sourced from gotruepay.com) — not
invented. No testimonials, statistics, or company facts beyond what the brief
supplied were added.

**Pending client sign-off:** the 8-category "Industries served" list in
`src/lib/industries.ts` is a strategic addition proposed during planning. It
is NOT sourced from TruePay's existing site and has NOT been confirmed by the
client — confirm before launch (also flagged in-code).

## Known placeholders

- `/api/lead` logs submissions instead of forwarding them to a real CRM —
  see "Pre-build review" item 3.
- The industries-served section is pending client sign-off — see
  `src/lib/industries.ts`.
- No hero photography yet — see "Pre-build review" item 5.
- Design tokens are a starting system, not confirmed brand guidelines — see
  "Pre-build review" item 2.

## QA notes

Verified in a real browser (desktop 1440px and mobile 390px) before this was
called done:

- All three testimonials render verbatim with correct attribution.
- Pricing signal reads as a single example with its disclaimer, not an
  average or guarantee.
- Hero leads with nationwide coverage; TX/OK appear as supporting detail.
- Clicking an industry card scrolls to the calculator and shows
  industry-specific context copy.
- The calculator recalculates live on input (not on submit) with a count-up
  transition on the displayed rate.
- Selected industry flows end-to-end: industry card click → sessionStorage →
  hidden form field → `/api/lead` POST body (confirmed via a scripted
  Playwright submission, not just presence of the field in HTML).
- Mobile: industries grid scrolls as a horizontal carousel, not a stack.
- Mobile: single consolidated bottom CTA bar (no separate floating button).
- `npm run build` and `npx eslint .` both pass clean.
