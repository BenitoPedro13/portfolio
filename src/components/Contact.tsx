"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import { BOOKING_LINK } from "@/lib/constants";

export function Contact() {
  return (
    <section id="testimonials" className="relative py-24 px-4">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block rounded-full border border-[#F97316]/20 bg-[#F97316]/10 px-3 py-1 text-xs uppercase tracking-widest text-[#F97316]/80">
            Contact
          </span>
          <h2 className="mt-2 text-4xl font-medium text-white md:text-5xl">
            Let&apos;s build something
          </h2>
          <p className="mt-5 text-lg text-white/40">
            Available for freelance projects, full-time roles, and technical
            consulting. Drop me a line or book a call.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary CTA — orange filled */}
          <a
            href="mailto:benitopedro13@gmail.com"
            className="flex items-center gap-2 rounded-full border border-[#F97316] bg-[#F97316] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#EA580C] hover:border-[#EA580C] shadow-[0_0_24px_#F9731640]"
          >
            <Mail className="size-4" />
            Send an email
          </a>
          {/* Secondary CTA */}
          <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-[#F97316]/30 bg-[#F97316]/10 px-6 py-3 text-sm font-medium text-[#F97316] transition hover:border-[#F97316]/60 hover:bg-[#F97316]/20"
          >
            Book a call
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="mt-10 flex items-center justify-center gap-6"
        >
          <a
            href="https://github.com/BenitoPedro13"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-white/30 transition hover:text-[#F97316]"
          >
            <Github className="size-4" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/benitopedro13"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-white/30 transition hover:text-[#F97316]"
          >
            <Linkedin className="size-4" />
            LinkedIn
          </a>
          <a
            href="mailto:benitopedro13@gmail.com"
            className="flex items-center gap-2 text-sm text-white/30 transition hover:text-[#F97316]"
          >
            <Mail className="size-4" />
            Email
          </a>
        </motion.div>
      </div>
    </section>
  );
}
