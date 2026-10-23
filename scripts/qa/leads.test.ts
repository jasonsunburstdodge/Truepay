import { test } from "node:test";
import assert from "node:assert/strict";
import { validateLead, createRateLimiter } from "../../src/lib/leads";
import { POST } from "../../src/app/api/lead/route";
const fixture = {
  formType: "review",
  name: "QA Merchant",
  business: "QA Example Business",
  email: "qa@example.com",
  phone: "555-010-1234",
  industry: "Retail",
  message: "Please explain my processing statement.",
  pagePath: "/statement-review/",
  utm: { utm_source: "qa", utm_campaign: "phase-1" },
  consent: true,
  website: "",
};
let sequence = 0;
const request = (body: unknown, extra: Record<string, string> = {}) =>
  new Request("http://localhost/api/lead/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": `qa-${++sequence}`,
      ...extra,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
test("lead validation rejects invalid consent, bots, malformed fields and unsupported content", () => {
  assert.deepEqual(validateLead({ ...fixture, untrusted: "discard me" }), {
    formType: "review",
    name: "QA Merchant",
    business: "QA Example Business",
    email: "qa@example.com",
    phone: "555-010-1234",
    industry: "Retail",
    message: "Please explain my processing statement.",
    pagePath: "/statement-review/",
    utm: { utm_source: "qa", utm_campaign: "phase-1" },
    consent: true,
  });
  for (const invalid of [
    null,
    [],
    { ...fixture, consent: false },
    { ...fixture, website: "bot" },
    { ...fixture, email: "invalid" },
    { ...fixture, name: "" },
    { ...fixture, message: "x".repeat(2001) },
    { ...fixture, pagePath: "//evil.example/" },
    { ...fixture, pagePath: "/contact/?email=private" },
    { ...fixture, formType: "unknown" },
    { ...fixture, phone: "bad phone" },
    { ...fixture, utm: { utm_source: 7 } },
  ])
    assert.equal(validateLead(invalid), null);
});
test("rate limiter bounds requests and resets on expiry", () => {
  const allow = createRateLimiter(2, 100);
  assert.equal(allow("a", 0), true);
  assert.equal(allow("a", 1), true);
  assert.equal(allow("a", 2), false);
  assert.equal(allow("b", 2), true);
  assert.equal(allow("a", 101), true);
});
test("lead API requires real webhook acknowledgement before issuing a receipt", async () => {
  const webhook = process.env.LEAD_WEBHOOK_URL,
    originalFetch = globalThis.fetch;
  try {
    delete process.env.LEAD_WEBHOOK_URL;
    const missing = await POST(request(fixture));
    assert.equal(missing.status, 503);
    assert.equal(missing.headers.get("set-cookie"), null);
    assert.equal(
      (
        await POST(
          request(fixture, {
            host: "127.0.0.1:4030",
            origin: "http://127.0.0.1:4030",
          }),
        )
      ).status,
      503,
    );
    assert.match((await missing.json()).error, /888-792-0284/);
    assert.equal(
      (await POST(request({ ...fixture, consent: false }))).status,
      400,
    );
    assert.equal(
      (await POST(request({ ...fixture, website: "spam" }))).status,
      400,
    );
    assert.equal((await POST(request("{bad json"))).status, 400);
    assert.equal(
      (await POST(request(fixture, { origin: "https://other.example" })))
        .status,
      403,
    );
    assert.equal((await POST(request("x".repeat(17000)))).status, 413);
    assert.equal(
      (await POST(request(fixture, { "Content-Type": "text/plain" }))).status,
      415,
    );
    process.env.LEAD_WEBHOOK_URL = "https://webhook.example.test/intake";
    let captured: unknown;
    globalThis.fetch = async (_url, init) => {
      captured = JSON.parse(String(init?.body));
      assert.equal(init?.redirect, "error");
      return new Response(null, { status: 204 });
    };
    const success = await POST(request(fixture));
    assert.equal(success.status, 200);
    assert.deepEqual(await success.json(), { ok: true });
    assert.match(success.headers.get("set-cookie")!, /HttpOnly/);
    assert.equal((captured as Record<string, unknown>).website, undefined);
    globalThis.fetch = async () => new Response(null, { status: 500 });
    const failed = await POST(request(fixture));
    assert.equal(failed.status, 502);
    assert.equal(failed.headers.get("set-cookie"), null);
    globalThis.fetch = async () => {
      throw new Error("Network failure");
    };
    assert.equal((await POST(request(fixture))).status, 502);
    process.env.LEAD_WEBHOOK_URL = "http://remote.example/intake";
    assert.equal((await POST(request(fixture))).status, 503);
  } finally {
    globalThis.fetch = originalFetch;
    if (webhook === undefined) delete process.env.LEAD_WEBHOOK_URL;
    else process.env.LEAD_WEBHOOK_URL = webhook;
  }
});
