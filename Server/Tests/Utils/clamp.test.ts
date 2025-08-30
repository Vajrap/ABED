// import { expect, test } from "bun:test";
// import { clamp } from "../../src/Utils/clamp";

// // Take min max number
// // return number that don't exceed min-max

// type ClampTestObject = {
//     min: number
//     max: number
//     value: number
//     expected: number
// }

// test('Given min max value in to clamp', () => {
//     const testCases: ClampTestObject[] = [
//         { min: 0, max: 10, value: 5, expected: 5 },
//         { min: 0, max: 10, value: -5, expected: 0 },
//         { min: 0, max: 10, value: 15, expected: 10 },
//     ];

//     testCases.forEach(({ min, max, value, expected }) => {
//         const result = clamp(value, min, max);
//         expect(result).toBe(expected);
//     });
// });