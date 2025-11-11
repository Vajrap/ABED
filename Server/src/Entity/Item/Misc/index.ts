/**
 * Miscellaneous item IDs
 * All misc items must have an entry here for type safety and repository lookup
 */

// Resource IDs
export enum WoodId {
  Oak = "Oak",
  Pine = "Pine",
  Maple = "Maple",
  Ironwood = "Ironwood",
}

export enum SkinId {
  // ------------------------------------------------------------
  // Common Beasts
  // ------------------------------------------------------------
  WolfPelt = "WolfPelt",            // From wolves; coarse and warm, common crafting material.
  DirewolfPelt = "DirewolfPelt",    // Thick, durable hide from direwolves; resistant to cold.
  BearHide = "BearHide",            // Dense and heavy; used for rugged armor and cloaks.
  BoarHide = "BoarHide",            // Tough and fibrous; good for heavy leather.
  StagFur = "StagFur",              // Soft and decorative; used in fine tailoring.
  ElephantHide = "ElephantHide",    // Thick and wrinkled; prized for tough armor and shields.
  CrocodileHide = "CrocodileHide",  // Armored and scaly; excellent for durable leather goods.
  TigerPelt = "TigerPelt",          // Striped and vibrant; used in ceremonial garments.
  LionMane = "LionMane",            // Luxurious and thick; valued for ornamental use.
  DeerHide = "DeerHide",            // Soft and supple; common in light armor crafting.
  GoatHide = "GoatHide",            // Coarse and durable; used in rugged clothing.
  BisonHide = "BisonHide",          // Heavy and dense; suited for strong leather gear.

  // ------------------------------------------------------------
  // Reptilian / Draconic
  // ------------------------------------------------------------
  DragonlingScale = "DragonlingScale", // From small pack-hunting draconic beasts.
  WyvernScale = "WyvernScale",         // Lighter, flexible scale; retains faint magical charge.
  DrakeScale = "DrakeScale",           // Large, reinforced scale; heavy but durable.
  WyrmScale = "WyrmScale",             // Massive, thick scale; nearly impenetrable.
  SeaWyrmScale = "SeaWyrmScale",       // Smooth, salt-resistant scale; glimmers in water.
  DragonScale = "DragonScale",         // Apex-tier draconic material; resonates with elemental power.
  LizardSkin = "LizardSkin",           // Small, flexible scales; good for light armor.
  TurtleShell = "TurtleShell",         // Hard and protective; used for shields and armor.

  // ------------------------------------------------------------
  // Aquatic Creatures
  // ------------------------------------------------------------
  SharkSkin = "SharkSkin",             // Rough and abrasive; excellent for tough leather.
  WhaleSkin = "WhaleSkin",             // Thick and oily; used in water-resistant gear.

  // ------------------------------------------------------------
  // Exotic / Magical Beasts
  // ------------------------------------------------------------
  Chitin = "Chitin",                 // Insectoid exoskeleton; used in light armor crafting.
  SerpentSkin = "SerpentSkin",       // Flexible scaled hide; used in agility-focused gear.
  FiendHide = "FiendHide",           // From planar beasts; faintly warm, resists magic.
  AetherSkin = "AetherSkin",         // From magical creatures; shimmers faintly under light.
  SpiritHide = "SpiritHide",         // Ethereal hide from phantasmal beasts; light but strong.
  CrystalCarapace = "CrystalCarapace", // From gem-bodied beasts; refracts light beautifully.
  GriffonFeatheredHide = "GriffonFeatheredHide", // Tough hide with feathered patches; prized by skyfarers.
  BasiliskScale = "BasiliskScale",   // Petrifying scales; rare and dangerous to handle.
  ChimeraHide = "ChimeraHide",       // Patchwork hide from multiple beasts; imbued with chaotic energies.
  HydraSkin = "HydraSkin",           // Regenerative scaled skin; used in high-tier armor.
  YetiFur = "YetiFur",               // Thick and insulating; essential for cold weather gear.
  SalamanderSkin = "SalamanderSkin", // Heat-resistant and flexible; used in fireproof clothing.
  PhoenixFeatheredHide = "PhoenixFeatheredHide", // Fiery feathers fused with hide; rare and magical.
  ManticoreHide = "ManticoreHide",   // Spiked and tough; used in dangerous beast armors.
  LeviathanScale = "LeviathanScale", // Massive, oceanic scale; nearly indestructible.
}

export enum BoneId {
  Bone = "Bone",                  // Common animal bone
  Fang = "Fang",                  // Small predator’s fang
  Horn = "Horn",                  // Beast horn or antler
  Ivory = "Ivory",                // From elephants or large beasts
  Talon = "Talon",                // Sharp claw or bird of prey’s talon
  Drakespine = "Drakespine",      // Spine from scaled beast
  SpiritBone = "SpiritBone",      // Semi-transparent bone infused with magic
  ErebiteBone = "ErebiteBone",    // Corrupted fossilized remains; planar-tainted
  ElephantTusk = "ElephantTusk",  // Massive ivory tusks prized for crafting and decoration.
  CrocodileBone = "CrocodileBone", // Dense and sturdy bone from crocodilian beasts.
  TigerFang = "TigerFang",        // Sharp and curved fang; used in talismans.
  LionFang = "LionFang",          // Large predator fang; symbolizes strength.
  DeerAntler = "DeerAntler",      // Branching antlers used in crafting and decoration.
  GoatHorn = "GoatHorn",          // Curved and hard horn; used in tools and ornaments.
  BisonBone = "BisonBone",        // Thick and heavy bone; used in robust crafting.
  LizardBone = "LizardBone",      // Lightweight and flexible; common in small constructs.
  TurtleShell = "TurtleShell",    // Hard, protective shell segments used in armor.
  SharkTooth = "SharkTooth",      // Razor-sharp tooth; used in weapons and jewelry.
  WhaleRib = "WhaleRib",          // Massive rib bones; used in large-scale crafting.
  GriffonTalon = "GriffonTalon",  // Large, curved talon; prized by hunters and warriors.
  BasiliskBone = "BasiliskBone",  // Dense and petrifying bone fragments.
  ChimeraSpine = "ChimeraSpine",  // Multi-segmented spine; chaotic and powerful.
  HydraSkull = "HydraSkull",      // Multi-headed skull; rare and magical.
  YetiBone = "YetiBone",          // Dense and cold-infused bone from cold regions.
  SalamanderBone = "SalamanderBone", // Heat-resistant bone; used in fireproof gear.
  PhoenixFeatherBone = "PhoenixFeatherBone", // Lightweight bone fused with fiery feathers.
  ManticoreSpike = "ManticoreSpike", // Sharp, venomous spike; used in deadly weapons.
  LeviathanBone = "LeviathanBone", // Massive and ancient bone from ocean leviathans.
}

export enum OreId {
  CopperOre = "CopperOre",
  TinOre = "TinOre",
  IronOre = "IronOre",
  SilverOre = "SilverOre",
  GoldOre = "GoldOre",
  PlanariteOre = "PlanariteOre",
  ErebiteOre = "ErebiteOre",
}


/**
 * Refined Resource IDs
 */

export enum IngotId {
  CopperIngot = "CopperIngot",
  TinIngot = "TinIngot",
  IronIngot = "IronIngot",
  SilverIngot = "SilverIngot",
  GoldIngot = "GoldIngot",
  BronzeIngot = "BronzeIngot",
  SteelIngot = "SteelIngot",
  ElectrumIngot = "ElectrumIngot",
  AethersteelIngot = "AetherSteelIngot",
  VoidforgedIngot = "VoidforgedIngot",
}

export enum PlankId {
  OakPlank = "OakPlank",
  PinePlank = "PinePlank",
  MaplePlank = "MaplePlank",
  IronwoodPlank = "IronwoodPlank",
}

// ============================================================
// LEATHER — Derived from tannable hides and skins
// ============================================================

export enum LeatherId {
  // ------------------------------------------------------------
  // Common Leathers (Everyday beasts)
  // ------------------------------------------------------------
  Leather = "Leather",               // Generic tanned hide from wolves, goats, and similar creatures.
  FineLeather = "FineLeather",       // From soft pelts like deer, lion, or tiger.
  ThickLeather = "ThickLeather",     // From large beasts like bear or bison; heavy-duty armor.
  RuggedLeather = "RuggedLeather",   // From elephant or boar; thick and durable.

  // ------------------------------------------------------------
  // Reptilian & Draconic
  // ------------------------------------------------------------
  ScaledLeather = "ScaledLeather",   // From lizard or serpent skin; flexible yet protective.
  WyvernLeather = "WyvernLeather",   // Faintly conductive to magic; light armor material.
  DrakeLeather = "DrakeLeather",     // Heavy, enchanted hide from drakes.
  HydraLeather = "HydraLeather",     // Regenerative leather; self-repairing properties.
  LeviathanLeather = "LeviathanLeather", // Waterproof, made from oceanic scales.

  // ------------------------------------------------------------
  // Magical & Planar
  // ------------------------------------------------------------
  FiendLeather = "FiendLeather",     // Planar-tanned hide; warm, fire-resistant.
  AetherLeather = "AetherLeather",   // From magical beasts; shimmers with faint planar light.
  SpiritLeather = "SpiritLeather",   // Ethereal, semi-transparent leather.
  YetiLeather = "YetiLeather",       // From YetiFur; insulating and frost-resistant.
  SalamanderLeather = "SalamanderLeather", // Fireproof, flexible leather from SalamanderSkin.
  ManticoreLeather = "ManticoreLeather",   // Spiked, toxin-resistant hide; favored by rogues.
}

// ============================================================
// THREAD — Spun or magical fibers
// ============================================================

export enum ThreadId {
  // ------------------------------------------------------------
  // Common Fibers
  // ------------------------------------------------------------
  WoolThread = "WoolThread",         // From sheep or bison wool; common textile fiber.
  LinenThread = "LinenThread",       // From flax; light and breathable.
  SilkThread = "SilkThread",         // Fine luxury fiber from silkworms or jungle spiders.
  CottonThread = "CottonThread",     // Soft and versatile; everyday clothing material.

  // ------------------------------------------------------------
  // Monster-Derived Fibers
  // ------------------------------------------------------------
  SpiderSilk = "SpiderSilk",         // Exceptionally strong and light; used in fine crafts.
  YetiThread = "YetiThread",         // Thick and warm fiber spun from YetiFur.
  PhoenixThread = "PhoenixThread",   // Glows faintly; holds residual fire magic.
  SalamanderThread = "SalamanderThread", // Heatproof thread; used for flame-resistant gear.
  SpiritThread = "SpiritThread",     // Ethereal fiber for arcane garments.
  AetherThread = "AetherThread",     // Planar essence spun into thread; highly conductive to magic.

  // ------------------------------------------------------------
  // Industrial & Synthetic Fibers
  // ------------------------------------------------------------
  SteamspunFiber = "SteamspunFiber", // Machine-made thread; uniform and durable.
  FluxWeave = "FluxWeave",           // Hybrid mechanical-magical fiber; used in magitech clothing.
}

// ============================================================
// CLOTH — Woven textiles and magical fabrics
// ============================================================

export enum ClothId {
  // ------------------------------------------------------------
  // Common Textiles
  // ------------------------------------------------------------
  LinenCloth = "LinenCloth",         // Basic woven fabric; common for light clothing.
  CottonCloth = "CottonCloth",       // Soft, breathable, and versatile everyday cloth.
  WoolCloth = "WoolCloth",           // Warm and insulating fabric for colder regions.
  SilkCloth = "SilkCloth",           // Smooth luxury cloth, ideal for noble attire.

  // ------------------------------------------------------------
  // Monster-Derived Fabrics
  // ------------------------------------------------------------
  SpiderSilkCloth = "SpiderSilkCloth", // Impossibly strong yet featherlight fabric.
  YetiCloth = "YetiCloth",             // Thick insulating fabric; used in winter gear.
  PhoenixCloth = "PhoenixCloth",       // Flame-resistant and faintly radiant.
  SpiritCloth = "SpiritCloth",         // Semi-transparent magical weave.
  Aetherweave = "Aetherweave",         // Woven from planar threads; holds enchantments well.
  Fiendcloth = "Fiendcloth",           // Resistant to corruption and heat.
  FluxweaveCloth = "FluxweaveCloth",   // Infused with energy circuits; magitech fabric.

  // ------------------------------------------------------------
  // Exotic & High-End Materials
  // ------------------------------------------------------------
  DragonskinWeave = "DragonskinWeave", // Flexible armored textile woven from draconic fibers.
  LeviathanLining = "LeviathanLining", // Waterproof lining; ideal for sea or storm gear.
  HydraWeave = "HydraWeave",           // Self-repairing enchanted cloth.
}

export enum RawGemId {
  RoughGem = "RoughGem", // Uncut, unaligned gemstone. The root of all refined gemcraft.
}

export enum GemId {

  // ------------------------------------------------------------
  // Arcane (Quartz)
  // ------------------------------------------------------------
  FlawedQuartz = "FlawedQuartz",       // Common-grade quartz, impure but usable for low-tier enchantments.
  PolishedQuartz = "PolishedQuartz",   // Refined and clear; often used as focus medium in wands.
  BrilliantQuartz = "BrilliantQuartz", // High-grade arcane conduit; base for synthesis.
  PerfectQuartz = "PerfectQuartz",     // Purest natural quartz; ideal for amplifying neutral magic.

  // ------------------------------------------------------------
  // Order (Diamond)
  // ------------------------------------------------------------
  FlawedDiamond = "FlawedDiamond",       // Slightly clouded diamond, still conducts structured energy.
  PolishedDiamond = "PolishedDiamond",   // Refined diamond, prized for precise energy transmission.
  BrilliantDiamond = "BrilliantDiamond", // High-grade; used in focusing lenses and barriers.
  PerfectDiamond = "PerfectDiamond",     // Absolute clarity; symbol of perfection and Order.

  // ------------------------------------------------------------
  // Chaos (Amethyst)
  // ------------------------------------------------------------
  FlawedAmethyst = "FlawedAmethyst",       // Unstable and impure, faint chaotic resonance.
  PolishedAmethyst = "PolishedAmethyst",   // Smoothed and controlled, used in illusion or resonance magic.
  BrilliantAmethyst = "BrilliantAmethyst", // Bright purple core; channels fluctuating energy.
  PerfectAmethyst = "PerfectAmethyst",     // Pure chaotic focus; powerful but unpredictable.

  // ------------------------------------------------------------
  // Fire (Ruby)
  // ------------------------------------------------------------
  FlawedRuby = "FlawedRuby",       // Dull red stone, weak elemental flame.
  PolishedRuby = "PolishedRuby",   // Warm glow; often used in smithing charms.
  BrilliantRuby = "BrilliantRuby", // Radiant gem of fire affinity; base for synthesis.
  PerfectRuby = "PerfectRuby",     // Flawless ember; embodiment of elemental Fire.

  // ------------------------------------------------------------
  // Earth (Onyx)
  // ------------------------------------------------------------
  FlawedOnyx = "FlawedOnyx",       // Rough and heavy; common stabilizing agent in alchemy.
  PolishedOnyx = "PolishedOnyx",   // Glossy black gem; grounds magical feedback.
  BrilliantOnyx = "BrilliantOnyx", // Pure dark stone; stabilizes enchantments and constructs.
  PerfectOnyx = "PerfectOnyx",     // Unbreakable gem of resilience and grounding.

  // ------------------------------------------------------------
  // Water (Sapphire)
  // ------------------------------------------------------------
  FlawedSapphire = "FlawedSapphire",       // Dull blue gem with faint reflective energy.
  PolishedSapphire = "PolishedSapphire",   // Smooth surface; used in cooling and clarity rituals.
  BrilliantSapphire = "BrilliantSapphire", // Vibrant and flowing; base for synthesis.
  PerfectSapphire = "PerfectSapphire",     // Flawless water crystal; pure conduit of fluid energy.

  // ------------------------------------------------------------
  // Wind (Topaz)
  // ------------------------------------------------------------
  FlawedTopaz = "FlawedTopaz",       // Cloudy yellow gem, hums faintly when moved.
  PolishedTopaz = "PolishedTopaz",   // Clear and resonant; used in motion spells.
  BrilliantTopaz = "BrilliantTopaz", // High-grade focus; base for synthesis.
  PerfectTopaz = "PerfectTopaz",     // Transparent golden gem; carries the essence of Air.

  // ============================================================
  // Planar Synthesis Line (Magical Infusion)
  // ============================================================
  // Created by fusing Brilliant or Perfect gems with Planarite Ore.
  // Radiate with unstable planar energy, used for high-level enchantments.

  PlanariteQuartz = "PlanariteQuartz",
  PerfectPlanariteQuartz = "PerfectPlanariteQuartz",
  PlanariteDiamond = "PlanariteDiamond",
  PerfectPlanariteDiamond = "PerfectPlanariteDiamond",
  PlanariteAmethyst = "PlanariteAmethyst",
  PerfectPlanariteAmethyst = "PerfectPlanariteAmethyst",
  PlanariteRuby = "PlanariteRuby",
  PerfectPlanariteRuby = "PerfectPlanariteRuby",
  PlanariteOnyx = "PlanariteOnyx",
  PerfectPlanariteOnyx = "PerfectPlanariteOnyx",
  PlanariteSapphire = "PlanariteSapphire",
  PerfectPlanariteSapphire = "PerfectPlanariteSapphire",
  PlanariteTopaz = "PlanariteTopaz",
  PerfectPlanariteTopaz = "PerfectPlanariteTopaz",

  // ============================================================
  // Industrial Refinement Line (Mechanical Precision)
  // ============================================================
  // Created by applying steam pressure, alloy infusion, or machining methods.
  // Prioritize stability, conductivity, and physical precision over raw magic.

  RefinedQuartz = "RefinedQuartz",     // Mechanically polished for precision instrumentation.
  MachinedQuartz = "MachinedQuartz",   // Used as logic or timing crystal in automata.
  RefinedDiamond = "RefinedDiamond",   // Cut for precision; energy control lenses.
  MachinedDiamond = "MachinedDiamond", // Serves as structural component in high-grade engines.
  RefinedAmethyst = "RefinedAmethyst", // Stabilized resonance gem; filters chaotic waves.
  MachinedAmethyst = "MachinedAmethyst", // Used in feedback regulation systems.
  RefinedRuby = "RefinedRuby",         // Heat capacitor for forges and plasma conduits.
  MachinedRuby = "MachinedRuby",       // Industrial-grade core for power cells.
  RefinedOnyx = "RefinedOnyx",         // Strengthened stone for energy dampening.
  MachinedOnyx = "MachinedOnyx",       // Foundation gem in construct frames and armor.
  RefinedSapphire = "RefinedSapphire", // Temperature control and coolant regulation.
  MachinedSapphire = "MachinedSapphire", // Stabilizer in magical engines.
  RefinedTopaz = "RefinedTopaz",       // Used for resonance tuning and guidance systems.
  MachinedTopaz = "MachinedTopaz",     // Core of communication or navigation arrays.

  // ============================================================
  // Conductive Line (Electro-Planar Integration)
  // ============================================================
  // Created by exposing high-grade gems to controlled lightning or arcane current.
  // They channel or modulate Planar electricity, forming the base of magitech circuits.

  ArcQuartz = "ArcQuartz",           // Generates oscillating current; used in signal relays.
  ChargedDiamond = "ChargedDiamond", // Conducts energy with minimal loss; used in reactors.
  WaveAmethyst = "WaveAmethyst",     // Modulates current frequencies; used in communication.
  ChargedRuby = "ChargedRuby",       // Converts energy to heat; powers plasma tools.
  GroundOnyx = "GroundOnyx",         // Absorbs excess current; safety node in circuits.
  CryoSapphire = "CryoSapphire",     // Regulates current temperature; coolant gem.
  PulseTopaz = "PulseTopaz",         // Stores and releases electrical pulses; used in capacitors.
}

export type RawResourceID = WoodId | SkinId | BoneId | OreId | RawGemId;


export type RefinedResourceID =
  | IngotId
  | PlankId
  | LeatherId
  | ThreadId
  | GemId
  | ClothId
  

export type ResourceId = RawResourceID | RefinedResourceID;

// Other Misc IDs
export enum GoldId {
  gold = "gold",
}

export type MiscItemId = ResourceId | GoldId;
