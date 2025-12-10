-- Migration: Add last_summarized_exchange to track when conversation was last summarized
-- This allows us to only summarize every 10 exchanges instead of continuously

ALTER TABLE "npc_character_relations" 
ADD COLUMN IF NOT EXISTS "last_summarized_exchange" integer DEFAULT 0 NOT NULL;

COMMENT ON COLUMN "npc_character_relations"."last_summarized_exchange" IS 'Exchange count when conversation was last summarized. Used to only summarize every 10 exchanges (on 10, 20, 30, etc.)';

