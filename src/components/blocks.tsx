import Link from "next/link";
import type { Block, Item } from "@/content/pages/types";
import { claims } from "@/content/claims";
import { entity, people, testimonials } from "@/content/entity";
import { Rich } from "@/components/rich";
import { RateCalculator } from "@/components/rate-calculator";
import { LeadForm } from "@/components/lead-form";
import { ResidualEstimator } from "@/components/residual-estimator";
import { Diagram } from "@/components/diagrams";
import { HeroArcs } from "@/components/page-parts";

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

type Tone = "plain" | "band" | "dark";

const FORM_EYEBROW = { "statement-review": "No cost · No obligation", contact: "Contact TruePay", partner: "Partner with TruePay", careers: "Careers" } as const;

function Section({ heading, eyebrow, id, children, tone = "plain", wide = false }: { heading?: string; eyebrow?: string; id?: string; children: React.ReactNode; tone?: Tone; wide?: boolean }) {
  const hid = id ?? (heading ? slug(heading) : undefined);
  const dark = tone === "dark";
  return (
    <section id={hid} aria-labelledby={heading ? `${hid}-h` : undefined} className={dark ? "relative overflow-hidden bg-navy-night text-white" : tone === "band" ? "bg-surface" : undefined}>
      <div className={`container-tp relative ${tone === "plain" ? "py-12 sm:py-14" : "py-16 sm:py-20"}`}>
        <div className={wide ? "" : "measure"}>
          {eyebrow && <p className={`eyebrow ${dark ? "eyebrow-gold" : ""} mb-3`}>{eyebrow}</p>}
          {heading && (
            <h2 id={`${hid}-h`} className={`font-display text-[2rem] sm:text-[2.6rem] ${dark ? "text-white" : "text-ink"}`}>
              {heading}
            </h2>
          )}
          <div className={heading ? "mt-6" : ""}>{children}</div>
        </div>
      </div>
    </section>
  );
}

const card = "rounded-[var(--radius-lg)] bg-paper shadow-[var(--shadow-card)]";
const lead = "rich measure mb-8 text-lg leading-relaxed text-text-muted";

function ItemCard({ item }: { item: Item }) {
  const body = (
    <>
      <h3 className="text-xl font-extrabold tracking-[-0.03em] text-ink">{item.title}</h3>
      <p className="rich mt-2 text-[0.98rem] leading-relaxed text-text">
        <Rich text={item.text} />
      </p>
      {item.href && <span className="mt-4 inline-block text-[0.95rem] font-bold text-navy group-hover:underline">{item.linkText ?? "Learn more"} →</span>}
    </>
  );
  return item.href ? (
    <Link href={item.href} className={`group block h-full p-7 ${card} transition-shadow hover:shadow-[var(--shadow-card-hover)]`}>
      {body}
    </Link>
  ) : (
    <div className={`h-full p-7 ${card}`}>{body}</div>
  );
}

const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" } as const;

function Intro({ text }: { text?: string }) {
  return text ? (
    <p className={lead}>
      <Rich text={text} />
    </p>
  ) : null;
}

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "prose":
      return (
        <Section heading={block.heading} id={block.id}>
          <div className="rich grid gap-4 text-[1.08rem] leading-relaxed text-text">
            {block.paras.map((p, i) => (
              <p key={i}>
                <Rich text={p} />
              </p>
            ))}
          </div>
        </Section>
      );

    case "darkProse":
      return (
        <Section heading={block.heading} eyebrow={block.eyebrow} id={block.id} tone="dark">
          <div className="on-dark rich grid gap-4 text-lg leading-relaxed text-mist">
            {block.paras.map((p, i) => (
              <p key={i}>
                <Rich text={p} />
              </p>
            ))}
          </div>
        </Section>
      );

    case "stats":
      return (
        <section id={block.id} className={block.overlap ? "relative z-10 -mt-24 sm:-mt-28" : "py-12"}>
          <div className="container-tp">
            <div className={`${card} max-w-3xl p-7 sm:p-10`}>
              {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}
              <h2 className="font-display mt-3 text-[1.9rem] text-ink sm:text-[2.4rem]">{block.heading}</h2>
              <dl className="mt-6 border-t border-border">
                {block.rows.map((r) => (
                  <div key={r.label} className="flex items-center justify-between gap-4 border-b border-border py-6 last:border-b-0" {...(r.claim ? { "data-claim": r.claim } : {})}>
                    <dt className="text-lg text-slate">{r.label}</dt>
                    <dd className="num text-5xl font-extrabold tracking-[-0.05em] text-ink sm:text-6xl">{r.value}</dd>
                  </div>
                ))}
              </dl>
              {block.note && (
                <p className="rich mt-4 text-[0.95rem] leading-relaxed text-text-muted">
                  <Rich text={block.note} />
                </p>
              )}
            </div>
          </div>
        </section>
      );

    case "list": {
      const L = block.ordered ? "ol" : "ul";
      return (
        <Section heading={block.heading}>
          <Intro text={block.intro} />
          <L className={`rich grid gap-3 pl-5 text-[1.05rem] leading-relaxed text-text ${block.ordered ? "list-decimal marker:font-bold marker:text-navy" : "list-disc marker:text-gold"}`}>
            {block.items.map((it, i) => (
              <li key={i}>
                <Rich text={it} />
              </li>
            ))}
          </L>
        </Section>
      );
    }

    case "steps":
      return (
        <Section heading={block.heading} wide tone="band">
          <Intro text={block.intro} />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {block.steps.map((s, i) => (
              <li key={s.title} className={`${card} p-7`}>
                <span className="num text-4xl font-extrabold tracking-[-0.05em] text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-extrabold tracking-[-0.02em] text-ink">{s.title}</h3>
                <p className="rich mt-1.5 text-[0.98rem] leading-relaxed text-text">
                  <Rich text={s.text} />
                </p>
              </li>
            ))}
          </ol>
        </Section>
      );

    case "cards":
      return (
        <Section heading={block.heading} id={block.id} wide>
          <Intro text={block.intro} />
          <ul className={`grid gap-5 ${cols[block.columns ?? 3]}`}>
            {block.cards.map((c) => (
              <li key={c.title}>
                <ItemCard item={c} />
              </li>
            ))}
          </ul>
        </Section>
      );

    case "fit":
      return (
        <Section heading={block.heading} eyebrow="Find your fit" tone="dark" wide>
          {block.intro && (
            <p className="on-dark rich measure mb-8 text-lg leading-relaxed text-mist">
              <Rich text={block.intro} />
            </p>
          )}
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { label: "A good fit if…", items: block.good, mark: "✓", tone: "bg-success/10 text-success" },
              { label: "Probably not the right fit if…", items: block.notFit, mark: "–", tone: "bg-warn/10 text-warn" },
            ].map((col) => (
              <div key={col.label} className={`${card} p-7`}>
                <h3 className="text-xl font-extrabold tracking-[-0.03em] text-ink">{col.label}</h3>
                <ul className="mt-5 grid gap-5">
                  {col.items.map((it) => (
                    <li key={it.title} className="flex gap-3">
                      <span aria-hidden="true" className={`mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full text-sm font-bold ${col.tone}`}>
                        {col.mark}
                      </span>
                      <span>
                        <span className="font-bold text-ink">{it.title}</span>
                        <span className="rich mt-0.5 block text-[0.95rem] leading-relaxed text-text-muted">
                          <Rich text={it.text} />
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {block.closing && (
            <p className="on-dark rich measure mt-8 text-lg font-semibold leading-relaxed text-white">
              <Rich text={block.closing} />
            </p>
          )}
        </Section>
      );

    case "commitments":
      return (
        <Section heading={block.heading} id={block.id} wide tone="band">
          <Intro text={block.intro} />
          <div className="grid gap-5">
            {block.items.map((it) => {
              const c = claims.find((x) => x.id === it.claim);
              return (
                <article key={it.claim} id={it.claim} className={`${card} grid gap-6 p-7 md:grid-cols-[1.1fr_1fr_1fr]`}>
                  <div>
                    <h3 className="text-xl font-extrabold tracking-[-0.03em] text-ink">{it.title}</h3>
                    <p className="mt-2 text-[0.98rem] leading-relaxed text-text" data-claim={it.claim}>
                      {c?.copy}
                    </p>
                  </div>
                  <div className="rounded-[var(--radius-md)] bg-surface-alt p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-success">What this covers</p>
                    <p className="rich mt-2 text-[0.95rem] leading-relaxed text-text">
                      <Rich text={it.covers} />
                    </p>
                  </div>
                  <div className="rounded-[var(--radius-md)] bg-surface-alt p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-warn">What it doesn&apos;t</p>
                    <p className="rich mt-2 text-[0.95rem] leading-relaxed text-text">
                      <Rich text={it.doesNot} />
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>
      );

    case "table":
      return (
        <Section heading={block.heading} id={block.id} wide>
          <Intro text={block.intro} />
          <div className={`table-wrap ${card}`}>
            <table className="table-tp">
              <caption className="px-5 pt-4">{block.caption}</caption>
              <thead>
                <tr>
                  {block.columns.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) =>
                      j === 0 && block.rowHeaders !== false ? (
                        <th key={j} scope="row">
                          <Rich text={cell} />
                        </th>
                      ) : (
                        <td key={j} className="rich">
                          <Rich text={cell} />
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note && (
            <p className="rich measure mt-4 text-sm leading-relaxed text-text-muted">
              <Rich text={block.note} />
            </p>
          )}
        </Section>
      );

    case "qa": {
      const Q = block.heading ? "h3" : "h2";
      return (
        <Section heading={block.heading}>
          <div className="grid gap-10">
            {block.items.map((it) => (
              <div key={it.q} id={slug(it.q)}>
                <Q className={Q === "h2" ? "font-display text-[1.75rem] text-ink sm:text-[2.1rem]" : "text-xl font-extrabold tracking-[-0.03em] text-ink"}>{it.q}</Q>
                <div className="rich mt-3 grid gap-3 text-[1.06rem] leading-relaxed text-text">
                  {it.a.map((p, i) => (
                    <p key={i}>
                      <Rich text={p} />
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      );
    }

    case "quotes": {
      const qs = block.ids.map((id) => testimonials.find((t) => t.id === id)).filter((t) => t !== undefined);
      return (
        <Section heading={block.heading} tone="band" wide>
          <Intro text={block.intro} />
          <ul className="grid gap-5 md:grid-cols-2">
            {qs.map((t) => (
              <li key={t.id}>
                <figure className={`flex h-full flex-col p-7 ${card}`} {...(t.id === "m-holt" ? { "data-claim": "holt-quote" } : {})}>
                  <span aria-hidden="true" className="text-5xl font-extrabold leading-none text-gold">
                    &ldquo;
                  </span>
                  <blockquote className="mt-1 flex-1 text-xl font-bold leading-snug tracking-[-0.02em] text-ink">{t.quote}</blockquote>
                  <figcaption className="mt-5 text-sm text-text-muted">
                    <span className="font-bold text-text">{t.name}</span>
                    {t.business ? `, ${t.business}` : ""}
                    {t.id === "m-holt" && <span className="mt-1 block text-xs">One customer&apos;s experience. Results depend on your business and statement.</span>}
                    {t.sourceUrl && (
                      <>
                        {" · "}
                        <a href={t.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-link text-xs">
                          Original review
                        </a>
                      </>
                    )}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Section>
      );
    }

    case "people": {
      const ps = block.slugs.map((s) => people.find((p) => p.slug === s)).filter((p) => p !== undefined);
      return (
        <Section heading={block.heading} wide>
          <Intro text={block.intro} />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ps.map((p) => (
              <li key={p.slug} className={`flex gap-4 p-6 ${card}`}>
                <span aria-hidden="true" className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-navy text-lg font-extrabold tracking-[-0.04em] text-gold">
                  {p.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <div>
                  <h3 className="text-lg font-extrabold tracking-[-0.03em] text-ink">{p.profilePath ? <Link href={p.profilePath} className="hover:underline">{p.name}</Link> : p.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate">{p.jobTitle}</p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-text">{p.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      );
    }

    case "callout":
      return (
        <Section>
          <aside className={`rounded-[var(--radius-md)] border-l-4 p-6 ${block.tone === "warn" ? "border-warn bg-gold-soft" : "border-gold bg-surface-alt"}`}>
            {block.title && <p className="font-extrabold tracking-[-0.02em] text-ink">{block.title}</p>}
            <p className="rich mt-1 text-[1rem] leading-relaxed text-text">
              <Rich text={block.text} />
            </p>
          </aside>
        </Section>
      );

    case "sources":
      return (
        <Section heading="Sources">
          <ul data-sources className="grid gap-2 text-[0.98rem] text-text">
            {block.items.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-link">
                  {s.title}
                </a>
                <span className="text-text-muted">, {s.publisher}</span>
              </li>
            ))}
          </ul>
        </Section>
      );

    case "calculator":
      return (
        <section id="calculator" className="bg-surface">
          <div className="container-tp py-14 sm:py-16">
            <RateCalculator />
          </div>
        </section>
      );

    case "leadForm":
      return (
        <section id={block.id ?? "review-form"} className="relative overflow-hidden bg-navy-night">
          <HeroArcs />
          <div className="container-tp relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:items-start">
            <div className="grid gap-4">
              <p className="eyebrow eyebrow-gold">{FORM_EYEBROW[block.formType]}</p>
              <h2 className="font-display text-4xl text-white sm:text-5xl">{block.heading}</h2>
              <p className="on-dark rich text-lg leading-relaxed text-mist">
                <Rich text={block.text} />
              </p>
              <p className="text-[0.95rem] text-mist">
                Rather talk? Call{" "}
                <a href={entity.phone.href} className="font-bold text-white underline decoration-gold underline-offset-4">
                  {entity.phone.display}
                </a>
                .
              </p>
            </div>
            <LeadForm formType={block.formType} />
          </div>
        </section>
      );

    case "estimator":
      return (
        <section id="estimator" className="bg-surface">
          <div className="container-tp py-14 sm:py-16">
            <ResidualEstimator />
          </div>
        </section>
      );

    case "contactCard":
      return (
        <Section wide>
          <dl className="grid gap-5 sm:grid-cols-3">
            {[
              { k: "Call or text", v: <a href={entity.phone.href} className="text-2xl font-extrabold tracking-[-0.03em] text-navy">{entity.phone.display}</a> },
              { k: "Email", v: <a href={`mailto:${entity.email}`} className="inline-link">{entity.email}</a> },
              {
                k: "Head office",
                v: (
                  <address className="not-italic">
                    {entity.address.streetAddress}, {entity.address.addressLocality}, {entity.address.addressRegion} {entity.address.postalCode}
                  </address>
                ),
              },
            ].map((x) => (
              <div key={x.k} className={`p-6 ${card}`}>
                <dt className="eyebrow">{x.k}</dt>
                <dd className="mt-2 text-[1.02rem] text-ink">{x.v}</dd>
              </div>
            ))}
          </dl>
        </Section>
      );

    case "diagram":
      return (
        <Section wide>
          <figure className={`p-5 sm:p-7 ${card}`}>
            <Diagram kind={block.kind} />
            <figcaption className="rich mt-4 text-sm leading-relaxed text-text-muted">
              <Rich text={block.caption} />
            </figcaption>
          </figure>
        </Section>
      );

    case "coverage":
      return (
        <Section wide>
          <figure className={`p-5 ${card}`}>
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, nothing to optimize */}
            <img src="/images/coverage-map.svg" alt="Illustrative map of TruePay's merchant coverage, concentrated in Texas and Oklahoma with customers on both coasts" width={640} height={260} className="h-auto w-full" loading="lazy" />
            <figcaption className="mt-2 text-sm text-text-muted">Illustrative, not to scale. Ask us about service in your state.</figcaption>
          </figure>
        </Section>
      );

    case "storyIndex":
      return null;
  }
}
