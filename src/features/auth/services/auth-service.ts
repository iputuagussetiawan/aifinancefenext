// services/user-service.ts

import { api } from '@/lib/api-factory'

import type {
    ILoginResponse,
    IUserProfile,
    IUserResponse,
    SigninInputType,
    SignupInputType,
} from '../types/auth-type'

export const userService = {
    // 1. Add the Register function
    register: (data: SignupInputType) =>
        api.API<IUserProfile>('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
            // We usually don't cache registration attempts
            cache: 'no-store',
        }),

    login: (data: SigninInputType) =>
        api.API<ILoginResponse>('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
            // We usually don't cache registration attempts
            cache: 'no-store',
        }),

    getMe: () =>
        api.API<IUserResponse>('/api/user/current', {
            method: 'GET',
            cache: 'no-store', // Always get fresh data
        }),

    logout: () =>
        api.API<IUserResponse>('/api/auth/logout', {
            method: 'POST',
            cache: 'no-store', // Always get fresh data
        }),
}
