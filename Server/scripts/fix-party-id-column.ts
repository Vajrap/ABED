/**
 * Fix characters.party_id column type from uuid to varchar(255)
 * This is a manual fix script in case the migration didn't work
 */

import { db } from "../src/Database/connection";
import { sql } from "drizzle-orm";
import Report from "../src/Utils/Reporter";

async function fixPartyIdColumn() {
  try {
    Report.info("🔧 Checking characters.party_id column type...");
    
    // Check current column type
    const columnInfo = await db.execute(sql`
      SELECT column_name, data_type, udt_name 
      FROM information_schema.columns 
      WHERE table_schema = 'public'
      AND table_name = 'characters' 
      AND column_name = 'party_id';
    `);
    
    Report.info("Current column info:", { rows: columnInfo.rows });
    
    const currentType = (columnInfo.rows[0] as any)?.data_type || (columnInfo.rows[0] as any)?.udt_name;
    
    if (currentType === 'uuid' || currentType === 'uuid') {
      Report.info("⚠️  Column is still uuid type, changing to varchar(255)...");
      
      // Change column type
      await db.execute(sql`
        ALTER TABLE "characters" 
        ALTER COLUMN "party_id" TYPE varchar(255) 
        USING CASE 
          WHEN "party_id" IS NULL THEN NULL 
          ELSE "party_id"::text 
        END;
      `);
      
      Report.info("✅ Column type changed successfully!");
      
      // Verify the change
      const newColumnInfo = await db.execute(sql`
        SELECT column_name, data_type, udt_name 
        FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'characters' 
        AND column_name = 'party_id';
      `);
      
      Report.info("New column info:", { rows: newColumnInfo.rows });
    } else if (currentType === 'character varying' || currentType === 'varchar') {
      Report.info("✅ Column is already varchar type!");
    } else {
      Report.warn(`⚠️  Unexpected column type: ${currentType}`);
    }
    
  } catch (error) {
    Report.error("❌ Failed to fix column type:", { error: error instanceof Error ? error.message : String(error) });
    throw error;
  }
}

fixPartyIdColumn()
  .then(() => {
    Report.info("✅ Script completed");
    process.exit(0);
  })
  .catch((error) => {
    Report.error("❌ Script failed:", error);
    process.exit(1);
  });

