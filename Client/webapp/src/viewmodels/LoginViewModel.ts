// LoginViewModel.ts - ViewModel for the login page
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

export class LoginViewModel {
  private state: LoginState = {
    isLoading: false,
    error: null,
    formData: {
      characterId: "",
      password: "",
    },
    fieldErrors: {},
  };

  private listeners: Array<() => void> = [];

  constructor() {
    // Initialize state
  }

  // Subscribe to state changes
  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  // Get current state
  getState(): LoginState {
    return { ...this.state };
  }

  // Update form field
  updateField(field: keyof LoginFormData, value: string): void {
    this.state.formData[field] = value;

    // Clear field error when user starts typing
    if (this.state.fieldErrors[field]) {
      const newFieldErrors = { ...this.state.fieldErrors };
      delete newFieldErrors[field];
      this.state.fieldErrors = newFieldErrors;
    }

    // Clear general error when user starts typing
    if (this.state.error) {
      this.state.error = null;
    }

    this.notifyListeners();
  }

  // Validate form data
  private validateForm(): boolean {
    const formData: FormData = {
      username: this.state.formData.characterId, // For login, username field is characterId
      password: this.state.formData.password,
    };
    

    const validation = validateForm(formData, false); // false = not registration

    this.state.fieldErrors = validation.fieldErrors;

    if (validation.generalErrors.length > 0) {
      this.state.error = validation.generalErrors[0];
    }

    return validation.isValid;
  }

  // Clear all errors
  clearErrors(): void {
    this.state.error = null;
    this.state.fieldErrors = {};
    this.notifyListeners();
  }

  // Set loading state
  private setLoading(isLoading: boolean): void {
    this.state.isLoading = isLoading;
    this.notifyListeners();
  }

  // Set error message
  private setError(error: string | LocalizedText): void {
    this.state.error = error;
    this.state.isLoading = false;
    this.notifyListeners();
  }

  // Handle login
  async login(): Promise<{
    success: boolean;
    hasCharacter?: boolean;
    token?: string;
  }> {
    // Clear previous errors
    this.clearErrors();
    console.log("Login form data:", this.state.formData);

    // Validate form
    if (!this.validateForm()) {
      this.notifyListeners();
      console.log("Login form data is not valid");
      return {
        success: false,
      };
    }

    this.setLoading(true);

    try {
      console.log("Login form data is valid");
      const response = await authService.login({
        username: this.state.formData.characterId,
        password: this.state.formData.password,
      });
      console.log("Login response:", response);

      if (response.success && response.token) {
        console.log("Login response is successful");
        // Store token
        localStorage.setItem("sessionToken", response.token);
        
        // Login successful
        this.state.isLoading = false;
        this.notifyListeners();
        return {
          success: true,
          hasCharacter: response.hasCharacter,
          token: response.token,
        };
      } else {
        // Login failed
        this.setError(response.messageKey || "Login failed. Please try again.");
        return { success: false };
      }
    } catch (error) {
      console.error("Login error:", error);
      this.setError(
        error instanceof Error
          ? error.message
          : "Network error. Please check your connection.",
      );
      return { success: false };
    }
  }

  // Reset form
  reset(): void {
    this.state = {
      isLoading: false,
      error: null,
      formData: {
        characterId: "",
        password: "",
      },
      fieldErrors: {},
    };
    this.notifyListeners();
  }

  // Check if form is valid (for button enabling)
  isFormValid(): boolean {
    const { characterId, password } = this.state.formData;
    return (
      characterId.trim().length > 0 &&
      password.trim().length > 0 &&
      Object.keys(this.state.fieldErrors).length === 0
    );
  }

  // Get field error for specific field
  getFieldError(field: keyof LoginFormData): string | null {
    const errors = this.state.fieldErrors[field];
    return errors && errors.length > 0 ? errors[0] : null;
  }

  // Check API connectivity
  async checkApiConnectivity(): Promise<boolean> {
    try {
      return await authService.healthCheck();
    } catch {
      return false;
    }
  }

  // Cleanup
  destroy(): void {
    this.listeners = [];
  }
}

// Export singleton instance for the login page
export const loginViewModel = new LoginViewModel();
