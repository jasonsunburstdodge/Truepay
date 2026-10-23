import Link from "next/link";
import { breadcrumbTrail, getRoute, type CtaId, type RouteSpec } from "@/content/routes";
import { ctas } from "@/content/ctas";
import { people } from "@/content/entity";
import type { GuideMeta, PageContent } from "@/content/pages/types";
import { Rich } from "@/components/rich";

/** The concentric arcs from the ChatGPT build's hero. Decorative. */
export function HeroArcs() {
  return (
    <div className="hero-arcs" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

export function Breadcrumbs({ path, onDark = false }: { path: string; onDark?: boolean }) {
  const trail = breadcrumbTrail(path);
  if (trail.length < 2) return null;
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${onDark ? "text-mist" : "text-text-muted"}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((r, i) => (
          <li key={r.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === trail.length - 1 ? (
              <span aria-current="page" className={onDark ? "text-white" : "text-text"}>
                {r.label}
              </span>
            ) : (
              <Link href={r.path} className={onDark ? "hover:text-white hover:underline" : "hover:text-navy hover:underline"}>
                {r.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

const btn = {
  primary: "bg-gold text-navy-deep hover:bg-gold-bright",
  secondary: "border-[1.5px] border-navy/30 text-navy hover:border-navy",
  onDark: "border-[1.5px] border-white/55 text-white hover:border-gold hover:text-gold",
};
const btnBase = "inline-flex items-center justify-center rounded-[10px] px-6 py-3.5 text-[1.02rem] font-bold tracking-[-0.01em] transition-colors";

export function ButtonLink({ href, label, variant = "primary", cta }: { href: string; label: string; variant?: keyof typeof btn; cta?: string }) {
  const className = `${btnBase} ${btn[variant]}`;
  if (/^(tel:|mailto:|https?:)/.test(href)) {
    return (
      <a href={href} className={className} data-cta={cta}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className} data-cta={cta}>
      {label}
    </Link>
  );
}

export function CtaButton({ id, variant = "primary", label }: { id: Exclude<CtaId, "none">; variant?: keyof typeof btn; label?: string }) {
  const c = ctas[id];
  return <ButtonLink href={c.href} label={label ?? c.label} variant={variant} cta={id} />;
}

export function CtaRow({ route, onDark = false, buttons }: { route: RouteSpec; onDark?: boolean; buttons?: PageContent["heroButtons"] }) {
  if (buttons?.length) {
    return (
      <div className="flex flex-wrap gap-3">
        {buttons.map((b, i) => (
          <ButtonLink key={b.href} href={b.href} label={b.label} cta={b.cta} variant={i === 0 ? "primary" : onDark ? "onDark" : "secondary"} />
        ))}
      </div>
    );
  }
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
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-mist">
      {author && (
        <p data-author>
          By{" "}
          <Link href={author.profilePath ?? "/about/team/"} className="font-semibold text-white underline decoration-gold underline-offset-4">
            {author.name}
          </Link>
          , {author.jobTitle}
        </p>
      )}
      {reviewer && reviewer !== author && (
        <p>
          Reviewed by{" "}
          <Link href={reviewer.profilePath ?? "/about/team/"} className="font-semibold text-white underline decoration-gold underline-offset-4">
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
  buttons,
  overlapBelow = false,
}: {
  route: RouteSpec;
  answer: string;
  eyebrow?: string;
  guide?: GuideMeta;
  heroCtas: boolean;
  buttons?: PageContent["heroButtons"];
  overlapBelow?: boolean;
}) {
  return (
    <header className="hero-navy">
      <HeroArcs />
      <div className={`container-tp relative grid gap-6 pt-10 sm:pt-14 ${overlapBelow ? "pb-32 sm:pb-36" : "pb-14 sm:pb-20"}`}>
        <Breadcrumbs path={route.path} onDark />
        <div className="grid max-w-3xl gap-6">
          {eyebrow && <p className="eyebrow eyebrow-gold">{eyebrow}</p>}
          <h1 className="font-display display-xl text-[2.6rem] text-white sm:text-6xl">{route.h1}</h1>
          <div data-answer className="on-dark rich max-w-2xl text-lg leading-relaxed text-mist sm:text-xl">
            <Rich text={answer} />
          </div>
          {guide && <AuthorBox guide={guide} />}
          {(heroCtas || buttons?.length) && (
            <div className="pt-1">
              <CtaRow route={route} onDark buttons={buttons} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function CtaBand({ route }: { route: RouteSpec }) {
  if (route.primaryCta === "none") return null;
  const copy: Partial<Record<CtaId, { e: string; h: string; t: string }>> = {
    "statement-review": {
      e: "Free statement review",
      h: "Find out what you're really paying.",
      t: "Send your latest processing statement. We'll explain every line and give you a straight recommendation, even if it's to stay where you are.",
    },
    "talk-to-person": { e: "Talk to a real person", h: "Get a straight answer about your business.", t: "Call our Texas team. You'll get honest answers, not a sales script." },
    "partner-apply": { e: "Partner with TruePay", h: "Ready to put your relationships to work?", t: "Tell us about the business owners you serve and how you'd like to work together." },
    support: { e: "Merchant support", h: "Still need help?", t: "Call us and a US-based person will pick up and work the problem with you." },
    calculator: { e: "Calculator", h: "See your real rate.", t: "Two numbers from your statement are all you need." },
    "careers-apply": { e: "Careers", h: "Interested in joining TruePay?", t: "Tell us about yourself and the kind of work you want to do." },
  };
  const c = copy[route.primaryCta] ?? copy["statement-review"]!;
  return (
    <section aria-labelledby="cta-band" className="hero-navy">
      <HeroArcs />
      <div className="container-tp relative grid gap-6 py-16 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div className="grid gap-3">
          <p className="eyebrow eyebrow-gold">{c.e}</p>
          <h2 id="cta-band" className="font-display text-4xl text-white sm:text-5xl">
            {c.h}
          </h2>
          <p className="max-w-xl text-lg text-mist">{c.t}</p>
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
    <section aria-labelledby="related" className="bg-surface">
      <div className="container-tp py-14">
        <p className="eyebrow">Related</p>
        <h2 id="related" className="font-display mt-2 text-3xl text-ink">
          {heading}
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <li key={r.path}>
              <Link href={r.path} className="group block h-full rounded-[var(--radius-lg)] bg-paper p-6 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]">
                <span className="block text-lg font-extrabold tracking-[-0.03em] text-ink group-hover:text-navy">{r.label}</span>
                <span className="mt-1 block text-[0.95rem] text-text-muted">{r.h1}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
