import { supabase } from "@/integrations/supabase/client";
import { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";

// Enable direct table access for development (set to false in production)
const USE_DIRECT_TABLE_ACCESS = false;

export interface AdminUser {
  id: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

interface AuthResult {
  user: AdminUser | null;
  error: string | null;
}

interface SessionData {
  user: AdminUser;
  sessionToken: string;
  expiresAt: string;
}

// Type definitions for RPC responses
interface VerifyAdminLoginResponse {
  success: boolean;
  message?: string;
  user_id?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
}

interface CreateAdminSessionResponse {
  success: boolean;
  message?: string;
  session_token?: string;
  expires_at?: string;
}

interface VerifyAdminSessionResponse {
  success: boolean;
  message?: string;
}

interface InvalidateAdminSessionResponse {
  success: boolean;
}

class AdminAuthService {
  private readonly SESSION_KEY = "admin_session";
  private readonly MAX_RETRIES = 2;
  private readonly RETRY_DELAY_MS = 1000;

  /**
   * Retry a function with exponential backoff
   */
  private async retry<T>(
    fn: () => any, // Use 'any' or a more specific type if available
    operation: string,
    single: boolean = true,
    retries = this.MAX_RETRIES
  ): Promise<{ data: T | null; error: PostgrestError | null }> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= retries + 1; attempt++) {
      try {
        const query = fn();
        const result = single ? await query.single() : await query.maybeSingle();
        return { data: result.data, error: result.error };
      } catch (error: unknown) {
        lastError = error;
        console.warn(`Attempt ${attempt} failed for ${operation}:`, error);

        if (attempt <= retries) {
          // Check if error is retryable (e.g., network issues)
          const isRetryable = this.isRetryableError(error);
          if (!isRetryable) {
            throw error;
          }

          await new Promise((resolve) =>
            setTimeout(resolve, this.RETRY_DELAY_MS * Math.pow(2, attempt - 1))
          );
        }
      }
    }

    console.error(`All ${retries + 1} attempts failed for ${operation}`);
    throw lastError;
  }

  /**
   * Check if an error is retryable
   */
  private isRetryableError(error: unknown): boolean {
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      return (
        message.includes("network") ||
        message.includes("timeout") ||
        message.includes("connection")
      );
    }
    return false;
  }

  /**
   * Sign in admin user using server-side authentication
   */
  async signIn(email: string, password: string): Promise<AuthResult> {
    try {
      // Input validation
      if (!email || !password) {
        return { user: null, error: "Email and password are required" };
      }

      const trimmedEmail = email.trim().toLowerCase();
      if (!this.isValidEmail(trimmedEmail)) {
        return { user: null, error: "Invalid email format" };
      }

      if (password.length < 6) {
        return { user: null, error: "Password must be at least 6 characters" };
      }

      let user: AdminUser | null = null;

      if (!USE_DIRECT_TABLE_ACCESS) {
        // Use RPC function for secure authentication
        const { data, error } = await this.retry<VerifyAdminLoginResponse>(
          () =>
            supabase.rpc("verify_admin_login", {
              p_email: trimmedEmail,
              p_password: password,
            }),
          "verify_admin_login",
          true
        );

        if (error) {
          console.error("RPC error during sign-in:", error.message);
          return {
            user: null,
            error:
              error.code === "429"
                ? "Too many login attempts. Please try again later."
                : "Authentication failed. Please check your credentials.",
          };
        }

        if (!data || !data.success) {
          return {
            user: null,
            error: data?.message || "Invalid email or password",
          };
        }

        const sessionResult = await this.createSession(data.user_id!);

        if (!sessionResult.success) {
          return {
            user: null,
            error: sessionResult.error || "Failed to create session",
          };
        }

        user = {
          id: data.user_id!,
          email: data.email!,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };

        this.storeSession({
          user,
          sessionToken: sessionResult.sessionToken!,
          expiresAt: sessionResult.expiresAt!,
        });
      } else {
        // Fallback to direct table access (development only)
        const { data, error } = await this.retry<{
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
          password_hash: string;
        }>(
          () =>
            supabase
              .from("admin_users")
              .select("id, email, created_at, updated_at, password_hash")
              .eq("email", trimmedEmail)
              .limit(1),
          "fetch_admin_user",
          false
        );

        if (error) {
          console.error("Database error during sign-in:", error.message);
          return {
            user: null,
            error: "Authentication failed due to database error",
          };
        }

        if (!data) {
          return { user: null, error: "Invalid email or password" };
        }

        const adminUser = data;

        // Assume server-side bcrypt hash (starts with $2)
        if (!adminUser.password_hash.startsWith("$2")) {
          console.error("Invalid password hash format for user:", trimmedEmail);
          return {
            user: null,
            error: "Invalid password storage format",
          };
        }

        // Since bcrypt comparison must be server-side, use RPC or reject direct access
        return {
          user: null,
          error: "Direct password verification not supported",
        };
      }

      return { user, error: null };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred during authentication";
      console.error("Sign-in error:", errorMessage);
      return {
        user: null,
        error: "Authentication failed. Please try again later.",
      };
    }
  }

  /**
   * Create admin session using Supabase function
   */
  private async createSession(userId: string): Promise<{
    success: boolean;
    sessionToken?: string;
    expiresAt?: string;
    error?: string;
  }> {
    try {
      const { data, error } = await this.retry<CreateAdminSessionResponse>(
        () =>
          supabase.rpc("create_admin_session", {
            p_user_id: userId,
          }),
        "create_admin_session",
        true
      );

      if (error) {
        console.error("RPC error during session creation:", error.message);
        return {
          success: false,
          error:
            error.code === "429"
              ? "Too many session creation attempts. Please try again later."
              : "Failed to create session",
        };
      }

      if (!data || !data.success) {
        console.error("Session creation failed:", data?.message);
        return {
          success: false,
          error: data?.message || "Failed to create session",
        };
      }

      return {
        success: true,
        sessionToken: data.session_token!,
        expiresAt: data.expires_at!,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown session creation error";
      console.error("Session creation error:", errorMessage);
      return { success: false, error: "Session creation failed" };
    }
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<AdminUser | null> {
    try {
      const sessionData = this.getStoredSession();
      if (!sessionData) {
        return null;
      }

      if (new Date(sessionData.expiresAt) <= new Date()) {
        console.info("Session expired for user:", sessionData.user.email);
        this.clearSession();
        return null;
      }

      const { data, error } = await this.retry<VerifyAdminSessionResponse>(
        () =>
          supabase.rpc("verify_admin_session", {
            p_session_token: sessionData.sessionToken,
          }),
        "verify_admin_session",
        true
      );

      if (error) {
        console.error("RPC error during session verification:", error.message);
        this.clearSession();
        return null;
      }

      if (!data || !data.success) {
        console.info("Invalid session for user:", sessionData.user.email);
        this.clearSession();
        return null;
      }

      return sessionData.user;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Get current user error:", errorMessage);
      this.clearSession();
      return null;
    }
  }

  /**
   * Sign out admin user
   */
  async signOut(): Promise<void> {
    try {
      const sessionData = this.getStoredSession();
      if (sessionData?.sessionToken) {
        const { error } = await this.retry<InvalidateAdminSessionResponse>(
          () =>
            supabase.rpc("invalidate_admin_session", {
              p_session_token: sessionData.sessionToken,
            }),
          "invalidate_admin_session",
          true
        );

        if (error) {
          console.error("RPC error during sign-out:", error.message);
        }
      }
    } catch (error: unknown) {
      console.error("Sign-out error:", error);
    } finally {
      this.clearSession();
    }
  }

  /**
   * Check if user is currently authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Store session data
   */
  private storeSession(sessionData: SessionData): void {
    try {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
    } catch (error: unknown) {
      console.error("Failed to store session:", error);
    }
  }

  /**
   * Get stored session data
   */
  private getStoredSession(): SessionData | null {
    try {
      const stored = localStorage.getItem(this.SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error: unknown) {
      console.error("Failed to get stored session:", error);
      return null;
    }
  }

  /**
   * Clear all session data
   */
  private clearSession(): void {
    try {
      localStorage.removeItem(this.SESSION_KEY);
    } catch (error: unknown) {
      console.error("Failed to clear session:", error);
    }
  }
}

export const adminAuthService = new AdminAuthService();