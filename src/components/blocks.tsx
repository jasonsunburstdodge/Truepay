import Link from "next/link";
import type { Block, Item } from "@/content/pages/types";
import { claims } from "@/content/claims";
import { people, testimonials } from "@/content/entity";
import { Rich } from "@/components/rich";
import { RateCalculator } from "@/components/rate-calculator";
import { LeadForm } from "@/components/lead-form";
import { ResidualEstimator } from "@/components/residual-estimator";
import { Diagram } from "@/components/diagrams";
import { entity } from "@/content/entity";

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function Section({ heading, id, children, band = false, wide = false }: { heading?: string; id?: string; children: React.ReactNode; band?: boolean; wide?: boolean }) {
  const hid = id ?? (heading ? slug(heading) : undefined);
  return (
    <section id={hid} aria-labelledby={heading ? `${hid}-h` : undefined} className={band ? "bg-surface" : undefined}>
      <div className={`container-tp ${band ? "py-14" : "py-10 sm:py-12"}`}>
        <div className={wide ? "" : "measure"}>
          {heading && (
            <h2 id={`${hid}-h`} className="font-display text-[1.75rem] leading-tight text-ink sm:text-3xl">
              {heading}
            </h2>
          )}
          <div className={heading ? "mt-5" : ""}>{children}</div>
        </div>
      </div>
    </section>
  );
}

function ItemCard({ item }: { item: Item }) {
  const body = (
    <>
      <h3 className="font-display text-xl text-ink">{item.title}</h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-text">
        <Rich text={item.text} />
      </p>
      {item.href && <span className="mt-3 inline-block text-sm font-semibold text-navy group-hover:underline">{item.linkText ?? "Learn more"} →</span>}
    </>
  );
  const cls = "block h-full rounded-[var(--radius-lg)] border border-border bg-paper p-6";
  return item.href ? (
    <Link href={item.href} className={`group ${cls} transition-shadow hover:shadow-[var(--shadow-card-hover)]`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" } as const;

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "prose":
      return (
        <Section heading={block.heading} id={block.id}>
          <div className="rich text-[1.05rem] leading-relaxed text-text">
            {block.paras.map((p, i) => (
              <p key={i}>
                <Rich text={p} />
              </p>
            ))}
          </div>
        </Section>
      );

    case "list": {
      const L = block.ordered ? "ol" : "ul";
      return (
        <Section heading={block.heading}>
          {block.intro && (
            <p className="rich mb-4 text-[1.05rem] leading-relaxed text-text">
              <Rich text={block.intro} />
            </p>
          )}
          <L className={`rich grid gap-2.5 pl-5 text-[1.02rem] leading-relaxed text-text ${block.ordered ? "list-decimal" : "list-disc marker:text-gold"}`}>
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
        <Section heading={block.heading} wide>
          {block.intro && (
            <p className="rich measure mb-6 text-[1.05rem] leading-relaxed text-text">
              <Rich text={block.intro} />
            </p>
          )}
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {block.steps.map((s, i) => (
              <li key={s.title} className="rounded-[var(--radius-lg)] border border-border bg-paper p-6">
                <span className="num font-display text-2xl text-gold-deep">{i + 1}</span>
                <h3 className="mt-2 font-semibold text-ink">{s.title}</h3>
                <p className="rich mt-1.5 text-[0.95rem] leading-relaxed text-text">
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
          {block.intro && (
            <p className="rich measure mb-6 text-[1.05rem] leading-relaxed text-text">
              <Rich text={block.intro} />
            </p>
          )}
          <ul className={`grid gap-4 ${cols[block.columns ?? 3]}`}>
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
        <Section heading={block.heading} band wide>
          {block.intro && (
            <p className="rich measure mb-6 text-[1.05rem] leading-relaxed text-text">
              <Rich text={block.intro} />
            </p>
          )}
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { label: "A good fit if…", items: block.good, mark: "✓", tone: "text-success" },
              { label: "Probably not the right fit if…", items: block.notFit, mark: "–", tone: "text-warn" },
            ].map((col) => (
              <div key={col.label} className="rounded-[var(--radius-lg)] border border-border bg-paper p-6">
                <h3 className="font-display text-xl text-ink">{col.label}</h3>
                <ul className="mt-4 grid gap-4">
                  {col.items.map((it) => (
                    <li key={it.title} className="flex gap-3">
                      <span aria-hidden="true" className={`mt-0.5 font-bold ${col.tone}`}>
                        {col.mark}
                      </span>
                      <span>
                        <span className="font-semibold text-ink">{it.title}</span>
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
            <p className="rich measure mt-6 text-[1.05rem] font-medium leading-relaxed text-ink">
              <Rich text={block.closing} />
            </p>
          )}
        </Section>
      );

    case "commitments":
      return (
        <Section heading={block.heading} id={block.id} wide>
          {block.intro && (
            <p className="rich measure mb-6 text-[1.05rem] leading-relaxed text-text">
              <Rich text={block.intro} />
            </p>
          )}
          <div className="grid gap-4">
            {block.items.map((it) => {
              const c = claims.find((x) => x.id === it.claim);
              return (
                <article key={it.claim} id={it.claim} className="grid gap-4 rounded-[var(--radius-lg)] border border-border bg-paper p-6 md:grid-cols-[1fr_1fr_1fr]">
                  <div>
                    <h3 className="font-display text-xl text-ink">{it.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-text" data-claim={it.claim}>
                      {c?.copy}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-success">What this covers</p>
                    <p className="rich mt-1.5 text-[0.95rem] leading-relaxed text-text">
                      <Rich text={it.covers} />
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-warn">What it doesn&apos;t</p>
                    <p className="rich mt-1.5 text-[0.95rem] leading-relaxed text-text">
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
        <Section heading={block.heading} wide>
          {block.intro && (
            <p className="rich measure mb-5 text-[1.05rem] leading-relaxed text-text">
              <Rich text={block.intro} />
            </p>
          )}
          <div className="table-wrap rounded-[var(--radius-md)] border border-border bg-paper">
            <table className="table-tp">
              <caption className="px-4 pt-3">{block.caption}</caption>
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
            <p className="rich measure mt-3 text-sm leading-relaxed text-text-muted">
              <Rich text={block.note} />
            </p>
          )}
        </Section>
      );

    case "qa": {
      const Q = block.heading ? "h3" : "h2";
      const inner = (
        <div className="grid gap-8">
          {block.items.map((it) => (
            <div key={it.q} id={slug(it.q)}>
              <Q className={Q === "h2" ? "font-display text-[1.6rem] leading-tight text-ink" : "font-display text-xl text-ink"}>{it.q}</Q>
              <div className="rich mt-2.5 grid gap-3 text-[1.03rem] leading-relaxed text-text">
                {it.a.map((p, i) => (
                  <p key={i}>
                    <Rich text={p} />
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
      return <Section heading={block.heading}>{inner}</Section>;
    }

    case "quotes": {
      const qs = block.ids.map((id) => testimonials.find((t) => t.id === id)).filter((t) => t !== undefined);
      return (
        <Section heading={block.heading} band wide>
          {block.intro && (
            <p className="rich measure mb-6 text-[1.05rem] leading-relaxed text-text">
              <Rich text={block.intro} />
            </p>
          )}
          <ul className="grid gap-4 md:grid-cols-2">
            {qs.map((t) => (
              <li key={t.id}>
                <figure className="flex h-full flex-col rounded-[var(--radius-lg)] border border-border bg-paper p-6" {...(t.id === "m-holt" ? { "data-claim": "holt-quote" } : {})}>
                  <blockquote className="flex-1 font-display text-lg leading-snug text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-4 text-sm text-text-muted">
                    <span className="font-semibold text-text">{t.name}</span>
                    {t.business ? `, ${t.business}` : ""}
                    {t.id === "m-holt" && <span className="block text-xs">One customer&apos;s experience. Results depend on your business and statement.</span>}
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
          {block.intro && (
            <p className="rich measure mb-6 text-[1.05rem] leading-relaxed text-text">
              <Rich text={block.intro} />
            </p>
          )}
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ps.map((p) => (
              <li key={p.slug} className="flex gap-4 rounded-[var(--radius-lg)] border border-border bg-paper p-5">
                <span aria-hidden="true" className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-navy font-display text-lg text-white">
                  {p.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{p.profilePath ? <Link href={p.profilePath} className="hover:underline">{p.name}</Link> : p.name}</h3>
                  <p className="text-sm text-gold-deep">{p.jobTitle}</p>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-text">{p.bio}</p>
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
          <aside className={`rounded-[var(--radius-md)] border-l-4 p-5 ${block.tone === "warn" ? "border-warn bg-gold-soft/50" : "border-gold bg-surface"}`}>
            {block.title && <p className="font-semibold text-ink">{block.title}</p>}
            <p className="rich mt-1 text-[0.98rem] leading-relaxed text-text">
              <Rich text={block.text} />
            </p>
          </aside>
        </Section>
      );

    case "sources":
      return (
        <Section heading="Sources">
          <ul data-sources className="grid gap-2 text-[0.95rem] text-text">
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
        <Section wide>
          <RateCalculator />
        </Section>
      );

    case "leadForm":
      return (
        <Section wide id={block.id ?? "review-form"}>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div className="grid gap-3">
              <h2 className="font-display text-3xl text-ink">{block.heading}</h2>
              <p className="rich text-[1.05rem] leading-relaxed text-text">
                <Rich text={block.text} />
              </p>
              <p className="text-sm text-text-muted">
                Rather talk? Call{" "}
                <a href={entity.phone.href} className="inline-link font-semibold">
                  {entity.phone.display}
                </a>
                .
              </p>
            </div>
            <LeadForm formType={block.formType} />
          </div>
        </Section>
      );

    case "estimator":
      return (
        <Section wide id="estimator">
          <ResidualEstimator />
        </Section>
      );

    case "contactCard":
      return (
        <Section wide>
          <dl className="grid gap-4 sm:grid-cols-3">
            {[
              { k: "Call or text", v: <a href={entity.phone.href} className="inline-link font-semibold">{entity.phone.display}</a> },
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
              <div key={x.k} className="rounded-[var(--radius-lg)] border border-border bg-paper p-5">
                <dt className="text-xs font-semibold uppercase tracking-wider text-text-muted">{x.k}</dt>
                <dd className="mt-1.5 text-[1.02rem] text-ink">{x.v}</dd>
              </div>
            ))}
          </dl>
        </Section>
      );

    case "diagram":
      return (
        <Section wide>
          <figure className="rounded-[var(--radius-lg)] border border-border bg-paper p-4 sm:p-6">
            <Diagram kind={block.kind} />
            <figcaption className="rich mt-3 text-sm leading-relaxed text-text-muted">
              <Rich text={block.caption} />
            </figcaption>
          </figure>
        </Section>
      );

    case "coverage":
      return (
        <Section wide>
          <figure className="rounded-[var(--radius-lg)] border border-border bg-paper p-4">
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
