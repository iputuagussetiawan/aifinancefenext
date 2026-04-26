import * as z from 'zod'

import type { IInstitution } from '@/features/institution/types/institution-type'

export const educationValidation = z
    .object({
        schoolName: z.string().min(2, 'School name must be at least 2 characters'),
        degree: z.string().min(2, 'Degree must be at least 2 characters'),
        fieldOfStudy: z.string().min(2, 'Field of study must be at least 2 characters'),

        // Start Date: Coerce handles strings from <input type="date" />
        startDate: z.string(),

        // End Date: Converts empty strings to null, then validates as a Date
        endDate: z.string(),

        grade: z.string().optional(),
        activities: z.string().optional(),
        description: z.string().optional(),

        orderPosition: z.number().int(),
    })
    .refine(
        (data) => {
            if (!data.endDate || !data.startDate) return true
            return data.endDate > data.startDate
        },
        {
            message: 'End date must be after start date',
            path: ['endDate'],
        },
    )
export const updateEducationListValidation = z.object({
    educations: z.array(educationValidation),
})

export type EducationInputType = z.infer<typeof educationValidation>
export type EducationDTO = z.infer<typeof educationValidation>

export interface IEducation {
    _id: string
    institution: IInstitution | null
    degree: string
    fieldOfStudy: string
    startDate: string
    endDate: string | null
    grade: string
    description: string
    orderPosition: number
    createdAt: string
    updatedAt: string
}

// Response type for a single education entry, useful for both creation and retrieval
export interface IEducationResponse {
    message: string
    education: IEducation
}

// For listing multiple education entries, we can define a response type that includes an array of IEducation
export interface IEducationsResponse {
    message: string
    count: number
    data: IEducation[]
}
