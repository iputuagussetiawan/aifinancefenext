import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/features/auth/actions/auth'
import { DASHBOARD_URL, SIGNIN_URL } from '@/lib/constants'

export async function protectOnboarding() {
    const user = await getCurrentUser()
    // 1. Kick out if not logged in
    if (!user) {
        redirect(SIGNIN_URL)
    }
    // 2. Kick out if they already finished onboarding
    if (user.onboardingComplete) {
        redirect(DASHBOARD_URL)
    }
    return user
}
