# TruePay QA report

Run: 2026-10-23T19:06:03.552Z · Base: http://127.0.0.1:4010 · Mode: preview · Phases ≤ 0

**0 FAIL · 10 WARN · 46 INFO** across 1 audited pages.

| Route | Status | FAIL | WARN |
| --- | --- | ---: | ---: |
| / | draft | 0 | 9 |

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
- **links**: Required contextual link to /effective-rate-calculator/ missing from <main>
### (site)
- **links**: Internal link goes through a redirect: /reviews/ → /customer-stories/

## Info

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
### /get-started/
- **redirects**: Destination /statement-review/ not built yet
### /cost-analysis/
- **redirects**: Destination /statement-review/ not built yet
### /welcome/
- **redirects**: Destination /support/ not built yet
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
### /contact/
- **migration**: Existing live URL must keep working; got 404
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
| honest-recommendation | published | / |  |
| rate-lock | pending | / | Jon/finance: is the lock on markup only, or markup plus listed monthly fees? Any exceptions (e.g. risk changes, chargeback-driven pricing)? Link to the written term. |
| month-to-month | published | / | Jon: confirm no early termination fee; equipment return terms on cancellation. |
| us-support | published | / |  |
| dual-pricing-cost | pending | / | Finance: what the merchant still pays under dual pricing. |
| coverage | pending | / | Ops: current states with active merchants/representatives. |
