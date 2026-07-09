"use client";

import { useLayoutEffect } from "react";
import { gsap, prefersReducedMotion, registerMotion } from "@/lib/motion";

export default function HeroAnimations() {
  useLayoutEffect(() => {
    registerMotion();
    if (prefersReducedMotion()) return;

    const hero = document.querySelector("[data-hero]");
    if (!hero) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero-mesh]", { opacity: 0, duration: 1.2 })
        .from("[data-hero-badge]", { y: 18, opacity: 0, duration: 0.55 }, "-=0.8")
        .from("[data-hero-headline]", { y: 36, opacity: 0, duration: 0.75 }, "-=0.25")
        .from(
          "[data-hero-accent]",
          { scale: 0.92, opacity: 0, duration: 0.6, transformOrigin: "left center" },
          "-=0.45",
        )
        .from("[data-hero-subhead]", { y: 22, opacity: 0, duration: 0.6 }, "-=0.35")
        .from(
          "[data-hero-action]",
          { y: 16, opacity: 0, duration: 0.5, stagger: 0.1 },
          "-=0.25",
        )
        .from(
          "[data-hero-keyword]",
          { y: 10, opacity: 0, duration: 0.45, stagger: 0.06 },
          "-=0.2",
        )
        .from(
          "[data-hero-portrait]",
          { scale: 0.94, opacity: 0, duration: 0.85, ease: "power2.out" },
          "-=0.7",
        )
        .from(
          "[data-hero-card]",
          { scale: 0.85, opacity: 0, y: 14, duration: 0.55, stagger: 0.12, ease: "back.out(1.4)" },
          "-=0.5",
        );

      gsap.to("[data-hero-card]", {
        y: -8,
        duration: 2.8,
        ease: "sine.inOut",
        stagger: { each: 0.35, from: "random" },
        repeat: -1,
        yoyo: true,
        delay: 1.2,
      });

      gsap.to("[data-hero-mesh-node]", {
        opacity: 0.45,
        duration: 3.5,
        ease: "sine.inOut",
        stagger: { each: 0.2, from: "random" },
        repeat: -1,
        yoyo: true,
        delay: 0.8,
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return null;
}
