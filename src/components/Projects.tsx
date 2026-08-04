"use client";

import Link from "next/link";
import { featuredProjects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";
import { Section, SectionHeading, GhostButton } from "./ui-kit";
import { StaggerGroup, StaggerItem } from "./motion/Reveal";
import { GlowOrb } from "./motion/Backdrop";

export function Projects() {
  const [lead, ...rest] = featuredProjects;

  return (
    <Section id="projects">
      <GlowOrb className="-right-40 top-0" opacity={0.1} />

      <SectionHeading
        badge="Selected work"
        title="Products I've designed, built, and shipped"
        description="Every project below has a full case study — what problem it solves, how it was built, and what I learned. Written so you don't need to read code to follow along."
        action={<GhostButton href="/projects">View all work</GhostButton>}
        className="mb-14"
      />

      <StaggerGroup className="space-y-5">
        {lead && (
          <StaggerItem>
            <ProjectCard project={lead} index={0} variant="wide" />
          </StaggerItem>
        )}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <StaggerItem key={p.slug} className="h-full">
              <ProjectCard project={p} index={i + 1} />
            </StaggerItem>
          ))}
        </div>
      </StaggerGroup>

      <div className="mt-12 flex justify-center">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 rounded-full border border-[#F97316]/20 bg-[#F97316]/[0.06] px-6 py-3 text-sm text-[#FDBA74] backdrop-blur-md transition-all hover:border-[#F97316]/50 hover:bg-[#F97316]/[0.12]"
        >
          Browse every case study
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </Section>
  );
}
