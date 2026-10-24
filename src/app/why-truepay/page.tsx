import { getRoute } from "@/content/routes";
import { commitments, dualPricingFit } from "@/content/commitments";
import { getClaim } from "@/lib/claims";
import { buildMetadata } from "@/lib/seo";
import { RouteHero } from "@/components/modules/RouteHero";
import {
  Commitment,
  CtaBand,
  FitCheck,
  QuestionSection,
  RelatedLinks,
} from "@/components/modules";
export const metadata = buildMetadata("/why-truepay/");
export default function WhyTruePay() {
  const route = getRoute("/why-truepay/")!;
  return (
    <>
      <RouteHero
        path={route.path}
        eyebrow="People behind the promise"
        aside={
          <div className="card">
            <p className="eyebrow">Read before you choose</p>
            <h2>Start with a conversation.</h2>
            <p>Let’s talk through what matters to your business.</p>
            <a href="#fine-print">Read the commitment scope</a>
          </div>
        }
      >
        <p>
          TruePay’s rate lock covers its markup and monthly fees. Card-network
          costs can still change.
        </p>
      </RouteHero>
      <section className="band section">
        <div className="container">
          <p className="eyebrow">The promises behind the service</p>
          <h2>Plain words. Clear boundaries.</h2>
          <div className="grid two">
            {commitments.map((c) => (
              <Commitment key={c.id} {...c} />
            ))}
          </div>
        </div>
      </section>
      <section id="fine-print" className="container section">
        <p className="eyebrow">The fine print, in plain sight</p>
        <h2>Know what the promise covers.</h2>
        <p>
          Ask us for the written terms. We’ll walk you through what each promise
          covers and the details for your business.
        </p>
        <dl className="scope-list">
          {commitments.map((c) => (
            <div key={c.id}>
              <dt>{c.title}</dt>
              <dd>
                <p>
                  <strong>What this covers:</strong> {c.covers}
                </p>
                <p>
                  <strong>What it doesn’t:</strong> {c.excludes}
                </p>
                {getClaim(c.id).scope && <p>{getClaim(c.id).scope}</p>}
              </dd>
            </div>
          ))}
        </dl>
        <p>
          The scope questions above are details to settle in your proposal, not
          additional benefits.
        </p>
        <QuestionSection question={route.questions[0]}>
          <p>
            The lock concerns TruePay’s own pricing. Card-network costs can
            still change. Review the exact rate-lock scope above, including
            monthly fees, and ask for written exceptions before relying on it.
          </p>
        </QuestionSection>
        <QuestionSection question={route.questions[1]}>
          <p>
            The service is month-to-month. That alone does not establish whether
            a cancellation or early termination fee applies. Ask TruePay to
            confirm those fees and any equipment return requirements in your
            written proposal.
          </p>
        </QuestionSection>
        <QuestionSection question={route.questions[2]}>
          <p>
            TrueCare concerns covered equipment while you remain a customer. Ask
            which devices and events qualify, what is excluded, which plans it
            applies to and how replacement works. Do not assume loss, damage or
            a particular replacement time is included.
          </p>
        </QuestionSection>
      </section>
      <section className="dark-band section">
        <div className="container">
          <p className="eyebrow">An honest fit</p>
          <QuestionSection question={route.questions[3]}>
            <p>
              If you need a promise of savings before anyone has read your
              statement, start with a review instead. For dual pricing in
              particular, consider how your customers pay.
            </p>
          </QuestionSection>
          <FitCheck {...dualPricingFit} />
          <p>
            <a href="/pricing/membership/">
              Compare Membership for traditional card pricing
            </a>
            .
          </p>
        </div>
      </section>
      <CtaBand
        eyebrow="Put your statement on the table"
        title="See whether switching makes sense."
        primary={route.primaryCta}
        secondary={route.secondaryCta}
      />
      <div className="container">
        <RelatedLinks route={route} />
      </div>
    </>
  );
}
