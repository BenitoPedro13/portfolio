"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AuroraBackdrop, GridPattern } from "./motion/Backdrop";
import { WordReveal } from "./motion/Reveal";
import { StarsBackground } from "./animate-ui/components/backgrounds/stars";
import { cn } from "@/utils/cn";

/**
 * Shared page-opening band. Carries the hero's aurora + stars identity
 * onto every inner page so nothing feels like a different website.
 */
export function PageHero({
  badge,
  title,
  description,
  children,
  size = "default",
}: {
  badge?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  size?: "default" | "compact";
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden px-6",
        size === "compact" ? "pt-36 pb-16 md:pt-44 md:pb-20" : "pt-40 pb-20 md:pt-52 md:pb-28"
      )}
    >
      <AuroraBackdrop position="top" intensity={0.6} />
      <StarsBackground
        starColor="#fff"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#160800_0%,_#050505_70%)]"
      />
      <GridPattern />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {badge && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#F97316]/25 bg-[#F97316]/[0.08] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-[#FB923C] backdrop-blur-sm"
          >
            <span className="size-1 rounded-full bg-[#F97316] shadow-[0_0_8px_#F97316]" />
            {badge}
          </motion.span>
        )}

        <h1 className="mt-6 bg-gradient-to-br from-white via-white to-white/45 bg-clip-text text-4xl font-medium leading-[1.08] tracking-tight text-transparent sm:text-5xl md:text-6xl">
          <WordReveal text={title} />
        </h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/45 md:text-lg"
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-9"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
