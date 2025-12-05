"use client";

import { useState } from "react";
import type { LocalizedText } from "@/types/localization";
import { authService } from "@/services/authService";
import { validateForm, type FormData } from "@/services/validation";
import { getL10NByKey } from "@/utils/localizationHelper";
import { L10N } from "@/localization";

export interface RegisterFormData {
  username: string; // Character ID
  email: string;
  password: string;
  confirmPassword: string;
  eulaAccepted: boolean;
}

export interface RegisterState {
  isLoading: boolean;
  error: string | LocalizedText | null;
  success: boolean;
  successMessage: string | LocalizedText | null;
  formData: RegisterFormData;
  fieldErrors: Record<string, string[]>;
}

export function useRegisterLogic() {
  const [state, setState] = useState<RegisterState>({
    isLoading: false,
    error: null,
    success: false,
    successMessage: null,
    formData: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      eulaAccepted: false,
    },
    fieldErrors: {},
  });

  // Update form field
  const updateField = (field: keyof RegisterFormData, value: string | boolean) => {
    setState((prev) => {
      const newFormData = { ...prev.formData };
      if (field === "eulaAccepted" && typeof value === "boolean") {
        newFormData.eulaAccepted = value;
      } else if (typeof value === "string") {
        (newFormData as any)[field] = value;
      }

      const newFieldErrors = { ...prev.fieldErrors };
      // Clear field error when user starts typing/changing
      if (newFieldErrors[field]) {
        delete newFieldErrors[field];
      }

      return {
        ...prev,
        formData: newFormData,
        fieldErrors: newFieldErrors,
        // Clear general error when user starts typing
        error: prev.error ? null : prev.error,
        // Clear success state when user modifies form
        success: prev.success ? false : prev.success,
        successMessage: prev.success ? null : prev.successMessage,
      };
    });
  };

  // Validate form data
  const validateFormData = (): boolean => {
    const formData: FormData = {
      username: state.formData.username, // Character ID
      email:
        state.formData.email.trim() === ""
          ? undefined
          : state.formData.email,
      password: state.formData.password,
      confirmPassword: state.formData.confirmPassword,
      characterId: state.formData.username, // Same as username for registration
      eulaAccepted: state.formData.eulaAccepted,
    };

    const validation = validateForm(formData, true); // true = registration

    setState((prev) => ({
      ...prev,
      fieldErrors: validation.fieldErrors,
      error: validation.generalErrors.length > 0 ? validation.generalErrors[0] : null,
    }));

    return validation.isValid;
  };

  // Clear all errors
  const clearErrors = () => {
    setState((prev) => ({
      ...prev,
      error: null,
      fieldErrors: {},
    }));
  };

  // Handle registration
  const register = async (): Promise<boolean> => {
    // Clear previous states
    clearErrors();
    setState((prev) => ({
      ...prev,
      success: false,
      successMessage: null,
    }));

    // Validate form
    if (!validateFormData()) {
      return false;
    }

    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Prepare registration data
      const registerData = {
        username: state.formData.username,
        email: state.formData.email.trim() || undefined, // Email is optional
        password: state.formData.password,
        lastNewsReceived: "news_000", // Default starting news
      };

      const response = await authService.register(registerData);

      if (response.success) {
        // Registration successful
        setState((prev) => ({
          ...prev,
          success: true,
          successMessage: "Account created successfully! Please log in.",
          isLoading: false,
          error: null,
        }));
        return true;
      } else {
        // Registration failed
        let errorKey = response.messageKey;
        // Check if backend provided a specific error message (for debugging)
        const backendError = (response as any).error;
        // If errorKey exists, try to get from L10N. If not found, use the key itself (it might be a raw error message)
        // Prefer backend error message if available (for debugging)
        const errorMessage = backendError 
          ? backendError
          : (errorKey
            ? (getL10NByKey(errorKey) || errorKey || L10N.registerPage.registrationError)
            : (response.message || L10N.registerPage.registrationError));

        setState((prev) => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
        }));
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Network error. Please check your connection.";
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      return false;
    }
  };

  // Reset form
  const reset = () => {
    setState({
      isLoading: false,
      error: null,
      success: false,
      successMessage: null,
      formData: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        eulaAccepted: false,
      },
      fieldErrors: {},
    });
  };

  // Check if form is valid and can be submitted
  const isFormValid = (): boolean => {
    const { username, password, confirmPassword, eulaAccepted } = state.formData;

    return (
      username.trim().length >= 3 &&
      password.trim().length >= 8 &&
      confirmPassword.trim().length > 0 &&
      password === confirmPassword &&
      eulaAccepted &&
      Object.keys(state.fieldErrors).length === 0
    );
  };

  // Get field error for specific field
  const getFieldError = (field: keyof RegisterFormData): string | null => {
    const errors = state.fieldErrors[field];
    return errors && errors.length > 0 ? errors[0] : null;
  };

  // Check if passwords match (for real-time feedback)
  const doPasswordsMatch = (): boolean => {
    const { password, confirmPassword } = state.formData;
    if (confirmPassword.length === 0) return true; // Don't show error until user types
    return password === confirmPassword;
  };

  // Get password strength for UI feedback
  const getPasswordStrength = (): { score: number; label: string; color: string } => {
    const password = state.formData.password;
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
      { label: "Very Weak", color: "#f44336" },
      { label: "Weak", color: "#ff9800" },
      { label: "Fair", color: "#ffeb3b" },
      { label: "Good", color: "#8bc34a" },
      { label: "Strong", color: "#4caf50" },
    ];

    return {
      score,
      label: strengthMap[score].label,
      color: strengthMap[score].color,
    };
  };

  // Check API connectivity
  const checkApiConnectivity = async (): Promise<boolean> => {
    try {
      return await authService.healthCheck();
    } catch {
      return false;
    }
  };

  return {
    // State
    ...state,
    // Handlers
    updateField,
    register,
    reset,
    clearErrors,
    // Helpers
    isFormValid,
    getFieldError,
    doPasswordsMatch,
    getPasswordStrength,
    checkApiConnectivity,
  };
}

