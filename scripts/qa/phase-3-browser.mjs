import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
import { routes } from "../../src/content/routes.ts";
import { claims } from "../../src/content/claims.ts";
import { commitments } from "../../src/content/commitments.ts";
import { solutions } from "../../src/content/solutions.ts";
import { redirects } from "../../src/content/redirects.ts";
const dir = "docs/qa/phase-3";
mkdirSync(dir, { recursive: true });
const base = "http://127.0.0.1:4033";
const built = routes.filter((r) => r.status !== "planned" && r.phase <= 3),
  fresh = built.filter((r) => r.phase === 3);
const productNames = {
  "/vl-100/": "VL100",
  "/vl-110/": "VL110",
  "/vl-500/": "VL500",
  "/dejavoo-qd4/": "Dejavoo QD4",
  "/clover-flex/": "Clover Flex",
  "/mini/": "Clover Mini",
  "/duo/": "Clover Station Duo",
  "/pos-system/": "SkyTab",
  "/skytab-mobile/": "SkyTab Mobile",
  "/skytab-glass/": "SkyTab Glass",
  "/paradise-pos/": "Paradise POS",
  "/mobile-bytes/": "MobileBytes",
  "/valor-pay-app/": "Valor Pay app",
  "/rckt-mobile-pos/": "RCKT mobile POS",
};
const env = { ...process.env, SITE_ENV: "production" };
delete env.LEAD_WEBHOOK_URL;
const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "-p", "4033", "-H", "127.0.0.1"],
  { env, stdio: "ignore" },
);
let browser;
const errors = [],
  records = [],
  redirectRecords = [],
  inbound = new Map(),
  claimText = [];
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
      assert.match(
        await page.locator('meta[name="robots"]').getAttribute("content"),
        /noindex/,
      );
      assert.equal(await page.locator("h1 + [data-answer]").count(), 1);
      const hero = await page.locator("[data-answer]").innerText();
      const sentences = [
        ...new Intl.Segmenter("en-US", { granularity: "sentence" }).segment(
          hero,
        ),
      ].filter((s) => s.segment.trim());
      assert.equal(sentences.length, 2, route.path + " two hero sentences");
      assert.ok(hero.split(/\s+/).length <= 44, route.path + " short hero");
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      );
      assert.equal(overflow, false, route.path + " overflow " + width);
      const actual = await page
        .locator("main a")
        .evaluateAll((links) =>
          links.map((a) => a.getAttribute("href").split("#")[0]),
        );
      const required = route.links.filter((path) =>
        built.some((r) => r.path === path),
      );
      for (const path of required)
        assert.ok(actual.includes(path), route.path + " missing " + path);
      const related = await page
        .locator(".related-card")
        .evaluateAll((a) =>
          a.map((el) => ({
            href: el.getAttribute("href"),
            bg: getComputedStyle(el).backgroundColor,
            radius: getComputedStyle(el).borderRadius,
          })),
        );
      assert.deepEqual(
        related.map((a) => a.href),
        required,
      );
      assert.ok(
        related.every(
          (a) => a.bg === "rgb(255, 255, 255)" && a.radius === "24px",
        ),
      );
      if (width === 1440) {
        for (const href of new Set(actual))
          inbound.set(href, (inbound.get(href) || 0) + 1);
        const cs = await page
          .locator("main [data-claim]")
          .evaluateAll((els) =>
            els.map((e) => ({
              id: e.dataset.claim,
              text: (e.querySelector("[data-claim-copy]") || e).innerText
                .replace(/\s+/g, " ")
                .trim(),
            })),
          );
        claimText.push(...cs.map((c) => ({ path: route.path, ...c })));
      }
      const sizes = await page
        .locator(".question > h2")
        .evaluateAll((h) =>
          h.map((e) => parseFloat(getComputedStyle(e).fontSize)),
        );
      assert.ok(sizes.every((n) => n >= 32 && n <= 40));
      assert.equal(
        await page
          .locator('main a[href="https://gotruepay.com/reviews/"]')
          .count(),
        0,
      );
      assert.equal(
        await page.locator(".commitment details").count(),
        0,
        "scope is centralized",
      );
      if (route.path === "/why-truepay/") {
        const scope = await page.locator("#fine-print").innerText();
        for (const c of commitments) {
          assert.ok(scope.includes(c.covers));
          assert.ok(scope.includes(c.excludes));
          const claim = claims.find((x) => x.id === c.id);
          assert.ok(
            (await page
              .locator(
                '.commitment[data-claim="' + c.id + '"] [data-claim-copy]',
              )
              .innerText()) === claim.copy,
          );
          if (claim.scope) assert.ok(scope.includes(claim.scope));
        }
      }
      if (route.path === "/pricing/dual-pricing/") {
        assert.equal(await page.locator("[data-checkout-example]").count(), 1);
        assert.equal(
          await page.locator("[data-receipt-total]").innerText(),
          "$104.00",
        );
      }
      const solution = solutions.find((s) => s.path === route.path);
      if (solution) {
        assert.equal(await page.locator("table").count(), 1);
        assert.ok(
          (await page.locator("caption").innerText()).includes(
            "Ask us to confirm availability for your business.",
          ),
        );
        assert.equal(
          await page.locator("tbody tr").count(),
          solution.options.length,
        );
        for (const row of solution.options) {
          assert.ok(
            (await page.locator("tbody").innerText()).includes(row.cells[0]),
          );
          assert.ok(
            (await page.locator('tbody a[href="' + row.source + '"]').count()) >
              0,
          );
        }
        assert.equal(
          await page.locator("main img").count(),
          0,
          "no unlicensed product images",
        );
        if (width === 390) {
          const region = page.locator(".table-scroll");
          assert.ok(
            await region.evaluate((el) => el.scrollWidth > el.clientWidth),
          );
          await region.focus();
          await page.keyboard.press("ArrowRight");
        }
        if (route.path === "/solutions/point-of-sale/")
          assert.equal(await page.locator(".setup-steps li").count(), 6);
      }
      if (fresh.includes(route) || route.path === "/why-truepay/") {
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({
          path: `${dir}/${route.path.slice(1, -1).replaceAll("/", "-")}-${width}.jpg`,
          fullPage: true,
          type: "jpeg",
          quality: 62,
        });
      }
      records.push({
        path: route.path,
        width,
        overflow,
        hero,
        heroSentences: sentences.length,
        requiredLinks: required,
        questionSizes: sizes,
      });
    }
    await page.goto(base + "/solutions/");
    if (width === 1440) {
      const parent = page
        .locator(".desktop-nav > div")
        .filter({ has: page.locator('a[href="/solutions/"]') })
        .first();
      const before = await page.locator(".site-header").boundingBox();
      await parent.locator(":scope > a").focus();
      await page.keyboard.press("Tab");
      assert.equal(
        await page.locator(":focus").getAttribute("href"),
        "/solutions/point-of-sale/",
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
          .locator('#mobile-navigation a[href="/solutions/point-of-sale/"]')
          .isVisible(),
      );
      await page.keyboard.press("Escape");
      assert.equal(await button.getAttribute("aria-expanded"), "false");
    }
  }
  for (const route of fresh)
    assert.ok(inbound.get(route.path) > 0, "no orphan " + route.path);
  for (const redirect of redirects.filter((r) =>
    r.destination.startsWith("/solutions/"),
  )) {
    const response = await fetch(base + redirect.source, {
      redirect: "manual",
    });
    assert.equal(response.status, 308);
    assert.equal(
      new URL(response.headers.get("location"), base).pathname,
      redirect.destination,
    );
    const landed = await page.goto(base + redirect.source);
    assert.equal(landed.status(), 200);
    assert.equal(new URL(page.url()).pathname, redirect.destination);
    const name = productNames[redirect.source];
    if (name)
      assert.ok(
        (await page.locator("main").innerText()).includes(name),
        redirect.source + " preserves " + name,
      );
    redirectRecords.push({
      ...redirect,
      status: 308,
      destinationStatus: 200,
      product: name,
    });
  }
  const plain = await browser.newContext({ javaScriptEnabled: false });
  const ssr = await plain.newPage();
  for (const route of fresh) {
    await ssr.goto(base + route.path);
    for (const q of route.questions)
      assert.ok((await ssr.locator("main").innerText()).includes(q));
    assert.equal(await ssr.locator("h1 + [data-answer]").count(), 1);
  }
  await plain.close();
  assert.deepEqual(errors, []);
  writeFileSync(
    `${dir}/browser-results.json`,
    JSON.stringify(
      {
        records,
        redirectRecords,
        inbound: Object.fromEntries(inbound),
        errors,
      },
      null,
      2,
    ) + "\n",
  );
  writeFileSync(
    `${dir}/rendered-claims.json`,
    JSON.stringify(claimText, null, 2) + "\n",
  );
  console.log(
    `Browser: PASS — ${records.length} page/viewport checks; ${redirectRecords.length} solution redirects; 16 screenshots; two-sentence heroes, centralized scope, sources, links, navigation, SSR; no runtime errors.`,
  );
} finally {
  await browser?.close();
  server.kill("SIGTERM");
}
