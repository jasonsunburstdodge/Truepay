// PENDING CLIENT SIGN-OFF: this 8-category list and its copy are a strategic
// addition proposed during planning. It is NOT sourced from TruePay's existing
// site and has NOT been confirmed by the client. Confirm before launch.

export type Industry = {
  slug: string;
  label: string;
  icon: string;
  blurb: string;
  calculatorNote: string;
};

export const industries: Industry[] = [
  {
    slug: "restaurants",
    label: "Restaurants & Bars",
    icon: "🍽️",
    blurb:
      "Table-side payments, tip handling, and weekend-volume support that doesn't buckle.",
    calculatorNote:
      "Tip adjustments and card-present rates often skew restaurant processing costs more than owners expect — enter your numbers below to see your actual effective rate.",
  },
  {
    slug: "retail",
    label: "Retail",
    icon: "🛍️",
    blurb: "Counter and online sales in sync, with inventory-friendly POS options.",
    calculatorNote:
      "Between counter and online sales, retail businesses often run two different rate structures without realizing it. Let's see your blended cost.",
  },
  {
    slug: "salons",
    label: "Salons & Spas",
    icon: "💇",
    blurb: "Recurring memberships and deposit protection to cut no-shows.",
    calculatorNote:
      "Recurring memberships and deposit holds add complexity to your effective rate. Here's what you're really paying.",
  },
  {
    slug: "medical",
    label: "Medical & Dental",
    icon: "🦷",
    blurb: "Patient payment plans handled with the care compliance requires.",
    calculatorNote:
      "Patient payment plans and card-not-present transactions can carry different costs than a standard swipe. Let's break down yours.",
  },
  {
    slug: "home-services",
    label: "Home Services",
    icon: "🔧",
    blurb: "Take payment on-site the moment the job's done — no chasing invoices.",
    calculatorNote:
      "Mobile and on-site payments often carry different rates than in-store transactions. See where your costs are coming from.",
  },
  {
    slug: "auto",
    label: "Auto Services",
    icon: "🚗",
    blurb: "High-ticket transactions with financing-friendly processing.",
    calculatorNote:
      "Higher ticket sizes change the math on effective rate more than most calculators account for. Let's look at yours.",
  },
  {
    slug: "professional",
    label: "Professional Services",
    icon: "💼",
    blurb: "Invoice-based billing with flexible ACH and card options.",
    calculatorNote:
      "Invoice-based billing and ACH mix can lower — or raise — your effective rate depending on how it's set up. Find out where you stand.",
  },
  {
    slug: "nonprofit",
    label: "Nonprofits",
    icon: "🤝",
    blurb: "Low-fee donation processing that keeps more dollars in mission.",
    calculatorNote:
      "Every dollar in fees is a dollar not going to your mission. See exactly what's being taken out of your donations.",
  },
];

export const industryBySlug = new Map(industries.map((i) => [i.slug, i]));
