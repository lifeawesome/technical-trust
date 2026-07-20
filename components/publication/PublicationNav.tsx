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
import styles from "./PublicationNav.module.css";

export type PublicationNavActive =
  | "essays"
  | "newsletter"
  | "manifesto"
  | "framework"
  | "patterns";

type PublicationNavProps = {
  activeNav?: PublicationNavActive;
};

const FRAMEWORK_LINKS = [
  { href: "/framework", label: "Map", id: "framework" as const },
  { href: "/patterns", label: "Patterns", id: "patterns" as const },
];

const WRITING_LINKS = [
  { href: "/essays", label: "Essays", id: "essays" as const },
  { href: "/manifesto", label: "Manifesto", id: "manifesto" as const },
  { href: "/newsletter", label: "Newsletter", id: "newsletter" as const },
];

function isFrameworkActive(activeNav?: PublicationNavActive) {
  return activeNav === "framework" || activeNav === "patterns";
}

function isWritingActive(activeNav?: PublicationNavActive) {
  return (
    activeNav === "essays" ||
    activeNav === "manifesto" ||
    activeNav === "newsletter"
  );
}

export default function PublicationNav({ activeNav }: PublicationNavProps) {
  const pathname = usePathname();
  const aboutActive = pathname === "/about";
  const frameworkActive = isFrameworkActive(activeNav);
  const writingActive = isWritingActive(activeNav);

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
      <nav className={styles.desktopNav} aria-label="Publication">
        <div className={styles.navGroup}>
          <button
            type="button"
            className={styles.navParent}
            data-active={frameworkActive || undefined}
            aria-haspopup="true"
          >
            Framework
          </button>
          <ul className={styles.submenu} aria-label="Framework">
            {FRAMEWORK_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-active={activeNav === item.id || undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.navGroup}>
          <button
            type="button"
            className={styles.navParent}
            data-active={writingActive || undefined}
            aria-haspopup="true"
          >
            Writing
          </button>
          <ul className={styles.submenu} aria-label="Writing">
            {WRITING_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-active={activeNav === item.id || undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/about"
          className={styles.aboutLink}
          data-active={aboutActive || undefined}
        >
          About Dan
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
        aria-label="Publication menu"
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

        <nav className={styles.drawerNav} aria-label="Publication">
          <section
            className={styles.drawerSection}
            aria-labelledby="drawer-framework"
          >
            <h2 id="drawer-framework" className={`${styles.sectionLabel} mono`}>
              Framework
            </h2>
            <ul className={styles.drawerList}>
              {FRAMEWORK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-active={activeNav === item.id || undefined}
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section
            className={styles.drawerSection}
            aria-labelledby="drawer-writing"
          >
            <h2 id="drawer-writing" className={`${styles.sectionLabel} mono`}>
              Writing
            </h2>
            <ul className={styles.drawerList}>
              {WRITING_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-active={activeNav === item.id || undefined}
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
              href="/about"
              data-active={aboutActive || undefined}
              onClick={close}
            >
              About Dan
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
