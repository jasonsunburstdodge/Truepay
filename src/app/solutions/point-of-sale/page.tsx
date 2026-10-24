import { solutions } from "@/content/solutions";
import { SolutionPage } from "@/components/solutions/SolutionPage";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata("/solutions/point-of-sale/");
export default function Page() {
  return (
    <SolutionPage
      solution={solutions.find((s) => s.path === "/solutions/point-of-sale/")!}
    />
  );
}
