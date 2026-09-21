import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold">
              True<span className="text-gold">Pay</span>
            </p>
            <p className="mt-2 text-sm text-cream/70">
              Payment processing built around your business — since {siteConfig.founded}.
            </p>
          </div>
          <div className="text-sm text-cream/70">
            <p className="font-semibold text-cream">Contact</p>
            <p className="mt-2">
              <a href={siteConfig.phoneHref} className="hover:text-gold">
                {siteConfig.phone}
              </a>
            </p>
            <p className="mt-1">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
            </p>
          </div>
          <div className="text-sm text-cream/70">
            <p className="font-semibold text-cream">Coverage</p>
            <p className="mt-2">{siteConfig.coverage.headline}</p>
            <p className="mt-1">
              Deep roots in {siteConfig.coverage.primaryStates.join(" and ")} since{" "}
              {siteConfig.founded}.
            </p>
          </div>
        </div>
        <p className="mt-10 border-t border-cream/10 pt-6 text-xs text-cream/50">
          © {new Date().getFullYear()} TruePay. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
