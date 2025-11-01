import Link from "next/link";
import { Mail } from "lucide-react";
import { BOOKING_LINK } from "@/lib/constants";
import ASCIIText from "./ASCIIText";
import Shuffle from "./Shuffle";
import EncryptButton from "./EncryptButton";

export default function Header() {
  return (
    <header className="absolute left-0 top-8 z-10 h-[60px] w-full">
      <nav className="mx-auto flex h-full w-[90%] items-center justify-between rounded-4xl border border-[#ffffff0b] bg-[#ffffff0d] px-8 py-4 backdrop-blur-md">
        <Link href="/#hero" className="h-6">
          <Shuffle
            className="font-press-start-2p !text-2xl"
            text="B3N!T0"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover={true}
            respectReducedMotion={true}
          />
        </Link>
        <div className="hidden flex-1 items-center justify-center gap-6 md:flex">
          <a href="#services" className="transition hover:text-white">
            Services
          </a>
          <a href="#projects" className="transition hover:text-white">
            Projects
          </a>
          <a href="#testimonials" className="transition hover:text-white">
            Testimonials
          </a>
          <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            Contact
          </a>
        </div>
        <div className="flex items-center gap-3">
           <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noreferrer"
          >
            <EncryptButton
              className="items-center cursor-pointer gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/80 transition hover:border-white/40 hover:bg-white/20"
              content="Book Call"
              icon={<Mail className="size-3.5" />}
            />
          </a> 
        </div>
      </nav>
    </header>
  );
}
