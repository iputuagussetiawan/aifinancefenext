import * as z from 'zod'

export const educationValidation = z
    .object({
        schoolName: z.string().min(2, 'School name must be at least 2 characters'),
        degree: z.string().min(2, 'Degree must be at least 2 characters'),
        fieldOfStudy: z.string().min(2, 'Field of study must be at least 2 characters'),

        // date validation, assuming ISO string format or native Date object usage
        startDate: z
            .union([z.date(), z.string().min(1, 'Start date is required')])
            .pipe(z.coerce.date())
            .refine((d) => d < new Date(), { message: 'Start date must be in the past' }),

        // end date can be null if user is currently studying
        endDate: z.coerce.date().nullable().optional(),

        // optional text fields
        grade: z.string().optional(),
        activities: z.string().optional(),
        description: z.string().optional(),

        // number input validation for ordering multiple entries
        orderPosition: z.number().int().nonnegative().default(0),

        // timestamp fields, usually automatically managed
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
    })
    .refine((data) => !data.endDate || data.endDate > data.startDate, {
        message: 'End date must be after start date',
        path: ['endDate'],
    })

export type EducationInputType = z.infer<typeof educationValidation>
export type EducationDTO = z.infer<typeof educationValidation>

export interface IEducation {
    _id: string
    id: string // Virtual id from Mongoose
    userId: string

    // Academic Details
    schoolName: string
    degree: string
    fieldOfStudy: string

    // Status & Dates
    startDate: string // ISO Date String
    endDate: string | null

    // Optional Content
    grade?: string
    activities?: string
    description?: string

    // Metadata
    orderPosition: number
    __v: number
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
