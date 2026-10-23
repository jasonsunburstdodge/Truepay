import type { PageContent } from "./types";

export const industriesHub: PageContent = {
  path: "/industries/",
  eyebrow: "Industries",
  answer:
    "TruePay works with restaurants and bars, retail stores, salons and spas, medical and dental offices, home service pros, auto shops, professional firms and nonprofits. Each takes payments differently, so we set up the equipment and pricing that fit how your business actually runs.",
  blocks: [
    {
      type: "cards",
      heading: "Does TruePay work with businesses like mine?",
      intro: "Pick your industry to see how payments usually work there and what we'd recommend. Don't see yours? [Talk to us](/contact/).",
      columns: 4,
      cards: [
        { title: "Restaurants & bars", text: "Tips, split checks, pay-at-table and a busy Friday night.", href: "/industries/restaurants/", linkText: "Restaurants" },
        { title: "Retail", text: "Fast counter checkout and online sales in one place.", href: "/industries/retail/", linkText: "Retail" },
        { title: "Salons & spas", text: "Tips, deposits and appointment payments.", href: "/industries/salons-spas/", linkText: "Salons & spas" },
        { title: "Medical & dental", text: "Front-desk checkout, payment plans and online bill pay.", href: "/industries/medical-dental/", linkText: "Medical & dental" },
        { title: "Home services", text: "Payment on the job site and invoices from the truck.", href: "/industries/home-services/", linkText: "Home services" },
        { title: "Auto services", text: "Large repair tickets at the service counter.", href: "/industries/auto-services/", linkText: "Auto services" },
        { title: "Professional services", text: "Invoices, retainers and QuickBooks sync.", href: "/industries/professional-services/", linkText: "Professional services" },
        { title: "Nonprofits", text: "Donations online, at events and every month.", href: "/industries/nonprofits/", linkText: "Nonprofits" },
      ],
    },
    { type: "prose", heading: "Not sure what you need?", paras: ["Start with what you're paying now. A [free statement review](/statement-review/) shows your real rate and the setup we'd recommend."] },
  ],
};

export const restaurants: PageContent = {
  path: "/industries/restaurants/",
  eyebrow: "Industries · Restaurants & bars",
  answer:
    "Restaurants need payments that handle tips, split checks and a full dining room without slowing down service. TruePay sets up restaurant POS systems and pay-at-table handhelds, programs tip handling, and offers dual pricing, which many restaurants use to offset card costs on thin margins.",
  blocks: [
    {
      type: "qa",
      items: [
        {
          q: "How do restaurants handle tips on card payments?",
          a: [
            "Most full-service restaurants authorize the check total first, then the server adds the tip and adjusts the amount before the batch closes. Counter-service spots usually prompt for a tip on the terminal screen instead. We program whichever fits your service style and show your staff how to close out tips at the end of a shift.",
          ],
        },
        {
          q: "Can my servers take payment at the table?",
          a: [
            "Yes. Handhelds like SkyTab Mobile, Clover Flex or the Valor VL500 let servers take payment at the table, so the card never leaves the guest's sight and tables turn faster. [See POS options →](/solutions/point-of-sale/)",
          ],
        },
        {
          q: "Does dual pricing work for restaurants?",
          a: [
            "Often, yes. Restaurants run on thin margins and many still take a fair amount of cash. With dual pricing, your menu shows a cash price and a card price, and card-paying guests cover most of the card cost. It isn't for every restaurant. If your guests are very price-sensitive or nearly all pay by card, [Membership](/pricing/membership/) may suit you better. [Is dual pricing right for you? →](/pricing/dual-pricing/)",
          ],
        },
        {
          q: "What happens if my POS goes down during a rush?",
          a: ["Call {{phone}}. A real person picks up and works the problem with you, and covered equipment is repaired or replaced under Lifetime TrueCare. We'll also set you up with a backup plan for taking cards if the network drops."],
        },
      ],
    },
    {
      type: "cards",
      heading: "A typical restaurant setup",
      columns: 3,
      cards: [
        { title: "Countertop POS", text: "SkyTab Glass or a Clover station at the host stand or bar." },
        { title: "Handhelds", text: "Pay-at-table devices for servers on the floor." },
        { title: "Online ordering", text: "Online orders flowing into the same system, where your POS supports it." },
      ],
    },
  ],
};

export const retail: PageContent = {
  path: "/industries/retail/",
  eyebrow: "Industries · Retail",
  answer:
    "Retail stores need fast checkout at the counter, clean inventory and, increasingly, online sales that match what's on the shelf. TruePay sets up countertop terminals or a full retail POS, connects online payments where you sell on the web, and prices it so you can see every cost.",
  blocks: [
    {
      type: "qa",
      items: [
        {
          q: "What's the best way to take payments in a retail store?",
          a: [
            "If you only need to take cards, a countertop terminal at the register is simple and low cost. If you also want inventory tracking, product lookups and sales reports, a retail POS such as Clover is worth it. [Compare POS systems →](/solutions/point-of-sale/)",
          ],
        },
        {
          q: "Can my in-store and online sales run through one system?",
          a: ["In many cases, yes. Some POS systems include an online store, and others connect to your existing site through a payment gateway. One processor for both makes your statements and reconciliation simpler. [Online payments →](/solutions/online-payments/)"],
        },
        {
          q: "Should a retail store use dual pricing?",
          a: [
            "It depends on your margins and customers. Stores with tight margins and plenty of cash sales can save a lot. Boutiques where shoppers compare prices online, or stores that are mostly card, often do better with [Membership](/pricing/membership/). We'll run your numbers both ways. [How dual pricing works →](/pricing/dual-pricing/)",
          ],
        },
        {
          q: "What equipment does a small shop need?",
          a: ["Usually one countertop terminal that takes chip, tap and phone wallets, and a receipt printer if your terminal doesn't have one. Add a POS when you want inventory and reporting. [Compare terminals →](/solutions/terminals/)"],
        },
      ],
    },
  ],
};

export const salons: PageContent = {
  path: "/industries/salons-spas/",
  eyebrow: "Industries · Salons & spas",
  answer:
    "Salons, barbershops and spas need payments that handle tips easily, take deposits for bookings and feel smooth for clients at the front desk. TruePay sets up terminals or POS systems that prompt for tips, helps you take deposits, and offers pricing your clients will understand.",
  blocks: [
    {
      type: "qa",
      items: [
        {
          q: "How do salons handle tips on card payments?",
          a: ["The terminal asks the client to add a tip before they pay, with preset percentage buttons or a custom amount. The tip is recorded with the sale, which makes paying out stylists at the end of the day simpler."],
        },
        {
          q: "Can I take deposits to cut down on no-shows?",
          a: [
            "Many booking systems can take a card deposit when a client books, and some can charge a no-show fee under a policy the client agrees to. We'll help you connect payments to your booking tool if it supports it, or take deposits by payment link if it doesn't. Post your deposit and cancellation policy clearly.",
          ],
        },
        {
          q: "Will clients accept dual pricing at a salon?",
          a: [
            "Some salons use it successfully, especially where many clients pay cash. Others find that a visible card price feels awkward for regular clients. If you'd rather keep one price, [Membership](/pricing/membership/) keeps your costs transparent. [How dual pricing works →](/pricing/dual-pricing/)",
          ],
        },
        { q: "What equipment does a salon need?", a: ["Most salons need one countertop terminal at the front desk that takes chip, tap and phone wallets, with tip prompts. [Compare terminals →](/solutions/terminals/)"] },
      ],
    },
  ],
};

export const medical: PageContent = {
  path: "/industries/medical-dental/",
  eyebrow: "Industries · Medical & dental",
  answer:
    "Medical and dental practices take payments at the front desk, by phone and online, often against balances after insurance. TruePay sets up front-desk terminals, online bill pay and recurring payments for payment plans, with costs your office manager can read and explain.",
  blocks: [
    {
      type: "qa",
      items: [
        {
          q: "How do medical and dental offices take patient payments?",
          a: ["Most collect co-pays and balances at the front desk with a countertop terminal, and send statements for what's owed after insurance. Many also take card payments over the phone, which costs more than in-person payments because the card isn't present."],
        },
        {
          q: "Can patients pay their bills online?",
          a: ["Yes. A secure payment page or emailed payment link lets patients pay a balance from home, which usually gets bills paid faster. [Billing software →](/solutions/billing-software/)"],
        },
        {
          q: "Can we set up payment plans?",
          a: ["Yes. With the patient's written permission, recurring billing can charge an agreed amount on a schedule until a balance is paid. Your practice sets the terms; we set up the payments."],
        },
        {
          q: "Is dual pricing a good idea for a medical practice?",
          a: [
            "Usually not our first recommendation. Patients often can't choose when they need care, and healthcare payment rules vary. Most practices are better served by transparent, low-cost [Membership](/pricing/membership/) pricing. We'll walk through the options with you.",
          ],
        },
      ],
    },
    {
      type: "callout",
      text: "TruePay processes card payments; it doesn't handle patient health records. Keep diagnosis and treatment details out of payment notes and invoices.",
    },
  ],
};

export const homeServices: PageContent = {
  path: "/industries/home-services/",
  eyebrow: "Industries · Home services",
  answer:
    "Home service pros get paid fastest when they take payment on the job, the moment the work is done. TruePay sets up wireless terminals and phone apps for HVAC, plumbing, electrical, cleaning and other crews, plus invoicing for jobs you bill later.",
  blocks: [
    {
      type: "qa",
      items: [
        {
          q: "How do I take payment on a job site?",
          a: ["With a wireless handheld terminal or a phone app and reader. Your tech walks the customer through the invoice, takes a chip or tap payment and sends the receipt by text or email. [Mobile payment options →](/solutions/mobile-payments/)"],
        },
        {
          q: "What if there's no cell signal at the job?",
          a: ["Connect the terminal to the customer's Wi-Fi, or step outside to a spot with signal. Some devices can store a payment and send it once they reconnect, though that carries a risk of a later decline. We'll help you choose the setup that fits your area."],
        },
        {
          q: "Can I send an invoice from the truck?",
          a: ["Yes. Billing tools let you text or email an invoice with a pay link on the spot, and send reminders if it isn't paid. [Billing software →](/solutions/billing-software/)"],
        },
        {
          q: "Does dual pricing work for contractors?",
          a: [
            "It can, especially on larger jobs where card fees add up and some customers pay by check. Quote both prices up front so there are no surprises at the end of the job. [How dual pricing works →](/pricing/dual-pricing/)",
          ],
        },
      ],
    },
  ],
};

export const auto: PageContent = {
  path: "/industries/auto-services/",
  eyebrow: "Industries · Auto services",
  answer:
    "Auto repair and service shops take large card payments at the counter, often after a car has been in the bay for days. TruePay sets up counter terminals, works with shop software where it's compatible, and offers pricing that keeps big tickets from turning into big fees.",
  blocks: [
    {
      type: "qa",
      items: [
        {
          q: "What's the best way to take payments at an auto repair shop?",
          a: ["A countertop terminal at the service desk covers most shops. Add a wireless terminal if you want to take payment at the car or the curb. [Compare terminals →](/solutions/terminals/)"],
        },
        {
          q: "How do large repair bills affect processing costs?",
          a: [
            "Processing fees are mostly a percentage, so a $2,000 repair costs much more to process than a $40 oil change. The per-transaction fees matter less for shops; the percentage and the card mix matter more. That's why transparent cost-plus pricing or dual pricing can make a real difference. [How pricing works →](/pricing/)",
          ],
        },
        {
          q: "Should a repair shop use dual pricing?",
          a: ["Many shops do, because their tickets are large and customers are used to seeing itemized estimates. Show both prices on the estimate so the customer knows before work starts. [How dual pricing works →](/pricing/dual-pricing/)"],
        },
        {
          q: "Can my shop software work with TruePay?",
          a: ["Some shop management systems can work with more than one processor. Tell us what you use and we'll check before you commit. [Keep your system →](/solutions/integrations/)"],
        },
      ],
    },
  ],
};

export const professional: PageContent = {
  path: "/industries/professional-services/",
  eyebrow: "Industries · Professional services",
  answer:
    "Accountants, law firms, agencies and consultants mostly get paid by invoice, not at a register. TruePay sets up invoicing and online payments so clients can pay by card from a link, retainers can bill automatically, and payments sync with QuickBooks.",
  blocks: [
    {
      type: "qa",
      items: [
        {
          q: "How can clients pay my invoices by card?",
          a: ["Send invoices with a secure pay link. The client clicks, pays by card and the payment is recorded against the invoice. [Billing software →](/solutions/billing-software/)"],
        },
        {
          q: "Can clients pay by bank transfer instead?",
          a: ["Many billing tools offer bank transfer (ACH) payments, which usually cost less than cards for large invoices. Ask us which options fit your setup."],
        },
        {
          q: "Can I bill a retainer automatically each month?",
          a: ["Yes. With the client's written authorization, recurring billing charges the retainer on the same day each month and sends a receipt. Check any rules your profession has about client funds."],
        },
        {
          q: "Will payments sync with QuickBooks?",
          a: ["Yes, with the right billing tool. Payments are matched to invoices and synced, so your books stay current without retyping. Tell us whether you use QuickBooks Online or Desktop. Want a website checkout too? [Online payments →](/solutions/online-payments/)"],
        },
      ],
    },
  ],
};

export const nonprofits: PageContent = {
  path: "/industries/nonprofits/",
  eyebrow: "Industries · Nonprofits",
  answer:
    "Nonprofits need to accept donations online, at events and on a monthly schedule, while keeping processing costs low so more of each gift reaches the mission. TruePay sets up online donation payments, event terminals and recurring giving, with transparent pricing you can report to your board.",
  blocks: [
    {
      type: "qa",
      items: [
        {
          q: "How can our nonprofit accept donations by card?",
          a: ["Most organizations add a secure donation page to their website, connected through a payment gateway. Donors give by card, and you get the record you need for receipts. [Online payments →](/solutions/online-payments/)"],
        },
        { q: "Can donors give every month?", a: ["Yes. Recurring giving charges a donor's card on a schedule they choose. Monthly donors are often an organization's most reliable support."] },
        { q: "Can we take donations at events?", a: ["Yes. A wireless terminal or phone app lets volunteers take donations at galas, festivals and fundraisers. [Mobile payments →](/solutions/mobile-payments/)"] },
        {
          q: "Is dual pricing appropriate for a nonprofit?",
          a: ["For donations, generally no. Donors expect their gift amount to be the gift amount. Transparent cost-plus [Membership](/pricing/membership/) pricing is usually the better fit. Some donation tools let donors choose to cover the fee themselves."],
        },
      ],
    },
  ],
};
