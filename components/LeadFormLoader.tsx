import LeadForm from "./LeadForm";
import { formCities } from "@/lib/network";

// Server wrapper so pages don't need to pass the city list around.
export default function SiteLeadForm(props: Omit<React.ComponentProps<typeof LeadForm>, "cities">) {
  const cities = formCities.map((c) => ({ slug: c.slug, name: c.name }));
  return <LeadForm cities={cities} {...props} />;
}
