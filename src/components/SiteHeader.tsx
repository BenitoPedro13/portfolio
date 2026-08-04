"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { profile } from "@/content/profile";
import Shuffle from "./Shuffle";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Thin orange progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#F97316] shadow-[0_0_12px_#F97316]"
    />
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  React.useEffect(() => setOpen(false), [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <ScrollProgress />
      <header className="fixed inset-x-0 top-4 z-[80] px-4 md:top-6">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className={cn(
            "mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 md:px-6",
            scrolled
              ? "border-white/[0.09] bg-[#080808]/80 shadow-[0_8px_40px_-12px_#000] backdrop-blur-xl"
              : "border-white/[0.05] bg-white/[0.02] backdrop-blur-md"
          )}
        >
          <Link href="/" className="shrink-0" aria-label="Home">
            <Shuffle
              className="font-press-start-2p !text-lg text-white transition-colors hover:text-[#F97316] md:!text-xl"
              text={profile.handle}
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
            />
          </Link>

          {/* desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                  isActive(l.href)
                    ? "text-white"
                    : "text-white/45 hover:text-white/85"
                )}
              >
                {isActive(l.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    className="absolute inset-0 rounded-full border border-[#F97316]/25 bg-[#F97316]/[0.10]"
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.booking}
              target="_blank"
              rel="noreferrer"
              className="group hidden items-center gap-1.5 rounded-full bg-[#F97316] px-4 py-2 text-xs font-semibold text-[#0a0503] transition-all duration-300 hover:bg-[#FB923C] hover:shadow-[0_0_24px_-4px_#F97316] sm:inline-flex"
            >
              Book a call
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex size-9 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.03] text-white/70 transition hover:border-[#F97316]/40 hover:text-[#F97316] md:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-[#050505]/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex h-full flex-col justify-center gap-2 px-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5 }}
                >
                  <Link
                    href={l.href}
                    className={cn(
                      "flex items-baseline gap-4 border-b border-white/[0.06] py-5 text-4xl font-medium tracking-tight transition-colors",
                      isActive(l.href) ? "text-[#F97316]" : "text-white/80"
                    )}
                  >
                    <span className="font-mono text-xs text-white/25">
                      0{i + 1}
                    </span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                href={profile.booking}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#F97316] px-6 py-4 text-sm font-semibold text-[#0a0503]"
              >
                Book a call
                <ArrowUpRight className="size-4" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
