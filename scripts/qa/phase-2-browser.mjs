import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
import { routes } from "../../src/content/routes.ts";
import { claims } from "../../src/content/claims.ts";
import { commitments } from "../../src/content/commitments.ts";
const dir = "docs/qa/phase-2";
mkdirSync(dir, { recursive: true });
const built = routes.filter((r) => r.status !== "planned" && r.phase <= 2);
const newRoutes = built.filter((r) => r.phase === 2);
const base = "http://127.0.0.1:4032";
const env = { ...process.env, SITE_ENV: "production" };
delete env.LEAD_WEBHOOK_URL;
const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "-p", "4032", "-H", "127.0.0.1"],
  { env, stdio: "ignore" },
);
let browser;
const errors = [],
  records = [],
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
  assert.ok(ready, "server ready");
  browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });
  const page = await browser.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of built) {
      const response = await page.goto(base + route.path);
      assert.equal(response.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.title(), route.title);
      assert.equal(await page.locator("h1").innerText(), route.h1);
      assert.match(
        await page.locator('meta[name="robots"]').getAttribute("content"),
        /noindex/,
      );
      assert.equal(await page.locator("h1 + [data-answer]").count(), 1);
      const cardHeadings = await page
        .locator(".hero-gradient .card h2")
        .evaluateAll((els) => els.map((e) => getComputedStyle(e).color));
      assert.ok(
        cardHeadings.every((color) => color === "rgb(12, 43, 79)"),
        "hero proof heading contrast",
      );
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      );
      assert.equal(overflow, false, route.path + " overflow " + width);
      const required = route.links.filter((p) =>
        built.some((r) => r.path === p),
      );
      const actual = await page
        .locator("main a")
        .evaluateAll((links) =>
          links.map((a) => a.getAttribute("href").split("#")[0]),
        );
      for (const link of required)
        assert.ok(actual.includes(link), route.path + " missing " + link);
      const related = await page
        .locator("main .related-card")
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
      const sizes = await page
        .locator(".question > h2")
        .evaluateAll((h) =>
          h.map((e) => parseFloat(getComputedStyle(e).fontSize)),
        );
      assert.ok(
        sizes.every((n) => n >= 32 && n <= 40),
        route.path + " question scale",
      );
      assert.equal(
        await page
          .locator('main a[href="https://gotruepay.com/reviews/"]')
          .count(),
        0,
      );
      if (route.path === "/")
        assert.equal(
          await page
            .locator('.commitment a[href="/why-truepay/#fine-print"]')
            .count(),
          3,
        );
      if (route.path === "/why-truepay/") {
        for (const c of commitments) {
          const card = page.locator('.commitment[data-claim="' + c.id + '"]');
          assert.equal(
            await card.locator("[data-claim-copy]").innerText(),
            claims.find((x) => x.id === c.id).copy,
          );
          assert.equal(await card.locator("details").getAttribute("open"), "");
          assert.ok((await card.innerText()).includes(c.covers));
          assert.ok((await card.innerText()).includes(c.excludes));
          const scope = claims.find((x) => x.id === c.id).scope;
          if (scope)
            assert.ok(
              (await page.locator("#fine-print").innerText()).includes(scope),
            );
        }
      }
      if (route.path === "/pricing/dual-pricing/") {
        assert.equal(await page.locator("[data-checkout-example]").count(), 1);
        assert.equal(
          await page.locator("[data-cash-price]").innerText(),
          "$100.00",
        );
        assert.equal(
          await page.locator("[data-card-price]").innerText(),
          "$104.00",
        );
        assert.equal(
          await page.locator("[data-receipt-total]").innerText(),
          "$104.00",
        );
        const ids = await page
          .locator("main [data-claim]")
          .evaluateAll((e) => e.map((x) => x.dataset.claim));
        assert.deepEqual(ids.sort(), [
          "dual-pricing-cost",
          "dual-pricing-rules",
        ]);
      }
      if (width === 1440) {
        const texts = await page
          .locator("main [data-claim]")
          .evaluateAll((els) =>
            els.map((e) => ({
              id: e.dataset.claim,
              promise: (e.querySelector("[data-claim-copy]") || e).innerText
                .replace(/\s+/g, " ")
                .trim(),
              rendered: (e.classList.contains("commitment")
                ? Array.from(e.querySelectorAll("h3, p, summary, h4, a"))
                    .map((n) => n.textContent)
                    .join(" ")
                : e.innerText
              )
                .replace(/\s+/g, " ")
                .trim(),
            })),
          );
        for (const text of texts) claimText.push({ path: route.path, ...text });
      }
      if (newRoutes.includes(route))
        await page.screenshot({
          path: `${dir}/${route.path.slice(1, -1).replaceAll("/", "-")}-${width}.jpg`,
          fullPage: true,
          type: "jpeg",
          quality: 68,
        });
      records.push({
        path: route.path,
        width,
        overflow,
        requiredLinks: required,
        questionH2Sizes: sizes,
      });
    }
    await page.goto(base + "/pricing/");
    if (width === 1440) {
      const parent = page
        .locator(".desktop-nav > div")
        .filter({ has: page.locator('a[href="/pricing/"]') })
        .first();
      const before = await page.locator(".site-header").boundingBox();
      await parent.locator(":scope > a").focus();
      await page.keyboard.press("Tab");
      assert.equal(
        await page.locator(":focus").getAttribute("href"),
        "/pricing/membership/",
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
          .locator('#mobile-navigation a[href="/pricing/membership/"]')
          .isVisible(),
      );
      await page.keyboard.press("Escape");
      assert.equal(await button.getAttribute("aria-expanded"), "false");
    }
  }
  // No JavaScript: the content, example, links and scopes still render.
  const plain = await browser.newContext({ javaScriptEnabled: false });
  const ssr = await plain.newPage();
  for (const route of newRoutes) {
    await ssr.goto(base + route.path);
    for (const q of route.questions)
      assert.ok((await ssr.locator("main").innerText()).includes(q));
    assert.equal(await ssr.locator("h1 + [data-answer]").count(), 1);
  }
  await ssr.goto(base + "/pricing/dual-pricing/");
  assert.equal(
    await ssr.locator("[data-receipt-total]").innerText(),
    "$104.00",
  );
  assert.deepEqual(errors, []);
  writeFileSync(
    `${dir}/browser-results.json`,
    JSON.stringify(
      {
        checks:
          "20 viewport/page checks, all built contextual links, question scale, white RelatedLinks cards, commitment scopes, checkout, navigation, no-JS SSR",
        records,
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
  const escape = (s) => s.replaceAll("|", "\\|");
  writeFileSync(
    `${dir}/rendered-claims.md`,
    "# Exact rendered claims\n\nCaptured from the rendered DOM at 1440px. Full marked text includes covers/exclusions, closed disclosure content and links. No claim copy has been edited.\n\n| Route | Claim | Exact promise / marked text |\n| --- | --- | --- |\n" +
      claimText
        .map((c) => `| ${c.path} | ${c.id} | ${escape(c.promise)} |`)
        .join("\n") +
      "\n\n## Full marked text, including commitment details\n\n" +
      claimText
        .map((c) => `### ${c.path} — ${c.id}\n\n${c.rendered}\n`)
        .join("\n"),
  );
  console.log(
    "Browser: PASS — 20 page/viewport checks; 8 screenshots; all built links, 32–40px questions, scopes, checkout, navigation and SSR; no runtime errors.",
  );
} finally {
  await browser?.close();
  server.kill("SIGTERM");
}
