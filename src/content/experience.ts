export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  start: string;
  end: string;
  duration: string;
  mode: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    id: "mainnet",
    role: "Full Stack Developer",
    company: "Mainnet Design",
    period: "Jul 2024 – Present",
    start: "2024",
    end: "Present",
    duration: "1 yr 9 mos",
    mode: "Hybrid · Rio de Janeiro, Brazil",
    summary:
      "Technical lead role on enterprise applications: I run requirements gathering with stakeholders, define delivery timelines, mentor the dev team, and own everything from the Figma handoff down to the cloud bill.",
    highlights: [
      "Led requirements gathering and timeline definition for new features across enterprise applications.",
      "Ran technical meetings with stakeholders to align feedback and adjust development strategy.",
      "Delegated tasks and mentored junior and mid-level developers, raising code quality and architectural standards.",
      "Built pixel-perfect interfaces from Figma with high fidelity to the design spec.",
      "Implemented secure auth with JWT, OAuth 2.0, and external identity provider integration.",
      "Integrated REST, GraphQL, and gRPC APIs to connect heterogeneous systems.",
      "Structured and managed SQL and NoSQL databases per project requirements.",
      "Configured DNS, managed Production/Staging/QA/Dev environments, and automated CI/CD pipelines.",
      "Provisioned and optimised cloud infrastructure on AWS, Google Cloud, and Vercel.",
      "Monitored servers and databases proactively for availability, performance, and stability.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "AWS",
      "Google Cloud",
      "Docker",
      "GraphQL",
      "gRPC",
    ],
  },
  {
    id: "juicy-space",
    role: "Full Stack Developer",
    company: "Juicy Space",
    period: "Sep 2023 – Sep 2024",
    start: "2023",
    end: "2024",
    duration: "1 yr 1 mo",
    mode: "Remote",
    summary:
      "Product engineering on real-time web applications, with a strong focus on performance budgets and automated test coverage.",
    highlights: [
      "Developed full stack web applications with React, Next.js, TypeScript, Node.js, and SQL/NoSQL databases.",
      "Implemented real-time communication over WebSockets for chat, notifications, and live updates.",
      "Optimised performance through bundle analysis, code splitting, and lazy loading.",
      "Set up automated testing with Jest, Vitest, and Testing Library to protect coverage and quality.",
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "WebSockets",
      "Jest",
      "Vitest",
    ],
  },
  {
    id: "trivod",
    role: "Full Stack Developer",
    company: "Trivod",
    period: "Sep 2021 – May 2023",
    start: "2021",
    end: "2023",
    duration: "1 yr 9 mos",
    mode: "Remote",
    summary:
      "Delivered applications from concept to production inside a Scrum team, including distributed systems built on message queues.",
    highlights: [
      "Built full stack applications from conception to deployment, with technical documentation and tests.",
      "Worked in Scrum: sprint planning, dailies, reviews, and retrospectives.",
      "Implemented microservice architectures with asynchronous communication via RabbitMQ.",
      "Collaborated directly with clients and stakeholders on requirements and expectations.",
    ],
    stack: ["Node.js", "React", "RabbitMQ", "Microservices", "PostgreSQL", "Docker"],
  },
];

export type SkillGroup = {
  id: string;
  label: string;
  blurb: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Interfaces that feel fast and match the design down to the pixel.",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux",
      "Tailwind CSS",
      "SASS",
      "HTML5",
      "CSS3",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    blurb: "APIs and services designed to be integrated, not just deployed.",
    items: [
      "Node.js",
      "NestJS",
      "Express",
      "Python (FastAPI)",
      "C# (.NET Core)",
      "REST",
      "GraphQL",
      "gRPC",
      "WebSockets",
      "Microservices",
    ],
  },
  {
    id: "data",
    label: "Databases",
    blurb: "Data modelling that survives the second year of a product.",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Prisma ORM",
      "SQL",
      "NoSQL",
      "Data Modeling",
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    blurb: "Environments, pipelines, and infrastructure that stay boring.",
    items: [
      "AWS",
      "Google Cloud",
      "Vercel",
      "Docker",
      "Kubernetes",
      "CI/CD Pipelines",
      "DNS Configuration",
      "Prod/Staging/QA/Dev",
    ],
  },
  {
    id: "quality",
    label: "Testing & Quality",
    blurb: "Coverage where it matters, so releases stop being scary.",
    items: [
      "Jest",
      "Vitest",
      "Testing Library",
      "Unit Testing",
      "Integration Testing",
      "E2E Testing",
    ],
  },
  {
    id: "practice",
    label: "Tools & Practices",
    blurb: "How the work actually gets shipped with a team.",
    items: [
      "Git",
      "Figma to Code",
      "Responsive Design",
      "Cross-Browser",
      "SEO",
      "Scrum",
      "Kanban",
    ],
  },
];

export const services = [
  {
    id: "web-apps",
    title: "Web Application Development",
    body: "Full products built on Next.js and TypeScript — auth, dashboards, payments, integrations. Delivered with environments and CI/CD in place from day one.",
    deliverables: [
      "Architecture and data modelling",
      "Pixel-perfect UI from Figma",
      "Auth (JWT, OAuth 2.0, SSO)",
      "Production deployment pipeline",
    ],
  },
  {
    id: "api",
    title: "APIs & Backend Systems",
    body: "REST, GraphQL, and gRPC services in NestJS, Node, or FastAPI. Including microservices with queue-based communication when the domain calls for it.",
    deliverables: [
      "API design and documentation",
      "Microservices and message queues",
      "Database schema and migrations",
      "Integration test coverage",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Infrastructure",
    body: "AWS, Google Cloud, and Vercel setups with multi-environment separation, DNS, monitoring, and cost optimisation.",
    deliverables: [
      "Environment strategy",
      "CI/CD automation",
      "DNS and domain configuration",
      "Monitoring and cost tuning",
    ],
  },
  {
    id: "lead",
    title: "Technical Leadership",
    body: "Requirements gathering with stakeholders, timeline definition, code review culture, and mentoring for junior and mid-level developers.",
    deliverables: [
      "Stakeholder discovery sessions",
      "Delivery roadmap",
      "Code review and standards",
      "Developer mentorship",
    ],
  },
] as const;
