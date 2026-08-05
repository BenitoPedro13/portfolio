"use client";

import { ArrowLeft } from "lucide-react";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { AuroraBackdrop } from "@/components/motion/Backdrop";
import { PrimaryButton, GhostButton } from "@/components/ui-kit";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[100svh] place-content-center overflow-hidden px-6 text-center">
      <AuroraBackdrop position="top" intensity={0.7} />
      <StarsBackground
        starColor="#fff"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#1a0a00_0%,_#050505_100%)]"
      />

      <div className="relative z-10">
        <p className="font-press-start-2p text-6xl text-[#F97316] md:text-8xl">
          404
        </p>
        <h1 className="mt-8 bg-gradient-to-br from-white to-white/45 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-5xl">
          This page never shipped
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-white/45">
          The link is broken or the page moved. The work is all still here
          though.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <PrimaryButton href="/" icon={<ArrowLeft className="size-4" />}>
            Back home
          </PrimaryButton>
          <GhostButton href="/projects">Browse case studies</GhostButton>
        </div>
      </div>
    </section>
  );
}
