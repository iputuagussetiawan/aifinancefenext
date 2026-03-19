'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { decodeJwt } from 'jose'

import { AUTH_COOKIE_NAME } from '@/lib/constants'

import { userService } from '../services/user-service'
import type { IUserResponse, profileDTO } from '../types/user-type'

export async function getCurrentUser(
    shouldRedirect: boolean = false,
): Promise<IUserResponse | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value
    // 1. Jika tidak ada token
    if (!token) {
        if (shouldRedirect) redirect('/signin')
        return null
    }
    try {
        // 2. Dekode Payload JWT tanpa verifikasi signature (cepat & efisien untuk cek expiry)
        const payload = decodeJwt(token)

        // 3. Cek apakah ada field 'exp' (expiration)
        if (payload.exp) {
            const expirationTime = payload.exp * 1000 // JWT exp dalam detik, JS Date dalam milidetik
            const now = Date.now()

            if (now >= expirationTime) {
                console.warn('Sesi telah berakhir (Token Expired)')

                // Hapus token dari browser
                cookieStore.delete(AUTH_COOKIE_NAME)

                if (shouldRedirect) redirect('/signin')
                return null
            }
        }

        // 4. Jika token masih valid, panggil API backend
        const result = await userService.getMe()

        if (!result || !result.user) {
            // Jika backend bilang user tidak ditemukan meski token belum expired
            cookieStore.delete(AUTH_COOKIE_NAME)
            if (shouldRedirect) redirect('/signin')
            return null
        }

        return result
    } catch (error: any) {
        console.error('Gagal memproses user:', error.message)

        // Jika error dari API adalah 401 (Unauthorized), hapus token
        if (error.response?.status === 401) {
            cookieStore.delete(AUTH_COOKIE_NAME)
        }

        if (shouldRedirect) redirect('/signin')
        return null
    }
}

export async function handleUpdateProfile(formData: FormData) {
    try {
        // 🔥 Normalize keys (VERY IMPORTANT)
        const normalized = new Map<string, any>()

        for (const [key, value] of formData.entries()) {
            const cleanKey = key.includes('_') ? key.split('_').slice(1).join('_') : key
            normalized.set(cleanKey, value)
        }

        const name = normalized.get('name') as string
        const image = normalized.get('profilePicture') as File | null

        // ✅ Clean FormData for API
        const cleanFormData = new FormData()
        cleanFormData.append('name', name)

        if (image && image.size > 0) {
            cleanFormData.append('profilePicture', image)
        }

        const result = await userService.update(cleanFormData)

        revalidatePath('/dashboard/account')

        return {
            success: true,
            result,
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Failed to update',
        }
    }
}
