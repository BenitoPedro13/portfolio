"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  {
    name: "bee-dash-monorepo",
    title: "Bee Dash",
    description:
      "Full-stack monorepo — NestJS API + Next.js dashboard + Refine admin panel. Built with pnpm workspaces for clean separation of concerns.",
    stack: ["TypeScript", "NestJS", "Next.js", "Refine", "pnpm"],
    color: "#1E67C6",
    github: "https://github.com/BenitoPedro13/bee-dash-monorepo",
    live: null,
  },
  {
    name: "markado",
    title: "Markado",
    description:
      "Markdown-powered notes and scheduling app with a clean editor, calendar booking, and real-time preview.",
    stack: ["TypeScript", "Next.js", "TailwindCSS"],
    color: "#13FFAA",
    github: "https://github.com/BenitoPedro13/markado",
    live: null,
  },
  {
    name: "insta2figma",
    title: "Insta2Figma",
    description:
      "Convert Instagram post layouts into Figma-ready designs automatically. Extracts layout, colors, and typography.",
    stack: ["TypeScript", "NestJS", "Figma API"],
    color: "#CE84CF",
    github: "https://github.com/BenitoPedro13/insta2figma",
    live: null,
  },
  {
    name: "network-monitor",
    title: "Network Monitor",
    description:
      "Real-time network monitoring dashboard. Tracks latency, packet loss, and bandwidth with live charts.",
    stack: ["TypeScript", "Next.js", "WebSockets"],
    color: "#DD335C",
    github: "https://github.com/BenitoPedro13/network-monitor",
    live: null,
  },
  {
    name: "video-converter",
    title: "Video Converter",
    description:
      "Browser-based video format converter powered by FFmpeg WASM. Convert between MP4, WebM, GIF and more — no server needed.",
    stack: ["TypeScript", "Next.js", "FFmpeg WASM"],
    color: "#F6B51E",
    github: "https://github.com/BenitoPedro13/video-converter",
    live: null,
  },
  {
    name: "sua-mesa-fit",
    title: "Sua Mesa Fit",
    description:
      "Meal planning and fitness nutrition app. Track macros, plan weekly meals, and generate shopping lists.",
    stack: ["TypeScript", "Next.js", "PostgreSQL"],
    color: "#1E67C6",
    github: "https://github.com/BenitoPedro13/sua-mesa-fit",
    live: null,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function Projects() {
  return (
    <section id="projects" className="relative py-24 px-4">
      <div className="mx-auto max-w-6xl">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-[#ffffff0b] bg-[#ffffff0d] px-3 py-1 text-xs uppercase tracking-widest text-white/50">
            Work
          </span>
          <h2 className="text-4xl font-medium text-white md:text-5xl">
            Featured Projects
          </h2>
          <p className="mt-4 text-white/50">
            A selection of things I&apos;ve built recently.
          </p>
        </motion.div>

        {/* grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((p) => (
            <motion.div
              key={p.name}
              variants={item}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#ffffff0b] bg-[#ffffff04] p-6 transition-all duration-300 hover:border-[#ffffff18] hover:bg-[#ffffff08]"
            >
              {/* glow */}
              <div
                className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                style={{ backgroundColor: p.color }}
              />

              <div>
                <div
                  className="mb-4 h-1 w-8 rounded-full"
                  style={{ backgroundColor: p.color }}
                />
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-white/50">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[#ffffff0b] bg-[#ffffff08] px-2.5 py-0.5 text-xs text-white/60"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-[#ffffff0b] bg-[#ffffff08] px-3 py-1.5 text-xs text-white/60 transition hover:border-white/20 hover:text-white"
                >
                  <Github className="size-3.5" />
                  Code
                </a>
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-full border border-[#ffffff0b] bg-[#ffffff08] px-3 py-1.5 text-xs text-white/60 transition hover:border-white/20 hover:text-white"
                  >
                    <ArrowUpRight className="size-3.5" />
                    Live
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/BenitoPedro13"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#ffffff0b] bg-[#ffffff0d] px-5 py-2.5 text-sm text-white/60 transition hover:border-white/20 hover:text-white"
          >
            View all on GitHub
            <ArrowUpRight className="size-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
