import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="font-display flex items-center gap-2 text-xl font-semibold text-ink">
      True<span className="text-gold">Pay</span>
    </Link>
  );
}
