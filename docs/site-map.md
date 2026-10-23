# TruePay site map

Generated from `src/content/routes.ts` and `src/content/redirects.ts` by `npm run map`. Do not edit by hand.

43 routes plus the customer-story template · 41 redirects from the live site.

## Navigation

- **Why TruePay** → `/why-truepay/`
- **Pricing** → `/pricing/`
  - Membership → `/pricing/membership/`
  - Dual pricing → `/pricing/dual-pricing/`
  - Effective rate calculator → `/effective-rate-calculator/`
- **Solutions** → `/solutions/`
  - Point of sale → `/solutions/point-of-sale/`
  - Terminals → `/solutions/terminals/`
  - Mobile payments → `/solutions/mobile-payments/`
  - Online payments → `/solutions/online-payments/`
  - Keep your POS → `/solutions/integrations/`
  - Billing software → `/solutions/billing-software/`
- **Industries** → `/industries/`
  - Restaurants & bars → `/industries/restaurants/`
  - Retail → `/industries/retail/`
  - Salons & spas → `/industries/salons-spas/`
  - Medical & dental → `/industries/medical-dental/`
  - Home services → `/industries/home-services/`
  - Auto services → `/industries/auto-services/`
  - Professional services → `/industries/professional-services/`
  - Nonprofits → `/industries/nonprofits/`
- **Resources** → `/resources/`
- **About** → `/about/`
  - Our team → `/about/team/`
  - Customer stories → `/customer-stories/`
  - Service areas → `/service-areas/`
  - Partner program → `/partners/`
  - Careers → `/careers/`
- Utility: Support `/support/`, Contact `/contact/`, phone 888-792-0284, button: Get my free statement review

## Phase 0

### `/` · Home

- **Template / status:** home · draft
- **Title (46):** TruePay | Payment Processing Without the Games
- **Description (149):** Honest credit card processing from a Texas team you can actually reach. Locked rates, month-to-month service and a free statement review. Since 2011.
- **H1:** Payments without the games.
- **Intent:** Brand and broad 'honest credit card processing company' discovery; can this processor help me and can I count on them?
- **Questions to answer:** “Who is TruePay and who is it for?” · “What happens in a free statement review?” · “Will my rate go up after I sign?” · “Who do I call when something breaks?”
- **CTA:** statement-review + talk-to-person · **Schema:** Organization, WebSite, WebPage
- **Must link to:** `/why-truepay/`, `/pricing/`, `/pricing/dual-pricing/`, `/solutions/`, `/industries/`, `/customer-stories/`, `/about/team/`, `/effective-rate-calculator/`
- **Content sources:** gh:src/components/*; dev:/ (fit / not-a-fit block, Built on a handshake); live:/ (mission, commitments, reviews); pdf:p1
- **Claims:** founded-2011, rate-lock, month-to-month, us-support, honest-recommendation
- **Notes:** Order: outcome hero + 2 CTAs → 'Sound familiar?' merchant frustrations → commitments strip (links to /why-truepay/#fine-print) → real people strip → choose-how-you-pay cards → dual-pricing fit/not-a-fit → calculator preview → reviews (published, attributed) → coverage → review form.

## Phase 1

### `/statement-review/` · Free statement review

- **Template / status:** conversion · draft
- **Title (54):** Free Credit Card Processing Statement Review | TruePay
- **Description (153):** Send your latest processing statement. We'll explain every fee, find your effective rate and give you an honest recommendation, even if it's to stay put.
- **H1:** Find out what you're really paying.
- **Intent:** Merchant wants someone to read their processing statement and tell them if they are overpaying.
- **Questions to answer:** “What do I get from a statement review?” · “How do I send my statement, and who sees it?” · “How long does it take?” · “Is there any cost or obligation?”
- **CTA:** statement-review + talk-to-person · **Schema:** WebPage, Service, BreadcrumbList
- **Must link to:** `/effective-rate-calculator/`, `/resources/how-to-read-your-processing-statement/`, `/pricing/`, `/about/team/`
- **Content sources:** dev:/start-here/; dev:/pricing/ (4-step review); pdf:p17; gh:lead-form.tsx
- **Claims:** honest-recommendation, review-turnaround
- **Notes:** Replaces live /get-started/ and /cost-analysis/. Form must not claim a statement was received until upload/email intake actually works. No file input until secure storage is confirmed.

### `/effective-rate-calculator/` · Effective rate calculator

- **Template / status:** tool · draft
- **Title (55):** Effective Rate Calculator for Card Processing | TruePay
- **Description (138):** Enter one month of card sales and total processing fees to see your effective rate as a single percentage, plus what usually drives it up.
- **H1:** What's your real processing rate?
- **Intent:** Calculate effective credit card processing rate; understand why it differs from the advertised rate.
- **Questions to answer:** “What is an effective rate?” · “Which fees should I include?” · “Why is my effective rate higher than the rate I was quoted?” · “What is a typical effective rate?”
- **CTA:** statement-review · **Schema:** WebPage, BreadcrumbList
- **Must link to:** `/statement-review/`, `/resources/how-to-read-your-processing-statement/`, `/resources/why-credit-card-processing-fees-go-up/`
- **Content sources:** gh:rate-calculator.tsx; gh:industries.ts calculatorNote
- **Notes:** Formula and worked example rendered as HTML text, not only in JS. Validate empty/zero/negative inputs. 'Typical rate' answer needs a sourced range or must be removed.

### `/support/` · Support

- **Template / status:** utility · draft
- **Title (45):** TruePay Merchant Support: Call, Text or Email
- **Description (136):** Existing TruePay merchant? Reach a real, US-based person about equipment, deposits, billing or your account, and see what to have ready.
- **H1:** Need help? Reach a real person.
- **Intent:** Existing merchant needs help fast.
- **Questions to answer:** “How do I reach support?” · “What hours is support available?” · “What should I have ready?” · “Where do I log in to my account?”
- **CTA:** support · **Schema:** WebPage, BreadcrumbList
- **Must link to:** `/contact/`, `/about/team/`
- **Content sources:** live:/ (direct text line, 24/7); pdf:p4; pdf:p18
- **Claims:** us-support, support-hours, text-line
- **Notes:** Never route support users into a sales form. Merchant login = verified external portal link only; live /welcome/ redirects here.

### `/contact/` · Contact

- **Template / status:** utility · draft
- **Title (30):** Contact TruePay | 888-792-0284
- **Description (149):** Questions about switching, pricing or equipment? Call 888-792-0284, email or send a note, and a person from our Josephine, Texas team will follow up.
- **H1:** Tell us what your business needs.
- **Intent:** Contact sales or the company.
- **Questions to answer:** “Who will I talk to?” · “What happens after I submit?” · “Where is TruePay located?”
- **CTA:** talk-to-person + statement-review · **Schema:** ContactPage, BreadcrumbList
- **Must link to:** `/support/`, `/statement-review/`
- **Content sources:** live:/contact/; pdf:p16; pdf:p18
- **Claims:** office-hours, follow-up-time

### `/thank-you/` · Thank you

- **Template / status:** utility · draft · noindex
- **Title (30):** Thanks, We've Got It | TruePay
- **Description (134):** Your request reached the TruePay team. Here's what happens next, what to have ready and where to find straight answers while you wait.
- **H1:** Thanks. Here's what happens next.
- **Intent:** Post-submission confirmation.
- **CTA:** none · **Schema:** WebPage
- **Must link to:** `/resources/`
- **Content sources:** pdf:p16
- **Notes:** noindex, excluded from sitemap, no personal data in the URL.

## Phase 2

### `/why-truepay/` · Why TruePay

- **Template / status:** commitments · draft
- **Title (52):** Why TruePay: Locked Rates, Real People, No Contracts
- **Description (144):** What TruePay commits to in plain terms: a locked rate, month-to-month service, equipment coverage and people you can reach. Plus the fine print.
- **H1:** Built on a handshake. Here it is in writing.
- **Intent:** Is this processor different, and what's the catch? (comparison / due-diligence stage)
- **Questions to answer:** “What exactly does the rate lock cover?” · “Can I leave anytime, and is there a cancellation fee?” · “What does Lifetime TrueCare cover?” · “Who is TruePay not a good fit for?”
- **CTA:** statement-review + talk-to-person · **Schema:** WebPage, BreadcrumbList
- **Must link to:** `/pricing/membership/`, `/about/`, `/resources/why-credit-card-processing-fees-go-up/`, `/customer-stories/`
- **Content sources:** dev:/what-makes-us-different/; live:/ (Our Commitment to You); pdf:p1-3
- **Claims:** rate-lock, month-to-month, truecare, us-support, honest-recommendation, no-hidden-fees
- **Notes:** Differentiator hub. Each commitment = plain promise + 'what it covers' + 'what it doesn't' + link to terms. Section id='fine-print' is a link target from home.

### `/pricing/` · Pricing

- **Template / status:** pricing · draft
- **Title (51):** Credit Card Processing Pricing, Explained | TruePay
- **Description (130):** What really sets your processing rate, how flat-rate, tiered and cost-plus pricing compare, and the two ways to work with TruePay.
- **H1:** Understand the cost before you choose.
- **Intent:** How much does credit card processing cost; what are TruePay's rates?
- **Questions to answer:** “What are TruePay's rates?” · “What determines my processing rate?” · “Flat rate, tiered or cost-plus: which is cheaper?” · “Membership or dual pricing: which fits my business?”
- **CTA:** statement-review + calculator · **Schema:** WebPage, BreadcrumbList
- **Must link to:** `/pricing/membership/`, `/pricing/dual-pricing/`, `/effective-rate-calculator/`, `/resources/flat-rate-vs-tiered-vs-interchange-plus/`
- **Content sources:** dev:/pricing/; live:/membership-program/; live:/dual-pricing-program/; pdf:p14
- **Claims:** cost-plus, rate-lock

### `/pricing/membership/` · Membership

- **Template / status:** pricing · draft
- **Title (47):** Membership: Cost-Plus Card Processing | TruePay
- **Description (149):** TruePay Membership: interchange-plus pricing, a locked markup, month-to-month billing, an included terminal and Lifetime TrueCare equipment coverage.
- **H1:** Membership: transparent pricing with your rate locked.
- **Intent:** Lowest-cost traditional processing with transparent pricing.
- **Questions to answer:** “How does membership pricing work?” · “What's included?” · “What fees still apply?” · “Who is membership best for?”
- **CTA:** statement-review · **Schema:** WebPage, Service, BreadcrumbList
- **Must link to:** `/pricing/dual-pricing/`, `/why-truepay/`, `/solutions/terminals/`
- **Content sources:** live:/membership-program/; dev:/membership-program/
- **Claims:** cost-plus, rate-lock, month-to-month, free-terminal, truecare
- **Notes:** Needs the current fee schedule from finance before 'ready'.

### `/pricing/dual-pricing/` · Dual pricing

- **Template / status:** pricing · draft
- **Title (51):** Dual Pricing Program for Small Businesses | TruePay
- **Description (130):** How dual pricing works, what your customers see at checkout, who it fits and who it doesn't, and what setup with TruePay involves.
- **H1:** Is dual pricing right for your business?
- **Intent:** Should I offer dual pricing / cash price vs card price? How does it work?
- **Questions to answer:** “How does dual pricing work?” · “What do customers see at checkout and on the receipt?” · “Who is dual pricing a good fit for, and who isn't it for?” · “How is it different from surcharging or a cash discount?”
- **CTA:** statement-review + talk-to-person · **Schema:** WebPage, Service, BreadcrumbList
- **Must link to:** `/resources/dual-pricing-vs-surcharging-vs-cash-discount/`, `/pricing/membership/`, `/industries/restaurants/`
- **Content sources:** dev:/ (fit / not-a-fit); dev:/dual-pricing-program/; live:/dual-pricing-program/; pdf:p15
- **Claims:** dual-pricing-rules, dual-pricing-cost
- **Notes:** Use ONE consistent worked example (pdf:p15 arithmetic is wrong; see brief). No 'legal in all 50 states', no 'zero fees'.

## Phase 3

### `/solutions/` · Solutions

- **Template / status:** hub · draft
- **Title (57):** Payment Processing Solutions for Small Business | TruePay
- **Description (141):** Counter, table, field or online: find the terminal, POS or software that fits how you take payments, with setup and support from real people.
- **H1:** Payments that fit the way you do business.
- **Intent:** What equipment/software do I need to take payments?
- **Questions to answer:** “What equipment do I need?” · “Can I keep my current system?” · “Who sets it up and trains my team?”
- **CTA:** talk-to-person + statement-review · **Schema:** CollectionPage, BreadcrumbList
- **Must link to:** `/solutions/point-of-sale/`, `/solutions/terminals/`, `/solutions/mobile-payments/`, `/solutions/online-payments/`, `/solutions/integrations/`, `/solutions/billing-software/`, `/pricing/`
- **Content sources:** gh:payment-methods-section.tsx; dev:/ (payment solutions block)

### `/solutions/point-of-sale/` · Point of sale

- **Template / status:** solution · draft
- **Title (46):** POS Systems for Restaurants & Retail | TruePay
- **Description (124):** Clover, SkyTab and other POS options for restaurants, bars and retail, set up, configured and supported by the TruePay team.
- **H1:** Keep checkout moving with a POS that fits.
- **Intent:** POS system for a restaurant or retail store with processing included.
- **Questions to answer:** “Which POS fits my business?” · “Can I keep my current POS?” · “Who installs it and trains my staff?” · “What happens if it goes down on a Friday night?”
- **CTA:** talk-to-person + statement-review · **Schema:** WebPage, Service, BreadcrumbList
- **Must link to:** `/solutions/integrations/`, `/industries/restaurants/`, `/industries/retail/`, `/support/`
- **Content sources:** live:/point-of-sale/; live:/pos-system/, /skytab-*/, /paradise-pos/, /mobile-bytes/; dev:/point-of-sale/; pdf:p10
- **Claims:** setup-training

### `/solutions/terminals/` · Terminals

- **Template / status:** solution · draft
- **Title (54):** Credit Card Terminals: Countertop & Wireless | TruePay
- **Description (138):** Countertop and wireless card terminals that take chip, tap and mobile wallets, programmed before they ship and covered by TruePay support.
- **H1:** Card terminals your team can use with confidence.
- **Intent:** Which credit card terminal should I get; is one included?
- **Questions to answer:** “Countertop or wireless: which do I need?” · “Is a terminal included?” · “What's covered if it breaks?” · “Which payment types does it take?”
- **CTA:** talk-to-person · **Schema:** WebPage, Service, BreadcrumbList
- **Must link to:** `/pricing/membership/`, `/solutions/mobile-payments/`, `/why-truepay/`
- **Content sources:** live:/terminals/; live:/vl-100/, /vl-110/, /vl-500/, /dejavoo-qd4/, /clover-flex/; pdf:p11
- **Claims:** free-terminal, truecare
- **Notes:** One comparison table across models. Specs per model must be verified; do not assume every feature on every model.

### `/solutions/mobile-payments/` · Mobile payments

- **Template / status:** solution · draft
- **Title (39):** Mobile Credit Card Processing | TruePay
- **Description (137):** Take card payments on the job site, at the curb or at events with portable terminals and apps, and know what to do when the signal drops.
- **H1:** Take payment where the work gets done.
- **Intent:** Accept credit cards on the go / in the field.
- **Questions to answer:** “Do I need a separate card reader?” · “What happens without cell service?” · “How do customers get a receipt?”
- **CTA:** talk-to-person · **Schema:** WebPage, Service, BreadcrumbList
- **Must link to:** `/industries/home-services/`, `/solutions/terminals/`
- **Content sources:** live:/online-check-out/ (mobile section); live:/valor-pay-app/; pdf:p11

### `/solutions/online-payments/` · Online payments

- **Template / status:** solution · draft
- **Title (46):** Online Payment Processing & Gateways | TruePay
- **Description (134):** Accept payments on your website with a gateway that fits your platform, plus help with setup, reporting and QuickBooks reconciliation.
- **H1:** Get paid online without the headaches.
- **Intent:** Ecommerce payment gateway / accept credit cards online.
- **Questions to answer:** “Will it work with my website?” · “Who handles setup?” · “What does it cost?”
- **CTA:** talk-to-person · **Schema:** WebPage, Service, BreadcrumbList
- **Must link to:** `/solutions/billing-software/`, `/pricing/`
- **Content sources:** live:/online-check-out/; pdf:p12

### `/solutions/integrations/` · Keep your POS

- **Template / status:** solution · draft
- **Title (51):** Keep Your POS, Lower Your Processing Cost | TruePay
- **Description (140):** Happy with your current POS or software? In many cases TruePay can process for it, so you keep the system your team knows. See how to check.
- **H1:** Keep the system you know. Change who processes it.
- **Intent:** Can I switch processors without replacing my POS?
- **Questions to answer:** “Can TruePay work with my current POS?” · “How do you confirm compatibility?” · “What changes for my staff?”
- **CTA:** talk-to-person · **Schema:** WebPage, Service, BreadcrumbList
- **Must link to:** `/resources/how-to-switch-payment-processors/`, `/solutions/point-of-sale/`
- **Content sources:** dev:/integrations/; pdf:p1; pdf:p12-13
- **Notes:** Needs a verified compatibility list. Never 'works with everything'.

### `/solutions/billing-software/` · Billing software

- **Template / status:** solution · draft
- **Title (48):** Invoicing & Recurring Billing Software | TruePay
- **Description (142):** Send invoices, collect card and ACH payments and sync with QuickBooks, with billing tools TruePay sets up and supports for service businesses.
- **H1:** Send the invoice. Get paid. Keep the books clean.
- **Intent:** Invoicing / recurring billing with card payments and QuickBooks.
- **Questions to answer:** “Does it work with QuickBooks?” · “Can I bill customers on a schedule?” · “What does it cost?”
- **CTA:** talk-to-person · **Schema:** WebPage, Service, BreadcrumbList
- **Must link to:** `/industries/professional-services/`, `/solutions/online-payments/`
- **Content sources:** dev:/billing-software/; pdf:p13 (Biller Genie, MantaPay)
- **Notes:** ACH and QuickBooks versions must be confirmed before 'ready'.

## Phase 4

### `/about/` · About

- **Template / status:** trust · draft
- **Title (50):** About TruePay: Texas Payment Processing Since 2011
- **Description (137):** TruePay started in 2011 to fix what business owners hate about card processing. Meet the people, the handshake principle and how we work.
- **H1:** Built on a handshake. Accountable to your business.
- **Intent:** Who is TruePay; are they credible?
- **Questions to answer:** “Who owns and runs TruePay?” · “Why was TruePay started?” · “Who stays involved after I sign up?”
- **CTA:** talk-to-person + statement-review · **Schema:** AboutPage, BreadcrumbList
- **Must link to:** `/about/team/`, `/about/jon-wilson/`, `/why-truepay/`, `/customer-stories/`, `/service-areas/`
- **Content sources:** dev:/our-story/; live:/about-us/; pdf:p2-3
- **Claims:** founded-2011, payments-since-2006

### `/about/team/` · Our team

- **Template / status:** trust · draft
- **Title (49):** Meet the TruePay Team | Real People You Can Reach
- **Description (138):** The people behind TruePay: who leads the company, who sets up your equipment, who answers when you call and how to reach the right person.
- **H1:** Know who's helping your business.
- **Intent:** Who will I actually deal with?
- **Questions to answer:** “Who will I work with?” · “Who handles support?” · “How do I reach the right person?”
- **CTA:** talk-to-person · **Schema:** WebPage, BreadcrumbList
- **Must link to:** `/about/jon-wilson/`, `/about/shane-spears/`, `/support/`
- **Content sources:** dev:/our-team/; pdf:p4; pdf:p7
- **Notes:** Only confirmed people. Remove 'Lorem Ipsum, VP of Sales'. Reconcile roster (pdf p4 vs p7) and Mandie/Mandy spelling. Real headshots, not initials.

### `/about/jon-wilson/` · Jon Wilson

- **Template / status:** profile · draft
- **Title (36):** Jon Wilson, Founder & CEO of TruePay
- **Description (143):** Jon Wilson founded TruePay in 2011 after years in payments. His background, why he started TruePay and the guides he has written for merchants.
- **H1:** Jon Wilson
- **Intent:** Who is the founder; is he a real, experienced person? (E-E-A-T author entity)
- **Questions to answer:** “What is Jon's background in payments?” · “Why did he start TruePay?”
- **CTA:** talk-to-person · **Schema:** ProfilePage, Person, BreadcrumbList
- **Must link to:** `/about/`, `/resources/`
- **Content sources:** live:/about-us/; dev:/our-story/
- **Notes:** Name form: confirm 'Jon' vs 'Jonathan' (gh site-config says Jonathan). Use the confirmed form everywhere; the other goes in Person.alternateName. Author page for guides he writes.

### `/about/shane-spears/` · Shane Spears

- **Template / status:** profile · draft
- **Title (47):** Shane Spears, Chief Operating Officer | TruePay
- **Description (129):** Shane Spears runs day-to-day operations at TruePay: onboarding, equipment and support. His background and how he helps merchants.
- **H1:** Shane Spears
- **Intent:** Operations leader profile; reviewer entity for setup/switching guides.
- **Questions to answer:** “What does Shane oversee?” · “How does he help merchants after signup?”
- **CTA:** talk-to-person · **Schema:** ProfilePage, Person, BreadcrumbList
- **Must link to:** `/about/team/`, `/resources/how-to-switch-payment-processors/`
- **Content sources:** live:/about-us/; dev:/our-team/; pdf:p4
- **Notes:** Title conflict: COO (dev site, pdf) vs Operations Director (older live). Confirm before 'ready'.

### `/customer-stories/` · Customer stories

- **Template / status:** collection · draft
- **Title (34):** TruePay Reviews & Customer Stories
- **Description (127):** What business owners say about working with TruePay, in their own words, with links to where each review was originally posted.
- **H1:** Hear it from the business owners.
- **Intent:** TruePay reviews; do they follow through?
- **Questions to answer:** “What do customers say about TruePay?” · “Have they helped a business like mine?”
- **CTA:** statement-review · **Schema:** CollectionPage, BreadcrumbList
- **Must link to:** `/why-truepay/`, `/industries/`
- **Content sources:** live:/reviews/; gh:site-config.ts testimonials; pdf:p5
- **Claims:** holt-quote
- **Notes:** No AggregateRating/Review schema about TruePay itself (self-serving). Link to the original Google/Facebook review where possible. Includes a review-request block for existing merchants.

### `/customer-stories/[slug]/` · Customer story

- **Template / status:** story · planned
- **Title (41):** {Business} + TruePay: {Outcome} | TruePay
- **Description (64):** Template: how {business} in {city} {outcome}, told by the owner.
- **H1:** {Outcome headline in the owner's words}
- **Intent:** Proof for a specific industry/problem.
- **Questions to answer:** “What was the problem?” · “What did TruePay change?” · “What happened after?”
- **CTA:** statement-review · **Schema:** Article, BreadcrumbList
- **Must link to:** `/customer-stories/`, `/industries/`
- **Content sources:** Permissioned merchant interviews (none supplied yet)
- **Notes:** Template only. Publish a story only with identity, permission and evidence. M. Holt is a candidate interview.

### `/service-areas/` · Service areas

- **Template / status:** area · draft
- **Title (51):** Where TruePay Serves Merchants | Texas & Nationwide
- **Description (142):** Based in Josephine, Texas, TruePay serves businesses across the country. See where we have local representatives and how remote support works.
- **H1:** Rooted in Texas. Serving businesses nationwide.
- **Intent:** Does TruePay serve my area? Is help local?
- **Questions to answer:** “Do you serve my state?” · “Is support local or remote?”
- **CTA:** talk-to-person · **Schema:** WebPage, BreadcrumbList
- **Must link to:** `/contact/`, `/about/team/`
- **Content sources:** live:/coast-to-coast-customer-network/; gh:coverage-section.tsx; pdf:p6
- **Claims:** coverage
- **Notes:** No per-city doorway pages. State pages (Texas, Oklahoma, Arkansas) only with distinct local evidence; Phase 9.

## Phase 5

### `/resources/` · Resources

- **Template / status:** hub · draft
- **Title (55):** Payment Processing Guides for Business Owners | TruePay
- **Description (142):** Plain-English guides to processing statements, pricing models, dual pricing and switching processors, written by people who do this every day.
- **H1:** Straight answers about payment processing.
- **Intent:** Merchant education hub.
- **Questions to answer:** “Where do I start?”
- **CTA:** statement-review + calculator · **Schema:** CollectionPage, BreadcrumbList
- **Must link to:** `/resources/how-to-read-your-processing-statement/`, `/resources/flat-rate-vs-tiered-vs-interchange-plus/`, `/resources/dual-pricing-vs-surcharging-vs-cash-discount/`, `/resources/why-credit-card-processing-fees-go-up/`, `/resources/how-to-switch-payment-processors/`, `/resources/how-credit-card-processing-works/`, `/effective-rate-calculator/`
- **Content sources:** live:/blog/ (7 posts, see redirects.ts)

### `/resources/how-to-read-your-processing-statement/` · Reading your statement

- **Template / status:** guide · draft
- **Title (56):** How to Read a Credit Card Processing Statement | TruePay
- **Description (141):** A line-by-line guide to your merchant statement: interchange, assessments, markup and monthly fees, and how to find your real effective rate.
- **H1:** How to read your credit card processing statement
- **Intent:** how to read a merchant processing statement; what are these fees
- **Questions to answer:** “What are interchange, assessments and processor markup?” · “Which fees are normal and which are worth questioning?” · “How do I calculate my effective rate from a statement?” · “What questions should I ask my processor?”
- **CTA:** statement-review + calculator · **Schema:** Article, BreadcrumbList
- **Must link to:** `/effective-rate-calculator/`, `/statement-review/`, `/resources/flat-rate-vs-tiered-vs-interchange-plus/`, `/resources/how-credit-card-processing-works/`
- **Content sources:** pdf:p14; pdf:p17; brief:§16
- **Notes:** Needs an anonymized, annotated real statement image and a named reviewer.

### `/resources/flat-rate-vs-tiered-vs-interchange-plus/` · Pricing models compared

- **Template / status:** guide · draft
- **Title (59):** Flat Rate vs. Tiered vs. Interchange-Plus Pricing | TruePay
- **Description (134):** How the three common card-processing pricing models work, what each costs at different sales volumes and which one fits your business.
- **H1:** Flat rate, tiered or interchange-plus: which costs less?
- **Intent:** flat rate vs interchange plus; tiered pricing explained; Square/Stripe vs merchant account cost
- **Questions to answer:** “What is flat-rate pricing?” · “What is tiered pricing and why is it hard to read?” · “What is interchange-plus (cost-plus) pricing?” · “Which model is cheapest at my volume?”
- **CTA:** statement-review · **Schema:** Article, BreadcrumbList
- **Must link to:** `/pricing/`, `/pricing/membership/`, `/effective-rate-calculator/`
- **Content sources:** dev:/pricing/ (Model 01–03); live post: discover-the-top-5-benefits-of-flat-rate-payment-processing (replace)
- **Notes:** Fair to flat rate where it genuinely fits (very low volume). Worked examples at 2–3 volume levels with stated assumptions.

### `/resources/dual-pricing-vs-surcharging-vs-cash-discount/` · Dual pricing vs. surcharging

- **Template / status:** guide · draft
- **Title (56):** Dual Pricing vs. Surcharging vs. Cash Discount | TruePay
- **Description (143):** Three ways to pass card costs to customers, side by side: how each works, debit card rules, signage and receipts, and which fits your checkout.
- **H1:** Dual pricing, surcharging and cash discounts: what's the difference?
- **Intent:** dual pricing vs surcharge; is cash discount legal; surcharge rules
- **Questions to answer:** “What's the difference between dual pricing, surcharging and a cash discount?” · “Can I add a fee to debit card purchases?” · “What signage and receipt rules apply?” · “Which option fits my business?”
- **CTA:** talk-to-person · **Schema:** Article, BreadcrumbList
- **Must link to:** `/pricing/dual-pricing/`, `/industries/restaurants/`
- **Content sources:** pdf:p15; live post: the-dual-pricing-advantage-how-it-benefits-both-businesses-and-consumers
- **Notes:** YMYL-ish: cite card-network rules and state law sources with dates; named compliance reviewer. The commercial page /pricing/dual-pricing/ owns the offer; this page stays neutral.

### `/resources/why-credit-card-processing-fees-go-up/` · Why fees go up

- **Template / status:** guide · draft
- **Title (55):** Why Did My Credit Card Processing Fees Go Up? | TruePay
- **Description (145):** Card networks, processor markups and new monthly fees: the real reasons processing costs rise, how to spot them on your statement and what to do.
- **H1:** Why did my credit card processing fees go up?
- **Intent:** processing fees increased; rate creep; new fee on merchant statement
- **Questions to answer:** “Why did my processing fees go up?” · “Which increases come from Visa and Mastercard and which from my processor?” · “How do I spot a markup increase on my statement?” · “How can I stop it from happening again?”
- **CTA:** statement-review · **Schema:** Article, BreadcrumbList
- **Must link to:** `/why-truepay/`, `/statement-review/`, `/resources/how-to-read-your-processing-statement/`
- **Content sources:** live:/ (rate lock); dev:/what-makes-us-different/
- **Claims:** rate-lock
- **Notes:** This is TruePay's signature topic: it maps the #1 industry complaint to the rate-lock differentiator. Be honest that network interchange changes affect everyone.

### `/resources/how-to-switch-payment-processors/` · Switching processors

- **Template / status:** guide · draft
- **Title (49):** How to Switch Payment Processors Safely | TruePay
- **Description (144):** What to check before you switch: contract and cancellation terms, equipment you own or lease, POS compatibility, timing and a day-one checklist.
- **H1:** How to switch payment processors without the headaches
- **Intent:** how to switch credit card processors; cancel merchant contract; early termination fee
- **Questions to answer:** “Will I owe an early termination fee?” · “Do I have to replace my equipment or POS?” · “How long does switching take?” · “When should I wait to switch?”
- **CTA:** statement-review + talk-to-person · **Schema:** Article, BreadcrumbList
- **Must link to:** `/solutions/integrations/`, `/why-truepay/`, `/about/shane-spears/`
- **Content sources:** pdf:p10 (six-step onboarding); brief:§18
- **Claims:** month-to-month, setup-training

### `/resources/how-credit-card-processing-works/` · How processing works

- **Template / status:** guide · draft
- **Title (56):** How Credit Card Processing Works, Step by Step | TruePay
- **Description (140):** What happens between a customer's tap and your deposit: who's involved, who takes which fee and why your money takes a day or two to arrive.
- **H1:** How credit card processing works
- **Intent:** how does credit card processing work; who gets paid in a card transaction
- **Questions to answer:** “What happens when a customer pays by card?” · “Who takes a cut of each transaction?” · “Why does it take time for money to reach my bank?”
- **CTA:** statement-review · **Schema:** Article, BreadcrumbList
- **Must link to:** `/resources/how-to-read-your-processing-statement/`, `/pricing/`
- **Content sources:** live post: the-anatomy-of-a-credit-card-payment-understanding-the-process (rewrite)
- **Notes:** Include an original diagram (inline SVG with text alternative).

## Phase 6

### `/industries/` · Industries

- **Template / status:** hub · draft
- **Title (40):** Payment Processing by Industry | TruePay
- **Description (137):** Restaurants, retail, salons, medical, home services and more: how payments work in your kind of business and what TruePay sets up for it.
- **H1:** Payments built around how your business runs.
- **Intent:** Industry-specific processing.
- **Questions to answer:** “Does TruePay work with businesses like mine?”
- **CTA:** statement-review · **Schema:** CollectionPage, BreadcrumbList
- **Must link to:** `/industries/restaurants/`, `/industries/retail/`, `/industries/salons-spas/`, `/industries/medical-dental/`, `/industries/home-services/`, `/industries/auto-services/`, `/industries/professional-services/`, `/industries/nonprofits/`, `/statement-review/`
- **Content sources:** gh:industries.ts
- **Notes:** Industry list pending Jon's sign-off. Each industry page needs distinct workflow content; no template swaps.

### `/industries/restaurants/` · Restaurants & bars

- **Template / status:** industry · draft
- **Title (49):** Restaurant Credit Card Processing & POS | TruePay
- **Description (137):** Payment processing for restaurants and bars: table-side and counter checkout, tips, dual pricing and support when Friday night gets busy.
- **H1:** Payments that keep up with a full dining room.
- **Intent:** restaurant credit card processing; restaurant POS; dual pricing restaurant
- **Questions to answer:** “How do restaurants handle tips on card payments?” · “Can my servers take payment at the table?” · “Does dual pricing work for restaurants?” · “What happens if my POS goes down during a rush?”
- **CTA:** statement-review + talk-to-person · **Schema:** WebPage, Service, BreadcrumbList
- **Must link to:** `/solutions/point-of-sale/`, `/pricing/dual-pricing/`, `/statement-review/`
- **Content sources:** gh:industries.ts; pdf:p10 (restaurant/retail use cases)
- **Notes:** Each page: distinct workflow, verified solution options, pricing-model fit and tradeoffs, setup/support, real proof if it exists, 3–5 industry questions. No invented examples.

### `/industries/retail/` · Retail

- **Template / status:** industry · draft
- **Title (49):** Retail Payment Processing & POS Systems | TruePay
- **Description (132):** Payment processing for retail stores: fast counter checkout, inventory-ready POS options and online and in-store sales in one place.
- **H1:** Faster checkout for your store, online and off.
- **Intent:** retail credit card processing; retail POS
- **Questions to answer:** “What's the best way to take payments in a retail store?” · “Can my in-store and online sales run through one system?” · “Should a retail store use dual pricing?” · “What equipment does a small shop need?”
- **CTA:** statement-review + talk-to-person · **Schema:** WebPage, Service, BreadcrumbList
- **Must link to:** `/solutions/point-of-sale/`, `/solutions/online-payments/`, `/statement-review/`
- **Content sources:** gh:industries.ts; pdf:p10 (restaurant/retail use cases)
- **Notes:** Each page: distinct workflow, verified solution options, pricing-model fit and tradeoffs, setup/support, real proof if it exists, 3–5 industry questions. No invented examples.

### `/industries/salons-spas/` · Salons & spas

- **Template / status:** industry · draft
- **Title (40):** Salon & Spa Payment Processing | TruePay
- **Description (133):** Payment processing for salons, barbershops and spas: tips, deposits, appointment payments and simple pricing your clients understand.
- **H1:** Payments that fit the chair, the booking and the tip.
- **Intent:** salon credit card processing; spa payment processing
- **Questions to answer:** “How do salons handle tips on card payments?” · “Can I take deposits to cut down on no-shows?” · “Will clients accept dual pricing at a salon?” · “What equipment does a salon need?”
- **CTA:** statement-review + talk-to-person · **Schema:** WebPage, Service, BreadcrumbList
- **Must link to:** `/solutions/terminals/`, `/pricing/dual-pricing/`, `/statement-review/`
- **Content sources:** gh:industries.ts; pdf:p10 (restaurant/retail use cases)
- **Notes:** Each page: distinct workflow, verified solution options, pricing-model fit and tradeoffs, setup/support, real proof if it exists, 3–5 industry questions. No invented examples.

### `/industries/medical-dental/` · Medical & dental

- **Template / status:** industry · draft
- **Title (45):** Medical & Dental Payment Processing | TruePay
- **Description (148):** Card processing for medical and dental practices: front-desk checkout, payment plans and billing, with costs you can explain to your office manager.
- **H1:** Patient payments without the paperwork headaches.
- **Intent:** medical credit card processing; dental office payment processing
- **Questions to answer:** “How do medical and dental offices take patient payments?” · “Can patients pay their bills online?” · “Can we set up payment plans?” · “Is dual pricing a good idea for a medical practice?”
- **CTA:** statement-review + talk-to-person · **Schema:** WebPage, Service, BreadcrumbList
- **Must link to:** `/solutions/billing-software/`, `/pricing/membership/`, `/statement-review/`
- **Content sources:** gh:industries.ts; pdf:p10 (restaurant/retail use cases)
- **Notes:** Each page: distinct workflow, verified solution options, pricing-model fit and tradeoffs, setup/support, real proof if it exists, 3–5 industry questions. No invented examples.

### `/industries/home-services/` · Home services

- **Template / status:** industry · draft
- **Title (50):** Payment Processing for Home Service Pros | TruePay
- **Description (134):** Take payment on the job site for HVAC, plumbing, electrical and other home services, and stop chasing invoices after the truck leaves.
- **H1:** Get paid before the truck leaves the driveway.
- **Intent:** mobile payments for contractors; HVAC credit card processing
- **Questions to answer:** “How do I take payment on a job site?” · “What if there's no cell signal at the job?” · “Can I send an invoice from the truck?” · “Does dual pricing work for contractors?”
- **CTA:** statement-review + talk-to-person · **Schema:** WebPage, Service, BreadcrumbList
- **Must link to:** `/solutions/mobile-payments/`, `/solutions/billing-software/`, `/statement-review/`
- **Content sources:** gh:industries.ts; pdf:p10 (restaurant/retail use cases)
- **Notes:** Each page: distinct workflow, verified solution options, pricing-model fit and tradeoffs, setup/support, real proof if it exists, 3–5 industry questions. No invented examples.

### `/industries/auto-services/` · Auto services

- **Template / status:** industry · draft
- **Title (45):** Auto Repair Shop Payment Processing | TruePay
- **Description (133):** Card processing for auto repair and service shops: high-ticket transactions, counter and bay checkout, and pricing that holds steady.
- **H1:** Card processing built for the service counter.
- **Intent:** auto repair credit card processing
- **Questions to answer:** “What's the best way to take payments at an auto repair shop?” · “How do large repair bills affect processing costs?” · “Should a repair shop use dual pricing?” · “Can my shop software work with TruePay?”
- **CTA:** statement-review + talk-to-person · **Schema:** WebPage, Service, BreadcrumbList
- **Must link to:** `/solutions/terminals/`, `/pricing/dual-pricing/`, `/statement-review/`
- **Content sources:** gh:industries.ts; pdf:p10 (restaurant/retail use cases)
- **Notes:** Each page: distinct workflow, verified solution options, pricing-model fit and tradeoffs, setup/support, real proof if it exists, 3–5 industry questions. No invented examples.

### `/industries/professional-services/` · Professional services

- **Template / status:** industry · draft
- **Title (54):** Payment Processing for Professional Services | TruePay
- **Description (129):** Invoice clients, take card and ACH payments and keep QuickBooks reconciled, for accountants, law firms, agencies and consultants.
- **H1:** Send the invoice. Get paid faster.
- **Intent:** accept credit card payments for services; invoice payments
- **Questions to answer:** “How can clients pay my invoices by card?” · “Can clients pay by bank transfer instead?” · “Can I bill a retainer automatically each month?” · “Will payments sync with QuickBooks?”
- **CTA:** statement-review + talk-to-person · **Schema:** WebPage, Service, BreadcrumbList
- **Must link to:** `/solutions/billing-software/`, `/solutions/online-payments/`, `/statement-review/`
- **Content sources:** gh:industries.ts; pdf:p10 (restaurant/retail use cases)
- **Notes:** Each page: distinct workflow, verified solution options, pricing-model fit and tradeoffs, setup/support, real proof if it exists, 3–5 industry questions. No invented examples.

### `/industries/nonprofits/` · Nonprofits

- **Template / status:** industry · draft
- **Title (49):** Nonprofit Donation & Payment Processing | TruePay
- **Description (135):** Take donations in person and online, set up recurring gifts and keep processing costs low so more of every dollar reaches your mission.
- **H1:** More of every gift goes to the mission.
- **Intent:** nonprofit credit card processing; donation processing
- **Questions to answer:** “How can our nonprofit accept donations by card?” · “Can donors give every month?” · “Can we take donations at events?” · “Is dual pricing appropriate for a nonprofit?”
- **CTA:** statement-review + talk-to-person · **Schema:** WebPage, Service, BreadcrumbList
- **Must link to:** `/solutions/online-payments/`, `/pricing/membership/`, `/statement-review/`
- **Content sources:** gh:industries.ts; pdf:p10 (restaurant/retail use cases)
- **Notes:** Each page: distinct workflow, verified solution options, pricing-model fit and tradeoffs, setup/support, real proof if it exists, 3–5 industry questions. No invented examples.

## Phase 7

### `/partners/` · Partner program

- **Template / status:** partner · draft
- **Title (56):** Payment Processing Partner & Sales Rep Program | TruePay
- **Description (144):** Know business owners who'd value honest processing? Sell as a TruePay rep or refer as a partner and earn a share of residuals. See how it works.
- **H1:** Your relationships can build recurring income.
- **Intent:** Merchant services agent / ISO partner / referral program; recruit reps and referral partners.
- **Questions to answer:** “What's the difference between a rep and a referral partner?” · “How are residuals calculated?” · “Who is a good fit?” · “What training and support do partners get?”
- **CTA:** partner-apply · **Schema:** WebPage, BreadcrumbList
- **Must link to:** `/why-truepay/`, `/about/team/`, `/careers/`
- **Content sources:** partner (Jason's chatgpt.site draft: 50% rep / 20% referral, residual estimator); live:/referral/; live:/affiliate-program/; pdf:p7-8; truepaytraining.com
- **Claims:** partner-split, partner-estimator, referral-reward
- **Notes:** Earnings rules: lead with a single-account example; estimator inputs editable incl. attrition; show the assumptions next to every number; no 'all-star' year-one totals as a headline; have counsel review earnings language.

### `/careers/` · Careers

- **Template / status:** utility · draft
- **Title (18):** Careers at TruePay
- **Description (141):** Sales and support roles at TruePay, a Texas payment processing company built on doing right by the customer. See open roles and how to apply.
- **H1:** Do this work the right way, with us.
- **Intent:** Jobs at TruePay.
- **Questions to answer:** “What roles are open?” · “What is it like to work at TruePay?”
- **CTA:** careers-apply · **Schema:** WebPage, BreadcrumbList
- **Must link to:** `/partners/`, `/about/team/`
- **Content sources:** live:/careers/; live:/employment-opportunity/; dev:/work-with-us/; pdf:p9

### `/privacy-policy/` · Privacy policy

- **Template / status:** legal · draft
- **Title (24):** Privacy Policy | TruePay
- **Description (124):** How TruePay collects, uses, stores and protects information submitted through this website, including processing statements.
- **H1:** Privacy policy
- **Intent:** Transparency.
- **CTA:** none · **Schema:** WebPage
- **Must link to:** `/contact/`
- **Content sources:** live:/privacy-policy/
- **Notes:** Must describe statement upload handling once that exists. Legal approval required.

### `/terms/` · Terms of use

- **Template / status:** legal · draft
- **Title (30):** Website Terms of Use | TruePay
- **Description (132):** Terms for using the TruePay website and its calculators, including how illustrative figures and program descriptions should be read.
- **H1:** Website terms of use
- **Intent:** Transparency.
- **CTA:** none · **Schema:** WebPage
- **Must link to:** `/privacy-policy/`, `/why-truepay/`
- **Content sources:** Legal (not supplied)

## Redirects from gotruepay.com

| Old URL | New URL | Note |
| --- | --- | --- |
| `/about-us/` | `/about/` |  |
| `/company/` | `/about/` |  |
| `/reviews/` | `/customer-stories/` |  |
| `/coast-to-coast-customer-network/` | `/service-areas/` |  |
| `/referral/` | `/partners/` |  |
| `/affiliate-program/` | `/partners/` |  |
| `/employment-opportunity/` | `/careers/` |  |
| `/employment-opportunity-backup/` | `/careers/` |  |
| `/blog/` | `/resources/` |  |
| `/category/truepay/` | `/resources/` |  |
| `/get-started/` | `/statement-review/` |  |
| `/cost-analysis/` | `/statement-review/` |  |
| `/welcome/` | `/support/` | Merchant login page. /support/ carries the verified portal link. |
| `/dual-pricing-program/` | `/pricing/dual-pricing/` |  |
| `/membership-program/` | `/pricing/membership/` |  |
| `/equipment/` | `/solutions/` |  |
| `/point-of-sale/` | `/solutions/point-of-sale/` |  |
| `/pos-system/` | `/solutions/point-of-sale/` |  |
| `/skytab-mobile/` | `/solutions/point-of-sale/` |  |
| `/skytab-glass/` | `/solutions/point-of-sale/` |  |
| `/paradise-pos/` | `/solutions/point-of-sale/` |  |
| `/mobile-bytes/` | `/solutions/point-of-sale/` |  |
| `/rckt-mobile-pos/` | `/solutions/mobile-payments/` |  |
| `/terminals/` | `/solutions/terminals/` |  |
| `/valor/` | `/solutions/terminals/` |  |
| `/vl-100/` | `/solutions/terminals/` |  |
| `/vl-110/` | `/solutions/terminals/` |  |
| `/vl-500/` | `/solutions/terminals/` |  |
| `/dejavoo-qd4/` | `/solutions/terminals/` |  |
| `/clover-flex/` | `/solutions/terminals/` |  |
| `/mini/` | `/solutions/terminals/` |  |
| `/duo/` | `/solutions/terminals/` |  |
| `/valor-pay-app/` | `/solutions/mobile-payments/` |  |
| `/online-check-out/` | `/solutions/online-payments/` |  |
| `/the-dual-pricing-advantage-how-it-benefits-both-businesses-and-consumers/` | `/resources/dual-pricing-vs-surcharging-vs-cash-discount/` |  |
| `/discover-the-top-5-benefits-of-flat-rate-payment-processing/` | `/resources/flat-rate-vs-tiered-vs-interchange-plus/` | Old post praised flat rate; new guide is a fair comparison. |
| `/the-anatomy-of-a-credit-card-payment-understanding-the-process/` | `/resources/how-credit-card-processing-works/` |  |
| `/5-benefits-of-an-evm-compliant-chip-terminal/` | `/solutions/terminals/` |  |
| `/the-evolution-of-pos-systems-from-cash-registers-to-smart-terminals/` | `/solutions/point-of-sale/` |  |
| `/streamlining-transactions-for-smbs-a-closer-look-at-modern-pos-systems/` | `/solutions/point-of-sale/` |  |
| `/the-future-of-payments-in-2026-what-merchants-really-need-to-know/` | `/resources/` | Audit first: if the post is accurate and original, migrate it to /resources/future-of-payments-2026/ instead and point this redirect there. |

## Owner decisions on remaining live URLs

| URL | Recommendation |
| --- | --- |
| `/survey-sheet/` | Internal sales form. Move to a noindex /tools/ route or a forms tool; never in the sitemap. |
| `/clover-survey-sheet-fillable-4/` | Internal sales form. Same as above. |
| `/sale-sheet/` | Internal sales sheet. Same as above. |
| `/marketing-test/` | Test page leaking into the sitemap. Let it 404 (or return 410). |
| `/digital-marketing-services-test/` | Test page. Let it 404/410. |
| `/welcome-backup-page/` | Backup page. Let it 404/410. |

## Host rules

- Canonical host: https://gotruepay.com (no www). 301 www → apex and http → https in one hop.
- Trailing slash on every page URL (next.config.ts trailingSlash: true), matching the existing WordPress URLs.
- Preview/staging deployments send `X-Robots-Tag: noindex` and serve a Disallow-all robots.txt.
- truepaydev.wpenginepowered.com: set noindex or password protection now (it is currently index,follow with a self-referencing canonical).
