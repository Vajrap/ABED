import type { Character } from "src/Entity/Character/Character";
import { BareHandId, type Weapon } from "src/Entity/Item";
import { SpellbladeSkillId } from "src/Entity/Skill/enums";

/**
 * Calculate Planar Edge-like damage for Spellblade skills
 * 
 * For weapons: Extracts base physical damage dice from weapon, rolls with planar stat, uses arcane damage type
 * For bare hand: Finds Planar Edge skill level in active deck, uses appropriate dice based on level, rolls with planar stat
 * 
 * @param actor The character performing the attack
 * @param weapon The weapon being used (or bare hand)
 * @returns Object with baseDamage (just dice + planar mod, no skill multiplier), hit, and crit values
 */
export function getPlanarEdgeLikeDamage(
  actor: Character,
  weapon: Weapon,
): {
  baseDamage: number;
  hit: number;
  crit: number;
} {
  const isBareHand = weapon.id === BareHandId.BareHand;

  if (isBareHand) {
    // Find Planar Edge skill level in active deck
    const planarEdgeSkill = actor.activeSkills.find(
      (skill) => skill.id === SpellbladeSkillId.PlanarEdge,
    );
    const skillLevel = planarEdgeSkill?.level || 1;

    // Determine dice based on skill level (1d6, 1d6, 1d8, 1d8, 2d4 for levels 1-5)
    let diceConfig: { dice: number; face: number };
    if (skillLevel === 1) diceConfig = { dice: 1, face: 6 };
    else if (skillLevel === 2) diceConfig = { dice: 1, face: 6 };
    else if (skillLevel === 3) diceConfig = { dice: 1, face: 8 };
    else if (skillLevel === 4) diceConfig = { dice: 1, face: 8 };
    else diceConfig = { dice: 2, face: 4 }; // level 5+

    // Roll damage dice with planar stat (already includes planar mod)
    const baseDamage = actor.roll({
      amount: diceConfig.dice,
      face: diceConfig.face,
      stat: "planar",
      applyBlessCurse: false,
    });

    // Hit/Crit rolls
    const hit = actor.rollTwenty({stat: 'dexterity'});
    const crit = actor.rollTwenty({stat: 'luck'});

    return { baseDamage, hit, crit };
  } else {
    // Extract base physical damage dice from weapon
    const weaponDice = weapon.weaponData.damage.physicalDamageDice;
    const hitStat = weapon.weaponData.damage.physicalHitStat;
    const critStat = weapon.weaponData.damage.physicalCritStat;

    // Roll damage dice with planar stat (already includes planar mod)
    // Note: We use planar stat instead of the weapon's physicalDamageStat
    const baseDamage = actor.roll({
      amount: weaponDice.dice,
      face: weaponDice.face,
      stat: "planar",
      applyBlessCurse: false,
    });

    // Hit/Crit rolls
    const hit = hitStat.reduce((acc, stat) => acc + actor.rollTwenty({stat: stat}), 0) / hitStat.length;
    const crit = critStat.reduce((acc, stat) => acc + actor.rollTwenty({stat: stat}), 0) / critStat.length;

    return { baseDamage, hit, crit };
  }
}

