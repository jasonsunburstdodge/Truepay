import type { Metadata } from "next";
import { getRoute, SITE_URL, type RouteSpec } from "@/content/routes";
export function buildMetadata(path: string): Metadata {
  const route = getRoute(path);
  if (!route) throw new Error(`Unknown route: ${path}`);
  return buildRouteMetadata(route);
}
export function buildRouteMetadata(route: RouteSpec): Metadata {
  const index =
    process.env.SITE_ENV === "production" &&
    route.indexable &&
    ["ready", "live"].includes(route.status);
  const image = {
    url: `${SITE_URL}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: route.h1,
  };
  return {
    title: route.title,
    description: route.description,
    alternates: { canonical: SITE_URL + route.path },
    robots: { index, follow: index },
    openGraph: {
      title: route.title,
      description: route.description,
      url: SITE_URL + route.path,
      siteName: "TruePay",
      type: route.schema.includes("Article") ? "article" : "website",
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
      images: [image],
    },
  };
}
