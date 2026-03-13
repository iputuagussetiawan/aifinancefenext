'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { AUTH_COOKIE_NAME, SIGNIN_URL } from '@/lib/constants'

import { userService } from '../services/auth-service'
import type {
    ForgotPasswordInputType,
    IUserProfile,
    IUserResponse,
    ResetPasswordApiRequestType,
    ResetPasswordInputType,
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
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
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

export async function handleForgotPassword(data: ForgotPasswordInputType) {
    try {
        // 2. Call your backend service
        // Ensure 'forgotPassword' is implemented in your userService
        await userService.forgotPassword(data)

        return {
            success: true,
            message: 'If an account exists with that email, a reset link has been sent.',
        }
    } catch (error: any) {
        // 🗝️ Security Tip: Often better to return success even if email isn't found
        // to prevent "Email Enumeration" attacks.
        return {
            success: false,
            error: error.message || 'Failed to send reset email. Please try again later.',
        }
    }
}

export async function handleResetPassword(data: ResetPasswordApiRequestType) {
    try {
        await userService.resetPassword(data)
        return {
            success: true,
            message: 'Your password has been successfully updated. You can now log in.',
        }
    } catch (error: any) {
        const errorMessage =
            error.response?.data?.message || error.message || 'Failed to update password'
        console.error('[RESET_PASSWORD_ERROR]:', error)
        return {
            success: false,
            error: errorMessage,
        }
    }
}

export async function getCurrentUser(): Promise<IUserProfile | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value

    // 1. If no token, return null so the UI can redirect to signin
    if (!token) {
        console.log('No session token found')
        return null // 🗝️ Fix: Added return statement
    }

    try {
        const result: IUserResponse = await userService.getMe()

        // 2. Validate the API response
        if (!result || !result.user) {
            console.error('USER_NOT_FOUND: Backend returned empty user data')
            return null // 🗝️ Fix: Added return statement
        }

        return result.user
    } catch (error: any) {
        console.error('Failed to fetch current user:', error)

        // 3. Return null so the app doesn't crash, but knows the user isn't auth'd
        return null // 🗝️ Fix: Added return statement to satisfy the return type
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
    redirect(SIGNIN_URL)
}
