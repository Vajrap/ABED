import type { Character } from "../../../../Character/Character";
import { UsableId } from "../../../../Item/Item";
import {
  createNews,
  type NewsContext,
  type NewsWithScope,
} from "../../../../News/News";
import { applyRestBenefits } from "./applyRestBenefits";

export function campingRest(
  characters: Character[],
  context: NewsContext,
): NewsWithScope {
  let willUse = false;
  // Decide first if they want to use camp kit
  const charWithUsedKit = characters.filter(
    (char) => char.behavior.useCampSupplies === true,
  );
  let useKit: boolean = charWithUsedKit.length > 0;

  // Then if they have camp kit
  let charWithKit: Character[] = [];
  if (charWithUsedKit.length > 0) {
    for (const char of charWithUsedKit) {
      const item = char.inventory.get(UsableId.campKit);
      if (item != undefined && item >= 1) {
        charWithKit.push(char);
      }
    }
  }

  // If have both
  if (charWithKit.length > 0) {
    // get a random character
    const randomKitUser =
      charWithKit[Math.floor(Math.random() * charWithKit.length)];
    // use the kit
    randomKitUser?.inventory.set(
      UsableId.campKit,
      randomKitUser.inventory.get(UsableId.campKit)! - 1,
    );
    willUse = true;
  } else {
    willUse = false;
  }

  applyRestBenefits(characters, willUse ? 1.3 : 1);
  const news = createNews({
    scope: { kind: "private", characterId: characters.map((char) => char.id) },
    tokens: [
      {
        t: "char",
        v: characters.map((char) => char.intoNewsInterface(context.subRegion)),
      },
      { t: "text", v: `has taken a rest` },
    ],
    context,
  });

  return {
    scope: {
      kind: "party",
      partyId: context.partyId ? context.partyId : "none",
    },
    news,
  };
}
