import { notFound } from "next/navigation";
import { industryPages } from "@/content/industries";
import { buildMetadata } from "@/lib/seo";
import { IndustryPage } from "@/components/industries/IndustryPage";
export const dynamicParams = false;
export function generateStaticParams() { return industryPages.map(({slug}) => ({slug})); }
export async function generateMetadata({params}: {params: Promise<{slug:string}>}) {
  const {slug}=await params; if(!industryPages.some(p=>p.slug===slug))notFound();
  return buildMetadata(`/industries/${slug}/`);
}
export default async function Industry({params}: {params: Promise<{slug:string}>}) {
  const {slug}=await params;
  const content=industryPages.find(p=>p.slug===slug); if(!content)notFound();
  return <IndustryPage content={content} />;
}
