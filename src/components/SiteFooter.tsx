"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, ArrowUpRight, FileText } from "lucide-react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { GlowOrb } from "./motion/Backdrop";

const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { href: profile.github, label: "GitHub", icon: Github },
  { href: profile.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#050505]">
      <GlowOrb className="-bottom-64 left-1/2 -translate-x-1/2" size={720} opacity={0.09} />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* identity */}
          <div>
            <p className="font-press-start-2p text-lg text-white">{profile.handle}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/40">
              {profile.role} · {profile.subRole}. Building products end to end
              from Rio de Janeiro, working with teams anywhere.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-white/30">
              <MapPin className="size-3.5 text-[#F97316]/60" />
              {profile.location}
            </div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-3 py-1.5 text-[11px] text-emerald-300/80">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
              {profile.availability}
            </div>
          </div>

          {/* nav */}
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-white/25">
              Navigate
            </p>
            <ul className="space-y-2.5">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/45 transition-colors hover:text-[#F97316]"
                  >
                    {l.label}
                    <ArrowUpRight className="size-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* projects */}
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-white/25">
              Case studies
            </p>
            <ul className="space-y-2.5">
              {projects.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/45 transition-colors hover:text-[#F97316]"
                  >
                    {p.title}
                    <ArrowUpRight className="size-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/[0.06] pt-8 md:flex-row">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} {profile.name}. Built with Next.js,
            TypeScript and too much attention to detail.
          </p>
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                whileHover={{ y: -2 }}
                className="flex size-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/40 transition-colors hover:border-[#F97316]/40 hover:text-[#F97316]"
              >
                <s.icon className="size-4" />
              </motion.a>
            ))}
            <motion.a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-xs text-white/40 transition-colors hover:border-[#F97316]/40 hover:text-[#F97316]"
            >
              <FileText className="size-3.5" />
              Résumé
            </motion.a>
          </div>
        </div>
      </div>

      {/* oversized wordmark */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden px-6 pb-4"
      >
        <p className="bg-gradient-to-b from-white/[0.05] to-transparent bg-clip-text text-center text-[16vw] font-bold leading-[0.8] tracking-tighter text-transparent">
          BENITO
        </p>
      </div>
    </footer>
  );
}
