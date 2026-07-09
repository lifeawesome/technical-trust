import { ImageResponse } from "next/og";

export const alt = "Dan Davidson — I Build Technical Trust";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "#0f172a",
          color: "#f8fafc",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.12,
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #f59e0b 1px, transparent 1px), radial-gradient(circle at 70% 60%, #475569 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />
        <p style={{ fontSize: 22, letterSpacing: 6, color: "#f59e0b", marginBottom: 24 }}>
          TECHNICAL TRUST
        </p>
        <h1 style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
          Dan Davidson
        </h1>
        <p style={{ fontSize: 36, color: "#cbd5e1", marginTop: 16 }}>
          I build technical trust.
        </p>
      </div>
    ),
    { ...size },
  );
}
