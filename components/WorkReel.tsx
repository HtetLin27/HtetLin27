"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, type Project } from "@/content/projects";
import { Mark } from "./Mark";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_PANELS = PROJECTS.length;

export function WorkReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || isMobile) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getDistance = () => track.scrollWidth - window.innerWidth;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${getDistance()}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(track, { x: -getDistance() * p });
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${p})`;
        }
        if (markRef.current) {
          const deg = p * 16 - 8;
          markRef.current.style.transform = `rotate(${deg.toFixed(2)}deg)`;
        }
        const idx = Math.min(
          TOTAL_PANELS - 1,
          Math.floor(p * TOTAL_PANELS + 0.001),
        );
        setActiveIndex(idx);
      },
    });

    return () => {
      st.kill();
    };
  }, [reducedMotion, isMobile]);

  const displayIndex = Math.min(activeIndex + 1, PROJECTS.length);

  if (isMobile) {
    return (
      <section id="work" className="relative w-full overflow-hidden">
        <div className="border-t border-muted/20 px-6 pt-8 pb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          03 · Work
        </div>
        <div className="divide-y divide-muted/20">
          {PROJECTS.map((project) => (
            <MobilePanel key={project.slug} project={project} />
          ))}
        </div>
      </section>
    );
  }

  if (reducedMotion) {
    return (
      <section id="work" className="relative w-full">
        {PROJECTS.map((project) => (
          <div key={project.slug} className="h-screen w-full">
            <Panel project={project} />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-bg"
    >
      <div
        ref={trackRef}
        className="flex h-full"
        style={{ width: `${TOTAL_PANELS * 100}vw` }}
      >
        {PROJECTS.map((project) => (
          <Panel key={project.slug} project={project} />
        ))}
      </div>

      <div className="pointer-events-none absolute top-6 left-6 flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        <span>03 · Work</span>
        <span className="ml-3">
          <span className="tabular-nums text-bone">
            {String(displayIndex).padStart(2, "0")}
          </span>
          <span> / </span>
          <span className="tabular-nums">
            {String(PROJECTS.length).padStart(2, "0")}
          </span>
        </span>
      </div>

      <div
        ref={markRef}
        className="pointer-events-none absolute bottom-6 left-6 h-10 w-10 origin-center"
      >
        <Mark className="h-full w-full text-bone/60" animate={false} />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-muted/25">
        <div
          ref={progressRef}
          className="h-full w-full origin-left bg-bone"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </section>
  );
}

function Panel({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor-label={`${project.number} · ${project.name}`}
      className="group relative flex h-full w-screen shrink-0 overflow-hidden"
    >
      {project.reel.kind === "metrics" && (
        <MetricsComposition project={project} />
      )}
      {project.reel.kind === "diagram" && (
        <DiagramComposition project={project} />
      )}
      {project.reel.kind === "pullquote" && (
        <PullQuoteComposition project={project} />
      )}
      {project.reel.kind === "statement" && (
        <StatementComposition project={project} />
      )}
    </Link>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
      <span>{project.client}</span>
      <span>{project.role}</span>
      <span>{project.timeframe}</span>
    </div>
  );
}

/* ------------------------------- Panel 01 -------------------------------- */
function MetricsComposition({ project }: { project: Project }) {
  if (project.reel.kind !== "metrics") return null;
  return (
    <div className="relative flex h-full w-full flex-col">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-start overflow-hidden"
      >
        <span
          style={{ viewTransitionName: `project-number-${project.slug}` }}
          className="font-serif leading-none text-bone/95 text-[68vh] select-none"
        >
          {project.number}
        </span>
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-end pr-[8vw] pl-[45vw]">
        <div className="flex max-w-xl flex-col gap-6">
          <ProjectMeta project={project} />
          <h3 className="font-serif text-4xl leading-tight text-bone sm:text-5xl">
            <span className="relative inline-block">
              {project.name}
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-bone transition-transform duration-700 ease-out group-hover:scale-x-100"
              />
            </span>
          </h3>
          <p className="font-sans text-base leading-relaxed text-bone/80 sm:text-lg">
            {project.reel.oneLiner}
          </p>
        </div>
      </div>

      <div className="relative z-10 border-t border-muted/20 py-4">
        <div className="flex items-center gap-8 overflow-hidden px-[8vw] font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          {project.reel.metrics.map((m, i) => (
            <span key={i} className="whitespace-nowrap">
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Panel 02 -------------------------------- */
function DiagramComposition({ project }: { project: Project }) {
  if (project.reel.kind !== "diagram") return null;
  return (
    <div className="relative flex h-full w-full items-center">
      <div className="relative z-10 flex w-1/2 flex-col gap-6 pl-[8vw] pr-8">
        <ProjectMeta project={project} />
        <h3 className="font-serif text-4xl leading-tight text-bone sm:text-5xl">
          <span className="relative inline-block">
            {project.name}
            <span
              aria-hidden
              className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-bone transition-transform duration-700 ease-out group-hover:scale-x-100"
            />
          </span>
        </h3>
        <p className="font-sans text-base leading-relaxed text-bone/80 sm:text-lg">
          {project.reel.oneLiner}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center overflow-hidden">
        <span
          style={{ viewTransitionName: `project-number-${project.slug}` }}
          className="font-serif leading-none text-bone/95 text-[60vh] select-none"
        >
          {project.number}
        </span>
      </div>

      <div className="pointer-events-none absolute right-[6vw] bottom-[14vh] left-[6vw]">
        <FlowDiagram steps={project.reel.flow} />
      </div>
    </div>
  );
}

function FlowDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-bone" />
            <span className="whitespace-nowrap">{step}</span>
          </div>
          {i < steps.length - 1 && (
            <span className="inline-block h-px w-8 bg-muted/60" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------- Panel 03 -------------------------------- */
function PullQuoteComposition({ project }: { project: Project }) {
  if (project.reel.kind !== "pullquote") return null;
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute top-6 left-6 flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        <span>{project.number}</span>
        <span className="relative inline-block self-start">
          {project.name}
          <span
            aria-hidden
            className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-bone transition-transform duration-500 ease-out group-hover:scale-x-100"
          />
        </span>
      </div>

      <div className="pointer-events-none absolute -right-[18vw] top-1/2 -translate-y-1/2">
        <Mark
          className="h-[70vh] w-[70vh] text-bone/25"
          animate={false}
          strokeWidth={1.2}
        />
      </div>

      <blockquote className="relative z-10 max-w-4xl px-[8vw] font-serif text-5xl italic leading-[1.05] text-bone sm:text-6xl md:text-7xl lg:text-[6.5rem]">
        &ldquo;{project.reel.quote}&rdquo;
      </blockquote>
    </div>
  );
}

/* ------------------------------- Panel 04 -------------------------------- */
function StatementComposition({ project }: { project: Project }) {
  if (project.reel.kind !== "statement") return null;
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute top-6 left-6 flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        <span>{project.number}</span>
        <span className="relative inline-block self-start">
          {project.name}
          <span
            aria-hidden
            className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-bone transition-transform duration-500 ease-out group-hover:scale-x-100"
          />
        </span>
      </div>

      <div className="relative z-10 flex max-w-6xl flex-col gap-2 px-[8vw] font-serif text-5xl leading-[1.05] text-bone sm:text-6xl md:text-7xl lg:text-[6.5rem]">
        <span className="text-muted">{project.reel.lines[0]}</span>
        <span className="italic">{project.reel.lines[1]}</span>
      </div>

      <div className="absolute bottom-6 right-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        {project.client} · {project.timeframe}
      </div>
    </div>
  );
}

/* ------------------------------- Mobile --------------------------------- */
function getReelSummary(project: Project): string {
  const r = project.reel;
  if (r.kind === "metrics" || r.kind === "diagram") return r.oneLiner;
  if (r.kind === "pullquote") return r.quote;
  return `${r.lines[0]} ${r.lines[1]}`;
}

function MobilePanel({ project }: { project: Project }) {
  const summary = getReelSummary(project);
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor-label={`${project.number} · ${project.name}`}
      className="group relative flex w-full flex-col gap-8 overflow-hidden px-6 py-16"
    >
      <div className="flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        <span>{project.client}</span>
        <span>
          {project.role} · {project.timeframe}
        </span>
      </div>

      <span
        style={{ viewTransitionName: `project-number-${project.slug}` }}
        className="font-serif leading-[0.85] text-bone text-[36vw] select-none"
      >
        {project.number}
      </span>

      <div className="flex flex-col gap-4">
        <h3 className="font-serif text-3xl leading-tight text-bone">
          {project.name}
        </h3>
        <p className="font-sans text-base leading-relaxed text-bone/80">
          {summary}
        </p>
      </div>

      <span className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        View case study →
      </span>
    </Link>
  );
}
