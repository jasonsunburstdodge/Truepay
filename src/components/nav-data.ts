import { getRoute, primaryNav, utilityNav } from "@/content/routes";

/** Navigation built from the manifest, hiding routes that aren't built yet. */
const visible = (path: string) => {
  const r = getRoute(path);
  return r && r.status !== "planned" ? r : undefined;
};

export type NavGroup = { label: string; path: string; children: { label: string; path: string }[] };

export function navGroups(): NavGroup[] {
  return primaryNav
    .filter((n) => visible(n.path))
    .map((n) => ({
      label: n.label,
      path: n.path,
      children: (n.children ?? []).map(visible).filter((r) => r !== undefined).map((r) => ({ label: r.label, path: r.path })),
    }));
}

export function utilityLinks() {
  return utilityNav.map(visible).filter((r) => r !== undefined).map((r) => ({ label: r.label, path: r.path }));
}

export function link(path: string) {
  const r = visible(path);
  return r ? { label: r.label, path: r.path } : undefined;
}
