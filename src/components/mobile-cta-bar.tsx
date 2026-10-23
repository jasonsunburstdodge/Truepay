import Link from "next/link";
import { entity } from "@/content/entity";
export function MobileCtaBar() {
  return (
    <aside className="mobile-cta" aria-label="Quick contact">
      <Link
        className="button primary"
        data-cta="statement-review"
        href="/statement-review/"
      >
        Free statement review
      </Link>
      <a href={entity.phone.href}>Call {entity.phone.display}</a>
    </aside>
  );
}
