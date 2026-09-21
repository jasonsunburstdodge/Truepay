import { NextResponse } from "next/server";

/**
 * PLACEHOLDER lead intake endpoint.
 *
 * This repo had no existing CRM/webhook integration to match when this
 * project was scaffolded (see README.md "Pre-build review" item 3) — there
 * was no prior form handler, HubSpot/Salesforce config, or hidden-field
 * convention to follow. This route exists so the "Get my free statement
 * review" form (src/components/lead-form.tsx) has somewhere real to POST
 * during development.
 *
 * Before launch, replace the body below with an actual integration (HubSpot
 * Forms API, Salesforce Web-to-Lead, a custom CRM webhook, etc.) and keep the
 * `selected_industry` field name so industry-tagged leads keep flowing
 * through once that integration is wired up.
 */
export async function POST(request: Request) {
  const data = await request.json().catch(() => null);

  if (!data || typeof data.email !== "string" || !data.email) {
    return NextResponse.json({ ok: false, error: "Email is required." }, { status: 400 });
  }

  console.log("[lead:placeholder]", {
    businessName: data.businessName ?? null,
    email: data.email,
    phone: data.phone ?? null,
    selected_industry: data.selected_industry ?? "not specified",
  });

  return NextResponse.json({ ok: true });
}
