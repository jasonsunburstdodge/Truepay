import { testimonials } from "@/lib/site-config";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-label="Merchant reviews">
      <h2 className="font-display text-center text-3xl text-ink sm:text-4xl">
        What merchants say
      </h2>
      <div className="testimonial-grid mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="testimonial-card flex h-full flex-col rounded-[var(--radius-lg)] bg-cream p-6 shadow-[var(--shadow-card)]"
          >
            <blockquote className="flex-1 text-[0.95rem] leading-relaxed text-text">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm text-text-muted">
              <span className="font-semibold text-text">{t.name}</span>
            </figcaption>
            <div className="stars mt-2 text-gold-bright" aria-label="5 out of 5 stars">
              ★★★★★
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
