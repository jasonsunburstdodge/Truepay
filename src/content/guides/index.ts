import statement from "./how-to-read-your-processing-statement";
import pricing from "./flat-rate-vs-tiered-vs-interchange-plus";
import dual from "./dual-pricing-vs-surcharging-vs-cash-discount";
export const guides = [statement, pricing, dual];
export const getGuide = (slug: string) => guides.find((guide) => guide.slug === slug);
