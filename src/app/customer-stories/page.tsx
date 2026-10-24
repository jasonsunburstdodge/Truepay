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
            These reviews were published on TruePay’s website. Each reflects one
            customer’s experience.
          </p>
        </QuestionSection>
        <p className="eyebrow">Service and relationships</p>
        <h2>People they can call.</h2>
        <div className="grid two">
          <ProofQuote id="e-springfield" />
          <ProofQuote id="a-monroe" />
        </div>
      </section>
      <section className="band section">
        <div className="container">
          <p className="eyebrow">Cost and value</p>
          <h2>One customer’s numbers, in context.</h2>
          <div className="grid two">
            <ProofQuote id="m-holt" />
            <ProofQuote id="b-slavens" />
          </div>
          <p className="contact-page-link">
            These accounts do not establish a typical outcome or a promise of
            savings. Compare your own processing statement and program terms.
          </p>
        </div>
      </section>
      <section className="container section">
        <p className="eyebrow">Setup and systems</p>
        <h2>A system at the shop.</h2>
        <ProofQuote id="r-moore" />
        <p className="contact-page-link">
          The published short quote describes the system. No separate setup
          result is supplied in that review.
        </p>
        <QuestionSection question={route.questions[1]}>
          <p>
            The published reviews here do not identify each business or
            industry. Tell TruePay about your business so you can discuss a
            relevant setup and the evidence you would like to see.
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
