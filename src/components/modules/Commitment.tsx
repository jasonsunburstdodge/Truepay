import { getClaim } from "@/lib/claims";
export function Commitment({ id, title }: { id: string; title: string }) {
  const claim = getClaim(id);
  return (
    <article className="card commitment" data-claim={id}>
      <span className="checkmark" aria-hidden="true">
        ✓
      </span>
      <h3>{title}</h3>
      <p data-claim-copy>{claim.copy}</p>
      <a href="/why-truepay/#fine-print">The details behind this promise</a>
    </article>
  );
}
