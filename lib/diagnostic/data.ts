import { getFallbackQuestions } from "@/lib/diagnostic/questions";
import type {
  CellScore,
  ColumnScores,
  DiagnosticAnswer,
  DiagnosticQuestion,
  DiagnosticResult,
  FrameworkScores,
  RowScores,
} from "@/lib/diagnostic/types";
import {
  FRAMEWORK_COLUMNS,
  FRAMEWORK_ROWS,
} from "@/lib/diagnostic/types";
import {
  getSupabaseServiceClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import { randomBytes } from "crypto";

function sortQuestions(questions: DiagnosticQuestion[]): DiagnosticQuestion[] {
  return [...questions].sort((a, b) => {
    const colDiff =
      FRAMEWORK_COLUMNS.indexOf(a.framework_column) -
      FRAMEWORK_COLUMNS.indexOf(b.framework_column);
    if (colDiff !== 0) return colDiff;
    return (
      FRAMEWORK_ROWS.indexOf(a.framework_row) -
      FRAMEWORK_ROWS.indexOf(b.framework_row)
    );
  });
}

export type StoredDiagnosticResult = {
  id: string;
  token: string;
  framework_scores: FrameworkScores;
  row_averages: RowScores;
  column_averages: ColumnScores;
  weakest_cells: CellScore[];
  strongest_cells: CellScore[];
  answers: DiagnosticAnswer[];
  email: string | null;
  unlocked_at: string | null;
  created_at: string;
};

function createToken(): string {
  return randomBytes(16).toString("hex");
}

export async function loadDiagnosticQuestions(): Promise<DiagnosticQuestion[]> {
  if (!isSupabaseConfigured()) {
    return sortQuestions(getFallbackQuestions());
  }

  try {
    const supabase = getSupabaseServiceClient();
    const { data, error } = await supabase
      .from("trust_map_questions")
      .select("id, prompt, framework_row, framework_column");

    if (error || !data?.length) {
      console.warn("Falling back to lib questions:", error?.message);
      return sortQuestions(getFallbackQuestions());
    }

    return sortQuestions(data as DiagnosticQuestion[]);
  } catch (error) {
    console.warn("Falling back to lib questions:", error);
    return sortQuestions(getFallbackQuestions());
  }
}

export async function saveDiagnosticResult(
  result: DiagnosticResult,
  answers: DiagnosticAnswer[],
): Promise<{ token: string }> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured");
  }

  const token = createToken();
  const supabase = getSupabaseServiceClient();

  const { error } = await supabase.from("trust_map_results").insert({
    token,
    framework_scores: result.allScores,
    row_averages: result.rowAverages,
    column_averages: result.columnAverages,
    weakest_cells: result.weakestCells,
    strongest_cells: result.strongestCells,
    answers,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { token };
}

export async function getDiagnosticResultByToken(
  token: string,
): Promise<StoredDiagnosticResult | null> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured");
  }

  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("trust_map_results")
    .select(
      "id, token, framework_scores, row_averages, column_averages, weakest_cells, strongest_cells, answers, email, unlocked_at, created_at",
    )
    .eq("token", token)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as StoredDiagnosticResult | null;
}

export async function unlockDiagnosticResult(
  token: string,
  email: string,
): Promise<StoredDiagnosticResult> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured");
  }

  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("trust_map_results")
    .update({
      email,
      unlocked_at: new Date().toISOString(),
    })
    .eq("token", token)
    .select(
      "id, token, framework_scores, row_averages, column_averages, weakest_cells, strongest_cells, answers, email, unlocked_at, created_at",
    )
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Result not found");
  }

  return data as StoredDiagnosticResult;
}
