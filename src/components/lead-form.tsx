"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { entity } from "@/content/entity";
import { getRoute } from "@/content/routes";
import { readUtm } from "@/lib/utm";
import { track } from "@/lib/analytics";
export function LeadForm({
  formType = "review",
  placement,
}: {
  formType?: "review" | "contact" | "partner" | "careers";
  placement?: "home";
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [reason, setReason] = useState("new-business");
  const prefix = formType;
  const opportunity = formType === "partner" || formType === "careers";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    const data = new FormData(event.currentTarget);
    const utm = readUtm();
    try {
      const response = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType,
          ...(formType === "partner" ? { partnerPath: data.get("partnerPath") } : {}),
          name: data.get("name"),
          business: data.get("business"),
          email: data.get("email"),
          phone: data.get("phone") ?? "",
          industry: data.get("industry") ?? "",
          message: data.get("message") ?? "",
          pagePath: window.location.pathname,
          utm,
          consent: data.get("consent") === "on",
          website: data.get("website") ?? "",
        }),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true)
        throw new Error("Delivery failed");
      track(formType === "review" ? "review_submit" : formType === "partner" ? "partner_apply" : formType === "careers" ? "careers_apply" : "contact_submit");
      router.push("/thank-you/");
    } catch {
      setStatus("error");
    }
  }
  const title =
    formType === "review"
      ? "Get my free statement review"
      : formType === "partner" ? "Send my partner interest" : formType === "careers" ? "Share my work interests" : "Send your question";
  return (
    <div className="card lead-form">
      <h3>{title}</h3>
      {formType === "contact" && (
        <label htmlFor="contact-reason">
          What can we help with?
          <select
            id="contact-reason"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setStatus("idle");
            }}
          >
            <option value="new-business">
              Pricing, equipment or a new account
            </option>
            <option value="existing-merchant">
              Help with my existing account
            </option>
            <option value="partner">Partner opportunities</option>
          </select>
        </label>
      )}
      {reason === "existing-merchant" ? (
        <div className="reason-panel">
          <p>
            Already a TruePay merchant? Reach the support team directly about
            your account.
          </p>
          <a className="button primary" href="/support/" data-cta="support">
            Get merchant support
          </a>
        </div>
      ) : reason === "partner" ? (
        <div className="reason-panel">
          <p>Talk with the team about partner opportunities.</p>
          <a
            className="button primary"
            href={
              getRoute("/partners/")?.status !== "planned"
                ? "/partners/"
                : entity.phone.href
            }
          >
            {getRoute("/partners/")?.status !== "planned" ? "See the two partner paths" : `Call ${entity.phone.display}`}
          </a>
        </div>
      ) : (
        <form
          method="post"
          action="/api/lead/"
          onSubmit={(e) => {
            void submit(e);
          }}
        >
          <p>
            {formType === "review"
              ? placement === "home" ? "Use this first contact to ask about your processing bill. Statement files and account numbers belong outside this form." : "Request a review of the fee lines on your statement. Send contact details here and arrange statement sharing with the team."
              : formType === "partner" ? "Tell us which owners you work with and how you would like to introduce TruePay. Keep merchant statements and account details out of your application." : formType === "careers" ? "Describe your sales, onboarding or merchant-support experience. Send a short introduction here; a resume file is not collected through this form." : "Tell us what you’re trying to solve. Keep account numbers and financial details out of this form."}
          </p>
          <div hidden aria-hidden="true">
            <label>
              Leave this field empty
              <input name="website" autoComplete="off" tabIndex={-1} />
            </label>
          </div>
          {formType === "partner" && <label htmlFor="partner-role">Which path interests you?
            <select id="partner-role" name="partnerPath" defaultValue="discuss" required>
              <option value="discuss">Help me choose a path</option><option value="sales-rep">Sales rep</option><option value="referral-partner">Referral partner</option>
            </select>
          </label>}
          <label htmlFor={`${prefix}-name`}>
            Your name
            <input
              id={`${prefix}-name`}
              name="name"
              autoComplete="name"
              required
              maxLength={120}
            />
          </label>
          <label htmlFor={`${prefix}-business`}>
            {opportunity ? formType === "careers" ? "Current or recent work (optional)" : "Business or organization (optional)" : "Business name"}
            <input
              id={`${prefix}-business`}
              name="business"
              autoComplete="organization"
              required={!opportunity}
              maxLength={160}
            />
          </label>
          <div className="form-pair">
            <label htmlFor={`${prefix}-email`}>
              Email
              <input
                id={`${prefix}-email`}
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
              />
            </label>
            <label htmlFor={`${prefix}-phone`}>
              Phone (optional)
              <input
                id={`${prefix}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={40}
              />
            </label>
          </div>
          <label htmlFor={`${prefix}-industry`}>
            {formType === "partner" ? "Types of owners you know (optional)" : formType === "careers" ? "Work you would like to do (optional)" : "Your type of business (optional)"}
            <input
              id={`${prefix}-industry`}
              name="industry"
              maxLength={100}
              autoComplete="off"
            />
          </label>
          <label htmlFor={`${prefix}-message`}>
            {formType === "partner" ? "How do you work with those owners? (optional)" : formType === "careers" ? "Tell us about your relevant experience (optional)" : "What would you like help with? (optional)"}
            <textarea
              id={`${prefix}-message`}
              name="message"
              rows={3}
              maxLength={2000}
            />
          </label>
          <label className="consent">
            <input type="checkbox" name="consent" required />
            <span>{formType === "partner" ? "TruePay may contact me about the partner path I have selected." : formType === "careers" ? "I agree to be contacted about my career interest at TruePay." : "I agree that TruePay may contact me about this request."}</span>
          </label>
          <button
            type="submit"
            className="button primary"
            data-cta={
              formType === "review" ? "statement-review" : formType === "partner" ? "partner-apply" : formType === "careers" ? "careers-apply" : "talk-to-person"
            }
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending…" : title}
          </button>
          {status === "error" && (
            <p role="alert" className="form-error">
              {formType === "partner" ? "Your partner introduction was not delivered. Please call " : formType === "careers" ? "Your work introduction could not be sent. Call " : "Something went wrong. Please call "}{" "}
              <a href={entity.phone.href}>{entity.phone.display}</a>.
            </p>
          )}
          <p className="note">
            {opportunity && <><a href="/privacy-policy/#website-forms">How this website handles your introduction</a>. </>}You can also call{" "}
            <a href={entity.phone.href}>{entity.phone.display}</a> directly. {formType === "partner" ? "Call about the rep or referral path if this introduction cannot be delivered." : formType === "careers" ? "Ask how to share your work background if the interest form is unavailable." : formType === "contact" ? "If your contact request does not go through, use the phone number for pricing or account questions." : placement === "home" ? "Call to arrange the statement conversation if you cannot send this first message." : "If the review request cannot be sent, call before sharing any statement file."}
          </p>
        </form>
      )}
    </div>
  );
}
