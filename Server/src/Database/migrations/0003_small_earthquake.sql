ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_character_id_unique" UNIQUE("character_id");