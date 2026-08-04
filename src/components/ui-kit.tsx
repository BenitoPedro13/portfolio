"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { Magnetic } from "./motion/SpotlightCard";
import { WordReveal } from "./motion/Reveal";

/** Small orange pill used to label every section. */
export function SectionBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[#F97316]/25 bg-[#F97316]/[0.08] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-[#FB923C] backdrop-blur-sm",
        className
      )}
    >
      <span className="size-1 rounded-full bg-[#F97316] shadow-[0_0_8px_#F97316]" />
      {children}
    </motion.span>
  );
}

/** Standard section heading block. */
export function SectionHeading({
  badge,
  title,
  description,
  align = "left",
  className,
  action,
}: {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        action && "md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className={cn("flex flex-col gap-5", align === "center" && "items-center")}>
        {badge && <SectionBadge>{badge}</SectionBadge>}
        <h2
          className={cn(
            "max-w-2xl bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-3xl font-medium leading-[1.1] tracking-tight text-transparent sm:text-4xl md:text-5xl"
          )}
        >
          <WordReveal text={title} />
        </h2>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className={cn(
              "max-w-xl text-base leading-relaxed text-white/45",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </motion.p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  magnetic?: boolean;
};

/** Filled orange CTA with a glow and a sweeping shine on hover. */
export function PrimaryButton({
  children,
  href,
  external,
  className,
  onClick,
  icon,
  magnetic = true,
}: ButtonProps) {
  const inner = (
    <span
      className={cn(
        "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#F97316] px-6 py-3 text-sm font-semibold text-[#0a0503] transition-all duration-300",
        "shadow-[0_0_0_1px_#F9731655,0_8px_32px_-8px_#F97316aa] hover:shadow-[0_0_0_1px_#F97316,0_12px_44px_-8px_#F97316] hover:bg-[#FB923C]",
        className
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
        {icon ?? <ArrowRight className="size-4" />}
      </span>
    </span>
  );

  const wrapped = magnetic ? <Magnetic>{inner}</Magnetic> : inner;

  if (!href) {
    return (
      <button type="button" onClick={onClick} className="cursor-pointer">
        {wrapped}
      </button>
    );
  }
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {wrapped}
      </a>
    );
  }
  return <Link href={href}>{wrapped}</Link>;
}

/** Ghost button with an orange-tinted glass surface. */
export function GhostButton({
  children,
  href,
  external,
  className,
  onClick,
  icon,
  magnetic = true,
}: ButtonProps) {
  const inner = (
    <span
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/70 backdrop-blur-md transition-all duration-300",
        "hover:border-[#F97316]/50 hover:bg-[#F97316]/[0.08] hover:text-white",
        className
      )}
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        {icon ?? <ArrowUpRight className="size-4" />}
      </span>
    </span>
  );

  const wrapped = magnetic ? <Magnetic>{inner}</Magnetic> : inner;

  if (!href) {
    return (
      <button type="button" onClick={onClick} className="cursor-pointer">
        {wrapped}
      </button>
    );
  }
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {wrapped}
      </a>
    );
  }
  return <Link href={href}>{wrapped}</Link>;
}

/** Tiny neutral chip for stack/tag lists. */
export function Chip({
  children,
  className,
  accent = false,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide transition-colors duration-300",
        accent
          ? "border-[#F97316]/30 bg-[#F97316]/10 text-[#FDBA74]"
          : "border-white/[0.08] bg-white/[0.04] text-white/45 group-hover:border-white/[0.14] group-hover:text-white/65",
        className
      )}
    >
      {children}
    </span>
  );
}

/** Section wrapper with consistent rhythm. */
export function Section({
  children,
  className,
  id,
  container = true,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  container?: boolean;
}) {
  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      {container ? (
        <div className="relative mx-auto max-w-7xl px-6">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
