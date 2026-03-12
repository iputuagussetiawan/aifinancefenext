'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { AUTH_COOKIE_NAME } from '@/lib/constants'

import { userService } from '../services/auth-service'
import type {
    IUserProfile,
    IUserResponse,
    SigninInputType,
    SignupInputType,
} from '../types/auth-type'

export async function handleRegister(data: SignupInputType) {
    try {
        const user = await userService.register(data)
        return { success: true, user }
    } catch (error: any) {
        return { success: false, error: error.message || 'Failed to register' }
    }
}

export async function handleLogin(data: SigninInputType) {
    try {
        // 1. Call the service layer (which uses your new LoginResponse interface)
        const response = await userService.login(data)

        // 2. Extract the token and user data
        const { access_token, user } = response
        console.log(response)

        // 3. Store the JWT in a secure HTTP-only cookie
        // This ensures the token cannot be stolen via JavaScript (XSS)
        const cookieStore = await cookies()
        cookieStore.set(AUTH_COOKIE_NAME, access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 Days
        })

        // 4. Return success to the client-side form
        return {
            success: true,
            message: response.message,
            user,
        }
    } catch (error: any) {
        // 🗝️ Pro Tip: Log the full error on the server, but send a clean message to the client
        console.error('Login Error:', error)

        return {
            success: false,
            error: error.message || 'Invalid email or password. Please try again.',
        }
    }
}

export async function getCurrentUser(): Promise<IUserProfile> {
    const cookieStore = await cookies()
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value

    // 1. If no token, throw a specific error instead of returning null
    if (!token) {
        // throw new Error('UNAUTHORIZED: No session token found')
        console.log('No session token found')
    }

    try {
        const result: IUserResponse = await userService.getMe()

        // 2. Validate the API response
        if (!result || !result.user) {
            throw new Error('USER_NOT_FOUND: Backend returned empty user data')
        }

        return result.user
    } catch (error: any) {
        console.error('Failed to fetch current user:', error)

        // 3. Re-throw the error so the calling component knows it failed
        throw new Error(error.message || 'FAILED_TO_GET_USER')
    }
}

export async function handleLogout() {
    const cookieStore = await cookies()
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value
    if (token) {
        try {
            await userService.logout()
        } catch (error) {
            console.error('Backend logout notice failed:', error)
        }
    }
    cookieStore.delete(AUTH_COOKIE_NAME)
    redirect('/signin')
}
