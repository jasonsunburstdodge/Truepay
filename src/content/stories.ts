import { getRoute, type RouteSpec } from "./routes";
import type { Source } from "@/components/modules/Sources";
export type CustomerStory = {
  slug: string;
  business: string;
  city: string;
  title: string;
  description: string;
  answer: string;
  problem: string;
  change: string;
  outcome: string;
  authorSlug: string;
  datePublished: string;
  dateModified: string;
  sources: Source[];
  permissionVerified: boolean;
  status: "draft" | "live";
};
/** No permissioned merchant interviews or case studies have been supplied. */
export const customerStories: CustomerStory[] = [];
export const publishedStories = () =>
  customerStories.filter((s) => s.status === "live" && s.permissionVerified);
export const getPublishedStory = (slug: string) =>
  publishedStories().find((s) => s.slug === slug);
export function storyRoute(story: CustomerStory): RouteSpec {
  const template = getRoute("/customer-stories/[slug]/")!;
  return {
    ...template,
    path: `/customer-stories/${story.slug}/`,
    label: story.business,
    title: `${story.business} + TruePay | TruePay`,
    description: story.description,
    h1: story.title,
    status: story.status,
  };
}
