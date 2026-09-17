export const about = {
  metadataTitle: "About",
  metadataDescription:
    "Dan Davidson runs Technical Trust — a Sales Engineering practice and media platform for clearer technical conversations.",
  kicker: "ABOUT",
  headline: "Who runs the practice.",
  lede: "Dan Davidson builds Technical Trust from software engineering, technical consulting, and customer-facing work. The writing names the failures. The Lab practices the moves. Studio turns that practice into client work.",
  background: {
    heading: "Background — not Lab projects",
    intro:
      "This is career context for the practice. It is not a Lab evidence log. Lab projects are labeled client, portfolio, or simulated and live on /lab when they exist.",
    entries: [
      {
        period: "2025 — Present",
        org: "Shopification Studio",
        role: "Customer-facing engineering",
        detail:
          "Shipped and supported apps inside the Shopify ecosystem — platform APIs, merchant needs, and partner review as daily translation work.",
      },
      {
        period: "2023 — 2025",
        org: "Omni Federal",
        role: "Frontend engineer, customer-facing learning platform",
        detail:
          "Sat between federal customers and engineering to scope integrations, unblock technical evaluations, and keep delivery honest.",
      },
      {
        period: "2014 — 2023",
        org: "Pluralsight",
        role: "Solutions and enablement",
        detail:
          "Built technical content and tooling that helped enterprise teams adopt the platform after the sale closed.",
      },
    ],
  },
  selectedWork: {
    heading: "Selected work",
    intro:
      "Engineering and enablement background. These are not Lab artifacts and are not Studio case studies.",
    items: [
      {
        name: "Custom Shopify Apps",
        detail:
          "Merchant-facing Shopify apps in TypeScript — Inventory Oracle, Cart Companion, and Shopification SEO — from product design through API architecture and UX.",
      },
      {
        name: "Pluralsight Enablement Tools",
        detail:
          "Automation that simplified building learning plans for enterprise customers — productized enablement after the sale.",
      },
      {
        name: "UtahDirect",
        detail:
          "A civic services directory built with a school district program — stakeholder work plus full-stack delivery.",
      },
      {
        name: "DietAgent",
        detail:
          "An AI health-tracking integration on Model Context Protocol — TypeScript backend and native iOS client.",
      },
    ],
  },
  contact: {
    heading: "Talk about the work",
    lede: "Studio conversations start from the Demo Sprint. Learn conversations start from the newsletter. Resume is available if you need the longer record.",
    studioCta: { href: "/studio", label: "Work with Studio" },
    learnCta: { href: "/learn", label: "Learn the discipline" },
    resumeLabel: "View resume",
  },
} as const;
