'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { GoogleSignInButton } from '@/components/google-sign-in'
import { Button } from '@/components/ui/button'
import { FieldGroup, FieldSeparator } from '@/components/ui/field'
import { UiFormInput } from '@/components/ui/UiFormInput'
import { SIGNIN_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

import { handleRegister } from '../actions/auth'
import { signupValidation, type SignupInputType } from '../types/auth-type'

export function SignupForm({ className, ...props }: React.ComponentProps<'form'>) {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SignupInputType>({
        resolver: zodResolver(signupValidation),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = async (data: SignupInputType) => {
        const result = await handleRegister(data)

        if (result.success) {
            router.push(SIGNIN_URL)
        } else {
            // 🗝️ Better UX: Show the error on the specific field instead of an alert
            setError('email', {
                type: 'manual',
                message: result.error || 'Registration failed',
            })
        }
    }

    return (
        <form
            className={cn('flex flex-col gap-6', className)}
            onSubmit={handleSubmit(onSubmit)}
            {...props}
        >
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your details below to get started
                    </p>
                </div>

                {/* Full Name */}
                <UiFormInput
                    label="Full Name"
                    id="name"
                    placeholder="John Doe"
                    isSubmitting={isSubmitting}
                    error={errors.name}
                    {...register('name')}
                />

                {/* Email */}
                <UiFormInput
                    label="Email Address"
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    isSubmitting={isSubmitting}
                    error={errors.email}
                    {...register('email')}
                />

                {/* Password */}
                <UiFormInput
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    isSubmitting={isSubmitting}
                    error={errors.password}
                    {...register('password')}
                />

                {/* Confirm Password */}
                <UiFormInput
                    label="Confirm Password"
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    isSubmitting={isSubmitting}
                    error={errors.confirmPassword}
                    {...register('confirmPassword')}
                />

                <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Creating account...
                        </span>
                    ) : (
                        'Create Account'
                    )}
                </Button>

                <FieldSeparator>Or continue with</FieldSeparator>

                <GoogleSignInButton />

                <p className="text-muted-foreground mt-2 text-center text-sm">
                    Already have an account?{' '}
                    <Link
                        href={SIGNIN_URL}
                        className="hover:text-primary font-medium underline underline-offset-4"
                    >
                        Sign in
                    </Link>
                </p>
            </FieldGroup>
        </form>
    )
}
