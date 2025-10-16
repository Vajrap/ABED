import { SubRegionEnum } from "../../../../../InterFacesEnumsAndTypes/Enums/SubRegion";
import { TierEnum } from "../../../../../InterFacesEnumsAndTypes/Tiers";
import type { Character } from "../../../../Character/Character";
import { MiscItemId } from "../../../../Item/Item";
import {
  createNews,
  type NewsContext,
  type News,
} from "../../../../News/News";
import {
  type InnConfig,
  InnLevel,
  type LocationInns,
} from "../../../Config/Inn";
import { applyRestBenefits } from "./applyRestBenefits";
import { normalRest } from "./normalRest";

export function innRest(
  characters: Character[],
  config: InnConfig,
  numberOfRooms: number,
  context: NewsContext,
): News[] {
  const totalCost = config.costPerRoom * numberOfRooms;

  const wallets = characters.map((char) => ({
    char,
    gold: char.inventory.get(MiscItemId.gold) ?? 0,
  }));

  const totalAvailable = wallets.reduce((sum, w) => sum + w.gold, 0);
  const allNews: News[] = [];

  if (totalAvailable < totalCost) {
    for (const character of characters) {
      allNews.push(normalRest(character, context));
    }
    return allNews;
  } else {
    let remaining = totalCost;
    for (const wallet of wallets) {
      const share = Math.min(
        wallet.gold,
        Math.ceil((wallet.gold / totalAvailable) * totalCost),
      );
      wallet.char.inventory.set(MiscItemId.gold, wallet.gold - share);
      remaining -= share;
    }

    if (remaining > 0 && wallets.length > 0) {
      const first = wallets[0]!;
      const goldLeft = first.char.inventory.get(MiscItemId.gold) ?? 0;
      first.char.inventory.set(MiscItemId.gold, goldLeft - remaining);
    }
  }

  for (const character of characters) {
    applyRestBenefits(character, 1.3);
    const news = createNews({
      scope: { kind: "privateScope", characterId: character.id },
      tokens: [
        { t: "char", v: [character.intoNewsInterface(context.subRegion)] },
        { t: "text", v: `has taken a rest in an inn.` },
      ],
      context: {
        region: context.region,
        subRegion: context.subRegion,
        location: context.location,
        partyId: character.partyID ?? '',
        characterIds: [character.id]
      },
      secretTier: TierEnum.rare
    });
    allNews.push(news);
  }

  return allNews;
}

export function getPreferredInnType(
  characters: Character[],
  innConfig: LocationInns,
): { prefer: InnLevel; numberOfRooms: number } | null {
  const count = {
    [InnLevel.Poor]: 0,
    [InnLevel.Comfortable]: 0,
    [InnLevel.Luxury]: 0,
    [InnLevel.Premium]: 0,
  };
  let accumulateGold = 0;
  for (const character of characters) {
    count[character.behavior.preferredInnType] += 1;
    const gold = character.inventory.get(MiscItemId.gold);
    if (gold) accumulateGold += gold;
  }

  let preferred = (Object.keys(count) as InnLevel[]).reduce((a, b) =>
    count[a] > count[b] ? a : b,
  );

  // findout if the location have that type of inn or not
  let roomNeeded = recursiveInnDetermination(
    characters.length,
    accumulateGold,
    innConfig,
    preferred,
  );

  while (!innConfig[preferred] || roomNeeded === false) {
    // step down preferred
    switch (preferred) {
      case InnLevel.Poor:
        // GO TO NORMAL REST,
        return null;
      case InnLevel.Comfortable:
        preferred = InnLevel.Poor;
        roomNeeded = recursiveInnDetermination(
          characters.length,
          accumulateGold,
          innConfig,
          preferred,
        );
        break;
      case InnLevel.Luxury:
        preferred = InnLevel.Comfortable;
        roomNeeded = recursiveInnDetermination(
          characters.length,
          accumulateGold,
          innConfig,
          preferred,
        );
        break;
      case InnLevel.Premium:
        preferred = InnLevel.Luxury;
        roomNeeded = recursiveInnDetermination(
          characters.length,
          accumulateGold,
          innConfig,
          preferred,
        );
        break;
    }
  }
  return { prefer: preferred, numberOfRooms: roomNeeded };
}

function recursiveInnDetermination(
  characterCount: number,
  accGold: number,
  inns: LocationInns,
  preferred: InnLevel,
): number | false {
  if (!inns[preferred]) return false;

  const config = inns[preferred];
  const roomNeeded = Math.ceil(characterCount / config.roomSize);
  const totalCost = roomNeeded * config.costPerRoom;

  return totalCost <= accGold ? roomNeeded : false;
}
