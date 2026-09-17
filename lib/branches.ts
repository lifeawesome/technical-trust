export type BranchId = "learn" | "lab" | "studio";

export interface Branch {
  id: BranchId;
  name: string;
  href: string;
  kicker: string;
  line: string;
  body: string;
  cta: string;
}

export const positioning = {
  short: "Clearer technical conversations. More trustworthy demos. Better buying decisions.",
  long: "Technical Trust is a Sales Engineering practice and media platform focused on helping technical professionals and B2B technology companies turn complex products into clear, credible customer conversations.",
  relationship:
    "Technical Trust helps technical professionals and B2B technology companies earn confidence through better Discovery conversations, demos, evaluations, and implementation conversations.",
} as const;

export const home = {
  hero: {
    kicker: "TECHNICAL TRUST",
    headline: "Earn technical trust before, during, and after the demo.",
    supporting:
      "Technical Trust combines software engineering, technical consulting, and Sales Engineering practice to make complex technology easier to understand, evaluate, and adopt.",
    practitioner:
      "For the people who sit between complex systems and the humans betting on them — sales engineers, solutions architects, advocates, support.",
    mirror:
      "And if you're the one making the decision: watch for whether the work makes the product easier to evaluate, not just easier to applaud.",
    primaryCta: { href: "/lab", label: "Explore the Lab" },
    secondaryCta: { href: "/studio", label: "Work with Technical Trust Studio" },
  },
  problem: {
    heading: "Complex products create uncertainty.",
    lines: [
      "Buyers cannot see relevance.",
      "They cannot see fit.",
      "They cannot see implementation risk.",
      "The demo happens anyway.",
    ],
  },
  branchesHeading: "Three ways the work happens.",
  credibility: {
    heading: "Who runs the practice.",
    body: "Dan Davidson builds Technical Trust from software engineering, technical consulting, and customer-facing work. The Lab is where the skills are practiced in public. Studio is where that practice becomes client work.",
    cta: { href: "/about", label: "About Dan" },
  },
  evidence: {
    heading: "Evidence, when it exists.",
    empty:
      "No client results to publish yet. Lab projects and Studio work will log stakeholders, constraints, limitations, and outcomes here — labeled as client, portfolio, or simulated. Nothing is invented to look finished.",
  },
  subscribe: {
    heading: "Technical Trust Weekly",
    lede: "One named failure and its counter-move. Every Friday.",
  },
  studioContact: {
    heading: "Work with Studio",
    lede: "If the product is technically strong and hard to explain, start with a Demo Sprint.",
    cta: { href: "/studio", label: "See the Demo Sprint" },
  },
} as const;

export const branches: Branch[] = [
  {
    id: "learn",
    name: "Learn",
    href: "/learn",
    kicker: "LEARN",
    line: "The discipline.",
    body: "Named failures, their counter-moves, and the map those checks happen on. Newsletter, essays, framework, Diagnostic.",
    cta: "Learn the discipline",
  },
  {
    id: "lab",
    name: "Lab",
    href: "/lab",
    kicker: "LAB",
    line: "The practice, in public.",
    body: "Demos, evaluations, and POCs built in the open — with personas, constraints, and limitations disclosed.",
    cta: "Explore the Lab",
  },
  {
    id: "studio",
    name: "Studio",
    href: "/studio",
    kicker: "STUDIO",
    line: "The client work.",
    body: "Technical product storytelling for B2B companies: credible demos, walkthroughs, evaluation guides, and sales enablement.",
    cta: "Work with Studio",
  },
];

export const learn = {
  metadataTitle: "Learn",
  metadataDescription:
    "The Technical Trust discipline — named failures, their counter-moves, the map those checks happen on, and the Trust Map Diagnostic.",
  kicker: "LEARN",
  headline: "This is the discipline.",
  lede: "Buyers are checking for competence, comprehension, candor, and consistency. The map is where the checks happen. The lifecycle is when the verdicts accumulate.",
  supporting:
    "Learn is the writing and the framework. Lab is where the moves are practiced. Studio is where that practice becomes client work.",
  paths: [
    {
      href: "/newsletter",
      kicker: "NEWSLETTER",
      name: "Technical Trust Weekly",
      body: "One named failure and its counter-move. Every Friday.",
    },
    {
      href: "/framework",
      kicker: "FRAMEWORK",
      name: "The map",
      body: "Honesty, Understanding, Clarity, and Judgment across Discovery, Demo, Docs, and Support.",
    },
    {
      href: "/essays",
      kicker: "ESSAYS",
      name: "For the other side of the table",
      body: "Long-form on what buyers are checking for — the Four C's, not the map rows restated.",
    },
    {
      href: "/diagnostic",
      kicker: "DIAGNOSTIC",
      name: "Trust Map Diagnostic",
      body: "Sixteen questions. One per cell. A heatmap of where you build trust and where you lose it.",
    },
  ],
} as const;

export const newsletterCopy = {
  heading: "Technical Trust Weekly",
  lede: "One named failure and its counter-move. Every Friday. The archive of published editions lives here.",
  subscribe: "Get the next named failure in your inbox.",
} as const;

export function getBranch(id: BranchId): Branch {
  const branch = branches.find((item) => item.id === id);
  if (!branch) {
    throw new Error(`Unknown branch: ${id}`);
  }
  return branch;
}
