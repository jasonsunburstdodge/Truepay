import Link from "next/link";

/** TruePay shield mark (gold shield + check, as in the supplied logo). */
export function ShieldMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 36" className={className} aria-hidden="true" focusable="false">
      <path d="M16 2 4 6.5v9.2c0 8.2 5.1 14.6 12 18.3 6.9-3.7 12-10.1 12-18.3V6.5L16 2Z" fill="none" stroke="var(--color-gold)" strokeWidth="3" strokeLinejoin="round" />
      <path d="m10.5 17.5 4 4 7.5-8.5" fill="none" stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="TruePay home">
      <ShieldMark />
      <span className={`font-display text-[1.35rem] font-semibold tracking-tight ${tone === "light" ? "text-white" : "text-ink"}`}>
        True<span className="font-normal">Pay</span>
      </span>
    </Link>
  );
}
