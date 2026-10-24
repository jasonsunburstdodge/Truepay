import { getRoute } from "./routes";
import { guides } from "./guides";
/** Actual draft guide bylines, shared with each Article and its author profile. */
export const guideBylines = guides.map((guide) => ({ path: `/resources/${guide.slug}/`, authorSlug: guide.author }));
export function authoredGuides(authorSlug: string) {
  return guideBylines.filter((b) => b.authorSlug === authorSlug).flatMap((b) => {
    const route = getRoute(b.path);
    return route && route.template === "guide" && route.status !== "planned" ? [route] : [];
  });
}
