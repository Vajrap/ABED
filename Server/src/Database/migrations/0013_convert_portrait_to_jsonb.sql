-- Migration: Convert portrait column from varchar to jsonb
-- This migration converts the portrait column to support the new composable portrait system

-- Step 1: Drop all characters from the database (testing phase, data loss is acceptable)
-- Using TRUNCATE CASCADE to handle foreign key constraints
TRUNCATE TABLE "characters" CASCADE;

-- Step 2: Change portrait column type from varchar(50) to jsonb
-- Since the table is empty after TRUNCATE, we can change the type directly
ALTER TABLE "characters" 
ALTER COLUMN "portrait" TYPE jsonb USING NULL::jsonb;

