'use client'

// 🗝️ Required for hooks
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Briefcase, User } from 'lucide-react'

import { OnboardingCard } from '@/features/onboarding/components/onboarding-card'
import { Button } from '@/components/ui/button'

const roles = [
    {
        id: 'jobseeker',
        title: 'Job Seeker',
        description: 'Find your dream job and build your career.',
        icon: User,
        features: ['Browse thousands of jobs', 'AI-powered matching', 'Track applications'],
    },
    {
        id: 'employer',
        title: 'Employer',
        description: 'Hire top talent and grow your team.',
        icon: Briefcase,
        features: ['Post unlimited jobs', 'Smart candidate filtering', 'Analytics dashboard'],
    },
]

const OnboardingPage = () => {
    const router = useRouter()
    const [selected, setSelected] = useState<string | null>(null)

    const handleContinue = async () => {
        if (selected) {
            // 🗝️ Removed the non-existent 'onSelect' check
            // Navigate to the specific onboarding path
            router.push(`/onboarding/${selected}`)
        }
    }

    return (
        <div className="bg-background flex min-h-screen items-center justify-center p-4 antialiased">
            <div className="w-full max-w-2xl">
                <div className="mb-10 text-center">
                    <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                        How will you use our platform?
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Select your primary role to customize your experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {roles.map((role) => (
                        <OnboardingCard
                            key={role.id}
                            role={role}
                            isSelected={selected === role.id}
                            onSelect={() => setSelected(role.id)}
                        />
                    ))}
                </div>

                <div className="mt-8 flex flex-col items-center gap-4">
                    <Button
                        onClick={handleContinue}
                        disabled={!selected}
                        className="w-full px-8 py-6 sm:w-auto"
                    >
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <p className="text-muted-foreground text-xs">
                        You can change this later in your profile settings.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default OnboardingPage
