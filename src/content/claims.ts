/**
 * TruePay claims register.
 *
 * Every promise, number or comparative statement on the site comes from here,
 * so wording stays consistent and can be changed in one place when Jon or
 * finance/compliance confirms the scope.
 *
 * Render a claim with its `copy` (or an approved variant) and mark the element
 * with data-claim="<id>" so `npm run qa` can report which pages carry which
 * claims and which of those still need sign-off.
 *
 * status:
 *  - approved  : confirmed by TruePay for public use as written.
 *  - published : already public on gotruepay.com; usable as written, still needs
 *                scope confirmation before launch.
 *  - pending   : may be used in drafts; must be confirmed before a page goes live.
 *  - banned    : never publish (QA fails on the banned phrases list below).
 */

export type ClaimStatus = "approved" | "published" | "pending" | "banned";

export type Claim = {
  id: string;
  status: ClaimStatus;
  /** Approved customer-facing wording. */
  copy: string;
  /** What it covers / doesn't. Render scope near the claim or on /why-truepay/#fine-print. */
  scope?: string;
  /** Who must confirm, and what. */
  confirm?: string;
  source: string;
};

export const claims: Claim[] = [
  {
    id: "founded-2011",
    status: "published",
    copy: "Serving business owners since 2011.",
    source: "live:/ , dev:/our-story/",
    confirm: "Jon: founding year and legal entity name.",
  },
  {
    id: "payments-since-2006",
    status: "pending",
    copy: "Jon has worked in payments since 2006.",
    source: "gh:site-config.ts industryExperienceSince",
    confirm: "Jon: start year in the industry.",
  },
  {
    id: "rate-lock",
    status: "pending",
    copy: "We lock our rate. TruePay won't raise its markup for as long as you process with us.",
    scope:
      "Covers TruePay's own markup and monthly fees. Card-network interchange and assessments are set by Visa, Mastercard, Discover and Amex and can change for every processor; we pass those through at cost and show them on your statement.",
    confirm: "Jon/finance: is the lock on markup only, or markup plus listed monthly fees? Any exceptions (e.g. risk changes, chargeback-driven pricing)? Link to the written term.",
    source: "live:/ ('Rate Lock Guarantee', 'never increase prices'), dev:/pricing/ ('Lifetime rate lock')",
  },
  {
    id: "month-to-month",
    status: "published",
    copy: "Month-to-month service. No long-term contract.",
    scope: "State plainly whether any cancellation or early termination fee exists.",
    confirm: "Jon: confirm no early termination fee; equipment return terms on cancellation.",
    source: "live:/ , dev:/",
  },
  {
    id: "no-hidden-fees",
    status: "pending",
    copy: "Every fee is listed on your agreement and explained on your statement.",
    confirm: "Finance: current fee schedule published or available on request.",
    source: "dev:/pricing/ ('No hidden fees')",
  },
  {
    id: "cost-plus",
    status: "pending",
    copy: "Membership uses interchange-plus pricing: the card network's cost plus a small, fixed TruePay markup, itemized line by line.",
    confirm: "Finance: membership is interchange-plus for all merchants? Markup structure (bps + per-item)?",
    source: "dev:/pricing/ (Model 03)",
  },
  {
    id: "free-terminal",
    status: "pending",
    copy: "A terminal is included with Membership.",
    scope: "Which models, eligibility and who owns it after cancellation.",
    confirm: "Finance/ops: eligibility and ownership.",
    source: "live:/membership-program/, dev:/ ('Provided at no cost')",
  },
  {
    id: "truecare",
    status: "pending",
    copy: "Lifetime TrueCare coverage repairs or replaces covered equipment for as long as you're a customer.",
    scope: "What's covered (defects? damage? loss?), replacement time, plans it applies to.",
    confirm: "Ops: written TrueCare terms.",
    source: "live:/ ('Lifetime TrueCare Coverage')",
  },
  {
    id: "us-support",
    status: "published",
    copy: "Real, US-based people answer when you call. No call centers.",
    source: "live:/ , dev:/",
  },
  {
    id: "support-hours",
    status: "pending",
    copy: "Merchant support is available 24/7.",
    scope: "Distinguish merchant support availability from office hours (Mon-Fri 8 a.m.-6 p.m. CT in pdf:p18).",
    confirm: "Ops: actual channels and hours for support vs sales.",
    source: "live:/ ('available around the clock, 24/7'), pdf:p18",
  },
  {
    id: "text-line",
    status: "pending",
    copy: "Text us directly. Merchants get a direct support text line.",
    confirm: "Ops: the actual text number and who answers it.",
    source: "live:/ (mission statement)",
  },
  {
    id: "office-hours",
    status: "pending",
    copy: "Office hours: Monday-Friday, 8 a.m. to 6 p.m. Central.",
    source: "pdf:p18",
    confirm: "Ops.",
  },
  {
    id: "follow-up-time",
    status: "pending",
    copy: "A real person will follow up within one business day.",
    source: "pdf:p16, pdf:p18",
    confirm: "Ops: who owns follow-up and the actual standard.",
  },
  {
    id: "review-turnaround",
    status: "pending",
    copy: "You'll get your statement review back within {N} business days.",
    source: "pdf:p17",
    confirm: "Ops: reviewer, turnaround, secure intake method.",
  },
  {
    id: "honest-recommendation",
    status: "published",
    copy: "We'll give you an honest answer, even if that means recommending you stay where you are.",
    source: "dev:/ (fit / not-a-fit), pdf:p1",
  },
  {
    id: "setup-training",
    status: "pending",
    copy: "We program your equipment, set it up and train your team.",
    source: "pdf:p10 (six-step process), dev:/ (POS: 'handle setup and training')",
    confirm: "Ops: on-site vs remote, by region.",
  },
  {
    id: "dual-pricing-rules",
    status: "pending",
    copy: "We set up dual pricing to follow card-network rules, including the signage, receipts and checkout display your customers see.",
    scope: "Never say 'legal in all 50 states' or '100% compliant'. Debit-card treatment and state law vary; cite current sources on the guide page.",
    confirm: "Compliance: current program structure and disclosures.",
    source: "live:/dual-pricing-program/ (overbroad wording replaced)",
  },
  {
    id: "dual-pricing-cost",
    status: "pending",
    copy: "With dual pricing, customers who pay by card pay the card price, which can offset most of your processing cost. Some costs, such as monthly fees, can still apply.",
    scope: "Use one worked example with stated assumptions.",
    confirm: "Finance: what the merchant still pays under dual pricing.",
    source: "dev:/ ('lowers your bottom line 2-4%' and 'eliminates this expense entirely' replaced)",
  },
  {
    id: "coverage",
    status: "pending",
    copy: "Based in Josephine, Texas, serving businesses across the U.S.",
    scope: "Any state count ('30+ states') only after reconciling the coverage list.",
    confirm: "Ops: current states with active merchants/representatives.",
    source: "live:/coast-to-coast-customer-network/, gh:site-config.ts",
  },
  {
    id: "holt-quote",
    status: "published",
    copy: "“…our business went from paying in excess of $50,000.00 a year in credit card fees and since switching to TruePay our credit card fees are $420.00.” - M. Holt",
    scope: "Attributed quote only, labeled as one customer's experience. Never a headline, average or promise.",
    confirm: "Customer success: permission, business name, review source link; candidate for a full story.",
    source: "live:/reviews/",
  },
  {
    id: "partner-split",
    status: "pending",
    copy: "Sales reps earn 50% and referral partners earn 20% of TruePay's applicable profit on the merchants they bring in, under a written agreement.",
    confirm: "Jon: current splits and the definition of 'applicable profit'.",
    source: "partner draft (chatgpt.site)",
  },
  {
    id: "partner-estimator",
    status: "pending",
    copy: "Illustration only: volume × estimated TruePay profit margin × your share. Assumes accounts keep processing; real results vary and aren't guaranteed.",
    scope: "Margin assumption (1%-1.75% for dual pricing) must be confirmed; add an attrition input; lead with the single-account example.",
    confirm: "Jon/finance + counsel review of earnings language.",
    source: "partner draft (chatgpt.site)",
  },
  {
    id: "referral-reward",
    status: "pending",
    copy: "Earn up to $1,000 for a merchant referral that signs and starts processing.",
    confirm: "Jon: current reward, trigger and payout timing.",
    source: "pdf:p8",
  },
  {
    id: "moore-expanded-quote",
    status: "banned",
    copy: "Switching to TruePay was one of the best decisions… fees used to run over $800 a month. Now I pay almost nothing…",
    scope: "Appears on the dev site and pdf:p1 but does not match R. Moore's published review. Use only the published short quote.",
    source: "dev:/ testimonials",
  },
];

/**
 * Phrases that must never appear in rendered HTML. QA fails the page.
 * (Case-insensitive regex sources.)
 */
export const bannedPatterns: { pattern: string; why: string }[] = [
  { pattern: "lorem ipsum", why: "Placeholder copy" },
  { pattern: "john doe", why: "Placeholder testimonial" },
  { pattern: "\\bTODO\\b|\\bTBD\\b|NEEDS:", why: "Internal note leaked into page" },
  { pattern: "legal in all 50 states", why: "Overbroad legal claim" },
  { pattern: "100% compliant", why: "Overbroad compliance claim" },
  { pattern: "(?<!\\bnot\\b[^.]{0,40})guaranteed savings|guarantee(d)? (to )?save", why: "Savings guarantee" },
  { pattern: "eliminates (this|the|your) (expense|cost|fees?) entirely", why: "Unqualified dual-pricing claim" },
  { pattern: "now i pay almost nothing|over \\$800 a month", why: "Unverified expanded testimonial" },
  { pattern: "\\bno cost to your business\\b", why: "Unqualified free-equipment claim" },
];

/**
 * Phrases that need a qualifier nearby. QA warns so a reviewer can check scope.
 */
export const cautionPatterns: { pattern: string; why: string }[] = [
  { pattern: "\\bguarantee", why: "Any guarantee needs linked terms" },
  { pattern: "\\b(never|ever)\\b", why: "Absolute promise; confirm scope" },
  { pattern: "\\bfree\\b", why: "Free what, for whom, under what conditions?" },
  { pattern: "\\blowest\\b|\\bcheapest\\b|\\bbest in\\b|#1", why: "Superlative needs evidence" },
  { pattern: "\\bzero\\b|\\$0\\b", why: "Zero-cost claim needs scope" },
  { pattern: "\\b24/7\\b|around the clock", why: "Support-hours claim pending ops confirmation" },
  { pattern: "\\b\\d{2}\\+? states\\b", why: "State count pending coverage reconciliation" },
];
