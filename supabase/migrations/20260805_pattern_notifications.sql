-- Pattern waitlist signups (coming-soon pages + diagnostic demand signal)
-- Pattern names/status remain in lib/patterns.ts — this table only stores intent.

CREATE TABLE IF NOT EXISTS pattern_notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email VARCHAR(320) NOT NULL,
  pattern_slug VARCHAR(255) NOT NULL,

  source VARCHAR(50) NOT NULL DEFAULT 'website'
    CHECK (source IN ('diagnostic', 'website', 'newsletter', 'other')),
  weak_cell_score NUMERIC(3, 1),

  notified BOOLEAN NOT NULL DEFAULT FALSE,
  notified_at TIMESTAMPTZ,
  clicked BOOLEAN NOT NULL DEFAULT FALSE,
  clicked_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT unique_user_pattern_slug UNIQUE (user_email, pattern_slug)
);

CREATE INDEX IF NOT EXISTS idx_pattern_notifications_email
  ON pattern_notifications (user_email);

CREATE INDEX IF NOT EXISTS idx_pattern_notifications_slug
  ON pattern_notifications (pattern_slug);

CREATE INDEX IF NOT EXISTS idx_pattern_notifications_notified
  ON pattern_notifications (notified)
  WHERE notified = FALSE;

ALTER TABLE pattern_notifications ENABLE ROW LEVEL SECURITY;

-- No public policies: inserts/reads go through the service role in API routes.

COMMENT ON TABLE pattern_notifications IS
  'Waitlist interest for unpublished Patterns; keyed by patterns.ts slug';
COMMENT ON COLUMN pattern_notifications.pattern_slug IS
  'Must match Pattern.id in lib/patterns.ts (e.g. the-eager-yes)';
