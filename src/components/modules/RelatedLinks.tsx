import { getRoute, type RouteSpec } from "@/content/routes";
import { isBuilt } from "@/lib/navigation";
export function RelatedLinks({ route }: { route: RouteSpec }) {
  const links = route.links.filter(isBuilt).map((path) => getRoute(path)!);
  if (!links.length) return null;
  return (
    <aside className="related">
      <h2>Keep exploring</h2>
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            <a href={link.path}>{link.label}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
