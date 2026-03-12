'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { UiFormInput } from '@/components/ui/UiFormInput'
import { SIGNIN_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

import { handleResetPassword } from '../actions/auth'
import { resetPasswordValidation, type ResetPasswordInputType } from '../types/auth-type'

export function ResetPasswordForm({ className, ...props }: React.ComponentProps<'form'>) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [serverError, setServerError] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState(false)
    const verificationCode = searchParams.get('code')
    const expiration = searchParams.get('exp')

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordInputType>({
        resolver: zodResolver(resetPasswordValidation),
        defaultValues: {
            password: '',
        },
    })

    const onSubmit = async (data: ResetPasswordInputType) => {
        setServerError(null)
        const payload = {
            password: data.password,
            verificationCode: verificationCode || '', // Use the code from searchParams
        }
        const result = await handleResetPassword(payload)
        if (result.success) {
            setIsSuccess(true)
            // Optional: Auto-redirect after a few seconds
            setTimeout(() => router.push(SIGNIN_URL), 3000)
        } else {
            setServerError(result.error || 'Failed to reset password')
        }
    }

    if (isSuccess) {
        return (
            <div
                className={cn(
                    'animate-in fade-in zoom-in-95 flex flex-col gap-6 text-center',
                    className,
                )}
            >
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">Password Reset!</h1>
                    <p className="text-muted-foreground text-sm">
                        Your password has been successfully updated. Redirecting you to login...
                    </p>
                </div>
                <Button asChild className="w-full">
                    <Link href={SIGNIN_URL}>Go to Login Now</Link>
                </Button>
            </div>
        )
    }

    return (
        <form
            className={cn('flex flex-col gap-6', className)}
            onSubmit={handleSubmit(onSubmit)}
            {...props}
        >
            <div>
                <p>Verification Code: {verificationCode}</p>
                <p>Expires at: {expiration}</p>
            </div>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Set New Password</h1>
                    <p className="text-muted-foreground text-sm">
                        Please enter your new password below
                    </p>
                </div>

                {serverError && (
                    <div className="bg-destructive/10 text-destructive rounded-md p-3 text-center text-xs">
                        {serverError}
                    </div>
                )}

                {/* New Password */}
                <UiFormInput
                    label="New Password"
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    isSubmitting={isSubmitting}
                    error={errors.password}
                    {...register('password')}
                />

                <Button
                    type="submit"
                    disabled={isSubmitting || !verificationCode}
                    className="mt-2 w-full"
                >
                    {isSubmitting ? 'Updating password...' : 'Reset Password'}
                </Button>
            </FieldGroup>
        </form>
    )
}
