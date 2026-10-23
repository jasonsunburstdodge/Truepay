import type { CtaId } from "@/content/routes";
import { entity } from "@/content/entity";

export type CtaDef = { label: string; href: string; external?: boolean };

/** Every call to action on the site. Labels say exactly what happens next. */
export const ctas: Record<Exclude<CtaId, "none">, CtaDef> = {
  "statement-review": { label: "Get my free statement review", href: "/statement-review/#review-form" },
  "talk-to-person": { label: `Talk to a person: ${entity.phone.display}`, href: entity.phone.href, external: true },
  support: { label: `Call support: ${entity.phone.display}`, href: entity.phone.href, external: true },
  calculator: { label: "Calculate my effective rate", href: "/effective-rate-calculator/" },
  "partner-apply": { label: "Apply to partner with TruePay", href: "/partners/#apply" },
  "careers-apply": { label: "Tell us about yourself", href: "/careers/#apply" },
};
