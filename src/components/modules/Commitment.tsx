import { getClaim } from "@/lib/claims";
export function Commitment({ id, title, context }: { id: string; title: string; context?: "home" | "membership" }) {
  const claim = getClaim(id);
  const variants: Record<string,string> = context === "home" ? { "rate-lock": "TruePay keeps its own processing markup fixed." } : context === "membership" ? {
    "rate-lock": "Membership’s TruePay markup stays fixed while your account keeps processing.",
    "truecare": "Membership includes repair or replacement of covered equipment while you remain a TruePay customer."
  } : { "honest-recommendation": "TruePay will recommend keeping your current provider when its agreement and pricing already suit the needs you bring to the review." };
  return (
    <article className="card commitment" data-claim={id}>
      <span className="checkmark" aria-hidden="true">
        ✓
      </span>
      <h3>{title}</h3>
      <p data-claim-copy>{variants[id] ?? claim.copy}</p>
      <a href="/why-truepay/#fine-print">The details behind this promise</a>
    </article>
  );
}
