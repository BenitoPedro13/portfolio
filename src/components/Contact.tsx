"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Phone,
  Calendar,
  Copy,
  Check,
  FileText,
} from "lucide-react";
import { profile } from "@/content/profile";
import { AuroraBackdrop, GridPattern } from "./motion/Backdrop";
import { PrimaryButton, GhostButton } from "./ui-kit";
import { WordReveal } from "./motion/Reveal";
import { SpotlightCard } from "./motion/SpotlightCard";

const channels = [
  {
    id: "email",
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    copyable: true,
  },
  {
    id: "phone",
    label: "Phone / WhatsApp",
    value: profile.phone,
    href: `https://wa.me/${profile.phoneHref.replace("+", "")}`,
    icon: Phone,
    copyable: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "in/benitopedro13",
    href: profile.linkedin,
    icon: Linkedin,
    copyable: false,
  },
  {
    id: "github",
    label: "GitHub",
    value: "BenitoPedro13",
    href: profile.github,
    icon: Github,
    copyable: false,
  },
];

function ChannelRow({ channel }: { channel: (typeof channels)[number] }) {
  const [copied, setCopied] = React.useState(false);

  const copy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(channel.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <SpotlightCard className="rounded-xl">
      <a
        href={channel.href}
        target={channel.href.startsWith("mailto") ? undefined : "_blank"}
        rel="noreferrer"
        className="flex items-center gap-4 p-4"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#F97316]/20 bg-[#F97316]/[0.08] text-[#FB923C]">
          <channel.icon className="size-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] uppercase tracking-[0.18em] text-white/25">
            {channel.label}
          </span>
          <span className="block truncate text-sm text-white/70 transition-colors group-hover:text-white">
            {channel.value}
          </span>
        </span>
        {channel.copyable && (
          <button
            type="button"
            onClick={copy}
            aria-label={`Copy ${channel.label}`}
            className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] text-white/30 transition-colors hover:border-[#F97316]/40 hover:text-[#F97316]"
          >
            {copied ? (
              <Check className="size-3.5 text-emerald-400" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
        )}
      </a>
    </SpotlightCard>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.06] py-28 md:py-36"
    >
      <AuroraBackdrop position="bottom" intensity={0.55} />
      <GridPattern />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[#F97316]/25 bg-[#F97316]/[0.08] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-[#FB923C] backdrop-blur-sm"
          >
            <span className="size-1 rounded-full bg-[#F97316] shadow-[0_0_8px_#F97316]" />
            Contact
          </motion.span>

          <h2 className="mx-auto mt-6 max-w-3xl bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-4xl font-medium leading-[1.1] tracking-tight text-transparent md:text-6xl">
            <WordReveal text="Let's build something worth shipping" />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/45"
          >
            Available for freelance projects, full-time roles, and technical
            consulting. Tell me what you&apos;re building and I&apos;ll tell you
            honestly whether I&apos;m the right person for it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <PrimaryButton
              href={profile.booking}
              external
              icon={<Calendar className="size-4" />}
            >
              Book a 30-min call
            </PrimaryButton>
            <GhostButton
              href={`mailto:${profile.email}`}
              icon={<Mail className="size-4" />}
            >
              Send an email
            </GhostButton>
            <GhostButton
              href={profile.resume}
              external
              icon={<FileText className="size-4" />}
            >
              Download résumé
            </GhostButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-14 grid gap-3 sm:grid-cols-2"
        >
          {channels.map((c) => (
            <ChannelRow key={c.id} channel={c} />
          ))}
        </motion.div>

        <p className="mt-10 text-center text-xs text-white/25">
          Based in {profile.location} · Working with teams in any timezone ·
          Fluent in English and Portuguese
        </p>
      </div>
    </section>
  );
}
