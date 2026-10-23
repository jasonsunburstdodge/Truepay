import Link from "next/link";
import { Logo } from "@/components/brand";
import { link, navGroups } from "@/components/nav-data";
import { ctas } from "@/content/ctas";
import { entity } from "@/content/entity";
import { showConceptRibbon } from "@/lib/seo";

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function ConceptRibbon() {
  if (!showConceptRibbon) return null;
  return (
    <div className="bg-navy-night text-center text-xs text-mist">
      <p className="container-tp py-1.5">Concept preview for TruePay review. Draft content; not the live site.</p>
    </div>
  );
}

const SOCIAL_LABELS: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "X (Twitter)",
  tiktok: "TikTok",
};

export function SiteFooter() {
  const groups = navGroups();
  const legal = ["/privacy-policy/", "/terms/"].map(link).filter((l) => l !== undefined);
  const help = ["/support/", "/contact/", "/statement-review/", "/effective-rate-calculator/"].map(link).filter((l) => l !== undefined);
  return (
    <footer className="bg-navy-night text-cream">
      <div className="container-tp grid gap-10 py-14 lg:grid-cols-[1.3fr_2fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-cream/75">{entity.oneLiner}</p>
          <address className="mt-5 text-sm not-italic leading-relaxed text-cream/75">
            {entity.address.streetAddress}
            <br />
            {entity.address.addressLocality}, {entity.address.addressRegion} {entity.address.postalCode}
            <br />
            <a href={entity.phone.href} className="font-semibold text-cream hover:text-gold">
              {entity.phone.display}
            </a>
            <br />
            <a href={`mailto:${entity.email}`} className="hover:text-gold">
              {entity.email}
            </a>
          </address>
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {entity.sameAs.map((url) => {
              const key = Object.keys(SOCIAL_LABELS).find((k) => url.includes(k)) ?? url;
              return (
                <li key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer me" className="text-cream/75 hover:text-gold">
                    {SOCIAL_LABELS[key] ?? url}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {[...groups, { label: "Help", path: "/support/", children: help }].map((g) => (
            <div key={g.label}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{g.label}</p>
              <ul className="mt-3 grid gap-2 text-sm text-cream/70">
                {g.label !== "Help" && (
                  <li>
                    <Link href={g.path} className="hover:text-gold">
                      {g.label === "About" ? "About TruePay" : `All ${g.label.toLowerCase()}`}
                    </Link>
                  </li>
                )}
                {g.children.slice(0, 8).map((c) => (
                  <li key={c.path}>
                    <Link href={c.path} className="hover:text-gold">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-tp flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-cream/55">
          <p>
            © {new Date().getFullYear()} {entity.name}. Payments without the games, since {entity.foundingYear}.
          </p>
          <ul className="flex gap-4">
            {legal.map((l) => (
              <li key={l.path}>
                <Link href={l.path} className="hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex bg-navy-deep pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(7,39,75,0.25)] sm:hidden">
      <Link href={ctas["statement-review"].href} className="flex flex-1 items-center justify-center bg-gold px-3 py-3.5 text-sm font-bold text-navy-deep">
        Free statement review
      </Link>
      <a href={entity.phone.href} className="flex flex-1 items-center justify-center px-3 py-3.5 text-sm font-bold text-white">
        Call {entity.phone.display}
      </a>
    </div>
  );
}
