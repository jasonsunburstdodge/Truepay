import { notFound } from "next/navigation";
import { guides, getGuide } from "@/content/guides";
import { buildMetadata } from "@/lib/seo";
import { GuidePage } from "@/components/resources/GuidePage";
export const dynamicParams = false;
export function generateStaticParams() { return guides.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getGuide(slug)) notFound();
  return buildMetadata(`/resources/${slug}/`);
}
export default async function ResourceGuide({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  return <GuidePage guide={guide} />;
}
