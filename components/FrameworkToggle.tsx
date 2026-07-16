"use client";

import type { KeyboardEvent } from "react";
import { type FrameworkView } from "@/lib/framework";
import styles from "./FrameworkToggle.module.css";

type FrameworkToggleProps = {
  view: FrameworkView;
  onChange: (view: FrameworkView) => void;
};

const OPTIONS: { value: FrameworkView; long: string; short: string }[] = [
  { value: "patterns", long: "Watch for — The Patterns", short: "Patterns" },
  { value: "practices", long: "Aim for — The Practices", short: "Practices" },
];

export default function FrameworkToggle({
  view,
  onChange,
}: FrameworkToggleProps) {
  function select(next: FrameworkView) {
    if (next === view) return;
    onChange(next);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = OPTIONS.findIndex((o) => o.value === view);
    if (index < 0) return;

    let nextIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % OPTIONS.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + OPTIONS.length) % OPTIONS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = OPTIONS.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    select(OPTIONS[nextIndex].value);
    const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>(
      '[role="radio"]',
    );
    buttons[nextIndex]?.focus();
  }

  return (
    <div
      className={styles.toggle}
      role="radiogroup"
      aria-label="Framework map face"
      onKeyDown={onKeyDown}
    >
      {OPTIONS.map((option) => {
        const checked = view === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            className={`${styles.option} mono`}
            data-active={checked || undefined}
            onClick={() => select(option.value)}
          >
            <span className={styles.labelLong}>{option.long}</span>
            <span className={styles.labelShort}>{option.short}</span>
          </button>
        );
      })}
    </div>
  );
}
