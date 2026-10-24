import Link from "next/link";
import { isBuilt } from "@/lib/navigation";
import { testimonials } from "@/content/entity";
export function ProofQuote({ id }: { id: string }) {
  const quote = testimonials.find((q) => q.id === id);
  if (!quote) throw new Error(`Unknown testimonial: ${id}`);
  return (
    <figure
      className="card proof"
      {...(id === "m-holt" ? { "data-claim": "holt-quote" } : {})}
    >
      <blockquote>
        <p>{quote.quote}</p>
      </blockquote>
      <figcaption>
        <strong>{quote.name}</strong>
        {quote.business && <span> · {quote.business}</span>}
        {quote.city && <span> · {quote.city}</span>}
        {(quote.archivedSourceUrl || quote.sourceUrl) && (
          <a href={quote.archivedSourceUrl || quote.sourceUrl}>
            Published on TruePay ·{" "}
            {quote.archivedSourceUrl ? "archived source" : "source"}
          </a>
        )}
        {isBuilt("/customer-stories/") && (
          <Link href="/customer-stories/">Read customer stories</Link>
        )}
      </figcaption>
      {id === "m-holt" && (
        <p className="note">
          One customer’s experience. Individual results vary.
        </p>
      )}
    </figure>
  );
}
