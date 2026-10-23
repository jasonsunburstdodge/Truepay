import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
import lighthouse from "lighthouse";
import { gzipSync } from "node:zlib";
import { launch } from "chrome-launcher";
const dir = "docs/qa/phase-0";
mkdirSync(dir, { recursive: true });
const base = process.env.QA_BASE ?? "http://127.0.0.1:4025";
const executablePath = process.env.CHROME_PATH;
const server = process.env.QA_BASE
  ? null
  : spawn(
      process.execPath,
      [
        "node_modules/next/dist/bin/next",
        "start",
        "-p",
        "4025",
        "-H",
        "127.0.0.1",
      ],
      { env: { ...process.env, SITE_ENV: "production" }, stdio: "ignore" },
    );
let browser;
let chrome;
try {
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(base, { signal: AbortSignal.timeout(1000) })).ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  assert.ok(ready, "Server ready");
  browser = await chromium.launch({
    executablePath,
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal((await page.goto(base)).status(), 200);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(
      await page.locator("h1").innerText(),
      "Payments without the games.",
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      "No horizontal overflow",
    );
    assert.match(
      await page
        .locator("body")
        .evaluate((el) => getComputedStyle(el).fontFamily),
      /inter/i,
    );
    const schema = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) =>
        nodes.flatMap((n) => JSON.parse(n.textContent)["@graph"]),
      );
    for (const type of ["Organization", "WebSite", "WebPage"])
      assert.ok(
        schema.some((n) => n["@type"] === type),
        type,
      );
    assert.equal(
      await page.locator("h1 + [data-answer]").count(),
      1,
      "Answer directly under H1",
    );
    for (const href of await page
      .locator("header a")
      .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href"))))
      assert.ok(
        !href.startsWith("/") || href === "/" || href === "/#review",
        "No planned-page header links",
      );
    if (width === 390) {
      const menu = page.getByRole("button", { name: "Menu" });
      await menu.focus();
      await page.keyboard.press("Enter");
      await page
        .getByRole("navigation", { name: "Mobile navigation" })
        .waitFor({ state: "visible" });
      await page.keyboard.press("Tab");
      assert.ok(
        await page.evaluate(
          () => document.activeElement.closest("#mobile-navigation") !== null,
        ),
        "Tab enters menu",
      );
      await page.keyboard.press("Escape");
      assert.equal(await menu.getAttribute("aria-expanded"), "false");
      assert.equal(
        await menu.evaluate((el) => el === document.activeElement),
        true,
        "Escape restores focus",
      );
    }
    await page.screenshot({
      path: `${dir}/home-${width}.jpg`,
      fullPage: true,
      quality: 72,
    });
    await page.locator("#card-sales").fill("0");
    await page.locator("#calculator-error").waitFor();
    await page.locator("#card-sales").fill("10000");
    await page.locator("#card-fees").fill("250");
    assert.match(await page.locator(".result").innerText(), /2.50%/);
    await page.locator("#business").fill("QA example");
    await page.locator("#email").fill("qa@example.com");
    if (width === 390)
      assert.equal(
        await page.locator(".mobile-cta").isVisible(),
        false,
        "Sticky bar hides for focused form input",
      );
    const response = page.waitForResponse((r) =>
      r.url().endsWith("/api/lead/"),
    );
    await page.locator('form button[type="submit"]').click();
    assert.equal(
      (await response).status(),
      503,
      "Undelivered leads fail closed",
    );
    await page
      .getByRole("alert")
      .filter({ hasText: "Something went wrong" })
      .waitFor();
    assert.equal(
      (await page.goto(base + "/qa-this-page-should-not-exist/")).status(),
      404,
    );
    await page.screenshot({
      path: `${dir}/not-found-${width}.jpg`,
      fullPage: true,
      quality: 72,
    });
  }
  assert.deepEqual(errors, [], "No browser runtime errors");
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const doc = await noJs.newPage();
  await doc.goto(base);
  assert.equal(
    await doc.locator("[data-answer]").count(),
    1,
    "Server-rendered answer",
  );
  assert.equal(
    await doc.locator(".question h2").count(),
    4,
    "Server-rendered questions",
  );
  assert.ok(
    (await doc.locator(".result").innerText()).includes("3.00%"),
    "Initial calculator result rendered",
  );
  await browser.close();
  browser = null;
  chrome = await launch({
    chromePath: executablePath,
    chromeFlags: [
      "--headless",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });
  const result = await lighthouse(base, {
    port: chrome.port,
    output: ["html", "json"],
    logLevel: "error",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  });
  writeFileSync(`${dir}/lighthouse-mobile.html.gz`, gzipSync(result.report[0]));
  writeFileSync(
    `${dir}/lighthouse-mobile.json`,
    JSON.stringify(
      result.lhr,
      (key, value) =>
        typeof value === "string" && value.startsWith("data:image/")
          ? "[Screenshot data omitted; see viewport captures]"
          : value,
      2,
    ),
  );
  const scores = Object.fromEntries(
    Object.entries(result.lhr.categories).map(([k, v]) => [
      k,
      Math.round(v.score * 100),
    ]),
  );
  console.log("Lighthouse mobile:", JSON.stringify(scores));
  for (const k of ["accessibility", "best-practices"])
    assert.ok(scores[k] >= 90, `${k} must be >=90`);
  // Drafts MUST remain noindex. Report the raw SEO score without hiding the
  // expected crawlability failure; separately verify every other SEO audit.
  const failedSeo = result.lhr.categories.seo.auditRefs
    .filter((ref) => {
      const audit = result.lhr.audits[ref.id];
      return audit.score !== null && audit.score < 1;
    })
    .map((ref) => ref.id);
  assert.deepEqual(
    failedSeo,
    ["is-crawlable"],
    "Only mandated draft noindex may fail SEO",
  );
  const diagnostic = await lighthouse(base, {
    port: chrome.port,
    output: ["html", "json"],
    logLevel: "error",
    onlyCategories: ["seo"],
    skipAudits: ["is-crawlable"],
  });
  writeFileSync(
    `${dir}/lighthouse-seo-draft-diagnostic.html.gz`,
    gzipSync(diagnostic.report[0]),
  );
  const diagnosticSeo = Math.round(diagnostic.lhr.categories.seo.score * 100);
  assert.ok(
    diagnosticSeo >= 90,
    "SEO excluding required draft crawlability must be >=90",
  );
  console.log(
    `SEO diagnostic excluding required draft noindex: ${diagnosticSeo} (raw SEO: ${scores.seo})`,
  );
  writeFileSync(
    `${dir}/browser-summary.json`,
    JSON.stringify(
      {
        viewports: [390, 1440],
        checks:
          "PASS: SSR, schema, manifest H1, no overflow, keyboard menu, calculator, form failure, sticky bar, 404",
        lighthouse: scores,
        seoDiagnosticExcludingRequiredNoindex: diagnosticSeo,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(
    "Browser QA: PASS (390px and 1440px; SSR, keyboard, calculator, form failure, 404)",
  );
} finally {
  await browser?.close();
  await chrome?.kill();
  server?.kill();
}
