module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/workspace/MyProject/Client/webapp/src/theme/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$createTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/createTheme.js [app-ssr] (ecmascript) <export default as createTheme>");
;
const arcaneTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$createTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__["createTheme"])({
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
}),
"[project]/workspace/MyProject/Client/webapp/app/theme/ThemeProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$ThemeProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ThemeProvider$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/ThemeProvider.js [app-ssr] (ecmascript) <export default as ThemeProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$CssBaseline$2f$CssBaseline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CssBaseline$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/CssBaseline/CssBaseline.js [app-ssr] (ecmascript) <export default as CssBaseline>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$GlobalStyles$2f$GlobalStyles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GlobalStyles$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/GlobalStyles/GlobalStyles.js [app-ssr] (ecmascript) <export default as GlobalStyles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$theme$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/theme/index.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function ThemeProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$ThemeProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ThemeProvider$3e$__["ThemeProvider"], {
        theme: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$theme$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["arcaneTheme"],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$CssBaseline$2f$CssBaseline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CssBaseline$3e$__["CssBaseline"], {}, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/theme/ThemeProvider.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$GlobalStyles$2f$GlobalStyles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GlobalStyles$3e$__["GlobalStyles"], {
                styles: {
                    ":root": __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$theme$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cssVariables"],
                    "*": {
                        boxSizing: "border-box"
                    },
                    "html, body": {
                        margin: 0,
                        padding: 0,
                        height: "100%",
                        fontFamily: "'Crimson Text', 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
                        background: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$theme$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cssVariables"]["--gradient-arcane"],
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
}),
"[project]/workspace/MyProject/Client/webapp/src/localization/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "L10N",
    ()=>L10N,
    "getCurrentLanguage",
    ()=>getCurrentLanguage,
    "getLocalizedText",
    ()=>getLocalizedText,
    "setCurrentLanguage",
    ()=>setCurrentLanguage,
    "subscribeToLanguageChanges",
    ()=>subscribeToLanguageChanges,
    "t",
    ()=>t,
    "useLocalization",
    ()=>useLocalization
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const L10N = {
    loginPage: {
        title: {
            en: "Arcane Beam Electric Dream",
            th: "Arcane Beam Electric Dream"
        },
        usernameLabel: {
            en: "Username",
            th: "ชื่อผู้ใช้"
        },
        passwordLabel: {
            en: "Password",
            th: "รหัสผ่าน"
        },
        loginButton: {
            en: "Login",
            th: "ลงชื่อเข้าใช้"
        },
        registerButton: {
            en: "Register",
            th: "สมัครสมาชิก"
        },
        loginError: {
            en: "Login failed. Please try again.",
            th: "เข้าสู่ระบบล้มเหลว โปรดลองอีกครั้ง"
        },
        invalidCredentials: {
            en: "Invalid username or password",
            th: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
        },
        userNotFound: {
            en: "User not found",
            th: "ไม่พบผู้ใช้"
        },
        networkError: {
            en: "Network error. Please check your connection.",
            th: "ข้อผิดพลาดเครือข่าย โปรดตรวจสอบการเชื่อมต่อ"
        },
        requiredField: {
            en: "This field is required",
            th: "กรุณากรอกข้อมูลในช่องนี้"
        },
        forgotPassword: {
            en: "Forgot password?",
            th: "ลืมรหัสผ่าน?"
        },
        newToRealm: {
            en: "New to the realm?",
            th: "ใหม่กับอาณาจักรนี้?"
        },
        createAccount: {
            en: "Create an account",
            th: "สร้างบัญชี"
        },
        forgotPasswordModal: {
            title: {
                en: "Reset Password",
                th: "รีเซ็ตรหัสผ่าน"
            },
            emailLabel: {
                en: "Email Address",
                th: "อีเมล"
            },
            submitButton: {
                en: "Send Reset Email",
                th: "ส่งอีเมลรีเซ็ต"
            },
            cancelButton: {
                en: "Cancel",
                th: "ยกเลิก"
            },
            successMessage: {
                en: "Password reset email sent!",
                th: "ส่งอีเมลรีเซ็ตรหัสผ่านแล้ว!"
            },
            errorMessage: {
                en: "Failed to send reset email. Please try again.",
                th: "ไม่สามารถส่งอีเมลรีเซ็ตได้ โปรดลองอีกครั้ง"
            }
        }
    },
    registerPage: {
        title: {
            en: "Create Your Account",
            th: "สร้างบัญชีของคุณ"
        },
        eulaTitle: {
            en: "End User License Agreement",
            th: "ข้อตกลงใบอนุญาตผู้ใช้งาน"
        },
        eulaContent: {
            en: `Welcome to ABED - A mystical realm where steam-powered arcane technology meets medieval adventure.

By creating an account and playing ABED, you agree to the following terms:

1. ACCEPTANCE OF TERMS
By accessing and using this game, you accept and agree to be bound by the terms and provision of this agreement.

2. GAME CONTENT AND CONDUCT
- You agree to use the game for lawful purposes only
- You will not engage in cheating, exploiting, or any form of disruptive behavior
- You understand this is a multiplayer experience and agree to respect other players
- Content created within the game remains property of the game developers

3. ACCOUNT RESPONSIBILITY
- You are responsible for maintaining the confidentiality of your account
- You agree to accept responsibility for all activities under your account
- You must provide accurate registration information
- One account per person is permitted

4. PRIVACY AND DATA
- We collect minimal data necessary for game functionality
- Your gameplay data helps us improve the experience
- We will never sell your personal information to third parties
- You can request account deletion at any time

5. INTELLECTUAL PROPERTY
- All game assets, code, and content are protected by copyright
- You may not reverse engineer or redistribute game content
- Screenshots and gameplay videos for personal use are permitted

6. SERVICE AVAILABILITY
- We strive for 99% uptime but cannot guarantee uninterrupted service
- We reserve the right to perform maintenance as needed
- Beta features may be unstable and subject to change

7. LIMITATION OF LIABILITY
- The game is provided "as is" without warranties
- We are not liable for data loss or gameplay interruption
- Virtual items have no real-world monetary value

8. MODIFICATIONS TO TERMS
- We reserve the right to modify these terms with notice
- Continued use constitutes acceptance of modified terms
- Material changes will be announced in-game

9. TERMINATION
- We may terminate accounts for violation of these terms
- You may delete your account at any time
- Upon termination, your right to use the service ceases

10. GOVERNING LAW
This agreement is governed by the laws of the jurisdiction where our servers are located.

By checking the agreement box below, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.

Thank you for joining the ABED community. May your adventures be legendary!`,
            th: `ยินดีต้อนรับสู่ ABED - อาณาจักรลึกลับที่เทคโนโลยีลึกลับขับเคลื่อนด้วยไsteam พบกับการผจญภัยในยุคกลาง

การสร้างบัญชีและเล่น ABED หมายความว่าคุณยอมรับเงื่อนไขต่อไปนี้:

1. การยอมรับเงื่อนไข
การเข้าถึงและใช้เกมนี้ คุณยอมรับและตกลงที่จะผูกพันตามข้อตกลงนี้

2. เนื้อหาเกมและการปฏิบัติตัว
- คุณตกลงที่จะใช้เกมเพื่อวัตถุประสงค์ที่ถูกกฎหมายเท่านั้น
- คุณจะไม่มีส่วนร่วมในการโกง การหาช่องโหว่ หรือพฤติกรรมก่อกวนใดๆ
- คุณเข้าใจว่านี่เป็นประสบการณ์ผู้เล่นหลายคนและตกลงที่จะเคารพผู้เล่นอื่น
- เนื้อหาที่สร้างในเกมยังคงเป็นทรัพย์สินของผู้พัฒนาเกม

3. ความรับผิดชอบบัญชี
- คุณมีหน้าที่รักษาความลับของบัญชี
- คุณตกลงที่จะรับผิดชอบต่อกิจกรรมทั้งหมดภายใต้บัญชีของคุณ
- คุณต้องให้ข้อมูลการลงทะเบียนที่ถูกต้อง
- อนุญาตให้มีบัญชีหนึ่งบัญชีต่อคน

4. ความเป็นส่วนตัวและข้อมูล
- เราเก็บข้อมูลน้อยที่สุดที่จำเป็นสำหรับการทำงานของเกม
- ข้อมูลการเล่นของคุณช่วยให้เราปรับปรุงประสบการณ์
- เราจะไม่ขายข้อมูลส่วนบุคคลให้บุคคลที่สาม
- คุณสามารถขอลบบัญชีได้ตลอดเวลา

5. ทรัพย์สินทางปัญญา
- สินทรัพย์ของเกม โค้ด และเนื้อหาทั้งหมดได้รับการคุ้มครองด้วยลิขสิทธิ์
- คุณไม่สามารถวิศวกรรมย้อนกลับหรือแจกจ่ายเนื้อหาเกม
- สกรีนช็อตและวิดีโอเกมเพื่อใช้ส่วนตัวได้รับอนุญาต

6. ความพร้อมใช้งานของบริการ
- เรามุ่งมั่นที่จะให้บริการ 99% แต่ไม่สามารถรับประกันบริการต่อเนื่อง
- เราขอสงวนสิทธิ์ในการบำรุงรักษาตามที่จำเป็น
- คุณสมบัติเบต้าอาจไม่เสถียรและอาจมีการเปลี่ยนแปลง

7. ข้อจำกัดความรับผิด
- เกมมีให้ "ตามสภาพ" โดยไม่มีการรับประกัน
- เราไม่รับผิดชอบต่อการสูญเสียข้อมูลหรือการหยุดชะงักของเกม
- ไอเท็มเสมือนไม่มีมูลค่าเงินในโลกแห่งความจริง

8. การแก้ไขเงื่อนไข
- เราขอสงวนสิทธิ์ในการแก้ไขเงื่อนไขเหล่านี้โดยมีการแจ้งล่วงหน้า
- การใช้งานต่อไปถือเป็นการยอมรับเงื่อนไขที่แก้ไข
- การเปลี่ยนแปลงที่สำคัญจะมีการประกาศในเกม

9. การยกเลิก
- เราอาจยกเลิกบัญชีหากมีการละเมิดเงื่อนไขเหล่านี้
- คุณสามารถลบบัญชีของคุณได้ตลอดเวลา
- เมื่อยกเลิก สิทธิ์ในการใช้บริการจะสิ้นสุด

10. กฎหมายที่ใช้บังคับ
ข้อตกลงนี้อยู่ภายใต้กฎหมายของเขตอำนาจศาลที่เซิร์ฟเวอร์ของเราตั้งอยู่

การติ๊กช่องยอมรับด้านล่าง แสดงว่าคุณได้อ่าน เข้าใจ และตกลงที่จะผูกพันตามข้อตกลงเหล่านี้

ขอบคุณที่เข้าร่วมชุมชน ABED ขอให้การผจญภัยของคุณเป็นตำนาน!`
        },
        agreeToEula: {
            en: "I have read and agree to the End User License Agreement",
            th: "ข้าพเจ้าได้อ่านและยอมรับข้อตกลงใบอนุญาตผู้ใช้งาน"
        },
        usernameLabel: {
            en: "Username",
            th: "ชื่อผู้ใช้"
        },
        passwordLabel: {
            en: "Password",
            th: "รหัสผ่าน"
        },
        confirmPasswordLabel: {
            en: "Confirm Password",
            th: "ยืนยันรหัสผ่าน"
        },
        emailLabel: {
            en: "Email",
            th: "อีเมล"
        },
        emailOptional: {
            en: "Email (Optional)",
            th: "อีเมล (ไม่บังคับ)"
        },
        registerButton: {
            en: "Create Account",
            th: "สร้างบัญชี"
        },
        backToLogin: {
            en: "Back to Login",
            th: "กลับไปหน้าเข้าสู่ระบบ"
        },
        // Validation messages
        requiredField: {
            en: "This field is required",
            th: "กรุณากรอกข้อมูลในช่องนี้"
        },
        passwordMismatch: {
            en: "Passwords do not match",
            th: "รหัสผ่านไม่ตรงกัน"
        },
        passwordRequirements: {
            en: "Password must be at least 8 characters with uppercase, lowercase, and numbers",
            th: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร ประกอบด้วยตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก และตัวเลข"
        },
        usernameInvalid: {
            en: "Username must be 3-20 characters, letters and numbers only",
            th: "ชื่อผู้ใช้ต้องมี 3-20 ตัวอักษร เป็นตัวอักษรและตัวเลขเท่านั้น"
        },
        emailInvalid: {
            en: "Please enter a valid email address",
            th: "กรุณากรอกที่อยู่อีเมลให้ถูกต้อง"
        },
        eulaNotAccepted: {
            en: "You must agree to the terms and conditions",
            th: "คุณต้องยอมรับข้อตกลงและเงื่อนไข"
        },
        // Server responses
        registrationSuccess: {
            en: "Account created successfully! Please log in.",
            th: "สร้างบัญชีสำเร็จ! กรุณาเข้าสู่ระบบ"
        },
        registrationError: {
            en: "Registration failed. Please try again.",
            th: "การสมัครสมาชิกล้มเหลว โปรดลองอีกครั้ง"
        },
        usernameTaken: {
            en: "A user with this username already exists",
            th: "มีผู้ใช้ที่มีชื่อผู้ใช้นี้อยู่แล้ว"
        },
        characterIdTaken: {
            en: "This character name is already taken",
            th: "ชื่อตัวละครนี้ถูกใช้ไปแล้ว"
        },
        networkError: {
            en: "Network error. Please check your connection.",
            th: "ข้อผิดพลาดเครือข่าย โปรดตรวจสอบการเชื่อมต่อ"
        }
    },
    common: {
        loading: {
            en: "Loading...",
            th: "กำลังโหลด..."
        },
        error: {
            en: "Error",
            th: "ข้อผิดพลาด"
        },
        success: {
            en: "Success",
            th: "สำเร็จ"
        },
        cancel: {
            en: "Cancel",
            th: "ยกเลิก"
        },
        ok: {
            en: "OK",
            th: "ตกลง"
        },
        close: {
            en: "Close",
            th: "ปิด"
        },
        retry: {
            en: "Retry",
            th: "ลองใหม่"
        }
    },
    musicPlayer: {
        play: {
            en: "Play music",
            th: "เล่นเพลง"
        },
        pause: {
            en: "Pause music",
            th: "หยุดเพลง"
        },
        mute: {
            en: "Mute",
            th: "ปิดเสียง"
        },
        unmute: {
            en: "Unmute",
            th: "เปิดเสียง"
        },
        volumeControl: {
            en: "Volume control",
            th: "ควบคุมระดับเสียง"
        },
        expandPlayer: {
            en: "Expand player",
            th: "ขยายเครื่องเล่น"
        },
        collapsePlayer: {
            en: "Collapse player",
            th: "ย่อเครื่องเล่น"
        },
        togglePlaylist: {
            en: "Toggle playlist",
            th: "สลับรายการเพลง"
        },
        previousTrack: {
            en: "Previous track",
            th: "เพลงก่อนหน้า"
        },
        nextTrack: {
            en: "Next track",
            th: "เพลงถัดไป"
        },
        seekBack: {
            en: "Seek back 10s",
            th: "ย้อนกลับ 10 วินาที"
        },
        seekForward: {
            en: "Seek forward 10s",
            th: "ไปข้างหน้า 10 วินาที"
        },
        toggleShuffle: {
            en: "Toggle shuffle",
            th: "สลับการสลับเพลง"
        }
    },
    auth: {
        noToken: {
            en: "No session token provided",
            th: "ไม่มีโทเค็นเซสชัน"
        },
        invalidSession: {
            en: "Invalid or expired session",
            th: "เซสชันไม่ถูกต้องหรือหมดอายุ"
        },
        autoAuthFailed: {
            en: "Auto authentication failed",
            th: "การตรวจสอบอัตโนมัติล้มเหลว"
        },
        logoutFailed: {
            en: "Logout failed",
            th: "ออกจากระบบล้มเหลว"
        }
    },
    guest: {
        notImplemented: {
            en: "Guest login not implemented yet",
            th: "การเข้าสู่ระบบแบบแขกยังไม่พร้อมใช้งาน"
        }
    },
    characterCreation: {
        title: {
            en: "Create Character",
            th: "สร้างตัวละคร"
        },
        subtitle: {
            en: "Step into the realm of Arcane Beam Electric Dream",
            th: "ก้าวเข้าสู่ดินแดนแห่ง Arcane Beam Electric Dream"
        },
        characterStatus: {
            en: "Current Character Status",
            th: "สถานะตัวละครปัจจุบัน"
        },
        name: {
            en: "Character Name",
            th: "ชื่อตัวละคร"
        },
        namePlaceholder: {
            en: "Enter your character's name",
            th: "ใส่ชื่อตัวละครของคุณ"
        },
        gender: {
            en: "Gender",
            th: "เพศ"
        },
        male: {
            en: "Male",
            th: "ชาย"
        },
        female: {
            en: "Female",
            th: "หญิง"
        },
        race: {
            en: "Race",
            th: "เผ่าพันธุ์"
        },
        class: {
            en: "Class",
            th: "อาชีพ"
        },
        background: {
            en: "Background",
            th: "ภูมิหลัง"
        },
        portrait: {
            en: "Portrait",
            th: "รูปภาพ"
        },
        backToTitle: {
            en: "Back to Title",
            th: "กลับไปหน้าแรก"
        },
        createCharacter: {
            en: "Create Character",
            th: "สร้างตัวละคร"
        },
        creating: {
            en: "Creating...",
            th: "กำลังสร้าง..."
        },
        notSet: {
            en: "Not set",
            th: "ยังไม่ได้ตั้งค่า"
        },
        // Name validation messages
        nameTooShort: {
            en: "Character names need to be at least 3 characters long",
            th: "ชื่อตัวละครต้องมีอย่างน้อย 3 ตัวอักษร"
        },
        nameTooLong: {
            en: "Name too long (max 20 characters)",
            th: "ชื่อยาวเกินไป (สูงสุด 20 ตัวอักษร)"
        },
        nameInvalidChars: {
            en: "Only English, Thai, and spaces allowed",
            th: "อนุญาตเฉพาะภาษาอังกฤษ ไทย และช่องว่าง"
        },
        nameRequired: {
            en: "Please enter a character name",
            th: "กรุณาใส่ชื่อตัวละคร"
        },
        nameMinLength: {
            en: "Character name must be at least 3 characters long",
            th: "ชื่อตัวละครต้องมีอย่างน้อย 3 ตัวอักษร"
        },
        nameMaxLength: {
            en: "Character name must be 20 characters or less",
            th: "ชื่อตัวละครต้องไม่เกิน 20 ตัวอักษร"
        },
        nameInvalidFormat: {
            en: "Character name can only contain English letters, Thai characters, and spaces",
            th: "ชื่อตัวละครสามารถมีได้เฉพาะตัวอักษรภาษาอังกฤษ ไทย และช่องว่าง"
        },
        nameTaken: {
            en: "Character name is already taken",
            th: "ชื่อตัวละครถูกใช้งานแล้ว"
        },
        creationFailed: {
            en: "Failed to create character. Please try again.",
            th: "สร้างตัวละครไม่สำเร็จ กรุณาลองใหม่"
        }
    },
    character: {
        invalidData: {
            en: "Invalid character creation data",
            th: "ข้อมูลการสร้างตัวละครไม่ถูกต้อง"
        },
        // Character stats labels
        attributes: {
            en: "Attributes",
            th: "คุณสมบัติ"
        },
        vitals: {
            en: "Vitals",
            th: "ค่าพลังชีวิต"
        },
        proficiencies: {
            en: "Proficiencies",
            th: "ความชำนาญ"
        },
        artisans: {
            en: "Artisan Skills",
            th: "ทักษะช่าง"
        },
        maxHP: {
            en: "Max HP",
            th: "พลังชีวิตสูงสุด"
        },
        maxSP: {
            en: "Max SP",
            th: "พลังกายสูงสุด"
        },
        maxMP: {
            en: "Max MP",
            th: "พลังเวทสูงสุด"
        },
        planarAptitude: {
            en: "Planar Aptitude",
            th: "ความสามารถเวทย์"
        },
        // Individual attribute names
        attributeNames: {
            charisma: {
                en: "Charisma",
                th: "เสน่ห์"
            },
            luck: {
                en: "Luck",
                th: "โชค"
            },
            intelligence: {
                en: "Intelligence",
                th: "สติปัญญา"
            },
            leadership: {
                en: "Leadership",
                th: "ภาวะผู้นำ"
            },
            vitality: {
                en: "Vitality",
                th: "พลังชีวิต"
            },
            willpower: {
                en: "Willpower",
                th: "จิตใจ"
            },
            planar: {
                en: "Planar",
                th: "เวทย์"
            },
            control: {
                en: "Control",
                th: "การควบคุม"
            },
            dexterity: {
                en: "Dexterity",
                th: "ความคล่องแคล่ว"
            },
            agility: {
                en: "Agility",
                th: "ความว่องไว"
            },
            strength: {
                en: "Strength",
                th: "ความแข็งแกร่ง"
            },
            endurance: {
                en: "Endurance",
                th: "ความอดทน"
            }
        },
        // Individual proficiency names
        proficiencyNames: {
            sword: {
                en: "Sword",
                th: "ดาบ"
            },
            shield: {
                en: "Shield",
                th: "โล่"
            },
            axe: {
                en: "Axe",
                th: "ขวาน"
            },
            mace: {
                en: "Mace",
                th: "กระบอง"
            },
            spear: {
                en: "Spear",
                th: "หอก"
            },
            bareHand: {
                en: "Bare Hand",
                th: "มือเปล่า"
            },
            dagger: {
                en: "Dagger",
                th: "มีดสั้น"
            },
            rapier: {
                en: "Rapier",
                th: "ดาบปลายแหลม"
            },
            greatSword: {
                en: "Great Sword",
                th: "ดาบใหญ่"
            },
            machete: {
                en: "Machete",
                th: "มีดพร้า"
            },
            blade: {
                en: "Blade",
                th: "ใบมีด"
            },
            scimitar: {
                en: "Scimitar",
                th: "ดาบโค้ง"
            },
            zanmadao: {
                en: "Zanmadao",
                th: "ซันมาดาโอ"
            },
            warAxe: {
                en: "War Axe",
                th: "ขวานสงคราม"
            },
            halberd: {
                en: "Halberd",
                th: "หอกยาว"
            },
            javelin: {
                en: "Javelin",
                th: "หอกขว้าง"
            },
            flail: {
                en: "Flail",
                th: "ลูกตุ้ม"
            },
            bow: {
                en: "Bow",
                th: "ธนู"
            },
            crossbow: {
                en: "Crossbow",
                th: "หน้าไม้"
            },
            throwingKnife: {
                en: "Throwing Knife",
                th: "มีดขว้าง"
            },
            staff: {
                en: "Staff",
                th: "ไม้เท้า"
            },
            wand: {
                en: "Wand",
                th: "ไม้กายสิทธิ์"
            },
            orb: {
                en: "Orb",
                th: "ลูกแก้ว"
            },
            tome: {
                en: "Tome",
                th: "หนังสือเวท"
            },
            warHammer: {
                en: "War Hammer",
                th: "ค้อนสงคราม"
            },
            gun: {
                en: "Gun",
                th: "ปืน"
            },
            magicWand: {
                en: "Magic Wand",
                th: "ไม้กายสิทธิ์"
            },
            relic: {
                en: "Relic",
                th: "วัตถุมงคล"
            }
        },
        // Individual artisan skill names
        artisanNames: {
            performance: {
                en: "Performance",
                th: "การแสดง"
            },
            jewelry: {
                en: "Jewelry",
                th: "เครื่องประดับ"
            },
            tailoring: {
                en: "Tailoring",
                th: "การตัดเย็บ"
            },
            blacksmithing: {
                en: "Blacksmithing",
                th: "การตีเหล็ก"
            },
            carpentry: {
                en: "Carpentry",
                th: "การช่างไม้"
            },
            cooking: {
                en: "Cooking",
                th: "การทำอาหาร"
            },
            alchemy: {
                en: "Alchemy",
                th: "การปรุงยา"
            },
            engineering: {
                en: "Engineering",
                th: "วิศวกรรม"
            },
            herbalism: {
                en: "Herbalism",
                th: "สมุนไพร"
            },
            leatherworking: {
                en: "Leatherworking",
                th: "การทำหนัง"
            },
            masonry: {
                en: "Masonry",
                th: "การก่ออิฐ"
            },
            mining: {
                en: "Mining",
                th: "การขุดแร่"
            },
            agriculture: {
                en: "Agriculture",
                th: "การเกษตร"
            },
            smithing: {
                en: "Smithing",
                th: "การตีเหล็ก"
            },
            woodCutting: {
                en: "Wood Cutting",
                th: "การตัดไม้"
            },
            foraging: {
                en: "Foraging",
                th: "การหาอาหาร"
            },
            weaving: {
                en: "Weaving",
                th: "การทอผ้า"
            },
            skinning: {
                en: "Skinning",
                th: "การถลกหนัง"
            },
            tanning: {
                en: "Tanning",
                th: "การฟอกหนัง"
            },
            enchanting: {
                en: "Enchanting",
                th: "การเสกมนตร์"
            },
            fishing: {
                en: "Fishing",
                th: "การตกปลา"
            },
            brewing: {
                en: "Brewing",
                th: "การต้มเบียร์"
            },
            tinkering: {
                en: "Tinkering",
                th: "การซ่อมแซม"
            },
            electrics: {
                en: "Electrics",
                th: "ไฟฟ้า"
            }
        },
        nameTaken: {
            en: "Character name is already taken",
            th: "ชื่อตัวละครถูกใช้งานแล้ว"
        },
        creationFailed: {
            en: "Character creation failed",
            th: "การสร้างตัวละครล้มเหลว"
        },
        listFailed: {
            en: "Failed to retrieve characters",
            th: "ไม่สามารถดึงข้อมูลตัวละครได้"
        },
        notFound: {
            en: "Character not found",
            th: "ไม่พบตัวละคร"
        },
        setActiveFailed: {
            en: "Failed to set active character",
            th: "ไม่สามารถตั้งค่าตัวละครที่ใช้งานได้"
        },
        invalidName: {
            en: "Invalid character name",
            th: "ชื่อตัวละครไม่ถูกต้อง"
        },
        nameAvailable: {
            en: "Character name is available",
            th: "ชื่อตัวละครพร้อมใช้งาน"
        },
        nameCheckFailed: {
            en: "Failed to check character name",
            th: "ไม่สามารถตรวจสอบชื่อตัวละครได้"
        },
        // Race names and descriptions
        races: {
            human: {
                name: {
                    en: "Human",
                    th: "มนุษย์"
                },
                description: {
                    en: "Balanced and adaptable",
                    th: "สมดุลและปรับตัวได้"
                }
            },
            elven: {
                name: {
                    en: "Elven",
                    th: "เอลฟ์"
                },
                description: {
                    en: "Graceful and magical",
                    th: "สง่างามและมีเวทมนตร์"
                }
            },
            orc: {
                name: {
                    en: "Orc",
                    th: "ออร์ค"
                },
                description: {
                    en: "Strong and fierce",
                    th: "แข็งแกร่งและดุร้าย"
                }
            },
            dwarf: {
                name: {
                    en: "Dwarf",
                    th: "คนแคระ"
                },
                description: {
                    en: "Hardy and skilled",
                    th: "แข็งแกร่งและชำนาญ"
                }
            },
            halfling: {
                name: {
                    en: "Halfling",
                    th: "ฮาล์ฟลิ่ง"
                },
                description: {
                    en: "Lucky and nimble",
                    th: "โชคดีและคล่องแคล่ว"
                }
            },
            vulpine: {
                name: {
                    en: "Vulpine",
                    th: "วุลพีน"
                },
                description: {
                    en: "Intelligent and agile fox-like beings",
                    th: "สิ่งมีชีวิตคล้ายหมาจิ้งจอกที่เฉลียวฉลาดและคล่องแคล่ว"
                }
            }
        },
        // Class names and descriptions
        classes: {
            cleric: {
                name: {
                    en: "Cleric",
                    th: "นักบวช"
                },
                description: {
                    en: "A divine spellcaster with healing abilities",
                    th: "ผู้ใช้เวทมนตร์ศักดิ์สิทธิ์ที่มีความสามารถในการรักษา"
                }
            },
            seer: {
                name: {
                    en: "Seer",
                    th: "ผู้ทำนาย"
                },
                description: {
                    en: "A mystical seer with planar vision",
                    th: "ผู้ทำนายที่มีพลังเวทย์และมุมมองแห่งมิติ"
                }
            },
            mage: {
                name: {
                    en: "Mage",
                    th: "นักเวทย์"
                },
                description: {
                    en: "A powerful spellcaster with arcane knowledge",
                    th: "ผู้ใช้เวทมนตร์ผู้ทรงพลังที่มีความรู้ด้านเวทมนตร์"
                }
            },
            mystic: {
                name: {
                    en: "Mystic",
                    th: "นักลึกลับ"
                },
                description: {
                    en: "A mysterious practitioner of esoteric arts",
                    th: "ผู้เชี่ยวชาญในศาสตร์ลึกลับและลี้ลับ"
                }
            },
            rogue: {
                name: {
                    en: "Rogue",
                    th: "นักลอบ"
                },
                description: {
                    en: "A stealthy character skilled in stealth and precision",
                    th: "ตัวละครลับๆ ล่อๆ ที่เชี่ยวชาญในการซ่อนตัวและความแม่นยำ"
                }
            },
            spellblade: {
                name: {
                    en: "SpellBlade",
                    th: "ดาบเวทย์"
                },
                description: {
                    en: "A warrior who wields both blade and magic",
                    th: "นักรบผู้ใช้ทั้งดาบและเวทมนตร์"
                }
            },
            shaman: {
                name: {
                    en: "Shaman",
                    th: "ชามาน"
                },
                description: {
                    en: "A spiritual guide with nature magic",
                    th: "ผู้นำทางจิตวิญญาณที่มีเวทมนตร์ธรรมชาติ"
                }
            },
            barbarian: {
                name: {
                    en: "Barbarian",
                    th: "นักรบป่าเถื่อน"
                },
                description: {
                    en: "A fierce warrior who channels primal fury",
                    th: "นักรบดุร้ายที่ปลุกพลังดิบเถื่อน"
                }
            },
            warrior: {
                name: {
                    en: "Warrior",
                    th: "นักรบ"
                },
                description: {
                    en: "A skilled fighter specializing in combat",
                    th: "นักสู้ผู้เชี่ยวชาญในการต่อสู้"
                }
            },
            knight: {
                name: {
                    en: "Knight",
                    th: "อัศวิน"
                },
                description: {
                    en: "A noble warrior bound by honor",
                    th: "นักรบผู้สูงส่งที่มีเกียรติธรรม"
                }
            },
            guardian: {
                name: {
                    en: "Guardian",
                    th: "ผู้พิทักษ์"
                },
                description: {
                    en: "A defensive protector with shield mastery",
                    th: "ผู้ป้องกันผู้เชี่ยวชาญในการใช้โล่"
                }
            },
            paladin: {
                name: {
                    en: "Paladin",
                    th: "พาลาดิน"
                },
                description: {
                    en: "A holy warrior of divine justice",
                    th: "นักรบศักดิ์สิทธิ์แห่งความยุติธรรม"
                }
            },
            druid: {
                name: {
                    en: "Druid",
                    th: "ดรูอิด"
                },
                description: {
                    en: "A nature guardian with shape-shifting powers",
                    th: "ผู้พิทักษ์ธรรมชาติที่มีพลังแปลงร่าง"
                }
            },
            monk: {
                name: {
                    en: "Monk",
                    th: "นักพรต"
                },
                description: {
                    en: "A disciplined martial artist",
                    th: "นักศิลปะการต่อสู้ที่มีวินัย"
                }
            },
            warlock: {
                name: {
                    en: "Warlock",
                    th: "วาร์ล็อค"
                },
                description: {
                    en: "A wielder of dark and chaotic magic",
                    th: "ผู้ใช้เวทมนตร์มืดและวุ่นวาย"
                }
            },
            duelist: {
                name: {
                    en: "Duelist",
                    th: "นักดวล"
                },
                description: {
                    en: "An agile fencer with precision strikes",
                    th: "นักดาบที่คล่องแคล่วและแม่นยำ"
                }
            },
            witch: {
                name: {
                    en: "Witch",
                    th: "แม่มด"
                },
                description: {
                    en: "A caster of curses and hexes",
                    th: "ผู้ใช้คำสาปและมนตร์ดำ"
                }
            },
            inquisitor: {
                name: {
                    en: "Inquisitor",
                    th: "นักสืบ"
                },
                description: {
                    en: "A hunter of heretics and the corrupted",
                    th: "นักล่าผู้ลบหลู่และผู้ที่เสื่อมทราม"
                }
            },
            scholar: {
                name: {
                    en: "Scholar",
                    th: "นักวิชาการ"
                },
                description: {
                    en: "A learned master of knowledge and magic",
                    th: "ผู้เชี่ยวชาญความรู้และเวทมนตร์"
                }
            },
            engineer: {
                name: {
                    en: "Engineer",
                    th: "วิศวกร"
                },
                description: {
                    en: "A creator of mechanical wonders",
                    th: "ผู้สร้างสิ่งประดิษฐ์กลไก"
                }
            },
            nomad: {
                name: {
                    en: "Nomad",
                    th: "คนเร่ร่อน"
                },
                description: {
                    en: "A wanderer skilled in survival and adaptation",
                    th: "ผู้เร่ร่อนที่เชี่ยวชาญการเอาชีวิตรอดและการปรับตัว"
                }
            }
        },
        // Background names and descriptions
        backgrounds: {
            noble: {
                name: {
                    en: "Noble",
                    th: "ขุนนาง"
                },
                description: {
                    en: "Born into wealth and privilege",
                    th: "เกิดในความมั่งคั่งและอภิสิทธิ์"
                }
            },
            peasant: {
                name: {
                    en: "Peasant",
                    th: "ชาวนา"
                },
                description: {
                    en: "Raised in rural farming communities",
                    th: "เติบโตในชุมชนเกษตรกรรมชนบท"
                }
            },
            merchant: {
                name: {
                    en: "Merchant",
                    th: "พ่อค้า"
                },
                description: {
                    en: "Trained in trade and commerce",
                    th: "ได้รับการฝึกฝนในด้านการค้าและการพาณิชย์"
                }
            },
            scholar: {
                name: {
                    en: "Scholar",
                    th: "นักวิชาการ"
                },
                description: {
                    en: "Educated in libraries and academies",
                    th: "ได้รับการศึกษาในห้องสมุดและสถาบันการศึกษา"
                }
            },
            artisan: {
                name: {
                    en: "Artisan",
                    th: "ช่างฝีมือ"
                },
                description: {
                    en: "Skilled in various crafts and trades",
                    th: "เชี่ยวชาญในงานหัตถกรรมและอาชีพต่างๆ"
                }
            },
            soldier: {
                name: {
                    en: "Soldier",
                    th: "ทหาร"
                },
                description: {
                    en: "Former military service",
                    th: "เคยรับราชการทหาร"
                }
            }
        }
    }
};
const getLocalizedText = (text, language)=>{
    return text[language] || text.en; // Fallback to English if translation missing
};
// Current language state with reactive updates
let currentLanguage = "en";
const listeners = [];
const getCurrentLanguage = ()=>currentLanguage;
const setCurrentLanguage = (language)=>{
    if (currentLanguage !== language) {
        currentLanguage = language;
        // Notify all listeners of language change
        listeners.forEach((listener)=>listener(language));
    }
};
const subscribeToLanguageChanges = (listener)=>{
    listeners.push(listener);
    return ()=>{
        const index = listeners.indexOf(listener);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    };
};
const t = (text)=>{
    return getLocalizedText(text, currentLanguage);
};
const useLocalization = ()=>{
    const [, forceUpdate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const unsubscribe = subscribeToLanguageChanges(()=>{
            forceUpdate((prev)=>prev + 1);
        });
        return unsubscribe;
    }, []);
    return {
        currentLanguage: getCurrentLanguage(),
        t: (text)=>getLocalizedText(text, currentLanguage),
        setLanguage: setCurrentLanguage
    };
};
}),
"[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// LanguageSwitcher.tsx - Floating language toggle component
__turbopack_context__.s([
    "LanguageSwitcher",
    ()=>LanguageSwitcher,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Paper/Paper.js [app-ssr] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/IconButton/IconButton.js [app-ssr] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Tooltip/Tooltip.js [app-ssr] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Fade$2f$Fade$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Fade$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Fade/Fade.js [app-ssr] (ecmascript) <export default as Fade>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Switch$2f$Switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Switch$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Switch/Switch.js [app-ssr] (ecmascript) <export default as Switch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Language$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Language.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Translate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Translate.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/styled.js [app-ssr] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/localization/index.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const FloatingLanguageSwitcher = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"])(({ theme })=>({
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 9998,
        padding: theme.spacing(1),
        minWidth: 60,
        maxWidth: 200,
        background: `linear-gradient(135deg, ${theme.palette.secondary.main}20, ${theme.palette.primary.main}20)`,
        backdropFilter: "blur(12px)",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 16,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25)"
        }
    }));
const CompactView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(()=>({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 40
    }));
const ExpandedView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        padding: theme.spacing(1),
        minWidth: 160
    }));
const LanguageToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing(1),
        padding: theme.spacing(1),
        borderRadius: 12,
        background: `linear-gradient(135deg, ${theme.palette.background.paper}90, ${theme.palette.background.paper}70)`,
        border: `1px solid ${theme.palette.divider}`
    }));
const LanguageLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"])(()=>({
        fontFamily: "Cinzel, serif",
        fontWeight: 600,
        fontSize: "0.85rem",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        transition: "all 0.2s ease"
    }));
const CustomSwitch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Switch$2f$Switch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Switch$3e$__["Switch"])(({ theme })=>({
        width: 60,
        height: 30,
        padding: 0,
        "& .MuiSwitch-switchBase": {
            margin: 2,
            padding: 0,
            transform: "translateX(6px)",
            "&.Mui-checked": {
                color: "#fff",
                transform: "translateX(26px)",
                "& .MuiSwitch-thumb:before": {
                    content: "'TH'",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    left: 0,
                    top: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "9px",
                    fontWeight: "bold",
                    color: theme.palette.secondary.main,
                    fontFamily: "Cinzel, serif"
                },
                "& + .MuiSwitch-track": {
                    backgroundColor: theme.palette.secondary.main,
                    opacity: 1,
                    border: 0
                }
            },
            "&.Mui-focusVisible .MuiSwitch-thumb": {
                color: theme.palette.secondary.main,
                border: "6px solid #fff"
            }
        },
        "& .MuiSwitch-thumb": {
            boxSizing: "border-box",
            width: 26,
            height: 26,
            "&:before": {
                content: "'EN'",
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "9px",
                fontWeight: "bold",
                color: theme.palette.primary.main,
                fontFamily: "Cinzel, serif"
            }
        },
        "& .MuiSwitch-track": {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.primary.main,
            opacity: 1,
            transition: theme.transitions.create([
                "background-color"
            ], {
                duration: 500
            })
        }
    }));
const LanguageSwitcher = ()=>{
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentLang, setCurrentLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentLanguage"])());
    const [, setForceUpdate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // Force re-render when language changes to update all components
    const handleLanguageChange = (newLanguage)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setCurrentLanguage"])(newLanguage);
        setCurrentLang(newLanguage);
        setForceUpdate((prev)=>prev + 1);
        // Trigger a custom event that other components can listen to
        window.dispatchEvent(new CustomEvent("languageChanged", {
            detail: newLanguage
        }));
        // Store preference in localStorage
        localStorage.setItem("preferred-language", newLanguage);
    };
    // Load saved language preference on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedLanguage = localStorage.getItem("preferred-language");
        if (savedLanguage && (savedLanguage === "en" || savedLanguage === "th")) {
            handleLanguageChange(savedLanguage);
        }
    }, []);
    const toggleExpanded = ()=>{
        setIsExpanded(!isExpanded);
    };
    const handleSwitchChange = (event)=>{
        const newLanguage = event.target.checked ? "th" : "en";
        handleLanguageChange(newLanguage);
    };
    const getLanguageDisplayName = (lang)=>{
        return lang === "en" ? "English" : "ไทย";
    };
    const getLanguageFlag = (lang)=>{
        return lang === "en" ? "🇺🇸" : "🇹🇭";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatingLanguageSwitcher, {
        elevation: 8,
        children: !isExpanded ? // Compact view
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CompactView, {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                title: `Switch to ${currentLang === "en" ? "Thai" : "English"}`,
                placement: "left",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                    onClick: toggleExpanded,
                    size: "small",
                    sx: {
                        color: "secondary.main",
                        "&:hover": {
                            backgroundColor: "secondary.main",
                            color: "secondary.contrastText"
                        }
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Language$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                        lineNumber: 207,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                    lineNumber: 196,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                lineNumber: 192,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
            lineNumber: 191,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)) : // Expanded view
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Fade$2f$Fade$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Fade$3e$__["Fade"], {
            in: isExpanded,
            timeout: 300,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ExpandedView, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Translate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        color: "secondary",
                                        fontSize: "small"
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                                        lineNumber: 223,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                        variant: "caption",
                                        color: "text.secondary",
                                        fontWeight: "bold",
                                        children: "Language"
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                                        lineNumber: 224,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                                lineNumber: 222,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                onClick: toggleExpanded,
                                size: "small",
                                sx: {
                                    color: "text.secondary"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Language$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                                    lineNumber: 237,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                                lineNumber: 232,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                        lineNumber: 216,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageToggle, {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    textAlign: "center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "caption",
                                            display: "block",
                                            sx: {
                                                fontSize: "10px"
                                            },
                                            children: getLanguageFlag("en")
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                                            lineNumber: 245,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageLabel, {
                                            color: currentLang === "en" ? "primary.main" : "text.secondary",
                                            sx: {
                                                opacity: currentLang === "en" ? 1 : 0.6,
                                                transform: currentLang === "en" ? "scale(1.1)" : "scale(1)"
                                            },
                                            children: "EN"
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                                            lineNumber: 252,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                                    lineNumber: 244,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomSwitch, {
                                    checked: currentLang === "th",
                                    onChange: handleSwitchChange,
                                    size: "small"
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                                    lineNumber: 266,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                    textAlign: "center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                            variant: "caption",
                                            display: "block",
                                            sx: {
                                                fontSize: "10px"
                                            },
                                            children: getLanguageFlag("th")
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                                            lineNumber: 273,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageLabel, {
                                            color: currentLang === "th" ? "secondary.main" : "text.secondary",
                                            sx: {
                                                opacity: currentLang === "th" ? 1 : 0.6,
                                                transform: currentLang === "th" ? "scale(1.1)" : "scale(1)"
                                            },
                                            children: "TH"
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                                            lineNumber: 280,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                                    lineNumber: 272,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                            lineNumber: 243,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                        lineNumber: 242,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        mt: 2,
                        textAlign: "center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "caption",
                            color: "text.secondary",
                            children: getLanguageDisplayName(currentLang)
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                            lineNumber: 298,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                        lineNumber: 297,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
                lineNumber: 214,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
            lineNumber: 213,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx",
        lineNumber: 188,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = LanguageSwitcher;
}),
"[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/songList.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SONG_LIST",
    ()=>SONG_LIST
]);
const SONG_LIST = [
    {
        title: "Adventure Then",
        artist: "ABED OST",
        src: "/music/adventure_then.mp3",
        duration: 180
    },
    {
        title: "Alone Forward",
        artist: "ABED OST",
        src: "/music/alone_forward.mp3",
        duration: 200
    },
    {
        title: "Divine Algorithm",
        artist: "ABED OST",
        src: "/music/Divine Algorithm.mp3",
        duration: 240
    },
    {
        title: "Don't Look Away",
        artist: "ABED OST",
        src: "/music/dont_look_away.mp3",
        duration: 220
    },
    {
        title: "Electric Dream Arcane Beam",
        artist: "ABED OST",
        src: "/music/Electric Dream Arcane Beam.mp3",
        duration: 180
    },
    {
        title: "Electric Thrill",
        artist: "ABED OST",
        src: "/music/Electric Thrill.mp3",
        duration: 160
    },
    {
        title: "Fighting Future",
        artist: "ABED OST",
        src: "/music/fighting_future.mp3",
        duration: 210
    },
    {
        title: "Love Invariant",
        artist: "ABED OST",
        src: "/music/Love Invariant.mp3",
        duration: 190
    },
    {
        title: "Make it Wild",
        artist: "ABED OST",
        src: "/music/Make it Wild.mp3",
        duration: 170
    },
    {
        title: "Missing You",
        artist: "ABED OST",
        src: "/music/Missing you.mp3",
        duration: 200
    },
    {
        title: "My Name",
        artist: "ABED OST",
        src: "/music/my_name.mp3",
        duration: 180
    },
    {
        title: "Neon Love Glow",
        artist: "ABED OST",
        src: "/music/Neon Love Glow.mp3",
        duration: 160
    },
    {
        title: "Oath in Wind",
        artist: "ABED OST",
        src: "/music/oath_in_wind.mp3",
        duration: 220
    },
    {
        title: "Thousand Names",
        artist: "ABED OST",
        src: "/music/Thousand Names.mp3",
        duration: 240
    },
    {
        title: "Twilight Heart",
        artist: "ABED OST",
        src: "/music/twilight_heart.mp3",
        duration: 200
    },
    {
        title: "Under Tokyo Skies",
        artist: "ABED OST",
        src: "/music/Under Tokyo Skies.mp3",
        duration: 180
    }
];
}),
"[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/hooks/useMusicPlayer.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMusicPlayer",
    ()=>useMusicPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$songList$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/songList.ts [app-ssr] (ecmascript)");
;
;
const useMusicPlayer = ()=>{
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isPlaying: false,
        isExpanded: false,
        volume: 0.7,
        isMuted: false,
        currentTime: 0,
        duration: 0,
        currentTrackIndex: 0,
        isLoading: false,
        isShuffle: false,
        showSongList: false
    });
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const previousVolumeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(state.volume);
    const currentTrack = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$songList$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SONG_LIST"][state.currentTrackIndex];
    // Initialize audio element
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const audio = audioRef.current;
        if (!audio) return;
        const handleLoadedData = ()=>{
            setState((prev)=>({
                    ...prev,
                    duration: audio.duration,
                    isLoading: false
                }));
        };
        const handleTimeUpdate = ()=>{
            setState((prev)=>({
                    ...prev,
                    currentTime: audio.currentTime
                }));
        };
        const handleEnded = ()=>{
            // Auto-play next track
            const nextIndex = (state.currentTrackIndex + 1) % __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$songList$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SONG_LIST"].length;
            setState((prev)=>({
                    ...prev,
                    currentTrackIndex: nextIndex
                }));
        };
        const handleLoadStart = ()=>{
            // Only show loading if we're actually trying to play
            if (state.isPlaying) {
                setState((prev)=>({
                        ...prev,
                        isLoading: true
                    }));
            }
        };
        const handleError = ()=>{
            console.warn("Audio failed to load:", currentTrack.src);
            setState((prev)=>({
                    ...prev,
                    isLoading: false,
                    isPlaying: false
                }));
        };
        audio.addEventListener("loadeddata", handleLoadedData);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", handleEnded);
        audio.addEventListener("loadstart", handleLoadStart);
        audio.addEventListener("error", handleError);
        return ()=>{
            audio.removeEventListener("loadeddata", handleLoadedData);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("ended", handleEnded);
            audio.removeEventListener("loadstart", handleLoadStart);
            audio.removeEventListener("error", handleError);
        };
    }, [
        state.currentTrackIndex,
        currentTrack.src,
        state.isPlaying
    ]);
    // Update audio volume
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const audio = audioRef.current;
        if (audio) {
            audio.volume = state.isMuted ? 0 : state.volume;
        }
    }, [
        state.volume,
        state.isMuted
    ]);
    // Update audio source when track changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const audio = audioRef.current;
        if (audio && currentTrack) {
            audio.src = currentTrack.src;
            // Reset loading state when changing tracks
            setState((prev)=>({
                    ...prev,
                    isLoading: false
                }));
            if (state.isPlaying) {
                audio.play().catch(console.warn);
            }
        }
    }, [
        state.currentTrackIndex,
        currentTrack.src,
        state.isPlaying
    ]);
    const togglePlay = ()=>{
        const audio = audioRef.current;
        if (!audio) return;
        if (state.isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(console.warn);
        }
        setState((prev)=>({
                ...prev,
                isPlaying: !prev.isPlaying
            }));
    };
    const toggleMute = ()=>{
        if (state.isMuted) {
            setState((prev)=>({
                    ...prev,
                    volume: previousVolumeRef.current,
                    isMuted: false
                }));
        } else {
            previousVolumeRef.current = state.volume;
            setState((prev)=>({
                    ...prev,
                    volume: 0,
                    isMuted: true
                }));
        }
    };
    const handleVolumeChange = (_, newValue)=>{
        const newVolume = Array.isArray(newValue) ? newValue[0] : newValue;
        setState((prev)=>({
                ...prev,
                volume: newVolume / 100,
                isMuted: newVolume > 0 ? false : prev.isMuted
            }));
    };
    const handleProgressChange = (_, newValue)=>{
        const audio = audioRef.current;
        if (!audio) return;
        const newTime = Array.isArray(newValue) ? newValue[0] : newValue;
        audio.currentTime = newTime / 100 * state.duration;
        setState((prev)=>({
                ...prev,
                currentTime: audio.currentTime
            }));
    };
    const toggleExpanded = ()=>{
        setState((prev)=>({
                ...prev,
                isExpanded: !prev.isExpanded
            }));
    };
    const nextTrack = ()=>{
        let currentIndex = state.currentTrackIndex;
        const getNextIndex = ()=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$songList$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SONG_LIST"].length === 1) return 0;
            if (state.isShuffle) {
                return Math.floor(Math.random() * __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$songList$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SONG_LIST"].length);
            }
            return (state.currentTrackIndex + 1) % __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$songList$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SONG_LIST"].length;
        };
        let nextIndex = getNextIndex();
        while(nextIndex === currentIndex){
            nextIndex = getNextIndex();
        }
        ;
        setState((prev)=>({
                ...prev,
                currentTrackIndex: nextIndex
            }));
    };
    const previousTrack = ()=>{
        const prevIndex = state.currentTrackIndex === 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$songList$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SONG_LIST"].length - 1 : state.currentTrackIndex - 1;
        setState((prev)=>({
                ...prev,
                currentTrackIndex: prevIndex
            }));
    };
    const formatTime = (seconds)=>{
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };
    const getVolumeIcon = ()=>{
        if (state.isMuted || state.volume === 0) return "muted";
        if (state.volume < 0.5) return "low";
        return "high";
    };
    const toggleShuffle = ()=>{
        setState((prev)=>({
                ...prev,
                isShuffle: !prev.isShuffle
            }));
    };
    const toggleSongList = ()=>{
        setState((prev)=>({
                ...prev,
                showSongList: !prev.showSongList
            }));
    };
    const seekBackward = ()=>{
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = Math.max(0, audio.currentTime - 10);
        setState((prev)=>({
                ...prev,
                currentTime: audio.currentTime
            }));
    };
    const seekForward = ()=>{
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
        setState((prev)=>({
                ...prev,
                currentTime: audio.currentTime
            }));
    };
    const selectTrack = (index)=>{
        setState((prev)=>({
                ...prev,
                currentTrackIndex: index
            }));
    };
    return {
        state,
        currentTrack,
        audioRef,
        togglePlay,
        toggleMute,
        handleVolumeChange,
        handleProgressChange,
        toggleExpanded,
        nextTrack,
        previousTrack,
        formatTime,
        getVolumeIcon,
        toggleShuffle,
        toggleSongList,
        seekBackward,
        seekForward,
        selectTrack,
        tracks: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$songList$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SONG_LIST"]
    };
};
}),
"[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/ScrollingText.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollingTextComponent",
    ()=>ScrollingTextComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/styled.js [app-ssr] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$emotion$2f$react$2f$dist$2f$emotion$2d$react$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@emotion/react/dist/emotion-react.development.esm.js [app-ssr] (ecmascript) <locals>");
;
;
;
const scrollAnimation = __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$emotion$2f$react$2f$dist$2f$emotion$2d$react$2e$development$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["keyframes"]`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;
const ScrollingContainer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(()=>({
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
        position: "relative",
        height: "1.5em",
        display: "flex",
        alignItems: "center"
    }));
const ScrollingText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"])(()=>({
        display: "inline-block",
        animation: `${scrollAnimation} 10s linear infinite`,
        animationPlayState: "running",
        "&:hover": {
            animationPlayState: "paused"
        }
    }));
const ScrollingTextComponent = ({ text, maxWidth = 120, variant = "body2", color = "text.primary" })=>{
    const shouldScroll = text.length > 15; // Adjust threshold as needed
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollingContainer, {
        sx: {
            maxWidth
        },
        children: shouldScroll ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollingText, {
            variant: variant,
            color: color,
            noWrap: true,
            children: [
                text,
                " • ",
                text,
                " "
            ]
        }, void 0, true, {
            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/ScrollingText.tsx",
            lineNumber: 51,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
            variant: variant,
            color: color,
            noWrap: true,
            sx: {
                width: "100%"
            },
            children: text
        }, void 0, false, {
            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/ScrollingText.tsx",
            lineNumber: 55,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/ScrollingText.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/SongList.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SongList",
    ()=>SongList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Paper/Paper.js [app-ssr] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$List$2f$List$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/List/List.js [app-ssr] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$ListItem$2f$ListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListItem$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/ListItem/ListItem.js [app-ssr] (ecmascript) <export default as ListItem>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$ListItemButton$2f$ListItemButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListItemButton$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/ListItemButton/ListItemButton.js [app-ssr] (ecmascript) <export default as ListItemButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/IconButton/IconButton.js [app-ssr] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Close$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Close.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$PlayArrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/PlayArrow.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/styled.js [app-ssr] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$components$2f$ScrollingText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/ScrollingText.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
const SongListContainer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"])(({ theme })=>({
        position: "absolute",
        top: "100%",
        right: 0,
        width: 280,
        maxHeight: 300,
        overflowY: "auto",
        zIndex: 10000,
        marginTop: theme.spacing(1),
        background: `linear-gradient(135deg, ${theme.palette.background.paper}95, ${theme.palette.background.paper}95)`,
        backdropFilter: "blur(12px)",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 12,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)"
    }));
const ListHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        padding: theme.spacing(1.5, 2),
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }));
const SongList = ({ tracks, currentTrackIndex, onSelectTrack, onClose })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SongListContainer, {
        elevation: 8,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ListHeader, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                        variant: "subtitle2",
                        fontWeight: "bold",
                        color: "primary",
                        children: [
                            "Playlist (",
                            tracks.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/SongList.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                        onClick: onClose,
                        size: "small",
                        sx: {
                            color: "text.secondary"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Close$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            fontSize: "small"
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/SongList.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/SongList.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/SongList.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$List$2f$List$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                dense: true,
                sx: {
                    padding: 0
                },
                children: tracks.map((track, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$ListItem$2f$ListItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListItem$3e$__["ListItem"], {
                        disablePadding: true,
                        sx: {
                            backgroundColor: index === currentTrackIndex ? "action.selected" : "transparent",
                            "&:hover": {
                                backgroundColor: "action.hover"
                            }
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$ListItemButton$2f$ListItemButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ListItemButton$3e$__["ListItemButton"], {
                            onClick: ()=>onSelectTrack(index),
                            sx: {
                                py: 0.5,
                                px: 2,
                                minHeight: 48
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                sx: {
                                    display: "flex",
                                    alignItems: "center",
                                    width: "100%",
                                    gap: 1
                                },
                                children: [
                                    index === currentTrackIndex && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$PlayArrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        fontSize: "small",
                                        color: "primary"
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/SongList.tsx",
                                        lineNumber: 93,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            flex: 1,
                                            minWidth: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$components$2f$ScrollingText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollingTextComponent"], {
                                                text: track.title,
                                                maxWidth: 180,
                                                variant: "body2",
                                                color: index === currentTrackIndex ? "primary" : "text.primary"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/SongList.tsx",
                                                lineNumber: 96,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "caption",
                                                color: "text.secondary",
                                                noWrap: true,
                                                sx: {
                                                    display: "block",
                                                    mt: 0.25
                                                },
                                                children: track.artist
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/SongList.tsx",
                                                lineNumber: 102,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/SongList.tsx",
                                        lineNumber: 95,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/SongList.tsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/SongList.tsx",
                            lineNumber: 76,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, index, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/SongList.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/SongList.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/SongList.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MusicPlayer",
    ()=>MusicPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Paper/Paper.js [app-ssr] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/IconButton/IconButton.js [app-ssr] (ecmascript) <export default as IconButton>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Slider$2f$Slider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Slider$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Slider/Slider.js [app-ssr] (ecmascript) <export default as Slider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Tooltip/Tooltip.js [app-ssr] (ecmascript) <export default as Tooltip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Fade$2f$Fade$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Fade$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Fade/Fade.js [app-ssr] (ecmascript) <export default as Fade>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
// import { useNavigate } from "react-router-dom"; // Removed - using dedicated VR toggle
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$PlayArrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/PlayArrow.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Pause$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Pause.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$VolumeUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/VolumeUp.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$VolumeOff$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/VolumeOff.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$VolumeMute$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/VolumeMute.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$MusicNote$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/MusicNote.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$ExpandLess$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/ExpandLess.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$ExpandMore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/ExpandMore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$SkipPrevious$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/SkipPrevious.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$SkipNext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/SkipNext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Replay10$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Replay10.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Forward10$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Forward10.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Shuffle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Shuffle.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$PlaylistPlay$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/PlaylistPlay.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/styled.js [app-ssr] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/localization/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$hooks$2f$useMusicPlayer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/hooks/useMusicPlayer.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$components$2f$ScrollingText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/ScrollingText.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$components$2f$SongList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/SongList.tsx [app-ssr] (ecmascript)");
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
;
;
;
;
const FloatingPlayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"])(({ theme })=>({
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 1000,
        padding: theme.spacing(1),
        minWidth: 60,
        width: "fit-content",
        maxWidth: 320,
        height: "fit-content",
        background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
        backdropFilter: "blur(12px)",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 16,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25)"
        }
    }));
const CompactView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(()=>({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 40
    }));
const ExpandedView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        padding: theme.spacing(1),
        width: 280,
        height: 220,
        position: "relative"
    }));
const VolumeSlider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Slider$2f$Slider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Slider$3e$__["Slider"])(({ theme })=>({
        color: theme.palette.secondary.main,
        "& .MuiSlider-thumb": {
            width: 16,
            height: 16
        },
        "& .MuiSlider-track": {
            height: 3
        },
        "& .MuiSlider-rail": {
            height: 3,
            opacity: 0.3
        }
    }));
const ProgressSlider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Slider$2f$Slider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Slider$3e$__["Slider"])(({ theme })=>({
        color: theme.palette.primary.main,
        height: 4,
        "& .MuiSlider-thumb": {
            width: 12,
            height: 12,
            "&:hover, &.Mui-focusVisible": {
                boxShadow: `0 0 0 8px ${theme.palette.primary.main}20`
            }
        },
        "& .MuiSlider-track": {
            height: 4,
            borderRadius: 2
        },
        "& .MuiSlider-rail": {
            height: 4,
            borderRadius: 2,
            opacity: 0.2
        }
    }));
const MusicPlayer = ()=>{
    const { state, currentTrack, audioRef, togglePlay, toggleMute, handleVolumeChange, handleProgressChange, toggleExpanded, formatTime, getVolumeIcon, toggleShuffle, toggleSongList, seekBackward, seekForward, nextTrack, previousTrack, selectTrack, tracks } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$hooks$2f$useMusicPlayer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMusicPlayer"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocalization"])();
    const renderVolumeIcon = ()=>{
        const volumeLevel = getVolumeIcon();
        switch(volumeLevel){
            case "muted":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$VolumeOff$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                    lineNumber: 134,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
            case "low":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$VolumeMute$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                    lineNumber: 136,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
            case "high":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$VolumeUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                    lineNumber: 138,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$VolumeUp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                    lineNumber: 140,
                    columnNumber: 16
                }, ("TURBOPACK compile-time value", void 0));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                ref: audioRef,
                preload: "metadata",
                loop: false
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatingPlayer, {
                elevation: 8,
                children: !state.isExpanded ? // Compact view
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CompactView, {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                            title: state.isPlaying ? t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].musicPlayer.pause) : t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].musicPlayer.play),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                onClick: togglePlay,
                                size: "small",
                                disabled: state.isLoading,
                                sx: {
                                    color: "primary.main",
                                    "&:hover": {
                                        backgroundColor: "primary.main",
                                        color: "primary.contrastText"
                                    }
                                },
                                children: state.isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$MusicNote$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    sx: {
                                        animation: "pulse 1.5s ease-in-out infinite"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                    lineNumber: 171,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)) : state.isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Pause$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                    lineNumber: 175,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$PlayArrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                    lineNumber: 177,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                lineNumber: 158,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                            lineNumber: 153,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                            sx: {
                                flex: 1,
                                mx: 1,
                                minWidth: 0,
                                display: "flex",
                                alignItems: "center"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$components$2f$ScrollingText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollingTextComponent"], {
                                text: currentTrack.title,
                                maxWidth: 120,
                                variant: "body2",
                                color: "text.primary"
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                lineNumber: 183,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                            lineNumber: 182,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                            title: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].musicPlayer.expandPlayer),
                            slotProps: {
                                tooltip: {
                                    sx: {
                                        zIndex: 1300
                                    }
                                }
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                onClick: toggleExpanded,
                                size: "small",
                                sx: {
                                    color: "text.secondary"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$ExpandMore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                    lineNumber: 197,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                lineNumber: 192,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                            lineNumber: 191,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                    lineNumber: 152,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : // Expanded view
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Fade$2f$Fade$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Fade$3e$__["Fade"], {
                    in: state.isExpanded,
                    timeout: 300,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ExpandedView, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                mb: 1,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        sx: {
                                            flex: 1,
                                            minWidth: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$components$2f$ScrollingText$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollingTextComponent"], {
                                                text: currentTrack.title,
                                                maxWidth: 200,
                                                variant: "body1",
                                                color: "text.primary"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                                lineNumber: 213,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "caption",
                                                color: "text.secondary",
                                                noWrap: true,
                                                sx: {
                                                    display: "block",
                                                    mt: 0.25
                                                },
                                                children: currentTrack.artist
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                                lineNumber: 219,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                        lineNumber: 212,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                                title: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].musicPlayer.togglePlaylist),
                                                slotProps: {
                                                    tooltip: {
                                                        sx: {
                                                            zIndex: 1300
                                                        }
                                                    }
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                                    onClick: toggleSongList,
                                                    size: "small",
                                                    sx: {
                                                        color: state.showSongList ? "primary.main" : "text.secondary",
                                                        "&:hover": {
                                                            backgroundColor: state.showSongList ? "primary.main" : "action.hover",
                                                            color: state.showSongList ? "primary.contrastText" : "text.primary"
                                                        }
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$PlaylistPlay$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        fontSize: "small"
                                                    }, void 0, false, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                                        lineNumber: 236,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                                    lineNumber: 225,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                                lineNumber: 224,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                                title: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].musicPlayer.collapsePlayer),
                                                slotProps: {
                                                    tooltip: {
                                                        sx: {
                                                            zIndex: 1300
                                                        }
                                                    }
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                                    onClick: toggleExpanded,
                                                    size: "small",
                                                    sx: {
                                                        color: "text.secondary"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$ExpandLess$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                                    lineNumber: 240,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                                lineNumber: 239,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                        lineNumber: 223,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                lineNumber: 206,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                mb: 2,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProgressSlider, {
                                        size: "small",
                                        value: state.duration ? state.currentTime / state.duration * 100 : 0,
                                        onChange: handleProgressChange,
                                        "aria-label": "Track progress"
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                        lineNumber: 253,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        mt: 0.5,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "caption",
                                                color: "text.secondary",
                                                children: formatTime(state.currentTime)
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                                lineNumber: 260,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                                variant: "caption",
                                                color: "text.secondary",
                                                children: formatTime(state.duration)
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                                lineNumber: 263,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                        lineNumber: 259,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                lineNumber: 252,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 0.5,
                                mb: 2,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                        title: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].musicPlayer.previousTrack),
                                        slotProps: {
                                            tooltip: {
                                                sx: {
                                                    zIndex: 1300
                                                }
                                            }
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                            onClick: previousTrack,
                                            size: "small",
                                            sx: {
                                                color: "text.secondary"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$SkipPrevious$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                                lineNumber: 279,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                            lineNumber: 278,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                        lineNumber: 277,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                        title: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].musicPlayer.seekBack),
                                        slotProps: {
                                            tooltip: {
                                                sx: {
                                                    zIndex: 1300
                                                }
                                            }
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                            onClick: seekBackward,
                                            size: "small",
                                            sx: {
                                                color: "text.secondary"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Replay10$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                                lineNumber: 285,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                            lineNumber: 284,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                        lineNumber: 283,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                        title: state.isPlaying ? t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].musicPlayer.pause) : t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].musicPlayer.play),
                                        slotProps: {
                                            tooltip: {
                                                sx: {
                                                    zIndex: 1300
                                                }
                                            }
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                            onClick: togglePlay,
                                            disabled: state.isLoading,
                                            sx: {
                                                color: "primary.main",
                                                "&:hover": {
                                                    backgroundColor: "primary.main",
                                                    color: "primary.contrastText"
                                                }
                                            },
                                            children: state.isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$MusicNote$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                sx: {
                                                    animation: "pulse 1.5s ease-in-out infinite"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                                lineNumber: 309,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)) : state.isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Pause$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                                lineNumber: 313,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$PlayArrow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                                lineNumber: 315,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                            lineNumber: 297,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                        lineNumber: 289,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                        title: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].musicPlayer.seekForward),
                                        slotProps: {
                                            tooltip: {
                                                sx: {
                                                    zIndex: 1300
                                                }
                                            }
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                            onClick: seekForward,
                                            size: "small",
                                            sx: {
                                                color: "text.secondary"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Forward10$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                                lineNumber: 322,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                            lineNumber: 321,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                        lineNumber: 320,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                        title: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].musicPlayer.nextTrack),
                                        slotProps: {
                                            tooltip: {
                                                sx: {
                                                    zIndex: 1300
                                                }
                                            }
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                            onClick: nextTrack,
                                            size: "small",
                                            sx: {
                                                color: "text.secondary"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$SkipNext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                                lineNumber: 328,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                            lineNumber: 327,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                        lineNumber: 326,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                        title: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].musicPlayer.toggleShuffle),
                                        slotProps: {
                                            tooltip: {
                                                sx: {
                                                    zIndex: 1300
                                                }
                                            }
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                            onClick: toggleShuffle,
                                            size: "small",
                                            sx: {
                                                color: state.isShuffle ? "primary.main" : "text.secondary",
                                                "&:hover": {
                                                    backgroundColor: state.isShuffle ? "primary.main" : "action.hover",
                                                    color: state.isShuffle ? "primary.contrastText" : "text.primary"
                                                }
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Shuffle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                fontSize: "small"
                                            }, void 0, false, {
                                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                                lineNumber: 344,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                            lineNumber: 333,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                        lineNumber: 332,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                lineNumber: 270,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                display: "flex",
                                alignItems: "center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Tooltip$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tooltip$3e$__["Tooltip"], {
                                        title: state.isMuted ? t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].musicPlayer.unmute) : t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].musicPlayer.mute),
                                        slotProps: {
                                            tooltip: {
                                                sx: {
                                                    zIndex: 1300
                                                }
                                            }
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IconButton$3e$__["IconButton"], {
                                            onClick: toggleMute,
                                            size: "small",
                                            sx: {
                                                color: "text.secondary",
                                                mr: 1
                                            },
                                            children: renderVolumeIcon()
                                        }, void 0, false, {
                                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                            lineNumber: 359,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                        lineNumber: 351,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VolumeSlider, {
                                        size: "small",
                                        value: state.isMuted ? 0 : state.volume * 100,
                                        onChange: handleVolumeChange,
                                        "aria-label": t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].musicPlayer.volumeControl),
                                        sx: {
                                            flexGrow: 1
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                        lineNumber: 368,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                lineNumber: 350,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            state.showSongList && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$components$2f$SongList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SongList"], {
                                tracks: tracks,
                                currentTrackIndex: state.currentTrackIndex,
                                onSelectTrack: selectTrack,
                                onClose: toggleSongList
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                                lineNumber: 379,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                        lineNumber: 204,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                    lineNumber: 203,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
}),
"[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$components$2f$MusicPlayer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$hooks$2f$useMusicPlayer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/hooks/useMusicPlayer.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$songList$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/songList.ts [app-ssr] (ecmascript)");
;
;
;
}),
"[project]/workspace/MyProject/Client/webapp/app/components/GlobalComponents.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GlobalComponents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$LanguageSwitcher$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/LanguageSwitcher.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$components$2f$MusicPlayer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/MusicPlayer/components/MusicPlayer.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function GlobalComponents() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$LanguageSwitcher$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LanguageSwitcher"], {}, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/components/GlobalComponents.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$MusicPlayer$2f$components$2f$MusicPlayer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MusicPlayer"], {}, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/components/GlobalComponents.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4ab17b39._.js.map