import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/routes";
export const dynamic = "force-dynamic";
export default function robots(): MetadataRoute.Robots {
  return process.env.SITE_ENV === "production"
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${SITE_URL}/sitemap.xml`,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
