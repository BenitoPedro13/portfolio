"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { cn } from "@/utils/cn";

export const AURORA_COLORS = ["#F97316", "#FB923C", "#EA580C", "#C2410C"];

/**
 * The shared brand backdrop: a slow orange aurora bleeding up from the
 * horizon of a near-black void. Used behind every section band so the whole
 * site reads as one continuous surface with the hero.
 */
export function AuroraBackdrop({
  className,
  position = "top",
  intensity = 1,
}: {
  className?: string;
  position?: "top" | "bottom" | "center";
  intensity?: number;
}) {
  const color = useMotionValue(AURORA_COLORS[0]);

  React.useEffect(() => {
    const controls = animate(color, AURORA_COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
    return () => controls.stop();
  }, [color]);

  const anchor =
    position === "top" ? "50% 0%" : position === "bottom" ? "50% 100%" : "50% 50%";

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at ${anchor}, #050505 ${
    50 + (1 - intensity) * 25
  }%, ${color})`;

  return (
    <motion.div
      aria-hidden
      style={{ backgroundImage }}
      className={cn("pointer-events-none absolute inset-0", className)}
    />
  );
}

/**
 * A softer, cheaper accent glow for section corners.
 */
export function GlowOrb({
  className,
  color = "#F97316",
  size = 520,
  opacity = 0.12,
}: {
  className?: string;
  color?: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-[120px]", className)}
      style={{
        width: size,
        height: size,
        background: color,
        opacity,
      }}
    />
  );
}

/**
 * Fine film grain over the whole page. Sells the "designed" feel.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

/**
 * Subtle dot / line grid, aligned with the dark identity.
 */
export function GridPattern({
  className,
  fade = true,
}: {
  className?: string;
  fade?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: fade
          ? "radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)"
          : undefined,
        WebkitMaskImage: fade
          ? "radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)"
          : undefined,
      }}
    />
  );
}

/** Thin gradient rule used between sections. */
export function Divider({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto max-w-7xl px-6", className)}>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent" />
    </div>
  );
}
