import { getClaim } from "@/lib/claims";
import { isBuilt } from "@/lib/navigation";
export function Commitment({
  id,
  title,
  covers,
  excludes,
  expanded = false,
}: {
  id: string;
  title: string;
  covers: string;
  excludes: string;
  expanded?: boolean;
}) {
  const claim = getClaim(id);
  return (
    <article className="card commitment" data-claim={id}>
      <span className="checkmark" aria-hidden="true">
        ✓
      </span>
      <h3>{title}</h3>
      <p data-claim-copy>{claim.copy}</p>
      <details open={expanded}>
        <summary>What this covers</summary>
        <p>{covers}</p>
        <h4>What it doesn’t</h4>
        <p>{excludes}</p>
      </details>
      {isBuilt("/why-truepay/") && (
        <a href="/why-truepay/#fine-print">Read the commitment terms</a>
      )}
    </article>
  );
}
