import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          background: "linear-gradient(160deg, #12353a 0%, #0c2824 45%, #071a18 100%)",
          color: "#e8f2ef",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 80,
            top: 60,
            width: 280,
            height: 280,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(201,166,107,0.35), transparent 70%)",
          }}
        />
        <div style={{ fontSize: 28, letterSpacing: 4, color: "#e8d4a8", marginBottom: 16 }}>
          LIVE CREEK CAMERA
        </div>
        <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: -2, lineHeight: 1 }}>
          {SITE.name}
        </div>
        <div style={{ fontSize: 36, color: "#9ecfc4", marginTop: 18, fontStyle: "italic" }}>
          {SITE.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
