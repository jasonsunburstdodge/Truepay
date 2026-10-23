import { getRoute, primaryNav, utilityNav } from "@/content/routes";
export const isBuilt = (path: string) => {
  const route = getRoute(path);
  return !!route && route.status !== "planned";
};
export function navigation() {
  return primaryNav
    .filter((item) => isBuilt(item.path))
    .map((item) => ({
      ...item,
      children: item.children?.filter(isBuilt).map((path) => getRoute(path)!),
    }));
}
export function utilityNavigation() {
  return utilityNav.filter(isBuilt).map((path) => getRoute(path)!);
}
