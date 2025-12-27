-- Truncate characters table to clear old data format
-- This migration is part of the skills refactor where activeSkills and conditionalSkills
-- changed from objects [{id, level, exp}] to simple ID arrays [id1, id2, ...]
-- All character data will be cleared to start fresh with the new format

TRUNCATE TABLE characters CASCADE;

