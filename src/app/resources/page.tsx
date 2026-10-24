import { getRoute } from "@/content/routes";
import { guides } from "@/content/guides";
import { buildMetadata } from "@/lib/seo";
import { RouteHero } from "@/components/modules/RouteHero";
import { CtaBand, QuestionSection } from "@/components/modules";
export const metadata = buildMetadata("/resources/");
export default function Resources() {
  const route = getRoute("/resources/")!;
  return <>
    <RouteHero path={route.path} eyebrow="Know what you’re paying for">
      <p>Start with your statement, then explore the pricing and payment questions that matter to your business. These plain-English guides help you compare your options and decide what to ask next.</p>
    </RouteHero>
    <section className="container section resource-hub">
      <QuestionSection question={route.questions[0]}>
        <p>Start with the statement guide if a fee looks unfamiliar, or the pricing comparison if you are weighing a proposal. If you are new to payments, the tap-to-deposit guide explains the people and steps involved.</p>
      </QuestionSection>
      <div className="grid two resource-grid">
        {guides.map((guide) => { const child = getRoute(`/resources/${guide.slug}/`)!; return <article key={guide.slug} className="card resource-card">
          <p className="eyebrow">{child.label}</p><h2>{child.h1}</h2><p>{child.description}</p>
          <a href={child.path}>Read the guide <span aria-hidden="true">↗</span><span className="sr-only">: {child.label}</span></a>
        </article>; })}
      </div>
    </section>
    <CtaBand eyebrow="Bring your own numbers" title="Make your next decision a clear one." primary={route.primaryCta} secondary={route.secondaryCta}>
      <p>Use your statement to compare the full cost, then ask the team about anything that still needs explaining.</p>
    </CtaBand>
  </>;
}
