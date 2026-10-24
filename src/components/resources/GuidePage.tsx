import { people } from "@/content/entity";
import { getRoute } from "@/content/routes";
import type { Guide } from "@/content/guides/model";
import { JsonLd } from "@/components/json-ld";
import { articleNode, personNode, webPageNode } from "@/lib/schema";
import { AnswerFirst, AuthorBox, Breadcrumbs, QuestionSection, RelatedLinks, Sources } from "@/components/modules";
import { CtaButtons } from "@/components/modules/CtaBand";

export function GuidePage({ guide }: { guide: Guide }) {
  const route = getRoute(`/resources/${guide.slug}/`)!;
  const author = people.find((p) => p.slug === guide.author)!;
  const reviewer = people.find((p) => p.slug === guide.reviewer)!;
  const primaryIsTool = route.primaryCta === "statement-review" || route.primaryCta === "calculator";
  return <>
    <JsonLd nodes={[webPageNode(route), personNode(author), ...(author.slug !== reviewer.slug ? [personNode(reviewer)] : []), articleNode(route, author, { datePublished: guide.datePublished, dateModified: guide.dateModified })]} />
    <section className="hero-gradient route-hero guide-hero">
      <div className="container">
        <Breadcrumbs path={route.path} />
        <div className="route-hero-copy">
          <p className="eyebrow">Straight answers · A TruePay guide</p>
          <h1>{route.h1}</h1>
          <AnswerFirst><p>{guide.answer}</p></AnswerFirst>
          <CtaButtons primary={route.primaryCta} secondary="none" />
        </div>
      </div>
    </section>
    <div className="container guide-shell">
      <div className="card guide-byline">
        <AuthorBox author={author} reviewer={reviewer} reviewPending datePublished={guide.datePublished} dateModified={guide.dateModified} />
        <p className="note">Draft guide · Review assigned by topic expertise.</p>
      </div>
      <article className="guide-body">
        {guide.introduction}
        {guide.sections.map((section, i) => <QuestionSection key={route.questions[i]} question={route.questions[i]}>
          <p className="guide-direct">{section.answer}</p>
          {section.detail?.map((p) => <p key={p}>{p}</p>)}
          {section.extra}
        </QuestionSection>)}
        <section className="card guide-fit"><p className="eyebrow">An honest fit</p><h2>When staying put makes sense.</h2><p>{guide.fit}</p></section>
        <aside className="guide-next card">
          <p className="eyebrow">Put it to work</p><h2>Your next step.</h2>
          <p>{guide.commercial.reason}</p>
          <a href={guide.commercial.path}>{guide.commercial.text} <span aria-hidden="true">↗</span></a>
          {!primaryIsTool && <p><a data-cta="calculator" href={guide.tool}>Calculate your effective rate</a></p>}
        </aside>
        <RelatedLinks route={{ ...route, links: guide.siblings }} />
        <Sources sources={guide.sources} />
      </article>
    </div>
  </>;
}
