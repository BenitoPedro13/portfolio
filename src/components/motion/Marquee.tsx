"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

/**
 * Seamless infinite marquee. Duplicates children to guarantee no gap.
 */
export function Marquee({
  children,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  className,
  gap = "3rem",
}: {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  gap?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        className
      )}
      style={
        {
          maskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        } as React.CSSProperties
      }
    >
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            "flex shrink-0 items-center",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          style={{ gap, paddingRight: gap }}
          animate={{ x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"] }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {children}
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Big scrolling word band used as a section transition.
 */
export function TextMarquee({
  words,
  className,
  speed = 30,
  direction = "left",
}: {
  words: string[];
  className?: string;
  speed?: number;
  direction?: "left" | "right";
}) {
  return (
    <Marquee speed={speed} direction={direction} className={className} gap="2.5rem">
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="flex shrink-0 items-center gap-10">
          <span className="whitespace-nowrap text-4xl font-medium tracking-tight text-white/[0.08] md:text-6xl">
            {word}
          </span>
          <span className="size-1.5 shrink-0 rounded-full bg-[#F97316]/40" />
        </span>
      ))}
    </Marquee>
  );
}
