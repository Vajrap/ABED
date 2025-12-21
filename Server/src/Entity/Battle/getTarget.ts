import {
  ATTRIBUTE_KEYS,
  ELEMENT_KEYS,
  type AttributeKey,
  type ElementKey,
} from "src/InterFacesEnumsAndTypes/Enums";
import type { Character } from "../Character/Character";
import { BuffEnum, DebuffEnum } from "../BuffsAndDebuffs/enum";
import { rollTwenty } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";
import { TraitEnum } from "../Trait/enum";

export function getTarget(
  actor: Character,
  actorParty: Character[],
  enemyParty: Character[],
  targetType: "ally" | "enemy" | "any" = "any",
): TargetSelector {
  return new TargetSelector(actor, actorParty, enemyParty, targetType);
}

class TargetSelector {
  actor: Character;
  actorParty: Character[];
  enemyParty: Character[];
  targetType: "ally" | "enemy" | "any" = "any";
  possibleTargets: Character[];
  scope: "one" | "many" | "all" = "one";
  row: "any" | "frontOnly" | "backOnly" | "frontFirst" | "backFirst" = "any";
  rowPreference: "front" | "back" | "equal" = "front"; // Weight preference when both rows available
  type: {
    direction: "least" | "most";
    target: "currentHP" | "currentMP" | "currentSP" | "currentHPPercentage" | "currentMPPercentage" | "currentSPPercentage" | AttributeKey | ElementKey;
  } = {
    direction: "least",
    target: "currentHP",
  };
  tauntCount: boolean = true;
  skipHiding: boolean = false;
  deadTarget: "include" | "exclude" | "only" = "exclude";
  constructor(actor: Character, actorParty: Character[], enemyParty: Character[], targetType: "ally" | "enemy" | "any" = "any") {
    this.actor = actor;
    this.actorParty = actorParty;
    this.enemyParty = enemyParty;
    this.targetType = targetType;
    this.possibleTargets = this.getPossibleTargets();
  }

  getPossibleTargets(): Character[] {
    const charmed = this.actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.charmed)?.value ? true : false;
    const canResistCharm = rollTwenty().total + statMod(this.actor.attribute.getTotal("willpower")) > 15;
    
    // If charmed and can't resist, target wrong party
    const targetWrongParty = charmed && !canResistCharm;
    
    if (this.targetType === "ally") {
      // Want to target allies: if charmed and can't resist, target enemies instead
      return targetWrongParty ? this.enemyParty : this.actorParty;
    } else if (this.targetType === "enemy") {
      // Want to target enemies: if charmed and can't resist, target allies instead
      return targetWrongParty ? this.actorParty : this.enemyParty;
    } else {
      // "any" - return all characters
      return [...this.actorParty, ...this.enemyParty];
    }
  }

  // Scoping Methods
  from(row: "any" | "frontOnly" | "backOnly" | "frontFirst" | "backFirst") {
    this.row = row;
    return this;
  }

  preferRow(preference: "front" | "back" | "equal" = "front") {
    this.rowPreference = preference;
    return this;
  }

  except(characters: Character[]) {
    this.possibleTargets = this.possibleTargets.filter(
      (target) => !characters.includes(target),
    );
    return this;
  }

  byPassTaunt() {
    this.tauntCount = false;
    return this;
  }

  byPassHiding() {
    this.skipHiding = true;
    return this;
  }

  with(
    sort: "least" | "most",
    target: "currentHP" | "currentMP" | "currentSP" | "currentHPPercentage" | "currentMPPercentage" | "currentSPPercentage" | AttributeKey | ElementKey,
  ) {
    this.type.direction = sort;
    this.type.target = target;
    return this;
  }

  witBuff(buff: BuffEnum) {
    this.possibleTargets = this.possibleTargets.filter((target) => {
      const entry = target.buffsAndDebuffs.buffs.entry.get(buff);
      return entry !== undefined;
    });
    return this;
  }

  withDebuff(debuff: DebuffEnum) {
    this.possibleTargets = this.possibleTargets.filter((target) => {
      const entry = target.buffsAndDebuffs.debuffs.entry.get(debuff);
      return entry !== undefined;
    });
    return this;
  }

  withTrait(trait: TraitEnum) {
    this.possibleTargets = this.possibleTargets.filter((target) => {
      return target.traits.get(trait) !== undefined;
    });
    return this;
  }

  withAptitudeEqualToOrOver(aptitude: number) {
    this.possibleTargets = this.possibleTargets.filter((target) => {
      return target.planarAptitude.aptitude > aptitude;
    });
    return this;
  }

  withAptitudeEqualToOrUnder(aptitude: number) {
    this.possibleTargets = this.possibleTargets.filter((target) => {
      return target.planarAptitude.aptitude < aptitude;
    });
    return this;
  }

  withAptitudeBetween(min: number, max: number) {
    this.possibleTargets = this.possibleTargets.filter((target) => {
      return (
        target.planarAptitude.aptitude >= min &&
        target.planarAptitude.aptitude <= max
      );
    });
    return this;
  }

  dead(deadTarget: "include" | "exclude" | "only" = "include") {
    this.deadTarget = deadTarget;
    return this;
  }

  // Execution Methods - These are the only three methods that return targets
  one(): Character | undefined {
    if (this.possibleTargets.length === 0) {
      return undefined;
    }

    // Apply filters FIRST
    const filtered = this.getFilteredTargets();

    if (filtered.length === 0) {
      return undefined;
    }

    if (filtered.length === 1) {
      return filtered[0];
    }

    // Challenge/Challenged mechanic: Prioritize challenge target, bypass taunt
    // If actor has Challenger buff, target enemy with Challenged debuff
    // If actor has Challenged debuff, target enemy with Challenger buff
    const actorHasChallenger = this.actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.challenger)?.value && this.actor.buffsAndDebuffs.buffs.entry.get(BuffEnum.challenger)!.value > 0;
    const actorHasChallenged = this.actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.challenged)?.value && this.actor.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.challenged)!.value > 0;
    
    if (actorHasChallenger) {
      // Actor has Challenger buff - look for enemy with Challenged debuff
      const challengedTargets = filtered.filter((target) => {
        const challenged = target.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.challenged);
        return challenged !== undefined && challenged.value > 0;
      });
      if (challengedTargets.length > 0) {
        // Return random from challenged targets (bypass taunt)
        return challengedTargets[Math.floor(Math.random() * challengedTargets.length)];
      }
    } else if (actorHasChallenged) {
      // Actor has Challenged debuff - look for enemy with Challenger buff
      const challengerTargets = filtered.filter((target) => {
        const challenger = target.buffsAndDebuffs.buffs.entry.get(BuffEnum.challenger);
        return challenger !== undefined && challenger.value > 0;
      });
      if (challengerTargets.length > 0) {
        // Return random from challenger targets (bypass taunt)
        return challengerTargets[Math.floor(Math.random() * challengerTargets.length)];
      }
    }

    // Check for taunt targets AFTER filtering (and after challenge check)
    let selectedTarget: Character | undefined;
    if (this.tauntCount) {
      const tauntingTargets = filtered.filter((target) => {
        return (
          target.buffsAndDebuffs.buffs.entry.get(BuffEnum.taunt) !==
          undefined
        );
      });
      if (tauntingTargets.length > 0) {
        selectedTarget = tauntingTargets[
          Math.floor(Math.random() * tauntingTargets.length)
        ];
      }
    }

    // If no taunt target, select normally
    if (!selectedTarget) {
      if (this.type.direction && this.type.target) {
        selectedTarget = this.selectByType(filtered, 1)[0];
      } else {
        selectedTarget = this.selectRandomOne(filtered);
      }
    }

    // Guardian mechanic: Redirect attacks to Guardian if one exists in the target's party
    // Check if selected target's party has a Guardian character AFTER selection
    if (selectedTarget) {
      // Determine which party contains the selected target
      const targetParty = this.actorParty.includes(selectedTarget) 
        ? this.actorParty 
        : this.enemyParty;
      
      // Find any Guardian character in that party
      const guardianCharacter = targetParty.find((char) => {
        const guardianBuff = char.buffsAndDebuffs.buffs.entry.get(BuffEnum.guardian);
        return guardianBuff !== undefined && guardianBuff.value > 0;
      });
      
      // Guardian must be in the filtered list (same target type) and not be the selected target
      if (guardianCharacter && guardianCharacter.id !== selectedTarget.id && filtered.includes(guardianCharacter)) {
        // Redirect to guardian and trigger the effect
        // Grant +1 earth resource to guardian
        guardianCharacter.resources.earth += 1;
        
        // Note: Guardian buff is not consumed here - it will be removed by the turn resolver
        
        // Return the guardian as the target
        return guardianCharacter;
      }
    }

    return selectedTarget;
  }

  // TODO: This method seems to allow picking the same target multiple times by default, needed to fix, might need a new arg, 'filterSelected: boolean = true'
  many(count: number): Character[] {
    const filtered = this.getFilteredTargets();
    if (filtered.length === 0) {
      return [];
    }

    const maxCount = Math.min(count, filtered.length);

    // Prioritize taunting targets if tauntCount is enabled
    if (this.tauntCount) {
      const tauntingTargets = filtered.filter((target) => {
        return (
          target.buffsAndDebuffs.buffs.entry.get(BuffEnum.taunt) !==
          undefined
        );
      });

      if (tauntingTargets.length > 0) {
        // If we want more targets than we have taunting, fill the rest
        const remainingSlots = Math.max(0, maxCount - tauntingTargets.length);
        const nonTauntingTargets = filtered.filter((target) => {
          return (
            target.buffsAndDebuffs.buffs.entry.get(BuffEnum.taunt) ===
            undefined
          );
        });

        if (this.type.direction && this.type.target) {
          // Use type-based selection for non-taunting targets
          const selectedNonTaunting = this.selectByType(
            nonTauntingTargets,
            remainingSlots,
          );
          return [...tauntingTargets, ...selectedNonTaunting];
        } else {
          // Use random selection for non-taunting targets
          const selectedNonTaunting = this.selectRandomMany(
            nonTauntingTargets,
            remainingSlots,
          );
          return [...tauntingTargets, ...selectedNonTaunting];
        }
      }
    }

    // No taunting targets or tauntCount disabled, proceed normally
    if (this.type.direction && this.type.target) {
      return this.selectByType(filtered, maxCount);
    }

    return this.selectRandomMany(filtered, maxCount);
  }

  all(): Character[] {
    const filtered = this.getFilteredTargets();

    // Prioritize taunting targets if enabled
    if (this.tauntCount && filtered.length > 0) {
      const tauntingTargets = filtered.filter((target) => {
        return (
          target.buffsAndDebuffs.buffs.entry.get(BuffEnum.taunt) !==
          undefined
        );
      });

      if (tauntingTargets.length > 0) {
        const nonTauntingTargets = filtered.filter((target) => {
          return (
            target.buffsAndDebuffs.buffs.entry.get(BuffEnum.taunt) ===
            undefined
          );
        });
        return [...tauntingTargets, ...nonTauntingTargets];
      }
    }

    return filtered;
  }

  // Private helper methods
  private getFilteredTargets(): Character[] {
    let targets = [...this.possibleTargets];

    // Apply all filters in order
    targets = this.filterDeadTargets(targets);
    targets = this.filterByRow(targets);
    targets = this.filterByHiding(targets);

    return targets;
  }

  private filterDeadTargets(targets: Character[]): Character[] {
    if (this.deadTarget === "include") {
      return targets; // Include all
    }
    if (this.deadTarget === "only") {
      return targets.filter((target) => target.vitals.isDead);
    }
    // 'exclude' is default
    return targets.filter((target) => !target.vitals.isDead);
  }

  private filterByRow(targets: Character[]): Character[] {
    if (this.row === "any") {
      return targets;
    }

    const frontRow = targets.filter((target) => target.position <= 2);
    const backRow = targets.filter((target) => target.position > 2);

    switch (this.row) {
      case "frontOnly":
        return frontRow;
      case "backOnly":
        return backRow;
      case "frontFirst":
        return frontRow.length > 0 ? frontRow : backRow;
      case "backFirst":
        return backRow.length > 0 ? backRow : frontRow;
      default:
        return targets;
    }
  }

  private getWeightedRandomTarget(targets: Character[]): Character {
    if (targets.length === 0) {
      throw new Error("No targets available for weighted selection");
    }

    // Separate by row
    const frontRow = targets.filter((target) => target.position <= 2);
    const backRow = targets.filter((target) => target.position > 2);

    // If only one row has targets, just return random from that row
    if (frontRow.length === 0)
      return backRow[Math.floor(Math.random() * backRow.length)]!;
    if (backRow.length === 0)
      return frontRow[Math.floor(Math.random() * frontRow.length)]!;

    // Determine weights based on preference
    let frontWeight: number;
    let backWeight: number;

    switch (this.rowPreference) {
      case "front":
        // Front row has 75% chance, back row 25%
        frontWeight = 0.75;
        backWeight = 0.25;
        break;
      case "back":
        // Back row has 75% chance, front row 25%
        frontWeight = 0.25;
        backWeight = 0.75;
        break;
      case "equal":
      default:
        // Equal weights
        frontWeight = 0.5;
        backWeight = 0.5;
        break;
    }

    // Weight the selection
    const random = Math.random();
    if (random < frontWeight) {
      return frontRow[Math.floor(Math.random() * frontRow.length)]!;
    } else {
      return backRow[Math.floor(Math.random() * backRow.length)]!;
    }
  }

  private filterByHiding(targets: Character[]): Character[] {
    if (this.skipHiding) {
      return targets;
    }

    // If we need to consider hiding, do it during selection, not filtering
    // This allows us to try multiple targets
    return targets;
  }

  private selectByType(targets: Character[], count: number): Character[] {
    // Separate taunting and non-taunting targets
    let tauntingTargets: Character[] = [];
    let nonTauntingTargets: Character[] = [];

    if (this.tauntCount) {
      tauntingTargets = targets.filter((target) => {
        return (
          target.buffsAndDebuffs.buffs.entry.get(BuffEnum.taunt) !==
          undefined
        );
      });
      nonTauntingTargets = targets.filter(
        (target) => !tauntingTargets.includes(target),
      );
    } else {
      nonTauntingTargets = targets;
    }

    // Sort non-taunting targets by type
    const sortMultiplier = this.type.direction === "least" ? 1 : -1;

    nonTauntingTargets = this.sortTargets(nonTauntingTargets, sortMultiplier);

    // Combine: taunting first, then sorted
    const allTargets = [...tauntingTargets, ...nonTauntingTargets];

    // Now select with hiding checks
    const selected: Character[] = [];
    const attempted = new Set<Character>();

    for (let i = 0; i < count && selected.length < targets.length; i++) {
      // Try each target in order until we get one that passes hiding check
      for (const candidate of allTargets) {
        if (attempted.has(candidate)) continue;
        attempted.add(candidate);

        if (this.canPerceive(candidate)) {
          selected.push(candidate);
          break;
        }
      }
    }

    return selected;
  }

  private sortTargets(targets: Character[], multiplier: number): Character[] {
    const sorted = [...targets];

    sorted.sort((a, b) => {
      let valueA: number;
      let valueB: number;

      if (this.type.target === "currentHP") {
        valueA = a.vitals.hp.current;
        valueB = b.vitals.hp.current;
      } else if (this.type.target === "currentMP") {
        valueA = a.vitals.mp.current;
        valueB = b.vitals.mp.current;
      } else if (this.type.target === "currentSP") {
        valueA = a.vitals.sp.current;
        valueB = b.vitals.sp.current;
      } else if (this.type.target === "currentHPPercentage") {
        valueA = a.vitals.hp.current / a.vitals.hp.max;
        valueB = b.vitals.hp.current / b.vitals.hp.max;
      } else if (this.type.target === "currentMPPercentage") {
        valueA = a.vitals.mp.current / a.vitals.mp.max;
        valueB = b.vitals.mp.current / b.vitals.mp.max;
      } else if (this.type.target === "currentSPPercentage") {
        valueA = a.vitals.sp.current / a.vitals.sp.max;
        valueB = b.vitals.sp.current / b.vitals.sp.max;
      } else if (ATTRIBUTE_KEYS.includes(this.type.target as AttributeKey)) {
        valueA = a.attribute.getTotal(this.type.target as AttributeKey);
        valueB = b.attribute.getTotal(this.type.target as AttributeKey);
      } else if (ELEMENT_KEYS.includes(this.type.target as ElementKey)) {
        valueA = a.elements.getTotal(this.type.target as ElementKey);
        valueB = b.elements.getTotal(this.type.target as ElementKey);
      } else {
        valueA = 0;
        valueB = 0;
      }

      return (valueA - valueB) * multiplier;
    });

    return sorted;
  }

  private selectRandomOne(targets: Character[]): Character {
    if (targets.length === 0) {
      throw new Error("No targets available");
    }

    // If row is "any", use weighted selection based on rowPreference
    if (this.row === "any") {
      return this.getWeightedRandomTarget(targets);
    }

    // Otherwise, shuffle to randomize
    const shuffled = this.shuffleArray(targets);

    const attempted = new Set<Character>();

    for (const candidate of shuffled) {
      if (attempted.has(candidate)) continue;
      attempted.add(candidate);

      if (this.canPerceive(candidate)) {
        return candidate;
      }
    }

    // If all attempts failed, just return the first one anyway
    return targets[0]!;
  }

  private selectRandomMany(targets: Character[], count: number): Character[] {
    if (targets.length === 0) return [];

    // Shuffle to randomize
    const shuffled = this.shuffleArray(targets);

    const selected: Character[] = [];
    const attempted = new Set<Character>();

    for (let i = 0; i < count && attempted.size < targets.length; i++) {
      for (const candidate of shuffled) {
        if (attempted.has(candidate)) continue;
        attempted.add(candidate);

        if (this.canPerceive(candidate)) {
          selected.push(candidate);
          break;
        }
      }
    }

    return selected;
  }

  private canPerceive(target: Character): boolean {
    if (this.skipHiding) return true;

    const hiding = target.buffsAndDebuffs.buffs.entry.get(
      BuffEnum.hiding,
    )?.value;

    if (!hiding || hiding <= 0) return true;

    // Check if target has taunt - taunt overrides hiding
    if (
      target.buffsAndDebuffs.buffs.entry.get(BuffEnum.taunt) !== undefined
    ) {
      return true;
    }

    // Perception check
    const perception =
      rollTwenty().total + statMod(this.actor.attribute.getTotal("willpower"));
    return perception > 15;
  }

  private shuffleArray(array: Character[]): Character[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
    }
    return shuffled;
  }
}
