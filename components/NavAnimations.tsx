"use client";

import { useLayoutEffect } from "react";
import { gsap, prefersReducedMotion, registerMotion } from "@/lib/motion";

export default function NavAnimations() {
  useLayoutEffect(() => {
    registerMotion();
    if (prefersReducedMotion()) return;

    const nav = document.querySelector("[data-nav]");
    if (!nav) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-nav-brand]", {
        y: -16,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
      });

      gsap.from("[data-nav-link]", {
        y: -12,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        delay: 0.12,
        ease: "power3.out",
      });
    }, nav);

    return () => ctx.revert();
  }, []);

  return null;
}
