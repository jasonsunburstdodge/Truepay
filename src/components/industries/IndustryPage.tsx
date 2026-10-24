import type { IndustryPageContent } from "@/content/industries/model";
import { getRoute } from "@/content/routes";
import { entity, people } from "@/content/entity";
import { JsonLd } from "@/components/json-ld";
import { webPageNode, serviceNode } from "@/lib/schema";
import { AnswerFirst, Breadcrumbs, CtaBand, QuestionSection, RelatedLinks, Sources } from "@/components/modules";
import { CtaButtons } from "@/components/modules/CtaBand";
export function IndustryPage({ content: c }: { content: IndustryPageContent }) {
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
        <aside className="card"><p className="eyebrow">Talk through the setup</p><h2>{shane.name}</h2><p>{shane.jobTitle}</p><p>{c.contact}</p><a href={shane.profilePath}>Meet Shane</a><a href="/why-truepay/#fine-print">Read TruePay’s commitments and scope</a></aside>
      </div>
      <div data-industry-copy><p className="eyebrow">From first step to final record</p><h2>{c.workflowTitle}</h2><ol className="grid three industry-workflow">
        {c.workflow.map(([title, body]) => <li className="card" key={title}><h3>{title}</h3><p>{body}</p></li>)}
      </ol></div>
    </section>
    <section className="band section"><div className="container" data-industry-copy><p className="eyebrow">Choose around the work</p><h2>{c.setupComparisonTitle}</h2>
      <div className={`grid ${c.setups.length === 3 ? "three" : "two"}`}>{c.setups.map(option => <article className="card" key={option.path}><h3><a href={option.path}>{option.title}</a></h3><p>{option.reason}</p><p className="note">{option.check}</p></article>)}</div>
    </div></section>
    <section className="container section" data-industry-copy><p className="eyebrow">The checkout conversation</p><h2>{c.pricingTitle}</h2>
      <div className="grid two"><article className="card"><h3>Membership</h3><p data-claim="cost-plus">{c.membership}</p><a href="/pricing/membership/">Explore Membership</a></article>
        <article className="card"><h3>Dual pricing</h3><p>{c.dual}</p><a href="/pricing/dual-pricing/">Explore dual pricing</a></article></div>
      <p className="industry-decision">{c.decision}</p><p>{c.fit}</p>
    </section>
    <section className="dark-band section"><div className="container" data-industry-copy><p className="eyebrow">Before the first payment</p><h2>{c.setupTitle}</h2><div className="grid three">{c.setup.map(([title,body]) => <article className="card" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
      <p className="industry-support">{c.support}</p><a href="/support/">Merchant support contacts</a><p><a href={entity.phone.href}>Call {entity.phone.display}</a></p>
    </div></section>
    <section className="container section industry-questions" data-industry-copy>{route.questions.map((q,i) => <QuestionSection key={q} question={q}><p>{c.questions[i]}</p></QuestionSection>)}
      <RelatedLinks route={route} />{c.sources?.length ? <Sources sources={c.sources} /> : null}
    </section>
    <CtaBand eyebrow="Bring your own statement" title={c.ctaTitle} primary={route.primaryCta} secondary={route.secondaryCta} />
  </>;
}
