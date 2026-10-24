/**
 * TruePay site QA — the reviewer's automated gate.
 *
 * Checks the RENDERED site (what Google and AI crawlers see) against the site
 * map (src/content/routes.ts), claims register (src/content/claims.ts),
 * entity facts (src/content/entity.ts) and redirect map (src/content/redirects.ts).
 *
 * Usage
 *   npm run qa                         build, start in production mode on :4010, audit, stop
 *   npm run qa -- --no-build           reuse the existing .next build
 *   npm run qa -- --base https://x.y   audit a running deployment instead
 *   npm run qa -- --preview            expect EVERY page to be noindex (preview/staging)
 *   npm run qa -- --phase 3            only audit routes in phases 0–3
 *
 * Output: console summary, qa-report.md and qa-report.json at the repo root.
 * Exit code 1 if any FAIL.
 */
/* eslint-disable @typescript-eslint/no-explicit-any -- JSON-LD is untyped input */
import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { writeFileSync } from "node:fs";
import * as cheerio from "cheerio";
import { routes, SITE_URL, sitemapRoutes, breadcrumbTrail, type RouteSpec } from "../../src/content/routes";
import { claims, bannedPatterns, cautionPatterns } from "../../src/content/claims";
import { redirects, unchangedUrls } from "../../src/content/redirects";
import { bodySentences, duplicateSentences } from "./duplicate-copy";
import { copyStyleViolations } from "./copy-style";
import { entity } from "../../src/content/entity";

type Level = "FAIL" | "WARN" | "INFO";
type Finding = { level: Level; route: string; check: string; message: string };

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(`--${name}`);
const opt = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

const PREVIEW = flag("preview");
const MAX_PHASE = opt("phase") ? Number(opt("phase")) : Infinity;
const PORT = 4010;
let BASE = opt("base")?.replace(/\/$/, "");

const findings: Finding[] = [];
const add = (level: Level, route: string, check: string, message: string) => findings.push({ level, route, check, message });

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[^a-z0-9$%' ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const GUIDE_LIKE = new Set(["guide"]);
const ANSWER_FIRST = new Set(["guide", "hub", "commitments", "pricing", "solution", "industry", "conversion", "tool", "area", "partner"]);

// ───────────────────────── server lifecycle ─────────────────────────
let server: ChildProcess | undefined;

async function waitFor(url: string, ms = 60_000) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    try {
      const r = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(2000) });
      if (r.status > 0) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server did not respond at ${url}`);
}

async function startServer() {
  if (BASE) return;
  if (!flag("no-build")) {
    console.log("▶ next build …");
    const b = spawnSync("npx", ["next", "build"], { stdio: "inherit", env: { ...process.env, SITE_ENV: PREVIEW ? "preview" : "production" } });
    if (b.status !== 0) {
      add("FAIL", "(site)", "build", "next build failed");
      finish();
    }
  }
  console.log(`▶ next start -p ${PORT}`);
  server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(PORT), "-H", "127.0.0.1"], {
    stdio: "ignore",
    env: { ...process.env, SITE_ENV: PREVIEW ? "preview" : "production" },
  });
  BASE = `http://127.0.0.1:${PORT}`;
  await waitFor(BASE + "/");
}

// ───────────────────────── fetch with cache ─────────────────────────
type Probe = { status: number; location?: string };
const statusCache = new Map<string, Probe>();
async function probe(path: string): Promise<Probe> {
  if (statusCache.has(path)) return statusCache.get(path)!;
  try {
    const r = await fetch(BASE + path, { redirect: "manual" });
    const res: Probe = { status: r.status, location: r.headers.get("location") ?? undefined };
    statusCache.set(path, res);
    return res;
  } catch {
    const res: Probe = { status: 0 };
    statusCache.set(path, res);
    return res;
  }
}

const toPath = (href: string): string | null => {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("sms:")) return null;
  try {
    const u = new URL(href, SITE_URL);
    const local = u.origin === SITE_URL || (BASE && u.origin === new URL(BASE).origin);
    if (!local) return null;
    return u.pathname;
  } catch {
    return null;
  }
};

// ───────────────────────── page audit ─────────────────────────
type PageData = { route: RouteSpec; title: string; description: string; mainLinks: Set<string>; sentences: string[]; industrySentences: string[]; ctaHeadlines: string[] };
const pages: PageData[] = [];
const claimUse = new Map<string, Set<string>>();

function jsonLdTypes(nodes: any[]): { types: Set<string>; flat: any[] } {
  const types = new Set<string>();
  const flat: any[] = [];
  const walk = (n: any) => {
    if (!n || typeof n !== "object") return;
    if (Array.isArray(n)) return n.forEach(walk);
    if (n["@graph"]) walk(n["@graph"]);
    if (n["@type"]) {
      flat.push(n);
      ([] as string[]).concat(n["@type"]).forEach((t) => types.add(t));
    }
    for (const [k, v] of Object.entries(n)) if (k !== "@graph" && typeof v === "object") walk(v);
  };
  nodes.forEach(walk);
  return { types, flat };
}

async function auditPage(route: RouteSpec) {
  const p = route.path;
  const res = await fetch(BASE + p, { redirect: "manual" });
  if (res.status !== 200) {
    add("FAIL", p, "http", `Expected 200, got ${res.status}${res.headers.get("location") ? " → " + res.headers.get("location") : ""}`);
    return;
  }
  const html = await res.text();
  const $ = cheerio.load(html);

  // lang
  if ($("html").attr("lang") !== "en") add("FAIL", p, "lang", '<html lang="en"> missing');

  // title
  const title = $("head title").first().text().trim();
  if (!title) add("FAIL", p, "title", "Missing <title>");
  else {
    if (title !== route.title) add("WARN", p, "title", `Differs from manifest.\n    page:     ${title}\n    manifest: ${route.title}`);
    if (title.length > 60) add("WARN", p, "title", `${title.length} chars (aim ≤ 60)`);
  }

  // description
  const description = $('meta[name="description"]').attr("content")?.trim() ?? "";
  if (!description) add("FAIL", p, "description", "Missing meta description");
  else {
    if (description !== route.description) add("WARN", p, "description", "Differs from manifest");
    if (description.length < 110 || description.length > 160) add("WARN", p, "description", `${description.length} chars (aim 110–160)`);
  }

  // H1
  const h1s = $("h1");
  if (h1s.length !== 1) add("FAIL", p, "h1", `Expected exactly one <h1>, found ${h1s.length}`);
  else if (norm(h1s.first().text()) !== norm(route.h1)) add("WARN", p, "h1", `Differs from manifest.\n    page:     ${h1s.first().text().trim()}\n    manifest: ${route.h1}`);

  // canonical
  const canonical = $('link[rel="canonical"]').attr("href");
  const expectedCanonical = SITE_URL + p;
  if (canonical !== expectedCanonical) add("FAIL", p, "canonical", `Expected ${expectedCanonical}, got ${canonical ?? "none"}`);

  // robots
  const robotsMeta = ($('meta[name="robots"]').attr("content") ?? "").toLowerCase();
  const robotsHeader = (res.headers.get("x-robots-tag") ?? "").toLowerCase();
  const noindex = robotsMeta.includes("noindex") || robotsHeader.includes("noindex");
  if (PREVIEW && !robotsHeader.includes("noindex")) add("FAIL", p, "robots", "Preview response must send X-Robots-Tag: noindex, nofollow");
  const shouldIndex = !PREVIEW && route.indexable && (route.status === "live" || route.status === "ready");
  if (shouldIndex && noindex) add("FAIL", p, "robots", "Indexable route is marked noindex");
  if (!shouldIndex && !noindex) add("FAIL", p, "robots", `Route is ${PREVIEW ? "on a preview deployment" : route.status + (route.indexable ? "" : " / non-indexable")} but has no noindex`);

  // Open Graph
  for (const prop of ["og:title", "og:description", "og:url", "og:image"]) {
    if (!$(`meta[property="${prop}"]`).attr("content")) add(prop === "og:image" ? "WARN" : "FAIL", p, "open-graph", `Missing ${prop}`);
  }

  // JSON-LD
  const raw: any[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      raw.push(JSON.parse($(el).text()));
    } catch {
      add("FAIL", p, "schema", "JSON-LD block does not parse");
    }
  });
  const { types, flat } = jsonLdTypes(raw);
  for (const t of route.schema) if (!types.has(t)) add("FAIL", p, "schema", `Missing ${t}`);
  if (types.has("AggregateRating") || types.has("Review")) add("FAIL", p, "schema", "Self-serving Review/AggregateRating markup about TruePay is not allowed");
  if (types.has("FAQPage")) add("WARN", p, "schema", "FAQPage markup is unnecessary (no rich result); keep the Q&A visible instead");
  for (const n of flat) {
    if (([] as string[]).concat(n["@type"]).some((t) => t === "Organization" || t === "Corporation")) {
      if (n.url && n.url.replace(/\/$/, "") !== SITE_URL) add("FAIL", p, "schema", `Organization.url should be ${SITE_URL}`);
      if (n.name && n.name !== entity.name) add("FAIL", p, "schema", `Organization.name "${n.name}" ≠ "${entity.name}"`);
      if (n.telephone && !String(n.telephone).replace(/\D/g, "").endsWith("8887920284")) add("FAIL", p, "schema", "Organization.telephone mismatch");
    }
    if (([] as string[]).concat(n["@type"]).includes("Article")) {
      if (!n.author) add("FAIL", p, "schema", "Article.author missing");
      if (!n.datePublished || !n.dateModified) add("FAIL", p, "schema", "Article datePublished/dateModified missing");
    }
    if (([] as string[]).concat(n["@type"]).includes("BreadcrumbList")) {
      const expected = breadcrumbTrail(p).map((r) => SITE_URL + r.path);
      const got = (n.itemListElement ?? []).map((i: any) => i.item?.["@id"] ?? i.item);
      if (JSON.stringify(expected) !== JSON.stringify(got)) add("WARN", p, "schema", `BreadcrumbList items ${JSON.stringify(got)} ≠ expected ${JSON.stringify(expected)}`);
    }
  }

  // visible breadcrumbs
  if (p !== "/" && route.template !== "legal" && $('nav[aria-label="Breadcrumb"], nav[aria-label="breadcrumb"]').length === 0)
    add("WARN", p, "breadcrumbs", "No visible breadcrumb nav");

  // images
  $("img").each((_, el) => {
    const $el = $(el);
    const src = $el.attr("src") ?? "";
    if ($el.attr("alt") === undefined) add("FAIL", p, "images", `<img> without alt: ${src.slice(0, 80)}`);
    if (!$el.attr("width") && $el.attr("data-nimg") !== "fill") add("WARN", p, "images", `<img> without width/height (CLS risk): ${src.slice(0, 80)}`);
  });

  // headings
  let last = 0;
  $("h1,h2,h3,h4,h5,h6").each((_, el) => {
    const lvl = Number(el.tagName[1]);
    const text = $(el).text().trim();
    if (last && lvl > last + 1) add("WARN", p, "headings", `Skipped heading level h${last} → h${lvl} ("${text.slice(0, 50)}")`);
    last = lvl;
    const letters = text.replace(/[^A-Za-z]/g, "");
    if (letters.length > 12 && letters === letters.toUpperCase()) add("WARN", p, "voice", `ALL-CAPS heading reads as shouting: "${text.slice(0, 60)}"`);
    if (lvl <= 3 && /\buppercase\b/.test($(el).attr("class") ?? "")) add("WARN", p, "voice", `h${lvl} styled uppercase: "${text.slice(0, 60)}" (use sentence case; uppercase only for small eyebrow labels)`);
  });

  for (const dash of copyStyleViolations(html)) add("FAIL", p, "copy-style", `AP style: long dash U+${dash.codePointAt(0)!.toString(16).toUpperCase()} in rendered main copy outside blockquotes`);

  // visible text
  $("script,style,noscript").remove();
  const bodyText = $("body").text().replace(/\s+/g, " ");
  for (const { pattern, why } of bannedPatterns) {
    const m = bodyText.match(new RegExp(pattern, "i"));
    if (m) add("FAIL", p, "claims", `Banned phrase "${m[0]}" (${why})`);
  }
  for (const { pattern, why } of cautionPatterns) {
    const m = bodyText.match(new RegExp(pattern, "gi"));
    if (m) add("WARN", p, "claims", `${m.length}× "${m[0]}": ${why}`);
  }

  // claims markers
  const used = new Set<string>();
  $("[data-claim]").each((_, el) => {
    used.add($(el).attr("data-claim")!);
  });
  for (const id of used) {
    const c = claims.find((c) => c.id === id);
    if (!c) add("FAIL", p, "claims", `Unknown data-claim="${id}"`);
    else if (c.status === "banned") add("FAIL", p, "claims", `Banned claim "${id}" rendered`);
    if (!claimUse.has(id)) claimUse.set(id, new Set());
    claimUse.get(id)!.add(p);
  }
  for (const id of route.claims ?? []) if (!used.has(id)) add("INFO", p, "claims", `Expected claim "${id}" not marked on page`);

  // answer-first block (AEO)
  if (ANSWER_FIRST.has(route.template)) {
    const answer = $("[data-answer]").first();
    if (!answer.length) add(GUIDE_LIKE.has(route.template) ? "FAIL" : "WARN", p, "aeo", "No [data-answer] answer-first summary");
    else {
      const firstH2 = $("main h2").first();
      if (firstH2.length && answer.index() > -1) {
        const order = $("main").find("[data-answer], h2").toArray();
        if (order[0] !== answer[0]) add("WARN", p, "aeo", "[data-answer] should come before the first h2");
      }
      const words = answer.text().trim().split(/\s+/).length;
      if (words > 90) add("WARN", p, "aeo", `Answer-first block is ${words} words (aim 40–80)`);
    }
  }

  // questions answered in visible text
  const normBody = norm(bodyText);
  for (const q of route.questions) {
    if (!normBody.includes(norm(q).replace(/'/g, "'"))) add("WARN", p, "aeo", `Question not found verbatim on page (use it as a heading): "${q}"`);
  }

  // E-E-A-T for guides
  if (GUIDE_LIKE.has(route.template)) {
    const author = $("[data-author]");
    if (!author.length) add("FAIL", p, "eeat", "No [data-author] byline");
    else if (!author.find('a[href*="/about/"]').length && !author.is('a[href*="/about/"]')) add("FAIL", p, "eeat", "Author byline must link to the author's /about/ profile");
    if (!$("[data-reviewed], time[datetime]").length) add("FAIL", p, "eeat", "No visible published/updated date ([data-reviewed] or <time datetime>)");
    const sources = $("[data-sources] a[href^='http']").filter((_, a) => toPath($(a).attr("href")!) === null);
    if (sources.length < 2) add("FAIL", p, "eeat", `[data-sources] needs ≥ 2 external primary sources (found ${sources.length})`);
  }

  // CTA
  if (route.primaryCta !== "none" && !$(`[data-cta="${route.primaryCta}"]`).length) add("FAIL", p, "cta", `Primary CTA [data-cta="${route.primaryCta}"] missing`);

  // NAP
  if (!bodyText.includes(entity.phone.display)) add("FAIL", p, "entity", `Phone ${entity.phone.display} not on page (footer/header)`);
  if (!bodyText.includes(entity.address.addressLocality)) add("WARN", p, "entity", "Josephine, TX address not on page (footer)");

  // links
  const $doc = cheerio.load(html);
  const mainLinks = new Set<string>();
  $doc("a[href]").each((_, a) => {
    const href = $doc(a).attr("href")!;
    const path = toPath(href);
    if ($doc(a).attr("target") === "_blank" && !/noopener/.test($doc(a).attr("rel") ?? "")) add("WARN", p, "links", `target=_blank without rel=noopener: ${href}`);
    if (!path) return;
    if (!path.endsWith("/") && !/\.[a-z0-9]+$/i.test(path)) add("WARN", p, "links", `Internal link without trailing slash: ${href}`);
    if ($doc(a).closest("main").length) mainLinks.add(path.endsWith("/") ? path : path + "/");
  });
  for (const l of route.links) if (!mainLinks.has(l)) add("WARN", p, "links", `Required contextual link to ${l} missing from <main>`);

  pages.push({ route, title, description, mainLinks, sentences: bodySentences(html), industrySentences: route.template === "industry" ? bodySentences(html, 1) : [], ctaHeadlines: $doc("[data-cta-band] h2").map((_, node) => $doc(node).text().trim()).get() });
}

// ───────────────────────── site-level checks ─────────────────────────
async function auditSite() {
  const duplicates = duplicateSentences(pages.map(p => ({path: p.route.path, sentences: p.sentences})));
  for (const duplicate of duplicates) add("FAIL", duplicate.paths[0], "duplicate-copy", `Body sentence over 8 words also appears on ${duplicate.paths.slice(1).join(", ")}: "${duplicate.sentence}"`);
  const industryPages = pages.filter(p => p.route.template === "industry");
  for (let i=0;i<industryPages.length;i++) for (let j=i+1;j<industryPages.length;j++) {
    const shared = industryPages[i].industrySentences.filter(s => industryPages[j].industrySentences.includes(s));
    if (shared.length > 1) add("FAIL", industryPages[i].route.path, "industry-originality", `Shares ${shared.length} body sentences with ${industryPages[j].route.path}`);
  }
  const ctaOwners = new Map<string,string>();
  for (const page of pages) for (const headline of page.ctaHeadlines) {
    if(ctaOwners.has(norm(headline)) && ctaOwners.get(norm(headline)) !== page.route.path) add("FAIL",page.route.path,"cta-originality",`CTA headline also appears on ${ctaOwners.get(norm(headline))}: "${headline}"`);
    else ctaOwners.set(norm(headline),page.route.path);
  }

  // all internal links resolve
  const linkTargets = new Set<string>();
  for (const pg of pages) pg.mainLinks.forEach((l) => { linkTargets.add(l); });
  for (const l of linkTargets) {
    const r = await probe(l);
    if (r.status === 404) add("FAIL", "(site)", "links", `Broken internal link → ${l} (linked from ${pages.filter((pg) => pg.mainLinks.has(l)).map((pg) => pg.route.path).join(", ")})`);
    else if (r.status >= 300 && r.status < 400) add("WARN", "(site)", "links", `Internal link goes through a redirect: ${l} → ${r.location}`);
  }

  // orphans (contextual inbound links from <main>)
  for (const pg of pages) {
    if (pg.route.path === "/" || !pg.route.indexable) continue;
    const inbound = pages.filter((o) => o !== pg && o.mainLinks.has(pg.route.path)).length;
    if (inbound === 0) add("WARN", pg.route.path, "links", "No contextual inbound links from other audited pages (nav/footer only)");
  }

  // duplicates
  const dup = (key: "title" | "description", level: Level) => {
    const seen = new Map<string, string>();
    for (const pg of pages) {
      const v = pg[key];
      if (!v) continue;
      if (seen.has(v)) add(level, pg.route.path, key, `Duplicate ${key} with ${seen.get(v)}`);
      else seen.set(v, pg.route.path);
    }
  };
  dup("title", "FAIL");
  dup("description", "WARN");

  // robots.txt
  const robots = await fetch(BASE + "/robots.txt");
  const robotsTxt = robots.ok ? await robots.text() : "";
  if (!robots.ok) add("FAIL", "/robots.txt", "robots", `robots.txt returned ${robots.status}`);
  else {
    if (!PREVIEW && !robotsTxt.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) add("FAIL", "/robots.txt", "robots", `Missing "Sitemap: ${SITE_URL}/sitemap.xml"`);
    const disallowAll = /^\s*Disallow:\s*\/\s*$/m.test(robotsTxt);
    if (!PREVIEW && disallowAll) add("FAIL", "/robots.txt", "robots", "Production robots.txt disallows everything");
    if (PREVIEW && !disallowAll) add("FAIL", "/robots.txt", "robots", "Preview robots.txt should disallow all crawling");
  }

  // sitemap.xml
  const sm = await fetch(BASE + "/sitemap.xml");
  if (!sm.ok) add("FAIL", "/sitemap.xml", "sitemap", `sitemap.xml returned ${sm.status}`);
  else {
    const xml = await sm.text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
    const expected = new Set(sitemapRoutes().map((r) => SITE_URL + r.path));
    for (const l of locs) if (!expected.has(l)) add("FAIL", "/sitemap.xml", "sitemap", `Unexpected URL (not live+indexable in manifest): ${l}`);
    for (const e of expected) if (!locs.includes(e)) add("FAIL", "/sitemap.xml", "sitemap", `Missing live URL: ${e}`);
    if (/<lastmod>/.test(xml) === false && locs.length) add("WARN", "/sitemap.xml", "sitemap", "No <lastmod> values (use truthful last-modified dates)");
  }

  // redirects
  for (const r of redirects) {
    const res = await probe(r.source);
    if (![301, 308].includes(res.status)) {
      add("FAIL", r.source, "redirects", `Expected 301/308 → ${r.destination}, got ${res.status}`);
      continue;
    }
    const loc = res.location ? new URL(res.location, BASE).pathname : "";
    if (loc !== r.destination) add("FAIL", r.source, "redirects", `Redirects to ${loc}, expected ${r.destination}`);
    const target = await probe(r.destination);
    if (target.status >= 300 && target.status < 400) add("FAIL", r.source, "redirects", `Redirect chain: ${r.destination} redirects again`);
    else if (target.status === 404) add("INFO", r.source, "redirects", `Destination ${r.destination} not built yet`);
  }
  for (const u of unchangedUrls) {
    const res = await probe(u);
    if (res.status !== 200) add(getRouteStatus(u) === "planned" ? "INFO" : "FAIL", u, "migration", `Existing live URL must keep working; got ${res.status}`);
  }

  // soft 404
  const nf = await probe("/qa-this-page-should-not-exist/");
  if (nf.status !== 404) add("FAIL", "(site)", "404", `Unknown URL returned ${nf.status} (should be 404)`);
}

const getRouteStatus = (p: string) => routes.find((r) => r.path === p)?.status;

// ───────────────────────── report ─────────────────────────
function finish(): never {
  server?.kill();
  const by = (l: Level) => findings.filter((f) => f.level === l);
  const fails = by("FAIL");
  const warns = by("WARN");
  const infos = by("INFO");

  const lines: string[] = [];
  lines.push(`# TruePay QA report`, ``, `Run: ${new Date().toISOString()} · Base: ${BASE} · Mode: ${PREVIEW ? "preview" : "production"}${Number.isFinite(MAX_PHASE) ? ` · Phases ≤ ${MAX_PHASE}` : ""}`, ``);
  lines.push(`**${fails.length} FAIL · ${warns.length} WARN · ${infos.length} INFO** across ${pages.length} audited pages.`, ``);
  lines.push(`| Route | Status | FAIL | WARN |`, `| --- | --- | ---: | ---: |`);
  const audited = routes.filter((r) => r.status !== "planned" && r.phase <= MAX_PHASE && !r.path.includes("["));
  for (const r of audited) {
    lines.push(`| ${r.path} | ${r.status} | ${fails.filter((f) => f.route === r.path).length} | ${warns.filter((f) => f.route === r.path).length} |`);
  }
  const section = (title: string, list: Finding[]) => {
    if (!list.length) return;
    lines.push(``, `## ${title}`, ``);
    const groups = new Map<string, Finding[]>();
    for (const f of list) groups.set(f.route, [...(groups.get(f.route) ?? []), f]);
    for (const [route, fs] of groups) {
      lines.push(`### ${route}`);
      for (const f of fs) lines.push(`- **${f.check}**: ${f.message.replace(/\n/g, "  \n")}`);
    }
  };
  section("Failures (must fix)", fails);
  section("Warnings (fix or justify in the PR)", warns);
  section("Info", infos);

  // claims sign-off list
  const pendingUse = [...claimUse.entries()].filter(([id]) => claims.find((c) => c.id === id && c.status !== "approved"));
  if (pendingUse.length) {
    lines.push(``, `## Claims needing TruePay sign-off before launch`, ``, `| Claim | Status | Used on | Who confirms |`, `| --- | --- | --- | --- |`);
    for (const [id, set] of pendingUse) {
      const c = claims.find((c) => c.id === id)!;
      lines.push(`| ${id} | ${c.status} | ${[...set].join(", ")} | ${c.confirm ?? ""} |`);
    }
    const guidePaths = pages.filter((page) => page.route.template === "guide").map((page) => page.route.path);
    if (guidePaths.length) lines.push(`| E-E-A-T authorship | Owner sign-off required | ${guidePaths.join(", ")} | Named author must read and approve each guide; reviewer must actually review before reviewedAt is set or Reviewed by is shown. |`);
  }

  writeFileSync("qa-report.md", lines.join("\n") + "\n");
  writeFileSync("qa-report.json", JSON.stringify({ base: BASE, preview: PREVIEW, findings }, null, 2));

  console.log(`\nQA: ${fails.length} FAIL · ${warns.length} WARN · ${infos.length} INFO  (${pages.length} pages)`);
  for (const f of fails.slice(0, 40)) console.log(`  ✖ ${f.route}  [${f.check}] ${f.message.split("\n")[0]}`);
  if (fails.length > 40) console.log(`  … ${fails.length - 40} more in qa-report.md`);
  console.log(`Full report: qa-report.md`);
  process.exit(fails.length ? 1 : 0);
}

// ───────────────────────── main ─────────────────────────
(async () => {
  try {
    await startServer();
    const targets = routes.filter((r) => r.phase <= MAX_PHASE && !r.path.includes("["));
    for (const r of targets) {
      if (r.status === "planned") {
        const res = await probe(r.path);
        if (res.status === 200) add("INFO", r.path, "manifest", "Page exists but manifest status is 'planned'; set it to 'draft'");
        continue;
      }
      await auditPage(r);
    }
    await auditSite();
  } catch (e) {
    add("FAIL", "(site)", "runner", String(e));
  }
  finish();
})();
