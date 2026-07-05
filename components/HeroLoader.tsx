"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const VISIT_KEY = "hlk-visited";

export function HeroLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const visited = sessionStorage.getItem(VISIT_KEY);
    if (visited) return;
    setShow(true);
    sessionStorage.setItem(VISIT_KEY, "1");
    const t = setTimeout(() => setShow(false), 1300);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-[90] h-[2px] w-full origin-left bg-bone"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            scaleX: { duration: 1, ease: [0.65, 0, 0.35, 1] },
            opacity: { duration: 0.3, ease: "easeOut" },
          }}
        />
      )}
    </AnimatePresence>
  );
}
