"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/utils/cn";

/**
 * Card that tracks the cursor with an orange radial spotlight and a
 * border that lights up along the pointer. The signature surface of the site.
 */
export function SpotlightCard({
  children,
  className,
  accent = "#F97316",
  spotlightSize = 380,
  intensity = 0.16,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
  spotlightSize?: number;
  intensity?: number;
  as?: "div" | "article" | "li";
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const [active, setActive] = React.useState(false);

  const onMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    },
    [x, y]
  );

  const background = useTransform([x, y], ([cx, cy]) =>
    `radial-gradient(${spotlightSize}px circle at ${cx}px ${cy}px, ${accent}, transparent 70%)`
  );

  const MotionTag = motion[Tag as "div"];

  return (
    <MotionTag
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm transition-colors duration-500",
        "hover:border-white/[0.14]",
        className
      )}
    >
      {/* border glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500"
        style={{
          background,
          opacity: active ? 0.35 : 0,
          maskImage:
            "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 1,
        }}
      />
      {/* interior spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{ background, opacity: active ? intensity : 0 }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </MotionTag>
  );
}

/**
 * 3D tilt container that follows the pointer. Respects reduced motion.
 */
export function TiltCard({
  children,
  className,
  max = 8,
  scale = 1.015,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springCfg = { stiffness: 220, damping: 22, mass: 0.4 };
  const rotateX = useSpring(
    useTransform(py, [0, 1], [max, -max]),
    springCfg
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-max, max]),
    springCfg
  );

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileHover={{ scale }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

/**
 * Button/link wrapper that is magnetically attracted to the cursor.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), {
    stiffness: 260,
    damping: 18,
    mass: 0.3,
  });
  const y = useSpring(useMotionValue(0), {
    stiffness: 260,
    damping: 18,
    mass: 0.3,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
