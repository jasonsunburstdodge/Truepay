import type { Metadata } from "next";
import localFont from "next/font/local";
import { SITE_URL } from "@/content/routes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { JsonLd } from "@/components/json-ld";
import { organizationNode, websiteNode } from "@/lib/schema";
import { Analytics } from "@/components/analytics";
import "./globals.css";
const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <JsonLd nodes={[organizationNode(), websiteNode()]} />
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <MobileCtaBar />
        <Analytics />
      </body>
    </html>
  );
}
