import { getRoute } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";
import { RouteHero } from "@/components/modules/RouteHero";
import {
  CtaBand,
  ProofQuote,
  QuestionSection,
  RelatedLinks,
} from "@/components/modules";
export const metadata = buildMetadata("/customer-stories/");
export default function CustomerStories() {
  const route = getRoute("/customer-stories/")!;
  return (
    <>
      <RouteHero path={route.path} eyebrow="In their own words">
        <p>
          Business owners describe the people, service and payment systems they
          have worked with at TruePay. Read their published words, with links to
          the source.
        </p>
      </RouteHero>
      <section className="container section">
        <QuestionSection question={route.questions[0]}>
          <p>
            These reviews were published on TruePay’s website. Read what business owners have to say about working with the team.
          </p>
        </QuestionSection>
        <p className="eyebrow">Service and relationships</p>
        <h2>People they can call.</h2>
        <div className="grid two">
          <ProofQuote linkToStories={false} id="e-springfield" />
          <ProofQuote linkToStories={false} id="a-monroe" />
        </div>
      </section>
      <section className="band section">
        <div className="container">
          <p className="eyebrow">Cost and value</p>
          <h2>One customer’s numbers, in context.</h2>
          <div className="grid two">
            <ProofQuote linkToStories={false} id="m-holt" />
            <ProofQuote linkToStories={false} id="b-slavens" />
          </div>
        </div>
      </section>
      <section className="container section">
        <p className="eyebrow">Setup and systems</p>
        <h2>A system at the shop.</h2>
        <ProofQuote linkToStories={false} id="r-moore" />
        <QuestionSection question={route.questions[1]}>
          <p>
            Your business has its own way of getting paid, and we’d like to hear
            about it. Give us a call to talk through your checkout, your
            questions and whether TruePay could be a good fit.
          </p>
        </QuestionSection>
        <RelatedLinks route={route} />
      </section>
      <CtaBand
        eyebrow="Use your own statement"
        title="See whether TruePay fits your business."
        primary={route.primaryCta}
        secondary="none"
      />
    </>
  );
}
