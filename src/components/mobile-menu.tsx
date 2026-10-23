"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import type { NavGroup } from "@/components/nav-data";

export function MobileMenu({
  groups,
  utility,
  phone,
}: {
  groups: NavGroup[];
  utility: { label: string; path: string }[];
  phone: { display: string; href: string };
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  // Close when the route changes (adjusting state during render) or Escape is pressed.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-semibold text-navy"
      >
        <span aria-hidden="true" className="text-base leading-none">{open ? "✕" : "☰"}</span>
        Menu
      </button>
      <div id={panelId} hidden={!open} className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border bg-paper shadow-[var(--shadow-card-hover)]">
        <nav aria-label="Mobile" className="container-tp grid gap-5 py-5">
          {groups.map((g) => (
            <div key={g.path}>
              <Link href={g.path} className="font-display text-lg text-ink">
                {g.label}
              </Link>
              {g.children.length > 0 && (
                <ul className="mt-2 grid grid-cols-1 gap-1 border-l border-border pl-3 sm:grid-cols-2">
                  {g.children.map((c) => (
                    <li key={c.path}>
                      <Link href={c.path} className="block py-1.5 text-[0.95rem] text-text">
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 text-sm font-medium">
            {utility.map((u) => (
              <Link key={u.path} href={u.path} className="text-navy">
                {u.label}
              </Link>
            ))}
            <a href={phone.href} className="text-navy">
              Call {phone.display}
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
