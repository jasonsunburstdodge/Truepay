import Image from "next/image";
import { getRoute } from "@/content/routes";
import { entity } from "@/content/entity";
import { getClaim } from "@/lib/claims";
import { buildMetadata } from "@/lib/seo";
import { RouteHero } from "@/components/modules/RouteHero";
import { CtaBand, QuestionSection, RelatedLinks } from "@/components/modules";
export const metadata = buildMetadata("/service-areas/");
export default function ServiceAreas() {
  const route = getRoute("/service-areas/")!;
  return (
    <>
      <RouteHero path={route.path} eyebrow="A Texas home base">
        <p>
          <span data-claim="coverage">{getClaim("coverage").copy}</span> Tell
          the team where you operate so you can talk through the available help.
        </p>
      </RouteHero>
      <section className="container section">
        <QuestionSection question={route.questions[0]}>
          <p>
            Contact TruePay with your state, location and payment needs. The
            historical coverage information is a starting point for that
            conversation, not a current availability promise for every location.
          </p>
          <a href="/contact/">Discuss service for your location</a>
        </QuestionSection>
        <figure className="card coverage-illustration">
          <Image
            src="/images/coverage-map.svg"
            width={640}
            height={260}
            alt="Illustrative historical coverage markers, not a current service or representative map"
          />
          <figcaption>
            Illustrative only. These historical markers do not confirm current
            service, representatives or on-site support in any state.
          </figcaption>
        </figure>
      </section>
      <section className="band section">
        <div className="container">
          <QuestionSection question={route.questions[1]}>
            <p>
              Start by phone or email with the TruePay team. Ask what can be
              handled remotely and whether local or on-site help is available
              for your location and equipment.
            </p>
            <div className="grid two">
              <article className="card">
                <h3>Talk through the location.</h3>
                <p>
                  Share your address, equipment and the kind of help you need.
                  The team can discuss the available options with you.
                </p>
                <a href="/about/team/">Meet the team</a>
              </article>
              <article className="card">
                <h3>Reach TruePay.</h3>
                <p>
                  <a href={entity.phone.href}>{entity.phone.display}</a>
                  <br />
                  <a href={`mailto:${entity.email}`}>{entity.email}</a>
                </p>
                <p>
                  Existing merchant?{" "}
                  <a href="/support/">Go directly to support</a>.
                </p>
              </article>
            </div>
          </QuestionSection>
          <RelatedLinks route={route} />
        </div>
      </section>
      <CtaBand
        eyebrow="Start with your location"
        title="Tell us where your business works."
        primary={route.primaryCta}
        secondary="none"
      />
    </>
  );
}
