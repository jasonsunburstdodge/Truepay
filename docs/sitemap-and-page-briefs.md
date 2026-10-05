# TruePay sitemap and page build brief

Prepared October 5, 2026. Status: proposed architecture and content briefs, not implemented website pages.

## Decisions that govern this plan

GitHub is the source of truth: https://github.com/jasonsunburstdodge/Truepay.
The inspected default branch is `claude/truepay-homepage-rebuild`.

Jason has directed that the GitHub concept's look and feel remain the design foundation. Reuse its navy/ink, gold, warm off-white surfaces, Fraunces display type, Inter body type, rounded cards, restrained shadows, generous spacing, sticky header, and mobile conversion bar. Use the tokens in `src/app/globals.css` and fonts in `src/app/layout.tsx`. Earlier documents recommending blue/orange/coral do not override this current instruction. Real photographs and helpful diagrams should fit this existing system.

The copy must let merchants recognize their own problem and understand the practical help they will receive. Demonstrate trust through service behavior, terms, real people, and customer evidence. Technology supports that story.

Working positioning direction, subject to final wording approval: payment processing built around your business, with clear choices and people you can reach.
Retain “Payments Without the Games” as the existing brand headline. Pair it with concrete customer value instead of a list of company adjectives.
“Built on a handshake” can connect the story to specific commitments.

Primary acquisition action: Get my free statement review.
Secondary action: Talk to a real person.
Calculator: a useful education tool and route to review; not a guaranteed savings quote.
A review deliverable should explain current costs, show the effective rate, and identify suitable options. This is proposed offer design until operations confirms delivery.

Use GoTruePay.com as the working production domain. Confirm domain/hosting ownership before any deployment or canonical configuration. Truepay.com is not assumed to be owned. URLs below are proposed relative routes, not live pages.

## What I have and what “have” means

| Item | Available now | Limit or missing item |
| --- | --- | --- |
| Project source | Next.js App Router, TypeScript, Tailwind, reusable homepage components, tokens, fonts, source files readable through GitHub | Only homepage and lead API route exist; this is not yet a complete site |
| Design | Exact GitHub CSS, layouts, hero, cards, header/footer, mobile CTA source | Official original logo files and production photos are absent; the logo component is styled text |
| Messaging guidance | Jason's two supplied message screenshots and instructions in this conversation | Not testimonial material or evidence of merchant results |
| Planning documents | Comprehensive Messaging and Value Assessment; Homepage Strategy, Design and Build Instructions; Homepage Rebuild Brief; Digital Marketing Assessment; approved design PDF | Strategic recommendations and mockup content are not independently verified business facts; current design instruction takes precedence |
| Business information | Public founding story, leadership biographies, phone, email, Josephine address, coverage directory | Public-source availability does not establish current operational accuracy; reconcile leadership titles and contact details |
| Reviews | Published reviews on GoTruePay.com and three quote records in GitHub | Full identities, business names, dates, original platforms, permissions and underlying savings evidence missing |
| Programs | Public membership and dual pricing descriptions, rate protection and TrueCare references | Signed/current program terms, exact guarantee scope, exclusions, complete fee schedule and implementation rules missing |
| Equipment | Public POS, terminals and online payment pages, named device/platform examples | Approved current catalog, device-level capabilities, pricing, eligibility, integration matrix, licensed original images missing |
| Calculator | Client-side effective-rate calculation and industry context | Production verification and clearer validation/explanations needed; not a savings estimator |
| Lead capture | Contact form, selected-industry tagging and placeholder API | No CRM delivery, secure upload, review workflow, notification system or demonstrated follow-up |
| Measurement/access | Public site and repository reads | No demonstrated Search Console, GA4, Google Business Profile, CRM, current CMS, DNS or production-host access |

The eight industry categories are explicitly marked pending client sign-off in `src/lib/industries.ts`. Generic payment-category copy is not proof that a specific TruePay integration or feature exists. The public coverage directory supports regional presence, but a precise “30+ states” count must be reconciled before promotion. An available quote is not a verified case study.

## Site structure and navigation

Primary navigation: Solutions | Pricing | Customer Stories | Resources | About.
Persistent action: Get my free statement review, with visible phone alternative.
Utility navigation: Support | Contact.
Homepage logo links home. Footer includes service areas, confirmed industries, policies and verified account links.

| Section | Core routes | Conditional expansion |
| --- | --- | --- |
| Home | / | None |
| Solutions | /solutions/, /solutions/point-of-sale/, /solutions/terminals/, /solutions/mobile-payments/, /solutions/online-payments/ | /solutions/integrations/ after compatibility confirmation |
| Pricing | /pricing/, /pricing/dual-pricing/ | Additional separately named programs only if they have distinct verified terms and buyer needs |
| Review and calculator | /statement-review/, /effective-rate-calculator/ | /thank-you/ as a non-indexed confirmation only |
| Trust and people | /customer-stories/, /about/ | Individual case studies and two leadership profiles |
| Help | /support/, /contact/ | Verified external merchant login link; no invented portal |
| Resources | /resources/ plus three initial guides described below | Additional evidence-backed articles based on questions and search data |
| Service areas | /service-areas/ | Oklahoma, Texas and Arkansas pages when genuinely distinct local evidence exists |
| Industries | No unverified industry landing pages at initial launch | /industries/ and eight industry pages after confirmation and useful original content |
| Policies | /privacy-policy/, /terms/ | Program terms linked from the relevant pages as current approved material |

Suggested launch set: 21 public page routes including three educational guides and two policies. Add the non-indexed thank-you route only when the conversion workflow exists. This is a practical content scope, not a claim that Google requires a page count.

Every indexed page gets a unique page title, descriptive H1, useful introductory answer, content structured around the customer's decision, relevant proof, contextual internal links, appropriate metadata and a next step. Where useful, include a small set of substantive questions on that page instead of building a duplicate FAQ site.

Search intents below are hypotheses for architecture. I do not have Search Console or verified keyword-volume data; final prioritization should incorporate that evidence.

## Core page briefs

### 1. Homepage — /

**Customer question / search intent:** “Can this payment processor help my business, and can I count on them?” Brand and broad merchant-services discovery.

**Working headline:** Payments Without the Games.
**Supporting direction:** Make sense of your processing costs, choose a solution that fits, and know who to call when you need help. Treat the service/process promises as draft until confirmed.

**Content order:** Customer outcome and two actions; concise service-oriented review; merchant frustrations; clear commitments with links to terms; real support people; payment-path cards; pricing choice summary; calculator preview; further customer proof; regional/nationwide service; review invitation.

**Have:** Hero and homepage components, design system, reviews, calculator, contact form, published business story.
**Need:** Real merchant/support photography; approved commitments; accurate service details; working lead delivery.
**Questions to answer:** Who is TruePay for? What happens next? What support can I reach?
**Links / CTA:** Solutions, pricing, stories, about, coverage, calculator; primary statement review.

### 2. Solutions hub — /solutions/

**Intent:** Merchant payment solutions; choosing based on how payments are taken.
**Working headline:** Payments that fit the way you do business.
**Contents:** Counter, table, field and online workflows; questions to identify fit; POS versus terminal explanation; implementation/support overview; links to four solution pages and pricing. Include invoicing only where confirmed.
**Have:** Existing method-selector component and public equipment descriptions.
**Need:** Confirmed capabilities and routing criteria; installation/training scope; evidence of actual workflows.
**Answer:** What equipment or software do I need? Can I use my current setup?
**CTA:** Talk through my payment setup. Link statement review for cost questions.

### 3. Point of sale — /solutions/point-of-sale/

**Intent:** POS systems and payment processing for physical businesses.
**Headline:** Keep checkout moving with a POS that fits your business.
**Contents:** Restaurant and retail workflows; current supported systems; device/use-case comparison; setup and training; integration limits; acquisition costs and program eligibility; support evidence.
**Have:** Public Clover, SkyTab, Paradise and Mobile Bytes references.
**Need:** Current approved partner/model list, licenses for images, supported functions, installation process, pricing and compatibility.
**Answer:** Can I keep my POS? Who sets it up? What happens if it stops working?
**CTA:** Review my POS needs. Link terminals, integrations if published, pricing and support.

### 4. Terminals — /solutions/terminals/

**Intent:** Credit card terminals for a counter or portable checkout.
**Headline:** Take payments with equipment your team can use confidently.
**Contents:** Countertop versus wireless choices; verified payment methods by device; connectivity; preprogramming; setup; included-terminal eligibility; ownership/replacement/TrueCare terms.
**Have:** Public Valor, Dejavoo and Clover examples; terminal setup and support descriptions.
**Need:** Current model specifications and photos; availability; costs; ownership, replacement and plan conditions.
**Answer:** Which terminal suits my business? Is it included? What is covered if it breaks?
**CTA:** Help me choose a terminal. Link pricing, mobile, POS, support.

### 5. Mobile payments — /solutions/mobile-payments/

**Intent:** Taking payments away from a fixed counter.
**Headline:** Take payment where the work gets done.
**Contents:** Real on-site scenario; supported portable device/app choices; actual connectivity requirements; receipt process; security responsibilities; deposit timing only if verified; field support.
**Have:** Live site's mobile-payment description and portable-terminal references.
**Need:** Exact supported hardware/apps, phone compatibility, connectivity/offline limitations, pricing and a merchant example.
**Answer:** Do I need a separate reader? What happens without a connection?
**CTA:** Find my mobile payment option. Do not promise phone-only tap-to-pay without confirmation.

### 6. Online payments — /solutions/online-payments/

**Intent:** Ecommerce payment processing and payment gateways.
**Headline:** Make online payments easier for you and your customers.
**Contents:** Supported gateway choices; hosted checkout versus integration; compatibility checklist; recurring billing only if verified; reporting/QuickBooks details by product; setup and ongoing help.
**Have:** Public Authorize.net and eProcessing Network references and integration descriptions.
**Need:** Current partnerships, platform compatibility, full fees, responsibility for setup, billing/ACH capabilities and accurate feature boundaries.
**Answer:** Does it work with my website? Who handles setup? What costs apply?
**CTA:** Check my website compatibility. Link pricing and support.

### 7. Pricing — /pricing/

**Intent:** Merchant processing costs, membership pricing and pricing-model comparisons.
**Headline:** Understand the cost before you choose.
**Contents:** Plain-language model comparison; current membership schedule; processor markup versus third-party fees; recurring and incidental costs; applicable rate protection; eligibility; worked illustrative example; links to complete terms.
**Have:** Published membership figures and program references; pricing context in documents.
**Need:** Current signed fee schedules; program names; assessments/interchange treatment; ancillary fees; guarantee definitions and approved examples.
**Answer:** What will I pay? What can change? Which option fits?
**CTA:** Get my free statement review. Treat website prices as published examples awaiting currency confirmation, not new approved offers.

### 8. Dual pricing — /pricing/dual-pricing/

**Intent:** Whether dual pricing fits a particular merchant.
**Headline:** See whether dual pricing makes sense for your business.
**Contents:** Simple definition; who it suits and who it may not suit; impact on merchant and customer; labeled illustrative checkout example; setup/signage/receipt requirements; costs that remain; implementation/support; alternatives.
**Have:** Public program page and fit-oriented planning material.
**Need:** Current jurisdiction/network guidance, debit treatment, approved disclosures, signage/receipts, fee schedule, eligible equipment and merchant story.
**Answer:** How does it work? What do customers see? How does it differ from surcharge or cash discount?
**CTA:** Review whether dual pricing fits. Link comparison guide, pricing and statement review.
**Boundary:** No blanket “legal everywhere,” “100% compliant,” or “zero cost” claim without precise validated scope.

### 9. Statement review — /statement-review/

**Intent:** Understanding processing statements and evaluating a switch.
**Headline:** Find out what you are really paying.
**Contents:** What the merchant receives; annotated approved sample; how review works; who conducts it; what information is needed; agreed turnaround; privacy/retention; no-obligation terms; working form and optional secure upload.
**Have:** Offer direction, basic lead form, industry tagging and placeholder endpoint.
**Need:** Real delivery workflow, CRM destination, reviewer/owner, secure upload, consent and privacy details, approved response expectation, redacted sample.
**Answer:** What will the review tell me? How do I send my statement? Who can see it?
**CTA:** Request my free statement review.
**Current gap:** The form says to send a statement but has no file input; the API logs contact details and returns success. Do not imply a statement was received or a specialist was notified until that is true.

### 10. Effective-rate calculator — /effective-rate-calculator/

**Intent:** Calculate actual effective card processing rate.
**Headline:** See your processing cost as one clear percentage.
**Contents:** Existing calculator; fee and volume definitions; same-period instruction; formula; illustrative worked example; validation of empty, zero and negative values; scope/limitations; link to statement review.
**Have:** Live client-side component computing fees divided by card volume multiplied by 100.
**Need:** Reviewed fee inclusion rules, clearer invalid-input states, accessibility/production QA; finance-approved sample.
**Answer:** What is effective rate? Which fees count? Why is it different from my advertised rate?
**CTA:** Help me understand what is driving my rate.
**Search ownership:** This URL owns calculator intent; the statement guide owns how to read the bill. Embed previews on home without duplicating full page copy.

### 11. Customer stories — /customer-stories/

**Intent:** TruePay reviews and evidence of customer experience.
**Headline:** Hear from business owners who have worked with TruePay.
**Contents:** Authentic, source-linked service testimonials; visible attribution; consented merchant photos; short business/problem/experience summaries; links to full studies as they become available.
**Have:** Published service reviews and quote records.
**Need:** Verified identity/business, dates, original source links, permission and documented results.
**Answer:** Do they follow through? Have they helped a business like mine?
**CTA:** Talk about my business. Do not manufacture an overall star score or promote published anecdotes as audited outcomes.
**Important:** A mockup quote is not cleared for use simply because it appears in an “approved design” PDF.

### 12. About — /about/

**Intent:** Who TruePay is and whether it is a credible payment provider.
**Headline:** Built on a handshake. Accountable to your business.
**Contents:** Short origin story connected to merchant frustrations; founding/experience timeline; named leadership; specific service commitments; real people/environment photos; accurate business identity/contact details.
**Have:** Public founding and leadership narratives and core contact details.
**Need:** Current titles (Shane is described differently across sources), approved bios, original photos and confirmed legal/business identity.
**Answer:** Who runs TruePay? Why was it started? Who remains involved after signup?
**CTA:** Meet the people who can help. Link stories, support, pricing and contact.
**Layout:** Keep founder biography concise on this page; use optional profiles for depth.

### 13. Support — /support/

**Intent:** Existing merchant help with payments, billing or equipment.
**Headline:** Need help with your payments? Reach the right person.
**Contents:** Actual support phone/text routes; channel-specific hours; billing/equipment/transaction routing; safe troubleshooting; escalation; verified merchant account links.
**Have:** Published phone/email and statements about direct text and 24/7 service.
**Need:** Operational confirmation, actual text destination, channel hours, escalation owner, safe approved troubleshooting and portal URLs.
**Answer:** How do I reach support? What should I have ready? What if my terminal fails after hours?
**CTA:** Contact support. Do not funnel an urgent support user into a sales form.

### 14. Contact — /contact/

**Intent:** Contact TruePay sales or other departments.
**Headline:** Tell us what your business needs.
**Contents:** Brief reason selector; sales versus support route; contact form; real phone/email; verified location and hours; next-step expectations.
**Have:** Public phone, email, address and form source.
**Need:** Correct department destinations, inbox/CRM delivery, sales availability and expected follow-up.
**Answer:** Who should I speak with? What happens after I submit?
**CTA:** Send my question or call. Link support and statement review.

### 15. Resources hub — /resources/

**Intent:** Merchant education about payment costs and choices.
**Headline:** Clear answers to your payment questions.
**Contents:** Three practical initial guides; topic navigation; named authors/reviewers; dates; explanatory diagrams and relevant tool links. Audit existing blog articles and reuse only accurate useful content.
**Have:** Existing blog topics and detailed educational directions in project documents.
**Need:** Full editorial review, actual expert authors/reviewers, current primary sources, permissions for reused material.
**Answer:** Where can I learn before choosing?
**CTA:** Read a guide, calculate my rate or request a review. Avoid thin tag/archive pages.

### 16. Processing statement guide — /resources/understand-processing-statement/

**Intent:** How to read a merchant processing statement.
**Headline:** How to understand your credit card processing statement.
**Contents:** Plain-language line-item explanations; annotated anonymized example; effective-rate calculation; legitimate versus potentially avoidable costs; questions to ask a processor; checklist.
**Have:** Statement education direction and calculation formula.
**Need:** Approved redacted statement, expert annotations, fee-category review and named reviewer.
**Answer:** What are interchange, assessments and markup? Which totals should I use?
**CTA:** Review my statement. Link calculator and pricing. This is an original teaching page, not a duplicate sales landing page.

### 17. Pricing-model comparison guide — /resources/dual-pricing-vs-surcharge-vs-cash-discount/

**Intent:** Differences among dual pricing, surcharge and cash discount.
**Headline:** Dual pricing, surcharge and cash discount: what changes for your business?
**Contents:** Concise definitions; comparison table covering checkout, debit, receipts/signage, restrictions and remaining costs; labeled examples; dated primary references; business-fit questions.
**Have:** Program discussion and topic requirements in documents.
**Need:** Current expert/compliance review and jurisdiction/network sources; accurate examples.
**Answer:** Are these the same? Which fits my checkout and customers?
**CTA:** Talk through my options. The commercial dual pricing page owns the TruePay offer; this guide owns the neutral comparison.

### 18. Switching guide — /resources/switch-payment-processors/

**Intent:** Changing processors without unnecessary disruption.
**Headline:** What to check before switching payment processors.
**Contents:** Existing contract/termination review; compatibility; equipment ownership; timeline dependencies; onboarding/training; testing and support; common reasons to wait; downloadable checklist only if useful.
**Have:** Month-to-month and fit-based strategy; publicly described equipment options.
**Need:** Actual onboarding sequence, integration boundaries, underwriting/timing dependencies and approved checklist.
**Answer:** Must I replace my POS? What could delay setup? How can I avoid interruptions?
**CTA:** Review my current setup. Do not promise universal instant activation or uninterrupted switching.

### 19. Service areas — /service-areas/

**Intent:** Whether TruePay serves the merchant's market.
**Headline:** Personal payment support, with nationwide reach.
**Contents:** Verified coverage summary; Oklahoma, Texas and Arkansas emphasis from strategy; national availability; how remote/on-site support actually works; concise accurate map/list and contact route.
**Have:** Public coverage directory and project coverage graphic; regional priorities in strategy.
**Need:** Deduplicated verified coverage, current representatives, on-site versus remote availability and any promoted state count.
**Answer:** Do you serve my state? Is help local or remote?
**CTA:** Check service for my business. The existing SVG is illustrative, not an authoritative geographical map.

### 20–21. Privacy and website terms — /privacy-policy/ and /terms/

**Intent:** Transparency and informed use, rather than acquisition keywords.
**Privacy contents:** Actual collection, statement upload data, processors, access, retention, deletion, cookies/analytics and contacts.
**Terms contents:** Website/tool use, illustrative calculations, scope of offers, applicable links to program/guarantee terms. Separate website terms from merchant agreements.
**Have:** Public privacy link and planning requirements; complete current approved policy text has not been verified.
**Need:** Current approved policy/terms, legal entity, vendors and actual data practices.
**Next step:** Contact/privacy route. These are not lead-generation pages; do not force a sales CTA into them.

## Conditional expansion: page-specific requirements

Do not add these to navigation or the XML sitemap until they have useful approved content. Templates can be designed in advance, but avoid publishing placeholders.

### Trust and compatibility

| Proposed page | Contents and search role | Have | Need / publish condition |
| --- | --- | --- | --- |
| /solutions/integrations/ | Compatibility by named POS/accounting/ecommerce platform; supported function and limitation; confirmation process; CTA: check my setup | Public integration references | Current verified matrix; costs; setup ownership; no “works with everything” promise |
| /about/jonathan-wilson/ | Approved career/founding history, actual payment expertise, merchant-help examples and authored resources | Public biography | Approved bio/title, photo and verifiable experience details |
| /about/shane-spears/ | Operations expertise, onboarding/support role, real workflow examples and reviewed resources | Public biography | Current title, photo, role scope, approved expertise details |
| /customer-stories/{merchant-slug}/ | Merchant identity/location; before; intervention; after; timeframe; source evidence; qualifications; owner quote/photo; CTA: review my business | Published anecdotes | One separately approved evidence package for each story; do not choose a real merchant slug before identity/permission |
| /thank-you/ | Truthful submission confirmation, what happens next, support fallback | Form success state | Working delivery and agreed next step; noindex; excluded from XML sitemap; no sensitive data in URL |

M. Holt is a candidate interview, not yet a case study. The published review reports a very large fee change but does not supply enough context to confidently turn it into a recurring annual savings promise.

### Industry pages

Start with two industries selected with the client, rather than assuming all eight are equally important. Each page needs different workflows, actual supported solutions, relevant experience, a specific example and questions that matter to that merchant. Use the established design, not eight redesigns.

| Proposed page | What it should contain | Have | Need |
| --- | --- | --- | --- |
| /industries/ | Confirmed sectors, payment-path guidance, genuine experience examples and links to published pages | Eight proposed categories in GitHub | Approved industry priorities and evidence; avoid claiming expertise from the list alone |
| /industries/restaurants/ | Busy-service checkout, tip handling, table/counter options, customer pricing presentation, weekend help; CTA: review restaurant setup | Proposed copy; public restaurant-capable POS references | Verified functions, restaurant merchant example, peak-hour support evidence |
| /industries/retail/ | Counter checkout, inventory, staff workflow, online/counter compatibility; CTA: review retail setup | Proposed copy; retail POS references | Specific inventory/commerce integration and retail customer evidence |
| /industries/salons-spas/ | Appointment payments, deposits, tips, recurring plans only if supported; CTA: discuss salon payments | Proposed category only | Actual salon integrations/functions, merchant story; verify no-show/deposit claims |
| /industries/medical-dental/ | Patient checkout and billing workflow; system compatibility and responsibilities; CTA: check practice fit | Proposed category only | Real experience/integrations; privacy/compliance review; no unsupported healthcare-compliance promise |
| /industries/home-services/ | On-site checkout, portable device connectivity, receipts and approved invoicing; CTA: find field option | Proposed copy and mobile references | Actual field workflow and customer; device/app and invoice capabilities |
| /industries/auto-services/ | Repair-shop checkout, high-ticket processing, reconciliation and relevant POS integration; CTA: review shop setup | Proposed category and generic shop review | Actual auto customer, transaction constraints and integrations; no financing claim without proof |
| /industries/professional-services/ | Invoice payment, recurring billing, reporting/accounting integration, ACH only if confirmed; CTA: review billing workflow | Proposed copy and public gateway/accounting references | Exact integrations, ACH/billing terms and service-business evidence |
| /industries/nonprofits/ | Donations, recurring giving, receipts/reporting and fundraising workflow; CTA: review donation setup | Proposed category only | Verified donation platforms, nonprofit pricing eligibility and real nonprofit experience |

### Regional pages

| Proposed page | Contents and search role | Have | Need / publish condition |
| --- | --- | --- | --- |
| /service-areas/oklahoma/ | Oklahoma merchant services; named coverage/support arrangements, real local merchant example, useful regional guidance and contact | Coverage directory and first-priority strategy | Actual representative/support details, local customer permission and original useful content |
| /service-areas/texas/ | Texas merchant services; verified Josephine base, regional service model and Texas case example | Public Texas address and city coverage | Confirmed business/location details, Texas support coverage and distinct local evidence |
| /service-areas/arkansas/ | Arkansas merchant services; real coverage, support delivery and merchant example | Public coverage listing and strategy | Verified Arkansas service specifics and customer evidence |

No invented offices, local phone numbers or location schema. City pages require their own useful evidence; a city-name swap is insufficient. Google's doorway-abuse policy informs this restriction.

## Search, answer and generative discovery requirements

The following is a build specification, not a completed SEO audit or a guarantee of visibility.

### SEO: crawlable structure and clear page purpose

- Give each page a distinct buyer question/search purpose and unique title/H1/description. Metadata supports presentation; descriptions are not a promised ranking boost.
- Render main copy, links and FAQs as available HTML. Interactive calculator results supplement a readable explanation.
- Use real crawlable links from hubs to children, breadcrumbs on deeper routes, and contextual links from guides to the relevant solution/tool. No orphan pages.
- Use one production canonical host and consistent URLs. Canonicalize parameter variants. Keep previews protected/non-indexed without blocking production.
- Generate /sitemap.xml containing only published, canonical, indexable successful page URLs. Use truthful last-modified values, reference it from robots.txt and submit through Search Console. Do not list APIs, uploads, login or thank-you URLs. A sitemap is a discovery aid, not an indexing guarantee.
- Audit the current site's URLs/backlinks before migration. Preserve useful URLs where possible; use direct permanent redirects for changed URLs and preserve valuable articles. Do not redirect every retired page to the homepage.

### AEO: answer the actual merchant's question

- Begin guides with a direct, accurate explanation; expand with examples, definitions, costs, conditions and tradeoffs.
- Use comparison tables where they make decisions clearer; explain formulas and assumptions.
- Answer questions on the page where the customer needs the answer. No fixed word-count rule or separate page for every phrasing.
- Use named expert authors/reviewers, primary-source links and accurate review dates on financial/program guidance.
- Accessible on-page FAQs remain useful. Google removed FAQ rich results in 2026; this plan does not promise FAQ snippets or prioritize FAQ schema for that feature.

### GEO: make the business and its evidence understandable

- Apply the same crawlability, helpfulness and evidence foundation. Google's current guide treats AEO/GEO as part of SEO, not a separate certification.
- Publish original merchant experience, actual people, clear program definitions and independently supportable facts.
- Keep business name, contact details, founding story, programs and verified profiles consistent.
- Check current Search Console settings for inclusion in Google generative AI features and use available reports. Review other engines' published crawler controls when building; Google guidance does not establish every engine's requirements.
- No special AI file, special schema or “AI writing format” is necessary for Google's AI features. Optional other-engine features should not replace useful visible content.
- Rankings, indexing and AI citations cannot be promised.

### Structured data and credibility

- Organization on the business identity/homepage, with verified legal/display name, URL, original logo and controlled profile links.
- BreadcrumbList on hierarchical pages; Article and identifiable author/reviewer information on guides; VideoObject only for eligible real visible video content.
- Person on genuine leadership profiles, if those pages publish; assess the appropriate LocalBusiness subtype only for a genuine eligible location with accurate facts.
- Schema must match visible content. Service semantics may describe services, but do not promise a Google Service rich result.
- Customer reviews can be displayed with evidence/permission. TruePay's own Organization/LocalBusiness reviews are self-serving for Google's review-star rules; no promised search stars.
- Never turn manufacturer relationships, example savings or existing stars into invented certifications, aggregate ratings or guarantees.

### Experience and conversion quality

- Carry existing GitHub design tokens across every page; verify text/CTA contrast and keyboard navigation. Target WCAG 2.2 AA as a project accessibility requirement.
- Mobile navigation must expose the full site. The sticky conversion bar must not cover content, focus or form errors.
- Responsive real images, meaningful alt text, explicit dimensions, restrained motion and captions/transcripts for useful video. Prioritize the hero asset; lazy-load below-fold media.
- Target good real-user Core Web Vitals: LCP within 2.5 seconds, INP under 200 ms, CLS under 0.1, assessed at the 75th percentile where sufficient field data exists. Lab tests are useful before launch; they are not proof of field performance.
- Implement server-side validation, abuse controls, reliable CRM delivery, truthful confirmation and a secure upload path before launching the review offer. No card data or unnecessary banking credentials.
- Measure verified review submissions and qualified leads, calls, calculator-to-review movement and activated customers when CRM data is available. Do not send statements or personal contact data into analytics.
- Baseline Search Console and analytics first; inspect indexing, query performance, field experience and conversion outcomes after release.

## What is needed next, by owner

| Owner | Required input | Why it matters |
| --- | --- | --- |
| Jason / client leadership | Top two industries, regional priority confirmation, final messaging/offer decisions | Determines early page priority and proof collection |
| Leadership / marketing | Original logo, approved team bios/titles, headshots, real support and merchant photos/video, image permissions | Human credibility inside the chosen GitHub design |
| Operations | Support channels/hours/text route/escalation, onboarding process, review deliverable and turnaround, accountable owner | Makes the support and review promises true |
| Finance / program owner | Complete current pricing, plan eligibility, processor-markup/rate-lock scope, terminal/TrueCare conditions | Defines actual value and prevents contradictory offers |
| Compliance / legal | Current dual-pricing guidance and disclosures; approved privacy, upload retention and website/program terms | Supports accurate claims and real data handling |
| Customer success | Two or three permissioned merchant interviews with business/location, problem, intervention, results and source evidence | Turns testimonials into usable original proof |
| Technical / CRM owner | CRM/webhook destination, notifications, upload storage/access controls, consent text, test workflow | Makes lead capture and statement review operational |
| Site / search owner | Current CMS/admin, DNS/hosting, Search Console, GA4 and eligible Google Business Profile access or exports | Preserves search value, measures performance and prepares production release |
| Product / partner owner | Current device catalog, compatibility matrix, platform partnerships and licensed media | Supports each solution and industry page |

Access can be provided through connected accounts, approved exports or supplied documentation. Do not put credentials in the public repository.

## Build and review sequence

1. Draft core copy and shared page templates in the existing GitHub visual system. Build reusable proof, question, comparison and CTA modules.
2. Confirm offers and operations; implement review/contact delivery, privacy, support routing and accurate program conditions.
3. Complete the core solution, pricing, about, support, contact, calculator and resource pages. Publish stories only at their actual evidence level.
4. Audit current URLs and search data; implement redirects, metadata, canonicals, robots and the generated XML sitemap; verify renderability and measurement.
5. Add the first two supported industry pages, regional pages and full case studies as their original evidence arrives.
6. Verify responsive/accessibility behavior, forms end to end, structured data, indexing controls and performance before production publication.

Drafting may proceed with marked internal gaps. Missing evidence blocks the affected public claim/page, not all independent work.

## Sources and provenance

Project implementation sources:
- [Repository README](https://github.com/jasonsunburstdodge/Truepay/blob/claude/truepay-homepage-rebuild/README.md)
- [Design tokens](https://github.com/jasonsunburstdodge/Truepay/blob/claude/truepay-homepage-rebuild/src/app/globals.css)
- [Shared layout and fonts](https://github.com/jasonsunburstdodge/Truepay/blob/claude/truepay-homepage-rebuild/src/app/layout.tsx)
- [Pending industry content](https://github.com/jasonsunburstdodge/Truepay/blob/claude/truepay-homepage-rebuild/src/lib/industries.ts)
- [Lead form](https://github.com/jasonsunburstdodge/Truepay/blob/claude/truepay-homepage-rebuild/src/components/lead-form.tsx)
- [Placeholder lead API](https://github.com/jasonsunburstdodge/Truepay/blob/claude/truepay-homepage-rebuild/src/app/api/lead/route.ts)

Business sources inspected:
- https://gotruepay.com/
- https://gotruepay.com/about-us/
- https://gotruepay.com/reviews/
- https://gotruepay.com/membership-program/
- https://gotruepay.com/dual-pricing-program/
- https://gotruepay.com/point-of-sale/
- https://gotruepay.com/terminals/
- https://gotruepay.com/online-check-out/
- https://gotruepay.com/coast-to-coast-customer-network/
- https://gotruepay.com/blog/

Project documents read in the preceding research:
- TruePay_Comprehensive_Messaging_and_Value_Assessment.docx
- TruePay_Homepage_Strategy_Design_and_Build_Instructions.docx
- truepay-homepage-rebuild-brief.md
- TruePay_Digital_Marketing_Assessment_Red_Yellow_Green.docx
- TruePay-approved-design-pages (1).pdf (selected pages)

Google primary documentation checked October 5, 2026:
- [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) — structure, links and content
- [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Site moves](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- [Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Current generative AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) — use this newer guidance when older AI documentation differs
- [Google documentation updates](https://developers.google.com/search/updates) — FAQ rich-result removal
- [Organization markup](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Review snippet rules](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies)

These sources inform the architecture; they do not verify TruePay's internal terms or grant access to its operational systems.
