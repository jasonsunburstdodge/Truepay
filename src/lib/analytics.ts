/**
 * Tiny analytics wrapper. Sends GA4 events when NEXT_PUBLIC_GA_ID is set and
 * gtag is loaded; otherwise does nothing. Never pass form contents or personal data.
 */
type EventName = "review_submit" | "contact_submit" | "partner_apply" | "careers_submit" | "call_click" | "text_click" | "calculator_complete" | "estimator_used";

export function track(event: EventName, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", event, params);
}
