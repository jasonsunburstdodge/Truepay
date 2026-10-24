import { getRoute } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";
import { RouteHero } from "@/components/modules/RouteHero";
import { QuestionSection, RelatedLinks, CtaBand } from "@/components/modules";
import { RateCalculator } from "@/components/rate-calculator";
export const metadata = buildMetadata("/effective-rate-calculator/");
export default function CalculatorPage() {
  const route = getRoute("/effective-rate-calculator/")!;
  return (
    <>
      <RouteHero path={route.path} eyebrow="Your numbers, in plain sight">
        <p>
          Your effective rate is total processing fees divided by card sales,
          multiplied by 100. Use one month’s statement to see your starting
          point.
        </p>
      </RouteHero>
      <section className="band section">
        <div className="container">
          <p className="eyebrow">Calculate your effective rate</p>
          <h2>See the whole cost.</h2>
          <RateCalculator />
        </div>
      </section>
      <section className="container section">
        <div className="grid two">
          <div>
            <QuestionSection question={route.questions[0]}>
              <p>
                An effective rate expresses total processing fees as a
                percentage of the card sales those fees relate to. It helps you
                compare your actual cost with the rate you were quoted.
              </p>
            </QuestionSection>
            <QuestionSection question={route.questions[1]}>
              <p>
                Include the total processing fees shown on your statement for
                that period. Use the card-sales total for the same period. Ask
                about any charge you cannot identify before comparing totals.
              </p>
            </QuestionSection>
          </div>
          <div>
            <QuestionSection question={route.questions[2]}>
              <p>
                A quoted rate may cover only part of what you pay. Your
                effective rate uses the complete fee total you enter. Compare
                the statement’s fee lines with your agreement to understand the
                difference.
              </p>
            </QuestionSection>
            <article className="card">
              <h3>A number is the starting point.</h3>
              <p>
                A percentage alone doesn’t show whether the service, equipment
                and agreement fit your business. A statement review puts the
                charges in context.
              </p>
              <a href="/statement-review/" data-cta="statement-review">
                Request a statement review
              </a>
            </article>
          </div>
        </div>
      </section>
      <CtaBand
        eyebrow="Turn the number into a decision"
        title="Understand what’s behind your rate."
        primary="statement-review"
        secondary="talk-to-person"
      />
      <div className="container">
        <RelatedLinks route={route} />
      </div>
    </>
  );
}
