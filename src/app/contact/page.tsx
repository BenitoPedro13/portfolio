import type { Metadata } from "next";
import { Clock, Globe, Zap, MessageSquare } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Contact } from "@/components/Contact";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { Reveal } from "@/components/motion/Reveal";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about freelance projects, full-time roles, or technical consulting. Based in Rio de Janeiro, working with teams anywhere.",
};

const expectations = [
  {
    icon: Clock,
    title: "Reply within 24 hours",
    body: "On weekdays, usually much sooner. If it's urgent, WhatsApp is fastest.",
  },
  {
    icon: MessageSquare,
    title: "An honest answer",
    body: "If I'm not the right fit for what you need, I'll say so and point you somewhere better.",
  },
  {
    icon: Globe,
    title: "Any timezone",
    body: "I'm in Brazil (GMT-3) and have worked remotely with teams across Europe and North America.",
  },
  {
    icon: Zap,
    title: "A concrete next step",
    body: "Either a scoped proposal or a 30-minute call to figure out whether there's a project here.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Get in touch"
        title="Tell me what you're building"
        description="Freelance projects, full-time roles, or a system that needs untangling. The more context you give me, the more useful my first reply will be."
        size="compact"
      />

      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <div className="space-y-4">
            {expectations.map((e, i) => (
              <Reveal key={e.title} delay={0.1 + i * 0.08}>
                <SpotlightCard className="rounded-2xl p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#F97316]/20 bg-[#F97316]/[0.08] text-[#FB923C]">
                      <e.icon className="size-4" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {e.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/45">
                        {e.body}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}

            <Reveal delay={0.45}>
              <SpotlightCard className="rounded-2xl p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/25">
                  Direct
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-2 block break-all text-sm text-white/70 transition-colors hover:text-[#F97316]"
                >
                  {profile.email}
                </a>
                <a
                  href={`https://wa.me/${profile.phoneHref.replace("+", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block text-sm text-white/70 transition-colors hover:text-[#F97316]"
                >
                  {profile.phone}
                </a>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
