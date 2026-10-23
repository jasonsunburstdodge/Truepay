import { entity } from "@/content/entity";
import { type CtaId } from "@/content/routes";
import { isBuilt } from "@/lib/navigation";
export function ctaDetails(id: CtaId) {
  const review = isBuilt("/statement-review/")
    ? "/statement-review/"
    : "/#review";
  const calculator = isBuilt("/effective-rate-calculator/")
    ? "/effective-rate-calculator/"
    : "/#calculator";
  const actions = {
    "statement-review": [review, "Get my free statement review"],
    "talk-to-person": [entity.phone.href, `Call ${entity.phone.display}`],
    support: [
      isBuilt("/support/") ? "/support/" : entity.phone.href,
      "Get merchant support",
    ],
    calculator: [calculator, "Calculate my effective rate"],
    "partner-apply": [
      isBuilt("/partners/") ? "/partners/#apply" : entity.phone.href,
      "Talk about partnering",
    ],
    "careers-apply": [
      isBuilt("/careers/") ? "/careers/#apply" : `mailto:${entity.email}`,
      "Contact the team",
    ],
    none: ["", ""],
  };
  return actions[id];
}
export function CtaButtons({
  primary = "statement-review",
  secondary = "talk-to-person",
}: {
  primary?: CtaId;
  secondary?: CtaId;
}) {
  return (
    <div className="actions">
      {[primary, secondary]
        .filter((id) => id !== "none")
        .map((id, i) => {
          const [href, label] = ctaDetails(id);
          return (
            <a
              key={id}
              href={href}
              data-cta={id}
              className={`button ${i === 0 ? "primary" : "outline"}`}
            >
              {label}
              <span aria-hidden="true">{i === 0 ? "↗" : ""}</span>
            </a>
          );
        })}
    </div>
  );
}
export function CtaBand({
  eyebrow,
  title,
  children,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  primary?: CtaId;
  secondary?: CtaId;
}) {
  return (
    <section className="hero-gradient section">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {children}
        <CtaButtons primary={primary} secondary={secondary} />
      </div>
    </section>
  );
}
