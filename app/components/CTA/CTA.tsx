"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section
      style={{
        width: "68vw",
        margin: "30px auto",
        position: "relative",
        padding: "60px 20px",
        borderRadius: "36px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#7c3aed",
          zIndex: 0,
        }}
      />

      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.6,
          mixBlendMode: "overlay",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.55"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      <div
        style={{
          position: "relative",
          textAlign: "center",
          maxWidth: "600px",
          color: "white",
          zIndex: 2,
        }}
      >
        <h2
          style={{
            fontSize: "40px",
            margin: "0 0 16px 0",
          }}
        >
          Explore
        </h2>

        <p
          style={{
            opacity: 0.8,
            lineHeight: 1.6,
            margin: "0 0 28px 0",
            fontSize: "18px",
          }}
        >
          Stop searching. All UI animations in one place.
        </p>

        <Link
          href="/collections"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "white",
            color: "black",
            padding: "12px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Browse Components <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
