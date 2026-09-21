import { siteConfig } from "@/lib/site-config";

// Below-the-fold, so this is lazy-loaded (brief task 11) — unlike the hero,
// this isn't an LCP candidate, so lazy is the right call here.
export function CoverageSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="grid items-center gap-10 sm:grid-cols-2">
        <div>
          <p className="section-eyebrow text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Where we work
          </p>
          <h2 className="font-display mt-3 text-3xl text-ink sm:text-4xl">
            {siteConfig.coverage.headline}.
          </h2>
          <p className="mt-4 max-w-md text-text-muted">
            Deep roots in {siteConfig.coverage.primaryStates.join(" and ")} since{" "}
            {siteConfig.founded}, with a real, active merchant presence spreading coast
            to coast.
          </p>
        </div>
        <div>
          {/*
            Plain <img>, not next/image: SVGs are vector, so there's nothing
            for Next's raster optimizer to resize/compress — next/image also
            requires opting into `images.dangerouslyAllowSVG` for local SVGs.
            A native `loading="lazy"` gets the same deferred-load benefit.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element -- vector SVG, see comment above */}
          <img
            src="/images/coverage-map.svg"
            alt="Stylized map highlighting TruePay's confirmed coverage states, concentrated in Texas and Oklahoma with presence across the East and West Coasts (illustrative, not to scale)"
            width={640}
            height={260}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
          <p className="mt-2 text-center text-xs text-text-muted">
            {siteConfig.coverage.confirmedStates.length} of 30+ confirmed coverage states
            shown — illustrative, not to scale.
          </p>
        </div>
      </div>
    </section>
  );
}
