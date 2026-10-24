import type { ReactNode } from "react";
import { getRoute } from "@/content/routes";
import type { Source } from "@/components/modules/Sources";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  author: "jon-wilson" | "shane-spears";
  reviewer: "jon-wilson" | "shane-spears";
  reviewedAt?: string;
  hero: string;
  datePublished: string;
  dateModified: string;
  sources: Source[];
  answer: string;
  introduction?: ReactNode;
  sections: { answer: string; detail?: string[]; extra?: ReactNode }[];
  fit: string;
  commercial: { path: string; text: string; reason: string };
  tool: "/statement-review/" | "/effective-rate-calculator/";
  siblings: [string, string];
};
export function defineGuide(input: Omit<Guide, "title" | "description" | "datePublished" | "dateModified">): Guide {
  const route = getRoute(`/resources/${input.slug}/`);
  if (!route || route.template !== "guide") throw new Error(`Unknown guide ${input.slug}`);
  if (input.sections.length !== route.questions.length) throw new Error(`Question mismatch: ${input.slug}`);
  return { ...input, title: route.title, description: route.description, datePublished: "2026-10-24", dateModified: "2026-10-24" };
}
export const primarySources = {
  visaFees: { title: "Visa payment system: interchange, merchant discount and fees", url: "https://www.visa.com/en-us/support/business/regulation-fees", publisher: "Visa", accessed: "2026-10-24" },
  mastercardRates: { title: "U.S. interchange rates and qualification criteria", url: "https://www.mastercard.com/us/en/business/support/merchant-interchange-rates.html", publisher: "Mastercard", accessed: "2026-10-24" },
  fed: { title: "Credit and debit card interchange fee schedules", url: "https://www.kansascityfed.org/research/interchange-fees-us/", publisher: "Federal Reserve Bank of Kansas City", accessed: "2026-10-24" },
  visaSurcharge: { title: "U.S. merchant surcharge questions and answers", url: "https://usa.visa.com/content/dam/VCOM/global/support-legal/documents/merchant-surcharging-qa-for-web.pdf", publisher: "Visa", accessed: "2026-10-24" },
  mastercardSurcharge: { title: "Merchant surcharge rules and notice requirements", url: "https://www.mastercard.com/us/en/business/support/merchant-surcharge-rules.html", publisher: "Mastercard", accessed: "2026-10-24" },
  newYork: { title: "New York credit card surcharge guidance, effective February 11, 2024", url: "https://dos.ny.gov/system/files/documents/2024/04/2024-04-10-dos-dcp-credit-card-surcharge-one-page-reference-guide.pdf", publisher: "New York Department of State", accessed: "2026-10-24" },
  massachusetts: { title: "Massachusetts General Laws, chapter 140D, section 28A", url: "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXX/Chapter140d/Section28a", publisher: "Massachusetts Legislature", accessed: "2026-10-24" },
  authorizeProcessor: { title: "Changing the processor connected to an Authorize.net account", url: "https://support.authorize.net/knowledgebase/Knowledgearticle/?code=000001990", publisher: "Authorize.net", accessed: "2026-10-24" },
  visaCapture: { title: "VisaNet Connect: authorization, capture and settlement", url: "https://developer.visa.com/docs/visanet-connect-acceptance", publisher: "Visa Developer", accessed: "2026-10-24" },
  treasuryFlow: { title: "How Card Acquiring Service works", url: "https://fiscal.treasury.gov/payments-to-government/card-acquiring-service-cas/how-cas-works", publisher: "U.S. Treasury, Bureau of the Fiscal Service", accessed: "2026-10-24" },
};
