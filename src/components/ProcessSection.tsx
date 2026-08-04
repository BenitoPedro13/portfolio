"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Search,
  PenTool,
  Code2,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/content/experience";
import { Section, SectionHeading } from "./ui-kit";
import { SpotlightCard } from "./motion/SpotlightCard";
import { StaggerGroup, StaggerItem } from "./motion/Reveal";
import { GlowOrb } from "./motion/Backdrop";

type Step = {
  n: string;
  title: string;
  body: string;
  icon: LucideIcon;
  detail: string[];
};

const steps: Step[] = [
  {
    n: "01",
    title: "Understand before building",
    body: "I start with the people who will use the thing. Requirements sessions, stakeholder interviews, and a written scope that everyone agrees on before a line of code exists.",
    icon: Search,
    detail: [
      "Stakeholder discovery sessions",
      "Success criteria written down",
      "Scope and timeline agreed upfront",
    ],
  },
  {
    n: "02",
    title: "Design the system, then the screen",
    body: "Data model first, because that is what you cannot cheaply change later. Then architecture, then the interface — built from the Figma file at full fidelity.",
    icon: PenTool,
    detail: [
      "Data modelling and schema design",
      "Architecture and integration boundaries",
      "Pixel-perfect Figma implementation",
    ],
  },
  {
    n: "03",
    title: "Build in reviewable slices",
    body: "Small, shippable increments with tests where they matter. Code review is where quality is actually enforced, so I treat it as a first-class part of the work.",
    icon: Code2,
    detail: [
      "Vertical slices, not big-bang branches",
      "Automated tests on critical paths",
      "Review culture and shared standards",
    ],
  },
  {
    n: "04",
    title: "Ship it and keep it alive",
    body: "Environments, pipelines, DNS, monitoring. A feature is not done when it merges, it is done when it runs reliably in production and someone would notice if it broke.",
    icon: Rocket,
    detail: [
      "CI/CD and multi-environment setup",
      "Monitoring and alerting",
      "Cost and performance tuning",
    ],
  },
];

export function ProcessSection() {
  return (
    <Section id="process">
      <GlowOrb className="-left-32 top-1/3" opacity={0.07} />

      <SectionHeading
        badge="How I work"
        title="A process built to survive contact with reality"
        description="Most projects don't fail on syntax. They fail on unclear scope, a data model that couldn't bend, or a deploy nobody could reproduce. This is how I avoid those."
        className="mb-14"
      />

      <StaggerGroup className="grid gap-5 md:grid-cols-2">
        {steps.map((s) => (
          <StaggerItem key={s.n} className="h-full">
            <SpotlightCard className="h-full rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#F97316]/20 bg-[#F97316]/[0.08] text-[#FB923C]">
                  <s.icon className="size-5" />
                </div>
                <div>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-white/25">
                    {s.n}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {s.title}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/45">
                {s.body}
              </p>

              <ul className="mt-5 space-y-2">
                {s.detail.map((d) => (
                  <li
                    key={d}
                    className="flex items-center gap-2.5 text-xs text-white/35"
                  >
                    <span className="size-1 rounded-full bg-[#F97316]/50" />
                    {d}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}

export function ServicesSection() {
  return (
    <Section id="services">
      <SectionHeading
        badge="What I can do for you"
        title="Ways we can work together"
        description="Whether you need a product built from nothing, an existing system untangled, or a team that needs direction."
        className="mb-14"
      />

      <StaggerGroup className="grid gap-5 md:grid-cols-2">
        {services.map((s, i) => (
          <StaggerItem key={s.id} className="h-full">
            <SpotlightCard className="h-full rounded-2xl p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                <span className="font-mono text-[11px] text-white/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/45">
                {s.body}
              </p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {s.deliverables.map((d) => (
                  <motion.div
                    key={d}
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-2 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-xs text-white/40"
                  >
                    <span className="size-1 rounded-full bg-[#F97316]/60" />
                    {d}
                  </motion.div>
                ))}
              </div>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
