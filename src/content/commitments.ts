/** Customer-facing explanations, bounded by the claims register and route sources. */
export const commitments = [
  {
    id: "rate-lock",
    title: "A markup that stays put",
    covers:
      "TruePay's own markup and monthly fees, as described in the scope below.",
    excludes:
      "Card networks can still change interchange and assessments. Written rate-lock terms define any exceptions.",
  },
  {
    id: "month-to-month",
    title: "Room to choose each month",
    covers: "Month-to-month processing service.",
    excludes:
      "Month-to-month service does not establish cancellation costs or equipment return terms.",
  },
  {
    id: "truecare",
    title: "Help with your equipment",
    covers:
      "Repair or replacement of covered equipment while you are a customer.",
    excludes:
      "Covered devices, damage, loss and replacement timing depend on the written equipment terms.",
  },
  {
    id: "free-terminal",
    title: "A terminal with Membership",
    covers: "A terminal included with the Membership program.",
    excludes:
      "The promise does not specify the model, eligibility, ownership or return requirements.",
  },
  {
    id: "us-support",
    title: "People you can reach",
    covers: "Phone support from US-based people.",
    excludes:
      "Support hours, channels and response times are separate details for your account.",
  },
  {
    id: "no-hidden-fees",
    title: "Fees you can account for",
    covers: "Fees disclosed in your agreement and explained on your statement.",
    excludes: "Fees still apply. The full schedule belongs with your proposal.",
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
