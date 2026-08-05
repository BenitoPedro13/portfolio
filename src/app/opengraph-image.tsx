import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { siteHost } from "@/lib/site-url";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          padding: 72,
          position: "relative",
        }}
      >
        {/* orange aurora */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 220,
            width: 900,
            height: 620,
            background:
              "radial-gradient(closest-side, rgba(249,115,22,0.55), rgba(249,115,22,0))",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -320,
            right: -120,
            width: 760,
            height: 640,
            background:
              "radial-gradient(closest-side, rgba(249,115,22,0.28), rgba(249,115,22,0))",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#F97316",
              display: "flex",
            }}
          />
          <div
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {profile.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -3,
              display: "flex",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              color: "#F97316",
              fontSize: 44,
              fontWeight: 600,
              display: "flex",
            }}
          >
            {profile.role}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.62)",
              fontSize: 30,
              maxWidth: 900,
              display: "flex",
            }}
          >
            {profile.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
            color: "rgba(255,255,255,0.5)",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex" }}>{siteHost}</div>
          <div style={{ display: "flex" }}>
            {profile.yearsExperience}+ years building for the web
          </div>
        </div>
      </div>
    ),
    size
  );
}
