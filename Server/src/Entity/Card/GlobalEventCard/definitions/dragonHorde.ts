
// /**
//  * Dragon Horde - Escalating monster threat
//  * 
//  * From doc:
//  * - 75–120: Dire wolves appear (+20% encounter)
//  * - 121–170: Dragonlings join (+25% each)
//  * - 171–210: Drakes spawn (5 bosses, +10% encounter)
//  * - 211–220: Wyverns spawn (5 bosses, +15% encounter)
//  * - 221–249: Wyrm spawns (1 mega-boss, routes 90% unsafe)
//  * - 250: The Dragon descends! (apex boss)
//  */
// export const DragonHordeCard: GlobalEventCardConfig = {
//   id: GlobalEventCardEnum.DragonHorde,
//   name: "The Dragon Horde",
//   description: "Monstrous beasts descend from the Boreal Frost",
  
//   startingScale: 75,
//   startingScale: 250,
  
//   onDraw: () => {
//     console.log("Hunters whisper of dire wolves prowling bolder than before...");
//   },
  
//   escalationTrack: [
//     // 75-120: Dire wolves
//     {
//       minScale: 75,
//       maxScale: 120,
//       narrative: "Dire wolves hunt in unusual numbers. Villagers grow fearful.",
//       onEnter: () => {
//         // TODO: Increase dire wolf encounters by 20% in Northern Reaches
//         // TODO: Decrease livestock by 5% in north
//         console.log("Dire wolves prowl the north");
//       }
//     },
    
//     // 121-170: Dragonlings appear
//     {
//       minScale: 121,
//       maxScale: 170,
//       narrative: "Small reptilian beasts - dragonlings - hunt alongside the wolves!",
//       onEnter: () => {
//         // TODO: Add dragonling encounters +25%
//         // TODO: Stack with wolves (now +25% each)
//         // TODO: Livestock -15% total
//         // TODO: Food prices +10%
//         console.log("Dragonlings spotted! Herds flee in terror.");
//       }
//     },
    
//     // 171-210: Drakes (elephant-sized)
//     {
//       minScale: 171,
//       maxScale: 210,
//       narrative: "Massive drakes, the size of elephants, appear on the roads!",
//       onEnter: () => {
//         // TODO: Spawn 5 drake bosses across Northern Reaches
//         // TODO: Drake encounter chance 10% per travel
//         // TODO: Horse prices +25%
//         // TODO: Livestock -25% total
//         // TODO: Population -10% in border towns (abandonment)
//         console.log("🐲 DRAKES BURN THE FRONTIER 🐲");
//       }
//     },
    
//     // 211-220: Wyverns (flying death)
//     {
//       minScale: 211,
//       maxScale: 220,
//       narrative: "The skies darken. Wyverns descend without warning!",
//       onEnter: () => {
//         // TODO: Spawn 5 wyvern bosses
//         // TODO: Wyvern encounter 15% per travel
//         // TODO: Caravan safety -30%
//         // TODO: Timber/stone demand +30% (defenses)
//         // TODO: Horse prices +40%
//         console.log("🦅 WYVERNS TAKE TO THE SKY 🦅");
//       }
//     },
    
//     // 221-249: The Wyrm
//     {
//       minScale: 221,
//       maxScale: 249,
//       narrative: "A great wyrm rises from the Frost, leaving valleys burned!",
//       onEnter: () => {
//         // TODO: Spawn 1 wyrm mega-boss
//         // TODO: Northern routes 90% unsafe (only smuggling possible)
//         // TODO: Refugees +20% population surge in south
//         // TODO: Food prices +35% in north/central
//         console.log("🐉 THE WYRM AWAKENS 🐉");
//       }
//     }
//   ],
  
//   // Climax: The Dragon
//   climax: {
//     triggerScale: 250,
//     narrative: "From the Boreal Frost descends an ancient Dragon - the beasts were fleeing before THIS terror!",
//     onEnter: () => {
//       // TODO: Spawn Dragon apex boss at Northern Border
//       // TODO: Global livestock -50% for the year
//       // TODO: Global morale -25%
//       // TODO: Flag frontier as "Dragon March" danger zones
//       console.log("🔥🐉 THE DRAGON DESCENDS 🐉🔥");
//     },
//     playerInvolvement: {
//       description: "Join the frontier battles, lead relief caravans, or hunt the lesser beasts before the Dragon dominates",
//       rewards: ["dragon_blooded_artifacts", "wyrm_scales", "hero_of_the_frontier"],
//       leaderboardPoints: 2000
//     },
//     onSuccess: () => {
//       // Dragon repelled
//       console.log("The Dragon retreats to the Frost! The frontier is scarred but standing.");
//       // TODO: Dragon retreats, frontier scarred but recovers
//       // TODO: Award dragon-blooded artifacts
//     },
//     onFailure: () => {
//       // Dragon victorious
//       console.log("The frontier burns. Dragon March zones remain as high-risk areas.");
//       // TODO: Permanent Dragon March zones (high-risk/high-reward)
//       // TODO: Frontier population permanently reduced
//     }
//   },
  
//   // Escalates weekly
//   weeklyTick: {
//     scaleIncrease: 8, // Faster than war - monsters don't negotiate
//     onTick: () => {
//       console.log("The beast tide grows stronger...");
//     }
//   }
// };

