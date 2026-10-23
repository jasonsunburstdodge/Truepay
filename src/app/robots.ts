import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/routes";
import { isProduction } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }], sitemap: `${SITE_URL}/sitemap.xml` };
}
