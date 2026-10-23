import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { claims } from "@/content/claims";
import { entity } from "@/content/entity";

const TOKEN = /(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)|(\{\{claim:[a-z0-9-]+(?:\|[^}]+)?\}\})|(\{\{phone\}\})/g;

/** Renders inline rich text: links, bold, claim tokens and the phone number. */
export function Rich({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(TOKEN)) {
    if (m.index! > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("[")) {
      const [, label, href] = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/)!;
      if (/^https?:/.test(href)) {
        out.push(
          <a key={key++} href={href} className="inline-link" target="_blank" rel="noopener noreferrer">
            {label}
          </a>,
        );
      } else {
        out.push(
          <Link key={key++} href={href} className="inline-link">
            {label}
          </Link>,
        );
      }
    } else if (tok.startsWith("**")) {
      out.push(<strong key={key++}>{tok.slice(2, -2)}</strong>);
    } else if (tok === "{{phone}}") {
      out.push(
        <a key={key++} href={entity.phone.href} className="inline-link whitespace-nowrap">
          {entity.phone.display}
        </a>,
      );
    } else {
      const [, id, custom] = tok.match(/^\{\{claim:([a-z0-9-]+)(?:\|([^}]+))?\}\}$/)!;
      const claim = claims.find((c) => c.id === id);
      if (!claim || claim.status === "banned") throw new Error(`Unknown or banned claim "${id}" in content`);
      out.push(
        <span key={key++} data-claim={id}>
          {custom ?? claim.copy}
        </span>,
      );
    }
    last = m.index! + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <Fragment>{out}</Fragment>;
}
