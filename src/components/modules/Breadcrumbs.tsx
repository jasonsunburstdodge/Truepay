import { breadcrumbTrail } from "@/content/routes";
import { breadcrumbNode } from "@/lib/schema";
import { JsonLd } from "@/components/json-ld";
export function Breadcrumbs({ path }: { path: string }) {
  const trail = breadcrumbTrail(path);
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="breadcrumbs">
          {trail.map((r, i) => (
            <li key={r.path}>
              {i === trail.length - 1 ? (
                <span aria-current="page">{r.label}</span>
              ) : (
                <a href={r.path}>{r.label}</a>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd nodes={[breadcrumbNode(path)]} />
    </>
  );
}
