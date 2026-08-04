"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Rows3 } from "lucide-react";
import { cn } from "@/utils/cn";
import { projects, projectCategories } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectsExplorer() {
  const [category, setCategory] = React.useState<string>("All");
  const [layout, setLayout] = React.useState<"grid" | "list">("grid");

  const filtered = React.useMemo(
    () =>
      category === "All"
        ? projects
        : projects.filter((p) => p.category === category),
    [category]
  );

  return (
    <div>
      {/* controls */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {projectCategories.map((c) => {
            const count =
              c === "All"
                ? projects.length
                : projects.filter((p) => p.category === c).length;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={cn(
                  "relative cursor-pointer rounded-full px-4 py-2 text-sm transition-colors duration-300",
                  category === c
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                )}
              >
                {category === c && (
                  <motion.span
                    layoutId="filter-pill"
                    transition={{ type: "spring", stiffness: 340, damping: 30 }}
                    className="absolute inset-0 rounded-full border border-[#F97316]/30 bg-[#F97316]/[0.10]"
                  />
                )}
                <span className="relative z-10">
                  {c}
                  <span className="ml-1.5 text-[10px] text-white/30">{count}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.02] p-1">
          {(
            [
              { id: "grid", icon: LayoutGrid, label: "Grid view" },
              { id: "list", icon: Rows3, label: "List view" },
            ] as const
          ).map((v) => (
            <button
              key={v.id}
              type="button"
              aria-label={v.label}
              onClick={() => setLayout(v.id)}
              className={cn(
                "flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors",
                layout === v.id
                  ? "bg-[#F97316]/15 text-[#F97316]"
                  : "text-white/30 hover:text-white/60"
              )}
            >
              <v.icon className="size-4" />
            </button>
          ))}
        </div>
      </div>

      {/* results */}
      <motion.div
        layout
        className={cn(
          "grid gap-5",
          layout === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                duration: 0.4,
                delay: i * 0.05,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="h-full"
            >
              <ProjectCard
                project={p}
                index={i}
                variant={layout === "list" ? "wide" : "grid"}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-sm text-white/30">
          Nothing here yet in this category.
        </p>
      )}
    </div>
  );
}
