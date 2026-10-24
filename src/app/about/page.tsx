import { getRoute } from "@/content/routes";
import { entity, people } from "@/content/entity";
import { buildMetadata } from "@/lib/seo";
import { RouteHero } from "@/components/modules/RouteHero";
import {
  CtaBand,
  PersonCard,
  ProofQuote,
  QuestionSection,
  RelatedLinks,
} from "@/components/modules";
export const metadata = buildMetadata("/about/");
export default function About() {
  const route = getRoute("/about/")!,
    jon = people.find((p) => p.slug === "jon-wilson")!,
    shane = people.find((p) => p.slug === "shane-spears")!,
    tim = people.find((p) => p.slug === "tim-files")!;
  return (
    <>
      <RouteHero
        path={route.path}
        eyebrow="The people behind your payments"
        aside={<ProofQuote id="a-monroe" />}
      >
        <p>
          Jon Wilson founded TruePay and serves as CEO. Tim Files is an owner
          and investor, and Shane Spears oversees day-to-day operations.
        </p>
      </RouteHero>
      <section className="container section">
        <p className="eyebrow">Our beginning</p>
        <QuestionSection question={route.questions[1]}>
          <p data-claim="founded-2011">Jon founded TruePay in 2011 in response to the hidden fees and rate increases business owners described.</p>
          <p>
            He built TruePay around a simple idea: take care of people. The
            handshake principle means the conversation starts with what matters
            to your business.
          </p>
        </QuestionSection>
        <div className="grid two about-facts">
          <article className="card">
            <p className="eyebrow">Our starting year</p>
            <strong className="trust-number" data-claim="founded-2011">
              {entity.foundingYear}
            </strong>
            <p>{entity.descriptor}</p>
          </article>
          <article className="card">
            <p className="eyebrow">Our home base</p>
            <h2 className="section-heading">Josephine, Texas</h2>
            <p>
              {entity.address.streetAddress}
              <br />
              {entity.address.addressLocality}, {entity.address.addressRegion}{" "}
              {entity.address.postalCode}
            </p>
          </article>
        </div>
      </section>
      <section className="band section">
        <div className="container">
          <p className="eyebrow">Accountable to your business</p>
          <h2>The handshake has details behind it.</h2>
          <p className="section-intro">
            Read the promises in plain words, with their scope gathered in one
            place.
          </p>
          <p>
            <a href="/why-truepay/">See TruePay’s commitments</a> and{" "}
            <a href="/why-truepay/#fine-print">the details behind them</a>.
          </p>
          <p data-claim="honest-recommendation">
            For Jon’s team, an honest recommendation can mean telling you that your present processing arrangement is worth keeping.
          </p>
        </div>
      </section>
      <section className="container section">
        <QuestionSection question={route.questions[0]}>
          <p>
            {jon.name} is {jon.jobTitle}. {tim.name} is {tim.jobTitle}, and{" "}
            {shane.name} is {shane.jobTitle}.
          </p>
        </QuestionSection>
        <div className="grid two about-people">
          <PersonCard person={jon} showBio={false} />
          <PersonCard person={shane} showBio={false} />
        </div>
        <QuestionSection question={route.questions[2]}>
          <p>
            The team’s work includes onboarding, equipment and merchant support.
            Get to know who handles each part of that work, and use the
            published contact details when you need help.
          </p>
          <a href="/about/team/">Meet the TruePay team</a>
        </QuestionSection>
        <RelatedLinks route={route} />
      </section>
      <CtaBand
        eyebrow="Meet the team behind the fee explanation"
        title="Tell us what matters to your business."
        primary={route.primaryCta}
        secondary={route.secondaryCta}
      />
    </>
  );
}
