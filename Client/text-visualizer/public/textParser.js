// public/textParser.ts
function renderText(text, options2 = {}) {
  const {
    skillLevel: skillLevel2 = 0,
    formula: formula2 = null,
    counter: counter2 = 0,
    isSkill = false,
    character: character2 = null,
    l10nData = null,
    currentLanguage = "en",
    renderBuffDebuffTooltip = null
  } = options2;
  if (!text)
    return "";
  let rendered2 = text;
  rendered2 = rendered2.replace(/\{(\d+)\}'([^']+?)':'([^']+?)'\{\/\}/g, (match, level, valueIfMet, valueIfNot) => {
    const levelThreshold = parseInt(level);
    if (isSkill && skillLevel2 >= levelThreshold) {
      return valueIfMet;
    }
    return valueIfNot;
  });
  rendered2 = rendered2.replace(/\{(\d+)\}([\s\S]*?)\{\/\}/g, (match, level, content) => {
    const levelThreshold = parseInt(level);
    if (isSkill && skillLevel2 >= levelThreshold) {
      return content.replace(/^\s*\n+|\n+\s*$/g, "").trim();
    }
    return "";
  });
  rendered2 = rendered2.replace(/\{COUNTER>=(\d+)\}([\s\S]*?)\{\/\}/g, (match, threshold, content) => {
    if (counter2 >= parseInt(threshold)) {
      return content.replace(/^\s*\n+|\n+\s*$/g, "").trim();
    }
    return "";
  });
  rendered2 = rendered2.replace(/\{COUNTER===(\d+)\}([\s\S]*?)\{\/\}/g, (match, value, content) => {
    if (counter2 === parseInt(value)) {
      return content.replace(/^\s*\n+|\n+\s*$/g, "").trim();
    }
    return "";
  });
  if (formula2) {
    const renderedFormula = renderFormula(formula2, { counter: counter2, skillLevel: skillLevel2, character: character2, showValues: true });
    rendered2 = rendered2.replace(/<FORMULA>/g, `<span class="formula-capsule">${renderedFormula}</span>`);
  }
  rendered2 = rendered2.replace(/\[r\](.*?)\[\/r\]/g, '<span class="text-red">$1</span>');
  rendered2 = rendered2.replace(/\[g\](.*?)\[\/g\]/g, '<span class="text-green">$1</span>');
  rendered2 = rendered2.replace(/\[b\](.*?)\[\/b\]/g, '<span class="text-blue">$1</span>');
  rendered2 = rendered2.replace(/\[bold\](.*?)\[\/bold\]/g, '<span class="text-bold">$1</span>');
  if (l10nData && character2 && renderBuffDebuffTooltip) {
    rendered2 = rendered2.replace(/<Buff(\w+)>/g, (match, buffName) => {
      const buffId = buffName.charAt(0).toLowerCase() + buffName.slice(1);
      const buffData = l10nData.buffs?.[buffId];
      if (buffData) {
        const activeBuff = character2.buffs?.find((b) => b.id === buffId);
        const buffCounter = activeBuff ? activeBuff.counter : 0;
        const renderedDescription = renderText(buffData.description[currentLanguage] || "", {
          skillLevel: 0,
          formula: null,
          counter: buffCounter,
          isSkill: false,
          character: character2,
          l10nData,
          currentLanguage,
          renderBuffDebuffTooltip
        });
        return renderBuffDebuffTooltip("buff", buffId, buffData.name[currentLanguage], renderedDescription);
      }
      return match;
    });
    rendered2 = rendered2.replace(/<Debuff(\w+)>/g, (match, debuffName) => {
      const debuffId = debuffName.charAt(0).toLowerCase() + debuffName.slice(1);
      const debuffData = l10nData.debuffs?.[debuffId];
      if (debuffData) {
        const activeDebuff = character2.debuffs?.find((d) => d.id === debuffId);
        const debuffCounter = activeDebuff ? activeDebuff.counter : 0;
        const renderedDescription = renderText(debuffData.description[currentLanguage] || "", {
          skillLevel: 0,
          formula: null,
          counter: debuffCounter,
          isSkill: false,
          character: character2,
          l10nData,
          currentLanguage,
          renderBuffDebuffTooltip
        });
        return renderBuffDebuffTooltip("debuff", debuffId, debuffData.name[currentLanguage], renderedDescription);
      }
      return match;
    });
  }
  if (character2) {
    rendered2 = rendered2.replace(/<(\w+)mod>/gi, (match, statName) => {
      const stat = statName.toLowerCase();
      const statValue = character2.stats?.[stat] || 0;
      const mod = Math.floor((statValue - 10) / 2);
      const modStr = mod >= 0 ? `${mod}` : `${mod}`;
      const statColorClass = getStatColorClass(stat);
      return `<span class="stat-mod ${statColorClass} tooltip" data-tooltip="${statName.toUpperCase()} modifiers">${modStr}</span>`;
    });
    rendered2 = rendered2.replace(/<(\w+)save>/gi, (match, statName) => {
      const stat = statName.toLowerCase();
      const statValue = character2.stats?.[stat] || 0;
      const mod = Math.floor((statValue - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
      return `<span class="tooltip" data-tooltip="${stat.toUpperCase()} save: ${modStr} (${statValue})">${stat.toUpperCase()}save</span>`;
    });
    rendered2 = rendered2.replace(/<WeaponDamage>/g, () => {
      return `<span class="tooltip" data-tooltip="Weapon's damage">${character2.weaponDamage || 0}</span>`;
    });
    rendered2 = rendered2.replace(/<SkillLevelMultiplier>/gi, () => {
      if (isSkill && skillLevel2 > 0) {
        const multiplier = (1 + 0.1 * skillLevel2).toFixed(1);
        return `<span class="tooltip" data-tooltip="Skill Level">${multiplier}×</span>`;
      }
      return '<span class="tooltip" data-tooltip="Skill Level">skill level multiplier</span>';
    });
    rendered2 = rendered2.replace(/<MeleeRangePenalty>/gi, () => {
      return `<span class="tooltip" data-tooltip="Range Modifier: Front-to-front 100%, Front-to-back 70%, Back-to-back 40%">RangeModifier</span>`;
    });
    rendered2 = rendered2.replace(/<ControlMod>/gi, () => {
      const mod = Math.floor((character2.stats?.control - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
      return `<span class="tooltip" data-tooltip="Control modifier: ${modStr} (${character2.stats?.control || 0})">${modStr}</span>`;
    });
    rendered2 = rendered2.replace(/<PlanarMod>/gi, () => {
      const intMod = Math.floor((character2.stats?.intelligence - 10) / 2);
      const chaMod = Math.floor((character2.stats?.charisma - 10) / 2);
      const planarMod = Math.max(intMod, chaMod);
      const modStr = planarMod >= 0 ? `+${planarMod}` : `${planarMod}`;
      return `<span class="tooltip" data-tooltip="Planar modifier: ${modStr} (max of INT/CHA)">${modStr}</span>`;
    });
  }
  rendered2 = rendered2.replace(/<COUNTER>/g, counter2.toString());
  rendered2 = rendered2.replace(/\n/g, "<br>");
  return rendered2;
}
function renderFormula(formula, options = {}) {
  const {
    counter = 0,
    skillLevel = 0,
    character = null,
    showValues = false
  } = options;
  if (!formula)
    return "";
  let rendered = formula;
  rendered = rendered.replace(/\{(\d+)\}'([^']+?)':'([^']+?)'\{\/\}/g, (match, level, valueIfMet, valueIfNot) => {
    const levelThreshold = parseInt(level);
    if (skillLevel >= levelThreshold) {
      return valueIfMet;
    }
    return valueIfNot;
  });
  if (showValues && character) {
    rendered = rendered.replace(/<COUNTER>/g, counter.toString());
    rendered = rendered.replace(/<(\w+)mod>/gi, (match, statName) => {
      const stat = statName.toLowerCase();
      const statValue = character.stats?.[stat] || 0;
      const mod = Math.floor((statValue - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
      const statColorClass = getStatColorClass(stat);
      return `<span class="stat-mod ${statColorClass} tooltip" data-tooltip="${statName.toUpperCase()} modifiers">${modStr}</span>`;
    });
    rendered = rendered.replace(/<WeaponDamage>/g, () => {
      const damage = character.weaponDamage || 0;
      return `<span class="tooltip" data-tooltip="Weapon's damage">${damage}</span>`;
    });
    rendered = rendered.replace(/<SkillLevelMultiplier>/gi, () => {
      if (skillLevel > 0) {
        const multiplier = (1 + 0.1 * skillLevel).toFixed(1);
        return `<span class="tooltip" data-tooltip="Skill Level">${multiplier}×</span>`;
      }
      return '<span class="tooltip" data-tooltip="Skill Level">1.0×</span>';
    });
    rendered = rendered.replace(/<ControlMod>/gi, () => {
      const mod = Math.floor((character.stats?.control - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
      return `<span class="tooltip" data-tooltip="Control modifier: ${modStr} (${character.stats?.control || 0})">${modStr}</span>`;
    });
    rendered = rendered.replace(/<PlanarMod>/gi, () => {
      const intMod = Math.floor((character.stats?.intelligence - 10) / 2);
      const chaMod = Math.floor((character.stats?.charisma - 10) / 2);
      const planarMod = Math.max(intMod, chaMod);
      const modStr = planarMod >= 0 ? `+${planarMod}` : `${planarMod}`;
      return `<span class="tooltip" data-tooltip="Planar modifier: ${modStr} (max of INT/CHA)">${modStr}</span>`;
    });
    rendered = rendered.replace(/<MeleeRangePenalty>/gi, () => {
      return `<span class="tooltip" data-tooltip="Range Modifier: Front-to-front 100%, Front-to-back 70%, Back-to-back 40%">RangeModifier</span>`;
    });
    try {
      const evalStr = rendered.replace(/[^0-9+\-*/()., ]/g, "");
      if (evalStr) {
        const result = eval(evalStr);
        if (typeof result === "number" && !isNaN(result)) {
          return `${rendered} = ${result.toFixed(2)}`;
        }
      }
    } catch (e) {}
  }
  return rendered;
}
function getStatColorClass(stat) {
  const statColors = {
    strength: "stat-str",
    dexterity: "stat-dex",
    willpower: "stat-wil",
    charisma: "stat-cha",
    intelligence: "stat-int",
    control: "stat-con",
    vitality: "stat-vit",
    luck: "stat-luk"
  };
  return statColors[stat.toLowerCase()] || "stat-default";
}
function escapeHtml(text) {
  if (typeof document === "undefined") {
    return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
export {
  renderText,
  renderFormula,
  getStatColorClass,
  escapeHtml
};
