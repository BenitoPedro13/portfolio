import type { Metadata } from "next";
import {
  MapPin,
  GraduationCap,
  Languages,
  Sparkles,
  FileText,
  Calendar,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { StackSection } from "@/components/StackSection";
import { ProcessSection } from "@/components/ProcessSection";
import { Contact } from "@/components/Contact";
import { Section, SectionHeading, PrimaryButton, GhostButton } from "@/components/ui-kit";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { Reveal, StaggerGroup, StaggerItem, CountUp } from "@/components/motion/Reveal";
import { Divider, GlowOrb } from "@/components/motion/Backdrop";
import { profile, values } from "@/content/profile";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full Stack Developer from Rio de Janeiro. Four years building enterprise applications, real-time platforms, and the cloud infrastructure underneath them.",
};

const stats = [
  { value: 4, suffix: "+", label: "Years shipping products" },
  { value: 3, suffix: "", label: "Companies" },
  { value: 7, suffix: "", label: "Documented case studies" },
  { value: 2, suffix: "", label: "Languages spoken" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About"
        title="I build the whole thing, not just the part that's fun"
        description={profile.intro}
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <PrimaryButton
            href={profile.booking}
            external
            icon={<Calendar className="size-4" />}
          >
            Book a call
          </PrimaryButton>
          <GhostButton
            href={profile.resume}
            external
            icon={<FileText className="size-4" />}
          >
            Download résumé
          </GhostButton>
        </div>
      </PageHero>

      {/* Story */}
      <Section>
        <GlowOrb className="-right-40 top-10" opacity={0.08} />

        <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <SectionHeading
              badge="The short version"
              title="From chemistry lab to production deploys"
              className="mb-8"
            />

            <Reveal>
              <div className="space-y-5 text-base leading-[1.85] text-white/50">
                <p>
                  I studied chemistry at the Federal Institute of Rio de Janeiro.
                  That sounds like a detour, and it was — but it left me with a
                  habit that has been more useful than any framework: form a
                  hypothesis, measure it, and don&apos;t trust a result you
                  haven&apos;t reproduced.
                </p>
                <p>
                  I started building for the web in 2021 at Trivod, delivering
                  applications end to end inside a Scrum team and getting my
                  first taste of distributed systems through RabbitMQ-based
                  microservices. At Juicy Space I went deeper on the frontend:
                  real-time features over WebSockets, performance budgets,
                  bundle analysis, and automated testing as a default rather
                  than an afterthought.
                </p>
                <p>
                  Since 2024 I&apos;ve been at Mainnet Design, where the role
                  expanded past writing code. I run requirements gathering with
                  stakeholders, define timelines, and mentor junior and
                  mid-level developers — while still shipping pixel-perfect
                  interfaces from Figma, wiring REST, GraphQL, and gRPC
                  integrations, and owning the AWS, Google Cloud, and Vercel
                  infrastructure it all runs on.
                </p>
                <p>
                  The through-line is ownership. I&apos;d rather understand the
                  whole system — the data model, the interface, the pipeline,
                  the monitoring — than be excellent at one slice and helpless
                  at the boundaries.
                </p>
              </div>
            </Reveal>
          </div>

          {/* facts sidebar */}
          <div className="space-y-4">
            <Reveal delay={0.1}>
              <SpotlightCard className="rounded-2xl p-6">
                <p className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/25">
                  <MapPin className="size-3.5 text-[#F97316]/70" />
                  Based in
                </p>
                <p className="text-lg font-semibold text-white">
                  {profile.location}
                </p>
                <p className="mt-1 text-sm text-white/40">
                  Working with distributed teams across timezones.
                </p>
              </SpotlightCard>
            </Reveal>

            <Reveal delay={0.15}>
              <SpotlightCard className="rounded-2xl p-6">
                <p className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/25">
                  <GraduationCap className="size-3.5 text-[#F97316]/70" />
                  Education
                </p>
                {profile.education.map((e) => (
                  <div key={e.title}>
                    <p className="text-base font-semibold text-white">
                      {e.title}
                    </p>
                    <p className="mt-0.5 text-sm text-white/45">
                      {e.institution}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-white/25">
                      {e.period}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/40">
                      {e.note}
                    </p>
                  </div>
                ))}
              </SpotlightCard>
            </Reveal>

            <Reveal delay={0.2}>
              <SpotlightCard className="rounded-2xl p-6">
                <p className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/25">
                  <Languages className="size-3.5 text-[#F97316]/70" />
                  Languages
                </p>
                <div className="space-y-2.5">
                  {profile.languages.map((l) => (
                    <div
                      key={l.name}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-white/70">{l.name}</span>
                      <span className="text-xs text-white/35">{l.level}</span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>

        {/* stat strip */}
        <Reveal delay={0.1}>
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-[#050505]/60 px-5 py-6 transition-colors hover:bg-[#F97316]/[0.05]"
              >
                <p className="text-3xl font-semibold text-white">
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/30">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Divider />

      {/* Values */}
      <Section>
        <SectionHeading
          badge="How I think"
          title="Principles I actually hold to"
          description="Not aspirational poster material — these are the four things that most reliably decide whether a project goes well."
          className="mb-14"
        />

        <StaggerGroup className="grid gap-5 md:grid-cols-2">
          {values.map((v, i) => (
            <StaggerItem key={v.title} className="h-full">
              <SpotlightCard className="h-full rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#F97316]/20 bg-[#F97316]/[0.08] font-mono text-xs text-[#FB923C]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/45">
                      {v.body}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Divider />

      <ExperienceTimeline />

      <Divider />

      <ProcessSection />

      <Divider />

      <StackSection />

      <Contact />
    </>
  );
}
