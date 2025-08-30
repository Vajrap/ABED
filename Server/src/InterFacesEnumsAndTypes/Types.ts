import { clamp } from "../Utils/clamp";

export type Range = {
  min: number;
  max: number;
};

export function range(value: number, range: Range): boolean {
  return value >= range.min && value <= range.max;
}

export function makeRange(min: number, max: number): Range {
  const pMin = clamp(min, 0, 100);
  const pMax = clamp(max, pMin, 100);
  return { min: pMin, max: pMax };
}
