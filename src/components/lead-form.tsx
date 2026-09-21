"use client";

import { useState, type FormEvent } from "react";
import { INDUSTRY_STORAGE_KEY } from "@/components/industry-selection-context";

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Tag the lead with whatever industry card the visitor clicked earlier in
    // the session (brief task 9) — falls back to "not specified" so the field
    // always reaches the backend rather than being silently dropped.
    let selectedIndustry = "not specified";
    try {
      selectedIndustry = sessionStorage.getItem(INDUSTRY_STORAGE_KEY) ?? "not specified";
    } catch {
      // sessionStorage unavailable — keep the fallback.
    }

    const payload = {
      businessName: formData.get("business_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      selected_industry: selectedIndustry,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius-lg)] border border-border bg-white p-8 text-center shadow-[var(--shadow-card)]">
        <p className="font-display text-xl text-ink">You&apos;re all set.</p>
        <p className="mt-2 text-sm text-text-muted">
          A TruePay specialist will follow up with your free statement review shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[var(--radius-lg)] border border-border bg-white p-6 shadow-[var(--shadow-card)] sm:p-8"
    >
      <h2 className="font-display text-2xl text-ink">Get my free statement review</h2>
      <p className="mt-1 text-sm text-text-muted">
        Send us your latest statement and we&apos;ll show you exactly where your money is going.
      </p>

      <div className="mt-6 grid gap-4">
        <label className="block">
          <span className="text-sm font-medium text-text">Business name</span>
          <input
            name="business_name"
            type="text"
            required
            className="mt-1.5 w-full rounded-md border border-border bg-paper px-3 py-2.5 text-text outline-none focus:border-navy"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-text">Email</span>
          <input
            name="email"
            type="email"
            required
            className="mt-1.5 w-full rounded-md border border-border bg-paper px-3 py-2.5 text-text outline-none focus:border-navy"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-text">Phone</span>
          <input
            name="phone"
            type="tel"
            className="mt-1.5 w-full rounded-md border border-border bg-paper px-3 py-2.5 text-text outline-none focus:border-navy"
          />
        </label>

        {/* Populated from sessionStorage on submit above — see brief task 9. */}
        <input type="hidden" name="selected_industry" id="selected-industry-field" />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-md bg-gold px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-bright disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Get my free statement review"}
      </button>

      {status === "error" ? (
        <p className="mt-3 text-sm text-red-600">
          Something went wrong — please try again or call us directly.
        </p>
      ) : null}
    </form>
  );
}
