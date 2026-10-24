import { getRoute } from "./routes";
/** Populate only with the actual bylines when approved guides are built. */
export const guideBylines: { path: string; authorSlug: string }[] = [];
export function authoredGuides(authorSlug: string) {
  return guideBylines
    .filter((b) => b.authorSlug === authorSlug)
    .flatMap((b) => {
      const route = getRoute(b.path);
      return route && route.template === "guide" && route.status !== "planned"
        ? [route]
        : [];
    });
}
