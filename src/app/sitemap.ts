import type { MetadataRoute } from "next";
import { sitemapRoutes, SITE_URL } from "@/content/routes";
// Update alongside reviewed content; do not substitute the time of the request.
const contentModified: Record<string, string> = { "/": "2026-10-23" };
export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.SITE_ENV !== "production") return [];
  return sitemapRoutes().map((route) => ({
    url: SITE_URL + route.path,
    lastModified: contentModified[route.path],
  }));
}
