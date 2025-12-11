import type { Character } from "../Entity/Character/Character";
import type { QuestOffer } from "../Entity/Quest/QuestOffer";
import { createNews } from "../Entity/News/News";
import { NewsSignificance, NewsPropagation } from "../InterFacesEnumsAndTypes/NewsEnums";
import { locationManager } from "../Entity/Location/Manager/LocationManager";

/**
 * Service for managing quest offer expiration and cleanup
 */
export class QuestOfferService {
  /**
   * Check if a quest offer has expired (6 real hours)
   */
  static isExpired(offer: QuestOffer): boolean {
    return offer.isExpired();
  }

  /**
   * Check and remove expired quest offers from a character
   * Returns news events for expired offers
   */
  static checkExpiredOffers(character: Character): Array<{
    scope: { kind: "privateScope"; characterId: string };
    content: { en: string; th: string };
    context: {
      region: string;
      subRegion: string;
      location: string;
      partyId: string;
      characterIds: string[];
    };
    significance: NewsSignificance;
    propagation: NewsPropagation;
  }> {
    const expiredNews: Array<{
      scope: { kind: "privateScope"; characterId: string };
      content: { en: string; th: string };
      context: {
        region: string;
        subRegion: string;
        location: string;
        partyId: string;
        characterIds: string[];
      };
      significance: NewsSignificance;
      propagation: NewsPropagation;
    }> = [];

    if (!character.location) {
      return expiredNews; // Can't create news without location
    }

    const location = locationManager.locations[character.location];
    if (!location) {
      return expiredNews; // Location not found
    }

    const context = {
      region: location.region,
      subRegion: location.subRegion,
      location: character.location,
      partyId: character.partyID || "",
      characterIds: [character.id],
    };

    // Check all pending offers
    for (const [offerId, offer] of character.questOffers.entries()) {
      if (offer.status === "pending" && this.isExpired(offer)) {
        // Mark as expired and remove
        offer.status = "expired";
        character.questOffers.delete(offerId);

        expiredNews.push({
          scope: {
            kind: "privateScope",
            characterId: character.id,
          },
          content: {
            en: `${character.name?.en || character.name}'s quest offer "${offer.quest.name.en}" has expired.`,
            th: `${character.name?.th || character.name} ข้อเสนอเควส "${offer.quest.name.th}" หมดอายุแล้ว`,
          },
          context,
          significance: NewsSignificance.MINOR,
          propagation: NewsPropagation.PRIVATE,
        });
      }
    }

    return expiredNews;
  }

  /**
   * Get all pending (non-expired) quest offers for a character
   */
  static getPendingOffers(character: Character): QuestOffer[] {
    // Check expiration first
    this.checkExpiredOffers(character);

    return Array.from(character.questOffers.values()).filter(
      (offer) => offer.status === "pending" && !offer.isExpired()
    );
  }
}

