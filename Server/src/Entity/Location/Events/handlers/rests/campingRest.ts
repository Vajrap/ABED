import { NewsPropagation, NewsSignificance } from "src/InterFacesEnumsAndTypes/NewsEnums";
import type { Character } from "../../../../Character/Character";
import { UsableId } from "../../../../Item/Consumable/index";
import {
  createNews,
  type News,
  type NewsContext,
} from "../../../../News/News";
import { applyRestBenefits } from "./applyRestBenefits";

export function campingRest(
  characters: Character[],
  context: NewsContext,
): News | null {
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

  for (const character of characters) {
    applyRestBenefits(character, willUse ? 1.3 : 1);
  }

  return createNews({
    scope: { kind: "partyScope", partyId: context.partyId },
    content: {
      en: `[char:${characters[0]?.id}]${characters[0]?.name}[/char] has taken a rest`,
      th: `[char:${characters[0]?.id}]${characters[0]?.name}[/char] ได้พักผ่อน`
    },
    context,
    significance: NewsSignificance.TRIVIAL,
    propagation: NewsPropagation.LOCAL
  });
}
