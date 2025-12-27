import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import { NPCsByLocation, NPCsParty, NPCTemplate } from "./types";
import { waywardInnNPCs } from "./definitions/locations/waywardInn/index";
import { brayhornVillageNPCs } from "./definitions/locations/brayhornVillage/index";
import { createHash } from "crypto";

export const npcsByLocRepository: Record<LocationsEnum, NPCsByLocation> = {
  [LocationsEnum.WaywardInn]: waywardInnNPCs,
  [LocationsEnum.BrayhornVillage]: brayhornVillageNPCs,
  [LocationsEnum.PlagueWaterCrossing]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.TheHollowSpire]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.WitchlightMire]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.SunkenTempleOfRowana]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.BlackrootHamlet]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.SkycanopyVillage]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.HardsoilVillage]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.VirdralRuins]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.TotemheartVillage]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.MarshlightBeacon]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.ReedwalkCauseway]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.NettlemireSaltPans]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.BrackwaterParish]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.SaltfenDocks]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.RivercourtDockyardsAndBazaar]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.GreenveilRailTerminus]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.JadintharBarrack]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.VinesPalce]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.JadintharCity]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.OceanTideInnerCity]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.OceanTideBarrack]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.SaltreachStation]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.MeadowlineStation]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.OceanTideGrandStation]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.PebbletonsRanch]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.SingingCaves]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.TidewatchFortress]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.TheShiftingMirror]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.ShrineOfTheWhisperingPines]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.NightreefDocks]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.ObsidianPort]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.WindmereVillage]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.WillmooreForest]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.FairgroundFields]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.BrambletonOrchards]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.MeadowportTown]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.SmugglersCove]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.OysterReefs]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.SaltreachVillage]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.LanternCoastsPilgrimShrine]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.TheGrandLighthouse]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.LanternshoreTown]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.OceanTideHarborDistrict]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.OceanTideCastle]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.TheAcademia]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.SilverfangHideout]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.TheCrescentFields]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.AqueductRuins]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.MoonwellVillage]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.BoneDunes]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.StormscarHollow]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.ShrineOfTheEclipsedSun]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.RuinsOfKarthis]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.DunemarchQuarryCamp]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.GlassrockOutcrop]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.SalrglassMines]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.TheBrokenWell]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.AshenOasisTown]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.StonecrossCairn]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.SnowstrideCaravanserai]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.FrosthideRanches]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.CheesemakersHollow]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.OxenholdVillage]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.IcetoothRavine]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.BonesOfTheFallen]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.BleakfenCrossing]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.HuntcliffLodge]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.ForstmarchsPost]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.CragspireFort]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.Forgehold]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.DeepwellMines]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.StonejawQuarry]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.IronvaleTown]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.WolfskullClearing]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.TimberfellCamp]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.AncestorsRise]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.PinewatchHamlet]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.FrozenDocks]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.HallOfIcebanners]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.VelgarthCentralStation]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.IronholdKeep]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.VelgarthCity]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.WanderersShrineOfDrymarch]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.DrymarchWindmills]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.DrymarchGrainfields]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.DrymarchVillage]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.TheOldBattlefield]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.GreybarrowPost]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.AncestorBarrows]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.GreybarrowVillage]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.BanditsRavine]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.UnknownGodCliffsideShrine]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.MinersHollow]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.RedrockQuarry]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.PilgrimsRestInn]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.DesertGateFortress]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.WindstailTown]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.GoldburgBarrackFortress]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.MerchantsQuarter]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.GoldburgRailTerminus]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.GoldburgCastle]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.GoldburgCity]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.FyonarBarrack]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.VoltspireElectric]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.FyonarCentralStation]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.FyonarCastle]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.BelfortMercantileExchange]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.GrandTempleOfLaoh]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.FyonarCity]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.BarrowfordStation]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.NorthmarchPost]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.WolfsGateHamlet]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.ShepherdsHollow]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.DustmereVillage]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.OldShrineOfLaoh]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.DryfieldWells]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.FrontierWatchtower]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.IronwellStation]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.FarmersGuildHall]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.Hearthvale]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.MeadowbrookVillage]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.LanternPost]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.FerryHollow]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.StonefordCrossing]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.Riversmeet]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.GreengateStation]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.StonecrossManor]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.GoldentideField]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.SanctumOfSilence]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.TheBlackGlacier]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.EdgeOfAllThings]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.TheFrozenLabyrinth]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.StormspireCrag]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.TheHowlingCaves]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.WinterwatchTower]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.TheMammothGraveyard]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.FrosthornCamp]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.LeechwaterCrossing]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.TempleOfTheDrownedGod]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.TheReedbloodMarshes]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.CanalTownOfMirehaven]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.CrimsonSpire]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.ChainedIsle]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.TheDrownedAltar]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.BloodchantIsle]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.TheMoltenScar]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.TheRedRidgeShrine]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.FireglassMines]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.CintertideLighthouse]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.BlackmarketOfAshport]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  },
  [LocationsEnum.NightReefDocks]: {
    location: LocationsEnum.PlagueWaterCrossing,
    npcsParty: []
  }
};

/**
 * Get NPCs definition for a specific location
 */
export function getNPCsByLocation(location: LocationsEnum): NPCsByLocation | null {
  return npcsByLocRepository[location] || null;
}

/**
 * Get all NPC party definitions for a specific location
 */
export function getNPCsPartiesForLocation(location: LocationsEnum): NPCsParty[] {
  const npcsByLoc = getNPCsByLocation(location);
  return npcsByLoc?.npcsParty || [];
}

/**
 * Get all NPC templates for a specific location (flattened from parties)
 */
export function getNPCTemplatesForLocation(location: LocationsEnum): NPCTemplate[] {
  const parties = getNPCsPartiesForLocation(location);
  return parties.flatMap(party => party.npcs);
}

/**
 * Get all NPC templates from all locations
 */
export function getAllNPCTemplates(): NPCTemplate[] {
  const allTemplates: NPCTemplate[] = [];
  for (const location of Object.values(LocationsEnum)) {
    allTemplates.push(...getNPCTemplatesForLocation(location));
  }
  return allTemplates;
}


/**
 * Generate deterministic UUID from template ID
 * Must match the same function used in seed-npcs.ts and init.ts
 * Exported for use in seed scripts and initialization
 */
export function generateDeterministicUUID(input: string): string {
  const namespace = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"; // NPC namespace
  
  const hash = createHash("sha256")
    .update(namespace + input)
    .digest("hex");
  
  const hex = hash.substring(0, 32);
  return [
    hex.substring(0, 8),
    hex.substring(8, 12),
    "4" + hex.substring(13, 16), // Version 4
    ((parseInt(hex.substring(16, 18), 16) & 0x3f) | 0x80).toString(16).padStart(2, "0") + hex.substring(18, 20), // Variant bits
    hex.substring(20, 32),
  ].join("-");
}

/**
 * Get NPC template by template ID (e.g., "wayward_inn_thomas")
 */
export function getNPCTemplateById(templateId: string): NPCTemplate | null {
  const allTemplates = getAllNPCTemplates();
  return allTemplates.find(t => t.id === templateId) || null;
}

/**
 * Get NPC template by database UUID
 * Converts UUID back to template by checking all templates
 */
export function getNPCTemplateByUUID(uuid: string): NPCTemplate | null {
  const allTemplates = getAllNPCTemplates();
  
  // Check each template to see if its deterministic UUID matches
  for (const template of allTemplates) {
    const templateUUID = generateDeterministicUUID(template.id);
    if (templateUUID === uuid) {
      return template;
    }
  }
  
  return null;
}