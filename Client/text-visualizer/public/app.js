// public/textParser.js
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

// public/tooltip.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"]
};
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
var max = Math.max;
var min = Math.min;
var round = Math.round;
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === undefined) {
    includeScale = false;
  }
  if (isFixedStrategy === undefined) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var { state, name, options: options2 } = _ref;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets) {
    return;
  }
  var paddingObject = toPaddingObject(options2.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var { state, options: options2 } = _ref2;
  var _options$element = options2.element, arrowElement = _options$element === undefined ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function getVariation(placement) {
  return placement.split("-")[1];
}
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
  var { x, y } = _ref;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var { popper: popper2, popperRect, placement, variation, offsets, position, gpuAcceleration, adaptive, roundOffsets, isFixed } = _ref2;
  var _offsets$x = offsets.x, x = _offsets$x === undefined ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === undefined ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }, getWindow(popper2)) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var { state, options: options2 } = _ref5;
  var _options$gpuAccelerat = options2.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === undefined ? true : _options$gpuAccelerat, _options$adaptive = options2.adaptive, adaptive = _options$adaptive === undefined ? true : _options$adaptive, _options$roundOffsets = options2.roundOffsets, roundOffsets = _options$roundOffsets === undefined ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
var passive = {
  passive: true
};
function effect3(_ref) {
  var { state, instance, options: options2 } = _ref;
  var _options$scroll = options2.scroll, scroll = _options$scroll === undefined ? true : _options$scroll, _options$resize = options2.resize, resize = _options$resize === undefined ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {},
  effect: effect3,
  data: {}
};
var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}
var hash2 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? undefined : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === undefined) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? undefined : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
function computeOffsets(_ref) {
  var { reference: reference2, element, placement } = _ref;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}
function detectOverflow(state, options2) {
  if (options2 === undefined) {
    options2 = {};
  }
  var _options = options2, _options$placement = _options.placement, placement = _options$placement === undefined ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === undefined ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === undefined ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === undefined ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === undefined ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === undefined ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === undefined ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }
  return overflowOffsets;
}
function computeAutoPlacement(state, options2) {
  if (options2 === undefined) {
    options2 = {};
  }
  var _options = options2, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === undefined ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var { state, options: options2, name } = _ref;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options2.mainAxis, checkMainAxis = _options$mainAxis === undefined ? true : _options$mainAxis, _options$altAxis = options2.altAxis, checkAltAxis = _options$altAxis === undefined ? true : _options$altAxis, specifiedFallbackPlacements = options2.fallbackPlacements, padding = options2.padding, boundary = options2.boundary, rootBoundary = options2.rootBoundary, altBoundary = options2.altBoundary, _options$flipVariatio = options2.flipVariations, flipVariations = _options$flipVariatio === undefined ? true : _options$flipVariatio, allowedAutoPlacements = options2.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map;
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0;i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks;_i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === undefined) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var { state, name } = _ref;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};
function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset === "function" ? offset(Object.assign({}, rects, {
    placement
  })) : offset, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var { state, options: options2, name } = _ref2;
  var _options$offset = options2.offset, offset2 = _options$offset === undefined ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};
function popperOffsets(_ref) {
  var { state, name } = _ref;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function preventOverflow(_ref) {
  var { state, options: options2, name } = _ref;
  var _options$mainAxis = options2.mainAxis, checkMainAxis = _options$mainAxis === undefined ? true : _options$mainAxis, _options$altAxis = options2.altAxis, checkAltAxis = _options$altAxis === undefined ? false : _options$altAxis, boundary = options2.boundary, rootBoundary = options2.rootBoundary, altBoundary = options2.altBoundary, padding = options2.padding, _options$tether = options2.tether, tether = _options$tether === undefined ? true : _options$tether, _options$tetherOffset = options2.tetherOffset, tetherOffset = _options$tetherOffset === undefined ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = offset2 + overflow[mainSide];
    var max2 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? undefined : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? undefined : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === undefined) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function order(modifiers) {
  var map = new Map;
  var visited = new Set;
  var result2 = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result2.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result2;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = undefined;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0;_key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === undefined) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers = _generatorOptions$def === undefined ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === undefined ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference2, popper2, options2) {
    if (options2 === undefined) {
      options2 = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options22 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options22);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0;index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === undefined ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options2).then(function(state2) {
      if (!isDestroyed && options2.onFirstUpdate) {
        options2.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref) {
        var { name, options: _ref$options } = _ref, options22 = _ref$options === undefined ? {} : _ref$options, effect4 = _ref.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options22
          });
          var noopFn = function noopFn() {};
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});
var popperInstances = new WeakMap;
function initTooltips() {
  document.querySelectorAll(".mui-tooltip").forEach((tooltip) => {
    if (!tooltip.parentElement)
      return;
    const element = tooltip.parentElement.querySelector("[data-tooltip], .tooltip-html");
    if (element && popperInstances.has(element)) {
      const instance = popperInstances.get(element);
      if (instance) {
        instance.destroy();
      }
      popperInstances.delete(element);
    }
    tooltip.remove();
  });
  document.querySelectorAll("[data-tooltip]:not(.tooltip-html)").forEach((element) => {
    const tooltipText = element.getAttribute("data-tooltip");
    if (!tooltipText || popperInstances.has(element))
      return;
    const tooltip = document.createElement("div");
    tooltip.className = "mui-tooltip";
    tooltip.setAttribute("role", "tooltip");
    tooltip.innerHTML = `<div class="mui-tooltip-arrow"></div><div class="mui-tooltip-inner">${escapeHtml2(tooltipText)}</div>`;
    document.body.appendChild(tooltip);
    const popperInstance = createPopper(element, tooltip, {
      placement: "top",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8]
          }
        }
      ]
    });
    popperInstances.set(element, popperInstance);
    element.addEventListener("mouseenter", () => {
      tooltip.setAttribute("data-show", "");
      popperInstance.update();
    });
    element.addEventListener("mouseleave", () => {
      tooltip.removeAttribute("data-show");
    });
  });
  document.querySelectorAll(".tooltip-html").forEach((element) => {
    const encodedHtml = element.getAttribute("data-tooltip-html");
    if (!encodedHtml || popperInstances.has(element))
      return;
    const tooltip = document.createElement("div");
    tooltip.className = "mui-tooltip mui-tooltip-html";
    tooltip.setAttribute("role", "tooltip");
    try {
      const tooltipHtml = decodeURIComponent(escape(atob(encodedHtml)));
      tooltip.innerHTML = `<div class="mui-tooltip-arrow"></div><div class="mui-tooltip-inner">${tooltipHtml}</div>`;
      document.body.appendChild(tooltip);
      const popperInstance = createPopper(element, tooltip, {
        placement: "top",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8]
            }
          }
        ]
      });
      popperInstances.set(element, popperInstance);
      element.addEventListener("mouseenter", () => {
        tooltip.setAttribute("data-show", "");
        popperInstance.update();
      });
      element.addEventListener("mouseleave", () => {
        tooltip.removeAttribute("data-show");
      });
    } catch (e) {
      console.error("Error decoding tooltip HTML:", e);
    }
  });
}
function escapeHtml2(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// public/app.ts
var character2 = null;
var l10nData = null;
var currentLanguage = "en";
var currentTab = "skills";
async function init() {
  try {
    const [charRes, l10nRes] = await Promise.all([
      fetch("/api/character"),
      fetch("/api/l10n")
    ]);
    character2 = await charRes.json();
    l10nData = await l10nRes.json();
    setupEventListeners();
    render();
  } catch (error) {
    console.error("Failed to load data:", error);
    const contentEl = document.getElementById("content");
    if (contentEl) {
      contentEl.innerHTML = '<div class="error">Failed to load data</div>';
    }
  }
}
function setupEventListeners() {
  const languageEl = document.getElementById("language");
  if (languageEl) {
    languageEl.addEventListener("change", (e) => {
      currentLanguage = e.target.value;
      render();
    });
  }
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentTab = tab.dataset.tab;
      render();
    });
  });
}
function render() {
  if (!character2 || !l10nData)
    return;
  const content = document.getElementById("content");
  if (!content)
    return;
  if (currentTab === "skills") {
    content.innerHTML = renderSkills();
  } else if (currentTab === "buffs") {
    content.innerHTML = renderBuffs();
  } else if (currentTab === "debuffs") {
    content.innerHTML = renderDebuffs();
  }
  setTimeout(() => initTooltips(), 0);
}
function renderSkills() {
  if (!character2 || !l10nData)
    return "";
  const skills = character2.skills.map((skill) => {
    let skillKey = skill.id;
    if (skill.id.includes(".")) {
      skillKey = skill.id.split(".").pop() || skill.id;
    }
    const skillData = l10nData.skills[skillKey];
    if (!skillData) {
      console.warn(`Skill not found: ${skillKey} (from ${skill.id})`);
      return null;
    }
    return {
      id: skill.id,
      skillKey,
      name: skillData.name[currentLanguage],
      description: skillData.description[currentLanguage],
      formula: skillData.formula,
      level: skill.level
    };
  }).filter((skill) => skill !== null);
  if (skills.length === 0) {
    console.error("No skills found!", {
      totalSkills: character2.skills.length,
      sampleSkill: character2.skills[0],
      l10nKeys: Object.keys(l10nData.skills).slice(0, 5)
    });
  }
  if (skills.length === 0) {
    return '<div class="error">No skills found. Check console for details.</div>';
  }
  return `
    <div class="item-grid">
      ${skills.map((skill) => {
    const renderedFormula = skill.formula ? renderFormula(skill.formula, { counter: 0, skillLevel: skill.level, character: character2, showValues: true }) : null;
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
      character: character2,
      l10nData,
      currentLanguage,
      renderBuffDebuffTooltip: createBuffDebuffTooltip
    })}
          </div>
          ${skill.formula ? `<div class="item-formula"><strong>Formula:</strong> ${renderedFormula || escapeHtml(skill.formula)}</div>` : ""}
        </div>
      `;
  }).join("")}
    </div>
  `;
}
function renderBuffs() {
  if (!character2 || !l10nData)
    return "";
  const buffs = character2.buffs.map((buff) => {
    const buffData = l10nData.buffs[buff.id];
    if (!buffData)
      return null;
    return {
      id: buff.id,
      name: buffData.name[currentLanguage],
      description: buffData.description[currentLanguage],
      formula: buffData.formula,
      value: buff.value,
      counter: buff.counter
    };
  }).filter((buff) => buff !== null);
  return `
    <div class="item-grid">
      ${buffs.map((buff) => {
    const renderedFormula = buff.formula ? renderFormula(buff.formula, { counter: buff.counter, skillLevel: 0, character: character2, showValues: true }) : null;
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
      character: character2,
      l10nData,
      currentLanguage,
      renderBuffDebuffTooltip: createBuffDebuffTooltip
    })}
          </div>
          ${buff.formula ? `<div class="item-formula"><strong>Formula:</strong> ${renderedFormula || escapeHtml(buff.formula)}</div>` : ""}
        </div>
      `;
  }).join("")}
    </div>
  `;
}
function renderDebuffs() {
  if (!character2 || !l10nData)
    return "";
  const debuffs = character2.debuffs.map((debuff) => {
    const debuffData = l10nData.debuffs[debuff.id];
    if (!debuffData)
      return null;
    return {
      id: debuff.id,
      name: debuffData.name[currentLanguage],
      description: debuffData.description[currentLanguage],
      formula: debuffData.formula,
      value: debuff.value,
      counter: debuff.counter
    };
  }).filter((debuff) => debuff !== null);
  return `
    <div class="item-grid">
      ${debuffs.map((debuff) => {
    const renderedFormula = debuff.formula ? renderFormula(debuff.formula, { counter: debuff.counter, skillLevel: 0, character: character2, showValues: true }) : null;
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
      character: character2,
      l10nData,
      currentLanguage,
      renderBuffDebuffTooltip: createBuffDebuffTooltip
    })}
          </div>
          ${debuff.formula ? `<div class="item-formula"><strong>Formula:</strong> ${renderedFormula || escapeHtml(debuff.formula)}</div>` : ""}
        </div>
      `;
  }).join("")}
    </div>
  `;
}
function createBuffDebuffTooltip(type, id, name, renderedDescription) {
  const tooltipId = `tooltip-${type}-${id}`;
  const encodedHtml = btoa(unescape(encodeURIComponent(renderedDescription)));
  const tagClass = type === "buff" ? "buff-tag" : "debuff-tag";
  return `<span class="${tagClass} tooltip-html" data-tooltip-id="${tooltipId}" data-tooltip-html="${encodedHtml}">${escapeHtml(name)}</span>`;
}
init().catch((error) => {
  console.error("Failed to initialize app:", error);
  const contentEl = document.getElementById("content");
  if (contentEl) {
    contentEl.innerHTML = `<div class="error">Failed to initialize: ${error instanceof Error ? error.message : String(error)}</div>`;
  }
});
