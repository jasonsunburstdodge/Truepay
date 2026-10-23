import type { PageContent } from "./types";

export const about: PageContent = {
  path: "/about/",
  eyebrow: "About TruePay",
  answer:
    "TruePay is a payment processing company founded in 2011 by Jon Wilson and based in Josephine, Texas. It's run by the same people merchants talk to, on what we call the handshake principle: transparent pricing, a rate that doesn't creep and real people who stay involved after you sign.",
  blocks: [
    {
      type: "prose",
      heading: "Why was TruePay started?",
      paras: [
        "TruePay wasn't born out of a business plan. It was born out of a problem.",
        "Jon Wilson watched too many good business owners get taken advantage of by an industry built to confuse them: hidden fees, rate increases buried in fine print and processors who disappeared after the sale. He believed there was a better way to do this work. So in 2011, he built one.",
        "From day one the promise was simple: transparent pricing, no rate increases from us, and real people you can actually reach. Not because it made for good marketing. Because it's the right way to do business.",
      ],
    },
    {
      type: "prose",
      heading: "What the handshake principle means",
      paras: [
        "A handshake used to be enough because both people meant it. We run TruePay that way, and then we put it in writing anyway. Each promise comes with plain-English fine print. [Read our promises →](/why-truepay/)",
      ],
    },
    {
      type: "people",
      heading: "Who owns and runs TruePay?",
      intro: "TruePay is led by people who still talk to merchants every week. [Meet the whole team →](/about/team/)",
      slugs: ["jon-wilson", "shane-spears", "tim-files"],
    },
    {
      type: "qa",
      items: [
        {
          q: "Who stays involved after I sign up?",
          a: [
            "The same team that helped you choose. Our operations and support people set up your equipment and answer when you call. You won't be handed off to a call center. [See what customers say →](/customer-stories/)",
          ],
        },
      ],
    },
    {
      type: "cards",
      heading: "TruePay at a glance",
      columns: 3,
      cards: [
        { title: "Founded", text: "{{claim:founded-2011}}" },
        { title: "Based in", text: "Josephine, Texas, with merchants across the country. [Where we serve →](/service-areas/)" },
        { title: "Support", text: "{{claim:us-support}}" },
      ],
    },
  ],
};

export const team: PageContent = {
  path: "/about/team/",
  eyebrow: "Our team",
  answer:
    "TruePay is a small Texas team. Jon Wilson leads the company, Shane Spears runs operations and Mandie Spears leads support, with a sales team that helps you choose the right setup. These are the people who set up your equipment and answer when you call.",
  blocks: [
    {
      type: "people",
      heading: "Who will I work with?",
      intro: "When you sign with TruePay, these are the people behind your account.",
      slugs: ["jon-wilson", "shane-spears", "mandie-spears", "adam-watson", "tim-files"],
    },
    {
      type: "qa",
      items: [
        { q: "Who handles support?", a: ["Mandie Spears leads our support team, with Shane Spears overseeing operations. When you call {{phone}}, you reach them, not an outside call center. [Support →](/support/)"] },
        {
          q: "How do I reach the right person?",
          a: ["Call {{phone}}. New business questions go to sales; equipment, deposit and account questions go to support. Not sure? Whoever answers will get you to the right person."],
        },
      ],
    },
    {
      type: "prose",
      heading: "The real difference makers",
      paras: [
        "These may be the faces of TruePay, but much of the work happens behind them: the sales team, support staff and partners who make sure every merchant feels taken care of. Read more about our [founder, Jon Wilson](/about/jon-wilson/) and [COO, Shane Spears](/about/shane-spears/).",
      ],
    },
  ],
};

export const jon: PageContent = {
  path: "/about/jon-wilson/",
  eyebrow: "Founder & CEO",
  heroCtas: false,
  answer:
    "Jon Wilson is the founder and CEO of TruePay. He started the company in 2011 in Texas after years in the payments industry, to give business owners transparent pricing, a rate that doesn't creep and people they can actually reach.",
  blocks: [
    {
      type: "qa",
      items: [
        {
          q: "What is Jon's background in payments?",
          a: [
            "{{claim:payments-since-2006|Jon has worked in payments since 2006}}, and built TruePay to do the work differently. Merchants mention him by name in their reviews.",
          ],
        },
        {
          q: "Why did he start TruePay?",
          a: [
            "Because he kept seeing good business owners lose money to hidden fees, quiet rate increases and processors who disappeared after the sale. TruePay's handshake principle came from that: fair pricing, in writing, from people who answer the phone. [Our story →](/about/)",
          ],
        },
      ],
    },
    {
      type: "list",
      heading: "What Jon handles at TruePay",
      items: ["Company leadership", "TruePay's pricing programs: Membership and dual pricing", "The merchant guides in our [resources](/resources/)"],
    },
    {
      type: "list",
      heading: "Guides by Jon",
      items: [
        "[How to read your processing statement](/resources/how-to-read-your-processing-statement/)",
        "[Flat rate vs. tiered vs. interchange-plus pricing](/resources/flat-rate-vs-tiered-vs-interchange-plus/)",
        "[Why did my credit card processing fees go up?](/resources/why-credit-card-processing-fees-go-up/)",
        "[Dual pricing vs. surcharging vs. cash discount](/resources/dual-pricing-vs-surcharging-vs-cash-discount/)",
      ],
    },
  ],
};

export const shane: PageContent = {
  path: "/about/shane-spears/",
  eyebrow: "Chief Operating Officer",
  heroCtas: false,
  answer:
    "Shane Spears is TruePay's Chief Operating Officer. He runs day-to-day operations, including onboarding new merchants, equipment and support, so business owners get set up correctly and get help fast when they need it.",
  blocks: [
    {
      type: "qa",
      items: [
        {
          q: "What does Shane oversee?",
          a: ["Shane oversees how TruePay works behind the scenes: getting new merchants approved and set up, programming and shipping equipment, and making sure support calls get answered and resolved."],
        },
        {
          q: "How does he help merchants after signup?",
          a: [
            "His team handles the details that make a switch go smoothly and makes sure problems get fixed. Merchants mention him by name in their reviews. [Read what they say →](/customer-stories/)",
          ],
        },
      ],
    },
    {
      type: "list",
      heading: "Guides by Shane",
      items: ["[How to switch payment processors safely](/resources/how-to-switch-payment-processors/)", "[How credit card processing works](/resources/how-credit-card-processing-works/)"],
    },
    { type: "prose", heading: "Meet the rest of the team", paras: ["[See everyone at TruePay →](/about/team/)"] },
  ],
};

export const stories: PageContent = {
  path: "/customer-stories/",
  eyebrow: "Customer stories",
  answer:
    "Business owners who work with TruePay most often mention the same things: the service, the people, and finally understanding what they pay. Below are their own words from reviews they've left, linked to where each was posted.",
  blocks: [
    { type: "quotes", heading: "What do customers say about TruePay?", intro: "On service and people:", ids: ["e-springfield", "a-monroe", "r-moore", "b-slavens"] },
    { type: "quotes", heading: "On cost", ids: ["m-holt"] },
    {
      type: "qa",
      items: [
        {
          q: "Have they helped a business like mine?",
          a: [
            "TruePay works with restaurants, retail shops, salons, service businesses and more. We're collecting full stories with business owners' permission. In the meantime, see how we work with [businesses like yours](/industries/) or read [why business owners switch](/why-truepay/).",
          ],
        },
      ],
    },
    {
      type: "callout",
      title: "Already a TruePay customer?",
      text: "We'd be grateful if you'd share your experience in a Google review. It helps other business owners find a processor they can trust. Call {{phone}} and we'll send you the link.",
    },
  ],
};

export const serviceAreas: PageContent = {
  path: "/service-areas/",
  eyebrow: "Service areas",
  answer:
    "TruePay is based in Josephine, Texas, and serves businesses across the United States. Most of our merchants are in Texas and Oklahoma, and we work with businesses from coast to coast. Setup, training and support work by phone and remote connection wherever you are.",
  blocks: [
    { type: "coverage" },
    {
      type: "qa",
      items: [
        { q: "Do you serve my state?", a: ["{{claim:coverage}} Call {{phone}} and we'll confirm service for your business and location."] },
        {
          q: "Is support local or remote?",
          a: [
            "Most support happens by phone, which is usually the fastest way to fix a payment problem. Equipment arrives programmed for your business and we walk you through setup. Ask about your area when you call. [Contact us →](/contact/)",
          ],
        },
      ],
    },
    { type: "prose", heading: "Meet the people behind the phone", paras: ["Wherever you are, you'll talk to the same Texas team. [Meet them →](/about/team/)"] },
  ],
};
