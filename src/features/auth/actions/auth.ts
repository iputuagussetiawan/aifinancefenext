'use server'

import { cookies } from 'next/headers'

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
        cookieStore.set('session_token', access_token, {
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

export async function getCurrentUser(): Promise<IUserProfile | null> {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('session_token')?.value

        // 🗝️ If there is no cookie, don't even bother calling the API
        if (!token) return null

        // Call the backend /me endpoint
        const result: IUserResponse = await userService.getMe()

        return result.user
    } catch (error) {
        // If the token is expired or invalid, the API will fail
        console.error('Failed to fetch current user:', error)
        return null
    }
}
