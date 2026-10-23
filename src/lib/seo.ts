import type { Metadata } from "next";
import { getRoute, SITE_URL, type RouteSpec } from "@/content/routes";
import { entity } from "@/content/entity";

/** Production = the live gotruepay.com deployment. Everything else is noindex. */
export const isProduction = process.env.SITE_ENV === "production";

/** Show the "concept preview" ribbon on any non-production build, or when forced. */
export const showConceptRibbon = process.env.NEXT_PUBLIC_CONCEPT === "1" || !isProduction;

export function shouldIndex(route: RouteSpec): boolean {
  return isProduction && route.indexable && (route.status === "live" || route.status === "ready");
}

export function buildMetadata(path: string): Metadata {
  const route = getRoute(path);
  if (!route) return {};
  const url = SITE_URL + route.path;
  const index = shouldIndex(route);
  return {
    title: { absolute: route.title },
    description: route.description,
    alternates: { canonical: url },
    robots: index ? { index: true, follow: true } : { index: false, follow: isProduction },
    openGraph: {
      title: route.title,
      description: route.description,
      url,
      siteName: entity.name,
      type: route.template === "guide" || route.template === "story" ? "article" : "website",
      locale: "en_US",
      images: [{ url: "/og/truepay-og.png", width: 1200, height: 630, alt: "TruePay: payments without the games" }],
    },
    twitter: { card: "summary_large_image", title: route.title, description: route.description, images: ["/og/truepay-og.png"] },
  };
}
