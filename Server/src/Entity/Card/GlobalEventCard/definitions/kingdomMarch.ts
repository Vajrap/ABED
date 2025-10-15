// import { GlobalEventCardEnum, type GlobalEventCardConfig } from "../GlobalEventCard";
// // Import your game state accessors here
// // import { getLocationsInRegion } from "...";
// // import { addNews } from "...";
// // etc.

// /**
//  * Kingdom March - War between Velgarth and Goldburg
//  * 
//  * From the doc:
//  * - 60–100: Rumors, no mechanical effects
//  * - 101–150: Iron +20%, global resources -10%
//  * - 151–199: War declared, rail cut, bandit raids
//  * - 200–249: Prices surge, conscription, refugees
//  * - 250: Final battle at Windstail Valley
//  */
// export const KingdomMarchCard: GlobalEventCardConfig = {
//   id: GlobalEventCardEnum.KingdomMarch,
//   name: "Kingdom March",
//   description: "Tensions rise as Velgarth and Goldburg mobilize for war",
  
//   startingScale: 60,
//   startingScale: 250,
  
//   onDraw: () => {
//     // TODO: Add news
//     console.log("Rumors spread of troop musters along the border...");
//   },
  
//   escalationTrack: [
//     // 60-100: Just rumors
//     {
//       minScale: 60,
//       maxScale: 100,
//       narrative: "Rumors of war spread. Scouts seen on borders, markets whisper of unrest.",
//       onEnter: () => {
//         // No mechanical effects, just flavor
//         console.log("Border tensions rise...");
//       }
//     },
    
//     // 101-150: Price increases, resource drops
//     {
//       minScale: 101,
//       maxScale: 150,
//       narrative: "War preparations intensify. Iron prices spike as forges work overtime.",
//       onEnter: () => {
//         // TODO: Implement these effects
//         // - Iron price +20% globally
//         // - Global resource generation -10% (ore, grain, livestock)
//         console.log("Iron prices increase by 20%");
//         console.log("Resource generation drops by 10%");
//       },
//       effects: [
//         () => {
//           // This runs every tick while in this range
//           // Could be used for ongoing caravan delays, etc.
//         }
//       ]
//     },
    
//     // 151-199: War declared!
//     {
//       minScale: 151,
//       maxScale: 199,
//       narrative: "War is declared! Velgarth marches on Goldburg.",
//       onEnter: () => {
//         // TODO: Implement these effects
//         // - Block rail between Velgarth/Goldburg regions
//         // - Increase bandit encounters in Windstail Valley +50%
//         // - Route safety -40% in frontier
//         console.log("Rail between kingdoms is CUT!");
//         console.log("Bandit raids spike in frontier zones");
//       }
//     },
    
//     // 200-249: Total war
//     {
//       minScale: 200,
//       maxScale: 249,
//       narrative: "War escalates to total mobilization. Conscription drains the towns.",
//       onEnter: () => {
//         // TODO: Implement these effects
//         // - Ore +30%, Wood +30%, Livestock +30%, Grain +40% prices
//         // - Population -15% in war regions
//         // - Remove 30% of NPC parties (conscription)
//         // - Refugee events in southern towns
//         console.log("Prices surge dramatically");
//         console.log("Conscription sweeps through towns");
//       }
//     }
//   ],
  
//   // Climax at 250
//   climax: {
//     triggerScale: 250,
//     narrative: "The armies meet at Windstail Valley in the greatest battle seen in a generation!",
//     onEnter: () => {
//       // TODO: Implement climax
//       // - Spawn battle encounter at Windstail Valley
//       // - Enable player participation
//       // - Track battle outcome
//       console.log("🔥 THE FINAL SHOWDOWN AT WINDSTAIL VALLEY 🔥");
//     },
//     playerInvolvement: {
//       description: "Join the battle as mercenaries, smugglers, or relief traders",
//       rewards: ["war_veteran_title", "legendary_weapons", "land_grants"],
//       leaderboardPoints: 1000
//     },
//     onSuccess: () => {
//       // Velgarth wins
//       // - Rail remains cut for 1 year
//       // - Goldburg resources -30% grain/livestock, -20% ore
//       console.log("Velgarth victorious! Eastern Frontier destabilized.");
//     },
//     onFailure: () => {
//       // Goldburg wins
//       // - Velgarth resources -25% ore, -20% wood
//       // - Northern morale -30
//       console.log("Goldburg stands firm! Velgarth retreats in chaos.");
//     }
//   },
  
//   // War escalates each week
//   weeklyTick: {
//     scaleIncrease: 5,
//     onTick: () => {
//       console.log("War drums echo across the land...");
//     }
//   }
// };

