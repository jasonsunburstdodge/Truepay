import type { NextConfig } from "next";
import { redirects } from "./src/content/redirects";

const isProduction = process.env.SITE_ENV === "production";

// STATIC_EXPORT=1 builds a static concept preview (no redirects, headers or API routes).
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(staticExport ? { output: "export" as const, images: { unoptimized: true } } : { images: { formats: ["image/avif", "image/webp"] } }),
  trailingSlash: true,
  async redirects() {
    if (staticExport) return [];
    return redirects.map((r) => ({ source: r.source, destination: r.destination, permanent: true }));
  },
  async headers() {
    if (staticExport) return [];
    // Every non-production deployment (previews, staging, concept builds) stays out of search.
    return isProduction ? [] : [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
