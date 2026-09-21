import { Hero } from "@/components/hero";
import { Testimonials } from "@/components/testimonials";
import { PaymentMethodsSection } from "@/components/payment-methods-section";
import { IndustriesSection } from "@/components/industries-section";
import { PricingSignal } from "@/components/pricing-signal";
import { RateCalculator } from "@/components/rate-calculator";
import { CoverageSection } from "@/components/coverage-section";
import { LeadForm } from "@/components/lead-form";
import { IndustrySelectionProvider } from "@/components/industry-selection-context";

export default function Home() {
  return (
    <IndustrySelectionProvider>
      <Hero />
      <Testimonials />
      <PaymentMethodsSection />
      <IndustriesSection />

      <div className="pt-16">
        <PricingSignal />
      </div>
      <RateCalculator />

      <CoverageSection />

      <section id="review" className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        <LeadForm />
      </section>
    </IndustrySelectionProvider>
  );
}
