/** Small label for any DEMO-only record shown in management demonstration mode. */
export default function DemoBadge({ label = "Demo" }: { label?: string }) {
  return (
    <span className="inline-block rounded bg-amber-200 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-amber-950">
      {label}
    </span>
  );
}
