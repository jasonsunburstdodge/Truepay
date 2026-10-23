import Link from "next/link";
import { breadcrumbTrail, getRoute, type CtaId, type RouteSpec } from "@/content/routes";
import { ctas } from "@/content/ctas";
import { people } from "@/content/entity";
import type { GuideMeta } from "@/content/pages/types";
import { Rich } from "@/components/rich";

export function Breadcrumbs({ path }: { path: string }) {
  const trail = breadcrumbTrail(path);
  if (trail.length < 2) return null;
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((r, i) => (
          <li key={r.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === trail.length - 1 ? (
              <span aria-current="page" className="text-text">
                {r.label}
              </span>
            ) : (
              <Link href={r.path} className="hover:text-navy hover:underline">
                {r.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CtaButton({ id, variant = "primary", label }: { id: Exclude<CtaId, "none">; variant?: "primary" | "secondary" | "onDark"; label?: string }) {
  const c = ctas[id];
  const cls =
    variant === "primary"
      ? "bg-gold text-ink hover:bg-gold-bright"
      : variant === "onDark"
        ? "border border-white/30 text-white hover:bg-white/10"
        : "border border-navy/25 text-navy hover:border-navy hover:bg-navy/5";
  const className = `inline-flex items-center justify-center rounded-md px-5 py-3 text-[0.95rem] font-semibold transition-colors ${cls}`;
  if (c.external || c.href.startsWith("tel:")) {
    return (
      <a href={c.href} className={className} data-cta={id}>
        {label ?? c.label}
      </a>
    );
  }
  return (
    <Link href={c.href} className={className} data-cta={id}>
      {label ?? c.label}
    </Link>
  );
}

export function CtaRow({ route, onDark = false }: { route: RouteSpec; onDark?: boolean }) {
  if (route.primaryCta === "none") return null;
  return (
    <div className="flex flex-wrap gap-3">
      <CtaButton id={route.primaryCta} />
      {route.secondaryCta && route.secondaryCta !== "none" && <CtaButton id={route.secondaryCta} variant={onDark ? "onDark" : "secondary"} />}
    </div>
  );
}

const fmtDate = (iso: string) => new Date(iso + "T12:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export function AuthorBox({ guide }: { guide: GuideMeta }) {
  const author = people.find((p) => p.slug === guide.author);
  const reviewer = guide.reviewer ? people.find((p) => p.slug === guide.reviewer) : undefined;
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-muted">
      {author && (
        <p data-author>
          By{" "}
          <Link href={author.profilePath ?? "/about/team/"} className="inline-link font-medium">
            {author.name}
          </Link>
          , {author.jobTitle}
        </p>
      )}
      {reviewer && reviewer !== author && (
        <p>
          Reviewed by{" "}
          <Link href={reviewer.profilePath ?? "/about/team/"} className="inline-link font-medium">
            {reviewer.name}
          </Link>
        </p>
      )}
      <p data-reviewed>
        Updated <time dateTime={guide.modified}>{fmtDate(guide.modified)}</time>
        {guide.published !== guide.modified && (
          <>
            {" "}
            · First published <time dateTime={guide.published}>{fmtDate(guide.published)}</time>
          </>
        )}
      </p>
    </div>
  );
}

export function PageHeader({
  route,
  answer,
  eyebrow,
  guide,
  heroCtas,
}: {
  route: RouteSpec;
  answer: string;
  eyebrow?: string;
  guide?: GuideMeta;
  heroCtas: boolean;
}) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="container-tp grid gap-5 py-10 sm:py-14">
        <Breadcrumbs path={route.path} />
        <div className="measure grid gap-4">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="font-display text-[2.1rem] leading-[1.1] text-ink sm:text-5xl">{route.h1}</h1>
          <div data-answer className="text-lg leading-relaxed text-text">
            <Rich text={answer} />
          </div>
          {guide && <AuthorBox guide={guide} />}
          {heroCtas && (
            <div className="pt-1">
              <CtaRow route={route} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function CtaBand({ route }: { route: RouteSpec }) {
  if (route.primaryCta === "none") return null;
  const copy: Partial<Record<CtaId, { h: string; t: string }>> = {
    "statement-review": {
      h: "Find out what you're really paying",
      t: "Send your latest processing statement. We'll explain every line and give you a straight recommendation, even if it's to stay where you are.",
    },
    "talk-to-person": { h: "Talk it through with a real person", t: "Call our Texas team. You'll get straight answers about your business, not a sales script." },
    "partner-apply": { h: "Ready to put your relationships to work?", t: "Tell us about the business owners you serve and how you'd like to work together." },
    support: { h: "Still need help?", t: "Call us and a US-based person will pick up and work the problem with you." },
    calculator: { h: "See your real rate", t: "Two numbers from your statement are all you need." },
    "careers-apply": { h: "Interested in joining TruePay?", t: "Tell us about yourself and the kind of work you want to do." },
  };
  const c = copy[route.primaryCta] ?? copy["statement-review"]!;
  return (
    <section aria-labelledby="cta-band" className="bg-navy">
      <div className="container-tp grid gap-6 py-14 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div className="grid gap-3">
          <h2 id="cta-band" className="font-display text-3xl text-white">
            {c.h}
          </h2>
          <p className="max-w-xl text-white/80">{c.t}</p>
        </div>
        <div className="md:justify-self-end">
          <CtaRow route={route} onDark />
        </div>
      </div>
    </section>
  );
}

export function RelatedLinks({ paths, heading = "Keep reading" }: { paths: string[]; heading?: string }) {
  const items = paths.map((p) => getRoute(p)).filter((r): r is RouteSpec => !!r && r.status !== "planned");
  if (!items.length) return null;
  return (
    <section aria-labelledby="related" className="container-tp py-12">
      <h2 id="related" className="font-display text-2xl text-ink">
        {heading}
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => (
          <li key={r.path}>
            <Link href={r.path} className="group block h-full rounded-[var(--radius-md)] border border-border bg-paper p-4 transition-shadow hover:shadow-[var(--shadow-card)]">
              <span className="block font-semibold text-ink group-hover:text-navy">{r.label}</span>
              <span className="mt-1 block text-sm text-text-muted">{r.h1}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
