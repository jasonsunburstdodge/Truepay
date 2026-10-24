import type { IndustryPageContent } from "./model";
const restaurant: IndustryPageContent = {
  slug: "restaurants", eyebrow: "For the floor, the bar and the pickup counter",
  hero: "Keep tip adjustments and check splits out of the closing scramble. Plan payments around your floor, bar and pickup counter.",
  answer: "Restaurant payments follow the service: open an order or tab, keep seats and items organized, then collect payment and reconcile tips. TruePay can help you compare a restaurant POS with a simpler terminal setup. Bring your table service, bar and takeout routines to the demo so the proposed checkout fits each one.",
  workflowTitle: "How payments work in a restaurant",
  workflow: [["Open the order", "Show how servers start tables and bartenders manage tabs. Include any preauthorization routine in the conversation rather than treating approval as a completed sale."], ["Finish with the guest", "Walk through split checks, a tip adjustment and pay-at-the-table. Ask how each action works on the specific system being proposed."], ["Close the shift", "Match paid checks, tip records and the batch report. Give the closing manager a procedure for unresolved tabs and a payment that needs correction."]],
  setups: [
    {path:"/solutions/point-of-sale/",title:"Restaurant POS",reason:"SkyTab and MobileBytes are starting points when orders need to reach the kitchen and payments happen at the table. Clover also belongs in a menu and staff-workflow comparison.",check:"Demo your check splits and tip process on the proposed version; a product name does not establish every configuration."},
    {path:"/solutions/terminals/",title:"A dedicated counter terminal",reason:"A terminal can suit a small counter-service operation that already handles orders elsewhere. It keeps the payment task separate from a full restaurant-system change.",check:"Choose around counter space, connectivity and the receipt your guests need."},
  ],
  membership:"Membership itemizes underlying card costs and TruePay’s markup, giving the owner a way to compare payment costs alongside the menu’s existing prices.",
  dual:"Dual pricing adds a visible cash-and-card choice to the guest’s bill. Think through menu display, tip presentation and the conversation a server has after a meal.",
  decision:"Rehearse a full check with a tip before choosing the pricing approach; a comfortable guest experience matters alongside the statement total.",
  fit:"If your restaurant depends on a system that cannot connect to the proposed processing arrangement, keeping that system may be the better decision.",
  setupTitle:"Practice the Friday-night handoff.",
  setup:[["Map the floor", "Bring a sample menu and the way orders move between the bar, kitchen and servers."],["Rehearse exceptions", "Use the demo to try a split bill, corrected order and refund before service begins."],["Prepare the closing manager", "Agree who checks tips and batches and who can authorize a correction."]],
  support:"When a dining-room payment stalls, tell support which station is affected and whether other stations can still take payments. Keep the check reference and exact error handy without sending full card details.",
  contact:"Talk with Shane about the handoff between orders, equipment and a busy service.",
  questions:["Treat an open tab, an authorization and the final charged amount as separate steps. Ask the POS provider to demonstrate a tip correction after the check has closed, including which staff role can make it.","Those workflows depend on the selected POS and hardware. SkyTab’s manufacturer describes check splitting and tableside options; confirm the exact combination in your demo.","Identify each order channel and how its payment appears in reporting. Test a takeout order alongside a dining-room check so the closing staff can recognize both.","It depends on how clearly the menu, bill and tip screen explain the amounts. Ask the team to walk through debit handling and the current rules before you change the guest-facing prices.","Test order entry, a split payment, the receipt and a batch close with the people who will manage the shift. Choose a launch window when they can practice without a queue of waiting guests."],
  ctaTitle:"Build a checkout that fits your service.",
  sources:[{title:"Approved design: restaurant systems and setup, page 10",url:"https://drive.google.com/file/d/1nnLhjNRNYlyB0YqmLF4b835Zm5clYwbr/view#page=10",publisher:"TruePay approved design"},{title:"SkyTab check splitting, tip tools and preauthorization release notes",url:"https://releasenotes.shift4.com/announcements/skytab-winter-release-is-coming-faster-order-entry-easier-splits-smarter-tips",publisher:"SkyTab"}],
};
export default restaurant;
