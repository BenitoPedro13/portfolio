"use client";

import * as React from "react";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { StarsBackground } from "./animate-ui/components/backgrounds/stars";
import { cn } from "@/utils/cn";
import ShinyText from "./ShinyText";
import VariableProximity from "./VariableProximity";
import { profile } from "@/content/profile";
import { Magnetic } from "./motion/SpotlightCard";

const COLORS_TOP = ["#F97316", "#FB923C", "#EA580C", "#C2410C"];

const stats = [
  { value: "4+", label: "Years shipping" },
  { value: "3", label: "Companies" },
  { value: "7", label: "Case studies" },
  { value: "∞", label: "Deploys" },
];

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const controls = animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
    return () => controls.stop();
  }, [color]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #050505 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      ref={sectionRef}
      id="hero"
      style={{ backgroundImage }}
      className="relative grid min-h-[100svh] place-content-center overflow-hidden bg-[#050505] px-6 py-32 text-gray-200"
    >
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* availability + location strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-3 py-1.5 text-[11px] text-emerald-300/90 backdrop-blur-md">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/45 backdrop-blur-md">
            <MapPin className="size-3 text-[#F97316]/70" />
            {profile.location}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mb-4 inline-flex gap-1 rounded-full border border-[#F97316]/20 bg-[#F97316]/10 px-3 py-1.5 text-sm backdrop-blur-md"
        >
          <ShinyText
            text="End-to-End Product Engineering"
            disabled={false}
            speed={3}
          />
        </motion.div>

        <h1 className="max-w-5xl">
          <div
            ref={containerRef}
            style={{ position: "relative" }}
            className="bg-gradient-to-br from-white to-gray-400 bg-clip-text text-4xl font-medium leading-[1.12] tracking-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-[1.08]"
          >
            <VariableProximity
              label={profile.tagline}
              className={"variable-proximity-demo"}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 800, 'opsz' 40"
              containerRef={containerRef}
              radius={100}
              falloff="linear"
            />
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="my-7 max-w-2xl text-base leading-relaxed text-gray-200/60 md:text-lg md:leading-relaxed"
        >
          I&apos;m Benito, a {profile.role.toLowerCase()} from Rio de Janeiro.
          I lead requirements with stakeholders, build the interface pixel by
          pixel, wire the APIs behind it, and own the cloud it runs on.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic>
            <Link href="/projects">
              <motion.span
                style={{ border, boxShadow }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex w-fit items-center gap-2 rounded-full bg-[#F97316]/10 px-6 py-3 text-sm font-medium text-gray-50 backdrop-blur-md transition-colors hover:bg-[#F97316]/20"
              >
                Explore my work
                <ArrowRight className="size-4 transition-transform group-hover:-rotate-45" />
              </motion.span>
            </Link>
          </Magnetic>

          <Magnetic>
            <a href={profile.booking} target="_blank" rel="noreferrer">
              <span className="group flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/65 backdrop-blur-md transition-all hover:border-white/25 hover:text-white">
                Book a call
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </Magnetic>
        </motion.div>

        {/* stat rail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 grid w-full max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-md sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[#050505]/40 px-4 py-5 transition-colors hover:bg-[#F97316]/[0.06]"
            >
              <p className="text-2xl font-semibold text-white">{s.value}</p>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-white/35">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ opacity: contentOpacity }}
        className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">
          Scroll
        </span>
        <div className="h-10 w-px overflow-hidden bg-white/10">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-full bg-gradient-to-b from-transparent via-[#F97316] to-transparent"
          />
        </div>
      </motion.div>

      <StarsBackground
        starColor="#fff"
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          "bg-[radial-gradient(ellipse_at_bottom,_#1a0a00_0%,_#050505_100%)]"
        )}
      />
    </motion.section>
  );
};
