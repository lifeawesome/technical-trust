export const studio = {
  name: "Technical Trust Studio",
  metadataTitle: "Studio",
  metadataDescription:
    "Technical product storytelling for B2B technology companies — credible demos, integration walkthroughs, evaluation guides, and sales enablement content.",
  kicker: "STUDIO",
  headline: "Technical product storytelling for products that are hard to explain.",
  description:
    "Technical Trust Studio helps B2B SaaS, AI, automation, API, data, and cybersecurity companies explain complex products through credible demos, integration walkthroughs, evaluation guides, and sales enablement content.",
  supportingTerm:
    "Some buyers call this technical UGC. The work is technical demo content: specific, limitation-honest, and usable in an evaluation.",
  primaryOffer: {
    name: "Technical Trust Demo Sprint",
    price: 1250,
    priceLabel: "$1,250",
    ctaLabel: "See the Demo Sprint",
    pitch:
      "In one focused sprint, turn a complex B2B product into a clear, buyer-specific demo and evaluation package.",
    includeLine:
      "Discovery interview, two edited technical videos, a workflow or architecture visual, evaluation guide, and one revision.",
    quote:
      "Technical Trust Demo Sprint — $1,250. Includes discovery interview, persona-specific demo strategy, two edited technical videos, one workflow/architecture visual, evaluation guide, and one revision round. Organic use on the client's website and social channels is included. Paid advertising, raw footage, perpetual rights, and additional revisions are quoted separately.",
    timeline: "Final delivery within 7–10 business days.",
    deliverables: [
      "45-minute product interview",
      "Target persona and use-case definition",
      "Discovery summary",
      "Demo narrative and script",
      "One primary technical demo",
      "One shorter objection/use-case video",
      "Architecture or workflow diagram",
      "One-page evaluation guide",
      "One revision round",
    ],
    notIncluded: [
      "Paid advertising rights",
      "Perpetual usage",
      "Raw footage",
      "Extra revisions",
      "Rush delivery",
      "Exclusivity",
      "Additional personas or product use cases",
    ],
    terms: [
      "50% deposit, 50% on delivery.",
      "One revision round is included.",
      "Organic use on the client's website and social channels is included.",
      "Public case-study use requires written permission.",
    ],
  },
  widget: {
    hook: [
      "The product is technically strong.",
      "The conversation keeps going sideways.",
    ],
    pitch: "In one sprint: a buyer-specific demo and evaluation package.",
    includes: [
      "Discovery interview",
      "Two edited videos",
      "Architecture visual",
      "Evaluation guide",
    ],
    ctaLabel: "See the Demo Sprint",
    href: "/studio",
  },
  sections: {
    included: "What's included",
    notIncluded: "Quoted separately",
    terms: "How the work is bought",
    clients: "A fit for",
    later: "Later offers",
    laterLede: "Not for sale yet. Named so the road is visible.",
  },
  futureOffers: [
    "Technical POC design and implementation",
    "Demo environment setup",
    "RFP and technical-response support",
    "Sales enablement libraries",
    "Founder-led demo coaching",
    "Ongoing technical content retainer",
  ],
  idealClients: [
    "Developer tools",
    "AI platforms and agent tooling",
    "Workflow automation",
    "APIs and integration platforms",
    "Cybersecurity",
    "Data and analytics platforms",
    "E-commerce infrastructure",
    "Enterprise SaaS",
  ],
  fit: {
    heading: "This is a fit when",
    lines: [
      "The product is technically strong and difficult to explain.",
      "Buyers need to see relevance, fit, and implementation risk — not a feature tour.",
      "You want a demo and evaluation package, not an audit and not a diagnostic.",
    ],
  },
  contact: {
    heading: "Start a project",
    lede: "Describe the product, the buyer, and the conversation that keeps going sideways.",
    ctaLabel: "Send the inquiry",
    emailFallbackLabel: "Email Studio",
    mailtoSubject: "Studio inquiry — Demo Sprint",
    success:
      "Received. I'll reply with next steps — fit, timeline, and the written yes before any deposit.",
    error: "Something went wrong. Email Studio instead, or try again.",
    disclaimer:
      "No payment is taken here. A 50% deposit is invoiced after we agree in writing.",
    fields: {
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "you@company.com" },
      company: {
        label: "Company / product",
        placeholder: "The product that's hard to explain",
      },
      situation: {
        label: "The conversation that keeps going sideways",
        placeholder: "Who is evaluating, and what they cannot see yet.",
      },
      siteUrl: {
        label: "Site URL",
        placeholder: "https://",
        optional: "optional",
      },
    },
  },
} as const;
