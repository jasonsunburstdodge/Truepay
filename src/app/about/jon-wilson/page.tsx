import { buildMetadata } from "@/lib/seo";
import { ProfilePage } from "@/components/trust/ProfilePage";
export const metadata = buildMetadata("/about/jon-wilson/");
export default function Page() {
  return <ProfilePage slug="jon-wilson" />;
}
