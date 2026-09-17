"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import ThemeToggle from "@/components/theme/ThemeToggle";
import styles from "./PublicationNav.module.css";

export type PublicationNavActive =
  | "learn"
  | "lab"
  | "studio"
  | "about"
  | "essays"
  | "newsletter"
  | "manifesto"
  | "framework"
  | "patterns"
  | "diagnostic";

type PublicationNavProps = {
  activeNav?: PublicationNavActive;
};

const LEARN_LINKS = [
  { href: "/learn", label: "The discipline", id: "learn" as const },
  { href: "/newsletter", label: "Newsletter", id: "newsletter" as const },
  { href: "/framework", label: "Framework", id: "framework" as const },
  { href: "/essays", label: "Essays", id: "essays" as const },
];

const LEARN_ACTIVE: PublicationNavActive[] = [
  "learn",
  "essays",
  "newsletter",
  "manifesto",
  "framework",
  "patterns",
  "diagnostic",
];

function isLearnActive(activeNav?: PublicationNavActive) {
  return activeNav !== undefined && LEARN_ACTIVE.includes(activeNav);
}

export default function PublicationNav({ activeNav }: PublicationNavProps) {
  const pathname = usePathname();
  const resolvedActive =
    activeNav ??
    (pathname === "/about"
      ? "about"
      : pathname === "/lab"
        ? "lab"
        : pathname === "/studio"
          ? "studio"
          : pathname === "/learn"
            ? "learn"
            : undefined);
  const learnActive = isLearnActive(resolvedActive);
  const labActive = resolvedActive === "lab";
  const studioActive = resolvedActive === "studio";
  const aboutActive = resolvedActive === "about";

  const [open, setOpen] = useState(false);
  const drawerId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!open) {
      if (wasOpenRef.current) {
        menuButtonRef.current?.focus();
      }
      wasOpenRef.current = false;
      return;
    }

    wasOpenRef.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  function onDrawerKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  }

  return (
    <>
      <nav className={styles.desktopNav} aria-label="Site">
        <div className={styles.navGroup}>
          <button
            type="button"
            className={styles.navParent}
            data-active={learnActive || undefined}
            aria-haspopup="true"
          >
            Learn
          </button>
          <ul className={styles.submenu} aria-label="Learn">
            {LEARN_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-active={resolvedActive === item.id || undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/lab"
          className={styles.topLink}
          data-active={labActive || undefined}
        >
          Lab
        </Link>
        <Link
          href="/studio"
          className={styles.topLink}
          data-active={studioActive || undefined}
        >
          Studio
        </Link>
        <Link
          href="/about"
          className={styles.topLink}
          data-active={aboutActive || undefined}
        >
          About
        </Link>
      </nav>

      <button
        ref={menuButtonRef}
        type="button"
        className={styles.menuButton}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={drawerId}
        onClick={() => setOpen((value) => !value)}
      >
        <span
          className={styles.menuIcon}
          data-open={open || undefined}
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
        </span>
      </button>

      <div
        className={styles.backdrop}
        data-open={open || undefined}
        onClick={close}
        aria-hidden="true"
      />

      <div
        ref={drawerRef}
        id={drawerId}
        className={styles.drawer}
        data-open={open || undefined}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        onKeyDown={onDrawerKeyDown}
        {...(!open ? { inert: true } : {})}
      >
        <div className={styles.drawerHeader}>
          <p className={`${styles.drawerTitle} mono`}>Menu</p>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            aria-label="Close menu"
            onClick={close}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <nav className={styles.drawerNav} aria-label="Site">
          <section
            className={styles.drawerSection}
            aria-labelledby="drawer-learn"
          >
            <h2 id="drawer-learn" className={`${styles.sectionLabel} mono`}>
              Learn
            </h2>
            <ul className={styles.drawerList}>
              {LEARN_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-active={resolvedActive === item.id || undefined}
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className={styles.drawerAbout}>
            <Link
              href="/lab"
              data-active={labActive || undefined}
              onClick={close}
            >
              Lab
            </Link>
            <Link
              href="/studio"
              data-active={studioActive || undefined}
              onClick={close}
            >
              Studio
            </Link>
            <Link
              href="/about"
              data-active={aboutActive || undefined}
              onClick={close}
            >
              About
            </Link>
          </div>
          <div className={styles.drawerTheme}>
            <ThemeToggle showLabel />
          </div>
        </nav>
      </div>
    </>
  );
}
