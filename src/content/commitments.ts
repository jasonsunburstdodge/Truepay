/** Customer-facing explanations, bounded by the claims register and route sources. */
export const commitments = [
  {
    id: "rate-lock",
    title: "A markup that stays put",
    covers:
      "TruePay's own markup and monthly fees, as described in the scope below.",
    excludes:
      "The lock does not stop card networks from changing interchange or assessments. Ask for the written terms and any exceptions.",
  },
  {
    id: "month-to-month",
    title: "Room to choose each month",
    covers: "Month-to-month processing service.",
    excludes:
      "This is not a statement that cancellation has no cost. Confirm cancellation fees and equipment return terms before signing.",
  },
  {
    id: "truecare",
    title: "Coverage with a defined scope",
    covers:
      "Repair or replacement of covered equipment while you are a customer.",
    excludes:
      "Do not assume damage, loss or every device is covered. Ask for the covered equipment, exclusions and replacement timing in writing.",
  },
  {
    id: "free-terminal",
    title: "A terminal with Membership",
    covers: "A terminal included with the Membership program.",
    excludes:
      "This does not specify a model or transfer ownership. Confirm eligibility, ownership and what must be returned if you leave.",
  },
  {
    id: "us-support",
    title: "People you can reach",
    covers: "Phone support from US-based people.",
    excludes:
      "This does not specify support hours, a text number or a response-time promise. Confirm the channels and hours for your account.",
  },
  {
    id: "no-hidden-fees",
    title: "Fees you can account for",
    covers: "Fees disclosed in your agreement and explained on your statement.",
    excludes:
      "Clear disclosure does not mean there are no fees. Get the full schedule before comparing proposals.",
  },
  {
    id: "honest-recommendation",
    title: "An answer that puts fit first",
    covers:
      "An honest recommendation about whether switching makes sense for your business.",
    excludes:
      "A review is not a promise of savings. Your current program may already fit.",
  },
] as const;
export const dualPricingFit = {
  goodFit: [
    "You accept both cash and card payments.",
    "Processing costs put pressure on your margins.",
    "You run a restaurant, retail or service business where margins matter.",
  ],
  notFit: [
    "Your business is cashless by design.",
    "You primarily sell online or through subscriptions.",
    "Your current processing costs already work for your business.",
  ],
};
