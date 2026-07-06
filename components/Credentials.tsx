"use client";

import { motion } from "motion/react";

type Credential = {
  issuer: string;
  name: string;
  verifyHref?: string;
};

const CREDENTIALS: Credential[] = [
  {
    issuer: "Anthropic",
    name: "Claude 101",
    verifyHref: "https://verify.skilljar.com/c/qofoukq9isre",
  },
  {
    issuer: "Anthropic",
    name: "Claude Code 101",
    verifyHref: "https://verify.skilljar.com/c/fvxd7z36pdvf",
  },
  {
    issuer: "Meta / Coursera",
    name: "Front-End Developer Professional Certificate",
  },
  {
    issuer: "Harvard",
    name: "CS50x — Introduction to Computer Science",
  },
  {
    issuer: "Cisco",
    name: "Routing and Switching",
  },
];

export function Credentials() {
  return (
    <section
      id="credentials"
      className="relative w-full px-6 py-40 sm:py-48 md:px-12"
    >
      <div className="mx-auto mb-16 max-w-6xl font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:mb-24">
        05 · Credentials
      </div>
      <div className="mx-auto max-w-6xl">
        <ul className="flex flex-col divide-y divide-muted/20 border-y border-muted/20 font-mono text-sm uppercase tracking-[0.14em]">
          {CREDENTIALS.map((c, i) => (
            <motion.li
              key={c.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="grid grid-cols-1 gap-1 py-6 sm:grid-cols-[minmax(0,240px)_minmax(0,1fr)_auto] sm:items-baseline sm:gap-12"
            >
              <span className="text-muted">{c.issuer}</span>
              <span className="text-bone/90">{c.name}</span>
              {c.verifyHref ? (
                <a
                  href={c.verifyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="Verify"
                  className="group/verify relative inline-block justify-self-start text-bone/90 sm:justify-self-end"
                >
                  <span className="relative z-10">
                    Verify <span className="text-muted">↗</span>
                  </span>
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-bone transition-transform duration-500 ease-out group-hover/verify:scale-x-100"
                  />
                </a>
              ) : (
                <span aria-hidden className="hidden sm:block" />
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
