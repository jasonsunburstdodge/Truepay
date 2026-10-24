/**
 * TruePay route manifest — THE SITE MAP AS CODE.
 *
 * Owned by the site model (docs/site-model.md). This file is the single source
 * of truth for every public URL: its search purpose, title tag, meta
 * description, H1, the questions the page must answer, its CTA, schema types,
 * required internal links and where its content comes from.
 *
 * Builders (ChatGPT/Codex or a person) must:
 *  - generate metadata, breadcrumbs, nav, sitemap.xml and JSON-LD FROM this file;
 *  - never hard-code a title/description/H1 that differs from this file;
 *  - propose changes to this file in a separate, clearly described commit
 *    so the reviewer can approve them.
 *
 * `npm run qa` checks the rendered site against this manifest.
 *
 * Search intents are hypotheses: no Search Console or keyword-volume data has
 * been supplied yet. Revisit titles after 8–12 weeks of Search Console data.
 */

export type Template =
  | "home"
  | "hub"
  | "commitments"
  | "conversion"
  | "tool"
  | "pricing"
  | "solution"
  | "industry"
  | "trust"
  | "profile"
  | "collection"
  | "story"
  | "guide"
  | "area"
  | "partner"
  | "utility"
  | "legal";

/** planned → not built; draft → built, noindex, not in sitemap;
 *  ready → content approved, awaiting launch; live → indexable + in sitemap. */
export type RouteStatus = "planned" | "draft" | "ready" | "live";

export type SchemaType =
  | "Organization"
  | "WebSite"
  | "WebPage"
  | "AboutPage"
  | "ContactPage"
  | "CollectionPage"
  | "ProfilePage"
  | "Person"
  | "Service"
  | "Article"
  | "BreadcrumbList";

export type CtaId =
  | "statement-review"
  | "talk-to-person"
  | "support"
  | "calculator"
  | "partner-apply"
  | "careers-apply"
  | "none";

export type RouteSpec = {
  path: string;
  template: Template;
  /** Build phase in docs/chatgpt-build-plan.md */
  phase: number;
  status: RouteStatus;
  parent?: string;
  /** Short label for nav and breadcrumbs */
  label: string;
  /** <title>. Keep ≤ 60 characters. Brand suffix " | TruePay" where it fits. */
  title: string;
  /** Meta description, 110–160 characters, written for the merchant. */
  description: string;
  h1: string;
  /** The searcher's / visitor's job-to-be-done (hypothesis). */
  intent: string;
  /** Questions answered in visible HTML on the page (AEO). First one is answered in the opening "answer-first" block. */
  questions: string[];
  primaryCta: CtaId;
  secondaryCta?: CtaId;
  schema: SchemaType[];
  indexable: boolean;
  /** Required contextual internal links (beyond nav/footer). */
  links: string[];
  /** Content sources to adapt. dev: = truepaydev.wpenginepowered.com, live: = gotruepay.com, gh: = this repo, pdf:pN = approved design PDF page, partner = Jason's partner page draft. */
  sources: string[];
  /** Claim ids (src/content/claims.ts) this page is expected to carry. */
  claims?: string[];
  /** Internal build notes. Never rendered. */
  notes?: string;
};

const R = (spec: RouteSpec) => spec;

export const industryQuestions: Record<string, string[]> = {
  "restaurants": [
    "How do tips and open tabs fit into checkout?",
    "Can guests split a check or pay at the table?",
    "How should takeout and dining-room payments stay organized?",
    "Would dual pricing suit a tipping-heavy restaurant?",
    "What should we test before a busy service?"
  ],
  "retail": [
    "Can counter and website sales use the same inventory workflow?",
    "What happens when a customer returns an item?",
    "Do I need a full POS or just a card terminal?",
    "How would two displayed prices affect shelf labels?",
    "What should staff practice before opening the new checkout?"
  ],
  "salons-spas": [
    "How should appointment deposits be handled at the final visit?",
    "Can clients add a tip when paying for a service?",
    "Will my booking software connect to a new processor?",
    "Would dual pricing feel right at my salon?",
    "How do I prepare the front desk for a checkout change?"
  ],
  "medical-dental": [
    "How do we separate a visit payment from a later patient balance?",
    "Can we keep our practice-management software?",
    "What should we check before offering scheduled patient payments?",
    "Which pricing approach is easier to explain at the front desk?",
    "What belongs in a payment-support request?"
  ],
  "home-services": [
    "Can I take a card payment at the job site?",
    "What if there is no reliable signal at the property?",
    "How do I connect a deposit and final invoice?",
    "Should a contractor consider dual pricing for larger jobs?",
    "What should a technician test before leaving the office?"
  ],
  "auto-services": [
    "How do we connect the repair order to the final payment?",
    "Can customers pay a parts deposit before repairs begin?",
    "Should payments happen at the service desk or beside the vehicle?",
    "How should we explain card and cash prices on an estimate?",
    "What should the shop test before changing terminals?"
  ],
  "professional-services": [
    "How do invoice payments reach our accounting records?",
    "Can clients pay retainers or recurring invoices?",
    "Should we offer ACH alongside cards?",
    "How does dual pricing affect an agreed project fee?",
    "What should we verify before moving open invoices?"
  ],
  "nonprofits": [
    "How can we take gifts online and at an event?",
    "What should we check before setting up recurring giving?",
    "Is a payment receipt the same as a donation acknowledgment?",
    "Should a nonprofit use dual pricing for donations?",
    "How do we prepare volunteers to take payments?"
  ]
};

export const routes: RouteSpec[] = [
  // ───────────────────────── Phase 0 — Home ─────────────────────────
  R({
    path: "/",
    template: "home",
    phase: 0,
    status: "draft",
    label: "Home",
    title: "TruePay | Payment Processing Without the Games",
    description:
      "Honest credit card processing from a Texas team you can actually reach. Locked rates, month-to-month service and a free statement review. Since 2011.",
    h1: "Payments without the games.",
    intent: "Brand and broad 'honest credit card processing company' discovery; can this processor help me and can I count on them?",
    questions: [
      "Who is TruePay and who is it for?",
      "What happens in a free statement review?",
      "Will my rate go up after I sign?",
      "Who do I call when something breaks?",
    ],
    primaryCta: "statement-review",
    secondaryCta: "talk-to-person",
    schema: ["Organization", "WebSite", "WebPage"],
    indexable: true,
    links: ["/why-truepay/", "/pricing/", "/pricing/dual-pricing/", "/solutions/", "/industries/", "/customer-stories/", "/about/team/", "/effective-rate-calculator/"],
    sources: ["gh:src/components/*", "dev:/ (fit / not-a-fit block, Built on a handshake)", "live:/ (mission, commitments, reviews)", "pdf:p1"],
    claims: ["founded-2011", "rate-lock", "month-to-month", "us-support", "honest-recommendation"],
    notes: "Order: outcome hero + 2 CTAs → 'Sound familiar?' merchant frustrations → commitments strip (links to /why-truepay/#fine-print) → real people strip → choose-how-you-pay cards → dual-pricing fit/not-a-fit → calculator preview → reviews (published, attributed) → coverage → review form.",
  }),

  // ──────────────── Phase 1 — Conversion and help core ────────────────
  R({
    path: "/statement-review/",
    template: "conversion",
    phase: 1,
    status: "draft",
    label: "Free statement review",
    title: "Free Credit Card Processing Statement Review | TruePay",
    description:
      "Send your latest processing statement. We'll explain every fee, find your effective rate and give you an honest recommendation, even if it's to stay put.",
    h1: "Find out what you're really paying.",
    intent: "Merchant wants someone to read their processing statement and tell them if they are overpaying.",
    questions: [
      "What do I get from a statement review?",
      "How do I send my statement, and who sees it?",
      "How long does it take?",
      "Is there any cost or obligation?",
    ],
    primaryCta: "statement-review",
    secondaryCta: "talk-to-person",
    schema: ["WebPage", "Service", "BreadcrumbList"],
    indexable: true,
    links: ["/effective-rate-calculator/", "/resources/how-to-read-your-processing-statement/", "/pricing/", "/about/team/"],
    sources: ["dev:/start-here/", "dev:/pricing/ (4-step review)", "pdf:p17", "gh:lead-form.tsx"],
    claims: ["honest-recommendation", "review-turnaround"],
    notes: "Replaces live /get-started/ and /cost-analysis/. Form must not claim a statement was received until upload/email intake actually works. No file input until secure storage is confirmed.",
  }),
  R({
    path: "/effective-rate-calculator/",
    template: "tool",
    phase: 1,
    status: "draft",
    label: "Effective rate calculator",
    title: "Effective Rate Calculator for Card Processing | TruePay",
    description:
      "Enter one month of card sales and total processing fees to see your effective rate as a single percentage, plus what usually drives it up.",
    h1: "What's your real processing rate?",
    intent: "Calculate effective credit card processing rate; understand why it differs from the advertised rate.",
    questions: [
      "What is an effective rate?",
      "Which fees should I include?",
      "Why is my effective rate higher than the rate I was quoted?",
    ],
    primaryCta: "statement-review",
    schema: ["WebPage", "BreadcrumbList"],
    indexable: true,
    links: ["/statement-review/", "/resources/how-to-read-your-processing-statement/", "/resources/why-credit-card-processing-fees-go-up/"],
    sources: ["gh:rate-calculator.tsx", "gh:industries.ts calculatorNote"],
    notes: "Formula and worked example rendered as HTML text, not only in JS. Validate empty/zero/negative inputs. 'Typical rate' answer needs a sourced range or must be removed.",
  }),
  R({
    path: "/support/",
    template: "utility",
    phase: 1,
    status: "draft",
    label: "Support",
    title: "TruePay Merchant Support: Call, Text or Email",
    description:
      "Existing TruePay merchant? Reach a real, US-based person about equipment, deposits, billing or your account and see what to have ready.",
    h1: "Need help? Reach a real person.",
    intent: "Existing merchant needs help fast.",
    questions: ["How do I reach support?", "What hours is support available?", "What should I have ready?", "Where do I log in to my account?"],
    primaryCta: "support",
    schema: ["WebPage", "BreadcrumbList"],
    indexable: true,
    links: ["/contact/", "/about/team/"],
    sources: ["live:/ (direct text line, 24/7)", "pdf:p4", "pdf:p18"],
    claims: ["us-support", "support-hours", "text-line"],
    notes: "Never route support users into a sales form. Merchant login = verified external portal link only; live /welcome/ redirects here.",
  }),
  R({
    path: "/contact/",
    template: "utility",
    phase: 1,
    status: "draft",
    label: "Contact",
    title: "Contact TruePay | 888-792-0284",
    description:
      "Questions about switching, pricing or equipment? Call 888-792-0284, email or send a note and a person from our Josephine, Texas team will follow up.",
    h1: "Tell us what your business needs.",
    intent: "Contact sales or the company.",
    questions: ["Who will I talk to?", "What happens after I submit?", "Where is TruePay located?"],
    primaryCta: "talk-to-person",
    secondaryCta: "statement-review",
    schema: ["ContactPage", "BreadcrumbList"],
    indexable: true,
    links: ["/support/", "/statement-review/"],
    sources: ["live:/contact/", "pdf:p16", "pdf:p18"],
    claims: ["office-hours", "follow-up-time"],
  }),
  R({
    path: "/thank-you/",
    template: "utility",
    phase: 1,
    status: "draft",
    label: "Thank you",
    title: "Thanks, We've Got It | TruePay",
    description: "Your request reached TruePay. Here's what happens next.",
    h1: "Thanks. Here's what happens next.",
    intent: "Post-submission confirmation.",
    questions: [],
    primaryCta: "none",
    schema: ["WebPage"],
    indexable: false,
    links: ["/resources/"],
    sources: ["pdf:p16"],
    notes: "noindex, excluded from sitemap, no personal data in the URL.",
  }),

  // ──────────────── Phase 2 — Pricing and differentiation ────────────────
  R({
    path: "/why-truepay/",
    template: "commitments",
    phase: 2,
    status: "draft",
    label: "Why TruePay",
    title: "Why TruePay: Locked Rates, Real People, No Contracts",
    description:
      "What TruePay commits to in plain terms: a locked rate, month-to-month service, equipment coverage and people you can reach. Plus the fine print.",
    h1: "Built on a handshake. Here it is in writing.",
    intent: "Is this processor different, and what's the catch? (comparison / due-diligence stage)",
    questions: [
      "What exactly does the rate lock cover?",
      "Can I leave anytime, and is there a cancellation fee?",
      "What does Lifetime TrueCare cover?",
      "Who is TruePay not a good fit for?",
    ],
    primaryCta: "statement-review",
    secondaryCta: "talk-to-person",
    schema: ["WebPage", "BreadcrumbList"],
    indexable: true,
    links: ["/pricing/membership/", "/about/", "/resources/why-credit-card-processing-fees-go-up/", "/customer-stories/"],
    sources: ["dev:/what-makes-us-different/", "live:/ (Our Commitment to You)", "pdf:p1-3"],
    claims: ["rate-lock", "month-to-month", "truecare", "us-support", "honest-recommendation", "no-hidden-fees"],
    notes: "Differentiator hub. Each commitment = plain promise + 'what it covers' + 'what it doesn't' + link to terms. Section id='fine-print' is a link target from home.",
  }),
  R({
    path: "/pricing/",
    template: "pricing",
    phase: 2,
    status: "draft",
    label: "Pricing",
    title: "Credit Card Processing Pricing, Explained | TruePay",
    description:
      "What really sets your processing rate, how flat-rate, tiered and cost-plus pricing compare and the two ways to work with TruePay.",
    h1: "Understand the cost before you choose.",
    intent: "How much does credit card processing cost; what are TruePay's rates?",
    questions: [
      "What are TruePay's rates?",
      "What determines my processing rate?",
      "Flat rate, tiered or cost-plus: which is cheaper?",
      "Membership or dual pricing: which fits my business?",
    ],
    primaryCta: "statement-review",
    secondaryCta: "calculator",
    schema: ["WebPage", "BreadcrumbList"],
    indexable: true,
    links: ["/pricing/membership/", "/pricing/dual-pricing/", "/effective-rate-calculator/", "/resources/flat-rate-vs-tiered-vs-interchange-plus/"],
    sources: ["dev:/pricing/", "live:/membership-program/", "live:/dual-pricing-program/", "pdf:p14"],
    claims: ["cost-plus", "rate-lock"],
  }),
  R({
    path: "/pricing/membership/",
    template: "pricing",
    phase: 2,
    status: "draft",
    parent: "/pricing/",
    label: "Membership",
    title: "Membership: Cost-Plus Card Processing | TruePay",
    description:
      "TruePay Membership: interchange-plus pricing, a locked markup, month-to-month billing, an included terminal and Lifetime TrueCare equipment coverage.",
    h1: "Membership: transparent pricing with your rate locked.",
    intent: "Lowest-cost traditional processing with transparent pricing.",
    questions: ["How does membership pricing work?", "What's included?", "What fees still apply?", "Who is membership best for?"],
    primaryCta: "statement-review",
    schema: ["WebPage", "Service", "BreadcrumbList"],
    indexable: true,
    links: ["/pricing/dual-pricing/", "/why-truepay/", "/solutions/terminals/"],
    sources: ["live:/membership-program/", "dev:/membership-program/"],
    claims: ["cost-plus", "rate-lock", "month-to-month", "free-terminal", "truecare"],
    notes: "Needs the current fee schedule from finance before 'ready'.",
  }),
  R({
    path: "/pricing/dual-pricing/",
    template: "pricing",
    phase: 2,
    status: "draft",
    parent: "/pricing/",
    label: "Dual pricing",
    title: "Dual Pricing Program for Small Businesses | TruePay",
    description:
      "How dual pricing works, what your customers see at checkout, who it fits and who it doesn't and what setup with TruePay involves.",
    h1: "Is dual pricing right for your business?",
    intent: "Should I offer dual pricing / cash price vs card price? How does it work?",
    questions: [
      "How does dual pricing work?",
      "What do customers see at checkout and on the receipt?",
      "Who is dual pricing a good fit for, and who isn't it for?",
      "How is it different from surcharging or a cash discount?",
    ],
    primaryCta: "statement-review",
    secondaryCta: "talk-to-person",
    schema: ["WebPage", "Service", "BreadcrumbList"],
    indexable: true,
    links: ["/resources/dual-pricing-vs-surcharging-vs-cash-discount/", "/pricing/membership/", "/industries/restaurants/"],
    sources: ["dev:/ (fit / not-a-fit)", "dev:/dual-pricing-program/", "live:/dual-pricing-program/", "pdf:p15"],
    claims: ["dual-pricing-rules", "dual-pricing-cost"],
    notes: "Use ONE consistent worked example (pdf:p15 arithmetic is wrong; see brief). No 'legal in all 50 states', no 'zero fees'.",
  }),

  // ──────────────── Phase 3 — Solutions ────────────────
  R({
    path: "/solutions/",
    template: "hub",
    phase: 3,
    status: "draft",
    label: "Solutions",
    title: "Payment Processing Solutions for Small Business | TruePay",
    description:
      "Counter, table, field or online: find the terminal, POS or software that fits how you take payments, with setup and support from real people.",
    h1: "Payments that fit the way you do business.",
    intent: "What equipment/software do I need to take payments?",
    questions: ["What equipment do I need?", "Can I keep my current system?", "Who sets it up and trains my team?"],
    primaryCta: "talk-to-person",
    secondaryCta: "statement-review",
    schema: ["CollectionPage", "BreadcrumbList"],
    indexable: true,
    links: ["/solutions/point-of-sale/", "/solutions/terminals/", "/solutions/mobile-payments/", "/solutions/online-payments/", "/solutions/integrations/", "/solutions/billing-software/", "/pricing/"],
    sources: ["gh:payment-methods-section.tsx", "dev:/ (payment solutions block)"],
  }),
  R({
    path: "/solutions/point-of-sale/",
    template: "solution",
    phase: 3,
    status: "draft",
    parent: "/solutions/",
    label: "Point of sale",
    title: "POS Systems for Restaurants and Retail | TruePay",
    description:
      "Clover, SkyTab and other POS options for restaurants, bars and retail, set up, configured and supported by the TruePay team.",
    h1: "Keep checkout moving with a POS that fits.",
    intent: "POS system for a restaurant or retail store with processing included.",
    questions: ["Which POS fits my business?", "Can I keep my current POS?", "Who installs it and trains my staff?", "What happens if it goes down on a Friday night?"],
    primaryCta: "talk-to-person",
    secondaryCta: "statement-review",
    schema: ["WebPage", "Service", "BreadcrumbList"],
    indexable: true,
    links: ["/solutions/integrations/", "/industries/restaurants/", "/industries/retail/", "/support/"],
    sources: ["live:/point-of-sale/", "live:/pos-system/, /skytab-*/, /paradise-pos/, /mobile-bytes/", "dev:/point-of-sale/", "pdf:p10"],
    claims: ["setup-training"],
  }),
  R({
    path: "/solutions/terminals/",
    template: "solution",
    phase: 3,
    status: "draft",
    parent: "/solutions/",
    label: "Terminals",
    title: "Credit Card Terminals: Countertop and Wireless | TruePay",
    description:
      "Countertop and wireless card terminals that take chip, tap and mobile wallets, programmed before they ship and covered by TruePay support.",
    h1: "Card terminals your team can use with confidence.",
    intent: "Which credit card terminal should I get; is one included?",
    questions: ["Countertop or wireless: which do I need?", "Is a terminal included?", "What's covered if it breaks?", "Which payment types does it take?"],
    primaryCta: "talk-to-person",
    schema: ["WebPage", "Service", "BreadcrumbList"],
    indexable: true,
    links: ["/pricing/membership/", "/solutions/mobile-payments/", "/why-truepay/"],
    sources: ["live:/terminals/", "live:/vl-100/, /vl-110/, /vl-500/, /dejavoo-qd4/, /clover-flex/", "pdf:p11"],
    claims: ["free-terminal", "truecare"],
    notes: "One comparison table across models. Specs per model must be verified; do not assume every feature on every model.",
  }),
  R({
    path: "/solutions/mobile-payments/",
    template: "solution",
    phase: 3,
    status: "draft",
    parent: "/solutions/",
    label: "Mobile payments",
    title: "Mobile Credit Card Processing | TruePay",
    description:
      "Take card payments on the job site, at the curb or at events with portable terminals and apps and know what to do when the signal drops.",
    h1: "Take payment where the work gets done.",
    intent: "Accept credit cards on the go / in the field.",
    questions: ["Do I need a separate card reader?", "What happens without cell service?", "How do customers get a receipt?"],
    primaryCta: "talk-to-person",
    schema: ["WebPage", "Service", "BreadcrumbList"],
    indexable: true,
    links: ["/industries/home-services/", "/solutions/terminals/"],
    sources: ["live:/online-check-out/ (mobile section)", "live:/valor-pay-app/", "pdf:p11"],
  }),
  R({
    path: "/solutions/online-payments/",
    template: "solution",
    phase: 3,
    status: "draft",
    parent: "/solutions/",
    label: "Online payments",
    title: "Online Payment Processing and Gateways | TruePay",
    description:
      "Accept payments on your website with a gateway that fits your platform, plus help with setup, reporting and QuickBooks reconciliation.",
    h1: "Get paid online without the headaches.",
    intent: "Ecommerce payment gateway / accept credit cards online.",
    questions: ["Will it work with my website?", "Who handles setup?", "What does an online payment setup cost?"],
    primaryCta: "talk-to-person",
    schema: ["WebPage", "Service", "BreadcrumbList"],
    indexable: true,
    links: ["/solutions/billing-software/", "/pricing/"],
    sources: ["live:/online-check-out/", "pdf:p12"],
  }),
  R({
    path: "/solutions/integrations/",
    template: "solution",
    phase: 3,
    status: "draft",
    parent: "/solutions/",
    label: "Keep your POS",
    title: "Keep Your POS, Lower Your Processing Cost | TruePay",
    description:
      "Happy with your current POS or software? In many cases TruePay can process for it, so you keep the system your team knows. See how to check.",
    h1: "Keep the system you know. Change who processes it.",
    intent: "Can I switch processors without replacing my POS?",
    questions: ["Can TruePay work with my current POS?", "How do you confirm compatibility?", "What changes for my staff?"],
    primaryCta: "talk-to-person",
    schema: ["WebPage", "Service", "BreadcrumbList"],
    indexable: true,
    links: ["/resources/how-to-switch-payment-processors/", "/solutions/point-of-sale/"],
    sources: ["dev:/integrations/", "pdf:p1", "pdf:p12-13"],
    notes: "Needs a verified compatibility list. Never 'works with everything'.",
  }),
  R({
    path: "/solutions/billing-software/",
    template: "solution",
    phase: 3,
    status: "draft",
    parent: "/solutions/",
    label: "Billing software",
    title: "Invoicing and Recurring Billing Software | TruePay",
    description:
      "Send invoices, collect card and ACH payments and sync with QuickBooks, with billing tools TruePay sets up and supports for service businesses.",
    h1: "Send the invoice. Get paid. Keep the books clean.",
    intent: "Invoicing / recurring billing with card payments and QuickBooks.",
    questions: ["Does it work with QuickBooks?", "Can I bill customers on a schedule?", "What does billing software cost?"],
    primaryCta: "talk-to-person",
    schema: ["WebPage", "Service", "BreadcrumbList"],
    indexable: true,
    links: ["/industries/professional-services/", "/solutions/online-payments/"],
    sources: ["dev:/billing-software/", "pdf:p13 (Biller Genie, MantaPay)"],
    notes: "ACH and QuickBooks versions must be confirmed before 'ready'.",
  }),

  // ──────────────── Phase 4 — Trust and people ────────────────
  R({
    path: "/about/",
    template: "trust",
    phase: 4,
    status: "draft",
    label: "About",
    title: "About TruePay: Texas Payment Processing Since 2011",
    description:
      "TruePay started in 2011 to fix what business owners hate about card processing. Meet the people, the handshake principle and how we work.",
    h1: "Built on a handshake. Accountable to your business.",
    intent: "Who is TruePay; are they credible?",
    questions: ["Who owns and runs TruePay?", "Why was TruePay started?", "Who stays involved after I sign up?"],
    primaryCta: "talk-to-person",
    secondaryCta: "statement-review",
    schema: ["AboutPage", "BreadcrumbList"],
    indexable: true,
    links: ["/about/team/", "/about/jon-wilson/", "/why-truepay/", "/customer-stories/", "/service-areas/"],
    sources: ["dev:/our-story/", "live:/about-us/", "pdf:p2-3"],
    claims: ["founded-2011", "payments-since-2006"],
  }),
  R({
    path: "/about/team/",
    template: "trust",
    phase: 4,
    status: "draft",
    parent: "/about/",
    label: "Our team",
    title: "Meet the TruePay Team | Real People You Can Reach",
    description:
      "The people behind TruePay: who leads the company, who sets up your equipment, who answers when you call and how to reach the right person.",
    h1: "Know who's helping your business.",
    intent: "Who will I actually deal with?",
    questions: ["Who will I work with?", "Who handles support?", "How do I reach the right person?"],
    primaryCta: "talk-to-person",
    schema: ["WebPage", "BreadcrumbList"],
    indexable: true,
    links: ["/about/jon-wilson/", "/about/shane-spears/", "/support/"],
    sources: ["dev:/our-team/", "pdf:p4", "pdf:p7"],
    notes: "Only confirmed people. Remove 'Lorem Ipsum, VP of Sales'. Reconcile roster (pdf p4 vs p7) and Mandie/Mandy spelling. Real headshots, not initials.",
  }),
  R({
    path: "/about/jon-wilson/",
    template: "profile",
    phase: 4,
    status: "draft",
    parent: "/about/team/",
    label: "Jon Wilson",
    title: "Jon Wilson, Founder and CEO of TruePay",
    description:
      "Jon Wilson founded TruePay in 2011 after years in payments. His background, why he started TruePay and the guides he has written for merchants.",
    h1: "Jon Wilson",
    intent: "Who is the founder; is he a real, experienced person? (E-E-A-T author entity)",
    questions: ["What is Jon's background in payments?", "Why did he start TruePay?"],
    primaryCta: "talk-to-person",
    schema: ["ProfilePage", "Person", "BreadcrumbList"],
    indexable: true,
    links: ["/about/", "/resources/"],
    sources: ["live:/about-us/", "dev:/our-story/"],
    notes: "Name form: confirm 'Jon' vs 'Jonathan' (gh site-config says Jonathan). Use the confirmed form everywhere; the other goes in Person.alternateName. Author page for guides he writes.",
  }),
  R({
    path: "/about/shane-spears/",
    template: "profile",
    phase: 4,
    status: "draft",
    parent: "/about/team/",
    label: "Shane Spears",
    title: "Shane Spears, Chief Operating Officer | TruePay",
    description:
      "Shane Spears runs day-to-day operations at TruePay: onboarding, equipment and support. His background and how he helps merchants.",
    h1: "Shane Spears",
    intent: "Operations leader profile; reviewer entity for setup/switching guides.",
    questions: ["What does Shane oversee?", "How does he help merchants after signup?"],
    primaryCta: "talk-to-person",
    schema: ["ProfilePage", "Person", "BreadcrumbList"],
    indexable: true,
    links: ["/about/team/", "/resources/how-to-switch-payment-processors/"],
    sources: ["live:/about-us/", "dev:/our-team/", "pdf:p4"],
    notes: "Title conflict: COO (dev site, pdf) vs Operations Director (older live). Confirm before 'ready'.",
  }),
  R({
    path: "/customer-stories/",
    template: "collection",
    phase: 4,
    status: "draft",
    label: "Customer stories",
    title: "TruePay Reviews and Customer Stories",
    description:
      "What business owners say about working with TruePay, in their own words, with links to where each review was originally posted.",
    h1: "Hear it from the business owners.",
    intent: "TruePay reviews; do they follow through?",
    questions: ["What do customers say about TruePay?", "Have they helped a business like mine?"],
    primaryCta: "statement-review",
    schema: ["CollectionPage", "BreadcrumbList"],
    indexable: true,
    links: ["/why-truepay/", "/industries/"],
    sources: ["live:/reviews/", "gh:site-config.ts testimonials", "pdf:p5"],
    claims: ["holt-quote"],
    notes: "No AggregateRating/Review schema about TruePay itself (self-serving). Link to the original Google/Facebook review where possible. Includes a review-request block for existing merchants.",
  }),
  R({
    path: "/customer-stories/[slug]/",
    template: "story",
    phase: 4,
    status: "draft",
    parent: "/customer-stories/",
    label: "Customer story",
    title: "{Business} + TruePay: {Outcome} | TruePay",
    description: "Template: how {business} in {city} {outcome}, told by the owner.",
    h1: "{Outcome headline in the owner's words}",
    intent: "Proof for a specific industry/problem.",
    questions: ["What was the problem?", "What did TruePay change?", "What happened after?"],
    primaryCta: "statement-review",
    schema: ["Article", "BreadcrumbList"],
    indexable: true,
    links: ["/customer-stories/", "/industries/"],
    sources: ["Permissioned merchant interviews (none supplied yet)"],
    notes: "Template only. Publish a story only with identity, permission and evidence. M. Holt is a candidate interview.",
  }),
  R({
    path: "/service-areas/",
    template: "area",
    phase: 4,
    status: "draft",
    label: "Service areas",
    title: "Where TruePay Serves Merchants | Texas and Nationwide",
    description:
      "Based in Josephine, Texas, TruePay serves businesses across the country. See where we have local representatives and how remote support works.",
    h1: "Rooted in Texas. Serving businesses nationwide.",
    intent: "Does TruePay serve my area? Is help local?",
    questions: ["Do you serve my state?", "Is support local or remote?"],
    primaryCta: "talk-to-person",
    schema: ["WebPage", "BreadcrumbList"],
    indexable: true,
    links: ["/contact/", "/about/team/"],
    sources: ["live:/coast-to-coast-customer-network/", "gh:coverage-section.tsx", "pdf:p6"],
    claims: ["coverage"],
    notes: "No per-city doorway pages. State pages (Texas, Oklahoma, Arkansas) only with distinct local evidence; Phase 9.",
  }),

  // ──────────────── Phase 5 — Resources (AEO/GEO engine) ────────────────
  R({
    path: "/resources/",
    template: "hub",
    phase: 5,
    status: "draft",
    label: "Resources",
    title: "Payment Processing Guides for Business Owners | TruePay",
    description:
      "Plain-English guides to processing statements, pricing models, dual pricing and switching processors, written by people who do this every day.",
    h1: "Straight answers about payment processing.",
    intent: "Merchant education hub.",
    questions: ["Where do I start?"],
    primaryCta: "statement-review",
    secondaryCta: "calculator",
    schema: ["CollectionPage", "BreadcrumbList"],
    indexable: true,
    links: [
      "/resources/how-to-read-your-processing-statement/",
      "/resources/flat-rate-vs-tiered-vs-interchange-plus/",
      "/resources/dual-pricing-vs-surcharging-vs-cash-discount/",
      "/resources/why-credit-card-processing-fees-go-up/",
      "/resources/how-to-switch-payment-processors/",
      "/resources/how-credit-card-processing-works/",
      "/effective-rate-calculator/",
    ],
    sources: ["live:/blog/ (7 posts, see redirects.ts)"],
  }),
  R({
    path: "/resources/how-to-read-your-processing-statement/",
    template: "guide",
    phase: 5,
    status: "draft",
    parent: "/resources/",
    label: "Reading your statement",
    title: "How to Read a Credit Card Processing Statement | TruePay",
    description:
      "A line-by-line guide to your merchant statement: interchange, assessments, markup and monthly fees and how to find your real effective rate.",
    h1: "How to read your credit card processing statement",
    intent: "how to read a merchant processing statement; what are these fees",
    questions: [
      "What are interchange, assessments and processor markup?",
      "Which fees are normal and which are worth questioning?",
      "How do I calculate my effective rate from a statement?",
      "What questions should I ask my processor?",
    ],
    primaryCta: "statement-review",
    secondaryCta: "talk-to-person",
    schema: ["Article", "BreadcrumbList"],
    indexable: true,
    links: ["/pricing/", "/statement-review/", "/resources/flat-rate-vs-tiered-vs-interchange-plus/", "/resources/how-credit-card-processing-works/"],
    sources: ["pdf:p14", "pdf:p17", "brief:§16"],
    notes: "Needs an anonymized, annotated real statement image and a named reviewer.",
  }),
  R({
    path: "/resources/flat-rate-vs-tiered-vs-interchange-plus/",
    template: "guide",
    phase: 5,
    status: "draft",
    parent: "/resources/",
    label: "Pricing models compared",
    title: "Flat Rate vs. Tiered vs. Interchange-Plus Pricing | TruePay",
    description:
      "How the three common card-processing pricing models work, what each costs at different sales volumes and which one fits your business.",
    h1: "Flat rate, tiered or interchange-plus: which costs less?",
    intent: "flat rate vs interchange plus; tiered pricing explained; Square/Stripe vs merchant account cost",
    questions: [
      "What is flat-rate pricing?",
      "What is tiered pricing and why is it hard to read?",
      "What is interchange-plus (cost-plus) pricing?",
      "Which model is cheapest at my volume?",
    ],
    primaryCta: "calculator",
    schema: ["Article", "BreadcrumbList"],
    indexable: true,
    links: ["/pricing/", "/effective-rate-calculator/", "/resources/how-to-read-your-processing-statement/", "/resources/why-credit-card-processing-fees-go-up/"],
    sources: ["dev:/pricing/ (Model 01-03)", "live post: discover-the-top-5-benefits-of-flat-rate-payment-processing (replace)"],
    notes: "Fair to flat rate where it genuinely fits (very low volume). Worked examples at 2-3 volume levels with stated assumptions.",
  }),
  R({
    path: "/resources/dual-pricing-vs-surcharging-vs-cash-discount/",
    template: "guide",
    phase: 5,
    status: "draft",
    parent: "/resources/",
    label: "Dual pricing vs. surcharging",
    title: "Dual Pricing vs. Surcharging vs. Cash Discount | TruePay",
    description:
      "Three ways to pass card costs to customers, side by side: how each works, debit card rules, signage and receipts and which fits your checkout.",
    h1: "Dual pricing, surcharging and cash discounts: what's the difference?",
    intent: "dual pricing vs surcharge; is cash discount legal; surcharge rules",
    questions: [
      "What's the difference between dual pricing, surcharging and a cash discount?",
      "Can I add a fee to debit card purchases?",
      "What signage and receipt rules apply?",
      "Which option fits my business?",
    ],
    primaryCta: "talk-to-person",
    schema: ["Article", "BreadcrumbList"],
    indexable: true,
    links: ["/pricing/dual-pricing/", "/effective-rate-calculator/", "/resources/flat-rate-vs-tiered-vs-interchange-plus/", "/resources/why-credit-card-processing-fees-go-up/"],
    sources: ["pdf:p15", "live post: the-dual-pricing-advantage-how-it-benefits-both-businesses-and-consumers"],
    notes: "YMYL-ish: cite card-network rules and state law sources with dates; named compliance reviewer. The commercial page /pricing/dual-pricing/ owns the offer; this page stays neutral.",
  }),
  R({
    path: "/resources/why-credit-card-processing-fees-go-up/",
    template: "guide",
    phase: 5,
    status: "draft",
    parent: "/resources/",
    label: "Why fees go up",
    title: "Why Did My Credit Card Processing Fees Go Up? | TruePay",
    description:
      "Card networks, processor markups and new monthly fees: the real reasons processing costs rise, how to spot them on your statement and what to do.",
    h1: "Why did my credit card processing fees go up?",
    intent: "processing fees increased; rate creep; new fee on merchant statement",
    questions: [
      "Why did my processing fees go up?",
      "Which increases come from Visa and Mastercard and which from my processor?",
      "How do I spot a markup increase on my statement?",
      "How can I stop it from happening again?",
    ],
    primaryCta: "statement-review",
    schema: ["Article", "BreadcrumbList"],
    indexable: true,
    links: ["/why-truepay/", "/statement-review/", "/resources/how-to-read-your-processing-statement/", "/resources/flat-rate-vs-tiered-vs-interchange-plus/"],
    sources: ["live:/ (rate lock)", "dev:/what-makes-us-different/"],
    claims: ["rate-lock"],
    notes: "This is TruePay's signature topic: it maps the #1 industry complaint to the rate-lock differentiator. Be honest that network interchange changes affect everyone.",
  }),
  R({
    path: "/resources/how-to-switch-payment-processors/",
    template: "guide",
    phase: 5,
    status: "draft",
    parent: "/resources/",
    label: "Switching processors",
    title: "How to Switch Payment Processors Safely | TruePay",
    description:
      "What to check before you switch: contract and cancellation terms, equipment you own or lease, POS compatibility, timing and a day-one checklist.",
    h1: "How to switch payment processors without the headaches",
    intent: "how to switch credit card processors; cancel merchant contract; early termination fee",
    questions: [
      "Will I owe an early termination fee?",
      "Do I have to replace my equipment or POS?",
      "How long does switching take?",
      "When should I wait to switch?",
    ],
    primaryCta: "statement-review",
    secondaryCta: "talk-to-person",
    schema: ["Article", "BreadcrumbList"],
    indexable: true,
    links: ["/solutions/integrations/", "/statement-review/", "/about/shane-spears/", "/resources/how-to-read-your-processing-statement/", "/resources/how-credit-card-processing-works/"],
    sources: ["pdf:p10 (six-step onboarding)", "brief:§18"],
    claims: ["month-to-month", "setup-training"],
  }),
  R({
    path: "/resources/how-credit-card-processing-works/",
    template: "guide",
    phase: 5,
    status: "draft",
    parent: "/resources/",
    label: "How processing works",
    title: "How Credit Card Processing Works, Step by Step | TruePay",
    description:
      "What happens between a customer's tap and your deposit: who's involved, who takes which fee and why your money takes a day or two to arrive.",
    h1: "How credit card processing works",
    intent: "how does credit card processing work; who gets paid in a card transaction",
    questions: [
      "What happens when a customer pays by card?",
      "Who takes a cut of each transaction?",
      "Why does it take time for money to reach my bank?",
    ],
    primaryCta: "statement-review",
    schema: ["Article", "BreadcrumbList"],
    indexable: true,
    links: ["/pricing/", "/statement-review/", "/resources/how-to-read-your-processing-statement/", "/resources/how-to-switch-payment-processors/"],
    sources: ["live post: the-anatomy-of-a-credit-card-payment-understanding-the-process (rewrite)"],
    notes: "Include an original diagram (inline SVG with text alternative).",
  }),

  // ──────────────── Phase 6 — Industries ────────────────
  R({
    path: "/industries/",
    template: "hub",
    phase: 6,
    status: "draft",
    label: "Industries",
    title: "Payment Processing by Industry | TruePay",
    description:
      "Restaurants, retail, salons, medical, home services and more: how payments work in your kind of business and what TruePay sets up for it.",
    h1: "Payments built around how your business runs.",
    intent: "Industry-specific processing.",
    questions: ["Does TruePay work with businesses like mine?"],
    primaryCta: "statement-review",
    schema: ["CollectionPage", "BreadcrumbList"],
    indexable: true,
    links: ["/industries/restaurants/", "/industries/retail/", "/industries/salons-spas/", "/industries/medical-dental/", "/industries/home-services/", "/industries/auto-services/", "/industries/professional-services/", "/industries/nonprofits/", "/statement-review/"],
    sources: ["gh:industries.ts"],
    notes: "Industry list pending Jon's sign-off. Each industry page needs distinct workflow content; no template swaps.",
  }),
  ...(
    [
      ["restaurants", "Restaurants and bars", "Restaurant Credit Card Processing and POS | TruePay", "Payment processing for restaurants and bars: table-side and counter checkout, tips, dual pricing and support when Friday night gets busy.", "Payments that keep up with a full dining room.", "restaurant credit card processing; restaurant POS; dual pricing restaurant", ["/solutions/point-of-sale/", "/pricing/dual-pricing/"]],
      ["retail", "Retail", "Retail Payment Processing and POS Systems | TruePay", "Payment processing for retail stores: fast counter checkout, inventory-ready POS options and online and in-store sales in one place.", "Faster checkout for your store, online and off.", "retail credit card processing; retail POS", ["/solutions/point-of-sale/", "/solutions/online-payments/"]],
      ["salons-spas", "Salons and spas", "Salon and Spa Payment Processing | TruePay", "Payment processing for salons, barbershops and spas: tips, deposits, appointment payments and simple pricing your clients understand.", "Payments that fit the chair, the booking and the tip.", "salon credit card processing; spa payment processing", ["/solutions/terminals/", "/pricing/dual-pricing/"]],
      ["medical-dental", "Medical and dental", "Medical and Dental Payment Processing | TruePay", "Card processing for medical and dental practices: front-desk checkout, payment plans and billing, with costs you can explain to your office manager.", "Patient payments without the paperwork headaches.", "medical credit card processing; dental office payment processing", ["/solutions/billing-software/", "/pricing/membership/"]],
      ["home-services", "Home services", "Payment Processing for Home Service Pros | TruePay", "Take payment on the job site for HVAC, plumbing, electrical and other home services and stop chasing invoices after the truck leaves.", "Get paid before the truck leaves the driveway.", "mobile payments for contractors; HVAC credit card processing", ["/solutions/mobile-payments/", "/solutions/billing-software/"]],
      ["auto-services", "Auto services", "Auto Repair Shop Payment Processing | TruePay", "Card processing for auto repair and service shops: high-ticket transactions, counter and bay checkout and pricing that holds steady.", "Card processing built for the service counter.", "auto repair credit card processing", ["/solutions/terminals/", "/pricing/dual-pricing/"]],
      ["professional-services", "Professional services", "Payment Processing for Professional Services | TruePay", "Invoice clients, take card and ACH payments and keep QuickBooks reconciled, for accountants, law firms, agencies and consultants.", "Send the invoice. Get paid faster.", "accept credit card payments for services; invoice payments", ["/solutions/billing-software/", "/solutions/online-payments/"]],
      ["nonprofits", "Nonprofits", "Nonprofit Donation and Payment Processing | TruePay", "Take donations in person and online, set up recurring gifts and keep processing costs low so more of every dollar reaches your mission.", "More of every gift goes to the mission.", "nonprofit credit card processing; donation processing", ["/solutions/online-payments/", "/pricing/membership/"]],
    ] as const
  ).map(([slug, label, title, description, h1, intent, links]) =>
    R({
      path: `/industries/${slug}/`,
      template: "industry",
      phase: 6,
      status: "draft",
      parent: "/industries/",
      label,
      title,
      description,
      h1,
      intent,
      questions: industryQuestions[slug],
      primaryCta: "statement-review",
      secondaryCta: "talk-to-person",
      schema: ["WebPage", "Service", "BreadcrumbList"],
      indexable: true,
      links: [...new Set([...links, ...(slug === "restaurants" ? ["/solutions/terminals/"] : slug === "salons-spas" || slug === "auto-services" ? ["/solutions/billing-software/"] : slug === "medical-dental" ? ["/solutions/online-payments/"] : slug === "nonprofits" ? ["/solutions/mobile-payments/"] : []), "/pricing/membership/", "/pricing/dual-pricing/", "/statement-review/", "/support/", "/why-truepay/"])],
      sources: ["gh:src/lib/industries.ts (proposed categories; not verified promises)", "gh:src/content/solutions.ts (approved product scope)", "pdf:p10-13 (setup, equipment and software)", ...(slug === "restaurants" ? ["https://releasenotes.shift4.com/announcements/skytab-winter-release-is-coming-faster-order-entry-easier-splits-smarter-tips"] : slug === "retail" ? ["https://www.clover.com/pos-solutions/retail"] : slug === "salons-spas" ? ["https://www.clover.com/pos-solutions/salons"] : slug === "professional-services" ? ["https://helpcenter.billergenie.com/en_US/accounting-software/syncing-with-quickbooks-online", "https://www.authorize.net/resources/our-features/payment-methods.html"] : slug === "nonprofits" ? ["https://www.authorize.net/resources/our-features/recurring-payments.html", "https://www.irs.gov/charities-non-profits/charitable-organizations/charitable-contributions-written-acknowledgments"] : [])],
      notes: "Each page: distinct workflow, verified solution options, pricing-model fit and tradeoffs, setup/support, real proof if it exists, 3-5 industry questions. No invented examples.",
    }),
  ),

  // ──────────────── Phase 7 — Partners, careers, legal ────────────────
  R({
    path: "/partners/",
    template: "partner",
    phase: 7,
    status: "planned",
    label: "Partner program",
    title: "Payment Processing Partner and Sales Rep Program | TruePay",
    description:
      "Know business owners who'd value honest processing? Sell as a TruePay rep or refer as a partner and earn a share of residuals. See how it works.",
    h1: "Your relationships can build recurring income.",
    intent: "Merchant services agent / ISO partner / referral program; recruit reps and referral partners.",
    questions: ["What's the difference between a rep and a referral partner?", "How are residuals calculated?", "Who is a good fit?", "What training and support do partners get?"],
    primaryCta: "partner-apply",
    schema: ["WebPage", "BreadcrumbList"],
    indexable: true,
    links: ["/why-truepay/", "/about/team/", "/careers/"],
    sources: ["partner (Jason's chatgpt.site draft: 50% rep / 20% referral, residual estimator)", "live:/referral/", "live:/affiliate-program/", "pdf:p7-8", "truepaytraining.com"],
    claims: ["partner-split", "partner-estimator", "referral-reward"],
    notes: "Earnings rules: lead with a single-account example; estimator inputs editable incl. attrition; show the assumptions next to every number; no 'all-star' year-one totals as a headline; have counsel review earnings language.",
  }),
  R({
    path: "/careers/",
    template: "utility",
    phase: 7,
    status: "planned",
    label: "Careers",
    title: "Careers at TruePay",
    description:
      "Sales and support roles at TruePay, a Texas payment processing company built on doing right by the customer. See open roles and how to apply.",
    h1: "Do this work the right way, with us.",
    intent: "Jobs at TruePay.",
    questions: ["What roles are open?", "What is it like to work at TruePay?"],
    primaryCta: "careers-apply",
    schema: ["WebPage", "BreadcrumbList"],
    indexable: true,
    links: ["/partners/", "/about/team/"],
    sources: ["live:/careers/", "live:/employment-opportunity/", "dev:/work-with-us/", "pdf:p9"],
  }),
  R({
    path: "/privacy-policy/",
    template: "legal",
    phase: 7,
    status: "planned",
    label: "Privacy policy",
    title: "Privacy Policy | TruePay",
    description: "How TruePay collects, uses, stores and protects information submitted through this website, including processing statements.",
    h1: "Privacy policy",
    intent: "Transparency.",
    questions: [],
    primaryCta: "none",
    schema: ["WebPage"],
    indexable: true,
    links: ["/contact/"],
    sources: ["live:/privacy-policy/"],
    notes: "Must describe statement upload handling once that exists. Legal approval required.",
  }),
  R({
    path: "/terms/",
    template: "legal",
    phase: 7,
    status: "planned",
    label: "Terms of use",
    title: "Website Terms of Use | TruePay",
    description: "Terms for using the TruePay website and its calculators, including how illustrative figures and program descriptions should be read.",
    h1: "Website terms of use",
    intent: "Transparency.",
    questions: [],
    primaryCta: "none",
    schema: ["WebPage"],
    indexable: true,
    links: ["/privacy-policy/", "/why-truepay/"],
    sources: ["Legal (not supplied)"],
  }),
];

/** Primary navigation, built from the manifest. */
export const primaryNav: { label: string; path: string; children?: string[] }[] = [
  { label: "Why TruePay", path: "/why-truepay/" },
  { label: "Pricing", path: "/pricing/", children: ["/pricing/membership/", "/pricing/dual-pricing/", "/effective-rate-calculator/"] },
  { label: "Solutions", path: "/solutions/", children: ["/solutions/point-of-sale/", "/solutions/terminals/", "/solutions/mobile-payments/", "/solutions/online-payments/", "/solutions/integrations/", "/solutions/billing-software/"] },
  { label: "Industries", path: "/industries/", children: ["/industries/restaurants/", "/industries/retail/", "/industries/salons-spas/", "/industries/medical-dental/", "/industries/home-services/", "/industries/auto-services/", "/industries/professional-services/", "/industries/nonprofits/"] },
  { label: "Resources", path: "/resources/" },
  { label: "About", path: "/about/", children: ["/about/team/", "/customer-stories/", "/service-areas/", "/partners/", "/careers/"] },
];

export const utilityNav = ["/support/", "/contact/"];

export const SITE_URL = "https://gotruepay.com";

export function getRoute(path: string): RouteSpec | undefined {
  return routes.find((r) => r.path === path);
}

/** Routes that belong in sitemap.xml. */
export function sitemapRoutes(): RouteSpec[] {
  return routes.filter((r) => r.status === "live" && r.indexable && !r.path.includes("["));
}

/** Breadcrumb trail for a route, root first. */
export function breadcrumbTrail(path: string): RouteSpec[] {
  const trail: RouteSpec[] = [];
  let current = getRoute(path);
  while (current) {
    trail.unshift(current);
    current = current.parent ? getRoute(current.parent) : current.path === "/" ? undefined : getRoute("/");
  }
  return trail;
}
