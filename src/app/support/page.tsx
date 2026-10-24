import { getRoute } from "@/content/routes";
import { entity } from "@/content/entity";
import { getClaim } from "@/lib/claims";
import { buildMetadata } from "@/lib/seo";
import { RouteHero } from "@/components/modules/RouteHero";
import {
  QuestionSection,
  RelatedLinks,
  ProofQuote,
} from "@/components/modules";
export const metadata = buildMetadata("/support/");
export default function Support() {
  const route = getRoute("/support/")!,
    portal = entity.externalLinks.merchantPortal.value as string;
  return (
    <>
      <RouteHero
        path={route.path}
        eyebrow="For existing TruePay merchants"
        aside={<ProofQuote id="e-springfield" />}
      >
        <p>
          Reach TruePay about your equipment, deposits, billing or account. Call{" "}
          <a href={entity.phone.href}>{entity.phone.display}</a> or email{" "}
          <a href={`mailto:${entity.email}`}>{entity.email}</a>.
        </p>
      </RouteHero>
      <section className="container section">
        <div className="grid two">
          <div>
            <QuestionSection question={route.questions[0]}>
              <p data-claim="us-support">{getClaim("us-support").copy}</p>
              <div className="contact-actions">
                <a
                  className="button primary"
                  data-cta="support"
                  href={entity.phone.href}
                >
                  Call {entity.phone.display}
                </a>
                <a href={`mailto:${entity.email}`}>Email {entity.email}</a>
              </div>
              <p>
                Don’t include card numbers, passwords or bank details in an
                email. Ask the team how to share account information safely.
              </p>
            </QuestionSection>
            <QuestionSection question={route.questions[1]}>
              <p>
                Call or email the team to confirm the support hours and channels
                available for your account.
              </p>
            </QuestionSection>
          </div>
          <article className="card">
            <QuestionSection question={route.questions[2]} level={2}>
              <ul>
                <li>Your business name and the best number to reach you.</li>
                <li>What you were doing when the problem started.</li>
                <li>The exact error message, if there is one.</li>
                <li>Your equipment model, if the issue involves a device.</li>
                <li>
                  When you first noticed the issue and whether it is still
                  happening.
                </li>
              </ul>
            </QuestionSection>
          </article>
        </div>
        <QuestionSection question={route.questions[3]}>
          {portal ? (
            <p>
              <a href={portal}>Open the merchant portal</a>.
            </p>
          ) : (
            <p>Call the team for your account’s verified login address.</p>
          )}
        </QuestionSection>
        <p>
          Have a question about becoming a merchant instead?{" "}
          <a href="/contact/">Contact TruePay about your business</a>.
        </p>
        <RelatedLinks route={route} />
      </section>
    </>
  );
}
