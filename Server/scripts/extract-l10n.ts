#!/usr/bin/env bun
/**
 * L10N Extraction Script
 * 
 * Scans specified directories for L10N text objects in skills and buffs/debuffs,
 * then generates TypeScript files in the Client folder for frontend use.
 * 
 * Usage: bun run scripts/extract-l10n.ts
 */

import { readdir, readFile, writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { existsSync } from "fs";

interface L10N {
  en: string;
  th: string;
}

interface TextObject {
  name: L10N;
  description: L10N;
  formula?: string;
}

// Get project root (parent of Server directory if running from Server, or current dir if from root)
function getProjectRoot(): string {
  const cwd = process.cwd();
  // If we're in Server directory, go up one level
  if (cwd.endsWith("/Server") || cwd.endsWith("\\Server")) {
    return join(cwd, "..");
  }
  return cwd;
}

const PROJECT_ROOT = getProjectRoot();

// Directories to scan (relative to project root)
const SCAN_DIRECTORIES = [
  "Server/src/Entity/Skill/definition",
  "Server/src/Entity/BuffsAndDebuffs/definitions",
];

// Output directory in Client (relative to project root)
const CLIENT_L10N_DIR = "Client/L10N";

// Enum files to copy (relative to project root)
const ENUM_FILES = [
  { src: "Server/src/Entity/Skill/enums.ts", dest: "Client/L10N/skillEnums.ts" },
  { src: "Server/src/Entity/BuffsAndDebuffs/enum.ts", dest: "Client/L10N/buffDebuffEnums.ts" },
];

/**
 * Extract L10N object from TypeScript code string
 * Handles both single-line and multiline patterns
 */
function extractL10N(code: string, pattern: string): L10N | null {
  // Find the pattern start (e.g., "description:")
  const patternIndex = code.indexOf(`${pattern}:`);
  if (patternIndex === -1) return null;
  
  // Find the opening brace after the pattern
  let braceStart = code.indexOf("{", patternIndex);
  if (braceStart === -1) return null;
  
  // Find the matching closing brace by counting braces
  let braceCount = 0;
  let braceEnd = braceStart;
  for (let i = braceStart; i < code.length; i++) {
    if (code[i] === "{") braceCount++;
    if (code[i] === "}") {
      braceCount--;
      if (braceCount === 0) {
        braceEnd = i;
        break;
      }
    }
  }
  
  if (braceCount !== 0) return null; // Unmatched braces
  
  const blockContent = code.substring(braceStart + 1, braceEnd);
  
  // Extract en and th fields - handle multiline strings
  // Find the quote type first, then match everything until the matching quote
  let enMatch: RegExpMatchArray | null = null;
  let thMatch: RegExpMatchArray | null = null;
  
  // Try to find en: field
  const enStart = blockContent.indexOf("en:");
  if (enStart !== -1) {
    const enPart = blockContent.substring(enStart);
    // Match the quote and capture everything until the matching quote
    const enQuoteMatch = enPart.match(/en\s*:\s*(["`])([\s\S]*?)\1/);
    if (enQuoteMatch && enQuoteMatch[2] !== undefined) {
      enMatch = enQuoteMatch;
    }
  }
  
  // Try to find th: field
  const thStart = blockContent.indexOf("th:");
  if (thStart !== -1) {
    const thPart = blockContent.substring(thStart);
    // Match the quote and capture everything until the matching quote
    const thQuoteMatch = thPart.match(/th\s*:\s*(["`])([\s\S]*?)\1/);
    if (thQuoteMatch && thQuoteMatch[2] !== undefined) {
      thMatch = thQuoteMatch;
    }
  }
  
  if (enMatch && thMatch && enMatch[2] !== undefined && thMatch[2] !== undefined) {
    // Unescape escape sequences
    const en = enMatch[2]
      .replace(/\\n/g, "\n")
      .replace(/\\"/g, '"')
      .replace(/\\`/g, "`")
      .replace(/\\t/g, "\t")
      .replace(/\\r/g, "\r");
    const th = thMatch[2]
      .replace(/\\n/g, "\n")
      .replace(/\\"/g, '"')
      .replace(/\\`/g, "`")
      .replace(/\\t/g, "\t")
      .replace(/\\r/g, "\r");
    return { en: en || "", th: th || "" };
  }
  
  return null;
}

/**
 * Extract formula string from code
 */
function extractFormula(code: string): string | undefined {
  const formulaMatch = code.match(/formula:\s*["\`]([^"\`]+)["\`]/);
  return formulaMatch && formulaMatch[1] !== undefined ? formulaMatch[1] : undefined;
}

/**
 * Extract description.text L10N (for skills)
 */
function extractDescriptionText(code: string): L10N | null {
  // Try description.text pattern first (nested structure)
  const textPattern = /description:\s*{\s*text:\s*{([^}]+(?:{[^}]*}[^}]*)*)}/s;
  const textMatch = code.match(textPattern);
  
  if (textMatch && textMatch[1] !== undefined) {
    const textContent = textMatch[1];
    // Use the same improved approach for multiline strings
    let enMatch: RegExpMatchArray | null = null;
    let thMatch: RegExpMatchArray | null = null;
    
    // Try to find en: field
    const enStart = textContent.indexOf("en:");
    if (enStart !== -1) {
      const enPart = textContent.substring(enStart);
      const enQuoteMatch = enPart.match(/en\s*:\s*(["`])([\s\S]*?)\1/);
      if (enQuoteMatch && enQuoteMatch[2] !== undefined) {
        enMatch = enQuoteMatch;
      }
    }
    
    // Try to find th: field
    const thStart = textContent.indexOf("th:");
    if (thStart !== -1) {
      const thPart = textContent.substring(thStart);
      const thQuoteMatch = thPart.match(/th\s*:\s*(["`])([\s\S]*?)\1/);
      if (thQuoteMatch && thQuoteMatch[2] !== undefined) {
        thMatch = thQuoteMatch;
      }
    }
    
    if (enMatch && thMatch && enMatch[2] !== undefined && thMatch[2] !== undefined) {
      const en = enMatch[2]
        .replace(/\\n/g, "\n")
        .replace(/\\"/g, '"')
        .replace(/\\`/g, "`")
        .replace(/\\t/g, "\t")
        .replace(/\\r/g, "\r");
      const th = thMatch[2]
        .replace(/\\n/g, "\n")
        .replace(/\\"/g, '"')
        .replace(/\\`/g, "`")
        .replace(/\\t/g, "\t")
        .replace(/\\r/g, "\r");
      return { en: en || "", th: th || "" };
    }
  }
  
  // Fallback to description.en/th (direct L10N)
  return extractL10N(code, "description");
}

/**
 * Extract skill definition from file
 */
async function extractSkillDefinition(filePath: string): Promise<{
  id: string;
  name: L10N;
  description: L10N;
  formula?: string;
} | null> {
  try {
    const content = await readFile(filePath, "utf-8");
    
    // Find the exported constant name (e.g., export const bewitch = ...)
    const exportMatch = content.match(/export\s+const\s+(\w+)\s*=/);
    if (!exportMatch) return null;
    
    const constantName = exportMatch[1];
    
    // Find the id field (e.g., id: WitchSkillId.Bewitch)
    const idMatch = content.match(/id:\s*(\w+SkillId)\.(\w+)/);
    if (!idMatch || idMatch[1] === undefined || idMatch[2] === undefined) return null;
    
    const enumType = idMatch[1];
    const enumKey = idMatch[2];
    
    // Extract name
    const name = extractL10N(content, "name");
    if (!name) return null;
    
    // Extract description
    const description = extractDescriptionText(content);
    if (!description) return null;
    
    // Extract formula (if exists)
    const formula = extractFormula(content);
    
    return {
      id: `${enumType}.${enumKey}`, // e.g., "WitchSkillId.Bewitch"
      name,
      description,
      formula,
    };
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

/**
 * Extract buff/debuff definition from file
 */
async function extractBuffDebuffDefinition(
  filePath: string,
  type: "buff" | "debuff"
): Promise<{
  id: string;
  name: L10N;
  description: L10N;
  formula?: string;
} | null> {
  try {
    const content = await readFile(filePath, "utf-8");
    
    // Find the exported constant name
    const exportMatch = content.match(/export\s+const\s+(\w+)\s*=/);
    if (!exportMatch) return null;
    
    const constantName = exportMatch[1];
    
    // Find the enum usage (e.g., BuffEnum.haste or DebuffEnum.slow)
    const enumType = type === "buff" ? "BuffEnum" : "DebuffEnum";
    const enumMatch = content.match(new RegExp(`${enumType}\\.(\\w+)`));
    if (!enumMatch || enumMatch[1] === undefined) return null;
    
    const enumValue = enumMatch[1];
    
    // Extract name
    const name = extractL10N(content, "name");
    if (!name) return null;
    
    // Extract description
    const description = extractL10N(content, "description");
    if (!description) return null;
    
    // Extract formula (if exists)
    const formula = extractFormula(content);
    
    return {
      id: `${enumType}.${enumValue}`,
      name,
      description,
      formula,
    };
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

/**
 * Recursively scan directory for TypeScript files
 */
async function scanDirectory(
  dirPath: string,
  type: "skill" | "buff" | "debuff"
): Promise<Map<string, TextObject>> {
  const results = new Map<string, TextObject>();
  
  async function scan(currentPath: string) {
    try {
      const entries = await readdir(currentPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = join(currentPath, entry.name);
        
        if (entry.isDirectory()) {
          await scan(fullPath);
        } else if (entry.isFile() && entry.name.endsWith(".ts") && !entry.name.endsWith(".test.ts")) {
          let definition;
          
          if (type === "skill") {
            definition = await extractSkillDefinition(fullPath);
          } else {
            definition = await extractBuffDebuffDefinition(fullPath, type);
          }
          
          if (definition) {
            results.set(definition.id, {
              name: definition.name,
              description: definition.description,
              formula: definition.formula,
            });
          }
        }
      }
    } catch (error) {
      console.error(`Error scanning ${currentPath}:`, error);
    }
  }
  
  await scan(dirPath);
  return results;
}

/**
 * Generate TypeScript file for skills
 */
async function generateSkillsFile(skills: Map<string, TextObject>) {
  const lines: string[] = [
    "// Auto-generated file - do not edit manually",
    "// Generated by: bun run scripts/extract-l10n.ts",
    "",
    "import {",
    "  BasicSkillId,",
    "  MobSkillId,",
    "  ClericSkillId,",
    "  SeerSkillId,",
    "  ScholarSkillId,",
    "  MageSkillId,",
    "  MysticSkillId,",
    "  RogueSkillId,",
    "  SpellBladeSkillId,",
    "  ShamanSkillId,",
    "  BarbarianSkillId,",
    "  WarriorSkillId,",
    "  KnightSkillId,",
    "  GuardianSkillId,",
    "  PaladinSkillId,",
    "  DruidSkillId,",
    "  MonkSkillId,",
    "  WarlockSkillId,",
    "  DuelistSkillId,",
    "  WitchSkillId,",
    "  InquisitorSkillId,",
    "  EngineerSkillId,",
    "  NomadSkillId,",
    "  type SkillId",
    "} from './skillEnums';",
    "",
    "export interface L10N {",
    "  en: string;",
    "  th: string;",
    "}",
    "",
    "export interface SkillTextObject {",
    "  name: L10N;",
    "  description: L10N;",
    "  formula?: string;",
    "}",
    "",
    "export const skillsL10N: Record<SkillId, SkillTextObject> = {",
  ];
  
  // Sort by key for consistent output
  const sortedEntries = Array.from(skills.entries()).sort();
  
  for (const [id, text] of sortedEntries) {
    const nameEn = JSON.stringify(text.name.en);
    const nameTh = JSON.stringify(text.name.th);
    const descEn = JSON.stringify(text.description.en);
    const descTh = JSON.stringify(text.description.th);
    const formula = text.formula ? JSON.stringify(text.formula) : "undefined";
    
    // Use the enum path as the key (e.g., WitchSkillId.Bewitch)
    lines.push(`  [${id}]: {`);
    lines.push(`    name: { en: ${nameEn}, th: ${nameTh} },`);
    lines.push(`    description: { en: ${descEn}, th: ${descTh} },`);
    if (text.formula) {
      lines.push(`    formula: ${formula},`);
    }
    lines.push(`  },`);
  }
  
  lines.push("};");
  
  const outputPath = join(PROJECT_ROOT, CLIENT_L10N_DIR, "skills.ts");
  await writeFile(outputPath, lines.join("\n"), "utf-8");
  console.log(`✓ Generated ${CLIENT_L10N_DIR}/skills.ts with ${skills.size} skills`);
}

/**
 * Generate TypeScript file for buffs and debuffs
 */
async function generateBuffsDebuffsFile(
  buffs: Map<string, TextObject>,
  debuffs: Map<string, TextObject>
) {
  const lines: string[] = [
    "// Auto-generated file - do not edit manually",
    "// Generated by: bun run scripts/extract-l10n.ts",
    "",
    "import { BuffEnum, DebuffEnum } from './buffDebuffEnums';",
    "",
    "export interface L10N {",
    "  en: string;",
    "  th: string;",
    "}",
    "",
    "export interface BuffDebuffTextObject {",
    "  name: L10N;",
    "  description: L10N;",
    "  formula?: string;",
    "}",
    "",
    "export const buffsL10N: Record<BuffEnum, BuffDebuffTextObject> = {",
  ];
  
  // Add buffs
  const sortedBuffs = Array.from(buffs.entries()).sort();
  for (const [id, text] of sortedBuffs) {
    const nameEn = JSON.stringify(text.name.en);
    const nameTh = JSON.stringify(text.name.th);
    const descEn = JSON.stringify(text.description.en);
    const descTh = JSON.stringify(text.description.th);
    const formula = text.formula ? JSON.stringify(text.formula) : "undefined";
    
    // Extract enum value (e.g., "haste" from "BuffEnum.haste")
    const enumValue = id.replace("BuffEnum.", "");
    lines.push(`  [BuffEnum.${enumValue}]: {`);
    lines.push(`    name: { en: ${nameEn}, th: ${nameTh} },`);
    lines.push(`    description: { en: ${descEn}, th: ${descTh} },`);
    if (text.formula) {
      lines.push(`    formula: ${formula},`);
    }
    lines.push(`  },`);
  }
  
  lines.push("};");
  lines.push("");
  lines.push("export const debuffsL10N: Record<DebuffEnum, BuffDebuffTextObject> = {");
  
  // Add debuffs
  const sortedDebuffs = Array.from(debuffs.entries()).sort();
  for (const [id, text] of sortedDebuffs) {
    const nameEn = JSON.stringify(text.name.en);
    const nameTh = JSON.stringify(text.name.th);
    const descEn = JSON.stringify(text.description.en);
    const descTh = JSON.stringify(text.description.th);
    const formula = text.formula ? JSON.stringify(text.formula) : "undefined";
    
    // Extract enum value (e.g., "slow" from "DebuffEnum.slow")
    const enumValue = id.replace("DebuffEnum.", "");
    lines.push(`  [DebuffEnum.${enumValue}]: {`);
    lines.push(`    name: { en: ${nameEn}, th: ${nameTh} },`);
    lines.push(`    description: { en: ${descEn}, th: ${descTh} },`);
    if (text.formula) {
      lines.push(`    formula: ${formula},`);
    }
    lines.push(`  },`);
  }
  
  lines.push("};");
  
  const outputPath = join(PROJECT_ROOT, CLIENT_L10N_DIR, "buffsAndDebuffs.ts");
  await writeFile(outputPath, lines.join("\n"), "utf-8");
  console.log(`✓ Generated ${CLIENT_L10N_DIR}/buffsAndDebuffs.ts with ${buffs.size} buffs and ${debuffs.size} debuffs`);
}

/**
 * Copy enum files to Client folder
 */
async function copyEnumFiles() {
  for (const { src, dest } of ENUM_FILES) {
    try {
      const srcPath = join(PROJECT_ROOT, src);
      const content = await readFile(srcPath, "utf-8");
      // Remove any server-specific imports/paths
      const cleanedContent = content
        .replace(/from\s+["']src\//g, 'from "./')
        .replace(/from\s+["']\.\.\/\.\.\/\.\.\//g, 'from "./');
      
      const destPath = join(PROJECT_ROOT, dest);
      await writeFile(destPath, cleanedContent, "utf-8");
      console.log(`✓ Copied ${src} -> ${dest}`);
    } catch (error) {
      console.error(`Error copying ${src}:`, error);
    }
  }
}

/**
 * Main execution
 */
async function main() {
  console.log("🔍 Scanning directories for L10N texts...\n");
  
  // Ensure output directory exists
  const outputDir = join(PROJECT_ROOT, CLIENT_L10N_DIR);
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }
  
  // Scan skills
  const skillsDir = join(PROJECT_ROOT, SCAN_DIRECTORIES[0]!);
  console.log(`Scanning skills: ${skillsDir}`);
  const skills = await scanDirectory(skillsDir, "skill");
  console.log(`Found ${skills.size} skills\n`);
  
  // Scan buffs
  const buffsDir = join(PROJECT_ROOT, SCAN_DIRECTORIES[1]!, "buffs");
  console.log(`Scanning buffs: ${buffsDir}`);
  const buffs = await scanDirectory(buffsDir, "buff");
  console.log(`Found ${buffs.size} buffs\n`);
  
  // Scan debuffs
  const debuffsDir = join(PROJECT_ROOT, SCAN_DIRECTORIES[1]!, "debuffs");
  console.log(`Scanning debuffs: ${debuffsDir}`);
  const debuffs = await scanDirectory(debuffsDir, "debuff");
  console.log(`Found ${debuffs.size} debuffs\n`);
  
  // Copy enum files
  console.log("📋 Copying enum files...");
  await copyEnumFiles();
  console.log("");
  
  // Generate output files
  console.log("📝 Generating TypeScript files...");
  await generateSkillsFile(skills);
  await generateBuffsDebuffsFile(buffs, debuffs);
  
  console.log("\n✅ L10N extraction complete!");
  console.log(`\n📦 Generated files:`);
  console.log(`   - ${CLIENT_L10N_DIR}/skills.ts`);
  console.log(`   - ${CLIENT_L10N_DIR}/buffsAndDebuffs.ts`);
  console.log(`   - ${CLIENT_L10N_DIR}/skillEnums.ts`);
  console.log(`   - ${CLIENT_L10N_DIR}/buffDebuffEnums.ts`);
}

main().catch(console.error);

