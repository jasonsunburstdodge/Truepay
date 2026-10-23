const keys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;
export function readUtm(): Partial<Record<(typeof keys)[number], string>> {
  if (typeof window === "undefined") return {};
  const current = new URLSearchParams(window.location.search);
  const values: Partial<Record<(typeof keys)[number], string>> = {};
  for (const key of keys) {
    const value = current.get(key);
    if (value) values[key] = value.slice(0, 150);
  }
  try {
    if (Object.keys(values).length)
      window.sessionStorage.setItem("truepay-utm", JSON.stringify(values));
    else {
      const stored: unknown = JSON.parse(
        window.sessionStorage.getItem("truepay-utm") ?? "{}",
      );
      if (stored && typeof stored === "object" && !Array.isArray(stored)) {
        for (const key of keys) {
          const value = (stored as Record<string, unknown>)[key];
          if (typeof value === "string") values[key] = value.slice(0, 150);
        }
      }
    }
  } catch {
    /* Storage may be unavailable; the current page's parameters still work. */
  }
  return values;
}
