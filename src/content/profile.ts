export const profile = {
  name: "Benito Pedro Xavier",
  shortName: "Benito",
  handle: "B3N!T0",
  role: "Full Stack Developer",
  subRole: "Frontend Specialist",
  location: "Rio de Janeiro, Brazil",
  timezone: "America/Sao_Paulo",
  email: "benitopedro21@outlook.com",
  phone: "+55 (21) 9 8384-9852",
  phoneHref: "+5521983849852",
  siteUrl: "https://benitopedro.dev",
  github: "https://github.com/BenitoPedro13",
  linkedin: "https://linkedin.com/in/benitopedro13",
  booking: "https://app.markado.co/benito/half-hour-meeting",
  resume: "/Resume_Benito_Pedro_Xavier_2026_EN.pdf",
  yearsExperience: 4,
  availability: "Open to new projects",
  tagline: "Building immersive web apps from concept to cloud",
  intro:
    "I design and ship full stack products end to end — from the first Figma frame to the production pipeline that keeps it online. Four years across enterprise apps, real-time platforms, and cloud infrastructure.",
  languages: [
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "Advanced (fluent)" },
  ],
  education: [
    {
      title: "Chemistry",
      institution: "Federal Institute of Rio de Janeiro (IFRJ)",
      period: "Jul 2019 – Dec 2022",
      note: "A scientific background that shaped how I approach engineering: hypothesis, measurement, iteration.",
    },
  ],
} as const;

export const values = [
  {
    title: "Own the whole outcome",
    body: "Requirements, architecture, UI, infra, monitoring. I don't hand off half a product and call it done.",
  },
  {
    title: "Pixel-perfect is a baseline",
    body: "If it left Figma at 16px with a 24px line-height, it ships that way. Designers should recognise their work.",
  },
  {
    title: "Boring infrastructure, exciting products",
    body: "Predictable pipelines, clean environments, and observable systems buy the freedom to move fast on the fun parts.",
  },
  {
    title: "Teach while you build",
    body: "Mentoring juniors and mid-levels compounds. Code review is the cheapest architecture lesson there is.",
  },
] as const;
