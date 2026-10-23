import { NextResponse } from "next/server";

/**
 * Lead intake for every site form (statement review, contact, partner, careers).
 *
 * Delivers to LEAD_WEBHOOK_URL (CRM, Zapier/Make, or a custom endpoint) as JSON.
 * If the webhook isn't configured or fails, responds with an error so the form
 * shows the phone fallback. It never reports success for a lead that wasn't delivered.
 */

const FORM_TYPES = new Set(["statement-review", "contact", "partner", "careers"]);
const MAX = 2000;

// Best-effort, per-instance rate limit: 5 submissions per IP per 10 minutes.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const clean = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, MAX) : "");

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "Too many submissions. Please call 888-792-0284." }, { status: 429 });

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });

  // Honeypot filled → silently accept and drop.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const lead = {
    formType: clean(body.formType),
    name: clean(body.name),
    business: clean(body.business),
    email: clean(body.email),
    phone: clean(body.phone),
    industry: clean(body.industry),
    message: clean(body.message),
    consent: body.consent === "yes",
    page: clean(body.page),
    utm: { source: clean(body.utm_source), medium: clean(body.utm_medium), campaign: clean(body.utm_campaign) },
    submittedAt: new Date().toISOString(),
  };

  const errors: string[] = [];
  if (!FORM_TYPES.has(lead.formType)) errors.push("formType");
  if (!lead.name) errors.push("name");
  if (!/^\S+@\S+\.\S+$/.test(lead.email)) errors.push("email");
  if (lead.formType === "statement-review" && !lead.business) errors.push("business");
  if (!lead.consent) errors.push("consent");
  if (errors.length) return NextResponse.json({ ok: false, error: "Missing or invalid fields.", fields: errors }, { status: 400 });

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.error("[lead] LEAD_WEBHOOK_URL is not set; lead not delivered", { formType: lead.formType, page: lead.page });
    return NextResponse.json({ ok: false, error: "Form delivery is not configured." }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[lead] delivery failed", String(err));
    return NextResponse.json({ ok: false, error: "Delivery failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
