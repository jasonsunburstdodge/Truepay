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
        {quote.sourceUrl && (
          <a href={quote.sourceUrl}>Read the published review</a>
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
