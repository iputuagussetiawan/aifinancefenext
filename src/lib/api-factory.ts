// File: lib/api-factory.ts
import 'server-only'

import { cookies } from 'next/headers'

import { AUTH_COOKIE_NAME } from './constants'

class FetchFactory {
    private async getRequestConfig(): Promise<Record<string, string>> {
        const cookieStore = await cookies()

        const token = cookieStore.get(AUTH_COOKIE_NAME)?.value
        const cookieHeader = cookieStore.toString()

        // Use a plain object for easier manipulation
        const headers: Record<string, string> = {
            Accept: 'application/json',
            'Content-Type': 'application/json', // Default for most requests
            Cookie: cookieHeader,
        }

        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }

        return headers
    }

    async API<T>(
        endpoint: string,
        options: RequestInit & { next?: NextFetchRequestConfig } = {},
    ): Promise<T> {
        const apiBaseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL
        const defaultHeaders = await this.getRequestConfig()

        // 1. Merge the headers
        const mergedHeaders: Record<string, string> = {
            ...defaultHeaders,
            ...(options.headers as Record<string, string>),
        }

        // 2. 🛡️ Check if the body is FormData
        // If it is, we MUST delete Content-Type to let fetch set the boundary
        if (options.body instanceof FormData) {
            delete mergedHeaders['Content-Type']
        }

        const url = `${apiBaseUrl}${endpoint}`

        try {
            const response = await fetch(url, {
                ...options,
                headers: mergedHeaders,
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || `API Error ${response.status}`)
            }

            return (await response.json()) as T
        } catch (error) {
            console.error(`Fetch error at ${url}:`, error)
            throw error
        }
    }
}

export const api = new FetchFactory()
