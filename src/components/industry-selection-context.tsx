"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "selected_industry";

type IndustrySelectionContextValue = {
  selectedIndustry: string | null;
  selectIndustry: (slug: string) => void;
};

const IndustrySelectionContext =
  createContext<IndustrySelectionContextValue | null>(null);

export function IndustrySelectionProvider({ children }: { children: ReactNode }) {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  // Restore from sessionStorage on mount so a page reload (or the lead form,
  // which reads this same key on submit per the brief) sees a consistent value.
  useEffect(() => {
    // Deferred one frame out of the synchronous effect body
    // (react-hooks/set-state-in-effect) — imperceptible on mount.
    const raf = requestAnimationFrame(() => {
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) setSelectedIndustry(stored);
      } catch {
        // sessionStorage unavailable (privacy mode, etc.) — non-fatal, just skip restore.
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const selectIndustry = useCallback((slug: string) => {
    setSelectedIndustry(slug);
    try {
      sessionStorage.setItem(STORAGE_KEY, slug);
    } catch {
      // Non-fatal: the live UI update still works via React state.
    }
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <IndustrySelectionContext.Provider value={{ selectedIndustry, selectIndustry }}>
      {children}
    </IndustrySelectionContext.Provider>
  );
}

export function useIndustrySelection() {
  const ctx = useContext(IndustrySelectionContext);
  if (!ctx) {
    throw new Error(
      "useIndustrySelection must be used within an IndustrySelectionProvider",
    );
  }
  return ctx;
}

export { STORAGE_KEY as INDUSTRY_STORAGE_KEY };
