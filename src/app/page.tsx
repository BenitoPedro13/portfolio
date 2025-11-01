'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Github,
  Layers,
  Linkedin,
  Mail,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';

import { GradientBackground } from '@/components/animate-ui/components/backgrounds/gradient';
import { MorphingText } from '@/components/animate-ui/primitives/texts/morphing';
import {
  CursorProvider,
  Cursor,
  CursorFollow,
} from '@/components/animate-ui/components/animate/cursor';
import {
  AvatarGroup,
  AvatarGroupTooltip,
} from '@/components/animate-ui/components/animate/avatar-group';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsContent,
} from '@/components/animate-ui/components/animate/tabs';
import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars';

const collaborators = [
  {
    name: 'Alex Morgan',
    role: 'Product Design',
    initials: 'AM',
    accent: 'from-sky-500 via-indigo-500 to-purple-500',
  },
  {
    name: 'Lia Fernandez',
    role: 'Lead Engineer',
    initials: 'LF',
    accent: 'from-emerald-400 via-teal-500 to-cyan-500',
  },
  {
    name: 'Haruto Tanaka',
    role: 'Motion Director',
    initials: 'HT',
    accent: 'from-orange-400 via-pink-500 to-red-500',
  },
  {
    name: 'Noah Williams',
    role: 'UX Research',
    initials: 'NW',
    accent: 'from-violet-400 via-fuchsia-500 to-rose-500',
  },
];

const features = [
  {
    value: 'workflow',
    label: 'Motion-first workflow',
    icon: Workflow,
    description:
      'Compose interactions with shared motion primitives, granular control, and instant feedback directly in your React code.',
    bullets: [
      'Timeline-aware primitives with sensible defaults',
      'Autonomous layout transitions powered by Motion',
      'Type-safe APIs that mirror your design intent',
    ],
  },
  {
    value: 'library',
    label: 'Curated component library',
    icon: Layers,
    description:
      'Combine 500+ kinetic components—from cursors to product sections—designed to snap into modern design systems.',
    bullets: [
      'Composable building blocks for backgrounds, text, and surfaces',
      'Accessible out of the box with Radix foundations',
      'Theme-aware tokens that respond to dark or light UI',
    ],
  },
  {
    value: 'confidence',
    label: 'Production confidence',
    icon: ShieldCheck,
    description:
      'Ship experiences that feel polished from first render to last interaction with batteries-included tooling.',
    bullets: [
      'Motion-safe fallbacks for reduced motion preferences',
      'Granular bundle control via per-component imports',
      'Guided handoffs with docs, demos, and playground presets',
    ],
  },
];

const stats = [
  { label: 'Components', value: '560+' },
  { label: 'Motion presets', value: '120' },
  { label: 'Teams building', value: '28K' },
];

const projects = [
  {
    title: 'Mainnet Design System',
    description:
      'Enterprise-ready component system powering fintech dashboards with motion-aware UX.',
    tags: ['Next.js', 'Animate UI', 'Design Ops'],
    href: '#',
  },
  {
    title: 'SaaS Billing Platform',
    description:
      'Full-stack subscription tooling with granular permissioning and realtime event streams.',
    tags: ['React', 'NestJS', 'PostgreSQL'],
    href: '#',
  },
  {
    title: 'Immersive Marketing Sites',
    description:
      'Pixel-perfect landing pages with advanced interactions, CMS pipelines, and analytics.',
    tags: ['Next.js', 'Content Layer', 'SEO'],
    href: '#',
  },
];

const expertise = [
  {
    title: 'Product Engineering',
    copy: 'From concept to deploy, shipping features that blend delightful UX with durable code.',
  },
  {
    title: 'Design to Code',
    copy: 'Translating complex Figma systems into maintainable components with responsive motion.',
  },
  {
    title: 'Full Stack Architecture',
    copy: 'APIs, authentication, databases, and cloud infrastructure crafted for scale and reliability.',
  },
];

const testimonials = [
  {
    quote:
      'Benito shapes ideas into refined product experiences. He bridges design and engineering with unmatched ownership.',
    name: 'Gabriel Nogueira',
    role: 'Partner & Design Lead · Mainnet Design',
  },
  {
    quote:
      'Our team ships faster thanks to his motion-first component mindset. Every deliverable exceeds expectations.',
    name: 'Júlia Santos',
    role: 'Product Manager · Juicy Space',
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <CursorProvider
        global
        className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
      >
        <Cursor className="size-5 text-white drop-shadow-[0_0_18px_rgba(93,135,255,0.65)]" />
        <CursorFollow
          side="top"
          sideOffset={18}
          className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.4em] text-white/80 shadow-lg backdrop-blur-lg"
        >
          In Motion
        </CursorFollow>
      </CursorProvider>

      <GradientBackground
        transition={{ duration: 16, ease: 'easeInOut', repeat: Infinity }}
        className="pointer-events-none absolute inset-0 opacity-60 blur-[200px] !bg-gradient-to-br from-slate-900 via-indigo-950 to-black"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,6,20,0.9),transparent_70%)]" />

      <header className="relative z-20 px-6 pt-6 sm:px-10 lg:px-24">
        <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-slate-800/70 bg-slate-950/70 px-6 py-3 text-sm uppercase tracking-[0.35em] text-slate-200 backdrop-blur-xl shadow-[0_12px_45px_-25px_rgba(15,23,42,0.9)]">
          <Link href="/" className="font-semibold text-white no-underline drop-shadow-[0_4px_20px_rgba(59,130,246,0.35)]">
            Benito Xavier
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <a href="#work" className="hover:text-white">
              Work
            </a>
            <a href="#expertise" className="hover:text-white">
              Expertise
            </a>
            <a href="#testimonials" className="hover:text-white">
              Testimonials
            </a>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <a
              href="https://www.linkedin.com/in/benitopedrox/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-700/70 bg-slate-900/80 p-2 text-white transition hover:border-slate-500 hover:bg-slate-800"
            >
              <Linkedin className="size-4" />
            </a>
            <a
              href="https://github.com/benitopedro"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-700/70 bg-slate-900/80 p-2 text-white transition hover:border-slate-500 hover:bg-slate-800"
            >
              <Github className="size-4" />
            </a>
            <a
              href="mailto:benitopedro21@outlook.com"
              className="inline-flex items-center gap-2 rounded-full border border-slate-100/20 bg-slate-100 px-4 py-2 text-xs font-semibold tracking-[0.3em] text-slate-900 transition hover:-translate-y-[1px] hover:shadow-[0_18px_35px_-16px_rgba(148,163,184,0.85)]"
            >
              <Mail className="size-4" />
              Contact
            </a>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        <section className="relative isolate px-6 pb-24 pt-20 sm:px-10 lg:px-24">
          <div className="absolute inset-0 -z-10">
            <StarsBackground
              pointerEvents={false}
              starColor="#a5b4fc"
              className="h-full w-full"
              speed={65}
              factor={0.08}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950/50 to-slate-950" />
            </StarsBackground>
          </div>
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <span className="inline-flex items-center justify-center rounded-full border border-indigo-400/40 bg-slate-950/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-100/90 shadow-[0_25px_60px_-35px_rgba(129,140,248,0.8)]">
                Crafted with Animate&nbsp;UI
              </span>

              <h1 className="mt-10 text-4xl font-semibold tracking-tight text-white drop-shadow-[0_18px_60px_rgba(15,23,42,0.7)] sm:text-5xl lg:text-6xl">
                Design experiences that feel{' '}
                <span className="mt-4 inline-flex flex-wrap items-baseline gap-2 sm:block">
                  <MorphingText
                    loop
                    holdDelay={2600}
                    text={['alive.', 'immersive.', 'effortless.']}
                    className="bg-gradient-to-r from-sky-200 via-indigo-200 to-fuchsia-200 bg-clip-text text-4xl font-semibold text-transparent drop-shadow-[0_18px_60px_rgba(99,102,241,0.6)] sm:text-5xl lg:text-6xl"
                  />
                </span>
              </h1>

              <p className="mt-8 text-base leading-relaxed text-slate-100/90 sm:text-lg">
                Elevate product moments with motion-native UI patterns, polished
                cursors, ambient backgrounds, and expressive text effects. This
                portfolio demonstrates how I combine engineering and design to
                deliver cinematic yet performant user interfaces.
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Link
                  href="#work"
                  className="group inline-flex items-center gap-3 rounded-full border border-transparent bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-[2px] hover:shadow-[0_18px_45px_-18px_rgba(148,163,184,0.55)]"
                >
                  See selected work
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="https://animate-ui.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-indigo-400/40 bg-slate-950/80 px-6 py-3 text-sm font-semibold text-white transition hover:border-indigo-300/60 hover:bg-indigo-500/10"
                >
                  Explore Animate UI
                  <Sparkles className="size-4" />
                </a>
              </div>

              <div className="mt-14 flex flex-col items-start gap-6 text-sm text-slate-100/90 sm:flex-row sm:items-center sm:gap-10">
                <AvatarGroup>
                  {collaborators.map((person) => (
                    <div
                      key={person.name}
                      className="relative size-12 overflow-hidden rounded-full border border-indigo-300/40 bg-slate-950/70"
                    >
                      <div
                        className={`absolute inset-0 grid place-items-center bg-gradient-to-br ${person.accent}`}
                      >
                        <span className="text-sm font-semibold uppercase text-white">
                          {person.initials}
                        </span>
                      </div>
                      <AvatarGroupTooltip side="top">
                        <p className="font-semibold">{person.name}</p>
                        <p className="text-xs text-slate-100/70">
                          {person.role}
                        </p>
                      </AvatarGroupTooltip>
                    </div>
                  ))}
                </AvatarGroup>

                <div className="rounded-full border border-indigo-300/30 bg-slate-950/70 px-5 py-2 text-xs uppercase tracking-[0.45em] text-slate-100/70 backdrop-blur">
                  Trusted by teams in 90+ countries
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-3xl border border-slate-700/60 bg-slate-950/80 p-6 backdrop-blur-2xl shadow-[0_40px_90px_-35px_rgba(67,56,202,0.55)]">
              <div className="space-y-3 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-slate-950 via-indigo-950/40 to-transparent p-6 shadow-[0_35px_70px_-25px_rgba(99,102,241,0.55)]">
                <h2 className="text-lg font-semibold text-white/90">
                  Front-end · Full Stack
                </h2>
                <p className="text-sm text-slate-100/90">
                  I help companies ship ambitious product visions—from design
                  systems to SaaS platforms—with a focus on motion, clarity, and
                  maintainability.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-slate-700/60 bg-slate-950/80 px-6 py-5 text-left backdrop-blur"
                  >
                    <div className="text-2xl font-semibold text-white">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-[11px] uppercase tracking-[0.35em] text-slate-300">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative px-6 py-24 sm:px-10 lg:px-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(30,64,175,0.18),transparent_75%)]" />
          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Build richer stories with motion intelligence
            </h2>
            <p className="mt-6 text-base text-slate-100/85 sm:text-lg">
              Mix and match ambient surfaces, kinetic controls, and expressive
              text to create your signature product rhythm in minutes.
            </p>
          </div>

          <Tabs
            defaultValue="workflow"
            className="relative z-10 mx-auto mt-14 w-full max-w-5xl space-y-6"
          >
            <TabsList className="relative mx-auto w-full max-w-xl justify-between bg-slate-900/70 p-[3px] border border-slate-700/60 rounded-xl shadow-[0_25px_60px_-35px_rgba(30,64,175,0.55)]">
              {features.map((feature) => (
                <TabsTrigger key={feature.value} value={feature.value}>
                  <feature.icon className="size-4" />
                  {feature.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContents className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-10 backdrop-blur-xl shadow-[0_40px_80px_-50px_rgba(15,23,42,0.95)]">
              {features.map((feature) => (
                <TabsContent
                  key={feature.value}
                  value={feature.value}
                  className="flex flex-col gap-10 lg:flex-row lg:items-center"
                >
                  <div className="flex-1 space-y-6 text-left">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/80">
                      <feature.icon className="size-4" />
                      Focus
                    </div>
                    <p className="text-lg font-medium text-white sm:text-xl">
                      {feature.description}
                    </p>
                    <ul className="space-y-3 text-sm text-slate-100/80 sm:text-base">
                      {feature.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-center gap-3 rounded-xl border border-slate-800/70 bg-slate-900/70 px-4 py-3"
                        >
                          <Sparkles className="size-4 text-sky-300" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1 rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900/30 to-slate-900/10 p-8 shadow-[0_35px_70px_-25px_rgba(15,23,42,0.85)]">
                    <div className="flex h-full flex-col justify-between gap-6">
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-white/90">
                          Prototype-ready animations
                        </h3>
                        <p className="text-sm text-slate-300/90">
                          Drop in motion primitives for tabs, command palettes,
                          hero reveals, task timelines, and more. Every piece
                          plays nicely with your design tokens.
                        </p>
                      </div>
                      <div className="grid gap-4">
                        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-4 backdrop-blur">
                          <div className="flex items-center gap-3 text-sm text-slate-200">
                            <Rocket className="size-4 text-fuchsia-300" />
                            Launch components in weeks, not quarters.
                          </div>
                        </div>
                        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-4 backdrop-blur">
                          <div className="flex items-center gap-3 text-sm text-slate-200">
                            <Layers className="size-4 text-sky-300" />
                            Layer ambient backgrounds with glossy surfaces.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </TabsContents>
          </Tabs>
        </section>

        <section
          id="work"
          className="relative px-6 py-24 sm:px-10 lg:px-24"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.16),transparent_75%)]" />
          <div className="relative z-10 mx-auto max-w-5xl space-y-12">
            <div className="flex flex-col gap-4 text-center sm:text-left">
              <span className="inline-flex items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/80">
                Selected work
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Recent projects that blend craft and impact
              </h2>
              <p className="text-base text-slate-100/85 sm:text-lg">
                A snapshot of the product experiences I have led—from design
                systems to revenue platforms—built with meticulous motion and
                engineering discipline.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 text-left backdrop-blur transition hover:-translate-y-1 hover:border-slate-400/60 hover:bg-slate-900/70 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.75)]"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-100/85">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.35em] text-slate-200/80">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-700/60 bg-slate-900/70 px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={project.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-100/80 transition hover:text-white hover:gap-3"
                  >
                    View case study
                    <ArrowRight className="size-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="expertise"
          className="relative px-6 py-24 sm:px-10 lg:px-24"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(67,56,202,0.16),transparent_75%)]" />
          <div className="relative z-10 mx-auto max-w-5xl space-y-10">
            <div className="text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Expertise that supports product lifecycles end to end
              </h2>
              <p className="mt-4 text-base text-slate-100/85 sm:text-lg">
                I partner with teams as a strategic builder—from early discovery
                to post-launch iteration—with a motion-first mindset.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {expertise.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 text-left backdrop-blur transition hover:-translate-y-1 hover:border-slate-500/60 hover:bg-slate-900/70 shadow-[0_30px_70px_-40px_rgba(67,56,202,0.65)]"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-200/90">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="relative px-6 py-24 sm:px-10 lg:px-24"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(19,78,74,0.16),transparent_75%)]" />
          <div className="relative z-10 mx-auto max-w-5xl space-y-10">
            <div className="text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Partners value ownership and clarity
              </h2>
              <p className="mt-4 text-base text-slate-100/85 sm:text-lg">
                Feedback from collaborators who have seen creative vision turn
                into polished product experiences.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((item) => (
                <figure
                  key={item.name}
                  className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 text-left backdrop-blur transition hover:-translate-y-1 hover:border-slate-400/60 hover:bg-slate-900/70 shadow-[0_35px_80px_-45px_rgba(13,148,136,0.55)]"
                >
                  <blockquote className="text-sm leading-relaxed text-slate-100">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-6 text-xs uppercase tracking-[0.35em] text-slate-300">
                    {item.name} · {item.role}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section
          id="get-started"
          className="relative mx-6 mb-24 overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900/60 to-slate-950 px-8 py-16 text-center shadow-[0_45px_120px_-55px_rgba(59,130,246,0.65)] sm:mx-10 lg:mx-24 lg:px-16 lg:py-20"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),transparent_65%)]" />
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-700/60 bg-slate-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-100/80">
              Let&apos;s build together
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Level up every touchpoint with cinematic UI moments
            </h2>
            <p className="text-base text-slate-100/85 sm:text-lg">
              Install once, compose infinitely. Animate UI pairs beautifully
              with shadcn/ui foundations, allowing you to drop motion-rich
              experiences into dashboards, marketing sites, or product
              interfaces.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="https://animate-ui.com/docs/mcp"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-transparent bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-[2px] hover:shadow-[0_25px_60px_-18px_rgba(148,163,184,0.7)]"
              >
                Read the MCP guide
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="https://ui.shadcn.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-slate-600/60 px-8 py-3 text-sm font-semibold text-white transition hover:border-slate-200/70 hover:bg-slate-800/70"
              >
                Browse the combined registry
                <Sparkles className="size-4" />
              </Link>
            </div>
            <div className="grid w-full gap-6 text-sm uppercase tracking-[0.3em] text-slate-200/90 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-700/60 bg-slate-900/70 px-6 py-5 backdrop-blur"
                >
                  <div className="text-2xl font-semibold text-white">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[11px] text-slate-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 px-6 pb-12 sm:px-10 lg:px-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-3xl border border-slate-800/70 bg-slate-950/70 px-6 py-5 text-xs uppercase tracking-[0.35em] text-slate-200/80 backdrop-blur shadow-[0_30px_80px_-45px_rgba(8,47,73,0.75)] md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Benito Pedro Xavier · All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:benitopedro21@outlook.com"
              className="inline-flex items-center gap-2 text-slate-100 transition hover:text-white"
            >
              <Mail className="size-3.5" />
              benitopedro21@outlook.com
            </a>
            <a
              href="https://www.linkedin.com/in/benitopedrox/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-slate-100 transition hover:text-white"
            >
              <Linkedin className="size-3.5" />
              LinkedIn
            </a>
            <a
              href="https://github.com/benitopedro"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-slate-100 transition hover:text-white"
            >
              <Github className="size-3.5" />
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
