-- Migration: Add character_prompt column for LLM/OpenAI interaction prompts
-- This allows NPCs (and potentially player characters) to have dynamic personality prompts
-- that can be updated periodically in-game

ALTER TABLE "characters" 
  ADD COLUMN IF NOT EXISTS "character_prompt" text;

-- Add comment to explain the field
COMMENT ON COLUMN "characters"."character_prompt" IS 'Character prompt for LLM/OpenAI interactions. Describes personality, background, current state, and conversation style. Can be updated dynamically during gameplay.';

