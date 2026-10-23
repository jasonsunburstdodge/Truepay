/**
 * Page content model. Each page is an answer-first summary plus a list of blocks.
 *
 * Inline text ("Rich") supports:
 *   [link text](/path/)          internal or https:// link
 *   **bold**
 *   {{claim:id}}                 renders the claim's approved copy, marked data-claim
 *   {{claim:id|custom wording}}  claim-marked custom wording (same claim, page-specific phrasing)
 *   {{phone}}                    TruePay's phone number
 */
export type Rich = string;

export type Item = { title: string; text: Rich; href?: string; linkText?: string };

export type Block =
  | { type: "prose"; heading?: string; id?: string; paras: Rich[] }
  | { type: "list"; heading?: string; intro?: Rich; items: Rich[]; ordered?: boolean }
  | { type: "steps"; heading: string; intro?: Rich; steps: Item[] }
  | { type: "cards"; heading?: string; intro?: Rich; cards: Item[]; columns?: 2 | 3 | 4; id?: string }
  | { type: "fit"; heading: string; intro?: Rich; good: Item[]; notFit: Item[]; closing?: Rich }
  | { type: "commitments"; heading: string; intro?: Rich; id?: string; items: { claim: string; title: string; covers: Rich; doesNot: Rich }[] }
  | { type: "table"; id?: string; heading?: string; intro?: Rich; caption: string; columns: string[]; rows: Rich[][]; note?: Rich; rowHeaders?: boolean }
  | { type: "qa"; heading?: string; items: { q: string; a: Rich[] }[] }
  | { type: "quotes"; heading?: string; intro?: Rich; ids: string[] }
  | { type: "people"; heading?: string; intro?: Rich; slugs: string[] }
  | { type: "callout"; title?: string; text: Rich; tone?: "note" | "warn" }
  | { type: "sources"; items: { title: string; publisher: string; url: string }[] }
  | { type: "calculator" }
  | { type: "leadForm"; formType: "statement-review" | "contact" | "partner" | "careers"; heading: string; text: Rich; id?: string }
  | { type: "estimator" }
  | { type: "contactCard" }
  | { type: "diagram"; kind: "payment-flow" | "statement" | "dual-pricing-checkout"; caption: Rich }
  | { type: "coverage" }
  | { type: "storyIndex" }
  /** White card of label/value rows, like "Sales reps 50%". overlap pulls it up into the hero above. */
  | { type: "stats"; eyebrow?: string; heading: string; rows: { label: string; value: string; claim?: string }[]; note?: Rich; id?: string; overlap?: boolean }
  /** Navy band with a gold eyebrow, white heading and text. */
  | { type: "darkProse"; eyebrow?: string; heading: string; paras: Rich[]; id?: string };

export type GuideMeta = { author: string; reviewer?: string; published: string; modified: string };

export type PageContent = {
  path: string;
  /** 40–80 words. Directly answers the page's first question. Quotable on its own. */
  answer: Rich;
  eyebrow?: string;
  guide?: GuideMeta;
  /** Show CTA buttons in the page header (default true for commercial pages). */
  heroCtas?: boolean;
  /** Custom header buttons instead of the route's CTAs (first is primary). */
  heroButtons?: { label: string; href: string; cta?: string }[];
  blocks: Block[];
};
