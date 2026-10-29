// Tiny analytics helper. Does nothing unless the GA4 loader (components/Analytics.tsx) is active.
type Gtag = (...args: unknown[]) => void;

export function track(event: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  g?.("event", event, params);
}
