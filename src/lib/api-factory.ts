// File: lib/api-factory.ts
import 'server-only'

import { cookies } from 'next/headers'

import { AUTH_COOKIE_NAME } from './constants'

class FetchFactory {
    private async getRequestConfig(): Promise<HeadersInit> {
        const cookieStore = await cookies()

        // 🗝️ Get the specific token you saved in handleLogin
        const token = cookieStore.get(AUTH_COOKIE_NAME)?.value
        const cookieHeader = cookieStore.toString()

        const headers: HeadersInit = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Cookie: cookieHeader, // Forward all cookies
        }

        // 🗝️ If a token exists, add it to the Authorization header
        // Many backends prefer this over reading the Cookie header
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

        // Correctly merge headers while keeping the dynamic defaults
        const mergedHeaders = {
            ...defaultHeaders,
            ...options.headers,
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
