class RestHandler {
    private API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7890";
    private DEFAULT_TIMEOUT = 10000;

    async makeRequest<REQ, RES>(
        endpoint: string,
        reqBody?: REQ | null,
        requireAuth: boolean = false,
        method: string = "POST",
    ): Promise<RES> {
        const timeout = this.DEFAULT_TIMEOUT;
        
        const url = `${this.API_BASE_URL}${endpoint}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        // Prepare headers
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
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
                body: method !== "GET" && reqBody ? JSON.stringify(reqBody) : undefined,
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                const errorText = await response.text();
                let errorData;
                try {
                    errorData = JSON.parse(errorText);
                } catch {
                    errorData = { message: errorText };
                }
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            
            const jsonResponse = await response.json();
            return jsonResponse;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            // Improve error message for network errors
            if (error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
                throw new Error(`Cannot connect to server at ${this.API_BASE_URL}. Please ensure the backend is running and accessible. Error: ${error.message}`);
            }
            throw error;
        }
    }

    // Convenience methods for common HTTP verbs
    async get<RES>(endpoint: string, requireAuth: boolean = false): Promise<RES> {
        return this.makeRequest<null, RES>(endpoint, null, requireAuth, "GET");
    }

    async post<REQ, RES>(endpoint: string, reqBody?: REQ | null, requireAuth: boolean = false): Promise<RES> {
        return this.makeRequest<REQ, RES>(endpoint, reqBody, requireAuth, "POST");
    }

    async put<REQ, RES>(endpoint: string, reqBody?: REQ | null, requireAuth: boolean = false): Promise<RES> {
        return this.makeRequest<REQ, RES>(endpoint, reqBody, requireAuth, "PUT");
    }

    async delete<RES>(endpoint: string, requireAuth: boolean = false): Promise<RES> {
        return this.makeRequest<null, RES>(endpoint, null, requireAuth, "DELETE");
    }

    // Health check method
    async healthCheck(): Promise<boolean> {
        console.log("Health check");
        try {
            const response = await fetch(`${this.API_BASE_URL}/api/network-test`, {
                method: "GET",
                signal: AbortSignal.timeout(5000),
            });
            console.log("Health check response:", response);
            return response.ok;
        } catch (error) {
            console.log("Health check error:", error);
            return false;
        }
    }
}

export const restHandler = new RestHandler();