import type { PageContent } from "./types";

export const home: PageContent = {
  path: "/",
  answer:
    "TruePay is a payment processing company in Josephine, Texas, that has helped business owners accept cards {{claim:founded-2011|since 2011}}. {{claim:rate-lock|We lock our rate}}, work {{claim:month-to-month|month to month with no long-term contract}}, and when you call, {{claim:us-support|a real person in the U.S. answers}}.",
  blocks: [
    {
      type: "cards",
      heading: "Sound familiar?",
      intro: "Most business owners don't come to us shopping for a processor. They come because something about the one they have stopped adding up.",
      columns: 4,
      cards: [
        { title: "Your fees crept up", text: "Same sales, bigger bill, and nobody called to tell you why. [Why that happens →](/resources/why-credit-card-processing-fees-go-up/)" },
        { title: "Your statement is a riddle", text: "Pages of codes and fees with names nobody can explain. [How to read it →](/resources/how-to-read-your-processing-statement/)" },
        { title: "You're locked in", text: "A three-year contract and a cancellation fee you found out about later." },
        { title: "Nobody picks up", text: "The rep who signed you up is gone and support is a phone tree." },
      ],
    },
    {
      type: "cards",
      heading: "What we promise, in plain terms",
      intro: "We call it doing business on a handshake. Each promise below comes with the fine print, so you know exactly what it covers. [Read the fine print →](/why-truepay/#fine-print)",
      columns: 3,
      cards: [
        { title: "A rate that stays put", text: "{{claim:rate-lock}}", href: "/why-truepay/#rate-lock", linkText: "What the rate lock covers" },
        { title: "No long-term contract", text: "{{claim:month-to-month}}", href: "/why-truepay/#month-to-month", linkText: "How month-to-month works" },
        { title: "People you can reach", text: "{{claim:us-support}}", href: "/about/team/", linkText: "Meet the team" },
      ],
    },
    {
      type: "qa",
      items: [
        {
          q: "Who is TruePay and who is it for?",
          a: [
            "TruePay is a merchant services company founded by Jon Wilson in 2011 and based in Josephine, Texas. We set up and support card processing for restaurants, shops, salons, service businesses and other independent businesses across the country.",
            "We're a good fit for owners who want to understand what they pay and want a person to call. We're not trying to be the cheapest app for a once-a-month craft fair seller. [See why business owners switch →](/why-truepay/)",
          ],
        },
        {
          q: "What happens in a free statement review?",
          a: [
            "You send us your latest processing statement. We go through it line by line, show you your real effective rate and where the money goes, and compare it with what you would pay with TruePay.",
            "{{claim:honest-recommendation}} [Request a review →](/statement-review/)",
          ],
        },
        {
          q: "Will my rate go up after I sign?",
          a: [
            "Not our part of it. {{claim:rate-lock}} Visa, Mastercard and the other networks do adjust their own interchange rates from time to time, for every processor. Those pass through at cost and show up on your statement, so you can always see which is which. [How fees go up →](/resources/why-credit-card-processing-fees-go-up/)",
          ],
        },
        {
          q: "Who do I call when something breaks?",
          a: ["Us. Call {{phone}} and a member of our support team picks up. No call center, no ticket queue. You'll also know who's who before you need them: [meet the team](/about/team/)."],
        },
      ],
    },
    {
      type: "cards",
      heading: "Two ways to price your processing",
      intro: "There's no single best pricing for every business. We'll help you pick the one that fits how you sell. [See how pricing works →](/pricing/)",
      columns: 2,
      cards: [
        {
          title: "Membership",
          text: "{{claim:cost-plus}} Best when you want a low, straightforward cost and don't want to change prices at the register.",
          href: "/pricing/membership/",
          linkText: "How Membership works",
        },
        {
          title: "Dual pricing",
          text: "You post a cash price and a card price. {{claim:dual-pricing-cost}} Best for businesses with tight margins and plenty of cash or check customers.",
          href: "/pricing/dual-pricing/",
          linkText: "Is dual pricing right for you?",
        },
      ],
    },
    {
      type: "fit",
      heading: "Is dual pricing right for your business?",
      intro: "It's one of the most-asked questions we get. Here's the honest version.",
      good: [
        { title: "Processing fees are one of your biggest monthly costs", text: "Every dollar of margin matters and the fee line keeps growing." },
        { title: "You take cash and cards (checks and ACH count too)", text: "Dual pricing needs a real non-card option for customers." },
        { title: "You run a restaurant, shop or service business on tight margins", text: "These are the businesses where it tends to make the biggest difference." },
      ],
      notFit: [
        { title: "Your business is cashless by design", text: "Without a cash option, dual pricing doesn't work. Membership fits better." },
        { title: "You sell mostly online or by subscription", text: "A different TruePay setup will serve you better." },
        { title: "Your customers are very price-sensitive at the register", text: "A visible card price can cost you sales. We'll talk it through first." },
      ],
      closing: "Not sure which side you're on? {{claim:honest-recommendation}} [Learn more about dual pricing →](/pricing/dual-pricing/)",
    },
    {
      type: "cards",
      heading: "However you take payments, there's a setup that fits",
      intro: "Countertop, table-side, on the job site or online. We set it up and stay on call afterward. [Browse all solutions →](/solutions/)",
      columns: 4,
      cards: [
        { title: "Terminals", text: "Countertop and wireless card machines for chip, tap and phone wallets.", href: "/solutions/terminals/", linkText: "Compare terminals" },
        { title: "Point of sale", text: "Full POS systems for restaurants and retail, configured for how you run.", href: "/solutions/point-of-sale/", linkText: "See POS options" },
        { title: "Keep your POS", text: "Happy with your system? In many cases we can process for it.", href: "/solutions/integrations/", linkText: "Check compatibility" },
        { title: "Online and invoicing", text: "Website checkout, invoices and recurring billing that sync with your books.", href: "/solutions/online-payments/", linkText: "Online payments" },
      ],
    },
    {
      type: "cards",
      heading: "Built around how your business runs",
      intro: "A pizza place on a Friday night and a dental office on a Tuesday morning don't take payments the same way. [See all industries →](/industries/)",
      columns: 4,
      cards: [
        { title: "Restaurants & bars", text: "Tips, split checks and a busy Friday night.", href: "/industries/restaurants/", linkText: "Restaurants" },
        { title: "Retail", text: "Fast checkout, in store and online.", href: "/industries/retail/", linkText: "Retail" },
        { title: "Home services", text: "Get paid before the truck leaves.", href: "/industries/home-services/", linkText: "Home services" },
        { title: "Salons & spas", text: "Tips, deposits and bookings.", href: "/industries/salons-spas/", linkText: "Salons & spas" },
      ],
    },
    {
      type: "prose",
      heading: "What's your real processing rate?",
      paras: [
        "Your effective rate is your total processing fees divided by your total card sales for the same month. It's the one number that tells you what processing actually costs, whatever your statement calls it. Try it with the totals from your last statement, or use the [full calculator with explanations](/effective-rate-calculator/).",
      ],
    },
    { type: "calculator" },
    {
      type: "quotes",
      heading: "What business owners say",
      intro: "In their own words, from reviews they've left us. [Read more customer stories →](/customer-stories/)",
      ids: ["r-moore", "e-springfield", "a-monroe", "b-slavens"],
    },
    {
      type: "people",
      heading: "The people you'll actually talk to",
      intro: "TruePay is a Texas team, and we'd rather you know our names. [Meet everyone →](/about/team/)",
      slugs: ["jon-wilson", "shane-spears", "mandie-spears"],
    },
    {
      type: "prose",
      heading: "Rooted in Texas, serving businesses nationwide",
      paras: ["{{claim:coverage}} Most of our merchants are in Texas and Oklahoma, and we work with businesses from coast to coast. [See where we serve →](/service-areas/)"],
    },
    {
      type: "leadForm",
      formType: "statement-review",
      heading: "Get your free statement review",
      text: "Tell us how to reach you and we'll set up your review. We'll explain every fee, show your effective rate and give you a straight recommendation. No cost and no obligation.",
    },
  ],
};

export const whyTruepay: PageContent = {
  path: "/why-truepay/",
  eyebrow: "Why TruePay",
  answer:
    "TruePay was built to be the processor business owners wish they'd had from the start. {{claim:rate-lock|We lock our rate}}, work {{claim:month-to-month|month to month}}, cover your equipment and answer the phone. Below is each promise with the fine print: what it covers and what it doesn't.",
  blocks: [
    {
      type: "prose",
      heading: "Most processors are built to make money off you",
      paras: [
        "The card processing industry has a reputation problem, and it earned it. Teaser rates that creep up a few basis points at a time. New monthly fees with official-sounding names. Three-year contracts with cancellation fees. Sales reps who disappear the day after you sign.",
        "Jon Wilson started TruePay in 2011 to do the opposite: earn your business every month, with pricing you can read and people you can reach. [Read our story →](/about/)",
      ],
    },
    {
      type: "commitments",
      heading: "Our promises, and the fine print",
      id: "fine-print",
      intro: "A promise is only as good as its terms. Here's what each one means in practice.",
      items: [
        {
          claim: "rate-lock",
          title: "A rate that stays put",
          covers: "TruePay's markup and our monthly account fees for as long as you process with us.",
          doesNot:
            "Interchange and network fees. Visa, Mastercard, Discover and Amex set those for every processor and adjust them from time to time. We pass them through at cost, itemized, so you can see which is which. [Why fees go up →](/resources/why-credit-card-processing-fees-go-up/)",
        },
        {
          claim: "month-to-month",
          title: "Month-to-month service",
          covers: "You can leave when you want. We'd rather earn your business every month than lock it up.",
          doesNot: "Equipment you've agreed to buy, or anything you've signed with another provider. We'll tell you exactly what applies before you sign.",
        },
        {
          claim: "truecare",
          title: "Lifetime TrueCare equipment coverage",
          covers: "Repair or replacement of covered equipment that fails while you're a customer, so a broken terminal doesn't stop your sales.",
          doesNot: "We'll give you the written coverage terms with your agreement, including what counts as covered damage.",
        },
        {
          claim: "free-terminal",
          title: "Terminal included with Membership",
          covers: "A terminal that fits your business, programmed and ready when it arrives. [Compare terminals →](/solutions/terminals/)",
          doesNot: "Every model in every situation. We'll confirm which equipment is included for your setup before you sign.",
        },
        {
          claim: "no-hidden-fees",
          title: "Every fee explained",
          covers: "Your agreement lists every fee, and we'll walk you through your statement whenever you ask.",
          doesNot: "Interchange categories you can't control, though we'll explain those too. [How to read your statement →](/resources/how-to-read-your-processing-statement/)",
        },
        {
          claim: "us-support",
          title: "People you can reach",
          covers: "Our own US-based team answers support calls. You'll know their names.",
          doesNot: "A ticket queue or an overseas call center. We don't use them. [Meet the team →](/about/team/)",
        },
      ],
    },
    {
      type: "qa",
      heading: "Questions about the fine print",
      items: [
        {
          q: "What exactly does the rate lock cover?",
          a: ["The rate lock covers the part of your processing cost that TruePay controls: our markup and our monthly fees. It doesn't cover interchange and network fees, which the card networks set for every processor. Those show up on your statement at cost, separate from ours, so if your bill changes you can see exactly why."],
        },
        {
          q: "Can I leave anytime, and is there a cancellation fee?",
          a: ["Yes, service is month to month. Before you sign we'll go over anything that applies when you leave, such as returning equipment, so there are no surprises."],
        },
        {
          q: "What does Lifetime TrueCare cover?",
          a: ["TrueCare covers repair or replacement of covered TruePay equipment for as long as you're a customer. Your agreement includes the written terms."],
        },
        {
          q: "Who is TruePay not a good fit for?",
          a: [
            "If you sell a few hundred dollars a month at weekend markets, a simple flat-rate app is probably the easier choice, and we'll tell you so. And if you love your current processor, your rate is fair and they pick up the phone, stay put. We'd rather tell you that than sell you something you don't need.",
          ],
        },
      ],
    },
    {
      type: "quotes",
      heading: "Don't take our word for it",
      ids: ["e-springfield", "a-monroe"],
      intro: "What business owners say about working with us. [Read more customer stories →](/customer-stories/)",
    },
    {
      type: "prose",
      heading: "See it for yourself",
      paras: ["The quickest way to know whether we can help is a free statement review. If our Membership pricing fits you better, we'll show you how it works. [How Membership works →](/pricing/membership/)"],
    },
  ],
};

export const statementReview: PageContent = {
  path: "/statement-review/",
  eyebrow: "Free statement review",
  answer:
    "Send us one recent processing statement and we'll explain every fee on it, calculate your real effective rate, show what you'd pay with TruePay side by side, and tell you honestly whether switching makes sense. It's free, and there's no obligation.",
  blocks: [
    {
      type: "cards",
      heading: "What you'll get",
      columns: 4,
      cards: [
        { title: "Every line explained", text: "Interchange, network fees, markup and monthly fees, in plain English." },
        { title: "Your real rate", text: "Total fees divided by card sales: the number that matters. [What's an effective rate?](/effective-rate-calculator/)" },
        { title: "A side-by-side comparison", text: "Your current costs next to what you'd pay with TruePay, using your own numbers." },
        { title: "A straight recommendation", text: "{{claim:honest-recommendation}}" },
      ],
    },
    {
      type: "steps",
      heading: "How it works",
      steps: [
        { title: "Send your statement", text: "Fill out the form below. We'll contact you with the simplest secure way to share your most recent statement." },
        { title: "We break it down", text: "We find what you're paying, where the markup is and which fees you can question." },
        { title: "We show you the options", text: "We model your numbers under traditional and dual pricing, so you can compare." },
        { title: "You decide, no pressure", text: "If TruePay is the right fit, great. If not, you'll still understand your statement better than before." },
      ],
    },
    {
      type: "qa",
      heading: "Questions about the review",
      items: [
        {
          q: "What do I get from a statement review?",
          a: ["A line-by-line explanation of your statement, your effective rate, a side-by-side comparison with TruePay pricing and an honest recommendation. Want a head start? Read [how to read your processing statement](/resources/how-to-read-your-processing-statement/)."],
        },
        {
          q: "How do I send my statement, and who sees it?",
          a: [
            "Submit the form and a member of our team will reach out with a secure way to send it. We use your statement only to prepare your review. We never need your customers' card numbers or your banking passwords. You can black out your account number before sending. [Meet the team →](/about/team/)",
          ],
        },
        { q: "How long does it take?", a: ["{{claim:review-turnaround|Most reviews are ready within a few business days of receiving your statement.}} We'll confirm timing when we reach out."] },
        { q: "Is there any cost or obligation?", a: ["No. The review is free and you're under no obligation to switch."] },
      ],
    },
    { type: "quotes", heading: "One customer's experience", ids: ["m-holt"] },
    {
      type: "leadForm",
      formType: "statement-review",
      heading: "Request your free review",
      text: "Tell us how to reach you. A person from our Texas team will follow up to collect your statement securely. Prefer to estimate first? Try the [effective rate calculator](/effective-rate-calculator/) or compare [pricing models](/pricing/).",
    },
  ],
};

export const calculator: PageContent = {
  path: "/effective-rate-calculator/",
  eyebrow: "Calculator",
  heroCtas: false,
  answer:
    "Your effective rate is your total processing fees divided by your total card sales for the same month, times 100. It's the one number that shows what card processing really costs you, no matter how your processor quotes its rates. Enter two totals from your statement below.",
  blocks: [
    { type: "calculator" },
    {
      type: "prose",
      heading: "How the math works",
      paras: [
        "**Effective rate = total fees ÷ total card sales × 100.** For example, if you ran $25,000 in card sales last month and paid $787.50 in total processing fees, your effective rate is $787.50 ÷ $25,000 × 100 = 3.15%.",
        "Use numbers from the same statement period. Mixing one month's sales with another month's fees will give you a misleading answer.",
      ],
    },
    {
      type: "qa",
      items: [
        {
          q: "What is an effective rate?",
          a: [
            "It's the percentage of your card sales that goes to processing once every fee is counted: interchange, network fees, your processor's markup and monthly charges. Quoted rates often leave some of those out, which is why the effective rate is the fairest way to compare processors.",
          ],
        },
        {
          q: "Which fees should I include?",
          a: [
            "All of them. Add up every fee on the statement: discount or processing fees, interchange, assessments, transaction or authorization fees, monthly and statement fees, PCI fees, batch fees and equipment rental. If a fee was charged to your account that month, it counts. Not sure what's what? See [how to read your processing statement](/resources/how-to-read-your-processing-statement/).",
          ],
        },
        {
          q: "Why is my effective rate higher than the rate I was quoted?",
          a: [
            "Usually because the quoted rate covered only one part of the cost. Tiered plans move many cards into higher-priced tiers. Per-transaction fees, monthly fees and rate increases add up over time. [Why processing fees go up →](/resources/why-credit-card-processing-fees-go-up/)",
          ],
        },
        {
          q: "What is a typical effective rate?",
          a: [
            "It depends on your business. Card-present businesses with larger tickets usually land lower than online or keyed-in businesses with small tickets, and rewards cards cost more to accept than basic debit cards. Rather than compare yourself to a general number, compare what your current processor charges with what another would charge for the same card mix. That's exactly what a [free statement review](/statement-review/) does.",
          ],
        },
      ],
    },
  ],
};

export const support: PageContent = {
  path: "/support/",
  eyebrow: "Merchant support",
  heroCtas: false,
  answer: "Already a TruePay merchant? Call {{phone}} and a real person on our US-based support team will help with your terminal, deposits, statement or account. {{claim:us-support}}",
  blocks: [
    { type: "contactCard" },
    {
      type: "qa",
      items: [
        { q: "How do I reach support?", a: ["Call {{phone}} or email support@gotruepay.com. For anything urgent, like a terminal that won't run cards, call."] },
        {
          q: "What hours is support available?",
          a: ["Call any time you need help and we'll get you to the right person. If you reach voicemail after hours, leave your business name and number and we'll call you back."],
        },
        {
          q: "What should I have ready?",
          a: [
            "Have your business name and the phone number on the account handy. For equipment problems, note the terminal or POS model and any error message on the screen. For deposit questions, have the date and amount you expected.",
          ],
        },
        { q: "Where do I log in to my account?", a: ["Call us and we'll send you the right login link for your account and reporting tools."] },
      ],
    },
    {
      type: "list",
      heading: "Quick checks for a terminal that won't connect",
      items: [
        "Check the power and the cable or Wi-Fi connection.",
        "Restart the terminal: hold the power button until it turns off, wait ten seconds, then turn it on.",
        "If it still won't connect, call us and keep the terminal nearby.",
      ],
    },
    { type: "people", heading: "Your support team", slugs: ["mandie-spears", "shane-spears"] },
  ],
};

export const contact: PageContent = {
  path: "/contact/",
  eyebrow: "Contact",
  heroCtas: false,
  answer:
    "Call TruePay at {{phone}}, email support@gotruepay.com or send the form below. A person from our team in Josephine, Texas, will get back to you. If you're an existing merchant who needs help now, [go to support](/support/).",
  blocks: [
    { type: "contactCard" },
    {
      type: "qa",
      items: [
        {
          q: "Who will I talk to?",
          a: ["A member of our Texas team, not a call center. New-business questions go to our sales team, led by people who'll tell you honestly whether TruePay fits. Existing merchants should [contact support](/support/)."],
        },
        { q: "What happens after I submit?", a: ["{{claim:follow-up-time}} If you asked about your costs, we'll set up a [free statement review](/statement-review/)."] },
        { q: "Where is TruePay located?", a: ["Our head office is at 200 Monarch Ln, Josephine, TX 75173. {{claim:office-hours}}"] },
      ],
    },
    { type: "leadForm", formType: "contact", id: "contact-form", heading: "Send us a note", text: "Tell us a little about your business and what you need. We'll reply by phone or email." },
  ],
};

export const thankYou: PageContent = {
  path: "/thank-you/",
  heroCtas: false,
  answer: "Your request reached our team. {{claim:follow-up-time}} If it's urgent, call {{phone}}.",
  blocks: [
    {
      type: "list",
      heading: "While you wait",
      items: [
        "Find your most recent processing statement. We'll ask for it if you requested a review.",
        "Read [how to read your processing statement](/resources/how-to-read-your-processing-statement/).",
        "Browse our [resources](/resources/) for straight answers on pricing and switching.",
      ],
    },
  ],
};
