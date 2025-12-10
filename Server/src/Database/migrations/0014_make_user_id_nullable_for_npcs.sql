-- Migration: Make user_id nullable to support NPCs
-- NPCs (Non-Player Characters) should have user_id = null
-- Player characters will continue to have a valid user_id

-- Step 1: Remove the NOT NULL constraint from user_id
-- We'll handle the foreign key constraint separately
ALTER TABLE "characters" 
  ALTER COLUMN "user_id" DROP NOT NULL;

-- Step 2: Update the foreign key to allow NULL values
-- PostgreSQL foreign keys allow NULL by default, but we need to ensure
-- the constraint is set to ON DELETE CASCADE for player characters
-- Note: The existing foreign key should already handle this, but we verify

-- Step 3: Add a check constraint to ensure data integrity
-- Either userId is set (player character) OR it's null (NPC)
-- This is implicit but we could add an explicit check if needed
-- For now, we'll rely on application logic

