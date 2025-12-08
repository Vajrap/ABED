/**
 * Sub-selection options for actions that require parameters
 * These match the backend enum values
 */

// Attribute keys for Train Attribute
export const ATTRIBUTE_OPTIONS = [
  { id: "charisma", name: "Charisma" },
  { id: "luck", name: "Luck" },
  { id: "intelligence", name: "Intelligence" },
  { id: "leadership", name: "Leadership" },
  { id: "vitality", name: "Vitality" },
  { id: "willpower", name: "Willpower" },
  { id: "planar", name: "Planar" },
  { id: "control", name: "Control" },
  { id: "dexterity", name: "Dexterity" },
  { id: "agility", name: "Agility" },
  { id: "strength", name: "Strength" },
  { id: "endurance", name: "Endurance" },
] as const;

// Proficiency keys for Train Proficiency (matches backend PROFICIENCY_KEYS)
export const PROFICIENCY_OPTIONS = [
  { id: "bareHand", name: "Bare Hand" },
  { id: "sword", name: "Sword" },
  { id: "blade", name: "Blade" },
  { id: "dagger", name: "Dagger" },
  { id: "spear", name: "Spear" },
  { id: "bow", name: "Bow" },
  { id: "axe", name: "Axe" },
  { id: "hammer", name: "Hammer" },
  { id: "orb", name: "Orb" },
  { id: "shield", name: "Shield" },
  { id: "staff", name: "Staff" },
  { id: "book", name: "Book" },
  { id: "wand", name: "Wand" },
] as const;

// Artisan keys for Train Artisan
export const ARTISAN_OPTIONS = [
  { id: "agriculture", name: "Agriculture" },
  { id: "mining", name: "Mining" },
  { id: "smithing", name: "Smithing" },
  { id: "woodCutting", name: "Wood Cutting" },
  { id: "carpentry", name: "Carpentry" },
  { id: "foraging", name: "Foraging" },
  { id: "weaving", name: "Weaving" },
  { id: "skinning", name: "Skinning" },
  { id: "tanning", name: "Tanning" },
  { id: "jewelry", name: "Jewelry" },
  { id: "cooking", name: "Cooking" },
  { id: "alchemy", name: "Alchemy" },
  { id: "enchanting", name: "Enchanting" },
  { id: "fishing", name: "Fishing" },
  { id: "masonry", name: "Masonry" },
  { id: "tailoring", name: "Tailoring" },
  { id: "brewing", name: "Brewing" },
  { id: "performance", name: "Performance" },
  { id: "tinkering", name: "Tinkering" },
  { id: "electrics", name: "Electrics" },
] as const;

// Skill options for Train Skill / Learn Skill
// TODO: This should come from backend/character data - using mock data for now
export const SKILL_OPTIONS = [
  { id: "Basic", name: "Basic Attack" },
  // TODO: Add more skills from character's available skills or skill repository
] as const;

// Book options for Read
// TODO: This should come from backend/character inventory or available books
export const BOOK_OPTIONS = [
  { id: "placeholder", name: "Placeholder Book" },
  // TODO: Add actual book options from character inventory or location
] as const;

// Item options for Craft
// TODO: This should come from backend - character's crafting preferences or available blueprints
export const ITEM_OPTIONS = [
  { id: "placeholder", name: "Placeholder Item" },
  // TODO: Add actual craftable items from character's crafting preferences or location
] as const;

// Organization action options
export const HEAVENS_DECREE_OPTIONS = [
  { id: "Meeting", name: "Meeting" },
  { id: "Join", name: "Join" },
  { id: "Leave", name: "Leave" },
  { id: "Train", name: "Train" },
  { id: "Socialize", name: "Socialize" },
] as const;

export const CHURCH_OF_LAOH_OPTIONS = [
  { id: "Meeting", name: "Meeting" },
  { id: "Join", name: "Join" },
  { id: "Leave", name: "Leave" },
  { id: "Train", name: "Train" },
  { id: "Socialize", name: "Socialize" },
  { id: "Magic Learning", name: "Magic Learning" },
] as const;

export const GREAT_TEMPLE_OF_LAOH_OPTIONS = [
  { id: "Meeting", name: "Meeting" },
  { id: "Train", name: "Train" },
  { id: "Socialize", name: "Socialize" },
] as const;

export const CULT_OF_NIZARITH_OPTIONS = [
  { id: "Join", name: "Join" },
  { id: "Leave", name: "Leave" },
  { id: "Train", name: "Train" },
  { id: "Socialize", name: "Socialize" },
  { id: "Magic Learning", name: "Magic Learning" },
] as const;

export const SHRINE_OPTIONS = [
  { id: "Meeting", name: "Meeting" },
  { id: "Join", name: "Join" },
  { id: "Leave", name: "Leave" },
  { id: "Train", name: "Train" },
  { id: "Socialize", name: "Socialize" },
] as const;

export const MAJOR_SHRINE_OPTIONS = [
  { id: "Meeting", name: "Meeting" },
  { id: "Train", name: "Train" },
  { id: "Socialize", name: "Socialize" },
] as const;

export const KNIGHT_ORDER_OPTIONS = [
  { id: "Join", name: "Join" },
  { id: "Leave", name: "Leave" },
  { id: "Train", name: "Train" },
  { id: "Socialize", name: "Socialize" },
] as const;

export const MAGIC_SCHOOL_OPTIONS = [
  { id: "Join", name: "Join" },
  { id: "Leave", name: "Leave" },
  { id: "Train", name: "Train" },
  { id: "Socialize", name: "Socialize" },
] as const;

export const ARCANE_ACADEMIA_OPTIONS = [
  { id: "Join", name: "Join" },
  { id: "Leave", name: "Leave" },
  { id: "Train", name: "Train" },
  { id: "Socialize", name: "Socialize" },
] as const;

/**
 * Get available options for a sub-selection type
 * @param subSelectionType - The type of sub-selection needed
 * @param characterSkills - Optional character skills map for "skill" sub-selection type
 *                         Format: Record<string, {level: number, exp: number}>
 */
export function getSubSelectionOptions(
  subSelectionType: 
    | "attribute" 
    | "proficiency" 
    | "artisan" 
    | "skill" 
    | "book" 
    | "item"
    | "heavensDecree"
    | "churchOfLaoh"
    | "greatTempleOfLaoh"
    | "cultOfNizarith"
    | "shrine"
    | "majorShrine"
    | "knightOrder"
    | "magicSchool"
    | "arcaneAcademia",
  characterSkills?: Record<string, { level: number; exp: number }>
): { id: string; name: string }[] {
  switch (subSelectionType) {
    case "attribute":
      return ATTRIBUTE_OPTIONS as any;
    case "proficiency":
      return PROFICIENCY_OPTIONS as any;
    case "artisan":
      return ARTISAN_OPTIONS as any;
    case "skill":
      // Use character's skills if provided, otherwise fall back to placeholder
      if (characterSkills && Object.keys(characterSkills).length > 0) {
        return Object.keys(characterSkills).map((skillId) => ({
          id: skillId,
          name: skillId, // TODO: Use L10N for skill names
        }));
      }
      return SKILL_OPTIONS as any;
    case "book":
      return BOOK_OPTIONS as any;
    case "item":
      return ITEM_OPTIONS as any;
    case "heavensDecree":
      return HEAVENS_DECREE_OPTIONS as any;
    case "churchOfLaoh":
      return CHURCH_OF_LAOH_OPTIONS as any;
    case "greatTempleOfLaoh":
      return GREAT_TEMPLE_OF_LAOH_OPTIONS as any;
    case "cultOfNizarith":
      return CULT_OF_NIZARITH_OPTIONS as any;
    case "shrine":
      return SHRINE_OPTIONS as any;
    case "majorShrine":
      return MAJOR_SHRINE_OPTIONS as any;
    case "knightOrder":
      return KNIGHT_ORDER_OPTIONS as any;
    case "magicSchool":
      return MAGIC_SCHOOL_OPTIONS as any;
    case "arcaneAcademia":
      return ARCANE_ACADEMIA_OPTIONS as any;
    default:
      return [];
  }
}

