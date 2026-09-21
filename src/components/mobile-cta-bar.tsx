import { siteConfig } from "@/lib/site-config";

// Single consolidated mobile CTA pattern (brief task 10). This greenfield
// build has no pre-existing floating call button to reconcile with, so this
// bottom bar is the only persistent mobile CTA — avoid adding a second
// floating action button alongside it.
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-white shadow-[0_-4px_16px_rgba(15,26,46,0.08)] sm:hidden">
      <a
        href="#calculator"
        className="flex flex-1 items-center justify-center bg-gold px-4 py-3.5 text-sm font-semibold text-ink"
      >
        Calculate my rate
      </a>
      <a
        href={siteConfig.phoneHref}
        className="flex flex-1 items-center justify-center border-l border-border px-4 py-3.5 text-sm font-semibold text-navy"
      >
        Call {siteConfig.phone}
      </a>
    </div>
  );
}
