-- Add type column to characters table
DO $$ 
BEGIN
    -- Add type column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' 
        AND column_name = 'type'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "type" varchar(50) DEFAULT 'humanoid' NOT NULL;
    END IF;
END $$;

