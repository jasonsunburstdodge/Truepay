const methods = [
  { label: "Card-present", detail: "Countertop terminals and card readers for in-person sales." },
  { label: "Online", detail: "A hosted checkout or API integration for e-commerce." },
  { label: "Mobile", detail: "Take payment on a phone or tablet anywhere the job takes you." },
  { label: "Invoicing", detail: "Send a payable invoice and collect by card or ACH." },
];

// Generic payment-method categories, not company-specific claims — placed
// here so the industries section (brief task 5) has the "after the existing
// 'How do you take payments?' section" anchor point the brief assumes.
export function PaymentMethodsSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="font-display text-center text-3xl text-ink sm:text-4xl">
        How do you take payments?
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {methods.map((m) => (
          <div
            key={m.label}
            className="rounded-[var(--radius-md)] border border-border bg-white p-5 text-center"
          >
            <p className="font-semibold text-ink">{m.label}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-text-muted">{m.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
