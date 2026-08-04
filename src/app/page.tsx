import { AuroraHero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <AuroraHero />

      {/* divider */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[#ffffff15] to-transparent" />
      </div>

      <Projects />

      <div className="mx-auto max-w-6xl px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[#ffffff15] to-transparent" />
      </div>

      <About />

      <div className="mx-auto max-w-6xl px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[#ffffff15] to-transparent" />
      </div>

      <Contact />

      <footer className="border-t border-[#ffffff08] py-8 text-center text-xs text-white/20">
        © {new Date().getFullYear()} Benito Pedro Xavier Neto · Rio de Janeiro, Brazil
      </footer>
    </main>
  );
}
