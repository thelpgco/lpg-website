import { ImageResponse } from "next/og";

export const alt = "THE LPG CO. PAKISTAN: LPG cylinders, gas supply and engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social-share card. It states only the brand and what the site covers (no price, no claim),
// so it never goes out of date. Pages with their own data (monthly price) can add a card later.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#111827",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#F97316", fontWeight: 700 }}>thelpgco.pk</div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, marginTop: 18, lineHeight: 1.1 }}>THE LPG CO. PAKISTAN</div>
        <div style={{ display: "flex", fontSize: 38, marginTop: 28, color: "#d1d5db" }}>
          LPG cylinders, gas supply and engineering across Pakistan
        </div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 40, color: "#F97316" }}>Islamabad G-12 · WhatsApp +92 306 9701659</div>
      </div>
    ),
    size,
  );
}
