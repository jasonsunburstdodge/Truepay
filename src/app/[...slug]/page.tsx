import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getRoute, routes } from "@/content/routes";
import { pageContent } from "@/content/pages";
import { buildMetadata } from "@/lib/seo";
import { pageGraph } from "@/lib/schema";
import { BlockView } from "@/components/blocks";
import { CtaBand, PageHeader, RelatedLinks } from "@/components/page-parts";
import { JsonLd } from "@/components/site-chrome";

/** Every manifest route except the homepage is rendered here from src/content/pages. */
export const dynamicParams = false;

export function generateStaticParams() {
  return routes
    .filter((r) => r.path !== "/" && !r.path.includes("[") && r.status !== "planned" && pageContent[r.path])
    .map((r) => ({ slug: r.path.split("/").filter(Boolean) }));
}

const toPath = (slug: string[]) => `/${slug.join("/")}/`;

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  return buildMetadata(toPath(slug));
}

const PROFILE_SLUGS: Record<string, string> = { "/about/jon-wilson/": "jon-wilson", "/about/shane-spears/": "shane-spears" };

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = toPath(slug);
  const route = getRoute(path);
  const content = pageContent[path];
  if (!route || !content || route.status === "planned") notFound();

  const commercial = !["guide", "legal", "utility", "profile"].includes(route.template) || path === "/contact/";
  return (
    <>
      <JsonLd data={pageGraph(path, { article: content.guide, profileSlug: PROFILE_SLUGS[path] })} />
      <PageHeader
        route={route}
        answer={content.answer}
        eyebrow={content.eyebrow}
        guide={content.guide}
        heroCtas={content.heroCtas ?? commercial}
        buttons={content.heroButtons}
        overlapBelow={content.blocks[0]?.type === "stats" && !!content.blocks[0].overlap}
      />
      {content.blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
      <RelatedLinks paths={route.links} />
      <CtaBand route={route} />
    </>
  );
}
