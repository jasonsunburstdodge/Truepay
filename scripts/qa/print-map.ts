/**
 * Regenerates docs/site-map.md from src/content/routes.ts and redirects.ts.
 * Run after any manifest change: npm run map
 */
import { writeFileSync } from "node:fs";
import { routes, primaryNav } from "../../src/content/routes";
import { redirects, ownerDecisions, hostRules } from "../../src/content/redirects";

const L: string[] = [];
L.push(
  "# TruePay site map",
  "",
  "Generated from `src/content/routes.ts` and `src/content/redirects.ts` by `npm run map`. Do not edit by hand.",
  "",
  `${routes.filter((r) => !r.path.includes("[")).length} routes plus the customer-story template · ${redirects.length} redirects from the live site.`,
  "",
  "## Navigation",
  "",
);
for (const n of primaryNav) {
  L.push(`- **${n.label}** → \`${n.path}\``);
  for (const c of n.children ?? []) L.push(`  - ${routes.find((r) => r.path === c)?.label ?? c} → \`${c}\``);
}
L.push("- Utility: Support `/support/`, Contact `/contact/`, phone 888-792-0284, button: Get my free statement review", "");

const phases = [...new Set(routes.map((r) => r.phase))].sort((a, b) => a - b);
for (const ph of phases) {
  L.push(`## Phase ${ph}`, "");
  for (const r of routes.filter((r) => r.phase === ph)) {
    L.push(`### \`${r.path}\` · ${r.label}`, "");
    L.push(`- **Template / status:** ${r.template} · ${r.status}${r.indexable ? "" : " · noindex"}`);
    L.push(`- **Title (${r.title.length}):** ${r.title}`);
    L.push(`- **Description (${r.description.length}):** ${r.description}`);
    L.push(`- **H1:** ${r.h1}`);
    L.push(`- **Intent:** ${r.intent}`);
    if (r.questions.length) L.push(`- **Questions to answer:** ${r.questions.map((q) => `“${q}”`).join(" · ")}`);
    L.push(`- **CTA:** ${r.primaryCta}${r.secondaryCta ? ` + ${r.secondaryCta}` : ""} · **Schema:** ${r.schema.join(", ")}`);
    if (r.links.length) L.push(`- **Must link to:** ${r.links.map((l) => `\`${l}\``).join(", ")}`);
    L.push(`- **Content sources:** ${r.sources.join("; ")}`);
    if (r.claims?.length) L.push(`- **Claims:** ${r.claims.join(", ")}`);
    if (r.notes) L.push(`- **Notes:** ${r.notes}`);
    L.push("");
  }
}

L.push("## Redirects from gotruepay.com", "", "| Old URL | New URL | Note |", "| --- | --- | --- |");
for (const r of redirects) L.push(`| \`${r.source}\` | \`${r.destination}\` | ${r.note ?? ""} |`);
L.push("", "## Owner decisions on remaining live URLs", "", "| URL | Recommendation |", "| --- | --- |");
for (const o of ownerDecisions) L.push(`| \`${o.url}\` | ${o.recommendation} |`);
L.push("", "## Host rules", "");
for (const h of hostRules) L.push(`- ${h}`);
L.push("");

writeFileSync("docs/site-map.md", L.join("\n"));
console.log("Wrote docs/site-map.md");
