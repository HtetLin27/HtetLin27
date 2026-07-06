"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { PROJECTS } from "@/content/projects";

const SECTIONS = [
  { number: "01", name: "About", href: "/#about" },
  { number: "02", name: "Experience", href: "/#experience" },
  { number: "03", name: "Work", href: "/#work" },
  { number: "04", name: "System", href: "/#system" },
  { number: "05", name: "Credentials", href: "/#credentials" },
  { number: "06", name: "Contact", href: "/#contact" },
];

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, transition: { duration: 0.28 } },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Menu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  const close = () => {
    document.documentElement.style.overflow = "";
    setOpen(false);
  };

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const [route, hash] = href.split("#");
    const targetPath = route || "/";
    close();
    if (pathname === targetPath && hash) {
      e.preventDefault();
      setTimeout(() => {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-cursor-label={open ? "Close" : "Menu"}
        aria-label={open ? "Close menu" : "Open menu"}
        className="fixed top-6 right-6 z-50 font-mono text-[11px] uppercase tracking-[0.14em] text-bone transition-colors hover:text-bone/70"
      >
        {open ? (
          <>
            Close <span className="text-muted">×</span>
          </>
        ) : (
          <>
            Menu <span className="text-muted">↗</span>
          </>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-bg"
            data-lenis-prevent
          >
            <motion.nav
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="flex h-full w-full flex-col justify-between overflow-y-auto px-6 pt-24 pb-16 md:px-12 md:pt-32 md:pb-20"
            >
              <ul className="flex flex-col gap-1 sm:gap-2">
                {SECTIONS.map((s) => (
                  <motion.li key={s.href} variants={itemVariants}>
                    <Link
                      href={s.href}
                      onClick={(e) => handleSectionClick(e, s.href)}
                      className="group inline-flex items-baseline gap-6"
                      data-cursor-label={s.name}
                    >
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                        {s.number}
                      </span>
                      <span className="relative font-serif text-5xl leading-[0.95] text-bone sm:text-6xl md:text-7xl lg:text-8xl">
                        {s.name}
                        <span
                          aria-hidden
                          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-bone transition-transform duration-500 ease-out group-hover:scale-x-100"
                        />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-16 flex flex-col gap-12 sm:mt-24 md:flex-row md:justify-between md:gap-24">
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col gap-4"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    Case studies
                  </span>
                  <ul className="flex flex-col gap-2">
                    {PROJECTS.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/work/${p.slug}`}
                          onClick={close}
                          data-cursor-label={`${p.number} · ${p.name}`}
                          className="group inline-flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-bone/85"
                        >
                          <span className="text-muted">{p.number}</span>
                          <span className="relative">
                            {p.name}
                            <span
                              aria-hidden
                              className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-bone transition-transform duration-500 ease-out group-hover:scale-x-100"
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col gap-4"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    Elsewhere
                  </span>
                  <ul className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-bone/85">
                    <li>
                      <a
                        href="mailto:htetlinko.dev@gmail.com"
                        onClick={close}
                        data-cursor-label="Email"
                        className="group relative inline-block"
                      >
                        <span>Email</span>
                        <span
                          aria-hidden
                          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-bone transition-transform duration-500 ease-out group-hover:scale-x-100"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/HtetLin27"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-label="GitHub"
                        className="group relative inline-block"
                      >
                        <span>
                          GitHub <span className="text-muted">↗</span>
                        </span>
                        <span
                          aria-hidden
                          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-bone transition-transform duration-500 ease-out group-hover:scale-x-100"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/in/htet-lin-ko-411b02204"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-label="LinkedIn"
                        className="group relative inline-block"
                      >
                        <span>
                          LinkedIn <span className="text-muted">↗</span>
                        </span>
                        <span
                          aria-hidden
                          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-bone transition-transform duration-500 ease-out group-hover:scale-x-100"
                        />
                      </a>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
