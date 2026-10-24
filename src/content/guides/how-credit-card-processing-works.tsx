import { ComparisonTable } from "@/components/modules";
import { defineGuide, primarySources as sources } from "./model";
function PaymentFlow() {
  const steps = [
    ["1. Tap, insert or enter", "Your checkout sends the payment request."],
    ["2. Request approval", "Processor → network → card issuer."],
    ["3. Capture the sale", "Submit the approved payment for processing."],
    ["4. Clear the records", "Transaction details move between banks."],
    ["5. Settle between banks", "The acquiring and issuing sides settle."],
    ["6. Fund your account", "Your provider follows your funding terms."],
  ];
  return <figure className="card guide-visual">
    <svg width="400" height="668" viewBox="0 0 400 668" role="img" aria-labelledby="flow-title flow-description">
      <title id="flow-title">From a card tap to the merchant’s deposit</title>
      <desc id="flow-description">The checkout sends an approval request through the processor and network to the issuing bank. After approval, the merchant captures the sale. Clearing exchanges records, settlement moves funds between banks and the provider funds the merchant under its agreement. Approval is not the deposit.</desc>
      {steps.map(([heading, detail], i) => <g key={heading}>
        <rect x="4" y={i*112+4} width="392" height="86" rx="16" className={i===0 || i===5 ? "diagram-dark" : "diagram-panel"} />
        <text x="22" y={i*112+36} fontSize="20" fontWeight="800" className={i===0 || i===5 ? "diagram-white" : undefined}>{heading}</text>
        <text x="22" y={i*112+64} fontSize="15" className={i===0 || i===5 ? "diagram-white" : undefined}>{detail}</text>
        {i<5 && <><line x1="200" y1={i*112+92} x2="200" y2={i*112+108} strokeWidth="2" className="diagram-line" /><path d={`M195 ${i*112+102} L200 ${i*112+109} L205 ${i*112+102}`} fill="none" strokeWidth="2" className="diagram-line" /></>}
      </g>)}
    </svg>
    <figcaption>Original simplified diagram. Authorization checks the payment first; clearing, settlement and merchant funding follow. Actual routing and funding timing depend on the payment and your agreement.</figcaption>
  </figure>;
}
export default defineGuide({
  slug: "how-credit-card-processing-works", author: "shane-spears", reviewer: "jon-wilson",
  hero: "Follow the payment from your customer to your bank. Approval happens before clearing and settlement.",
  answer: "Your checkout sends an approval request through a processor and network to the bank that issued your customer’s card. Once you capture the approved sale, financial institutions clear and settle it, then your provider funds your account under your agreement’s timing and deductions.",
  introduction: <PaymentFlow />,
  sources: [sources.treasuryFlow, sources.visaCapture, sources.visaFees],
  sections: [
    { answer: "Your checkout sends a request for the issuing bank to approve or decline the payment, then an approved sale is captured for clearing and settlement. Approval is the first stage, not proof that a deposit has arrived.", detail: ["The processor handles the merchant-side payment connection. The network routes information between the acquiring side and the issuer, which is the customer’s card bank. The approval or decline comes back to your checkout through that chain.", "Capture submits the sale for the later financial stages. Visa’s developer documentation treats authorization and capture as distinct actions. Some checkout flows combine them from the cashier’s point of view, but approval and settlement still serve different purposes.", "The Treasury’s Card Acquiring Service explains the same broad stages for its own operation. Its published funding schedule is specific to that service, so it is not a funding promise for TruePay merchants."] },
    { answer: "Interchange compensates the issuing side, networks charge their own fees and your processor or service provider adds the charges in your agreement. Your statement may show those components separately or bundle them into a merchant discount.", extra: <ComparisonTable caption="Who participates in payment costs. No universal rate or split is implied."
      columns={["Participant", "Role", "Cost to identify"]}
      rows={[
        ["Card issuer", "Provides the customer’s card account and approves or declines.", "Interchange transfers between the acquiring and issuing banks."],
        ["Card network", "Routes and applies network rules to the transaction.", "Network fees and assessments."],
        ["Acquirer / processor / gateway", "Connects your business, processes records and supports acceptance.", "The agreed provider markup, transaction, gateway and account charges."],
      ]} /> },
    { answer: "Authorization, clearing, settlement and merchant funding happen in stages and your deposit follows your provider’s funding terms. Cutoffs, weekends, account reviews and adjustments can affect when and how much reaches your bank.", detail: ["A batch is a group of captured transactions submitted for processing. Ask when your batch closes and what happens if it misses a cutoff. Check the agreement for funding schedules and any reserve or hold provisions rather than assuming every provider deposits on the same timetable.", "To reconcile a deposit, start with the relevant batch and account for fees, refunds, disputes and other adjustments. Some providers deduct fees from deposits; others bill certain charges separately. Match the report to your bank activity before treating a difference as missing money.", "If an expected deposit is absent, collect the batch date, amount and settlement reference, then contact your provider. Do not send full card numbers in an ordinary email when a transaction reference will do."] },
  ],
  fit: "TruePay may not be the best fit if your current provider already gives you suitable funding terms, clear reporting and the connections you need. A familiar integrated setup can be worth keeping when a change would complicate reconciliation without improving your business.",
  commercial: { path: "/pricing/", text: "Compare TruePay’s pricing approaches", reason: "Knowing who handles each stage makes it easier to ask which charges a proposal includes." },
  tool: "/statement-review/",
  siblings: ["/resources/how-to-read-your-processing-statement/", "/resources/how-to-switch-payment-processors/"],
});
