CREATE TABLE IF NOT EXISTS "battle_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"battle_type" varchar(50) NOT NULL,
	"location" varchar(100) NOT NULL,
	"game_time" jsonb NOT NULL,
	"party_a_snapshot" jsonb NOT NULL,
	"party_b_snapshot" jsonb NOT NULL,
	"winner_party_id" varchar(255),
	"outcome" jsonb NOT NULL,
	"rewards" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"turn_results" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"duration" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "character_news_knowledge" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"character_id" uuid NOT NULL,
	"news_id" uuid NOT NULL,
	"learned_at_game_day" integer NOT NULL,
	"learned_at" timestamp DEFAULT now() NOT NULL,
	"source" varchar(50) DEFAULT 'witnessed',
	"is_read" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "game_state" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"last_global_event_card_completed" boolean DEFAULT false NOT NULL,
	"active_global_event_card" jsonb,
	"global_event_card_deck" jsonb NOT NULL,
	"completed_global_event_cards" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"region_event_card_deck" jsonb NOT NULL,
	"completed_region_event_cards" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"global_event_scale" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_instances" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"item_type" varchar(20) NOT NULL,
	"base_item_id" varchar(100) NOT NULL,
	"crafter_id" uuid,
	"blueprint_id" varchar(100),
	"crafted_at" timestamp DEFAULT now() NOT NULL,
	"material_selection" jsonb,
	"item_data" jsonb NOT NULL,
	"modifiers" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"owner_id" uuid,
	"is_equipped" boolean DEFAULT false NOT NULL,
	"equipped_slot" varchar(50),
	"durability" integer,
	"max_durability" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "location_news_reach" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"location_id" varchar(100) NOT NULL,
	"news_id" uuid NOT NULL,
	"reached_at_game_day" integer NOT NULL,
	"reached_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "market_state" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"yearly_modifiers" jsonb NOT NULL,
	"event_modifiers" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"transaction_history" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"current_year" integer NOT NULL,
	"last_yearly_adjustment" timestamp NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "news_archive" (
	"id" uuid PRIMARY KEY NOT NULL,
	"game_time" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"scope_kind" varchar(20) NOT NULL,
	"scope_data" jsonb,
	"tokens" jsonb NOT NULL,
	"context" jsonb NOT NULL,
	"tags" jsonb,
	"significance" varchar(20) NOT NULL,
	"propagation" varchar(20) NOT NULL,
	"spread_config" jsonb,
	"current_reach" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"expires_at_game_day" integer NOT NULL,
	"secret_tier" varchar(20)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "news_spread_queue" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"news_id" uuid NOT NULL,
	"target_location" varchar(100) NOT NULL,
	"arrival_game_day" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resource_production_tracking" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"current_year" integer NOT NULL,
	"yearly_production" jsonb NOT NULL,
	"baselines" jsonb NOT NULL,
	"last_reset" timestamp NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "save_rolls" jsonb DEFAULT '{}'::jsonb NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "battle_location_idx" ON "battle_reports" ("location");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "battle_game_time_idx" ON "battle_reports" ("game_time");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "battle_created_at_idx" ON "battle_reports" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "char_news_idx" ON "character_news_knowledge" ("character_id","news_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "char_knowledge_idx" ON "character_news_knowledge" ("character_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "item_crafter_idx" ON "item_instances" ("crafter_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "item_owner_idx" ON "item_instances" ("owner_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "item_base_item_idx" ON "item_instances" ("base_item_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "item_type_idx" ON "item_instances" ("item_type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "loc_news_idx" ON "location_news_reach" ("location_id","reached_at_game_day");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "location_reach_idx" ON "location_news_reach" ("location_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_reach_idx" ON "location_news_reach" ("news_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "market_year_idx" ON "market_state" ("current_year");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_game_time_idx" ON "news_archive" ("game_time");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_scope_kind_idx" ON "news_archive" ("scope_kind");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_significance_idx" ON "news_archive" ("significance");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_propagation_idx" ON "news_archive" ("propagation");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "news_expires_idx" ON "news_archive" ("expires_at_game_day");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "spread_arrival_idx" ON "news_spread_queue" ("arrival_game_day");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "spread_news_idx" ON "news_spread_queue" ("news_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "resource_year_idx" ON "resource_production_tracking" ("current_year");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "character_news_knowledge" ADD CONSTRAINT "character_news_knowledge_news_id_news_archive_id_fk" FOREIGN KEY ("news_id") REFERENCES "news_archive"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_instances" ADD CONSTRAINT "item_instances_crafter_id_characters_id_fk" FOREIGN KEY ("crafter_id") REFERENCES "characters"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_instances" ADD CONSTRAINT "item_instances_owner_id_characters_id_fk" FOREIGN KEY ("owner_id") REFERENCES "characters"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "location_news_reach" ADD CONSTRAINT "location_news_reach_news_id_news_archive_id_fk" FOREIGN KEY ("news_id") REFERENCES "news_archive"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "news_spread_queue" ADD CONSTRAINT "news_spread_queue_news_id_news_archive_id_fk" FOREIGN KEY ("news_id") REFERENCES "news_archive"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
