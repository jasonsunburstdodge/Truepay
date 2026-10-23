import type { MetadataRoute } from "next";
import { SITE_URL, sitemapRoutes } from "@/content/routes";
import { isProduction } from "@/lib/seo";

/** Only live, indexable routes. Update CONTENT_UPDATED when page content changes. */
const CONTENT_UPDATED = new Date("2026-10-23");

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProduction) return [];
  return sitemapRoutes().map((r) => ({ url: SITE_URL + r.path, lastModified: CONTENT_UPDATED }));
}
