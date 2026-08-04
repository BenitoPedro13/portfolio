"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";
import { experience } from "@/content/experience";
import { Section, SectionHeading, Chip } from "./ui-kit";
import { SpotlightCard } from "./motion/SpotlightCard";
import { GlowOrb } from "./motion/Backdrop";

function ExperienceEntry({
  item,
  index,
  defaultOpen,
}: {
  item: (typeof experience)[number];
  index: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(!!defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-10"
    >
      {/* node */}
      <div className="absolute left-0 top-1.5 flex size-7 -translate-x-[13px] items-center justify-center rounded-full border border-[#F97316]/30 bg-[#0a0604]">
        <motion.span
          className="size-2 rounded-full bg-[#F97316]"
          animate={{ boxShadow: ["0 0 0px #F97316", "0 0 12px #F97316", "0 0 0px #F97316"] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.4 }}
        />
      </div>

      <SpotlightCard className="rounded-2xl">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="w-full cursor-pointer p-5 text-left"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#FB923C]/80">
              {item.period}
            </span>
            <span className="text-[11px] text-white/25">·</span>
            <span className="text-[11px] text-white/30">{item.duration}</span>
          </div>

          <h3 className="mt-2 flex items-center justify-between gap-3 text-lg font-semibold text-white">
            <span>
              {item.role}
              <span className="font-normal text-white/40"> @ {item.company}</span>
            </span>
            <ChevronDown
              className={cn(
                "size-4 shrink-0 text-white/30 transition-transform duration-300",
                open && "rotate-180 text-[#F97316]"
              )}
            />
          </h3>

          <p className="mt-1 text-xs text-white/30">{item.mode}</p>

          <p className="mt-3 text-sm leading-relaxed text-white/50">
            {item.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </button>

        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="overflow-hidden"
        >
          <div className="border-t border-white/[0.06] px-5 py-5">
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/25">
              What I did
            </p>
            <ul className="space-y-2.5">
              {item.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-white/45">
                  <span className="mt-[7px] size-1 shrink-0 rounded-full bg-[#F97316]/60" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </SpotlightCard>
    </motion.div>
  );
}

export function ExperienceTimeline() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="experience">
      <GlowOrb className="-left-40 top-20" opacity={0.08} />

      <SectionHeading
        badge="Experience"
        title="Four years, three teams, one throughline"
        description="Every role added a layer: shipping features, then owning systems, then leading the people who build them. Click any role to expand the detail."
        className="mb-14"
      />

      <div ref={ref} className="relative max-w-3xl">
        {/* rail */}
        <div className="absolute left-0 top-0 h-full w-px bg-white/[0.07]" />
        <motion.div
          style={{ height }}
          className="absolute left-0 top-0 w-px bg-gradient-to-b from-[#F97316] via-[#FB923C] to-transparent shadow-[0_0_12px_#F97316]"
        />

        <div className="space-y-6">
          {experience.map((item, i) => (
            <ExperienceEntry
              key={item.id}
              item={item}
              index={i}
              defaultOpen={i === 0}
            />
          ))}
        </div>

        {/* terminus */}
        <div className="relative mt-6 pl-10">
          <div className="absolute left-0 top-1 flex size-7 -translate-x-[13px] items-center justify-center rounded-full border border-white/[0.08] bg-[#0a0a0a]">
            <Briefcase className="size-3 text-white/25" />
          </div>
          <p className="text-sm text-white/25">
            Started building for the web in 2021 — after a chemistry degree that
            taught me to test before I trust.
          </p>
        </div>
      </div>
    </Section>
  );
}
