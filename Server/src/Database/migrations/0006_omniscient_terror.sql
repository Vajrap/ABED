ALTER TABLE "item_instances" ALTER COLUMN "id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "item_instances" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'game_state' 
        AND column_name = 'last_processed_phase'
    ) THEN
ALTER TABLE "game_state" ADD COLUMN "last_processed_phase" integer DEFAULT 0 NOT NULL;
    END IF;
END $$;