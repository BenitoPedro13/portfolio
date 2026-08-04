"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { cn } from "@/utils/cn";
import type { Project } from "@/content/projects";
import { SpotlightCard, TiltCard } from "./motion/SpotlightCard";
import { Chip } from "./ui-kit";

const statusStyles: Record<Project["status"], string> = {
  Live: "border-emerald-500/25 bg-emerald-500/[0.08] text-emerald-300/85",
  "In development": "border-amber-500/25 bg-amber-500/[0.08] text-amber-300/85",
  "Case study": "border-sky-500/25 bg-sky-500/[0.08] text-sky-300/85",
  "Open source": "border-violet-500/25 bg-violet-500/[0.08] text-violet-300/85",
};

export function StatusPill({ status }: { status: Project["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em]",
        statusStyles[status]
      )}
    >
      <span className="size-1 rounded-full bg-current" />
      {status}
    </span>
  );
}

/**
 * Abstract, generated visual for each project. No screenshots needed —
 * every card gets a distinct animated composition derived from its accent.
 */
function ProjectVisual({ project }: { project: Project }) {
  const seed = project.slug.length;
  return (
    <div className="relative h-40 overflow-hidden rounded-xl border border-white/[0.06] bg-[#0a0a0a]">
      {/* gradient wash */}
      <div
        className="absolute inset-0 opacity-45 transition-opacity duration-700 group-hover:opacity-75"
        style={{
          background: `radial-gradient(120% 100% at 20% 0%, ${project.accent}44 0%, transparent 60%), radial-gradient(90% 90% at 90% 100%, ${project.accent}22 0%, transparent 55%)`,
        }}
      />
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* animated arcs */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 160"
        fill="none"
        aria-hidden
      >
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={320}
            cy={30}
            r={60 + i * 44 + seed}
            stroke={project.accent}
            strokeOpacity={0.22 - i * 0.05}
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: i * 0.15, ease: "easeOut" }}
          />
        ))}
        <motion.path
          d={`M 0 ${120 - seed * 2} Q 100 ${70 + seed} 200 ${100 - seed} T 400 ${
            60 + seed
          }`}
          stroke={project.accent}
          strokeOpacity={0.5}
          strokeWidth={1.5}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
      </svg>
      {/* title mark */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: `${project.accent}cc` }}
        >
          {project.category}
        </span>
        <span className="font-mono text-[10px] text-white/25">
          {project.year}
        </span>
      </div>
      {/* sheen */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
    </div>
  );
}

export function ProjectCard({
  project,
  index = 0,
  variant = "grid",
}: {
  project: Project;
  index?: number;
  variant?: "grid" | "wide";
}) {
  return (
    <TiltCard max={5} scale={1.01} className="h-full">
      <SpotlightCard
        accent={project.accent}
        className={cn("h-full", variant === "wide" && "md:flex")}
      >
        <Link
          href={`/projects/${project.slug}`}
          className={cn(
            "flex h-full flex-col gap-5 p-5",
            variant === "wide" && "md:flex-row md:items-center md:gap-8 md:p-7"
          )}
        >
          <div className={cn(variant === "wide" && "md:w-[42%] md:shrink-0")}>
            <ProjectVisual project={project} />
          </div>

          <div className="flex flex-1 flex-col">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <StatusPill status={project.status} />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/25">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="flex items-center gap-2 text-xl font-semibold text-white transition-colors group-hover:text-[#FDBA74]">
              {project.title}
              <ArrowUpRight className="size-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </h3>

            <p className="mt-1.5 text-sm font-medium text-white/50">
              {project.tagline}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-white/40">
              {project.plainEnglish}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.stack.slice(0, variant === "wide" ? 6 : 4).map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
              {project.stack.length > (variant === "wide" ? 6 : 4) && (
                <Chip>+{project.stack.length - (variant === "wide" ? 6 : 4)}</Chip>
              )}
            </div>

            <div className="mt-auto flex items-center gap-4 pt-5 text-xs text-white/30">
              <span className="inline-flex items-center gap-1.5 transition-colors group-hover:text-[#F97316]">
                Read case study
                <ArrowUpRight className="size-3" />
              </span>
              {project.github && (
                <span className="inline-flex items-center gap-1.5">
                  <Github className="size-3" />
                  Code
                </span>
              )}
              {project.live && (
                <span className="inline-flex items-center gap-1.5">
                  <ExternalLink className="size-3" />
                  Live
                </span>
              )}
            </div>
          </div>
        </Link>
      </SpotlightCard>
    </TiltCard>
  );
}
