import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl;
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: base, changeFrequency: "monthly", priority: 1 },
      { url: `${base}/projects`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${base}/about`, changeFrequency: "yearly", priority: 0.8 },
      { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.7 },
    ] satisfies MetadataRoute.Sitemap
  ).map((route) => ({ ...route, lastModified }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
