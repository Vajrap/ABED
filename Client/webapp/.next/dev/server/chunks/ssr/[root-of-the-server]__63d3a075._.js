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
"[project]/workspace/MyProject/Client/webapp/src/services/RestHandler.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "restHandler",
    ()=>restHandler
]);
class RestHandler {
    API_BASE_URL = "http://localhost:7890";
    DEFAULT_TIMEOUT = 10000;
    async makeRequest(endpoint, reqBody, requireAuth = false, method = "POST") {
        const timeout = this.DEFAULT_TIMEOUT;
        const url = `${this.API_BASE_URL}${endpoint}`;
        console.log(`[RestHandler] Making ${method} request to: ${url}`, {
            reqBody,
            requireAuth
        });
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), timeout);
        // Prepare headers
        const headers = {
            "Content-Type": "application/json"
        };
        // Add auth token if required
        if (requireAuth) {
            const token = localStorage.getItem("sessionToken");
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
        }
        try {
            const response = await fetch(url, {
                method: method,
                headers,
                signal: controller.signal,
                body: method !== "GET" && reqBody ? JSON.stringify(reqBody) : undefined
            });
            clearTimeout(timeoutId);
            console.log(`[RestHandler] Response status: ${response.status} for ${url}`);
            if (!response.ok) {
                const errorText = await response.text();
                let errorData;
                try {
                    errorData = JSON.parse(errorText);
                } catch  {
                    errorData = {
                        message: errorText
                    };
                }
                console.error(`[RestHandler] Error response for ${url}:`, errorData);
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            const jsonResponse = await response.json();
            console.log(`[RestHandler] Success response from ${url}:`, jsonResponse);
            return jsonResponse;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error instanceof Error && error.name === 'AbortError') {
                console.error(`[RestHandler] Request timeout for ${url}`);
                throw new Error('Request timeout');
            }
            // Improve error message for network errors
            if (error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
                console.error(`[RestHandler] Network error connecting to ${url}:`, error);
                throw new Error(`Cannot connect to server at ${this.API_BASE_URL}. Please ensure the backend is running and accessible. Error: ${error.message}`);
            }
            console.error(`[RestHandler] Error for ${url}:`, error);
            throw error;
        }
    }
    // Convenience methods for common HTTP verbs
    async get(endpoint, requireAuth = false) {
        return this.makeRequest(endpoint, null, requireAuth, "GET");
    }
    async post(endpoint, reqBody, requireAuth = false) {
        return this.makeRequest(endpoint, reqBody, requireAuth, "POST");
    }
    async put(endpoint, reqBody, requireAuth = false) {
        return this.makeRequest(endpoint, reqBody, requireAuth, "PUT");
    }
    async delete(endpoint, requireAuth = false) {
        return this.makeRequest(endpoint, null, requireAuth, "DELETE");
    }
    // Health check method
    async healthCheck() {
        console.log("Health check");
        try {
            const response = await fetch(`${this.API_BASE_URL}/api/network-test`, {
                method: "GET",
                signal: AbortSignal.timeout(5000)
            });
            console.log("Health check response:", response);
            return response.ok;
        } catch (error) {
            console.log("Health check error:", error);
            return false;
        }
    }
}
const restHandler = new RestHandler();
}),
"[project]/workspace/MyProject/Client/webapp/src/services/authService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Authentication service for ABED webapp
__turbopack_context__.s([
    "authService",
    ()=>authService,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$RestHandler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/services/RestHandler.ts [app-ssr] (ecmascript)");
;
class AuthService {
    /**
   * Login user with email and password
   */ async login(credentials) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$RestHandler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["restHandler"].post("/api/login", credentials);
            // Log any error details from backend for debugging
            if (!response.success && response.error) {
                console.error("Backend login error:", response.error);
            }
            return response;
        } catch (error) {
            console.error("Login error:", error);
            return {
                success: false,
                messageKey: error instanceof Error ? error.message : "Login failed",
                token: ""
            };
        }
    }
    /**
   * Register new user account
   */ async register(userData) {
        console.log("Registering user:", userData);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$RestHandler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["restHandler"].post("/api/register", userData);
            // Log any error details from backend for debugging
            if (!response.success && response.error) {
                console.error("Backend registration error:", response.error);
            }
            return response;
        } catch (error) {
            console.error("Registration error:", error);
            return {
                success: false,
                messageKey: error instanceof Error ? error.message : "Registration failed"
            };
        }
    }
    /**
   * Auto authentication (placeholder for JWT validation)
   */ async autoAuth() {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$RestHandler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["restHandler"].post("/api/auth/auto", null);
            return response;
        } catch (error) {
            console.error("Auto auth error:", error);
            return {
                success: false,
                messageKey: error instanceof Error ? error.message : "Auto authentication failed"
            };
        }
    }
    /**
   * Logout user
   */ async logout() {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$RestHandler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["restHandler"].post("/api/auth/logout", null);
            return response;
        } catch (error) {
            console.error("Logout error:", error);
            return {
                success: false,
                messageKey: error instanceof Error ? error.message : "Logout failed"
            };
        }
    }
    /**
   * Check if the API is reachable
   */ async healthCheck() {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$RestHandler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["restHandler"].healthCheck();
    }
}
const authService = new AuthService();
const __TURBOPACK__default__export__ = authService;
}),
"[project]/workspace/MyProject/Client/webapp/src/services/validation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Password validation utilities for ABED webapp
__turbopack_context__.s([
    "getPasswordStrength",
    ()=>getPasswordStrength,
    "validateCharacterId",
    ()=>validateCharacterId,
    "validateEmail",
    ()=>validateEmail,
    "validateForm",
    ()=>validateForm,
    "validatePassword",
    ()=>validatePassword,
    "validatePasswordMatch",
    ()=>validatePasswordMatch,
    "validateRequired",
    ()=>validateRequired,
    "validateUsername",
    ()=>validateUsername
]);
// Default password requirements
const DEFAULT_PASSWORD_REQUIREMENTS = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false
};
const validatePassword = (password, requirements = DEFAULT_PASSWORD_REQUIREMENTS)=>{
    const errors = [];
    // Check minimum length
    if (password.length < requirements.minLength) {
        errors.push(`Password must be at least ${requirements.minLength} characters long`);
    }
    // Check for uppercase letters
    if (requirements.requireUppercase && !/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
    }
    // Check for lowercase letters
    if (requirements.requireLowercase && !/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter");
    }
    // Check for numbers
    if (requirements.requireNumbers && !/\d/.test(password)) {
        errors.push("Password must contain at least one number");
    }
    // Check for special characters (if required)
    if (requirements.requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push("Password must contain at least one special character");
    }
    return {
        isValid: errors.length === 0,
        errors
    };
};
const validatePasswordMatch = (password, confirmPassword)=>{
    const isValid = password === confirmPassword;
    return {
        isValid,
        errors: isValid ? [] : [
            "Passwords do not match"
        ]
    };
};
const validateEmail = (email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    return {
        isValid,
        errors: isValid ? [] : [
            "Please enter a valid email address"
        ]
    };
};
const validateUsername = (username)=>{
    const errors = [];
    if (username.length < 3) {
        errors.push("Username must be at least 3 characters long");
    }
    if (username.length > 20) {
        errors.push("Username must be no more than 20 characters long");
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        errors.push("Username can only contain letters and numbers");
    }
    return {
        isValid: errors.length === 0,
        errors
    };
};
const validateCharacterId = (characterId)=>{
    const errors = [];
    if (characterId.length < 3) {
        errors.push("Character ID must be at least 3 characters long");
    }
    if (characterId.length > 20) {
        errors.push("Character ID must be no more than 20 characters long");
    }
    if (!/^[a-zA-Z0-9_]+$/.test(characterId)) {
        errors.push("Character ID can only contain letters, numbers, and underscores");
    }
    // Cannot start with underscore
    if (characterId.startsWith("_")) {
        errors.push("Character ID cannot start with an underscore");
    }
    // Cannot end with underscore
    if (characterId.endsWith("_")) {
        errors.push("Character ID cannot end with an underscore");
    }
    return {
        isValid: errors.length === 0,
        errors
    };
};
const validateRequired = (value, fieldName)=>{
    const isValid = value.trim().length > 0;
    return {
        isValid,
        errors: isValid ? [] : [
            `${fieldName} is required`
        ]
    };
};
const validateForm = (data, isRegistration = false)=>{
    console.log("Validating form data:", data);
    console.log("Is registration:", isRegistration);
    const fieldErrors = {};
    const generalErrors = [];
    // Username validation (for login, we use it as characterId)
    if (data.username !== undefined) {
        console.log("Username:", data.username);
        if (isRegistration) {
            // For registration, username should be a character ID
            const usernameValidation = validateCharacterId(data.username);
            if (!usernameValidation.isValid) {
                fieldErrors.username = usernameValidation.errors;
            }
        } else {
            // For login, username is character ID
            const characterIdValidation = validateCharacterId(data.username);
            if (!characterIdValidation.isValid) {
                fieldErrors.username = characterIdValidation.errors;
            }
        }
    }
    // Email validation (for registration)
    if (data.email !== undefined && data.email.trim() !== "") {
        const emailValidation = validateEmail(data.email);
        if (!emailValidation.isValid) {
            fieldErrors.email = emailValidation.errors;
        }
    }
    // Password validation
    if (data.password !== undefined) {
        const requiredValidation = validateRequired(data.password, "Password");
        if (!requiredValidation.isValid) {
            fieldErrors.password = requiredValidation.errors;
        } else {
            const passwordValidation = validatePassword(data.password);
            if (!passwordValidation.isValid) {
                fieldErrors.password = passwordValidation.errors;
            }
        }
    }
    // Confirm password validation (for registration)
    if (isRegistration && data.confirmPassword !== undefined) {
        const requiredValidation = validateRequired(data.confirmPassword, "Confirm Password");
        if (!requiredValidation.isValid) {
            fieldErrors.confirmPassword = requiredValidation.errors;
        } else if (data.password) {
            const matchValidation = validatePasswordMatch(data.password, data.confirmPassword);
            if (!matchValidation.isValid) {
                fieldErrors.confirmPassword = matchValidation.errors;
            }
        }
    }
    // Character ID validation (for registration)
    if (isRegistration && data.characterId !== undefined) {
        const requiredValidation = validateRequired(data.characterId, "Character ID");
        if (!requiredValidation.isValid) {
            fieldErrors.characterId = requiredValidation.errors;
        } else {
            const characterIdValidation = validateCharacterId(data.characterId);
            if (!characterIdValidation.isValid) {
                fieldErrors.characterId = characterIdValidation.errors;
            }
        }
    }
    // EULA acceptance validation (for registration)
    if (isRegistration && data.eulaAccepted !== undefined) {
        if (!data.eulaAccepted) {
            generalErrors.push("You must agree to the terms and conditions");
        }
    }
    return {
        isValid: Object.keys(fieldErrors).length === 0 && generalErrors.length === 0,
        fieldErrors,
        generalErrors
    };
};
const getPasswordStrength = (password)=>{
    let score = 0;
    // Length check
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    // Character variety checks
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
    // Adjust score to 0-4 scale
    score = Math.min(4, Math.max(0, score - 1));
    const strengthMap = [
        {
            label: "Very Weak",
            color: "#f44336"
        },
        {
            label: "Weak",
            color: "#ff9800"
        },
        {
            label: "Fair",
            color: "#ffeb3b"
        },
        {
            label: "Good",
            color: "#8bc34a"
        },
        {
            label: "Strong",
            color: "#4caf50"
        }
    ];
    return {
        score,
        label: strengthMap[score].label,
        color: strengthMap[score].color
    };
};
}),
"[project]/workspace/MyProject/Client/webapp/app/login/useLoginLogic.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLoginLogic",
    ()=>useLoginLogic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/services/authService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$validation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/services/validation.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function useLoginLogic() {
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isLoading: false,
        error: null,
        formData: {
            characterId: "",
            password: ""
        },
        fieldErrors: {}
    });
    // Update form field
    const updateField = (field, value)=>{
        setState((prev)=>{
            const newFieldErrors = {
                ...prev.fieldErrors
            };
            // Clear field error when user starts typing
            if (newFieldErrors[field]) {
                delete newFieldErrors[field];
            }
            return {
                ...prev,
                formData: {
                    ...prev.formData,
                    [field]: value
                },
                fieldErrors: newFieldErrors,
                // Clear general error when user starts typing
                error: prev.error ? null : prev.error
            };
        });
    };
    // Validate form data
    const validateFormData = ()=>{
        const formData = {
            username: state.formData.characterId,
            password: state.formData.password
        };
        const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$validation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateForm"])(formData, false); // false = not registration
        setState((prev)=>({
                ...prev,
                fieldErrors: validation.fieldErrors,
                error: validation.generalErrors.length > 0 ? validation.generalErrors[0] : null
            }));
        return validation.isValid;
    };
    // Clear all errors
    const clearErrors = ()=>{
        setState((prev)=>({
                ...prev,
                error: null,
                fieldErrors: {}
            }));
    };
    // Handle login
    const login = async ()=>{
        // Clear previous errors
        clearErrors();
        // Validate form
        if (!validateFormData()) {
            return {
                success: false
            };
        }
        setState((prev)=>({
                ...prev,
                isLoading: true
            }));
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].login({
                username: state.formData.characterId,
                password: state.formData.password
            });
            if (response.success && response.token) {
                // Store token
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                setState((prev)=>({
                        ...prev,
                        isLoading: false
                    }));
                return {
                    success: true,
                    hasCharacter: response.hasCharacter,
                    token: response.token
                };
            } else {
                // Login failed
                // Check if backend provided a specific error message (for debugging)
                const backendError = response.error;
                const errorMessage = backendError ? backendError : response.messageKey || "Login failed. Please try again.";
                setState((prev)=>({
                        ...prev,
                        error: errorMessage,
                        isLoading: false
                    }));
                return {
                    success: false
                };
            }
        } catch (error) {
            setState((prev)=>({
                    ...prev,
                    error: error instanceof Error ? error.message : "Network error. Please check your connection.",
                    isLoading: false
                }));
            return {
                success: false
            };
        }
    };
    // Reset form
    const reset = ()=>{
        setState({
            isLoading: false,
            error: null,
            formData: {
                characterId: "",
                password: ""
            },
            fieldErrors: {}
        });
    };
    // Check if form is valid (for button enabling)
    const isFormValid = ()=>{
        const { characterId, password } = state.formData;
        return characterId.trim().length > 0 && password.trim().length > 0 && Object.keys(state.fieldErrors).length === 0;
    };
    // Get field error for specific field
    const getFieldError = (field)=>{
        const errors = state.fieldErrors[field];
        return errors && errors.length > 0 ? errors[0] : null;
    };
    // Check API connectivity
    const checkApiConnectivity = async ()=>{
        try {
            return await __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$services$2f$authService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].healthCheck();
        } catch  {
            return false;
        }
    };
    return {
        // State
        ...state,
        // Handlers
        updateField,
        login,
        reset,
        clearErrors,
        // Helpers
        isFormValid,
        getFieldError,
        checkApiConnectivity
    };
}
}),
"[project]/workspace/MyProject/Client/webapp/src/components/Alert/AlertBox.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertBox",
    ()=>AlertBox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Dialog/Dialog.js [app-ssr] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogTitle/DialogTitle.js [app-ssr] (ecmascript) <export default as DialogTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogContent/DialogContent.js [app-ssr] (ecmascript) <export default as DialogContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogActions/DialogActions.js [app-ssr] (ecmascript) <export default as DialogActions>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContentText$2f$DialogContentText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContentText$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogContentText/DialogContentText.js [app-ssr] (ecmascript) <export default as DialogContentText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Button/Button.js [app-ssr] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/system/esm/colorManipulator.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/useTheme.js [app-ssr] (ecmascript) <export default as useTheme>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Info.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Warning$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Warning.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/Error.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$CheckCircle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/CheckCircle.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
const AlertBox = ({ open, onClose, title, message, severity = "info", buttons })=>{
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$useTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__useTheme$3e$__["useTheme"])();
    // Build severity config from theme
    const severityConfig = {
        info: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
            color: theme.palette.info.main,
            glowColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.info.main, 0.3)
        },
        warning: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Warning$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
            color: theme.palette.warning.main,
            glowColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.warning.main, 0.3)
        },
        error: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$Error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
            color: theme.palette.error.main,
            glowColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.error.main, 0.3)
        },
        success: {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$CheckCircle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
            color: theme.palette.success.main,
            glowColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.success.main, 0.3)
        }
    };
    // Button styles using theme colors
    const buttonVariantStyles = {
        primary: {
            variant: "contained",
            sx: {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                border: `2px solid ${theme.palette.primary.dark}`,
                fontWeight: 600,
                letterSpacing: "0.5px",
                boxShadow: `
          0 2px 8px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.3)},
          inset 0 1px 0 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.2)}
        `,
                "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: `
            0 0 20px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.5)},
            0 4px 12px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.primary.main, 0.4)},
            inset 0 1px 0 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3)}
          `,
                    transform: "translateY(-1px)"
                },
                transition: "all 0.2s ease-out"
            }
        },
        secondary: {
            variant: "outlined",
            sx: {
                color: theme.palette.text.secondary,
                border: `2px solid ${theme.palette.text.disabled}`,
                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.4),
                fontWeight: 600,
                letterSpacing: "0.5px",
                "&:hover": {
                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.7),
                    border: `2px solid ${theme.palette.text.secondary}`,
                    boxShadow: `0 0 12px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.text.disabled, 0.2)}`
                },
                transition: "all 0.2s ease-out"
            }
        },
        danger: {
            variant: "contained",
            sx: {
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
                border: `2px solid ${theme.palette.error.dark}`,
                fontWeight: 600,
                letterSpacing: "0.5px",
                boxShadow: `
          0 2px 8px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.error.main, 0.3)},
          inset 0 1px 0 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.2)}
        `,
                "&:hover": {
                    backgroundColor: theme.palette.error.dark,
                    boxShadow: `
            0 0 20px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.error.main, 0.5)},
            0 4px 12px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(theme.palette.error.main, 0.4)}
          `,
                    transform: "translateY(-1px)"
                },
                transition: "all 0.2s ease-out"
            }
        }
    };
    const config = severityConfig[severity];
    const Icon = config.icon;
    // Default button: OK (รับทราบ)
    const defaultButtons = [
        {
            label: "รับทราบ",
            variant: "primary",
            onClick: onClose
        }
    ];
    const displayButtons = buttons && buttons.length > 0 ? buttons : defaultButtons;
    const handleButtonClick = (button)=>{
        if (button.onClick) {
            button.onClick();
        } else {
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
                border: `3px solid ${config.color}`,
                boxShadow: `
            0 0 30px ${config.glowColor},
            0 8px 32px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.15)},
            inset 0 1px 0 ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3)}
          `,
                position: "relative",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 2,
                    background: `radial-gradient(circle at top right, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(config.color, 0.08)} 0%, transparent 70%)`,
                    pointerEvents: "none"
                }
            }
        },
        BackdropProps: {
            sx: {
                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#1A1A2E", 0.7),
                backdropFilter: "blur(8px)"
            }
        },
        children: [
            title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                sx: {
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    fontFamily: "Cinzel, serif",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: config.color,
                    pb: 2,
                    pt: 1,
                    textShadow: `0 2px 8px ${config.glowColor}`,
                    borderBottom: `2px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(config.color, 0.3)}`,
                    mb: 2
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        sx: {
                            fontSize: "2.25rem",
                            color: config.color,
                            filter: `drop-shadow(0 0 8px ${config.glowColor})`
                        }
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/Alert/AlertBox.tsx",
                        lineNumber: 217,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    title
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/Alert/AlertBox.tsx",
                lineNumber: 201,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                sx: {
                    py: 2
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                    sx: {
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2,
                        padding: 3,
                        borderRadius: 1.5,
                        border: `1px solid ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])(config.color, 0.2)}`,
                        backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#fff", 0.3),
                        boxShadow: `inset 0 2px 4px ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$system$2f$esm$2f$colorManipulator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["alpha"])("#000", 0.03)}`
                    },
                    children: [
                        !title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            sx: {
                                fontSize: "2rem",
                                color: config.color,
                                mt: 0.25,
                                filter: `drop-shadow(0 0 8px ${config.glowColor})`
                            }
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/Alert/AlertBox.tsx",
                            lineNumber: 243,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContentText$2f$DialogContentText$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContentText$3e$__["DialogContentText"], {
                            sx: {
                                fontFamily: "Crimson Text, serif",
                                fontSize: "1.15rem",
                                lineHeight: 1.7,
                                color: theme.palette.text.primary,
                                flex: 1,
                                letterSpacing: "0.01em"
                            },
                            children: message
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/src/components/Alert/AlertBox.tsx",
                            lineNumber: 252,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/workspace/MyProject/Client/webapp/src/components/Alert/AlertBox.tsx",
                    lineNumber: 230,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/Alert/AlertBox.tsx",
                lineNumber: 229,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__["DialogActions"], {
                sx: {
                    padding: 2,
                    paddingTop: 1,
                    gap: 1,
                    justifyContent: "flex-end"
                },
                children: displayButtons.map((button, index)=>{
                    const variantStyle = buttonVariantStyles[button.variant || "primary"];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                        onClick: ()=>handleButtonClick(button),
                        variant: variantStyle.variant,
                        sx: {
                            fontFamily: "Crimson Text, serif",
                            fontSize: "1.05rem",
                            textTransform: "none",
                            minWidth: "120px",
                            px: 3,
                            py: 1,
                            ...variantStyle.sx
                        },
                        children: button.label
                    }, index, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/Alert/AlertBox.tsx",
                        lineNumber: 281,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/src/components/Alert/AlertBox.tsx",
                lineNumber: 268,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/src/components/Alert/AlertBox.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/workspace/MyProject/Client/webapp/src/components/Alert/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$Alert$2f$AlertBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/Alert/AlertBox.tsx [app-ssr] (ecmascript)");
;
}),
"[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Container$2f$Container$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Container$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Container/Container.js [app-ssr] (ecmascript) <export default as Container>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Paper/Paper.js [app-ssr] (ecmascript) <export default as Paper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/TextField/TextField.js [app-ssr] (ecmascript) <export default as TextField>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Button/Button.js [app-ssr] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Typography/Typography.js [app-ssr] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Box/Box.js [app-ssr] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/CircularProgress/CircularProgress.js [app-ssr] (ecmascript) <export default as CircularProgress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/Dialog/Dialog.js [app-ssr] (ecmascript) <export default as Dialog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogTitle/DialogTitle.js [app-ssr] (ecmascript) <export default as DialogTitle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogContent/DialogContent.js [app-ssr] (ecmascript) <export default as DialogContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/DialogActions/DialogActions.js [app-ssr] (ecmascript) <export default as DialogActions>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/material/styles/styled.js [app-ssr] (ecmascript) <locals> <export default as styled>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$LoginOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/node_modules/@mui/icons-material/LoginOutlined.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$app$2f$login$2f$useLoginLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/app/login/useLoginLogic.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/localization/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$Alert$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/Alert/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$Alert$2f$AlertBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/workspace/MyProject/Client/webapp/src/components/Alert/AlertBox.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
const LoginContainer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Container$2f$Container$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Container$3e$__["Container"])(({ theme })=>({
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(2)
    }));
const LoginPaper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Paper$2f$Paper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paper$3e$__["Paper"])(({ theme })=>({
        padding: theme.spacing(10),
        maxWidth: "55vw",
        width: "100%",
        textAlign: "center",
        background: theme.palette.background.default,
        backdropFilter: "blur(10px)",
        border: `2px solid ${theme.palette.primary.main}40`,
        borderRadius: 20,
        boxShadow: `var(--shadow-arcane)`,
        position: "relative",
        overflow: "hidden",
        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.info.main})`
        }
    }));
const TitleBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        marginBottom: theme.spacing(3),
        "& .title-icon": {
            fontSize: 48,
            color: theme.palette.background.default,
            marginBottom: theme.spacing(1),
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
        }
    }));
const FormBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2.5),
        maxWidth: "40%",
        margin: "0 auto",
        marginBottom: theme.spacing(3)
    }));
const ButtonGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$styles$2f$styled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__styled$3e$__["styled"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"])(({ theme })=>({
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
        maxWidth: "40%",
        margin: "0 auto"
    }));
function LoginView() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const loginLogic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$app$2f$login$2f$useLoginLogic$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLoginLogic"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocalization"])();
    const [forgotPasswordOpen, setForgotPasswordOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [resetEmail, setResetEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSubmittingReset, setIsSubmittingReset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [resetMessage, setResetMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const handleFieldChange = (field)=>(event)=>{
            loginLogic.updateField(field, event.target.value);
        };
    const handleLogin = async ()=>{
        const result = await loginLogic.login();
        if (result.success) {
            // Navigate based on whether user has a character
            if (result.hasCharacter) {
                router.push("/game");
            } else {
                router.push("/character-creation");
            }
        }
    };
    const handleRegisterClick = ()=>{
        router.push("/register");
    };
    const handleKeyPress = (event)=>{
        if (event.key === "Enter" && loginLogic.isFormValid() && !loginLogic.isLoading) {
            handleLogin();
        }
    };
    const handleForgotPasswordClick = ()=>{
        setForgotPasswordOpen(true);
        setResetEmail("");
        setResetMessage("");
    };
    const handleCloseForgotPassword = ()=>{
        setForgotPasswordOpen(false);
        setResetEmail("");
        setResetMessage("");
    };
    const handleResetPassword = async ()=>{
        if (!resetEmail.trim()) return;
        setIsSubmittingReset(true);
        setResetMessage("");
        // Simulate API call - replace with actual implementation later
        setTimeout(()=>{
            setIsSubmittingReset(false);
            setResetMessage(t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].loginPage.forgotPasswordModal.successMessage));
            // Close modal after 2 seconds
            setTimeout(()=>{
                setForgotPasswordOpen(false);
                setResetEmail("");
                setResetMessage("");
            }, 2000);
        }, 1000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LoginContainer, {
        maxWidth: false,
        className: "page-enter",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LoginPaper, {
                elevation: 12,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TitleBox, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "h3",
                                component: "h1",
                                color: "primary",
                                gutterBottom: true,
                                children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].loginPage.title)
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "body1",
                                color: "text.secondary",
                                children: "Enter the realm of arcane adventures"
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FormBox, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                fullWidth: true,
                                label: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].loginPage.usernameLabel),
                                variant: "outlined",
                                value: loginLogic.formData.characterId,
                                onChange: handleFieldChange("characterId"),
                                onKeyPress: handleKeyPress,
                                error: !!loginLogic.getFieldError("characterId"),
                                helperText: loginLogic.getFieldError("characterId") || " ",
                                disabled: loginLogic.isLoading,
                                InputProps: {
                                    autoComplete: "username"
                                },
                                sx: {
                                    "& .MuiOutlinedInput-root": {
                                        fontSize: "1.1rem"
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                fullWidth: true,
                                label: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].loginPage.passwordLabel),
                                type: "password",
                                variant: "outlined",
                                value: loginLogic.formData.password,
                                onChange: handleFieldChange("password"),
                                onKeyPress: handleKeyPress,
                                error: !!loginLogic.getFieldError("password"),
                                helperText: loginLogic.getFieldError("password") || " ",
                                disabled: loginLogic.isLoading,
                                InputProps: {
                                    autoComplete: "current-password"
                                },
                                sx: {
                                    "& .MuiOutlinedInput-root": {
                                        fontSize: "1.1rem"
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                                display: "flex",
                                justifyContent: "flex-end",
                                mt: 1,
                                sx: {
                                    maxWidth: "40%",
                                    margin: "0 auto"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    variant: "body2",
                                    onClick: handleForgotPasswordClick,
                                    sx: {
                                        background: "none",
                                        border: "none",
                                        color: "secondary.main",
                                        textDecoration: "none",
                                        cursor: "pointer",
                                        fontSize: "0.875rem",
                                        "&:hover": {
                                            textDecoration: "underline"
                                        }
                                    },
                                    children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].loginPage.forgotPassword)
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                                    lineNumber: 215,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ButtonGroup, {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                            variant: "contained",
                            size: "large",
                            fullWidth: true,
                            onClick: handleLogin,
                            disabled: !loginLogic.isFormValid() || loginLogic.isLoading,
                            startIcon: loginLogic.isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {
                                size: 20,
                                color: "inherit"
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                                lineNumber: 244,
                                columnNumber: 17
                            }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$LoginOutlined$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                                lineNumber: 246,
                                columnNumber: 17
                            }, void 0),
                            sx: {
                                py: 1.5,
                                fontSize: "1.1rem",
                                fontWeight: 600,
                                position: "relative",
                                overflow: "hidden",
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: "-100%",
                                    width: "100%",
                                    height: "100%",
                                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                                    transition: "left 0.5s"
                                },
                                "&:hover::before": {
                                    left: "100%"
                                }
                            },
                            children: loginLogic.isLoading ? "Authenticating..." : t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].loginPage.loginButton)
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                            lineNumber: 236,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                        lineNumber: 235,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Box$2f$Box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                        mt: 3,
                        sx: {
                            maxWidth: "40%",
                            margin: "0 auto",
                            paddingTop: "20px"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "body2",
                            color: "text.secondary",
                            children: [
                                t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].loginPage.newToRealm),
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                    component: "span",
                                    variant: "body2",
                                    onClick: handleRegisterClick,
                                    sx: {
                                        background: "none",
                                        border: "none",
                                        color: "secondary.main",
                                        textDecoration: "none",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        "&:hover": {
                                            textDecoration: "underline"
                                        }
                                    },
                                    children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].loginPage.createAccount)
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                                    lineNumber: 283,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                            lineNumber: 281,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Dialog$2f$Dialog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Dialog$3e$__["Dialog"], {
                open: forgotPasswordOpen,
                onClose: handleCloseForgotPassword,
                maxWidth: "sm",
                fullWidth: true,
                PaperProps: {
                    sx: {
                        borderRadius: 3,
                        border: "2px solid",
                        borderColor: "primary.main"
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogTitle$2f$DialogTitle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogTitle$3e$__["DialogTitle"], {
                        sx: {
                            textAlign: "center",
                            pb: 1
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                            variant: "h5",
                            component: "h2",
                            color: "primary",
                            children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].loginPage.forgotPasswordModal.title)
                        }, void 0, false, {
                            fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                            lineNumber: 320,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                        lineNumber: 319,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogContent$2f$DialogContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogContent$3e$__["DialogContent"], {
                        sx: {
                            py: 3
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Typography$2f$Typography$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"], {
                                variant: "body1",
                                color: "text.secondary",
                                sx: {
                                    mb: 3,
                                    textAlign: "center"
                                },
                                children: "Enter your email address and we'll send you a link to reset your password."
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                                lineNumber: 326,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$TextField$2f$TextField$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TextField$3e$__["TextField"], {
                                fullWidth: true,
                                label: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].loginPage.forgotPasswordModal.emailLabel),
                                type: "email",
                                variant: "outlined",
                                value: resetEmail,
                                onChange: (e)=>setResetEmail(e.target.value),
                                disabled: isSubmittingReset,
                                sx: {
                                    "& .MuiOutlinedInput-root": {
                                        fontSize: "1.1rem"
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                                lineNumber: 335,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                        lineNumber: 325,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$DialogActions$2f$DialogActions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DialogActions$3e$__["DialogActions"], {
                        sx: {
                            px: 3,
                            pb: 3,
                            gap: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                onClick: handleCloseForgotPassword,
                                disabled: isSubmittingReset,
                                variant: "outlined",
                                sx: {
                                    minWidth: 100
                                },
                                children: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].loginPage.forgotPasswordModal.cancelButton)
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                                lineNumber: 352,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$Button$2f$Button$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                onClick: handleResetPassword,
                                disabled: !resetEmail.trim() || isSubmittingReset,
                                variant: "contained",
                                startIcon: isSubmittingReset ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f40$mui$2f$material$2f$CircularProgress$2f$CircularProgress$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircularProgress$3e$__["CircularProgress"], {
                                    size: 16,
                                    color: "inherit"
                                }, void 0, false, {
                                    fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                                    lineNumber: 367,
                                    columnNumber: 17
                                }, void 0) : null,
                                sx: {
                                    minWidth: 140
                                },
                                children: isSubmittingReset ? "Sending..." : t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].loginPage.forgotPasswordModal.submitButton)
                            }, void 0, false, {
                                fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                                lineNumber: 361,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                        lineNumber: 351,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                lineNumber: 306,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$Alert$2f$AlertBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertBox"], {
                open: !!loginLogic.error,
                onClose: loginLogic.clearErrors,
                title: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].common.error),
                message: typeof loginLogic.error === "string" ? loginLogic.error : t(loginLogic.error || __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].loginPage.loginError),
                severity: "error"
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                lineNumber: 380,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$components$2f$Alert$2f$AlertBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertBox"], {
                open: !!resetMessage,
                onClose: ()=>setResetMessage(""),
                title: t(__TURBOPACK__imported__module__$5b$project$5d2f$workspace$2f$MyProject$2f$Client$2f$webapp$2f$src$2f$localization$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["L10N"].common.success),
                message: resetMessage,
                severity: "success"
            }, void 0, false, {
                fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
                lineNumber: 393,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/workspace/MyProject/Client/webapp/app/login/LoginView.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__63d3a075._.js.map