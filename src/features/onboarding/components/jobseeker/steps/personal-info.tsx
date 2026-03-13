'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'

import type { jobseekerInputType } from '@/features/onboarding/types/onboarding-type'
import { UiFormInput } from '@/components/ui/UiFormInput'
import { UiFormSearchSelect } from '@/components/ui/UiFormSearchSelect'

const countryOptions = [
    { label: 'Indonesia', value: 'id' },
    { label: 'United States', value: 'us' },
    { label: 'Japan', value: 'jp' },
]

const PersonalInfo = () => {
    // 1. Get register and formState from context
    const {
        register,
        formState: { errors, isSubmitting },
    } = useFormContext<jobseekerInputType>()

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <p className="text-muted-foreground text-sm">Set up your credentials.</p>
            </div>

            <UiFormInput
                {...register('fullName')}
                label="Full Name"
                placeholder="e.g. Jane Doe"
                error={errors.fullName}
                isSubmitting={isSubmitting}
            />

            <UiFormSearchSelect
                name="country"
                label="Country"
                options={countryOptions}
                error={errors.country}
                isSubmitting={isSubmitting}
            />
        </div>
    )
}

export default PersonalInfo
