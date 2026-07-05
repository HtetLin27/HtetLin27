import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Credentials } from "@/components/Credentials";
import { HeroName } from "@/components/HeroName";
import { HeroTagline } from "@/components/HeroTagline";
import { Mark } from "@/components/Mark";
import { SkillsPath } from "@/components/SkillsPath";
import { WorkReel } from "@/components/WorkReel";
import { YangonClock } from "@/components/YangonClock";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full">
      <section className="relative flex h-screen w-full flex-col items-center justify-center">
        <div className="absolute top-6 left-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          HLK / 2026
        </div>

        <div className="absolute top-14 right-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          <span>Yangon · UTC+6:30</span>
          <YangonClock />
        </div>

        <div className="flex flex-col items-center gap-8">
          <Mark
            className="h-[22vw] w-[22vw] max-h-[280px] max-w-[280px] min-h-[160px] min-w-[160px] text-bone"
            drawDelay={0.2}
            drawDuration={1.0}
          />
          <HeroName
            text="HTET LIN KO"
            delay={1.4}
            className="text-[clamp(3rem,10vw,10rem)] text-bone"
          />
          <HeroTagline
            prefix="Full-stack engineer. I ship HR SaaS by day and build "
            scramble="end-to-end systems on the side."
            delay={2.4}
            className="max-w-2xl text-center text-base leading-relaxed text-muted sm:text-lg"
          />
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          Scroll ↓
        </div>
      </section>

      <About />
      <WorkReel />
      <SkillsPath />
      <Credentials />
      <Contact />
    </main>
  );
}
