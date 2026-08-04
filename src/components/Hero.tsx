"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { StarsBackground } from "./animate-ui/components/backgrounds/stars";
import { cn } from "@/utils/cn";
import ShinyText from "./ShinyText";
import VariableProximity from "./VariableProximity";

// Brand-consistent aurora palette centered on orange
const COLORS_TOP = ["#F97316", "#FB923C", "#EA580C", "#C2410C"];

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const containerRef = useRef(null);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #050505 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      id="hero"
      style={{ backgroundImage }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-[#050505] px-4 py-24 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          className="mb-1.5 rounded-full border border-[#F97316]/20 bg-[#F97316]/10 backdrop-blur-md px-3 py-1.5 text-sm inline-flex gap-1"
        >
          <ShinyText
            text="End-to-End Product Engineering"
            disabled={false}
            speed={3}
            className="custom-class"
          />
        </motion.div>
        <h1 className="max-w-5xl">
          <div
            ref={containerRef}
            style={{ position: "relative" }}
            className="bg-gradient-to-br from-white to-gray-400 bg-clip-text text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight"
          >
            <VariableProximity
              label={"Building immersive web apps from concept to cloud"}
              className={"variable-proximity-demo "}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 800, 'opsz' 40"
              containerRef={containerRef}
              radius={100}
              falloff="linear"
            />
          </div>
        </h1>
        <p className="my-6 max-w-xl text-base leading-relaxed text-gray-200/70 md:text-lg md:leading-relaxed">
          I&apos;ve spent the last 5 years leading React/Next.js platforms, API
          ecosystems, and cloud infrastructure that blend pixel-perfect UX with
          measurable business outcomes.
        </p>
        <motion.a
          style={{ border, boxShadow }}
          href="#projects"
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-[#F97316]/10 px-4 py-2 text-gray-50 transition-colors hover:bg-[#F97316]/20"
        >
          View projects
          <ArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.a>
      </div>

      <StarsBackground
        starColor="#fff"
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-xl",
          "bg-[radial-gradient(ellipse_at_bottom,_#1a0a00_0%,_#050505_100%)]"
        )}
      />
    </motion.section>
  );
};
