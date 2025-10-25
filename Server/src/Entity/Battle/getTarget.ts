// getTargetFromList().one().randomly()
// getTargetFromList().many(3).withLessCurrentHp()

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
import { t } from "elysia";

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
  row: "any" | "frontOnly" | "backOnly" | "frontPrefer" | "backPrefer" = "any";
  manyCount: number = 0;
  type: "random" | "leastHp" | "leastMp" = "random";
  tauntCount: boolean = true;
  skipHiding: boolean = false;
  constructor(actor: Character, possibleTargets: Character[]) {
    this.actor = actor;
    this.possibleTargets = possibleTargets;
  }

  // Scoping
  one() {
    this.scope = "one";
    return this;
  }

  many(amount: number) {
    this.scope = "many";
    this.manyCount = amount;
    return this;
  }

  all(): Character[] {
    return this.possibleTargets;
  }

  from(row: "any" | "frontOnly" | "backOnly" | "frontPrefer" | "backPrefer") {
    this.row = row;
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

  // Targeting, return Character[];
  randomly(): Character[] {
    this.returnIfNoTarget();
    
    // Filter targets based on row preference
    const filteredTargets = this.filterTargetsByRow();
    
    if (filteredTargets.length === 0) {
      return [];
    }
    
    // Temporarily replace possibleTargets with filtered ones for random selection
    const originalTargets = this.possibleTargets;
    this.possibleTargets = filteredTargets;
    
    let result: Character[] = [];
    
    switch (this.scope) {
      case "one":
        result = [this.getARandomTarget()];
        break;
      case "many":
        for (let i = 1; i <= this.manyCount; i++) {
          if (this.possibleTargets.length === 0) {
            break;
          }
          const target = this.getARandomTarget();
          this.possibleTargets = this.possibleTargets.filter(
            (possibleTarget) => possibleTarget !== target,
          );
          result.push(target);
        }
        break;
      case "all":
        result = this.possibleTargets;
        break;
    }
    
    // Restore original targets
    this.possibleTargets = originalTargets;
    
    return result;
  }

  with(
    sort: "less" | "most",
    target: "currentHP" | "currentMP" | "currentSP" | AttributeKey | ElementKey,
  ): Character[] {
    this.returnIfNoTarget();

    // Step 1: Filter targets by row preference
    const rowFilteredTargets = this.filterTargetsByRow();
    
    if (rowFilteredTargets.length === 0) {
      return [];
    }

    // Step 2: Handle taunting targets
    let tauntingTargets: Character[] = [];
    let nonTauntingTargets: Character[] = rowFilteredTargets;

    if (this.tauntCount) {
      tauntingTargets = rowFilteredTargets.filter((target) => {
        const taunt = target.buffsAndDebuffs.entry.get(
          BuffsAndDebuffsEnum.taunt,
        );
        return taunt !== undefined;
      });

      if (tauntingTargets.length > 0) {
        // Shuffle taunting targets randomly to avoid always picking the same one
        tauntingTargets = this.shuffleArray(tauntingTargets);

        nonTauntingTargets = rowFilteredTargets.filter(
          (target) => !tauntingTargets.includes(target),
        );
      }
    }

    // Step 2: Sort the non-taunting targets
    const sortMultiplier = sort === "less" ? 1 : -1;

    if (target === "currentHP") {
      nonTauntingTargets.sort(
        (a, b) => (a.vitals.hp.current - b.vitals.hp.current) * sortMultiplier,
      );
    } else if (target === "currentMP") {
      nonTauntingTargets.sort(
        (a, b) => (a.vitals.mp.current - b.vitals.mp.current) * sortMultiplier,
      );
    } else if (target === "currentSP") {
      nonTauntingTargets.sort(
        (a, b) => (a.vitals.sp.current - b.vitals.sp.current) * sortMultiplier,
      );
    } else if (ATTRIBUTE_KEYS.includes(target as AttributeKey)) {
      nonTauntingTargets.sort(
        (a, b) =>
          (a.attribute.getTotal(target as AttributeKey) -
            b.attribute.getTotal(target as AttributeKey)) *
          sortMultiplier,
      );
    } else if (ELEMENT_KEYS.includes(target as ElementKey)) {
      nonTauntingTargets.sort(
        (a, b) =>
          (a.elements.getTotal(target as ElementKey) -
            b.elements.getTotal(target as ElementKey)) *
          sortMultiplier,
      );
    }

    // Step 3: Combine taunting (priority) + sorted targets
    const orderedTargets =
      tauntingTargets.length > 0
        ? [...tauntingTargets, ...nonTauntingTargets]
        : nonTauntingTargets;

    // Step 4: Select targets based on scope and handle hiding
    let selectedTargets: Character[] = [];
    const availableTargets = [...orderedTargets];

    switch (this.scope) {
      case "one":
        if (availableTargets.length > 0) {
          const selected = this.selectTargetWithHidingCheck(availableTargets);
          selectedTargets = [selected];
        }
        break;

      case "many":
        for (
          let i = 0;
          i < this.manyCount && availableTargets.length > 0;
          i++
        ) {
          const selected = this.selectTargetWithHidingCheck(availableTargets);
          selectedTargets.push(selected);
          // Remove from available to avoid duplicates
          const index = availableTargets.indexOf(selected);
          if (index > -1) {
            availableTargets.splice(index, 1);
          }
        }
        break;

      case "all":
        selectedTargets = orderedTargets;
        break;
    }

    return selectedTargets;
  }

  allWith(buffOrDebuff: BuffsAndDebuffsEnum): Character[] {
    this.returnIfNoTarget();

    // First filter by row preference, then by buff/debuff
    const rowFilteredTargets = this.filterTargetsByRow();
    
    return rowFilteredTargets.filter((target) => {
      const entry = target.buffsAndDebuffs.entry.get(buffOrDebuff);
      return entry !== undefined;
    });
  }

  private selectTargetWithHidingCheck(targets: Character[]): Character {
    // Always return a target if there's at least one
    if (targets.length === 0) {
      throw new Error("selectTargetWithHidingCheck called with empty array");
    }

    let target = targets[0]!;

    // Check hiding only if not bypassed and there are alternative targets
    if (!this.skipHiding && targets.length > 1) {
      const hiding = target.buffsAndDebuffs.entry.get(
        BuffsAndDebuffsEnum.hiding,
      )?.value;

      if (hiding && hiding > 0) {
        const perception =
          rollTwenty().total +
          statMod(this.actor.attribute.getTotal("willpower"));

        // If perception check fails, try next target
        if (perception <= 15) {
          // Check if this target has taunt - if so, don't skip it
          const hasTaunt = target.buffsAndDebuffs.entry.get(
            BuffsAndDebuffsEnum.taunt,
          ) !== undefined;
          
          if (hasTaunt) {
            // Taunt overrides hiding - return the taunting target even if hiding check fails
            return target;
          } else {
            // Try the next available target instead
            return this.selectTargetWithHidingCheck(targets.slice(1));
          }
        }
      }
    }

    // Return target if: hiding check passed, no hiding, only 1 target left, or skipHiding
    return target;
  }

  dead(): Character[] {
    this.returnIfNoTarget();
    
    // First filter by row preference, then by dead status
    const rowFilteredTargets = this.filterTargetsByRow();
    
    return rowFilteredTargets.filter(
      (target) => target.vitals.isDead,
    );
  }

  private getARandomTarget(): Character {
    // Handle taunting targets first
    if (this.tauntCount) {
      const taunting = this.possibleTargets.filter((target) => {
        const taunt = target.buffsAndDebuffs.entry.get(
          BuffsAndDebuffsEnum.taunt,
        );
        return taunt !== undefined;
      });
      if (taunting.length > 0) {
        return taunting[Math.floor(Math.random() * taunting.length)]!;
      }
    }

    // If only one target, return it regardless of hiding
    if (this.possibleTargets.length === 1) {
      return this.possibleTargets[0]!;
    }

    // Try to find a non-hiding target or one we can perceive
    const maxAttempts = this.possibleTargets.length;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const target =
        this.possibleTargets[
          Math.floor(Math.random() * this.possibleTargets.length)
        ]!;

      if (!this.skipHiding) {
        const hiding = target.buffsAndDebuffs.entry.get(
          BuffsAndDebuffsEnum.hiding,
        )?.value;

        if (hiding && hiding > 0) {
          const perception =
            rollTwenty().total +
            statMod(this.actor.attribute.getTotal("willpower"));

          if (perception > 15) {
            return target;
          }
          // Failed perception, try again with a different target
          attempts++;
          continue;
        }
      }

      return target;
    }

    // If all attempts failed, just return a random target anyway
    return this.possibleTargets[
      Math.floor(Math.random() * this.possibleTargets.length)
    ]!;
  }

  private shuffleArray(array: Character[]): Character[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
    }
    return shuffled;
  }

  private filterTargetsByRow(): Character[] {
    if (this.row === "any") {
      return this.possibleTargets;
    }

    const frontRow = this.possibleTargets.filter(target => target.position <= 2);
    const backRow = this.possibleTargets.filter(target => target.position > 2);

    switch (this.row) {
      case "frontOnly":
        return frontRow;
      case "backOnly":
        return backRow;
      case "frontPrefer":
        // If front row has targets, use them; otherwise fall back to back row
        return frontRow.length > 0 ? frontRow : backRow;
      case "backPrefer":
        // If back row has targets, use them; otherwise fall back to front row
        return backRow.length > 0 ? backRow : frontRow;
      default:
        return this.possibleTargets;
    }
  }

  private returnIfNoTarget() {
    if (this.possibleTargets.length === 0) {
      return [];
    }
  }
}
