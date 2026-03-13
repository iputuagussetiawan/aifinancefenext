'use client'

import React from 'react'
import { Briefcase, Check, GraduationCap, LucideIcon, MapPin, UserCircle } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import type { jobseekerInputType } from '@/features/onboarding/types/onboarding-type'

// Mock options - ideally import these from a constants file
const countryOptions = [
    { label: 'Indonesia', value: 'id' },
    { label: 'United States', value: 'us' },
    { label: 'Japan', value: 'jp' },
]

const ReviewStep = () => {
    const { getValues } = useFormContext<jobseekerInputType>()

    // Capture values for review
    const values = getValues()

    const selectedCountry =
        countryOptions.find((opt) => opt.value === values.country)?.label || 'Not selected'

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Review & Submit</h2>
                <p className="text-muted-foreground text-sm">Double check your details.</p>
            </div>

            <div className="bg-muted/30 grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-2">
                <SummaryBox icon={UserCircle} label="Full Name" value={values.fullName} />
                <SummaryBox icon={MapPin} label="Country" value={selectedCountry} />
                <SummaryBox icon={GraduationCap} label="Education" value={values.education} />
                <SummaryBox
                    icon={Briefcase}
                    label="Job Title"
                    value={`${values.jobTitle} (${values.position})`}
                />
                <SummaryBox icon={Check} label="Experience" value={values.experience} />
            </div>
        </div>
    )
}

// Internal Helper Component
interface SummaryBoxProps {
    icon: LucideIcon
    label: string
    value: string
}

const SummaryBox = ({ icon: Icon, label, value }: SummaryBoxProps) => (
    <div className="bg-background flex items-start gap-3 rounded-md border p-3 shadow-sm">
        <div className="bg-primary/10 mt-1 rounded-full p-2">
            <Icon className="text-primary h-4 w-4" />
        </div>
        <div className="space-y-1">
            <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                {label}
            </p>
            <p className="text-sm leading-none font-semibold">
                {value || <span className="text-muted-foreground/50 italic">Empty</span>}
            </p>
        </div>
    </div>
)

export default ReviewStep
