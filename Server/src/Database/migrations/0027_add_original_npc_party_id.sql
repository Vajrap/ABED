-- Migration: Add original_npc_party_id column to characters table
-- This stores the original NPC party ID for NPCs so they can be restored to their original party
-- when they leave player parties (even after server restarts)

ALTER TABLE "characters" 
  ADD COLUMN IF NOT EXISTS "original_npc_party_id" varchar(255);

-- Add comment to explain the field
COMMENT ON COLUMN "characters"."original_npc_party_id" IS 'For NPCs: stores their original NPC party ID (NPCEnums value like "thomas", "edda") so they can be restored when leaving player parties. NULL for player characters or NPCs not yet assigned to a party.';

-- For existing NPCs, set original_npc_party_id to their current party_id if it's an NPC party ID
-- (NPC party IDs are string values from NPCEnums, not UUIDs)
-- We can identify NPC parties because they're short strings (not UUIDs which are 36 chars with dashes)
UPDATE "characters"
SET "original_npc_party_id" = "party_id"
WHERE "user_id" IS NULL 
  AND "party_id" IS NOT NULL 
  AND "original_npc_party_id" IS NULL
  AND length("party_id") < 36; -- NPC party IDs are short strings, UUIDs are 36 characters

