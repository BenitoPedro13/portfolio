'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, Github, Linkedin, Mail, Sparkles } from 'lucide-react';

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

const valueProps = [
  {
    title: '5+ anos construindo experiências web',
    description:
      'Especialista em React, Next.js e TypeScript, entregando produtos escaláveis com foco em UX e performance.',
  },
  {
    title: 'Liderança técnica na Mainnet Design',
    description:
      'Coordeno squads multidisciplinares, mentoro desenvolvedores e garanto entregas confiáveis do discovery ao deploy.',
  },
  {
    title: 'Visão full stack fim a fim',
    description:
      'Integro front-end e back-end com Node.js, NestJS, bancos relacionais e cloud (AWS, GCP, Vercel).',
  },
];

const stats = [
  { label: 'Anos de experiência', value: '5+' },
  { label: 'Liderança técnica', value: 'Mainnet Design' },
  { label: 'Stack principal', value: 'React · Next.js · TS' },
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

const timeline = [
  {
    company: 'Mainnet Design',
    role: 'Partner & Lead Front-end',
    period: '2022 — presente',
    bullets: [
      'Lidero o roadmap técnico de produtos digitais, alinhando design, engenharia e stakeholders.',
      'Mentoro desenvolvedores em padrões de componente, acessibilidade e revisões de código.',
      'Orquestro infraestrutura multiambiente em Vercel, AWS e pipelines de CI/CD.',
    ],
  },
  {
    company: 'Juicy Space',
    role: 'Senior Front-end Engineer',
    period: '2020 — 2022',
    bullets: [
      'Entreguei plataformas de marketing imersivas com foco em SEO, analytics e integrações headless CMS.',
      'Implementei sistemas de design reutilizáveis para acelerar lançamentos e manter consistência visual.',
    ],
  },
  {
    company: 'Trivod',
    role: 'Full Stack Developer',
    period: '2018 — 2020',
    bullets: [
      'Desenvolvi produtos SaaS com autenticação, billing e integrações com APIs de terceiros.',
      'Modelei bancos de dados e fluxos de deploy garantindo observabilidade e estabilidade.',
    ],
  },
];

const services = [
  {
    title: 'Desenvolvimento Web',
    copy: 'Interfaces responsivas, acessíveis e integradas a APIs escaláveis em React/Next.',
  },
  {
    title: 'SaaS & Produtos Digitais',
    copy: 'Arquitetura completa de aplicações com autenticação, billing e observabilidade.',
  },
  {
    title: 'Web Design & Handoff',
    copy: 'Transformo sistemas de design em componentes prontos para produção com documentação clara.',
  },
  {
    title: 'Infraestrutura & DevOps',
    copy: 'Pipelines CI/CD, automação de deploy e gestão de ambientes em Vercel, AWS e GCP.',
  },
];

const stack = [
  {
    title: 'Front-end',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Radix'],
  },
  {
    title: 'Back-end',
    items: ['Node.js', 'NestJS', 'REST', 'gRPC', 'GraphQL'],
  },
  {
    title: 'Cloud & DevOps',
    items: ['Vercel', 'AWS', 'Google Cloud', 'Docker', 'CI/CD'],
  },
  {
    title: 'Ferramentas',
    items: ['Figma', 'Storybook', 'Plausible', 'Jira', 'Linear'],
  },
];

const testimonials = [
  {
    quote:
      'Benito transforma ideias em experiências digitais refinadas. Ele conecta design e engenharia com liderança exemplar.',
    name: 'Gabriel Nogueira',
    role: 'Partner & Design Lead · Mainnet Design',
  },
  {
    quote:
      'Nosso time entrega mais rápido graças à visão de componentes e motion do Benito. Cada release supera expectativas.',
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
              Projetos
            </a>
            <a href="#experience" className="hover:text-white">
              Experiência
            </a>
            <a href="#services" className="hover:text-white">
              Serviços
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
              Contato
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
                Desenvolvedor Front-end &amp; Full Stack
              </span>

              <h1 className="mt-10 text-4xl font-semibold tracking-tight text-white drop-shadow-[0_18px_60px_rgba(15,23,42,0.7)] sm:text-5xl lg:text-6xl">
                Eu potencializo produtos digitais{' '}
                <span className="mt-4 inline-flex flex-wrap items-baseline gap-2 sm:block">
                  <MorphingText
                    loop
                    holdDelay={2600}
                    text={['escaláveis.', 'imersivos.', 'orientados a impacto.']}
                    className="bg-gradient-to-r from-sky-200 via-indigo-200 to-fuchsia-200 bg-clip-text text-4xl font-semibold text-transparent drop-shadow-[0_18px_60px_rgba(99,102,241,0.6)] sm:text-5xl lg:text-6xl"
                  />
                </span>
              </h1>

              <p className="mt-8 text-base leading-relaxed text-slate-100/90 sm:text-lg">
                Mais de 5 anos transformando visões em experiências web pixel-perfect com React, Next.js e TypeScript, aliando estratégia de produto, design system e engenharia.
              </p>
              <p className="mt-6 text-base leading-relaxed text-slate-100/80 sm:text-lg">
                Como líder técnico na Mainnet Design, conduzo equipes multidisciplinares, mentoro devs e integro front-end e back-end com infraestrutura em nuvem para entregar resultados medidos.
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Link
                  href="#work"
                  className="group inline-flex items-center gap-3 rounded-full border border-transparent bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-[2px] hover:shadow-[0_18px_45px_-18px_rgba(148,163,184,0.55)]"
                >
                  Ver projetos
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="mailto:benitopedro21@outlook.com?subject=Quero%20marcar%20uma%20conversa"
                  className="inline-flex items-center gap-3 rounded-full border border-indigo-400/40 bg-slate-950/80 px-6 py-3 text-sm font-semibold text-white transition hover:border-indigo-300/60 hover:bg-indigo-500/10"
                >
                  Marcar conversa
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
                  Liderança técnica em squads globais
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-3xl border border-slate-700/60 bg-slate-950/80 p-6 backdrop-blur-2xl shadow-[0_40px_90px_-35px_rgba(67,56,202,0.55)]">
              <div className="space-y-3 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-slate-950 via-indigo-950/40 to-transparent p-6 shadow-[0_35px_70px_-25px_rgba(99,102,241,0.55)]">
                <h2 className="text-lg font-semibold text-white/90">
                  Soluções digitais ponta a ponta
                </h2>
                <p className="text-sm text-slate-100/90">
                  Do discovery ao pós-lançamento, combino visão estratégica, engenharia rigorosa e narrativa visual para acelerar iniciativas digitais.
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
          <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
            <span className="inline-flex items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/80">
              Destaques rápidos
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Valor entregue em cada parceria
            </h2>
            <p className="mt-6 max-w-3xl text-base text-slate-100/85 sm:text-lg">
              Experiência, liderança e visão full stack para construir produtos digitais que equilibram impacto de negócio, performance e experiência.
            </p>
          </div>

          <div className="relative z-10 mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {valueProps.map((item) => (
              <div
                key={item.title}
                className="flex h-full flex-col justify-between rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 text-left backdrop-blur transition hover:-translate-y-1 hover:border-slate-500/60 hover:bg-slate-900/70 shadow-[0_30px_70px_-35px_rgba(30,64,175,0.55)]"
              >
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm text-slate-200/90">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="work"
          className="relative px-6 py-24 sm:px-10 lg:px-24"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.16),transparent_75%)]" />
          <div className="relative z-10 mx-auto max-w-5xl space-y-12">
            <div className="flex flex-col gap-4 text-center sm:text-left">
              <span className="inline-flex items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/80">
                Projetos em destaque
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Projetos recentes que unem craft e impacto
              </h2>
              <p className="text-base text-slate-100/85 sm:text-lg">
                Um recorte das experiências digitais que liderei — de sistemas de design a plataformas SaaS — com foco em performance, qualidade e storytelling.
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
                    Ver estudo de caso
                    <ArrowRight className="size-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="experience"
          className="relative px-6 py-24 sm:px-10 lg:px-24"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(67,56,202,0.16),transparent_75%)]" />
          <div className="relative z-10 mx-auto max-w-5xl space-y-12">
            <div className="text-center sm:text-left">
              <span className="inline-flex items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/80">
                Linha do tempo profissional
              </span>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Liderança e entrega em múltiplos contextos
              </h2>
              <p className="mt-4 max-w-3xl text-base text-slate-100/85 sm:text-lg">
                Atuação transversal em consultorias, produtos SaaS e squads internos, combinando visão estratégica, execução técnica e mentoria.
              </p>
            </div>
            <div className="relative border-l border-slate-800/60 pl-8 sm:pl-12">
              <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-indigo-400/60 via-slate-700/60 to-transparent" />
              <div className="space-y-12">
                {timeline.map((item) => (
                  <div key={item.company} className="relative space-y-4">
                    <div className="absolute -left-[33px] top-1 grid size-6 place-items-center rounded-full border border-indigo-400/60 bg-slate-950/90 text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-200/80">
                      ●
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-white">
                        {item.role}
                      </h3>
                      <span className="text-xs uppercase tracking-[0.3em] text-slate-300">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-200/90">{item.company}</p>
                    <ul className="space-y-2 text-sm text-slate-200/80">
                      {item.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3"
                        >
                          <span className="mt-1 inline-block size-1 rounded-full bg-indigo-400" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="relative px-6 py-24 sm:px-10 lg:px-24"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.15),transparent_75%)]" />
          <div className="relative z-10 mx-auto max-w-5xl space-y-10">
            <div className="text-center">
              <span className="inline-flex items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/80">
                Serviços &amp; soluções
              </span>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Do protótipo ao scale-up com o mesmo parceiro
              </h2>
              <p className="mt-4 text-base text-slate-100/85 sm:text-lg">
                Parcerias sob demanda para acelerar produtos digitais, com entregas claras, documentação e acompanhamento contínuo.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 text-left backdrop-blur transition hover:-translate-y-1 hover:border-slate-400/60 hover:bg-slate-900/70 shadow-[0_30px_80px_-45px_rgba(16,185,129,0.55)]"
                >
                  <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 text-sm text-slate-200/90">{service.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="stack"
          className="relative px-6 py-24 sm:px-10 lg:px-24"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.16),transparent_75%)]" />
          <div className="relative z-10 mx-auto max-w-5xl space-y-10">
            <div className="text-center">
              <span className="inline-flex items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/80">
                Stack &amp; ferramentas
              </span>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Escolhas técnicas para velocidade e confiabilidade
              </h2>
              <p className="mt-4 text-base text-slate-100/85 sm:text-lg">
                Ferramentas que sustentam entregas rápidas, seguras e observáveis em ambientes de alta exigência.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {stack.map((group) => (
                <div
                  key={group.title}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 text-left backdrop-blur transition hover:-translate-y-1 hover:border-slate-400/60 hover:bg-slate-900/70 shadow-[0_30px_80px_-45px_rgba(59,130,246,0.55)]"
                >
                  <div className="text-sm uppercase tracking-[0.3em] text-slate-300">{group.title}</div>
                  <div className="flex flex-wrap gap-2 text-sm font-medium text-slate-100">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-slate-700/60 bg-slate-900/70 px-3 py-1"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
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
                Depoimentos de quem constrói junto
              </h2>
              <p className="mt-4 text-base text-slate-100/85 sm:text-lg">
                Colaboradores e parceiros que vivenciaram entregas com ownership, clareza e foco em impacto real.
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
          id="contato"
          className="relative mx-6 mb-24 overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900/60 to-slate-950 px-8 py-16 text-center shadow-[0_45px_120px_-55px_rgba(59,130,246,0.65)] sm:mx-10 lg:mx-24 lg:px-16 lg:py-20"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),transparent_65%)]" />
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-700/60 bg-slate-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-100/80">
              Vamos conversar
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Pronto para acelerar seu próximo produto digital
            </h2>
            <p className="text-base text-slate-100/85 sm:text-lg">
              Conte comigo para liderar iniciativas front-end e full stack, alinhar stakeholders e entregar interfaces de alto impacto com bases escaláveis.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:benitopedro21@outlook.com"
                className="inline-flex items-center gap-3 rounded-full border border-transparent bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-[2px] hover:shadow-[0_25px_60px_-18px_rgba(148,163,184,0.7)]"
              >
                <Mail className="size-4" />
                Enviar e-mail
              </a>
              <a
                href="https://www.linkedin.com/in/benitopedrox/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-slate-600/60 px-8 py-3 text-sm font-semibold text-white transition hover:border-slate-200/70 hover:bg-slate-800/70"
              >
                <Linkedin className="size-4" />
                Conectar no LinkedIn
              </a>
              <a
                href="https://cal.com/benitopedrox/intro"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-indigo-400/40 bg-slate-950/80 px-8 py-3 text-sm font-semibold text-white transition hover:border-indigo-300/60 hover:bg-indigo-500/10"
              >
                <Calendar className="size-4" />
                Agendar conversa
              </a>
            </div>
            <div className="text-sm text-slate-200/80">
              Ou fale diretamente pelo WhatsApp: <span className="font-medium text-white">+55 (21) 9 8384-9852</span>
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
