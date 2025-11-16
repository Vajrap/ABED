import {
  ATTRIBUTE_KEYS,
  ELEMENT_KEYS,
  type AttributeKey,
  type ElementKey,
} from "src/InterFacesEnumsAndTypes/Enums";
import type { Character } from "../Character/Character";
import { BuffsAndDebuffsEnum } from "../BuffsAndDebuffs/enum";
import { rollTwenty } from "src/Utils/Dice";
import { statMod } from "src/Utils/statMod";
import { TraitEnum } from "../Trait/enum";

export function getTarget(
  actor: Character,
  targets: Character[],
): TargetSelector {
  return new TargetSelector(actor, targets);
}

class TargetSelector {
  actor: Character;
  possibleTargets: Character[];
  scope: "one" | "many" | "all" = "one";
  row: "any" | "frontOnly" | "backOnly" | "frontFirst" | "backFirst" = "any";
  rowPreference: "front" | "back" | "equal" = "front"; // Weight preference when both rows available
  type: {
    direction: "least" | "most";
    target: "currentHP" | "currentMP" | "currentSP" | AttributeKey | ElementKey;
  } = {
    direction: "least",
    target: "currentHP",
  };
  tauntCount: boolean = true;
  skipHiding: boolean = false;
  deadTarget: "include" | "exclude" | "only" = "exclude";
  constructor(actor: Character, possibleTargets: Character[]) {
    this.actor = actor;
    this.possibleTargets = possibleTargets;
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
    target: "currentHP" | "currentMP" | "currentSP" | AttributeKey | ElementKey,
  ) {
    this.type.direction = sort;
    this.type.target = target;
    return this;
  }

  witBuff(buffOrDebuff: BuffsAndDebuffsEnum) {
    this.possibleTargets = this.possibleTargets.filter((target) => {
      const entry = target.buffsAndDebuffs.entry.get(buffOrDebuff);
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

    // Check for taunt targets AFTER filtering
    if (this.tauntCount) {
      const tauntingTargets = filtered.filter((target) => {
        return (
          target.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.taunt) !==
          undefined
        );
      });
      if (tauntingTargets.length > 0) {
        return tauntingTargets[
          Math.floor(Math.random() * tauntingTargets.length)
        ];
      }
    }

    // For "one", we select based on type configuration or random
    if (this.type.direction && this.type.target) {
      return this.selectByType(filtered, 1)[0]!;
    }

    return this.selectRandomOne(filtered);
  }

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
          target.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.taunt) !==
          undefined
        );
      });

      if (tauntingTargets.length > 0) {
        // If we want more targets than we have taunting, fill the rest
        const remainingSlots = Math.max(0, maxCount - tauntingTargets.length);
        const nonTauntingTargets = filtered.filter((target) => {
          return (
            target.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.taunt) ===
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
          target.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.taunt) !==
          undefined
        );
      });

      if (tauntingTargets.length > 0) {
        const nonTauntingTargets = filtered.filter((target) => {
          return (
            target.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.taunt) ===
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
          target.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.taunt) !==
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

    const hiding = target.buffsAndDebuffs.entry.get(
      BuffsAndDebuffsEnum.hiding,
    )?.value;

    if (!hiding || hiding <= 0) return true;

    // Check if target has taunt - taunt overrides hiding
    if (
      target.buffsAndDebuffs.entry.get(BuffsAndDebuffsEnum.taunt) !== undefined
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
