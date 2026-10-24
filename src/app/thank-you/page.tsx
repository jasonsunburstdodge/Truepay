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
  return (
    <>
      <RouteHero
        path={route.path}
        eyebrow={received ? "Request delivered" : "Your next step"}
      >
        <p>
          {received
            ? "Your contact request was delivered to TruePay. This confirms your request only; no processing statement was uploaded."
            : "This page shows a confirmation after a contact request is delivered. If you haven’t submitted a request, start with a statement review or contact the team."}
        </p>
      </RouteHero>
      <section className="container section">
        <div className="grid two">
          <article className="card">
            <h2>Keep your statement handy.</h2>
            <p>
              Before sharing a processing statement, confirm the reviewer and
              approved intake method with the team.
            </p>
            <a href="/statement-review/">About your statement review</a>
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
