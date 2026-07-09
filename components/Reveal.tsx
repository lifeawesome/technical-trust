"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion, registerMotion } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

export default function Reveal({ children, className, stagger = 0.1 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    registerMotion();
    if (prefersReducedMotion()) {
      gsap.set(root, { clearProps: "all" });
      gsap.set(root.querySelectorAll("[data-reveal-child]"), { clearProps: "all" });
      return;
    }

    const intro = root.querySelector("[data-reveal-intro]");
    const items = Array.from(root.querySelectorAll("[data-reveal-child]")).filter(
      (el) => el.closest("[data-reveal]") === root,
    );

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      if (intro) {
        tl.from(intro, { y: 28, opacity: 0, duration: 0.7 });
      }

      if (items.length) {
        tl.from(
          items,
          {
            y: 32,
            opacity: 0,
            duration: 0.65,
            stagger,
          },
          intro ? "-=0.35" : 0,
        );
      } else if (!intro) {
        tl.from(root, { y: 28, opacity: 0, duration: 0.7 });
      }
    }, root);

    return () => ctx.revert();
  }, [stagger]);

  return (
    <div ref={ref} className={className} data-reveal>
      {children}
    </div>
  );
}
