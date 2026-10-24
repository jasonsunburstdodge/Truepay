import { getRoute } from "@/content/routes";
import { solutionChooser } from "@/content/solutions";
import { getClaim } from "@/lib/claims";
import { buildMetadata } from "@/lib/seo";
import { RouteHero } from "@/components/modules/RouteHero";
import {
  CtaBand,
  ProofQuote,
  QuestionSection,
  RelatedLinks,
} from "@/components/modules";
export const metadata = buildMetadata("/solutions/");
export default function Solutions() {
  const route = getRoute("/solutions/")!;
  return (
    <>
      <RouteHero
        path={route.path}
        eyebrow="Start with how you get paid"
        aside={<ProofQuote id="r-moore" />}
      >
        <p>
          Start with where and how your customers pay. Explore terminals, POS
          systems and software around the way your business works.
        </p>
      </RouteHero>
      <section className="container section">
        <p className="eyebrow">How do you take payments?</p>
        <QuestionSection question={route.questions[0]}>
          <p>
            Choose the part of your working day you want to improve, then
            compare the equipment or software behind it.
          </p>
          <div className="grid three">
            {solutionChooser.map((c) => (
              <a className="card solution-choice" href={c.path} key={c.path}>
                <span aria-hidden="true" className="payment-icon">
                  ↗
                </span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <span>Explore this option</span>
              </a>
            ))}
          </div>
        </QuestionSection>
      </section>
      <section className="band section">
        <div className="container">
          <p className="eyebrow">A simple distinction</p>
          <h2>POS or terminal?</h2>
          <div className="grid two">
            <article className="card">
              <h3>A terminal takes the payment.</h3>
              <p>
                Start here when you need a dedicated device at the counter or a
                portable way to accept a card.
              </p>
              <a href="/solutions/terminals/">Compare card terminals</a>
            </article>
            <article className="card">
              <h3>A POS helps run the sale.</h3>
              <p>
                Compare a point-of-sale system when you also need tools for
                orders, inventory or the way your team works.
              </p>
              <a href="/solutions/point-of-sale/">Compare POS systems</a>
            </article>
          </div>
        </div>
      </section>
      <section className="container section">
        <QuestionSection question={route.questions[1]}>
          <p>
            Start with what you already use. Share the system name, version and
            current processing arrangement so TruePay can check the connection.
          </p>
          <a href="/solutions/integrations/">
            Explore keeping your current POS
          </a>
        </QuestionSection>
        <QuestionSection question={route.questions[2]}>
          <p data-claim="setup-training">{getClaim("setup-training").copy}</p>
          <p>
            Talk through the proposed setup and staff walkthrough with the team.
            If you are choosing a POS,{" "}
            <a href="/solutions/point-of-sale/">see the six-step POS process</a>
            .
          </p>
        </QuestionSection>
        <RelatedLinks route={route} />
      </section>
      <CtaBand
        eyebrow="Build around your working day"
        title="Start with a conversation about your setup."
        primary={route.primaryCta}
        secondary={route.secondaryCta}
      />
    </>
  );
}
