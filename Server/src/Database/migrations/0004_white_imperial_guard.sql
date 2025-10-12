-- Create parties table
CREATE TABLE IF NOT EXISTS "parties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"party_id" varchar(255) NOT NULL,
	"is_traveling" boolean DEFAULT false NOT NULL,
	"location" varchar(100) NOT NULL,
	"just_arrived" boolean DEFAULT false NOT NULL,
	"characters" jsonb NOT NULL,
	"behavior" jsonb NOT NULL,
	"informations" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"action_sequence" jsonb NOT NULL,
	"leader_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_by" varchar(255) NOT NULL,
	"updated_by" varchar(255) NOT NULL,
	CONSTRAINT "parties_party_id_unique" UNIQUE("party_id")
);