-- Migration: Convert portrait column from varchar to jsonb
-- This migration converts the portrait column to support the new composable portrait system

-- Step 1: Add a temporary column for the new jsonb portrait data
ALTER TABLE "characters" ADD COLUMN IF NOT EXISTS "portrait_new" jsonb;

-- Step 2: Convert existing string portraits to PortraitData format
-- For now, we'll set them to null since we don't have a mapping from old strings to new format
-- In the future, you can add logic here to convert specific old portrait strings to PortraitData
UPDATE "characters" 
SET "portrait_new" = NULL
WHERE "portrait" IS NOT NULL;

-- Step 3: Drop the old varchar column
ALTER TABLE "characters" DROP COLUMN IF EXISTS "portrait";

-- Step 4: Rename the new column to the original name
ALTER TABLE "characters" RENAME COLUMN "portrait_new" TO "portrait";

-- Note: Existing characters will have NULL portraits after this migration
-- They will need to be updated through the character creation UI or admin tools

