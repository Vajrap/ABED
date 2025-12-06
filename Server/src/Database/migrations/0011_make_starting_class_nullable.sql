-- Make starting_class nullable for NPC characters
DO $$ 
BEGIN
    -- Check if column exists and is NOT NULL
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' 
        AND column_name = 'starting_class'
        AND is_nullable = 'NO'
    ) THEN
        ALTER TABLE "characters" ALTER COLUMN "starting_class" DROP NOT NULL;
    END IF;
END $$;

