import type { IndustryPageContent } from "@/content/industries/model";
import { getRoute } from "@/content/routes";
import { entity, people } from "@/content/entity";
import { JsonLd } from "@/components/json-ld";
import { webPageNode, serviceNode } from "@/lib/schema";
import { AnswerFirst, Breadcrumbs, CtaBand, QuestionSection, RelatedLinks, Sources } from "@/components/modules";
import { CtaButtons } from "@/components/modules/CtaBand";
const industryLabels: Record<string, string[]> = {"restaurants": ["Your restaurant equipment contact", "Tabs, tables and the kitchen", "Counter service or tableside", "Menu display and the final check", "Before Friday service", "Bring the shift and statement"], "retail": ["Your retail checkout contact", "Shelf, basket and return", "Stock records and website orders", "Shelf price and card price", "Before the next checkout queue", "Bring the catalog and bill"], "salons-spas": ["Your reception payment contact", "Appointment, deposit and tip", "Reception or invoice collection", "Booking price and checkout total", "Before the next booked appointment", "Bring your appointment payment flow"], "medical-dental": ["Your front-desk payment contact", "Visit collection and later balances", "Patient checkout and office invoices", "The amount a patient sees", "Before changing patient collections", "Bring the office payment records"], "home-services": ["Your field payment contact", "Estimate, deposit and job balance", "Truck device or office invoice", "The price agreed at the estimate", "Before the next callout", "Bring the technician and invoice handoff"], "auto-services": ["Your repair-counter contact", "Repair authorization and vehicle pickup", "Service counter or repair invoice", "The total on the approved repair", "Before the keys change hands", "Bring the repair order and fees"], "professional-services": ["Your invoice workflow contact", "Engagement, retainer and receivable", "Billing tools and client payment links", "The price in the engagement", "Before sending the client invoice", "Bring the receivables workflow"], "nonprofits": ["Your donation payment contact", "Gift, campaign and treasurer", "Online giving or event collection", "Donation costs and event prices", "Before volunteers take the first payment", "Bring the campaign collection plan"]};
export function IndustryPage({ content: c }: { content: IndustryPageContent }) {
  const labels = industryLabels[c.slug];
  const route = getRoute(`/industries/${c.slug}/`)!;
  const shane = people.find(p => p.slug === "shane-spears")!;
  return <>
    <JsonLd nodes={[webPageNode(route), serviceNode(route)]} />
    <section className="hero-gradient route-hero"><div className="container">
      <Breadcrumbs path={route.path} /><div className="route-hero-copy"><p className="eyebrow">{c.eyebrow}</p><h1>{route.h1}</h1>
        <p className="industry-hero-summary">{c.hero}</p><CtaButtons primary={route.primaryCta} secondary={route.secondaryCta} />
      </div>
    </div></section>
    <section className="container section industry-intro">
      <div className="industry-intro-grid"><AnswerFirst><p>{c.answer}</p></AnswerFirst>
        <aside className="card"><h2>{labels[0]}</h2><p>{shane.name} · {shane.jobTitle}</p><p>{c.contact}</p><a href={shane.profilePath}>Meet Shane</a><a href="/why-truepay/#fine-print">Read TruePay’s commitments and scope</a></aside>
      </div>
      <div data-industry-copy><p className="eyebrow">{labels[1]}</p><h2>{c.workflowTitle}</h2><ol className="grid three industry-workflow">
        {c.workflow.map(([title, body]) => <li className="card" key={title}><h3>{title}</h3><p>{body}</p></li>)}
      </ol></div>
    </section>
    <section className="band section"><div className="container" data-industry-copy><p className="eyebrow">{labels[2]}</p><h2>{c.setupComparisonTitle}</h2>
      <div className={`grid ${c.setups.length === 3 ? "three" : "two"}`}>{c.setups.map(option => <article className="card" key={option.path}><h3><a href={option.path}>{option.title}</a></h3><p>{option.reason}</p><p className="note">{option.check}</p></article>)}</div>
    </div></section>
    <section className="container section" data-industry-copy><p className="eyebrow">{labels[3]}</p><h2>{c.pricingTitle}</h2>
      <div className="grid two"><article className="card"><h3>Membership</h3><p data-claim="cost-plus">{c.membership}</p><a href="/pricing/membership/">Explore Membership</a></article>
        <article className="card"><h3>Dual pricing</h3><p>{c.dual}</p><a href="/pricing/dual-pricing/">Explore dual pricing</a></article></div>
      <p className="industry-decision">{c.decision}</p><p>{c.fit}</p>
    </section>
    <section className="dark-band section"><div className="container" data-industry-copy><p className="eyebrow">{labels[4]}</p><h2>{c.setupTitle}</h2><div className="grid three">{c.setup.map(([title,body]) => <article className="card" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
      <p className="industry-support">{c.support}</p><a href="/support/">Merchant support contacts</a><p><a href={entity.phone.href}>Call {entity.phone.display}</a></p>
    </div></section>
    <section className="container section industry-questions" data-industry-copy>{route.questions.map((q,i) => <QuestionSection key={q} question={q}><p>{c.questions[i]}</p></QuestionSection>)}
      <RelatedLinks route={route} />{c.sources?.length ? <Sources sources={c.sources} title={`${route.label}: equipment and workflow sources`} /> : null}
    </section>
    <CtaBand eyebrow={labels[5]} title={c.ctaTitle} primary={route.primaryCta} secondary={route.secondaryCta} />
  </>;
}
