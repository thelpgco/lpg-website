import IndustryPage from "@/components/r4plus/IndustryPage";
import { meta } from "@/lib/seo";

export const metadata = meta({ path: "/industries/hospitals/" });

export default function Page() {
  return <IndustryPage slug="hospitals" />;
}
