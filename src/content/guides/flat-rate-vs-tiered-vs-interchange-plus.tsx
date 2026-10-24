import { ComparisonTable } from "@/components/modules";
import { defineGuide, primarySources as sources } from "./model";
import { pricingAssumptions, pricingExample } from "./pricing-example";
const money = (cents: number) => (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
function CostExample() {
  return <>
    <ComparisonTable caption="Fictional monthly cost comparison. Illustrative proposals only, not TruePay quotes or market rates."
      columns={["Monthly card sales / transactions", "Flat rate", "Tiered", "Interchange-plus"]}
      rows={pricingAssumptions.volumes.map((v) => { const r = pricingExample(v); return [`${money(v * 100)} / ${r.transactions}`, money(r.flatCents), money(r.tieredCents), money(r.plusCents)]; })} />
    <div className="card">
      <h3>Assumptions behind every number</h3>
      <ul>
        <li>Average card sale: $50. Monthly card sales: $2,000, $10,000 and $50,000, giving 40, 200 and 1,000 transactions.</li>
        <li>Flat-rate example: 2.70% + $0.10 per transaction; no monthly fee assumed.</li>
        <li>Tiered example: 50% of sales at 2.00%, 30% at 3.00%, 20% at 3.80%; $0.10 per transaction plus $15 monthly.</li>
        <li>Interchange-plus example: assumed blended underlying network cost of 1.65% + $0.10 per transaction, plus processor markup of 0.30% + $0.05 per transaction and $25 monthly.</li>
        <li>All figures are fictional, including the underlying network cost and tier mix. They are not rates offered by a network, manufacturer or TruePay.</li>
        <li>Excludes refunds, disputes, cross-border charges, taxes, equipment, gateway/software costs and other charges. Each model includes only its listed assumptions.</li>
      </ul>
      <p>Formula: percentage charges × card sales + per-item charges × transaction count + monthly charges. The table is computed from these inputs in code, rounded to cents.</p>
    </div>
  </>;
}
export default defineGuide({
  slug: "flat-rate-vs-tiered-vs-interchange-plus", author: "jon-wilson", reviewer: "shane-spears",
  hero: "Compare the whole bill, not just the rate. The right pricing model depends on how you get paid.",
  answer: "Flat-rate pricing bundles charges, tiered pricing groups transactions into price bands, and interchange-plus separates underlying network costs from processor markup. Compare monthly totals at your sales volume and ticket size, because account fees and card mix can change which model costs less.",
  sources: [sources.visaFees, sources.mastercardRates, sources.fed],
  sections: [
    { answer: "Flat-rate pricing charges a quoted percentage, often with a per-transaction amount, for a defined category of payments. It can make budgeting easier, especially when you value a simple bill at low volume.", detail: ["Flat does not necessarily mean one price for every payment channel. Compare in-person, online, keyed and international transactions using the actual proposal. Also check software and account charges outside the transaction rate.", "You still bear the economics of card acceptance, even when the provider bundles them. Visa distinguishes the merchant’s negotiated discount rate from interchange between banks; your retail price is not the same thing as a published network rate."] },
    { answer: "Tiered pricing places payments into categories with different rates, often labeled qualified, mid-qualified and non-qualified. A low headline tier is hard to evaluate without knowing which of your sales qualify for it.", detail: ["Ask for the rate and transaction share in every tier, plus all fixed charges. A proposal based on every transaction receiving the first tier will not show the cost of a mixed card population.", "Processor tiers are not a substitute for the underlying network qualification rules. Request the definition of each tier and an explanation of how your own transactions are assigned."] },
    { answer: "Interchange-plus shows underlying interchange separately from the provider’s agreed markup; network assessments and account charges also belong in your comparison. Cost-plus describes the pricing structure, not a promise that every bill will be lower.", detail: ["The markup may include a percentage, a per-item amount and fixed monthly charges. Ask which network costs are passed through and how they appear. Mastercard publishes transaction qualification criteria, so there is no single interchange rate that fits every sale.", "A transparent breakdown helps you compare the provider-controlled portion. It does not freeze card mix or network schedules, and it does not remove the need to check the total."] },
    { answer: "The least expensive model depends on the complete proposal and your transaction mix, not volume alone. In this fictional comparison, flat rate costs less at $2,000, while interchange-plus costs less at the two higher volumes.", detail: ["That result comes from the assumptions below. Different monthly fees, ticket sizes, tier allocation or card mix can change it. Compare more than one representative month before choosing."], extra: <CostExample /> },
  ],
  fit: "A simple flat-rate plan can be a sensible choice for a business with occasional card sales and little need for a separate merchant account. TruePay may not be the best fit if a monthly program costs more than your current total, or changing systems would outweigh the benefit.",
  commercial: { path: "/pricing/", text: "See TruePay’s pricing approaches", reason: "Compare the structure first, then ask for a proposal based on your actual sales and systems." },
  tool: "/effective-rate-calculator/",
  siblings: ["/resources/how-to-read-your-processing-statement/", "/resources/why-credit-card-processing-fees-go-up/"],
});
