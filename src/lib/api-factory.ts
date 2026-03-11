// File: lib/api-factory.ts
import "server-only";
import { cookies } from "next/headers";

class FetchFactory {
  /**
   * Automatically gathers all cookies (including httpOnly)
   * to forward them to the backend API.
   */
  private async getRequestConfig(): Promise<HeadersInit> {
    const cookieStore = await cookies();

    // .toString() correctly formats all cookies into a single
    // "name=value; name2=value2" string, including httpOnly ones.
    const cookieHeader = cookieStore.toString();

    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    };
  }

  async API<T>(
    endpoint: string,
    options: RequestInit & { next?: NextFetchRequestConfig } = {},
  ): Promise<T> {
    const apiBaseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL;

    // Merge headers: Default + httpOnly Cookies + User Overrides
    const defaultHeaders = await this.getRequestConfig();
    const mergedHeaders = {
      ...defaultHeaders,
      ...options.headers,
    };

    const url = `${apiBaseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: mergedHeaders,
        // credentials: 'omit' is often safer when manually forwarding
        // the Cookie header from server-to-server.
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          status: response.status,
          message: errorData.message || "API Request Failed",
        };
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error(`Fetch error at ${url}:`, error);
      throw error;
    }
  }
}

export const api = new FetchFactory();
