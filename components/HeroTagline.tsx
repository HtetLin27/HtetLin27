"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

type HeroTaglineProps = {
  prefix: string;
  scramble: string;
  delay?: number;
  className?: string;
};

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

function useScramble(target: string, startAt: number) {
  const [display, setDisplay] = useState(target);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), startAt * 1000);
    return () => clearTimeout(startTimer);
  }, [startAt]);

  useEffect(() => {
    if (!started) {
      setDisplay(target.replace(/[^\s]/g, () => randomChar()));
      return;
    }
    const duration = 900;
    const startTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const revealed = Math.floor(t * target.length);
      const next = target
        .split("")
        .map((c, i) => {
          if (c === " " || c === "." || c === ",") return c;
          if (i < revealed) return c;
          return randomChar();
        })
        .join("");
      setDisplay(next);
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [started, target]);

  return display;
}

export function HeroTagline({
  prefix,
  scramble,
  delay = 0,
  className = "",
}: HeroTaglineProps) {
  const scrambled = useScramble(scramble, delay + 0.6);

  return (
    <p
      aria-label={`${prefix}${scramble}`}
      className={`font-sans ${className}`}
    >
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
      >
        {prefix}
      </motion.span>
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.4, ease: "easeOut" }}
        className="text-bone"
      >
        {scrambled}
      </motion.span>
    </p>
  );
}
