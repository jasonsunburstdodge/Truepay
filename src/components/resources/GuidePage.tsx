import { people } from "@/content/entity";
import { getRoute } from "@/content/routes";
import type { Guide } from "@/content/guides/model";
import { JsonLd } from "@/components/json-ld";
import { articleNode, personNode, webPageNode } from "@/lib/schema";
import { AnswerFirst, AuthorBox, Breadcrumbs, QuestionSection, RelatedLinks, Sources } from "@/components/modules";
import { CtaButtons } from "@/components/modules/CtaBand";

const guideLabels: Record<string, string[]> = {"how-to-read-your-processing-statement": ["A guide to the fee lines", "Before replacing your statement", "When the current statement already makes sense.", "Use the fee-by-fee review", "Take the statement to a line-item comparison."], "flat-rate-vs-tiered-vs-interchange-plus": ["A guide to processing cost models", "Before replacing a low-volume plan", "When flat rate still fits your volume.", "Use the three-volume calculation", "Compare the full bill at your own volume."], "dual-pricing-vs-surcharging-vs-cash-discount": ["A guide to cash and card prices", "Before changing customer-facing prices", "When one displayed price suits your checkout.", "Use the dated network rules", "Check the price display before changing the receipt."], "why-credit-card-processing-fees-go-up": ["A guide to rate increases", "Before blaming every increase on markup", "When the increase comes from the card network.", "Use the old and new statements", "Separate TruePay markup from network changes."], "how-to-switch-payment-processors": ["A guide to the processor handoff", "Before choosing a switch date", "When the equipment or contract says to wait.", "Use the cancellation checklist", "Plan the last batch and the first new payment."], "how-credit-card-processing-works": ["A guide from tap to deposit", "Before changing the payment chain", "When the current route already reconciles.", "Use the payment-flow diagram", "Find the cost between the tap and deposit."]};
export function GuidePage({ guide }: { guide: Guide }) {
  const labels = guideLabels[guide.slug];
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
          <p className="eyebrow">{labels[0]}</p>
          <h1>{route.h1}</h1>
          <p className="guide-hero-summary">{guide.hero}</p>
          <CtaButtons primary={route.primaryCta} secondary="none" />
        </div>
      </div>
    </section>
    <div className="container guide-shell">
      <div className="card guide-byline">
        <AuthorBox author={author} reviewer={reviewer} reviewedAt={guide.reviewedAt} datePublished={guide.datePublished} dateModified={guide.dateModified} />
      </div>
      <article className="guide-body">
        <AnswerFirst><p>{guide.answer}</p></AnswerFirst>
        {guide.introduction}
        {guide.sections.map((section, i) => <QuestionSection key={route.questions[i]} question={route.questions[i]}>
          <p className="guide-direct">{section.answer}</p>
          {section.detail?.map((p) => <p key={p}>{p}</p>)}
          {section.extra}
        </QuestionSection>)}
        <section className="card guide-fit"><p className="eyebrow">{labels[1]}</p><h2>{labels[2]}</h2><p>{guide.fit}</p></section>
        <aside className="guide-next card">
          <p className="eyebrow">{labels[3]}</p><h2>{labels[4]}</h2>
          <p>{guide.commercial.reason}</p>
          <a href={guide.commercial.path}>{guide.commercial.text} <span aria-hidden="true">↗</span></a>
          {!primaryIsTool && <p><a data-cta="calculator" href={guide.tool}>Calculate your effective rate</a></p>}
        </aside>
        <RelatedLinks route={{ ...route, links: guide.siblings }} />
        <Sources sources={guide.sources} title={`${route.label}: primary references`} />
      </article>
    </div>
  </>;
}
