-- Migration: Create NPC Memory table
-- This table stores NPC-specific data: personal prompts and known news
-- Separated from characters table for better organization and to allow for future expansion

CREATE TABLE IF NOT EXISTS "npc_memory" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "npc_id" uuid NOT NULL UNIQUE REFERENCES "characters"("id") ON DELETE CASCADE,
  "personal_prompt" text,
  "known_news" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Create index for efficient NPC lookups
CREATE INDEX IF NOT EXISTS "npc_memory_npc_idx" ON "npc_memory"("npc_id");

-- Add comment to explain the table
COMMENT ON TABLE "npc_memory" IS 'Stores NPC-specific memory data: personal prompts for LLM interactions and known news IDs. Each NPC has one memory record.';
COMMENT ON COLUMN "npc_memory"."personal_prompt" IS 'Character prompt for LLM/OpenAI interactions. Describes personality, background, current state, and conversation style. Can be updated dynamically during gameplay.';
COMMENT ON COLUMN "npc_memory"."known_news" IS 'Array of news archive IDs (UUIDs) that this NPC knows about. Used to keep NPCs knowledgeable of world events.';

