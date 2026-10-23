import type { PageContent } from "./types";
import { exampleStatement } from "@/components/diagrams";

const usd0 = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const usd2 = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
const pct = (n: number) => `${n.toFixed(2)}%`;

const DATE = "2026-10-23";

const SRC = {
  visaFees: { title: "Credit card processing fees and interchange rates", publisher: "Visa", url: "https://www.visa.com/en-us/support/business/regulation-fees" },
  mcInterchange: { title: "Mastercard interchange fees and rates explained", publisher: "Mastercard", url: "https://www.mastercard.com/us/en/business/support/merchant-interchange-rates.html" },
  mcSurcharge: { title: "Merchant surcharge rules", publisher: "Mastercard", url: "https://www.mastercard.com/us/en/business/support/merchant-surcharge-rules.html" },
  fedRegII: { title: "Regulation II (Debit Card Interchange Fees and Routing)", publisher: "Federal Reserve Board", url: "https://www.federalreserve.gov/paymentsystems/regii-about.htm" },
  visaCap: { title: "Visa reduces its merchant surcharge cap to 3%, effective April 15, 2023", publisher: "ArentFox Schiff", url: "https://www.afslaw.com/perspectives/alerts/visa-reduces-its-merchant-surcharge-cap-3-effective-april-15-2023-merchants" },
  usc: { title: "15 U.S. Code § 1693o-2: Reasonable fees and rules for payment card transactions", publisher: "Legal Information Institute, Cornell Law School", url: "https://www.law.cornell.edu/uscode/text/15/1693o-2" },
  pci: { title: "PCI Security Standards for merchants", publisher: "PCI Security Standards Council", url: "https://www.pcisecuritystandards.org/" },
};

/* Worked pricing-model example, computed so the arithmetic is always right. */
const AVG_TICKET = 50;
const MODEL = { flatPct: 2.6, flatPer: 0.15, icPct: 2.0, markupPct: 0.3, markupPer: 0.1, monthly: 25 };
const modelRows = [5000, 25000, 75000].map((vol) => {
  const tx = vol / AVG_TICKET;
  const flat = vol * (MODEL.flatPct / 100) + tx * MODEL.flatPer;
  const ic = vol * ((MODEL.icPct + MODEL.markupPct) / 100) + tx * MODEL.markupPer + MODEL.monthly;
  return { vol, tx, flat, ic, cheaper: flat < ic ? "Flat rate" : "Interchange-plus" };
});

const s = exampleStatement;

export const resourcesHub: PageContent = {
  path: "/resources/",
  eyebrow: "Resources",
  answer:
    "These guides explain how card processing really works, in plain English: how to read your statement, how pricing models compare, why fees go up, how dual pricing differs from surcharging, and how to switch processors without trouble. They're written by the people who run TruePay.",
  blocks: [
    {
      type: "cards",
      heading: "Where do I start?",
      intro: "If your fees just went up, start with the first guide. If you're comparing processors, start with the second.",
      columns: 2,
      cards: [
        { title: "Why did my credit card processing fees go up?", text: "The real reasons costs rise and how to spot them.", href: "/resources/why-credit-card-processing-fees-go-up/", linkText: "Read the guide" },
        { title: "Flat rate vs. tiered vs. interchange-plus", text: "Which pricing model costs less at your volume.", href: "/resources/flat-rate-vs-tiered-vs-interchange-plus/", linkText: "Read the guide" },
        { title: "How to read your processing statement", text: "Every line explained, with an annotated example.", href: "/resources/how-to-read-your-processing-statement/", linkText: "Read the guide" },
        { title: "Dual pricing vs. surcharging vs. cash discount", text: "Three ways to handle card costs, side by side.", href: "/resources/dual-pricing-vs-surcharging-vs-cash-discount/", linkText: "Read the guide" },
        { title: "How to switch payment processors safely", text: "Contracts, equipment, timing and a day-one checklist.", href: "/resources/how-to-switch-payment-processors/", linkText: "Read the guide" },
        { title: "How credit card processing works", text: "From the tap to your deposit, and who takes what.", href: "/resources/how-credit-card-processing-works/", linkText: "Read the guide" },
      ],
    },
    { type: "prose", heading: "Prefer a tool?", paras: ["Work out your real cost in a minute with the [effective rate calculator](/effective-rate-calculator/)."] },
  ],
};

export const statementGuide: PageContent = {
  path: "/resources/how-to-read-your-processing-statement/",
  eyebrow: "Guide",
  guide: { author: "jon-wilson", published: DATE, modified: DATE },
  answer:
    "A processing statement has four kinds of charges: interchange paid to card-issuing banks, assessments paid to the card networks, your processor's markup, and monthly account fees. Add every fee, divide by your card sales and multiply by 100 to get your effective rate, the one number that shows what processing really costs.",
  blocks: [
    { type: "diagram", kind: "statement", caption: `An example statement summary with fictional numbers. Lines A and B are set by the card networks. Lines C and D are set by your processor, and they're the ones to compare.` },
    {
      type: "qa",
      items: [
        {
          q: "What are interchange, assessments and processor markup?",
          a: [
            "**Interchange (line A)** is the fee paid to the bank that issued your customer's card. The card networks publish these rates and they vary by card type (debit, rewards, business) and by how the card was taken (in person or online). It's usually the biggest part of your cost, and it's the same no matter who processes for you. [Visa](https://www.visa.com/en-us/support/business/regulation-fees) and [Mastercard](https://www.mastercard.com/us/en/business/support/merchant-interchange-rates.html) publish their rates.",
            "**Assessments and network fees (line B)** go to Visa, Mastercard, Discover and Amex for using their networks. They're small, and also the same for every processor.",
            "**Processor markup (line C)** is what your processor charges on top. It's often written as a percentage plus a per-transaction fee, like 0.30% + $0.10. This is the part processors compete on.",
          ],
        },
        {
          q: "Which fees are normal and which are worth questioning?",
          a: [
            "**Monthly account fees (line D)** are common: a statement fee, a PCI compliance fee and batch fees for closing out each day. They're normal in small amounts. Fees worth asking about include ones you've never heard explained, a “PCI non-compliance” fee (it usually means a short security questionnaire wasn't completed), annual or “regulatory” fees that appeared without notice, and equipment rental on a terminal you could have owned.",
            "If your statement lumps everything into a few lines with labels like “qualified” and “non-qualified,” you're probably on tiered pricing, which makes your costs hard to check. [Compare pricing models →](/resources/flat-rate-vs-tiered-vs-interchange-plus/)",
          ],
        },
        {
          q: "How do I calculate my effective rate from a statement?",
          a: [
            `Add up every fee for the month, then divide by your total card sales and multiply by 100. In the example above: ${usd2(s.total)} in fees ÷ ${usd0(s.sales)} in sales × 100 = ${pct(s.rate)}. Use fees and sales from the same statement. Or let the [effective rate calculator](/effective-rate-calculator/) do the math.`,
          ],
        },
        {
          q: "What questions should I ask my processor?",
          a: [
            "Ask what your markup is, as a percentage and per transaction. Ask which monthly fees you pay and what each covers. Ask whether your rates can change and how you'll be told. Ask what it costs to leave. A processor that's comfortable with its pricing will answer all four in writing. For a [free statement review](/statement-review/), we'll answer them for your current statement.",
          ],
        },
      ],
    },
    {
      type: "prose",
      heading: "Want to see how money moves before it reaches your statement?",
      paras: ["Read [how credit card processing works](/resources/how-credit-card-processing-works/), step by step."],
    },
    { type: "sources", items: [SRC.visaFees, SRC.mcInterchange, SRC.pci] },
  ],
};

export const modelsGuide: PageContent = {
  path: "/resources/flat-rate-vs-tiered-vs-interchange-plus/",
  eyebrow: "Guide",
  guide: { author: "jon-wilson", published: DATE, modified: DATE },
  answer:
    "Flat-rate pricing charges one percentage on every card and is simplest for very small sellers. Tiered pricing sorts cards into price tiers the processor controls and is the hardest to check. Interchange-plus passes the card networks' real cost through plus a fixed markup; for most established businesses it costs the least and is the easiest to audit.",
  blocks: [
    {
      type: "qa",
      items: [
        {
          q: "What is flat-rate pricing?",
          a: [
            "One rate for every card, such as 2.6% plus 15 cents in person. It's simple to understand and common with app-based processors. The catch: a basic debit card costs the processor far less than a premium rewards card, but you pay the same rate on both. The processor keeps the difference.",
          ],
        },
        {
          q: "What is tiered pricing and why is it hard to read?",
          a: [
            "Tiered pricing sorts each transaction into a tier, usually “qualified,” “mid-qualified” or “non-qualified,” each with its own rate. The processor decides the rules, and many common cards, like rewards cards, land in the expensive tiers. Because the tiers bundle the real costs, you can't see what the networks charged versus what the processor kept.",
          ],
        },
        {
          q: "What is interchange-plus (cost-plus) pricing?",
          a: [
            "You pay each card's actual interchange and network fees as published by the card networks, plus a fixed processor markup, such as 0.30% + 10 cents per transaction. Each part is listed separately on your statement, so you can always see what the processor earns. When your customers use cheaper cards, your cost goes down. It's how TruePay [Membership](/pricing/membership/) is priced.",
          ],
        },
      ],
    },
    {
      type: "table",
      heading: "Which model is cheapest at my volume?",
      intro: `Here's a worked example. It assumes an average sale of ${usd0(AVG_TICKET)}, a flat rate of ${MODEL.flatPct}% + ${usd2(MODEL.flatPer)}, and interchange plus network fees averaging ${MODEL.icPct}% with a ${MODEL.markupPct}% + ${usd2(MODEL.markupPer)} markup and a ${usd0(MODEL.monthly)} monthly fee. Your card mix will change the numbers.`,
      caption: "Monthly processing cost by pricing model (illustrative)",
      columns: ["Monthly card sales", "Transactions", "Flat rate", "Interchange-plus", "Lower cost"],
      rows: modelRows.map((r) => [usd0(r.vol), String(r.tx), `${usd2(r.flat)} (${pct((r.flat / r.vol) * 100)})`, `${usd2(r.ic)} (${pct((r.ic / r.vol) * 100)})`, r.cheaper]),
      note: "Tiered pricing isn't shown because its cost depends on how the processor assigns tiers. It typically lands at or above flat rate for businesses with many rewards cards.",
    },
    {
      type: "prose",
      heading: "What the example shows",
      paras: [
        `At ${usd0(modelRows[0].vol)} a month, flat rate comes out slightly cheaper, because there's no monthly fee. By ${usd0(modelRows[1].vol)} a month, interchange-plus saves about ${usd0(modelRows[1].flat - modelRows[1].ic)} a month, and at ${usd0(modelRows[2].vol)} about ${usd0(modelRows[2].flat - modelRows[2].ic)} a month. That's why we tell very small sellers a flat-rate app may be fine, and why most growing businesses are better off on interchange-plus.`,
        "To see where your own business lands, find your [effective rate](/effective-rate-calculator/) or compare your options on our [pricing page](/pricing/).",
      ],
    },
    { type: "sources", items: [SRC.visaFees, SRC.mcInterchange] },
  ],
};

export const dualGuide: PageContent = {
  path: "/resources/dual-pricing-vs-surcharging-vs-cash-discount/",
  eyebrow: "Guide",
  guide: { author: "jon-wilson", published: DATE, modified: DATE },
  answer:
    "All three help a business recover card costs, but they work differently. A surcharge adds a fee to credit card payments and is capped by card-network rules. A cash discount lowers the posted price for cash. Dual pricing posts both a cash price and a card price up front. Each has its own rules for signs, receipts and debit cards.",
  blocks: [
    {
      type: "table",
      heading: "What's the difference between dual pricing, surcharging and a cash discount?",
      caption: "Three ways to handle card costs, compared",
      columns: ["", "Surcharging", "Cash discount", "Dual pricing"],
      rows: [
        ["Posted price", "The regular price", "The regular (card) price", "Two prices: cash and card"],
        ["What changes at the register", "A fee is added when a customer pays by credit card", "A discount is taken off when a customer pays cash", "The customer pays the cash or card price they chose"],
        ["Debit cards", "No surcharge allowed on debit or prepaid cards", "Discount can apply to cash (and other non-card methods)", "Set up so debit handling follows card-network rules"],
        ["Limits", "Visa: lower of 3% or your cost. Mastercard: up to 4% or your cost", "Federal law lets merchants offer discounts for cash", "Price difference set by you within network rules"],
        ["Notice and signs", "Notify your acquirer (and Mastercard) 30 days ahead; disclose at entry and checkout; show on receipt", "Post that a cash discount is available", "Post both prices where customers see them before paying"],
      ],
      note: "Rules summarized from card-network and federal sources listed below, current as of October 2026. A small number of states restrict or prohibit surcharging, and state rules have changed in recent years, so check current law where you do business.",
    },
    {
      type: "qa",
      items: [
        {
          q: "Can I add a fee to debit card purchases?",
          a: [
            "Not as a surcharge. Card-network rules allow surcharges only on credit cards; Mastercard's rules, for example, don't permit them on debit or prepaid cards. That's one reason many businesses prefer dual pricing or a cash discount, which work differently. [See Mastercard's rules](https://www.mastercard.com/us/en/business/support/merchant-surcharge-rules.html).",
          ],
        },
        {
          q: "What signage and receipt rules apply?",
          a: [
            "For surcharging, card networks require you to disclose the surcharge before payment, at the store entrance and at checkout, and to show the surcharge amount on the receipt. For dual pricing, both prices must be posted where customers see them before they pay. For cash discounts, post that the discount is available. Whatever you choose, be consistent: train staff to explain it the same way every time.",
          ],
        },
        {
          q: "Which option fits my business?",
          a: [
            "If most customers pay by card and you'd rather not change prices, a traditional low-cost plan like [Membership](/pricing/membership/) may be simplest. If you have tight margins and many cash or check customers, [dual pricing](/pricing/dual-pricing/) can offset most card costs. Surcharging suits some businesses but comes with caps, debit exclusions and notice requirements. Restaurants are a common fit for dual pricing; see our [restaurant page](/industries/restaurants/).",
          ],
        },
      ],
    },
    { type: "sources", items: [SRC.mcSurcharge, SRC.visaFees, SRC.visaCap, SRC.usc] },
  ],
};

export const feesUpGuide: PageContent = {
  path: "/resources/why-credit-card-processing-fees-go-up/",
  eyebrow: "Guide",
  guide: { author: "jon-wilson", published: DATE, modified: DATE },
  answer:
    "Processing fees go up for two kinds of reasons. Some come from the card networks, which periodically change interchange rates for every processor. Others come from your processor: a higher markup, new monthly fees or cards pushed into pricier tiers. The second kind is the one you can do something about.",
  blocks: [
    {
      type: "qa",
      items: [
        {
          q: "Why did my processing fees go up?",
          a: [
            "Start by checking whether your sales changed. More card sales means more fees, even at the same rate. If sales were flat and fees rose, compare two statements line by line. The usual causes:",
            "**Card network changes.** Visa and Mastercard adjust interchange rates periodically, often in April and October. Mastercard notes that it typically updates its rates twice a year.",
            "**A higher markup.** Your processor raised its own percentage or per-transaction fee, sometimes with only a short notice printed on a statement.",
            "**New fees.** A new monthly charge with an official-sounding name, or a non-compliance fee for skipping a security questionnaire.",
            "**Card mix.** More customers paying with rewards or business cards, or more keyed-in or online transactions, which cost more to accept.",
          ],
        },
        {
          q: "Which increases come from Visa and Mastercard and which from my processor?",
          a: [
            "On an interchange-plus statement it's easy: interchange and network fees are listed separately from your processor's markup. If interchange went up, it went up for every business taking that card. If the markup or monthly fees went up, that was your processor's decision. On tiered or flat-rate statements, the two are blended together, which is exactly why increases there are hard to spot. [Pricing models compared →](/resources/flat-rate-vs-tiered-vs-interchange-plus/)",
          ],
        },
        {
          q: "How do I spot a markup increase on my statement?",
          a: [
            "Lay this month's statement next to one from a year ago. Compare the processor's percentage and per-transaction fee, the list of monthly fees and the messages section, where rate changes are often announced. Then compare your effective rate on both. If it rose while your card mix stayed similar, your processor's pricing changed. [How to read your statement →](/resources/how-to-read-your-processing-statement/)",
          ],
        },
        {
          q: "How can I stop it from happening again?",
          a: [
            "You can't stop the card networks from changing interchange, and no honest processor will say otherwise. You can choose a processor that passes interchange through at cost and puts its own markup in writing. At TruePay, {{claim:rate-lock|we lock our markup for as long as you process with us}}. [Read the fine print →](/why-truepay/)",
            "Not sure what changed on your statement? Send it to us for a [free statement review](/statement-review/) and we'll point to the exact lines.",
          ],
        },
      ],
    },
    { type: "sources", items: [SRC.mcInterchange, SRC.visaFees] },
  ],
};

export const switchGuide: PageContent = {
  path: "/resources/how-to-switch-payment-processors/",
  eyebrow: "Guide",
  guide: { author: "shane-spears", published: DATE, modified: DATE },
  answer:
    "To switch processors safely: check your current contract for an early termination fee, find out whether you own or lease your equipment, confirm your POS works with the new processor, then plan the change for a slow day. Keep your old account open until the first deposits from the new one land.",
  blocks: [
    {
      type: "qa",
      items: [
        {
          q: "Will I owe an early termination fee?",
          a: [
            "Maybe. Look in your merchant agreement for “term,” “early termination” or “liquidated damages.” Some contracts charge a flat fee; others charge an estimate of the fees you would have paid for the rest of the term, which can be large. Contracts often renew automatically, so note the renewal date. Some processors will help cover a termination fee; ask before you sign. TruePay service is {{claim:month-to-month|month to month, with no long-term contract}}.",
          ],
        },
        {
          q: "Do I have to replace my equipment or POS?",
          a: [
            "Not always. If you own your terminal, it may be reprogrammable for a new processor. If you lease it, read the lease. Equipment leases are often separate, non-cancellable contracts that keep billing even after you switch processors. If you use a POS, check whether it can work with the new processor. [Keep your POS →](/solutions/integrations/)",
          ],
        },
        {
          q: "How long does switching take?",
          a: [
            "Plan on a few days to a couple of weeks. Account approval needs basic business and bank information. Equipment needs programming and shipping, and staff need a short walkthrough. Online and integrated setups can take longer while the connection is tested.",
          ],
        },
        {
          q: "When should I wait to switch?",
          a: [
            "Hold off in your busiest season, right before a big event, or if the termination fee is larger than a year of savings. Wait, too, if your current processor is genuinely fair and responsive. Switching should solve a real problem.",
          ],
        },
      ],
    },
    {
      type: "list",
      heading: "Day-one checklist",
      ordered: true,
      items: [
        "Run a small test sale with a card and a phone wallet, then refund it.",
        "Check that tips, taxes and receipts print or send correctly.",
        "Close the batch at the end of the day and note the deposit you expect.",
        "Confirm the first deposit reaches your bank before closing the old account.",
        "Cancel the old account in writing, and return or reprogram old equipment.",
        "Save your support number: you'll want it the first week.",
      ],
    },
    {
      type: "prose",
      heading: "How TruePay handles a switch",
      paras: [
        "{{claim:setup-training}} Our operations team, led by [Shane Spears](/about/shane-spears/), handles the details. Before you commit, read [what we promise in writing](/why-truepay/).",
      ],
    },
    { type: "sources", items: [SRC.pci, SRC.visaFees] },
  ],
};

export const howWorksGuide: PageContent = {
  path: "/resources/how-credit-card-processing-works/",
  eyebrow: "Guide",
  guide: { author: "shane-spears", published: DATE, modified: DATE },
  answer:
    "When a customer pays by card, your terminal sends the payment through your processor and the card network to the customer's bank, which approves it in seconds. Later, usually within one to two business days, the money settles: the card's bank, the network and your processor each take their fee, and the rest is deposited in your account.",
  blocks: [
    { type: "diagram", kind: "payment-flow", caption: "A card payment happens in two stages: authorization at checkout, then settlement and deposit." },
    {
      type: "qa",
      items: [
        {
          q: "What happens when a customer pays by card?",
          a: [
            "Your terminal or checkout reads the card and sends an authorization request to your processor. The processor passes it to the card network, which routes it to the bank that issued the card. That bank checks for funds and fraud and sends back an approval or a decline. All of this takes a few seconds.",
            "At the end of the day, you close your batch. That sends the day's approved sales for settlement.",
          ],
        },
        {
          q: "Who takes a cut of each transaction?",
          a: [
            "Three parties. The **card-issuing bank** receives interchange, the largest share, at rates the card networks publish. The **card network** (Visa, Mastercard, Discover or Amex) receives assessment fees. Your **processor** receives its markup and any account fees. [See how these appear on a statement →](/resources/how-to-read-your-processing-statement/)",
            "Debit cards from large banks have interchange capped by federal rules (Regulation II), which is one reason debit usually costs you less to accept than credit.",
          ],
        },
        {
          q: "Why does it take time for money to reach my bank?",
          a: [
            "Settlement happens in batches between banks, not instantly. Most businesses see deposits within one to two business days after closing the batch, depending on the processor, the bank and the cut-off time. Weekends and bank holidays add time.",
          ],
        },
      ],
    },
    {
      type: "prose",
      heading: "What this means for your costs",
      paras: ["Interchange is set by the networks and is the same for every processor. What differs is the markup and fees on top. That's why [how your pricing is structured](/pricing/) matters as much as the rate you're quoted."],
    },
    { type: "sources", items: [SRC.visaFees, SRC.mcInterchange, SRC.fedRegII] },
  ],
};
