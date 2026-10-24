import { buildMetadata } from "@/lib/seo";
import { ProfilePage } from "@/components/trust/ProfilePage";
export const metadata = buildMetadata("/about/shane-spears/");
export default function Page() {
  return <ProfilePage slug="shane-spears" />;
}
