export type LabProjectKind = "client" | "portfolio" | "simulated";

export const LAB_KIND_LABEL: Record<LabProjectKind, string> = {
  client: "Client project",
  portfolio: "Portfolio project",
  simulated: "Simulated scenario",
};

export interface LabProject {
  slug: string;
  name: string;
  kind: LabProjectKind;
  persona: string;
  problem: string;
  discoveryQuestions: string[];
  requirements: string[];
  solution: string;
  architecture?: string;
  demo?: string;
  limitations: string[];
  evaluationCriteria: string[];
  lessons: string[];
}

export const lab = {
  name: "Technical Trust Lab",
  metadataTitle: "Lab",
  metadataDescription:
    "A public Sales Engineering training environment — demos, evaluations, and POCs with personas, constraints, and limitations disclosed.",
  kicker: "LAB",
  headline: "Practice in public. Disclose the tradeoffs.",
  description:
    "The Lab is where Sales Engineering skills are practiced on real products, public tools, or clearly labeled simulated scenarios. Each project shows the conversation, not just the artifact.",
  anatomyHeading: "What every Lab project shows",
  anatomy: [
    "Target persona",
    "Customer problem",
    "Discovery questions",
    "Requirements and constraints",
    "Proposed solution",
    "Architecture or workflow diagram",
    "Demo or working POC",
    "Limitations and tradeoffs",
    "Evaluation criteria",
    "Lessons learned",
  ],
  plannedHeading: "First three projects",
  planned: [
    {
      domain: "Workflow automation",
      note: "How the product earns trust in a messy operating process — not a happy-path click-through.",
    },
    {
      domain: "API / integration",
      note: "Fit, constraints, and failure modes a buyer has to see before they commit a stack.",
    },
    {
      domain: "AI-agent use case",
      note: "What the agent can do, what it cannot, and how a technical buyer should evaluate it.",
    },
  ],
  empty: {
    heading: "No Lab projects published yet.",
    body: "The first three will cover workflow automation, API/integration, and an AI-agent use case. They will be labeled client, portfolio, or simulated. Nothing is staged here to look complete.",
  },
  kindNote:
    "Client project means paid or authorized work. Portfolio project means self-directed. Simulated scenario means fictional or reconstructed. The label is part of the evidence.",
} as const;

/** Published Lab projects. Empty until Phase 2. */
export const labProjects: LabProject[] = [];

export function getPublishedLabProjects(): LabProject[] {
  return labProjects;
}

export function getFeaturedLabProjects(limit = 3): LabProject[] {
  return labProjects.slice(0, limit);
}
