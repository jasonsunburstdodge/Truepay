import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { entity } from "@/content/entity";
import { createRateLimiter, validateLead } from "@/lib/leads";
export const runtime = "nodejs";
const allow = createRateLimiter();
const maxBytes = 16384;
function failure(status: number) {
  return NextResponse.json(
    {
      ok: false,
      error: `Something went wrong. Please call ${entity.phone.display}`,
    },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      const source = new URL(origin);
      // Next may reconstruct request.url with its internal hostname behind a proxy.
      const host = request.headers.get("host") ?? new URL(request.url).host;
      if (
        !["http:", "https:"].includes(source.protocol) ||
        source.host !== host
      )
        return failure(403);
    } catch {
      return failure(403);
    }
  }
  const ip = (request.headers.get("x-forwarded-for") ?? "unknown")
    .split(",")[0]
    .trim();
  if (!allow(createHash("sha256").update(ip).digest("hex")))
    return failure(429);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return failure(415);
  if (Number(request.headers.get("content-length")) > maxBytes)
    return failure(413);
  let input: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return failure(400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        return failure(413);
      }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return failure(400);
  }
  const lead = validateLead(input);
  if (!lead) return failure(400);
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) return failure(503);
  try {
    const url = new URL(webhook);
    if (
      url.protocol !== "https:" &&
      !(
        url.protocol === "http:" &&
        ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
      )
    )
      return failure(503);
    const delivered = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      redirect: "error",
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!delivered.ok) return failure(502);
    const response = NextResponse.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
    response.cookies.set("truepay-request-received", "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/thank-you/",
      maxAge: 300,
    });
    response.cookies.set("truepay-request-type", lead.formType, {
      httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/thank-you/", maxAge: 300,
    });
    return response;
  } catch {
    return failure(502);
  }
}
