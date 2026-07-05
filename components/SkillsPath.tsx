"use client";

import { motion, type Variants } from "motion/react";

type Row = { label: string; items: string[] };

const ROWS: Row[] = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Vue", "Nuxt", "Tailwind"],
  },
  {
    label: "Backend",
    items: ["Node", "Express", "REST", "GraphQL", "Socket.IO", "JWT"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "Prisma", "Sequelize", "Supabase"],
  },
  {
    label: "Infra",
    items: ["Docker", "Vercel", "AWS S3", "GitLab CI"],
  },
];

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.03,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45 } },
};

export function SkillsPath() {
  return (
    <section
      id="system"
      className="relative w-full px-6 py-40 sm:py-48 md:px-12"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15% 0px" }}
        variants={container}
        className="mx-auto max-w-6xl"
      >
        <motion.div
          variants={itemVariants}
          className="mb-16 font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:mb-24"
        >
          03 · System — Technologies
        </motion.div>

        <ul className="flex flex-col divide-y divide-muted/20 border-y border-muted/20">
          {ROWS.map((row) => (
            <motion.li
              key={row.label}
              variants={rowVariants}
              className="grid grid-cols-1 gap-3 py-10 sm:grid-cols-[minmax(0,180px)_minmax(0,1fr)] sm:items-baseline sm:gap-12 sm:py-12"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {row.label}
              </span>
              <div className="flex flex-wrap items-baseline font-serif text-2xl leading-tight text-bone/90 sm:text-3xl md:text-4xl">
                {row.items.map((item, i) => (
                  <motion.span
                    key={item}
                    variants={itemVariants}
                    className="flex items-baseline"
                  >
                    <span>{item}</span>
                    {i < row.items.length - 1 && (
                      <span className="mx-3 text-muted sm:mx-4">·</span>
                    )}
                  </motion.span>
                ))}
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
