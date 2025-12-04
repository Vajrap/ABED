/**
 * Text Parser for L10N Markup
 * This module provides reusable text parsing logic for rendering L10N text with markup.
 * Can be used in both the visualizer and the main Client application.
 */

/**
 * Character stats interface
 */
export interface CharacterStats {
  strength: number;
  dexterity: number;
  willpower: number;
  charisma: number;
  intelligence: number;
  control: number;
  vitality: number;
  luck: number;
}

/**
 * Character interface
 */
export interface Character {
  stats: CharacterStats;
  weaponDamage: number;
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
  currentLanguage?: string;
  renderBuffDebuffTooltip?: ((type: string, id: string, name: string, renderedDescription: string) => string) | null;
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
 * Render text with markup parsing
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
  if (formula) {
    const renderedFormula = renderFormula(formula, { counter, skillLevel, character, showValues: true });
    rendered = rendered.replace(/<FORMULA>/g, `<span class="formula-capsule">${renderedFormula}</span>`);
  }
  
  // Color tags: [r]text[/r] = red, [g]text[/g] = green, [b]text[/b] = blue
  rendered = rendered.replace(/\[r\](.*?)\[\/r\]/g, '<span class="text-red">$1</span>');
  rendered = rendered.replace(/\[g\](.*?)\[\/g\]/g, '<span class="text-green">$1</span>');
  rendered = rendered.replace(/\[b\](.*?)\[\/b\]/g, '<span class="text-blue">$1</span>');
  
  // Bold: [bold]text[/bold]
  rendered = rendered.replace(/\[bold\](.*?)\[\/bold\]/g, '<span class="text-bold">$1</span>');
  
  // Buff tags: <BuffName> - with rich tooltip showing parsed description
  if (l10nData && character && renderBuffDebuffTooltip) {
    rendered = rendered.replace(/<Buff(\w+)>/g, (match, buffName) => {
      const buffId = buffName.charAt(0).toLowerCase() + buffName.slice(1);
      const buffData = l10nData.buffs?.[buffId];
      if (buffData) {
        const activeBuff = character.buffs?.find(b => b.id === buffId);
        const buffCounter = activeBuff ? activeBuff.counter : 0;
        
        const renderedDescription = renderText(buffData.description[currentLanguage as 'en' | 'th'] || '', {
          skillLevel: 0,
          formula: null,
          counter: buffCounter,
          isSkill: false,
          character,
          l10nData,
          currentLanguage,
          renderBuffDebuffTooltip,
        });
        
        return renderBuffDebuffTooltip('buff', buffId, buffData.name[currentLanguage as 'en' | 'th'], renderedDescription);
      }
      return match;
    });
    
    // Debuff tags: <DebuffName> - with rich tooltip showing parsed description
    rendered = rendered.replace(/<Debuff(\w+)>/g, (match, debuffName) => {
      const debuffId = debuffName.charAt(0).toLowerCase() + debuffName.slice(1);
      const debuffData = l10nData.debuffs?.[debuffId];
      if (debuffData) {
        const activeDebuff = character.debuffs?.find(d => d.id === debuffId);
        const debuffCounter = activeDebuff ? activeDebuff.counter : 0;
        
        const renderedDescription = renderText(debuffData.description[currentLanguage as 'en' | 'th'] || '', {
          skillLevel: 0,
          formula: null,
          counter: debuffCounter,
          isSkill: false,
          character,
          l10nData,
          currentLanguage,
          renderBuffDebuffTooltip,
        });
        
        return renderBuffDebuffTooltip('debuff', debuffId, debuffData.name[currentLanguage as 'en' | 'th'], renderedDescription);
      }
      return match;
    });
  }
  
  // Stat modifiers: <STRmod>, <DEXmod>, etc. - show number with color and tooltip
  if (character) {
    rendered = rendered.replace(/<(\w+)mod>/gi, (match, statName) => {
      const stat = statName.toLowerCase();
      const statValue = character.stats?.[stat as keyof CharacterStats] || 0;
      const mod = Math.floor((statValue - 10) / 2);
      const modStr = mod >= 0 ? `${mod}` : `${mod}`;
      const statColorClass = getStatColorClass(stat);
      return `<span class="stat-mod ${statColorClass} tooltip" data-tooltip="${statName.toUpperCase()} modifiers">${modStr}</span>`;
    });
    
    // Save modifiers: <CONsave>, <STRsave>, etc.
    rendered = rendered.replace(/<(\w+)save>/gi, (match, statName) => {
      const stat = statName.toLowerCase();
      const statValue = character.stats?.[stat as keyof CharacterStats] || 0;
      const mod = Math.floor((statValue - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
      return `<span class="tooltip" data-tooltip="${stat.toUpperCase()} save: ${modStr} (${statValue})">${stat.toUpperCase()}save</span>`;
    });
    
    // Weapon damage: <WeaponDamage>
    rendered = rendered.replace(/<WeaponDamage>/g, () => {
      return `<span class="tooltip" data-tooltip="Weapon's damage">${character.weaponDamage || 0}</span>`;
    });
    
    // Skill level multiplier: <SkillLevelMultiplier>
    rendered = rendered.replace(/<SkillLevelMultiplier>/gi, () => {
      if (isSkill && skillLevel > 0) {
        const multiplier = (1 + 0.1 * skillLevel).toFixed(1);
        return `<span class="tooltip" data-tooltip="Skill Level">${multiplier}×</span>`;
      }
      return '<span class="tooltip" data-tooltip="Skill Level">skill level multiplier</span>';
    });
    
    // Melee range penalty: <MeleeRangePenalty> - show as RangeModifier
    rendered = rendered.replace(/<MeleeRangePenalty>/gi, () => {
      return `<span class="tooltip" data-tooltip="Range Modifier: Front-to-front 100%, Front-to-back 70%, Back-to-back 40%">RangeModifier</span>`;
    });
    
    // Control mod: <ControlMod>
    rendered = rendered.replace(/<ControlMod>/gi, () => {
      const mod = Math.floor((character.stats?.control - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
      return `<span class="tooltip" data-tooltip="Control modifier: ${modStr} (${character.stats?.control || 0})">${modStr}</span>`;
    });
    
    // Planar mod: <PlanarMod>
    rendered = rendered.replace(/<PlanarMod>/gi, () => {
      const intMod = Math.floor((character.stats?.intelligence - 10) / 2);
      const chaMod = Math.floor((character.stats?.charisma - 10) / 2);
      const planarMod = Math.max(intMod, chaMod);
      const modStr = planarMod >= 0 ? `+${planarMod}` : `${planarMod}`;
      return `<span class="tooltip" data-tooltip="Planar modifier: ${modStr} (max of INT/CHA)">${modStr}</span>`;
    });
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
  
  if (showValues && character) {
    // Replace placeholders with actual values (with tooltips)
    rendered = rendered.replace(/<COUNTER>/g, counter.toString());
    
    // Stat modifiers - with tooltip
    rendered = rendered.replace(/<(\w+)mod>/gi, (match, statName) => {
      const stat = statName.toLowerCase();
      const statValue = character.stats?.[stat as keyof CharacterStats] || 0;
      const mod = Math.floor((statValue - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
      const statColorClass = getStatColorClass(stat);
      return `<span class="stat-mod ${statColorClass} tooltip" data-tooltip="${statName.toUpperCase()} modifiers">${modStr}</span>`;
    });
    
    // Weapon damage - with tooltip
    rendered = rendered.replace(/<WeaponDamage>/g, () => {
      const damage = character.weaponDamage || 0;
      return `<span class="tooltip" data-tooltip="Weapon's damage">${damage}</span>`;
    });
    
    // Skill level multiplier - with tooltip
    rendered = rendered.replace(/<SkillLevelMultiplier>/gi, () => {
      if (skillLevel > 0) {
        const multiplier = (1 + 0.1 * skillLevel).toFixed(1);
        return `<span class="tooltip" data-tooltip="Skill Level">${multiplier}×</span>`;
      }
      return '<span class="tooltip" data-tooltip="Skill Level">1.0×</span>';
    });
    
    // Control mod - with tooltip
    rendered = rendered.replace(/<ControlMod>/gi, () => {
      const mod = Math.floor((character.stats?.control - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
      return `<span class="tooltip" data-tooltip="Control modifier: ${modStr} (${character.stats?.control || 0})">${modStr}</span>`;
    });
    
    // Planar mod - with tooltip
    rendered = rendered.replace(/<PlanarMod>/gi, () => {
      const intMod = Math.floor((character.stats?.intelligence - 10) / 2);
      const chaMod = Math.floor((character.stats?.charisma - 10) / 2);
      const planarMod = Math.max(intMod, chaMod);
      const modStr = planarMod >= 0 ? `+${planarMod}` : `${planarMod}`;
      return `<span class="tooltip" data-tooltip="Planar modifier: ${modStr} (max of INT/CHA)">${modStr}</span>`;
    });
    
    // Melee range penalty - with tooltip
    rendered = rendered.replace(/<MeleeRangePenalty>/gi, () => {
      return `<span class="tooltip" data-tooltip="Range Modifier: Front-to-front 100%, Front-to-back 70%, Back-to-back 40%">RangeModifier</span>`;
    });
    
    // Try to evaluate the formula (safely)
    try {
      // Remove any remaining non-math characters for evaluation
      const evalStr = rendered.replace(/[^0-9+\-*/()., ]/g, '');
      if (evalStr) {
        const result = eval(evalStr);
        if (typeof result === 'number' && !isNaN(result)) {
          return `${rendered} = ${result.toFixed(2)}`;
        }
      }
    } catch (e) {
      // If evaluation fails, just return the rendered formula
    }
  }
  
  return rendered;
}

/**
 * Get color class for stat modifier based on stat type
 * @param stat - Stat name (lowercase)
 * @returns CSS class name
 */
export function getStatColorClass(stat: string): string {
  const statColors: Record<string, string> = {
    strength: 'stat-str',
    dexterity: 'stat-dex',
    willpower: 'stat-wil',
    charisma: 'stat-cha',
    intelligence: 'stat-int',
    control: 'stat-con',
    vitality: 'stat-vit',
    luck: 'stat-luk',
  };
  return statColors[stat.toLowerCase()] || 'stat-default';
}

/**
 * Escape HTML to prevent XSS
 * @param text - Text to escape
 * @returns Escaped HTML string
 */
export function escapeHtml(text: string): string {
  if (typeof document === 'undefined') {
    // Fallback for non-browser environments
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

