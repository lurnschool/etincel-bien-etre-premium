import { ImageResponse } from "next/og";

// OpenGraph image 1200x630 — partagée sur Facebook, LinkedIn, Slack, etc.
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Etincel de bien être — Céline Dusseval, accompagnatrice holistique en Gironde";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #2a1232 0%, #4a2742 45%, #3a1f3d 100%)",
          padding: 80,
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* Halos dorés en arrière-plan */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,168,106,0.35) 0%, rgba(201,168,106,0) 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,213,173,0.25) 0%, rgba(201,168,106,0) 70%)",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
            position: "relative",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 2 L17.5 14.5 L30 16 L17.5 17.5 L16 30 L14.5 17.5 L2 16 L14.5 14.5 Z"
              fill="#c9a86a"
            />
          </svg>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              color: "#c9a86a",
              textTransform: "uppercase",
              fontWeight: 400,
            }}
          >
            Etincel · de bien être
          </div>
        </div>

        {/* Titre principal — chaque ligne dans son propre div (satori
            ne sait pas faire wrap dans un display:flex sans direction) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 80,
            color: "#f5efe3",
            lineHeight: 1.05,
            letterSpacing: -1.5,
            maxWidth: 980,
            position: "relative",
          }}
        >
          <div style={{ display: "flex" }}>Libérer les mémoires,</div>
          <div style={{ display: "flex" }}>revenir au corps,</div>
          <div
            style={{
              display: "flex",
              fontStyle: "italic",
              color: "#e8d5ad",
            }}
          >
            retrouver votre élan.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 24,
              color: "rgba(245,239,227,0.75)",
              maxWidth: 700,
              lineHeight: 1.4,
            }}
          >
            <div style={{ display: "flex" }}>
              Céline Dusseval · accompagnatrice holistique en Gironde
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 18,
                marginTop: 6,
                color: "rgba(245,239,227,0.55)",
              }}
            >
              Mémoires & constellations · Féminin & cacao · Corps & intégration
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 28px",
              borderRadius: 999,
              background: "rgba(201,168,106,0.18)",
              border: "1px solid rgba(201,168,106,0.5)",
              color: "#f5efe3",
              fontSize: 20,
            }}
          >
            etinceldebienetre.fr
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
