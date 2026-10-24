export type AnalyticsEvent =
  | "review_submit"
  | "contact_submit"
  | "partner_apply"
  | "careers_apply"
  | "call_click"
  | "text_click"
  | "calculator_complete";
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
export const analyticsId = process.env.NEXT_PUBLIC_GA_ID;
export function track(event: AnalyticsEvent) {
  if (
    typeof window === "undefined" ||
    !analyticsId ||
    !/^G-[A-Z0-9]+$/.test(analyticsId)
  )
    return;
  // Exclude query strings, form values, financial inputs and contact information.
  window.gtag?.("event", event, {
    send_to: analyticsId,
    page_location: window.location.origin + window.location.pathname,
    page_referrer: "",
    page_title: document.title,
  });
}
