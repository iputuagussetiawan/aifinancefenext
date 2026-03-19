import { api } from '@/lib/api-factory'

import type { IUserResponse, profileDTO } from '../types/user-type'

export const userService = {
    // 1. Add the Register function
    getMe: () =>
        api.API<IUserResponse>('/api/user/current', {
            method: 'GET',
            cache: 'no-store', // Always get fresh data
        }),

    update: (formData: FormData) =>
        api.API<IUserResponse>('/api/user/update', {
            method: 'PUT',
            body: formData,
            // We usually don't cache registration attempts
            cache: 'no-store',
        }),
}
