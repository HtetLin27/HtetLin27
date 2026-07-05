"use client";

import { motion } from "motion/react";

type MarkProps = {
  className?: string;
  strokeWidth?: number;
  drawDelay?: number;
  drawDuration?: number;
  animate?: boolean;
};

const NODES = [
  { id: "a", cx: 44, cy: 52 },
  { id: "b", cx: 168, cy: 80 },
  { id: "c", cx: 92, cy: 168 },
  { id: "d", cx: 128, cy: 40 },
] as const;

const EDGES = [
  { id: "a-b", from: "a", to: "b" },
  { id: "a-c", from: "a", to: "c" },
  { id: "b-c", from: "b", to: "c" },
  { id: "b-d", from: "b", to: "d" },
] as const;

function nodeById(id: string) {
  const n = NODES.find((n) => n.id === id);
  if (!n) throw new Error(`Unknown node: ${id}`);
  return n;
}

export function Mark({
  className,
  strokeWidth = 1.5,
  drawDelay = 0,
  drawDuration = 1.0,
  animate = true,
}: MarkProps) {
  const perEdge = drawDuration / EDGES.length;

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Htet Lin Ko"
    >
      <g data-mark-edges strokeWidth={strokeWidth}>
        {EDGES.map((edge, i) => {
          const from = nodeById(edge.from);
          const to = nodeById(edge.to);
          const d = `M ${from.cx} ${from.cy} L ${to.cx} ${to.cy}`;
          return (
            <motion.path
              key={edge.id}
              data-mark-edge={edge.id}
              d={d}
              initial={animate ? { pathLength: 0 } : false}
              animate={animate ? { pathLength: 1 } : undefined}
              transition={{
                duration: perEdge * 1.4,
                delay: drawDelay + i * perEdge * 0.7,
                ease: [0.65, 0, 0.35, 1],
              }}
            />
          );
        })}
      </g>
      <g data-mark-nodes fill="currentColor" stroke="none">
        {NODES.map((n, i) => (
          <motion.circle
            key={n.id}
            data-mark-node={n.id}
            cx={n.cx}
            cy={n.cy}
            r={n.id === "d" ? 2.5 : 3.5}
            initial={animate ? { opacity: 0, scale: 0 } : false}
            animate={animate ? { opacity: 1, scale: 1 } : undefined}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
            transition={{
              duration: 0.35,
              delay: drawDelay + drawDuration + i * 0.08,
              ease: "easeOut",
            }}
          />
        ))}
      </g>
    </svg>
  );
}
