export const formTypes = ["review", "contact"] as const;
export type Lead = {
  formType: (typeof formTypes)[number];
  name: string;
  business: string;
  email: string;
  phone: string;
  industry: string;
  message: string;
  pagePath: string;
  utm: Partial<
    Record<
      "utm_source" | "utm_medium" | "utm_campaign" | "utm_term" | "utm_content",
      string
    >
  >;
  consent: true;
};
export function validateLead(input: unknown): Lead | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const data = input as Record<string, unknown>;
  if (
    !formTypes.includes(data.formType as Lead["formType"]) ||
    data.consent !== true
  )
    return null;
  if (typeof data.website !== "string" || data.website !== "") return null;
  const field = (key: string, max: number, required = false) => {
    const value = data[key];
    if (
      typeof value !== "string" ||
      value.length > max ||
      /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)
    )
      throw new Error("Invalid field");
    if (required && !value.trim()) throw new Error("Missing field");
    return value.trim();
  };
  try {
    const name = field("name", 120, true),
      business = field("business", 160, true),
      email = field("email", 254, true),
      phone = field("phone", 40),
      industry = field("industry", 100),
      message = field("message", 2000),
      pagePath = field("pagePath", 256, true);
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !/^\/(?!\/)[^?#]*$/.test(pagePath)
    )
      return null;
    if (
      phone &&
      (!/^[+() .0-9-]+$/.test(phone) || phone.replace(/\D/g, "").length < 7)
    )
      return null;
    if (!data.utm || typeof data.utm !== "object" || Array.isArray(data.utm))
      return null;
    const utm: Lead["utm"] = {};
    for (const key of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ] as const) {
      const value = (data.utm as Record<string, unknown>)[key];
      if (value !== undefined) {
        if (typeof value !== "string" || value.length > 150) return null;
        utm[key] = value.trim();
      }
    }
    return {
      formType: data.formType as Lead["formType"],
      name,
      business,
      email,
      phone,
      industry,
      message,
      pagePath,
      utm,
      consent: true,
    };
  } catch {
    return null;
  }
}
/** Per-process protection; use a shared limiter at hosting for multi-instance deployments. */
export function createRateLimiter(limit = 5, windowMs = 10 * 60 * 1000) {
  const buckets = new Map<string, { count: number; reset: number }>();
  return (key: string, now = Date.now()) => {
    for (const [id, bucket] of buckets)
      if (bucket.reset <= now) buckets.delete(id);
    if (!buckets.has(key)) {
      if (buckets.size >= 10000) return false;
      buckets.set(key, { count: 0, reset: now + windowMs });
    }
    const bucket = buckets.get(key)!;
    bucket.count++;
    return bucket.count <= limit;
  };
}
