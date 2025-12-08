module.exports = [
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameViewIcon.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GameViewIcon",
    ()=>GameViewIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
;
;
const GameViewIcon = ({ icon: Icon, text, onClick, active = false })=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        onClick: onClick,
        sx: {
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            padding: 2,
            paddingLeft: 2.5,
            cursor: "pointer",
            borderRadius: 1.5,
            border: `2px solid ${active ? theme.palette.primary.main : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.text.disabled, 0.3)}`,
            backgroundColor: active ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.15) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.2),
            transition: "all 0.2s ease-out",
            position: "relative",
            overflow: "hidden",
            // Glow effect
            boxShadow: active ? `
            0 0 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.4)},
            inset 0 1px 0 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3)}
          ` : `inset 0 1px 0 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.2)}`,
            "&:hover": {
                backgroundColor: active ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.25) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.4),
                border: `2px solid ${active ? theme.palette.primary.light : theme.palette.text.secondary}`,
                boxShadow: `
            0 0 20px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(active ? theme.palette.primary.main : theme.palette.text.disabled, 0.3)},
            inset 0 1px 0 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.4)}
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
                background: active ? `linear-gradient(90deg, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.1)} 0%, transparent 100%)` : "transparent",
                pointerEvents: "none"
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                sx: {
                    fontSize: "1.75rem",
                    color: active ? theme.palette.primary.main : theme.palette.text.secondary,
                    filter: active ? `drop-shadow(0 0 8px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.5)})` : "none",
                    transition: "all 0.2s ease-out"
                }
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameViewIcon.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CharacterNeedsBar",
    ()=>CharacterNeedsBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/LinearProgress/LinearProgress.js [app-ssr] (ecmascript) <export default as LinearProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Tooltip/Tooltip.js [app-ssr] (ecmascript) <export default as Tooltip>");
;
;
const CharacterNeedsBar = ({ mood, energy, satiety, compact = false })=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    // Get color based on value (green = good, yellow = medium, red = low)
    const getColor = (value)=>{
        if (value >= 70) return theme.palette.success.main;
        if (value >= 40) return theme.palette.warning.main;
        return theme.palette.error.main;
    };
    // Get label for tooltip
    const getStatusLabel = (value, type)=>{
        if (value >= 70) return `${type}: Good (${value}%)`;
        if (value >= 40) return `${type}: Moderate (${value}%)`;
        return `${type}: Low (${value}%)`;
    };
    if (compact) {
        // Compact horizontal bars
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
            sx: {
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                width: "100%"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                    title: getStatusLabel(mood, "Mood"),
                    arrow: true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                sx: {
                                    fontFamily: "Crimson Text, serif",
                                    fontSize: "0.7rem",
                                    color: theme.palette.text.secondary,
                                    mb: 0.25
                                },
                                children: "Mood"
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__["LinearProgress"], {
                                variant: "determinate",
                                value: mood,
                                sx: {
                                    height: 6,
                                    borderRadius: 1,
                                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.default, 0.3),
                                    "& .MuiLinearProgress-bar": {
                                        backgroundColor: getColor(mood),
                                        borderRadius: 1
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                    title: getStatusLabel(energy, "Energy"),
                    arrow: true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                sx: {
                                    fontFamily: "Crimson Text, serif",
                                    fontSize: "0.7rem",
                                    color: theme.palette.text.secondary,
                                    mb: 0.25
                                },
                                children: "Energy"
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__["LinearProgress"], {
                                variant: "determinate",
                                value: energy,
                                sx: {
                                    height: 6,
                                    borderRadius: 1,
                                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.default, 0.3),
                                    "& .MuiLinearProgress-bar": {
                                        backgroundColor: getColor(energy),
                                        borderRadius: 1
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                    title: getStatusLabel(satiety, "Satiety"),
                    arrow: true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                sx: {
                                    fontFamily: "Crimson Text, serif",
                                    fontSize: "0.7rem",
                                    color: theme.palette.text.secondary,
                                    mb: 0.25
                                },
                                children: "Satiety"
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__["LinearProgress"], {
                                variant: "determinate",
                                value: satiety,
                                sx: {
                                    height: 6,
                                    borderRadius: 1,
                                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.default, 0.3),
                                    "& .MuiLinearProgress-bar": {
                                        backgroundColor: getColor(satiety),
                                        borderRadius: 1
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                                lineNumber: 107,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    // Regular version (for stats modal or larger displays)
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            display: "flex",
            flexDirection: "column",
            gap: 1.5
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                title: getStatusLabel(mood, "Mood"),
                arrow: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 0.5
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    sx: {
                                        fontFamily: "Crimson Text, serif",
                                        fontSize: "0.9rem",
                                        color: theme.palette.text.primary
                                    },
                                    children: "Mood"
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                                    lineNumber: 133,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    sx: {
                                        fontFamily: "Crimson Text, serif",
                                        fontSize: "0.9rem",
                                        fontWeight: 600,
                                        color: getColor(mood)
                                    },
                                    children: [
                                        mood,
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__["LinearProgress"], {
                            variant: "determinate",
                            value: mood,
                            sx: {
                                height: 8,
                                borderRadius: 1,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.default, 0.3),
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: getColor(mood),
                                    borderRadius: 1
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                            lineNumber: 153,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                title: getStatusLabel(energy, "Energy"),
                arrow: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 0.5
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    sx: {
                                        fontFamily: "Crimson Text, serif",
                                        fontSize: "0.9rem",
                                        color: theme.palette.text.primary
                                    },
                                    children: "Energy"
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    sx: {
                                        fontFamily: "Crimson Text, serif",
                                        fontSize: "0.9rem",
                                        fontWeight: 600,
                                        color: getColor(energy)
                                    },
                                    children: [
                                        energy,
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__["LinearProgress"], {
                            variant: "determinate",
                            value: energy,
                            sx: {
                                height: 8,
                                borderRadius: 1,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.default, 0.3),
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: getColor(energy),
                                    borderRadius: 1
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                    lineNumber: 171,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                title: getStatusLabel(satiety, "Satiety"),
                arrow: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 0.5
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    sx: {
                                        fontFamily: "Crimson Text, serif",
                                        fontSize: "0.9rem",
                                        color: theme.palette.text.primary
                                    },
                                    children: "Satiety"
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                                    lineNumber: 213,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    sx: {
                                        fontFamily: "Crimson Text, serif",
                                        fontSize: "0.9rem",
                                        fontWeight: 600,
                                        color: getColor(satiety)
                                    },
                                    children: [
                                        satiety,
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                            lineNumber: 212,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__["LinearProgress"], {
                            variant: "determinate",
                            value: satiety,
                            sx: {
                                height: 8,
                                borderRadius: 1,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.default, 0.3),
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: getColor(satiety),
                                    borderRadius: 1
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                    lineNumber: 211,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionIndicator.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionIndicator",
    ()=>ActionIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Chip/Chip.js [app-ssr] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Tooltip/Tooltip.js [app-ssr] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$PlayArrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/PlayArrow.js [app-ssr] (ecmascript)");
;
;
;
const ActionIndicator = ({ actionName, actionType, isNext = true })=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    // Get color based on action type
    const getActionColor = (type)=>{
        switch(type){
            case "crafting":
                return theme.palette.warning.main;
            case "training":
                return theme.palette.info?.main || theme.palette.secondary.main;
            case "resting":
                return theme.palette.success.main;
            case "traveling":
                return theme.palette.primary.main;
            default:
                return theme.palette.secondary.main;
        }
    };
    if (!actionName) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
        title: isNext ? "Next action to execute" : "Current action",
        arrow: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$PlayArrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    fontSize: "1rem !important"
                }
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionIndicator.tsx",
                lineNumber: 43,
                columnNumber: 15
            }, void 0),
            label: actionName,
            size: "small",
            sx: {
                fontFamily: "Crimson Text, serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                height: 24,
                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(getActionColor(actionType), 0.2),
                color: getActionColor(actionType),
                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(getActionColor(actionType), 0.4)}`,
                "& .MuiChip-icon": {
                    color: getActionColor(actionType)
                },
                "& .MuiChip-label": {
                    padding: "0 8px"
                }
            }
        }, void 0, false, {
            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionIndicator.tsx",
            lineNumber: 42,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionIndicator.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PartyMemberCard",
    ()=>PartyMemberCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Tooltip/Tooltip.js [app-ssr] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$PersonAdd$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/PersonAdd.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$CharacterNeedsBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$ActionIndicator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionIndicator.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
const PartyMemberCard = ({ portrait, name, title, level, isPlayer = false, isSelected = false, isEmpty = false, needs, nextAction, actionType, onClick })=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    // Determine glow color - only player gets special color, others are normal
    const glowColor = isPlayer ? theme.palette.primary.main // Purple for player
     : theme.palette.text.disabled; // Grey for normal (no selected state)
    // Tooltip content with needs and next action
    const tooltipContent = !isEmpty && (needs || nextAction) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            padding: 1,
            minWidth: 200
        },
        children: [
            needs && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    mb: nextAction ? 1.5 : 0
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$CharacterNeedsBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CharacterNeedsBar"], {
                    mood: needs.mood,
                    energy: needs.energy,
                    satiety: needs.satiety,
                    compact: false
                }, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                    lineNumber: 55,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            nextAction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        sx: {
                            fontFamily: "Cinzel, serif",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: theme.palette.text.secondary,
                            mb: 0.5
                        },
                        children: "Next Action:"
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$ActionIndicator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionIndicator"], {
                        actionName: nextAction,
                        actionType: actionType,
                        isNext: true
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                lineNumber: 64,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)) : null;
    const cardContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        onClick: onClick,
        sx: {
            position: "relative",
            width: 80,
            cursor: "pointer",
            transition: "all 0.25s ease-out",
            "&:hover": {
                transform: "translateY(-2px) scale(1.05)"
            },
            "&:active": {
                transform: "translateY(-1px) scale(1.02)"
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    border: isEmpty ? `3px dashed ${theme.palette.text.disabled}` : `3px solid ${glowColor}`,
                    backgroundColor: isEmpty ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3) : theme.palette.background.paper,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    position: "relative",
                    // Glow effect - only player gets strong glow
                    boxShadow: isEmpty ? "none" : isPlayer ? `
              0 0 24px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(glowColor, 0.6)},
              inset 0 2px 4px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.1)}
            ` : `
              0 0 8px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(glowColor, 0.2)},
              inset 0 2px 4px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.1)}
            `,
                    // Inner highlight
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "40%",
                        background: `linear-gradient(180deg, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3)} 0%, transparent 100%)`,
                        borderRadius: "50%",
                        pointerEvents: "none"
                    }
                },
                children: isEmpty ? // Empty slot - show add icon
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$PersonAdd$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    sx: {
                        fontSize: "3rem",
                        color: theme.palette.text.disabled,
                        opacity: 0.5
                    }
                }, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                    lineNumber: 151,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : portrait ? // Character portrait image
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: portrait?.startsWith("/") ? portrait : `/img/portraits/${portrait}.png`,
                        alt: name || "Character",
                        style: {
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                        lineNumber: 170,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                    lineNumber: 160,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : // Fallback - show initials or placeholder
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                    sx: {
                        fontFamily: "Cinzel, serif",
                        fontSize: "1.75rem",
                        fontWeight: 700,
                        color: theme.palette.text.secondary
                    },
                    children: name?.charAt(0) || "?"
                }, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                    lineNumber: 182,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            !isEmpty && name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                sx: {
                    textAlign: "center",
                    fontFamily: "Crimson Text, serif",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: isPlayer ? theme.palette.primary.main : theme.palette.text.primary,
                    mt: 1.5,
                    lineHeight: 1.2,
                    textShadow: isPlayer ? `0 0 6px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.4)}` : "none"
                },
                children: name
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
                lineNumber: 197,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            isEmpty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                lineNumber: 217,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
    // Wrap with tooltip if there's content to show
    if (tooltipContent) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
            title: tooltipContent,
            arrow: true,
            placement: "top",
            componentsProps: {
                tooltip: {
                    sx: {
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.95),
                        border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.divider, 0.3)}`,
                        boxShadow: `0 4px 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.2)}`,
                        maxWidth: 300
                    }
                }
            },
            children: cardContent
        }, void 0, false, {
            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx",
            lineNumber: 237,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return cardContent;
};
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GameSidebar",
    ()=>GameSidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$AutoAwesome$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/AutoAwesome.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Inventory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Inventory.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Article$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Article.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$CalendarMonth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/CalendarMonth.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameViewIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameViewIcon.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
const GameSidebar = ({ onScheduleClick, onSkillsClick, onInventoryClick, onNewsClick })=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    const [activeButton, setActiveButton] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleButtonClick = (buttonName, callback)=>{
        setActiveButton(buttonName);
        if (callback) {
            callback();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            width: 240,
            height: "100%",
            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.9),
            border: `2px solid ${theme.palette.secondary.main}`,
            borderRadius: 2,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            boxShadow: `
          0 4px 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.1)},
          inset 0 1px 0 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3)}
        `
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameViewIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameViewIcon"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$CalendarMonth$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
                text: "Schedule",
                onClick: ()=>handleButtonClick("schedule", onScheduleClick),
                active: activeButton === "schedule"
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    height: 2,
                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.text.disabled, 0.2),
                    my: 1,
                    borderRadius: 1
                }
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameViewIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameViewIcon"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$AutoAwesome$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
                text: "Skills",
                onClick: ()=>handleButtonClick("skills", onSkillsClick),
                active: activeButton === "skills"
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameViewIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameViewIcon"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Inventory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
                text: "Inventory",
                onClick: ()=>handleButtonClick("inventory", onInventoryClick),
                active: activeButton === "inventory"
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    height: 2,
                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.text.disabled, 0.2),
                    my: 1,
                    borderRadius: 1
                }
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameViewIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameViewIcon"], {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Article$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
                text: "News",
                onClick: ()=>handleButtonClick("news", onNewsClick),
                active: activeButton === "news"
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/workspace/MyProject/Client/webapp/src/config/actions.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Hotel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Hotel.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$DirectionsWalk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/DirectionsWalk.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$FitnessCenter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/FitnessCenter.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$MenuBook$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/MenuBook.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Restaurant$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Restaurant.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Store.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Handyman$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Handyman.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Groups$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Groups.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Explore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Explore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Work$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Work.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$SelfImprovement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/SelfImprovement.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$LocalLibrary$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/LocalLibrary.js [app-ssr] (ecmascript)");
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
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Hotel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
    },
    strolling: {
        id: "strolling",
        name: "Strolling",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$DirectionsWalk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
    },
    training: {
        id: "training",
        name: "Training",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$FitnessCenter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        needsSubSelection: true
    },
    studying: {
        id: "studying",
        name: "Studying",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$MenuBook$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        needsSubSelection: true
    },
    dining: {
        id: "dining",
        name: "Dining",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Restaurant$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
    },
    shopping: {
        id: "shopping",
        name: "Shopping",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
    },
    crafting: {
        id: "crafting",
        name: "Crafting",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Handyman$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        needsSubSelection: true
    },
    socializing: {
        id: "socializing",
        name: "Socializing",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Groups$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
    },
    exploring: {
        id: "exploring",
        name: "Exploring",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Explore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
    },
    working: {
        id: "working",
        name: "Working",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Work$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
    },
    meditation: {
        id: "meditation",
        name: "Meditation",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$SelfImprovement$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
    },
    research: {
        id: "research",
        name: "Research",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$LocalLibrary$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
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
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionSelectionModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionSelectionModal",
    ()=>ActionSelectionModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Dialog/Dialog.js [app-ssr] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogTitle/DialogTitle.js [app-ssr] (ecmascript) <export default as DialogTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogContent/DialogContent.js [app-ssr] (ecmascript) <export default as DialogContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$config$2f$actions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/config/actions.ts [app-ssr] (ecmascript)");
;
;
;
const PHASE_NAMES = [
    "Morning",
    "Afternoon",
    "Evening",
    "Night"
];
const ActionSelectionModal = ({ open, onClose, day, phase, onActionSelect })=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    // Get available actions for this phase (from frontend config)
    const availableActions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$config$2f$actions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getActionsForPhase"])(phase);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
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
            0 0 30px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.tertiary.main, 0.3)},
            0 8px 32px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.15)}
          `
            }
        },
        BackdropProps: {
            sx: {
                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#1A1A2E", 0.7),
                backdropFilter: "blur(8px)"
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                sx: {
                    fontFamily: "Cinzel, serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: theme.palette.tertiary.main,
                    textAlign: "center",
                    pb: 2,
                    borderBottom: `2px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.tertiary.main, 0.3)}`
                },
                children: "Select Action"
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionSelectionModal.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                sx: {
                    pt: 3
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 2
                        },
                        children: availableActions.map((action)=>{
                            const ActionIcon = action.icon;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                onClick: ()=>handleActionClick(action),
                                sx: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    padding: 2.5,
                                    borderRadius: 1.5,
                                    border: `2px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.tertiary.main, 0.3)}`,
                                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3),
                                    cursor: "pointer",
                                    transition: "all 0.2s ease-out",
                                    "&:hover": {
                                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.tertiary.main, 0.15),
                                        border: `2px solid ${theme.palette.tertiary.main}`,
                                        boxShadow: `0 0 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.tertiary.main, 0.3)}`,
                                        transform: "translateX(4px)"
                                    },
                                    "&:active": {
                                        transform: "translateX(2px)"
                                    }
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionIcon, {
                                        sx: {
                                            fontSize: "2rem",
                                            color: theme.palette.tertiary.main
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionSelectionModal.tsx",
                                        lineNumber: 141,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            flex: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                                            action.needsSubSelection && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionScheduleModal",
    ()=>ActionScheduleModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Dialog/Dialog.js [app-ssr] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogTitle/DialogTitle.js [app-ssr] (ecmascript) <export default as DialogTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogContent/DialogContent.js [app-ssr] (ecmascript) <export default as DialogContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogActions/DialogActions.js [app-ssr] (ecmascript) <export default as DialogActions>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Button/Button.js [app-ssr] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$WbSunny$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/WbSunny.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$WbTwilight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/WbTwilight.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$NightsStay$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/NightsStay.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$WbSunnyTwoTone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/WbSunnyTwoTone.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$DirectionsWalk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/DirectionsWalk.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Train$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Train.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$ActionSelectionModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionSelectionModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$config$2f$actions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/config/actions.ts [app-ssr] (ecmascript)");
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
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$WbSunny$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        color: "#ff9933"
    },
    {
        name: "Afternoon",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$WbSunnyTwoTone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        color: "#ffcc00"
    },
    {
        name: "Evening",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$WbTwilight$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        color: "#9933ff"
    },
    {
        name: "Night",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$NightsStay$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        color: "#0066cc"
    }
];
const ActionScheduleModal = ({ open, onClose, onSave, onTravelClick, onRailTravelClick, hasRailStation = true })=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    const [schedule, setSchedule] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [selectionModalOpen, setSelectionModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedSlot, setSelectedSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
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
              0 0 30px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.3)},
              0 8px 32px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.15)}
            `,
                        minHeight: "80vh"
                    }
                },
                BackdropProps: {
                    sx: {
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#1A1A2E", 0.7),
                        backdropFilter: "blur(8px)"
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                        sx: {
                            fontFamily: "Cinzel, serif",
                            fontSize: "1.75rem",
                            fontWeight: 700,
                            color: theme.palette.secondary.main,
                            textAlign: "center",
                            pb: 2,
                            borderBottom: `2px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.3)}`,
                            mb: 3
                        },
                        children: "Weekly Action Schedule"
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                display: "grid",
                                gridTemplateColumns: "repeat(6, 1fr)",
                                gap: 1
                            },
                            children: [
                                DAYS.map((day, dayIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            textAlign: "center",
                                            padding: 0.75,
                                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.1),
                                            borderRadius: 1,
                                            border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.3)}`
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                                PHASES.map((phase, phaseIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                        children: DAYS.map((_, dayIndex)=>{
                                            const PhaseIcon = phase.icon;
                                            const actionId = getActionForSlot(dayIndex, phaseIndex);
                                            const actionDef = actionId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$config$2f$actions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getActionById"])(actionId) : null;
                                            const ActionIcon = actionDef?.icon || null;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
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
                                                    border: actionDef ? `2px solid ${theme.palette.tertiary.main}` : `2px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.text.disabled, 0.3)}`,
                                                    backgroundColor: actionDef ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.tertiary.main, 0.15) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3),
                                                    transition: "all 0.2s ease-out",
                                                    "&:hover": {
                                                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.tertiary.main, 0.2),
                                                        border: `2px solid ${theme.palette.tertiary.main}`,
                                                        boxShadow: `0 0 12px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.tertiary.main, 0.3)}`,
                                                        transform: "scale(1.05)"
                                                    },
                                                    "&:active": {
                                                        transform: "scale(0.98)"
                                                    },
                                                    height: "13vh"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PhaseIcon, {
                                                        sx: {
                                                            fontSize: "1.5rem",
                                                            color: phase.color,
                                                            opacity: 0.8,
                                                            filter: `drop-shadow(0 0 4px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(phase.color, 0.4)})`
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                                                        lineNumber: 203,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    ActionIcon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionIcon, {
                                                        sx: {
                                                            fontSize: "1.8rem",
                                                            color: theme.palette.tertiary.main
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                                                        lineNumber: 214,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                        sx: {
                                                            height: "1.8rem"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                                                        lineNumber: 221,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__["DialogActions"], {
                        sx: {
                            padding: 3,
                            paddingTop: 2,
                            gap: 2,
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    display: "flex",
                                    gap: 2
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                        onClick: onTravelClick,
                                        variant: "outlined",
                                        startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$DirectionsWalk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
                                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.1)
                                            }
                                        },
                                        children: "Travel"
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx",
                                        lineNumber: 274,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                        onClick: onRailTravelClick,
                                        variant: "outlined",
                                        startIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Train$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
                                                backgroundColor: hasRailStation ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.1) : "transparent"
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
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
            selectedSlot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$ActionSelectionModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionSelectionModal"], {
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
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EquipmentSlot",
    ()=>EquipmentSlot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Tooltip/Tooltip.js [app-ssr] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
;
;
const EquipmentSlot = ({ slot, equipment, label, size = "medium" })=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
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
    const tooltipContent = equipment ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            maxWidth: 300,
            p: 1
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                sx: {
                    fontFamily: "Cinzel, serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    mb: 1
                },
                children: equipment.name || equipment.itemId || equipment.id || "Unknown Item"
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            (equipment.description || equipment.desc) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                sx: {
                    fontFamily: "Crimson Text, serif",
                    fontSize: "0.85rem",
                    color: theme.palette.text.secondary,
                    mb: 1.5,
                    whiteSpace: "pre-wrap"
                },
                children: equipment.description || equipment.desc
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                lineNumber: 50,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            equipment.weaponStats && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    mt: 1.5
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                        lineNumber: 66,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.25,
                            fontSize: "0.8rem"
                        },
                        children: [
                            equipment.weaponStats.pDice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                                lineNumber: 79,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            equipment.weaponStats.mDice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                                lineNumber: 84,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            equipment.weaponStats.weaponType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                                lineNumber: 89,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            equipment.weaponStats.handle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                                lineNumber: 94,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                lineNumber: 65,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            equipment.armorStats && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    mt: 1.5
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                        lineNumber: 105,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.25,
                            fontSize: "0.8rem"
                        },
                        children: [
                            equipment.armorStats.pDEF !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                                lineNumber: 118,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            equipment.armorStats.mDEF !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                                lineNumber: 123,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            equipment.armorStats.dodgeBonus !== undefined && equipment.armorStats.dodgeBonus !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                                lineNumber: 128,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                lineNumber: 104,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    mt: 1.5,
                    pt: 1,
                    borderTop: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.text.disabled, 0.2)}`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                    lineNumber: 138,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                title: tooltipContent || `Empty ${label || slot}`,
                arrow: true,
                placement: "top",
                componentsProps: {
                    tooltip: {
                        sx: {
                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.95),
                            border: `2px solid ${theme.palette.secondary.main}`,
                            borderRadius: 2,
                            boxShadow: `0 4px 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.2)}`,
                            maxWidth: 350
                        }
                    },
                    arrow: {
                        sx: {
                            color: theme.palette.secondary.main
                        }
                    }
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        width: dimensions.width,
                        height: dimensions.height,
                        border: equipment ? `2px solid ${theme.palette.primary.main}` : `2px dashed ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.text.disabled, 0.5)}`,
                        borderRadius: 1,
                        backgroundColor: equipment ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.1) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.2),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: equipment ? "pointer" : "default",
                        transition: "all 0.2s ease-out",
                        position: "relative",
                        overflow: "hidden",
                        "&:hover": equipment ? {
                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.2),
                            border: `2px solid ${theme.palette.primary.light}`,
                            boxShadow: `0 0 12px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.4)}`,
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
                            background: `linear-gradient(135deg, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.1)} 0%, transparent 100%)`,
                            pointerEvents: "none"
                        } : {}
                    },
                    children: equipment ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        sx: {
                            fontFamily: "Crimson Text, serif",
                            fontSize: dimensions.fontSize,
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            textAlign: "center",
                            px: 0.5,
                            lineHeight: 1.2
                        },
                        children: (equipment.name || equipment.itemId || equipment.id || "Item")?.split(" ")[0]
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                        lineNumber: 219,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        sx: {
                            fontFamily: "Crimson Text, serif",
                            fontSize: dimensions.fontSize,
                            color: theme.palette.text.disabled,
                            opacity: 0.5
                        },
                        children: "+"
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                        lineNumber: 233,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                    lineNumber: 175,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                sx: {
                    fontFamily: "Crimson Text, serif",
                    fontSize: "0.75rem",
                    color: theme.palette.text.secondary,
                    textTransform: "capitalize"
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
                lineNumber: 248,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CharacterStatsModal",
    ()=>CharacterStatsModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Dialog/Dialog.js [app-ssr] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogTitle/DialogTitle.js [app-ssr] (ecmascript) <export default as DialogTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogContent/DialogContent.js [app-ssr] (ecmascript) <export default as DialogContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Grid/Grid.js [app-ssr] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Paper/Paper.js [app-ssr] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/LinearProgress/LinearProgress.js [app-ssr] (ecmascript) <export default as LinearProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Tooltip/Tooltip.js [app-ssr] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/IconButton/IconButton.js [app-ssr] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$HelpOutline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/HelpOutline.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const CharacterStatsModal = ({ open, onClose, character })=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    if (!character || !character.name) {
        return null;
    }
    // Organize equipment by slot for easy lookup
    // Handle both array format (EquipmentDisplay[]) and object format (Record<slot, ItemId>)
    const equipmentBySlot = {};
    if (character.equipment) {
        if (Array.isArray(character.equipment)) {
            // Array format: EquipmentDisplay[]
            character.equipment.forEach((eq)=>{
                equipmentBySlot[eq.slot] = eq;
            });
        } else {
            // Object format: Record<CharacterEquipmentSlot, ItemId>
            // Convert to EquipmentDisplay format (just ItemId for now, will be resolved later)
            Object.entries(character.equipment).forEach(([slot, itemId])=>{
                equipmentBySlot[slot] = {
                    slot,
                    itemId: itemId,
                    id: itemId
                };
            });
        }
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
            container: true,
            spacing: 2,
            children: Object.entries(stats).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                    item: true,
                    xs: 12 / columns,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            display: "flex",
                            justifyContent: "space-between",
                            padding: 1,
                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3),
                            borderRadius: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                                lineNumber: 96,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                sx: {
                                    fontFamily: "Cinzel, serif",
                                    fontSize: "0.9rem",
                                    fontWeight: 600,
                                    color: theme.palette.text.primary
                                },
                                children: formatStat(value)
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                lineNumber: 106,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                        lineNumber: 87,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, key, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                    lineNumber: 86,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)))
        }, void 0, false, {
            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
            lineNumber: 84,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    };
    // Helper component for section headers with tooltips
    const SectionHeader = ({ title, tooltip, color })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
            sx: {
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                    sx: {
                        fontFamily: "Cinzel, serif",
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        color: color
                    },
                    children: title
                }, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                    lineNumber: 130,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                    title: tooltip,
                    arrow: true,
                    placement: "right",
                    componentsProps: {
                        tooltip: {
                            sx: {
                                fontFamily: "Crimson Text, serif",
                                fontSize: "0.9rem",
                                maxWidth: 300,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.95),
                                border: `1px solid ${color}`,
                                borderRadius: 1,
                                boxShadow: `0 4px 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.2)}`
                            }
                        },
                        arrow: {
                            sx: {
                                color: color
                            }
                        }
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                        size: "small",
                        sx: {
                            color: color,
                            padding: 0.5,
                            "&:hover": {
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(color, 0.1)
                            }
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$HelpOutline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            sx: {
                                fontSize: "1rem"
                            }
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 173,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                    lineNumber: 140,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
            lineNumber: 129,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0));
    // Helper function to create a tooltip-wrapped label
    const createTooltipLabel = (label, tooltip)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
            title: tooltip,
            arrow: true,
            placement: "top",
            componentsProps: {
                tooltip: {
                    sx: {
                        fontFamily: "Crimson Text, serif",
                        fontSize: "0.85rem",
                        maxWidth: 300,
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.95),
                        border: `1px solid ${theme.palette.secondary.main}`,
                        borderRadius: 1,
                        boxShadow: `0 4px 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.2)}`
                    }
                }
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                lineNumber: 199,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
            lineNumber: 181,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
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
            0 0 30px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.3)},
            0 8px 32px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.15)}
          `,
                maxHeight: "90vh"
            }
        },
        BackdropProps: {
            sx: {
                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#1A1A2E", 0.7),
                backdropFilter: "blur(8px)"
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                sx: {
                    fontFamily: "Cinzel, serif",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: theme.palette.secondary.main,
                    textAlign: "center",
                    pb: 2,
                    borderBottom: `2px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.3)}`,
                    mb: 3
                },
                children: [
                    character.name,
                    "'s Stats",
                    character.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                        title: "Character title formed from their Epithet (background) and Role (class). Titles reflect the character's identity and can affect how NPCs react to them.",
                        arrow: true,
                        placement: "bottom",
                        componentsProps: {
                            tooltip: {
                                sx: {
                                    fontFamily: "Crimson Text, serif",
                                    fontSize: "0.85rem",
                                    maxWidth: 300,
                                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.95),
                                    border: `1px solid ${theme.palette.secondary.main}`,
                                    borderRadius: 1,
                                    boxShadow: `0 4px 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.2)}`
                                }
                            }
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                            lineNumber: 275,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                        lineNumber: 257,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                lineNumber: 243,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                sx: {
                    overflowY: "auto",
                    "&::-webkit-scrollbar": {
                        width: "8px"
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.default, 0.5),
                        borderRadius: 1
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.5),
                        borderRadius: 1,
                        "&:hover": {
                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.7)
                        }
                    }
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        display: "flex",
                        flexDirection: "column",
                        gap: 3
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            elevation: 0,
                            sx: {
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.05),
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.2)}`,
                                borderRadius: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                    title: "Basic Information",
                                    tooltip: "Core character identity and background information. This includes level, race, background, gender, and moral alignment that define who the character is.",
                                    color: theme.palette.primary.main
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 325,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                    container: true,
                                    spacing: 2,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            item: true,
                                            xs: 6,
                                            sm: 4,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontFamily: "Crimson Text, serif",
                                                        fontSize: "0.9rem",
                                                        color: theme.palette.text.secondary
                                                    },
                                                    children: "Level:"
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 332,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontFamily: "Cinzel, serif",
                                                        fontSize: "1rem",
                                                        fontWeight: 600
                                                    },
                                                    children: character.level || "N/A"
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 335,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 331,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            item: true,
                                            xs: 6,
                                            sm: 4,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontFamily: "Crimson Text, serif",
                                                        fontSize: "0.9rem",
                                                        color: theme.palette.text.secondary
                                                    },
                                                    children: "Race:"
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 340,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontFamily: "Cinzel, serif",
                                                        fontSize: "1rem",
                                                        fontWeight: 600
                                                    },
                                                    children: character.race || "N/A"
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 343,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 339,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            item: true,
                                            xs: 6,
                                            sm: 4,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontFamily: "Crimson Text, serif",
                                                        fontSize: "0.9rem",
                                                        color: theme.palette.text.secondary
                                                    },
                                                    children: "Background:"
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 348,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontFamily: "Cinzel, serif",
                                                        fontSize: "1rem",
                                                        fontWeight: 600
                                                    },
                                                    children: character.background || "N/A"
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 351,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 347,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            item: true,
                                            xs: 6,
                                            sm: 4,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontFamily: "Crimson Text, serif",
                                                        fontSize: "0.9rem",
                                                        color: theme.palette.text.secondary
                                                    },
                                                    children: "Gender:"
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontFamily: "Cinzel, serif",
                                                        fontSize: "1rem",
                                                        fontWeight: 600
                                                    },
                                                    children: character.gender || "N/A"
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 359,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 355,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        character.alignment && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                    item: true,
                                                    xs: 6,
                                                    sm: 4,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                            children: createTooltipLabel("Good", "Measures the character's virtuous and benevolent nature. Higher values indicate a more altruistic and kind character. Combined with Evil, this determines the character's moral alignment.")
                                                        }, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                            lineNumber: 366,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            sx: {
                                                                fontFamily: "Cinzel, serif",
                                                                fontSize: "1rem",
                                                                fontWeight: 600
                                                            },
                                                            children: character.alignment.good
                                                        }, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                            lineNumber: 372,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 365,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                                    item: true,
                                                    xs: 6,
                                                    sm: 4,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                            children: createTooltipLabel("Evil", "Measures the character's malevolent and selfish nature. Higher values indicate a more cruel and destructive character. Combined with Good, this determines the character's moral alignment.")
                                                        }, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                            lineNumber: 377,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            sx: {
                                                                fontFamily: "Cinzel, serif",
                                                                fontSize: "1rem",
                                                                fontWeight: 600
                                                            },
                                                            children: character.alignment.evil
                                                        }, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                            lineNumber: 383,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 376,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 330,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 316,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        character.vitals && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            elevation: 0,
                            sx: {
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.error.main, 0.05),
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.error.main, 0.2)}`,
                                borderRadius: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                    title: "Vitals",
                                    tooltip: "Essential life force values that determine a character's physical and magical capacity. These values change during combat, rest, and activities.",
                                    color: theme.palette.error.main
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 403,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                    container: true,
                                    spacing: 2,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            item: true,
                                            xs: 12,
                                            sm: 4,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        mb: 0.5
                                                    },
                                                    children: createTooltipLabel("Health Points (HP)", "The character's physical health and vitality. When HP reaches 0, the character becomes incapacitated or dies. Rest and healing restore HP.")
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 410,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__["LinearProgress"], {
                                                            variant: "determinate",
                                                            value: character.vitals.hp.current / character.vitals.hp.max * 100,
                                                            sx: {
                                                                flex: 1,
                                                                height: 24,
                                                                borderRadius: 1,
                                                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.error.main, 0.1),
                                                                "& .MuiLinearProgress-bar": {
                                                                    backgroundColor: theme.palette.error.main
                                                                }
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                            lineNumber: 417,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                                                            lineNumber: 430,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 416,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 409,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            item: true,
                                            xs: 12,
                                            sm: 4,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        mb: 0.5
                                                    },
                                                    children: createTooltipLabel("Mana Points (MP)", "Magical energy used to cast spells and perform magical abilities. MP is consumed when using magic and regenerates over time or through rest.")
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 436,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__["LinearProgress"], {
                                                            variant: "determinate",
                                                            value: character.vitals.mp.current / character.vitals.mp.max * 100,
                                                            sx: {
                                                                flex: 1,
                                                                height: 24,
                                                                borderRadius: 1,
                                                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.info.main, 0.1),
                                                                "& .MuiLinearProgress-bar": {
                                                                    backgroundColor: theme.palette.info.main
                                                                }
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                            lineNumber: 443,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                                                            lineNumber: 456,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 442,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 435,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            item: true,
                                            xs: 12,
                                            sm: 4,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        mb: 0.5
                                                    },
                                                    children: createTooltipLabel("Stamina Points (SP)", "Physical endurance and energy used for running, dodging, and performing strenuous physical actions. SP depletes during intense activities and recovers during rest.")
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 462,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__["LinearProgress"], {
                                                            variant: "determinate",
                                                            value: character.vitals.sp.current / character.vitals.sp.max * 100,
                                                            sx: {
                                                                flex: 1,
                                                                height: 24,
                                                                borderRadius: 1,
                                                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.warning.main, 0.1),
                                                                "& .MuiLinearProgress-bar": {
                                                                    backgroundColor: theme.palette.warning.main
                                                                }
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                            lineNumber: 469,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                                                            lineNumber: 482,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 468,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 461,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 408,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 394,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        character.needs && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            elevation: 0,
                            sx: {
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.success.main, 0.05),
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.success.main, 0.2)}`,
                                borderRadius: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                    title: "Needs",
                                    tooltip: "Physical and mental needs that affect a character's performance and well-being. These values decrease over time and must be maintained through rest, food, and activities.",
                                    color: theme.palette.success.main
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 502,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
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
                                    ].map(({ key, tooltip })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Grid$2f$Grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                                            item: true,
                                            xs: 12,
                                            sm: 4,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        mb: 0.5
                                                    },
                                                    children: createTooltipLabel(key.charAt(0).toUpperCase() + key.slice(1), tooltip)
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 514,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__["LinearProgress"], {
                                                    variant: "determinate",
                                                    value: character.needs?.[key] || 0,
                                                    sx: {
                                                        height: 20,
                                                        borderRadius: 1,
                                                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.success.main, 0.1),
                                                        "& .MuiLinearProgress-bar": {
                                                            backgroundColor: theme.palette.success.main
                                                        }
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                    lineNumber: 517,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                                                    lineNumber: 529,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, key, true, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 513,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 507,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 493,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            elevation: 0,
                            sx: {
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.05),
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.2)}`,
                                borderRadius: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                                    lineNumber: 548,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        display: "grid",
                                        gridTemplateColumns: "repeat(4, 1fr)",
                                        gap: 2,
                                        maxWidth: 400,
                                        mx: "auto"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "2",
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "headWear",
                                                equipment: equipmentBySlot.headWear,
                                                label: "Head",
                                                size: "medium"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 572,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 571,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "1",
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "earL",
                                                equipment: equipmentBySlot.earL,
                                                label: "Ear L",
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 582,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 581,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "2",
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "neck",
                                                equipment: equipmentBySlot.neck,
                                                label: "Neck",
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 590,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 589,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "3",
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "earR",
                                                equipment: equipmentBySlot.earR,
                                                label: "Ear R",
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 598,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 597,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "1",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "rightHand",
                                                equipment: equipmentBySlot.rightHand,
                                                label: "Right Hand",
                                                size: "medium"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 608,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 607,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "2",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "body",
                                                equipment: equipmentBySlot.body,
                                                label: "Body",
                                                size: "large"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 616,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 615,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "3",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "leftHand",
                                                equipment: equipmentBySlot.leftHand,
                                                label: "Left Hand",
                                                size: "medium"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 624,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 623,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "1",
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "ringL",
                                                equipment: equipmentBySlot.ringL,
                                                label: "Ring L",
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 634,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 633,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "3",
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "ringR",
                                                equipment: equipmentBySlot.ringR,
                                                label: "Ring R",
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 642,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 641,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "2",
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "leg",
                                                equipment: equipmentBySlot.leg,
                                                label: "Legs",
                                                size: "medium"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 652,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 651,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "1",
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "hand",
                                                equipment: equipmentBySlot.hand,
                                                label: "Hands",
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 662,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 661,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "2",
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "foot",
                                                equipment: equipmentBySlot.foot,
                                                label: "Feet",
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 670,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 669,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                gridColumn: "3",
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EquipmentSlot"], {
                                                slot: "util",
                                                equipment: equipmentBySlot.util,
                                                label: "Util",
                                                size: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                                lineNumber: 678,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                            lineNumber: 677,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 561,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 539,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        character.attributes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            elevation: 0,
                            sx: {
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.05),
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.2)}`,
                                borderRadius: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                    title: "Attributes",
                                    tooltip: "Core character statistics that determine capabilities in all aspects of the game. These base attributes affect combat effectiveness, skill performance, crafting success, and social interactions. Attributes can be improved through training and leveling up.",
                                    color: theme.palette.primary.main
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 699,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                renderStatGrid(character.attributes, 4)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 690,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        character.battleStats && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            elevation: 0,
                            sx: {
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.error.main, 0.05),
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.error.main, 0.2)}`,
                                borderRadius: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                    title: "Battle Stats",
                                    tooltip: "Combat statistics that determine effectiveness in battle. These values are calculated from attributes, equipment, and skills. Higher values improve combat performance.",
                                    color: theme.palette.error.main
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 719,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                renderStatGrid(character.battleStats, 3)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 710,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        character.elements && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            elevation: 0,
                            sx: {
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.info.main, 0.05),
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.info.main, 0.2)}`,
                                borderRadius: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                    title: "Elemental Affinity",
                                    tooltip: "Resistance and affinity to different elemental forces (Fire, Water, Wind, Earth, Light, Dark). Higher values provide resistance to that element and boost related magical abilities.",
                                    color: theme.palette.info.main
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 739,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                renderStatGrid(character.elements, 3)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 730,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        character.proficiencies && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            elevation: 0,
                            sx: {
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.warning.main, 0.05),
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.warning.main, 0.2)}`,
                                borderRadius: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                    title: "Proficiencies",
                                    tooltip: "Weapon and tool mastery skills. Higher proficiency in a weapon type increases accuracy, damage, and unlocks special techniques. Proficiency improves through training and use.",
                                    color: theme.palette.warning.main
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 759,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                renderStatGrid(character.proficiencies, 4)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 750,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        character.artisans && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            elevation: 0,
                            sx: {
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.success.main, 0.05),
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.success.main, 0.2)}`,
                                borderRadius: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                    title: "Artisan Skills",
                                    tooltip: "Crafting and profession skills for creating items, gathering resources, and performing specialized tasks. Higher skill levels allow crafting better items and accessing new recipes.",
                                    color: theme.palette.success.main
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 779,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                renderStatGrid(character.artisans, 4)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 770,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        character.planarAptitude !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"], {
                            elevation: 0,
                            sx: {
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.05),
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.2)}`,
                                borderRadius: 2
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                    title: "Planar Aptitude",
                                    tooltip: "The character's natural connection to the planar forces and dimensional energy. Higher aptitude improves magical abilities, allows access to advanced spells, and provides resistance to planar effects. This is an innate ability that can be enhanced through training and special items.",
                                    color: theme.palette.secondary.main
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 799,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$LinearProgress$2f$LinearProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LinearProgress$3e$__["LinearProgress"], {
                                    variant: "determinate",
                                    value: character.planarAptitude,
                                    sx: {
                                        height: 30,
                                        borderRadius: 2,
                                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.1),
                                        "& .MuiLinearProgress-bar": {
                                            backgroundColor: theme.palette.secondary.main
                                        }
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                                    lineNumber: 804,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
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
                                    lineNumber: 816,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                            lineNumber: 790,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                    lineNumber: 314,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
                lineNumber: 295,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx",
        lineNumber: 217,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/workspace/MyProject/Client/webapp/src/data/mockNewsData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Mock news data for UI development
 * 
 * This matches the backend News interface structure
 * In production, news will come from backend News interface
 */ // NewsScope types matching backend
__turbopack_context__.s([
    "NewsPropagation",
    ()=>NewsPropagation,
    "NewsSignificance",
    ()=>NewsSignificance,
    "getNewsContentText",
    ()=>getNewsContentText,
    "getNewsScopeLabel",
    ()=>getNewsScopeLabel,
    "mockNews",
    ()=>mockNews
]);
var NewsSignificance = /*#__PURE__*/ function(NewsSignificance) {
    NewsSignificance["TRIVIAL"] = "trivial";
    NewsSignificance["MINOR"] = "minor";
    NewsSignificance["NOTABLE"] = "notable";
    NewsSignificance["MAJOR"] = "major";
    NewsSignificance["MOMENTOUS"] = "momentous";
    return NewsSignificance;
}({});
var NewsPropagation = /*#__PURE__*/ function(NewsPropagation) {
    NewsPropagation["SECRET"] = "secret";
    NewsPropagation["PRIVATE"] = "private";
    NewsPropagation["LOCAL"] = "local";
    NewsPropagation["REGIONAL"] = "regional";
    NewsPropagation["CONTINENTAL"] = "continental";
    NewsPropagation["GLOBAL"] = "global";
    return NewsPropagation;
}({});
function getNewsScopeLabel(scope) {
    switch(scope.kind){
        case "worldScope":
            return "Global";
        case "regionScope":
            return "Region";
        case "subRegionScope":
            return "Sub-Region";
        case "locationScope":
            return "Location";
        case "partyScope":
            return "Party";
        case "privateScope":
            return "Personal";
        case "none":
            return "None";
        default:
            return "Unknown";
    }
}
function getNewsContentText(content, language = "en") {
    return language === "th" && content.th ? content.th : content.en;
}
const mockNews = [
    {
        id: "news-001",
        ts: {
            hour: 1,
            dayOfWeek: 1,
            dayOfSeason: 1,
            season: 1,
            dayPassed: 1,
            year: 1
        },
        scope: {
            kind: "worldScope"
        },
        content: {
            en: "Nothing happen",
            th: "ไม่มีอะไรเกิดขึ้น"
        },
        context: {
            region: "Central",
            subRegion: "Capital",
            location: "WaywardInn",
            partyId: "party-001",
            characterIds: []
        },
        significance: "trivial",
        propagation: "local"
    },
    {
        id: "news-005",
        ts: {
            hour: 4,
            dayOfWeek: 1,
            dayOfSeason: 1,
            season: 1,
            dayPassed: 1,
            year: 1
        },
        scope: {
            kind: "privateScope",
            characterId: "luna"
        },
        content: {
            en: "[char:luna]Luna[/char] discovered a hidden treasure chest in the forest",
            th: "[char:luna]ลูน่า[/char] ค้นพบหีบสมบัติที่ซ่อนอยู่ในป่า",
            entities: {
                chars: {
                    luna: {
                        name: {
                            en: "Luna",
                            th: "ลูน่า"
                        },
                        level: 2,
                        title: {
                            en: "Warrior",
                            th: "นักรบ"
                        },
                        portraitUrl: "f_human01"
                    }
                }
            }
        },
        context: {
            region: "Central",
            subRegion: "Capital",
            location: "WaywardInn",
            partyId: "party-001",
            characterIds: [
                "luna"
            ]
        },
        significance: "notable",
        propagation: "secret"
    },
    {
        id: "news-006",
        ts: {
            hour: 1,
            dayOfWeek: 3,
            dayOfSeason: 3,
            season: 1,
            dayPassed: 3,
            year: 1
        },
        scope: {
            kind: "partyScope",
            partyId: "party-001"
        },
        content: {
            en: "The party encountered a group of bandits on the road",
            th: "ปาร์ตี้พบกลุ่มโจรบนถนน"
        },
        context: {
            region: "Central",
            subRegion: "Capital",
            location: "WaywardInn",
            partyId: "party-001",
            characterIds: []
        },
        significance: "notable",
        propagation: "local"
    },
    {
        id: "news-007",
        ts: {
            hour: 2,
            dayOfWeek: 3,
            dayOfSeason: 3,
            season: 1,
            dayPassed: 3,
            year: 1
        },
        scope: {
            kind: "locationScope",
            location: "WaywardInn"
        },
        content: {
            en: "A merchant caravan arrived at [loc:WaywardInn]Wayward Inn[/loc] with rare goods",
            th: "กองคาราวานพ่อค้ามาถึง [loc:WaywardInn]โรงแรมเวย์เวิร์ด[/loc] พร้อมสินค้าหายาก",
            entities: {
                locs: {
                    WaywardInn: {
                        name: {
                            en: "Wayward Inn",
                            th: "โรงแรมเวย์เวิร์ด"
                        },
                        description: {
                            en: "A cozy inn at the crossroads",
                            th: "โรงแรมแสนอบอุ่นที่ทางแยก"
                        },
                        region: "Central",
                        subRegion: "Capital"
                    }
                }
            }
        },
        context: {
            region: "Central",
            subRegion: "Capital",
            location: "WaywardInn",
            partyId: "party-001",
            characterIds: []
        },
        significance: "minor",
        propagation: "local"
    },
    {
        id: "news-008",
        ts: {
            hour: 3,
            dayOfWeek: 4,
            dayOfSeason: 4,
            season: 1,
            dayPassed: 4,
            year: 1
        },
        scope: {
            kind: "privateScope",
            characterId: "viljah"
        },
        content: {
            en: "[char:viljah]Viljah[/char] completed crafting a [item:magicStaff]Magic Staff[/item]",
            th: "[char:viljah]วิลจาห์[/char] สร้าง [item:magicStaff]ไม้เท้าเวทย์[/item] สำเร็จ",
            entities: {
                chars: {
                    viljah: {
                        name: {
                            en: "Viljah",
                            th: "วิลจาห์"
                        },
                        level: 1,
                        title: {
                            en: "Hermit Mage",
                            th: "นักเวทผู้สันโดษ"
                        },
                        portraitUrl: "m_elven01"
                    }
                },
                items: {
                    magicStaff: {
                        name: {
                            en: "Magic Staff",
                            th: "ไม้เท้าเวทย์"
                        },
                        description: {
                            en: "A staff imbued with arcane power",
                            th: "ไม้เท้าที่มีพลังเวทย์"
                        },
                        rarity: 3
                    }
                }
            }
        },
        context: {
            region: "Central",
            subRegion: "Capital",
            location: "WaywardInn",
            partyId: "party-001",
            characterIds: [
                "viljah"
            ]
        },
        significance: "notable",
        propagation: "private"
    },
    {
        id: "news-009",
        ts: {
            hour: 4,
            dayOfWeek: 5,
            dayOfSeason: 5,
            season: 1,
            dayPassed: 5,
            year: 1
        },
        scope: {
            kind: "regionScope",
            region: "Central"
        },
        content: {
            en: "Rumors spread about a dragon sighting in the mountains",
            th: "ข่าวลือแพร่สะพัดเกี่ยวกับการพบเห็นมังกรบนภูเขา"
        },
        context: {
            region: "Central",
            subRegion: "Capital",
            location: "WaywardInn",
            partyId: "party-001",
            characterIds: []
        },
        significance: "major",
        propagation: "regional"
    },
    {
        id: "news-002",
        ts: {
            hour: 2,
            dayOfWeek: 1,
            dayOfSeason: 1,
            season: 1,
            dayPassed: 1,
            year: 1
        },
        scope: {
            kind: "locationScope",
            location: "WaywardInn"
        },
        content: {
            en: "The weather in [loc:WaywardInn]Wayward Inn[/loc] is weird, it's a heavy rain.",
            th: "สภาพอากาศที่ [loc:WaywardInn]โรงแรมเวย์เวิร์ด[/loc] แปลกมาก ฝนตกหนัก",
            entities: {
                locs: {
                    WaywardInn: {
                        name: {
                            en: "Wayward Inn",
                            th: "โรงแรมเวย์เวิร์ด"
                        },
                        description: {
                            en: "A cozy inn at the crossroads",
                            th: "โรงแรมแสนอบอุ่นที่ทางแยก"
                        },
                        region: "Central",
                        subRegion: "Capital"
                    }
                }
            }
        },
        context: {
            region: "Central",
            subRegion: "Capital",
            location: "WaywardInn",
            partyId: "party-001",
            characterIds: []
        },
        significance: "minor",
        propagation: "local"
    },
    {
        id: "news-003",
        ts: {
            hour: 3,
            dayOfWeek: 2,
            dayOfSeason: 2,
            season: 1,
            dayPassed: 2,
            year: 1
        },
        scope: {
            kind: "partyScope",
            partyId: "party-001"
        },
        content: {
            en: "[char:viljah]Viljah[/char] and [char:luna]Luna[/char] became lover",
            th: "[char:viljah]วิลจาห์[/char] และ [char:luna]ลูน่า[/char] กลายเป็นคนรักกัน",
            entities: {
                chars: {
                    viljah: {
                        name: {
                            en: "Viljah",
                            th: "วิลจาห์"
                        },
                        level: 1,
                        title: {
                            en: "Hermit Mage",
                            th: "นักเวทผู้สันโดษ"
                        },
                        portraitUrl: "m_elven01"
                    },
                    luna: {
                        name: {
                            en: "Luna",
                            th: "ลูน่า"
                        },
                        level: 2,
                        title: {
                            en: "Warrior",
                            th: "นักรบ"
                        },
                        portraitUrl: "f_human01"
                    }
                }
            }
        },
        context: {
            region: "Central",
            subRegion: "Capital",
            location: "WaywardInn",
            partyId: "party-001",
            characterIds: [
                "viljah",
                "luna"
            ]
        },
        significance: "notable",
        propagation: "private"
    },
    {
        id: "news-004",
        ts: {
            hour: 1,
            dayOfWeek: 2,
            dayOfSeason: 2,
            season: 1,
            dayPassed: 2,
            year: 1
        },
        scope: {
            kind: "privateScope",
            characterId: "viljah"
        },
        content: {
            en: "[char:viljah]Viljah[/char] trained [skill:strength]strength[/skill] to 14",
            th: "[char:viljah]วิลจาห์[/char] ฝึกฝน[skill:strength]ความแข็งแรง[/skill] ถึง 14",
            entities: {
                chars: {
                    viljah: {
                        name: {
                            en: "Viljah",
                            th: "วิลจาห์"
                        },
                        level: 1,
                        title: {
                            en: "Hermit Mage",
                            th: "นักเวทผู้สันโดษ"
                        },
                        portraitUrl: "m_elven01"
                    }
                },
                skills: {
                    strength: {
                        name: {
                            en: "Strength",
                            th: "ความแข็งแรง"
                        },
                        description: {
                            en: "Physical power attribute",
                            th: "ความแข็งแกร่งทางกายภาพ"
                        },
                        tier: 1
                    }
                }
            }
        },
        context: {
            region: "Central",
            subRegion: "Capital",
            location: "WaywardInn",
            partyId: "party-001",
            characterIds: [
                "viljah"
            ]
        },
        significance: "minor",
        propagation: "secret"
    }
];
}),
"[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "L10NTextRenderer",
    ()=>L10NTextRenderer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Tooltip/Tooltip.js [app-ssr] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
;
;
;
/**
 * Parse L10N markup into tokens
 * Handles: [char:id]Name[/char], [loc:id]Location[/loc], [skill:id]Skill[/skill], etc.
 */ function parseL10NMarkup(text) {
    const tokens = [];
    let currentIndex = 0;
    // Regex to match opening tags like [char:id], [loc:id], [color:red], [b], etc.
    const tagRegex = /\[(\w+)(?::([^\]]+))?\]/g;
    let match;
    while((match = tagRegex.exec(text)) !== null){
        const tagStart = match.index;
        const tagName = match[1];
        const tagParam = match[2] || "";
        // Add text before the tag
        if (tagStart > currentIndex) {
            tokens.push({
                type: "text",
                content: text.substring(currentIndex, tagStart)
            });
        }
        // Find the closing tag
        const closingTag = `[/${tagName}]`;
        const closingIndex = text.indexOf(closingTag, tagStart + match[0].length);
        if (closingIndex === -1) {
            // No closing tag found, treat as plain text
            tokens.push({
                type: "text",
                content: match[0]
            });
            currentIndex = tagStart + match[0].length;
            continue;
        }
        // Extract content between tags
        const contentStart = tagStart + match[0].length;
        const content = text.substring(contentStart, closingIndex);
        // Create token based on tag type
        switch(tagName){
            case "char":
                tokens.push({
                    type: "char",
                    content,
                    id: tagParam
                });
                break;
            case "loc":
                tokens.push({
                    type: "loc",
                    content,
                    id: tagParam
                });
                break;
            case "skill":
                tokens.push({
                    type: "skill",
                    content,
                    id: tagParam
                });
                break;
            case "item":
                tokens.push({
                    type: "item",
                    content,
                    id: tagParam
                });
                break;
            case "party":
                tokens.push({
                    type: "party",
                    content,
                    id: tagParam
                });
                break;
            case "color":
                tokens.push({
                    type: "color",
                    content,
                    color: tagParam
                });
                break;
            case "b":
                tokens.push({
                    type: "bold",
                    content
                });
                break;
            case "i":
                tokens.push({
                    type: "italic",
                    content
                });
                break;
            default:
                // Unknown tag, treat as text
                tokens.push({
                    type: "text",
                    content: match[0] + content + closingTag
                });
        }
        currentIndex = closingIndex + closingTag.length;
    }
    // Add remaining text
    if (currentIndex < text.length) {
        tokens.push({
            type: "text",
            content: text.substring(currentIndex)
        });
    }
    return tokens;
}
/**
 * Render tooltip content for different entity types
 */ function renderEntityTooltip(type, id, entities, theme) {
    if (!id || !entities) return null;
    switch(type){
        case "char":
            {
                const charData = entities.chars?.[id];
                if (!charData) return null;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        maxWidth: 300,
                        p: 1
                    },
                    children: [
                        charData.portraitUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                display: "flex",
                                justifyContent: "center",
                                mb: 1
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                component: "img",
                                src: `/img/portraits/${charData.portraitUrl}.png`,
                                alt: charData.name.en,
                                sx: {
                                    width: 64,
                                    height: 64,
                                    borderRadius: "50%",
                                    border: `2px solid ${theme.palette.primary.main}`,
                                    objectFit: "cover"
                                }
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                                lineNumber: 169,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontFamily: "Cinzel, serif",
                                fontSize: "1rem",
                                fontWeight: 700,
                                color: theme.palette.primary.main,
                                mb: 0.5
                            },
                            children: charData.name.en
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                            lineNumber: 183,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontFamily: "Crimson Text, serif",
                                fontSize: "0.85rem",
                                color: theme.palette.text.secondary,
                                mb: 0.5
                            },
                            children: [
                                "Level ",
                                charData.level
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                            lineNumber: 194,
                            columnNumber: 11
                        }, this),
                        charData.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontFamily: "Crimson Text, serif",
                                fontSize: "0.8rem",
                                fontStyle: "italic",
                                color: theme.palette.text.disabled
                            },
                            children: charData.title.en
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                            lineNumber: 205,
                            columnNumber: 13
                        }, this),
                        charData.lastSeenLocation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontFamily: "Crimson Text, serif",
                                fontSize: "0.75rem",
                                color: theme.palette.text.disabled,
                                mt: 0.5
                            },
                            children: [
                                "Last seen: ",
                                charData.lastSeenLocation
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                            lineNumber: 217,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                    lineNumber: 160,
                    columnNumber: 9
                }, this);
            }
        case "loc":
            {
                const locData = entities.locs?.[id];
                if (!locData) return null;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        maxWidth: 300,
                        p: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontFamily: "Cinzel, serif",
                                fontSize: "1rem",
                                fontWeight: 700,
                                color: theme.palette.secondary.main,
                                mb: 0.5
                            },
                            children: locData.name.en
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                            lineNumber: 238,
                            columnNumber: 11
                        }, this),
                        locData.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontFamily: "Crimson Text, serif",
                                fontSize: "0.85rem",
                                color: theme.palette.text.secondary,
                                mb: 0.5
                            },
                            children: locData.description.en
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                            lineNumber: 250,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontFamily: "Crimson Text, serif",
                                fontSize: "0.8rem",
                                color: theme.palette.text.disabled
                            },
                            children: [
                                locData.region,
                                " • ",
                                locData.subRegion
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                            lineNumber: 261,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                    lineNumber: 237,
                    columnNumber: 9
                }, this);
            }
        case "skill":
            {
                const skillData = entities.skills?.[id];
                if (!skillData) return null;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        maxWidth: 300,
                        p: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontFamily: "Cinzel, serif",
                                fontSize: "1rem",
                                fontWeight: 700,
                                color: theme.palette.info?.main || theme.palette.secondary.main,
                                mb: 0.5
                            },
                            children: skillData.name.en
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                            lineNumber: 280,
                            columnNumber: 11
                        }, this),
                        skillData.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontFamily: "Crimson Text, serif",
                                fontSize: "0.85rem",
                                color: theme.palette.text.secondary,
                                mb: 0.5
                            },
                            children: skillData.description.en
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                            lineNumber: 292,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontFamily: "Crimson Text, serif",
                                fontSize: "0.8rem",
                                color: theme.palette.text.disabled
                            },
                            children: [
                                "Tier ",
                                skillData.tier,
                                skillData.cost !== undefined && ` • Cost: ${skillData.cost}`
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                            lineNumber: 303,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                    lineNumber: 279,
                    columnNumber: 9
                }, this);
            }
        case "item":
            {
                const itemData = entities.items?.[id];
                if (!itemData) return null;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        maxWidth: 300,
                        p: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontFamily: "Cinzel, serif",
                                fontSize: "1rem",
                                fontWeight: 700,
                                color: theme.palette.warning?.main || theme.palette.primary.main,
                                mb: 0.5
                            },
                            children: itemData.name.en
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                            lineNumber: 323,
                            columnNumber: 11
                        }, this),
                        itemData.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontFamily: "Crimson Text, serif",
                                fontSize: "0.85rem",
                                color: theme.palette.text.secondary,
                                mb: 0.5
                            },
                            children: itemData.description.en
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                            lineNumber: 335,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontFamily: "Crimson Text, serif",
                                fontSize: "0.8rem",
                                color: theme.palette.text.disabled
                            },
                            children: [
                                "Rarity: ",
                                itemData.rarity
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                            lineNumber: 346,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                    lineNumber: 322,
                    columnNumber: 9
                }, this);
            }
        case "party":
            {
                const partyData = entities.parties?.[id];
                if (!partyData) return null;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        maxWidth: 300,
                        p: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontFamily: "Cinzel, serif",
                                fontSize: "1rem",
                                fontWeight: 700,
                                color: theme.palette.secondary.main,
                                mb: 0.5
                            },
                            children: partyData.name.en
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                            lineNumber: 365,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontFamily: "Crimson Text, serif",
                                fontSize: "0.85rem",
                                color: theme.palette.text.secondary
                            },
                            children: [
                                partyData.memberCount,
                                " member",
                                partyData.memberCount !== 1 ? "s" : ""
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                            lineNumber: 376,
                            columnNumber: 11
                        }, this),
                        partyData.members && partyData.members.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                mt: 1
                            },
                            children: partyData.members.slice(0, 5).map((member, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    sx: {
                                        fontFamily: "Crimson Text, serif",
                                        fontSize: "0.8rem",
                                        color: theme.palette.text.disabled
                                    },
                                    children: [
                                        "• ",
                                        member.name,
                                        " (Lv ",
                                        member.level,
                                        ")"
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                                    lineNumber: 388,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                            lineNumber: 386,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                    lineNumber: 364,
                    columnNumber: 9
                }, this);
            }
        default:
            return null;
    }
}
const L10NTextRenderer = ({ content, language = "en", variant = "body1", sx })=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    const text = language === "th" && content.th ? content.th : content.en;
    const tokens = parseL10NMarkup(text);
    // Helper to render entity tooltip with theme
    const renderTooltip = (type, id)=>renderEntityTooltip(type, id, content.entities, theme);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        component: "span",
        sx: {
            fontFamily: "Crimson Text, serif",
            display: "inline",
            fontSize: variant === "body1" ? "1rem" : variant === "body2" ? "0.875rem" : "0.75rem",
            ...sx
        },
        children: tokens.map((token, index)=>{
            // Plain text
            if (token.type === "text") {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
                    children: token.content
                }, index, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                    lineNumber: 443,
                    columnNumber: 18
                }, ("TURBOPACK compile-time value", void 0));
            }
            // Entity with tooltip
            if ([
                "char",
                "loc",
                "skill",
                "item",
                "party"
            ].includes(token.type)) {
                const tooltipContent = renderTooltip(token.type, token.id);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                    title: tooltipContent || "",
                    arrow: true,
                    placement: "top",
                    componentsProps: {
                        tooltip: {
                            sx: {
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.95),
                                border: `2px solid ${theme.palette.secondary.main}`,
                                borderRadius: 2,
                                boxShadow: `0 4px 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.2)}`,
                                maxWidth: 350,
                                padding: 0
                            }
                        }
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        component: "span",
                        sx: {
                            color: theme.palette.primary.main,
                            textDecoration: "underline",
                            textDecorationStyle: "dotted",
                            textUnderlineOffset: 2,
                            cursor: "help",
                            "&:hover": {
                                color: theme.palette.primary.light
                            }
                        },
                        children: token.content
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                        lineNumber: 472,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0))
                }, index, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                    lineNumber: 454,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0));
            }
            // Color text
            if (token.type === "color") {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    component: "span",
                    sx: {
                        color: token.color || theme.palette.text.primary
                    },
                    children: token.content
                }, index, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                    lineNumber: 494,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0));
            }
            // Bold text
            if (token.type === "bold") {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    component: "span",
                    sx: {
                        fontWeight: 700
                    },
                    children: token.content
                }, index, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                    lineNumber: 509,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0));
            }
            // Italic text
            if (token.type === "italic") {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    component: "span",
                    sx: {
                        fontStyle: "italic"
                    },
                    children: token.content
                }, index, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                    lineNumber: 524,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0));
            }
            // Fallback
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, {
                children: token.content
            }, index, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
                lineNumber: 537,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0));
        })
    }, void 0, false, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx",
        lineNumber: 431,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsItem.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NewsItem",
    ()=>NewsItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Chip/Chip.js [app-ssr] (ecmascript) <export default as Chip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$data$2f$mockNewsData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/data/mockNewsData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$L10N$2f$L10NTextRenderer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/L10N/L10NTextRenderer.tsx [app-ssr] (ecmascript)");
;
;
;
;
const NewsItem = ({ news })=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    // Color mapping for different news scopes
    const scopeColors = {
        Global: theme.palette.primary.main,
        Region: theme.palette.secondary.main,
        "Sub-Region": theme.palette.info?.main || theme.palette.secondary.light,
        Location: theme.palette.secondary.main,
        Party: theme.palette.info?.main || theme.palette.secondary.light,
        Personal: theme.palette.success?.main || theme.palette.primary.light,
        None: theme.palette.text.disabled,
        Unknown: theme.palette.text.disabled
    };
    const scopeLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$data$2f$mockNewsData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNewsScopeLabel"])(news.scope);
    const scopeColor = scopeColors[scopeLabel] || theme.palette.text.secondary;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        component: "div",
        sx: {
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
            padding: "0.5rem 0.75rem"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Chip$2f$Chip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Chip$3e$__["Chip"], {
                label: scopeLabel,
                size: "small",
                sx: {
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    height: 20,
                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(scopeColor, 0.2),
                    color: scopeColor,
                    border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(scopeColor, 0.4)}`,
                    flexShrink: 0,
                    "& .MuiChip-label": {
                        padding: "0 6px"
                    }
                }
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsItem.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$L10N$2f$L10NTextRenderer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10NTextRenderer"], {
                content: news.content,
                language: "en",
                variant: "body2",
                sx: {
                    fontSize: "0.85rem",
                    color: theme.palette.text.primary,
                    lineHeight: 1.4,
                    flex: 1
                }
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsItem.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsItem.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/SettingsButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SettingsButton",
    ()=>SettingsButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/IconButton/IconButton.js [app-ssr] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Tooltip/Tooltip.js [app-ssr] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Settings.js [app-ssr] (ecmascript)");
;
;
;
const SettingsButton = ({ onClick })=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
        title: "Settings",
        placement: "left",
        arrow: true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
            onClick: onClick,
            sx: {
                position: "fixed",
                bottom: 20,
                right: 20,
                zIndex: 9998,
                width: 48,
                height: 48,
                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.9),
                border: `2px solid ${theme.palette.secondary.main}`,
                boxShadow: `
            0 4px 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.2)},
            inset 0 1px 0 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3)}
          `,
                "&:hover": {
                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.1),
                    transform: "translateY(-2px)",
                    boxShadow: `
              0 6px 20px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.3)},
              inset 0 1px 0 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3)}
            `
                },
                transition: "all 0.2s ease-out"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sx: {
                    color: theme.palette.secondary.main
                }
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/SettingsButton.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/SettingsButton.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/SettingsButton.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/SettingsModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SettingsModal",
    ()=>SettingsModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Dialog/Dialog.js [app-ssr] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogTitle/DialogTitle.js [app-ssr] (ecmascript) <export default as DialogTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogContent/DialogContent.js [app-ssr] (ecmascript) <export default as DialogContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
;
;
const SettingsModal = ({ open, onClose })=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
        open: open,
        onClose: onClose,
        maxWidth: "md",
        fullWidth: true,
        PaperProps: {
            sx: {
                borderRadius: 2,
                padding: 3,
                fontFamily: "Crimson Text, serif",
                backgroundColor: theme.palette.background.paper,
                border: `3px solid ${theme.palette.secondary.main}`,
                boxShadow: `
            0 0 30px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.3)},
            0 8px 32px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.15)}
          `
            }
        },
        BackdropProps: {
            sx: {
                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#1A1A2E", 0.7),
                backdropFilter: "blur(8px)"
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                sx: {
                    fontFamily: "Cinzel, serif",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: theme.palette.secondary.main,
                    textAlign: "center",
                    pb: 2,
                    borderBottom: `2px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.3)}`
                },
                children: "Settings"
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/SettingsModal.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        padding: 4,
                        textAlign: "center"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontFamily: "Crimson Text, serif",
                                fontSize: "1rem",
                                color: theme.palette.text.secondary
                            },
                            children: "Settings page - Coming soon"
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/SettingsModal.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontFamily: "Crimson Text, serif",
                                fontSize: "0.9rem",
                                color: theme.palette.text.disabled,
                                mt: 2
                            },
                            children: "Language settings and other game preferences will be available here."
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/SettingsModal.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/SettingsModal.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/SettingsModal.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/SettingsModal.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NewsModal",
    ()=>NewsModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Dialog/Dialog.js [app-ssr] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogTitle/DialogTitle.js [app-ssr] (ecmascript) <export default as DialogTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogContent/DialogContent.js [app-ssr] (ecmascript) <export default as DialogContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/IconButton/IconButton.js [app-ssr] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Close$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Close.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$NewsItem$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsItem.tsx [app-ssr] (ecmascript)");
;
;
;
;
const NewsModal = ({ open, onClose, news })=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
        open: open,
        onClose: onClose,
        maxWidth: "lg",
        fullWidth: true,
        PaperProps: {
            sx: {
                borderRadius: 2,
                fontFamily: "Crimson Text, serif",
                backgroundColor: theme.palette.background.paper,
                border: `3px solid ${theme.palette.secondary.main}`,
                boxShadow: `
            0 0 30px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.3)},
            0 8px 32px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.15)}
          `,
                maxHeight: "90vh",
                display: "flex",
                flexDirection: "column"
            }
        },
        BackdropProps: {
            sx: {
                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#1A1A2E", 0.7),
                backdropFilter: "blur(8px)"
            }
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                sx: {
                    fontFamily: "Cinzel, serif",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: theme.palette.secondary.main,
                    textAlign: "center",
                    pb: 2,
                    borderBottom: `2px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.3)}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    pr: 1
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            flex: 1
                        }
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsModal.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        sx: {
                            flex: 1,
                            textAlign: "center"
                        },
                        children: "News"
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsModal.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            flex: 1,
                            display: "flex",
                            justifyContent: "flex-end"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                            onClick: onClose,
                            size: "small",
                            sx: {
                                color: theme.palette.text.secondary,
                                "&:hover": {
                                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.1)
                                }
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Close$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsModal.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsModal.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsModal.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsModal.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                sx: {
                    flex: 1,
                    overflowY: "auto",
                    padding: 3,
                    "&::-webkit-scrollbar": {
                        width: "8px"
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.default, 0.5),
                        borderRadius: 1
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.5),
                        borderRadius: 1,
                        "&:hover": {
                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.7)
                        }
                    }
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        display: "flex",
                        flexDirection: "column",
                        gap: 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                mb: 2,
                                padding: 2,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.default, 0.3),
                                borderRadius: 1,
                                border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.divider, 0.2)}`
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                sx: {
                                    fontFamily: "Crimson Text, serif",
                                    fontSize: "0.9rem",
                                    color: theme.palette.text.secondary,
                                    fontStyle: "italic"
                                },
                                children: "Filters: News Type, Date/Time - Coming soon"
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsModal.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsModal.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        news.map((newsItem)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    borderBottom: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.divider, 0.1)}`,
                                    "&:last-child": {
                                        borderBottom: "none"
                                    }
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$NewsItem$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NewsItem"], {
                                    news: newsItem
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsModal.tsx",
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, newsItem.id, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsModal.tsx",
                                lineNumber: 141,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    ]
                }, void 0, true, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsModal.tsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsModal.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsModal.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/workspace/MyProject/Client/webapp/src/data/mockChatData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getChatMessagesByScope",
    ()=>getChatMessagesByScope,
    "mockChatMessages",
    ()=>mockChatMessages,
    "mockFriends",
    ()=>mockFriends
]);
const mockChatMessages = [
    // Global Chat
    {
        id: "chat-001",
        scope: "global",
        senderId: "mock-character-001",
        senderName: "Viljah",
        senderPortrait: "m_elven01",
        content: "Hey everyone! Just started playing, any tips?",
        timestamp: new Date(Date.now() - 3600000)
    },
    {
        id: "chat-002",
        scope: "global",
        senderId: "player-456",
        senderName: "Dragonslayer",
        content: "Welcome! Check out the crafting system, it's really deep.",
        timestamp: new Date(Date.now() - 3300000)
    },
    {
        id: "chat-003",
        scope: "global",
        senderId: "player-789",
        senderName: "MysticMage",
        content: "Anyone want to form a party? Looking for a healer.",
        timestamp: new Date(Date.now() - 1800000)
    },
    // Location Chat (Wayward Inn)
    {
        id: "chat-004",
        scope: "location",
        senderId: "npc-001",
        senderName: "Innkeeper",
        content: "Welcome to the Wayward Inn! We have fresh ale and warm beds.",
        timestamp: new Date(Date.now() - 7200000)
    },
    {
        id: "chat-005",
        scope: "location",
        senderId: "player-456",
        senderName: "Dragonslayer",
        content: "The weather here is really weird today, isn't it?",
        timestamp: new Date(Date.now() - 3600000)
    },
    {
        id: "chat-006",
        scope: "location",
        senderId: "mock-character-001",
        senderName: "Viljah",
        senderPortrait: "m_elven01",
        content: "Yeah, heavy rain out of nowhere!",
        timestamp: new Date(Date.now() - 3000000)
    },
    // Party Chat
    {
        id: "chat-007",
        scope: "party",
        senderId: "mock-character-001",
        senderName: "Viljah",
        senderPortrait: "m_elven01",
        content: "Let's head to the forest after we rest here.",
        timestamp: new Date(Date.now() - 1800000)
    },
    {
        id: "chat-008",
        scope: "party",
        senderId: "mock-character-002",
        senderName: "Thorin",
        senderPortrait: "m_dwarf01",
        content: "Good idea. We should stock up on potions first.",
        timestamp: new Date(Date.now() - 1700000)
    },
    {
        id: "chat-009",
        scope: "party",
        senderId: "mock-character-003",
        senderName: "Luna",
        senderPortrait: "f_human01",
        content: "I can craft some if we have the materials.",
        timestamp: new Date(Date.now() - 1600000)
    },
    // Region Chat (Central)
    {
        id: "chat-010",
        scope: "region",
        senderId: "player-999",
        senderName: "Explorer",
        content: "Anyone know where to find iron ore in Central region?",
        timestamp: new Date(Date.now() - 2400000)
    },
    {
        id: "chat-011",
        scope: "region",
        senderId: "player-456",
        senderName: "Dragonslayer",
        content: "Check the mountains north of the capital. There's a mine there.",
        timestamp: new Date(Date.now() - 2100000)
    },
    // Private messages (for individual chats) - Steamy romantic messages
    {
        id: "chat-012",
        scope: "private",
        senderId: "mock-character-003",
        senderName: "Luna",
        senderPortrait: "f_human01",
        content: "Hey Viljah... I can't stop thinking about last night. Your touch... it lingers on my skin.",
        timestamp: new Date(Date.now() - 3600000),
        recipientId: "mock-character-001"
    },
    {
        id: "chat-013",
        scope: "private",
        senderId: "mock-character-001",
        senderName: "Viljah",
        senderPortrait: "m_elven01",
        content: "Luna... neither can I. The way you looked at me under the moonlight... I've never felt this way before.",
        timestamp: new Date(Date.now() - 3550000),
        recipientId: "mock-character-003"
    },
    {
        id: "chat-014",
        scope: "private",
        senderId: "mock-character-003",
        senderName: "Luna",
        senderPortrait: "f_human01",
        content: "Meet me in our spot tonight? I have something I want to show you... and tell you.",
        timestamp: new Date(Date.now() - 3500000),
        recipientId: "mock-character-001"
    },
    {
        id: "chat-015",
        scope: "private",
        senderId: "mock-character-001",
        senderName: "Viljah",
        senderPortrait: "m_elven01",
        content: "I'll be there. Nothing could keep me away from you. My heart races just thinking about you.",
        timestamp: new Date(Date.now() - 3450000),
        recipientId: "mock-character-003"
    },
    {
        id: "chat-016",
        scope: "private",
        senderId: "mock-character-003",
        senderName: "Luna",
        senderPortrait: "f_human01",
        content: "Good... I've been waiting all day for this moment. The anticipation is driving me wild.",
        timestamp: new Date(Date.now() - 3400000),
        recipientId: "mock-character-001"
    }
];
/**
 * Get last private message between current user and a friend
 * This ensures friends list only shows messages from private conversations
 */ function getLastPrivateMessage(friendId, currentUserId = "mock-character-001") {
    const privateMessages = mockChatMessages.filter((msg)=>msg.scope === "private" && (msg.senderId === friendId || msg.recipientId === friendId) && (msg.senderId === currentUserId || msg.recipientId === currentUserId)).sort((a, b)=>b.timestamp.getTime() - a.timestamp.getTime());
    if (privateMessages.length > 0) {
        const lastMsg = privateMessages[0];
        return {
            content: lastMsg.content,
            timestamp: lastMsg.timestamp
        };
    }
    return null;
}
const mockFriends = [
    // Lovers (can be players or NPCs, can have multiple)
    {
        id: "mock-character-003",
        name: "Luna",
        portrait: "f_human01",
        isPlayer: false,
        relation: {
            title: "lover",
            affection: 85,
            closeness: 90
        },
        // Get last private message from actual private chat
        lastMessage: "Good... I've been waiting all day for this moment. The anticipation is driving me wild.",
        lastMessageTime: new Date(Date.now() - 3400000)
    },
    // Close Friends (Players)
    {
        id: "player-456",
        name: "Dragonslayer",
        portrait: undefined,
        isPlayer: true,
        status: "online",
        relation: {
            title: "closeFriend",
            affection: 70,
            closeness: 75
        }
    },
    // Regular Friends (Players)
    {
        id: "player-789",
        name: "MysticMage",
        portrait: undefined,
        isPlayer: true,
        status: "away",
        relation: {
            title: "friend",
            affection: 50,
            closeness: 45
        }
    },
    {
        id: "player-999",
        name: "Explorer",
        portrait: undefined,
        isPlayer: true,
        status: "offline",
        lastSeen: new Date(Date.now() - 2400000),
        relation: {
            title: "friend",
            affection: 40,
            closeness: 35
        }
    },
    // NPCs (non-lover NPCs)
    {
        id: "mock-character-002",
        name: "Thorin",
        portrait: "m_dwarf01",
        isPlayer: false
    },
    {
        id: "npc-001",
        name: "Innkeeper",
        portrait: undefined,
        isPlayer: false
    }
];
function getChatMessagesByScope(scope, privateChatUserId, currentUserId = "mock-character-001") {
    if (scope === "private" && privateChatUserId) {
        // For private chat, get messages between current user and selected friend ONLY
        // Must be private scope AND involve both the current user and the selected friend
        return mockChatMessages.filter((msg)=>msg.scope === "private" && // Message must involve the selected friend (as sender or recipient)
            (msg.senderId === privateChatUserId || msg.recipientId === privateChatUserId) && // Message must involve the current user (as sender or recipient)
            (msg.senderId === currentUserId || msg.recipientId === currentUserId));
    }
    // For non-private chats, only return messages matching the scope
    return mockChatMessages.filter((msg)=>msg.scope === scope);
}
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatPanel",
    ()=>ChatPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Radio$2f$Radio$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Radio/Radio.js [app-ssr] (ecmascript) <export default as Radio>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$RadioGroup$2f$RadioGroup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RadioGroup$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/RadioGroup/RadioGroup.js [app-ssr] (ecmascript) <export default as RadioGroup>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/FormControlLabel/FormControlLabel.js [app-ssr] (ecmascript) <export default as FormControlLabel>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Avatar/Avatar.js [app-ssr] (ecmascript) <export default as Avatar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/IconButton/IconButton.js [app-ssr] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tabs$2f$Tabs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tabs$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Tabs/Tabs.js [app-ssr] (ecmascript) <export default as Tabs>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tab$2f$Tab$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tab$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Tab/Tab.js [app-ssr] (ecmascript) <export default as Tab>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/TextField/TextField.js [app-ssr] (ecmascript) <export default as TextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/InputAdornment/InputAdornment.js [app-ssr] (ecmascript) <export default as InputAdornment>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$ArrowBack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/ArrowBack.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Send.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Fullscreen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Fullscreen.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Minimize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Minimize.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$data$2f$mockChatData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/data/mockChatData.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
const ChatPanel = ({ currentUserId = "mock-character-001" })=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    const [selectedChatType, setSelectedChatType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("global");
    const [selectedFriendId, setSelectedFriendId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [friendFilterTab, setFriendFilterTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all");
    const [chatInput, setChatInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Get messages based on selected chat type
    const getDisplayMessages = ()=>{
        if (selectedChatType === "social" && selectedFriendId) {
            // Private chat: pass both friend ID and current user ID
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$data$2f$mockChatData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getChatMessagesByScope"])("private", selectedFriendId, currentUserId);
        }
        if (selectedChatType !== "social") {
            // Public chats: just filter by scope
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$data$2f$mockChatData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getChatMessagesByScope"])(selectedChatType);
        }
        return [];
    };
    const messages = getDisplayMessages();
    // Format timestamp for display
    const formatTime = (date)=>{
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        if (minutes < 1) return "Just now";
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return date.toLocaleDateString();
    };
    // Get status color for friends
    const getStatusColor = (status)=>{
        switch(status){
            case "online":
                return theme.palette.success.main;
            case "away":
                return theme.palette.warning.main;
            case "busy":
                return theme.palette.error.main;
            default:
                return theme.palette.text.disabled;
        }
    };
    // Handle chat type selection
    const handleChatTypeChange = (event)=>{
        const value = event.target.value;
        setSelectedChatType(value);
        setSelectedFriendId(null); // Reset friend selection when changing chat type
    };
    // Handle friend click (for Social tab)
    const handleFriendClick = (friendId)=>{
        setSelectedFriendId(friendId);
    };
    // Handle sending a chat message
    const handleSendMessage = ()=>{
        if (!chatInput.trim()) return;
        // TODO: Send message to backend
        console.log("Sending message:", {
            scope: selectedChatType,
            recipientId: selectedChatType === "social" ? selectedFriendId : undefined,
            content: chatInput.trim(),
            senderId: currentUserId
        });
        // Clear input after sending
        setChatInput("");
    };
    // Check if chat input should be shown
    const shouldShowChatInput = ()=>{
        // Show input for all chat types except when viewing friends list in Social tab
        if (selectedChatType === "social" && !selectedFriendId) {
            return false; // Don't show input on friends list
        }
        // Show input for: global, region, location, party, and private chats (social with selected friend)
        return true;
    };
    // Filter friends based on selected tab
    const getFilteredFriends = ()=>{
        let filtered = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$data$2f$mockChatData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFriends"];
        switch(friendFilterTab){
            case "lovers":
                filtered = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$data$2f$mockChatData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFriends"].filter((f)=>f.relation?.title === "lover");
                break;
            case "closeFriends":
                filtered = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$data$2f$mockChatData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFriends"].filter((f)=>f.relation?.title === "closeFriend");
                break;
            case "friends":
                filtered = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$data$2f$mockChatData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFriends"].filter((f)=>f.isPlayer && (f.relation?.title === "friend" || !f.relation));
                break;
            case "npcs":
                filtered = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$data$2f$mockChatData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFriends"].filter((f)=>!f.isPlayer);
                break;
            case "all":
            default:
                break;
        }
        return filtered;
    };
    const filteredFriends = getFilteredFriends();
    // Auto-scroll to bottom when messages change or chat type changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Only scroll if we're viewing messages (not friends list)
        if (selectedChatType !== "social" || selectedFriendId) {
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }, [
        messages,
        selectedChatType,
        selectedFriendId
    ]);
    const chatContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            display: "flex",
            height: "100%",
            border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.divider, 0.2)}`,
            borderRadius: isFullscreen ? 0 : 1,
            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.3),
            overflow: "hidden",
            transition: "all 0.3s ease-in-out"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    width: 120,
                    borderRight: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.divider, 0.2)}`,
                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.5),
                    padding: 2,
                    display: "flex",
                    flexDirection: "column"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        sx: {
                            fontFamily: "Cinzel, serif",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            mb: 2,
                            textAlign: "center"
                        },
                        children: "Chat"
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$RadioGroup$2f$RadioGroup$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RadioGroup$3e$__["RadioGroup"], {
                        value: selectedChatType,
                        onChange: handleChatTypeChange,
                        sx: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.5
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__["FormControlLabel"], {
                                value: "global",
                                control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Radio$2f$Radio$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
                                    size: "small"
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                    lineNumber: 205,
                                    columnNumber: 22
                                }, void 0),
                                label: "Global",
                                sx: {
                                    margin: 0,
                                    "& .MuiFormControlLabel-label": {
                                        fontFamily: "Crimson Text, serif",
                                        fontSize: "0.85rem"
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__["FormControlLabel"], {
                                value: "region",
                                control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Radio$2f$Radio$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
                                    size: "small"
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                    lineNumber: 217,
                                    columnNumber: 22
                                }, void 0),
                                label: "Region",
                                sx: {
                                    margin: 0,
                                    "& .MuiFormControlLabel-label": {
                                        fontFamily: "Crimson Text, serif",
                                        fontSize: "0.85rem"
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__["FormControlLabel"], {
                                value: "location",
                                control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Radio$2f$Radio$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
                                    size: "small"
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                    lineNumber: 229,
                                    columnNumber: 22
                                }, void 0),
                                label: "Location",
                                sx: {
                                    margin: 0,
                                    "& .MuiFormControlLabel-label": {
                                        fontFamily: "Crimson Text, serif",
                                        fontSize: "0.85rem"
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                lineNumber: 227,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__["FormControlLabel"], {
                                value: "party",
                                control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Radio$2f$Radio$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
                                    size: "small"
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                    lineNumber: 241,
                                    columnNumber: 22
                                }, void 0),
                                label: "Party",
                                sx: {
                                    margin: 0,
                                    "& .MuiFormControlLabel-label": {
                                        fontFamily: "Crimson Text, serif",
                                        fontSize: "0.85rem"
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$FormControlLabel$2f$FormControlLabel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FormControlLabel$3e$__["FormControlLabel"], {
                                value: "social",
                                control: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Radio$2f$Radio$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
                                    size: "small"
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                    lineNumber: 253,
                                    columnNumber: 22
                                }, void 0),
                                label: "Social",
                                sx: {
                                    margin: 0,
                                    "& .MuiFormControlLabel-label": {
                                        fontFamily: "Crimson Text, serif",
                                        fontSize: "0.85rem"
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden"
                },
                children: selectedChatType === "social" && !selectedFriendId ? // Friends List View
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                borderBottom: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.divider, 0.2)}`,
                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.5)
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tabs$2f$Tabs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tabs$3e$__["Tabs"], {
                                value: friendFilterTab,
                                onChange: (_, newValue)=>setFriendFilterTab(newValue),
                                variant: "scrollable",
                                scrollButtons: "auto",
                                sx: {
                                    minHeight: 48,
                                    "& .MuiTab-root": {
                                        fontFamily: "Cinzel, serif",
                                        fontSize: "0.85rem",
                                        fontWeight: 600,
                                        textTransform: "none",
                                        minHeight: 48,
                                        padding: "0 16px"
                                    },
                                    "& .Mui-selected": {
                                        color: theme.palette.primary.main
                                    },
                                    "& .MuiTabs-indicator": {
                                        backgroundColor: theme.palette.primary.main
                                    }
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tab$2f$Tab$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tab$3e$__["Tab"], {
                                        label: "All",
                                        value: "all"
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                        lineNumber: 315,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tab$2f$Tab$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tab$3e$__["Tab"], {
                                        label: "Lovers",
                                        value: "lovers"
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                        lineNumber: 316,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tab$2f$Tab$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tab$3e$__["Tab"], {
                                        label: "Close Friends",
                                        value: "closeFriends"
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                        lineNumber: 317,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tab$2f$Tab$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tab$3e$__["Tab"], {
                                        label: "Friends",
                                        value: "friends"
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                        lineNumber: 318,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tab$2f$Tab$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tab$3e$__["Tab"], {
                                        label: "NPCs",
                                        value: "npcs"
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                        lineNumber: 319,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                lineNumber: 292,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                            lineNumber: 286,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                flex: 1,
                                overflowY: "auto",
                                padding: 2,
                                "&::-webkit-scrollbar": {
                                    width: "8px"
                                },
                                "&::-webkit-scrollbar-track": {
                                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.default, 0.3)
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.5),
                                    borderRadius: 1,
                                    "&:hover": {
                                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.7)
                                    }
                                }
                            },
                            children: filteredFriends.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                sx: {
                                    fontFamily: "Crimson Text, serif",
                                    fontSize: "0.9rem",
                                    color: theme.palette.text.secondary,
                                    textAlign: "center",
                                    mt: 4
                                },
                                children: [
                                    "No ",
                                    friendFilterTab === "all" ? "friends" : friendFilterTab,
                                    " found"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                lineNumber: 345,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)) : filteredFriends.map((friend)=>{
                                // Pink background for lovers
                                const isLover = friend.relation?.title === "lover";
                                const backgroundColor = isLover ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ff69b4", 0.15) // Pink tint for lovers
                                 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.3);
                                const hoverBackgroundColor = isLover ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ff69b4", 0.25) // Darker pink on hover
                                 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.1);
                                const borderColor = isLover ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ff69b4", 0.4) // Pink border for lovers
                                 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.divider, 0.2);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    onClick: ()=>handleFriendClick(friend.id),
                                    sx: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        padding: 1.5,
                                        borderRadius: 1,
                                        cursor: "pointer",
                                        mb: 1,
                                        backgroundColor,
                                        border: `1px solid ${borderColor}`,
                                        "&:hover": {
                                            backgroundColor: hoverBackgroundColor
                                        }
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                position: "relative"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                                    src: friend.portrait ? `/img/portraits/${friend.portrait}.png` : undefined,
                                                    sx: {
                                                        width: 48,
                                                        height: 48,
                                                        border: `2px solid ${theme.palette.secondary.main}`
                                                    },
                                                    children: friend.name.charAt(0)
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                                    lineNumber: 391,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                friend.isPlayer && friend.status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        position: "absolute",
                                                        bottom: 0,
                                                        right: 0,
                                                        width: 14,
                                                        height: 14,
                                                        borderRadius: "50%",
                                                        backgroundColor: getStatusColor(friend.status),
                                                        border: `2px solid ${theme.palette.background.paper}`,
                                                        boxShadow: `0 0 4px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(getStatusColor(friend.status), 0.6)}`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 27
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                            lineNumber: 390,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                            sx: {
                                                flex: 1,
                                                minWidth: 0
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontFamily: "Cinzel, serif",
                                                        fontSize: "0.95rem",
                                                        fontWeight: 600,
                                                        color: theme.palette.text.primary,
                                                        mb: 0.5
                                                    },
                                                    children: [
                                                        friend.name,
                                                        friend.isPlayer && friend.status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            component: "span",
                                                            sx: {
                                                                fontFamily: "Crimson Text, serif",
                                                                fontSize: "0.75rem",
                                                                fontWeight: 400,
                                                                color: theme.palette.text.secondary,
                                                                ml: 1,
                                                                fontStyle: "italic"
                                                            },
                                                            children: [
                                                                "(",
                                                                friend.status,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                                            lineNumber: 436,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                                    lineNumber: 425,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                friend.lastMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                    sx: {
                                                        fontFamily: "Crimson Text, serif",
                                                        fontSize: "0.8rem",
                                                        color: theme.palette.text.secondary,
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap"
                                                    },
                                                    children: friend.lastMessage
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                                    lineNumber: 452,
                                                    columnNumber: 27
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                            lineNumber: 424,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, friend.id, true, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                    lineNumber: 371,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0));
                            })
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                            lineNumber: 324,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                    lineNumber: 277,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : // Chat Messages View
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: (()=>{
                        // Check if chatting with a lover
                        const selectedFriend = selectedChatType === "social" && selectedFriendId ? __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$data$2f$mockChatData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFriends"].find((f)=>f.id === selectedFriendId) : null;
                        const isLoverChat = selectedFriend?.relation?.title === "lover";
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    onClick: ()=>setIsFullscreen(true),
                                    sx: {
                                        padding: 1.5,
                                        borderBottom: `1px solid ${isLoverChat ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ff69b4", 0.3) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.divider, 0.2)}`,
                                        backgroundColor: isLoverChat ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ff69b4", 0.1) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.5),
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        position: "relative",
                                        overflow: "hidden",
                                        cursor: "pointer",
                                        "&:hover": {
                                            backgroundColor: isLoverChat ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ff69b4", 0.15) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.7)
                                        },
                                        "&::before": isLoverChat ? {
                                            content: '""',
                                            position: "absolute",
                                            top: 0,
                                            left: "-100%",
                                            width: "100%",
                                            height: "100%",
                                            background: "linear-gradient(90deg, transparent, rgba(255, 105, 180, 0.2), transparent)",
                                            animation: "sparkle 3s infinite",
                                            "@keyframes sparkle": {
                                                "0%": {
                                                    left: "-100%"
                                                },
                                                "100%": {
                                                    left: "100%"
                                                }
                                            }
                                        } : {}
                                    },
                                    children: [
                                        selectedChatType === "social" && selectedFriendId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                setSelectedFriendId(null);
                                            },
                                            size: "small",
                                            sx: {
                                                color: theme.palette.text.secondary,
                                                "&:hover": {
                                                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.1)
                                                }
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$ArrowBack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                                lineNumber: 539,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                            lineNumber: 526,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            sx: {
                                                fontFamily: "Cinzel, serif",
                                                fontSize: "1rem",
                                                fontWeight: 600,
                                                color: theme.palette.text.primary,
                                                textTransform: "capitalize",
                                                flex: 1
                                            },
                                            children: selectedFriendId ? __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$data$2f$mockChatData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFriends"].find((f)=>f.id === selectedFriendId)?.name || "Chat" : selectedChatType === "social" ? "Friends" : `${selectedChatType} Chat`
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                            lineNumber: 542,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                setIsFullscreen(true);
                                            },
                                            size: "small",
                                            sx: {
                                                color: theme.palette.text.secondary,
                                                "&:hover": {
                                                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.1)
                                                }
                                            },
                                            title: "Expand to fullscreen",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Fullscreen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                sx: {
                                                    fontSize: "1rem"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                                lineNumber: 573,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                            lineNumber: 559,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                    lineNumber: 484,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    sx: {
                                        flex: 1,
                                        overflowY: "auto",
                                        padding: 2,
                                        backgroundColor: isLoverChat ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ff69b4", 0.05) : "transparent",
                                        backgroundImage: isLoverChat ? `radial-gradient(circle at 20% 50%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ff69b4", 0.1)} 0%, transparent 50%),
                     radial-gradient(circle at 80% 80%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ffb6c1", 0.1)} 0%, transparent 50%),
                     radial-gradient(circle at 40% 20%, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ffc0cb", 0.08)} 0%, transparent 50%)` : "none",
                                        position: "relative",
                                        "&::before": isLoverChat ? {
                                            content: '"✨"',
                                            position: "absolute",
                                            top: "10%",
                                            left: "5%",
                                            fontSize: "1.5rem",
                                            opacity: 0.6,
                                            animation: "sparkleFloat 4s ease-in-out infinite",
                                            "@keyframes sparkleFloat": {
                                                "0%, 100%": {
                                                    transform: "translateY(0) rotate(0deg)",
                                                    opacity: 0.6
                                                },
                                                "50%": {
                                                    transform: "translateY(-10px) rotate(180deg)",
                                                    opacity: 1
                                                }
                                            }
                                        } : {},
                                        "&::after": isLoverChat ? {
                                            content: '"✨"',
                                            position: "absolute",
                                            top: "60%",
                                            right: "8%",
                                            fontSize: "1.2rem",
                                            opacity: 0.5,
                                            animation: "sparkleFloat 5s ease-in-out infinite 1s",
                                            "@keyframes sparkleFloat": {
                                                "0%, 100%": {
                                                    transform: "translateY(0) rotate(0deg)",
                                                    opacity: 0.5
                                                },
                                                "50%": {
                                                    transform: "translateY(-8px) rotate(-180deg)",
                                                    opacity: 0.9
                                                }
                                            }
                                        } : {},
                                        "&::-webkit-scrollbar": {
                                            width: "8px"
                                        },
                                        "&::-webkit-scrollbar-track": {
                                            backgroundColor: isLoverChat ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ff69b4", 0.1) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.default, 0.3)
                                        },
                                        "&::-webkit-scrollbar-thumb": {
                                            backgroundColor: isLoverChat ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ff69b4", 0.6) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.5),
                                            borderRadius: 1,
                                            "&:hover": {
                                                backgroundColor: isLoverChat ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ff69b4", 0.8) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.7)
                                            }
                                        }
                                    },
                                    children: [
                                        messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            sx: {
                                                fontFamily: "Crimson Text, serif",
                                                fontSize: "0.9rem",
                                                color: theme.palette.text.secondary,
                                                textAlign: "center",
                                                mt: 4
                                            },
                                            children: "No messages yet"
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                            lineNumber: 643,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)) : messages.map((message)=>{
                                            const isCurrentUser = message.senderId === currentUserId;
                                            // Pink/lover styling for messages when chatting with lover
                                            // const messageBgColor = isLoverChat
                                            //   ? isCurrentUser
                                            //     ? alpha("#ff69b4", 0.25)
                                            //     : alpha("#ffb6c1", 0.2)
                                            //   : isCurrentUser
                                            //   ? alpha(theme.palette.primary.main, 0.2)
                                            //   : alpha(theme.palette.background.paper, 0.5);
                                            const messageBgColor = isCurrentUser ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.2) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.5);
                                            const messageBorderColor = isLoverChat ? isCurrentUser ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ff69b4", 0.5) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ffb6c1", 0.4) : isCurrentUser ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.4) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.divider, 0.2);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                sx: {
                                                    mb: 2,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: isCurrentUser ? "flex-end" : "flex-start"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                    sx: {
                                                        maxWidth: "70%",
                                                        padding: 1.5,
                                                        backgroundColor: messageBgColor,
                                                        borderRadius: 1,
                                                        border: `1px solid ${messageBorderColor}`,
                                                        boxShadow: isLoverChat ? `0 2px 8px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ff69b4", 0.2)}` : "none"
                                                    },
                                                    children: [
                                                        !isCurrentUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                                            sx: {
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: 1,
                                                                mb: 0.5
                                                            },
                                                            children: [
                                                                message.senderPortrait && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Avatar$2f$Avatar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Avatar$3e$__["Avatar"], {
                                                                    src: `/img/portraits/${message.senderPortrait}.png`,
                                                                    sx: {
                                                                        width: 32,
                                                                        height: 32,
                                                                        border: `1px solid ${theme.palette.secondary.main}`
                                                                    },
                                                                    children: message.senderName.charAt(0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                                                    lineNumber: 711,
                                                                    columnNumber: 31
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    sx: {
                                                                        fontFamily: "Cinzel, serif",
                                                                        fontSize: "0.9rem",
                                                                        fontWeight: 600,
                                                                        color: theme.palette.primary.main
                                                                    },
                                                                    children: message.senderName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                                                    lineNumber: 722,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                                    sx: {
                                                                        fontFamily: "Crimson Text, serif",
                                                                        fontSize: "0.75rem",
                                                                        color: theme.palette.text.disabled
                                                                    },
                                                                    children: formatTime(message.timestamp)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                                                    lineNumber: 732,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                                            lineNumber: 702,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        isCurrentUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            sx: {
                                                                fontFamily: "Crimson Text, serif",
                                                                fontSize: "0.75rem",
                                                                color: theme.palette.text.disabled,
                                                                mb: 0.5,
                                                                textAlign: "right"
                                                            },
                                                            children: formatTime(message.timestamp)
                                                        }, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                                            lineNumber: 744,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                            sx: {
                                                                fontFamily: "Crimson Text, serif",
                                                                fontSize: "0.9rem",
                                                                color: isCurrentUser ? theme.palette.text.primary : theme.palette.text.primary,
                                                                ml: !isCurrentUser && message.senderPortrait ? 5 : 0,
                                                                textAlign: isCurrentUser ? "right" : "left"
                                                            },
                                                            children: message.content
                                                        }, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                                            lineNumber: 756,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                                    lineNumber: 689,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, message.id, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                                lineNumber: 680,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0));
                                        }),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            ref: messagesEndRef
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                            lineNumber: 775,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                    lineNumber: 577,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                (()=>{
                                    const selectedFriend = selectedChatType === "social" && selectedFriendId ? __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$data$2f$mockChatData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFriends"].find((f)=>f.id === selectedFriendId) : null;
                                    const isLoverChat = selectedFriend?.relation?.title === "lover";
                                    if (!shouldShowChatInput()) return null;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            padding: 1.5,
                                            borderTop: `1px solid ${isLoverChat ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ff69b4", 0.3) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.divider, 0.2)}`,
                                            backgroundColor: isLoverChat ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ff69b4", 0.05) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.5)
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                            fullWidth: true,
                                            placeholder: selectedChatType === "social" && selectedFriendId ? "Type a private message..." : `Type a message in ${selectedChatType} chat...`,
                                            value: chatInput,
                                            onChange: (e)=>setChatInput(e.target.value),
                                            onKeyPress: (e)=>{
                                                if (e.key === "Enter" && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSendMessage();
                                                }
                                            },
                                            multiline: true,
                                            maxRows: 3,
                                            size: "small",
                                            sx: {
                                                "& .MuiOutlinedInput-root": {
                                                    fontFamily: "Crimson Text, serif",
                                                    fontSize: "0.9rem",
                                                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.8),
                                                    "& fieldset": {
                                                        borderColor: isLoverChat ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ff69b4", 0.3) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.divider, 0.3)
                                                    },
                                                    "&:hover fieldset": {
                                                        borderColor: isLoverChat ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ff69b4", 0.5) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.5)
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: isLoverChat ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ff69b4", 0.7) : theme.palette.secondary.main
                                                    }
                                                }
                                            },
                                            InputProps: {
                                                endAdornment: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$InputAdornment$2f$InputAdornment$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InputAdornment$3e$__["InputAdornment"], {
                                                    position: "end",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                                        onClick: handleSendMessage,
                                                        disabled: !chatInput.trim(),
                                                        sx: {
                                                            color: isLoverChat ? "#ff69b4" : theme.palette.secondary.main,
                                                            "&:hover": {
                                                                backgroundColor: isLoverChat ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#ff69b4", 0.1) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.1)
                                                            },
                                                            "&:disabled": {
                                                                color: theme.palette.text.disabled
                                                            }
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                                            lineNumber: 861,
                                                            columnNumber: 29
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                                        lineNumber: 844,
                                                        columnNumber: 27
                                                    }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                                    lineNumber: 843,
                                                    columnNumber: 25
                                                }, void 0)
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                            lineNumber: 801,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                        lineNumber: 788,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0));
                                })()
                            ]
                        }, void 0, true);
                    })()
                }, void 0, false)
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
        lineNumber: 159,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
    // If fullscreen, wrap in a modal/overlay
    if (isFullscreen) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
            sx: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                backgroundColor: theme.palette.background.default,
                display: "flex",
                flexDirection: "column"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        padding: 1.5,
                        borderBottom: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.divider, 0.2)}`,
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.95),
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    },
                    children: [
                        selectedChatType === "social" && selectedFriendId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                            onClick: ()=>setSelectedFriendId(null),
                            size: "small",
                            sx: {
                                color: theme.palette.text.secondary,
                                "&:hover": {
                                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.1)
                                }
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$ArrowBack$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                lineNumber: 917,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                            lineNumber: 907,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            sx: {
                                fontFamily: "Cinzel, serif",
                                fontSize: "1.2rem",
                                fontWeight: 600,
                                color: theme.palette.text.primary,
                                textTransform: "capitalize",
                                flex: 1
                            },
                            children: selectedFriendId ? __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$data$2f$mockChatData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockFriends"].find((f)=>f.id === selectedFriendId)?.name || "Chat" : selectedChatType === "social" ? "Friends" : `${selectedChatType} Chat`
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                            lineNumber: 920,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                            onClick: ()=>setIsFullscreen(false),
                            size: "small",
                            sx: {
                                color: theme.palette.text.secondary,
                                "&:hover": {
                                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.1)
                                }
                            },
                            title: "Minimize",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Minimize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                sx: {
                                    fontSize: "1rem"
                                }
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                                lineNumber: 948,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                            lineNumber: 937,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                    lineNumber: 896,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        flex: 1,
                        overflow: "hidden"
                    },
                    children: chatContent
                }, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
                    lineNumber: 953,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx",
            lineNumber: 882,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return chatContent;
};
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameTimeDisplay.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GameTimeDisplay",
    ()=>GameTimeDisplay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
;
;
const GameTimeDisplay = ({ gameTime })=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    // Format hour (1-4 represent morning, afternoon, evening, night)
    const formatHour = (hour)=>{
        const times = [
            "Morning",
            "Afternoon",
            "Evening",
            "Night"
        ];
        return times[hour - 1] || `Phase ${hour}`;
    };
    // Get season name (1-7) - matching backend SeasonEnum
    const getSeasonName = (season)=>{
        const seasons = [
            "Seeding",
            "RainFall",
            "GreenTide",
            "HarvestMoon",
            "SunDry",
            "Frostveil",
            "LongDark"
        ];
        return seasons[season - 1] || `Season ${season}`;
    };
    // Get day name (1-6) - game has 6 days per week
    const getDayName = (dayOfWeek)=>{
        const days = [
            "Moonday",
            "Fireday",
            "Waterday",
            "Earthday",
            "Windday",
            "Lightday"
        ];
        return days[dayOfWeek - 1] || `Day ${dayOfWeek}`;
    };
    const timeString = formatHour(gameTime.hour);
    const seasonName = getSeasonName(gameTime.season);
    const dayName = getDayName(gameTime.dayOfWeek);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            position: "absolute",
            top: 16,
            right: 16,
            padding: "0.5rem 1rem",
            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.9),
            border: `2px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.5)}`,
            borderRadius: 2,
            boxShadow: `0 4px 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.2)}`,
            backdropFilter: "blur(8px)",
            zIndex: 10
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
            sx: {
                fontFamily: "Cinzel, serif",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: theme.palette.secondary.main,
                textAlign: "center",
                lineHeight: 1.3
            },
            children: [
                dayName,
                ", Day ",
                gameTime.dayOfSeason,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameTimeDisplay.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                seasonName,
                " • Year ",
                gameTime.year,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameTimeDisplay.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                timeString
            ]
        }, void 0, true, {
            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameTimeDisplay.tsx",
            lineNumber: 53,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameTimeDisplay.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/LocationInfo.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LocationInfo",
    ()=>LocationInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
;
;
const LocationInfo = ({ region, subRegion, locationName })=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            padding: "0.75rem 1rem",
            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.8),
            border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.divider, 0.2)}`,
            borderRadius: 1,
            mb: 2
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
            sx: {
                fontFamily: "Cinzel, serif",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: theme.palette.text.primary,
                textAlign: "center"
            },
            children: [
                region,
                " / ",
                subRegion,
                " / ",
                locationName
            ]
        }, void 0, true, {
            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/LocationInfo.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/LocationInfo.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameTimeAndLocation.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GameTimeAndLocation",
    ()=>GameTimeAndLocation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
;
;
const GameTimeAndLocation = ({ gameTime, region, subRegion, locationName })=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    // Format hour (1-4 represent morning, afternoon, evening, night)
    const formatHour = (hour)=>{
        const times = [
            "Morning",
            "Afternoon",
            "Evening",
            "Night"
        ];
        return times[hour - 1] || `Phase ${hour}`;
    };
    // Get season name (1-7) - matching backend SeasonEnum
    const getSeasonName = (season)=>{
        const seasons = [
            "Seeding",
            "RainFall",
            "GreenTide",
            "HarvestMoon",
            "SunDry",
            "Frostveil",
            "LongDark"
        ];
        return seasons[season - 1] || `Season ${season}`;
    };
    // Get day name (1-6) - game has 6 days per week
    const getDayName = (dayOfWeek)=>{
        const days = [
            "Moonday",
            "Fireday",
            "Waterday",
            "Earthday",
            "Windday",
            "Lightday"
        ];
        return days[dayOfWeek - 1] || `Day ${dayOfWeek}`;
    };
    const timeString = formatHour(gameTime.hour);
    const seasonName = getSeasonName(gameTime.season);
    const dayName = getDayName(gameTime.dayOfWeek);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            position: "absolute",
            top: 16,
            right: 16,
            padding: "0.75rem 1rem",
            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.9),
            border: `2px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.5)}`,
            borderRadius: 2,
            boxShadow: `0 4px 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.2)}`,
            backdropFilter: "blur(8px)",
            zIndex: 10,
            textAlign: "right"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                sx: {
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: theme.palette.secondary.main,
                    lineHeight: 1.4,
                    whiteSpace: "nowrap"
                },
                children: [
                    dayName,
                    " - ",
                    gameTime.dayOfSeason,
                    " - ",
                    seasonName,
                    " - ",
                    gameTime.year,
                    " - ",
                    timeString
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameTimeAndLocation.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                sx: {
                    fontFamily: "Cinzel, serif",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                    lineHeight: 1.4,
                    whiteSpace: "nowrap",
                    mt: 0.25
                },
                children: [
                    region,
                    " / ",
                    subRegion,
                    " / ",
                    locationName
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameTimeAndLocation.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameTimeAndLocation.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/workspace/MyProject/Client/webapp/src/components/GameView/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameViewIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameViewIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$PartyMemberCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$ActionScheduleModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$ActionSelectionModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionSelectionModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$EquipmentSlot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/EquipmentSlot.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$CharacterStatsModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$NewsItem$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsItem.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$SettingsButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/SettingsButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$SettingsModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/SettingsModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$NewsModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$ChatPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameTimeDisplay$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameTimeDisplay.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$LocationInfo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/LocationInfo.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameTimeAndLocation$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameTimeAndLocation.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$CharacterNeedsBar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterNeedsBar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$ActionIndicator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionIndicator.tsx [app-ssr] (ecmascript)");
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
;
}),
"[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GameView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameSidebar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$PartyMemberCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/PartyMemberCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$SettingsButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/SettingsButton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$SettingsModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/SettingsModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$NewsModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/NewsModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$ChatPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/ChatPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameTimeAndLocation$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/GameTimeAndLocation.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$ActionScheduleModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/ActionScheduleModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$CharacterStatsModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/GameView/CharacterStatsModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$data$2f$mockNewsData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/data/mockNewsData.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
// Mock game time - will come from backend later
const mockGameTime = {
    hour: 3,
    dayOfWeek: 2,
    dayOfSeason: 15,
    season: 1,
    dayPassed: 14,
    year: 1
};
function GameView({ mockPartyData } = {}) {
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [selectedMemberIndex, setSelectedMemberIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [scheduleModalOpen, setScheduleModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [statsModalOpen, setStatsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [settingsModalOpen, setSettingsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newsModalOpen, setNewsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Mock location data - will come from backend later
    const location = {
        name: "Wayward Inn",
        region: "Central",
        subRegion: "Capital",
        situation: "demo"
    };
    // Keyboard shortcuts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyPress = (e)=>{
            // Don't trigger if user is typing in an input/textarea
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }
            switch(e.key.toLowerCase()){
                case "c":
                    break;
                case "s":
                    // Open Skills - placeholder for now
                    console.log("Skills clicked - S key");
                    break;
                case "i":
                    // Open Inventory - placeholder for now
                    console.log("Inventory clicked - I key");
                    break;
                case "n":
                    setNewsModalOpen(true);
                    break;
                case "t":
                    setScheduleModalOpen(true);
                    break;
                default:
                    break;
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return ()=>window.removeEventListener("keydown", handleKeyPress);
    }, []);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        sx: {
            height: "100vh",
            maxHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            background: "var(--gradient-arcane)",
            backgroundAttachment: "fixed",
            padding: 2,
            gap: 2,
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                sx: {
                    flex: 1,
                    display: "flex",
                    gap: 2,
                    minHeight: 0,
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameSidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameSidebar"], {
                        onScheduleClick: ()=>setScheduleModalOpen(true),
                        onSkillsClick: ()=>console.log("Skills clicked"),
                        onInventoryClick: ()=>console.log("Inventory clicked"),
                        onNewsClick: ()=>setNewsModalOpen(true)
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        sx: {
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            minHeight: 0,
                            backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.background.paper, 0.9),
                            border: `2px solid ${theme.palette.tertiary?.main || theme.palette.secondary.main}`,
                            borderRadius: 2,
                            padding: 4,
                            boxShadow: `
              0 4px 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.1)},
              inset 0 1px 0 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3)}
            `,
                            overflow: "hidden"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 2,
                                    alignItems: "flex-start",
                                    mb: 3
                                },
                                children: mockParty.map((member, originalIndex)=>({
                                        member,
                                        originalIndex
                                    })).filter(({ member })=>member.name) // Only show members with names
                                .map(({ member, originalIndex })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$PartyMemberCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PartyMemberCard"], {
                                        portrait: member.portrait || undefined,
                                        name: member.name || undefined,
                                        title: member.title || undefined,
                                        level: member.level || undefined,
                                        isPlayer: member.isPlayer,
                                        isSelected: selectedMemberIndex === originalIndex,
                                        isEmpty: !member.name,
                                        needs: member.needs,
                                        nextAction: originalIndex === 0 ? "Craft Magic Staff" : originalIndex === 1 ? "Train Strength" : originalIndex === 2 ? "Rest" : undefined,
                                        actionType: originalIndex === 0 ? "crafting" : originalIndex === 1 ? "training" : originalIndex === 2 ? "resting" : undefined,
                                        onClick: ()=>{
                                            setSelectedMemberIndex(originalIndex);
                                            setStatsModalOpen(true);
                                        }
                                    }, originalIndex, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                                        lineNumber: 188,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this),
                            location.situation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    width: "100%",
                                    height: "35vh",
                                    minHeight: 200,
                                    maxHeight: 350,
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    border: `2px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.secondary.main, 0.3)}`,
                                    boxShadow: `0 4px 16px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.1)}`,
                                    mb: 3,
                                    position: "relative"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: `/img/${location.situation}.png`,
                                        alt: location.name,
                                        style: {
                                            width: "100%",
                                            height: "100%",
                                            display: "block",
                                            objectFit: "cover",
                                            objectPosition: "center"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                                        lineNumber: 240,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$GameTimeAndLocation$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GameTimeAndLocation"], {
                                        gameTime: mockGameTime,
                                        region: location.region,
                                        subRegion: location.subRegion,
                                        locationName: location.name
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                                        lineNumber: 252,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                                lineNumber: 226,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    minHeight: 0,
                                    overflow: "hidden"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$ChatPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatPanel"], {
                                    currentUserId: "mock-character-001"
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                                    lineNumber: 271,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                                lineNumber: 262,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$ActionScheduleModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActionScheduleModal"], {
                open: scheduleModalOpen,
                onClose: ()=>setScheduleModalOpen(false),
                onSave: handleScheduleSave,
                onTravelClick: handleTravelClick,
                onRailTravelClick: handleRailTravelClick,
                hasRailStation: true
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$CharacterStatsModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CharacterStatsModal"], {
                open: statsModalOpen,
                onClose: ()=>setStatsModalOpen(false),
                character: mockParty[selectedMemberIndex] || null
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                lineNumber: 287,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$SettingsModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SettingsModal"], {
                open: settingsModalOpen,
                onClose: ()=>setSettingsModalOpen(false)
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                lineNumber: 294,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$NewsModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NewsModal"], {
                open: newsModalOpen,
                onClose: ()=>setNewsModalOpen(false),
                news: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$data$2f$mockNewsData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockNews"]
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                lineNumber: 300,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$GameView$2f$SettingsButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SettingsButton"], {
                onClick: ()=>setSettingsModalOpen(true)
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
                lineNumber: 307,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx",
        lineNumber: 125,
        columnNumber: 5
    }, this);
}
}),
"[project]/workspace/MyProject/Client/webapp/src/L10N/skillEnums.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BarbarianSkillId",
    ()=>BarbarianSkillId,
    "BasicSkillId",
    ()=>BasicSkillId,
    "ClericSkillId",
    ()=>ClericSkillId,
    "DruidSkillId",
    ()=>DruidSkillId,
    "DuelistSkillId",
    ()=>DuelistSkillId,
    "EngineerSkillId",
    ()=>EngineerSkillId,
    "GuardianSkillId",
    ()=>GuardianSkillId,
    "InquisitorSkillId",
    ()=>InquisitorSkillId,
    "KnightSkillId",
    ()=>KnightSkillId,
    "MageSkillId",
    ()=>MageSkillId,
    "MobSkillId",
    ()=>MobSkillId,
    "MonkSkillId",
    ()=>MonkSkillId,
    "MysticSkillId",
    ()=>MysticSkillId,
    "NomadSkillId",
    ()=>NomadSkillId,
    "PaladinSkillId",
    ()=>PaladinSkillId,
    "RogueSkillId",
    ()=>RogueSkillId,
    "ScholarSkillId",
    ()=>ScholarSkillId,
    "SeerSkillId",
    ()=>SeerSkillId,
    "ShamanSkillId",
    ()=>ShamanSkillId,
    "SpellbladeSkillId",
    ()=>SpellbladeSkillId,
    "WarlockSkillId",
    ()=>WarlockSkillId,
    "WarriorSkillId",
    ()=>WarriorSkillId,
    "WitchSkillId",
    ()=>WitchSkillId
]);
var BasicSkillId = /*#__PURE__*/ function(BasicSkillId) {
    BasicSkillId["Basic"] = "Basic";
    return BasicSkillId;
}({});
var MobSkillId = /*#__PURE__*/ function(MobSkillId) {
    MobSkillId["WorksYouMaggots"] = "WorksYouMaggots";
    MobSkillId["CommanderScream"] = "CommanderScream";
    MobSkillId["Whip"] = "Whip";
    MobSkillId["ThrowPebble"] = "ThrowPebble";
    MobSkillId["PanicSlash"] = "PanicSlash";
    MobSkillId["Shriek"] = "Shriek";
    return MobSkillId;
}({});
var ClericSkillId = /*#__PURE__*/ function(ClericSkillId) {
    ClericSkillId["Heal"] = "Heal";
    ClericSkillId["MassHeal"] = "MassHeal";
    // Revive = "Revive", // Bring fallen ally back with 25% HP
    ClericSkillId["Radiance"] = "Radiance";
    ClericSkillId["Bless"] = "Bless";
    ClericSkillId["TurnUndead"] = "TurnUndead";
    return ClericSkillId;
}({});
var SeerSkillId = /*#__PURE__*/ function(SeerSkillId) {
    SeerSkillId["Precognition"] = "Precognition";
    // Rare
    // Desc: See the future, gain Precognition buff for 1 turn:
    // Procognition: next attacker that target you must roll their LUKsave vs DC10+<your LUKmod>+(skill level - 1) or it will surely miss, remove the buff after checking.
    // At level 5 if the attacker miss, you gain 1 order
    // At level 7 when used, roll a d20 + <LUKmod> if passed, gain 1 more turn of Precognition buff
    SeerSkillId["ThreadSnip"] = "ThreadSnip";
    // Uncommon
    // Desc: Look into the planar thread and pulled it away from an enemy: Deal 1d4 + <CHAmod> to an enemy, roll D14 (-1 per skill level) dice. I passed, randomly steal 1 element from the enemy
    SeerSkillId["PlanarEcho"] = "PlanarEcho";
    return SeerSkillId;
}({});
var MageSkillId = /*#__PURE__*/ function(MageSkillId) {
    MageSkillId["ArcaneBolt"] = "ArcaneBolt";
    MageSkillId["ArcaneShield"] = "ArcaneShield";
    MageSkillId["Backdraft"] = "Backdraft";
    MageSkillId["FireBolt"] = "FireBolt";
    MageSkillId["FireBall"] = "FireBall";
    MageSkillId["BurningHand"] = "BurningHand";
    return MageSkillId;
}({});
var MysticSkillId = /*#__PURE__*/ function(MysticSkillId) {
    MysticSkillId["MistStep"] = "MistStep";
    // “Shift like mist to a safer position. Move to the backline if you are in the front row; if already in the back row, gain evasion instead. Remove Slow or Bind if present. Gain +3 dodge roll for 1 turn (increases to 2 turns at skill level 5).”
    MysticSkillId["PlanarAbsorption"] = "PlanarAbsorption";
    // Gain 'Planar Absorption' buff for 2d3 stacks + intelligence mod + 0.01 times per skill level, If Attacked by a magic spell, absorb damage up to the stacks of planar absoprtion buff,
    // Every 4 damage of each type that is absorbed turned into 1 resource of that element type.
    MysticSkillId["InnerVeil"] = "InnerVeil";
    // Cast a veil on one frontline ally, make them harder to target or hit.
    // (Minor concealment / dodge / accuracy debuff to enemy)
    // Role: soft-support defensive buff.
    MysticSkillId["ReversalPalm"] = "ReversalPalm";
    return MysticSkillId;
}({});
var RogueSkillId = /*#__PURE__*/ function(RogueSkillId) {
    RogueSkillId["RetreatDash"] = "RetreatDash";
    RogueSkillId["Backstab"] = "Backstab";
    RogueSkillId["BleedingCut"] = "BleedingCut";
    // Uncommon
    // require sword dagger or blade
    // Deal weapons damage + Dex mod * (1 + 0.1 * skill level) slash
    // Must be front - front to deal full damage (see skills that have positionMultiplier)
    // target must roll DC10 (DC12 at lvl 5) Endurance save. or get 1d3 bleed stacks (debuff)
    // Bleed: takes 1d3 damage per turn for 3 turns.
    RogueSkillId["ThrowingKnives"] = "ThrowingKnives";
    // Common
    // Any range
    // Throw knives at 2 targets, each deals 1d4 + Dex mod * (1 + 0.1 * skill level) pierce damage.
    // target can be repeat, (so just get random again and again, no thing special here)
    // at level 5, add 2 more knives to the throw
    RogueSkillId["Hiding"] = "Hiding";
    return RogueSkillId;
}({});
var SpellbladeSkillId = /*#__PURE__*/ function(SpellbladeSkillId) {
    SpellbladeSkillId["PlanarEdge"] = "PlanarEdge";
    // Cantrip, auto attack, core idea for spell blade
    // Dealing arcane damage, melee (see positionModifier)
    // must equip sword, blade, dagger or barehand(no weapon)
    // If weapon exist, deal weapon damage + planar mod + edge charge stacks * (1 + 0.1 * skill level) arcane damage.
    // If no weapon, damage dice based on skill Level, 1d6, 1d6, 1d8, 1d8 and 2d4 (level 1-5) + planar mod + edge charge stacks * (1 + 0.1 * skill level) arcane damage.
    // and generate "Edge Charge". Buff
    // Edge Charge buff maximum 5 stacks, no limit on duration.
    // produce 1 wind
    SpellbladeSkillId["WindSlash"] = "WindSlash";
    // Uncommon
    // Any range
    // Deal (Planar edge-like damage) * (1 + 0.1 * skill level) arcane damage.
    // consume 1 wind, produce natural
    // Target roll DC7 + (user planar mod) endurance save or get bleed for 1d2 turn.
    // At level 5, if edge charge stacks > 0 deal additional 0.5 damage per stack, round down.
    SpellbladeSkillId["SpellParry"] = "SpellParry";
    // rare
    // Get Spell Parry buff for 1 turn.
    // Spell Parry: reduce next spell’s damage by (5 + Int mod).
    // If attacked by a spell, gain 1 Edge Charge (2 if 0 damage taken).
    // At level 5 also produce 1 Edge Charge when used.
    // Comsume 1 wind, produce 1 chaos
    SpellbladeSkillId["EdgeBurst"] = "EdgeBurst";
    return SpellbladeSkillId;
}({});
var ShamanSkillId = /*#__PURE__*/ function(ShamanSkillId) {
    ShamanSkillId["MendSpirit"] = "MendSpirit";
    ShamanSkillId["HexOfRot"] = "HexOfRot";
    ShamanSkillId["HolyRattle"] = "SpiritRattle";
    ShamanSkillId["ChaoticBlessing"] = "ChaoticBlessing";
    return ShamanSkillId;
}({});
var BarbarianSkillId = /*#__PURE__*/ function(BarbarianSkillId) {
    BarbarianSkillId["Rage"] = "Rage";
    // Cantrip,
    // Common
    // Can't have Rage Buff
    // Gain Rage for 3 turns (pAtk + 2, pDef and mDef - 2). At lvl5: 4 turns
    // consume 3 SP, produce 1 fire.
    BarbarianSkillId["RecklessSwing"] = "RecklessSwing";
    // Common
    // Multi-hit melee.
    // must have sword axe blade hammer spear barehand
    // 2 hits (3 hits at lvl5), each (0.7×weapon + STR mod) * (1 + 0.1 * skill level) * (positionModifier) damage = weapon damage type , -3 hit roll.
    // consume 4 SP 1 fire, produce 1 neutral
    BarbarianSkillId["Earthshatter"] = "Earthshatter";
    return BarbarianSkillId;
}({});
var WarriorSkillId = /*#__PURE__*/ function(WarriorSkillId) {
    WarriorSkillId["Cleave"] = "Cleave";
    // common
    // consume 2 neutral, produce 1 wind
    // Deal 1x weapon damage ((at level 5 = 1.2x), + str mod) * (skillScalar) * (positionModifier) attacking enemy to the 'front most row' (so the skill scalar must know which row we're attacking)
    WarriorSkillId["PowerStrike"] = "PowerStrike";
    // Common
    // consume 2 neutral, produce 1 fire
    // ACTIVE — Strong single-target melee attack.
    // Higher may be (1.3 and 1.5 at level 5 + str mod) * (skillScalar) * (posotionModifier)
    // Bread-and-butter offensive skill.
    WarriorSkillId["WarCry"] = "WarCry";
    return WarriorSkillId;
}({});
var KnightSkillId = /*#__PURE__*/ function(KnightSkillId) {
    KnightSkillId["PrecisionThrust"] = "PrecisionThrust";
    // Uncommon
    // Require sword, spear
    // target one frontfirst
    // Thrust the sword or spear right at one enemy dealing ((weapon damage + Str mod) * (1 + 0.1 * skill level)) * (positionModifier) pierce damage. with addtional +3 hit roll
    // If enemy has any debuff, crit change + 2 (4 at level 5).
    // consume 2 fire, produce 1 earth
    KnightSkillId["AdvancingPace"] = "AdvancingPace";
    return KnightSkillId;
}({});
var GuardianSkillId = /*#__PURE__*/ function(GuardianSkillId) {
    GuardianSkillId["Taunt"] = "Taunt";
    GuardianSkillId["HerosPose"] = "HerosPose";
    GuardianSkillId["ShieldUp"] = "ShieldUp";
    GuardianSkillId["Bash"] = "Bash";
    return GuardianSkillId;
}({});
var PaladinSkillId = /*#__PURE__*/ function(PaladinSkillId) {
    PaladinSkillId["DivineStrike"] = "DivineStrike";
    // ACTIVE — A melee attack blessed with holy energy.
    // target one, front first, melee.
    // Must have any weapon but not bow, orb, wand, book,
    // Deal (weapon damage * 1.2 + (str mod) + (will mod)) * (skill level multiplier) * (position modifier) holy damage.
    // If enemy is undead or fiend, deal additional 1d6 holy damage. (1d10 at lvl5)
    // consume 2 order, produce 1 neutral.
    PaladinSkillId["AegisPulse"] = "AegisPulse";
    // Must have Aegis Pulse buff
    // ACTIVE — Emit a wave of holy light.
    // Healing allies for 1d4 + willpower mod * (1 + 0.1 * skill level) HP.
    // Dealing small holy damage to all enemies. for 1d4 + willpower mod * (1 + 0.1 * skill level) holy damage.
    // consume nothing but will remove Aegis Pulse buff.
    PaladinSkillId["AegisShield"] = "AegisShield";
    return PaladinSkillId;
}({});
var DruidSkillId = /*#__PURE__*/ function(DruidSkillId) {
    DruidSkillId["VineWhip"] = "VineWhip";
    // Deal 1d6 + (willpower mod) * (1 + 0.1 * skill level) nature damage.
    // target roll DC7 endurance save or get entangled for 1 turn.
    // Entangled: when take turns, must roll DC10 strength save or skip the turn.
    // produce 1 earth.
    DruidSkillId["ThrowSpear"] = "ThrowSpear";
    // Must equip Spear
    // rare
    // deal damage based on range.
    // if front - front 0.8 + skillLevel
    // if front - back 1.2 + skillLevel
    // if back - back 1.6 + skillLevel
    // Note that this skill don't have level multiplier but add the level into damage directly.
    // at level 5, based range damage added 0.2 times (1.0, 1.4, 1.8)
    // consume 2 neutral, produce 1 earth.
    DruidSkillId["RejuvenatingMist"] = "RejuvenatingMist";
    return DruidSkillId;
}({});
var MonkSkillId = /*#__PURE__*/ function(MonkSkillId) {
    MonkSkillId["PalmStrike"] = "PalmStrike";
    // ACTIVE — A precise melee strike using internal force.
    // target one, front first, melee.
    // Must equip barehand.
    // deal 1d6 + (str | dex mod whichever higher) * (position modifier) blunt damage.
    // Each level ignore 1 point of armor.
    // at level 5 damage dice = 1d8
    // produce 1 wind.
    // If armor is NOT cloth, damageOutput reduce by 70%.
    MonkSkillId["Meditation"] = "Meditation";
    // Restore 1d4 + skillLevel to HP or MP or SP, whichever is lowest (in percent).
    // produce 1 order.
    MonkSkillId["FlurryOfBlows"] = "FlurryOfBlows";
    return MonkSkillId;
}({});
var WarlockSkillId = /*#__PURE__*/ function(WarlockSkillId) {
    WarlockSkillId["ChaosBolt"] = "ShadowBolt";
    // ACTIVE — Launch a bolt of condensed shadow energy.
    // Ranged single-target magic damage with a small chance to weaken the target.
    // Basic Warlock nuke.
    WarlockSkillId["LifeDrain"] = "LifeDrain";
    // ACTIVE — Drain vitality from an enemy.
    // Deals damage and restores a portion of HP to the Warlock.
    // Core sustain tool.
    WarlockSkillId["Corruption"] = "Corruption";
    // ACTIVE — Corrupt the target with dark energy.
    // Deals immediate damage and applies multiple debuffs.
    // DOT/Debuff application tool.
    WarlockSkillId["DarkPact"] = "DarkPact";
    return WarlockSkillId;
}({});
var DuelistSkillId = /*#__PURE__*/ function(DuelistSkillId) {
    DuelistSkillId["PreciseStrike"] = "PreciseStrike";
    // ACTIVE — Execute a precise blade strike with perfect timing.
    // Basic precision attack, generates wind element.
    // Uses CONTROL for precision (expanded attribute).
    DuelistSkillId["ParryRiposte"] = "ParryRiposte";
    // ACTIVE — Assume defensive stance, ready to parry and counter.
    // Defensive counter-attack with reactive mechanics.
    // Uses CONTROL for precision timing (expanded attribute).
    DuelistSkillId["BladeFlurry"] = "BladeFlurry";
    // ACTIVE — Unleash a rapid flurry of blade strikes.
    // Multi-hit combo for fast damage application.
    DuelistSkillId["DuelingStance"] = "DuelingStance";
    return DuelistSkillId;
}({});
var WitchSkillId = /*#__PURE__*/ function(WitchSkillId) {
    WitchSkillId["PoisonDart"] = "CurseBolt";
    // ACTIVE — Launch a bolt of cursed energy at the target.
    // Basic curse attack, generates chaos element.
    // Uses INTELLIGENCE for damage, CONTROL for save DC (precision in curse application).
    WitchSkillId["ChaosBrand"] = "CurseMark";
    // ACTIVE — Place a hex sigil on a target, marking them for increased suffering.
    // Setup skill that amplifies damage from all sources.
    // Uses INTELLIGENCE for strategic advantage (knowledge of weak points).
    // Good idea, but seems like we need a new buff again? can we just use the existing ones?
    WitchSkillId["ChaosBinding"] = "HexDoll";
    // ACTIVE — Bind a target to a small effigy, creating a sympathetic link.
    // Voodoo doll mechanic with damage over time.
    // Uses INTELLIGENCE for damage, CONTROL for save DC (precision in hex application).
    WitchSkillId["Bewitch"] = "Bewitch";
    return WitchSkillId;
}({});
var InquisitorSkillId = /*#__PURE__*/ function(InquisitorSkillId) {
    InquisitorSkillId["RadiantSmite"] = "RadiantSmite";
    // ACTIVE — Launch a focused blast of radiant energy.
    // Basic holy damage nuke, generates order element.
    // Deals 1d6 + (WIL + PLANAR)/2 holy damage. DC8 + control mod willpower save for Exposed.
    // +1d4 bonus damage against undead/fiends. 1d8 at level 5.
    InquisitorSkillId["ExposeWeakness"] = "ExposeWeakness";
    // ACTIVE — Reveal the enemy's wrongdoing or impurity.
    // Setup skill that applies Exposed debuff. Consumes order, produces fire.
    // Marked enemies take +1d3 damage from all sources. -2 crit defense at level 5.
    // Inquisitor gains +WIL mod/2 hit against exposed enemies.
    InquisitorSkillId["PurgeMagic"] = "PurgeMagic";
    // ACTIVE — Attempt to forcibly remove magical buffs from a target.
    // DC10 + control mod willpower save. Failed: remove 1-2 buffs + deal holy damage.
    // Passed: deal half holy damage. Consumes fire, produces order.
    InquisitorSkillId["JudgmentDay"] = "JudgmentDay";
    return InquisitorSkillId;
}({});
var ScholarSkillId = /*#__PURE__*/ function(ScholarSkillId) {
    ScholarSkillId["Analyze"] = "Analyze";
    // Uncommon
    // Mark a vulnerable spot on the enemy. For 2 turns, the marked enemy get Exposed debuff
    // Exposed: takes additional 1d3 damage from all sources.
    // if skill level is 5, the exposed enemy also gain -2 to critical defense
    // We can use the 'perm' value in buff to acheive the -2 to critical defense
    ScholarSkillId["DisruptPattern"] = "DisruptPattern";
    // Cantrip
    // Force DC10 (DC12 at lvl 5) Will save.
    // Fail: target is Dazed 1 turn.
    // Success: reduce target's next initiative by 20 (30 at lvl 5).
    ScholarSkillId["CognitiveOverload"] = "CognitiveOverload";
    return ScholarSkillId;
}({});
var EngineerSkillId = /*#__PURE__*/ function(EngineerSkillId) {
    EngineerSkillId["ExplosiveBolt"] = "ExplosiveBolt";
    EngineerSkillId["BearTrap"] = "BearTrap";
    return EngineerSkillId;
}({});
var NomadSkillId = /*#__PURE__*/ function(NomadSkillId) {
    NomadSkillId["AdaptiveStrike"] = "AdaptiveStrike";
    // Common
    // Deal weapon damage + attribute modifier according to the weapon * (1.0 + 0.1 per 2 character levels, max 1.5 at level 10) (the same as basic attack) and change position, must change from front -> back or back -> front and have avalilable slot in the party, hit - 2 while attacking, this attack don't have range penalty.
    NomadSkillId["TacticalSlash"] = "TacticalSlash";
    // Uncommon
    // Self row based: Adapt your stance to your current position
    // Front row: engulf your weapon with fire and attack, dealing <FORMULA> fire damage. enemy must roll DC10 (DC12 at lvl 5) Endurance save or get burn for 1d3 turn.
    // Back row: get retreat buff for 1 turns
    // formula: (weapon damage + attribute modifier + 1d4) * (skillLevelMultiplier)
    // must equip dagger or blade
    NomadSkillId["TacticalShot"] = "TacticalShot";
    return NomadSkillId;
}({});
}),
"[project]/workspace/MyProject/Client/webapp/src/data/mockPartyData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Mock party data for UI development
 * Comprehensive structure with all fields needed for UI display
 * 
 * NOTE: MockPartyMember extends CharacterStatsView for compatibility.
 * In production, use CharacterStatsView from @/types/game
 */ __turbopack_context__.s([
    "mockParty",
    ()=>mockParty
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/L10N/skillEnums.ts [app-ssr] (ecmascript)");
;
const mockParty = [
    {
        // Player Character - Mage (Hermit background)
        name: "Viljah",
        level: 1,
        portrait: "m_elven01",
        isPlayer: true,
        id: "mock-character-001",
        gender: "MALE",
        race: "Elven",
        type: "humanoid",
        background: "Hermit",
        // Title System
        epithet: "Hermit",
        role: "Mage",
        title: "Hermit Mage",
        possibleEpithets: [
            "Hermit"
        ],
        possibleRoles: [
            "Mage"
        ],
        // Alignment
        alignment: {
            good: 7,
            evil: 0
        },
        // Stats
        attributes: {
            strength: {
                base: 7,
                bonus: 0
            },
            dexterity: {
                base: 8,
                bonus: 0
            },
            agility: {
                base: 7,
                bonus: 0
            },
            endurance: {
                base: 7,
                bonus: 0
            },
            vitality: {
                base: 8,
                bonus: 0
            },
            intelligence: {
                base: 9,
                bonus: 0
            },
            willpower: {
                base: 8,
                bonus: 0
            },
            control: {
                base: 7,
                bonus: 0
            },
            planar: {
                base: 8,
                bonus: 0
            },
            luck: {
                base: 7,
                bonus: 0
            },
            charisma: {
                base: 7,
                bonus: 0
            },
            leadership: {
                base: 7,
                bonus: 0
            }
        },
        battleStats: {
            pATK: {
                base: 0,
                bonus: 0
            },
            pDEF: {
                base: 0,
                bonus: 0
            },
            mATK: {
                base: 0,
                bonus: 0
            },
            mDEF: {
                base: 0,
                bonus: 0
            },
            pCRT: {
                base: 0,
                bonus: 0
            },
            mCRT: {
                base: 0,
                bonus: 0
            },
            ACC: {
                base: 0,
                bonus: 0
            },
            EVA: {
                base: 0,
                bonus: 0
            },
            SPD: {
                base: 0,
                bonus: 0
            }
        },
        elements: {
            fire: {
                base: 0,
                bonus: 0
            },
            water: {
                base: 0,
                bonus: 0
            },
            wind: {
                base: 0,
                bonus: 0
            },
            earth: {
                base: 0,
                bonus: 0
            },
            light: {
                base: 0,
                bonus: 0
            },
            dark: {
                base: 0,
                bonus: 0
            }
        },
        proficiencies: {
            sword: {
                base: 7,
                bonus: 0
            },
            axe: {
                base: 7,
                bonus: 0
            },
            hammer: {
                base: 7,
                bonus: 0
            },
            spear: {
                base: 7,
                bonus: 0
            },
            bow: {
                base: 7,
                bonus: 0
            },
            crossbow: {
                base: 7,
                bonus: 0
            },
            book: {
                base: 7,
                bonus: 0
            },
            shield: {
                base: 7,
                bonus: 0
            },
            unarmed: {
                base: 7,
                bonus: 0
            },
            wand: {
                base: 8,
                bonus: 0
            },
            staff: {
                base: 7,
                bonus: 0
            },
            orb: {
                base: 7,
                bonus: 0
            }
        },
        artisans: {
            mining: {
                base: 7,
                bonus: 0
            },
            smelting: {
                base: 7,
                bonus: 0
            },
            smithing: {
                base: 7,
                bonus: 0
            },
            woodCutting: {
                base: 7,
                bonus: 0
            },
            carpentry: {
                base: 7,
                bonus: 0
            },
            tanning: {
                base: 7,
                bonus: 0
            },
            weaving: {
                base: 7,
                bonus: 0
            },
            jewelry: {
                base: 7,
                bonus: 0
            },
            alchemy: {
                base: 7,
                bonus: 0
            },
            cooking: {
                base: 7,
                bonus: 0
            },
            brewing: {
                base: 7,
                bonus: 0
            },
            foraging: {
                base: 7,
                bonus: 0
            },
            skinning: {
                base: 7,
                bonus: 0
            },
            agriculture: {
                base: 7,
                bonus: 0
            },
            masonry: {
                base: 7,
                bonus: 0
            },
            tinkering: {
                base: 7,
                bonus: 0
            },
            performance: {
                base: 7,
                bonus: 0
            }
        },
        // Vitals & Needs
        vitals: {
            hp: {
                current: 25,
                max: 25
            },
            mp: {
                current: 30,
                max: 30
            },
            sp: {
                current: 20,
                max: 20
            }
        },
        needs: {
            mood: 80,
            energy: 80,
            satiety: 80
        },
        // Planar Attunement
        planarAptitude: 70,
        // Skills - Active Deck
        activeSkills: [
            {
                id: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MageSkillId"].ArcaneBolt,
                level: 1,
                exp: 0
            },
            {
                id: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MageSkillId"].FireBolt,
                level: 1,
                exp: 0
            }
        ],
        // Skills - Conditional Deck
        conditionalSkills: [
            {
                id: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MageSkillId"].ArcaneShield,
                level: 1,
                exp: 0
            }
        ],
        conditionalSkillsCondition: {
            selectedCondition: "SELF",
            self: {
                vital: {
                    hp: {
                        min: 0,
                        max: 50
                    }
                }
            }
        },
        // Skills - Breathing Deck (empty for now)
        breathingSkills: [],
        // Inventory
        inventory: [
            {
                id: "HealingPotion",
                name: "Healing Potion",
                desc: "Restores 2d4+2 HP when consumed.",
                weight: 0.5,
                cost: 50,
                quantity: 2
            },
            {
                id: "ManaPotion",
                name: "Mana Potion",
                desc: "Restores 1d4+1 MP when consumed.",
                weight: 0.5,
                cost: 75,
                quantity: 1
            }
        ],
        // Equipment
        equipment: [
            {
                slot: "body",
                id: "Body.Robe",
                name: "Robe",
                desc: "A simple cloth robe favored by mages.",
                weight: 2,
                cost: 50,
                armorStats: {
                    pDEF: 0,
                    mDEF: 1
                }
            },
            {
                slot: "rightHand",
                id: "Weapon.Wand",
                name: "Wand",
                desc: "A basic magical wand for channeling arcane energy.",
                weight: 1,
                cost: 100,
                weaponStats: {
                    pDice: undefined,
                    mDice: "1d4",
                    mDmg: 1,
                    mHit: 2,
                    mCrit: 1,
                    weaponType: "Wand",
                    handle: 1
                }
            }
        ]
    },
    {
        // NPC 1 - Fighter (Soldier background)
        name: "Thorin",
        level: 3,
        portrait: "m_dwarf01",
        isPlayer: false,
        id: "mock-character-002",
        gender: "MALE",
        race: "Dwarven",
        type: "humanoid",
        background: "Soldier",
        epithet: "Soldier",
        role: "Fighter",
        title: "Soldier Fighter",
        possibleEpithets: [
            "Soldier"
        ],
        possibleRoles: [
            "Fighter"
        ],
        alignment: {
            good: 5,
            evil: 0
        },
        attributes: {
            strength: {
                base: 10,
                bonus: 0
            },
            dexterity: {
                base: 7,
                bonus: 0
            },
            agility: {
                base: 7,
                bonus: 0
            },
            endurance: {
                base: 11,
                bonus: 0
            },
            vitality: {
                base: 10,
                bonus: 0
            },
            intelligence: {
                base: 7,
                bonus: 0
            },
            willpower: {
                base: 8,
                bonus: 0
            },
            control: {
                base: 7,
                bonus: 0
            },
            planar: {
                base: 7,
                bonus: 0
            },
            luck: {
                base: 7,
                bonus: 0
            },
            charisma: {
                base: 7,
                bonus: 0
            },
            leadership: {
                base: 8,
                bonus: 0
            }
        },
        battleStats: {
            pATK: {
                base: 0,
                bonus: 0
            },
            pDEF: {
                base: 0,
                bonus: 0
            },
            mATK: {
                base: 0,
                bonus: 0
            },
            mDEF: {
                base: 0,
                bonus: 0
            },
            pCRT: {
                base: 0,
                bonus: 0
            },
            mCRT: {
                base: 0,
                bonus: 0
            },
            ACC: {
                base: 0,
                bonus: 0
            },
            EVA: {
                base: 0,
                bonus: 0
            },
            SPD: {
                base: 0,
                bonus: 0
            }
        },
        elements: {
            fire: {
                base: 0,
                bonus: 0
            },
            water: {
                base: 0,
                bonus: 0
            },
            wind: {
                base: 0,
                bonus: 0
            },
            earth: {
                base: 0,
                bonus: 0
            },
            light: {
                base: 0,
                bonus: 0
            },
            dark: {
                base: 0,
                bonus: 0
            }
        },
        proficiencies: {
            sword: {
                base: 8,
                bonus: 0
            },
            axe: {
                base: 8,
                bonus: 0
            },
            hammer: {
                base: 8,
                bonus: 0
            },
            spear: {
                base: 7,
                bonus: 0
            },
            bow: {
                base: 7,
                bonus: 0
            },
            crossbow: {
                base: 7,
                bonus: 0
            },
            book: {
                base: 7,
                bonus: 0
            },
            shield: {
                base: 8,
                bonus: 0
            },
            unarmed: {
                base: 7,
                bonus: 0
            }
        },
        artisans: {
            mining: {
                base: 8,
                bonus: 0
            },
            smelting: {
                base: 7,
                bonus: 0
            },
            smithing: {
                base: 7,
                bonus: 0
            },
            woodCutting: {
                base: 7,
                bonus: 0
            },
            carpentry: {
                base: 7,
                bonus: 0
            },
            tanning: {
                base: 7,
                bonus: 0
            },
            weaving: {
                base: 7,
                bonus: 0
            },
            jewelry: {
                base: 7,
                bonus: 0
            },
            alchemy: {
                base: 7,
                bonus: 0
            },
            cooking: {
                base: 7,
                bonus: 0
            },
            brewing: {
                base: 7,
                bonus: 0
            },
            foraging: {
                base: 7,
                bonus: 0
            },
            skinning: {
                base: 7,
                bonus: 0
            },
            agriculture: {
                base: 7,
                bonus: 0
            },
            masonry: {
                base: 7,
                bonus: 0
            },
            tinkering: {
                base: 7,
                bonus: 0
            },
            performance: {
                base: 7,
                bonus: 0
            }
        },
        vitals: {
            hp: {
                current: 35,
                max: 35
            },
            mp: {
                current: 10,
                max: 10
            },
            sp: {
                current: 25,
                max: 25
            }
        },
        needs: {
            mood: 65,
            energy: 60,
            satiety: 70
        },
        planarAptitude: 50,
        activeSkills: [
            {
                id: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WarriorSkillId"].PowerStrike,
                level: 1,
                exp: 0
            },
            {
                id: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WarriorSkillId"].Cleave,
                level: 1,
                exp: 0
            }
        ],
        conditionalSkills: [],
        conditionalSkillsCondition: {
            selectedCondition: "NONE"
        },
        breathingSkills: [],
        inventory: [
            {
                id: "IronIngot",
                name: "Iron Ingot",
                desc: "A refined piece of iron used in smithing.",
                weight: 2,
                cost: 30,
                quantity: 3
            }
        ],
        equipment: [
            {
                slot: "body",
                id: "Body.ChainShirt",
                name: "Chain Shirt",
                desc: "Medium armor made of interlocking metal rings.",
                weight: 10,
                cost: 150,
                armorStats: {
                    pDEF: 4,
                    mDEF: 2
                }
            },
            {
                slot: "rightHand",
                id: "Weapon.Sword.LongSword",
                name: "Long Sword",
                desc: "A versatile one-handed sword.",
                weight: 3,
                cost: 200,
                weaponStats: {
                    pDice: "1d8",
                    mDice: undefined,
                    pDmg: 3,
                    pHit: 2,
                    pCrit: 1,
                    weaponType: "Sword",
                    handle: 1
                }
            }
        ]
    },
    {
        // NPC 2 - Cleric (Scholar background)
        name: "Luna",
        level: 2,
        portrait: "f_human01",
        isPlayer: false,
        id: "mock-character-003",
        gender: "FEMALE",
        race: "Human",
        type: "humanoid",
        background: "Scholar",
        epithet: "Scholar",
        role: "Cleric",
        title: "Scholar Cleric",
        possibleEpithets: [
            "Scholar"
        ],
        possibleRoles: [
            "Cleric"
        ],
        alignment: {
            good: 5,
            evil: 0
        },
        attributes: {
            strength: {
                base: 7,
                bonus: 0
            },
            dexterity: {
                base: 7,
                bonus: 0
            },
            agility: {
                base: 7,
                bonus: 0
            },
            endurance: {
                base: 7,
                bonus: 0
            },
            vitality: {
                base: 8,
                bonus: 0
            },
            intelligence: {
                base: 9,
                bonus: 0
            },
            willpower: {
                base: 10,
                bonus: 0
            },
            control: {
                base: 8,
                bonus: 0
            },
            planar: {
                base: 9,
                bonus: 0
            },
            luck: {
                base: 7,
                bonus: 0
            },
            charisma: {
                base: 8,
                bonus: 0
            },
            leadership: {
                base: 7,
                bonus: 0
            }
        },
        battleStats: {
            pATK: {
                base: 0,
                bonus: 0
            },
            pDEF: {
                base: 0,
                bonus: 0
            },
            mATK: {
                base: 0,
                bonus: 0
            },
            mDEF: {
                base: 0,
                bonus: 0
            },
            pCRT: {
                base: 0,
                bonus: 0
            },
            mCRT: {
                base: 0,
                bonus: 0
            },
            ACC: {
                base: 0,
                bonus: 0
            },
            EVA: {
                base: 0,
                bonus: 0
            },
            SPD: {
                base: 0,
                bonus: 0
            }
        },
        elements: {
            fire: {
                base: 0,
                bonus: 0
            },
            water: {
                base: 0,
                bonus: 0
            },
            wind: {
                base: 0,
                bonus: 0
            },
            earth: {
                base: 0,
                bonus: 0
            },
            light: {
                base: 5,
                bonus: 0
            },
            dark: {
                base: 0,
                bonus: 0
            }
        },
        proficiencies: {
            sword: {
                base: 7,
                bonus: 0
            },
            axe: {
                base: 7,
                bonus: 0
            },
            hammer: {
                base: 7,
                bonus: 0
            },
            spear: {
                base: 7,
                bonus: 0
            },
            bow: {
                base: 7,
                bonus: 0
            },
            crossbow: {
                base: 7,
                bonus: 0
            },
            book: {
                base: 8,
                bonus: 0
            },
            shield: {
                base: 7,
                bonus: 0
            },
            unarmed: {
                base: 7,
                bonus: 0
            }
        },
        artisans: {
            mining: {
                base: 7,
                bonus: 0
            },
            smelting: {
                base: 7,
                bonus: 0
            },
            smithing: {
                base: 7,
                bonus: 0
            },
            woodCutting: {
                base: 7,
                bonus: 0
            },
            carpentry: {
                base: 7,
                bonus: 0
            },
            tanning: {
                base: 7,
                bonus: 0
            },
            weaving: {
                base: 7,
                bonus: 0
            },
            jewelry: {
                base: 7,
                bonus: 0
            },
            alchemy: {
                base: 8,
                bonus: 0
            },
            cooking: {
                base: 7,
                bonus: 0
            },
            brewing: {
                base: 7,
                bonus: 0
            },
            foraging: {
                base: 7,
                bonus: 0
            },
            skinning: {
                base: 7,
                bonus: 0
            },
            agriculture: {
                base: 7,
                bonus: 0
            },
            masonry: {
                base: 7,
                bonus: 0
            },
            tinkering: {
                base: 7,
                bonus: 0
            },
            performance: {
                base: 7,
                bonus: 0
            }
        },
        vitals: {
            hp: {
                current: 25,
                max: 25
            },
            mp: {
                current: 20,
                max: 20
            },
            sp: {
                current: 20,
                max: 20
            }
        },
        needs: {
            mood: 70,
            energy: 55,
            satiety: 60
        },
        planarAptitude: 75,
        activeSkills: [
            {
                id: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClericSkillId"].Heal,
                level: 1,
                exp: 0
            },
            {
                id: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClericSkillId"].Radiance,
                level: 1,
                exp: 0
            }
        ],
        conditionalSkills: [
            {
                id: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$L10N$2f$skillEnums$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClericSkillId"].MassHeal,
                level: 1,
                exp: 0
            }
        ],
        conditionalSkillsCondition: {
            selectedCondition: "TEAMMATE",
            teammate: {
                position: [
                    0,
                    1,
                    2,
                    3,
                    4,
                    5
                ],
                vital: {
                    hp: {
                        min: 0,
                        max: 30
                    }
                }
            }
        },
        breathingSkills: [],
        inventory: [
            {
                id: "HolyWater",
                name: "Holy Water",
                desc: "Blessed water that deals extra damage to undead.",
                weight: 1,
                cost: 60,
                quantity: 1
            }
        ],
        equipment: [
            {
                slot: "body",
                id: "Body.Robe",
                name: "Robe",
                desc: "A simple cloth robe.",
                weight: 2,
                cost: 50,
                armorStats: {
                    pDEF: 0,
                    mDEF: 1
                }
            },
            {
                slot: "rightHand",
                id: "Weapon.Staff.QuarterStaff",
                name: "Quarter Staff",
                desc: "A simple wooden staff.",
                weight: 2,
                cost: 80,
                weaponStats: {
                    pDice: "1d6",
                    mDice: "1d4",
                    pDmg: 1,
                    mDmg: 2,
                    pHit: 1,
                    mHit: 2,
                    pCrit: 1,
                    mCrit: 1,
                    weaponType: "Staff",
                    handle: 2
                }
            }
        ]
    },
    // Empty slots
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
}),
"[project]/workspace/MyProject/Client/webapp/app/game/mock/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MockGamePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$app$2f$game$2f$GameView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/app/game/GameView.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$data$2f$mockPartyData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/data/mockPartyData.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function MockGamePage() {
    // Pass mock data to GameView for UI development
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$app$2f$game$2f$GameView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        mockPartyData: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$data$2f$mockPartyData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockParty"]
    }, void 0, false, {
        fileName: "[project]/workspace/MyProject/Client/webapp/app/game/mock/page.tsx",
        lineNumber: 14,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c6e9a560._.js.map