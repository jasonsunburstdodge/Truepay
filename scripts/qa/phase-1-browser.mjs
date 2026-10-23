import { chromium } from "@playwright/test";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
import { getRoute } from "../../src/content/routes.ts";
const dir = "docs/qa/phase-1";
mkdirSync(dir, { recursive: true });
const records = [];
let webhookStatus = 204;
const webhook = createServer(async (req, res) => {
  let body = "";
  for await (const chunk of req) body += chunk;
  records.push(JSON.parse(body));
  res.writeHead(webhookStatus);
  res.end();
});
await new Promise((resolve) => webhook.listen(0, "127.0.0.1", resolve));
const hook = `http://127.0.0.1:${webhook.address().port}/intake`;
const base = "http://127.0.0.1:4030",
  fallback = "http://127.0.0.1:4031";
const env = { ...process.env, SITE_ENV: "production" };
delete env.LEAD_WEBHOOK_URL;
const launchServer = (port, variables) =>
  spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "-p", port, "-H", "127.0.0.1"],
    { env: variables, stdio: "ignore" },
  );
const servers = [
  launchServer("4030", { ...env, LEAD_WEBHOOK_URL: hook }),
  launchServer("4031", env),
];
let browser;
async function ready(url) {
  for (let i = 0; i < 80; i++) {
    try {
      if ((await fetch(url, { signal: AbortSignal.timeout(1000) })).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw Error("Server did not start");
}
try {
  await Promise.all([ready(base), ready(fallback)]);
  browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const paths = [
    "/",
    "/statement-review/",
    "/effective-rate-calculator/",
    "/support/",
    "/contact/",
    "/thank-you/",
  ];
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of paths) {
      const route = getRoute(path);
      assert.equal((await page.goto(base + path)).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.title(), route.title);
      assert.equal(await page.locator("h1").innerText(), route.h1);
      assert.equal(await page.locator("h1 + [data-answer]").count(), 1);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `Overflow at ${width}: ${path}`,
      );
      assert.match(
        await page.locator('meta[name="robots"]').getAttribute("content"),
        /noindex/,
      );
      for (const q of route.questions)
        assert.ok(
          (await page.locator("main h2,main h3").allTextContents()).includes(q),
          q,
        );
      const schema = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((nodes) =>
          nodes.flatMap((n) => JSON.parse(n.textContent)["@graph"]),
        );
      for (const type of route.schema)
        assert.ok(
          schema.some((n) => n["@type"] === type),
          `${path}: ${type}`,
        );
      const logo = page.locator("header .logo");
      assert.match(await logo.innerText(), /True\s+pay/);
      const gap = await logo.evaluate((el) => {
        const a = el.querySelector("strong"),
          b = el.querySelector(".logo-pay");
        return {
          gap: b.getBoundingClientRect().left - a.getBoundingClientRect().right,
          a: getComputedStyle(a).fontWeight,
          b: getComputedStyle(b).fontWeight,
        };
      });
      assert.ok(gap.gap >= 3);
      assert.equal(gap.a, "800");
      assert.equal(gap.b, "300");
      assert.equal(
        await page.locator("main .proof a").count(),
        0,
        "Review source links removed until customer stories exists",
      );
      for (const target of route.links.filter(
        (link) => getRoute(link)?.status !== "planned",
      ))
        assert.ok(
          (
            await page
              .locator("main a")
              .evaluateAll((nodes) =>
                nodes.map((n) => new URL(n.href).pathname),
              )
          ).includes(target),
          `${path} must link to ${target}`,
        );
      if (path === "/support/") {
        assert.equal(await page.locator("main form").count(), 0);
        assert.equal(await page.locator('a[href^="sms:"]').count(), 0);
        assert.ok(!(await page.locator("main").innerText()).includes("24/7"));
      }
      if (path === "/thank-you/")
        assert.ok(
          !(await page.locator("[data-answer]").innerText()).includes(
            "was delivered",
          ),
        );
      const name = path === "/" ? "home" : path.split("/")[1];
      await page.screenshot({
        path: `${dir}/${name}-${width}.jpg`,
        fullPage: true,
        quality: 65,
      });
    }
    if (width === 390) {
      await page.goto(base + "/");
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
      );
      await page.keyboard.press("Escape");
      assert.equal(await menu.getAttribute("aria-expanded"), "false");
    }
  }
  console.log(
    "Viewports: PASS (six pages at 390px and 1440px, manifest/schema/links/noindex/wordmark)",
  );
  await page.goto(base + "/effective-rate-calculator/");
  for (const [sales, fees] of [
    ["", "250"],
    ["0", "250"],
    ["-10", "250"],
    ["10000", "-2"],
  ]) {
    await page.locator("#card-sales").fill(sales);
    await page.locator("#card-fees").fill(fees);
    await page.locator("#calculator-error").waitFor();
  }
  await page.locator("#card-sales").fill("10000");
  await page.locator("#card-fees").fill("250");
  assert.match(await page.locator(".result").innerText(), /2.50%/);
  await page.locator("#card-fees").fill("0");
  assert.match(await page.locator(".result").innerText(), /0.00%/);
  await page.goto(base + "/contact/");
  await page.locator("#contact-reason").selectOption("existing-merchant");
  assert.equal(await page.locator("main form").count(), 0);
  assert.equal(
    await page
      .getByRole("link", { name: "Get merchant support", exact: true })
      .getAttribute("href"),
    "/support/",
  );
  await page.locator("#contact-reason").selectOption("partner");
  assert.equal(await page.locator("main form").count(), 0);
  assert.equal(await page.locator('main a[href="/partners/"]').count(), 0);
  async function fill(formType) {
    await page.locator(`#${formType}-name`).fill("QA Merchant");
    await page.locator(`#${formType}-business`).fill("QA Example Business");
    await page.locator(`#${formType}-email`).fill("qa@example.com");
    await page.locator(`#${formType}-phone`).fill("555-010-1234");
    await page.locator(`#${formType}-industry`).fill("Retail");
    await page
      .locator(`#${formType}-message`)
      .fill("Please explain my processing statement.");
    await page.locator('input[name="consent"]').check();
  }
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [path, type] of [
      ["/statement-review/", "review"],
      ["/contact/", "contact"],
    ]) {
      await page.goto(
        base + "/?utm_source=qa&utm_campaign=phase-1&ignored=not-forwarded",
      );
      await page.waitForFunction(
        () => sessionStorage.getItem("truepay-utm") !== null,
      );
      await page.goto(base + path);
      await fill(type);
      if (width === 390) {
        await page.locator(`#${type}-message`).focus();
        assert.equal(await page.locator(".mobile-cta").isVisible(), false);
      }
      const delivered = page.waitForResponse((r) =>
        r.url().endsWith("/api/lead/"),
      );
      await page.locator('form button[type="submit"]').click();
      assert.equal((await delivered).status(), 200);
      await page.waitForURL(base + "/thank-you/");
      assert.ok(
        (await page.locator("[data-answer]").innerText()).includes(
          "was delivered",
        ),
      );
      assert.equal(new URL(page.url()).search, "");
    }
    await page.screenshot({
      path: `${dir}/thank-you-${width}.jpg`,
      fullPage: true,
      quality: 65,
    });
  }
  assert.equal(records.length, 4);
  for (const record of records) {
    assert.deepEqual(Object.keys(record).sort(), [
      "business",
      "consent",
      "email",
      "formType",
      "industry",
      "message",
      "name",
      "pagePath",
      "phone",
      "utm",
    ]);
    assert.equal(record.consent, true);
    assert.deepEqual(record.utm, { utm_source: "qa", utm_campaign: "phase-1" });
    assert.ok(!record.pagePath.includes("?"));
  }
  writeFileSync(
    `${dir}/lead-webhook-example.json`,
    JSON.stringify(records[0], null, 2) + "\n",
  );
  webhookStatus = 500;
  await page.goto(base + "/contact/");
  await fill("contact");
  const failed = page.waitForResponse((r) => r.url().endsWith("/api/lead/"));
  await page.locator('form button[type="submit"]').click();
  assert.equal((await failed).status(), 502);
  await page
    .getByRole("alert")
    .filter({ hasText: "Something went wrong" })
    .waitFor();
  assert.match(page.url(), /\/contact\/$/);
  webhookStatus = 204;
  const count = records.length;
  await page.goto(fallback + "/statement-review/");
  await fill("review");
  const missing = page.waitForResponse((r) => r.url().endsWith("/api/lead/"));
  await page.locator('form button[type="submit"]').click();
  assert.equal((await missing).status(), 503);
  await page.getByRole("alert").filter({ hasText: "888-792-0284" }).waitFor();
  assert.equal(records.length, count);
  const payload = { ...records[0], website: "" };
  assert.equal(
    (
      await fetch(base + "/api/lead/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "198.51.100.20",
        },
        body: JSON.stringify({ ...payload, consent: false }),
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await fetch(base + "/api/lead/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "198.51.100.21",
        },
        body: JSON.stringify({ ...payload, website: "spam" }),
      })
    ).status,
    400,
  );
  for (let i = 0; i < 6; i++) {
    const result = await fetch(fallback + "/api/lead/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "198.51.100.22",
      },
      body: JSON.stringify(payload),
    });
    assert.equal(result.status, i < 5 ? 503 : 429);
  }
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const doc = await noJs.newPage();
  for (const path of paths) {
    await doc.goto(base + path);
    assert.equal(await doc.locator("h1").count(), 1);
    assert.equal(await doc.locator("[data-answer]").count(), 1);
  }
  await doc.goto(fallback + "/contact/");
  assert.equal(await doc.locator("main form").getAttribute("method"), "post");
  await doc.locator("#contact-name").fill("QA Merchant");
  await doc.locator("#contact-business").fill("QA Example Business");
  await doc.locator("#contact-email").fill("qa@example.com");
  await doc.locator('input[name="consent"]').check();
  const native = doc.waitForResponse((r) => r.url().endsWith("/api/lead/"));
  await doc.locator('form button[type="submit"]').click();
  assert.equal((await native).status(), 415);
  assert.equal(new URL(doc.url()).search, "");
  assert.ok((await doc.locator("body").innerText()).includes("888-792-0284"));
  assert.deepEqual(errors, []);
  writeFileSync(
    `${dir}/browser-summary.json`,
    JSON.stringify(
      {
        viewports: [390, 1440],
        pages: paths,
        checks:
          "PASS: manifest/schema/SSR/noindex/contextual links/wordmark/review links/mobile keyboard/calculator/consent/honeypot/rate limit/webhook delivery and failure/missing webhook/thank-you receipt",
        successfulDeliveries: 4,
        webhookFailureStatus: 502,
        missingWebhookStatus: 503,
        rateLimitStatus: 429,
        runtimeErrors: errors,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(
    "Phase 1 browser QA: PASS (five new pages plus homepage; successful webhook, failure, missing configuration and no fake success)",
  );
} finally {
  await browser?.close();
  for (const server of servers) server.kill();
  await new Promise((resolve) => webhook.close(resolve));
}
