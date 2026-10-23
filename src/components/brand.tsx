import Link from "next/link";

/** TruePay shield mark: gold outlined shield with a check. */
export function ShieldMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 36" className={className} aria-hidden="true" focusable="false">
      <path d="M16 2.5 4.5 6.8v9c0 8 5 14.3 11.5 17.8 6.5-3.5 11.5-9.8 11.5-17.8v-9L16 2.5Z" fill="none" stroke="var(--color-gold)" strokeWidth="3" strokeLinejoin="round" />
      <path d="m10.5 17.5 4 4 7.5-8.5" fill="none" stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Wordmark as in the ChatGPT build: heavy "True", light lowercase "pay". */
export function Logo({ tone = "light" }: { tone?: "dark" | "light" }) {
  const color = tone === "light" ? "text-white" : "text-ink";
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="TruePay home">
      <ShieldMark />
      <span className={`flex items-baseline gap-1.5 text-[1.6rem] leading-none ${color}`}>
        <span className="font-extrabold tracking-[-0.05em]">True</span>
        <span className="font-light tracking-[-0.02em]">pay</span>
      </span>
    </Link>
  );
}
