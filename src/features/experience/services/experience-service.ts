// services/user-service.ts

import { api } from '@/lib/api-factory'

import type { ExperienceDTO, IExperienceResponse } from '../types/experience-type'

export const experienceService = {
    create: (data: ExperienceDTO) =>
        api.API<IExperienceResponse>('/api/education/create', {
            method: 'POST',
            body: JSON.stringify(data),
            // We usually don't cache registration attempts
            cache: 'no-store',
        }),
}
