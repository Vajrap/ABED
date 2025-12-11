import type { Character } from "src/Entity/Character/Character";
import type { NewsContext, News } from "src/Entity/News/News";
import { createNews } from "src/Entity/News/News";
import { NewsSignificance, NewsPropagation } from "../../../../../InterFacesEnumsAndTypes/NewsEnums";
import { Bounty, BountyStatus } from "../../../../Bounty/Bounty";
import { TierEnum } from "../../../../../InterFacesEnumsAndTypes/Tiers";
import { GoldId } from "../../../../Item";
import { randomUUID } from "crypto";

/**
 * Handle Bounty Board actions
 * - Accept bounty action: Add bounty to character's active bounties
 * - Turn in bounty action: Check if target defeated, apply gold reward
 * - View available bounties: List available bounties
 */
export function handleBountyAction(
  character: Character,
  context: NewsContext,
  action: "acceptBounty" | "turnInBounty" | "viewBounties",
  bountyId?: string,
): News[] {
  const news: News[] = [];

  if (action === "acceptBounty") {
    // For now, create a placeholder bounty (in the future, get from bounty repository)
    if (!bountyId) {
      // Create a simple placeholder bounty
      const newBounty = new Bounty({
        id: randomUUID(),
        name: {
          en: "Goblin Bounty",
          th: "ค่าหัวกอบลิน",
        },
        description: {
          en: "Defeat 3 Goblins",
          th: "กำจัดกอบลิน 3 ตัว",
        },
        target: "goblin",
        reward: 30,
        tier: TierEnum.common,
        status: BountyStatus.Active,
        locationId: context.location,
      });

      character.bounties.active.set(newBounty.id, newBounty);

      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} accepted a bounty: ${newBounty.name.en}`,
            th: `${character.name?.th || character.name} รับค่าหัว: ${newBounty.name.th}`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
    } else {
      // In the future, get bounty from repository and add to active
      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} attempted to accept bounty ${bountyId}.`,
            th: `${character.name?.th || character.name} พยายามรับค่าหัว ${bountyId}`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
    }
  } else if (action === "turnInBounty") {
    if (!bountyId) {
      // Find first active bounty (in the future, check if target is defeated)
      const firstBounty = Array.from(character.bounties.active.values())[0];
      if (firstBounty) {
        bountyId = firstBounty.id;
      }
    }

    if (!bountyId) {
      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} attempted to turn in a bounty but has no active bounties.`,
            th: `${character.name?.th || character.name} พยายามส่งค่าหัวแต่ไม่มีค่าหัวที่กำลังทำ`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
      return news;
    }

    const bounty = character.bounties.active.get(bountyId);
    if (!bounty) {
      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} attempted to turn in bounty ${bountyId} but it wasn't found.`,
            th: `${character.name?.th || character.name} พยายามส่งค่าหัว ${bountyId} แต่ไม่พบ`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
      return news;
    }

    // TODO: Check if target is defeated (check battle records, kill counts, etc.)
    // For now, assume completed
    const isCompleted = true; // Placeholder

    if (!isCompleted) {
      news.push(
        createNews({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name} attempted to turn in bounty ${bounty.name.en} but the target hasn't been defeated.`,
            th: `${character.name?.th || character.name} พยายามส่งค่าหัว ${bounty.name.th} แต่เป้าหมายยังไม่ถูกกำจัด`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        })
      );
      return news;
    }

    // Apply gold reward
    const currentGold = character.inventory.get(GoldId.gold) || 0;
    character.inventory.set(GoldId.gold, currentGold + bounty.reward);

    // Move to completed
    character.bounties.active.delete(bountyId);
    character.bounties.completed.add(bountyId);

    news.push(
      createNews({
        scope: {
          kind: "privateScope",
          characterId: character.id,
        },
        content: {
          en: `${character.name?.en || character.name} turned in bounty ${bounty.name.en} and received ${bounty.reward} gold!`,
          th: `${character.name?.th || character.name} ส่งค่าหัว ${bounty.name.th} และได้รับ ${bounty.reward} เหรียญทอง!`,
        },
        context,
        significance: NewsSignificance.MAJOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
  } else if (action === "viewBounties") {
    // Return list of available/active bounties
    const activeBounties = Array.from(character.bounties.active.values());
    news.push(
      createNews({
        scope: {
          kind: "privateScope",
          characterId: character.id,
        },
        content: {
          en: `${character.name?.en || character.name} viewed available bounties. Active: ${activeBounties.length}`,
          th: `${character.name?.th || character.name} ดูค่าหัวที่มีอยู่ กำลังทำ: ${activeBounties.length}`,
        },
        context,
        significance: NewsSignificance.MINOR,
        propagation: NewsPropagation.PRIVATE,
      })
    );
  }

  return news;
}

