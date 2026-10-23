"use client";
import { useRef, useState, type KeyboardEvent } from "react";
export function MobileMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
      button.current?.focus();
    }
  }
  return (
    <div className="mobile-menu" onKeyDown={onKeyDown}>
      <button
        ref={button}
        type="button"
        className="button outline"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
      >
        Menu <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!open}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setOpen(false);
        }}
      >
        {children}
      </nav>
    </div>
  );
}
