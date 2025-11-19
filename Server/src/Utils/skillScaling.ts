export function skillLevelMultiplier(
  level: number,
  perLevel: number = 0.1,
  base: number = 1,
): number {
  const safeLevel = Math.max(level, 0);
  return base + perLevel * safeLevel;
}

export function applySkillLevelMultiplier(
  value: number,
  level: number,
  perLevel: number = 0.1,
  base: number = 1,
): number {
  return value * skillLevelMultiplier(level, perLevel, base);
}


