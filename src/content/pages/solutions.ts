import type { PageContent } from "./types";

const confirmNote = "Models and features shown are examples from our current lineup. Availability changes, so we'll confirm the right equipment for your business before you sign.";

const supportQ = {
  q: "What happens if it stops working?",
  a: ["Call {{phone}} and our US-based team works the problem with you. Covered TruePay equipment that fails is repaired or replaced under Lifetime TrueCare. [Support →](/support/)"],
};

export const solutionsHub: PageContent = {
  path: "/solutions/",
  eyebrow: "Solutions",
  answer:
    "The right setup depends on where you take payments: at a counter, at the table, on a job site, online or by invoice. TruePay provides terminals, point-of-sale systems, mobile and online payments and billing software, sets them up and supports them. Many businesses can also keep the POS they already have.",
  blocks: [
    {
      type: "cards",
      heading: "What equipment do I need?",
      intro: "Start with how your customers pay you.",
      columns: 3,
      cards: [
        { title: "At a counter", text: "A countertop terminal, or a POS if you also want inventory and reporting.", href: "/solutions/terminals/", linkText: "Terminals" },
        { title: "At the table or on the floor", text: "A full point-of-sale system with handhelds for table-side payment.", href: "/solutions/point-of-sale/", linkText: "Point of sale" },
        { title: "On the job site", text: "A portable terminal or phone app that works where you work.", href: "/solutions/mobile-payments/", linkText: "Mobile payments" },
        { title: "On your website", text: "A payment gateway that connects to your site or shopping cart.", href: "/solutions/online-payments/", linkText: "Online payments" },
        { title: "By invoice or on a schedule", text: "Invoicing and recurring billing that syncs with QuickBooks.", href: "/solutions/billing-software/", linkText: "Billing software" },
        { title: "With the POS you already use", text: "Keep your system and change who processes for it.", href: "/solutions/integrations/", linkText: "Keep your POS" },
      ],
    },
    {
      type: "qa",
      items: [
        {
          q: "Can I keep my current system?",
          a: ["Often, yes. Many POS and software systems can work with more than one processor. We'll check yours before you commit. [How to check →](/solutions/integrations/)"],
        },
        {
          q: "Who sets it up and trains my team?",
          a: ["{{claim:setup-training}} After you're running, the same team answers when you call. Pricing questions? See [how our pricing works](/pricing/)."],
        },
      ],
    },
    {
      type: "prose",
      heading: "Terminal or POS: what's the difference?",
      paras: [
        "A **terminal** takes card payments. That's its job, and it's the simplest, lowest-cost option. A **point-of-sale system** also runs your business: menus or inventory, staff, tips, tables and reports. If you need those things, a POS is worth it. If you just need to take cards, a terminal is enough.",
      ],
    },
  ],
};

export const pos: PageContent = {
  path: "/solutions/point-of-sale/",
  eyebrow: "Solutions · Point of sale",
  answer:
    "TruePay sets up point-of-sale systems such as Clover, SkyTab, Paradise POS and MobileBytes for restaurants, bars and retail stores. We help you choose, configure menus or inventory, install and train your staff, and support the system afterward. If you love your current POS, we may be able to keep it.",
  blocks: [
    {
      type: "table",
      heading: "Which POS fits my business?",
      caption: "POS systems TruePay works with",
      columns: ["System", "Often a fit for", "Worth knowing"],
      rows: [
        ["Clover", "Retail shops, quick-service restaurants, salons", "Countertop stations and handhelds such as Clover Flex. Large app library."],
        ["SkyTab", "Full-service restaurants and bars", "Countertop SkyTab Glass and SkyTab Mobile handhelds for pay-at-table."],
        ["Paradise POS", "Restaurants and retail", "Built for hospitality and retail workflows."],
        ["MobileBytes", "Restaurants", "Restaurant POS with online ordering options."],
      ],
      note: confirmNote,
    },
    {
      type: "steps",
      heading: "Who installs it and trains my staff?",
      intro: "{{claim:setup-training}} Here's how it goes:",
      steps: [
        { title: "Understand your business", text: "How you take orders, run tables or ring up sales, and what frustrates you today." },
        { title: "Demo and quote", text: "We show you the options that fit and put the costs in writing." },
        { title: "Configuration", text: "Menus, items, taxes, tips and staff set up before go-live." },
        { title: "Installation and training", text: "Your team learns the system before customers are in line." },
        { title: "Launch support", text: "We're on call for your first days running live." },
        { title: "Ongoing support", text: "The same people pick up when you call later." },
      ],
    },
    {
      type: "qa",
      items: [
        {
          q: "Can I keep my current POS?",
          a: ["In many cases. If your system can work with TruePay processing, keeping it saves your team from learning something new. [See how we check →](/solutions/integrations/)"],
        },
        {
          q: "What happens if it goes down on a Friday night?",
          a: ["Call {{phone}}. A real person picks up and works the problem with you. Covered equipment is repaired or replaced under Lifetime TrueCare. [Support →](/support/)"],
        },
      ],
    },
    {
      type: "cards",
      heading: "Built for your kind of business",
      columns: 2,
      cards: [
        { title: "Restaurants & bars", text: "Tips, split checks, table-side payment and a busy Friday night.", href: "/industries/restaurants/", linkText: "Restaurants" },
        { title: "Retail", text: "Fast checkout, inventory and online sales in one place.", href: "/industries/retail/", linkText: "Retail" },
      ],
    },
  ],
};

export const terminals: PageContent = {
  path: "/solutions/terminals/",
  eyebrow: "Solutions · Terminals",
  answer:
    "A countertop terminal is best when customers pay at a register; a wireless terminal is best when you bring payment to them. TruePay terminals take chip, tap and phone wallet payments, arrive programmed for your business, and are covered by Lifetime TrueCare. {{claim:free-terminal}}",
  blocks: [
    {
      type: "table",
      heading: "Countertop or wireless: which do I need?",
      caption: "Terminals in TruePay's current lineup",
      columns: ["Model", "Type", "A good fit for"],
      rows: [
        ["Valor VL100", "Countertop", "A single register with a steady line of customers"],
        ["Valor VL110", "Countertop", "Counter checkout where customers handle the card themselves"],
        ["Valor VL500", "Wireless, handheld", "Pay-at-table, curbside and walking the floor"],
        ["Dejavoo QD4", "Wireless, handheld", "Mobile checkout with a touchscreen"],
        ["Clover Flex", "Wireless, handheld", "Businesses on Clover, or anyone wanting a handheld with apps"],
      ],
      note: confirmNote,
    },
    {
      type: "qa",
      items: [
        { q: "Is a terminal included?", a: ["{{claim:free-terminal}} [How Membership works →](/pricing/membership/)"] },
        {
          q: "What's covered if it breaks?",
          a: ["{{claim:truecare}} Call us and we'll get you running again. [Read the fine print →](/why-truepay/)"],
        },
        {
          q: "Which payment types does it take?",
          a: [
            "Our terminals take chip cards, contactless tap cards and phone wallets like Apple Pay and Google Pay, plus magnetic-stripe swipes when needed. Chip and tap transactions are more secure than swipes, which is why they're the default.",
          ],
        },
      ],
    },
    {
      type: "prose",
      heading: "Taking payments away from the counter?",
      paras: ["Wireless terminals and phone apps let you take payment on the floor, curbside or on a job site. [See mobile payment options →](/solutions/mobile-payments/)"],
    },
  ],
};

export const mobile: PageContent = {
  path: "/solutions/mobile-payments/",
  eyebrow: "Solutions · Mobile payments",
  answer:
    "Mobile payments let you take a card wherever the work happens: a job site, a curb, a farmers market or a customer's kitchen. TruePay offers wireless handheld terminals and phone apps, and we'll help you plan for spots with weak cell service so you can still get paid.",
  blocks: [
    {
      type: "qa",
      items: [
        {
          q: "Do I need a separate card reader?",
          a: [
            "Not always. A wireless handheld terminal like the Valor VL500 or Clover Flex is an all-in-one device: it takes the card and prints or sends the receipt. Phone apps such as the Valor Pay app can work with a small reader. We'll suggest the right fit for how often and where you take payments. [Compare terminals →](/solutions/terminals/)",
          ],
        },
        {
          q: "What happens without cell service?",
          a: [
            "Wireless terminals use cellular data or Wi-Fi. In a dead zone, the simplest fix is to step to a spot with signal or connect to the customer's Wi-Fi. Some devices can store a transaction and send it later, which carries some risk if the card is declined. We'll go over the options for your service area.",
          ],
        },
        {
          q: "How do customers get a receipt?",
          a: ["Handheld terminals can print a paper receipt. Phone apps and many terminals can text or email one instead."],
        },
      ],
    },
    {
      type: "cards",
      heading: "Who uses mobile payments",
      columns: 3,
      cards: [
        { title: "Home service pros", text: "HVAC, plumbing, electrical and cleaning crews.", href: "/industries/home-services/", linkText: "Home services" },
        { title: "Restaurants", text: "Pay-at-table and curbside pickup.", href: "/industries/restaurants/", linkText: "Restaurants" },
        { title: "Events and markets", text: "Pop-ups, festivals and markets where there's no counter at all." },
      ],
    },
    { type: "qa", items: [supportQ] },
  ],
};

export const online: PageContent = {
  path: "/solutions/online-payments/",
  eyebrow: "Solutions · Online payments",
  answer:
    "To take payments on your website you need a payment gateway, the secure connection between your checkout and your processor. TruePay sets up gateways such as Authorize.net and eProcessing Network, connects them to your site or shopping cart, and helps with reporting and QuickBooks reconciliation.",
  blocks: [
    {
      type: "qa",
      items: [
        {
          q: "Will it work with my website?",
          a: [
            "Most website platforms and shopping carts connect to Authorize.net, and many connect to eProcessing Network. Tell us what your site runs on and we'll confirm before you sign. If you don't have a cart, a hosted payment page or emailed payment link can work instead.",
          ],
        },
        { q: "Who handles setup?", a: ["We set up your gateway account, connect it to your TruePay processing and help your web developer with the connection settings."] },
        {
          q: "What does it cost?",
          a: [
            "Online card payments carry higher interchange than in-person payments because the card isn't present, and gateways usually have a small monthly fee. Your proposal shows every cost in writing. [How pricing works →](/pricing/)",
          ],
        },
      ],
    },
    {
      type: "prose",
      heading: "Sending invoices instead?",
      paras: ["If you bill customers rather than sell through a cart, invoicing software is usually the better fit. [See billing software →](/solutions/billing-software/)"],
    },
  ],
};

export const integrations: PageContent = {
  path: "/solutions/integrations/",
  eyebrow: "Solutions · Keep your POS",
  answer:
    "Often, yes. Many POS systems and business software tools can work with more than one processor, so you may be able to keep the system your team knows and change only who processes the payments. We check compatibility with your exact system and version before you commit.",
  blocks: [
    {
      type: "qa",
      items: [
        {
          q: "Can TruePay work with my current POS?",
          a: [
            "It depends on the system. Some POS companies let you choose your processor; others only work with their own. Tell us what you use, including the version and the card reader, and we'll give you a straight answer, even if it's no.",
          ],
        },
        {
          q: "How do you confirm compatibility?",
          a: [
            "We ask for your POS name and version, the card terminal or reader you use and any add-ons that touch payments, such as online ordering or gift cards. We confirm with the POS provider and our processing partners, then tell you what changes and what stays the same.",
          ],
        },
        {
          q: "What changes for my staff?",
          a: ["Usually very little. Your team keeps ringing up sales the same way. The changes show up in your statement and your costs. If the system needs a new card reader, we set it up and show your staff how it works."],
        },
      ],
    },
    {
      type: "prose",
      heading: "Thinking about switching?",
      paras: ["Before you make a move, read [how to switch payment processors safely](/resources/how-to-switch-payment-processors/). If your POS can't work with us, we'll show you [POS options](/solutions/point-of-sale/) that can."],
    },
  ],
};

export const billing: PageContent = {
  path: "/solutions/billing-software/",
  eyebrow: "Solutions · Billing software",
  answer:
    "If you bill customers rather than ring them up, billing software lets you send invoices, collect card and bank payments online and set up recurring billing. TruePay works with tools like Biller Genie and MantaPay that connect to QuickBooks, so payments are recorded without retyping.",
  blocks: [
    {
      type: "steps",
      heading: "How invoice-to-payment works",
      steps: [
        { title: "Create the invoice", text: "In QuickBooks or the billing tool, as you do today." },
        { title: "Customer gets a pay link", text: "Your customer gets a secure link to pay by card or bank transfer." },
        { title: "Payment is applied", text: "The payment is matched to the invoice and synced back to your books." },
        { title: "Reminders go out automatically", text: "Unpaid invoices get friendly reminders, so you chase less." },
      ],
    },
    {
      type: "qa",
      items: [
        { q: "Does it work with QuickBooks?", a: ["Yes. Both tools connect with QuickBooks. Tell us which edition you use, Online or Desktop, and we'll confirm the right setup."] },
        { q: "Can I bill customers on a schedule?", a: ["Yes. Recurring billing lets you charge the same amount on a schedule, such as monthly retainers or service plans, with the customer's permission."] },
        { q: "What does it cost?", a: ["The software has its own subscription cost and card payments are processed at your TruePay rates. We'll put both in writing. [How pricing works →](/pricing/)"] },
      ],
    },
    {
      type: "cards",
      heading: "Popular with",
      columns: 2,
      cards: [
        { title: "Professional services", text: "Accountants, law firms, agencies and consultants.", href: "/industries/professional-services/", linkText: "Professional services" },
        { title: "Home service pros", text: "Service plans and invoices for completed jobs.", href: "/industries/home-services/", linkText: "Home services" },
      ],
    },
    { type: "prose", heading: "Selling online too?", paras: ["Pair billing with a website checkout. [See online payments →](/solutions/online-payments/)"] },
  ],
};
