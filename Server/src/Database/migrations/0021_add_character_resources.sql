-- Migration: Add resources column to characters table
-- Stores resource storage as JSONB: { "ore": 10, "wood": 5, "herbs": 3, ... }

ALTER TABLE "characters" 
ADD COLUMN IF NOT EXISTS "material_resources" jsonb DEFAULT '{}'::jsonb NOT NULL;

COMMENT ON COLUMN "characters"."material_resources" IS 'MaterialResource storage map: { "ore": 10, "wood": 5, "herbs": 3, ... }. Material Resources are gathered through Mining, WoodCutting, Foraging actions.';

