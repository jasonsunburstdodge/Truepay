# Keyboard-only walkthrough (Phase 8)

Run Oct. 24, 2026 against a production build with every route temporarily set to `live`, at 1440px and 390px.

| Check | Result |
|---|---|
| First Tab on `/` | Lands on "Skip to content" (`#main-content`) |
| Tab stops with a visible focus indicator | `/` 98 of 98, `/effective-rate-calculator/` 63 of 63, `/partners/` 84 of 84, `/statement-review/` 75 of 75 |
| Rate calculator by keyboard | Typing $20,000 volume and $600 fees shows 3.00% |
| Partner estimator by keyboard | Typing $40,000 volume shows $200.00 for a sales rep (40,000 × 1% × 50%); Arrow Down switches the path select to referral partner |
| Empty form submit with Enter | Focus moves to the first required field (`#review-name`) |
| Mobile menu (390px) | Enter opens it (`aria-expanded="true"`), Tab moves into the first menu link, Escape closes it (`aria-expanded="false"`) |

axe-core (WCAG 2.0, 2.1 and 2.2 A/AA tags) on all 42 sitemap pages at both widths: **0 violations** after the Phase 8 contrast fixes. Raw results: `axe-results.json`.
