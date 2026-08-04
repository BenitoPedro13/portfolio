import { AuroraHero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { StackSection } from "@/components/StackSection";
import { ProcessSection, ServicesSection } from "@/components/ProcessSection";
import { Contact } from "@/components/Contact";
import { Divider } from "@/components/motion/Backdrop";
import { TextMarquee } from "@/components/motion/Marquee";

export default function Home() {
  return (
    <>
      <AuroraHero />

      <div className="overflow-hidden border-y border-white/[0.05] py-8">
        <TextMarquee
          words={[
            "Full Stack Development",
            "Pixel-Perfect Interfaces",
            "API Architecture",
            "Cloud Infrastructure",
            "Technical Leadership",
          ]}
          speed={34}
        />
      </div>

      <Projects />
      <Divider />

      <ExperienceTimeline />
      <Divider />

      <ProcessSection />
      <Divider />

      <StackSection />
      <Divider />

      <ServicesSection />

      <Contact />
    </>
  );
}
