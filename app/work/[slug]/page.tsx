import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  PROJECTS,
  getNextProject,
  getProjectBySlug,
  type WorkPanel,
} from "@/content/projects";
import { CaseStudyNumber } from "@/components/CaseStudyNumber";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Htet Lin Ko`,
    description: `${project.client} · ${project.role} · ${project.timeframe}`,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const next = getNextProject(slug);

  return (
    <main className="relative w-full">
      {/* Header */}
      <section className="relative flex h-screen w-full items-end px-6 pb-16 md:px-12 md:pb-24">
        <Link
          href="/work"
          className="absolute top-6 left-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-bone"
          data-cursor-label="Index"
        >
          ← Work
        </Link>

        <div className="flex w-full flex-col gap-12 md:flex-row md:items-end md:justify-between md:gap-16">
          <div className="flex flex-col gap-4">
            <CaseStudyNumber number={project.number} slug={project.slug} />
            <div className="flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              <span>{project.client}</span>
              <span>
                {project.role} · {project.timeframe}
              </span>
            </div>
            {project.links && project.links.length > 0 && (
              <ul className="mt-2 flex flex-col gap-1.5">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-label={link.label}
                      className="group relative inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-bone/90"
                    >
                      <span className="relative z-10">
                        {link.label} <span className="text-muted">↗</span>
                      </span>
                      <span
                        aria-hidden
                        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-bone transition-transform duration-500 ease-out group-hover:scale-x-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <h1 className="font-serif text-[clamp(3rem,7vw,7rem)] leading-[0.95] text-bone md:max-w-[60%] md:text-right">
            {project.name}
          </h1>
        </div>
      </section>

      {/* Context slab */}
      <section className="w-full px-6 py-32 md:px-12 md:py-40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-24">
          <h2 className="font-serif text-4xl italic leading-tight text-bone sm:text-5xl">
            The problem.
          </h2>
          <div className="flex flex-col gap-6">
            {project.study.problem.map((p, i) => (
              <p
                key={i}
                className="font-sans text-lg leading-relaxed text-bone/90 sm:text-xl"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Work grid */}
      <section className="w-full">
        {project.study.workPanels.map((panel, i) => (
          <WorkPanelRender key={i} panel={panel} />
        ))}
      </section>

      {/* Reflection */}
      <section className="w-full px-6 py-32 md:px-12 md:py-40">
        <div className="mx-auto max-w-4xl">
          <p className="font-serif text-3xl italic leading-snug text-bone sm:text-4xl md:text-5xl">
            {project.study.reflection}
          </p>
        </div>
      </section>

      {/* Next project */}
      <section className="w-full border-t border-muted/20 px-6 py-24 md:px-12">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            Next
          </div>
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-baseline gap-4"
            data-cursor-label={`${next.number} · ${next.name}`}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              {next.number}
            </span>
            <span className="font-serif text-4xl leading-none text-bone transition-colors group-hover:text-bone sm:text-5xl md:text-6xl lg:text-7xl">
              {next.name}
            </span>
            <span className="font-serif text-3xl text-bone">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

function WorkPanelRender({ panel }: { panel: WorkPanel }) {
  switch (panel.kind) {
    case "pullquote":
      return (
        <div className="flex min-h-[80vh] w-full items-center px-6 md:px-12">
          <blockquote className="mx-auto max-w-5xl font-serif text-4xl italic leading-tight text-bone sm:text-5xl md:text-6xl lg:text-7xl">
            &ldquo;{panel.text}&rdquo;
          </blockquote>
        </div>
      );

    case "numbers":
      return (
        <div className="flex min-h-[60vh] w-full items-center px-6 md:px-12">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-4 font-mono text-2xl uppercase tracking-[0.06em] text-bone sm:text-3xl md:text-4xl">
            {panel.items.map((item, i) => (
              <span key={i} className="flex items-center gap-8">
                {item}
                {i < panel.items.length - 1 && (
                  <span className="text-muted">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      );

    case "screenshot":
      return (
        <div className="flex min-h-[90vh] w-full items-center px-6 md:px-12">
          <figure className="mx-auto w-full max-w-6xl">
            <div className="relative aspect-video w-full overflow-hidden border border-bone/20 bg-ink">
              {panel.src ? (
                <Image
                  src={panel.src}
                  alt={panel.caption}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    <span>Screenshot</span>
                    <span className="text-bone/40">placeholder</span>
                  </div>
                </div>
              )}
            </div>
            <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              {panel.caption}
            </figcaption>
          </figure>
        </div>
      );

    case "diagram":
      return (
        <div className="flex min-h-[70vh] w-full items-center px-6 md:px-12">
          <figure className="mx-auto flex w-full max-w-6xl flex-col gap-8">
            <div className="flex flex-wrap items-center gap-4 font-mono text-sm uppercase tracking-[0.14em] text-bone sm:text-base">
              {panel.steps.map((step, i) => (
                <span key={i} className="flex items-center gap-4">
                  <span className="flex items-center gap-3">
                    <span className="inline-block h-2 w-2 rounded-full bg-bone" />
                    {step}
                  </span>
                  {i < panel.steps.length - 1 && (
                    <span className="inline-block h-px w-12 bg-muted/60" />
                  )}
                </span>
              ))}
            </div>
            <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              {panel.caption}
            </figcaption>
          </figure>
        </div>
      );
  }
}
