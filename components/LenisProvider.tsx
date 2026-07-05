"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const timer = setTimeout(() => {
      // Force ScrollTrigger to recalculate pin spacers so target offsets are correct
      ScrollTrigger.refresh();
      requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        if (!el) return;
        if (lenisRef.current) {
          lenisRef.current.scrollTo(el, { offset: 0 });
        } else {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
