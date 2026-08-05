import { NextResponse } from "next/server";
import { saveDiagnosticResult } from "@/lib/diagnostic/data";
import { processDiagnosticQuiz } from "@/lib/diagnostic/scoring";
import {
  type DiagnosticAnswer,
  isFrameworkColumn,
  isFrameworkRow,
  isLikertValue,
} from "@/lib/diagnostic/types";
import { isSupabaseConfigured } from "@/lib/supabase/server";

function parseAnswers(raw: unknown): DiagnosticAnswer[] | null {
  if (!Array.isArray(raw) || raw.length !== 16) return null;

  const answers: DiagnosticAnswer[] = [];

  for (const item of raw) {
    if (!item || typeof item !== "object") return null;
    const record = item as Record<string, unknown>;
    const questionId = record.question_id;
    const value = record.value;
    const row = record.framework_row;
    const column = record.framework_column;

    if (typeof questionId !== "string" || !questionId) return null;
    if (!isLikertValue(value)) return null;
    if (!isFrameworkRow(row) || !isFrameworkColumn(column)) return null;

    answers.push({
      question_id: questionId,
      value,
      framework_row: row,
      framework_column: column,
    });
  }

  const cells = new Set(
    answers.map((a) => `${a.framework_row}_${a.framework_column}`),
  );
  if (cells.size !== 16) return null;

  return answers;
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Diagnostic storage is not configured" },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as { answers?: unknown };
    const answers = parseAnswers(body.answers);

    if (!answers) {
      return NextResponse.json(
        { error: "Exactly 16 valid answers are required" },
        { status: 400 },
      );
    }

    const result = processDiagnosticQuiz(answers);
    const { token } = await saveDiagnosticResult(result, answers);

    return NextResponse.json({
      ok: true,
      token,
      weakestPreview: result.weakestCells[0] ?? null,
    });
  } catch (error) {
    console.error("Diagnostic submit failed:", error);
    return NextResponse.json(
      { error: "Failed to save diagnostic result" },
      { status: 500 },
    );
  }
}
