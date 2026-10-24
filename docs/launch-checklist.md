# TruePay launch checklist

The order to follow on launch day and for the two weeks after. Nothing here starts until two things are done. First, Jon has signed off on every row in `docs/owner-signoff.md` that is marked "Before launch." Second, Jason has done the final pass and switched the approved routes from `draft` to `live` in `src/content/routes.ts`.

Audit results from Phase 8 (Oct. 24, 2026, production build with every route set to `live` for testing):

| Check | Result | Evidence |
|---|---|---|
| `npm run qa` (all 43 pages) | 0 FAIL · 48 WARN · 4 INFO | `docs/qa/phase-8/qa-report.md` |
| `npm run qa -- --preview` | 0 FAIL, noindex header and Disallow robots.txt confirmed | `docs/qa/phase-8/qa-report-preview.md` |
| Lighthouse mobile, `/` | Performance 95, Accessibility 100, Best Practices 100, SEO 100 | `docs/qa/phase-8/lighthouse/mobile-home.html` |
| Lighthouse mobile, `/pricing/dual-pricing/` | 95, 100, 100, 100 | `mobile-pricing_dual-pricing.html` |
| Lighthouse mobile, `/solutions/terminals/` | 93, 100, 100, 100 | `mobile-solutions_terminals.html` |
| Lighthouse mobile, `/resources/how-to-read-your-processing-statement/` | 95, 100, 100, 100 | `mobile-resources_how-to-read-your-processing-statement.html` |
| axe-core, WCAG 2.2 AA, 42 pages at 390px and 1440px | 0 violations | `docs/qa/phase-8/axe-results.json` |
| Keyboard-only walkthrough | Pass | `docs/qa/phase-8/keyboard-walkthrough.md` |
| Every URL in the live WordPress sitemap | 47 of 47 return 200 or one 308 to a 200 | `docs/qa/phase-8/redirects.txt` |

The 48 warnings are the same reviewed set as Phases 5 through 7. Most are "free," which refers to the free statement review and is defined on that page. The rest are the fictional "$0.10" pricing example, the "cheapest" question heading, the disclaimer phrase "aren't guaranteed" and the short description on the noindex thank-you page.

## 1. Before launch day

- [ ] **Owner sign-off.** Every "Before launch" row in `docs/owner-signoff.md` is approved or its copy is removed.
- [ ] **Legal review.** Counsel has approved `/privacy-policy/` and `/terms/`.
- [ ] **Set routes to live.** Jason changes the approved routes from `draft` to `live` in `routes.ts`. Only `live` routes enter the sitemap and get `index, follow`.
- [ ] **Choose the host.** The new site is a Next.js app, so it can't run on the current WP Engine WordPress install. Use a Node host that supports Next.js 16, such as Vercel. Create two environments, production and preview.
- [ ] **Set environment variables.**
  - Production: `SITE_ENV=production`, `LEAD_WEBHOOK_URL` (an HTTPS endpoint that receives form leads) and `NEXT_PUBLIC_GA_ID` (the GA4 ID, `G-…`).
  - Preview: leave `SITE_ENV` unset so preview builds stay noindex.
- [ ] **Test the lead pipeline end to end on preview.** Submit the statement review, contact, partner and career forms, and confirm each lead arrives with its `formType`. If `LEAD_WEBHOOK_URL` is missing, forms show the phone number instead of failing silently. Confirm that fallback once, then set the variable.
- [ ] **Record the current state.** Export the current Search Console performance data and a crawl of the WordPress site. These are the baseline for comparing traffic after launch.
- [ ] **Lower the DNS TTL** on `gotruepay.com` and `www` to 300 seconds, 24 hours before cutover.

## 2. Launch day

- [ ] **Point DNS at the new host.** The apex `gotruepay.com` is the canonical host.
- [ ] **Set host-level redirects.**
  - `www.gotruepay.com` → `https://gotruepay.com` with a 301.
  - `http://` → `https://` with a 301.
  - Each should happen in a single hop. Check with `curl -sI http://www.gotruepay.com/pricing/`; expect one 301 to `https://gotruepay.com/pricing/`.
- [ ] **Confirm HTTPS** on both hosts.
- [ ] **Smoke test production.**
  - `curl -s https://gotruepay.com/robots.txt` shows `Allow: /` and the sitemap line.
  - `/sitemap.xml` lists only `live` routes.
  - The home page HTML has `<meta name="robots" content="index, follow">` and no `X-Robots-Tag: noindex` header.
- [ ] **Re-run the redirect check** against production. All 47 old sitemap URLs should return 200 or one 308 to a 200, the same check as `docs/qa/phase-8/redirects.txt`.
- [ ] **Confirm the six internal and test pages are gone.** These are listed in `ownerDecisions` (`src/content/redirects.ts`): the survey and sale sheets, the marketing test pages and the welcome backup page. The new site has no routes for them, so they should return 404. Never redirect them to the home page. If the sales team still needs the survey or sale sheets, move them to a forms tool.
- [ ] **Set up Search Console.**
  - Add or verify a **Domain** property for `gotruepay.com`, verified by DNS.
  - Submit `https://gotruepay.com/sitemap.xml`.
  - Request indexing for `/`, `/pricing/`, `/why-truepay/` and `/statement-review/`.
- [ ] **Check GA4 in Realtime.** Load a page, click the phone number (`call_click`), complete the rate calculator (`calculator_complete`) and submit a test form.
- [ ] **Update the Google Business Profile** website URL to `https://gotruepay.com/`, with no tracking parameters and no `www`.
- [ ] **Hide the WP Engine dev site.** On `truepaydev.wpenginepowered.com`, turn on password protection, or at least `noindex` plus a Disallow-all robots.txt. Today it is `index, follow` with a self-referencing canonical, which competes with the real site.
- [ ] **Turn off the old WordPress site's public access** once DNS has propagated. Keep a backup.

## 3. First two weeks

| When | Check | Action if it fails |
|---|---|---|
| Day 1 | Search Console: sitemap read, no "Page with redirect" or "Blocked by robots.txt" errors for live URLs | Fix the route status or the redirect, then resubmit the sitemap |
| Day 1 | Forms: one real test lead per form type reaches the inbox | Check `LEAD_WEBHOOK_URL` and the receiving endpoint |
| Days 1-3 | Server logs or host analytics: count of 404s | Add a redirect only when an old URL has a clear new equivalent |
| Day 3 | Search Console URL Inspection on five key pages: canonical is the page itself and indexing is allowed | Check `SITE_ENV=production` and the route status |
| Week 1 | Search Console Coverage: old URLs moving to "Page with redirect," new URLs moving to "Indexed" | Expected; act only on errors |
| Week 1 | GA4: leads and calls per day against the pre-launch baseline | If down by more than half, check forms, phone links and the mobile CTA bar |
| Week 2 | Search Console Performance: clicks and impressions against the baseline export | A dip of up to a few weeks is normal during re-indexing; investigate pages that lost their queries entirely |
| Week 2 | Rich Results Test on a guide and a profile page | Fix any schema errors; never add Review, AggregateRating, FAQPage or HowTo markup |
| Week 2 | Owner check-in with Jon: are leads arriving and are callers mentioning the site? | Adjust CTAs or the follow-up process |

After week 2, review titles and descriptions monthly. The route manifest says to revisit them after eight to 12 weeks of Search Console data.
