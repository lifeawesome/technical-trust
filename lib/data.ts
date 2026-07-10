export const CONTACT_EMAIL = "dan.davidson@gmail.com";
export const RESUME_HREF = "/dan-davidson-resume.pdf";

export const keywords = [
  "Enterprise Solutions",
  "SaaS",
  "Cloud Architecture",
  "APIs",
  "Customer Enablement",
];

export const floatCards = [
  {
    label: "Discovery",
    sub: "Ask, listen, scope",
    icon: "🔍",
    position: { top: "4%", left: "var(--float-offset)" },
    duration: "6s",
  },
  {
    label: "Architecture",
    sub: "Design the system",
    icon: "◧",
    position: { top: "22%", right: "var(--float-offset-wide)" },
    duration: "7s",
  },
  {
    label: "Adoption",
    sub: "Get teams live",
    icon: "↗",
    position: { bottom: "20%", left: "var(--float-offset-wide)" },
    duration: "6.5s",
  },
  {
    label: "Trust",
    sub: "Earned, not sold",
    icon: "✓",
    position: { bottom: "4%", right: "var(--float-offset)" },
    duration: "7.5s",
  },
];

export const pillars = [
  {
    mark: "01",
    title: "Build technical trust",
    body: "I earn credibility with skeptical engineers and executives alike by being straight about tradeoffs, not just selling the roadmap.",
  },
  {
    mark: "02",
    title: "Translate business into systems",
    body: "I turn vague business goals into concrete technical plans — and turn technical constraints back into business language leadership can act on.",
  },
  {
    mark: "03",
    title: "Help teams adopt complex tech",
    body: "Shipping the platform is half the job. I get real people using it, confidently, without a six-month change-management slog.",
  },
];

export const quadrants = [
  {
    tag: "ENTERPRISE",
    title: "Enterprise Sales Engineer",
    body: "De-risking the deal — proving the platform works for this customer, this stack, this timeline.",
  },
  {
    tag: "ARCHITECTURE",
    title: "Solutions Architect",
    body: "Designing the system that actually fits — integration points, scale limits, and failure modes included.",
  },
  {
    tag: "SUCCESS OPS",
    title: "Customer Success Ops",
    body: "Building the operational backbone that turns a signed contract into a renewed, expanding account.",
  },
  {
    tag: "ENABLEMENT",
    title: "Developer Enablement",
    body: "Writing the docs, demos, and guardrails that let other engineers move fast without breaking things.",
  },
];

export const timeline = [
  {
    period: "2025 — Present",
    org: "Shopification Studio",
    role: "Customer-Facing Engineer",
    detail:
      "Shipped and supported apps inside the Shopify ecosystem — first-hand experience with platform APIs, merchant needs, and partner review.",
  },
  {
    period: "2023 — 2025",
    org: "Omni Federal",
    role: "Frontend Engineer for a Customer-Facing E-Learning Platform",
    detail:
      "Sat between federal customers and engineering to scope integrations, unblock technical evaluations, and keep delivery honest.",
  },
  {
    period: "2014 — 2023",
    org: "Pluralsight",
    role: "Solutions & Enablement",
    detail:
      "Built the technical content and tooling that helped enterprise teams actually adopt the platform after the sale closed.",
  },
];

export const projects = [
  {
    name: "Shopification Studio",
    image: "/featured/shopification.png",
    proves: "Proves I can ship inside a platform ecosystem.",
    desc: "A toolkit for merchants migrating storefronts onto Shopify without losing custom logic.",
    stack: ["Shopify API", "React", "Liquid"],
  },
  {
    name: "Inventory Oracle",
    image: "/featured/inventory-oracle.png",
    proves: "Proves I can model a solution for a messy operational reality.",
    desc: "Forecasting tool that reconciles multi-warehouse inventory against demand signals.",
    stack: ["Python", "Postgres", "Forecasting"],
  },
  {
    name: "UtahDirect",
    image: "/featured/utah-direct.png",
    proves: "Proves I can navigate regulated, high-stakes systems.",
    desc: "A civic services directory built for accuracy and accessibility under real constraints.",
    stack: ["Next.js", "Accessibility", "GIS"],
  },
  {
    name: "DietAgent",
    image: "/featured/diet-agent.png",
    proves: "Proves I can design for trust in an AI-assisted workflow.",
    desc: "An AI nutrition planner that shows its reasoning instead of just handing down answers.",
    stack: ["LLM APIs", "TypeScript", "UX"],
  },
];
