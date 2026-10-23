import { getRoute } from "@/content/routes";
import { entity } from "@/content/entity";
import { getClaim } from "@/lib/claims";
import { buildMetadata } from "@/lib/seo";
import { RouteHero } from "@/components/modules/RouteHero";
import {
  QuestionSection,
  ProofQuote,
  RelatedLinks,
} from "@/components/modules";
import { LeadForm } from "@/components/lead-form";
export const metadata = buildMetadata("/statement-review/");
export default function StatementReview() {
  const route = getRoute("/statement-review/")!;
  return (
    <>
      <RouteHero
        path={route.path}
        eyebrow="Clarity before a decision"
        aside={<ProofQuote id="a-monroe" />}
      >
        <p>
          A TruePay statement review explains your processing fees line by line,
          calculates your effective rate and compares your options. You get an
          honest recommendation about whether a change makes sense for your
          business. Start with your contact details, then confirm how to share
          your statement with the team.
        </p>
      </RouteHero>
      <section className="container section">
        <p className="eyebrow">What you’ll get</p>
        <QuestionSection question={route.questions[0]}>
          <p>
            Your statement should help you make a decision. The review puts its
            costs into plain language.
          </p>
        </QuestionSection>
        <div className="grid two">
          {[
            [
              "Understand each fee",
              "A line-by-line explanation of the charges on your statement.",
            ],
            [
              "See your effective rate",
              "Your total processing fees as a percentage of card sales.",
            ],
            [
              "Compare your options",
              "A side-by-side look at your current costs and proposed pricing.",
            ],
          ].map(([title, body]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
          <article className="card">
            <h3>Get an honest recommendation</h3>
            <p data-claim="honest-recommendation">
              {getClaim("honest-recommendation").copy}
            </p>
          </article>
        </div>
      </section>
      <section className="band section">
        <div className="container">
          <p className="eyebrow">How it works</p>
          <h2>A clear path through your statement.</h2>
          <ol className="grid four process-list">
            {[
              [
                "Start the conversation",
                "Request a review, then confirm the approved way to share your latest statement.",
              ],
              [
                "Understand the charges",
                "Look at the fees and identify the processor’s markup.",
              ],
              [
                "Compare the options",
                "See how your numbers compare under traditional and dual pricing.",
              ],
              [
                "Make your decision",
                "Choose the option that makes sense for your business.",
              ],
            ].map(([title, body], i) => (
              <li className="card" key={title}>
                <span className="step-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="container section">
        <div className="grid two">
          <div>
            <QuestionSection question={route.questions[1]}>
              <p>
                Start with the contact form or call{" "}
                <a href={entity.phone.href}>{entity.phone.display}</a>. Ask who
                will review your statement and confirm the approved intake
                method before sending it.
              </p>
              <p>
                This form accepts contact details only. Don’t include statement
                files, card numbers, bank details or account numbers. Confirm
                who can access your statement and how it will be handled before
                sharing.
              </p>
            </QuestionSection>
            <QuestionSection question={route.questions[2]}>
              <p>
                Ask the team to confirm a delivery date before you send a
                statement. Confirm timing with the team before sharing your
                statement.
              </p>
            </QuestionSection>
            <QuestionSection question={route.questions[3]}>
              <p>
                There is no charge for the review. It is a starting point for
                comparing your options, and you decide whether to proceed.
              </p>
            </QuestionSection>
            <p>
              Looking for help with an existing TruePay account?{" "}
              <a href="/support/">Contact merchant support</a>.
            </p>
          </div>
          <ProofQuote id="m-holt" />
        </div>
      </section>
      <section id="request-review" className="hero-gradient section">
        <div className="container review-grid">
          <div>
            <p className="eyebrow">Take the next step</p>
            <h2>Get clarity about your costs.</h2>
            <p>
              Send your contact details to request a conversation. A successful
              submission confirms a request, not receipt of a statement.
            </p>
            <p>
              Prefer to talk? Call{" "}
              <a href={entity.phone.href}>{entity.phone.display}</a>.
            </p>
            <p>
              If you need equipment or another kind of help,{" "}
              <a href="/contact/">tell the team what your business needs</a>.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>
      <div className="container">
        <RelatedLinks route={route} />
      </div>
    </>
  );
}
