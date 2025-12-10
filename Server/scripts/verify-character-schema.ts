import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://abed_user:abed_password@localhost:40316/abed_db";

// Expected columns based on the schema definition
const EXPECTED_COLUMNS = [
  "id",
  "user_id",
  "party_id",
  "location", // The one we just fixed
  "name",
  "gender",
  "race",
  "type",
  "level",
  "portrait",
  "background",
  "alignment",
  "artisans",
  "attribute",
  "battle_stats",
  "elements",
  "proficiencies",
  "save_rolls",
  "needs",
  "vitals",
  "fame",
  "behavior",
  "title",
  "possible_epithets",
  "possible_roles",
  "action_sequence",
  "informations",
  "skills",
  "active_skills",
  "conditional_skills",
  "conditional_skills_condition",
  "skill_learning_progress",
  "breathing_skills",
  "active_breathing_skill",
  "breathing_skills_learning_progress",
  "planar_aptitude",
  "relations",
  "traits",
  "inventory_size",
  "inventory",
  "equipments",
  "stat_tracker",
  "ab_guage",
  "created_at",
  "updated_at",
  "created_by",
  "updated_by",
];

async function verifyCharacterSchema() {
  const pool = new Pool({
    connectionString: DATABASE_URL,
  });

  try {
    const client = await pool.connect();
    console.log("🔍 Verifying characters table schema...\n");

    // Get actual columns from database
    const result = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'characters'
      ORDER BY ordinal_position;
    `);

    const actualColumns = result.rows.map((row: any) => row.column_name);
    const missingColumns = EXPECTED_COLUMNS.filter(
      (col) => !actualColumns.includes(col)
    );
    const extraColumns = actualColumns.filter(
      (col) => !EXPECTED_COLUMNS.includes(col)
    );

    console.log(`📊 Found ${actualColumns.length} columns in database`);
    console.log(`📋 Expected ${EXPECTED_COLUMNS.length} columns\n`);

    if (missingColumns.length > 0) {
      console.log("❌ Missing columns:");
      missingColumns.forEach((col) => console.log(`  - ${col}`));
      console.log();
    } else {
      console.log("✅ All expected columns are present!\n");
    }

    if (extraColumns.length > 0) {
      console.log("⚠️  Extra columns (not in schema):");
      extraColumns.forEach((col) => console.log(`  - ${col}`));
      console.log();
    }

    // Show actual columns
    console.log("📋 Actual columns in database:");
    result.rows.forEach((row: any) => {
      console.log(
        `  - ${row.column_name} (${row.data_type}${row.is_nullable === "YES" ? ", nullable" : ""})`
      );
    });

    client.release();
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  } finally {
    await pool.end();
    console.log("\n🔌 Database connection closed");
  }
}

verifyCharacterSchema().catch(console.error);

