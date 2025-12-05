/**
 * Text Renderer for L10N Markup
 * Reusable text parsing logic for rendering L10N text with markup.
 * Extracted from text-visualizer project.
 */

/**
 * Character stats interface
 */
export interface CharacterStats {
  strength?: number;
  dexterity?: number;
  willpower?: number;
  charisma?: number;
  intelligence?: number;
  control?: number;
  vitality?: number;
  luck?: number;
  planar?: number;
  leadership?: number;
  endurance?: number;
  agility?: number;
}

/**
 * Character interface (simplified for rendering)
 */
export interface Character {
  stats?: CharacterStats;
  weaponDamage?: number;
  skills?: Array<{ id: string; level: number }>;
  buffs?: Array<{ id: string; value: number; counter: number }>;
  debuffs?: Array<{ id: string; value: number; counter: number }>;
}

/**
 * L10N data structure
 */
export interface L10NData {
  skills?: Record<string, {
    name: { en: string; th: string };
    description: { en: string; th: string };
    formula?: string;
  }>;
  buffs?: Record<string, {
    name: { en: string; th: string };
    description: { en: string; th: string };
    formula?: string;
  }>;
  debuffs?: Record<string, {
    name: { en: string; th: string };
    description: { en: string; th: string };
    formula?: string;
  }>;
}

/**
 * Options for renderText function
 */
export interface RenderTextOptions {
  skillLevel?: number;
  formula?: string | null;
  counter?: number;
  isSkill?: boolean;
  character?: Character | null;
  l10nData?: L10NData | null;
  currentLanguage?: "en" | "th";
  renderBuffDebuffTooltip?: ((type: "buff" | "debuff", id: string, name: string, renderedDescription: string) => string) | null;
  useFormulaCapsule?: boolean; // Whether to wrap formulas in a styled capsule (default: true)
}

/**
 * Options for renderFormula function
 */
export interface RenderFormulaOptions {
  counter?: number;
  skillLevel?: number;
  character?: Character | null;
  showValues?: boolean;
}

/**
 * Render text with markup parsing - returns HTML string
 * @param text - The text to render
 * @param options - Rendering options
 * @returns Rendered HTML string
 */
export function renderText(text: string, options: RenderTextOptions = {}): string {
  const {
    skillLevel = 0,
    formula = null,
    counter = 0,
    isSkill = false,
    character = null,
    l10nData = null,
    currentLanguage = 'en',
    renderBuffDebuffTooltip = null,
  } = options;

  if (!text) return '';
  
  let rendered = text;
  
  // IMPORTANT: Process conditionals BEFORE converting \n to <br> and BEFORE color tags
  // This handles cases like {5}\n text{/} and [b]{5}'value':'value'{/}[/b]
  
  // Format 1: {n}'value_if_n+':'value_if_below'{/} - Ternary conditional
  // Example: {5}'three':'two'{/} shows "three" if level >= 5, "two" otherwise
  rendered = rendered.replace(/\{(\d+)\}'([^']+?)':'([^']+?)'\{\/\}/g, (match, level, valueIfMet, valueIfNot) => {
    const levelThreshold = parseInt(level);
    if (isSkill && skillLevel >= levelThreshold) {
      return valueIfMet;
    }
    return valueIfNot;
  });
  
  // Format 2: {n}text{/} - Direct conditional (show if level >= n)
  // Use [\s\S] to match any character including newlines
  rendered = rendered.replace(/\{(\d+)\}([\s\S]*?)\{\/\}/g, (match, level, content) => {
    const levelThreshold = parseInt(level);
    if (isSkill && skillLevel >= levelThreshold) {
      // Trim leading/trailing whitespace/newlines to avoid empty lines
      return content.replace(/^\s*\n+|\n+\s*$/g, '').trim();
    }
    return '';
  });
  
  // Counter conditionals: {COUNTER>=1}text{/}
  rendered = rendered.replace(/\{COUNTER>=(\d+)\}([\s\S]*?)\{\/\}/g, (match, threshold, content) => {
    if (counter >= parseInt(threshold)) {
      return content.replace(/^\s*\n+|\n+\s*$/g, '').trim();
    }
    return '';
  });
  
  // Counter conditionals: {COUNTER===1}text{/}
  rendered = rendered.replace(/\{COUNTER===(\d+)\}([\s\S]*?)\{\/\}/g, (match, value, content) => {
    if (counter === parseInt(value)) {
      return content.replace(/^\s*\n+|\n+\s*$/g, '').trim();
    }
    return '';
  });
  
  // Replace <FORMULA> with actual rendered formula (after conditionals are processed)
  // Options can control whether to use capsule styling or plain text
  const useFormulaCapsule = options.useFormulaCapsule !== false; // Default to true for backwards compatibility
  
  if (formula) {
    const renderedFormula = renderFormula(formula, { counter, skillLevel, character, showValues: true });
    if (useFormulaCapsule) {
      rendered = rendered.replace(/<FORMULA>/g, `<span class="formula-capsule">${escapeHtml(renderedFormula)}</span>`);
    } else {
      rendered = rendered.replace(/<FORMULA>/g, escapeHtml(renderedFormula));
    }
  } else {
    // If no formula provided, just remove <FORMULA> tag
    rendered = rendered.replace(/<FORMULA>/g, '');
  }
  
  // Color tags: [r]text[/r] = red, [g]text[/g] = green, [b]text[/b] = blue
  rendered = rendered.replace(/\[r\](.*?)\[\/r\]/g, '<span style="color: #e74c3c; font-weight: 600;">$1</span>');
  rendered = rendered.replace(/\[g\](.*?)\[\/g\]/g, '<span style="color: #27ae60; font-weight: 600;">$1</span>');
  rendered = rendered.replace(/\[b\](.*?)\[\/b\]/g, '<span style="color: #3498db; font-weight: 600;">$1</span>');
  
  // Bold: [bold]text[/bold]
  rendered = rendered.replace(/\[bold\](.*?)\[\/bold\]/g, '<span style="font-weight: 700;">$1</span>');
  
  // Buff tags: <BuffName> - simplified for now (just show name)
  if (l10nData && character && renderBuffDebuffTooltip) {
    rendered = rendered.replace(/<Buff(\w+)>/g, (match, buffName) => {
      const buffId = buffName.charAt(0).toLowerCase() + buffName.slice(1);
      const buffData = l10nData.buffs?.[buffId];
      if (buffData) {
        const activeBuff = character.buffs?.find(b => b.id === buffId);
        const buffCounter = activeBuff ? activeBuff.counter : 0;
        
        const renderedDescription = renderText(buffData.description[currentLanguage] || '', {
          skillLevel: 0,
          formula: null,
          counter: buffCounter,
          isSkill: false,
          character,
          l10nData,
          currentLanguage,
          renderBuffDebuffTooltip,
        });
        
        return renderBuffDebuffTooltip('buff', buffId, buffData.name[currentLanguage] || buffId, renderedDescription);
      }
      return match;
    });
    
    // Debuff tags: <DebuffName> - simplified for now (just show name)
    rendered = rendered.replace(/<Debuff(\w+)>/g, (match, debuffName) => {
      const debuffId = debuffName.charAt(0).toLowerCase() + debuffName.slice(1);
      const debuffData = l10nData.debuffs?.[debuffId];
      if (debuffData) {
        const activeDebuff = character.debuffs?.find(d => d.id === debuffId);
        const debuffCounter = activeDebuff ? activeDebuff.counter : 0;
        
        const renderedDescription = renderText(debuffData.description[currentLanguage] || '', {
          skillLevel: 0,
          formula: null,
          counter: debuffCounter,
          isSkill: false,
          character,
          l10nData,
          currentLanguage,
          renderBuffDebuffTooltip,
        });
        
        return renderBuffDebuffTooltip('debuff', debuffId, debuffData.name[currentLanguage] || debuffId, renderedDescription);
      }
      return match;
    });
  } else {
    // Simple fallback: just remove the tags and show text
    rendered = rendered.replace(/<Buff(\w+)>/g, (match, buffName) => {
      const buffId = buffName.charAt(0).toLowerCase() + buffName.slice(1);
      return `<span style="background: #d4edda; color: #155724; padding: 2px 6px; border-radius: 4px; font-weight: 600;">${escapeHtml(buffId)}</span>`;
    });
    rendered = rendered.replace(/<Debuff(\w+)>/g, (match, debuffName) => {
      const debuffId = debuffName.charAt(0).toLowerCase() + debuffName.slice(1);
      return `<span style="background: #f8d7da; color: #721c24; padding: 2px 6px; border-radius: 4px; font-weight: 600;">${escapeHtml(debuffId)}</span>`;
    });
  }
  
  // Stat modifiers: <STRmod>, <DEXmod>, etc. - show number with color
  if (character && character.stats) {
    rendered = rendered.replace(/<(\w+)mod>/gi, (match, statName) => {
      const stat = statName.toLowerCase();
      const statValue = character.stats?.[stat as keyof CharacterStats] || 10;
      const mod = Math.floor((statValue - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
      const statColor = getStatColor(stat);
      return `<span style="color: ${statColor}; font-weight: 600;">${modStr}</span>`;
    });
    
    // Save modifiers: <CONsave>, <STRsave>, etc.
    rendered = rendered.replace(/<(\w+)save>/gi, (match, statName) => {
      const stat = statName.toLowerCase();
      const statValue = character.stats?.[stat as keyof CharacterStats] || 10;
      const mod = Math.floor((statValue - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
      return `<span style="font-weight: 600;">${statName.toUpperCase()}save (${modStr})</span>`;
    });
    
    // Weapon damage: <WeaponDamage>
    rendered = rendered.replace(/<WeaponDamage>/g, () => {
      return `<span style="font-weight: 600;">${character.weaponDamage || 0}</span>`;
    });
    
    // Skill level multiplier: <SkillLevelMultiplier>
    rendered = rendered.replace(/<SkillLevelMultiplier>/gi, () => {
      if (isSkill && skillLevel > 0) {
        const multiplier = (1 + 0.1 * skillLevel).toFixed(1);
        return `<span style="font-weight: 600;">${multiplier}×</span>`;
      }
      return '<span style="font-weight: 600;">skill level multiplier</span>';
    });
    
    // Melee range penalty: <MeleeRangePenalty>
    rendered = rendered.replace(/<MeleeRangePenalty>/gi, () => {
      return `<span style="font-weight: 600;">RangeModifier</span>`;
    });
    
    // Control mod: <ControlMod>
    rendered = rendered.replace(/<ControlMod>/gi, () => {
      const mod = Math.floor((character.stats?.control || 10 - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
      return `<span style="font-weight: 600;">${modStr}</span>`;
    });
    
    // Planar mod: <PlanarMod>
    rendered = rendered.replace(/<PlanarMod>/gi, () => {
      const intMod = Math.floor((character.stats?.intelligence || 10 - 10) / 2);
      const chaMod = Math.floor((character.stats?.charisma || 10 - 10) / 2);
      const planarMod = Math.max(intMod, chaMod);
      const modStr = planarMod >= 0 ? `+${planarMod}` : `${planarMod}`;
      return `<span style="font-weight: 600;">${modStr}</span>`;
    });

    // VITmod, WILmod, etc.
    rendered = rendered.replace(/<VITmod>/gi, () => {
      const mod = Math.floor((character.stats?.vitality || 10 - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
      return `<span style="font-weight: 600;">${modStr}</span>`;
    });

    rendered = rendered.replace(/<WILmod>/gi, () => {
      const mod = Math.floor((character.stats?.willpower || 10 - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
      return `<span style="font-weight: 600;">${modStr}</span>`;
    });

    rendered = rendered.replace(/<CHAmod>/gi, () => {
      const mod = Math.floor((character.stats?.charisma || 10 - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
      return `<span style="font-weight: 600;">${modStr}</span>`;
    });

    rendered = rendered.replace(/<INTmod>/gi, () => {
      const mod = Math.floor((character.stats?.intelligence || 10 - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
      return `<span style="font-weight: 600;">${modStr}</span>`;
    });

    rendered = rendered.replace(/<DEXmod>/gi, () => {
      const mod = Math.floor((character.stats?.dexterity || 10 - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
      return `<span style="font-weight: 600;">${modStr}</span>`;
    });

    rendered = rendered.replace(/<STRmod>/gi, () => {
      const mod = Math.floor((character.stats?.strength || 10 - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
      return `<span style="font-weight: 600;">${modStr}</span>`;
    });
  } else {
    // Fallback: just remove the tags if no character stats
    rendered = rendered.replace(/<(\w+)mod>/gi, '+0');
    rendered = rendered.replace(/<(\w+)save>/gi, 'save');
    rendered = rendered.replace(/<WeaponDamage>/g, 'weapon damage');
    rendered = rendered.replace(/<SkillLevelMultiplier>/gi, 'skill multiplier');
    rendered = rendered.replace(/<MeleeRangePenalty>/gi, 'range modifier');
    rendered = rendered.replace(/<ControlMod>/gi, '+0');
    rendered = rendered.replace(/<PlanarMod>/gi, '+0');
  }
  
  // Counter: <COUNTER> - show actual value
  rendered = rendered.replace(/<COUNTER>/g, counter.toString());
  
  // Convert newlines to <br> (AFTER all conditionals are processed)
  rendered = rendered.replace(/\n/g, '<br>');
  
  return rendered;
}

/**
 * Render formula with replacements
 * @param formula - The formula string
 * @param options - Rendering options
 * @returns Rendered formula string
 */
export function renderFormula(formula: string, options: RenderFormulaOptions = {}): string {
  const {
    counter = 0,
    skillLevel = 0,
    character = null,
    showValues = false,
  } = options;

  if (!formula) return '';
  
  let rendered = formula;
  
  // Process conditionals in formula: {n}'value_if_n+':'value_if_below'{/}
  rendered = rendered.replace(/\{(\d+)\}'([^']+?)':'([^']+?)'\{\/\}/g, (match, level, valueIfMet, valueIfNot) => {
    const levelThreshold = parseInt(level);
    if (skillLevel >= levelThreshold) {
      return valueIfMet;
    }
    return valueIfNot;
  });
  
  if (showValues && character && character.stats) {
    // Replace placeholders with actual values
    rendered = rendered.replace(/<COUNTER>/g, counter.toString());
    
    // Stat modifiers
    rendered = rendered.replace(/<(\w+)mod>/gi, (match, statName) => {
      const stat = statName.toLowerCase();
      const statValue = character.stats?.[stat as keyof CharacterStats] || 10;
      const mod = Math.floor((statValue - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
      return modStr;
    });
    
    // Weapon damage
    rendered = rendered.replace(/<WeaponDamage>/g, () => {
      return String(character.weaponDamage || 0);
    });
    
    // Skill level multiplier
    rendered = rendered.replace(/<SkillLevelMultiplier>/gi, () => {
      if (skillLevel > 0) {
        const multiplier = (1 + 0.1 * skillLevel).toFixed(1);
        return `${multiplier}×`;
      }
      return '1.0×';
    });
    
    // Control mod
    rendered = rendered.replace(/<ControlMod>/gi, () => {
      const mod = Math.floor((character.stats?.control || 10 - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
      return modStr;
    });
    
    // Planar mod
    rendered = rendered.replace(/<PlanarMod>/gi, () => {
      const intMod = Math.floor((character.stats?.intelligence || 10 - 10) / 2);
      const chaMod = Math.floor((character.stats?.charisma || 10 - 10) / 2);
      const planarMod = Math.max(intMod, chaMod);
      const modStr = planarMod >= 0 ? `+${planarMod}` : `${planarMod}`;
      return modStr;
    });

    // Melee range penalty
    rendered = rendered.replace(/<MeleeRangePenalty>/gi, () => {
      return 'RangeModifier';
    });
  }
  
  return rendered;
}

/**
 * Get color for stat modifier based on stat type
 * @param stat - Stat name (lowercase)
 * @returns CSS color string
 */
export function getStatColor(stat: string): string {
  const statColors: Record<string, string> = {
    strength: '#e74c3c', // Red
    dexterity: '#3498db', // Blue
    willpower: '#9b59b6', // Purple
    charisma: '#e67e22', // Orange
    intelligence: '#1abc9c', // Teal
    control: '#f39c12', // Yellow
    vitality: '#16a085', // Green
    luck: '#e91e63', // Pink
    planar: '#9b59b6', // Purple (same as willpower)
    leadership: '#e67e22', // Orange (same as charisma)
    endurance: '#16a085', // Green (same as vitality)
    agility: '#3498db', // Blue (same as dexterity)
  };
  return statColors[stat.toLowerCase()] || '#34495e'; // Dark gray default
}

/**
 * Escape HTML to prevent XSS
 * @param text - Text to escape
 * @returns Escaped HTML string
 */
export function escapeHtml(text: string): string {
  if (typeof document !== 'undefined') {
    // Client-side: use DOM API
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  // Server-side fallback: manual escaping
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

