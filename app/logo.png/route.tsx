import { ImageResponse } from "next/og";

// Square brand logo for structured data (Organization.logo needs at least 112×112). Same tile as app/icon.tsx.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#F97316",
          color: "#ffffff",
          fontWeight: 800,
        }}
      >
        <div style={{ fontSize: 200, lineHeight: 1 }}>LPG</div>
        <div style={{ fontSize: 56, marginTop: 24, letterSpacing: 4 }}>THE LPG CO.</div>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
