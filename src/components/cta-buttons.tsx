import { siteConfig } from "@/lib/site-config";

export function CtaButtons({
  className = "",
  size = "default",
}: {
  className?: string;
  size?: "default" | "compact";
}) {
  const padding = size === "compact" ? "px-4 py-2.5 text-xs" : "px-5 py-3 text-sm";

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href="#calculator"
        className={`inline-flex items-center gap-2 rounded-md bg-gold ${padding} font-semibold text-ink transition-colors hover:bg-gold-bright`}
      >
        Calculate my rate — takes 60 seconds
      </a>
      <a
        href={siteConfig.phoneHref}
        className={`inline-flex items-center gap-2 rounded-md border border-navy/20 ${padding} font-semibold text-navy transition-colors hover:border-navy hover:bg-navy/5`}
      >
        Prefer to talk? Call {siteConfig.phone}
      </a>
    </div>
  );
}
