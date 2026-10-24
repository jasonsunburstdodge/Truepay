import statement from "./how-to-read-your-processing-statement";
import pricing from "./flat-rate-vs-tiered-vs-interchange-plus";
export const guides = [statement, pricing];
export const getGuide = (slug: string) => guides.find((guide) => guide.slug === slug);
