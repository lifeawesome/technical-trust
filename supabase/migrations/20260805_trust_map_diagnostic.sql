-- Trust Map Diagnostic: greenfield schema
-- Run against the Technical Trust Supabase project

-- =============================================================================
-- Questions (16 map cells)
-- =============================================================================

CREATE TABLE IF NOT EXISTS trust_map_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prompt TEXT NOT NULL,
  framework_row VARCHAR(50) NOT NULL
    CHECK (framework_row IN ('honesty', 'understanding', 'clarity', 'judgment')),
  framework_column VARCHAR(50) NOT NULL
    CHECK (framework_column IN ('discovery', 'demo', 'docs', 'support')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_trust_map_question_cell UNIQUE (framework_row, framework_column)
);

CREATE INDEX IF NOT EXISTS idx_trust_map_questions_cell
  ON trust_map_questions (framework_row, framework_column);

ALTER TABLE trust_map_questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Trust map questions are viewable by everyone" ON trust_map_questions;
CREATE POLICY "Trust map questions are viewable by everyone"
  ON trust_map_questions FOR SELECT USING (true);

-- Seed (idempotent via unique cell constraint)
INSERT INTO trust_map_questions (prompt, framework_row, framework_column) VALUES
(
  'When a prospect mentions a problem, I confirm it''s actually a priority before moving forward.',
  'honesty',
  'discovery'
),
(
  'By the end of discovery, I typically understand the prospect''s workflow, constraints, and success criteria.',
  'understanding',
  'discovery'
),
(
  'After understanding a prospect''s problem, I explain relevance by translating it to their business outcome.',
  'clarity',
  'discovery'
),
(
  'When a prospect has multiple problems, I prioritize by asking which blocks their biggest business outcome.',
  'judgment',
  'discovery'
),
(
  'During a demo, if a prospect asks about something we don''t do, I explain limitations honestly first.',
  'honesty',
  'demo'
),
(
  'After showing a feature, I check understanding by asking them to explain or apply it to their scenario.',
  'understanding',
  'demo'
),
(
  'When explaining technical concepts, I start with industry analogies before diving into features.',
  'clarity',
  'demo'
),
(
  'When the prospect cares about feature A but feature B is more impressive, I focus primarily on A.',
  'judgment',
  'demo'
),
(
  'When pointing prospects to documentation, it clearly covers use cases, limitations, and when NOT to use it.',
  'honesty',
  'docs'
),
(
  'Documentation addresses their specific workflow and role, not generic feature descriptions.',
  'understanding',
  'docs'
),
(
  'Non-technical buyers can understand documentation because it uses analogies and minimal jargon.',
  'clarity',
  'docs'
),
(
  'Documentation focuses on the 3-5 use cases that drive ROI, not every possible feature.',
  'judgment',
  'docs'
),
(
  'When a customer hits a limitation, I acknowledge it, explain the fix timeline, and provide workarounds now.',
  'honesty',
  'support'
),
(
  'When solving problems, I understand their workflow and business impact before offering solutions.',
  'understanding',
  'support'
),
(
  'When explaining solutions, I show them with their own data and confirm they can implement independently.',
  'clarity',
  'support'
),
(
  'When a customer has multiple issues, I prioritize by business impact and confirm that''s their priority too.',
  'judgment',
  'support'
)
ON CONFLICT (framework_row, framework_column) DO NOTHING;

-- =============================================================================
-- Results (tokenized, email-gated)
-- =============================================================================

CREATE TABLE IF NOT EXISTS trust_map_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  token VARCHAR(64) NOT NULL UNIQUE,
  framework_scores JSONB NOT NULL,
  row_averages JSONB NOT NULL,
  column_averages JSONB NOT NULL,
  weakest_cells JSONB NOT NULL,
  strongest_cells JSONB NOT NULL,
  answers JSONB NOT NULL,
  email VARCHAR(320),
  unlocked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_trust_map_results_token
  ON trust_map_results (token);

CREATE INDEX IF NOT EXISTS idx_trust_map_results_email
  ON trust_map_results (email)
  WHERE email IS NOT NULL;

ALTER TABLE trust_map_results ENABLE ROW LEVEL SECURITY;

-- No public policies: all result access goes through the service role in API routes.

COMMENT ON TABLE trust_map_questions IS 'Trust Map Diagnostic Likert prompts — one per map cell';
COMMENT ON TABLE trust_map_results IS 'Anonymous diagnostic takes; unlock via email sets email + unlocked_at';
COMMENT ON COLUMN trust_map_results.framework_scores IS 'JSONB map of row_column → score (1-5)';
COMMENT ON COLUMN trust_map_results.weakest_cells IS 'JSONB array of weakest CellScore objects';
COMMENT ON COLUMN trust_map_results.token IS 'Opaque URL token for /diagnostic/r/[token]';
