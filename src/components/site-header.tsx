"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { industries } from "@/lib/industries";
import { siteConfig } from "@/lib/site-config";

// Industries dropdown links all point to the homepage's #industries anchor.
// The repo has no CMS or dedicated routing yet — see README.md "Pre-build
// review" item 4. Next.js App Router can support /industries/[slug] pages
// later without restructuring the nav; flagged there as a phase-2 SEO
// opportunity (each page could target long-tail terms like "restaurant
// credit card processing") rather than building it now.
export function SiteHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo />

        <nav aria-label="Primary">
          <ul className="flex items-center gap-6">
            <li className="nav-item has-dropdown hidden sm:block">
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-text hover:text-navy"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                onClick={(e) => {
                  if (typeof window !== "undefined" && window.innerWidth > 1024) return;
                  e.preventDefault();
                  setDropdownOpen((open) => !open);
                }}
              >
                Industries <span aria-hidden="true">▾</span>
              </button>
              <ul className={`dropdown-menu${dropdownOpen ? " open" : ""}`}>
                {industries.map((industry) => (
                  <li key={industry.slug}>
                    <Link
                      href="/#industries"
                      className="block px-4 py-2.5 text-sm text-text hover:bg-cream"
                    >
                      {industry.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="hidden sm:block">
              <Link href="/#calculator" className="text-sm font-medium text-text hover:text-navy">
                Rate Calculator
              </Link>
            </li>
          </ul>
        </nav>

        <a
          href={siteConfig.phoneHref}
          className="hidden items-center gap-2 rounded-md border border-navy/20 px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-navy hover:bg-navy/5 sm:inline-flex"
        >
          {siteConfig.phone}
        </a>
      </div>
    </header>
  );
}
