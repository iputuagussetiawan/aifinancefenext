'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'

import type { jobseekerInputType } from '@/features/onboarding/types/onboarding-type'
import { UiFormInput } from '@/components/ui/UiFormInput'

const ExperienceInfo = () => {
    const {
        register,
        formState: { errors, isSubmitting },
    } = useFormContext<jobseekerInputType>()

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Experience</h2>
                <p className="text-muted-foreground text-sm">
                    What is your professional background?
                </p>
            </div>

            <div className="grid gap-4">
                <UiFormInput
                    {...register('jobTitle')}
                    label="Job Title"
                    placeholder="e.g. Software Engineer"
                    error={errors.jobTitle}
                    isSubmitting={isSubmitting}
                />

                <UiFormInput
                    {...register('position')}
                    label="Level"
                    placeholder="e.g. Senior / Junior"
                    error={errors.position}
                    isSubmitting={isSubmitting}
                />

                <UiFormInput
                    {...register('experience')}
                    label="Years of Experience"
                    placeholder="e.g. 5 Years"
                    error={errors.experience}
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    )
}

export default ExperienceInfo
