"use client";

import { motion, useReducedMotion } from "framer-motion";
import { generateSystemsMap } from "@/lib/systems-map";

export default function SystemsMap() {
  const reducedMotion = useReducedMotion();
  const { nodes, edges } = generateSystemsMap();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 1360 900"
        preserveAspectRatio="xMidYMid slice"
        className="opacity-[0.08]"
        animate={reducedMotion ? undefined : { x: [0, 12, -8, 0], y: [0, -10, 6, 0] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: 72, ease: "linear", repeat: Infinity }
        }
      >
        {edges.map((edge, i) => (
          <line
            key={i}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            stroke="#64748b"
            strokeWidth={1}
          />
        ))}
        {nodes.map((node, i) => (
          <circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={node.accent ? "#f59e0b" : "#475569"}
          />
        ))}
      </motion.svg>
    </div>
  );
}
