'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { UiFormInput } from '@/components/ui/UiFormInput'
import { SIGNIN_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

import { handleForgotPassword } from '../actions/auth'
import { forgotPasswordValidation, type ForgotPasswordInputType } from '../types/auth-type'

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<'form'>) {
    const [isSent, setIsSent] = useState(false)
    const [serverError, setServerError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordInputType>({
        resolver: zodResolver(forgotPasswordValidation),
        defaultValues: { email: '' },
    })

    const onSubmit = async (data: ForgotPasswordInputType) => {
        setServerError(null)
        const result = await handleForgotPassword(data)

        if (result.success) {
            // 🗝️ Fix: Removed router.push so the user sees the 'isSent' state
            setIsSent(true)
        } else {
            // Display a visible error message instead of just a red border
            setServerError(result.error || 'Could not process request')
            setError('email', { type: 'manual', message: '' })
        }
    }

    if (isSent) {
        return (
            <div
                className={cn(
                    'animate-in fade-in zoom-in-95 flex flex-col gap-6 text-center duration-300',
                    className,
                )}
            >
                <div className="flex flex-col gap-2">
                    <div className="bg-primary/10 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                        <span className="text-primary text-xl">📧</span>
                    </div>
                    <h1 className="text-2xl font-bold">Check your email</h1>
                    <p className="text-muted-foreground text-sm">
                        If an account exists for that email, we&apos;ve sent a password reset link.
                    </p>
                </div>
                <div className="flex flex-col gap-3">
                    <Button asChild className="w-full">
                        <Link href={SIGNIN_URL}>Return to Sign In</Link>
                    </Button>
                    <button
                        onClick={() => setIsSent(false)}
                        className="text-muted-foreground text-xs hover:underline"
                    >
                        Didn&apos;t get the email? Try again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <form
            className={cn('flex flex-col gap-6', className)}
            onSubmit={handleSubmit(onSubmit)}
            {...props}
        >
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Forgot Password?</h1>
                    <p className="text-muted-foreground text-sm">
                        Enter your email and we&apos;ll send you a link to reset your password
                    </p>
                </div>

                {serverError && (
                    <div className="bg-destructive/10 text-destructive rounded-md p-3 text-center text-xs">
                        {serverError}
                    </div>
                )}

                <UiFormInput
                    label="Email Address"
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    isSubmitting={isSubmitting}
                    error={errors.email}
                    {...register('email')}
                />

                <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Sending link...
                        </span>
                    ) : (
                        'Send Reset Link'
                    )}
                </Button>

                <p className="text-muted-foreground mt-2 text-center text-sm">
                    Remember your password?{' '}
                    <Link
                        href={SIGNIN_URL}
                        className="hover:text-primary font-medium underline underline-offset-4"
                    >
                        Back to login
                    </Link>
                </p>
            </FieldGroup>
        </form>
    )
}
