import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { AuroraHero } from "@/components/Hero";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="">
      {/* {" "}
      <div className="relative inset-0 min-h-screen">
        <StarsBackground
          starColor="#fff"
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-xl",
            "bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_100%)]"
          )}
        />
      </div> */}


      <AuroraHero/>
    </main>
  );
}
