import { NextResponse } from "next/server";
// Phase 1 owns validated webhook delivery. Until then, fail closed: never log
// contact details or report success without delivering a request.
export async function POST() {
  return NextResponse.json(
    { ok: false, error: "Something went wrong. Please call 888-792-0284" },
    { status: 503 },
  );
}
