// import { GlobalEventCardEnum, type GlobalEventCardConfig } from "../GlobalEventCard";

// /**
//  * Mild Season - Simple beneficial minor event
//  * 
//  * From doc: "All crop RGC +5% this year"
//  * 
//  * This is the simplest type of event - just one effect for the year.
//  */
// export const MildSeasonCard: GlobalEventCardConfig = {
//   id: GlobalEventCardEnum.MildSeason,
//   name: "Mild Season",
//   description: "Pleasant weather favors the crops this year",
  
//   startingScale: 0,
//   startingScale: 100,
  
//   onDraw: () => {
//     // TODO: Apply crop bonus globally
//     // - Increase grain, vegetables, fruits RGC by 5%
//     // - Add news: "Farmers shrug and say, 'Not the best, not the worst. A decent season.'"
    
//     console.log("Mild Season: All crops +5%");
//   },
  
//   escalationTrack: [
//     {
//       minScale: 0,
//       maxScale: 100,
//       narrative: "The weather remains pleasantly mild throughout the year.",
//       effects: [
//         () => {
//           // Ongoing effect (if needed) - maintains the +5% bonus
//         }
//       ]
//     }
//   ],
  
//   // No climax - just naturally completes at year end
//   completionCondition: (scale: number) => {
//     // Card completes at end of year (checked by game loop)
//     return scale >= 100;
//   }
// };

