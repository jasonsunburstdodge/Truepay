import Link from "next/link";
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="TruePay home">
      <svg
        width="37"
        height="43"
        viewBox="0 0 40 46"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 3 36 9v14c0 10-9 16-16 20C13 39 4 33 4 23V9L20 3Z"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="m12 23 6 6 12-13"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>
        <strong>True</strong>
        <span className="logo-pay">pay</span>
      </span>
    </Link>
  );
}
