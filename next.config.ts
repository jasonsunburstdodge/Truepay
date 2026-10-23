import type { NextConfig } from "next";
import { redirects } from "./src/content/redirects";
const nextConfig: NextConfig = {
  trailingSlash: true,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return redirects.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    }));
  },
  async headers() {
    return process.env.SITE_ENV !== "production"
      ? [
          {
            source: "/:path*",
            headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
          },
        ]
      : [];
  },
};
export default nextConfig;
