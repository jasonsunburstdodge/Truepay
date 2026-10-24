# TruePay QA report

Run: 2026-10-24T01:37:22.328Z · Base: http://127.0.0.1:4010 · Mode: preview · Phases ≤ 3

**0 FAIL · 41 WARN · 20 INFO** across 17 audited pages.

| Route | Status | FAIL | WARN |
| --- | --- | ---: | ---: |
| / | draft | 0 | 4 |
| /statement-review/ | draft | 0 | 3 |
| /effective-rate-calculator/ | draft | 0 | 3 |
| /support/ | draft | 0 | 2 |
| /contact/ | draft | 0 | 1 |
| /thank-you/ | draft | 0 | 3 |
| /why-truepay/ | draft | 0 | 4 |
| /pricing/ | draft | 0 | 2 |
| /pricing/membership/ | draft | 0 | 1 |
| /pricing/dual-pricing/ | draft | 0 | 3 |
| /solutions/ | draft | 0 | 1 |
| /solutions/point-of-sale/ | draft | 0 | 3 |
| /solutions/terminals/ | draft | 0 | 1 |
| /solutions/mobile-payments/ | draft | 0 | 2 |
| /solutions/online-payments/ | draft | 0 | 1 |
| /solutions/integrations/ | draft | 0 | 2 |
| /solutions/billing-software/ | draft | 0 | 2 |

## Warnings (fix or justify in the PR)

### /
- **claims**: 7× "free": Free what, for whom, under what conditions?
- **links**: Required contextual link to /industries/ missing from <main>
- **links**: Required contextual link to /customer-stories/ missing from <main>
- **links**: Required contextual link to /about/team/ missing from <main>
### /statement-review/
- **claims**: 5× "free": Free what, for whom, under what conditions?
- **links**: Required contextual link to /resources/how-to-read-your-processing-statement/ missing from <main>
- **links**: Required contextual link to /about/team/ missing from <main>
### /effective-rate-calculator/
- **claims**: 5× "free": Free what, for whom, under what conditions?
- **links**: Required contextual link to /resources/how-to-read-your-processing-statement/ missing from <main>
- **links**: Required contextual link to /resources/why-credit-card-processing-fees-go-up/ missing from <main>
### /support/
- **claims**: 2× "free": Free what, for whom, under what conditions?
- **links**: Required contextual link to /about/team/ missing from <main>
### /contact/
- **claims**: 4× "free": Free what, for whom, under what conditions?
### /thank-you/
- **description**: 55 chars (aim 110–160)
- **claims**: 2× "free": Free what, for whom, under what conditions?
- **links**: Required contextual link to /resources/ missing from <main>
### /why-truepay/
- **claims**: 4× "free": Free what, for whom, under what conditions?
- **links**: Required contextual link to /about/ missing from <main>
- **links**: Required contextual link to /resources/why-credit-card-processing-fees-go-up/ missing from <main>
- **links**: Required contextual link to /customer-stories/ missing from <main>
### /pricing/
- **claims**: 4× "free": Free what, for whom, under what conditions?
- **links**: Required contextual link to /resources/flat-rate-vs-tiered-vs-interchange-plus/ missing from <main>
### /pricing/membership/
- **claims**: 4× "free": Free what, for whom, under what conditions?
### /pricing/dual-pricing/
- **claims**: 4× "free": Free what, for whom, under what conditions?
- **links**: Required contextual link to /resources/dual-pricing-vs-surcharging-vs-cash-discount/ missing from <main>
- **links**: Required contextual link to /industries/restaurants/ missing from <main>
### /solutions/
- **claims**: 4× "free": Free what, for whom, under what conditions?
### /solutions/point-of-sale/
- **claims**: 4× "free": Free what, for whom, under what conditions?
- **links**: Required contextual link to /industries/restaurants/ missing from <main>
- **links**: Required contextual link to /industries/retail/ missing from <main>
### /solutions/terminals/
- **claims**: 2× "free": Free what, for whom, under what conditions?
### /solutions/mobile-payments/
- **claims**: 2× "free": Free what, for whom, under what conditions?
- **links**: Required contextual link to /industries/home-services/ missing from <main>
### /solutions/online-payments/
- **claims**: 2× "free": Free what, for whom, under what conditions?
### /solutions/integrations/
- **claims**: 2× "free": Free what, for whom, under what conditions?
- **links**: Required contextual link to /resources/how-to-switch-payment-processors/ missing from <main>
### /solutions/billing-software/
- **claims**: 2× "free": Free what, for whom, under what conditions?
- **links**: Required contextual link to /industries/professional-services/ missing from <main>
### (site)
- **links**: Internal link goes through a redirect: /skytab-mobile/ → /solutions/point-of-sale/
- **links**: Internal link goes through a redirect: /skytab-glass/ → /solutions/point-of-sale/
- **links**: Internal link goes through a redirect: /valor-pay-app/ → /solutions/mobile-payments/

## Info

### /statement-review/
- **claims**: Expected claim "review-turnaround" not marked on page
### /support/
- **claims**: Expected claim "support-hours" not marked on page
- **claims**: Expected claim "text-line" not marked on page
### /about-us/
- **redirects**: Destination /about/ not built yet
### /company/
- **redirects**: Destination /about/ not built yet
### /reviews/
- **redirects**: Destination /customer-stories/ not built yet
### /coast-to-coast-customer-network/
- **redirects**: Destination /service-areas/ not built yet
### /referral/
- **redirects**: Destination /partners/ not built yet
### /affiliate-program/
- **redirects**: Destination /partners/ not built yet
### /employment-opportunity/
- **redirects**: Destination /careers/ not built yet
### /employment-opportunity-backup/
- **redirects**: Destination /careers/ not built yet
### /blog/
- **redirects**: Destination /resources/ not built yet
### /category/truepay/
- **redirects**: Destination /resources/ not built yet
### /the-dual-pricing-advantage-how-it-benefits-both-businesses-and-consumers/
- **redirects**: Destination /resources/dual-pricing-vs-surcharging-vs-cash-discount/ not built yet
### /discover-the-top-5-benefits-of-flat-rate-payment-processing/
- **redirects**: Destination /resources/flat-rate-vs-tiered-vs-interchange-plus/ not built yet
### /the-anatomy-of-a-credit-card-payment-understanding-the-process/
- **redirects**: Destination /resources/how-credit-card-processing-works/ not built yet
### /the-future-of-payments-in-2026-what-merchants-really-need-to-know/
- **redirects**: Destination /resources/ not built yet
### /careers/
- **migration**: Existing live URL must keep working; got 404
### /privacy-policy/
- **migration**: Existing live URL must keep working; got 404
### /resources/
- **migration**: Existing live URL must keep working; got 404

## Claims needing TruePay sign-off before launch

| Claim | Status | Used on | Who confirms |
| --- | --- | --- | --- |
| founded-2011 | published | / | Jon: founding year and legal entity name. |
| honest-recommendation | published | /, /statement-review/, /why-truepay/ |  |
| rate-lock | pending | /, /why-truepay/, /pricing/, /pricing/membership/ | Jon/finance: is the lock on markup only, or markup plus listed monthly fees? Any exceptions (e.g. risk changes, chargeback-driven pricing)? Link to the written term. |
| month-to-month | published | /, /why-truepay/, /pricing/membership/ | Jon: confirm no early termination fee; equipment return terms on cancellation. |
| us-support | published | /, /support/, /contact/, /why-truepay/ |  |
| dual-pricing-cost | pending | /, /pricing/dual-pricing/ | Finance: what the merchant still pays under dual pricing. |
| coverage | pending | / | Ops: current states with active merchants/representatives. |
| holt-quote | published | /statement-review/ | Customer success: permission, business name, review source link; candidate for a full story. |
| follow-up-time | pending | /contact/ | Ops: who owns follow-up and the actual standard. |
| office-hours | pending | /contact/ | Ops. |
| truecare | pending | /why-truepay/, /pricing/membership/, /solutions/terminals/ | Ops: written TrueCare terms. |
| free-terminal | pending | /why-truepay/, /pricing/membership/, /solutions/terminals/ | Finance/ops: eligibility and ownership. |
| no-hidden-fees | pending | /why-truepay/ | Finance: current fee schedule published or available on request. |
| cost-plus | pending | /pricing/, /pricing/membership/ | Finance: membership is interchange-plus for all merchants? Markup structure (bps + per-item)? |
| dual-pricing-rules | pending | /pricing/dual-pricing/ | Compliance: current program structure and disclosures. |
| setup-training | pending | /solutions/, /solutions/point-of-sale/ | Ops: on-site vs remote, by region. |
