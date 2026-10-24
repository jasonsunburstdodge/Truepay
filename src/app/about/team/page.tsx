import { getRoute } from "@/content/routes";
import { people, entity } from "@/content/entity";
import { buildMetadata } from "@/lib/seo";
import { RouteHero } from "@/components/modules/RouteHero";
import {
  CtaBand,
  PersonCard,
  QuestionSection,
  RelatedLinks,
} from "@/components/modules";
export const metadata = buildMetadata("/about/team/");
export default function Team() {
  const route = getRoute("/about/team/")!;
  return (
    <>
      <RouteHero path={route.path} eyebrow="Names behind the service">
        <p>
          TruePay’s team works across pricing, operations, equipment and
          merchant support. Start with the people below, then contact the team
          about what your business needs.
        </p>
      </RouteHero>
      <section className="container section">
        <QuestionSection question={route.questions[0]}>
          <p>
            Jon leads the company, Shane oversees operations and the team
            brings together support and business conversations. Here is what
            each person helps with.
          </p>
        </QuestionSection>
        <div className="grid two team-grid">
          {people.map((person) => (
            <PersonCard key={person.slug} person={person} showContact={false} />
          ))}
        </div>
        <p className="contact-page-link"><a href={entity.phone.href}>Reach the team: {entity.phone.display}</a></p>
      </section>
      <section className="band section">
        <div className="container">
          <QuestionSection question={route.questions[1]}>
            <p>
              Mandie Spears leads merchant support. If you are an existing
              merchant, go directly to <a href="/support/">the support page</a>{" "}
              for the published contact channels and what to have ready.
            </p>
          </QuestionSection>
          <QuestionSection question={route.questions[2]}>
            <p>
              Call <a href={entity.phone.href}>{entity.phone.display}</a> or
              email <a href={`mailto:${entity.email}`}>{entity.email}</a>. Tell
              the team whether you need help with pricing, your setup or an
              existing account.
            </p>
          </QuestionSection>
          <RelatedLinks route={route} />
        </div>
      </section>
      <CtaBand
        eyebrow="Bring your questions"
        title="Let’s talk about your business."
        primary={route.primaryCta}
        secondary="none"
      />
    </>
  );
}
