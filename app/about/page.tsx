import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhatIDo from "@/components/WhatIDo";
import Compass from "@/components/Compass";
import Proof from "@/components/Proof";
import Projects from "@/components/Projects";
import ContactCta from "@/components/ContactCta";

export const metadata: Metadata = {
  title: "Dan Davidson — Customer-Facing Engineer",
  description:
    "I help teams understand complex systems, make confident decisions, and turn software into business outcomes.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <Hero />
      <WhatIDo />
      <Compass />
      <Proof />
      <Projects />
      <ContactCta />
    </>
  );
}
