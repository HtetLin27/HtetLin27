"use client";

import { motion } from "motion/react";

type HeroNameProps = {
  text: string;
  delay?: number;
  className?: string;
};

const NBSP = " ";

export function HeroName({
  text,
  delay = 0,
  className = "",
}: HeroNameProps) {
  const chars = Array.from(text);

  return (
    <h1
      aria-label={text}
      className={`font-serif leading-[0.9] tracking-tight ${className}`}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === " " ? NBSP : char}
        </motion.span>
      ))}
    </h1>
  );
}
