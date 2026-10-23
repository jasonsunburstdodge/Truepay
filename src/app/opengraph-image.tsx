import { ImageResponse } from "next/og";
import { getRoute } from "@/content/routes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  const route = getRoute("/")!;
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
          background: "linear-gradient(145deg,#134171,#07274b)",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 30,
            color: "#e4b661",
            letterSpacing: 6,
            marginBottom: 40,
          }}
        >
          TRUEPAY
        </div>
        <div
          style={{
            fontSize: 86,
            fontWeight: 800,
            letterSpacing: -4,
            lineHeight: 1.03,
            maxWidth: 950,
          }}
        >
          {route.h1}
        </div>
        <div style={{ fontSize: 28, color: "#c6d3e2", marginTop: 40 }}>
          Payment processing. Josephine, Texas.
        </div>
      </div>
    ),
    size,
  );
}
