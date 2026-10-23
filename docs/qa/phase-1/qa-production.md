# TruePay QA report

Run: 2026-10-23T19:37:26.156Z · Base: http://127.0.0.1:4010 · Mode: production · Phases ≤ 1

**0 FAIL · 21 WARN · 45 INFO** across 6 audited pages.

| Route | Status | FAIL | WARN |
| --- | --- | ---: | ---: |
| / | draft | 0 | 8 |
| /statement-review/ | draft | 0 | 4 |
| /effective-rate-calculator/ | draft | 0 | 3 |
| /support/ | draft | 0 | 2 |
| /contact/ | draft | 0 | 1 |
| /thank-you/ | draft | 0 | 3 |

## Warnings (fix or justify in the PR)

### /
- **claims**: 7× "free": Free what, for whom, under what conditions?
- **links**: Required contextual link to /why-truepay/ missing from <main>
- **links**: Required contextual link to /pricing/ missing from <main>
- **links**: Required contextual link to /pricing/dual-pricing/ missing from <main>
- **links**: Required contextual link to /solutions/ missing from <main>
- **links**: Required contextual link to /industries/ missing from <main>
- **links**: Required contextual link to /customer-stories/ missing from <main>
- **links**: Required contextual link to /about/team/ missing from <main>
### /statement-review/
- **claims**: 5× "free": Free what, for whom, under what conditions?
- **links**: Required contextual link to /resources/how-to-read-your-processing-statement/ missing from <main>
- **links**: Required contextual link to /pricing/ missing from <main>
- **links**: Required contextual link to /about/team/ missing from <main>
### /effective-rate-calculator/
- **claims**: 5× "free": Free what, for whom, under what conditions?
- **links**: Required contextual link to /resources/how-to-read-your-processing-statement/ missing from <main>
- **links**: Required contextual link to /resources/why-credit-card-processing-fees-go-up/ missing from <main>
### /support/
- **claims**: 2× "free": Free what, for whom, under what conditions?
- **links**: Required contextual link to /about/team/ missing from <main>
### /contact/
- **claims**: 3× "free": Free what, for whom, under what conditions?
### /thank-you/
- **description**: 55 chars (aim 110–160)
- **claims**: 2× "free": Free what, for whom, under what conditions?
- **links**: Required contextual link to /resources/ missing from <main>

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
### /dual-pricing-program/
- **redirects**: Destination /pricing/dual-pricing/ not built yet
### /membership-program/
- **redirects**: Destination /pricing/membership/ not built yet
### /equipment/
- **redirects**: Destination /solutions/ not built yet
### /point-of-sale/
- **redirects**: Destination /solutions/point-of-sale/ not built yet
### /pos-system/
- **redirects**: Destination /solutions/point-of-sale/ not built yet
### /skytab-mobile/
- **redirects**: Destination /solutions/point-of-sale/ not built yet
### /skytab-glass/
- **redirects**: Destination /solutions/point-of-sale/ not built yet
### /paradise-pos/
- **redirects**: Destination /solutions/point-of-sale/ not built yet
### /mobile-bytes/
- **redirects**: Destination /solutions/point-of-sale/ not built yet
### /rckt-mobile-pos/
- **redirects**: Destination /solutions/mobile-payments/ not built yet
### /terminals/
- **redirects**: Destination /solutions/terminals/ not built yet
### /valor/
- **redirects**: Destination /solutions/terminals/ not built yet
### /vl-100/
- **redirects**: Destination /solutions/terminals/ not built yet
### /vl-110/
- **redirects**: Destination /solutions/terminals/ not built yet
### /vl-500/
- **redirects**: Destination /solutions/terminals/ not built yet
### /dejavoo-qd4/
- **redirects**: Destination /solutions/terminals/ not built yet
### /clover-flex/
- **redirects**: Destination /solutions/terminals/ not built yet
### /mini/
- **redirects**: Destination /solutions/terminals/ not built yet
### /duo/
- **redirects**: Destination /solutions/terminals/ not built yet
### /valor-pay-app/
- **redirects**: Destination /solutions/mobile-payments/ not built yet
### /online-check-out/
- **redirects**: Destination /solutions/online-payments/ not built yet
### /the-dual-pricing-advantage-how-it-benefits-both-businesses-and-consumers/
- **redirects**: Destination /resources/dual-pricing-vs-surcharging-vs-cash-discount/ not built yet
### /discover-the-top-5-benefits-of-flat-rate-payment-processing/
- **redirects**: Destination /resources/flat-rate-vs-tiered-vs-interchange-plus/ not built yet
### /the-anatomy-of-a-credit-card-payment-understanding-the-process/
- **redirects**: Destination /resources/how-credit-card-processing-works/ not built yet
### /5-benefits-of-an-evm-compliant-chip-terminal/
- **redirects**: Destination /solutions/terminals/ not built yet
### /the-evolution-of-pos-systems-from-cash-registers-to-smart-terminals/
- **redirects**: Destination /solutions/point-of-sale/ not built yet
### /streamlining-transactions-for-smbs-a-closer-look-at-modern-pos-systems/
- **redirects**: Destination /solutions/point-of-sale/ not built yet
### /the-future-of-payments-in-2026-what-merchants-really-need-to-know/
- **redirects**: Destination /resources/ not built yet
### /careers/
- **migration**: Existing live URL must keep working; got 404
### /privacy-policy/
- **migration**: Existing live URL must keep working; got 404
### /resources/
- **migration**: Existing live URL must keep working; got 404
### /solutions/
- **migration**: Existing live URL must keep working; got 404

## Claims needing TruePay sign-off before launch

| Claim | Status | Used on | Who confirms |
| --- | --- | --- | --- |
| founded-2011 | published | / | Jon: founding year and legal entity name. |
| honest-recommendation | published | /, /statement-review/ |  |
| rate-lock | pending | / | Jon/finance: is the lock on markup only, or markup plus listed monthly fees? Any exceptions (e.g. risk changes, chargeback-driven pricing)? Link to the written term. |
| month-to-month | published | / | Jon: confirm no early termination fee; equipment return terms on cancellation. |
| us-support | published | /, /support/, /contact/ |  |
| dual-pricing-cost | pending | / | Finance: what the merchant still pays under dual pricing. |
| coverage | pending | / | Ops: current states with active merchants/representatives. |
| holt-quote | published | /statement-review/ | Customer success: permission, business name, review source link; candidate for a full story. |
| follow-up-time | pending | /contact/ | Ops: who owns follow-up and the actual standard. |
| office-hours | pending | /contact/ | Ops. |
