import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "THE LPG CO. PAKISTAN: LPG cylinders, gas supply and engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social-share card. It states only the brand and what the site covers (no price, no claim),
// so it never goes out of date. Pages with their own data (monthly price) can add a card later.
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
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
          padding: 70,
          background: "#ffffff",
          color: "#0B2A6F",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={760} height={336} alt="" />
        <div style={{ display: "flex", fontSize: 38, marginTop: 36, color: "#1f2937" }}>
          LPG cylinders, gas supply and engineering across Pakistan
        </div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 22, color: "#C8102E" }}>Islamabad G-12 · WhatsApp +92 339 4022940</div>
      </div>
    ),
    size,
  );
}
