import { api } from '@/lib/api-factory'

import type { EducationDTO, IEducationResponse } from '../types/education-type'

export const educationService = {
    // 1. Add the Register function
    create: (data: EducationDTO) =>
        api.API<IEducationResponse>('/api/education/create', {
            method: 'POST',
            body: JSON.stringify(data),
            // We usually don't cache registration attempts
            cache: 'no-store',
        }),
}
