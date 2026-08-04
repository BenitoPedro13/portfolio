"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  Lightbulb,
  Target,
  Wrench,
  Layers,
  AlertTriangle,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import type { Project } from "@/content/projects";
import { AuroraBackdrop, GridPattern, GlowOrb } from "./motion/Backdrop";
import { StarsBackground } from "./animate-ui/components/backgrounds/stars";
import { WordReveal, Reveal, StaggerGroup, StaggerItem } from "./motion/Reveal";
import { SpotlightCard } from "./motion/SpotlightCard";
import { Chip, PrimaryButton, GhostButton } from "./ui-kit";
import { StatusPill } from "./ProjectCard";

/** Reading-progress bar specific to the article body. */
function ReadingProgress({ target }: { target: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[91] h-[2px] origin-left bg-[#FB923C]"
    />
  );
}

function Block({
  icon: Icon,
  label,
  title,
  children,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  title: string;
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <Reveal className="relative">
      <div className="mb-6 flex items-center gap-3">
        <span
          className="flex size-9 items-center justify-center rounded-lg border"
          style={{
            borderColor: `${accent}33`,
            backgroundColor: `${accent}14`,
            color: accent,
          }}
        >
          <Icon className="size-4" />
        </span>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/25">
            {label}
          </p>
          <h2 className="text-xl font-semibold text-white md:text-2xl">
            {title}
          </h2>
        </div>
      </div>
      {children}
    </Reveal>
  );
}

export function CaseStudy({
  project,
  prev,
  next,
}: {
  project: Project;
  prev: Project | null;
  next: Project | null;
}) {
  const articleRef = React.useRef<HTMLDivElement>(null);
  const accent = project.accent;

  return (
    <>
      <ReadingProgress target={articleRef} />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pt-36 pb-16 md:pt-44 md:pb-24">
        <AuroraBackdrop position="top" intensity={0.6} />
        <StarsBackground
          starColor="#fff"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#160800_0%,_#050505_70%)]"
        />
        <GridPattern />

        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm text-white/35 transition-colors hover:text-[#F97316]"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
              All case studies
            </Link>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <StatusPill status={project.status} />
            <Chip accent>{project.category}</Chip>
            <span className="font-mono text-[11px] text-white/25">
              {project.year}
            </span>
          </div>

          <h1 className="mt-6 bg-gradient-to-br from-white via-white to-white/45 bg-clip-text text-4xl font-medium leading-[1.06] tracking-tight text-transparent md:text-6xl">
            <WordReveal text={project.title} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg font-medium text-white/60 md:text-xl"
          >
            {project.tagline}
          </motion.p>

          {/* the non-technical explainer, given prominence */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 rounded-2xl border p-5 backdrop-blur-sm"
            style={{
              borderColor: `${accent}2e`,
              backgroundColor: `${accent}0d`,
            }}
          >
            <p className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: accent }}>
              <Lightbulb className="size-3.5" />
              In plain English
            </p>
            <p className="text-base leading-relaxed text-white/75">
              {project.plainEnglish}
            </p>
          </motion.div>

          {/* meta grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] md:grid-cols-4"
          >
            {[
              { label: "My role", value: project.role },
              { label: "Timeline", value: project.timeline },
              { label: "Team", value: project.team },
              { label: "Status", value: project.status },
            ].map((m) => (
              <div key={m.label} className="bg-[#050505]/60 px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                  {m.label}
                </p>
                <p className="mt-1 text-sm text-white/70">{m.value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            {project.live && (
              <PrimaryButton
                href={project.live}
                external
                icon={<ExternalLink className="size-4" />}
              >
                Visit live site
              </PrimaryButton>
            )}
            {project.github && (
              <GhostButton
                href={project.github}
                external
                icon={<Github className="size-4" />}
              >
                View source code
              </GhostButton>
            )}
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
      </section>

      {/* ── Article ────────────────────────────────────────── */}
      <div ref={articleRef} className="relative">
        <GlowOrb className="-left-40 top-40" opacity={0.07} color={accent} />

        <div className="mx-auto max-w-4xl space-y-24 px-6 py-16 md:py-24">
          {/* Problem → Approach → Outcome */}
          <Block
            icon={Target}
            label="Section 01"
            title="The problem"
            accent={accent}
          >
            <p className="text-base leading-[1.8] text-white/55">
              {project.problem}
            </p>
          </Block>

          <Block
            icon={Wrench}
            label="Section 02"
            title="How I approached it"
            accent={accent}
          >
            <p className="text-base leading-[1.8] text-white/55">
              {project.approach}
            </p>
            <div
              className="mt-6 rounded-xl border-l-2 bg-white/[0.02] py-4 pl-5 pr-4"
              style={{ borderColor: accent }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/25">
                Outcome
              </p>
              <p className="mt-2 text-base leading-relaxed text-white/70">
                {project.outcome}
              </p>
            </div>
          </Block>

          {/* Deep-dive narrative */}
          {project.sections.length > 0 && (
            <Block
              icon={Sparkles}
              label="Section 03"
              title="Going deeper"
              accent={accent}
            >
              <div className="space-y-8">
                {project.sections.map((s) => (
                  <div key={s.title}>
                    <h3 className="mb-3 text-lg font-semibold text-white/90">
                      {s.title}
                    </h3>
                    <p className="text-base leading-[1.8] text-white/50">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {/* Process */}
          <Block
            icon={Layers}
            label="Section 04"
            title="The build process"
            accent={accent}
          >
            <div className="relative space-y-4 border-l border-white/[0.08] pl-8">
              {project.process.map((step, i) => (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative"
                >
                  <span
                    className="absolute -left-[2.28rem] top-1.5 flex size-5 items-center justify-center rounded-full border font-mono text-[9px]"
                    style={{
                      borderColor: `${accent}44`,
                      backgroundColor: "#0a0604",
                      color: accent,
                    }}
                  >
                    {i + 1}
                  </span>
                  <SpotlightCard accent={accent} className="rounded-xl p-5">
                    <h3 className="text-base font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/45">
                      {step.body}
                    </p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </Block>

          {/* Architecture */}
          <Block
            icon={Layers}
            label="Section 05"
            title="How the pieces fit together"
            accent={accent}
          >
            <p className="mb-6 text-sm text-white/40">
              Each layer has one job. Read it top to bottom — that&apos;s roughly
              the path a request takes through the system.
            </p>
            <StaggerGroup className="space-y-3">
              {project.architecture.map((node, i) => (
                <StaggerItem key={node.label}>
                  <div className="group relative flex flex-col gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors duration-300 hover:border-white/[0.14] sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3 sm:w-40 sm:shrink-0">
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.2em]"
                        style={{ color: accent }}
                      >
                        {node.layer}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">
                        {node.label}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-white/40">
                        {node.detail}
                      </p>
                    </div>
                    {i < project.architecture.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute -bottom-3 left-8 z-10 hidden text-white/15 sm:block"
                      >
                        ↓
                      </span>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Block>

          {/* Features */}
          <Block
            icon={Sparkles}
            label="Section 06"
            title="What it does"
            accent={accent}
          >
            <StaggerGroup className="grid gap-4 sm:grid-cols-2">
              {project.features.map((f) => (
                <StaggerItem key={f.title} className="h-full">
                  <SpotlightCard accent={accent} className="h-full rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-white">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/45">
                      {f.body}
                    </p>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Block>

          {/* Challenges */}
          <Block
            icon={AlertTriangle}
            label="Section 07"
            title="The hard parts"
            accent={accent}
          >
            <div className="space-y-4">
              {project.challenges.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5"
                >
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                    <span
                      className="size-1.5 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                    {c.title}
                  </h3>
                  <p className="mt-2 pl-4 text-sm leading-relaxed text-white/45">
                    {c.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </Block>

          {/* Learnings */}
          <Block
            icon={GraduationCap}
            label="Section 08"
            title="What I took away"
            accent={accent}
          >
            <ul className="space-y-3">
              {project.learnings.map((l, i) => (
                <motion.li
                  key={l}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="flex gap-3 text-base leading-relaxed text-white/55"
                >
                  <span
                    className="mt-2.5 size-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  {l}
                </motion.li>
              ))}
            </ul>
          </Block>

          {/* Quick facts */}
          <Reveal>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] md:grid-cols-4">
              {project.quickFacts.map((f) => (
                <div key={f.label} className="bg-[#050505]/60 px-4 py-5">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                    {f.label}
                  </p>
                  <p className="mt-1.5 text-sm text-white/70">{f.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Prev / Next ────────────────────────────────────── */}
      <section className="relative border-t border-white/[0.06] px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {prev && (
            <Link href={`/projects/${prev.slug}`} className="group">
              <SpotlightCard className="h-full rounded-2xl p-6">
                <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/25">
                  <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
                  Previous
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white transition-colors group-hover:text-[#FDBA74]">
                  {prev.title}
                </h3>
                <p className="mt-1.5 text-sm text-white/40">{prev.tagline}</p>
              </SpotlightCard>
            </Link>
          )}
          {next && (
            <Link href={`/projects/${next.slug}`} className="group">
              <SpotlightCard className="h-full rounded-2xl p-6 text-right">
                <p className="flex items-center justify-end gap-2 text-[11px] uppercase tracking-[0.2em] text-white/25">
                  Next
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white transition-colors group-hover:text-[#FDBA74]">
                  {next.title}
                </h3>
                <p className="mt-1.5 text-sm text-white/40">{next.tagline}</p>
              </SpotlightCard>
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
