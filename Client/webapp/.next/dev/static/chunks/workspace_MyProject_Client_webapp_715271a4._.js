(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/workspace/MyProject/Client/webapp/src/theme/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "arcaneTheme",
    ()=>arcaneTheme,
    "backgroundGradients",
    ()=>backgroundGradients,
    "cssVariables",
    ()=>cssVariables,
    "customShadows",
    ()=>customShadows,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$createTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/createTheme.js [app-client] (ecmascript) <export default as createTheme>");
;
const arcaneTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$createTheme$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__["createTheme"])({
    palette: {
        mode: "light",
        // Primary: Purple (main accent color)
        primary: {
            main: "#9933ff",
            light: "#b366ff",
            dark: "#7700cc",
            contrastText: "#FFFFFF"
        },
        // Secondary: Copper (secondary accent color)
        secondary: {
            main: "#ff9933",
            light: "#ffb366",
            dark: "#cc7700",
            contrastText: "#FFFFFF"
        },
        // Tertiary: Teal (grading color between purple and copper)
        tertiary: {
            main: "#00cc99",
            light: "#33ddaa",
            dark: "#009977",
            contrastText: "#FFFFFF"
        },
        // Background: Beige for all modals/papers
        background: {
            default: "#FFFFFF",
            paper: "#FFFFFF"
        },
        surface: {
            main: "#E8E8D0"
        },
        // Accent colors for specific purposes
        accent: {
            main: "#00cc99",
            light: "#33ddaa",
            dark: "#009977",
            contrastText: "#FFFFFF"
        },
        electric: {
            main: "#9933ff",
            light: "#b366ff",
            dark: "#7700cc",
            contrastText: "#FFFFFF"
        },
        copper: {
            main: "#ff9933",
            light: "#ffb366",
            dark: "#cc7700",
            contrastText: "#FFFFFF"
        },
        text: {
            primary: "#2D2D2D",
            secondary: "#5A5A5A",
            disabled: "#999999"
        },
        // Error/Warning: Magenta (for alerts and warnings)
        error: {
            main: "#e60073",
            light: "#ff3399",
            dark: "#b30059",
            contrastText: "#FFFFFF"
        },
        warning: {
            main: "#e60073",
            light: "#ff3399",
            dark: "#b30059",
            contrastText: "#FFFFFF"
        },
        info: {
            main: "#00cc99",
            light: "#33ddaa",
            dark: "#009977",
            contrastText: "#FFFFFF"
        },
        success: {
            main: "#00cc99",
            light: "#33ddaa",
            dark: "#009977",
            contrastText: "#FFFFFF"
        }
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: "2.5rem",
            fontWeight: 700,
            letterSpacing: "-0.025em"
        },
        h2: {
            fontSize: "2rem",
            fontWeight: 600,
            letterSpacing: "-0.025em"
        },
        h3: {
            fontSize: "1.5rem",
            fontWeight: 600
        },
        h4: {
            fontSize: "1.25rem",
            fontWeight: 600
        },
        h5: {
            fontSize: "1.125rem",
            fontWeight: 600
        },
        h6: {
            fontSize: "1rem",
            fontWeight: 600
        },
        subtitle1: {
            fontSize: "1rem",
            fontWeight: 500
        },
        subtitle2: {
            fontSize: "0.875rem",
            fontWeight: 500
        },
        body1: {
            fontSize: "1rem",
            lineHeight: 1.6
        },
        body2: {
            fontSize: "0.875rem",
            lineHeight: 1.5
        },
        button: {
            fontSize: "0.875rem",
            fontWeight: 600,
            textTransform: "none"
        }
    },
    shape: {
        borderRadius: 12
    },
    spacing: 8,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    textTransform: "none",
                    fontWeight: 600,
                    padding: "12px 24px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                        transform: "translateY(-1px)"
                    },
                    transition: "all 0.2s ease-in-out"
                },
                contained: {
                    background: "linear-gradient(135deg, #2C3E8C 0%, #8B5CF6 100%)",
                    "&:hover": {
                        background: "linear-gradient(135deg, #1A2B73 0%, #7C3AED 100%)"
                    }
                },
                outlined: {
                    borderWidth: 2,
                    "&:hover": {
                        borderWidth: 2
                    }
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                },
                elevation1: {
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)"
                },
                elevation2: {
                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)"
                },
                elevation3: {
                    boxShadow: "0 16px 32px rgba(0, 0, 0, 0.2)"
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 12,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#8B5CF6",
                            borderWidth: 2
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#8B5CF6",
                            borderWidth: 2
                        }
                    }
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    fontWeight: 500,
                    "&.MuiChip-clickable:hover": {
                        backgroundColor: "rgba(139, 92, 246, 0.1)"
                    },
                    "&.Mui-selected": {
                        backgroundColor: "#8B5CF6",
                        color: "#FFFFFF",
                        "&:hover": {
                            backgroundColor: "#7C3AED"
                        }
                    }
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    "&:hover": {
                        backgroundColor: "rgba(139, 92, 246, 0.1)"
                    }
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    "&.MuiAlert-standardSuccess": {
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        color: "#047857"
                    },
                    "&.MuiAlert-standardError": {
                        backgroundColor: "rgba(220, 38, 38, 0.1)",
                        color: "#B91C1C"
                    },
                    "&.MuiAlert-standardWarning": {
                        backgroundColor: "rgba(217, 119, 6, 0.1)",
                        color: "#B45309"
                    },
                    "&.MuiAlert-standardInfo": {
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        color: "#2563EB"
                    }
                }
            }
        }
    }
});
const backgroundGradients = {
    login: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    register: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    characterCreation: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    game: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    // Arcane Beam Electric Dream specific gradients
    arcane: "linear-gradient(135deg, #2C3E8C 0%, #8B5CF6 50%, #10B981 100%)",
    electric: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
    mystical: "linear-gradient(135deg, #8B5CF6 0%, #10B981 100%)",
    steampunk: "linear-gradient(135deg, #D97706 0%, #DC2626 100%)"
};
const customShadows = {
    arcane: "0 20px 40px rgba(44, 62, 140, 0.2)",
    electric: "0 20px 40px rgba(139, 92, 246, 0.2)",
    mystical: "0 20px 40px rgba(16, 185, 129, 0.2)",
    steampunk: "0 20px 40px rgba(217, 119, 6, 0.2)",
    strong: "0 25px 50px rgba(0, 0, 0, 0.25)",
    subtle: "0 8px 16px rgba(0, 0, 0, 0.1)"
};
const cssVariables = {
    "--gradient-arcane": backgroundGradients.arcane,
    "--gradient-electric": backgroundGradients.electric,
    "--gradient-mystical": backgroundGradients.mystical,
    "--gradient-steampunk": backgroundGradients.steampunk,
    "--shadow-arcane": customShadows.arcane,
    "--shadow-electric": customShadows.electric,
    "--shadow-mystical": customShadows.mystical,
    "--shadow-steampunk": customShadows.steampunk,
    "--shadow-strong": customShadows.strong,
    "--shadow-subtle": customShadows.subtle
};
const __TURBOPACK__default__export__ = arcaneTheme;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/workspace/MyProject/Client/webapp/app/theme/ThemeProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThemeProvider$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/ThemeProvider.js [app-client] (ecmascript) <export default as ThemeProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$CssBaseline$2f$CssBaseline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CssBaseline$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/CssBaseline/CssBaseline.js [app-client] (ecmascript) <export default as CssBaseline>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$GlobalStyles$2f$GlobalStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GlobalStyles$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/GlobalStyles/GlobalStyles.js [app-client] (ecmascript) <export default as GlobalStyles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$theme$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/theme/index.ts [app-client] (ecmascript)");
"use client";
;
;
;
function ThemeProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$ThemeProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThemeProvider$3e$__["ThemeProvider"], {
        theme: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$theme$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arcaneTheme"],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$CssBaseline$2f$CssBaseline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CssBaseline$3e$__["CssBaseline"], {}, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/theme/ThemeProvider.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$GlobalStyles$2f$GlobalStyles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GlobalStyles$3e$__["GlobalStyles"], {
                styles: {
                    ":root": __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$theme$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cssVariables"],
                    "*": {
                        boxSizing: "border-box"
                    },
                    "html, body": {
                        margin: 0,
                        padding: 0,
                        height: "100%",
                        fontFamily: "'Crimson Text', 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
                        background: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$theme$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cssVariables"]["--gradient-arcane"],
                        backgroundAttachment: "fixed"
                    },
                    "#root": {
                        height: "100%",
                        display: "flex",
                        flexDirection: "column"
                    },
                    // Custom scrollbar
                    "::-webkit-scrollbar": {
                        width: 8
                    },
                    "::-webkit-scrollbar-track": {
                        background: "rgba(255, 255, 255, 0.1)",
                        borderRadius: 4
                    },
                    "::-webkit-scrollbar-thumb": {
                        background: "rgba(139, 92, 246, 0.5)",
                        borderRadius: 4,
                        "&:hover": {
                            background: "rgba(139, 92, 246, 0.7)"
                        }
                    },
                    // Animations
                    "@keyframes pulse": {
                        "0%": {
                            opacity: 1
                        },
                        "50%": {
                            opacity: 0.5
                        },
                        "100%": {
                            opacity: 1
                        }
                    },
                    "@keyframes fadeIn": {
                        from: {
                            opacity: 0,
                            transform: "translateY(20px)"
                        },
                        to: {
                            opacity: 1,
                            transform: "translateY(0)"
                        }
                    },
                    // Page animations
                    ".page-enter": {
                        animation: "fadeIn 0.3s ease-out"
                    }
                }
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/theme/ThemeProvider.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/app/theme/ThemeProvider.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/workspace/MyProject/Client/webapp/app/components/GlobalComponents.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GlobalComponents
]);
"use client";
function GlobalComponents() {
    return null;
}
_c = GlobalComponents;
var _c;
__turbopack_context__.k.register(_c, "GlobalComponents");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=workspace_MyProject_Client_webapp_715271a4._.js.map