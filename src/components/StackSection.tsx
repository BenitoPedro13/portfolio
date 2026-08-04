"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { skillGroups } from "@/content/experience";
import { Section, SectionHeading } from "./ui-kit";
import { SpotlightCard } from "./motion/SpotlightCard";
import { Marquee } from "./motion/Marquee";
import { GlowOrb } from "./motion/Backdrop";

const marqueeTech = [
  "TypeScript",
  "React",
  "Next.js",
  "NestJS",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "GraphQL",
  "gRPC",
  "Docker",
  "Kubernetes",
  "AWS",
  "Google Cloud",
  "Vercel",
  "RabbitMQ",
  "Tailwind CSS",
  "FastAPI",
  "MongoDB",
  "Vitest",
  "Figma",
];

export function StackSection() {
  const [active, setActive] = React.useState(skillGroups[0].id);
  const current = skillGroups.find((g) => g.id === active) ?? skillGroups[0];

  return (
    <Section id="stack">
      <GlowOrb className="-right-32 bottom-0" opacity={0.08} />

      <SectionHeading
        badge="Capabilities"
        title="The toolkit behind the work"
        description="Not a list of everything I've touched — these are the tools I reach for, grouped by the part of the product they solve."
        className="mb-14"
      />

      {/* category selector */}
      <div className="mb-8 flex flex-wrap gap-2">
        {skillGroups.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setActive(g.id)}
            className={cn(
              "relative cursor-pointer rounded-full px-4 py-2 text-sm transition-colors duration-300",
              active === g.id ? "text-white" : "text-white/40 hover:text-white/70"
            )}
          >
            {active === g.id && (
              <motion.span
                layoutId="stack-pill"
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
                className="absolute inset-0 rounded-full border border-[#F97316]/30 bg-[#F97316]/[0.10]"
              />
            )}
            <span className="relative z-10">{g.label}</span>
          </button>
        ))}
      </div>

      <SpotlightCard className="min-h-[220px] rounded-3xl p-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32 }}
          >
            <p className="mb-6 max-w-lg text-sm text-white/40">{current.blurb}</p>
            <div className="flex flex-wrap gap-2.5">
              {current.items.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.035 }}
                  className="group/chip relative cursor-default overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F97316]/40 hover:bg-[#F97316]/[0.08] hover:text-white"
                >
                  <span className="relative z-10">{item}</span>
                </motion.span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </SpotlightCard>

      {/* endless tech marquee */}
      <div className="mt-14 space-y-3">
        <Marquee speed={38} gap="2rem">
          {marqueeTech.map((t) => (
            <span
              key={t}
              className="whitespace-nowrap rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-sm text-white/30"
            >
              {t}
            </span>
          ))}
        </Marquee>
        <Marquee speed={44} direction="right" gap="2rem">
          {[...marqueeTech].reverse().map((t) => (
            <span
              key={t}
              className="whitespace-nowrap rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-sm text-white/30"
            >
              {t}
            </span>
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
