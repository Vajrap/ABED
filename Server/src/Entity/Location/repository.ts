import { RegionEnum } from "src/InterFacesEnumsAndTypes/Enums/Region";
import { SubRegionEnum } from "src/InterFacesEnumsAndTypes/Enums/SubRegion";
import { LocationsEnum } from "src/InterFacesEnumsAndTypes/Enums/Location";
import type { Region } from "./Regions";
import type { SubRegion } from "./SubRegion";
import type { Location } from "./Location";

// Region imports
import { centralPlain } from "./Region/CentralPlain/centralPlain";
import { southernShore } from "./Region/SouthernShore/southernShore";
import { westernForest } from "./Region/WesternForest/westernForest";
import { northernReaches } from "./Region/NorthernReaches/northernReaches";
import { silenceDesert } from "./Region/SilenceDesert/silenceDesert";
import { atmahnForest } from "./Region/AtmahnForest/atmahnForest";
import { borealFrost } from "./Region/BorealFrost/borealFrost";
import { easternFrontier } from "./Region/EasternFrontier/easternFrontier";

// SubRegion imports - Central Plain
import { goldenPlains } from "./Region/CentralPlain/GoldenPlain/goldenPlains";
import { fyonarCapital } from "./Region/CentralPlain/FyonarCapitalDistrict/fyonarCapitalDistrict";
import { greatWhiteValley } from "./Region/CentralPlain/GreatWhiteValley/greatWhiteValley";
import { southFarm } from "./Region/CentralPlain/SouthFarms/southFarms";
import { eastfieldFrontier } from "./Region/CentralPlain/EastfieldFrontier/eastfieldFrontier";
import { northmarchDowns } from "./Region/CentralPlain/NorthmarchDowns/northmarchDowns";

// SubRegion imports - Southern Shore
import { oceanTideCapitalDistrict } from "./Region/SouthernShore/OceanTideCapitalDistrict/oceanTideCapitalDistrict";
import { meadowlineHinterlands } from "./Region/SouthernShore/MeadowlineHinterlands/meadowlineHinterlands";
import { stormshoreCliffs } from "./Region/SouthernShore/StormshoreCliffs/stormshoreCliffs";
import { lanternCoast } from "./Region/SouthernShore/LanternCoast/lanternCoast";
import { saltreachMarshes } from "./Region/SouthernShore/SaltreachMarshes/saltreachMarshes";

// SubRegion imports - Eastern Frontier
import { goldburgCapitalDistrict } from "./Region/EasternFrontier/GoldburgCapitalDistrict/goldburgCapitalDistrict";
import { drymarchFarms } from "./Region/EasternFrontier/DrymarchFarms/drymarchFarms";
import { greybarrowFlats } from "./Region/EasternFrontier/GreybarrowFlats/greybarrowFlats";
import { windstailValley } from "./Region/EasternFrontier/WindstailValley/windstailValley";
import { charredFoothills } from "./Region/EasternFrontier/CharredFoothills/charredFoothills";

// SubRegion imports - Western Forest
import { emeraldCanopy } from "./Region/WesternForest/EmeraldCanopy/emeraldCanopy";
import { coastalLowlands } from "./Region/WesternForest/CoastalLowlands/coastalLowlands";
import { jadintharCapitalDistrict } from "./Region/WesternForest/JadintharCapitalDistrict/jadintharCapitalDistrict";
import { shadowfenBasin } from "./Region/WesternForest/ShadowfenBasin/shadowfenBasin";

// SubRegion imports - Northern Reaches
import { shiverpineForest } from "./Region/NorthernReaches/ShiverpineForest/shiverpineForest";
import { frostpastures } from "./Region/NorthernReaches/Frostpastures/frostpastures";
import { frostmarchTundra } from "./Region/NorthernReaches/FrostmarchTundra/frostmarchTundra";
import { ironvaleHills } from "./Region/NorthernReaches/IronvaleHills/ironvaleHills";
import { velgarthCapitalDistrict } from "./Region/NorthernReaches/VelgarthCapitalDistrict/velgarthCapitalDistrict";

// SubRegion imports - Silence Desert
import { saltglassFlats } from "./Region/SilenceDesert/SaltglassFlats/saltglassFlats";
import { moonwellOasis } from "./Region/SilenceDesert/MoonwellOasis/moonwellOasis";
import { duskmarchOasis } from "./Region/SilenceDesert/DuskmarchOasis/duskmarchOasis";
import { theEasternDeeps } from "./Region/SilenceDesert/TheEasternDeeps/theEasternDeeps";

// SubRegion imports - Atmahn Forest
import { blackCoast } from "./Region/AtmahnForest/BlackCoast/blackCoast";
import { cinderPeakHighlands } from "./Region/AtmahnForest/CinderPeakHighlands/cinderPeakHighlands";
import { greenbloodBasin } from "./Region/AtmahnForest/GreenbloodBasin/greenbloodBasin";
import { crimsonIsles } from "./Region/AtmahnForest/CrimsonIsles/crimsonIsles";

// SubRegion imports - Boreal Frost
import { icehornPlains } from "./Region/BorealFrost/IcehornPlains/icehornPlains";
import { whitePeaks } from "./Region/BorealFrost/WhitePeaks/whitePeaks";
import { worldsEdge } from "./Region/BorealFrost/WorldsEdge/worldsEdge";

// Location imports - Central Plain
// Golden Plains
import { waywardInn } from "./Location/definition/waywardInn";
import { greengateStation } from "./Region/CentralPlain/GoldenPlain/greengateStation";
import { stonecrossManor } from "./Region/CentralPlain/GoldenPlain/stonecrossManor";
import { goldentideField } from "./Region/CentralPlain/GoldenPlain/goldentideField";
import { brayhornVillage } from "./Region/CentralPlain/GoldenPlain/brayhornVillage";
// Fyonar Capital District
import { fyonarBarrack } from "./Region/CentralPlain/FyonarCapitalDistrict/fyonarBarrack";
import { voltspireElectric } from "./Region/CentralPlain/FyonarCapitalDistrict/voltspireElectric";
import { fyonarCentralStation } from "./Region/CentralPlain/FyonarCapitalDistrict/fyonarCentralStation";
import { fyonarCastle } from "./Region/CentralPlain/FyonarCapitalDistrict/fyonarCastle";
import { belfortMercantileExchange } from "./Region/CentralPlain/FyonarCapitalDistrict/belfortMercantileExchange";
import { grandTempleOfLaoh } from "./Region/CentralPlain/FyonarCapitalDistrict/grandTempleOfLaoh";
import { fyonarCity } from "./Region/CentralPlain/FyonarCapitalDistrict/fyonarCity";
// Great White Valley
import { lanternPost } from "./Region/CentralPlain/GreatWhiteValley/lanternPost";
import { ferryHollow } from "./Region/CentralPlain/GreatWhiteValley/ferryHollow";
import { stonefordCrossing } from "./Region/CentralPlain/GreatWhiteValley/stonefordCrossing";
import { riversmeet } from "./Region/CentralPlain/GreatWhiteValley/riversmeet";
// South Farms
import { ironwellStation } from "./Region/CentralPlain/SouthFarms/ironwellStation";
import { farmersGuildHall } from "./Region/CentralPlain/SouthFarms/farmersGuildHall";
import { hearthvale } from "./Region/CentralPlain/SouthFarms/hearthvale";
import { meadowbrookVillage } from "./Region/CentralPlain/SouthFarms/meadowbrookVillage";
import { plaguewaterCrossing } from "./Region/WesternForest/ShadowfenBasin/plaguewaterCrossing";
import { theHollowSpire } from "./Region/WesternForest/ShadowfenBasin/theHollowSpire";
import { witchlightMire } from "./Region/WesternForest/ShadowfenBasin/witchlightMire";
import { sunkenTempleOfRowana } from "./Region/WesternForest/ShadowfenBasin/sunkenTempleOfRowana";
import { blackrootHamlet } from "./Region/WesternForest/ShadowfenBasin/blackrootHamlet";
// Eastfield Frontier
import { dustmereVillage } from "./Region/CentralPlain/EastfieldFrontier/dustmereVillage";
import { oldShrineOfLaoh } from "./Region/CentralPlain/EastfieldFrontier/oldShrineOfLaoh";
import { dryfieldWells } from "./Region/CentralPlain/EastfieldFrontier/dryfieldWells";
import { frontierWatchtower } from "./Region/CentralPlain/EastfieldFrontier/frontierWatchtower";
// Northmarch Downs
import { barrowfordStation } from "./Region/CentralPlain/NorthmarchDowns/barrowfordStation";
import { northmarchPost } from "./Region/CentralPlain/NorthmarchDowns/northmarchPost";
import { wolfsGateHamlet } from "./Region/CentralPlain/NorthmarchDowns/wolfsGateHamlet";
import { shepherdsHollow } from "./Region/CentralPlain/NorthmarchDowns/shepherdsHollow";
// Western Forest - Emerald Canopy
import { skycanopyVillage } from "./Region/WesternForest/EmeraldCanopy/skycanopyVillage";
import { hardsoilVillage } from "./Region/WesternForest/EmeraldCanopy/hardsoilVillage";
import { virdralRuins } from "./Region/WesternForest/EmeraldCanopy/virdralRuins";
import { totemheartVillage } from "./Region/WesternForest/EmeraldCanopy/totemheartVillage";
// Western Forest - Coastal Lowlands
import { marshlightBeacon } from "./Region/WesternForest/CoastalLowlands/marshlightBeacon";
import { reedwalkCauseway } from "./Region/WesternForest/CoastalLowlands/reedwalkCauseway";
import { nettlemireSaltPans } from "./Region/WesternForest/CoastalLowlands/nettlemireSaltPans";
import { brackwaterParish } from "./Region/WesternForest/CoastalLowlands/brackwaterParish";
import { saltfenDocks } from "./Region/WesternForest/CoastalLowlands/saltfenDocks";
// Western Forest - Jadinthar Capital District
import { rivercourtDockyardsAndBazaar } from "./Region/WesternForest/JadintharCapitalDistrict/rivercourtDockyardsAndBazaar";
import { greenveilRailTerminus } from "./Region/WesternForest/JadintharCapitalDistrict/greenveilRailTerminus";
import { jadintharBarrack } from "./Region/WesternForest/JadintharCapitalDistrict/jadintharBarrack";
import { vinesPalace } from "./Region/WesternForest/JadintharCapitalDistrict/vinesPalace";
import { jadintharCity } from "./Region/WesternForest/JadintharCapitalDistrict/jadintharCity";
// Southern Shore - Ocean Tide Capital District
import { oceanTideInnerCity } from "./Region/SouthernShore/OceanTideCapitalDistrict/oceanTideInnerCity";
import { oceanTideBarrack } from "./Region/SouthernShore/OceanTideCapitalDistrict/oceanTideBarrack";
import { oceanTideGrandStation } from "./Region/SouthernShore/OceanTideCapitalDistrict/oceanTideGrandStation";
import { oceanTideHarborDistrict } from "./Region/SouthernShore/OceanTideCapitalDistrict/oceanTideHarborDistrict";
import { oceanTideCastle } from "./Region/SouthernShore/OceanTideCapitalDistrict/oceanTideCastle";
import { theAcademia } from "./Region/SouthernShore/OceanTideCapitalDistrict/theAcademia";
// Southern Shore - Meadowline Hinterlands
import { meadowlineStation } from "./Region/SouthernShore/MeadowlineHinterlands/meadowlineStation";
import { pebbletonsRanch } from "./Region/SouthernShore/MeadowlineHinterlands/pebbletonsRanch";
import { willmooreForest } from "./Region/SouthernShore/MeadowlineHinterlands/willmooreForest";
import { fairgroundFields } from "./Region/SouthernShore/MeadowlineHinterlands/fairgroundFields";
import { brambletonOrchards } from "./Region/SouthernShore/MeadowlineHinterlands/brambletonOrchards";
import { meadowportTown } from "./Region/SouthernShore/MeadowlineHinterlands/meadowportTown";
// Southern Shore - Stormshore Cliffs
import { singingCaves } from "./Region/SouthernShore/StormshoreCliffs/singingCaves";
import { tidewatchFortress } from "./Region/SouthernShore/StormshoreCliffs/tidewatchFortress";
import { windmereVillage } from "./Region/SouthernShore/StormshoreCliffs/windmereVillage";
// Southern Shore - Lantern Coast
import { lanternCoastsPilgrimShrine } from "./Region/SouthernShore/LanternCoast/lanternCoastsPilgrimShrine";
import { theGrandLighthouse } from "./Region/SouthernShore/LanternCoast/theGrandLighthouse";
import { lanternshoreTown } from "./Region/SouthernShore/LanternCoast/lanternshoreTown";
// Southern Shore - Saltreach Marshes
import { saltreachStation } from "./Region/SouthernShore/SaltreachMarshes/saltreachStation";
import { smugglersCove } from "./Region/SouthernShore/SaltreachMarshes/smugglersCove";
import { oysterReefs } from "./Region/SouthernShore/SaltreachMarshes/oysterReefs";
import { saltreachVillage } from "./Region/SouthernShore/SaltreachMarshes/saltreachVillage";
// Eastern Frontier - Goldburg Capital District
import { goldburgBarrackFortress } from "./Region/EasternFrontier/GoldburgCapitalDistrict/goldburgBarrackFortress";
import { merchantsQuarter } from "./Region/EasternFrontier/GoldburgCapitalDistrict/merchantsQuarter";
import { goldburgRailTerminus } from "./Region/EasternFrontier/GoldburgCapitalDistrict/goldburgRailTerminus";
import { goldburgCastle } from "./Region/EasternFrontier/GoldburgCapitalDistrict/goldburgCastle";
import { goldburgCity } from "./Region/EasternFrontier/GoldburgCapitalDistrict/goldburgCity";
// Eastern Frontier - Drymarch Farms
import { wanderersShrineOfDrymarch } from "./Region/EasternFrontier/DrymarchFarms/wanderersShrineOfDrymarch";
import { drymarchWindmills } from "./Region/EasternFrontier/DrymarchFarms/drymarchWindmills";
import { drymarchGrainfields } from "./Region/EasternFrontier/DrymarchFarms/drymarchGrainfields";
import { drymarchVillage } from "./Region/EasternFrontier/DrymarchFarms/drymarchVillage";
// Eastern Frontier - Greybarrow Flats
import { theOldBattlefield } from "./Region/EasternFrontier/GreybarrowFlats/theOldBattlefield";
import { greybarrowPost } from "./Region/EasternFrontier/GreybarrowFlats/greybarrowPost";
import { ancestorBarrows } from "./Region/EasternFrontier/GreybarrowFlats/ancestorBarrows";
import { greybarrowVillage } from "./Region/EasternFrontier/GreybarrowFlats/greybarrowVillage";
// Eastern Frontier - Windstail Valley
import { pilgrimsRestInn } from "./Region/EasternFrontier/WindstailValley/pilgrimsRestInn";
import { desertGateFortress } from "./Region/EasternFrontier/WindstailValley/desertGateFortress";
import { windstailTown } from "./Region/EasternFrontier/WindstailValley/windstailTown";
// Eastern Frontier - Charred Foothills
import { banditsRavine } from "./Region/EasternFrontier/CharredFoothills/banditsRavine";
import { unknownGodCliffsideShrine } from "./Region/EasternFrontier/CharredFoothills/unknownGodCliffsideShrine";
import { minersHollow } from "./Region/EasternFrontier/CharredFoothills/minersHollow";
import { redrockQuarry } from "./Region/EasternFrontier/CharredFoothills/redrockQuarry";

// Location imports - Northern Reaches
// Shiverpine Forest
import { shrineOfTheWhisperingPines } from "./Region/NorthernReaches/ShiverpineForest/shrineOfTheWhisperingPines";
import { wolfskullClearing } from "./Region/NorthernReaches/ShiverpineForest/wolfskullClearing";
import { timberfellCamp } from "./Region/NorthernReaches/ShiverpineForest/timberfellCamp";
import { ancestorsRise } from "./Region/NorthernReaches/ShiverpineForest/ancestorsRise";
import { pinewatchHamlet } from "./Region/NorthernReaches/ShiverpineForest/pinewatchHamlet";
// Frostpastures
import { stonecrossCairn } from "./Region/NorthernReaches/Frostpastures/stonecrossCairn";
import { snowstrideCaravanserai } from "./Region/NorthernReaches/Frostpastures/snowstrideCaravanserai";
import { frosthideRanches } from "./Region/NorthernReaches/Frostpastures/frosthideRanches";
import { cheesemakersHollow } from "./Region/NorthernReaches/Frostpastures/cheesemakersHollow";
import { oxenholdVillage } from "./Region/NorthernReaches/Frostpastures/oxenholdVillage";
// Frostmarch Tundra
import { icetoothRavine } from "./Region/NorthernReaches/FrostmarchTundra/icetoothRavine";
import { bonesOfTheFallen } from "./Region/NorthernReaches/FrostmarchTundra/bonesOfTheFallen";
import { bleakfenCrossing } from "./Region/NorthernReaches/FrostmarchTundra/bleakfenCrossing";
import { huntcliffLodge } from "./Region/NorthernReaches/FrostmarchTundra/huntcliffLodge";
import { forstmarchsPost } from "./Region/NorthernReaches/FrostmarchTundra/forstmarchsPost";
// Ironvale Hills
import { cragspireFort } from "./Region/NorthernReaches/IronvaleHills/cragspireFort";
import { forgehold } from "./Region/NorthernReaches/IronvaleHills/forgehold";
import { deepwellMines } from "./Region/NorthernReaches/IronvaleHills/deepwellMines";
import { stonejawQuarry } from "./Region/NorthernReaches/IronvaleHills/stonejawQuarry";
import { ironvaleTown } from "./Region/NorthernReaches/IronvaleHills/ironvaleTown";
// Velgarth Capital District
import { frozenDocks } from "./Region/NorthernReaches/VelgarthCapitalDistrict/frozenDocks";
import { hallOfIcebanners } from "./Region/NorthernReaches/VelgarthCapitalDistrict/hallOfIcebanners";
import { velgarthCentralStation } from "./Region/NorthernReaches/VelgarthCapitalDistrict/velgarthCentralStation";
import { ironholdKeep } from "./Region/NorthernReaches/VelgarthCapitalDistrict/ironholdKeep";
import { velgarthCity } from "./Region/NorthernReaches/VelgarthCapitalDistrict/velgarthCity";

// Location imports - Silence Desert
// Saltglass Flats
import { theShiftingMirror } from "./Region/SilenceDesert/SaltglassFlats/theShiftingMirror";
import { dunemarchQuarryCamp } from "./Region/SilenceDesert/SaltglassFlats/dunemarchQuarryCamp";
import { glassrockOutcrop } from "./Region/SilenceDesert/SaltglassFlats/glassrockOutcrop";
import { saltglassMines } from "./Region/SilenceDesert/SaltglassFlats/saltglassMines";
// Moonwell Oasis
import { theCrescentFields } from "./Region/SilenceDesert/MoonwellOasis/theCrescentFields";
import { aqueductRuins } from "./Region/SilenceDesert/MoonwellOasis/aqueductRuins";
import { moonwellVillage } from "./Region/SilenceDesert/MoonwellOasis/moonwellVillage";
// Duskmarch Oasis
import { theBrokenWell } from "./Region/SilenceDesert/DuskmarchOasis/theBrokenWell";
import { ashenOasisTown } from "./Region/SilenceDesert/DuskmarchOasis/ashenOasisTown";
// The Eastern Deeps
import { silverfangHideout } from "./Region/SilenceDesert/TheEasternDeeps/silverfangHideout";
import { boneDunes } from "./Region/SilenceDesert/TheEasternDeeps/boneDunes";
import { stormscarHollow } from "./Region/SilenceDesert/TheEasternDeeps/stormscarHollow";
import { shrineOfTheEclipsedSun } from "./Region/SilenceDesert/TheEasternDeeps/shrineOfTheEclipsedSun";
import { ruinsOfKarthis } from "./Region/SilenceDesert/TheEasternDeeps/ruinsOfKarthis";

// Location imports - Atmahn Forest
// Black Coast
import { cintertideLighthouse } from "./Region/AtmahnForest/BlackCoast/cintertideLighthouse";
import { blackmarketOfAshport } from "./Region/AtmahnForest/BlackCoast/blackmarketOfAshport";
import { nightreefDocks } from "./Region/AtmahnForest/BlackCoast/nightreefDocks";
import { obsidianPort } from "./Region/AtmahnForest/BlackCoast/obsidianPort";
// Cinder Peak Highlands
import { theMoltenScar } from "./Region/AtmahnForest/CinderPeakHighlands/theMoltenScar";
import { theRedRidgeShrine } from "./Region/AtmahnForest/CinderPeakHighlands/theRedRidgeShrine";
import { fireglassMines } from "./Region/AtmahnForest/CinderPeakHighlands/fireglassMines";
// Greenblood Basin
import { leechwaterCrossing } from "./Region/AtmahnForest/GreenbloodBasin/leechwaterCrossing";
import { templeOfTheDrownedGod } from "./Region/AtmahnForest/GreenbloodBasin/templeOfTheDrownedGod";
import { theReedbloodMarshes } from "./Region/AtmahnForest/GreenbloodBasin/theReedbloodMarshes";
import { canalTownOfMirehaven } from "./Region/AtmahnForest/GreenbloodBasin/canalTownOfMirehaven";
// Crimson Isles
import { crimsonSpire } from "./Region/AtmahnForest/CrimsonIsles/crimsonSpire";
import { chainedIsle } from "./Region/AtmahnForest/CrimsonIsles/chainedIsle";
import { theDrownedAltar } from "./Region/AtmahnForest/CrimsonIsles/theDrownedAltar";
import { bloodchantIsle } from "./Region/AtmahnForest/CrimsonIsles/bloodchantIsle";

// Location imports - Boreal Frost
// Icehorn Plains
import { winterwatchTower } from "./Region/BorealFrost/IcehornPlains/winterwatchTower";
import { theMammothGraveyard } from "./Region/BorealFrost/IcehornPlains/theMammothGraveyard";
import { frosthornCamp } from "./Region/BorealFrost/IcehornPlains/frosthornCamp";
// White Peaks
import { theFrozenLabyrinth } from "./Region/BorealFrost/WhitePeaks/theFrozenLabyrinth";
import { stormspireCrag } from "./Region/BorealFrost/WhitePeaks/stormspireCrag";
import { theHowlingCaves } from "./Region/BorealFrost/WhitePeaks/theHowlingCaves";
// Worlds Edge
import { sanctumOfSilence } from "./Region/BorealFrost/WorldsEdge/sanctumOfSilence";
import { theBlackGlacier } from "./Region/BorealFrost/WorldsEdge/theBlackGlacier";
import { edgeOfAllThings } from "./Region/BorealFrost/WorldsEdge/edgeOfAllThings";

// Region Repository
export const regionRepository: Record<RegionEnum, Region> = {
  [RegionEnum.CentralPlain]: centralPlain,
  [RegionEnum.SouthernShore]: southernShore,
  [RegionEnum.EasternFrontier]: easternFrontier,
  [RegionEnum.WesternForest]: westernForest,
  [RegionEnum.NorthernReaches]: northernReaches,
  [RegionEnum.SilentDesert]: silenceDesert,
  [RegionEnum.Atmahn]: atmahnForest,
  [RegionEnum.BorealFrost]: borealFrost,
};

// SubRegion Repository
export const subregionRepository: Record<SubRegionEnum, SubRegion> = {
  // Central Plains
  [SubRegionEnum.GoldenPlains]: goldenPlains,
  [SubRegionEnum.FyonarCapitalDistrict]: fyonarCapital,
  [SubRegionEnum.GreatWhiteValley]: greatWhiteValley,
  [SubRegionEnum.SouthFarms]: southFarm,
  [SubRegionEnum.EastfieldFrontier]: eastfieldFrontier,
  [SubRegionEnum.NorthmarchDowns]: northmarchDowns,
  // Southern Shore
  [SubRegionEnum.OceanTideCapitalDistrict]: oceanTideCapitalDistrict,
  [SubRegionEnum.MeadowlineHinterlands]: meadowlineHinterlands,
  [SubRegionEnum.StormshoreCliffs]: stormshoreCliffs,
  [SubRegionEnum.LanternCoast]: lanternCoast,
  [SubRegionEnum.SaltreachMarshes]: saltreachMarshes,
  // Eastern Frontier
  [SubRegionEnum.GoldburgCapitalDistrict]: goldburgCapitalDistrict,
  [SubRegionEnum.DrymarchFarms]: drymarchFarms,
  [SubRegionEnum.GreybarrowFlats]: greybarrowFlats,
  [SubRegionEnum.WindstailValley]: windstailValley,
  [SubRegionEnum.CharredFoothills]: charredFoothills,
  // Western Forest
  [SubRegionEnum.EmeraldCanopy]: emeraldCanopy,
  [SubRegionEnum.CoastalLowlands]: coastalLowlands,
  [SubRegionEnum.JadintharCapitalDistrict]: jadintharCapitalDistrict,
  [SubRegionEnum.ShadowfenBasin]: shadowfenBasin,
  // Northern Reaches
  [SubRegionEnum.ShiverpineForest]: shiverpineForest,
  [SubRegionEnum.FrostPastures]: frostpastures,
  [SubRegionEnum.FrostmarchTundra]: frostmarchTundra,
  [SubRegionEnum.IronvaleHills]: ironvaleHills,
  [SubRegionEnum.ValgarthCapitalDistrict]: velgarthCapitalDistrict,
  // Silence Desert
  [SubRegionEnum.SaltglassFlats]: saltglassFlats,
  [SubRegionEnum.MoonwellOasis]: moonwellOasis,
  [SubRegionEnum.DuskmarchOasis]: duskmarchOasis,
  [SubRegionEnum.TheEasternDeeps]: theEasternDeeps,
  // Atmahn Forest
  [SubRegionEnum.BlackCoast]: blackCoast,
  [SubRegionEnum.CinderpeakHighlands]: cinderPeakHighlands,
  [SubRegionEnum.GreenbloodBasin]: greenbloodBasin,
  [SubRegionEnum.CrimsonIsles]: crimsonIsles,
  // Boreal Frost
  [SubRegionEnum.IcehornPlains]: icehornPlains,
  [SubRegionEnum.WhitePeaks]: whitePeaks,
  [SubRegionEnum.WorldsEdge]: worldsEdge,
};

// Location Repository
export const locationRepository: Record<LocationsEnum, Location> = {
  // Golden Plains
  [LocationsEnum.WaywardInn]: waywardInn,
  [LocationsEnum.GreengateStation]: greengateStation,
  [LocationsEnum.StonecrossManor]: stonecrossManor,
  [LocationsEnum.GoldentideField]: goldentideField,
  [LocationsEnum.BrayhornVillage]: brayhornVillage,
  // Fyonar Capital District
  [LocationsEnum.FyonarBarrack]: fyonarBarrack,
  [LocationsEnum.VoltspireElectric]: voltspireElectric,
  [LocationsEnum.FyonarCentralStation]: fyonarCentralStation,
  [LocationsEnum.FyonarCastle]: fyonarCastle,
  [LocationsEnum.BelfortMercantileExchange]: belfortMercantileExchange,
  [LocationsEnum.GrandTempleOfLaoh]: grandTempleOfLaoh,
  [LocationsEnum.FyonarCity]: fyonarCity,
  // Great White Valley
  [LocationsEnum.LanternPost]: lanternPost,
  [LocationsEnum.FerryHollow]: ferryHollow,
  [LocationsEnum.StonefordCrossing]: stonefordCrossing,
  [LocationsEnum.Riversmeet]: riversmeet,
  // South Farms
  [LocationsEnum.IronwellStation]: ironwellStation,
  [LocationsEnum.FarmersGuildHall]: farmersGuildHall,
  [LocationsEnum.Hearthvale]: hearthvale,
  [LocationsEnum.MeadowbrookVillage]: meadowbrookVillage,
  [LocationsEnum.PlagueWaterCrossing]: plaguewaterCrossing,
  [LocationsEnum.TheHollowSpire]: theHollowSpire,
  [LocationsEnum.WitchlightMire]: witchlightMire,
  [LocationsEnum.SunkenTempleOfRowana]: sunkenTempleOfRowana,
  [LocationsEnum.BlackrootHamlet]: blackrootHamlet,
  [LocationsEnum.SkycanopyVillage]: skycanopyVillage,
  [LocationsEnum.HardsoilVillage]: hardsoilVillage,
  [LocationsEnum.VirdralRuins]: virdralRuins,
  // Eastfield Frontier
  [LocationsEnum.DustmereVillage]: dustmereVillage,
  [LocationsEnum.OldShrineOfLaoh]: oldShrineOfLaoh,
  [LocationsEnum.DryfieldWells]: dryfieldWells,
  [LocationsEnum.FrontierWatchtower]: frontierWatchtower,
  // Northmarch Downs
  [LocationsEnum.BarrowfordStation]: barrowfordStation,
  [LocationsEnum.NorthmarchPost]: northmarchPost,
  [LocationsEnum.WolfsGateHamlet]: wolfsGateHamlet,
  [LocationsEnum.ShepherdsHollow]: shepherdsHollow,
  // Western Forest - Emerald Canopy
  [LocationsEnum.TotemheartVillage]: totemheartVillage,
  // Western Forest - Coastal Lowlands
  [LocationsEnum.MarshlightBeacon]: marshlightBeacon,
  [LocationsEnum.ReedwalkCauseway]: reedwalkCauseway,
  [LocationsEnum.NettlemireSaltPans]: nettlemireSaltPans,
  [LocationsEnum.BrackwaterParish]: brackwaterParish,
  [LocationsEnum.SaltfenDocks]: saltfenDocks,
  // Western Forest - Jadinthar Capital District
  [LocationsEnum.RivercourtDockyardsAndBazaar]: rivercourtDockyardsAndBazaar,
  [LocationsEnum.GreenveilRailTerminus]: greenveilRailTerminus,
  [LocationsEnum.JadintharBarrack]: jadintharBarrack,
  [LocationsEnum.VinesPalce]: vinesPalace,
  [LocationsEnum.JadintharCity]: jadintharCity,
  // Southern Shore - Ocean Tide Capital District
  [LocationsEnum.OceanTideInnerCity]: oceanTideInnerCity,
  [LocationsEnum.OceanTideBarrack]: oceanTideBarrack,
  [LocationsEnum.OceanTideGrandStation]: oceanTideGrandStation,
  [LocationsEnum.OceanTideHarborDistrict]: oceanTideHarborDistrict,
  [LocationsEnum.OceanTideCastle]: oceanTideCastle,
  [LocationsEnum.TheAcademia]: theAcademia,
  // Southern Shore - Meadowline Hinterlands
  [LocationsEnum.MeadowlineStation]: meadowlineStation,
  [LocationsEnum.PebbletonsRanch]: pebbletonsRanch,
  [LocationsEnum.WillmooreForest]: willmooreForest,
  [LocationsEnum.FairgroundFields]: fairgroundFields,
  [LocationsEnum.BrambletonOrchards]: brambletonOrchards,
  [LocationsEnum.MeadowportTown]: meadowportTown,
  // Southern Shore - Stormshore Cliffs
  [LocationsEnum.SingingCaves]: singingCaves,
  [LocationsEnum.TidewatchFortress]: tidewatchFortress,
  [LocationsEnum.WindmereVillage]: windmereVillage,
  // Southern Shore - Lantern Coast
  [LocationsEnum.LanternCoastsPilgrimShrine]: lanternCoastsPilgrimShrine,
  [LocationsEnum.TheGrandLighthouse]: theGrandLighthouse,
  [LocationsEnum.LanternshoreTown]: lanternshoreTown,
  // Southern Shore - Saltreach Marshes
  [LocationsEnum.SaltreachStation]: saltreachStation,
  [LocationsEnum.SmugglersCove]: smugglersCove,
  [LocationsEnum.OysterReefs]: oysterReefs,
  [LocationsEnum.SaltreachVillage]: saltreachVillage,
  // Eastern Frontier - Goldburg Capital District
  [LocationsEnum.GoldburgBarrackFortress]: goldburgBarrackFortress,
  [LocationsEnum.MerchantsQuarter]: merchantsQuarter,
  [LocationsEnum.GoldburgRailTerminus]: goldburgRailTerminus,
  [LocationsEnum.GoldburgCastle]: goldburgCastle,
  [LocationsEnum.GoldburgCity]: goldburgCity,
  // Eastern Frontier - Drymarch Farms
  [LocationsEnum.WanderersShrineOfDrymarch]: wanderersShrineOfDrymarch,
  [LocationsEnum.DrymarchWindmills]: drymarchWindmills,
  [LocationsEnum.DrymarchGrainfields]: drymarchGrainfields,
  [LocationsEnum.DrymarchVillage]: drymarchVillage,
  // Eastern Frontier - Greybarrow Flats
  [LocationsEnum.TheOldBattlefield]: theOldBattlefield,
  [LocationsEnum.GreybarrowPost]: greybarrowPost,
  [LocationsEnum.AncestorBarrows]: ancestorBarrows,
  [LocationsEnum.GreybarrowVillage]: greybarrowVillage,
  // Eastern Frontier - Windstail Valley
  [LocationsEnum.PilgrimsRestInn]: pilgrimsRestInn,
  [LocationsEnum.DesertGateFortress]: desertGateFortress,
  [LocationsEnum.WindstailTown]: windstailTown,
  // Eastern Frontier - Charred Foothills
  [LocationsEnum.BanditsRavine]: banditsRavine,
  [LocationsEnum.UnknownGodCliffsideShrine]: unknownGodCliffsideShrine,
  [LocationsEnum.MinersHollow]: minersHollow,
  [LocationsEnum.RedrockQuarry]: redrockQuarry,
  // Silence Desert - Saltglass Flats
  [LocationsEnum.TheShiftingMirror]: theShiftingMirror,
  [LocationsEnum.DunemarchQuarryCamp]: dunemarchQuarryCamp,
  [LocationsEnum.GlassrockOutcrop]: glassrockOutcrop,
  [LocationsEnum.SalrglassMines]: saltglassMines,
  // Silence Desert - Moonwell Oasis
  [LocationsEnum.TheCrescentFields]: theCrescentFields,
  [LocationsEnum.AqueductRuins]: aqueductRuins,
  [LocationsEnum.MoonwellVillage]: moonwellVillage,
  // Silence Desert - Duskmarch Oasis
  [LocationsEnum.TheBrokenWell]: theBrokenWell,
  [LocationsEnum.AshenOasisTown]: ashenOasisTown,
  // Silence Desert - The Eastern Deeps
  [LocationsEnum.SilverfangHideout]: silverfangHideout,
  [LocationsEnum.BoneDunes]: boneDunes,
  [LocationsEnum.StormscarHollow]: stormscarHollow,
  [LocationsEnum.ShrineOfTheEclipsedSun]: shrineOfTheEclipsedSun,
  [LocationsEnum.RuinsOfKarthis]: ruinsOfKarthis,
  // Northern Reaches - Shiverpine Forest
  [LocationsEnum.ShrineOfTheWhisperingPines]: shrineOfTheWhisperingPines,
  [LocationsEnum.WolfskullClearing]: wolfskullClearing,
  [LocationsEnum.TimberfellCamp]: timberfellCamp,
  [LocationsEnum.AncestorsRise]: ancestorsRise,
  [LocationsEnum.PinewatchHamlet]: pinewatchHamlet,
  // Northern Reaches - Frostpastures
  [LocationsEnum.StonecrossCairn]: stonecrossCairn,
  [LocationsEnum.SnowstrideCaravanserai]: snowstrideCaravanserai,
  [LocationsEnum.FrosthideRanches]: frosthideRanches,
  [LocationsEnum.CheesemakersHollow]: cheesemakersHollow,
  [LocationsEnum.OxenholdVillage]: oxenholdVillage,
  // Northern Reaches - Frostmarch Tundra
  [LocationsEnum.IcetoothRavine]: icetoothRavine,
  [LocationsEnum.BonesOfTheFallen]: bonesOfTheFallen,
  [LocationsEnum.BleakfenCrossing]: bleakfenCrossing,
  [LocationsEnum.HuntcliffLodge]: huntcliffLodge,
  [LocationsEnum.ForstmarchsPost]: forstmarchsPost,
  // Northern Reaches - Ironvale Hills
  [LocationsEnum.CragspireFort]: cragspireFort,
  [LocationsEnum.Forgehold]: forgehold,
  [LocationsEnum.DeepwellMines]: deepwellMines,
  [LocationsEnum.StonejawQuarry]: stonejawQuarry,
  [LocationsEnum.IronvaleTown]: ironvaleTown,
  // Northern Reaches - Velgarth Capital District
  [LocationsEnum.FrozenDocks]: frozenDocks,
  [LocationsEnum.HallOfIcebanners]: hallOfIcebanners,
  [LocationsEnum.VelgarthCentralStation]: velgarthCentralStation,
  [LocationsEnum.IronholdKeep]: ironholdKeep,
  [LocationsEnum.VelgarthCity]: velgarthCity,
  // Atmahn Forest - Black Coast
  [LocationsEnum.CintertideLighthouse]: cintertideLighthouse,
  [LocationsEnum.BlackmarketOfAshport]: blackmarketOfAshport,
  [LocationsEnum.NightreefDocks]: nightreefDocks,
  [LocationsEnum.ObsidianPort]: obsidianPort,
  // Atmahn Forest - Cinder Peak Highlands
  [LocationsEnum.TheMoltenScar]: theMoltenScar,
  [LocationsEnum.TheRedRidgeShrine]: theRedRidgeShrine,
  [LocationsEnum.FireglassMines]: fireglassMines,
  // Atmahn Forest - Greenblood Basin
  [LocationsEnum.LeechwaterCrossing]: leechwaterCrossing,
  [LocationsEnum.TempleOfTheDrownedGod]: templeOfTheDrownedGod,
  [LocationsEnum.TheReedbloodMarshes]: theReedbloodMarshes,
  [LocationsEnum.CanalTownOfMirehaven]: canalTownOfMirehaven,
  // Atmahn Forest - Crimson Isles
  [LocationsEnum.CrimsonSpire]: crimsonSpire,
  [LocationsEnum.ChainedIsle]: chainedIsle,
  [LocationsEnum.TheDrownedAltar]: theDrownedAltar,
  [LocationsEnum.BloodchantIsle]: bloodchantIsle,
  // Boreal Frost - Icehorn Plains
  [LocationsEnum.WinterwatchTower]: winterwatchTower,
  [LocationsEnum.TheMammothGraveyard]: theMammothGraveyard,
  [LocationsEnum.FrosthornCamp]: frosthornCamp,
  // Boreal Frost - White Peaks
  [LocationsEnum.TheFrozenLabyrinth]: theFrozenLabyrinth,
  [LocationsEnum.StormspireCrag]: stormspireCrag,
  [LocationsEnum.TheHowlingCaves]: theHowlingCaves,
  // Boreal Frost - Worlds Edge
  [LocationsEnum.SanctumOfSilence]: sanctumOfSilence,
  [LocationsEnum.TheBlackGlacier]: theBlackGlacier,
  [LocationsEnum.EdgeOfAllThings]: edgeOfAllThings,
  // Duplicate enum value (typo in enum)
  [LocationsEnum.NightReefDocks]: nightreefDocks,
}

// Helper function to get locations by subregion
export const getLocationBySubRegion = (subRegion: SubRegionEnum): Location[] => {
  return Object.values(locationRepository).filter(
    (location) => location.subRegion === subRegion,
  );
};

// ============================================================================
// Location Connections
// ============================================================================
// Connections are set up here after all locations are created to avoid circular dependencies
// Distance values represent the total distance needed to travel between locations
// For reference: ~30 distance per phase for measured pace walking on normal terrain
// A full day (4 phases) = ~120 distance

function addLocationConnections(locationA: Location, locationB: Location, distance: number) {
  locationA.connectedLocations.push({ location: locationB, distance });
  locationB.connectedLocations.push({ location: locationA, distance });
}

addLocationConnections(waywardInn, greengateStation, 120);
// Full day walk
// Old rail corridor, safe but long
// Explains overnight stays, delayed travel, importance of inn

addLocationConnections(waywardInn, brayhornVillage, 60);
// Half day walk
// Regular civilian movement, carts, daily trade possible but tiring

addLocationConnections(waywardInn, goldentideField, 30);
// One phase walk
// Fields are close; workers can plausibly return same day

addLocationConnections(waywardInn, stonecrossManor, 60);
// Half day walk
// Manor intentionally distant but reachable
// Reinforces isolation + old power