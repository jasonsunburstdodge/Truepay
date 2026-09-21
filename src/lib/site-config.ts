// Real company facts sourced from the TruePay homepage brief (verbatim / verified,
// not invented). See README.md "Content sourcing" for provenance notes.

export const siteConfig = {
  name: "TruePay",
  founded: 2011,
  industryExperienceSince: 2006,
  ceo: "Jonathan Wilson",
  operationsDirector: "Shane Spears",
  phone: "888-792-0284",
  phoneHref: "tel:8887920284",
  address: {
    street: "200 Monarch Ln",
    city: "Josephine",
    state: "TX",
    zip: "75173",
  },
  coverage: {
    headline: "Nationwide coverage across 30+ states",
    primaryStates: ["Texas", "Oklahoma"],
    // Confirmed real presence per TruePay's own coverage-network page.
    confirmedStates: [
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
  },
} as const;

export const testimonials = [
  {
    quote: "Best credit card system we've had at our shop...Period!",
    name: "R. Moore",
  },
  {
    quote:
      "We've been very pleased with TruePay! the service and the people! Jon and the crew are always very quick to check in and ensure we are doing well.",
    name: "A. Monroe",
  },
  {
    quote:
      "...our business went from paying in excess of $50,000.00 a year in credit card fees and since switching to TruePay our credit card fees are $420.00.",
    name: "M. Holt",
  },
] as const;

// Framed as a single real example, not a company-wide average or guarantee —
// there is no published aggregate savings % to cite.
export const pricingSignal = {
  before: 50000,
  after: 420,
  lead: "One TruePay merchant cut their annual processing fees from $50,000 to $420.",
  linkText: "See what's driving your rate below →",
  disclaimer: "Individual result. Not a guarantee or average.",
} as const;
