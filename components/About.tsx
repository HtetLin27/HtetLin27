"use client";

import { motion } from "motion/react";
import { Mark } from "./Mark";

const PARAGRAPHS = [
  "I am a full-stack engineer who works across the frontend, backend, database, API, and user interface. Before software, I worked as a network engineer at Frontiir. That experience taught me how to troubleshoot systems, understand where problems happen, and improve reliability. I still use that mindset today when I build and debug web applications.",
  "I am currently a senior frontend engineer at Better HR, where I work on a multi-tenant HR SaaS platform used by companies across multiple countries. I have built and improved features for payroll, recruitment, performance appraisal, customer management, job platforms, and marketing websites. As a junior developer, I built the applicant tracking system from scratch. Now, I am working on the migration from a legacy Vue/Nuxt app to a modern React, TypeScript, and Vite application, with clients actively using the platform.",
  "Outside of work, I build full-stack projects from start to finish. I design the database, write backend APIs, handle authentication and permissions, and build the user interface. These projects help me grow beyond my daily work and improve my skills with Node.js, Express.js, PostgreSQL, Supabase, Socket.IO, and AI integrations. My goal is to build clean, useful, and reliable software that real people can depend on.",
];

export function About() {
  return (
    <section
      id="about"
      className="relative w-full px-6 py-40 sm:py-48 md:px-12"
    >
      <div className="mx-auto mb-16 max-w-6xl font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:mb-24">
        01 · About
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-24">
        <div className="flex flex-col items-start gap-6">
          <Mark
            className="h-[min(60vw,320px)] w-[min(60vw,320px)] text-bone"
            animate={false}
          />
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            HTET LIN KO / 2026 —
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {PARAGRAPHS.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-sans text-lg leading-relaxed text-bone/90 sm:text-xl"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
