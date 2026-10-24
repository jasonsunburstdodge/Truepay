import { ComparisonTable } from "@/components/modules";
import { defineGuide, primarySources as sources } from "./model";
export default defineGuide({
  slug: "dual-pricing-vs-surcharging-vs-cash-discount", author: "shane-spears", reviewer: "jon-wilson",
  hero: "Similar labels can mean different checkouts. Understand the difference before choosing how to display your prices.",
  answer: "Dual pricing displays cash and card prices, cash discounts reduce a posted price, and surcharges add a charge for eligible credit-card payments. Compare what customers see, how debit is handled and what current network and state rules require, because the program’s name does not decide its treatment.",
  sources: [sources.visaSurcharge, sources.mastercardSurcharge, sources.newYork, sources.massachusetts],
  sections: [
    { answer: "Dual pricing shows two prices, a cash discount reduces a posted regular price, and surcharging adds a charge for paying by credit card. The actual display and checkout calculation matter more than the program’s name.", extra: <>
      <ComparisonTable caption="Compare the checkout method, not just its label. Illustrative descriptions, not approval of a particular program."
        columns={["Method", "What customers see", "What to check"]}
        rows={[
          ["Dual pricing", "Cash and card prices displayed before purchase.", "Both prices, checkout display, receipt and debit treatment."],
          ["Cash discount", "A posted card/regular price reduced for eligible cash payment.", "The discount is taken from the posted price, rather than added back as a card fee."],
          ["Credit surcharge", "A disclosed fee added for an eligible credit-card payment.", "Network caps, notice, debit exclusions, disclosures and state restrictions."],
        ]} />
      <p>Visa’s guidance distinguishes a discount from adding a card fee to a lower advertised price. Renaming an added fee a “non-cash adjustment” does not settle its treatment.</p>
    </> },
    { answer: "Visa and Mastercard prohibit surcharges on their debit and prepaid cards, including when a debit card is processed without a PIN. A customer choosing “credit” at the terminal does not turn the debit card into a credit card.", detail: ["Ask how your checkout identifies card type and handles each tender. Do not assume that calling a program dual pricing or cash discount makes an added debit fee acceptable. Have the proposed display and transaction flow checked against current network rules and applicable state requirements."] },
    { answer: "Surcharges require advance disclosure and receipt treatment under the applicable network rules, while state law can add restrictions. Show the customer the price before they pay, and use the rules for the actual method you implement.", detail: ["Visa’s U.S. guidance requires at least 30 days’ notice to the acquirer and limits a credit surcharge to the applicable merchant discount rate or 3%, whichever is lower. It calls for disclosures at entry, checkout and on receipts.", "Mastercard’s page requires at least 30 days’ notice to both Mastercard and the acquirer, with limits tied to acceptance cost and its surcharge cap. Check its current detailed rules rather than borrowing another network’s percentage.", "State examples below were checked on October 24, 2026. They are a starting point, not a state-by-state legal clearance; ask a qualified adviser to confirm current law and its application to your locations."], extra: <ComparisonTable caption="Selected state source checks · October 24, 2026. Not an exhaustive legal map."
      columns={["State", "Primary-source position checked", "Source date / practical next step"]}
      rows={[
        ["New York", "State guidance says to display the total credit-card price before sale; a fee sign alone does not satisfy that guidance.", "Guidance effective February 11, 2024; checked October 24, 2026. Review the Department of State’s price-display examples."],
        ["Massachusetts", "Chapter 140D §28A prohibits a seller’s credit-card surcharge and addresses disclosed cash discounts.", "Current statute text checked October 24, 2026. Confirm application and any later changes before setup."],
      ]} /> },
    { answer: "Choose the method your customers can understand and your checkout can handle correctly, after checking the rules for your location. Keeping one price for every payment method can be the better choice when simplicity matters most.", detail: ["Walk through a sale, a debit payment and a refund with your team. Check that advertised prices, the terminal total and the receipt tell the same story. Discuss how your staff will answer a customer’s question without a surprise at the counter.", "Compare the processing costs you retain, software requirements and customer experience. Passing some costs to card-paying customers does not mean your business has no remaining payment expenses."] },
  ],
  fit: "TruePay’s dual-pricing option may not be the best fit if your customers expect one price, your software cannot display prices clearly, or the method does not suit local requirements. A conventional plan can be a better answer when you prefer to absorb acceptance costs in your prices.",
  commercial: { path: "/pricing/dual-pricing/", text: "Explore TruePay’s dual-pricing approach", reason: "If two displayed prices suit your business, talk through the actual checkout before deciding on a program." },
  tool: "/effective-rate-calculator/",
  siblings: ["/resources/flat-rate-vs-tiered-vs-interchange-plus/", "/resources/why-credit-card-processing-fees-go-up/"],
});
