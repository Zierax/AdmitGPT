import { ImageResponse } from "next/og";
import { SITE_ORIGIN } from "./siteConfig";

const WIDTH = 1200;
const HEIGHT = 630;

/**
 * Shared renderer for per-guide Open Graph images. Each guide's
 * opengraph-image.tsx calls this with its own title so social shares show a
 * relevant, on-brand card instead of the generic homepage calculator image.
 */
export function renderGuideOg(title: string, eyebrow = "AdmitGPT Guide") {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#08090c",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "54px",
              height: "54px",
              backgroundColor: "#c6ff1a",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#08090c",
              fontWeight: 900,
              fontSize: "26px",
            }}
          >
            A
          </div>
          <span style={{ color: "#eef1f7", fontSize: "24px", fontWeight: 800, letterSpacing: "-0.02em" }}>
            Admit<span style={{ color: "#c6ff1a" }}>GPT</span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ color: "#c6ff1a", fontSize: "22px", fontWeight: 700, letterSpacing: "0.02em" }}>
            {eyebrow}
          </div>
          <h1
            style={{
              fontSize: "62px",
              fontWeight: 900,
              color: "#eef1f7",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: 0,
              maxWidth: "1000px",
            }}
          >
            {title}
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "24px",
          }}
        >
          <span style={{ color: "#6b7280", fontSize: "20px", fontWeight: 500 }}>
            {SITE_ORIGIN.replace(/^https?:\/\//, "")}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#c6ff1a", fontSize: "20px" }}>&#10038;</span>
            <span style={{ color: "#c6ff1a", fontSize: "20px", fontWeight: 700, letterSpacing: "0.01em" }}>
              Free · Open-Source · Transparent
            </span>
          </div>
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT }
  );
}
