(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameViewIcon.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GameViewIcon",
    ()=>GameViewIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-client] (ecmascript) <export default as useTheme>");
;
var _s = __turbopack_context__.k.signature();
;
const GameViewIcon = ({ icon: Icon, text, onClick, active = false })=>{
    _s();
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        onClick: onClick,
        sx: {
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            padding: 2,
            paddingLeft: 2.5,
            cursor: "pointer",
            borderRadius: 1.5,
            border: `2px solid ${active ? theme.palette.primary.main : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.text.disabled, 0.3)}`,
            backgroundColor: active ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.15) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.2),
            transition: "all 0.2s ease-out",
            position: "relative",
            overflow: "hidden",
            // Glow effect
            boxShadow: active ? `
            0 0 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.4)},
            inset 0 1px 0 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3)}
          ` : `inset 0 1px 0 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.2)}`,
            "&:hover": {
                backgroundColor: active ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.25) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.4),
                border: `2px solid ${active ? theme.palette.primary.light : theme.palette.text.secondary}`,
                boxShadow: `
            0 0 20px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(active ? theme.palette.primary.main : theme.palette.text.disabled, 0.3)},
            inset 0 1px 0 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.4)}
          `,
                transform: "translateX(4px)"
            },
            "&:active": {
                transform: "translateX(2px)"
            },
            // Subtle gradient overlay
            "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: active ? `linear-gradient(90deg, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.1)} 0%, transparent 100%)` : "transparent",
                pointerEvents: "none"
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                sx: {
                    fontSize: "1.75rem",
                    color: active ? theme.palette.primary.main : theme.palette.text.secondary,
                    filter: active ? `drop-shadow(0 0 8px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.5)})` : "none",
                    transition: "all 0.2s ease-out"
                }
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameViewIcon.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                sx: {
                    fontFamily: "Crimson Text, serif",
                    fontSize: "1.1rem",
                    fontWeight: active ? 600 : 500,
                    color: active ? theme.palette.primary.main : theme.palette.text.primary,
                    letterSpacing: "0.3px",
                    transition: "all 0.2s ease-out"
                },
                children: text
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameViewIcon.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameViewIcon.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(GameViewIcon, "VrMvFCCB9Haniz3VCRPNUiCauHs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"]
    ];
});
_c = GameViewIcon;
var _c;
__turbopack_context__.k.register(_c, "GameViewIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PartyMemberCard",
    ()=>PartyMemberCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-client] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$PersonAdd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/PersonAdd.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
const PartyMemberCard = ({ portrait, name, level, isPlayer = false, isSelected = false, isEmpty = false, onClick })=>{
    _s();
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    // Determine glow color based on state
    const glowColor = isPlayer ? theme.palette.primary.main // Purple for player
     : isSelected ? theme.palette.tertiary.main // Teal for selected
     : theme.palette.text.disabled; // Grey for normal
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        onClick: onClick,
        sx: {
            position: "relative",
            width: 120,
            cursor: "pointer",
            transition: "all 0.25s ease-out",
            "&:hover": {
                transform: "translateY(-4px) scale(1.03)"
            },
            "&:active": {
                transform: "translateY(-2px) scale(1.01)"
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    border: isEmpty ? `3px dashed ${theme.palette.text.disabled}` : `3px solid ${glowColor}`,
                    backgroundColor: isEmpty ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3) : theme.palette.background.paper,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    position: "relative",
                    // Glow effect
                    boxShadow: isEmpty ? "none" : `
              0 0 ${isSelected || isPlayer ? "24px" : "12px"} ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(glowColor, isSelected || isPlayer ? 0.6 : 0.3)},
              inset 0 2px 4px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.1)}
            `,
                    // Inner highlight
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "40%",
                        background: `linear-gradient(180deg, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3)} 0%, transparent 100%)`,
                        borderRadius: "50%",
                        pointerEvents: "none"
                    }
                },
                children: [
                    isEmpty ? // Empty slot - show add icon
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$PersonAdd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        sx: {
                            fontSize: "3rem",
                            color: theme.palette.text.disabled,
                            opacity: 0.5
                        }
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)) : portrait ? // Character portrait image
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: portrait,
                            alt: name || "Character",
                            style: {
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                            lineNumber: 117,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                        lineNumber: 107,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)) : // Fallback - show initials or placeholder
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        sx: {
                            fontFamily: "Cinzel, serif",
                            fontSize: "2.5rem",
                            fontWeight: 700,
                            color: theme.palette.text.secondary
                        },
                        children: name?.charAt(0) || "?"
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    isPlayer && !isEmpty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            position: "absolute",
                            top: -8,
                            right: -8,
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            backgroundColor: theme.palette.primary.main,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: `2px solid ${theme.palette.background.paper}`,
                            boxShadow: `0 0 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.6)}`
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                color: "#fff",
                                fontSize: "1.2rem",
                                lineHeight: 1
                            },
                            children: "⭐"
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                            lineNumber: 159,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    !isEmpty && level !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            position: "absolute",
                            bottom: -8,
                            left: "50%",
                            transform: "translateX(-50%)",
                            backgroundColor: theme.palette.secondary.main,
                            color: "#fff",
                            padding: "4px 12px",
                            borderRadius: 2,
                            border: `2px solid ${theme.palette.background.paper}`,
                            boxShadow: `0 2px 8px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.2)}`
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontFamily: "Crimson Text, serif",
                                fontSize: "0.9rem",
                                fontWeight: 700,
                                letterSpacing: "0.5px"
                            },
                            children: [
                                "Lv ",
                                level
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                            lineNumber: 187,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                        lineNumber: 173,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            !isEmpty && name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                sx: {
                    textAlign: "center",
                    fontFamily: "Crimson Text, serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: isPlayer ? theme.palette.primary.main : theme.palette.text.primary,
                    mt: 2,
                    textShadow: isPlayer ? `0 0 8px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.4)}` : "none"
                },
                children: name
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                lineNumber: 203,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            isEmpty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                sx: {
                    textAlign: "center",
                    fontFamily: "Crimson Text, serif",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: theme.palette.text.disabled,
                    mt: 2,
                    fontStyle: "italic"
                },
                children: "Recruit"
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                lineNumber: 222,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PartyMemberCard, "VrMvFCCB9Haniz3VCRPNUiCauHs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"]
    ];
});
_c = PartyMemberCard;
var _c;
__turbopack_context__.k.register(_c, "PartyMemberCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GameSidebar",
    ()=>GameSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-client] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Assessment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Assessment.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$AutoAwesome$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/AutoAwesome.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Inventory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Inventory.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Article$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Article.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$CalendarMonth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/CalendarMonth.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Settings.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Logout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Logout.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameViewIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameViewIcon.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
const GameSidebar = ({ onScheduleClick, onStatsClick, onSkillsClick, onInventoryClick, onNewsClick, onSettingsClick, onLogoutClick })=>{
    _s();
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    const [activeButton, setActiveButton] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleButtonClick = (buttonName, callback)=>{
        setActiveButton(buttonName);
        if (callback) {
            callback();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            width: 240,
            height: "100%",
            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.9),
            border: `2px solid ${theme.palette.secondary.main}`,
            borderRadius: 2,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            boxShadow: `
          0 4px 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.1)},
          inset 0 1px 0 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3)}
        `
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameViewIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameViewIcon"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$CalendarMonth$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                text: "Schedule",
                onClick: ()=>handleButtonClick("schedule", onScheduleClick),
                active: activeButton === "schedule"
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    height: 2,
                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.text.disabled, 0.2),
                    my: 1,
                    borderRadius: 1
                }
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameViewIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameViewIcon"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Assessment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                text: "Stats",
                onClick: ()=>handleButtonClick("stats", onStatsClick),
                active: activeButton === "stats"
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameViewIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameViewIcon"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$AutoAwesome$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                text: "Skills",
                onClick: ()=>handleButtonClick("skills", onSkillsClick),
                active: activeButton === "skills"
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameViewIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameViewIcon"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Inventory$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                text: "Inventory",
                onClick: ()=>handleButtonClick("inventory", onInventoryClick),
                active: activeButton === "inventory"
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    height: 2,
                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.text.disabled, 0.2),
                    my: 1,
                    borderRadius: 1
                }
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameViewIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameViewIcon"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Article$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                text: "News",
                onClick: ()=>handleButtonClick("news", onNewsClick),
                active: activeButton === "news"
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    flex: 1
                }
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    height: 2,
                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.text.disabled, 0.2),
                    my: 1,
                    borderRadius: 1
                }
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameViewIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameViewIcon"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                text: "Settings",
                onClick: ()=>handleButtonClick("settings", onSettingsClick),
                active: activeButton === "settings"
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameViewIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameViewIcon"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Logout$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                text: "Logout",
                onClick: ()=>handleButtonClick("logout", onLogoutClick),
                active: activeButton === "logout"
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(GameSidebar, "tgfZxEzuHyNVj5gKlfk6pAGmpdQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"]
    ];
});
_c = GameSidebar;
var _c;
__turbopack_context__.k.register(_c, "GameSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/workspace/MyProject/Client/webapp/src/config/actions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Action Definitions for Frontend
 * 
 * Backend sends only action IDs (strings)
 * Frontend has the full definition (icon, text, requirements)
 */ __turbopack_context__.s([
    "ACTION_DEFINITIONS",
    ()=>ACTION_DEFINITIONS,
    "PHASE_AVAILABLE_ACTIONS",
    ()=>PHASE_AVAILABLE_ACTIONS,
    "getActionById",
    ()=>getActionById,
    "getActionsForPhase",
    ()=>getActionsForPhase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Hotel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Hotel.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$DirectionsWalk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/DirectionsWalk.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$FitnessCenter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/FitnessCenter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$MenuBook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/MenuBook.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Restaurant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Restaurant.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Store.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Handyman$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Handyman.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Groups$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Groups.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Explore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Explore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Work$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Work.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$SelfImprovement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/SelfImprovement.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$LocalLibrary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/LocalLibrary.js [app-client] (ecmascript)");
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
const ACTION_DEFINITIONS = {
    rest: {
        id: "rest",
        name: "Rest",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Hotel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    strolling: {
        id: "strolling",
        name: "Strolling",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$DirectionsWalk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    training: {
        id: "training",
        name: "Training",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$FitnessCenter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        needsSubSelection: true
    },
    studying: {
        id: "studying",
        name: "Studying",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$MenuBook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        needsSubSelection: true
    },
    dining: {
        id: "dining",
        name: "Dining",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Restaurant$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    shopping: {
        id: "shopping",
        name: "Shopping",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    crafting: {
        id: "crafting",
        name: "Crafting",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Handyman$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        needsSubSelection: true
    },
    socializing: {
        id: "socializing",
        name: "Socializing",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Groups$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    exploring: {
        id: "exploring",
        name: "Exploring",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Explore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    working: {
        id: "working",
        name: "Working",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Work$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    meditation: {
        id: "meditation",
        name: "Meditation",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$SelfImprovement$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    research: {
        id: "research",
        name: "Research",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$LocalLibrary$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        needsSubSelection: true
    }
};
const PHASE_AVAILABLE_ACTIONS = {
    0: [
        "rest",
        "training",
        "studying",
        "meditation"
    ],
    1: [
        "strolling",
        "shopping",
        "crafting",
        "working",
        "exploring"
    ],
    2: [
        "dining",
        "socializing",
        "training",
        "research"
    ],
    3: [
        "rest",
        "studying",
        "meditation",
        "research"
    ]
};
function getActionById(id) {
    return ACTION_DEFINITIONS[id] || null;
}
function getActionsForPhase(phase) {
    const actionIds = PHASE_AVAILABLE_ACTIONS[phase] || [];
    return actionIds.map((id)=>ACTION_DEFINITIONS[id]).filter(Boolean);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionSelectionModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionSelectionModal",
    ()=>ActionSelectionModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Dialog/Dialog.js [app-client] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogTitle/DialogTitle.js [app-client] (ecmascript) <export default as DialogTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogContent/DialogContent.js [app-client] (ecmascript) <export default as DialogContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-client] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$config$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/config/actions.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
const PHASE_NAMES = [
    "Morning",
    "Afternoon",
    "Evening",
    "Night"
];
const ActionSelectionModal = ({ open, onClose, day, phase, onActionSelect })=>{
    _s();
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    // Get available actions for this phase (from frontend config)
    const availableActions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$config$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActionsForPhase"])(phase);
    const handleActionClick = (action)=>{
        if (action.needsSubSelection) {
            // TODO: Open sub-selection modal (e.g., training -> select skill)
            console.log(`Action ${action.name} needs sub-selection`);
            onClose();
        } else {
            onActionSelect(action.id);
            onClose();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
        open: open,
        onClose: onClose,
        maxWidth: "sm",
        fullWidth: true,
        PaperProps: {
            sx: {
                borderRadius: 2,
                padding: 3,
                fontFamily: "Crimson Text, serif",
                backgroundColor: theme.palette.background.paper,
                border: `3px solid ${theme.palette.tertiary.main}`,
                boxShadow: `
            0 0 30px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.tertiary.main, 0.3)},
            0 8px 32px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.15)}
          `
            }
        },
        BackdropProps: {
            sx: {
                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#1A1A2E", 0.7),
                backdropFilter: "blur(8px)"
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                sx: {
                    fontFamily: "Cinzel, serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: theme.palette.tertiary.main,
                    textAlign: "center",
                    pb: 2,
                    borderBottom: `2px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.tertiary.main, 0.3)}`
                },
                children: "Select Action"
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionSelectionModal.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                sx: {
                    pt: 3
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        sx: {
                            fontFamily: "Crimson Text, serif",
                            fontSize: "1.1rem",
                            color: theme.palette.text.secondary,
                            textAlign: "center",
                            mb: 3
                        },
                        children: [
                            "Day ",
                            day + 1,
                            " - ",
                            PHASE_NAMES[phase]
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionSelectionModal.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 2
                        },
                        children: availableActions.map((action)=>{
                            const ActionIcon = action.icon;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                onClick: ()=>handleActionClick(action),
                                sx: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    padding: 2.5,
                                    borderRadius: 1.5,
                                    border: `2px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.tertiary.main, 0.3)}`,
                                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3),
                                    cursor: "pointer",
                                    transition: "all 0.2s ease-out",
                                    "&:hover": {
                                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.tertiary.main, 0.15),
                                        border: `2px solid ${theme.palette.tertiary.main}`,
                                        boxShadow: `0 0 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.tertiary.main, 0.3)}`,
                                        transform: "translateX(4px)"
                                    },
                                    "&:active": {
                                        transform: "translateX(2px)"
                                    }
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionIcon, {
                                        sx: {
                                            fontSize: "2rem",
                                            color: theme.palette.tertiary.main
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionSelectionModal.tsx",
                                        lineNumber: 141,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            flex: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                sx: {
                                                    fontFamily: "Crimson Text, serif",
                                                    fontSize: "1.2rem",
                                                    fontWeight: 600,
                                                    color: theme.palette.text.primary
                                                },
                                                children: action.name
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionSelectionModal.tsx",
                                                lineNumber: 148,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            action.needsSubSelection && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                sx: {
                                                    fontFamily: "Crimson Text, serif",
                                                    fontSize: "0.9rem",
                                                    color: theme.palette.text.secondary,
                                                    fontStyle: "italic"
                                                },
                                                children: "(requires selection)"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionSelectionModal.tsx",
                                                lineNumber: 159,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionSelectionModal.tsx",
                                        lineNumber: 147,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, action.id, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionSelectionModal.tsx",
                                lineNumber: 115,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionSelectionModal.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionSelectionModal.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionSelectionModal.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ActionSelectionModal, "VrMvFCCB9Haniz3VCRPNUiCauHs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"]
    ];
});
_c = ActionSelectionModal;
var _c;
__turbopack_context__.k.register(_c, "ActionSelectionModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionScheduleModal",
    ()=>ActionScheduleModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Dialog/Dialog.js [app-client] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogTitle/DialogTitle.js [app-client] (ecmascript) <export default as DialogTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogContent/DialogContent.js [app-client] (ecmascript) <export default as DialogContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogActions/DialogActions.js [app-client] (ecmascript) <export default as DialogActions>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Button/Button.js [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-client] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$WbSunny$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/WbSunny.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$WbTwilight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/WbTwilight.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$NightsStay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/NightsStay.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$WbSunnyTwoTone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/WbSunnyTwoTone.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$DirectionsWalk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/DirectionsWalk.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Train$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Train.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$ActionSelectionModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionSelectionModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$config$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/config/actions.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
const DAYS = [
    "Day 1",
    "Day 2",
    "Day 3",
    "Day 4",
    "Day 5",
    "Day 6"
];
const PHASES = [
    {
        name: "Morning",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$WbSunny$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        color: "#ff9933"
    },
    {
        name: "Afternoon",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$WbSunnyTwoTone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        color: "#ffcc00"
    },
    {
        name: "Evening",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$WbTwilight$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        color: "#9933ff"
    },
    {
        name: "Night",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$NightsStay$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        color: "#0066cc"
    }
];
const ActionScheduleModal = ({ open, onClose, onSave, onTravelClick, onRailTravelClick, hasRailStation = true })=>{
    _s();
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    const [schedule, setSchedule] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [selectionModalOpen, setSelectionModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedSlot, setSelectedSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleCellClick = (day, phase)=>{
        setSelectedSlot({
            day,
            phase
        });
        setSelectionModalOpen(true);
    };
    const handleActionSelect = (actionId)=>{
        if (selectedSlot) {
            const key = `${selectedSlot.day}-${selectedSlot.phase}`;
            setSchedule({
                ...schedule,
                [key]: actionId
            });
        }
    };
    const getActionForSlot = (day, phase)=>{
        const key = `${day}-${phase}`;
        return schedule[key] || null;
    };
    const handleSave = ()=>{
        if (onSave) {
            onSave(schedule);
        }
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
                open: open,
                onClose: onClose,
                maxWidth: "lg",
                fullWidth: true,
                PaperProps: {
                    sx: {
                        borderRadius: 2,
                        padding: 3,
                        fontFamily: "Crimson Text, serif",
                        backgroundColor: theme.palette.background.paper,
                        border: `3px solid ${theme.palette.secondary.main}`,
                        boxShadow: `
              0 0 30px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.3)},
              0 8px 32px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.15)}
            `,
                        minHeight: "80vh"
                    }
                },
                BackdropProps: {
                    sx: {
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#1A1A2E", 0.7),
                        backdropFilter: "blur(8px)"
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                        sx: {
                            fontFamily: "Cinzel, serif",
                            fontSize: "1.75rem",
                            fontWeight: 700,
                            color: theme.palette.secondary.main,
                            textAlign: "center",
                            pb: 2,
                            borderBottom: `2px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.3)}`,
                            mb: 3
                        },
                        children: "Weekly Action Schedule"
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                display: "grid",
                                gridTemplateColumns: "repeat(6, 1fr)",
                                gap: 1
                            },
                            children: [
                                DAYS.map((day, dayIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            textAlign: "center",
                                            padding: 0.75,
                                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.1),
                                            borderRadius: 1,
                                            border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.3)}`
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            sx: {
                                                fontFamily: "Crimson Text, serif",
                                                fontSize: "0.9rem",
                                                fontWeight: 600,
                                                color: theme.palette.secondary.main
                                            },
                                            children: day
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                                            lineNumber: 146,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, `day-header-${dayIndex}`, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                                        lineNumber: 136,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))),
                                PHASES.map((phase, phaseIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                        children: DAYS.map((_, dayIndex)=>{
                                            const PhaseIcon = phase.icon;
                                            const actionId = getActionForSlot(dayIndex, phaseIndex);
                                            const actionDef = actionId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$config$2f$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getActionById"])(actionId) : null;
                                            const ActionIcon = actionDef?.icon || null;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                onClick: ()=>handleCellClick(dayIndex, phaseIndex),
                                                sx: {
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: 0.25,
                                                    padding: 1,
                                                    cursor: "pointer",
                                                    borderRadius: 1.5,
                                                    border: actionDef ? `2px solid ${theme.palette.tertiary.main}` : `2px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.text.disabled, 0.3)}`,
                                                    backgroundColor: actionDef ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.tertiary.main, 0.15) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3),
                                                    transition: "all 0.2s ease-out",
                                                    "&:hover": {
                                                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.tertiary.main, 0.2),
                                                        border: `2px solid ${theme.palette.tertiary.main}`,
                                                        boxShadow: `0 0 12px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.tertiary.main, 0.3)}`,
                                                        transform: "scale(1.05)"
                                                    },
                                                    "&:active": {
                                                        transform: "scale(0.98)"
                                                    },
                                                    height: "13vh"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhaseIcon, {
                                                        sx: {
                                                            fontSize: "1.5rem",
                                                            color: phase.color,
                                                            opacity: 0.8,
                                                            filter: `drop-shadow(0 0 4px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(phase.color, 0.4)})`
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                                                        lineNumber: 203,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    ActionIcon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionIcon, {
                                                        sx: {
                                                            fontSize: "1.8rem",
                                                            color: theme.palette.tertiary.main
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                                                        lineNumber: 214,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        sx: {
                                                            height: "1.8rem"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                                                        lineNumber: 221,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                        sx: {
                                                            fontFamily: "Crimson Text, serif",
                                                            fontSize: "0.7rem",
                                                            color: actionDef ? theme.palette.text.primary : theme.palette.text.secondary,
                                                            textAlign: "center",
                                                            fontWeight: actionDef ? 600 : 400
                                                        },
                                                        children: actionDef ? actionDef.name : "None"
                                                    }, void 0, false, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                                                        lineNumber: 225,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, `cell-${dayIndex}-${phaseIndex}`, true, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                                                lineNumber: 169,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0));
                                        })
                                    }, `phase-${phaseIndex}`, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                                        lineNumber: 161,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__["DialogActions"], {
                        sx: {
                            padding: 3,
                            paddingTop: 2,
                            gap: 2,
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                onClick: onClose,
                                variant: "outlined",
                                sx: {
                                    fontFamily: "Crimson Text, serif",
                                    fontSize: "1.05rem",
                                    textTransform: "none",
                                    px: 3,
                                    color: theme.palette.text.secondary,
                                    border: `2px solid ${theme.palette.text.disabled}`,
                                    "&:hover": {
                                        border: `2px solid ${theme.palette.text.secondary}`
                                    }
                                },
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                                lineNumber: 254,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    display: "flex",
                                    gap: 2
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                        onClick: onTravelClick,
                                        variant: "outlined",
                                        startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$DirectionsWalk$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                                            lineNumber: 277,
                                            columnNumber: 26
                                        }, void 0),
                                        sx: {
                                            fontFamily: "Crimson Text, serif",
                                            fontSize: "1.05rem",
                                            textTransform: "none",
                                            px: 3,
                                            color: theme.palette.primary.main,
                                            border: `2px solid ${theme.palette.primary.main}`,
                                            "&:hover": {
                                                border: `2px solid ${theme.palette.primary.dark}`,
                                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.1)
                                            }
                                        },
                                        children: "Travel"
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                                        lineNumber: 274,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                        onClick: onRailTravelClick,
                                        variant: "outlined",
                                        startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Train$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                                            lineNumber: 296,
                                            columnNumber: 26
                                        }, void 0),
                                        disabled: !hasRailStation,
                                        sx: {
                                            fontFamily: "Crimson Text, serif",
                                            fontSize: "1.05rem",
                                            textTransform: "none",
                                            px: 3,
                                            color: theme.palette.primary.main,
                                            border: `2px solid ${hasRailStation ? theme.palette.primary.main : theme.palette.text.disabled}`,
                                            "&:hover": {
                                                border: `2px solid ${hasRailStation ? theme.palette.primary.dark : theme.palette.text.disabled}`,
                                                backgroundColor: hasRailStation ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.1) : "transparent"
                                            },
                                            "&.Mui-disabled": {
                                                border: `2px solid ${theme.palette.text.disabled}`,
                                                color: theme.palette.text.disabled
                                            }
                                        },
                                        children: "Rail"
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                                        lineNumber: 293,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                                lineNumber: 273,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                onClick: handleSave,
                                variant: "contained",
                                sx: {
                                    fontFamily: "Crimson Text, serif",
                                    fontSize: "1.05rem",
                                    textTransform: "none",
                                    px: 3,
                                    backgroundColor: theme.palette.secondary.main,
                                    "&:hover": {
                                        backgroundColor: theme.palette.secondary.dark
                                    }
                                },
                                children: "Save Schedule"
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                                lineNumber: 319,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                        lineNumber: 244,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            selectedSlot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$ActionSelectionModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionSelectionModal"], {
                open: selectionModalOpen,
                onClose: ()=>setSelectionModalOpen(false),
                day: selectedSlot.day,
                phase: selectedSlot.phase,
                onActionSelect: handleActionSelect
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                lineNumber: 340,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(ActionScheduleModal, "wP46oICUJxCCNwzsEwt7usMhZ5c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"]
    ];
});
_c = ActionScheduleModal;
var _c;
__turbopack_context__.k.register(_c, "ActionScheduleModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EquipmentSlot",
    ()=>EquipmentSlot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Tooltip/Tooltip.js [app-client] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-client] (ecmascript) <export default as useTheme>");
;
var _s = __turbopack_context__.k.signature();
;
const EquipmentSlot = ({ slot, equipment, label, size = "medium" })=>{
    _s();
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    const sizeMap = {
        small: {
            width: 48,
            height: 48,
            fontSize: "0.7rem"
        },
        medium: {
            width: 64,
            height: 64,
            fontSize: "0.85rem"
        },
        large: {
            width: 80,
            height: 80,
            fontSize: "1rem"
        }
    };
    const dimensions = sizeMap[size];
    // Create tooltip content
    const tooltipContent = equipment ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            maxWidth: 300,
            p: 1
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                sx: {
                    fontFamily: "Cinzel, serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    mb: 1
                },
                children: equipment.name
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            equipment.desc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                sx: {
                    fontFamily: "Crimson Text, serif",
                    fontSize: "0.85rem",
                    color: theme.palette.text.secondary,
                    mb: 1.5,
                    whiteSpace: "pre-wrap"
                },
                children: equipment.desc
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            equipment.weaponStats && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    mt: 1.5
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        sx: {
                            fontFamily: "Cinzel, serif",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: theme.palette.secondary.main,
                            mb: 0.5
                        },
                        children: "Weapon Stats"
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.25,
                            fontSize: "0.8rem"
                        },
                        children: [
                            equipment.weaponStats.pDice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                sx: {
                                    fontFamily: "Crimson Text, serif",
                                    fontSize: "0.8rem"
                                },
                                children: [
                                    "Physical Damage: ",
                                    equipment.weaponStats.pDice
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            equipment.weaponStats.mDice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                sx: {
                                    fontFamily: "Crimson Text, serif",
                                    fontSize: "0.8rem"
                                },
                                children: [
                                    "Magical Damage: ",
                                    equipment.weaponStats.mDice
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                                lineNumber: 83,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            equipment.weaponStats.weaponType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                sx: {
                                    fontFamily: "Crimson Text, serif",
                                    fontSize: "0.8rem"
                                },
                                children: [
                                    "Type: ",
                                    equipment.weaponType
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                                lineNumber: 88,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            equipment.weaponStats.handle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                sx: {
                                    fontFamily: "Crimson Text, serif",
                                    fontSize: "0.8rem"
                                },
                                children: [
                                    "Handle: ",
                                    equipment.weaponStats.handle === 1 ? "One-handed" : "Two-handed"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                                lineNumber: 93,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                lineNumber: 64,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            equipment.armorStats && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    mt: 1.5
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        sx: {
                            fontFamily: "Cinzel, serif",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: theme.palette.secondary.main,
                            mb: 0.5
                        },
                        children: "Armor Stats"
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.25,
                            fontSize: "0.8rem"
                        },
                        children: [
                            equipment.armorStats.pDEF !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                sx: {
                                    fontFamily: "Crimson Text, serif",
                                    fontSize: "0.8rem"
                                },
                                children: [
                                    "Physical Defense: +",
                                    equipment.armorStats.pDEF
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                                lineNumber: 117,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            equipment.armorStats.mDEF !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                sx: {
                                    fontFamily: "Crimson Text, serif",
                                    fontSize: "0.8rem"
                                },
                                children: [
                                    "Magical Defense: +",
                                    equipment.armorStats.mDEF
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                                lineNumber: 122,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            equipment.armorStats.dodgeBonus !== undefined && equipment.armorStats.dodgeBonus !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                sx: {
                                    fontFamily: "Crimson Text, serif",
                                    fontSize: "0.8rem"
                                },
                                children: [
                                    "Dodge Bonus: ",
                                    equipment.armorStats.dodgeBonus > 0 ? "+" : "",
                                    equipment.armorStats.dodgeBonus
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                                lineNumber: 127,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                lineNumber: 103,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    mt: 1.5,
                    pt: 1,
                    borderTop: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.text.disabled, 0.2)}`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                    sx: {
                        fontFamily: "Crimson Text, serif",
                        fontSize: "0.75rem",
                        color: theme.palette.text.disabled
                    },
                    children: [
                        "Weight: ",
                        equipment.weight,
                        " | Cost: ",
                        equipment.cost
                    ]
                }, void 0, true, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                title: tooltipContent || `Empty ${label || slot}`,
                arrow: true,
                placement: "top",
                componentsProps: {
                    tooltip: {
                        sx: {
                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.95),
                            border: `2px solid ${theme.palette.secondary.main}`,
                            borderRadius: 2,
                            boxShadow: `0 4px 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.2)}`,
                            maxWidth: 350
                        }
                    },
                    arrow: {
                        sx: {
                            color: theme.palette.secondary.main
                        }
                    }
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        width: dimensions.width,
                        height: dimensions.height,
                        border: equipment ? `2px solid ${theme.palette.primary.main}` : `2px dashed ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.text.disabled, 0.5)}`,
                        borderRadius: 1,
                        backgroundColor: equipment ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.1) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.2),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: equipment ? "pointer" : "default",
                        transition: "all 0.2s ease-out",
                        position: "relative",
                        overflow: "hidden",
                        "&:hover": equipment ? {
                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.2),
                            border: `2px solid ${theme.palette.primary.light}`,
                            boxShadow: `0 0 12px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.4)}`,
                            transform: "scale(1.05)"
                        } : {},
                        // Inner glow for equipped items
                        "&::before": equipment ? {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(135deg, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.1)} 0%, transparent 100%)`,
                            pointerEvents: "none"
                        } : {}
                    },
                    children: equipment ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        sx: {
                            fontFamily: "Crimson Text, serif",
                            fontSize: dimensions.fontSize,
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            textAlign: "center",
                            px: 0.5,
                            lineHeight: 1.2
                        },
                        children: equipment.name.split(" ")[0]
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                        lineNumber: 218,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        sx: {
                            fontFamily: "Crimson Text, serif",
                            fontSize: dimensions.fontSize,
                            color: theme.palette.text.disabled,
                            opacity: 0.5
                        },
                        children: "+"
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                        lineNumber: 232,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                    lineNumber: 174,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                sx: {
                    fontFamily: "Crimson Text, serif",
                    fontSize: "0.75rem",
                    color: theme.palette.text.secondary,
                    textTransform: "capitalize"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                lineNumber: 247,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
        lineNumber: 145,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(EquipmentSlot, "VrMvFCCB9Haniz3VCRPNUiCauHs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"]
    ];
});
_c = EquipmentSlot;
var _c;
__turbopack_context__.k.register(_c, "EquipmentSlot");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CharacterStatsModal",
    ()=>CharacterStatsModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Dialog/Dialog.js [app-client] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogTitle/DialogTitle.js [app-client] (ecmascript) <export default as DialogTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogContent/DialogContent.js [app-client] (ecmascript) <export default as DialogContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Grid/Grid.js [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-client] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Paper/Paper.js [app-client] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/LinearProgress/LinearProgress.js [app-client] (ecmascript) <export default as LinearProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Tooltip/Tooltip.js [app-client] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/IconButton/IconButton.js [app-client] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$HelpOutline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/HelpOutline.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const CharacterStatsModal = ({ open, onClose, character })=>{
    _s();
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    if (!character || !character.name) {
        return null;
    }
    // Organize equipment by slot for easy lookup
    const equipmentBySlot = {};
    if (character.equipment) {
        character.equipment.forEach((eq)=>{
            equipmentBySlot[eq.slot] = eq;
        });
    }
    // Helper function to format stat value
    const formatStat = (stat)=>{
        if (!stat) return "N/A";
        const total = stat.base + stat.bonus;
        if (stat.bonus === 0) {
            return total.toString();
        }
        return `${total} (${stat.base}${stat.bonus > 0 ? "+" : ""}${stat.bonus})`;
    };
    // Helper function to render stat grid
    const renderStatGrid = (stats, columns = 3)=>{
        if (!stats) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
            container: true,
            spacing: 2,
            children: Object.entries(stats).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    item: true,
                    xs: 12 / columns,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            display: "flex",
                            justifyContent: "space-between",
                            padding: 1,
                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3),
                            borderRadius: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                sx: {
                                    fontFamily: "Crimson Text, serif",
                                    fontSize: "0.9rem",
                                    textTransform: "capitalize",
                                    color: theme.palette.text.secondary
                                },
                                children: [
                                    key,
                                    ":"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                lineNumber: 83,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                sx: {
                                    fontFamily: "Cinzel, serif",
                                    fontSize: "0.9rem",
                                    fontWeight: 600,
                                    color: theme.palette.text.primary
                                },
                                children: formatStat(value)
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                lineNumber: 93,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                        lineNumber: 74,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, key, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                    lineNumber: 73,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)))
        }, void 0, false, {
            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
            lineNumber: 71,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    };
    // Helper component for section headers with tooltips
    const SectionHeader = ({ title, tooltip, color })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
            sx: {
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                    sx: {
                        fontFamily: "Cinzel, serif",
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        color: color
                    },
                    children: title
                }, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                    lineNumber: 117,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                    title: tooltip,
                    arrow: true,
                    placement: "right",
                    componentsProps: {
                        tooltip: {
                            sx: {
                                fontFamily: "Crimson Text, serif",
                                fontSize: "0.9rem",
                                maxWidth: 300,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.95),
                                border: `1px solid ${color}`,
                                borderRadius: 1,
                                boxShadow: `0 4px 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.2)}`
                            }
                        },
                        arrow: {
                            sx: {
                                color: color
                            }
                        }
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                        size: "small",
                        sx: {
                            color: color,
                            padding: 0.5,
                            "&:hover": {
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(color, 0.1)
                            }
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$HelpOutline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            sx: {
                                fontSize: "1rem"
                            }
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 160,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                    lineNumber: 127,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
            lineNumber: 116,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0));
    // Helper function to create a tooltip-wrapped label
    const createTooltipLabel = (label, tooltip)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
            title: tooltip,
            arrow: true,
            placement: "top",
            componentsProps: {
                tooltip: {
                    sx: {
                        fontFamily: "Crimson Text, serif",
                        fontSize: "0.85rem",
                        maxWidth: 300,
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.95),
                        border: `1px solid ${theme.palette.secondary.main}`,
                        borderRadius: 1,
                        boxShadow: `0 4px 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.2)}`
                    }
                }
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                sx: {
                    fontFamily: "Crimson Text, serif",
                    fontSize: "0.9rem",
                    color: theme.palette.text.secondary,
                    cursor: "help",
                    textDecoration: "underline",
                    textDecorationStyle: "dotted",
                    textUnderlineOffset: 4,
                    display: "inline-block"
                },
                children: [
                    label,
                    ":"
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
            lineNumber: 168,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
        open: open,
        onClose: onClose,
        maxWidth: "lg",
        fullWidth: true,
        PaperProps: {
            sx: {
                borderRadius: 2,
                padding: 3,
                fontFamily: "Crimson Text, serif",
                backgroundColor: theme.palette.background.paper,
                border: `3px solid ${theme.palette.secondary.main}`,
                boxShadow: `
            0 0 30px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.3)},
            0 8px 32px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.15)}
          `,
                maxHeight: "90vh"
            }
        },
        BackdropProps: {
            sx: {
                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#1A1A2E", 0.7),
                backdropFilter: "blur(8px)"
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                sx: {
                    fontFamily: "Cinzel, serif",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: theme.palette.secondary.main,
                    textAlign: "center",
                    pb: 2,
                    borderBottom: `2px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.3)}`,
                    mb: 3
                },
                children: [
                    character.name,
                    "'s Stats",
                    character.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                        title: "Character title formed from their Epithet (background) and Role (class). Titles reflect the character's identity and can affect how NPCs react to them.",
                        arrow: true,
                        placement: "bottom",
                        componentsProps: {
                            tooltip: {
                                sx: {
                                    fontFamily: "Crimson Text, serif",
                                    fontSize: "0.85rem",
                                    maxWidth: 300,
                                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.95),
                                    border: `1px solid ${theme.palette.secondary.main}`,
                                    borderRadius: 1,
                                    boxShadow: `0 4px 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.2)}`
                                }
                            }
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontFamily: "Crimson Text, serif",
                                fontSize: "1rem",
                                fontWeight: 400,
                                color: theme.palette.text.secondary,
                                mt: 0.5,
                                cursor: "help",
                                textDecoration: "underline",
                                textDecorationStyle: "dotted",
                                textUnderlineOffset: 4,
                                display: "inline-block"
                            },
                            children: character.title
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 262,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                        lineNumber: 244,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                lineNumber: 230,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                sx: {
                    overflowY: "auto",
                    "&::-webkit-scrollbar": {
                        width: "8px"
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.default, 0.5),
                        borderRadius: 1
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.5),
                        borderRadius: 1,
                        "&:hover": {
                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.7)
                        }
                    }
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        display: "flex",
                        flexDirection: "column",
                        gap: 3
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            elevation: 0,
                            sx: {
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.05),
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.2)}`,
                                borderRadius: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                    title: "Basic Information",
                                    tooltip: "Core character identity and background information. This includes level, race, background, gender, and moral alignment that define who the character is.",
                                    color: theme.palette.primary.main
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 312,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                    container: true,
                                    spacing: 2,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            item: true,
                                            xs: 6,
                                            sm: 4,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontFamily: "Crimson Text, serif",
                                                        fontSize: "0.9rem",
                                                        color: theme.palette.text.secondary
                                                    },
                                                    children: "Level:"
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 319,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontFamily: "Cinzel, serif",
                                                        fontSize: "1rem",
                                                        fontWeight: 600
                                                    },
                                                    children: character.level || "N/A"
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 322,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 318,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            item: true,
                                            xs: 6,
                                            sm: 4,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontFamily: "Crimson Text, serif",
                                                        fontSize: "0.9rem",
                                                        color: theme.palette.text.secondary
                                                    },
                                                    children: "Race:"
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 327,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontFamily: "Cinzel, serif",
                                                        fontSize: "1rem",
                                                        fontWeight: 600
                                                    },
                                                    children: character.race || "N/A"
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 330,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 326,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            item: true,
                                            xs: 6,
                                            sm: 4,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontFamily: "Crimson Text, serif",
                                                        fontSize: "0.9rem",
                                                        color: theme.palette.text.secondary
                                                    },
                                                    children: "Background:"
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 335,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontFamily: "Cinzel, serif",
                                                        fontSize: "1rem",
                                                        fontWeight: 600
                                                    },
                                                    children: character.background || "N/A"
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 338,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 334,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            item: true,
                                            xs: 6,
                                            sm: 4,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontFamily: "Crimson Text, serif",
                                                        fontSize: "0.9rem",
                                                        color: theme.palette.text.secondary
                                                    },
                                                    children: "Gender:"
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 343,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontFamily: "Cinzel, serif",
                                                        fontSize: "1rem",
                                                        fontWeight: 600
                                                    },
                                                    children: character.gender || "N/A"
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 346,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 342,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        character.alignment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                    item: true,
                                                    xs: 6,
                                                    sm: 4,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                            children: createTooltipLabel("Good", "Measures the character's virtuous and benevolent nature. Higher values indicate a more altruistic and kind character. Combined with Evil, this determines the character's moral alignment.")
                                                        }, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                            lineNumber: 353,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            sx: {
                                                                fontFamily: "Cinzel, serif",
                                                                fontSize: "1rem",
                                                                fontWeight: 600
                                                            },
                                                            children: character.alignment.good
                                                        }, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                            lineNumber: 359,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 352,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                    item: true,
                                                    xs: 6,
                                                    sm: 4,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                            children: createTooltipLabel("Evil", "Measures the character's malevolent and selfish nature. Higher values indicate a more cruel and destructive character. Combined with Good, this determines the character's moral alignment.")
                                                        }, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                            lineNumber: 364,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            sx: {
                                                                fontFamily: "Cinzel, serif",
                                                                fontSize: "1rem",
                                                                fontWeight: 600
                                                            },
                                                            children: character.alignment.evil
                                                        }, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                            lineNumber: 370,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 363,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 317,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 303,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        character.vitals && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            elevation: 0,
                            sx: {
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.error.main, 0.05),
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.error.main, 0.2)}`,
                                borderRadius: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                    title: "Vitals",
                                    tooltip: "Essential life force values that determine a character's physical and magical capacity. These values change during combat, rest, and activities.",
                                    color: theme.palette.error.main
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 390,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                    container: true,
                                    spacing: 2,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            item: true,
                                            xs: 12,
                                            sm: 4,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        mb: 0.5
                                                    },
                                                    children: createTooltipLabel("Health Points (HP)", "The character's physical health and vitality. When HP reaches 0, the character becomes incapacitated or dies. Rest and healing restore HP.")
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 397,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__["LinearProgress"], {
                                                            variant: "determinate",
                                                            value: character.vitals.hp.current / character.vitals.hp.max * 100,
                                                            sx: {
                                                                flex: 1,
                                                                height: 24,
                                                                borderRadius: 1,
                                                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.error.main, 0.1),
                                                                "& .MuiLinearProgress-bar": {
                                                                    backgroundColor: theme.palette.error.main
                                                                }
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                            lineNumber: 404,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            sx: {
                                                                fontFamily: "Cinzel, serif",
                                                                fontSize: "0.9rem",
                                                                fontWeight: 600,
                                                                minWidth: 60,
                                                                textAlign: "right"
                                                            },
                                                            children: [
                                                                character.vitals.hp.current,
                                                                "/",
                                                                character.vitals.hp.max
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                            lineNumber: 417,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 403,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 396,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            item: true,
                                            xs: 12,
                                            sm: 4,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        mb: 0.5
                                                    },
                                                    children: createTooltipLabel("Mana Points (MP)", "Magical energy used to cast spells and perform magical abilities. MP is consumed when using magic and regenerates over time or through rest.")
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 423,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__["LinearProgress"], {
                                                            variant: "determinate",
                                                            value: character.vitals.mp.current / character.vitals.mp.max * 100,
                                                            sx: {
                                                                flex: 1,
                                                                height: 24,
                                                                borderRadius: 1,
                                                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.info.main, 0.1),
                                                                "& .MuiLinearProgress-bar": {
                                                                    backgroundColor: theme.palette.info.main
                                                                }
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                            lineNumber: 430,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            sx: {
                                                                fontFamily: "Cinzel, serif",
                                                                fontSize: "0.9rem",
                                                                fontWeight: 600,
                                                                minWidth: 60,
                                                                textAlign: "right"
                                                            },
                                                            children: [
                                                                character.vitals.mp.current,
                                                                "/",
                                                                character.vitals.mp.max
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                            lineNumber: 443,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 429,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 422,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            item: true,
                                            xs: 12,
                                            sm: 4,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        mb: 0.5
                                                    },
                                                    children: createTooltipLabel("Stamina Points (SP)", "Physical endurance and energy used for running, dodging, and performing strenuous physical actions. SP depletes during intense activities and recovers during rest.")
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 449,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__["LinearProgress"], {
                                                            variant: "determinate",
                                                            value: character.vitals.sp.current / character.vitals.sp.max * 100,
                                                            sx: {
                                                                flex: 1,
                                                                height: 24,
                                                                borderRadius: 1,
                                                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.warning.main, 0.1),
                                                                "& .MuiLinearProgress-bar": {
                                                                    backgroundColor: theme.palette.warning.main
                                                                }
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                            lineNumber: 456,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            sx: {
                                                                fontFamily: "Cinzel, serif",
                                                                fontSize: "0.9rem",
                                                                fontWeight: 600,
                                                                minWidth: 60,
                                                                textAlign: "right"
                                                            },
                                                            children: [
                                                                character.vitals.sp.current,
                                                                "/",
                                                                character.vitals.sp.max
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                            lineNumber: 469,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 448,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 395,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 381,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        character.needs && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            elevation: 0,
                            sx: {
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.success.main, 0.05),
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.success.main, 0.2)}`,
                                borderRadius: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                    title: "Needs",
                                    tooltip: "Physical and mental needs that affect a character's performance and well-being. These values decrease over time and must be maintained through rest, food, and activities.",
                                    color: theme.palette.success.main
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 489,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                    container: true,
                                    spacing: 2,
                                    children: [
                                        {
                                            key: "mood",
                                            tooltip: "The character's emotional state and happiness. Low mood affects performance and can lead to negative effects."
                                        },
                                        {
                                            key: "energy",
                                            tooltip: "Overall physical and mental energy levels. Low energy reduces effectiveness in all activities and requires rest to recover."
                                        },
                                        {
                                            key: "satiety",
                                            tooltip: "How well-fed and satisfied the character is. Hunger reduces performance and must be maintained through eating food."
                                        }
                                    ].map(({ key, tooltip })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            item: true,
                                            xs: 12,
                                            sm: 4,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        mb: 0.5
                                                    },
                                                    children: createTooltipLabel(key.charAt(0).toUpperCase() + key.slice(1), tooltip)
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 501,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__["LinearProgress"], {
                                                    variant: "determinate",
                                                    value: character.needs?.[key] || 0,
                                                    sx: {
                                                        height: 20,
                                                        borderRadius: 1,
                                                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.success.main, 0.1),
                                                        "& .MuiLinearProgress-bar": {
                                                            backgroundColor: theme.palette.success.main
                                                        }
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 504,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontFamily: "Cinzel, serif",
                                                        fontSize: "0.85rem",
                                                        mt: 0.5,
                                                        textAlign: "center"
                                                    },
                                                    children: [
                                                        character.needs?.[key] || 0,
                                                        "%"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 516,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, key, true, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 500,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 494,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 480,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            elevation: 0,
                            sx: {
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.05),
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.2)}`,
                                borderRadius: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    sx: {
                                        fontFamily: "Cinzel, serif",
                                        fontSize: "1.2rem",
                                        fontWeight: 600,
                                        color: theme.palette.secondary.main,
                                        mb: 2
                                    },
                                    children: "Equipment"
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 535,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        display: "grid",
                                        gridTemplateColumns: "repeat(4, 1fr)",
                                        gap: 2,
                                        maxWidth: 400,
                                        mx: "auto"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "2",
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "headWear",
                                                equipment: equipmentBySlot.headWear,
                                                label: "Head",
                                                size: "medium"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 559,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 558,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "1",
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "earL",
                                                equipment: equipmentBySlot.earL,
                                                label: "Ear L",
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 569,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 568,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "2",
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "neck",
                                                equipment: equipmentBySlot.neck,
                                                label: "Neck",
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 577,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 576,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "3",
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "earR",
                                                equipment: equipmentBySlot.earR,
                                                label: "Ear R",
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 585,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 584,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "1",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "rightHand",
                                                equipment: equipmentBySlot.rightHand,
                                                label: "Right Hand",
                                                size: "medium"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 595,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 594,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "2",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "body",
                                                equipment: equipmentBySlot.body,
                                                label: "Body",
                                                size: "large"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 603,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 602,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "3",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "leftHand",
                                                equipment: equipmentBySlot.leftHand,
                                                label: "Left Hand",
                                                size: "medium"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 611,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 610,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "1",
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "ringL",
                                                equipment: equipmentBySlot.ringL,
                                                label: "Ring L",
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 621,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 620,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "3",
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "ringR",
                                                equipment: equipmentBySlot.ringR,
                                                label: "Ring R",
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 629,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 628,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "2",
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "leg",
                                                equipment: equipmentBySlot.leg,
                                                label: "Legs",
                                                size: "medium"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 639,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 638,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "1",
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "hand",
                                                equipment: equipmentBySlot.hand,
                                                label: "Hands",
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 649,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 648,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "2",
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "foot",
                                                equipment: equipmentBySlot.foot,
                                                label: "Feet",
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 657,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 656,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "3",
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "util",
                                                equipment: equipmentBySlot.util,
                                                label: "Util",
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 665,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 664,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 548,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 526,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        character.attributes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            elevation: 0,
                            sx: {
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.05),
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.2)}`,
                                borderRadius: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                    title: "Attributes",
                                    tooltip: "Core character statistics that determine capabilities in all aspects of the game. These base attributes affect combat effectiveness, skill performance, crafting success, and social interactions. Attributes can be improved through training and leveling up.",
                                    color: theme.palette.primary.main
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 686,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                renderStatGrid(character.attributes, 4)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 677,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        character.battleStats && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            elevation: 0,
                            sx: {
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.error.main, 0.05),
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.error.main, 0.2)}`,
                                borderRadius: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                    title: "Battle Stats",
                                    tooltip: "Combat statistics that determine effectiveness in battle. These values are calculated from attributes, equipment, and skills. Higher values improve combat performance.",
                                    color: theme.palette.error.main
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 706,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                renderStatGrid(character.battleStats, 3)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 697,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        character.elements && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            elevation: 0,
                            sx: {
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.info.main, 0.05),
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.info.main, 0.2)}`,
                                borderRadius: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                    title: "Elemental Affinity",
                                    tooltip: "Resistance and affinity to different elemental forces (Fire, Water, Wind, Earth, Light, Dark). Higher values provide resistance to that element and boost related magical abilities.",
                                    color: theme.palette.info.main
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 726,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                renderStatGrid(character.elements, 3)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 717,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        character.proficiencies && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            elevation: 0,
                            sx: {
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.warning.main, 0.05),
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.warning.main, 0.2)}`,
                                borderRadius: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                    title: "Proficiencies",
                                    tooltip: "Weapon and tool mastery skills. Higher proficiency in a weapon type increases accuracy, damage, and unlocks special techniques. Proficiency improves through training and use.",
                                    color: theme.palette.warning.main
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 746,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                renderStatGrid(character.proficiencies, 4)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 737,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        character.artisans && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            elevation: 0,
                            sx: {
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.success.main, 0.05),
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.success.main, 0.2)}`,
                                borderRadius: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                    title: "Artisan Skills",
                                    tooltip: "Crafting and profession skills for creating items, gathering resources, and performing specialized tasks. Higher skill levels allow crafting better items and accessing new recipes.",
                                    color: theme.palette.success.main
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 766,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                renderStatGrid(character.artisans, 4)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 757,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        character.planarAptitude !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            elevation: 0,
                            sx: {
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.05),
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.2)}`,
                                borderRadius: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                    title: "Planar Aptitude",
                                    tooltip: "The character's natural connection to the planar forces and dimensional energy. Higher aptitude improves magical abilities, allows access to advanced spells, and provides resistance to planar effects. This is an innate ability that can be enhanced through training and special items.",
                                    color: theme.palette.secondary.main
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 786,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__["LinearProgress"], {
                                    variant: "determinate",
                                    value: character.planarAptitude,
                                    sx: {
                                        height: 30,
                                        borderRadius: 2,
                                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.1),
                                        "& .MuiLinearProgress-bar": {
                                            backgroundColor: theme.palette.secondary.main
                                        }
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 791,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    sx: {
                                        fontFamily: "Cinzel, serif",
                                        fontSize: "1rem",
                                        mt: 1,
                                        textAlign: "center"
                                    },
                                    children: [
                                        character.planarAptitude,
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 803,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 777,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                    lineNumber: 301,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                lineNumber: 282,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
        lineNumber: 204,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CharacterStatsModal, "VrMvFCCB9Haniz3VCRPNUiCauHs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"]
    ];
});
_c = CharacterStatsModal;
var _c;
__turbopack_context__.k.register(_c, "CharacterStatsModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameViewIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameViewIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$PartyMemberCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$ActionScheduleModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$ActionSelectionModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionSelectionModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$CharacterStatsModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-client] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$PartyMemberCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$ActionScheduleModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$CharacterStatsModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function GameView({ mockPartyData } = {}) {
    _s();
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [selectedMemberIndex, setSelectedMemberIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [scheduleModalOpen, setScheduleModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [statsModalOpen, setStatsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Use provided mock data, or default mock data, or will be fetched from API later
    const mockParty = mockPartyData || [
        {
            name: "Hero",
            level: 5,
            portrait: null,
            isPlayer: true
        },
        {
            name: "Warrior",
            level: 4,
            portrait: null,
            isPlayer: false
        },
        {
            name: "Mage",
            level: 3,
            portrait: null,
            isPlayer: false
        },
        {
            name: null,
            level: null,
            portrait: null,
            isPlayer: false
        },
        {
            name: null,
            level: null,
            portrait: null,
            isPlayer: false
        },
        {
            name: null,
            level: null,
            portrait: null,
            isPlayer: false
        }
    ];
    const handleScheduleSave = (schedule)=>{
        console.log("Schedule saved:", schedule);
    // TODO: Send schedule to backend
    };
    const handleTravelClick = ()=>{
        console.log("Travel clicked - open travel planning modal");
    // TODO: Open travel planning modal
    };
    const handleRailTravelClick = ()=>{
        console.log("Rail travel clicked - open rail travel modal");
    // TODO: Open rail travel modal
    };
    const handleLogout = ()=>{
        localStorage.removeItem("sessionToken");
        router.push("/login");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            background: "var(--gradient-arcane)",
            backgroundAttachment: "fixed",
            padding: 2,
            gap: 2
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    flex: 1,
                    display: "flex",
                    gap: 2
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GameSidebar"], {
                        onScheduleClick: ()=>setScheduleModalOpen(true),
                        onStatsClick: ()=>setStatsModalOpen(true),
                        onSkillsClick: ()=>console.log("Skills clicked"),
                        onInventoryClick: ()=>console.log("Inventory clicked"),
                        onNewsClick: ()=>console.log("News clicked"),
                        onSettingsClick: ()=>console.log("Settings clicked"),
                        onLogoutClick: handleLogout
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            flex: 1,
                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.9),
                            border: `2px solid ${theme.palette.tertiary?.main || theme.palette.secondary.main}`,
                            borderRadius: 2,
                            padding: 4,
                            boxShadow: `
              0 4px 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.1)},
              inset 0 1px 0 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3)}
            `
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gap: 4,
                                    justifyItems: "center",
                                    mb: 4
                                },
                                children: mockParty.map((member, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$PartyMemberCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PartyMemberCard"], {
                                        portrait: member.portrait || undefined,
                                        name: member.name || undefined,
                                        level: member.level || undefined,
                                        isPlayer: member.isPlayer,
                                        isSelected: selectedMemberIndex === index,
                                        isEmpty: !member.name,
                                        onClick: ()=>setSelectedMemberIndex(index)
                                    }, index, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                                        lineNumber: 111,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    mt: 4,
                                    padding: 3,
                                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3),
                                    borderRadius: 2,
                                    border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.tertiary?.main || theme.palette.secondary.main, 0.3)}`
                                }
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$ActionScheduleModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionScheduleModal"], {
                open: scheduleModalOpen,
                onClose: ()=>setScheduleModalOpen(false),
                onSave: handleScheduleSave,
                onTravelClick: handleTravelClick,
                onRailTravelClick: handleRailTravelClick,
                hasRailStation: true
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$CharacterStatsModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CharacterStatsModal"], {
                open: statsModalOpen,
                onClose: ()=>setStatsModalOpen(false),
                character: mockParty[selectedMemberIndex] || null
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(GameView, "ElCzgPRBsU/VGtq4Jj4/Qdr5mes=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = GameView;
var _c;
__turbopack_context__.k.register(_c, "GameView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=workspace_MyProject_Client_webapp_8fe2f5ef._.js.map