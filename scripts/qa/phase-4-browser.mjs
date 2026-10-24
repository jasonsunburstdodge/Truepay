import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
import { routes, SITE_URL } from "../../src/content/routes.ts";
import { people, testimonials } from "../../src/content/entity.ts";
import { redirects } from "../../src/content/redirects.ts";
import { publishedStories } from "../../src/content/stories.ts";
const dir = "docs/qa/phase-4";
mkdirSync(dir, { recursive: true });
const built = routes.filter(
    (r) => r.status !== "planned" && r.phase <= 4 && !r.path.includes("["),
  ),
  fresh = built.filter((r) => r.phase === 4);
const base = "http://127.0.0.1:4034",
  env = { ...process.env, SITE_ENV: "production" };
delete env.LEAD_WEBHOOK_URL;
const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "-p", "4034", "-H", "127.0.0.1"],
  { env, stdio: "ignore" },
);
let browser;
const errors = [],
  records = [],
  inbound = new Map(),
  schemaResults = [],
  redirectResults = [];
try {
  let ready = false;
  for (let i = 0; i < 80; i++) {
    try {
      if ((await fetch(base)).ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  assert.ok(ready);
  browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });
  const page = await browser.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of built) {
      assert.equal((await page.goto(base + route.path)).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.title(), route.title);
      assert.equal(await page.locator("h1").innerText(), route.h1);
      assert.equal(await page.locator("h1 + [data-answer]").count(), 1);
      assert.match(
        await page.locator('meta[name="robots"]').getAttribute("content"),
        /noindex/,
      );
      const answer = await page.locator("[data-answer]").innerText();
      const sentences = [
        ...new Intl.Segmenter("en-US", { granularity: "sentence" }).segment(
          answer,
        ),
      ].filter((s) => s.segment.trim());
      assert.equal(sentences.length, 2, route.path + " two hero sentences");
      assert.ok(answer.split(/\s+/).length <= 44, route.path + " short hero");
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      );
      assert.equal(overflow, false, route.path + " overflow " + width);
      const required = route.links.filter((p) =>
          built.some((r) => r.path === p),
        ),
        actual = await page
          .locator("main a")
          .evaluateAll((a) =>
            a.map((el) => el.getAttribute("href").split("#")[0]),
          );
      for (const link of required)
        assert.ok(actual.includes(link), route.path + " missing " + link);
      assert.deepEqual(
        await page
          .locator(".related-card")
          .evaluateAll((a) => a.map((el) => el.getAttribute("href"))),
        required,
      );
      if (width === 1440)
        for (const href of new Set(actual))
          inbound.set(href, (inbound.get(href) || 0) + 1);
      const sizes = await page
        .locator(".question > h2")
        .evaluateAll((h) =>
          h.map((e) => parseFloat(getComputedStyle(e).fontSize)),
        );
      assert.ok(sizes.every((n) => n >= 32 && n <= 40));
      const graph = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((s) =>
          s.flatMap((el) => JSON.parse(el.textContent)["@graph"]),
        );
      assert.ok(
        !graph.some((n) =>
          ["Review", "AggregateRating", "FAQPage"].includes(n["@type"]),
        ),
      );
      if (route.path === "/about/team/") {
        assert.deepEqual(
          await page.locator(".team-grid .person h3").allTextContents(),
          people.map((p) => p.name),
        );
        assert.equal(
          await page.locator(".team-grid .person img").count(),
          people.filter((p) => p.image).length,
        );
        assert.equal(
          await page.locator(".team-grid .person-rule").count(),
          people.filter((p) => !p.image).length,
        );
      }
      if (route.template === "profile") {
        const person = people.find((p) => p.profilePath === route.path),
          node = graph.find(
            (n) => n["@type"] === "Person" && n.name === person.name,
          ),
          profile = graph.find((n) => n["@type"] === "ProfilePage");
        assert.ok(node && profile);
        assert.equal(node.jobTitle, person.jobTitle);
        assert.deepEqual(node.worksFor, { "@id": SITE_URL + "/#organization" });
        assert.equal(profile.mainEntity["@id"], node["@id"]);
        assert.equal(node.alternateName, person.alternateName);
        assert.equal(node.sameAs, person.sameAs);
        if (width === 1440) {
          const payload = { "@context": "https://schema.org", "@graph": graph };
          writeFileSync(
            `${dir}/${person.slug}-rendered.jsonld`,
            JSON.stringify(payload, null, 2) + "\n",
          );
          writeFileSync(
            `${dir}/${person.slug}-validator-input.html`,
            `<!doctype html><html><head><title>${route.title}</title><script type="application/ld+json">${JSON.stringify(payload)}</script></head><body><h1>${person.name}</h1><p>${person.jobTitle}</p></body></html>`,
          );
          schemaResults.push({
            path: route.path,
            Person: node,
            ProfilePage: profile,
            checks:
              "PASS: parsed actual rendered JSON-LD, entity match, worksFor, profile mainEntity binding, no fabricated sameAs",
          });
        }
      }
      if (route.path === "/customer-stories/") {
        const quotes = await page
          .locator("main blockquote p")
          .allTextContents();
        assert.equal(quotes.length, testimonials.length);
        for (const t of testimonials)
          assert.ok(quotes.includes(t.quote), "verbatim " + t.id);
        assert.equal(
          await page.locator('main [data-claim="holt-quote"]').count(),
          1,
        );
        assert.equal(
          await page
            .locator('main a[href*="web.archive.org/web/20260413133352/"]')
            .count(),
          5,
        );
        assert.equal(
          await page.locator('main a[href*="google.com/maps"]').count(),
          0,
        );
      }
      if (route.path === "/service-areas/") {
        assert.ok(
          (
            await page.locator(".coverage-illustration figcaption").innerText()
          ).includes("Illustrative only"),
        );
        assert.match(
          await page.locator(".coverage-illustration img").getAttribute("alt"),
          /not a current service/,
        );
        assert.equal(
          await page
            .locator(".coverage-illustration img")
            .getAttribute("width"),
          "640",
        );
      }
      if (
        route.path.startsWith("/solutions/") &&
        route.path !== "/solutions/"
      ) {
        assert.equal(await page.locator(".availability-note").count(), 0);
        assert.ok(
          (await page.locator("caption").innerText()).includes(
            "Ask us to confirm availability for your business.",
          ),
        );
        assert.equal(
          await page
            .locator(
              'main a[href="https://gotruepay.com/skytab-mobile/"],main a[href="https://gotruepay.com/skytab-glass/"],main a[href="https://gotruepay.com/valor-pay-app/"]',
            )
            .count(),
          0,
        );
      }
      if (fresh.includes(route))
        await page.screenshot({
          path: `${dir}/${route.path.slice(1, -1).replaceAll("/", "-")}-${width}.jpg`,
          fullPage: true,
          type: "jpeg",
          quality: 62,
        });
      records.push({
        path: route.path,
        width,
        overflow,
        answer,
        requiredLinks: required,
      });
    }
    await page.goto(base + "/about/");
    if (width === 1440) {
      const parent = page
        .locator(".desktop-nav > div")
        .filter({ has: page.locator('a[href="/about/"]') })
        .first();
      const before = await page.locator(".site-header").boundingBox();
      await parent.locator(":scope > a").focus();
      await page.keyboard.press("Tab");
      assert.equal(
        await page.locator(":focus").getAttribute("href"),
        "/about/team/",
      );
      assert.ok(await parent.locator(".nav-children").isVisible());
      assert.equal(
        (await page.locator(".site-header").boundingBox()).height,
        before.height,
      );
    } else {
      const button = page.getByRole("button", { name: /Menu/ });
      await button.click();
      assert.ok(
        await page
          .locator('#mobile-navigation a[href="/about/team/"]')
          .isVisible(),
      );
      await page.keyboard.press("Escape");
      assert.equal(await button.getAttribute("aria-expanded"), "false");
    }
  }
  for (const route of fresh)
    assert.ok(inbound.get(route.path) > 0, "no orphan " + route.path);
  assert.equal(publishedStories().length, 0);
  for (const path of [
    "/customer-stories/not-published/",
    "/customer-stories/m-holt/",
  ]) {
    assert.equal((await page.goto(base + path)).status(), 404);
    assert.ok(!(await page.locator("body").innerText()).includes("{Business}"));
  }
  for (const r of redirects.filter((r) =>
    ["/about/", "/customer-stories/", "/service-areas/"].includes(
      r.destination,
    ),
  )) {
    const response = await fetch(base + r.source, { redirect: "manual" });
    assert.equal(response.status, 308);
    assert.equal((await page.goto(base + r.source)).status(), 200);
    redirectResults.push({ ...r, status: 308, destinationStatus: 200 });
  }
  const plain = await browser.newContext({ javaScriptEnabled: false });
  const ssr = await plain.newPage();
  for (const route of fresh) {
    await ssr.goto(base + route.path);
    for (const q of route.questions)
      assert.ok((await ssr.locator("main").innerText()).includes(q));
    assert.equal(await ssr.locator("h1 + [data-answer]").count(), 1);
    if (route.path === "/about/")
      assert.equal(await ssr.locator(".trust-number").innerText(), "2011");
  }
  await plain.close();
  assert.deepEqual(errors, []);
  writeFileSync(
    `${dir}/browser-results.json`,
    JSON.stringify(
      {
        records,
        redirectResults,
        inbound: Object.fromEntries(inbound),
        errors,
      },
      null,
      2,
    ) + "\n",
  );
  writeFileSync(
    `${dir}/person-schema-checks.json`,
    JSON.stringify(schemaResults, null, 2) + "\n",
  );
  console.log(
    `Browser: PASS — ${records.length} page/viewport checks, 12 screenshots, 2 profile graphs, verbatim sourced reviews, no-photo cards, illustrative coverage, unpublished-story 404, SSR, contextual links and navigation; no runtime errors.`,
  );
} finally {
  await browser?.close();
  server.kill("SIGTERM");
}
