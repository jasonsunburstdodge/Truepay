import Link from "next/link";
import { Logo } from "@/components/brand";
import { MobileMenu } from "@/components/mobile-menu";
import { navGroups, utilityLinks } from "@/components/nav-data";
import { ctas } from "@/content/ctas";
import { entity } from "@/content/entity";

export function SiteHeader() {
  const groups = navGroups();
  const utility = utilityLinks();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div className="container-tp flex items-center justify-between gap-4 py-3">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {groups.map((g) => (
              <li key={g.path} className="nav-group">
                <Link href={g.path} className="block rounded-md px-3 py-2 text-[0.925rem] font-medium text-text hover:bg-surface hover:text-navy">
                  {g.label}
                </Link>
                {g.children.length > 0 && (
                  <div className="nav-panel">
                    <ul>
                      {g.children.map((c) => (
                        <li key={c.path}>
                          <Link href={c.path} className="block rounded-md px-3 py-2 text-sm text-text hover:bg-surface hover:text-navy">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={entity.phone.href} className="hidden text-sm font-semibold text-navy hover:underline xl:inline" data-event="call_click">
            {entity.phone.display}
          </a>
          <Link
            href={ctas["statement-review"].href}
            data-cta="statement-review"
            className="hidden rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-bright sm:inline-flex"
          >
            Free statement review
          </Link>
          <MobileMenu groups={groups} utility={utility} phone={entity.phone} />
        </div>
      </div>
    </header>
  );
}
