import { NextResponse } from "next/server";
import { forgetLead, isDuplicateLead, notifyLead, rateLimited, storeLead, validateLead } from "@/lib/leads";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Pretend success so bots don't retry.
  if (body && typeof body === "object" && (body as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true });
  }

  const result = validateLead(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  if (isDuplicateLead(result.lead)) {
    return NextResponse.json({ ok: true });
  }

  try {
    await storeLead(result.lead);
  } catch (err) {
    forgetLead(result.lead);
    console.error("[leads] store failed:", err);
    return NextResponse.json(
      { ok: false, error: "We could not save your request. Please call or WhatsApp us instead." },
      { status: 503 },
    );
  }

  notifyLead(result.lead).catch((err) => console.error("[leads] notify failed:", err));

  return NextResponse.json({ ok: true });
}
