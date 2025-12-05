"use client";

import { useState } from "react";
import type { LocalizedText } from "@/types/localization";
import { authService } from "@/services/authService";
import { validateForm, type FormData } from "@/services/validation";

export interface LoginFormData {
  characterId: string;
  password: string;
}

export interface LoginState {
  isLoading: boolean;
  error: string | LocalizedText | null;
  formData: LoginFormData;
  fieldErrors: Record<string, string[]>;
}

export function useLoginLogic() {
  const [state, setState] = useState<LoginState>({
    isLoading: false,
    error: null,
    formData: {
      characterId: "",
      password: "",
    },
    fieldErrors: {},
  });

  // Update form field
  const updateField = (field: keyof LoginFormData, value: string) => {
    setState((prev) => {
      const newFieldErrors = { ...prev.fieldErrors };
      // Clear field error when user starts typing
      if (newFieldErrors[field]) {
        delete newFieldErrors[field];
      }

      return {
        ...prev,
        formData: {
          ...prev.formData,
          [field]: value,
        },
        fieldErrors: newFieldErrors,
        // Clear general error when user starts typing
        error: prev.error ? null : prev.error,
      };
    });
  };

  // Validate form data
  const validateFormData = (): boolean => {
    const formData: FormData = {
      username: state.formData.characterId, // For login, username field is characterId
      password: state.formData.password,
    };

    const validation = validateForm(formData, false); // false = not registration

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

  // Handle login
  const login = async (): Promise<{
    success: boolean;
    hasCharacter?: boolean;
    token?: string;
  }> => {
    // Clear previous errors
    clearErrors();

    // Validate form
    if (!validateFormData()) {
      return { success: false };
    }

    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await authService.login({
        username: state.formData.characterId,
        password: state.formData.password,
      });

      if (response.success && response.token) {
        // Store token
        if (typeof window !== "undefined") {
          localStorage.setItem("sessionToken", response.token);
        }

        setState((prev) => ({ ...prev, isLoading: false }));
        return {
          success: true,
          hasCharacter: response.hasCharacter,
          token: response.token,
        };
      } else {
        // Login failed
        // Check if backend provided a specific error message (for debugging)
        const backendError = (response as any).error;
        const errorMessage = backendError 
          ? backendError
          : (response.messageKey || "Login failed. Please try again.");
        setState((prev) => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
        }));
        return { success: false };
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error
            ? error.message
            : "Network error. Please check your connection.",
        isLoading: false,
      }));
      return { success: false };
    }
  };

  // Reset form
  const reset = () => {
    setState({
      isLoading: false,
      error: null,
      formData: {
        characterId: "",
        password: "",
      },
      fieldErrors: {},
    });
  };

  // Check if form is valid (for button enabling)
  const isFormValid = (): boolean => {
    const { characterId, password } = state.formData;
    return (
      characterId.trim().length > 0 &&
      password.trim().length > 0 &&
      Object.keys(state.fieldErrors).length === 0
    );
  };

  // Get field error for specific field
  const getFieldError = (field: keyof LoginFormData): string | null => {
    const errors = state.fieldErrors[field];
    return errors && errors.length > 0 ? errors[0] : null;
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
    login,
    reset,
    clearErrors,
    // Helpers
    isFormValid,
    getFieldError,
    checkApiConnectivity,
  };
}

