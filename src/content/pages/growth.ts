import type { PageContent } from "./types";

export const partners: PageContent = {
  path: "/partners/",
  eyebrow: "Partner program",
  answer:
    "If business owners trust you, there's a place for you at TruePay. {{claim:partner-split}} Sell directly as a rep or simply make introductions as a referral partner, and earn recurring residuals for as long as your merchants process with us.",
  blocks: [
    {
      type: "table",
      heading: "What's the difference between a rep and a referral partner?",
      caption: "Two ways to work with TruePay",
      columns: ["", "Sales rep", "Referral partner"],
      rows: [
        ["What you do", "Find the business, run the conversation and help close it", "Make the introduction; our team takes it from there"],
        ["Your share", "50% of TruePay's applicable profit", "20% of TruePay's applicable profit"],
        ["Who it suits", "People who want to build a book of merchants", "People who already serve business owners and want to recommend someone they trust"],
        ["Support", "Training, pricing help and our team on calls", "We handle the sale, setup and support"],
      ],
      note: "Shares are of TruePay's applicable profit from referred merchants' processing, under a written partner agreement.",
    },
    {
      type: "qa",
      items: [
        {
          q: "How are residuals calculated?",
          a: [
            "Each month, TruePay earns a profit on a merchant's processing after interchange and costs. Your share of that profit is your residual. It recurs every month the merchant keeps processing, and grows as you add merchants. The estimator below shows how the math works with your own assumptions.",
          ],
        },
      ],
    },
    { type: "estimator" },
    {
      type: "qa",
      items: [
        {
          q: "Who is a good fit?",
          a: [
            "People who already serve local businesses and value long-term relationships: restaurant and retail suppliers, POS and software resellers, bookkeepers and accountants, business consultants, insurance agents and anyone owners call for advice. You don't need payments experience to refer. Reps get trained.",
          ],
        },
        {
          q: "What training and support do partners get?",
          a: [
            "Reps get sales training through [TruePay Training](https://truepaytraining.com/) and help from our team on pricing and proposals. Referral partners just make the introduction. Either way, our [Texas team](/about/team/) sets up and supports your merchants, so your reputation is in good hands. [Why merchants choose TruePay →](/why-truepay/)",
          ],
        },
      ],
    },
    {
      type: "leadForm",
      formType: "partner",
      id: "apply",
      heading: "Apply to partner with TruePay",
      text: "Tell us who you serve and how you'd like to work together. We'll set up a call to walk through the agreement. Looking for a staff role instead? See [careers](/careers/).",
    },
  ],
};

export const careers: PageContent = {
  path: "/careers/",
  eyebrow: "Careers",
  heroCtas: false,
  answer:
    "TruePay hires people who care about doing right by business owners, in sales and in merchant support. If that sounds like you, tell us about yourself below. We'll reach out when a role opens that fits.",
  blocks: [
    {
      type: "qa",
      items: [
        {
          q: "What roles are open?",
          a: [
            "We hire for sales and merchant support as the business grows. Rather than post roles that may already be filled, we keep a list of good people to call first. If you'd rather work independently and earn residuals, look at our [partner program](/partners/).",
          ],
        },
        {
          q: "What is it like to work at TruePay?",
          a: [
            "We're a small Texas team that does business on a handshake. You'll be expected to tell customers the truth, including when TruePay isn't the right fit, and to pick up the phone when they call. [Meet the team →](/about/team/)",
          ],
        },
      ],
    },
    { type: "leadForm", formType: "careers", id: "apply", heading: "Tell us about yourself", text: "Share your background and the kind of role you're interested in. We read every one." },
  ],
};

export const privacy: PageContent = {
  path: "/privacy-policy/",
  heroCtas: false,
  answer: "This policy explains what information TruePay collects through gotruepay.com, how we use it, and the choices you have. It covers this website only; your merchant agreement covers your processing account.",
  blocks: [
    {
      type: "prose",
      heading: "Information we collect",
      paras: [
        "**Information you give us.** When you fill out a form, such as a statement review request, contact form or partner application, we collect what you enter: your name, business name, email, phone number, type of business and your message.",
        "**Statements you send us.** If you send a processing statement for a review, we use it only to prepare your review and recommendation.",
        "**Website usage.** Like most websites, our servers record basic technical information such as your browser type and the pages you visit. If analytics are enabled, we use them to understand which pages are useful. We don't send form contents or statements to analytics tools.",
      ],
    },
    {
      type: "prose",
      heading: "How we use it",
      paras: [
        "We use your information to respond to your request, prepare statement reviews, provide merchant services you sign up for, improve the website and meet legal obligations. We don't sell your personal information.",
        "With your permission, we may contact you by phone, text or email about your request. You can ask us to stop at any time.",
      ],
    },
    {
      type: "prose",
      heading: "Sharing",
      paras: [
        "We share information with service providers that help us run the website and our business, such as hosting, our customer relationship system and, if you become a merchant, our processing partners. They may use it only to provide services to us. We may also share information when the law requires it.",
      ],
    },
    {
      type: "prose",
      heading: "Your choices and contact",
      paras: ["To ask what information we have about you, correct it or have it deleted, email support@gotruepay.com or call {{phone}}. You can also write to TruePay, 200 Monarch Ln, Josephine, TX 75173. [Contact us →](/contact/) See also our [website terms of use](/terms/)."],
    },
  ],
};

export const terms: PageContent = {
  path: "/terms/",
  heroCtas: false,
  answer: "These terms cover your use of gotruepay.com, including its calculators and guides. Your merchant processing agreement, not this website, sets the terms of any TruePay account.",
  blocks: [
    {
      type: "prose",
      heading: "Information on this site",
      paras: [
        "We work to keep the information here accurate and current, but it's general information, not legal, tax or financial advice. Card-network rules and laws change; check current requirements for your business and location.",
        "Calculators and examples, such as the effective rate calculator and the partner residual estimator, are illustrations based on the numbers you enter and the assumptions shown. They aren't quotes, offers or promises of savings or income.",
      ],
    },
    {
      type: "prose",
      heading: "Programs and promises",
      paras: [
        "Program descriptions on this site, including Membership, dual pricing, the rate lock and Lifetime TrueCare, summarize our programs. The written terms you receive with your agreement control. [Read the fine print →](/why-truepay/)",
      ],
    },
    {
      type: "prose",
      heading: "Using the site",
      paras: [
        "Don't misuse the site, including by submitting false information, attempting to access systems you aren't authorized to use, or copying content for commercial use without permission. Content and the TruePay name and logo belong to TruePay.",
        "We may update these terms. The version posted here applies. Questions? Contact us at support@gotruepay.com. See also our [privacy policy](/privacy-policy/).",
      ],
    },
  ],
};
