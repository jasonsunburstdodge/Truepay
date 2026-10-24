import type { MetadataRoute } from "next";
import { sitemapRoutes, SITE_URL } from "@/content/routes";
// Update alongside reviewed content; do not substitute the time of the request.
const contentModified: Record<string, string> = {
  "/": "2026-10-23",
  "/statement-review/": "2026-10-23",
  "/effective-rate-calculator/": "2026-10-23",
  "/support/": "2026-10-23",
  "/contact/": "2026-10-23",
  "/why-truepay/": "2026-10-23",
  "/pricing/": "2026-10-23",
  "/pricing/membership/": "2026-10-23",
  "/pricing/dual-pricing/": "2026-10-23",
  "/solutions/": "2026-10-24",
  "/solutions/point-of-sale/": "2026-10-24",
  "/solutions/terminals/": "2026-10-24",
  "/solutions/mobile-payments/": "2026-10-24",
  "/solutions/online-payments/": "2026-10-24",
  "/solutions/integrations/": "2026-10-24",
  "/solutions/billing-software/": "2026-10-24",
  "/about/": "2026-10-24",
  "/about/team/": "2026-10-24",
  "/about/jon-wilson/": "2026-10-24",
  "/about/shane-spears/": "2026-10-24",
  "/customer-stories/": "2026-10-24",
  "/service-areas/": "2026-10-24",
  "/thank-you/": "2026-10-23",
};
export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.SITE_ENV !== "production") return [];
  return sitemapRoutes().map((route) => ({
    url: SITE_URL + route.path,
    lastModified: contentModified[route.path],
  }));
}
