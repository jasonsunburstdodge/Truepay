import { CtaButtons } from "@/components/cta-buttons";

const badges = ["Rate protection", "Month-to-month service", "Real US-based support"];

// No hero photography exists yet for this greenfield build (see README.md
// "Pre-build review" item 5) — using a CSS/token-based treatment instead of a
// placeholder stock photo so nothing here misrepresents real TruePay brand
// imagery. When a real hero photo is supplied, load it with next/image and
// `priority` (NOT lazy) — the hero is the page's LCP element, so lazy-loading
// it would regress load time rather than help it. Lazy-loading in task 11
// applies to the below-the-fold coverage graphic, not this section.
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-navy-deep via-navy to-ink">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="hero-eyebrow text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Payment processing built around your business
        </p>
        <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.08] text-white sm:text-6xl">
          Payments Without <em className="text-gold not-italic">the Games.</em>
        </h1>
        <p className="hero-sub mt-5 max-w-xl text-base text-white/80 sm:text-lg">
          Transparent payment processing. Rate protection. Month-to-month service.
          Real US-based support — since 2011.
        </p>

        <div className="mt-8">
          <CtaButtons />
        </div>

        <p className="hero-trust-line mt-6 max-w-xl text-sm text-white/60">
          Nationwide coverage across 30+ states — with deep roots in Texas and
          Oklahoma since 2011.
        </p>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6">
          {badges.map((badge) => (
            <span key={badge} className="text-xs font-medium uppercase tracking-wider text-white/50">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
