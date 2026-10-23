import { test } from "node:test";
import assert from "node:assert/strict";
test("analytics excludes form contents, input values, query strings and contact details", async () => {
  const previous = process.env.NEXT_PUBLIC_GA_ID;
  const windowDescriptor = Object.getOwnPropertyDescriptor(
    globalThis,
    "window",
  );
  const documentDescriptor = Object.getOwnPropertyDescriptor(
    globalThis,
    "document",
  );
  try {
    process.env.NEXT_PUBLIC_GA_ID = "G-TESTQA";
    const { track } = await import("../../src/lib/analytics");
    const events: unknown[][] = [];
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        location: {
          origin: "https://gotruepay.com",
          pathname: "/contact/",
          search: "?email=private@example.com&fees=750",
        },
        gtag: (...args: unknown[]) => events.push(args),
      },
    });
    Object.defineProperty(globalThis, "document", {
      configurable: true,
      value: { title: "Contact TruePay | 888-792-0284" },
    });
    track("calculator_complete");
    track("review_submit");
    track("contact_submit");
    track("call_click");
    track("text_click");
    assert.equal(events.length, 5);
    for (const event of events)
      assert.deepEqual(Object.keys(event[2] as object).sort(), [
        "page_location",
        "page_referrer",
        "page_title",
        "send_to",
      ]);
    assert.ok(!JSON.stringify(events).includes("private@example.com"));
    assert.ok(!JSON.stringify(events).includes("750"));
    assert.ok(!JSON.stringify(events).includes("?"));
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_GA_ID;
    else process.env.NEXT_PUBLIC_GA_ID = previous;
    if (windowDescriptor)
      Object.defineProperty(globalThis, "window", windowDescriptor);
    else Reflect.deleteProperty(globalThis, "window");
    if (documentDescriptor)
      Object.defineProperty(globalThis, "document", documentDescriptor);
    else Reflect.deleteProperty(globalThis, "document");
  }
});

test("only allowed campaign parameters persist across page navigation", async () => {
  const { readUtm } = await import("../../src/lib/utm");
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, "window");
  const storage = new Map<string, string>();
  const browser = {
    location: {
      search: "?utm_source=qa&utm_campaign=phase-1&email=private@example.com",
    },
    sessionStorage: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
    },
  };
  try {
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: browser,
    });
    assert.deepEqual(readUtm(), { utm_source: "qa", utm_campaign: "phase-1" });
    browser.location.search = "";
    assert.deepEqual(readUtm(), { utm_source: "qa", utm_campaign: "phase-1" });
    assert.ok(
      !JSON.stringify([...storage.values()]).includes("private@example.com"),
    );
  } finally {
    if (descriptor) Object.defineProperty(globalThis, "window", descriptor);
    else Reflect.deleteProperty(globalThis, "window");
  }
});
