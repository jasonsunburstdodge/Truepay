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
    <header className="sticky top-0 z-40 bg-navy-deep text-white shadow-[0_1px_0_rgba(255,255,255,0.06)]">
      <div className="container-tp flex items-center justify-between gap-4 py-4">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {groups.map((g) => (
              <li key={g.path} className="nav-group">
                <Link href={g.path} className="block rounded-[10px] px-3 py-2 text-[0.95rem] font-semibold text-white/85 hover:bg-white/10 hover:text-white">
                  {g.label}
                </Link>
                {g.children.length > 0 && (
                  <div className="nav-panel">
                    <ul>
                      {g.children.map((c) => (
                        <li key={c.path}>
                          <Link href={c.path} className="block rounded-[10px] px-3 py-2 text-sm font-medium text-text hover:bg-surface-alt hover:text-navy">
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

        <div className="flex items-center gap-3">
          <a href={entity.phone.href} className="hidden text-sm font-semibold text-white/85 hover:text-white xl:inline">
            {entity.phone.display}
          </a>
          <Link
            href={ctas["statement-review"].href}
            data-cta="statement-review"
            className="hidden rounded-[10px] border border-white/60 px-4 py-2.5 text-[0.95rem] font-semibold tracking-[0.01em] text-white transition-colors hover:border-gold hover:text-gold sm:inline-flex"
          >
            Free statement review
          </Link>
          <MobileMenu groups={groups} utility={utility} phone={entity.phone} />
        </div>
      </div>
    </header>
  );
}
