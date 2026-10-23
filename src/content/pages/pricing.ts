import type { PageContent } from "./types";
import { exampleDualPricing } from "@/components/diagrams";

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
const d = exampleDualPricing;

export const pricing: PageContent = {
  path: "/pricing/",
  eyebrow: "Pricing",
  answer:
    "Card processing cost depends on how you take payments, which cards your customers use, your type of business and who processes for you. TruePay offers two programs: Membership, with transparent cost-plus pricing, and Dual pricing, where card-paying customers cover the card cost. A free statement review shows which costs you less.",
  blocks: [
    {
      type: "qa",
      heading: "The honest answer to “What are your rates?”",
      items: [
        {
          q: "What are TruePay's rates?",
          a: [
            "Any processor that quotes you one flat number without looking at your business is guessing, or isn't being straight with you. Your real cost depends on your card mix and how you take payments, so we price from your actual statement.",
            "What we can promise up front: {{claim:cost-plus}} And {{claim:rate-lock}}",
          ],
        },
        {
          q: "What determines my processing rate?",
          a: [
            "**How you take payments.** Cards tapped or dipped in person cost less than cards keyed in or taken online, because the fraud risk is lower.",
            "**Which cards your customers use.** Rewards and business cards carry higher interchange than basic debit cards.",
            "**Your business type and risk profile.** Card networks set different rates for different kinds of businesses.",
            "**Who you process with.** Interchange is the same everywhere. The markup and monthly fees on top of it are where processors differ.",
          ],
        },
      ],
    },
    {
      type: "table",
      heading: "Flat rate, tiered or cost-plus: which is cheaper?",
      intro: "There are three common ways processors price card payments. Here's how they compare. For worked examples, see our full guide to [flat rate vs. tiered vs. interchange-plus pricing](/resources/flat-rate-vs-tiered-vs-interchange-plus/).",
      caption: "The three common card-processing pricing models",
      columns: ["Model", "How it works", "Good for", "Watch out for"],
      rows: [
        ["Flat rate", "One percentage (plus a few cents) for every card, whatever it costs the processor.", "Very low volume and occasional sales. Simple to read.", "You pay the same high rate on cheap debit cards as on rewards cards. Usually the most expensive as you grow."],
        ["Tiered", "The processor sorts transactions into “qualified,” “mid-qualified” and “non-qualified” tiers with different rates.", "Hard to recommend for anyone.", "The processor decides which tier a card lands in, and many land in the expensive ones. Hard to audit."],
        ["Cost-plus (interchange-plus)", "The card network's actual cost passes through, plus a small fixed markup, itemized line by line.", "Most established businesses. It's what TruePay Membership uses.", "Statements are longer, because every cost is shown. We'll walk you through yours."],
      ],
    },
    {
      type: "cards",
      heading: "Membership or dual pricing: which fits my business?",
      columns: 2,
      cards: [
        {
          title: "Membership",
          text: "{{claim:cost-plus}} Your prices stay the same for every customer. Best if you're cashless, sell online, or would rather not post two prices.",
          href: "/pricing/membership/",
          linkText: "How Membership works",
        },
        {
          title: "Dual pricing",
          text: "You post a cash price and a card price. {{claim:dual-pricing-cost}} Best for businesses with tight margins and a meaningful share of cash or check customers.",
          href: "/pricing/dual-pricing/",
          linkText: "Is dual pricing right for you?",
        },
      ],
    },
    {
      type: "prose",
      heading: "Find out what you're paying now",
      paras: [
        "Before you compare anyone's pricing, know your own effective rate. Try the [effective rate calculator](/effective-rate-calculator/) with two numbers from your statement, or let us do the work with a free statement review.",
      ],
    },
  ],
};

export const membership: PageContent = {
  path: "/pricing/membership/",
  eyebrow: "Pricing · Membership",
  answer:
    "Membership is TruePay's transparent pricing program. {{claim:cost-plus}} {{claim:rate-lock|Our markup is locked for as long as you process with us}}, service is month to month, a terminal is included and Lifetime TrueCare covers your equipment.",
  blocks: [
    {
      type: "qa",
      items: [
        {
          q: "How does membership pricing work?",
          a: [
            "Every card transaction has a base cost set by the card networks, called interchange, plus small network fees. With Membership, you pay that base cost exactly as the networks charge it, plus TruePay's fixed markup. Both show up as separate lines on your statement.",
            "So if your customers use more debit cards one month, your cost goes down with them. You get the benefit, not the processor.",
          ],
        },
      ],
    },
    {
      type: "cards",
      heading: "What's included?",
      columns: 3,
      cards: [
        { title: "Cost-plus pricing", text: "{{claim:cost-plus}}" },
        { title: "A locked markup", text: "{{claim:rate-lock}}", href: "/why-truepay/#rate-lock", linkText: "What the lock covers" },
        { title: "Month-to-month", text: "{{claim:month-to-month}}" },
        { title: "A terminal", text: "{{claim:free-terminal}}", href: "/solutions/terminals/", linkText: "Compare terminals" },
        { title: "Lifetime TrueCare", text: "{{claim:truecare}}" },
        { title: "Real support", text: "{{claim:us-support}}" },
      ],
    },
    {
      type: "qa",
      items: [
        {
          q: "What fees still apply?",
          a: [
            "Interchange and network fees always apply. They're the card networks' charges and every processor passes them on. Your proposal lists TruePay's markup and any monthly fees in writing before you sign, so you'll know the full picture.",
          ],
        },
        {
          q: "Who is membership best for?",
          a: [
            "Businesses that want a low, straightforward cost without changing prices at the register: cashless businesses, online sellers, professional offices and anyone who'd rather not post two prices. If your margins are tight and many customers pay cash, compare it with [dual pricing](/pricing/dual-pricing/).",
          ],
        },
      ],
    },
    { type: "prose", heading: "Why we're comfortable promising this", paras: ["We'd rather keep you for years at a fair price than squeeze you for a few months. [Read the fine print on our promises →](/why-truepay/)"] },
  ],
};

export const dualPricing: PageContent = {
  path: "/pricing/dual-pricing/",
  eyebrow: "Pricing · Dual pricing",
  answer: `With dual pricing, you show two prices: a cash price and a slightly higher card price. Customers choose how to pay. ${"{{claim:dual-pricing-cost}}"} It works best for businesses with tight margins and plenty of cash or check customers.`,
  blocks: [
    {
      type: "qa",
      items: [
        {
          q: "How does dual pricing work?",
          a: [
            `Every item has two posted prices. In our example, an item is ${usd(d.cashPrice)} in cash and ${usd(d.cardPrice)} by card, a ${d.differencePct}% difference. The customer sees both before paying and picks one. When they pay by card, the higher card price covers most of what that card costs you to accept.`,
            "{{claim:dual-pricing-rules}}",
          ],
        },
      ],
    },
    { type: "diagram", kind: "dual-pricing-checkout", caption: `Example checkout. The ${d.differencePct}% difference is for illustration; we'll set yours with you.` },
    {
      type: "qa",
      items: [
        {
          q: "What do customers see at checkout and on the receipt?",
          a: [
            "Both prices are posted on your menu, shelf tags or signage. The terminal shows the cash and card totals, and the receipt shows the price paid. We provide the signage and program the terminal so it's handled the same way every time.",
          ],
        },
      ],
    },
    {
      type: "fit",
      heading: "Who is dual pricing a good fit for, and who isn't it for?",
      good: [
        { title: "Processing fees are one of your biggest monthly costs", text: "The fee line is eating into thin margins." },
        { title: "You take cash and cards (checks and ACH count too)", text: "Dual pricing needs a real non-card way to pay." },
        { title: "You run a restaurant, shop or service business", text: "These businesses tend to see the biggest difference." },
      ],
      notFit: [
        { title: "You're cashless by design", text: "Without a cash price option, choose [Membership](/pricing/membership/)." },
        { title: "You sell mostly online or by subscription", text: "A different setup will work better. Ask us." },
        { title: "Your customers are very price-sensitive", text: "A visible card price can cost sales in some businesses. We'll talk it through." },
      ],
      closing: "{{claim:honest-recommendation}}",
    },
    {
      type: "qa",
      items: [
        {
          q: "How is it different from surcharging or a cash discount?",
          a: [
            "A **surcharge** adds a fee on top of the posted price when someone pays by credit card, and card-network rules limit it and don't allow it on debit cards. A **cash discount** takes money off the posted price for cash. **Dual pricing** posts both prices up front. They look similar at the register but follow different rules. See our neutral guide: [dual pricing vs. surcharging vs. cash discount](/resources/dual-pricing-vs-surcharging-vs-cash-discount/).",
          ],
        },
      ],
    },
    {
      type: "steps",
      heading: "What setting it up involves",
      steps: [
        { title: "Review your numbers", text: "We look at your statement and card mix to see whether dual pricing actually helps you." },
        { title: "Set your prices", text: "We help you decide the difference and update menus, tags or your POS." },
        { title: "Program and post", text: "We program your terminal and provide the signage customers need to see." },
        { title: "Train your team", text: "A short walkthrough so staff can answer the question customers ask." },
      ],
    },
    {
      type: "prose",
      heading: "Popular with restaurants",
      paras: ["Restaurants are among the businesses that use dual pricing most. See how it fits alongside tips and table-side payment on our [restaurant page](/industries/restaurants/)."],
    },
  ],
};
