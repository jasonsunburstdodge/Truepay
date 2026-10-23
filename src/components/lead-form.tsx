"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { track } from "@/lib/analytics";

type FormType = "statement-review" | "contact" | "partner" | "careers";
type Status = "idle" | "submitting" | "error";

const INDUSTRIES = ["Restaurant or bar", "Retail store", "Salon or spa", "Medical or dental", "Home services", "Auto services", "Professional services", "Nonprofit", "Other"];

const config: Record<FormType, { submit: string; event: "review_submit" | "contact_submit" | "partner_apply" | "careers_submit" }> = {
  "statement-review": { submit: "Request my free statement review", event: "review_submit" },
  contact: { submit: "Send my message", event: "contact_submit" },
  partner: { submit: "Send my partner application", event: "partner_apply" },
  careers: { submit: "Send my information", event: "careers_submit" },
};

export function LeadForm({ formType }: { formType: FormType }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const c = config[formType];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email ?? "")) next.email = "Enter an email address like name@business.com.";
    if (formType === "statement-review" && !data.business?.trim()) next.business = "Enter your business name.";
    if (!data.consent) next.consent = "Please confirm we can contact you.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("submitting");
    try {
      const params = new URLSearchParams(window.location.search);
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          formType,
          page: window.location.pathname,
          utm_source: params.get("utm_source") ?? "",
          utm_medium: params.get("utm_medium") ?? "",
          utm_campaign: params.get("utm_campaign") ?? "",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track(c.event);
      router.push("/thank-you/");
    } catch {
      setStatus("error");
    }
  }

  const input = "mt-1.5 w-full rounded-[var(--radius-sm)] border-2 bg-paper px-3.5 py-3 text-[1.02rem] text-ink outline-none focus:border-navy";
  const field = (name: string, label: string, type = "text", required = false, autoComplete?: string) => (
    <div>
      <label htmlFor={`${formType}-${name}`} className="text-[0.95rem] font-bold text-ink">
        {label}
        {!required && <span className="font-normal text-text-muted"> (optional)</span>}
      </label>
      <input
        id={`${formType}-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${formType}-${name}-err` : undefined}
        className={`${input} ${errors[name] ? "border-warn" : "border-border"}`}
      />
      {errors[name] && (
        <p id={`${formType}-${name}-err`} className="mt-1 text-sm text-warn">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form noValidate onSubmit={onSubmit} className="relative grid gap-5 rounded-[var(--radius-lg)] bg-paper p-6 shadow-[0_30px_70px_rgba(0,0,0,0.3)] sm:p-9">
      <div className="grid gap-4 sm:grid-cols-2">
        {field("name", "Your name", "text", true, "name")}
        {field("business", "Business name", "text", formType === "statement-review", "organization")}
        {field("email", "Email", "email", true, "email")}
        {field("phone", "Phone", "tel", false, "tel")}
      </div>
      {(formType === "statement-review" || formType === "contact") && (
        <div>
          <label htmlFor={`${formType}-industry`} className="text-[0.95rem] font-bold text-ink">
            Type of business <span className="font-normal text-text-muted">(optional)</span>
          </label>
          <select id={`${formType}-industry`} name="industry" className={`${input} border-border`} defaultValue="">
            <option value="">Choose one</option>
            {INDUSTRIES.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label htmlFor={`${formType}-message`} className="text-[0.95rem] font-bold text-ink">
          {formType === "statement-review" ? "Anything we should know?" : formType === "partner" ? "Who do you serve, and how would you like to work with us?" : "How can we help?"}{" "}
          <span className="font-normal text-text-muted">(optional)</span>
        </label>
        <textarea id={`${formType}-message`} name="message" rows={3} className={`${input} border-border`} />
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${formType}-website`}>Website</label>
        <input id={`${formType}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex items-start gap-2.5 text-sm text-text">
          <input type="checkbox" name="consent" value="yes" className="mt-1 h-4 w-4 accent-[var(--color-navy)]" />
          <span>TruePay may contact me by phone, text or email about this request. Message and data rates may apply.</span>
        </label>
        {errors.consent && <p className="mt-1 text-sm text-warn">{errors.consent}</p>}
      </div>

      <button type="submit" disabled={status === "submitting"} className="rounded-[var(--radius-sm)] bg-gold px-6 py-4 text-[1.05rem] font-bold text-navy-deep transition-colors hover:bg-gold-bright disabled:opacity-60">
        {status === "submitting" ? "Sending…" : c.submit}
      </button>

      {status === "error" && (
        <p role="alert" className="text-sm text-warn">
          Your message didn&apos;t go through. Please call us at 888-792-0284 and we&apos;ll take care of it by phone.
        </p>
      )}
    </form>
  );
}
