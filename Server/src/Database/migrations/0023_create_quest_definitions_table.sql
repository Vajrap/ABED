CREATE TABLE IF NOT EXISTS "quest_definitions" (
	"id" varchar(100) PRIMARY KEY NOT NULL,
	"name" jsonb NOT NULL,
	"description" jsonb NOT NULL,
	"type" varchar(50) NOT NULL,
	"tier" varchar(20) NOT NULL,
	"giver_id" varchar(100) NOT NULL,
	"giver_location" varchar(100) NOT NULL,
	"prerequisites" jsonb,
	"objectives" jsonb NOT NULL,
	"rewards" jsonb NOT NULL,
	"is_chain_quest" boolean DEFAULT false NOT NULL,
	"chain_id" varchar(100),
	"chain_order" integer,
	"unlocks_quests" jsonb,
	"is_one_time_only" boolean DEFAULT false NOT NULL,
	"is_repeatable" boolean DEFAULT false NOT NULL,
	"cooldown_days" integer,
	"time_limit" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "quest_definitions_giver_id_idx" ON "quest_definitions" ("giver_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "quest_definitions_giver_location_idx" ON "quest_definitions" ("giver_location");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "quest_definitions_chain_id_idx" ON "quest_definitions" ("chain_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "quest_definitions_type_idx" ON "quest_definitions" ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "quest_definitions_tier_idx" ON "quest_definitions" ("tier");

