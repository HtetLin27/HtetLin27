import Link from "next/link";
import { PROJECTS } from "@/content/projects";
import { Mark } from "@/components/Mark";
import { YangonClock } from "@/components/YangonClock";

export const metadata = {
  title: "Work — Htet Lin Ko",
  description:
    "Selected work from Htet Lin Ko, senior frontend engineer at Better HR.",
};

export default function WorkIndex() {
  return (
    <main className="relative w-full">
      <section className="relative flex min-h-screen w-full flex-col px-6 pt-24 pb-32 md:px-12 md:pt-32">
        <Link
          href="/"
          className="absolute top-6 left-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-bone"
          data-cursor-label="Home"
        >
          ← Htet Lin Ko
        </Link>

        <div className="absolute top-14 right-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          Index · {String(PROJECTS.length).padStart(2, "0")} entries
        </div>

        <h1 className="mt-16 mb-20 font-serif text-[clamp(4rem,14vw,16rem)] leading-[0.9] text-bone md:mt-24 md:mb-28">
          Work<span className="italic text-muted">.</span>
        </h1>

        <ul className="flex flex-col">
          {PROJECTS.map((project) => (
            <li
              key={project.slug}
              className="border-t border-muted/20 last:border-b"
            >
              <Link
                href={`/work/${project.slug}`}
                data-cursor-label={`${project.number} · ${project.name}`}
                className="group flex items-center gap-6 py-8 md:gap-10 md:py-12"
              >
                <span className="w-10 shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {project.number}
                </span>
                <div className="flex-1 overflow-hidden">
                  <h2 className="font-serif text-3xl leading-tight text-bone transition-transform duration-500 ease-out group-hover:-translate-x-1 sm:text-4xl md:text-5xl lg:text-6xl">
                    {project.name}
                  </h2>
                </div>
                <div className="hidden shrink-0 flex-col items-end gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:flex">
                  <span>{project.client}</span>
                  <span>{project.timeframe}</span>
                </div>
                <span className="font-serif text-2xl leading-none text-bone/60 transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-3xl">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="absolute bottom-6 left-6 h-10 w-10">
          <Mark className="h-full w-full text-bone/60" animate={false} />
        </div>

        <div className="absolute bottom-6 right-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          Yangon · UTC+6:30 <YangonClock />
        </div>
      </section>
    </main>
  );
}
