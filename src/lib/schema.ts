import { entity, people, type Person } from "@/content/entity";
import { breadcrumbTrail, SITE_URL, type RouteSpec } from "@/content/routes";
const organizationId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;
export const personId = (person: Person) =>
  `${SITE_URL}${person.profilePath ?? `/about/${person.slug}/`}#person`;
export function organizationNode() {
  const { note: _note, ...address } = entity.address;
  void _note;
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: entity.name,
    alternateName: entity.descriptor,
    url: entity.url,
    logo: SITE_URL + entity.logo.horizontal,
    telephone: entity.phone.e164,
    email: entity.email,
    address: { "@type": "PostalAddress", ...address },
    foundingDate: String(entity.foundingYear),
    founder: { "@id": personId(people[0]) },
    sameAs: entity.sameAs,
    contactPoint: ["sales", "customer support"].map((contactType) => ({
      "@type": "ContactPoint",
      contactType,
      telephone: entity.phone.e164,
      email: entity.email,
    })),
  };
}
export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: SITE_URL + "/",
    name: entity.name,
    publisher: { "@id": organizationId },
  };
}
export function webPageNode(route: RouteSpec) {
  const type =
    route.schema.find((t) =>
      [
        "WebPage",
        "AboutPage",
        "ContactPage",
        "CollectionPage",
        "ProfilePage",
      ].includes(t),
    ) ?? "WebPage";
  return {
    "@type": type,
    "@id": SITE_URL + route.path + "#webpage",
    url: SITE_URL + route.path,
    name: route.title,
    description: route.description,
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    ...(route.template === "profile"
      ? { mainEntity: { "@id": SITE_URL + route.path + "#person" } }
      : {}),
  };
}
export function breadcrumbNode(path: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbTrail(path).map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.label,
      item: SITE_URL + r.path,
    })),
  };
}
export function serviceNode(route: RouteSpec) {
  return {
    "@type": "Service",
    "@id": SITE_URL + route.path + "#service",
    name: route.h1,
    description: route.description,
    url: SITE_URL + route.path,
    provider: { "@id": organizationId },
  };
}
export function personNode(person: Person) {
  return {
    "@type": "Person",
    "@id": personId(person),
    name: person.name,
    alternateName: person.alternateName,
    jobTitle: person.jobTitle,
    description: person.bio,
    url: person.profilePath ? SITE_URL + person.profilePath : undefined,
    sameAs: person.sameAs,
    worksFor: { "@id": organizationId },
  };
}
export function articleNode(
  route: RouteSpec,
  author: Person,
  dates: { datePublished: string; dateModified: string },
) {
  return {
    "@type": "Article",
    "@id": SITE_URL + route.path + "#article",
    headline: route.h1,
    description: route.description,
    mainEntityOfPage: { "@id": SITE_URL + route.path + "#webpage" },
    author: { "@id": personId(author) },
    publisher: { "@id": organizationId },
    datePublished: dates.datePublished,
    dateModified: dates.dateModified,
  };
}
