import { pricingSignal } from "@/lib/site-config";

export function PricingSignal() {
  return (
    <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
      <p className="pricing-signal text-base text-text sm:text-lg">
        {pricingSignal.lead}{" "}
        <a
          href="#calculator"
          className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-bright"
        >
          {pricingSignal.linkText}
        </a>
      </p>
      <p className="pricing-signal-disclaimer mt-2 text-xs text-text-muted">
        {pricingSignal.disclaimer}
      </p>
    </div>
  );
}
