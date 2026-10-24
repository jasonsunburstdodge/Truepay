import statement from "./how-to-read-your-processing-statement";
import pricing from "./flat-rate-vs-tiered-vs-interchange-plus";
import dual from "./dual-pricing-vs-surcharging-vs-cash-discount";
import increases from "./why-credit-card-processing-fees-go-up";
import switching from "./how-to-switch-payment-processors";
export const guides = [statement, pricing, dual, increases, switching];
export const getGuide = (slug: string) => guides.find((guide) => guide.slug === slug);
