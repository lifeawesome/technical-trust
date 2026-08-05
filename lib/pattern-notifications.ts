import {
  getSupabaseServiceClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

export type PatternNotifySource = "diagnostic" | "website" | "newsletter" | "other";

export async function upsertPatternNotification(input: {
  email: string;
  patternSlug: string;
  source: PatternNotifySource;
  weakCellScore?: number | null;
}): Promise<{ created: boolean }> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured");
  }

  const supabase = getSupabaseServiceClient();
  const email = input.email.trim().toLowerCase();

  const { data: existing } = await supabase
    .from("pattern_notifications")
    .select("id")
    .eq("user_email", email)
    .eq("pattern_slug", input.patternSlug)
    .maybeSingle();

  if (existing) {
    return { created: false };
  }

  const { error } = await supabase.from("pattern_notifications").insert({
    user_email: email,
    pattern_slug: input.patternSlug,
    source: input.source,
    weak_cell_score: input.weakCellScore ?? null,
  });

  if (error) {
    // Unique race: treat as already subscribed
    if (error.code === "23505") {
      return { created: false };
    }
    throw new Error(error.message);
  }

  return { created: true };
}
