/**
 * TruePay entity facts: the one place for name, contact details, people,
 * profiles and reviews. Organization/Person JSON-LD, the footer, the contact
 * page and author boxes all read from here, so the business is described
 * identically everywhere (this is what search engines and AI answer engines
 * use to recognize "TruePay of Josephine, Texas" as one entity, distinct from
 * other companies named TruePay).
 *
 * Consolidated from src/lib/site-config.ts in Phase 0. The claim register governs promises.
 * Fields marked `confirm` must be verified before launch.
 */

export const entity = {
  name: "TruePay",
  /** Used in copy and schema alternateName to disambiguate from other "TruePay" companies. */
  descriptor: "TruePay Payment Solutions",
  legalName: {
    value: "",
    confirm:
      "Registered legal entity name (e.g. TruePay LLC) for Organization.legalName and the footer.",
  },
  tagline: "Payments without the games.",
  oneLiner:
    "TruePay is a payment processing company in Josephine, Texas, that has helped business owners accept cards since 2011, with locked rates, month-to-month service and real people you can reach.",
  url: "https://gotruepay.com",
  foundingYear: 2011,
  phone: {
    display: "888-792-0284",
    href: "tel:+18887920284",
    e164: "+1-888-792-0284",
  },
  email: "support@gotruepay.com",
  address: {
    streetAddress: "200 Monarch Ln",
    addressLocality: "Josephine",
    addressRegion: "TX",
    postalCode: "75173",
    addressCountry: "US",
    note: "Head office. Use LocalBusiness/FinancialService schema ONLY if this is a staffed location that receives customers; otherwise Organization.",
  },
  logo: {
    horizontal: "/images/truepay-wordmark.svg", // Code-native shield/wordmark from docs/design-system.md; supplied raster not in repo.
    square: "/images/truepay-logo-square.jpg", // TruePay_Logo2.jpg, 400×400 (supplied)
  },
  /** Verified official profiles only. Add Google Business Profile and LinkedIn once confirmed. */
  sameAs: [
    "https://www.facebook.com/gotruepay",
    "https://www.instagram.com/truepaysocial/",
    "https://twitter.com/truepaypayments",
    "https://www.tiktok.com/@truepaypaymentsolutions",
  ],
  /** Legacy coverage list retained for reconciliation, not a verified coverage claim. */
  coverageEvidence: {
    primaryStates: ["Texas", "Oklahoma"],
    statesToReconcile: [
      "TX",
      "OK",
      "FL",
      "CA",
      "NY",
      "IL",
      "WA",
      "PA",
      "NJ",
      "NC",
      "SC",
      "OH",
      "MI",
    ],
    source: "gh:src/lib/site-config.ts (pre-foundation)",
  },
  externalLinks: {
    training: "https://truepaytraining.com/",
    merchantPortal: {
      value: "",
      confirm: "Real merchant login URL (old /welcome/ page).",
    },
  },
} as const;

export type Person = {
  slug: string;
  name: string;
  alternateName?: string;
  jobTitle: string;
  profilePath?: string;
  bio: string;
  /** Topics this person can credibly author or review (E-E-A-T). */
  expertise: string[];
  image?: string;
  sameAs?: string[];
  confirm?: string;
};

export const people: Person[] = [
  {
    slug: "jon-wilson",
    name: "Jon Wilson",
    alternateName: "Jonathan Wilson",
    jobTitle: "Founder and Chief Executive Officer",
    profilePath: "/about/jon-wilson/",
    bio: "Jon founded TruePay in 2011 after watching business owners get burned by hidden fees, rate increases and processors who disappeared after the sale.",
    expertise: [
      "merchant pricing",
      "processing statements",
      "dual pricing",
      "rate increases",
    ],
    confirm: "Preferred name form, photo, LinkedIn URL, industry start year.",
  },
  {
    slug: "shane-spears",
    name: "Shane Spears",
    jobTitle: "Chief Operating Officer",
    profilePath: "/about/shane-spears/",
    bio: "Shane oversees TruePay's day-to-day operations, from onboarding and equipment to support, so merchants get what they need fast.",
    expertise: ["onboarding", "switching processors", "equipment", "support"],
    confirm: "Title (COO vs Operations Director), photo, LinkedIn URL.",
  },
  {
    slug: "mandie-spears",
    name: "Mandie Spears",
    jobTitle: "Head of Support",
    bio: "Mandie leads merchant support, so TruePay customers never feel like they're on their own.",
    expertise: ["merchant support"],
    confirm: "Spelling (Mandie vs Mandy) and title.",
  },
  {
    slug: "tim-files",
    name: "Tim Files",
    jobTitle: "Owner and Investor",
    bio: "Tim brings strategic vision and a track record of building businesses the right way.",
    expertise: [],
    confirm: "Whether Tim should appear publicly.",
  },
  {
    slug: "adam-watson",
    name: "Adam Watson",
    jobTitle: "Sales Team Lead",
    bio: "Adam listens before he talks, working directly with business owners to find the right program, even when that means a different solution.",
    expertise: ["choosing a pricing program"],
    confirm:
      "Current role. Note pdf:p7 lists a different sales roster (Joe Carter, Luis Garza, Pete Irby).",
  },
];

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  business?: string;
  city?: string;
  /** Original public location of the review. */
  sourceUrl?: string;
  /** Verified historical publication, retained across the live URL migration. */
  archivedSourceUrl?: string;
  /** published = on gotruepay.com today; permissioned = written OK with business identity. */
  status: "published" | "permissioned";
};

/** Only quotes already published on gotruepay.com. Never edit their wording. */
export const testimonials: Testimonial[] = [
  {
    id: "r-moore",
    quote: "Best credit card system we've had at our shop...Period!",
    name: "R. Moore",
    archivedSourceUrl:
      "https://web.archive.org/web/20260413133352/https://gotruepay.com/reviews/",
    status: "published",
    sourceUrl: "https://gotruepay.com/reviews/",
  },
  {
    id: "e-springfield",
    quote:
      "I absolutely love this credit card system. Jon and Shane are awesome and are always there to answer questions and help with anything you may need!!!",
    name: "E. Springfield",
    archivedSourceUrl:
      "https://web.archive.org/web/20260413133352/https://gotruepay.com/reviews/",
    status: "published",
    sourceUrl: "https://gotruepay.com/",
  },
  {
    id: "a-monroe",
    quote:
      "We've been very pleased with Truepay! the service and the people! Jon and the crew are always very quick to check in and ensure we are doing well.",
    name: "A. Monroe",
    archivedSourceUrl:
      "https://web.archive.org/web/20260413133352/https://gotruepay.com/reviews/",
    status: "published",
    sourceUrl: "https://gotruepay.com/",
  },
  {
    id: "b-slavens",
    quote:
      "Wonderful solution for business owners. If you take credit cards, start saving some real money. Contact them today, great people.",
    name: "B. Slavens",
    archivedSourceUrl:
      "https://web.archive.org/web/20260413133352/https://gotruepay.com/reviews/",
    status: "published",
    sourceUrl: "https://gotruepay.com/",
  },
  {
    id: "m-holt",
    quote:
      "…our business went from paying in excess of $50,000.00 a year in credit card fees and since switching to TruePay our credit card fees are $420.00.",
    name: "M. Holt",
    archivedSourceUrl:
      "https://web.archive.org/web/20260413133352/https://gotruepay.com/reviews/",
    status: "published",
    sourceUrl: "https://gotruepay.com/reviews/",
  },
];
