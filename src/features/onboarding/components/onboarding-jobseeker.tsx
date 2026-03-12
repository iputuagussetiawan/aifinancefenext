'use client'

import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { Briefcase, Check, FileText, Mail, MapPin, User, UserCircle } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

import { OnboardingStepper } from '@/features/onboarding/components/onboarding-stepper'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
    email: z.string().email('Invalid email address'),
    username: z.string().min(2, 'Username must be at least 2 characters'),
    fullName: z.string().min(2, 'Full name is required'),
    location: z.string().min(2, 'Location is required'),
})

type FormData = z.infer<typeof formSchema>

const steps = [
    { step: 1, title: 'Account', description: 'Login details', icon: User },
    { step: 2, title: 'Profile', description: 'Personal info', icon: FileText },
    { step: 3, title: 'Finish', description: 'Review details', icon: Check },
]

const OnboardingJobseeker = () => {
    const [currentStep, setCurrentStep] = useState(1)

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            username: '',
            fullName: '',
            location: '',
        },
    })

    const next = async () => {
        const fieldsToValidate =
            currentStep === 1 ? ['email', 'username'] : ['fullName', 'location']

        const isValid = await form.trigger(fieldsToValidate as any)
        if (isValid) setCurrentStep((s) => Math.min(s + 1, 4))
    }

    const prev = () => setCurrentStep((s) => Math.max(s - 1, 1))

    const onSubmit = (data: FormData) => {
        console.log('Final Submission:', data)
        setCurrentStep(4)
    }

    return (
        <div className="mx-auto max-w-2xl px-4 py-10">
            <OnboardingStepper
                steps={steps}
                currentStep={currentStep}
                onStepClick={(s) => s < currentStep && setCurrentStep(s)}
            />

            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-card space-y-8 rounded-xl border p-6 shadow-sm"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* STEP 1: ACCOUNT */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold">Account Details</h2>
                                    <p className="text-muted-foreground text-sm">
                                        Set up your credentials.
                                    </p>
                                </div>

                                <Controller
                                    name="email"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="email">Email Address</FieldLabel>
                                            <Input
                                                {...field}
                                                type="email"
                                                id="email"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="name@example.com"
                                                autoComplete="off"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name="username"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="username">Username</FieldLabel>
                                            <Input
                                                {...field}
                                                id="username"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="johndoe123"
                                                autoComplete="off"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>
                        )}

                        {/* STEP 2: PROFILE */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold">Profile Info</h2>
                                    <p className="text-muted-foreground text-sm">
                                        How should we identify you?
                                    </p>
                                </div>

                                <Controller
                                    name="fullName"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Full Name</FieldLabel>
                                            <Input {...field} placeholder="John Doe" />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name="location"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Location</FieldLabel>
                                            <Input {...field} placeholder="London, UK" />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>
                        )}

                        {/* STEP 3: REVIEW */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold">Review & Submit</h2>
                                    <p className="text-muted-foreground text-sm">
                                        Double check your details.
                                    </p>
                                </div>
                                <div className="bg-muted/30 grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-2">
                                    <SummaryBox
                                        icon={UserCircle}
                                        label="Username"
                                        value={form.getValues('username')}
                                    />
                                    <SummaryBox
                                        icon={Mail}
                                        label="Email"
                                        value={form.getValues('email')}
                                    />
                                    <SummaryBox
                                        icon={Briefcase}
                                        label="Name"
                                        value={form.getValues('fullName')}
                                    />
                                    <SummaryBox
                                        icon={MapPin}
                                        label="Location"
                                        value={form.getValues('location')}
                                    />
                                </div>
                            </div>
                        )}

                        {/* STEP 4: SUCCESS */}
                        {currentStep === 4 && (
                            <div className="space-y-4 py-12 text-center">
                                <div className="bg-primary/10 text-primary mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                                    <Check className="h-8 w-8" />
                                </div>
                                <h2 className="text-2xl font-bold">Registration Complete!</h2>
                                <p className="text-muted-foreground text-balance">
                                    Your jobseeker profile has been created successfully.
                                </p>
                                <Button onClick={() => (window.location.href = '/dashboard')}>
                                    Go to Dashboard
                                </Button>
                            </div>
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

// Summary Helper Component
const SummaryBox = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
    <div className="flex items-center gap-3 p-2">
        <div className="bg-background flex h-8 w-8 items-center justify-center rounded border">
            <Icon className="text-muted-foreground h-4 w-4" />
        </div>
        <div className="flex flex-col">
            <span className="text-muted-foreground mb-1 text-[10px] leading-none font-bold uppercase">
                {label}
            </span>
            <span className="text-sm font-medium">{value}</span>
        </div>
    </div>
)

export default OnboardingJobseeker
