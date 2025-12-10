/**
 * Run NPC Memory table migration manually
 * This creates the npc_memory table if it doesn't exist
 */

import { db } from "../src/Database/connection";
import { sql } from "drizzle-orm";
import Report from "../src/Utils/Reporter";

async function runMigration() {
  try {
    Report.info("🔧 Running NPC Memory table migration...");

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "npc_memory" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "npc_id" uuid NOT NULL UNIQUE REFERENCES "characters"("id") ON DELETE CASCADE,
        "personal_prompt" text,
        "known_news" jsonb DEFAULT '[]'::jsonb NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      );
    `);

    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS "npc_memory_npc_idx" ON "npc_memory"("npc_id");
    `);

    Report.info("✅ NPC Memory table migration completed successfully!");
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

