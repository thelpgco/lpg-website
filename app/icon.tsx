import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Favicon: brand-colour tile with the initials. Generated at build time, no binary asset to maintain.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F97316",
          color: "#ffffff",
          fontSize: 34,
          fontWeight: 800,
          borderRadius: 12,
        }}
      >
        LPG
      </div>
    ),
    size,
  );
}
