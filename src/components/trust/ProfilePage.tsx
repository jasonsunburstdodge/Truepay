import { people, entity } from "@/content/entity";
import { getRoute } from "@/content/routes";
import { authoredGuides } from "@/content/authorship";
import { getClaim } from "@/lib/claims";
import { RouteHero } from "@/components/modules/RouteHero";
import { CtaBand, QuestionSection, RelatedLinks } from "@/components/modules";
export function ProfilePage({ slug }: { slug: string }) {
  const person = people.find((p) => p.slug === slug)!;
  const route = getRoute(person.profilePath!)!;
  const jon = slug === "jon-wilson";
  const guides = authoredGuides(slug);
  return (
    <>
      <RouteHero
        path={route.path}
        eyebrow={person.jobTitle}
        person={person}
        aside={
          <div className="card profile-note">
            <p className="eyebrow">Part of the TruePay team</p>
            <h2>Start with a conversation.</h2>
            <p>Tell the team what your business needs.</p>
            <a href={entity.phone.href}>{entity.phone.display}</a>
          </div>
        }
      >
        {jon ? (
          <p>
            <span data-claim="founded-2011">
              Jon Wilson founded TruePay in 2011 after watching business owners
              struggle with processing fees.
            </span>{" "}
            His work focuses on merchant pricing, statements and dual pricing.
          </p>
        ) : (
          <p>
            Shane oversees TruePay’s day-to-day operations. His work connects
            onboarding, equipment and merchant support.
          </p>
        )}
      </RouteHero>
      <section className="container section">
        <p className="eyebrow">Background</p>
        <QuestionSection question={route.questions[0]}>
          <p {...(jon ? { "data-claim": "founded-2011" } : {})}>{person.bio}</p>
          {jon && (
            <p data-claim="payments-since-2006">
              {getClaim("payments-since-2006").copy}
            </p>
          )}
        </QuestionSection>
        <div className="card profile-responsibilities">
          <h2 className="section-heading">What I handle at TruePay</h2>
          <ul>
            {person.expertise.map((topic) => (
              <li key={topic}>
                {topic.charAt(0).toUpperCase() + topic.slice(1)}
              </li>
            ))}
          </ul>
        </div>
        <QuestionSection question={route.questions[1]}>
          <p>
            {jon
              ? "Jon started TruePay after seeing business owners face hidden fees, rate increases and processors who disappeared after the sale. The company’s approach starts with understanding what a merchant needs."
              : "Shane oversees the operational work behind onboarding, equipment and support. Contact the team about your setup or an account question so they can help you find the right next step."}
          </p>
          <a href={jon ? "/about/" : "/support/"}>
            {jon ? "Read the TruePay story" : "Get merchant support"}
          </a>
        </QuestionSection>
        {guides.length > 0 && (
          <section className="profile-guides">
            <h2>Guides by {person.name}</h2>
            <ul>
              {guides.map((g) => (
                <li key={g.path}>
                  <a href={g.path}>{g.h1}</a>
                </li>
              ))}
            </ul>
          </section>
        )}
        <p>
          <a href="/about/team/">Meet the rest of the team</a>.
        </p>
        <RelatedLinks route={route} />
      </section>
      <CtaBand
        eyebrow="Talk about your business"
        title="Bring your questions to TruePay."
        primary={route.primaryCta}
        secondary="none"
      />
    </>
  );
}
