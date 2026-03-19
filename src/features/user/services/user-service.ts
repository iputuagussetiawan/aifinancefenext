import { api } from '@/lib/api-factory'

import type { IUserResponse } from '../types/user-type'

export const userService = {
    // 1. Add the Register function
    getMe: () =>
        api.API<IUserResponse>('/api/user/current', {
            method: 'GET',
            cache: 'no-store', // Always get fresh data
        }),
}
