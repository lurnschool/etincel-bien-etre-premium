import { ImageResponse } from "next/og";

// Favicon 32x32 — étincelle dorée sur sphère améthyste, identité Etincel
export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 30% 30%, #9a7ec0 0%, #6b4f8a 38%, #4a3463 100%)",
          borderRadius: 16,
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 2 L17.5 14.5 L30 16 L17.5 17.5 L16 30 L14.5 17.5 L2 16 L14.5 14.5 Z"
            fill="#c9a86a"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
