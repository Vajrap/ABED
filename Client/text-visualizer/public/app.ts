/**
 * Text Visualizer App
 * Renders L10N text with markup parsing
 */

import { renderText, renderFormula, getStatColorClass, escapeHtml, Character, L10NData } from './textParser.js';
import { initTooltips } from './tooltip.js';

let character: Character | null = null;
let l10nData: L10NData | null = null;
let currentLanguage: 'en' | 'th' = 'en';
let currentTab: 'skills' | 'buffs' | 'debuffs' = 'skills';

// Initialize
async function init(): Promise<void> {
  try {
    const [charRes, l10nRes] = await Promise.all([
      fetch('/api/character'),
      fetch('/api/l10n'),
    ]);
    
    character = await charRes.json() as Character;
    l10nData = await l10nRes.json() as L10NData;
    
    setupEventListeners();
    render();
  } catch (error) {
    console.error('Failed to load data:', error);
    const contentEl = document.getElementById('content');
    if (contentEl) {
      contentEl.innerHTML = '<div class="error">Failed to load data</div>';
    }
  }
}

function setupEventListeners(): void {
  // Language selector
  const languageEl = document.getElementById('language') as HTMLSelectElement;
  if (languageEl) {
    languageEl.addEventListener('change', (e) => {
      currentLanguage = (e.target as HTMLSelectElement).value as 'en' | 'th';
      render();
    });
  }
  
  // Tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = (tab as HTMLElement).dataset.tab as 'skills' | 'buffs' | 'debuffs';
      render();
    });
  });
}

function render(): void {
  if (!character || !l10nData) return;
  
  const content = document.getElementById('content');
  if (!content) return;
  
  if (currentTab === 'skills') {
    content.innerHTML = renderSkills();
  } else if (currentTab === 'buffs') {
    content.innerHTML = renderBuffs();
  } else if (currentTab === 'debuffs') {
    content.innerHTML = renderDebuffs();
  }
  
  // Initialize MUI-style tooltips after rendering
  setTimeout(() => initTooltips(), 0);
}

function renderSkills(): string {
  if (!character || !l10nData) return '';
  
  const skills = character.skills
    .map(skill => {
      // The L10N data uses enum values as keys (e.g., "Basic", "Earthshatter")
      // but our skill IDs are like "BasicSkillId.Basic", so extract the enum value
      let skillKey = skill.id;
      if (skill.id.includes('.')) {
        skillKey = skill.id.split('.').pop() || skill.id;
      }
      
      // Try to find the skill in L10N data
      // The keys in skillsL10N are the enum values, not the full enum paths
      const skillData = l10nData!.skills[skillKey];
      if (!skillData) {
        // Try alternative lookup - maybe the key is different
        console.warn(`Skill not found: ${skillKey} (from ${skill.id})`);
        return null;
      }
      
      return {
        id: skill.id,
        skillKey: skillKey,
        name: skillData.name[currentLanguage],
        description: skillData.description[currentLanguage],
        formula: skillData.formula,
        level: skill.level,
      };
    })
    .filter((skill): skill is NonNullable<typeof skill> => skill !== null);
  
  if (skills.length === 0) {
    console.error('No skills found!', {
      totalSkills: character.skills.length,
      sampleSkill: character.skills[0],
      l10nKeys: Object.keys(l10nData.skills).slice(0, 5),
    });
  }
  
  if (skills.length === 0) {
    return '<div class="error">No skills found. Check console for details.</div>';
  }
  
  return `
    <div class="item-grid">
      ${skills.map(skill => {
        const renderedFormula = skill.formula ? renderFormula(skill.formula, { counter: 0, skillLevel: skill.level, character, showValues: true }) : null;
        return `
        <div class="item-card">
          <div class="item-header">
            <div class="item-name">${escapeHtml(skill.name)}</div>
            <div class="item-meta">
              <div><strong>Level:</strong> ${skill.level}</div>
              <div style="font-size: 0.75em; color: #95a5a6; margin-top: 4px; font-family: monospace;">${skill.id}</div>
            </div>
          </div>
          <div class="item-description">
            ${renderText(skill.description, {
              skillLevel: skill.level,
              formula: skill.formula,
              counter: 0,
              isSkill: true,
              character,
              l10nData,
              currentLanguage,
              renderBuffDebuffTooltip: createBuffDebuffTooltip,
            })}
          </div>
          ${skill.formula ? `<div class="item-formula"><strong>Formula:</strong> ${renderedFormula || escapeHtml(skill.formula)}</div>` : ''}
        </div>
      `;
      }).join('')}
    </div>
  `;
}

function renderBuffs(): string {
  if (!character || !l10nData) return '';
  
  const buffs = character.buffs
    .map(buff => {
      const buffData = l10nData!.buffs[buff.id];
      if (!buffData) return null;
      
      return {
        id: buff.id,
        name: buffData.name[currentLanguage],
        description: buffData.description[currentLanguage],
        formula: buffData.formula,
        value: buff.value,
        counter: buff.counter,
      };
    })
    .filter((buff): buff is NonNullable<typeof buff> => buff !== null);
  
  return `
    <div class="item-grid">
      ${buffs.map(buff => {
        const renderedFormula = buff.formula ? renderFormula(buff.formula, { counter: buff.counter, skillLevel: 0, character, showValues: true }) : null;
        return `
        <div class="item-card">
          <div class="item-header">
            <div class="item-name">${escapeHtml(buff.name)}</div>
            <div class="item-meta">
              <div>Value: ${buff.value}</div>
              <div>Counter: ${buff.counter}</div>
              <div style="font-size: 0.75em; color: #95a5a6;">${buff.id}</div>
            </div>
          </div>
          <div class="item-description">
            ${renderText(buff.description, {
              skillLevel: 0,
              formula: buff.formula,
              counter: buff.counter,
              isSkill: false,
              character,
              l10nData,
              currentLanguage,
              renderBuffDebuffTooltip: createBuffDebuffTooltip,
            })}
          </div>
          ${buff.formula ? `<div class="item-formula"><strong>Formula:</strong> ${renderedFormula || escapeHtml(buff.formula)}</div>` : ''}
        </div>
      `;
      }).join('')}
    </div>
  `;
}

function renderDebuffs(): string {
  if (!character || !l10nData) return '';
  
  const debuffs = character.debuffs
    .map(debuff => {
      const debuffData = l10nData!.debuffs[debuff.id];
      if (!debuffData) return null;
      
      return {
        id: debuff.id,
        name: debuffData.name[currentLanguage],
        description: debuffData.description[currentLanguage],
        formula: debuffData.formula,
        value: debuff.value,
        counter: debuff.counter,
      };
    })
    .filter((debuff): debuff is NonNullable<typeof debuff> => debuff !== null);
  
  return `
    <div class="item-grid">
      ${debuffs.map(debuff => {
        const renderedFormula = debuff.formula ? renderFormula(debuff.formula, { counter: debuff.counter, skillLevel: 0, character, showValues: true }) : null;
        return `
        <div class="item-card">
          <div class="item-header">
            <div class="item-name">${escapeHtml(debuff.name)}</div>
            <div class="item-meta">
              <div>Value: ${debuff.value}</div>
              <div>Counter: ${debuff.counter}</div>
              <div style="font-size: 0.75em; color: #95a5a6;">${debuff.id}</div>
            </div>
          </div>
          <div class="item-description">
            ${renderText(debuff.description, {
              skillLevel: 0,
              formula: debuff.formula,
              counter: debuff.counter,
              isSkill: false,
              character,
              l10nData,
              currentLanguage,
              renderBuffDebuffTooltip: createBuffDebuffTooltip,
            })}
          </div>
          ${debuff.formula ? `<div class="item-formula"><strong>Formula:</strong> ${renderedFormula || escapeHtml(debuff.formula)}</div>` : ''}
        </div>
      `;
      }).join('')}
    </div>
  `;
}

/**
 * Create buff/debuff tooltip HTML
 * This is specific to the visualizer - the parser module doesn't handle tooltip creation
 */
function createBuffDebuffTooltip(type: 'buff' | 'debuff', id: string, name: string, renderedDescription: string): string {
  // Store HTML in data attribute using base64 to avoid escaping issues
  // Note: No formula in tooltip, just the description
  const tooltipId = `tooltip-${type}-${id}`;
  const encodedHtml = btoa(unescape(encodeURIComponent(renderedDescription)));
  const tagClass = type === 'buff' ? 'buff-tag' : 'debuff-tag';
  return `<span class="${tagClass} tooltip-html" data-tooltip-id="${tooltipId}" data-tooltip-html="${encodedHtml}">${escapeHtml(name)}</span>`;
}

// Start the app
init().catch((error) => {
  console.error('Failed to initialize app:', error);
  const contentEl = document.getElementById('content');
  if (contentEl) {
    contentEl.innerHTML = `<div class="error">Failed to initialize: ${error instanceof Error ? error.message : String(error)}</div>`;
  }
});

