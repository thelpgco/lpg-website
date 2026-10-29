import Link from "next/link";
import JsonLd from "./JsonLd";
import { reviewDateFor, reviewedPageNode } from "@/lib/schema";
import { site } from "@/lib/site";
import emergency from "@/data/safety-review.json";

export default function SafetyReview({ path, name }: { path: string; name: string }) {
  const reviewedOn = reviewDateFor(path);
  const r = site.safetyReviewer;
  const node = reviewedPageNode({ path, name });
  const numbers = (emergency as { emergencyNumbers?: { label: string; number: string; note?: string }[] }).emergencyNumbers || [];
  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-ink-700">
      <p>
        <strong>Reviewed by:</strong> {r.name}. {r.experience}.{" "}
        {reviewedOn ? (
          <>
            Last reviewed on{" "}
            {new Date(reviewedOn + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}.
          </>
        ) : (
          <>Safety guidance is maintained by the team and updated when procedures change.</>
        )}
      </p>
      {numbers.length > 0 && (
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {numbers.map((n) => (
            <li key={n.number}>
              <strong>{n.label}:</strong> {n.number}
              {n.note ? ` — ${n.note}` : ""}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-2 text-ink-500">
        General safety information only. It does not replace appliance instructions or advice from a qualified engineer. See our{" "}
        <Link href="/editorial-policy/" className="underline">
          editorial policy
        </Link>
        .
      </p>
      {node && <JsonLd data={node} />}
    </div>
  );
}
