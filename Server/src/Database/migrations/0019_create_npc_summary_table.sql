-- Migration: Create NPC Summary table
-- This table stores LLM-generated summaries of NPC's life experiences, quests, and events
-- Separate from npc_memory (which stores prompts and news) for better organization

CREATE TABLE IF NOT EXISTS "npc_summary" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "npc_id" uuid NOT NULL UNIQUE REFERENCES "characters"("id") ON DELETE CASCADE,
  "life_summary" text,
  "last_updated_at" timestamp DEFAULT now() NOT NULL,
  "summary_version" integer DEFAULT 1 NOT NULL,
  "total_events" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Create index for efficient NPC lookups
CREATE INDEX IF NOT EXISTS "npc_summary_npc_id_idx" ON "npc_summary"("npc_id");

-- Add comments to explain the table
COMMENT ON TABLE "npc_summary" IS 'Stores LLM-generated summaries of NPC life experiences, quests, and events. Each NPC has one summary record that is updated periodically.';
COMMENT ON COLUMN "npc_summary"."life_summary" IS 'LLM-generated summary of what the NPC has been through: quests, events, experiences. Updated periodically as new events occur.';
COMMENT ON COLUMN "npc_summary"."summary_version" IS 'Version number that increments each time the summary is updated. Helps track summary freshness.';
COMMENT ON COLUMN "npc_summary"."total_events" IS 'Total count of events that have been summarized. Used to track when summarization is needed.';

