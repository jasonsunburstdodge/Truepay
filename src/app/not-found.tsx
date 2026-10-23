import Link from "next/link";

export default function NotFound() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/pricing/", label: "Pricing" },
    { href: "/statement-review/", label: "Free statement review" },
    { href: "/contact/", label: "Contact us" },
  ];
  return (
    <section className="container-tp grid gap-4 py-20">
      <p className="eyebrow">Page not found</p>
      <h1 className="font-display text-4xl text-ink">We couldn&apos;t find that page.</h1>
      <p className="measure text-lg text-text">It may have moved when we rebuilt the site. These are good places to pick up:</p>
      <ul className="flex flex-wrap gap-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-flex rounded-md border border-navy/25 px-4 py-2 font-semibold text-navy hover:bg-navy/5">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
