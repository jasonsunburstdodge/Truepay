import { ComparisonTable } from "@/components/modules";
import { claims } from "@/content/claims";
import { defineGuide, primarySources as sources } from "./model";
const lock = claims.find((claim) => claim.id === "rate-lock")!;
export default defineGuide({
  slug: "why-credit-card-processing-fees-go-up", author: "jon-wilson", reviewer: "shane-spears",
  hero: "Find out what changed on your statement. Separate network costs from the charges your provider controls.",
  answer: "Processing bills rise when network costs change, your transaction mix changes, or your provider increases its markup or account charges. Compare matching fee lines across statements and your agreement, because a higher effective rate alone does not show who changed a price.",
  sources: [sources.visaFees, sources.mastercardRates, sources.fed],
  sections: [
    { answer: "A higher bill can reflect more card sales, different transactions, changed network costs or increased provider charges. First separate a larger dollar total from a higher price for the same kind of payment.", detail: ["Put two statements side by side. Compare card sales, transaction count, average ticket, payment channel, card mix, monthly fees and refunds. If a fixed fee stays the same but sales fall, your effective rate can rise without a price change.", "Network qualification also matters. Mastercard lists criteria including merchant category, transaction data and time between authorization and clearing. Ask which changed conditions affected your bill, with examples from the relevant transactions."] },
    { answer: "Networks set interchange schedules and network fees; your provider sets its own markup and account charges under your agreement. Network schedule changes apply across providers, but their effect on your bill depends on your pricing model and transactions.", extra: <ComparisonTable caption="Separate the source of a change before comparing providers."
      columns={["Cost bucket", "Who controls it", "What to request"]}
      rows={[
        ["Interchange and network charges", "Card networks set schedules and criteria; interchange transfers between banks.", "The applicable network category, effective date and transaction basis."],
        ["Transaction mix / qualification", "Your accepted cards, channels and processing details affect the categories used.", "The old and new mix and any changed qualification reason."],
        ["Processor markup and account fees", "The provider’s agreement sets its own percentage, per-item and monthly charges.", "The signed schedule and any notice or agreement authorizing the increase."],
      ]} /> },
    { answer: "Compare the provider’s percentage, per-item charge and fixed fees against the same lines in your signed schedule and prior statement. Ask for an itemized explanation if a bundled price hides the difference.", detail: ["For a fictional example, provider markup moving from 20 to 30 basis points is an increase from 0.20% to 0.30%. At $10,000 in monthly card sales, that difference alone is $10, before any per-item or fixed-fee changes.", "That example holds sales constant and ignores other costs; it is not a TruePay rate or a market benchmark. Use your own figures and keep a copy of the provider’s explanation so you can verify the next bill."] },
    { answer: "Ask for clear written limits on provider-controlled charges, keep the fee schedule and check each statement for changes. A rate lock can address the provider’s portion; it cannot freeze network schedules or your card mix.", detail: ["Ask which percentage, per-item and monthly amounts are protected, which costs pass through, and whether exceptions apply. Compare the answer with the written agreement rather than relying on the label alone."], extra: <section id="fine-print" className="card"><h3>TruePay’s rate-lock promise and scope</h3><p data-claim="rate-lock">{lock.copy}</p><p>{lock.scope}</p></section> },
  ],
  fit: "If the change is an explained network cost or a different card mix, another processor may face the same underlying expense. TruePay may not be the best fit when your existing markup is already competitive and the switch adds more cost or disruption than value.",
  commercial: { path: "/why-truepay/#fine-print", text: "Read TruePay’s commitments and scope", reason: "Understand what the provider controls before comparing a rate-lock promise." },
  tool: "/statement-review/",
  siblings: ["/resources/how-to-read-your-processing-statement/", "/resources/flat-rate-vs-tiered-vs-interchange-plus/"],
});
