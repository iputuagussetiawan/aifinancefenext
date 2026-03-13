import * as z from 'zod'

export const jobseekerFormValidation = z.object({
    fullName: z.string().min(2, 'Full name is required'),
    country: z.string().min(1, 'Please select a country'),
    education: z.string().min(2, 'Education is required'),
    jobTitle: z.string().min(2, 'Job title required'),
    position: z.string().min(2, 'Position required'),
    experience: z.string().min(1, 'Experience required'),
})

export type jobseekerInputType = z.infer<typeof jobseekerFormValidation>
