export const SITE_URL = "https://technicaltrust.org";

export const CONTACT_EMAIL = "dan.davidson@gmail.com";
export const LINKEDIN_URL = "https://linkedin.com/in/dandd";
export const RESUME_HREF = "/dan-davidson-resume.pdf";

export const comingSoon = {
  metadata: {
    title: "Technical Trust",
    description:
      "A field resource for people making high-stakes technology decisions — vendor evaluations, demo scrutiny, migrations, and build-vs-buy. Launching soon.",
  },
  eyebrow: "TECHNICAL TRUST — A FIELD RESOURCE",
  headline:
    "Most people making technology decisions can't fully understand the systems they're betting on.",
  subhead:
    "Technical Trust is a resource for exactly that moment — guides on evaluating vendors, sitting through demos, planning migrations, and making confident decisions about complex systems. Written by a practitioner, free to read, launching soon.",
  whatsComing: [
    {
      title: "The Guide to Technical Trust",
      description:
        "The core framework: Competence, Comprehension, Candor, Consistency",
      icon: "compass",
    },
    {
      title: "Field Guides",
      description:
        "Practical playbooks for specific decisions: vendor evaluations, demo scrutiny, build-vs-buy",
      icon: "map",
    },
    {
      title: "The Trust Audit",
      description: "A diagnostic for teams and buyers (coming later)",
      icon: "audit",
    },
  ],
  email: {
    label: "Get chapters as they publish",
    placeholder: "you@company.com",
    button: "Subscribe",
    disclaimer: "No spam, unsubscribe anytime.",
    success: "You're on the list. We'll send chapters as they publish.",
    error: "Something went wrong. Please try again.",
  },
  footer: {
    prefix: "Written by",
    name: "Dan Davidson",
    aboutHref: "/about",
  },
} as const;

export const about = {
  metadata: {
    title: "Dan Davidson — I Build Technical Trust",
    description:
      "Customer-facing engineer with 26 years of experience. I help teams understand complex systems, make confident decisions, and turn software into business outcomes.",
  },
  hero: {
    eyebrow: "DAN DAVIDSON",
    headline: "I build technical trust.",
    subhead:
      "I help teams understand complex systems, make confident decisions, and turn software into business outcomes. Technical Trust is where I write about how.",
    keywords: [
      "Enterprise Solutions",
      "SaaS Platforms",
      "Cloud Architecture",
      "APIs",
      "Observability",
      "Customer Enablement",
    ],
    floatCards: [
      { label: "Discovery", sub: "Ask, listen, scope" },
      { label: "Architecture", sub: "Design the system" },
      { label: "Adoption", sub: "Get teams live" },
      { label: "Trust", sub: "Earned, not sold" },
    ],
  },
  whatIDo: {
    eyebrow: "WHAT I DO",
    heading: "Three things I bring to every room",
    pillars: [
      {
        title: "Build technical trust",
        body: "I'm the person in the room who makes the complex system make sense — to engineers, to buyers, to executives who have to sign off on things they can't inspect themselves.",
      },
      {
        title: "Translate business problems into systems",
        body: "Twenty-six years across full-stack engineering, team leadership, and customer-facing work. I design solutions backward from the business outcome, not forward from the tech.",
      },
      {
        title: "Drive real adoption",
        body: 'Software only creates value when people actually use it. I specialize in the gap between "deployed" and "adopted" — enablement, documentation, and the unglamorous work of making technology stick.',
      },
    ],
  },
  compass: {
    eyebrow: "HOW I PLUG IN",
    heading: "Four ways I plug in",
    intro:
      "I work at the intersection of engineering depth and human clarity. That maps to four roles:",
    quadrants: [
      {
        tag: "ENTERPRISE",
        title: "Enterprise Sales Engineer",
        body: "Demos that build confidence instead of performing features. Discovery that surfaces the real problem.",
      },
      {
        tag: "ARCHITECTURE",
        title: "Solutions Architect",
        body: "Designs that honor constraints, with candor about tradeoffs before they're discovered the hard way.",
      },
      {
        tag: "SUCCESS",
        title: "Customer Success / Post-Sales",
        body: "Owning the adoption curve: onboarding, enablement, and turning signed contracts into successful customers.",
      },
      {
        tag: "ENABLEMENT",
        title: "Developer Enablement",
        body: "Docs, examples, and teaching that treat developer time as sacred.",
      },
    ],
  },
  proof: {
    eyebrow: "PROOF",
    heading: "Where this has played out",
    entries: [
      {
        org: "Omni Federal",
        role: "Senior Frontend Engineer",
        detail:
          "Built and shipped frontend systems in a federal environment where trust, security posture, and stakeholder communication are non-negotiable.",
        todo:
          "TODO: Dan — add one specific shipped outcome",
      },
      {
        org: "Pluralsight",
        role: "Engineering Team Lead (contract)",
        detail:
          "Led a contracted engineering team inside a technology-learning company — a decade of my career has been spent helping technologists learn complex things.",
        todo: "TODO: Dan — one metric or shipped product",
      },
      {
        org: "Shopification Studio",
        role: "Founder",
        detail:
          "Run a Shopify development studio serving merchants: scoping, building, and supporting production commerce systems for non-technical business owners — technical translation as a daily practice.",
      },
    ],
    platformTodo:
      "TODO: Dan to add verified platform-specific experience here",
  },
  projects: {
    eyebrow: "SELECTED PROJECTS",
    heading: "Things I've built to prove the point",
    items: [
      {
        name: "Inventory Oracle",
        proves:
          "A Shopify app built end-to-end: product design, API architecture, merchant-facing UX.",
        stack: ["Shopify API", "Node", "React"],
      },
      {
        name: "Shopification Studio — Launch Assist",
        proves:
          "A guided store-launch program: productized enablement for first-time founders.",
        stack: ["Enablement", "Next.js", "Stripe"],
      },
      {
        name: "UtahDirect",
        proves:
          "A local business directory built in collaboration with a school district program — community stakeholder work plus full-stack delivery.",
        stack: ["Next.js", "Supabase", "Tailwind"],
      },
      {
        name: "DietAgent",
        proves:
          "An AI health-tracking integration built on Model Context Protocol — current, hands-on work with the emerging AI tooling stack.",
        stack: ["MCP", "AI Integration", "APIs"],
      },
    ],
  },
  contact: {
    heading:
      "Let's talk about technical trust, customer adoption, or systems that scale.",
    line: "I'm currently exploring Sales Engineering, Solutions Architecture, and customer-facing engineering roles.",
    homeLink: {
      label: "Read what I'm building at Technical Trust",
      href: "/",
    },
  },
} as const;
