module.exports = [
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "alpha",
    ()=>alpha,
    "blend",
    ()=>blend,
    "colorChannel",
    ()=>colorChannel,
    "darken",
    ()=>darken,
    "decomposeColor",
    ()=>decomposeColor,
    "emphasize",
    ()=>emphasize,
    "getContrastRatio",
    ()=>getContrastRatio,
    "getLuminance",
    ()=>getLuminance,
    "hexToRgb",
    ()=>hexToRgb,
    "hslToRgb",
    ()=>hslToRgb,
    "lighten",
    ()=>lighten,
    "private_safeAlpha",
    ()=>private_safeAlpha,
    "private_safeColorChannel",
    ()=>private_safeColorChannel,
    "private_safeDarken",
    ()=>private_safeDarken,
    "private_safeEmphasize",
    ()=>private_safeEmphasize,
    "private_safeLighten",
    ()=>private_safeLighten,
    "recomposeColor",
    ()=>recomposeColor,
    "rgbToHex",
    ()=>rgbToHex
]);
/* eslint-disable @typescript-eslint/naming-convention */ var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$clamp$2f$clamp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/clamp/clamp.js [app-ssr] (ecmascript)");
;
;
/**
 * Returns a number whose value is limited to the given range.
 * @param {number} value The value to be clamped
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */ function clampWrapper(value, min = 0, max = 1) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (value < min || value > max) {
            console.error(`MUI: The value provided ${value} is out of range [${min}, ${max}].`);
        }
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$clamp$2f$clamp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(value, min, max);
}
function hexToRgb(color) {
    color = color.slice(1);
    const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, 'g');
    let colors = color.match(re);
    if (colors && colors[0].length === 1) {
        colors = colors.map((n)=>n + n);
    }
    return colors ? `rgb${colors.length === 4 ? 'a' : ''}(${colors.map((n, index)=>{
        return index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1000) / 1000;
    }).join(', ')})` : '';
}
function intToHex(int) {
    const hex = int.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
}
function decomposeColor(color) {
    // Idempotent
    if (color.type) {
        return color;
    }
    if (color.charAt(0) === '#') {
        return decomposeColor(hexToRgb(color));
    }
    const marker = color.indexOf('(');
    const type = color.substring(0, marker);
    if ([
        'rgb',
        'rgba',
        'hsl',
        'hsla',
        'color'
    ].indexOf(type) === -1) {
        throw new Error(("TURBOPACK compile-time truthy", 1) ? `MUI: Unsupported \`${color}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : "TURBOPACK unreachable");
    }
    let values = color.substring(marker + 1, color.length - 1);
    let colorSpace;
    if (type === 'color') {
        values = values.split(' ');
        colorSpace = values.shift();
        if (values.length === 4 && values[3].charAt(0) === '/') {
            values[3] = values[3].slice(1);
        }
        if ([
            'srgb',
            'display-p3',
            'a98-rgb',
            'prophoto-rgb',
            'rec-2020'
        ].indexOf(colorSpace) === -1) {
            throw new Error(("TURBOPACK compile-time truthy", 1) ? `MUI: unsupported \`${colorSpace}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : "TURBOPACK unreachable");
        }
    } else {
        values = values.split(',');
    }
    values = values.map((value)=>parseFloat(value));
    return {
        type,
        values,
        colorSpace
    };
}
const colorChannel = (color)=>{
    const decomposedColor = decomposeColor(color);
    return decomposedColor.values.slice(0, 3).map((val, idx)=>decomposedColor.type.indexOf('hsl') !== -1 && idx !== 0 ? `${val}%` : val).join(' ');
};
const private_safeColorChannel = (color, warning)=>{
    try {
        return colorChannel(color);
    } catch (error) {
        if (warning && ("TURBOPACK compile-time value", "development") !== 'production') {
            console.warn(warning);
        }
        return color;
    }
};
function recomposeColor(color) {
    const { type, colorSpace } = color;
    let { values } = color;
    if (type.indexOf('rgb') !== -1) {
        // Only convert the first 3 values to int (i.e. not alpha)
        values = values.map((n, i)=>i < 3 ? parseInt(n, 10) : n);
    } else if (type.indexOf('hsl') !== -1) {
        values[1] = `${values[1]}%`;
        values[2] = `${values[2]}%`;
    }
    if (type.indexOf('color') !== -1) {
        values = `${colorSpace} ${values.join(' ')}`;
    } else {
        values = `${values.join(', ')}`;
    }
    return `${type}(${values})`;
}
function rgbToHex(color) {
    // Idempotent
    if (color.indexOf('#') === 0) {
        return color;
    }
    const { values } = decomposeColor(color);
    return `#${values.map((n, i)=>intToHex(i === 3 ? Math.round(255 * n) : n)).join('')}`;
}
function hslToRgb(color) {
    color = decomposeColor(color);
    const { values } = color;
    const h = values[0];
    const s = values[1] / 100;
    const l = values[2] / 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n, k = (n + h / 30) % 12)=>l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    let type = 'rgb';
    const rgb = [
        Math.round(f(0) * 255),
        Math.round(f(8) * 255),
        Math.round(f(4) * 255)
    ];
    if (color.type === 'hsla') {
        type += 'a';
        rgb.push(values[3]);
    }
    return recomposeColor({
        type,
        values: rgb
    });
}
function getLuminance(color) {
    color = decomposeColor(color);
    let rgb = color.type === 'hsl' || color.type === 'hsla' ? decomposeColor(hslToRgb(color)).values : color.values;
    rgb = rgb.map((val)=>{
        if (color.type !== 'color') {
            val /= 255; // normalized
        }
        return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
    });
    // Truncate at 3 digits
    return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}
function getContrastRatio(foreground, background) {
    const lumA = getLuminance(foreground);
    const lumB = getLuminance(background);
    return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
function alpha(color, value) {
    color = decomposeColor(color);
    value = clampWrapper(value);
    if (color.type === 'rgb' || color.type === 'hsl') {
        color.type += 'a';
    }
    if (color.type === 'color') {
        color.values[3] = `/${value}`;
    } else {
        color.values[3] = value;
    }
    return recomposeColor(color);
}
function private_safeAlpha(color, value, warning) {
    try {
        return alpha(color, value);
    } catch (error) {
        if (warning && ("TURBOPACK compile-time value", "development") !== 'production') {
            console.warn(warning);
        }
        return color;
    }
}
function darken(color, coefficient) {
    color = decomposeColor(color);
    coefficient = clampWrapper(coefficient);
    if (color.type.indexOf('hsl') !== -1) {
        color.values[2] *= 1 - coefficient;
    } else if (color.type.indexOf('rgb') !== -1 || color.type.indexOf('color') !== -1) {
        for(let i = 0; i < 3; i += 1){
            color.values[i] *= 1 - coefficient;
        }
    }
    return recomposeColor(color);
}
function private_safeDarken(color, coefficient, warning) {
    try {
        return darken(color, coefficient);
    } catch (error) {
        if (warning && ("TURBOPACK compile-time value", "development") !== 'production') {
            console.warn(warning);
        }
        return color;
    }
}
function lighten(color, coefficient) {
    color = decomposeColor(color);
    coefficient = clampWrapper(coefficient);
    if (color.type.indexOf('hsl') !== -1) {
        color.values[2] += (100 - color.values[2]) * coefficient;
    } else if (color.type.indexOf('rgb') !== -1) {
        for(let i = 0; i < 3; i += 1){
            color.values[i] += (255 - color.values[i]) * coefficient;
        }
    } else if (color.type.indexOf('color') !== -1) {
        for(let i = 0; i < 3; i += 1){
            color.values[i] += (1 - color.values[i]) * coefficient;
        }
    }
    return recomposeColor(color);
}
function private_safeLighten(color, coefficient, warning) {
    try {
        return lighten(color, coefficient);
    } catch (error) {
        if (warning && ("TURBOPACK compile-time value", "development") !== 'production') {
            console.warn(warning);
        }
        return color;
    }
}
function emphasize(color, coefficient = 0.15) {
    return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}
function private_safeEmphasize(color, coefficient, warning) {
    try {
        return emphasize(color, coefficient);
    } catch (error) {
        if (warning && ("TURBOPACK compile-time value", "development") !== 'production') {
            console.warn(warning);
        }
        return color;
    }
}
function blend(background, overlay, opacity, gamma = 1.0) {
    const blendChannel = (b, o)=>Math.round((b ** (1 / gamma) * (1 - opacity) + o ** (1 / gamma) * opacity) ** gamma);
    const backgroundColor = decomposeColor(background);
    const overlayColor = decomposeColor(overlay);
    const rgb = [
        blendChannel(backgroundColor.values[0], overlayColor.values[0]),
        blendChannel(backgroundColor.values[1], overlayColor.values[1]),
        blendChannel(backgroundColor.values[2], overlayColor.values[2])
    ];
    return recomposeColor({
        type: 'rgb',
        values: rgb
    });
}
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }
    newObj.default = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
exports._ = _interop_require_wildcard;
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/app-router-context.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['contexts'].AppRouterContext; //# sourceMappingURL=app-router-context.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/hooks-client-context.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['contexts'].HooksClientContext; //# sourceMappingURL=hooks-client-context.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/shared/lib/segment.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DEFAULT_SEGMENT_KEY: null,
    PAGE_SEGMENT_KEY: null,
    addSearchParamsIfPageSegment: null,
    computeSelectedLayoutSegment: null,
    getSegmentValue: null,
    getSelectedLayoutSegmentPath: null,
    isGroupSegment: null,
    isParallelRouteSegment: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DEFAULT_SEGMENT_KEY: function() {
        return DEFAULT_SEGMENT_KEY;
    },
    PAGE_SEGMENT_KEY: function() {
        return PAGE_SEGMENT_KEY;
    },
    addSearchParamsIfPageSegment: function() {
        return addSearchParamsIfPageSegment;
    },
    computeSelectedLayoutSegment: function() {
        return computeSelectedLayoutSegment;
    },
    getSegmentValue: function() {
        return getSegmentValue;
    },
    getSelectedLayoutSegmentPath: function() {
        return getSelectedLayoutSegmentPath;
    },
    isGroupSegment: function() {
        return isGroupSegment;
    },
    isParallelRouteSegment: function() {
        return isParallelRouteSegment;
    }
});
function getSegmentValue(segment) {
    return Array.isArray(segment) ? segment[1] : segment;
}
function isGroupSegment(segment) {
    // Use array[0] for performant purpose
    return segment[0] === '(' && segment.endsWith(')');
}
function isParallelRouteSegment(segment) {
    return segment.startsWith('@') && segment !== '@children';
}
function addSearchParamsIfPageSegment(segment, searchParams) {
    const isPageSegment = segment.includes(PAGE_SEGMENT_KEY);
    if (isPageSegment) {
        const stringifiedQuery = JSON.stringify(searchParams);
        return stringifiedQuery !== '{}' ? PAGE_SEGMENT_KEY + '?' + stringifiedQuery : PAGE_SEGMENT_KEY;
    }
    return segment;
}
function computeSelectedLayoutSegment(segments, parallelRouteKey) {
    if (!segments || segments.length === 0) {
        return null;
    }
    // For 'children', use first segment; for other parallel routes, use last segment
    const rawSegment = parallelRouteKey === 'children' ? segments[0] : segments[segments.length - 1];
    // If the default slot is showing, return null since it's not technically "selected" (it's a fallback)
    // Returning an internal value like `__DEFAULT__` would be confusing
    return rawSegment === DEFAULT_SEGMENT_KEY ? null : rawSegment;
}
function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first = true, segmentPath = []) {
    let node;
    if (first) {
        // Use the provided parallel route key on the first parallel route
        node = tree[1][parallelRouteKey];
    } else {
        // After first parallel route prefer children, if there's no children pick the first parallel route.
        const parallelRoutes = tree[1];
        node = parallelRoutes.children ?? Object.values(parallelRoutes)[0];
    }
    if (!node) return segmentPath;
    const segment = node[0];
    let segmentValue = getSegmentValue(segment);
    if (!segmentValue || segmentValue.startsWith(PAGE_SEGMENT_KEY)) {
        return segmentPath;
    }
    segmentPath.push(segmentValue);
    return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
}
const PAGE_SEGMENT_KEY = '__PAGE__';
const DEFAULT_SEGMENT_KEY = '__DEFAULT__'; //# sourceMappingURL=segment.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/readonly-url-search-params.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * ReadonlyURLSearchParams implementation shared between client and server.
 * This file is intentionally not marked as 'use client' or 'use server'
 * so it can be imported by both environments.
 */ /** @internal */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ReadonlyURLSearchParams", {
    enumerable: true,
    get: function() {
        return ReadonlyURLSearchParams;
    }
});
class ReadonlyURLSearchParamsError extends Error {
    constructor(){
        super('Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams');
    }
}
class ReadonlyURLSearchParams extends URLSearchParams {
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ append() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ delete() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ set() {
        throw new ReadonlyURLSearchParamsError();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ sort() {
        throw new ReadonlyURLSearchParamsError();
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=readonly-url-search-params.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/server-inserted-html.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['contexts'].ServerInsertedHtml; //# sourceMappingURL=server-inserted-html.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/unrecognized-action-error.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    UnrecognizedActionError: null,
    unstable_isUnrecognizedActionError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    UnrecognizedActionError: function() {
        return UnrecognizedActionError;
    },
    unstable_isUnrecognizedActionError: function() {
        return unstable_isUnrecognizedActionError;
    }
});
class UnrecognizedActionError extends Error {
    constructor(...args){
        super(...args);
        this.name = 'UnrecognizedActionError';
    }
}
function unstable_isUnrecognizedActionError(error) {
    return !!(error && typeof error === 'object' && error instanceof UnrecognizedActionError);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unrecognized-action-error.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/redirect-status-code.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RedirectStatusCode", {
    enumerable: true,
    get: function() {
        return RedirectStatusCode;
    }
});
var RedirectStatusCode = /*#__PURE__*/ function(RedirectStatusCode) {
    RedirectStatusCode[RedirectStatusCode["SeeOther"] = 303] = "SeeOther";
    RedirectStatusCode[RedirectStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    RedirectStatusCode[RedirectStatusCode["PermanentRedirect"] = 308] = "PermanentRedirect";
    return RedirectStatusCode;
}({});
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect-status-code.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/redirect-error.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    REDIRECT_ERROR_CODE: null,
    RedirectType: null,
    isRedirectError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    REDIRECT_ERROR_CODE: function() {
        return REDIRECT_ERROR_CODE;
    },
    RedirectType: function() {
        return RedirectType;
    },
    isRedirectError: function() {
        return isRedirectError;
    }
});
const _redirectstatuscode = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/redirect-status-code.js [app-ssr] (ecmascript)");
const REDIRECT_ERROR_CODE = 'NEXT_REDIRECT';
var RedirectType = /*#__PURE__*/ function(RedirectType) {
    RedirectType["push"] = "push";
    RedirectType["replace"] = "replace";
    return RedirectType;
}({});
function isRedirectError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const digest = error.digest.split(';');
    const [errorCode, type] = digest;
    const destination = digest.slice(2, -2).join(';');
    const status = digest.at(-2);
    const statusCode = Number(status);
    return errorCode === REDIRECT_ERROR_CODE && (type === 'replace' || type === 'push') && typeof destination === 'string' && !isNaN(statusCode) && statusCode in _redirectstatuscode.RedirectStatusCode;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect-error.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/redirect.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getRedirectError: null,
    getRedirectStatusCodeFromError: null,
    getRedirectTypeFromError: null,
    getURLFromRedirectError: null,
    permanentRedirect: null,
    redirect: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getRedirectError: function() {
        return getRedirectError;
    },
    getRedirectStatusCodeFromError: function() {
        return getRedirectStatusCodeFromError;
    },
    getRedirectTypeFromError: function() {
        return getRedirectTypeFromError;
    },
    getURLFromRedirectError: function() {
        return getURLFromRedirectError;
    },
    permanentRedirect: function() {
        return permanentRedirect;
    },
    redirect: function() {
        return redirect;
    }
});
const _redirectstatuscode = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/redirect-status-code.js [app-ssr] (ecmascript)");
const _redirecterror = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/redirect-error.js [app-ssr] (ecmascript)");
const actionAsyncStorage = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)").actionAsyncStorage : "TURBOPACK unreachable";
function getRedirectError(url, type, statusCode = _redirectstatuscode.RedirectStatusCode.TemporaryRedirect) {
    const error = Object.defineProperty(new Error(_redirecterror.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = `${_redirecterror.REDIRECT_ERROR_CODE};${type};${url};${statusCode};`;
    return error;
}
function redirect(/** The URL to redirect to */ url, type) {
    type ??= actionAsyncStorage?.getStore()?.isAction ? _redirecterror.RedirectType.push : _redirecterror.RedirectType.replace;
    throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.TemporaryRedirect);
}
function permanentRedirect(/** The URL to redirect to */ url, type = _redirecterror.RedirectType.replace) {
    throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.PermanentRedirect);
}
function getURLFromRedirectError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) return null;
    // Slices off the beginning of the digest that contains the code and the
    // separating ';'.
    return error.digest.split(';').slice(2, -2).join(';');
}
function getRedirectTypeFromError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) {
        throw Object.defineProperty(new Error('Not a redirect error'), "__NEXT_ERROR_CODE", {
            value: "E260",
            enumerable: false,
            configurable: true
        });
    }
    return error.digest.split(';', 2)[1];
}
function getRedirectStatusCodeFromError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) {
        throw Object.defineProperty(new Error('Not a redirect error'), "__NEXT_ERROR_CODE", {
            value: "E260",
            enumerable: false,
            configurable: true
        });
    }
    return Number(error.digest.split(';').at(-2));
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    HTTPAccessErrorStatus: null,
    HTTP_ERROR_FALLBACK_ERROR_CODE: null,
    getAccessFallbackErrorTypeByStatus: null,
    getAccessFallbackHTTPStatus: null,
    isHTTPAccessFallbackError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    HTTPAccessErrorStatus: function() {
        return HTTPAccessErrorStatus;
    },
    HTTP_ERROR_FALLBACK_ERROR_CODE: function() {
        return HTTP_ERROR_FALLBACK_ERROR_CODE;
    },
    getAccessFallbackErrorTypeByStatus: function() {
        return getAccessFallbackErrorTypeByStatus;
    },
    getAccessFallbackHTTPStatus: function() {
        return getAccessFallbackHTTPStatus;
    },
    isHTTPAccessFallbackError: function() {
        return isHTTPAccessFallbackError;
    }
});
const HTTPAccessErrorStatus = {
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401
};
const ALLOWED_CODES = new Set(Object.values(HTTPAccessErrorStatus));
const HTTP_ERROR_FALLBACK_ERROR_CODE = 'NEXT_HTTP_ERROR_FALLBACK';
function isHTTPAccessFallbackError(error) {
    if (typeof error !== 'object' || error === null || !('digest' in error) || typeof error.digest !== 'string') {
        return false;
    }
    const [prefix, httpStatus] = error.digest.split(';');
    return prefix === HTTP_ERROR_FALLBACK_ERROR_CODE && ALLOWED_CODES.has(Number(httpStatus));
}
function getAccessFallbackHTTPStatus(error) {
    const httpStatus = error.digest.split(';')[1];
    return Number(httpStatus);
}
function getAccessFallbackErrorTypeByStatus(status) {
    switch(status){
        case 401:
            return 'unauthorized';
        case 403:
            return 'forbidden';
        case 404:
            return 'not-found';
        default:
            return;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=http-access-fallback.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/not-found.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "notFound", {
    enumerable: true,
    get: function() {
        return notFound;
    }
});
const _httpaccessfallback = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-ssr] (ecmascript)");
/**
 * This function allows you to render the [not-found.js file](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
 * within a route segment as well as inject a tag.
 *
 * `notFound()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 * - In a Server Component, this will insert a `<meta name="robots" content="noindex" />` meta tag and set the status code to 404.
 * - In a Route Handler or Server Action, it will serve a 404 to the caller.
 *
 * Read more: [Next.js Docs: `notFound`](https://nextjs.org/docs/app/api-reference/functions/not-found)
 */ const DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};404`;
function notFound() {
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=not-found.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/forbidden.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "forbidden", {
    enumerable: true,
    get: function() {
        return forbidden;
    }
});
const _httpaccessfallback = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-ssr] (ecmascript)");
// TODO: Add `forbidden` docs
/**
 * @experimental
 * This function allows you to render the [forbidden.js file](https://nextjs.org/docs/app/api-reference/file-conventions/forbidden)
 * within a route segment as well as inject a tag.
 *
 * `forbidden()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 * Read more: [Next.js Docs: `forbidden`](https://nextjs.org/docs/app/api-reference/functions/forbidden)
 */ const DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};403`;
function forbidden() {
    if ("TURBOPACK compile-time truthy", 1) {
        throw Object.defineProperty(new Error(`\`forbidden()\` is experimental and only allowed to be enabled when \`experimental.authInterrupts\` is enabled.`), "__NEXT_ERROR_CODE", {
            value: "E488",
            enumerable: false,
            configurable: true
        });
    }
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=forbidden.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/unauthorized.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "unauthorized", {
    enumerable: true,
    get: function() {
        return unauthorized;
    }
});
const _httpaccessfallback = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-ssr] (ecmascript)");
// TODO: Add `unauthorized` docs
/**
 * @experimental
 * This function allows you to render the [unauthorized.js file](https://nextjs.org/docs/app/api-reference/file-conventions/unauthorized)
 * within a route segment as well as inject a tag.
 *
 * `unauthorized()` can be used in
 * [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
 * [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
 * [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
 *
 *
 * Read more: [Next.js Docs: `unauthorized`](https://nextjs.org/docs/app/api-reference/functions/unauthorized)
 */ const DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};401`;
function unauthorized() {
    if ("TURBOPACK compile-time truthy", 1) {
        throw Object.defineProperty(new Error(`\`unauthorized()\` is experimental and only allowed to be used when \`experimental.authInterrupts\` is enabled.`), "__NEXT_ERROR_CODE", {
            value: "E411",
            enumerable: false,
            configurable: true
        });
    }
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = DIGEST;
    throw error;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unauthorized.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/dynamic-rendering-utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    isHangingPromiseRejectionError: null,
    makeDevtoolsIOAwarePromise: null,
    makeHangingPromise: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isHangingPromiseRejectionError: function() {
        return isHangingPromiseRejectionError;
    },
    makeDevtoolsIOAwarePromise: function() {
        return makeDevtoolsIOAwarePromise;
    },
    makeHangingPromise: function() {
        return makeHangingPromise;
    }
});
function isHangingPromiseRejectionError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === HANGING_PROMISE_REJECTION;
}
const HANGING_PROMISE_REJECTION = 'HANGING_PROMISE_REJECTION';
class HangingPromiseRejectionError extends Error {
    constructor(route, expression){
        super(`During prerendering, ${expression} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${expression} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${route}".`), this.route = route, this.expression = expression, this.digest = HANGING_PROMISE_REJECTION;
    }
}
const abortListenersBySignal = new WeakMap();
function makeHangingPromise(signal, route, expression) {
    if (signal.aborted) {
        return Promise.reject(new HangingPromiseRejectionError(route, expression));
    } else {
        const hangingPromise = new Promise((_, reject)=>{
            const boundRejection = reject.bind(null, new HangingPromiseRejectionError(route, expression));
            let currentListeners = abortListenersBySignal.get(signal);
            if (currentListeners) {
                currentListeners.push(boundRejection);
            } else {
                const listeners = [
                    boundRejection
                ];
                abortListenersBySignal.set(signal, listeners);
                signal.addEventListener('abort', ()=>{
                    for(let i = 0; i < listeners.length; i++){
                        listeners[i]();
                    }
                }, {
                    once: true
                });
            }
        });
        // We are fine if no one actually awaits this promise. We shouldn't consider this an unhandled rejection so
        // we attach a noop catch handler here to suppress this warning. If you actually await somewhere or construct
        // your own promise out of it you'll need to ensure you handle the error when it rejects.
        hangingPromise.catch(ignoreReject);
        return hangingPromise;
    }
}
function ignoreReject() {}
function makeDevtoolsIOAwarePromise(underlying, requestStore, stage) {
    if (requestStore.stagedRendering) {
        // We resolve each stage in a timeout, so React DevTools will pick this up as IO.
        return requestStore.stagedRendering.delayUntilStage(stage, undefined, underlying);
    }
    // in React DevTools if we resolve in a setTimeout we will observe
    // the promise resolution as something that can suspend a boundary or root.
    return new Promise((resolve)=>{
        // Must use setTimeout to be considered IO React DevTools. setImmediate will not work.
        setTimeout(()=>{
            resolve(underlying);
        }, 0);
    });
} //# sourceMappingURL=dynamic-rendering-utils.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/lib/router-utils/is-postpone.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isPostpone", {
    enumerable: true,
    get: function() {
        return isPostpone;
    }
});
const REACT_POSTPONE_TYPE = Symbol.for('react.postpone');
function isPostpone(error) {
    return typeof error === 'object' && error !== null && error.$$typeof === REACT_POSTPONE_TYPE;
} //# sourceMappingURL=is-postpone.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This has to be a shared module which is shared between client component error boundary and dynamic component
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    BailoutToCSRError: null,
    isBailoutToCSRError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BailoutToCSRError: function() {
        return BailoutToCSRError;
    },
    isBailoutToCSRError: function() {
        return isBailoutToCSRError;
    }
});
const BAILOUT_TO_CSR = 'BAILOUT_TO_CLIENT_SIDE_RENDERING';
class BailoutToCSRError extends Error {
    constructor(reason){
        super(`Bail out to client-side rendering: ${reason}`), this.reason = reason, this.digest = BAILOUT_TO_CSR;
    }
}
function isBailoutToCSRError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === BAILOUT_TO_CSR;
} //# sourceMappingURL=bailout-to-csr.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/is-next-router-error.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isNextRouterError", {
    enumerable: true,
    get: function() {
        return isNextRouterError;
    }
});
const _httpaccessfallback = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-ssr] (ecmascript)");
const _redirecterror = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/redirect-error.js [app-ssr] (ecmascript)");
function isNextRouterError(error) {
    return (0, _redirecterror.isRedirectError)(error) || (0, _httpaccessfallback.isHTTPAccessFallbackError)(error);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=is-next-router-error.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/hooks-server-context.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DynamicServerError: null,
    isDynamicServerError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DynamicServerError: function() {
        return DynamicServerError;
    },
    isDynamicServerError: function() {
        return isDynamicServerError;
    }
});
const DYNAMIC_ERROR_CODE = 'DYNAMIC_SERVER_USAGE';
class DynamicServerError extends Error {
    constructor(description){
        super(`Dynamic server usage: ${description}`), this.description = description, this.digest = DYNAMIC_ERROR_CODE;
    }
}
function isDynamicServerError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err) || typeof err.digest !== 'string') {
        return false;
    }
    return err.digest === DYNAMIC_ERROR_CODE;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=hooks-server-context.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/static-generation-bailout.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    StaticGenBailoutError: null,
    isStaticGenBailoutError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    StaticGenBailoutError: function() {
        return StaticGenBailoutError;
    },
    isStaticGenBailoutError: function() {
        return isStaticGenBailoutError;
    }
});
const NEXT_STATIC_GEN_BAILOUT = 'NEXT_STATIC_GEN_BAILOUT';
class StaticGenBailoutError extends Error {
    constructor(...args){
        super(...args), this.code = NEXT_STATIC_GEN_BAILOUT;
    }
}
function isStaticGenBailoutError(error) {
    if (typeof error !== 'object' || error === null || !('code' in error)) {
        return false;
    }
    return error.code === NEXT_STATIC_GEN_BAILOUT;
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=static-generation-bailout.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/lib/framework/boundary-constants.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    METADATA_BOUNDARY_NAME: null,
    OUTLET_BOUNDARY_NAME: null,
    ROOT_LAYOUT_BOUNDARY_NAME: null,
    VIEWPORT_BOUNDARY_NAME: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    METADATA_BOUNDARY_NAME: function() {
        return METADATA_BOUNDARY_NAME;
    },
    OUTLET_BOUNDARY_NAME: function() {
        return OUTLET_BOUNDARY_NAME;
    },
    ROOT_LAYOUT_BOUNDARY_NAME: function() {
        return ROOT_LAYOUT_BOUNDARY_NAME;
    },
    VIEWPORT_BOUNDARY_NAME: function() {
        return VIEWPORT_BOUNDARY_NAME;
    }
});
const METADATA_BOUNDARY_NAME = '__next_metadata_boundary__';
const VIEWPORT_BOUNDARY_NAME = '__next_viewport_boundary__';
const OUTLET_BOUNDARY_NAME = '__next_outlet_boundary__';
const ROOT_LAYOUT_BOUNDARY_NAME = '__next_root_layout_boundary__'; //# sourceMappingURL=boundary-constants.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/lib/scheduler.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    atLeastOneTask: null,
    scheduleImmediate: null,
    scheduleOnNextTick: null,
    waitAtLeastOneReactRenderTask: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    atLeastOneTask: function() {
        return atLeastOneTask;
    },
    scheduleImmediate: function() {
        return scheduleImmediate;
    },
    scheduleOnNextTick: function() {
        return scheduleOnNextTick;
    },
    waitAtLeastOneReactRenderTask: function() {
        return waitAtLeastOneReactRenderTask;
    }
});
const scheduleOnNextTick = (cb)=>{
    // We use Promise.resolve().then() here so that the operation is scheduled at
    // the end of the promise job queue, we then add it to the next process tick
    // to ensure it's evaluated afterwards.
    //
    // This was inspired by the implementation of the DataLoader interface: https://github.com/graphql/dataloader/blob/d336bd15282664e0be4b4a657cb796f09bafbc6b/src/index.js#L213-L255
    //
    Promise.resolve().then(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else {
            process.nextTick(cb);
        }
    });
};
const scheduleImmediate = (cb)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        setImmediate(cb);
    }
};
function atLeastOneTask() {
    return new Promise((resolve)=>scheduleImmediate(resolve));
}
function waitAtLeastOneReactRenderTask() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return new Promise((r)=>setImmediate(r));
    }
} //# sourceMappingURL=scheduler.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/shared/lib/invariant-error.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InvariantError", {
    enumerable: true,
    get: function() {
        return InvariantError;
    }
});
class InvariantError extends Error {
    constructor(message, options){
        super(`Invariant: ${message.endsWith('.') ? message : message + '.'} This is a bug in Next.js.`, options);
        this.name = 'InvariantError';
    }
} //# sourceMappingURL=invariant-error.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/shared/lib/promise-with-resolvers.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createPromiseWithResolvers", {
    enumerable: true,
    get: function() {
        return createPromiseWithResolvers;
    }
});
function createPromiseWithResolvers() {
    // Shim of Stage 4 Promise.withResolvers proposal
    let resolve;
    let reject;
    const promise = new Promise((res, rej)=>{
        resolve = res;
        reject = rej;
    });
    return {
        resolve: resolve,
        reject: reject,
        promise
    };
} //# sourceMappingURL=promise-with-resolvers.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/app-render/staged-rendering.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    RenderStage: null,
    StagedRenderingController: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    RenderStage: function() {
        return RenderStage;
    },
    StagedRenderingController: function() {
        return StagedRenderingController;
    }
});
const _invarianterror = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/shared/lib/invariant-error.js [app-ssr] (ecmascript)");
const _promisewithresolvers = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/shared/lib/promise-with-resolvers.js [app-ssr] (ecmascript)");
var RenderStage = /*#__PURE__*/ function(RenderStage) {
    RenderStage[RenderStage["Static"] = 1] = "Static";
    RenderStage[RenderStage["Runtime"] = 2] = "Runtime";
    RenderStage[RenderStage["Dynamic"] = 3] = "Dynamic";
    return RenderStage;
}({});
class StagedRenderingController {
    constructor(abortSignal = null){
        this.abortSignal = abortSignal;
        this.currentStage = 1;
        this.runtimeStagePromise = (0, _promisewithresolvers.createPromiseWithResolvers)();
        this.dynamicStagePromise = (0, _promisewithresolvers.createPromiseWithResolvers)();
        if (abortSignal) {
            abortSignal.addEventListener('abort', ()=>{
                const { reason } = abortSignal;
                if (this.currentStage < 2) {
                    this.runtimeStagePromise.promise.catch(ignoreReject) // avoid unhandled rejections
                    ;
                    this.runtimeStagePromise.reject(reason);
                }
                if (this.currentStage < 3) {
                    this.dynamicStagePromise.promise.catch(ignoreReject) // avoid unhandled rejections
                    ;
                    this.dynamicStagePromise.reject(reason);
                }
            }, {
                once: true
            });
        }
    }
    advanceStage(stage) {
        // If we're already at the target stage or beyond, do nothing.
        // (this can happen e.g. if sync IO advanced us to the dynamic stage)
        if (this.currentStage >= stage) {
            return;
        }
        this.currentStage = stage;
        // Note that we might be going directly from Static to Dynamic,
        // so we need to resolve the runtime stage as well.
        if (stage >= 2) {
            this.runtimeStagePromise.resolve();
        }
        if (stage >= 3) {
            this.dynamicStagePromise.resolve();
        }
    }
    getStagePromise(stage) {
        switch(stage){
            case 2:
                {
                    return this.runtimeStagePromise.promise;
                }
            case 3:
                {
                    return this.dynamicStagePromise.promise;
                }
            default:
                {
                    stage;
                    throw Object.defineProperty(new _invarianterror.InvariantError(`Invalid render stage: ${stage}`), "__NEXT_ERROR_CODE", {
                        value: "E881",
                        enumerable: false,
                        configurable: true
                    });
                }
        }
    }
    waitForStage(stage) {
        return this.getStagePromise(stage);
    }
    delayUntilStage(stage, displayName, resolvedValue) {
        const ioTriggerPromise = this.getStagePromise(stage);
        const promise = makeDevtoolsIOPromiseFromIOTrigger(ioTriggerPromise, displayName, resolvedValue);
        // Analogously to `makeHangingPromise`, we might reject this promise if the signal is invoked.
        // (e.g. in the case where we don't want want the render to proceed to the dynamic stage and abort it).
        // We shouldn't consider this an unhandled rejection, so we attach a noop catch handler here to suppress this warning.
        if (this.abortSignal) {
            promise.catch(ignoreReject);
        }
        return promise;
    }
}
function ignoreReject() {}
// TODO(restart-on-cache-miss): the layering of `delayUntilStage`,
// `makeDevtoolsIOPromiseFromIOTrigger` and and `makeDevtoolsIOAwarePromise`
// is confusing, we should clean it up.
function makeDevtoolsIOPromiseFromIOTrigger(ioTrigger, displayName, resolvedValue) {
    // If we create a `new Promise` and give it a displayName
    // (with no userspace code above us in the stack)
    // React Devtools will use it as the IO cause when determining "suspended by".
    // In particular, it should shadow any inner IO that resolved/rejected the promise
    // (in case of staged rendering, this will be the `setTimeout` that triggers the relevant stage)
    const promise = new Promise((resolve, reject)=>{
        ioTrigger.then(resolve.bind(null, resolvedValue), reject);
    });
    if (displayName !== undefined) {
        // @ts-expect-error
        promise.displayName = displayName;
    }
    return promise;
} //# sourceMappingURL=staged-rendering.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * The functions provided by this module are used to communicate certain properties
 * about the currently running code so that Next.js can make decisions on how to handle
 * the current execution in different rendering modes such as pre-rendering, resuming, and SSR.
 *
 * Today Next.js treats all code as potentially static. Certain APIs may only make sense when dynamically rendering.
 * Traditionally this meant deopting the entire render to dynamic however with PPR we can now deopt parts
 * of a React tree as dynamic while still keeping other parts static. There are really two different kinds of
 * Dynamic indications.
 *
 * The first is simply an intention to be dynamic. unstable_noStore is an example of this where
 * the currently executing code simply declares that the current scope is dynamic but if you use it
 * inside unstable_cache it can still be cached. This type of indication can be removed if we ever
 * make the default dynamic to begin with because the only way you would ever be static is inside
 * a cache scope which this indication does not affect.
 *
 * The second is an indication that a dynamic data source was read. This is a stronger form of dynamic
 * because it means that it is inappropriate to cache this at all. using a dynamic data source inside
 * unstable_cache should error. If you want to use some dynamic data inside unstable_cache you should
 * read that data outside the cache and pass it in as an argument to the cached function.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    Postpone: null,
    PreludeState: null,
    abortAndThrowOnSynchronousRequestDataAccess: null,
    abortOnSynchronousPlatformIOAccess: null,
    accessedDynamicData: null,
    annotateDynamicAccess: null,
    consumeDynamicAccess: null,
    createDynamicTrackingState: null,
    createDynamicValidationState: null,
    createHangingInputAbortSignal: null,
    createRenderInBrowserAbortSignal: null,
    delayUntilRuntimeStage: null,
    formatDynamicAPIAccesses: null,
    getFirstDynamicReason: null,
    isDynamicPostpone: null,
    isPrerenderInterruptedError: null,
    logDisallowedDynamicError: null,
    markCurrentScopeAsDynamic: null,
    postponeWithTracking: null,
    throwIfDisallowedDynamic: null,
    throwToInterruptStaticGeneration: null,
    trackAllowedDynamicAccess: null,
    trackDynamicDataInDynamicRender: null,
    trackSynchronousPlatformIOAccessInDev: null,
    useDynamicRouteParams: null,
    useDynamicSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Postpone: function() {
        return Postpone;
    },
    PreludeState: function() {
        return PreludeState;
    },
    abortAndThrowOnSynchronousRequestDataAccess: function() {
        return abortAndThrowOnSynchronousRequestDataAccess;
    },
    abortOnSynchronousPlatformIOAccess: function() {
        return abortOnSynchronousPlatformIOAccess;
    },
    accessedDynamicData: function() {
        return accessedDynamicData;
    },
    annotateDynamicAccess: function() {
        return annotateDynamicAccess;
    },
    consumeDynamicAccess: function() {
        return consumeDynamicAccess;
    },
    createDynamicTrackingState: function() {
        return createDynamicTrackingState;
    },
    createDynamicValidationState: function() {
        return createDynamicValidationState;
    },
    createHangingInputAbortSignal: function() {
        return createHangingInputAbortSignal;
    },
    createRenderInBrowserAbortSignal: function() {
        return createRenderInBrowserAbortSignal;
    },
    delayUntilRuntimeStage: function() {
        return delayUntilRuntimeStage;
    },
    formatDynamicAPIAccesses: function() {
        return formatDynamicAPIAccesses;
    },
    getFirstDynamicReason: function() {
        return getFirstDynamicReason;
    },
    isDynamicPostpone: function() {
        return isDynamicPostpone;
    },
    isPrerenderInterruptedError: function() {
        return isPrerenderInterruptedError;
    },
    logDisallowedDynamicError: function() {
        return logDisallowedDynamicError;
    },
    markCurrentScopeAsDynamic: function() {
        return markCurrentScopeAsDynamic;
    },
    postponeWithTracking: function() {
        return postponeWithTracking;
    },
    throwIfDisallowedDynamic: function() {
        return throwIfDisallowedDynamic;
    },
    throwToInterruptStaticGeneration: function() {
        return throwToInterruptStaticGeneration;
    },
    trackAllowedDynamicAccess: function() {
        return trackAllowedDynamicAccess;
    },
    trackDynamicDataInDynamicRender: function() {
        return trackDynamicDataInDynamicRender;
    },
    trackSynchronousPlatformIOAccessInDev: function() {
        return trackSynchronousPlatformIOAccessInDev;
    },
    useDynamicRouteParams: function() {
        return useDynamicRouteParams;
    },
    useDynamicSearchParams: function() {
        return useDynamicSearchParams;
    }
});
const _react = /*#__PURE__*/ _interop_require_default(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)"));
const _hooksservercontext = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/hooks-server-context.js [app-ssr] (ecmascript)");
const _staticgenerationbailout = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/static-generation-bailout.js [app-ssr] (ecmascript)");
const _workunitasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _dynamicrenderingutils = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/dynamic-rendering-utils.js [app-ssr] (ecmascript)");
const _boundaryconstants = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/lib/framework/boundary-constants.js [app-ssr] (ecmascript)");
const _scheduler = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/lib/scheduler.js [app-ssr] (ecmascript)");
const _bailouttocsr = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-ssr] (ecmascript)");
const _invarianterror = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/shared/lib/invariant-error.js [app-ssr] (ecmascript)");
const _stagedrendering = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/app-render/staged-rendering.js [app-ssr] (ecmascript)");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const hasPostpone = typeof _react.default.unstable_postpone === 'function';
function createDynamicTrackingState(isDebugDynamicAccesses) {
    return {
        isDebugDynamicAccesses,
        dynamicAccesses: [],
        syncDynamicErrorWithStack: null
    };
}
function createDynamicValidationState() {
    return {
        hasSuspenseAboveBody: false,
        hasDynamicMetadata: false,
        hasDynamicViewport: false,
        hasAllowedDynamic: false,
        dynamicErrors: []
    };
}
function getFirstDynamicReason(trackingState) {
    var _trackingState_dynamicAccesses_;
    return (_trackingState_dynamicAccesses_ = trackingState.dynamicAccesses[0]) == null ? void 0 : _trackingState_dynamicAccesses_.expression;
}
function markCurrentScopeAsDynamic(store, workUnitStore, expression) {
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'cache':
            case 'unstable-cache':
                // Inside cache scopes, marking a scope as dynamic has no effect,
                // because the outer cache scope creates a cache boundary. This is
                // subtly different from reading a dynamic data source, which is
                // forbidden inside a cache scope.
                return;
            case 'private-cache':
                // A private cache scope is already dynamic by definition.
                return;
            case 'prerender-legacy':
            case 'prerender-ppr':
            case 'request':
                break;
            default:
                workUnitStore;
        }
    }
    // If we're forcing dynamic rendering or we're forcing static rendering, we
    // don't need to do anything here because the entire page is already dynamic
    // or it's static and it should not throw or postpone here.
    if (store.forceDynamic || store.forceStatic) return;
    if (store.dynamicShouldError) {
        throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E553",
            enumerable: false,
            configurable: true
        });
    }
    if (workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender-ppr':
                return postponeWithTracking(store.route, expression, workUnitStore.dynamicTracking);
            case 'prerender-legacy':
                workUnitStore.revalidate = 0;
                // We aren't prerendering, but we are generating a static page. We need
                // to bail out of static generation.
                const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
                    value: "E550",
                    enumerable: false,
                    configurable: true
                });
                store.dynamicUsageDescription = expression;
                store.dynamicUsageStack = err.stack;
                throw err;
            case 'request':
                if ("TURBOPACK compile-time truthy", 1) {
                    workUnitStore.usedDynamic = true;
                }
                break;
            default:
                workUnitStore;
        }
    }
}
function throwToInterruptStaticGeneration(expression, store, prerenderStore) {
    // We aren't prerendering but we are generating a static page. We need to bail out of static generation
    const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
        value: "E558",
        enumerable: false,
        configurable: true
    });
    prerenderStore.revalidate = 0;
    store.dynamicUsageDescription = expression;
    store.dynamicUsageStack = err.stack;
    throw err;
}
function trackDynamicDataInDynamicRender(workUnitStore) {
    switch(workUnitStore.type){
        case 'cache':
        case 'unstable-cache':
            // Inside cache scopes, marking a scope as dynamic has no effect,
            // because the outer cache scope creates a cache boundary. This is
            // subtly different from reading a dynamic data source, which is
            // forbidden inside a cache scope.
            return;
        case 'private-cache':
            // A private cache scope is already dynamic by definition.
            return;
        case 'prerender':
        case 'prerender-runtime':
        case 'prerender-legacy':
        case 'prerender-ppr':
        case 'prerender-client':
            break;
        case 'request':
            if ("TURBOPACK compile-time truthy", 1) {
                workUnitStore.usedDynamic = true;
            }
            break;
        default:
            workUnitStore;
    }
}
function abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore) {
    const reason = `Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`;
    const error = createPrerenderInterruptedError(reason);
    prerenderStore.controller.abort(error);
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            // When we aren't debugging, we don't need to create another error for the
            // stack trace.
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
}
function abortOnSynchronousPlatformIOAccess(route, expression, errorWithStack, prerenderStore) {
    const dynamicTracking = prerenderStore.dynamicTracking;
    abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
    // It is important that we set this tracking value after aborting. Aborts are executed
    // synchronously except for the case where you abort during render itself. By setting this
    // value late we can use it to determine if any of the aborted tasks are the task that
    // called the sync IO expression in the first place.
    if (dynamicTracking) {
        if (dynamicTracking.syncDynamicErrorWithStack === null) {
            dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
        }
    }
}
function trackSynchronousPlatformIOAccessInDev(requestStore) {
    // We don't actually have a controller to abort but we do the semantic equivalent by
    // advancing the request store out of the prerender stage
    if (requestStore.stagedRendering) {
        // TODO: error for sync IO in the runtime stage
        // (which is not currently covered by the validation render in `spawnDynamicValidationInDev`)
        requestStore.stagedRendering.advanceStage(_stagedrendering.RenderStage.Dynamic);
    }
}
function abortAndThrowOnSynchronousRequestDataAccess(route, expression, errorWithStack, prerenderStore) {
    const prerenderSignal = prerenderStore.controller.signal;
    if (prerenderSignal.aborted === false) {
        // TODO it would be better to move this aborted check into the callsite so we can avoid making
        // the error object when it isn't relevant to the aborting of the prerender however
        // since we need the throw semantics regardless of whether we abort it is easier to land
        // this way. See how this was handled with `abortOnSynchronousPlatformIOAccess` for a closer
        // to ideal implementation
        abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
        // It is important that we set this tracking value after aborting. Aborts are executed
        // synchronously except for the case where you abort during render itself. By setting this
        // value late we can use it to determine if any of the aborted tasks are the task that
        // called the sync IO expression in the first place.
        const dynamicTracking = prerenderStore.dynamicTracking;
        if (dynamicTracking) {
            if (dynamicTracking.syncDynamicErrorWithStack === null) {
                dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
            }
        }
    }
    throw createPrerenderInterruptedError(`Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`);
}
function Postpone({ reason, route }) {
    const prerenderStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    const dynamicTracking = prerenderStore && prerenderStore.type === 'prerender-ppr' ? prerenderStore.dynamicTracking : null;
    postponeWithTracking(route, reason, dynamicTracking);
}
function postponeWithTracking(route, expression, dynamicTracking) {
    assertPostpone();
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            // When we aren't debugging, we don't need to create another error for the
            // stack trace.
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
    _react.default.unstable_postpone(createPostponeReason(route, expression));
}
function createPostponeReason(route, expression) {
    return `Route ${route} needs to bail out of prerendering at this point because it used ${expression}. ` + `React throws this special object to indicate where. It should not be caught by ` + `your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
}
function isDynamicPostpone(err) {
    if (typeof err === 'object' && err !== null && typeof err.message === 'string') {
        return isDynamicPostponeReason(err.message);
    }
    return false;
}
function isDynamicPostponeReason(reason) {
    return reason.includes('needs to bail out of prerendering at this point because it used') && reason.includes('Learn more: https://nextjs.org/docs/messages/ppr-caught-error');
}
if (isDynamicPostponeReason(createPostponeReason('%%%', '^^^')) === false) {
    throw Object.defineProperty(new Error('Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js'), "__NEXT_ERROR_CODE", {
        value: "E296",
        enumerable: false,
        configurable: true
    });
}
const NEXT_PRERENDER_INTERRUPTED = 'NEXT_PRERENDER_INTERRUPTED';
function createPrerenderInterruptedError(message) {
    const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.digest = NEXT_PRERENDER_INTERRUPTED;
    return error;
}
function isPrerenderInterruptedError(error) {
    return typeof error === 'object' && error !== null && error.digest === NEXT_PRERENDER_INTERRUPTED && 'name' in error && 'message' in error && error instanceof Error;
}
function accessedDynamicData(dynamicAccesses) {
    return dynamicAccesses.length > 0;
}
function consumeDynamicAccess(serverDynamic, clientDynamic) {
    // We mutate because we only call this once we are no longer writing
    // to the dynamicTrackingState and it's more efficient than creating a new
    // array.
    serverDynamic.dynamicAccesses.push(...clientDynamic.dynamicAccesses);
    return serverDynamic.dynamicAccesses;
}
function formatDynamicAPIAccesses(dynamicAccesses) {
    return dynamicAccesses.filter((access)=>typeof access.stack === 'string' && access.stack.length > 0).map(({ expression, stack })=>{
        stack = stack.split('\n') // Remove the "Error: " prefix from the first line of the stack trace as
        // well as the first 4 lines of the stack trace which is the distance
        // from the user code and the `new Error().stack` call.
        .slice(4).filter((line)=>{
            // Exclude Next.js internals from the stack trace.
            if (line.includes('node_modules/next/')) {
                return false;
            }
            // Exclude anonymous functions from the stack trace.
            if (line.includes(' (<anonymous>)')) {
                return false;
            }
            // Exclude Node.js internals from the stack trace.
            if (line.includes(' (node:')) {
                return false;
            }
            return true;
        }).join('\n');
        return `Dynamic API Usage Debug - ${expression}:\n${stack}`;
    });
}
function assertPostpone() {
    if (!hasPostpone) {
        throw Object.defineProperty(new Error(`Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js`), "__NEXT_ERROR_CODE", {
            value: "E224",
            enumerable: false,
            configurable: true
        });
    }
}
function createRenderInBrowserAbortSignal() {
    const controller = new AbortController();
    controller.abort(Object.defineProperty(new _bailouttocsr.BailoutToCSRError('Render in Browser'), "__NEXT_ERROR_CODE", {
        value: "E721",
        enumerable: false,
        configurable: true
    }));
    return controller.signal;
}
function createHangingInputAbortSignal(workUnitStore) {
    switch(workUnitStore.type){
        case 'prerender':
        case 'prerender-runtime':
            const controller = new AbortController();
            if (workUnitStore.cacheSignal) {
                // If we have a cacheSignal it means we're in a prospective render. If
                // the input we're waiting on is coming from another cache, we do want
                // to wait for it so that we can resolve this cache entry too.
                workUnitStore.cacheSignal.inputReady().then(()=>{
                    controller.abort();
                });
            } else {
                // Otherwise we're in the final render and we should already have all
                // our caches filled.
                // If the prerender uses stages, we have wait until the runtime stage,
                // at which point all runtime inputs will be resolved.
                // (otherwise, a runtime prerender might consider `cookies()` hanging
                //  even though they'd resolve in the next task.)
                //
                // We might still be waiting on some microtasks so we
                // wait one tick before giving up. When we give up, we still want to
                // render the content of this cache as deeply as we can so that we can
                // suspend as deeply as possible in the tree or not at all if we don't
                // end up waiting for the input.
                const runtimeStagePromise = (0, _workunitasyncstorageexternal.getRuntimeStagePromise)(workUnitStore);
                if (runtimeStagePromise) {
                    runtimeStagePromise.then(()=>(0, _scheduler.scheduleOnNextTick)(()=>controller.abort()));
                } else {
                    (0, _scheduler.scheduleOnNextTick)(()=>controller.abort());
                }
            }
            return controller.signal;
        case 'prerender-client':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'request':
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
            return undefined;
        default:
            workUnitStore;
    }
}
function annotateDynamicAccess(expression, prerenderStore) {
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
        dynamicTracking.dynamicAccesses.push({
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
            expression
        });
    }
}
function useDynamicRouteParams(expression) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workStore && workUnitStore) {
        switch(workUnitStore.type){
            case 'prerender-client':
            case 'prerender':
                {
                    const fallbackParams = workUnitStore.fallbackRouteParams;
                    if (fallbackParams && fallbackParams.size > 0) {
                        // We are in a prerender with cacheComponents semantics. We are going to
                        // hang here and never resolve. This will cause the currently
                        // rendering component to effectively be a dynamic hole.
                        _react.default.use((0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, expression));
                    }
                    break;
                }
            case 'prerender-ppr':
                {
                    const fallbackParams = workUnitStore.fallbackRouteParams;
                    if (fallbackParams && fallbackParams.size > 0) {
                        return postponeWithTracking(workStore.route, expression, workUnitStore.dynamicTracking);
                    }
                    break;
                }
            case 'prerender-runtime':
                throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called during a runtime prerender. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E771",
                    enumerable: false,
                    configurable: true
                });
            case 'cache':
            case 'private-cache':
                throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called inside a cache scope. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E745",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-legacy':
            case 'request':
            case 'unstable-cache':
                break;
            default:
                workUnitStore;
        }
    }
}
function useDynamicSearchParams(expression) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (!workStore) {
        // We assume pages router context and just return
        return;
    }
    if (!workUnitStore) {
        (0, _workunitasyncstorageexternal.throwForMissingRequestStore)(expression);
    }
    switch(workUnitStore.type){
        case 'prerender-client':
            {
                _react.default.use((0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, expression));
                break;
            }
        case 'prerender-legacy':
        case 'prerender-ppr':
            {
                if (workStore.forceStatic) {
                    return;
                }
                throw Object.defineProperty(new _bailouttocsr.BailoutToCSRError(expression), "__NEXT_ERROR_CODE", {
                    value: "E394",
                    enumerable: false,
                    configurable: true
                });
            }
        case 'prerender':
        case 'prerender-runtime':
            throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called from a Server Component. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                value: "E795",
                enumerable: false,
                configurable: true
            });
        case 'cache':
        case 'unstable-cache':
        case 'private-cache':
            throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called inside a cache scope. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                value: "E745",
                enumerable: false,
                configurable: true
            });
        case 'request':
            return;
        default:
            workUnitStore;
    }
}
const hasSuspenseRegex = /\n\s+at Suspense \(<anonymous>\)/;
// Common implicit body tags that React will treat as body when placed directly in html
const bodyAndImplicitTags = 'body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6';
// Detects when RootLayoutBoundary (our framework marker component) appears
// after Suspense in the component stack, indicating the root layout is wrapped
// within a Suspense boundary. Ensures no body/html/implicit-body components are in between.
//
// Example matches:
//   at Suspense (<anonymous>)
//   at __next_root_layout_boundary__ (<anonymous>)
//
// Or with other components in between (but not body/html/implicit-body):
//   at Suspense (<anonymous>)
//   at SomeComponent (<anonymous>)
//   at __next_root_layout_boundary__ (<anonymous>)
const hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex = new RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:${bodyAndImplicitTags}) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at ${_boundaryconstants.ROOT_LAYOUT_BOUNDARY_NAME} \\([^\\n]*\\)`);
const hasMetadataRegex = new RegExp(`\\n\\s+at ${_boundaryconstants.METADATA_BOUNDARY_NAME}[\\n\\s]`);
const hasViewportRegex = new RegExp(`\\n\\s+at ${_boundaryconstants.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`);
const hasOutletRegex = new RegExp(`\\n\\s+at ${_boundaryconstants.OUTLET_BOUNDARY_NAME}[\\n\\s]`);
function trackAllowedDynamicAccess(workStore, componentStack, dynamicValidation, clientDynamic) {
    if (hasOutletRegex.test(componentStack)) {
        // We don't need to track that this is dynamic. It is only so when something else is also dynamic.
        return;
    } else if (hasMetadataRegex.test(componentStack)) {
        dynamicValidation.hasDynamicMetadata = true;
        return;
    } else if (hasViewportRegex.test(componentStack)) {
        dynamicValidation.hasDynamicViewport = true;
        return;
    } else if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
        // For Suspense within body, the prelude wouldn't be empty so it wouldn't violate the empty static shells rule.
        // But if you have Suspense above body, the prelude is empty but we allow that because having Suspense
        // is an explicit signal from the user that they acknowledge the empty shell and want dynamic rendering.
        dynamicValidation.hasAllowedDynamic = true;
        dynamicValidation.hasSuspenseAboveBody = true;
        return;
    } else if (hasSuspenseRegex.test(componentStack)) {
        // this error had a Suspense boundary above it so we don't need to report it as a source
        // of disallowed
        dynamicValidation.hasAllowedDynamic = true;
        return;
    } else if (clientDynamic.syncDynamicErrorWithStack) {
        // This task was the task that called the sync error.
        dynamicValidation.dynamicErrors.push(clientDynamic.syncDynamicErrorWithStack);
        return;
    } else {
        const message = `Route "${workStore.route}": Uncached data was accessed outside of ` + '<Suspense>. This delays the entire page from rendering, resulting in a ' + 'slow user experience. Learn more: ' + 'https://nextjs.org/docs/messages/blocking-route';
        const error = createErrorWithComponentOrOwnerStack(message, componentStack);
        dynamicValidation.dynamicErrors.push(error);
        return;
    }
}
/**
 * In dev mode, we prefer using the owner stack, otherwise the provided
 * component stack is used.
 */ function createErrorWithComponentOrOwnerStack(message, componentStack) {
    const ownerStack = ("TURBOPACK compile-time value", "development") !== 'production' && _react.default.captureOwnerStack ? _react.default.captureOwnerStack() : null;
    const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
    });
    error.stack = error.name + ': ' + message + (ownerStack ?? componentStack);
    return error;
}
var PreludeState = /*#__PURE__*/ function(PreludeState) {
    PreludeState[PreludeState["Full"] = 0] = "Full";
    PreludeState[PreludeState["Empty"] = 1] = "Empty";
    PreludeState[PreludeState["Errored"] = 2] = "Errored";
    return PreludeState;
}({});
function logDisallowedDynamicError(workStore, error) {
    console.error(error);
    if (!workStore.dev) {
        if (workStore.hasReadableErrorStacks) {
            console.error(`To get a more detailed stack trace and pinpoint the issue, start the app in development mode by running \`next dev\`, then open "${workStore.route}" in your browser to investigate the error.`);
        } else {
            console.error(`To get a more detailed stack trace and pinpoint the issue, try one of the following:
  - Start the app in development mode by running \`next dev\`, then open "${workStore.route}" in your browser to investigate the error.
  - Rerun the production build with \`next build --debug-prerender\` to generate better stack traces.`);
        }
    }
}
function throwIfDisallowedDynamic(workStore, prelude, dynamicValidation, serverDynamic) {
    if (serverDynamic.syncDynamicErrorWithStack) {
        logDisallowedDynamicError(workStore, serverDynamic.syncDynamicErrorWithStack);
        throw new _staticgenerationbailout.StaticGenBailoutError();
    }
    if (prelude !== 0) {
        if (dynamicValidation.hasSuspenseAboveBody) {
            // This route has opted into allowing fully dynamic rendering
            // by including a Suspense boundary above the body. In this case
            // a lack of a shell is not considered disallowed so we simply return
            return;
        }
        // We didn't have any sync bailouts but there may be user code which
        // blocked the root. We would have captured these during the prerender
        // and can log them here and then terminate the build/validating render
        const dynamicErrors = dynamicValidation.dynamicErrors;
        if (dynamicErrors.length > 0) {
            for(let i = 0; i < dynamicErrors.length; i++){
                logDisallowedDynamicError(workStore, dynamicErrors[i]);
            }
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
        // If we got this far then the only other thing that could be blocking
        // the root is dynamic Viewport. If this is dynamic then
        // you need to opt into that by adding a Suspense boundary above the body
        // to indicate your are ok with fully dynamic rendering.
        if (dynamicValidation.hasDynamicViewport) {
            console.error(`Route "${workStore.route}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) without explicitly allowing fully dynamic rendering. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`);
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
        if (prelude === 1) {
            // If we ever get this far then we messed up the tracking of invalid dynamic.
            // We still adhere to the constraint that you must produce a shell but invite the
            // user to report this as a bug in Next.js.
            console.error(`Route "${workStore.route}" did not produce a static shell and Next.js was unable to determine a reason. This is a bug in Next.js.`);
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
    } else {
        if (dynamicValidation.hasAllowedDynamic === false && dynamicValidation.hasDynamicMetadata) {
            console.error(`Route "${workStore.route}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) when the rest of the route does not. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`);
            throw new _staticgenerationbailout.StaticGenBailoutError();
        }
    }
}
function delayUntilRuntimeStage(prerenderStore, result) {
    if (prerenderStore.runtimeStagePromise) {
        return prerenderStore.runtimeStagePromise.then(()=>result);
    }
    return result;
} //# sourceMappingURL=dynamic-rendering.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/unstable-rethrow.server.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "unstable_rethrow", {
    enumerable: true,
    get: function() {
        return unstable_rethrow;
    }
});
const _dynamicrenderingutils = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/dynamic-rendering-utils.js [app-ssr] (ecmascript)");
const _ispostpone = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/lib/router-utils/is-postpone.js [app-ssr] (ecmascript)");
const _bailouttocsr = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-ssr] (ecmascript)");
const _isnextroutererror = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/is-next-router-error.js [app-ssr] (ecmascript)");
const _dynamicrendering = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-ssr] (ecmascript)");
const _hooksservercontext = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/hooks-server-context.js [app-ssr] (ecmascript)");
function unstable_rethrow(error) {
    if ((0, _isnextroutererror.isNextRouterError)(error) || (0, _bailouttocsr.isBailoutToCSRError)(error) || (0, _hooksservercontext.isDynamicServerError)(error) || (0, _dynamicrendering.isDynamicPostpone)(error) || (0, _ispostpone.isPostpone)(error) || (0, _dynamicrenderingutils.isHangingPromiseRejectionError)(error) || (0, _dynamicrendering.isPrerenderInterruptedError)(error)) {
        throw error;
    }
    if (error instanceof Error && 'cause' in error) {
        unstable_rethrow(error.cause);
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unstable-rethrow.server.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/unstable-rethrow.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * This function should be used to rethrow internal Next.js errors so that they can be handled by the framework.
 * When wrapping an API that uses errors to interrupt control flow, you should use this function before you do any error handling.
 * This function will rethrow the error if it is a Next.js error so it can be handled, otherwise it will do nothing.
 *
 * Read more: [Next.js Docs: `unstable_rethrow`](https://nextjs.org/docs/app/api-reference/functions/unstable_rethrow)
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "unstable_rethrow", {
    enumerable: true,
    get: function() {
        return unstable_rethrow;
    }
});
const unstable_rethrow = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/unstable-rethrow.server.js [app-ssr] (ecmascript)").unstable_rethrow : "TURBOPACK unreachable";
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=unstable-rethrow.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/navigation.react-server.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    ReadonlyURLSearchParams: null,
    RedirectType: null,
    forbidden: null,
    notFound: null,
    permanentRedirect: null,
    redirect: null,
    unauthorized: null,
    unstable_isUnrecognizedActionError: null,
    unstable_rethrow: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ReadonlyURLSearchParams: function() {
        return _readonlyurlsearchparams.ReadonlyURLSearchParams;
    },
    RedirectType: function() {
        return _redirecterror.RedirectType;
    },
    forbidden: function() {
        return _forbidden.forbidden;
    },
    notFound: function() {
        return _notfound.notFound;
    },
    permanentRedirect: function() {
        return _redirect.permanentRedirect;
    },
    redirect: function() {
        return _redirect.redirect;
    },
    unauthorized: function() {
        return _unauthorized.unauthorized;
    },
    unstable_isUnrecognizedActionError: function() {
        return unstable_isUnrecognizedActionError;
    },
    unstable_rethrow: function() {
        return _unstablerethrow.unstable_rethrow;
    }
});
const _readonlyurlsearchparams = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/readonly-url-search-params.js [app-ssr] (ecmascript)");
const _redirect = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/redirect.js [app-ssr] (ecmascript)");
const _redirecterror = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/redirect-error.js [app-ssr] (ecmascript)");
const _notfound = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/not-found.js [app-ssr] (ecmascript)");
const _forbidden = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/forbidden.js [app-ssr] (ecmascript)");
const _unauthorized = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/unauthorized.js [app-ssr] (ecmascript)");
const _unstablerethrow = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/unstable-rethrow.js [app-ssr] (ecmascript)");
function unstable_isUnrecognizedActionError() {
    throw Object.defineProperty(new Error('`unstable_isUnrecognizedActionError` can only be used on the client.'), "__NEXT_ERROR_CODE", {
        value: "E776",
        enumerable: false,
        configurable: true
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation.react-server.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/navigation.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    ReadonlyURLSearchParams: null,
    RedirectType: null,
    ServerInsertedHTMLContext: null,
    forbidden: null,
    notFound: null,
    permanentRedirect: null,
    redirect: null,
    unauthorized: null,
    unstable_isUnrecognizedActionError: null,
    unstable_rethrow: null,
    useParams: null,
    usePathname: null,
    useRouter: null,
    useSearchParams: null,
    useSelectedLayoutSegment: null,
    useSelectedLayoutSegments: null,
    useServerInsertedHTML: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ReadonlyURLSearchParams: function() {
        return _navigationreactserver.ReadonlyURLSearchParams;
    },
    RedirectType: function() {
        return _navigationreactserver.RedirectType;
    },
    ServerInsertedHTMLContext: function() {
        return _serverinsertedhtmlsharedruntime.ServerInsertedHTMLContext;
    },
    forbidden: function() {
        return _navigationreactserver.forbidden;
    },
    notFound: function() {
        return _navigationreactserver.notFound;
    },
    permanentRedirect: function() {
        return _navigationreactserver.permanentRedirect;
    },
    redirect: function() {
        return _navigationreactserver.redirect;
    },
    unauthorized: function() {
        return _navigationreactserver.unauthorized;
    },
    unstable_isUnrecognizedActionError: function() {
        return _unrecognizedactionerror.unstable_isUnrecognizedActionError;
    },
    unstable_rethrow: function() {
        return _navigationreactserver.unstable_rethrow;
    },
    useParams: function() {
        return useParams;
    },
    usePathname: function() {
        return usePathname;
    },
    useRouter: function() {
        return useRouter;
    },
    useSearchParams: function() {
        return useSearchParams;
    },
    useSelectedLayoutSegment: function() {
        return useSelectedLayoutSegment;
    },
    useSelectedLayoutSegments: function() {
        return useSelectedLayoutSegments;
    },
    useServerInsertedHTML: function() {
        return _serverinsertedhtmlsharedruntime.useServerInsertedHTML;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-ssr] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)"));
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/app-router-context.js [app-ssr] (ecmascript)");
const _hooksclientcontextsharedruntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/hooks-client-context.js [app-ssr] (ecmascript)");
const _segment = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/shared/lib/segment.js [app-ssr] (ecmascript)");
const _readonlyurlsearchparams = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/readonly-url-search-params.js [app-ssr] (ecmascript)");
const _serverinsertedhtmlsharedruntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/server-inserted-html.js [app-ssr] (ecmascript)");
const _unrecognizedactionerror = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/unrecognized-action-error.js [app-ssr] (ecmascript)");
const _navigationreactserver = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/navigation.react-server.js [app-ssr] (ecmascript)");
const useDynamicRouteParams = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-ssr] (ecmascript)").useDynamicRouteParams : "TURBOPACK unreachable";
const useDynamicSearchParams = ("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-ssr] (ecmascript)").useDynamicSearchParams : "TURBOPACK unreachable";
function useSearchParams() {
    useDynamicSearchParams?.('useSearchParams()');
    const searchParams = (0, _react.useContext)(_hooksclientcontextsharedruntime.SearchParamsContext);
    // In the case where this is `null`, the compat types added in
    // `next-env.d.ts` will add a new overload that changes the return type to
    // include `null`.
    const readonlySearchParams = (0, _react.useMemo)(()=>{
        if (!searchParams) {
            // When the router is not ready in pages, we won't have the search params
            // available.
            return null;
        }
        return new _readonlyurlsearchparams.ReadonlyURLSearchParams(searchParams);
    }, [
        searchParams
    ]);
    // Instrument with Suspense DevTools (dev-only)
    if (("TURBOPACK compile-time value", "development") !== 'production' && 'use' in _react.default) {
        const navigationPromises = (0, _react.use)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
        if (navigationPromises) {
            return (0, _react.use)(navigationPromises.searchParams);
        }
    }
    return readonlySearchParams;
}
function usePathname() {
    useDynamicRouteParams?.('usePathname()');
    // In the case where this is `null`, the compat types added in `next-env.d.ts`
    // will add a new overload that changes the return type to include `null`.
    const pathname = (0, _react.useContext)(_hooksclientcontextsharedruntime.PathnameContext);
    // Instrument with Suspense DevTools (dev-only)
    if (("TURBOPACK compile-time value", "development") !== 'production' && 'use' in _react.default) {
        const navigationPromises = (0, _react.use)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
        if (navigationPromises) {
            return (0, _react.use)(navigationPromises.pathname);
        }
    }
    return pathname;
}
function useRouter() {
    const router = (0, _react.useContext)(_approutercontextsharedruntime.AppRouterContext);
    if (router === null) {
        throw Object.defineProperty(new Error('invariant expected app router to be mounted'), "__NEXT_ERROR_CODE", {
            value: "E238",
            enumerable: false,
            configurable: true
        });
    }
    return router;
}
function useParams() {
    useDynamicRouteParams?.('useParams()');
    const params = (0, _react.useContext)(_hooksclientcontextsharedruntime.PathParamsContext);
    // Instrument with Suspense DevTools (dev-only)
    if (("TURBOPACK compile-time value", "development") !== 'production' && 'use' in _react.default) {
        const navigationPromises = (0, _react.use)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
        if (navigationPromises) {
            return (0, _react.use)(navigationPromises.params);
        }
    }
    return params;
}
function useSelectedLayoutSegments(parallelRouteKey = 'children') {
    useDynamicRouteParams?.('useSelectedLayoutSegments()');
    const context = (0, _react.useContext)(_approutercontextsharedruntime.LayoutRouterContext);
    // @ts-expect-error This only happens in `pages`. Type is overwritten in navigation.d.ts
    if (!context) return null;
    // Instrument with Suspense DevTools (dev-only)
    if (("TURBOPACK compile-time value", "development") !== 'production' && 'use' in _react.default) {
        const navigationPromises = (0, _react.use)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
        if (navigationPromises) {
            const promise = navigationPromises.selectedLayoutSegmentsPromises?.get(parallelRouteKey);
            if (promise) {
                // We should always have a promise here, but if we don't, it's not worth erroring over.
                // We just won't be able to instrument it, but can still provide the value.
                return (0, _react.use)(promise);
            }
        }
    }
    return (0, _segment.getSelectedLayoutSegmentPath)(context.parentTree, parallelRouteKey);
}
function useSelectedLayoutSegment(parallelRouteKey = 'children') {
    useDynamicRouteParams?.('useSelectedLayoutSegment()');
    const navigationPromises = (0, _react.useContext)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
    const selectedLayoutSegments = useSelectedLayoutSegments(parallelRouteKey);
    // Instrument with Suspense DevTools (dev-only)
    if (("TURBOPACK compile-time value", "development") !== 'production' && navigationPromises && 'use' in _react.default) {
        const promise = navigationPromises.selectedLayoutSegmentPromises?.get(parallelRouteKey);
        if (promise) {
            // We should always have a promise here, but if we don't, it's not worth erroring over.
            // We just won't be able to instrument it, but can still provide the value.
            return (0, _react.use)(promise);
        }
    }
    return (0, _segment.computeSelectedLayoutSegment)(selectedLayoutSegments, parallelRouteKey);
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation.js.map
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/next/navigation.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/client/components/navigation.js [app-ssr] (ecmascript)");
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/PersonAdd.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)(/*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
    d: "M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m-9-2V7H4v3H1v2h3v3h2v-3h3v-2zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"
}), 'PersonAdd');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Assessment.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)(/*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
    d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M9 17H7v-7h2zm4 0h-2V7h2zm4 0h-2v-4h2z"
}), 'Assessment');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/AutoAwesome.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)(/*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
    d: "m19 9 1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25z"
}), 'AutoAwesome');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Inventory.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)(/*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
    d: "M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2m-5 12H9v-2h6zm5-7H4V4l16-.02z"
}), 'Inventory');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Article.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)(/*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
    d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-5 14H7v-2h7zm3-4H7v-2h10zm0-4H7V7h10z"
}), 'Article');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/CalendarMonth.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)(/*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
    d: "M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V10h14zM9 14H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2zm-8 4H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2z"
}), 'CalendarMonth');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Settings.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)(/*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
    d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6"
}), 'Settings');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Logout.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)(/*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
    d: "m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
}), 'Logout');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/elementAcceptingRef/elementAcceptingRef.js [app-ssr] (ecmascript) <export default as elementAcceptingRef>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "elementAcceptingRef",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$elementAcceptingRef$2f$elementAcceptingRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$elementAcceptingRef$2f$elementAcceptingRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/elementAcceptingRef/elementAcceptingRef.js [app-ssr] (ecmascript)");
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Unstable_TrapFocus/FocusTrap.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
/* eslint-disable consistent-return, jsx-a11y/no-noninteractive-tabindex */ var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$exactProp$2f$exactProp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__exactProp$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/exactProp/exactProp.js [app-ssr] (ecmascript) <export default as exactProp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$elementAcceptingRef$2f$elementAcceptingRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__elementAcceptingRef$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/elementAcceptingRef/elementAcceptingRef.js [app-ssr] (ecmascript) <export default as elementAcceptingRef>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useForkRef$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_useForkRef$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/useForkRef/useForkRef.js [app-ssr] (ecmascript) <export default as unstable_useForkRef>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$ownerDocument$2f$ownerDocument$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_ownerDocument$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/ownerDocument/ownerDocument.js [app-ssr] (ecmascript) <export default as unstable_ownerDocument>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$getReactElementRef$2f$getReactElementRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_getReactElementRef$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/getReactElementRef/getReactElementRef.js [app-ssr] (ecmascript) <export default as unstable_getReactElementRef>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
// Inspired by https://github.com/focus-trap/tabbable
const candidatesSelector = [
    'input',
    'select',
    'textarea',
    'a[href]',
    'button',
    '[tabindex]',
    'audio[controls]',
    'video[controls]',
    '[contenteditable]:not([contenteditable="false"])'
].join(',');
function getTabIndex(node) {
    const tabindexAttr = parseInt(node.getAttribute('tabindex') || '', 10);
    if (!Number.isNaN(tabindexAttr)) {
        return tabindexAttr;
    }
    // Browsers do not return `tabIndex` correctly for contentEditable nodes;
    // https://bugs.chromium.org/p/chromium/issues/detail?id=661108&q=contenteditable%20tabindex&can=2
    // so if they don't have a tabindex attribute specifically set, assume it's 0.
    // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
    //  `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
    //  yet they are still part of the regular tab order; in FF, they get a default
    //  `tabIndex` of 0; since Chrome still puts those elements in the regular tab
    //  order, consider their tab index to be 0.
    if (node.contentEditable === 'true' || (node.nodeName === 'AUDIO' || node.nodeName === 'VIDEO' || node.nodeName === 'DETAILS') && node.getAttribute('tabindex') === null) {
        return 0;
    }
    return node.tabIndex;
}
function isNonTabbableRadio(node) {
    if (node.tagName !== 'INPUT' || node.type !== 'radio') {
        return false;
    }
    if (!node.name) {
        return false;
    }
    const getRadio = (selector)=>node.ownerDocument.querySelector(`input[type="radio"]${selector}`);
    let roving = getRadio(`[name="${node.name}"]:checked`);
    if (!roving) {
        roving = getRadio(`[name="${node.name}"]`);
    }
    return roving !== node;
}
function isNodeMatchingSelectorFocusable(node) {
    if (node.disabled || node.tagName === 'INPUT' && node.type === 'hidden' || isNonTabbableRadio(node)) {
        return false;
    }
    return true;
}
function defaultGetTabbable(root) {
    const regularTabNodes = [];
    const orderedTabNodes = [];
    Array.from(root.querySelectorAll(candidatesSelector)).forEach((node, i)=>{
        const nodeTabIndex = getTabIndex(node);
        if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node)) {
            return;
        }
        if (nodeTabIndex === 0) {
            regularTabNodes.push(node);
        } else {
            orderedTabNodes.push({
                documentOrder: i,
                tabIndex: nodeTabIndex,
                node: node
            });
        }
    });
    return orderedTabNodes.sort((a, b)=>a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex).map((a)=>a.node).concat(regularTabNodes);
}
function defaultIsEnabled() {
    return true;
}
/**
 * @ignore - internal component.
 */ function FocusTrap(props) {
    const { children, disableAutoFocus = false, disableEnforceFocus = false, disableRestoreFocus = false, getTabbable = defaultGetTabbable, isEnabled = defaultIsEnabled, open } = props;
    const ignoreNextEnforceFocus = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    const sentinelStart = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const sentinelEnd = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const nodeToRestore = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const reactFocusEventTarget = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    // This variable is useful when disableAutoFocus is true.
    // It waits for the active element to move into the component to activate.
    const activated = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    const rootRef = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const handleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useForkRef$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_useForkRef$3e$__["unstable_useForkRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$getReactElementRef$2f$getReactElementRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_getReactElementRef$3e$__["unstable_getReactElementRef"])(children), rootRef);
    const lastKeydown = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        // We might render an empty child.
        if (!open || !rootRef.current) {
            return;
        }
        activated.current = !disableAutoFocus;
    }, [
        disableAutoFocus,
        open
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        // We might render an empty child.
        if (!open || !rootRef.current) {
            return;
        }
        const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$ownerDocument$2f$ownerDocument$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_ownerDocument$3e$__["unstable_ownerDocument"])(rootRef.current);
        if (!rootRef.current.contains(doc.activeElement)) {
            if (!rootRef.current.hasAttribute('tabIndex')) {
                if ("TURBOPACK compile-time truthy", 1) {
                    console.error([
                        'MUI: The modal content node does not accept focus.',
                        'For the benefit of assistive technologies, ' + 'the tabIndex of the node is being set to "-1".'
                    ].join('\n'));
                }
                rootRef.current.setAttribute('tabIndex', '-1');
            }
            if (activated.current) {
                rootRef.current.focus();
            }
        }
        return ()=>{
            // restoreLastFocus()
            if (!disableRestoreFocus) {
                // In IE11 it is possible for document.activeElement to be null resulting
                // in nodeToRestore.current being null.
                // Not all elements in IE11 have a focus method.
                // Once IE11 support is dropped the focus() call can be unconditional.
                if (nodeToRestore.current && nodeToRestore.current.focus) {
                    ignoreNextEnforceFocus.current = true;
                    nodeToRestore.current.focus();
                }
                nodeToRestore.current = null;
            }
        };
    // Missing `disableRestoreFocus` which is fine.
    // We don't support changing that prop on an open FocusTrap
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        open
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        // We might render an empty child.
        if (!open || !rootRef.current) {
            return;
        }
        const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$ownerDocument$2f$ownerDocument$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_ownerDocument$3e$__["unstable_ownerDocument"])(rootRef.current);
        const loopFocus = (nativeEvent)=>{
            lastKeydown.current = nativeEvent;
            if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== 'Tab') {
                return;
            }
            // Make sure the next tab starts from the right place.
            // doc.activeElement refers to the origin.
            if (doc.activeElement === rootRef.current && nativeEvent.shiftKey) {
                // We need to ignore the next contain as
                // it will try to move the focus back to the rootRef element.
                ignoreNextEnforceFocus.current = true;
                if (sentinelEnd.current) {
                    sentinelEnd.current.focus();
                }
            }
        };
        const contain = ()=>{
            const rootElement = rootRef.current;
            // Cleanup functions are executed lazily in React 17.
            // Contain can be called between the component being unmounted and its cleanup function being run.
            if (rootElement === null) {
                return;
            }
            if (!doc.hasFocus() || !isEnabled() || ignoreNextEnforceFocus.current) {
                ignoreNextEnforceFocus.current = false;
                return;
            }
            // The focus is already inside
            if (rootElement.contains(doc.activeElement)) {
                return;
            }
            // The disableEnforceFocus is set and the focus is outside of the focus trap (and sentinel nodes)
            if (disableEnforceFocus && doc.activeElement !== sentinelStart.current && doc.activeElement !== sentinelEnd.current) {
                return;
            }
            // if the focus event is not coming from inside the children's react tree, reset the refs
            if (doc.activeElement !== reactFocusEventTarget.current) {
                reactFocusEventTarget.current = null;
            } else if (reactFocusEventTarget.current !== null) {
                return;
            }
            if (!activated.current) {
                return;
            }
            let tabbable = [];
            if (doc.activeElement === sentinelStart.current || doc.activeElement === sentinelEnd.current) {
                tabbable = getTabbable(rootRef.current);
            }
            // one of the sentinel nodes was focused, so move the focus
            // to the first/last tabbable element inside the focus trap
            if (tabbable.length > 0) {
                var _lastKeydown$current, _lastKeydown$current2;
                const isShiftTab = Boolean(((_lastKeydown$current = lastKeydown.current) == null ? void 0 : _lastKeydown$current.shiftKey) && ((_lastKeydown$current2 = lastKeydown.current) == null ? void 0 : _lastKeydown$current2.key) === 'Tab');
                const focusNext = tabbable[0];
                const focusPrevious = tabbable[tabbable.length - 1];
                if (typeof focusNext !== 'string' && typeof focusPrevious !== 'string') {
                    if (isShiftTab) {
                        focusPrevious.focus();
                    } else {
                        focusNext.focus();
                    }
                }
            // no tabbable elements in the trap focus or the focus was outside of the focus trap
            } else {
                rootElement.focus();
            }
        };
        doc.addEventListener('focusin', contain);
        doc.addEventListener('keydown', loopFocus, true);
        // With Edge, Safari and Firefox, no focus related events are fired when the focused area stops being a focused area.
        // for example https://bugzilla.mozilla.org/show_bug.cgi?id=559561.
        // Instead, we can look if the active element was restored on the BODY element.
        //
        // The whatwg spec defines how the browser should behave but does not explicitly mention any events:
        // https://html.spec.whatwg.org/multipage/interaction.html#focus-fixup-rule.
        const interval = setInterval(()=>{
            if (doc.activeElement && doc.activeElement.tagName === 'BODY') {
                contain();
            }
        }, 50);
        return ()=>{
            clearInterval(interval);
            doc.removeEventListener('focusin', contain);
            doc.removeEventListener('keydown', loopFocus, true);
        };
    }, [
        disableAutoFocus,
        disableEnforceFocus,
        disableRestoreFocus,
        isEnabled,
        open,
        getTabbable
    ]);
    const onFocus = (event)=>{
        if (nodeToRestore.current === null) {
            nodeToRestore.current = event.relatedTarget;
        }
        activated.current = true;
        reactFocusEventTarget.current = event.target;
        const childrenPropsHandler = children.props.onFocus;
        if (childrenPropsHandler) {
            childrenPropsHandler(event);
        }
    };
    const handleFocusSentinel = (event)=>{
        if (nodeToRestore.current === null) {
            nodeToRestore.current = event.relatedTarget;
        }
        activated.current = true;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                tabIndex: open ? 0 : -1,
                onFocus: handleFocusSentinel,
                ref: sentinelStart,
                "data-testid": "sentinelStart"
            }),
            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cloneElement"](children, {
                ref: handleRef,
                onFocus
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("div", {
                tabIndex: open ? 0 : -1,
                onFocus: handleFocusSentinel,
                ref: sentinelEnd,
                "data-testid": "sentinelEnd"
            })
        ]
    });
}
("TURBOPACK compile-time truthy", 1) ? FocusTrap.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * A single child content element.
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$elementAcceptingRef$2f$elementAcceptingRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__elementAcceptingRef$3e$__["elementAcceptingRef"],
    /**
   * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */ disableAutoFocus: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */ disableEnforceFocus: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * If `true`, the focus trap will not restore focus to previously focused element once
   * focus trap is hidden or unmounted.
   * @default false
   */ disableRestoreFocus: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */ getTabbable: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
    /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple focus trap mounted at the same time.
   * @default function defaultIsEnabled(): boolean {
   *   return true;
   * }
   */ isEnabled: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
    /**
   * If `true`, focus is locked.
   */ open: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool.isRequired
} : "TURBOPACK unreachable";
if ("TURBOPACK compile-time truthy", 1) {
    // eslint-disable-next-line
    FocusTrap['propTypes' + ''] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$exactProp$2f$exactProp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__exactProp$3e$__["exactProp"])(FocusTrap.propTypes);
}
const __TURBOPACK__default__export__ = FocusTrap;
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Backdrop/backdropClasses.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getBackdropUtilityClass",
    ()=>getBackdropUtilityClass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClasses$2f$generateUtilityClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClass$2f$generateUtilityClass$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js [app-ssr] (ecmascript)");
;
;
function getBackdropUtilityClass(slot) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClass$2f$generateUtilityClass$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('MuiBackdrop', slot);
}
const backdropClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClasses$2f$generateUtilityClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('MuiBackdrop', [
    'root',
    'invisible'
]);
const __TURBOPACK__default__export__ = backdropClasses;
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Backdrop/Backdrop.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$objectWithoutPropertiesLoose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/esm/extends.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$composeClasses$2f$composeClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/composeClasses/composeClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/styled.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DefaultPropsProvider$2f$DefaultPropsProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Fade$2f$Fade$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Fade/Fade.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Backdrop$2f$backdropClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Backdrop/backdropClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
const _excluded = [
    "children",
    "className",
    "component",
    "components",
    "componentsProps",
    "invisible",
    "open",
    "slotProps",
    "slots",
    "TransitionComponent",
    "transitionDuration"
];
;
;
;
;
;
;
;
;
;
const useUtilityClasses = (ownerState)=>{
    const { classes, invisible } = ownerState;
    const slots = {
        root: [
            'root',
            invisible && 'invisible'
        ]
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$composeClasses$2f$composeClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(slots, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Backdrop$2f$backdropClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBackdropUtilityClass"], classes);
};
const BackdropRoot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])('div', {
    name: 'MuiBackdrop',
    slot: 'Root',
    overridesResolver: (props, styles)=>{
        const { ownerState } = props;
        return [
            styles.root,
            ownerState.invisible && styles.invisible
        ];
    }
})(({ ownerState })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        bottom: 0,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        WebkitTapHighlightColor: 'transparent'
    }, ownerState.invisible && {
        backgroundColor: 'transparent'
    }));
const Backdrop = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function Backdrop(inProps, ref) {
    var _slotProps$root, _ref, _slots$root;
    const props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DefaultPropsProvider$2f$DefaultPropsProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDefaultProps"])({
        props: inProps,
        name: 'MuiBackdrop'
    });
    const { children, className, component = 'div', components = {}, componentsProps = {}, invisible = false, open, slotProps = {}, slots = {}, TransitionComponent = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Fade$2f$Fade$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], transitionDuration } = props, other = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$objectWithoutPropertiesLoose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(props, _excluded);
    const ownerState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({}, props, {
        component,
        invisible
    });
    const classes = useUtilityClasses(ownerState);
    const rootSlotProps = (_slotProps$root = slotProps.root) != null ? _slotProps$root : componentsProps.root;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(TransitionComponent, (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        in: open,
        timeout: transitionDuration
    }, other, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(BackdropRoot, (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
            "aria-hidden": true
        }, rootSlotProps, {
            as: (_ref = (_slots$root = slots.root) != null ? _slots$root : components.Root) != null ? _ref : component,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(classes.root, className, rootSlotProps == null ? void 0 : rootSlotProps.className),
            ownerState: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({}, ownerState, rootSlotProps == null ? void 0 : rootSlotProps.ownerState),
            classes: classes,
            ref: ref,
            children: children
        }))
    }));
});
("TURBOPACK compile-time truthy", 1) ? Backdrop.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * The content of the component.
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * Override or extend the styles applied to the component.
   */ classes: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object,
    /**
   * @ignore
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */ component: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].elementType,
    /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */ components: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
        Root: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].elementType
    }),
    /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */ componentsProps: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
        root: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object
    }),
    /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */ invisible: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * If `true`, the component is shown.
   */ open: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool.isRequired,
    /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */ slotProps: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
        root: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object
    }),
    /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */ slots: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
        root: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].elementType
    }),
    /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */ sx: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].arrayOf(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object,
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool
        ])),
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object
    ]),
    /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */ TransitionComponent: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].elementType,
    /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */ transitionDuration: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number,
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
            appear: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number,
            enter: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number,
            exit: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number
        })
    ])
} : "TURBOPACK unreachable";
const __TURBOPACK__default__export__ = Backdrop;
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/createChainedFunction/createChainedFunction.js [app-ssr] (ecmascript) <export default as unstable_createChainedFunction>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "unstable_createChainedFunction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$createChainedFunction$2f$createChainedFunction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$createChainedFunction$2f$createChainedFunction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/createChainedFunction/createChainedFunction.js [app-ssr] (ecmascript)");
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/ownerWindow/ownerWindow.js [app-ssr] (ecmascript) <export default as unstable_ownerWindow>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "unstable_ownerWindow",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$ownerWindow$2f$ownerWindow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$ownerWindow$2f$ownerWindow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/ownerWindow/ownerWindow.js [app-ssr] (ecmascript)");
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/getScrollbarSize/getScrollbarSize.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// A change of the browser zoom change the scrollbar size.
// Credit https://github.com/twbs/bootstrap/blob/488fd8afc535ca3a6ad4dc581f5e89217b6a36ac/js/src/util/scrollbar.js#L14-L18
__turbopack_context__.s([
    "default",
    ()=>getScrollbarSize
]);
function getScrollbarSize(doc) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
    const documentWidth = doc.documentElement.clientWidth;
    return Math.abs(window.innerWidth - documentWidth);
}
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/getScrollbarSize/getScrollbarSize.js [app-ssr] (ecmascript) <export default as unstable_getScrollbarSize>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "unstable_getScrollbarSize",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$getScrollbarSize$2f$getScrollbarSize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$getScrollbarSize$2f$getScrollbarSize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/getScrollbarSize/getScrollbarSize.js [app-ssr] (ecmascript)");
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Modal/ModalManager.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModalManager",
    ()=>ModalManager,
    "ariaHidden",
    ()=>ariaHidden
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$ownerWindow$2f$ownerWindow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_ownerWindow$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/ownerWindow/ownerWindow.js [app-ssr] (ecmascript) <export default as unstable_ownerWindow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$ownerDocument$2f$ownerDocument$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_ownerDocument$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/ownerDocument/ownerDocument.js [app-ssr] (ecmascript) <export default as unstable_ownerDocument>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$getScrollbarSize$2f$getScrollbarSize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_getScrollbarSize$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/getScrollbarSize/getScrollbarSize.js [app-ssr] (ecmascript) <export default as unstable_getScrollbarSize>");
;
// Is a vertical scrollbar displayed?
function isOverflowing(container) {
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$ownerDocument$2f$ownerDocument$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_ownerDocument$3e$__["unstable_ownerDocument"])(container);
    if (doc.body === container) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$ownerWindow$2f$ownerWindow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_ownerWindow$3e$__["unstable_ownerWindow"])(container).innerWidth > doc.documentElement.clientWidth;
    }
    return container.scrollHeight > container.clientHeight;
}
function ariaHidden(element, show) {
    if (show) {
        element.setAttribute('aria-hidden', 'true');
    } else {
        element.removeAttribute('aria-hidden');
    }
}
function getPaddingRight(element) {
    return parseInt((0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$ownerWindow$2f$ownerWindow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_ownerWindow$3e$__["unstable_ownerWindow"])(element).getComputedStyle(element).paddingRight, 10) || 0;
}
function isAriaHiddenForbiddenOnElement(element) {
    // The forbidden HTML tags are the ones from ARIA specification that
    // can be children of body and can't have aria-hidden attribute.
    // cf. https://www.w3.org/TR/html-aria/#docconformance
    const forbiddenTagNames = [
        'TEMPLATE',
        'SCRIPT',
        'STYLE',
        'LINK',
        'MAP',
        'META',
        'NOSCRIPT',
        'PICTURE',
        'COL',
        'COLGROUP',
        'PARAM',
        'SLOT',
        'SOURCE',
        'TRACK'
    ];
    const isForbiddenTagName = forbiddenTagNames.indexOf(element.tagName) !== -1;
    const isInputHidden = element.tagName === 'INPUT' && element.getAttribute('type') === 'hidden';
    return isForbiddenTagName || isInputHidden;
}
function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude, show) {
    const blacklist = [
        mountElement,
        currentElement,
        ...elementsToExclude
    ];
    [].forEach.call(container.children, (element)=>{
        const isNotExcludedElement = blacklist.indexOf(element) === -1;
        const isNotForbiddenElement = !isAriaHiddenForbiddenOnElement(element);
        if (isNotExcludedElement && isNotForbiddenElement) {
            ariaHidden(element, show);
        }
    });
}
function findIndexOf(items, callback) {
    let idx = -1;
    items.some((item, index)=>{
        if (callback(item)) {
            idx = index;
            return true;
        }
        return false;
    });
    return idx;
}
function handleContainer(containerInfo, props) {
    const restoreStyle = [];
    const container = containerInfo.container;
    if (!props.disableScrollLock) {
        if (isOverflowing(container)) {
            // Compute the size before applying overflow hidden to avoid any scroll jumps.
            const scrollbarSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$getScrollbarSize$2f$getScrollbarSize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_getScrollbarSize$3e$__["unstable_getScrollbarSize"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$ownerDocument$2f$ownerDocument$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_ownerDocument$3e$__["unstable_ownerDocument"])(container));
            restoreStyle.push({
                value: container.style.paddingRight,
                property: 'padding-right',
                el: container
            });
            // Use computed style, here to get the real padding to add our scrollbar width.
            container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;
            // .mui-fixed is a global helper.
            const fixedElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$ownerDocument$2f$ownerDocument$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_ownerDocument$3e$__["unstable_ownerDocument"])(container).querySelectorAll('.mui-fixed');
            [].forEach.call(fixedElements, (element)=>{
                restoreStyle.push({
                    value: element.style.paddingRight,
                    property: 'padding-right',
                    el: element
                });
                element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
            });
        }
        let scrollContainer;
        if (container.parentNode instanceof DocumentFragment) {
            scrollContainer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$ownerDocument$2f$ownerDocument$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_ownerDocument$3e$__["unstable_ownerDocument"])(container).body;
        } else {
            // Support html overflow-y: auto for scroll stability between pages
            // https://css-tricks.com/snippets/css/force-vertical-scrollbar/
            const parent = container.parentElement;
            const containerWindow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$ownerWindow$2f$ownerWindow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_ownerWindow$3e$__["unstable_ownerWindow"])(container);
            scrollContainer = (parent == null ? void 0 : parent.nodeName) === 'HTML' && containerWindow.getComputedStyle(parent).overflowY === 'scroll' ? parent : container;
        }
        // Block the scroll even if no scrollbar is visible to account for mobile keyboard
        // screensize shrink.
        restoreStyle.push({
            value: scrollContainer.style.overflow,
            property: 'overflow',
            el: scrollContainer
        }, {
            value: scrollContainer.style.overflowX,
            property: 'overflow-x',
            el: scrollContainer
        }, {
            value: scrollContainer.style.overflowY,
            property: 'overflow-y',
            el: scrollContainer
        });
        scrollContainer.style.overflow = 'hidden';
    }
    const restore = ()=>{
        restoreStyle.forEach(({ value, el, property })=>{
            if (value) {
                el.style.setProperty(property, value);
            } else {
                el.style.removeProperty(property);
            }
        });
    };
    return restore;
}
function getHiddenSiblings(container) {
    const hiddenSiblings = [];
    [].forEach.call(container.children, (element)=>{
        if (element.getAttribute('aria-hidden') === 'true') {
            hiddenSiblings.push(element);
        }
    });
    return hiddenSiblings;
}
class ModalManager {
    constructor(){
        this.containers = void 0;
        this.modals = void 0;
        this.modals = [];
        this.containers = [];
    }
    add(modal, container) {
        let modalIndex = this.modals.indexOf(modal);
        if (modalIndex !== -1) {
            return modalIndex;
        }
        modalIndex = this.modals.length;
        this.modals.push(modal);
        // If the modal we are adding is already in the DOM.
        if (modal.modalRef) {
            ariaHidden(modal.modalRef, false);
        }
        const hiddenSiblings = getHiddenSiblings(container);
        ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
        const containerIndex = findIndexOf(this.containers, (item)=>item.container === container);
        if (containerIndex !== -1) {
            this.containers[containerIndex].modals.push(modal);
            return modalIndex;
        }
        this.containers.push({
            modals: [
                modal
            ],
            container,
            restore: null,
            hiddenSiblings
        });
        return modalIndex;
    }
    mount(modal, props) {
        const containerIndex = findIndexOf(this.containers, (item)=>item.modals.indexOf(modal) !== -1);
        const containerInfo = this.containers[containerIndex];
        if (!containerInfo.restore) {
            containerInfo.restore = handleContainer(containerInfo, props);
        }
    }
    remove(modal, ariaHiddenState = true) {
        const modalIndex = this.modals.indexOf(modal);
        if (modalIndex === -1) {
            return modalIndex;
        }
        const containerIndex = findIndexOf(this.containers, (item)=>item.modals.indexOf(modal) !== -1);
        const containerInfo = this.containers[containerIndex];
        containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
        this.modals.splice(modalIndex, 1);
        // If that was the last modal in a container, clean up the container.
        if (containerInfo.modals.length === 0) {
            // The modal might be closed before it had the chance to be mounted in the DOM.
            if (containerInfo.restore) {
                containerInfo.restore();
            }
            if (modal.modalRef) {
                // In case the modal wasn't in the DOM yet.
                ariaHidden(modal.modalRef, ariaHiddenState);
            }
            ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
            this.containers.splice(containerIndex, 1);
        } else {
            // Otherwise make sure the next top modal is visible to a screen reader.
            const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
            // as soon as a modal is adding its modalRef is undefined. it can't set
            // aria-hidden because the dom element doesn't exist either
            // when modal was unmounted before modalRef gets null
            if (nextTop.modalRef) {
                ariaHidden(nextTop.modalRef, false);
            }
        }
        return modalIndex;
    }
    isTopModal(modal) {
        return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
    }
}
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Modal/useModal.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/esm/extends.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$ownerDocument$2f$ownerDocument$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_ownerDocument$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/ownerDocument/ownerDocument.js [app-ssr] (ecmascript) <export default as unstable_ownerDocument>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useForkRef$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_useForkRef$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/useForkRef/useForkRef.js [app-ssr] (ecmascript) <export default as unstable_useForkRef>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEventCallback$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_useEventCallback$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js [app-ssr] (ecmascript) <export default as unstable_useEventCallback>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$createChainedFunction$2f$createChainedFunction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_createChainedFunction$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/createChainedFunction/createChainedFunction.js [app-ssr] (ecmascript) <export default as unstable_createChainedFunction>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$extractEventHandlers$2f$extractEventHandlers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/extractEventHandlers/extractEventHandlers.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Modal$2f$ModalManager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Modal/ModalManager.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function getContainer(container) {
    return typeof container === 'function' ? container() : container;
}
function getHasTransition(children) {
    return children ? children.props.hasOwnProperty('in') : false;
}
// A modal manager used to track and manage the state of open Modals.
// Modals don't open on the server so this won't conflict with concurrent requests.
const defaultManager = new __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Modal$2f$ModalManager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalManager"]();
/**
 *
 * Demos:
 *
 * - [Modal](https://mui.com/base-ui/react-modal/#hook)
 *
 * API:
 *
 * - [useModal API](https://mui.com/base-ui/react-modal/hooks-api/#use-modal)
 */ function useModal(parameters) {
    const { container, disableEscapeKeyDown = false, disableScrollLock = false, // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager = defaultManager, closeAfterTransition = false, onTransitionEnter, onTransitionExited, children, onClose, open, rootRef } = parameters;
    // @ts-ignore internal logic
    const modal = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"]({});
    const mountNodeRef = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const modalRef = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const handleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useForkRef$2f$useForkRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_useForkRef$3e$__["unstable_useForkRef"])(modalRef, rootRef);
    const [exited, setExited] = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](!open);
    const hasTransition = getHasTransition(children);
    let ariaHiddenProp = true;
    if (parameters['aria-hidden'] === 'false' || parameters['aria-hidden'] === false) {
        ariaHiddenProp = false;
    }
    const getDoc = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$ownerDocument$2f$ownerDocument$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_ownerDocument$3e$__["unstable_ownerDocument"])(mountNodeRef.current);
    const getModal = ()=>{
        modal.current.modalRef = modalRef.current;
        modal.current.mount = mountNodeRef.current;
        return modal.current;
    };
    const handleMounted = ()=>{
        manager.mount(getModal(), {
            disableScrollLock
        });
        // Fix a bug on Chrome where the scroll isn't initially 0.
        if (modalRef.current) {
            modalRef.current.scrollTop = 0;
        }
    };
    const handleOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEventCallback$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_useEventCallback$3e$__["unstable_useEventCallback"])(()=>{
        const resolvedContainer = getContainer(container) || getDoc().body;
        manager.add(getModal(), resolvedContainer);
        // The element was already mounted.
        if (modalRef.current) {
            handleMounted();
        }
    });
    const isTopModal = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>manager.isTopModal(getModal()), [
        manager
    ]);
    const handlePortalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useEventCallback$2f$useEventCallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_useEventCallback$3e$__["unstable_useEventCallback"])((node)=>{
        mountNodeRef.current = node;
        if (!node) {
            return;
        }
        if (open && isTopModal()) {
            handleMounted();
        } else if (modalRef.current) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Modal$2f$ModalManager$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ariaHidden"])(modalRef.current, ariaHiddenProp);
        }
    });
    const handleClose = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>{
        manager.remove(getModal(), ariaHiddenProp);
    }, [
        ariaHiddenProp,
        manager
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        return ()=>{
            handleClose();
        };
    }, [
        handleClose
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (open) {
            handleOpen();
        } else if (!hasTransition || !closeAfterTransition) {
            handleClose();
        }
    }, [
        open,
        handleClose,
        hasTransition,
        closeAfterTransition,
        handleOpen
    ]);
    const createHandleKeyDown = (otherHandlers)=>(event)=>{
            var _otherHandlers$onKeyD;
            (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
            // The handler doesn't take event.defaultPrevented into account:
            //
            // event.preventDefault() is meant to stop default behaviors like
            // clicking a checkbox to check it, hitting a button to submit a form,
            // and hitting left arrow to move the cursor in a text input etc.
            // Only special HTML elements have these default behaviors.
            if (event.key !== 'Escape' || event.which === 229 || // Wait until IME is settled.
            !isTopModal()) {
                return;
            }
            if (!disableEscapeKeyDown) {
                // Swallow the event, in case someone is listening for the escape key on the body.
                event.stopPropagation();
                if (onClose) {
                    onClose(event, 'escapeKeyDown');
                }
            }
        };
    const createHandleBackdropClick = (otherHandlers)=>(event)=>{
            var _otherHandlers$onClic;
            (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
            if (event.target !== event.currentTarget) {
                return;
            }
            if (onClose) {
                onClose(event, 'backdropClick');
            }
        };
    const getRootProps = (otherHandlers = {})=>{
        const propsEventHandlers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$extractEventHandlers$2f$extractEventHandlers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(parameters);
        // The custom event handlers shouldn't be spread on the root element
        delete propsEventHandlers.onTransitionEnter;
        delete propsEventHandlers.onTransitionExited;
        const externalEventHandlers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({}, propsEventHandlers, otherHandlers);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
            role: 'presentation'
        }, externalEventHandlers, {
            onKeyDown: createHandleKeyDown(externalEventHandlers),
            ref: handleRef
        });
    };
    const getBackdropProps = (otherHandlers = {})=>{
        const externalEventHandlers = otherHandlers;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
            'aria-hidden': true
        }, externalEventHandlers, {
            onClick: createHandleBackdropClick(externalEventHandlers),
            open
        });
    };
    const getTransitionProps = ()=>{
        const handleEnter = ()=>{
            setExited(false);
            if (onTransitionEnter) {
                onTransitionEnter();
            }
        };
        const handleExited = ()=>{
            setExited(true);
            if (onTransitionExited) {
                onTransitionExited();
            }
            if (closeAfterTransition) {
                handleClose();
            }
        };
        return {
            onEnter: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$createChainedFunction$2f$createChainedFunction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_createChainedFunction$3e$__["unstable_createChainedFunction"])(handleEnter, children == null ? void 0 : children.props.onEnter),
            onExited: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$createChainedFunction$2f$createChainedFunction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__unstable_createChainedFunction$3e$__["unstable_createChainedFunction"])(handleExited, children == null ? void 0 : children.props.onExited)
        };
    };
    return {
        getRootProps,
        getBackdropProps,
        getTransitionProps,
        rootRef: handleRef,
        portalRef: handlePortalRef,
        isTopModal,
        exited,
        hasTransition
    };
}
const __TURBOPACK__default__export__ = useModal;
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Modal/modalClasses.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getModalUtilityClass",
    ()=>getModalUtilityClass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClasses$2f$generateUtilityClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClass$2f$generateUtilityClass$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js [app-ssr] (ecmascript)");
;
;
function getModalUtilityClass(slot) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClass$2f$generateUtilityClass$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('MuiModal', slot);
}
const modalClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClasses$2f$generateUtilityClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('MuiModal', [
    'root',
    'hidden',
    'backdrop'
]);
const __TURBOPACK__default__export__ = modalClasses;
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Modal/Modal.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$objectWithoutPropertiesLoose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/esm/extends.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$HTMLElementType$2f$HTMLElementType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/HTMLElementType/HTMLElementType.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$elementAcceptingRef$2f$elementAcceptingRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/elementAcceptingRef/elementAcceptingRef.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$composeClasses$2f$composeClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/composeClasses/composeClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useSlotProps$2f$useSlotProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/useSlotProps/useSlotProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Unstable_TrapFocus$2f$FocusTrap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Unstable_TrapFocus/FocusTrap.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Portal$2f$Portal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Portal/Portal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/styled.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DefaultPropsProvider$2f$DefaultPropsProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Backdrop$2f$Backdrop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Backdrop/Backdrop.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Modal$2f$useModal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Modal/useModal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Modal$2f$modalClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Modal/modalClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
const _excluded = [
    "BackdropComponent",
    "BackdropProps",
    "classes",
    "className",
    "closeAfterTransition",
    "children",
    "container",
    "component",
    "components",
    "componentsProps",
    "disableAutoFocus",
    "disableEnforceFocus",
    "disableEscapeKeyDown",
    "disablePortal",
    "disableRestoreFocus",
    "disableScrollLock",
    "hideBackdrop",
    "keepMounted",
    "onBackdropClick",
    "onClose",
    "onTransitionEnter",
    "onTransitionExited",
    "open",
    "slotProps",
    "slots",
    "theme"
];
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const useUtilityClasses = (ownerState)=>{
    const { open, exited, classes } = ownerState;
    const slots = {
        root: [
            'root',
            !open && exited && 'hidden'
        ],
        backdrop: [
            'backdrop'
        ]
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$composeClasses$2f$composeClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(slots, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Modal$2f$modalClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getModalUtilityClass"], classes);
};
const ModalRoot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])('div', {
    name: 'MuiModal',
    slot: 'Root',
    overridesResolver: (props, styles)=>{
        const { ownerState } = props;
        return [
            styles.root,
            !ownerState.open && ownerState.exited && styles.hidden
        ];
    }
})(({ theme, ownerState })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        position: 'fixed',
        zIndex: (theme.vars || theme).zIndex.modal,
        right: 0,
        bottom: 0,
        top: 0,
        left: 0
    }, !ownerState.open && ownerState.exited && {
        visibility: 'hidden'
    }));
const ModalBackdrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Backdrop$2f$Backdrop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
    name: 'MuiModal',
    slot: 'Backdrop',
    overridesResolver: (props, styles)=>{
        return styles.backdrop;
    }
})({
    zIndex: -1
});
/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * - [Dialog](/material-ui/api/dialog/)
 * - [Drawer](/material-ui/api/drawer/)
 * - [Menu](/material-ui/api/menu/)
 * - [Popover](/material-ui/api/popover/)
 *
 * If you are creating a modal dialog, you probably want to use the [Dialog](/material-ui/api/dialog/) component
 * rather than directly using Modal.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 */ const Modal = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function Modal(inProps, ref) {
    var _ref, _slots$root, _ref2, _slots$backdrop, _slotProps$root, _slotProps$backdrop;
    const props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DefaultPropsProvider$2f$DefaultPropsProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDefaultProps"])({
        name: 'MuiModal',
        props: inProps
    });
    const { BackdropComponent = ModalBackdrop, BackdropProps, className, closeAfterTransition = false, children, container, component, components = {}, componentsProps = {}, disableAutoFocus = false, disableEnforceFocus = false, disableEscapeKeyDown = false, disablePortal = false, disableRestoreFocus = false, disableScrollLock = false, hideBackdrop = false, keepMounted = false, onBackdropClick, open, slotProps, slots } = props, other = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$objectWithoutPropertiesLoose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(props, _excluded);
    const propsWithDefaults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({}, props, {
        closeAfterTransition,
        disableAutoFocus,
        disableEnforceFocus,
        disableEscapeKeyDown,
        disablePortal,
        disableRestoreFocus,
        disableScrollLock,
        hideBackdrop,
        keepMounted
    });
    const { getRootProps, getBackdropProps, getTransitionProps, portalRef, isTopModal, exited, hasTransition } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Modal$2f$useModal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({}, propsWithDefaults, {
        rootRef: ref
    }));
    const ownerState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({}, propsWithDefaults, {
        exited
    });
    const classes = useUtilityClasses(ownerState);
    const childProps = {};
    if (children.props.tabIndex === undefined) {
        childProps.tabIndex = '-1';
    }
    // It's a Transition like component
    if (hasTransition) {
        const { onEnter, onExited } = getTransitionProps();
        childProps.onEnter = onEnter;
        childProps.onExited = onExited;
    }
    const RootSlot = (_ref = (_slots$root = slots == null ? void 0 : slots.root) != null ? _slots$root : components.Root) != null ? _ref : ModalRoot;
    const BackdropSlot = (_ref2 = (_slots$backdrop = slots == null ? void 0 : slots.backdrop) != null ? _slots$backdrop : components.Backdrop) != null ? _ref2 : BackdropComponent;
    const rootSlotProps = (_slotProps$root = slotProps == null ? void 0 : slotProps.root) != null ? _slotProps$root : componentsProps.root;
    const backdropSlotProps = (_slotProps$backdrop = slotProps == null ? void 0 : slotProps.backdrop) != null ? _slotProps$backdrop : componentsProps.backdrop;
    const rootProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useSlotProps$2f$useSlotProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        elementType: RootSlot,
        externalSlotProps: rootSlotProps,
        externalForwardedProps: other,
        getSlotProps: getRootProps,
        additionalProps: {
            ref,
            as: component
        },
        ownerState,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(className, rootSlotProps == null ? void 0 : rootSlotProps.className, classes == null ? void 0 : classes.root, !ownerState.open && ownerState.exited && (classes == null ? void 0 : classes.hidden))
    });
    const backdropProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useSlotProps$2f$useSlotProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        elementType: BackdropSlot,
        externalSlotProps: backdropSlotProps,
        additionalProps: BackdropProps,
        getSlotProps: (otherHandlers)=>{
            return getBackdropProps((0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({}, otherHandlers, {
                onClick: (e)=>{
                    if (onBackdropClick) {
                        onBackdropClick(e);
                    }
                    if (otherHandlers != null && otherHandlers.onClick) {
                        otherHandlers.onClick(e);
                    }
                }
            }));
        },
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(backdropSlotProps == null ? void 0 : backdropSlotProps.className, BackdropProps == null ? void 0 : BackdropProps.className, classes == null ? void 0 : classes.backdrop),
        ownerState
    });
    if (!keepMounted && !open && (!hasTransition || exited)) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Portal$2f$Portal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        ref: portalRef,
        container: container,
        disablePortal: disablePortal,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(RootSlot, (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({}, rootProps, {
            children: [
                !hideBackdrop && BackdropComponent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(BackdropSlot, (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({}, backdropProps)) : null,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Unstable_TrapFocus$2f$FocusTrap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    disableEnforceFocus: disableEnforceFocus,
                    disableAutoFocus: disableAutoFocus,
                    disableRestoreFocus: disableRestoreFocus,
                    isEnabled: isTopModal,
                    open: open,
                    children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cloneElement"](children, childProps)
                })
            ]
        }))
    });
});
("TURBOPACK compile-time truthy", 1) ? Modal.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * A backdrop component. This prop enables custom backdrop rendering.
   * @deprecated Use `slots.backdrop` instead. While this prop currently works, it will be removed in the next major version.
   * Use the `slots.backdrop` prop to make your application ready for the next version of Material UI.
   * @default styled(Backdrop, {
   *   name: 'MuiModal',
   *   slot: 'Backdrop',
   *   overridesResolver: (props, styles) => {
   *     return styles.backdrop;
   *   },
   * })({
   *   zIndex: -1,
   * })
   */ BackdropComponent: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].elementType,
    /**
   * Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.backdrop` instead.
   */ BackdropProps: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object,
    /**
   * A single child content element.
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$elementAcceptingRef$2f$elementAcceptingRef$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isRequired,
    /**
   * Override or extend the styles applied to the component.
   */ classes: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object,
    /**
   * @ignore
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */ closeAfterTransition: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */ component: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].elementType,
    /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */ components: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
        Backdrop: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].elementType,
        Root: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].elementType
    }),
    /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */ componentsProps: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
        backdrop: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object
        ]),
        root: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object
        ])
    }),
    /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */ container: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"] /* @typescript-to-proptypes-ignore */ .oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$HTMLElementType$2f$HTMLElementType$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func
    ]),
    /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */ disableAutoFocus: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */ disableEnforceFocus: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */ disableEscapeKeyDown: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */ disablePortal: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */ disableRestoreFocus: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Disable the scroll lock behavior.
   * @default false
   */ disableScrollLock: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */ hideBackdrop: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */ keepMounted: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */ onBackdropClick: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
    /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */ onClose: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
    /**
   * A function called when a transition enters.
   */ onTransitionEnter: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
    /**
   * A function called when a transition has exited.
   */ onTransitionExited: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
    /**
   * If `true`, the component is shown.
   */ open: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool.isRequired,
    /**
   * The props used for each slot inside the Modal.
   * @default {}
   */ slotProps: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
        backdrop: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object
        ]),
        root: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object
        ])
    }),
    /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */ slots: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
        backdrop: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].elementType,
        root: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].elementType
    }),
    /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */ sx: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].arrayOf(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object,
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool
        ])),
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object
    ])
} : "TURBOPACK unreachable";
const __TURBOPACK__default__export__ = Modal;
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Dialog/dialogClasses.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getDialogUtilityClass",
    ()=>getDialogUtilityClass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClasses$2f$generateUtilityClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClass$2f$generateUtilityClass$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js [app-ssr] (ecmascript)");
;
;
function getDialogUtilityClass(slot) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClass$2f$generateUtilityClass$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('MuiDialog', slot);
}
const dialogClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClasses$2f$generateUtilityClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('MuiDialog', [
    'root',
    'scrollPaper',
    'scrollBody',
    'container',
    'paper',
    'paperScrollPaper',
    'paperScrollBody',
    'paperWidthFalse',
    'paperWidthXs',
    'paperWidthSm',
    'paperWidthMd',
    'paperWidthLg',
    'paperWidthXl',
    'paperFullWidth',
    'paperFullScreen'
]);
const __TURBOPACK__default__export__ = dialogClasses;
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Dialog/DialogContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const DialogContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"]({});
if ("TURBOPACK compile-time truthy", 1) {
    DialogContext.displayName = 'DialogContext';
}
const __TURBOPACK__default__export__ = DialogContext;
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Dialog/Dialog.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$objectWithoutPropertiesLoose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/esm/extends.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$composeClasses$2f$composeClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/composeClasses/composeClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useId$2f$useId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/useId/useId.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$utils$2f$capitalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/utils/capitalize.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Modal$2f$Modal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Modal/Modal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Fade$2f$Fade$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Fade/Fade.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Paper/Paper.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DefaultPropsProvider$2f$DefaultPropsProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/styled.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$dialogClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Dialog/dialogClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$DialogContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Dialog/DialogContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Backdrop$2f$Backdrop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Backdrop/Backdrop.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
const _excluded = [
    "aria-describedby",
    "aria-labelledby",
    "BackdropComponent",
    "BackdropProps",
    "children",
    "className",
    "disableEscapeKeyDown",
    "fullScreen",
    "fullWidth",
    "maxWidth",
    "onBackdropClick",
    "onClick",
    "onClose",
    "open",
    "PaperComponent",
    "PaperProps",
    "scroll",
    "TransitionComponent",
    "transitionDuration",
    "TransitionProps"
];
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const DialogBackdrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Backdrop$2f$Backdrop$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
    name: 'MuiDialog',
    slot: 'Backdrop',
    overrides: (props, styles)=>styles.backdrop
})({
    // Improve scrollable dialog support.
    zIndex: -1
});
const useUtilityClasses = (ownerState)=>{
    const { classes, scroll, maxWidth, fullWidth, fullScreen } = ownerState;
    const slots = {
        root: [
            'root'
        ],
        container: [
            'container',
            `scroll${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$utils$2f$capitalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(scroll)}`
        ],
        paper: [
            'paper',
            `paperScroll${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$utils$2f$capitalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(scroll)}`,
            `paperWidth${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$utils$2f$capitalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(String(maxWidth))}`,
            fullWidth && 'paperFullWidth',
            fullScreen && 'paperFullScreen'
        ]
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$composeClasses$2f$composeClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(slots, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$dialogClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDialogUtilityClass"], classes);
};
const DialogRoot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Modal$2f$Modal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
    name: 'MuiDialog',
    slot: 'Root',
    overridesResolver: (props, styles)=>styles.root
})({
    '@media print': {
        // Use !important to override the Modal inline-style.
        position: 'absolute !important'
    }
});
const DialogContainer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])('div', {
    name: 'MuiDialog',
    slot: 'Container',
    overridesResolver: (props, styles)=>{
        const { ownerState } = props;
        return [
            styles.container,
            styles[`scroll${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$utils$2f$capitalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(ownerState.scroll)}`]
        ];
    }
})(({ ownerState })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        height: '100%',
        '@media print': {
            height: 'auto'
        },
        // We disable the focus ring for mouse, touch and keyboard users.
        outline: 0
    }, ownerState.scroll === 'paper' && {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }, ownerState.scroll === 'body' && {
        overflowY: 'auto',
        overflowX: 'hidden',
        textAlign: 'center',
        '&::after': {
            content: '""',
            display: 'inline-block',
            verticalAlign: 'middle',
            height: '100%',
            width: '0'
        }
    }));
const DialogPaper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
    name: 'MuiDialog',
    slot: 'Paper',
    overridesResolver: (props, styles)=>{
        const { ownerState } = props;
        return [
            styles.paper,
            styles[`scrollPaper${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$utils$2f$capitalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(ownerState.scroll)}`],
            styles[`paperWidth${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$utils$2f$capitalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(String(ownerState.maxWidth))}`],
            ownerState.fullWidth && styles.paperFullWidth,
            ownerState.fullScreen && styles.paperFullScreen
        ];
    }
})(({ theme, ownerState })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        margin: 32,
        position: 'relative',
        overflowY: 'auto',
        // Fix IE11 issue, to remove at some point.
        '@media print': {
            overflowY: 'visible',
            boxShadow: 'none'
        }
    }, ownerState.scroll === 'paper' && {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 'calc(100% - 64px)'
    }, ownerState.scroll === 'body' && {
        display: 'inline-block',
        verticalAlign: 'middle',
        textAlign: 'left' // 'initial' doesn't work on IE11
    }, !ownerState.maxWidth && {
        maxWidth: 'calc(100% - 64px)'
    }, ownerState.maxWidth === 'xs' && {
        maxWidth: theme.breakpoints.unit === 'px' ? Math.max(theme.breakpoints.values.xs, 444) : `max(${theme.breakpoints.values.xs}${theme.breakpoints.unit}, 444px)`,
        [`&.${__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$dialogClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].paperScrollBody}`]: {
            [theme.breakpoints.down(Math.max(theme.breakpoints.values.xs, 444) + 32 * 2)]: {
                maxWidth: 'calc(100% - 64px)'
            }
        }
    }, ownerState.maxWidth && ownerState.maxWidth !== 'xs' && {
        maxWidth: `${theme.breakpoints.values[ownerState.maxWidth]}${theme.breakpoints.unit}`,
        [`&.${__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$dialogClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].paperScrollBody}`]: {
            [theme.breakpoints.down(theme.breakpoints.values[ownerState.maxWidth] + 32 * 2)]: {
                maxWidth: 'calc(100% - 64px)'
            }
        }
    }, ownerState.fullWidth && {
        width: 'calc(100% - 64px)'
    }, ownerState.fullScreen && {
        margin: 0,
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        maxHeight: 'none',
        borderRadius: 0,
        [`&.${__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$dialogClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].paperScrollBody}`]: {
            margin: 0,
            maxWidth: '100%'
        }
    }));
/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 */ const Dialog = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function Dialog(inProps, ref) {
    const props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DefaultPropsProvider$2f$DefaultPropsProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDefaultProps"])({
        props: inProps,
        name: 'MuiDialog'
    });
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])();
    const defaultTransitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen
    };
    const { 'aria-describedby': ariaDescribedby, 'aria-labelledby': ariaLabelledbyProp, BackdropComponent, BackdropProps, children, className, disableEscapeKeyDown = false, fullScreen = false, fullWidth = false, maxWidth = 'sm', onBackdropClick, onClick, onClose, open, PaperComponent = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], PaperProps = {}, scroll = 'paper', TransitionComponent = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Fade$2f$Fade$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], transitionDuration = defaultTransitionDuration, TransitionProps } = props, other = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$objectWithoutPropertiesLoose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(props, _excluded);
    const ownerState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({}, props, {
        disableEscapeKeyDown,
        fullScreen,
        fullWidth,
        maxWidth,
        scroll
    });
    const classes = useUtilityClasses(ownerState);
    const backdropClick = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"]();
    const handleMouseDown = (event)=>{
        // We don't want to close the dialog when clicking the dialog content.
        // Make sure the event starts and ends on the same DOM element.
        backdropClick.current = event.target === event.currentTarget;
    };
    const handleBackdropClick = (event)=>{
        if (onClick) {
            onClick(event);
        }
        // Ignore the events not coming from the "backdrop".
        if (!backdropClick.current) {
            return;
        }
        backdropClick.current = null;
        if (onBackdropClick) {
            onBackdropClick(event);
        }
        if (onClose) {
            onClose(event, 'backdropClick');
        }
    };
    const ariaLabelledby = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$useId$2f$useId$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(ariaLabelledbyProp);
    const dialogContextValue = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        return {
            titleId: ariaLabelledby
        };
    }, [
        ariaLabelledby
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DialogRoot, (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(classes.root, className),
        closeAfterTransition: true,
        components: {
            Backdrop: DialogBackdrop
        },
        componentsProps: {
            backdrop: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
                transitionDuration,
                as: BackdropComponent
            }, BackdropProps)
        },
        disableEscapeKeyDown: disableEscapeKeyDown,
        onClose: onClose,
        open: open,
        ref: ref,
        onClick: handleBackdropClick,
        ownerState: ownerState
    }, other, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(TransitionComponent, (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
            appear: true,
            in: open,
            timeout: transitionDuration,
            role: "presentation"
        }, TransitionProps, {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DialogContainer, {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(classes.container),
                onMouseDown: handleMouseDown,
                ownerState: ownerState,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DialogPaper, (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
                    as: PaperComponent,
                    elevation: 24,
                    role: "dialog",
                    "aria-describedby": ariaDescribedby,
                    "aria-labelledby": ariaLabelledby
                }, PaperProps, {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(classes.paper, PaperProps.className),
                    ownerState: ownerState,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$DialogContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Provider, {
                        value: dialogContextValue,
                        children: children
                    })
                }))
            })
        }))
    }));
});
("TURBOPACK compile-time truthy", 1) ? Dialog.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * The id(s) of the element(s) that describe the dialog.
   */ 'aria-describedby': __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * The id(s) of the element(s) that label the dialog.
   */ 'aria-labelledby': __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * A backdrop component. This prop enables custom backdrop rendering.
   * @deprecated Use `slots.backdrop` instead. While this prop currently works, it will be removed in the next major version.
   * Use the `slots.backdrop` prop to make your application ready for the next version of Material UI.
   * @default styled(Backdrop, {
   *   name: 'MuiModal',
   *   slot: 'Backdrop',
   *   overridesResolver: (props, styles) => {
   *     return styles.backdrop;
   *   },
   * })({
   *   zIndex: -1,
   * })
   */ BackdropComponent: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].elementType,
    /**
   * @ignore
   */ BackdropProps: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object,
    /**
   * Dialog children, usually the included sub-components.
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * Override or extend the styles applied to the component.
   */ classes: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object,
    /**
   * @ignore
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */ disableEscapeKeyDown: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * If `true`, the dialog is full-screen.
   * @default false
   */ fullScreen: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * If `true`, the dialog stretches to `maxWidth`.
   *
   * Notice that the dialog width grow is limited by the default margin.
   * @default false
   */ fullWidth: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Determine the max-width of the dialog.
   * The dialog width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'sm'
   */ maxWidth: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"] /* @typescript-to-proptypes-ignore */ .oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOf([
            'xs',
            'sm',
            'md',
            'lg',
            'xl',
            false
        ]),
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
    ]),
    /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */ onBackdropClick: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
    /**
   * @ignore
   */ onClick: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
    /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */ onClose: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
    /**
   * If `true`, the component is shown.
   */ open: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool.isRequired,
    /**
   * The component used to render the body of the dialog.
   * @default Paper
   */ PaperComponent: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].elementType,
    /**
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   * @default {}
   */ PaperProps: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object,
    /**
   * Determine the container for scrolling the dialog.
   * @default 'paper'
   */ scroll: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOf([
        'body',
        'paper'
    ]),
    /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */ sx: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].arrayOf(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object,
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool
        ])),
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object
    ]),
    /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */ TransitionComponent: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].elementType,
    /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */ transitionDuration: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number,
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].shape({
            appear: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number,
            enter: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number,
            exit: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].number
        })
    ]),
    /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   */ TransitionProps: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object
} : "TURBOPACK unreachable";
const __TURBOPACK__default__export__ = Dialog;
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Dialog/Dialog.js [app-ssr] (ecmascript) <export default as Dialog>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Dialog/Dialog.js [app-ssr] (ecmascript)");
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogTitle/dialogTitleClasses.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getDialogTitleUtilityClass",
    ()=>getDialogTitleUtilityClass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClasses$2f$generateUtilityClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClass$2f$generateUtilityClass$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js [app-ssr] (ecmascript)");
;
;
function getDialogTitleUtilityClass(slot) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClass$2f$generateUtilityClass$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('MuiDialogTitle', slot);
}
const dialogTitleClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClasses$2f$generateUtilityClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('MuiDialogTitle', [
    'root'
]);
const __TURBOPACK__default__export__ = dialogTitleClasses;
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogTitle/DialogTitle.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/esm/extends.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$objectWithoutPropertiesLoose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$composeClasses$2f$composeClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/composeClasses/composeClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/styled.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DefaultPropsProvider$2f$DefaultPropsProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$dialogTitleClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogTitle/dialogTitleClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$DialogContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Dialog/DialogContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
const _excluded = [
    "className",
    "id"
];
;
;
;
;
;
;
;
;
;
;
const useUtilityClasses = (ownerState)=>{
    const { classes } = ownerState;
    const slots = {
        root: [
            'root'
        ]
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$composeClasses$2f$composeClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(slots, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$dialogTitleClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDialogTitleUtilityClass"], classes);
};
const DialogTitleRoot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
    name: 'MuiDialogTitle',
    slot: 'Root',
    overridesResolver: (props, styles)=>styles.root
})({
    padding: '16px 24px',
    flex: '0 0 auto'
});
const DialogTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function DialogTitle(inProps, ref) {
    const props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DefaultPropsProvider$2f$DefaultPropsProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDefaultProps"])({
        props: inProps,
        name: 'MuiDialogTitle'
    });
    const { className, id: idProp } = props, other = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$objectWithoutPropertiesLoose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(props, _excluded);
    const ownerState = props;
    const classes = useUtilityClasses(ownerState);
    const { titleId = idProp } = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$DialogContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DialogTitleRoot, (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        component: "h2",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(classes.root, className),
        ownerState: ownerState,
        ref: ref,
        variant: "h6",
        id: idProp != null ? idProp : titleId
    }, other));
});
("TURBOPACK compile-time truthy", 1) ? DialogTitle.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * The content of the component.
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * Override or extend the styles applied to the component.
   */ classes: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object,
    /**
   * @ignore
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * @ignore
   */ id: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */ sx: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].arrayOf(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object,
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool
        ])),
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object
    ])
} : "TURBOPACK unreachable";
const __TURBOPACK__default__export__ = DialogTitle;
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogTitle/DialogTitle.js [app-ssr] (ecmascript) <export default as DialogTitle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogTitle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogTitle/DialogTitle.js [app-ssr] (ecmascript)");
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogContent/dialogContentClasses.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getDialogContentUtilityClass",
    ()=>getDialogContentUtilityClass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClasses$2f$generateUtilityClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClass$2f$generateUtilityClass$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js [app-ssr] (ecmascript)");
;
;
function getDialogContentUtilityClass(slot) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClass$2f$generateUtilityClass$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('MuiDialogContent', slot);
}
const dialogContentClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClasses$2f$generateUtilityClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('MuiDialogContent', [
    'root',
    'dividers'
]);
const __TURBOPACK__default__export__ = dialogContentClasses;
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogContent/DialogContent.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$objectWithoutPropertiesLoose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/esm/extends.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$composeClasses$2f$composeClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/composeClasses/composeClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/styled.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DefaultPropsProvider$2f$DefaultPropsProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$dialogContentClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogContent/dialogContentClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$dialogTitleClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogTitle/dialogTitleClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
const _excluded = [
    "className",
    "dividers"
];
;
;
;
;
;
;
;
;
;
const useUtilityClasses = (ownerState)=>{
    const { classes, dividers } = ownerState;
    const slots = {
        root: [
            'root',
            dividers && 'dividers'
        ]
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$composeClasses$2f$composeClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(slots, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$dialogContentClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDialogContentUtilityClass"], classes);
};
const DialogContentRoot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])('div', {
    name: 'MuiDialogContent',
    slot: 'Root',
    overridesResolver: (props, styles)=>{
        const { ownerState } = props;
        return [
            styles.root,
            ownerState.dividers && styles.dividers
        ];
    }
})(({ theme, ownerState })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        flex: '1 1 auto',
        // Add iOS momentum scrolling for iOS < 13.0
        WebkitOverflowScrolling: 'touch',
        overflowY: 'auto',
        padding: '20px 24px'
    }, ownerState.dividers ? {
        padding: '16px 24px',
        borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
        borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`
    } : {
        [`.${__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$dialogTitleClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].root} + &`]: {
            paddingTop: 0
        }
    }));
const DialogContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function DialogContent(inProps, ref) {
    const props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DefaultPropsProvider$2f$DefaultPropsProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDefaultProps"])({
        props: inProps,
        name: 'MuiDialogContent'
    });
    const { className, dividers = false } = props, other = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$objectWithoutPropertiesLoose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(props, _excluded);
    const ownerState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({}, props, {
        dividers
    });
    const classes = useUtilityClasses(ownerState);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DialogContentRoot, (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(classes.root, className),
        ownerState: ownerState,
        ref: ref
    }, other));
});
("TURBOPACK compile-time truthy", 1) ? DialogContent.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * The content of the component.
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * Override or extend the styles applied to the component.
   */ classes: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object,
    /**
   * @ignore
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * Display the top and bottom dividers.
   * @default false
   */ dividers: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */ sx: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].arrayOf(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object,
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool
        ])),
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object
    ])
} : "TURBOPACK unreachable";
const __TURBOPACK__default__export__ = DialogContent;
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogContent/DialogContent.js [app-ssr] (ecmascript) <export default as DialogContent>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogContent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogContent/DialogContent.js [app-ssr] (ecmascript)");
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogActions/dialogActionsClasses.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getDialogActionsUtilityClass",
    ()=>getDialogActionsUtilityClass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClasses$2f$generateUtilityClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClass$2f$generateUtilityClass$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js [app-ssr] (ecmascript)");
;
;
function getDialogActionsUtilityClass(slot) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClass$2f$generateUtilityClass$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('MuiDialogActions', slot);
}
const dialogActionsClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClasses$2f$generateUtilityClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('MuiDialogActions', [
    'root',
    'spacing'
]);
const __TURBOPACK__default__export__ = dialogActionsClasses;
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogActions/DialogActions.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$objectWithoutPropertiesLoose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/esm/extends.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$composeClasses$2f$composeClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/composeClasses/composeClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/styled.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DefaultPropsProvider$2f$DefaultPropsProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$dialogActionsClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogActions/dialogActionsClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
const _excluded = [
    "className",
    "disableSpacing"
];
;
;
;
;
;
;
;
;
const useUtilityClasses = (ownerState)=>{
    const { classes, disableSpacing } = ownerState;
    const slots = {
        root: [
            'root',
            !disableSpacing && 'spacing'
        ]
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$composeClasses$2f$composeClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(slots, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$dialogActionsClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDialogActionsUtilityClass"], classes);
};
const DialogActionsRoot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])('div', {
    name: 'MuiDialogActions',
    slot: 'Root',
    overridesResolver: (props, styles)=>{
        const { ownerState } = props;
        return [
            styles.root,
            !ownerState.disableSpacing && styles.spacing
        ];
    }
})(({ ownerState })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        display: 'flex',
        alignItems: 'center',
        padding: 8,
        justifyContent: 'flex-end',
        flex: '0 0 auto'
    }, !ownerState.disableSpacing && {
        '& > :not(style) ~ :not(style)': {
            marginLeft: 8
        }
    }));
const DialogActions = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function DialogActions(inProps, ref) {
    const props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DefaultPropsProvider$2f$DefaultPropsProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDefaultProps"])({
        props: inProps,
        name: 'MuiDialogActions'
    });
    const { className, disableSpacing = false } = props, other = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$objectWithoutPropertiesLoose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(props, _excluded);
    const ownerState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({}, props, {
        disableSpacing
    });
    const classes = useUtilityClasses(ownerState);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(DialogActionsRoot, (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(classes.root, className),
        ownerState: ownerState,
        ref: ref
    }, other));
});
("TURBOPACK compile-time truthy", 1) ? DialogActions.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * The content of the component.
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * Override or extend the styles applied to the component.
   */ classes: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object,
    /**
   * @ignore
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * If `true`, the actions do not have additional margin.
   * @default false
   */ disableSpacing: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */ sx: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].arrayOf(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object,
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool
        ])),
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object
    ])
} : "TURBOPACK unreachable";
const __TURBOPACK__default__export__ = DialogActions;
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogActions/DialogActions.js [app-ssr] (ecmascript) <export default as DialogActions>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DialogActions",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogActions/DialogActions.js [app-ssr] (ecmascript)");
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Button/buttonClasses.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getButtonUtilityClass",
    ()=>getButtonUtilityClass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClasses$2f$generateUtilityClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClass$2f$generateUtilityClass$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js [app-ssr] (ecmascript)");
;
;
function getButtonUtilityClass(slot) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClass$2f$generateUtilityClass$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('MuiButton', slot);
}
const buttonClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$generateUtilityClasses$2f$generateUtilityClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])('MuiButton', [
    'root',
    'text',
    'textInherit',
    'textPrimary',
    'textSecondary',
    'textSuccess',
    'textError',
    'textInfo',
    'textWarning',
    'outlined',
    'outlinedInherit',
    'outlinedPrimary',
    'outlinedSecondary',
    'outlinedSuccess',
    'outlinedError',
    'outlinedInfo',
    'outlinedWarning',
    'contained',
    'containedInherit',
    'containedPrimary',
    'containedSecondary',
    'containedSuccess',
    'containedError',
    'containedInfo',
    'containedWarning',
    'disableElevation',
    'focusVisible',
    'disabled',
    'colorInherit',
    'colorPrimary',
    'colorSecondary',
    'colorSuccess',
    'colorError',
    'colorInfo',
    'colorWarning',
    'textSizeSmall',
    'textSizeMedium',
    'textSizeLarge',
    'outlinedSizeSmall',
    'outlinedSizeMedium',
    'outlinedSizeLarge',
    'containedSizeSmall',
    'containedSizeMedium',
    'containedSizeLarge',
    'sizeMedium',
    'sizeSmall',
    'sizeLarge',
    'fullWidth',
    'startIcon',
    'endIcon',
    'icon',
    'iconSizeSmall',
    'iconSizeMedium',
    'iconSizeLarge'
]);
const __TURBOPACK__default__export__ = buttonClasses;
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/ButtonGroup/ButtonGroupContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
/**
 * @ignore - internal component.
 */ const ButtonGroupContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"]({});
if ("TURBOPACK compile-time truthy", 1) {
    ButtonGroupContext.displayName = 'ButtonGroupContext';
}
const __TURBOPACK__default__export__ = ButtonGroupContext;
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/ButtonGroup/ButtonGroupButtonContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
/**
 * @ignore - internal component.
 */ const ButtonGroupButtonContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
if ("TURBOPACK compile-time truthy", 1) {
    ButtonGroupButtonContext.displayName = 'ButtonGroupButtonContext';
}
const __TURBOPACK__default__export__ = ButtonGroupButtonContext;
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Button/Button.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$objectWithoutPropertiesLoose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/esm/extends.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/prop-types/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$resolveProps$2f$resolveProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/resolveProps/resolveProps.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$composeClasses$2f$composeClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/utils/esm/composeClasses/composeClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/styled.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$rootShouldForwardProp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__rootShouldForwardProp$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/rootShouldForwardProp.js [app-ssr] (ecmascript) <export default as rootShouldForwardProp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DefaultPropsProvider$2f$DefaultPropsProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$ButtonBase$2f$ButtonBase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/ButtonBase/ButtonBase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$utils$2f$capitalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/utils/capitalize.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$buttonClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Button/buttonClasses.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$ButtonGroup$2f$ButtonGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/ButtonGroup/ButtonGroupContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$ButtonGroup$2f$ButtonGroupButtonContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/ButtonGroup/ButtonGroupButtonContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
const _excluded = [
    "children",
    "color",
    "component",
    "className",
    "disabled",
    "disableElevation",
    "disableFocusRipple",
    "endIcon",
    "focusVisibleClassName",
    "fullWidth",
    "size",
    "startIcon",
    "type",
    "variant"
];
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const useUtilityClasses = (ownerState)=>{
    const { color, disableElevation, fullWidth, size, variant, classes } = ownerState;
    const slots = {
        root: [
            'root',
            variant,
            `${variant}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$utils$2f$capitalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(color)}`,
            `size${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$utils$2f$capitalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(size)}`,
            `${variant}Size${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$utils$2f$capitalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(size)}`,
            `color${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$utils$2f$capitalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(color)}`,
            disableElevation && 'disableElevation',
            fullWidth && 'fullWidth'
        ],
        label: [
            'label'
        ],
        startIcon: [
            'icon',
            'startIcon',
            `iconSize${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$utils$2f$capitalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(size)}`
        ],
        endIcon: [
            'icon',
            'endIcon',
            `iconSize${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$utils$2f$capitalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(size)}`
        ]
    };
    const composedClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$composeClasses$2f$composeClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(slots, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$buttonClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getButtonUtilityClass"], classes);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({}, classes, composedClasses);
};
const commonIconStyles = (ownerState)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({}, ownerState.size === 'small' && {
        '& > *:nth-of-type(1)': {
            fontSize: 18
        }
    }, ownerState.size === 'medium' && {
        '& > *:nth-of-type(1)': {
            fontSize: 20
        }
    }, ownerState.size === 'large' && {
        '& > *:nth-of-type(1)': {
            fontSize: 22
        }
    });
const ButtonRoot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$ButtonBase$2f$ButtonBase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
    shouldForwardProp: (prop)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$rootShouldForwardProp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__rootShouldForwardProp$3e$__["rootShouldForwardProp"])(prop) || prop === 'classes',
    name: 'MuiButton',
    slot: 'Root',
    overridesResolver: (props, styles)=>{
        const { ownerState } = props;
        return [
            styles.root,
            styles[ownerState.variant],
            styles[`${ownerState.variant}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$utils$2f$capitalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(ownerState.color)}`],
            styles[`size${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$utils$2f$capitalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(ownerState.size)}`],
            styles[`${ownerState.variant}Size${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$utils$2f$capitalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(ownerState.size)}`],
            ownerState.color === 'inherit' && styles.colorInherit,
            ownerState.disableElevation && styles.disableElevation,
            ownerState.fullWidth && styles.fullWidth
        ];
    }
})(({ theme, ownerState })=>{
    var _theme$palette$getCon, _theme$palette;
    const inheritContainedBackgroundColor = theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800];
    const inheritContainedHoverBackgroundColor = theme.palette.mode === 'light' ? theme.palette.grey.A100 : theme.palette.grey[700];
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({}, theme.typography.button, {
        minWidth: 64,
        padding: '6px 16px',
        borderRadius: (theme.vars || theme).shape.borderRadius,
        transition: theme.transitions.create([
            'background-color',
            'box-shadow',
            'border-color',
            'color'
        ], {
            duration: theme.transitions.duration.short
        }),
        '&:hover': (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
            textDecoration: 'none',
            backgroundColor: theme.vars ? `rgba(${theme.vars.palette.text.primaryChannel} / ${theme.vars.palette.action.hoverOpacity})` : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.text.primary, theme.palette.action.hoverOpacity),
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                backgroundColor: 'transparent'
            }
        }, ownerState.variant === 'text' && ownerState.color !== 'inherit' && {
            backgroundColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                backgroundColor: 'transparent'
            }
        }, ownerState.variant === 'outlined' && ownerState.color !== 'inherit' && {
            border: `1px solid ${(theme.vars || theme).palette[ownerState.color].main}`,
            backgroundColor: theme.vars ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})` : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                backgroundColor: 'transparent'
            }
        }, ownerState.variant === 'contained' && {
            backgroundColor: theme.vars ? theme.vars.palette.Button.inheritContainedHoverBg : inheritContainedHoverBackgroundColor,
            boxShadow: (theme.vars || theme).shadows[4],
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                boxShadow: (theme.vars || theme).shadows[2],
                backgroundColor: (theme.vars || theme).palette.grey[300]
            }
        }, ownerState.variant === 'contained' && ownerState.color !== 'inherit' && {
            backgroundColor: (theme.vars || theme).palette[ownerState.color].dark,
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                backgroundColor: (theme.vars || theme).palette[ownerState.color].main
            }
        }),
        '&:active': (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({}, ownerState.variant === 'contained' && {
            boxShadow: (theme.vars || theme).shadows[8]
        }),
        [`&.${__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$buttonClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].focusVisible}`]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({}, ownerState.variant === 'contained' && {
            boxShadow: (theme.vars || theme).shadows[6]
        }),
        [`&.${__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$buttonClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].disabled}`]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
            color: (theme.vars || theme).palette.action.disabled
        }, ownerState.variant === 'outlined' && {
            border: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`
        }, ownerState.variant === 'contained' && {
            color: (theme.vars || theme).palette.action.disabled,
            boxShadow: (theme.vars || theme).shadows[0],
            backgroundColor: (theme.vars || theme).palette.action.disabledBackground
        })
    }, ownerState.variant === 'text' && {
        padding: '6px 8px'
    }, ownerState.variant === 'text' && ownerState.color !== 'inherit' && {
        color: (theme.vars || theme).palette[ownerState.color].main
    }, ownerState.variant === 'outlined' && {
        padding: '5px 15px',
        border: '1px solid currentColor'
    }, ownerState.variant === 'outlined' && ownerState.color !== 'inherit' && {
        color: (theme.vars || theme).palette[ownerState.color].main,
        border: theme.vars ? `1px solid rgba(${theme.vars.palette[ownerState.color].mainChannel} / 0.5)` : `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette[ownerState.color].main, 0.5)}`
    }, ownerState.variant === 'contained' && {
        color: theme.vars ? // this is safe because grey does not change between default light/dark mode
        theme.vars.palette.text.primary : (_theme$palette$getCon = (_theme$palette = theme.palette).getContrastText) == null ? void 0 : _theme$palette$getCon.call(_theme$palette, theme.palette.grey[300]),
        backgroundColor: theme.vars ? theme.vars.palette.Button.inheritContainedBg : inheritContainedBackgroundColor,
        boxShadow: (theme.vars || theme).shadows[2]
    }, ownerState.variant === 'contained' && ownerState.color !== 'inherit' && {
        color: (theme.vars || theme).palette[ownerState.color].contrastText,
        backgroundColor: (theme.vars || theme).palette[ownerState.color].main
    }, ownerState.color === 'inherit' && {
        color: 'inherit',
        borderColor: 'currentColor'
    }, ownerState.size === 'small' && ownerState.variant === 'text' && {
        padding: '4px 5px',
        fontSize: theme.typography.pxToRem(13)
    }, ownerState.size === 'large' && ownerState.variant === 'text' && {
        padding: '8px 11px',
        fontSize: theme.typography.pxToRem(15)
    }, ownerState.size === 'small' && ownerState.variant === 'outlined' && {
        padding: '3px 9px',
        fontSize: theme.typography.pxToRem(13)
    }, ownerState.size === 'large' && ownerState.variant === 'outlined' && {
        padding: '7px 21px',
        fontSize: theme.typography.pxToRem(15)
    }, ownerState.size === 'small' && ownerState.variant === 'contained' && {
        padding: '4px 10px',
        fontSize: theme.typography.pxToRem(13)
    }, ownerState.size === 'large' && ownerState.variant === 'contained' && {
        padding: '8px 22px',
        fontSize: theme.typography.pxToRem(15)
    }, ownerState.fullWidth && {
        width: '100%'
    });
}, ({ ownerState })=>ownerState.disableElevation && {
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none'
        },
        [`&.${__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$buttonClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].focusVisible}`]: {
            boxShadow: 'none'
        },
        '&:active': {
            boxShadow: 'none'
        },
        [`&.${__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$buttonClasses$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].disabled}`]: {
            boxShadow: 'none'
        }
    });
const ButtonStartIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])('span', {
    name: 'MuiButton',
    slot: 'StartIcon',
    overridesResolver: (props, styles)=>{
        const { ownerState } = props;
        return [
            styles.startIcon,
            styles[`iconSize${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$utils$2f$capitalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(ownerState.size)}`]
        ];
    }
})(({ ownerState })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        display: 'inherit',
        marginRight: 8,
        marginLeft: -4
    }, ownerState.size === 'small' && {
        marginLeft: -2
    }, commonIconStyles(ownerState)));
const ButtonEndIcon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])('span', {
    name: 'MuiButton',
    slot: 'EndIcon',
    overridesResolver: (props, styles)=>{
        const { ownerState } = props;
        return [
            styles.endIcon,
            styles[`iconSize${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$utils$2f$capitalize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(ownerState.size)}`]
        ];
    }
})(({ ownerState })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        display: 'inherit',
        marginRight: -4,
        marginLeft: 8
    }, ownerState.size === 'small' && {
        marginRight: -2
    }, commonIconStyles(ownerState)));
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](function Button(inProps, ref) {
    // props priority: `inProps` > `contextProps` > `themeDefaultProps`
    const contextProps = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$ButtonGroup$2f$ButtonGroupContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
    const buttonGroupButtonContextPositionClassName = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$ButtonGroup$2f$ButtonGroupButtonContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
    const resolvedProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$utils$2f$esm$2f$resolveProps$2f$resolveProps$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(contextProps, inProps);
    const props = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DefaultPropsProvider$2f$DefaultPropsProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDefaultProps"])({
        props: resolvedProps,
        name: 'MuiButton'
    });
    const { children, color = 'primary', component = 'button', className, disabled = false, disableElevation = false, disableFocusRipple = false, endIcon: endIconProp, focusVisibleClassName, fullWidth = false, size = 'medium', startIcon: startIconProp, type, variant = 'text' } = props, other = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$objectWithoutPropertiesLoose$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(props, _excluded);
    const ownerState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({}, props, {
        color,
        component,
        disabled,
        disableElevation,
        disableFocusRipple,
        fullWidth,
        size,
        type,
        variant
    });
    const classes = useUtilityClasses(ownerState);
    const startIcon = startIconProp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ButtonStartIcon, {
        className: classes.startIcon,
        ownerState: ownerState,
        children: startIconProp
    });
    const endIcon = endIconProp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(ButtonEndIcon, {
        className: classes.endIcon,
        ownerState: ownerState,
        children: endIconProp
    });
    const positionClassName = buttonGroupButtonContextPositionClassName || '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxs"])(ButtonRoot, (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$extends$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])({
        ownerState: ownerState,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(contextProps.className, classes.root, className, positionClassName),
        component: component,
        disabled: disabled,
        focusRipple: !disableFocusRipple,
        focusVisibleClassName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(classes.focusVisible, focusVisibleClassName),
        ref: ref,
        type: type
    }, other, {
        classes: classes,
        children: [
            startIcon,
            children,
            endIcon
        ]
    }));
});
("TURBOPACK compile-time truthy", 1) ? Button.propTypes = {
    // ┌────────────────────────────── Warning ──────────────────────────────┐
    // │ These PropTypes are generated from the TypeScript type definitions. │
    // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
    // └─────────────────────────────────────────────────────────────────────┘
    /**
   * The content of the component.
   */ children: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * Override or extend the styles applied to the component.
   */ classes: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object,
    /**
   * @ignore
   */ className: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */ color: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"] /* @typescript-to-proptypes-ignore */ .oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOf([
            'inherit',
            'primary',
            'secondary',
            'success',
            'error',
            'info',
            'warning'
        ]),
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
    ]),
    /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */ component: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].elementType,
    /**
   * If `true`, the component is disabled.
   * @default false
   */ disabled: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * If `true`, no elevation is used.
   * @default false
   */ disableElevation: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */ disableFocusRipple: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */ disableRipple: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * Element placed after the children.
   */ endIcon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * @ignore
   */ focusVisibleClassName: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */ fullWidth: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool,
    /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */ href: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string,
    /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */ size: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"] /* @typescript-to-proptypes-ignore */ .oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOf([
            'small',
            'medium',
            'large'
        ]),
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
    ]),
    /**
   * Element placed before the children.
   */ startIcon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].node,
    /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */ sx: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].arrayOf(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object,
            __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].bool
        ])),
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].func,
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].object
    ]),
    /**
   * @ignore
   */ type: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOf([
            'button',
            'reset',
            'submit'
        ]),
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
    ]),
    /**
   * The variant to use.
   * @default 'text'
   */ variant: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"] /* @typescript-to-proptypes-ignore */ .oneOfType([
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].oneOf([
            'contained',
            'outlined',
            'text'
        ]),
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$prop$2d$types$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].string
    ])
} : "TURBOPACK unreachable";
const __TURBOPACK__default__export__ = Button;
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Button/Button.js [app-ssr] (ecmascript) <export default as Button>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Button/Button.js [app-ssr] (ecmascript)");
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/WbSunny.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)(/*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
    d: "m6.76 4.84-1.8-1.79-1.41 1.41 1.79 1.79zM4 10.5H1v2h3zm9-9.95h-2V3.5h2zm7.45 3.91-1.41-1.41-1.79 1.79 1.41 1.41zm-3.21 13.7 1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5v2h3v-2zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6m-1 16.95h2V19.5h-2zm-7.45-3.91 1.41 1.41 1.79-1.8-1.41-1.41z"
}), 'WbSunny');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/WbTwilight.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)(/*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
    d: "m16.9542 8.6615 2.1205-2.122 1.4147 1.4137-2.1205 2.122zM2 18h20v2H2zm9-14h2v3h-2zM3.5426 7.9248l1.4142-1.4142L7.078 8.632l-1.4142 1.4142zM5 16h14c0-3.87-3.13-7-7-7s-7 3.13-7 7"
}), 'WbTwilight');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/NightsStay.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)([
    /*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
        d: "M11.1 12.08c-2.33-4.51-.5-8.48.53-10.07C6.27 2.2 1.98 6.59 1.98 12c0 .14.02.28.02.42.62-.27 1.29-.42 2-.42 1.66 0 3.18.83 4.1 2.15 1.67.48 2.9 2.02 2.9 3.85 0 1.52-.87 2.83-2.12 3.51.98.32 2.03.5 3.11.5 3.5 0 6.58-1.8 8.37-4.52-2.36.23-6.98-.97-9.26-5.41"
    }, "0"),
    /*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
        d: "M7 16h-.18C6.4 14.84 5.3 14 4 14c-1.66 0-3 1.34-3 3s1.34 3 3 3h3c1.1 0 2-.9 2-2s-.9-2-2-2"
    }, "1")
], 'NightsStay');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/WbSunnyTwoTone.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)([
    /*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
        d: "M12 7.5c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4",
        opacity: ".3"
    }, "0"),
    /*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
        d: "m5.34 6.25 1.42-1.41-1.8-1.79-1.41 1.41zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm7.66 5.705-1.41-1.407 1.79-1.79 1.406 1.41zM17.24 18.16l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6m0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4m-1 4h2v2.95h-2zm-7.45-.96 1.41 1.41 1.79-1.8-1.41-1.41z"
    }, "1")
], 'WbSunnyTwoTone');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/DirectionsWalk.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)(/*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
    d: "M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2M9.8 8.9 7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6z"
}), 'DirectionsWalk');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Train.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)(/*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
    d: "M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4M7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17m3.5-7H6V6h5zm2 0V6h5v4zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5"
}), 'Train');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Hotel.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)(/*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
    d: "M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3m12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4"
}), 'Hotel');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/FitnessCenter.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)(/*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
    d: "M20.57 14.86 22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"
}), 'FitnessCenter');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/MenuBook.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)([
    /*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
        d: "M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1m0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5z"
    }, "0"),
    /*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
        d: "M17.5 10.5c.88 0 1.73.09 2.5.26V9.24c-.79-.15-1.64-.24-2.5-.24-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-.99 4.5-.99M13 12.49v1.66c1.13-.64 2.7-.99 4.5-.99.88 0 1.73.09 2.5.26V11.9c-.79-.15-1.64-.24-2.5-.24-1.7 0-3.24.3-4.5.83m4.5 1.84c-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-.99 4.5-.99.88 0 1.73.09 2.5.26v-1.52c-.79-.16-1.64-.24-2.5-.24"
    }, "1")
], 'MenuBook');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Restaurant.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)(/*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
    d: "M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4"
}), 'Restaurant');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Store.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)(/*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
    d: "M20 4H4v2h16zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6zm-9 4H6v-4h6z"
}), 'Store');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Handyman.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)([
    /*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
        d: "m21.67 18.17-5.3-5.3h-.99l-2.54 2.54v.99l5.3 5.3c.39.39 1.02.39 1.41 0l2.12-2.12c.39-.38.39-1.02 0-1.41"
    }, "0"),
    /*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
        d: "m17.34 10.19 1.41-1.41 2.12 2.12c1.17-1.17 1.17-3.07 0-4.24l-3.54-3.54-1.41 1.41V1.71l-.7-.71-3.54 3.54.71.71h2.83l-1.41 1.41 1.06 1.06-2.89 2.89-4.13-4.13V5.06L4.83 2.04 2 4.87 5.03 7.9h1.41l4.13 4.13-.85.85H7.6l-5.3 5.3c-.39.39-.39 1.02 0 1.41l2.12 2.12c.39.39 1.02.39 1.41 0l5.3-5.3v-2.12l5.15-5.15z"
    }, "1")
], 'Handyman');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Groups.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)(/*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
    d: "M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91M4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29M20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m4 3.43c0-.81-.48-1.53-1.22-1.85-.85-.37-1.79-.58-2.78-.58-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3"
}), 'Groups');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Explore.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)(/*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
    d: "M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m2.19 12.19L6 18l3.81-8.19L18 6z"
}), 'Explore');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Work.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)(/*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
    d: "M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2m-6 0h-4V4h4z"
}), 'Work');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/SelfImprovement.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)([
    /*#__PURE__*/ (0, _jsxRuntime.jsx)("circle", {
        cx: "12",
        cy: "6",
        r: "2"
    }, "0"),
    /*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
        d: "M21 16v-2c-2.24 0-4.16-.96-5.6-2.68l-1.34-1.6c-.38-.46-.94-.72-1.53-.72h-1.05c-.59 0-1.15.26-1.53.72l-1.34 1.6C7.16 13.04 5.24 14 3 14v2c2.77 0 5.19-1.17 7-3.25V15l-3.88 1.55c-.67.27-1.12.93-1.12 1.66C5 19.2 5.8 20 6.79 20H9v-.5c0-1.38 1.12-2.5 2.5-2.5h3c.28 0 .5.22.5.5s-.22.5-.5.5h-3c-.83 0-1.5.67-1.5 1.5v.5h7.21c.99 0 1.79-.8 1.79-1.79 0-.73-.45-1.39-1.12-1.66L14 15v-2.25c1.81 2.08 4.23 3.25 7 3.25"
    }, "1")
], 'SelfImprovement');
}),
"[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/LocalLibrary.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var _interopRequireDefault = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@babel/runtime/helpers/interopRequireDefault.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _createSvgIcon = _interopRequireDefault(__turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/utils/createSvgIcon.js [app-ssr] (ecmascript)"));
var _jsxRuntime = __turbopack_context__.r("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var _default = exports.default = (0, _createSvgIcon.default)(/*#__PURE__*/ (0, _jsxRuntime.jsx)("path", {
    d: "M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.19 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55M12 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3"
}), 'LocalLibrary');
}),
];

//# sourceMappingURL=eb252_3647efd6._.js.map