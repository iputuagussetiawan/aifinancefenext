'use client'

import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, FileText, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { OnboardingStepper } from '@/features/onboarding/components/onboarding-stepper'
import { Button } from '@/components/ui/button'

// Import your sub-forms
const formSchema = z.object({
    email: z.string().email(),
    username: z.string().min(2),
})

const steps = [
    { step: 1, title: 'Account', description: 'Login details', icon: User },
    { step: 2, title: 'Profile', description: 'Personal info', icon: FileText },
    { step: 3, title: 'Finish', description: 'Ready to go', icon: Check },
]

const page = () => {
    const [currentStep, setCurrentStep] = useState(1)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { email: '', username: '' },
    })
    const next = () => setCurrentStep((s) => Math.min(s + 1, 4))
    const prev = () => setCurrentStep((s) => Math.max(s - 1, 1))
    const onSubmit = (data: any) => {
        console.log(data)
        next()
    }

    const handleStepChange = (step: number) => {
        setCurrentStep(step)
    }
    return (
        <div className="mx-auto max-w-2xl px-4 py-10">
            <OnboardingStepper
                steps={steps}
                currentStep={currentStep}
                onStepClick={handleStepChange}
            />

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Render content based on step */}
                        {currentStep === 1 && (
                            <div className="bg-muted rounded-lg p-4">Step 1: Account Fields</div>
                        )}
                        {currentStep === 2 && (
                            <div className="bg-muted rounded-lg p-4">Step 2: Profile Fields</div>
                        )}
                        {currentStep === 3 && (
                            <div className="bg-muted rounded-lg p-4">Step 3: Review & Submit</div>
                        )}
                        {currentStep === 4 && (
                            <div className="py-10 text-center">✅ Setup Complete!</div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {currentStep < 4 && (
                    <div className="flex justify-between border-t pt-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={prev}
                            disabled={currentStep === 1}
                        >
                            Back
                        </Button>

                        {currentStep === 3 ? (
                            <Button type="submit">Complete</Button>
                        ) : (
                            <Button type="button" onClick={next}>
                                Next Step
                            </Button>
                        )}
                    </div>
                )}
            </form>
        </div>
    )
}

export default page
