import type { Person } from "@/content/entity";
import type { ReactNode } from "react";
import { getRoute } from "@/content/routes";
import { webPageNode, serviceNode, personNode } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
import { AnswerFirst } from "./AnswerFirst";
import { Breadcrumbs } from "./Breadcrumbs";
import { CtaButtons } from "./CtaBand";
export function RouteHero({
  path,
  eyebrow,
  children,
  aside,
  person,
}: {
  path: string;
  eyebrow: string;
  children: ReactNode;
  aside?: ReactNode;
  person?: Person;
}) {
  const route = getRoute(path)!;
  return (
    <>
      <JsonLd
        nodes={[
          webPageNode(route),
          ...(person ? [personNode(person)] : []),
          ...(route.schema.includes("Service") ? [serviceNode(route)] : []),
        ]}
      />
      <section className="hero-gradient route-hero">
        <div className="container">
          <Breadcrumbs path={path} />
          <div className={aside ? "hero-grid" : "route-hero-copy"}>
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h1>{route.h1}</h1>
              <AnswerFirst>{children}</AnswerFirst>
              {route.primaryCta !== "none" && (
                <CtaButtons
                  primary={route.primaryCta}
                  secondary={route.secondaryCta ?? "none"}
                />
              )}
            </div>
            {aside && <aside className="hero-proof">{aside}</aside>}
          </div>
        </div>
      </section>
    </>
  );
}
