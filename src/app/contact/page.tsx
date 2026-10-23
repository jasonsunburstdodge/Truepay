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
import { LeadForm } from "@/components/lead-form";
export const metadata = buildMetadata("/contact/");
export default function Contact() {
  const route = getRoute("/contact/")!;
  return (
    <>
      <RouteHero
        path={route.path}
        eyebrow="Start with what you need"
        aside={<ProofQuote id="a-monroe" />}
      >
        <p>
          Call <a href={entity.phone.href}>{entity.phone.display}</a> or send a
          question to TruePay about pricing, equipment or a new account. TruePay
          is based in Josephine, Texas. If you already have an account and need
          help, <a href="/support/">go directly to merchant support</a> so your
          question starts in the right place.
        </p>
      </RouteHero>
      <section className="container section">
        <div className="review-grid">
          <div>
            <QuestionSection question={route.questions[0]}>
              <p data-claim="us-support">{getClaim("us-support").copy}</p>
              <p>
                Call <a href={entity.phone.href}>{entity.phone.display}</a> or
                email <a href={`mailto:${entity.email}`}>{entity.email}</a>.
                Tell us what you’re working on.
              </p>
            </QuestionSection>
            <QuestionSection question={route.questions[1]}>
              <p>
                The form confirms success only when your request has been
                delivered. If delivery fails, you’ll see a phone number to call.
              </p>
              <p data-claim="follow-up-time">
                {getClaim("follow-up-time").copy}
              </p>
            </QuestionSection>
            <QuestionSection question={route.questions[2]}>
              <address>
                {entity.address.streetAddress}
                <br />
                {entity.address.addressLocality}, {entity.address.addressRegion}{" "}
                {entity.address.postalCode}
              </address>
              <p data-claim="office-hours">{getClaim("office-hours").copy}</p>
            </QuestionSection>
            <p>
              Want to understand your processing costs?{" "}
              <a href="/statement-review/">Request a statement review</a>.
            </p>
          </div>
          <LeadForm formType="contact" />
        </div>
        <RelatedLinks route={route} />
      </section>
    </>
  );
}
