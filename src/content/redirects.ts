/**
 * URL migration map: every URL in gotruepay.com's live XML sitemaps
 * (page-, post- and category-sitemap.xml, fetched October 23, 2026) and where it goes.
 *
 * Wire into next.config.ts `redirects()` (permanent: true → 308, which Google
 * treats like a 301). One hop only: never redirect to a URL that redirects again.
 * Do not send everything to the homepage.
 *
 * The WP Engine dev site (truepaydev.wpenginepowered.com) is NOT migrated by
 * redirect; its content is a source (see routes.ts `sources`). It should be
 * noindexed or password-protected now so it can't compete with gotruepay.com.
 */

export type Redirect = { source: string; destination: string; note?: string };

export const redirects: Redirect[] = [
  // Company
  { source: "/about-us/", destination: "/about/" },
  { source: "/company/", destination: "/about/" },
  { source: "/reviews/", destination: "/customer-stories/" },
  { source: "/coast-to-coast-customer-network/", destination: "/service-areas/" },
  { source: "/referral/", destination: "/partners/" },
  { source: "/affiliate-program/", destination: "/partners/" },
  { source: "/employment-opportunity/", destination: "/careers/" },
  { source: "/employment-opportunity-backup/", destination: "/careers/" },
  { source: "/blog/", destination: "/resources/" },
  { source: "/category/truepay/", destination: "/resources/" },

  // Conversion
  { source: "/get-started/", destination: "/statement-review/" },
  { source: "/cost-analysis/", destination: "/statement-review/" },
  { source: "/welcome/", destination: "/support/", note: "Merchant login page. /support/ carries the verified portal link." },

  // Pricing programs
  { source: "/dual-pricing-program/", destination: "/pricing/dual-pricing/" },
  { source: "/membership-program/", destination: "/pricing/membership/" },

  // Equipment → solutions
  { source: "/equipment/", destination: "/solutions/" },
  { source: "/point-of-sale/", destination: "/solutions/point-of-sale/" },
  { source: "/pos-system/", destination: "/solutions/point-of-sale/" },
  { source: "/skytab-mobile/", destination: "/solutions/point-of-sale/" },
  { source: "/skytab-glass/", destination: "/solutions/point-of-sale/" },
  { source: "/paradise-pos/", destination: "/solutions/point-of-sale/" },
  { source: "/mobile-bytes/", destination: "/solutions/point-of-sale/" },
  { source: "/rckt-mobile-pos/", destination: "/solutions/mobile-payments/" },
  { source: "/terminals/", destination: "/solutions/terminals/" },
  { source: "/valor/", destination: "/solutions/terminals/" },
  { source: "/vl-100/", destination: "/solutions/terminals/" },
  { source: "/vl-110/", destination: "/solutions/terminals/" },
  { source: "/vl-500/", destination: "/solutions/terminals/" },
  { source: "/dejavoo-qd4/", destination: "/solutions/terminals/" },
  { source: "/clover-flex/", destination: "/solutions/terminals/" },
  { source: "/mini/", destination: "/solutions/terminals/" },
  { source: "/duo/", destination: "/solutions/terminals/" },
  { source: "/valor-pay-app/", destination: "/solutions/mobile-payments/" },
  { source: "/online-check-out/", destination: "/solutions/online-payments/" },

  // Blog posts → guides / solution pages
  { source: "/the-dual-pricing-advantage-how-it-benefits-both-businesses-and-consumers/", destination: "/resources/dual-pricing-vs-surcharging-vs-cash-discount/" },
  { source: "/discover-the-top-5-benefits-of-flat-rate-payment-processing/", destination: "/resources/flat-rate-vs-tiered-vs-interchange-plus/", note: "Old post praised flat rate; new guide is a fair comparison." },
  { source: "/the-anatomy-of-a-credit-card-payment-understanding-the-process/", destination: "/resources/how-credit-card-processing-works/" },
  { source: "/5-benefits-of-an-evm-compliant-chip-terminal/", destination: "/solutions/terminals/" },
  { source: "/the-evolution-of-pos-systems-from-cash-registers-to-smart-terminals/", destination: "/solutions/point-of-sale/" },
  { source: "/streamlining-transactions-for-smbs-a-closer-look-at-modern-pos-systems/", destination: "/solutions/point-of-sale/" },
  { source: "/the-future-of-payments-in-2026-what-merchants-really-need-to-know/", destination: "/resources/", note: "Audit first: if the post is accurate and original, migrate it to /resources/future-of-payments-2026/ instead and point this redirect there." },
];

/** Same URL in old and new site; no redirect needed (listed so QA verifies they resolve). */
export const unchangedUrls = ["/", "/contact/", "/careers/", "/privacy-policy/", "/resources/", "/solutions/"];

/**
 * Live URLs that should NOT be redirected. Owner decision required before launch.
 */
export const ownerDecisions: { url: string; recommendation: string }[] = [
  { url: "/survey-sheet/", recommendation: "Internal sales form. Move to a noindex /tools/ route or a forms tool; never in the sitemap." },
  { url: "/clover-survey-sheet-fillable-4/", recommendation: "Internal sales form. Same as above." },
  { url: "/sale-sheet/", recommendation: "Internal sales sheet. Same as above." },
  { url: "/marketing-test/", recommendation: "Test page leaking into the sitemap. Let it 404 (or return 410)." },
  { url: "/digital-marketing-services-test/", recommendation: "Test page. Let it 404/410." },
  { url: "/welcome-backup-page/", recommendation: "Backup page. Let it 404/410." },
];

/** Host-level rules (configure at DNS/hosting, not in Next.js). */
export const hostRules = [
  "Canonical host: https://gotruepay.com (no www). 301 www → apex and http → https in one hop.",
  "Trailing slash on every page URL (next.config.ts trailingSlash: true), matching the existing WordPress URLs.",
  "Preview/staging deployments send `X-Robots-Tag: noindex` and serve a Disallow-all robots.txt.",
  "truepaydev.wpenginepowered.com: set noindex or password protection now (it is currently index,follow with a self-referencing canonical).",
];
