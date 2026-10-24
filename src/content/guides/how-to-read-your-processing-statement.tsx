import { defineGuide, primarySources as sources } from "./model";

const example = { volume: 10000, transactions: 200, interchange: 165, assessments: 15, markup: 40, monthly: 25 };
const total = example.interchange + example.assessments + example.markup + example.monthly;
const dollars = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });
function StatementExample() {
  const rows = [
    ["Card sales", dollars(example.volume)],
    ["Transactions", String(example.transactions)],
    ["Interchange", dollars(example.interchange)],
    ["Network assessments", dollars(example.assessments)],
    ["Processor markup", dollars(example.markup)],
    ["Monthly account fee", dollars(example.monthly)],
    ["Total processing fees", dollars(total)],
    ["Effective rate", `${(total / example.volume * 100).toFixed(2)}%`],
  ];
  return <figure className="card guide-visual">
    <svg viewBox="0 0 400 468" width="400" height="468" role="img" aria-labelledby="statement-title statement-description">
      <title id="statement-title">Example statement: fictional numbers for learning</title>
      <desc id="statement-description">Fictional sales of $10,000 across 200 transactions. Interchange $165, assessments $15, markup $40, monthly account fee $25. Total fees $245. Effective rate 2.45%. Not a TruePay quote or a merchant result.</desc>
      <rect width="400" height="468" rx="16" className="diagram-dark" />
      <text x="24" y="36" fontSize="13" fontWeight="800" className="diagram-gold">EXAMPLE · FICTIONAL STATEMENT</text>
      <text x="24" y="68" fontSize="23" fontWeight="800" className="diagram-white">Follow the fee buckets.</text>
      {rows.map(([label, value], i) => <g key={label}>
        <rect x="16" y={92+i*43} width="368" height="39" rx="6" className="diagram-panel" />
        <text x="28" y={117+i*43} fontSize="15">{label}</text>
        <text x="372" y={117+i*43} textAnchor="end" fontSize="16" fontWeight="800">{value}</text>
      </g>)}
    </svg>
    <figcaption><strong>Fictional example, not a quote.</strong> Assumes one month, no refunds, chargebacks, equipment charges or other fees. The network/processor split is invented for this illustration; it is not a published rate schedule.</figcaption>
    <p>Annotation: start with sales, separate network costs from provider charges, then divide all processing fees by card sales. Here, {dollars(total)} ÷ {dollars(example.volume)} × 100 = <strong>{(total / example.volume * 100).toFixed(2)}%</strong>.</p>
  </figure>;
}
export default defineGuide({
  slug: "how-to-read-your-processing-statement", author: "jon-wilson", reviewer: "shane-spears",
  answer: "Read your processing statement by matching card sales, separating network costs from processor charges, then adding the fees for that billing period. Divide those fees by the same period’s card sales for your effective rate, and question anything that differs from your agreement.",
  introduction: <StatementExample />,
  sources: [sources.visaFees, sources.mastercardRates, sources.fed],
  sections: [
    { answer: "Interchange is a transfer between the acquiring bank and the card-issuing bank; assessments are network charges, while processor markup pays your provider. Your merchant bill can bundle these costs or list them separately.", detail: ["The issuer is the bank behind your customer’s card. The acquirer is the financial institution on the merchant side. Visa explains that merchants negotiate a merchant discount with their financial institution; interchange is part of the underlying economics, not a separate bill you receive from Visa.", "On an itemized statement, group network-related entries together, then identify the provider’s percentage, per-transaction charges and account fees. A basis point means one hundredth of a percentage point: 25 basis points is 0.25%."] },
    { answer: "Transaction charges and account fees can be part of the price you agreed to, but an unfamiliar or changed fee deserves a question. A familiar label alone does not show that the amount is correct.", detail: ["Match each charge to the signed schedule. Check the quantity as well as the price: a per-authorization charge may not equal the count of completed sales. Ask which events are billable rather than assuming all counts should match.", "Flag a new monthly fee, a rate different from the agreement, an unexplained tier change or a billed service you do not recognize. Ask for the calculation, the contractual basis and the effective date. Keep the explanation with your statement."] },
    { answer: "Divide total processing fees by card sales for the same billing period, then multiply by 100. This gives an all-in comparison figure, not the interchange rate for a particular card.", detail: ["In the fictional example above, total fees are $245 and card sales are $10,000, giving 2.45%. Include monthly fees charged outside the statement if you want a broader acceptance-cost comparison, and label that scope consistently.", "Use card sales rather than cash sales, total business revenue or your net bank deposit. Note how the statement treats refunds and chargebacks before comparing periods. A lower sales month can make the same fixed fee look larger as a percentage."] },
    { answer: "Ask your processor to identify the pricing model, show the markup and explain every charge against the signed agreement. Then ask what changed from the previous period and whether your transaction mix changed too.", extra: <ul className="guide-checklist"><li>Which fees are network costs and which are yours?</li><li>What percentage, per-item and monthly charges did I agree to?</li><li>What caused this transaction to qualify for a different rate?</li><li>Are equipment, software and account fees billed elsewhere?</li><li>Where are cancellation, renewal and notice terms recorded?</li></ul> },
  ],
  fit: "If your current provider explains the bill clearly and the total cost suits your business, changing processors may add work without enough benefit. TruePay may not be the best fit if a required system cannot connect or switching costs outweigh the improvement.",
  commercial: { path: "/pricing/", text: "Compare TruePay’s pricing approaches", reason: "Once you know your current fee buckets, you can compare another proposal on the same basis." },
  tool: "/statement-review/",
  siblings: ["/resources/flat-rate-vs-tiered-vs-interchange-plus/", "/resources/how-credit-card-processing-works/"],
});
