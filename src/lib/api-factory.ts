// File: lib/api-factory.ts
import { AUTH_COOKIE_NAME } from './constants'

class FetchFactory {
    private async getRequestConfig(): Promise<Record<string, string>> {
        const headers: Record<string, string> = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }

        // 🛡️ Check if we are on the Server
        if (typeof window === 'undefined') {
            const { cookies } = await import('next/headers')
            const cookieStore = await cookies()
            const token = cookieStore.get(AUTH_COOKIE_NAME)?.value

            if (token) headers['Authorization'] = `Bearer ${token}`
            headers['Cookie'] = cookieStore.toString()
        }
        // 🛡️ If we are on the Client, the browser automatically sends cookies
        // if we set { credentials: 'include' } or if the API is on the same domain.
        // If you store token in localStorage, get it here.

        return headers
    }

    async API<T>(
        endpoint: string,
        options: RequestInit & { next?: NextFetchRequestConfig } = {},
    ): Promise<T> {
        const apiBaseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL
        const defaultHeaders = await this.getRequestConfig()

        const mergedHeaders: Record<string, string> = {
            ...defaultHeaders,
            ...(options.headers as Record<string, string>),
        }

        // Same FormData logic as before
        if (options.body instanceof FormData) {
            delete mergedHeaders['Content-Type']
        }

        const url = `${apiBaseUrl}${endpoint}`

        const response = await fetch(url, {
            ...options,
            headers: mergedHeaders,
            // Important for client-side cookie forwarding
            credentials: options.credentials || 'include',
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || `API Error ${response.status}`)
        }

        return (await response.json()) as T
    }
}

export const api = new FetchFactory()
