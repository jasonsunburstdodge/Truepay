"use client";
import { useEffect } from "react";
import Script from "next/script";
import { readUtm } from "@/lib/utm";
import { analyticsId, track } from "@/lib/analytics";
export function Analytics() {
  useEffect(() => {
    readUtm();
    if (!analyticsId || !/^G-[A-Z0-9]+$/.test(analyticsId)) return;
    window.dataLayer ??= [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer!.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", analyticsId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: window.location.origin + window.location.pathname,
      page_referrer: "",
    });
    const clicked = (event: MouseEvent) => {
      const link = (event.target as Element)?.closest?.("a");
      const href = link?.getAttribute("href");
      if (href?.startsWith("tel:")) track("call_click");
      if (href?.startsWith("sms:")) track("text_click");
    };
    document.addEventListener("click", clicked);
    return () => document.removeEventListener("click", clicked);
  }, []);
  if (!analyticsId || !/^G-[A-Z0-9]+$/.test(analyticsId)) return null;
  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
      strategy="afterInteractive"
    />
  );
}
