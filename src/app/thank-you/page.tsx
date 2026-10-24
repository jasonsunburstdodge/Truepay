import { cookies } from "next/headers";
import { getRoute } from "@/content/routes";
import { entity } from "@/content/entity";
import { buildMetadata } from "@/lib/seo";
import { RouteHero } from "@/components/modules/RouteHero";
import { RelatedLinks } from "@/components/modules";
export const metadata = buildMetadata("/thank-you/");
export default async function ThankYou() {
  const route = getRoute("/thank-you/")!;
  const received =
    (await cookies()).get("truepay-request-received")?.value === "1";
  const requestType = (await cookies()).get("truepay-request-type")?.value;
  const opportunity = received && (requestType === "partner" || requestType === "careers");
  return (
    <>
      <RouteHero
        path={route.path}
        eyebrow={received ? "Request delivered" : "Your next step"}
      >
        <p>
          {received
            ? opportunity ? "Your introduction reached TruePay. The team has your interest, not a signed partner agreement or an accepted job application." : "Your contact request was delivered to TruePay. This confirms your request only; no processing statement was uploaded."
            : "This page shows a confirmation after a contact request is delivered. If you haven’t submitted a request, start with a statement review or contact the team."}
        </p>
      </RouteHero>
      <section className="container section">
        <div className="grid two">
          <article className="card">
            <h2>{opportunity ? "Keep your experience and questions ready." : "Keep your statement handy."}</h2>
            <p>
              {opportunity ? "Use the next conversation to discuss your work background, the owners you know or the responsibilities you want to take on." : "Before sharing a processing statement, confirm the reviewer and approved intake method with the team."}
            </p>
            {opportunity ? <a href={requestType === "partner" ? "/partners/" : "/careers/"}>Return to your opportunity page</a> : <a href="/statement-review/">About your statement review</a>}
          </article>
          <article className="card">
            <h2>Need to reach someone?</h2>
            <p>
              Call <a href={entity.phone.href}>{entity.phone.display}</a> or{" "}
              <a href="/contact/">contact TruePay</a>.
            </p>
            <p>
              Existing merchants can{" "}
              <a href="/support/">reach merchant support</a>.
            </p>
          </article>
        </div>
        <RelatedLinks route={route} />
      </section>
    </>
  );
}
