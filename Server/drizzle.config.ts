import type { Config } from "drizzle-kit";

export default {
  schema: "./src/Database/Schema/index.ts",
  out: "./src/Database/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString:
      process.env.DATABASE_URL ||
      "postgres://abed_user:abed_password@localhost:40316/abed_db",
  },
  verbose: true,
  strict: true,
} satisfies Config;
