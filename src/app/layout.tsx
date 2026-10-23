import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import { ConceptRibbon, JsonLd, MobileCtaBar, SiteFooter } from "@/components/site-chrome";
import { SITE_URL } from "@/content/routes";
import { siteGraph } from "@/lib/schema";
import "./globals.css";

// Self-hosted (no build-time or visitor requests to Google Fonts).
const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const fraunces = localFont({
  src: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2",
  variable: "--font-fraunces",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "TruePay",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#142b52" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} antialiased`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <JsonLd data={siteGraph()} />
        <ConceptRibbon />
        <SiteHeader />
        <main id="main" className="pb-16 sm:pb-0">
          {children}
        </main>
        <SiteFooter />
        <MobileCtaBar />
      </body>
    </html>
  );
}
