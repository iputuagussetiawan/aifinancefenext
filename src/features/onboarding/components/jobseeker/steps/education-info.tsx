'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'

import type { jobseekerInputType } from '@/features/onboarding/types/onboarding-type'
import { UiFormInput } from '@/components/ui/UiFormInput'

const EducationInfo = () => {
    const {
        register,
        formState: { errors, isSubmitting },
    } = useFormContext<jobseekerInputType>()

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Education</h2>
                <p className="text-muted-foreground text-sm">
                    Tell us about your academic background.
                </p>
            </div>

            <UiFormInput
                {...register('education')}
                label="Education"
                placeholder="University / Degree"
                error={errors.education}
                isSubmitting={isSubmitting}
            />
        </div>
    )
}

export default EducationInfo
