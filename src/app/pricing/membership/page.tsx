import { getRoute } from "@/content/routes";
import { commitments } from "@/content/commitments";
import { getClaim } from "@/lib/claims";
import { buildMetadata } from "@/lib/seo";
import { RouteHero } from "@/components/modules/RouteHero";
import {
  Commitment,
  CtaBand,
  ProofQuote,
  QuestionSection,
  RelatedLinks,
} from "@/components/modules";
export const metadata = buildMetadata("/pricing/membership/");
export default function Membership() {
  const route = getRoute("/pricing/membership/")!;
  return (
    <>
      <RouteHero
        path={route.path}
        eyebrow="Membership, explained"
        aside={<ProofQuote id="a-monroe" />}
      >
        <p>
          Membership separates card-network costs from TruePay’s markup. See how
          the program works and what comes with it.
        </p>
      </RouteHero>
      <section className="container section">
        <p className="eyebrow">Know what each part means</p>
        <QuestionSection question={route.questions[0]}>
          <p data-claim="cost-plus">{getClaim("cost-plus").copy}</p>
          <p>
            Interchange is the network-set cost of a card transaction. “Plus”
            means the processor’s markup is separate. The network portion can
            change even when the processor’s markup stays the same.
          </p>
          <p>
            <a href="/pricing/">
              Compare interchange-plus with flat-rate and tiered pricing
            </a>
            .
          </p>
        </QuestionSection>
      </section>
      <section className="band section">
        <div className="container">
          <p className="eyebrow">The program and its boundaries</p>
          <QuestionSection question={route.questions[1]}>
            <p>
              Explore the commitments below and{" "}
              <a href="/solutions/terminals/">
                compare terminals for your checkout
              </a>
              . The details of each promise live together in the commitment
              scope.
            </p>
            <div className="grid two">
              {commitments
                .filter((c) =>
                  [
                    "rate-lock",
                    "month-to-month",
                    "free-terminal",
                    "truecare",
                  ].includes(c.id),
                )
                .map((c) => (
                  <Commitment key={c.id} {...c} />
                ))}
            </div>
          </QuestionSection>
        </div>
      </section>
      <section className="container section">
        <QuestionSection question={route.questions[2]}>
          <p>
            The network cost and TruePay markup are parts of interchange-plus
            pricing. The full fee schedule comes with your proposal. Ask for
            every recurring and per-transaction charge, equipment condition and
            cancellation term before signing. No specific dollar fee is quoted
            here.
          </p>
          <p>
            <a href="/why-truepay/#fine-print">
              Read the commitment scope and questions to settle in writing
            </a>
            .
          </p>
        </QuestionSection>
        <QuestionSection question={route.questions[3]}>
          <div className="grid two">
            <article className="card">
              <h3>Consider Membership if…</h3>
              <p>
                You want to see network costs and processor markup separately,
                or your business is cashless and separate cash and card prices
                do not fit.
              </p>
            </article>
            <article className="card">
              <h3>Compare before switching if…</h3>
              <p>
                Your current plan already works well, especially at very low
                volume. Compare the full bill rather than assuming a different
                model will cost less.
              </p>
              <a href="/pricing/dual-pricing/">
                Compare the dual-pricing approach
              </a>
            </article>
          </div>
        </QuestionSection>
        <RelatedLinks route={route} />
      </section>
      <CtaBand
        eyebrow="Start with your statement"
        title="See the full picture before you choose."
        primary={route.primaryCta}
        secondary="talk-to-person"
      />
    </>
  );
}
