import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

// OpenGraph image 1200×630 — partagée sur Facebook, LinkedIn, Slack, iMessage…
// Sprint J : refonte avec photo Céline + composition "début du site".
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Etincel — Céline Dusseval, accompagnatrice holistique en Gironde";

export default async function OpenGraphImage() {
  // Photo de Céline avec tambour (visuel hero du site) — chargée en base64
  // car satori (moteur ImageResponse) ne sait pas résoudre les chemins
  // relatifs vers /public à build time. Image embarquée 1 seule fois.
  const imageBuffer = await readFile(
    join(
      process.cwd(),
      "public/images/source-site-original/approche-philosophie.jpg",
    ),
  );
  const photoData = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          background: "#fbf7ef",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* === Colonne texte (gauche, 660px) === */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 660,
            padding: "70px 60px 60px 80px",
            position: "relative",
            justifyContent: "space-between",
          }}
        >
          {/* Halo doré subtil en arrière */}
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: -120,
              left: -120,
              width: 480,
              height: 480,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(234,215,175,0.45) 0%, rgba(234,215,175,0) 70%)",
            }}
          />

          {/* Eyebrow : lieu + signature */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 16,
              letterSpacing: 5,
              color: "#8b819b",
              textTransform: "uppercase",
              fontWeight: 500,
              position: "relative",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
              <path
                d="M16 2 L17.5 14.5 L30 16 L17.5 17.5 L16 30 L14.5 17.5 L2 16 L14.5 14.5 Z"
                fill="#c9a86a"
              />
            </svg>
            <span>Bordeaux · Gironde</span>
            <span style={{ display: "flex", color: "#c9a86a" }}>·</span>
            <span>Etincel</span>
          </div>

          {/* Bloc principal : Bienvenue + titre */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              marginTop: 30,
            }}
          >
            {/* "Bienvenue" en cursive dorée */}
            <div
              style={{
                display: "flex",
                fontSize: 64,
                fontStyle: "italic",
                color: "#b88a3d",
                lineHeight: 1,
                letterSpacing: -1,
                marginBottom: 20,
              }}
            >
              Bienvenue.
            </div>

            {/* Titre principal — gradient or champagne (color simple car
                satori ne supporte pas background-clip:text) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 56,
                color: "#c89b45",
                lineHeight: 1.05,
                letterSpacing: -1.5,
                fontWeight: 500,
              }}
            >
              <div style={{ display: "flex" }}>Ici, vous pouvez</div>
              <div style={{ display: "flex" }}>vous poser un instant.</div>
            </div>

            {/* Filet doré */}
            <div
              style={{
                display: "flex",
                marginTop: 32,
                width: 80,
                height: 2,
                background:
                  "linear-gradient(90deg, #c9a86a 0%, rgba(201,168,106,0) 100%)",
              }}
            />

            {/* Sous-titre */}
            <div
              style={{
                display: "flex",
                marginTop: 18,
                fontSize: 22,
                color: "#4d4661",
                lineHeight: 1.4,
                fontStyle: "italic",
              }}
            >
              Céline Dusseval — un refuge en Gironde.
            </div>
          </div>

          {/* Footer : 3 axes + URL */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 16,
              color: "rgba(77,70,97,0.75)",
              position: "relative",
            }}
          >
            <div style={{ display: "flex" }}>
              Mémoires & constellations · Féminin & cacao · Corps & intégration
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 8,
                fontSize: 15,
                color: "#ad8e4a",
                fontWeight: 500,
              }}
            >
              etinceldebienetre.fr
            </div>
          </div>
        </div>

        {/* === Colonne photo Céline (droite, 540px) === */}
        <div
          style={{
            display: "flex",
            position: "relative",
            width: 540,
            height: 630,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoData}
            width={540}
            height={630}
            alt=""
            style={{
              width: 540,
              height: 630,
              objectFit: "cover",
              objectPosition: "center 30%",
            }}
          />
          {/* Dégradé crème sur le bord gauche pour adoucir la transition */}
          <div
            style={{
              display: "flex",
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, #fbf7ef 0%, rgba(251,247,239,0) 8%)",
            }}
          />
          {/* Vignette dorée subtile au centre droit */}
          <div
            style={{
              display: "flex",
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at right, rgba(201,168,106,0) 60%, rgba(201,168,106,0.18) 100%)",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
