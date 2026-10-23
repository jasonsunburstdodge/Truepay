"use client";
import { useState, type FormEvent } from "react";
import { entity } from "@/content/entity";
export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const data = new FormData(event.currentTarget);
    try {
      await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: data.get("business"),
          email: data.get("email"),
          phone: data.get("phone"),
        }),
      });
    } finally {
      setStatus("error");
    }
  }
  return (
    <form
      className="card lead-form"
      onSubmit={(e) => {
        void submit(e).catch(() => setStatus("error"));
      }}
    >
      <h3>Get my free statement review</h3>
      <p>
        Leave your contact details to request a conversation about your
        statement.
      </p>
      <label htmlFor="business">
        Business name
        <input
          id="business"
          name="business"
          autoComplete="organization"
          required
          maxLength={160}
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
        />
      </label>
      <label htmlFor="phone">
        Phone (optional)
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={40}
        />
      </label>
      <p className="note">
        By submitting, you ask TruePay to contact you about this request. Don’t
        include financial or account details.
      </p>
      <button
        type="submit"
        className="button primary"
        data-cta="statement-review"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Get my free statement review"}
      </button>
      {status === "error" && (
        <p role="alert">
          Something went wrong. Please call{" "}
          <a href={entity.phone.href}>{entity.phone.display}</a>.
        </p>
      )}
      <p className="note">
        You can also call <a href={entity.phone.href}>{entity.phone.display}</a>{" "}
        directly.
      </p>
    </form>
  );
}
