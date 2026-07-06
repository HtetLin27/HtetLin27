"use client";

type Role = {
  timeframe: string;
  tag: string;
  title: string;
  company: string;
  summary: string;
  keyWork: string[];
  stack: string[];
};

const ROLES: Role[] = [
  {
    timeframe: "2023 — Present",
    tag: "Senior",
    title: "Frontend Developer",
    company: "Better HR",
    summary:
      "I work on a multi-tenant HR SaaS platform used by companies across multiple countries. My work covers the React migration, payroll, recruitment, customer management, marketing sites, and platform architecture for internal tools.",
    keyWork: [
      "Building payroll, recruitment, ATS, KPI, and performance appraisal on the React 19 stack.",
      "Migrating legacy Vue / Nuxt features to a modern React, TypeScript, and Vite app.",
      "Leading frontend architecture for internal tools and permission-based user interfaces.",
      "Mentoring junior developers through code review and technical guidance.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "TanStack",
      "Vue",
      "Nuxt",
      "GraphQL",
      "Tailwind",
      "Storybook",
      "Vitest",
    ],
  },
  {
    timeframe: "2022 — 2023",
    tag: "Junior",
    title: "Frontend Developer",
    company: "Better HR",
    summary:
      "I started my software career by building production features for a large HR platform. I worked deeply on payroll, recruitment, performance appraisal, and platform features.",
    keyWork: [
      "Built the Applicant Tracking System from scratch.",
      "Led frontend work on multi-country payroll for Myanmar, Sri Lanka, and Thailand.",
      "Delivered Performance Appraisal, Custom Fields, Position Badges, and Payroll Analytics.",
      "Upgraded a legacy Vue project from Node.js 12 to Node.js 18.",
    ],
    stack: [
      "Vue 2",
      "Nuxt",
      "Vuex",
      "Apollo GraphQL",
      "TypeScript",
      "Element UI",
      "Pusher",
    ],
  },
  {
    timeframe: "2019 — 2022",
    tag: "L2 Engineer",
    title: "Network Engineer",
    company: "Frontiir",
    summary:
      "Before software development, I worked as a network engineer. This role taught me how to troubleshoot systems, find performance problems, and support real customers.",
    keyWork: [
      "Installed and configured Wi-Fi, FTTH, ONU, and network devices.",
      "Supported routing, switching, GPON fiber, and wireless point-to-point connections.",
      "Solved customer network issues for residential and business users.",
      "Built a strong foundation in debugging, system thinking, and reliability.",
    ],
    stack: [
      "Networking",
      "GPON",
      "FTTH",
      "Routing",
      "Switching",
      "Wireless Support",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative w-full">
      {ROLES.map((role, i) => (
        <Slide
          key={role.timeframe}
          role={role}
          index={i}
          total={ROLES.length}
        />
      ))}
    </section>
  );
}

function Slide({
  role,
  index,
  total,
}: {
  role: Role;
  index: number;
  total: number;
}) {
  const isLast = index === total - 1;
  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-bg">
      <div className="absolute top-6 left-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:top-8 md:left-12">
        02 · Experience
      </div>
      <div className="absolute top-6 right-6 font-mono text-[11px] uppercase tracking-[0.14em] text-bone tabular-nums md:top-8 md:right-12">
        {String(index + 1).padStart(2, "0")}
        <span className="text-muted"> / </span>
        {String(total).padStart(2, "0")}
      </div>

      <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 md:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)] md:gap-16">
          <div className="flex flex-col gap-4 md:pt-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              {role.timeframe}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone/85">
              {role.tag}
            </span>
            <div className="mt-2 flex gap-2">
              {Array.from({ length: total }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1 w-6 ${
                    i <= index ? "bg-bone" : "bg-muted/30"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-serif text-4xl leading-[1.02] text-bone sm:text-5xl md:text-6xl">
              {role.title}
              <span className="text-muted">, </span>
              <span className="italic">{role.company}</span>
            </h3>
            <p className="max-w-2xl font-sans text-base leading-relaxed text-bone/85 sm:text-lg">
              {role.summary}
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  Key work
                </span>
                <ul className="flex flex-col gap-2 font-sans text-sm leading-relaxed text-bone/85">
                  {role.keyWork.map((k) => (
                    <li key={k} className="flex gap-3">
                      <span aria-hidden className="pt-2 text-muted">
                        —
                      </span>
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  Stack
                </span>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone/85">
                  {role.stack.join(" · ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:bottom-8">
        {isLast ? "End of timeline" : "Scroll ↓ for next role"}
      </div>
    </div>
  );
}
