import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { Contact } from "@/components/Contact";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies of products I've built — scheduling platforms, microservice pipelines, satellite data tools, headless commerce, and analytics dashboards.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        badge="Case studies"
        title="Work worth explaining, not just linking"
        description={`${projects.length} projects, each with a full write-up: the problem it solves, the decisions behind it, and what actually shipped. No GitHub required.`}
      />

      <section className="relative mx-auto max-w-7xl px-6 pb-28">
        <ProjectsExplorer />
      </section>

      <Contact />
    </>
  );
}
