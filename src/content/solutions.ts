/** Specifications are bounded to the route-listed live pages and approved PDF.
 * Row source references are rendered with the comparison, not treated as current availability.
 */
export const designPdf =
  "https://drive.google.com/file/d/1nnLhjNRNYlyB0YqmLF4b835Zm5clYwbr/view";
export type Solution = {
  path: string;
  eyebrow: string;
  hero: string;
  fit: string;
  notFit: string;
  workflow: [string, string][];
  columns: string[];
  options: { cells: string[]; source: string; sourceLabel: string }[];
  questions: string[];
  setup: [string, string][];
  setupClaim?: boolean;
  equipmentCoverage?: boolean;
};
const pdf = (page: number) => ({
  source: `${designPdf}#page=${page}`,
  sourceLabel: `Approved design, page ${page}`,
});
export const posSetup: [string, string][] = [
  [
    "Understand your business",
    "Walk through your current checkout, menu or inventory and the way your team works.",
  ],
  ["Demo and quote", "See the proposed system and talk through the costs."],
  [
    "Configuration",
    "Plan the menu, inventory and payment settings your business needs.",
  ],
  [
    "Installation and training",
    "Get the hardware set up and walk your team through using it.",
  ],
  [
    "Launch support",
    "Talk through the move to your new system and the help you need on launch day.",
  ],
  [
    "Ongoing support",
    "Keep the support contact details handy for questions after launch.",
  ],
];
export const solutions: Solution[] = [
  {
    path: "/solutions/point-of-sale/",
    eyebrow: "Built around your checkout",
    hero: "Choose a POS around how your team takes orders and payments. TruePay helps you compare systems for your counter, tables and everyday workflow.",
    fit: "You want to manage orders, inventory or staff alongside payments in a restaurant or retail business.",
    notFit:
      "If you only need to take a card payment, a terminal may be a simpler starting point.",
    workflow: [
      [
        "Start the sale",
        "Think through how your team enters an order or finds an item.",
      ],
      [
        "Take the payment",
        "Compare counter and tableside workflows with the proposed system.",
      ],
      [
        "Close the day",
        "Review the reporting and handoff your team needs at the end of a shift.",
      ],
    ],
    columns: ["System", "Features in the source", "Conversation to have"],
    options: [
      {
        cells: [
          "Clover",
          "App marketplace; inventory, menu and employee management; chip, tap and digital wallets.",
          "Which apps and hardware fit your retail or restaurant workflow?",
        ],
        ...pdf(10),
      },
      {
        cells: [
          "SkyTab",
          "Handheld tableside ordering, pay-at-the-table, kitchen display and real-time reporting.",
          "How do orders and payments move between your floor and kitchen?",
        ],
        ...pdf(10),
      },
      {
        cells: [
          "Paradise POS",
          "iPad-based system; inventory management and offline/P2P backup described in the source.",
          "Which offline functions and recovery steps apply to your proposed setup?",
        ],
        ...pdf(10),
      },
      {
        cells: [
          "MobileBytes",
          "Restaurant POS with tableside ordering, kitchen display, online ordering and offline mode.",
          "Which ordering channels and kitchen workflow do you need?",
        ],
        ...pdf(10),
      },
    ],
    questions: [
      "Start with the orders, inventory and staff tasks you handle each day. Demo the systems below with a sample order, split check or returned item.",
      "Possibly. Share the system name, version and current processing arrangement so the team can check the connection before recommending a change.",
      "TruePay’s setup process covers learning your business, a demo and quote, configuration, installation and training, launch support and ongoing support. Discuss whether your installation is on-site or remote with the team.",
      "Contact merchant support with your business name, device model and the exact error. Explain what stopped working and when it started so the team can help you work through it.",
    ],
    setup: posSetup,
    setupClaim: true,
  },
  {
    path: "/solutions/terminals/",
    eyebrow: "At the counter or around your business",
    hero: "Choose a countertop or handheld terminal around where your customers pay. Compare the connection, screen and receipt options that matter to your team.",
    fit: "You want a dedicated device for taking card payments at a counter or away from it.",
    notFit:
      "If you also need order, inventory or staff tools, compare a full POS system.",
    workflow: [
      [
        "Choose the location",
        "Decide whether customers pay at a fixed counter or with a device brought to them.",
      ],
      [
        "Plan the connection",
        "Match the specific model to the internet or mobile connection at that location.",
      ],
      [
        "Finish the sale",
        "Walk through the payment and receipt with your team.",
      ],
    ],
    columns: ["Terminal", "Features in the source", "Where to start"],
    options: [
      {
        cells: [
          "Valor VL100",
          "Ethernet and WiFi; tap, chip and swipe/NFC; email and SMS receipts.",
          "A fixed countertop checkout.",
        ],
        ...pdf(11),
      },
      {
        cells: [
          "Valor VL110",
          "Larger display; tap, chip and swipe/NFC; email and SMS receipts.",
          "Compare the exact model and connectivity for your location.",
        ],
        ...pdf(11),
      },
      {
        cells: [
          "Valor VL500",
          "Portable; WiFi and 4G LTE; tap, chip and swipe/NFC; built-in receipt printer.",
          "A checkout that moves around your business.",
        ],
        ...pdf(11),
      },
      {
        cells: [
          "Dejavoo QD4",
          "Android-powered PIN pad; touchscreen; thermal printer; Ethernet and WiFi.",
          "A compact device at the counter.",
        ],
        ...pdf(11),
      },
      {
        cells: [
          "Clover Flex",
          "Handheld; WiFi and 4G LTE; tap, chip and swipe/NFC; receipt printer and Clover apps.",
          "Portable payment and light POS functions.",
        ],
        ...pdf(11),
      },
    ],
    questions: [
      "Start with where you take payment. A fixed counter and a moving checkout have different connection needs; choose the connection for the place where the device will sit.",
      "Compare Membership with the device you need for your checkout. The equipment details sit with the other commitments.",
      "TrueCare concerns covered equipment while you remain a customer. The equipment scope and questions about coverage are collected in the commitment terms.",
      "The table lists each model’s supported payment methods. NFC means contactless payment, such as a card tap or a supported digital wallet.",
    ],
    setup: [
      [
        "Choose the device",
        "Talk through your payment location and the models in the comparison.",
      ],
      [
        "Plan the connection",
        "Review power, internet and receipt needs with the team.",
      ],
      [
        "Walk through checkout",
        "Use the programmed terminal to practice a payment and receipt before your team relies on it.",
      ],
    ],
    equipmentCoverage: true,
  },
  {
    path: "/solutions/mobile-payments/",
    eyebrow: "From the counter to the customer",
    hero: "Take payment where you meet your customer. Start with a portable terminal or app, then work through the connection and receipt you need.",
    fit: "You collect payment on a job, at an event or away from a fixed counter.",
    notFit:
      "If you cannot rely on a connection, work through a backup plan before choosing a device.",
    workflow: [
      [
        "Before you leave",
        "Check the device, power and connection you will use at the payment location.",
      ],
      [
        "At the customer",
        "Review the amount and use the payment method supported by the selected setup.",
      ],
      [
        "After payment",
        "Give the customer the receipt available on that device and check the transaction record.",
      ],
    ],
    columns: ["Option", "Features in the source", "What to discuss"],
    options: [
      {
        cells: [
          "Valor VL500",
          "Portable terminal; WiFi and 4G LTE; built-in receipt printer.",
          "Coverage at the places you work.",
        ],
        ...pdf(11),
      },
      {
        cells: [
          "Clover Flex",
          "Handheld device; WiFi and 4G LTE; built-in receipt printer.",
          "Your payment and receipt workflow.",
        ],
        ...pdf(11),
      },
    ],
    questions: [
      "It depends on the option and how you accept a card. A portable terminal is a dedicated device; for the Valor Pay app, discuss your phone and payment method before assuming phone-only acceptance.",
      "WiFi may be an option on a supported device where it is available. Do not assume offline payment acceptance; discuss your locations and the backup procedure for your specific setup.",
      "The VL500 and Clover Flex have built-in receipt printers in the approved design. Receipt choices depend on your device; an emailed invoice is not the same thing as a payment receipt.",
    ],
    setup: [
      [
        "Describe your locations",
        "Tell the team where you work and which connections are available.",
      ],
      [
        "Compare the options",
        "Choose a device or app around your payment and receipt needs.",
      ],
      [
        "Try the workflow",
        "Walk through a payment, its record and the receipt before using the setup on a job.",
      ],
    ],
  },
  {
    path: "/solutions/online-payments/",
    eyebrow: "A checkout that fits your website",
    hero: "Connect online payments to the way your website sells. TruePay starts with your platform, then helps you explore a suitable gateway.",
    fit: "You sell through a website and need to connect checkout with payment processing.",
    notFit:
      "If you mainly send invoices, start with billing software rather than rebuilding your website checkout.",
    workflow: [
      [
        "Customer checks out",
        "Identify where a customer enters their order and pays on your website.",
      ],
      [
        "Payment is recorded",
        "Review the transaction and reporting workflow with the chosen gateway.",
      ],
      [
        "Books are reconciled",
        "Discuss how payment records will reach your accounting process.",
      ],
    ],
    columns: ["Gateway", "Source description", "Fit to check"],
    options: [
      {
        cells: [
          "Authorize.net",
          "Named as a gateway option for website and ecommerce payments.",
          "Your website platform and checkout connection.",
        ],
        ...pdf(12),
      },
      {
        cells: [
          "eProcessing Network",
          "Named alongside Authorize.net in the online-payment offering.",
          "Your checkout, reporting and accounting requirements.",
        ],
        ...pdf(12),
      },
    ],
    questions: [
      "Share your website platform, checkout tools and any existing gateway. Compatibility depends on the actual connection; the gateway names below are starting points for that conversation.",
      "Start by talking with TruePay about your ecommerce needs. Agree the gateway, who makes each website change and how checkout and reporting will be tested before launch.",
      "Ask for the processing, gateway and any setup charges together in your proposal. A transaction rate by itself does not describe the full cost of online payments.",
    ],
    setup: [
      [
        "Discuss your website",
        "Start with your platform and the way customers place orders.",
      ],
      [
        "Plan the connection",
        "Agree the gateway, responsibilities and reporting needs.",
      ],
      [
        "Check checkout",
        "Review a payment and its record before you start using the connection.",
      ],
    ],
  },
  {
    path: "/solutions/integrations/",
    eyebrow: "Start with the system your team knows",
    hero: "You may be able to keep your current POS when changing processors. Share your system details so TruePay can check the connection first.",
    fit: "Your team likes the system it uses, and you want to explore a different processing arrangement.",
    notFit:
      "If your software requires its existing payment provider, keeping that connection may make more sense.",
    workflow: [
      [
        "Map the sale",
        "Explain how an order becomes a payment in your current system.",
      ],
      [
        "Check the connection",
        "Review the software version, gateway and processing arrangement.",
      ],
      [
        "Plan the handoff",
        "Talk through the payment, receipt and reporting steps your staff would use after a change.",
      ],
    ],
    columns: [
      "System or connection",
      "Named in the source",
      "Details to bring",
    ],
    options: [
      {
        cells: [
          "Authorize.net",
          "Website gateway reference.",
          "Platform, gateway account and current payment connection.",
        ],
        ...pdf(12),
      },
      {
        cells: [
          "eProcessing Network",
          "Online-payment gateway reference.",
          "Platform and reporting requirements.",
        ],
        ...pdf(12),
      },
      {
        cells: [
          "QuickBooks",
          "Accounting and transaction-sync workflows.",
          "Your QuickBooks edition/version and reconciliation process.",
        ],
        ...pdf(12),
      },
      {
        cells: [
          "Biller Genie",
          "QuickBooks invoice and payment workflow.",
          "Invoice process and accounting edition.",
        ],
        ...pdf(13),
      },
      {
        cells: [
          "MantaPay",
          "QuickBooks invoice and payment-link workflow.",
          "Invoice delivery and payment-record requirements.",
        ],
        ...pdf(13),
      },
    ],
    questions: [
      "It depends on your POS, software version and processing connection. The systems named below come from the source material; they are not a universal compatibility list.",
      "Bring your system name, version, gateway and current processing arrangement. Ask the team to check that exact combination and walk through a test payment, receipt and report before planning the switch.",
      "The answer depends on the connection. Map any changes to taking payments, receipts, refunds and reporting with your team, then plan training around those differences.",
    ],
    setup: [
      [
        "Gather system details",
        "Start with the software, version, hardware and current processing arrangement.",
      ],
      [
        "Review compatibility",
        "Discuss the actual connection and the changes it would require.",
      ],
      [
        "Plan the switch",
        "Agree the staff walkthrough and payment/reporting checks for the proposed setup.",
      ],
    ],
  },
  {
    path: "/solutions/billing-software/",
    eyebrow: "From invoice to payment record",
    hero: "Keep your invoice and payment workflow connected. Explore Biller Genie or MantaPay around the way you use QuickBooks.",
    fit: "You send invoices and want to discuss payment links and the way payments return to your books.",
    notFit:
      "If your main need is a shopping-cart checkout, compare online payments instead.",
    workflow: [
      [
        "Create the invoice",
        "Start with the invoice and customer record in your accounting workflow.",
      ],
      [
        "Customer pays",
        "Use the payment-link workflow supported by the selected tool.",
      ],
      [
        "Review the books",
        "Check how the payment posts back and how your team reconciles it.",
      ],
    ],
    columns: ["Tool", "Features in the source", "Scope to discuss"],
    options: [
      {
        cells: [
          "Biller Genie",
          "Invoice syncing, branded Pay Now links and payment posting to QuickBooks.",
          "QuickBooks edition, invoice automation and the payment methods in your plan.",
        ],
        ...pdf(13),
      },
      {
        cells: [
          "MantaPay",
          "Two-way QuickBooks sync and payment links by email or text.",
          "Your QuickBooks edition, invoice delivery and reconciliation workflow.",
        ],
        ...pdf(13),
      },
    ],
    questions: [
      "The source describes QuickBooks workflows for Biller Genie and MantaPay. Tell TruePay which edition and version you use so the specific connection can be checked.",
      "Talk through your invoice cycle and any repeat billing you need. Scheduling, customer authorization and supported payment methods need to be checked for the selected tool and plan.",
      "Ask for a proposal that includes the billing software and processing costs. Discuss any setup, recurring or transaction charges together; no current dollar fee is quoted here.",
    ],
    setup: [
      [
        "Review invoicing",
        "Show how you create, send and reconcile invoices today.",
      ],
      [
        "Choose the connection",
        "Discuss the billing tool, QuickBooks edition and payment methods.",
      ],
      [
        "Walk through a payment",
        "Check invoice delivery, payment posting and reconciliation with your team.",
      ],
    ],
  },
];
export const solutionChooser = [
  {
    path: "/solutions/terminals/",
    title: "At the counter",
    body: "A dedicated device for taking a card payment.",
  },
  {
    path: "/solutions/point-of-sale/",
    title: "At the table",
    body: "Orders, payments and the tools your floor needs.",
  },
  {
    path: "/solutions/mobile-payments/",
    title: "In the field",
    body: "Portable payments where you meet the customer.",
  },
  {
    path: "/solutions/online-payments/",
    title: "On your website",
    body: "A gateway conversation around your checkout.",
  },
  {
    path: "/solutions/billing-software/",
    title: "By invoice",
    body: "Payment links and the handoff to your books.",
  },
  {
    path: "/solutions/integrations/",
    title: "Keep my POS",
    body: "Check your current system before replacing it.",
  },
];
