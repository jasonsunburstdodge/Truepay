import { breadcrumbTrail, getRoute, SITE_URL, type RouteSpec } from "@/content/routes";
import { entity, people, type Person } from "@/content/entity";

/* Stable @ids so every page references one entity instead of repeating facts (site-model §9). */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const personId = (p: Person) => `${SITE_URL}${p.profilePath ?? "/about/team/"}#person`;

type Node = Record<string, unknown>;

export function organizationNode(): Node {
  const founder = people.find((p) => p.slug === "jon-wilson");
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: entity.name,
    alternateName: entity.descriptor,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/images/truepay-mark.png`, width: 512, height: 512 },
    description: entity.oneLiner,
    telephone: entity.phone.e164,
    email: entity.email,
    foundingDate: String(entity.foundingYear),
    ...(founder ? { founder: { "@id": personId(founder) } } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: entity.address.streetAddress,
      addressLocality: entity.address.addressLocality,
      addressRegion: entity.address.addressRegion,
      postalCode: entity.address.postalCode,
      addressCountry: entity.address.addressCountry,
    },
    areaServed: { "@type": "Country", name: "United States" },
    sameAs: [...entity.sameAs],
    contactPoint: [
      { "@type": "ContactPoint", contactType: "sales", telephone: entity.phone.e164, areaServed: "US", availableLanguage: "English" },
      { "@type": "ContactPoint", contactType: "customer support", telephone: entity.phone.e164, email: entity.email, areaServed: "US", availableLanguage: "English" },
    ],
  };
}

export function websiteNode(): Node {
  return { "@type": "WebSite", "@id": WEBSITE_ID, url: SITE_URL, name: entity.name, publisher: { "@id": ORG_ID }, inLanguage: "en-US" };
}

const pageTypeFor = (route: RouteSpec): string => {
  if (route.schema.includes("AboutPage")) return "AboutPage";
  if (route.schema.includes("ContactPage")) return "ContactPage";
  if (route.schema.includes("CollectionPage")) return "CollectionPage";
  if (route.schema.includes("ProfilePage")) return "ProfilePage";
  return "WebPage";
};

export function breadcrumbNode(path: string): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${path}#breadcrumb`,
    itemListElement: breadcrumbTrail(path).map((r, i) => ({ "@type": "ListItem", position: i + 1, name: r.label, item: SITE_URL + r.path })),
  };
}

export function personNode(p: Person): Node {
  return {
    "@type": "Person",
    "@id": personId(p),
    name: p.name,
    ...(p.alternateName ? { alternateName: p.alternateName } : {}),
    jobTitle: p.jobTitle,
    worksFor: { "@id": ORG_ID },
    ...(p.profilePath ? { url: SITE_URL + p.profilePath } : {}),
    description: p.bio,
    knowsAbout: p.expertise,
    ...(p.sameAs?.length ? { sameAs: p.sameAs } : {}),
  };
}

export type ArticleMeta = { author: string; reviewer?: string; published: string; modified: string };

/** All JSON-LD nodes for one page (Organization + WebSite come from the layout). */
export function pageGraph(path: string, opts: { article?: ArticleMeta; profileSlug?: string } = {}): Node {
  const route = getRoute(path);
  if (!route) return {};
  const url = SITE_URL + route.path;
  const graph: Node[] = [];
  const hasCrumbs = route.schema.includes("BreadcrumbList");

  const page: Node = {
    "@type": pageTypeFor(route),
    "@id": `${url}#webpage`,
    url,
    name: route.title,
    description: route.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-US",
    ...(hasCrumbs ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };

  if (opts.profileSlug) {
    const p = people.find((x) => x.slug === opts.profileSlug);
    if (p) {
      page.mainEntity = { "@id": personId(p) };
      graph.push(personNode(p));
    }
  }

  if (opts.article) {
    const author = people.find((p) => p.slug === opts.article!.author);
    const reviewer = opts.article.reviewer ? people.find((p) => p.slug === opts.article!.reviewer) : undefined;
    if (reviewer) {
      page.reviewedBy = { "@id": personId(reviewer) };
      page.lastReviewed = opts.article.modified;
    }
    graph.push({
      "@type": "Article",
      "@id": `${url}#article`,
      headline: route.h1,
      description: route.description,
      mainEntityOfPage: { "@id": `${url}#webpage` },
      datePublished: opts.article.published,
      dateModified: opts.article.modified,
      author: author ? { "@id": personId(author), name: author.name } : { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en-US",
    });
    if (author) graph.push(personNode(author));
    if (reviewer && reviewer !== author) graph.push(personNode(reviewer));
  }

  if (route.schema.includes("Service")) {
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: route.label,
      description: route.description,
      provider: { "@id": ORG_ID },
      areaServed: { "@type": "Country", name: "United States" },
      serviceType: "Payment processing",
      url,
    });
  }

  graph.unshift(page);
  if (hasCrumbs) graph.push(breadcrumbNode(route.path));
  return { "@context": "https://schema.org", "@graph": graph };
}

export function siteGraph(): Node {
  return { "@context": "https://schema.org", "@graph": [organizationNode(), websiteNode()] };
}
