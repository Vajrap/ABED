-- Add all missing columns to characters table to match the schema definition

DO $$ 
BEGIN
    -- Add alignment column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'alignment'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "alignment" jsonb DEFAULT '{}'::jsonb NOT NULL;
    END IF;

    -- Add elements column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'elements'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "elements" jsonb DEFAULT '{}'::jsonb NOT NULL;
    END IF;

    -- Add needs column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'needs'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "needs" jsonb DEFAULT '{}'::jsonb NOT NULL;
    END IF;

    -- Add fame column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'fame'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "fame" jsonb DEFAULT '{}'::jsonb NOT NULL;
    END IF;

    -- Add behavior column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'behavior'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "behavior" jsonb DEFAULT '{}'::jsonb NOT NULL;
    END IF;

    -- Add title column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'title'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "title" jsonb DEFAULT '{}'::jsonb NOT NULL;
    END IF;

    -- Add possible_epithets column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'possible_epithets'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "possible_epithets" jsonb DEFAULT '[]'::jsonb NOT NULL;
    END IF;

    -- Add possible_roles column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'possible_roles'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "possible_roles" jsonb DEFAULT '[]'::jsonb NOT NULL;
    END IF;

    -- Add action_sequence column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'action_sequence'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "action_sequence" jsonb DEFAULT '{}'::jsonb NOT NULL;
    END IF;

    -- Add informations column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'informations'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "informations" jsonb DEFAULT '{}'::jsonb NOT NULL;
    END IF;

    -- Add active_skills column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'active_skills'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "active_skills" jsonb DEFAULT '[]'::jsonb NOT NULL;
    END IF;

    -- Add conditional_skills column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'conditional_skills'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "conditional_skills" jsonb DEFAULT '[]'::jsonb NOT NULL;
    END IF;

    -- Add conditional_skills_condition column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'conditional_skills_condition'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "conditional_skills_condition" jsonb DEFAULT '{}'::jsonb NOT NULL;
    END IF;

    -- Add skill_learning_progress column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'skill_learning_progress'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "skill_learning_progress" jsonb DEFAULT '{}'::jsonb NOT NULL;
    END IF;

    -- Add breathing_skills column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'breathing_skills'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "breathing_skills" jsonb DEFAULT '{}'::jsonb NOT NULL;
    END IF;

    -- Add active_breathing_skill column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'active_breathing_skill'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "active_breathing_skill" varchar(50);
    END IF;

    -- Add breathing_skills_learning_progress column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'breathing_skills_learning_progress'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "breathing_skills_learning_progress" jsonb DEFAULT '{}'::jsonb NOT NULL;
    END IF;

    -- Add planar_aptitude column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'planar_aptitude'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "planar_aptitude" jsonb DEFAULT '{}'::jsonb NOT NULL;
    END IF;

    -- Add relations column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'relations'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "relations" jsonb DEFAULT '{}'::jsonb NOT NULL;
    END IF;

    -- Add traits column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'traits'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "traits" jsonb DEFAULT '[]'::jsonb NOT NULL;
    END IF;

    -- Add inventory_size column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'inventory_size'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "inventory_size" jsonb DEFAULT '{"base": 20, "bonus": 0}'::jsonb NOT NULL;
    END IF;

    -- Add stat_tracker column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'stat_tracker'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "stat_tracker" integer DEFAULT 0 NOT NULL;
    END IF;

    -- Add ab_guage column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'ab_guage'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "ab_guage" integer DEFAULT 0 NOT NULL;
    END IF;

    -- Rename attributes to attribute if it exists (schema expects attribute, not attributes)
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'attributes'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'attribute'
    ) THEN
        ALTER TABLE "characters" RENAME COLUMN "attributes" TO "attribute";
    END IF;

    -- If attributes doesn't exist and attribute doesn't exist, create attribute
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'attribute'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'characters' AND column_name = 'attributes'
    ) THEN
        ALTER TABLE "characters" ADD COLUMN "attribute" jsonb DEFAULT '{}'::jsonb NOT NULL;
    END IF;

END $$;

