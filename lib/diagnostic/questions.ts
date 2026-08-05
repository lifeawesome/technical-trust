import type { DiagnosticQuestion } from "@/lib/diagnostic/types";

/**
 * Seed / fallback for the 16 Trust Map Diagnostic questions.
 * Supabase `trust_map_questions` is the runtime source when configured;
 * this file mirrors the migration seed and is used as fallback.
 */
export const DIAGNOSTIC_QUESTIONS: Omit<DiagnosticQuestion, "id">[] = [
  {
    prompt:
      "When a prospect mentions a problem, I confirm it's actually a priority before moving forward.",
    framework_row: "honesty",
    framework_column: "discovery",
  },
  {
    prompt:
      "By the end of discovery, I typically understand the prospect's workflow, constraints, and success criteria.",
    framework_row: "understanding",
    framework_column: "discovery",
  },
  {
    prompt:
      "After understanding a prospect's problem, I explain relevance by translating it to their business outcome.",
    framework_row: "clarity",
    framework_column: "discovery",
  },
  {
    prompt:
      "When a prospect has multiple problems, I prioritize by asking which blocks their biggest business outcome.",
    framework_row: "judgment",
    framework_column: "discovery",
  },
  {
    prompt:
      "During a demo, if a prospect asks about something we don't do, I explain limitations honestly first.",
    framework_row: "honesty",
    framework_column: "demo",
  },
  {
    prompt:
      "After showing a feature, I check understanding by asking them to explain or apply it to their scenario.",
    framework_row: "understanding",
    framework_column: "demo",
  },
  {
    prompt:
      "When explaining technical concepts, I start with industry analogies before diving into features.",
    framework_row: "clarity",
    framework_column: "demo",
  },
  {
    prompt:
      "When the prospect cares about feature A but feature B is more impressive, I focus primarily on A.",
    framework_row: "judgment",
    framework_column: "demo",
  },
  {
    prompt:
      "When pointing prospects to documentation, it clearly covers use cases, limitations, and when NOT to use it.",
    framework_row: "honesty",
    framework_column: "docs",
  },
  {
    prompt:
      "Documentation addresses their specific workflow and role, not generic feature descriptions.",
    framework_row: "understanding",
    framework_column: "docs",
  },
  {
    prompt:
      "Non-technical buyers can understand documentation because it uses analogies and minimal jargon.",
    framework_row: "clarity",
    framework_column: "docs",
  },
  {
    prompt:
      "Documentation focuses on the 3-5 use cases that drive ROI, not every possible feature.",
    framework_row: "judgment",
    framework_column: "docs",
  },
  {
    prompt:
      "When a customer hits a limitation, I acknowledge it, explain the fix timeline, and provide workarounds now.",
    framework_row: "honesty",
    framework_column: "support",
  },
  {
    prompt:
      "When solving problems, I understand their workflow and business impact before offering solutions.",
    framework_row: "understanding",
    framework_column: "support",
  },
  {
    prompt:
      "When explaining solutions, I show them with their own data and confirm they can implement independently.",
    framework_row: "clarity",
    framework_column: "support",
  },
  {
    prompt:
      "When a customer has multiple issues, I prioritize by business impact and confirm that's their priority too.",
    framework_row: "judgment",
    framework_column: "support",
  },
];

/** Stable fallback IDs for offline / unset-Supabase quiz flow. */
export function getFallbackQuestions(): DiagnosticQuestion[] {
  return DIAGNOSTIC_QUESTIONS.map((q) => ({
    id: `${q.framework_row}_${q.framework_column}`,
    ...q,
  }));
}
