# Benito Xavier – Portfolio

Modern, motion-driven portfolio built with Next.js, Animate UI, and Tailwind CSS to showcase my work as a Front-end & Full Stack Developer. The site blends cinematic UI elements with a focus on usability, performance, and storytelling.

---

## ✨ Highlights

- **Animate UI motion system**: Gradient backgrounds, morphing text, animated cursor, and tabbed storytelling powered by Animate UI’s MCP registry.
- **Composable architecture**: Decoupled components, reusable primitives, and type-safe utilities to evolve the site alongside new projects.
- **Accessibility & performance-first**: Motion preferences respected, Radix-backed primitives, and responsive layouts tested across devices.
- **Scalable foundations**: Ready for future case studies, blog posts, and language versions with minimal refactoring.

---

## 🧠 About Benito

- Front-end specialist with **5+ years** crafting pixel-perfect experiences using React, Next.js, and TypeScript.
- Strong full stack background: Node.js, NestJS, REST/gRPC APIs, authentication, and database design.
- Leads development initiatives at **Mainnet Design**, mentoring devs, managing infrastructure, and aligning multi-disciplinary teams.
- Comfortable across AWS, Google Cloud, Vercel, CI/CD pipelines, Docker, DNS, and environment orchestration.
- Passionate about design handoff, problem solving, continuous learning, and high-quality maintainable code.

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Styling**: Tailwind CSS v4, custom design tokens, CSS variables
- **Animation & UI**: Animate UI MCP registry, Motion, Radix primitives
- **Type Safety & Tooling**: TypeScript, ESLint, pnpm, shadcn CLI
- **Deployment-ready**: Vercel-first setup with automated builds

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
pnpm install

# 2. Run the development server
pnpm dev

# 3. Build for production
pnpm build && pnpm start
```

Requirements:
- Node.js 20+
- pnpm 8+

Environment variables are not required by default. Add `.env.local` if you integrate analytics, CMS, or form handlers.

---

## 📂 Project Structure

```
src/
  app/
    layout.tsx         # Global layout + metadata
    page.tsx           # Animated landing page
    globals.css        # Tailwind v4 global tokens
  components/
    animate-ui/        # Generated Animate UI components
    example-table.tsx  # Sample data table (shadcn)
  hooks/
    use-is-in-view.tsx # Intersection observer hook
  lib/
    get-strict-context.tsx # Type-safe context utility
```

---

## 🧩 Animations & UI

Generated via MCP:

- `GradientBackground` – ambient gradient wash
- `MorphingText` – animated headline transitions
- `CursorProvider / Cursor / CursorFollow` – custom cursor + tooltip
- `AvatarGroup` – hoverable collaborator cards
- `Tabs` – motion-enhanced content reveal

---

## 📈 Roadmap Ideas

- Add project case studies with MDX content
- Integrate contact form (e.g., Resend, Formspree)
- Light/dark theme toggle and reduced-motion enhancements
- Analytics (Plausible or GA4) for portfolio insights

---

## 🤝 Services

- Web development & design handoff
- SaaS product development
- Database architecture
- Cloud infrastructure & DevOps (AWS, GCP, Vercel)

---

## 📬 Contact

- Email: benitopedro21@outlook.com
- Phone/WhatsApp: +55 (21) 9 8384-9852
- LinkedIn: [linkedin.com/in/benitopedrox](https://www.linkedin.com/in/benitopedrox/)
- GitHub: [github.com/benitopedro13](https://github.com/benitopedro13)

---

## 📄 License

This portfolio is proprietary and represents personal work. Do not reuse or redistribute without explicit permission.
