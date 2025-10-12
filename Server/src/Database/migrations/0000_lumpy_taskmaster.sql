CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"password" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"character_id" varchar(255) NOT NULL,
	"last_news_received" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_by" varchar(255) NOT NULL,
	"updated_by" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
