"use client";

import { motion } from "framer-motion";
import styles from "./Home.module.css";

const segmentPath =
  "M138 30a98 98 0 0 1 88 88l-32 5a66 66 0 0 0-60-61z";

const segments = [
  {
    id: "competence",
    label: "Competence",
    color: "#f0a11f",
    rotation: 0,
  },
  {
    id: "comprehension",
    label: "Comprehension",
    color: "#e4ebf1",
    rotation: 90,
  },
  {
    id: "candor",
    label: "Candor",
    color: "#b8791c",
    rotation: 180,
  },
  {
    id: "consistency",
    label: "Consistency",
    color: "#96a6b6",
    rotation: 270,
  },
] as const;

const cells = [
  { x: 101, y: 101, color: "#f0a11f" },
  { x: 133, y: 101, color: "#d9e2ea" },
  { x: 101, y: 133, color: "#d9e2ea" },
  { x: 133, y: 133, color: "#f0a11f" },
] as const;

export default function PrecisionCycleHeroMark({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <div className={styles.cycleStage} aria-hidden="true">
      <div className={styles.cycleGrid} />
      <div className={styles.cycleGlow} />

      <motion.svg
        className={styles.cycleSvg}
        viewBox="0 0 256 256"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        <circle
          cx="128"
          cy="128"
          r="115"
          fill="none"
          stroke="rgba(150, 166, 182, 0.16)"
          strokeWidth="1"
        />
        <circle
          cx="128"
          cy="128"
          r="80"
          fill="none"
          stroke="rgba(228, 235, 241, 0.1)"
          strokeWidth="1"
        />
        <path
          d="M128 9v38M247 128h-38M128 247v-38M9 128h38"
          fill="none"
          stroke="rgba(150, 166, 182, 0.14)"
          strokeWidth="1"
          strokeDasharray="2 5"
        />

        <motion.circle
          cx="128"
          cy="128"
          r="115"
          fill="none"
          stroke="rgba(240, 161, 31, 0.5)"
          strokeWidth="1.5"
          strokeDasharray="2 18"
          style={{ transformOrigin: "128px 128px" }}
          animate={reducedMotion ? undefined : { rotate: 360 }}
          transition={
            reducedMotion
              ? undefined
              : { duration: 36, ease: "linear", repeat: Infinity }
          }
        />
        <motion.circle
          cx="128"
          cy="128"
          r="105"
          fill="none"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="2"
          strokeDasharray="18 642"
          strokeLinecap="square"
          style={{ transformOrigin: "128px 128px" }}
          animate={reducedMotion ? undefined : { rotate: 360 }}
          transition={
            reducedMotion
              ? undefined
              : { duration: 8, ease: "linear", repeat: Infinity, delay: 1.4 }
          }
        />

        {segments.map((segment, index) => (
          <g
            key={segment.id}
            transform={`rotate(${segment.rotation} 128 128)`}
          >
            <motion.g
              style={{
                transformBox: "view-box",
                transformOrigin: "128px 128px",
              }}
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, scale: 0.78, x: 18, y: -18 }
              }
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.28 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.path
                d={segmentPath}
                fill={segment.color}
                animate={
                  reducedMotion
                    ? undefined
                    : { opacity: [1, 1, 0.68, 1, 1] }
                }
                transition={
                  reducedMotion
                    ? undefined
                    : {
                        duration: 5.8,
                        delay: 1.6 + index * 0.42,
                        times: [0, 0.32, 0.43, 0.54, 1],
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              />
            </motion.g>
          </g>
        ))}

        {cells.map((cell, index) => (
          <motion.rect
            key={`${cell.x}-${cell.y}`}
            x={cell.x}
            y={cell.y}
            width="22"
            height="22"
            rx="2"
            fill={cell.color}
            style={{ transformOrigin: `${cell.x + 11}px ${cell.y + 11}px` }}
            initial={reducedMotion ? false : { opacity: 0, scale: 0, rotate: 45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.92 + index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </motion.svg>

      {segments.map((segment, index) => (
        <motion.span
          key={segment.id}
          className={`${styles.pillarLabel} ${styles[segment.id]}`}
          initial={reducedMotion ? false : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.15 + index * 0.08 }}
        >
          <i style={{ backgroundColor: segment.color }} />
          {segment.label}
        </motion.span>
      ))}
    </div>
  );
}
