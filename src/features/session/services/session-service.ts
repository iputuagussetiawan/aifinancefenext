import { api } from '@/lib/api-factory'

import type { ISessionResponse } from '../types/session-type'

export const sessionService = {
    // 1. Add the Register function
    getAll: () =>
        api.API<ISessionResponse>('/api/session/all', {
            method: 'GET',
            cache: 'no-store',
        }),
    delete: (id: string) =>
        api.API<ISessionResponse>(`/api/session/${id}`, {
            method: 'DELETE',
            cache: 'no-store',
        }),
}
