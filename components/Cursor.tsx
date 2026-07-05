"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 550, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 550, damping: 40, mass: 0.6 });
  const hidden = useRef(true);

  useEffect(() => {
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!hasPointer || prefersReducedMotion) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-custom");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (hidden.current) {
        hidden.current = false;
      }
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>(
        "a, button, [data-cursor-label]",
      );
      if (el) {
        setHoverLabel(el.dataset.cursorLabel ?? defaultLabel(el));
      } else {
        setHoverLabel(null);
      }
    };
    const onLeave = () => {
      hidden.current = true;
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("cursor-custom");
    };
  }, [x, y]);

  if (!enabled) return null;

  const hovering = hoverLabel !== null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] flex items-center justify-center rounded-full text-bg"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: hovering ? 56 : 8,
        height: hovering ? 56 : 8,
        backgroundColor: "var(--color-bone)",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 35 }}
    >
      {hovering && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, delay: 0.05 }}
          className="font-mono text-[9px] uppercase tracking-[0.14em]"
        >
          {hoverLabel}
        </motion.span>
      )}
    </motion.div>
  );
}

function defaultLabel(el: HTMLElement): string {
  if (el.tagName === "A") {
    const href = el.getAttribute("href") ?? "";
    if (href.startsWith("mailto:")) return "Email";
    if (href.startsWith("http")) return "Open";
    return "Visit";
  }
  if (el.tagName === "BUTTON") return "Click";
  return "View";
}
