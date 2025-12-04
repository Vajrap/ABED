#!/usr/bin/env bun
/**
 * Text Visualizer Server
 * Simple Bun server to visualize L10N text rendering
 */

import { serve } from "bun";
import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

// Import L10N data
const skillsL10N = await import("../L10N/skills");
const buffsDebuffsL10N = await import("../L10N/buffsAndDebuffs");
const skillEnums = await import("../L10N/skillEnums");
const buffDebuffEnums = await import("../L10N/buffDebuffEnums");


// Mock character data
interface MockCharacter {
  name: { en: string; th: string };
  skills: Array<{ id: string; level: number }>;
  buffs: Array<{ id: string; value: number; counter: number }>;
  debuffs: Array<{ id: string; value: number; counter: number }>;
  stats: {
    strength: number;
    dexterity: number;
    willpower: number;
    charisma: number;
    intelligence: number;
    control: number;
    vitality: number;
    luck: number;
  };
  weaponDamage: string;
}

// Helper to get all skill IDs with their enum prefix
function getAllSkillIds(): Array<{ id: string; level: number }> {
  const skills: Array<{ id: string; level: number }> = [];
  
  // Get all enum objects
  const enumObjects = [
    skillEnums.BasicSkillId,
    skillEnums.MobSkillId,
    skillEnums.ClericSkillId,
    skillEnums.SeerSkillId,
    skillEnums.ScholarSkillId,
    skillEnums.MageSkillId,
    skillEnums.MysticSkillId,
    skillEnums.RogueSkillId,
    skillEnums.SpellBladeSkillId,
    skillEnums.ShamanSkillId,
    skillEnums.BarbarianSkillId,
    skillEnums.WarriorSkillId,
    skillEnums.KnightSkillId,
    skillEnums.GuardianSkillId,
    skillEnums.PaladinSkillId,
    skillEnums.DruidSkillId,
    skillEnums.MonkSkillId,
    skillEnums.WarlockSkillId,
    skillEnums.DuelistSkillId,
    skillEnums.WitchSkillId,
    skillEnums.InquisitorSkillId,
    skillEnums.EngineerSkillId,
    skillEnums.NomadSkillId,
  ];
  
  for (const enumObj of enumObjects) {
    if (enumObj && typeof enumObj === "object") {
      const enumName = Object.keys(skillEnums).find(
        key => (skillEnums as any)[key] === enumObj
      ) || "";
      
      for (const [key, value] of Object.entries(enumObj)) {
        if (typeof value === "string") {
          skills.push({
            id: `${enumName}.${key}`,
            level: Math.floor(Math.random() * 5) + 1, // Random level 1-5
          });
        }
      }
    }
  }
  
  return skills;
}

// Create a mock character with all skills and buffs/debuffs
const mockCharacter: MockCharacter = {
  name: { en: "Test Character", th: "ตัวละครทดสอบ" },
  skills: getAllSkillIds(),
  buffs: Object.values(buffDebuffEnums.BuffEnum).map((buffId) => ({
    id: buffId,
    value: Math.floor(Math.random() * 3) + 1, // Random value 1-3
    counter: Math.floor(Math.random() * 5), // Random counter 0-4
  })),
  debuffs: Object.values(buffDebuffEnums.DebuffEnum).map((debuffId) => ({
    id: debuffId,
    value: Math.floor(Math.random() * 3) + 1, // Random value 1-3
    counter: Math.floor(Math.random() * 5), // Random counter 0-4
  })),
  stats: {
    strength: 15,
    dexterity: 14,
    willpower: 16,
    charisma: 13,
    intelligence: 17,
    control: 15,
    vitality: 14,
    luck: 12,
  },
  weaponDamage: "1d8",
};

// Calculate stat modifier
function getStatMod(stat: number): number {
  return Math.floor((stat - 10) / 2);
}

serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    
    // API endpoint for character data
    if (url.pathname === "/api/character") {
      return new Response(JSON.stringify(mockCharacter), {
        headers: { "Content-Type": "application/json" },
      });
    }
    
    // API endpoint for L10N data
    if (url.pathname === "/api/l10n") {
      return new Response(
        JSON.stringify({
          skills: skillsL10N.skillsL10N,
          buffs: buffsDebuffsL10N.buffsL10N,
          debuffs: buffsDebuffsL10N.debuffsL10N,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    
    // Serve static files (all files are pre-built, no transpilation needed)
    const publicPath = join(__dirname, "public");
    let filePath: string;
    
    if (url.pathname === "/" || url.pathname === "/index.html") {
      filePath = join(publicPath, "index.html");
    } else {
      // Remove leading slash and serve from public directory
      filePath = join(publicPath, url.pathname.slice(1));
    }
    
    // Check if file exists and serve it
    const file = Bun.file(filePath);
    if (!(await file.exists())) {
      return new Response("Not Found", { status: 404 });
    }
    
    return new Response(file);
  },
});

console.log(`🚀 Text Visualizer running at http://localhost:${PORT}`);

