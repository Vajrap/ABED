-- Add location column to characters table
DO $$ 
BEGIN
    -- Add location column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' 
        AND column_name = 'location'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "location" varchar(100);
    END IF;
END $$;

