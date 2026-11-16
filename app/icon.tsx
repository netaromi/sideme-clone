import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 38,
          background: "#0f172a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "16px",
          border: "4px solid #10b981",
          color: "#34d399",
          fontWeight: "bold",
        }}
      >
        🚀
      </div>
    ),
    {
      ...size,
    }
  );
}