# Owner sign-off: what Jon needs to confirm

Every promise, number, name and policy on the new site that only TruePay can confirm. The site was built so nothing in this list is presented as fact until it is confirmed. Each claim is tracked in `src/content/claims.ts`, and people and company details in `src/content/entity.ts`.

**How to use this sheet:** For each row, Jon either confirms the wording as written, gives the correct detail, or says to remove it. Rows marked **Before launch** have to be settled before the pages they appear on go live. Rows marked **Can follow** can launch without the detail and be added later.

Compiled Oct. 24, 2026, from `claims.ts`, `entity.ts` and the reviews on PRs #3 through #10.

## 1. Pricing promises

| What the site says | Where it appears | What to confirm | When |
|---|---|---|---|
| "We lock our rate. TruePay won't raise its markup for as long as you process with us." The fine print says the lock covers TruePay's markup and monthly fees, while card-network costs can change. | Home, Why TruePay, Pricing, Membership, guide on why fees go up | Does the lock cover the markup only, or the markup plus monthly fees? Are there exceptions, such as risk or chargeback pricing? Which written term should the page link to? | Before launch |
| "Membership uses interchange-plus pricing: the card network's cost plus a small, fixed TruePay markup, itemized line by line." | Pricing, Membership, eight industry pages | Is Membership interchange-plus for every merchant? What is the markup structure (percentage plus per-item)? | Before launch |
| "Every fee is listed on your agreement and explained on your statement." | Why TruePay | Is the current fee schedule published or available on request? | Before launch |
| "With dual pricing, customers who pay by card pay the card price, which can offset most of your processing cost. Some costs, such as monthly fees, can still apply." | Home, Dual pricing | What does a merchant still pay under dual pricing? | Before launch |
| "We set up dual pricing to follow card-network rules, including the signage, receipts and checkout display your customers see." | Dual pricing | Current program structure and customer disclosures. The site never says "legal in all 50 states" or "100% compliant." | Before launch |
| "A terminal is included with Membership." | Why TruePay, Membership, Terminals | Who is eligible, and who owns the terminal? What happens to it if the merchant cancels? | Before launch |
| "Lifetime TrueCare coverage repairs or replaces covered equipment for as long as you're a customer." | Why TruePay, Membership, Terminals | The written TrueCare terms: what equipment is covered and what is excluded. | Before launch |
| "Month-to-month service. No long-term contract." *(already published on the current site)* | Home, Why TruePay, Membership, switching guide | Confirm there is no early termination fee, and the equipment return terms on cancellation. | Before launch |

## 2. Service and support

| What the site says | Where it appears | What to confirm | When |
|---|---|---|---|
| "Office hours: Monday-Friday, 8 a.m. to 6 p.m. Central." | Contact | Are these the current hours? | Before launch |
| "A real person will follow up within one business day." | Contact | Who owns follow-up, and is one business day the real standard? | Before launch |
| "We program your equipment, set it up and train your team." | Solutions, Point of sale, switching guide | Is setup on-site or remote, and does it vary by region? | Before launch |
| "Based in Josephine, Texas, serving businesses across the U.S." | Home, Service areas | Is nationwide service accurate today? A state count ("30+ states") is left out until the coverage list is reconciled. | Before launch |
| Merchant support available 24/7 *(claim `support-hours`)* | Not shown anywhere yet | The actual support channels and hours, kept separate from sales hours. | Can follow |
| Direct support text line *(claim `text-line`)* | Not shown anywhere yet | The text number and who answers it. | Can follow |
| Statement review turnaround in N business days *(claim `review-turnaround`)* | Not shown anywhere yet | Who does the reviews, the turnaround time and a secure way for merchants to send statements. | Can follow |

## 3. People and company

| Item | Where it appears | What to confirm | When |
|---|---|---|---|
| Jon's name, title and photo | Team, Jon's profile, guide bylines | Preferred name ("Jon Wilson" or "Jonathan Wilson"), a photo and LinkedIn URL. | Before launch |
| "Jon has worked in payments since 2006." | Jon's profile | The year Jon started in the industry. | Before launch |
| Shane Spears, "Chief Operating Officer" | Team, Shane's profile, guide bylines, industry pages | Title (Chief Operating Officer or Operations Director), a photo and LinkedIn URL. | Before launch |
| Mandie Spears, "Head of Support" | Team | Spelling (Mandie or Mandy) and title. | Before launch |
| Tim Files, "Owner and Investor" | Team | Should Tim appear on the public site at all? | Before launch |
| Adam Watson, "Sales Team Lead" | Team | Current role. The approved design PDF lists a different sales team (Joe Carter, Luis Garza, Pete Irby). Who should appear? | Before launch |
| "Serving business owners since 2011" | Home, About, Team, Jon's profile | The founding year and the registered legal entity name, for example TruePay LLC. The legal name goes in the footer and the search-engine company data. | Before launch |
| Merchant login link | Support | The real merchant portal URL. The old `/welcome/` page is not being carried over. | Before launch |
| Google Business Profile and LinkedIn company page | Search-engine company data | The profile URLs, so search engines link them to the site. | Can follow |
| Team photos | Team and profiles | Real photos. The pages use a clean no-photo design until then, never initials or stock images. | Can follow |

## 4. Guide authorship

Six guides on the Resources page are credited to Jon or Shane. A byline the person hasn't read undermines trust with readers and with Google, so each named author has to read and approve their guides before launch.

| Guide | Written by | Reviewer to confirm | When |
|---|---|---|---|
| How to read your processing statement | Jon | Shane | Before launch |
| Flat rate, tiered or interchange-plus | Jon | Shane | Before launch |
| Why did my processing fees go up? | Jon | Shane | Before launch |
| Dual pricing, surcharging and cash discounts | Shane | Jon | Before launch |
| How credit card processing works | Shane | Jon | Before launch |
| How to switch payment processors | Shane | Jon | Before launch |

When the reviewer finishes, add a `reviewedAt` date to the guide. The page then shows "Reviewed by" automatically. Until then it shows only the author and the dates.

## 5. Partner program

| What the site says | Where it appears | What to confirm | When |
|---|---|---|---|
| "Sales reps earn 50% and referral partners earn 20% of TruePay's applicable profit." | Partners | The current splits and the written definition of "applicable profit." | Before launch |
| Estimator defaults: 1% profit margin (low end of a 1%-1.75% range), 2% monthly attrition and $25,000 monthly volume per merchant | Partners | The margin range, a typical TruePay merchant's monthly card volume (the $25,000 is a placeholder), and counsel review of the earnings language. | Before launch |
| "Earn up to $1,000 for a merchant referral that signs and starts processing." | Partners | The current reward amount, what triggers it and when it is paid. | Before launch |

## 6. Customer quotes

| Item | Where it appears | What to confirm | When |
|---|---|---|---|
| M. Holt quote ("…paying in excess of $50,000.00 a year … our credit card fees are $420.00") | Statement review, Customer stories | It is already published on the current site and is shown word for word with "Individual results vary." Get written permission and the business name, which would also allow a full customer story. | Can follow |
| Longer R. Moore quote ("fees used to run over $800 a month. Now I pay almost nothing") | Not used | This version is banned until its source is confirmed. The short published quote is used instead. | Can follow |
| New customer stories | Story pages are ready but unpublished | Customers who would share a named story with permission. | Can follow |

## 7. Legal

| Page | What is needed | When |
|---|---|---|
| Privacy policy | Counsel review. It keeps the published July 16, 2024, text and adds a section on how the website forms handle information. | Before launch |
| Terms of use | Counsel review of the new website terms, which cover the calculators and illustrations. | Before launch |

## 8. Old pages to retire

These pages from the current site won't be carried over. Confirm that nobody still relies on them.

| Old URL | Plan |
|---|---|
| `/survey-sheet/`, `/clover-survey-sheet-fillable-4/`, `/sale-sheet/` | Internal sales forms. Move them to a forms tool if the team still uses them. |
| `/marketing-test/`, `/digital-marketing-services-test/`, `/welcome-backup-page/` | Test and backup pages. They will return "not found." |
