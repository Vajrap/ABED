import type { Character } from "src/Entity/Character/Character";
import type { NewsContext, News } from "src/Entity/News/News";
import { createNews } from "src/Entity/News/News";
import { BuffEnum, DebuffEnum } from "../../../../BuffsAndDebuffs/enum";
import { NewsSignificance, NewsPropagation } from "../../../../../InterFacesEnumsAndTypes/NewsEnums";
import { GoldId } from "../../../../Item";

/**
 * Handle Religious site actions
 * - Pray action: mood +5, possible blessing/buff
 * - Donate action: gold cost, reputation gain
 */
export function handleReligiousAction(
  character: Character,
  context: NewsContext,
  action: "pray" | "donate",
): News[] {
  const news: News[] = [];

  if (action === "pray") {
    // Apply mood boost
    character.needs.incMood(5);

    // Chance for blessing (20% chance on D20 roll >= 17)
    // Use character.rollTwenty to apply bless/curse automatically
    const rolled = character.rollTwenty({});
    if (rolled >= 17) {
      // Apply permanent blessing buff
      const blessingEntry = character.buffsAndDebuffs.buffs.entry.get(BuffEnum.bless) ?? {
        value: 0,
        counter: 0,
        isPerm: true,
        permValue: 0,
      };
      blessingEntry.isPerm = true;
      // Random quantity - don't apply bless/curse
      blessingEntry.permValue = (blessingEntry.permValue || 0) + character.roll({ amount: 1, face: 3, applyBlessCurse: false }); // 1-3 phases of blessing
      // Can also add battle value if blessing provides combat benefits
      // For now, just permValue for world persistence
      character.buffsAndDebuffs.buffs.entry.set(BuffEnum.bless, blessingEntry);

      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} prayed and received a blessing that will last for ${blessingEntry.permValue} phases.`,
            th: `${character.name?.th || character.name} สวดมนต์และได้รับพรที่จะคงอยู่เป็นเวลา ${blessingEntry.permValue} เฟส`,
          },
          context,
          significance: NewsSignificance.MAJOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
    } else {
      // Small chance for curse on failed prayer (5% chance on roll === 1)
      if (rolled === 1) {
        const curseEntry = character.buffsAndDebuffs.debuffs.entry.get(DebuffEnum.cursed) ?? {
          value: 0,
          counter: 0,
          isPerm: true,
          permValue: 0,
        };
        curseEntry.isPerm = true;
        // Random quantity - don't apply bless/curse
        curseEntry.permValue = (curseEntry.permValue || 0) + character.roll({ amount: 1, face: 2, applyBlessCurse: false }); // 1-2 phases
        character.buffsAndDebuffs.debuffs.entry.set(DebuffEnum.cursed, curseEntry);

        news.push(
          createNews({
            scope: {
              kind: "privateScope",
              characterId: character.id,
            },
            content: {
              en: `${character.name?.en || character.name} prayed but something went wrong. A curse has been placed upon them!`,
              th: `${character.name?.th || character.name} สวดมนต์แต่มีบางอย่างผิดพลาด คำสาปถูกวางไว้กับพวกเขา!`,
            },
            context,
            significance: NewsSignificance.MAJOR,
            propagation: NewsPropagation.PRIVATE,
          })
        );
      } else {
        news.push(
          createNews({
            scope: {
              kind: "privateScope",
              characterId: character.id,
            },
            content: {
              en: `${character.name?.en || character.name} prayed at the shrine.`,
              th: `${character.name?.th || character.name} สวดมนต์ที่ศาลเจ้า`,
            },
            context,
            significance: NewsSignificance.MINOR,
            propagation: NewsPropagation.PRIVATE,
          })
        );
      }
    }
  } else if (action === "donate") {
    // Donation system: tiered amounts with increasing benefits
    const donationAmounts = [10, 50, 100]; // Gold amounts
    // For now, use a default donation amount (can be enhanced with action parameter)
    const donationAmount = 10; // Default, can be made configurable
    
    // Check if character has enough gold
    const currentGold = character.inventory.get(GoldId.gold) || 0;
    if (currentGold < donationAmount) {
      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} attempted to donate but doesn't have enough gold.`,
            th: `${character.name?.th || character.name} พยายามบริจาคแต่ไม่มีทองเพียงพอ`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
      return news;
    }

    // Deduct gold
    character.inventory.set(GoldId.gold, currentGold - donationAmount);

    // Reputation gain with location/sub-region (via character.fame)
    // Gain fame in the sub-region
    const fameGain = Math.floor(donationAmount / 10); // 1-10 fame based on donation
    const currentFame = character.fame.get(context.subRegion) ?? 0;
    character.fame.set(context.subRegion, currentFame + fameGain);

    // Small chance for blessing (higher donation = higher chance)
    const blessingChance = Math.min(10 + (donationAmount / 10), 30); // 10-30% chance
    // Random chance - don't apply bless/curse
    const blessingRoll = character.roll({ amount: 1, face: 100, applyBlessCurse: false });
    let blessingReceived = false;

    if (blessingRoll <= blessingChance) {
      const blessingEntry = character.buffsAndDebuffs.buffs.entry.get(BuffEnum.bless) ?? {
        value: 0,
        counter: 0,
        isPerm: true,
        permValue: 0,
      };
      blessingEntry.isPerm = true;
      // Random quantity - don't apply bless/curse
      blessingEntry.permValue = (blessingEntry.permValue || 0) + character.roll({ amount: 1, face: 2, applyBlessCurse: false }); // 1-2 phases
      character.buffsAndDebuffs.buffs.entry.set(BuffEnum.bless, blessingEntry);
      blessingReceived = true;
    }

    // Mood boost
    character.needs.incMood(2);

    news.push(
      createNews({
        scope: {
          kind: "privateScope",
          characterId: character.id,
        },
        content: {
          en: `${character.name?.en || character.name} donated ${donationAmount} gold${blessingReceived ? " and received a blessing" : ""}. Reputation increased by ${fameGain}.`,
          th: `${character.name?.th || character.name} บริจาค ${donationAmount} เหรียญทอง${blessingReceived ? " และได้รับพร" : ""} ชื่อเสียงเพิ่มขึ้น ${fameGain}`,
        },
        context,
        significance: blessingReceived ? NewsSignificance.MAJOR : NewsSignificance.MINOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
  }

  return news;
}

