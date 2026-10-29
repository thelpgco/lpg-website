import { demoBannerText } from "@/lib/mode";

export default function DemoBanner() {
  const text = demoBannerText();
  if (!text) return null;
  return (
    <div className="border-b border-amber-300 bg-amber-50 px-4 py-2 text-center text-sm text-amber-950" role="status">
      {text}
    </div>
  );
}
