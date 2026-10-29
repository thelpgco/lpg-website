import IndustryPage from "@/components/r4plus/IndustryPage";
import { meta } from "@/lib/seo";

export const metadata = meta({ path: "/industries/food-processing/" });

export default function Page() {
  return <IndustryPage slug="food-processing" />;
}
