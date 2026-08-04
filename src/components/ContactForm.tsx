"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { profile } from "@/content/profile";
import { SpotlightCard } from "./motion/SpotlightCard";

const budgets = [
  "Not sure yet",
  "< $5k",
  "$5k – $15k",
  "$15k – $50k",
  "$50k+",
] as const;

const kinds = [
  "New product",
  "Existing codebase",
  "Full-time role",
  "Consulting",
] as const;

type Status = "idle" | "sending" | "sent";

/**
 * Client-side contact form. With no backend configured it composes a
 * well-structured mailto so the message still reaches the inbox reliably.
 */
export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [kind, setKind] = React.useState<string>(kinds[0]);
  const [budget, setBudget] = React.useState<string>(budgets[0]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");

    setStatus("sending");

    const subject = `[${kind}] New enquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project type: ${kind}`,
      `Budget: ${budget}`,
      "",
      message,
    ].join("\n");

    const href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.setTimeout(() => {
      window.location.href = href;
      setStatus("sent");
    }, 500);
  };

  const fieldClass =
    "w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors duration-300 focus:border-[#F97316]/50 focus:bg-[#F97316]/[0.04]";

  return (
    <SpotlightCard className="rounded-3xl p-6 md:p-8">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/30"
            >
              Your name
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="Jane Doe"
              className={fieldClass}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/30"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="jane@company.com"
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/30">
            What do you need?
          </p>
          <div className="flex flex-wrap gap-2">
            {kinds.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm transition-all duration-300",
                  kind === k
                    ? "border-[#F97316]/50 bg-[#F97316]/[0.12] text-[#FDBA74]"
                    : "border-white/[0.08] bg-white/[0.02] text-white/40 hover:border-white/20 hover:text-white/70"
                )}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/30">
            Budget range
          </p>
          <div className="flex flex-wrap gap-2">
            {budgets.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBudget(b)}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm transition-all duration-300",
                  budget === b
                    ? "border-[#F97316]/50 bg-[#F97316]/[0.12] text-[#FDBA74]"
                    : "border-white/[0.08] bg-white/[0.02] text-white/40 hover:border-white/20 hover:text-white/70"
                )}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-white/30"
          >
            Tell me about the project
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="What are you building, who is it for, and what's the timeline?"
            className={cn(fieldClass, "resize-none")}
          />
        </div>

        <button
          type="submit"
          disabled={status !== "idle"}
          className={cn(
            "group relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-[#F97316] px-6 py-3.5 text-sm font-semibold text-[#0a0503] transition-all duration-300",
            "hover:bg-[#FB923C] hover:shadow-[0_12px_44px_-8px_#F97316]",
            status !== "idle" && "cursor-default opacity-90"
          )}
        >
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
          <AnimatePresence mode="wait">
            <motion.span
              key={status}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 flex items-center gap-2"
            >
              {status === "idle" && (
                <>
                  Send message
                  <Send className="size-4" />
                </>
              )}
              {status === "sending" && (
                <>
                  Opening your mail app
                  <Loader2 className="size-4 animate-spin" />
                </>
              )}
              {status === "sent" && (
                <>
                  Ready to send
                  <Check className="size-4" />
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </button>

        <p className="text-center text-xs text-white/25">
          This opens your email client with everything pre-filled. Prefer to
          talk?{" "}
          <a
            href={profile.booking}
            target="_blank"
            rel="noreferrer"
            className="text-[#F97316]/80 underline-offset-4 hover:underline"
          >
            Book a 30-minute call
          </a>
          .
        </p>
      </form>
    </SpotlightCard>
  );
}
