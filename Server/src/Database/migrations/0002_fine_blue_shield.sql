CREATE TABLE IF NOT EXISTS "characters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"gender" varchar(10) NOT NULL,
	"race" varchar(50) NOT NULL,
	"portrait" varchar(50) NOT NULL,
	"background" varchar(100) NOT NULL,
	"starting_class" varchar(50) NOT NULL,
	"attributes" jsonb NOT NULL,
	"battle_stats" jsonb NOT NULL,
	"proficiencies" jsonb NOT NULL,
	"artisans" jsonb NOT NULL,
	"level" integer DEFAULT 1 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"inventory" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"equipments" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"skills" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"vitals" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_by" varchar(255) NOT NULL,
	"updated_by" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters" ADD CONSTRAINT "characters_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
