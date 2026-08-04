"use client";

import { motion } from "framer-motion";

const stack = [
  { name: "TypeScript", icon: "⬡", color: "#3178C6" },
  { name: "Next.js", icon: "▲", color: "#ffffff" },
  { name: "React", icon: "⚛", color: "#61DAFB" },
  { name: "NestJS", icon: "🔴", color: "#E0234E" },
  { name: "Go", icon: "◈", color: "#00ADD8" },
  { name: "Python", icon: "🐍", color: "#FFD43B" },
  { name: "Node.js", icon: "⬡", color: "#339933" },
  { name: "PostgreSQL", icon: "🐘", color: "#336791" },
  { name: "Docker", icon: "🐳", color: "#2496ED" },
  { name: "TailwindCSS", icon: "◉", color: "#06B6D4" },
  { name: "tRPC", icon: "◈", color: "#398CCB" },
  { name: "Vercel", icon: "▲", color: "#ffffff" },
];

const experience = [
  {
    role: "Front-end Tech Lead",
    company: "Mainnet Design",
    period: "2022 – Present",
    desc: "Led front-end architecture for client platforms. Mentored 3 devs, managed CI/CD pipelines, and shipped pixel-perfect React/Next.js apps.",
  },
  {
    role: "Full-Stack Developer",
    company: "Juicy Space",
    period: "2021 – 2022",
    desc: "Built full-stack features with React and Node.js. Integrated third-party APIs and improved page performance by 40%.",
  },
  {
    role: "Junior Developer",
    company: "Trivod",
    period: "2020 – 2021",
    desc: "Developed responsive UIs and REST API integrations. Contributed to an in-house SaaS product used by 500+ users.",
  },
];

export function About() {
  return (
    <section id="services" className="relative py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Experience */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 inline-block rounded-full border border-[#ffffff0b] bg-[#ffffff0d] px-3 py-1 text-xs uppercase tracking-widest text-white/50">
                Experience
              </span>
              <h2 className="mb-10 text-4xl font-medium text-white">
                Where I&apos;ve worked
              </h2>
            </motion.div>

            <div className="relative space-y-8 border-l border-[#ffffff10] pl-8">
              {experience.map((e, i) => (
                <motion.div
                  key={e.company}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="relative"
                >
                  <div className="absolute -left-[2.25rem] top-1.5 h-3 w-3 rounded-full border border-[#ffffff30] bg-[#050505]" />
                  <span className="text-xs text-white/30 uppercase tracking-widest">
                    {e.period}
                  </span>
                  <h3 className="mt-1 text-base font-semibold text-white">
                    {e.role}{" "}
                    <span className="font-normal text-white/40">
                      @ {e.company}
                    </span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {e.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 inline-block rounded-full border border-[#ffffff0b] bg-[#ffffff0d] px-3 py-1 text-xs uppercase tracking-widest text-white/50">
                Stack
              </span>
              <h2 className="mb-10 text-4xl font-medium text-white">
                Tools I use
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              className="grid grid-cols-3 gap-3 sm:grid-cols-4"
            >
              {stack.map((s) => (
                <motion.div
                  key={s.name}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
                  }}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-[#ffffff0b] bg-[#ffffff04] p-4 text-center transition hover:border-[#ffffff18] hover:bg-[#ffffff08]"
                >
                  <span className="text-xl" style={{ color: s.color }}>
                    {s.icon}
                  </span>
                  <span className="text-xs text-white/50 group-hover:text-white/80 transition">
                    {s.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
