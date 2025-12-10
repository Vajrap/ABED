/**
 * Run user_id nullable migration manually
 * This makes user_id nullable in characters table for NPCs
 */

import { db } from "../src/Database/connection";
import { sql } from "drizzle-orm";
import Report from "../src/Utils/Reporter";

async function runMigration() {
  try {
    Report.info("🔧 Running user_id nullable migration...");

    await db.execute(sql`
      DO $$
      BEGIN
          -- Check if the column exists and is currently NOT NULL
          IF EXISTS (
              SELECT 1
              FROM information_schema.columns
              WHERE table_name = 'characters'
              AND column_name = 'user_id'
              AND is_nullable = 'NO'
          ) THEN
              -- First, set existing rows with no user to NULL (if any, though unlikely for player characters)
              -- This step is mostly for safety if there were any orphaned characters
              UPDATE "characters" SET "user_id" = NULL WHERE "user_id" IS NOT NULL AND NOT EXISTS (SELECT 1 FROM "users" WHERE "id" = "characters"."user_id");

              -- Then, alter the column to be nullable
              ALTER TABLE "characters" ALTER COLUMN "user_id" DROP NOT NULL;
              RAISE NOTICE 'Column "user_id" in table "characters" is now nullable.';
          ELSE
              RAISE NOTICE 'Column "user_id" in table "characters" is already nullable or does not exist.';
          END IF;
      END
      $$;
    `);

    Report.info("✅ user_id nullable migration completed successfully!");
  } catch (error) {
    Report.error("❌ Migration failed:", error);
    throw error;
  }
}

runMigration()
  .then(() => {
    Report.info("✅ Migration script completed");
    process.exit(0);
  })
  .catch((error) => {
    Report.error("❌ Migration script failed:", error);
    process.exit(1);
  });

