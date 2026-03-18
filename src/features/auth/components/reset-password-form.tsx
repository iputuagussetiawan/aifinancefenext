'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, Timer } from 'lucide-react'
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
    const expiration = Number(searchParams.get('exp'))

    const [timeLeft, setTimeLeft] = useState<string>('00:00')
    const [isExpired, setIsExpired] = useState(false)

    const calculateTimeLeft = useCallback(() => {
        // 1. Safety Check: If no expiration string exists
        if (!expiration) {
            setIsExpired(true)
            return
        }

        const expiryDate = new Date(expiration).getTime()
        const now = new Date().getTime()

        // 2. NaN Check: If the string in URL isn't a valid date
        if (isNaN(expiryDate)) {
            console.error('Invalid expiration date format received:', expiration)
            setIsExpired(true)
            return
        }

        const difference = expiryDate - now

        if (difference <= 0) {
            setIsExpired(true)
            setTimeLeft('00:00')
            return
        }

        // 3. Format calculation
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)

        setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
    }, [expiration])

    useEffect(() => {
        calculateTimeLeft()
        const timer = setInterval(calculateTimeLeft, 1000)
        return () => clearInterval(timer)
    }, [calculateTimeLeft])

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

    if (isExpired || !verificationCode) {
        return (
            <div className={cn('flex flex-col gap-6 py-8 text-center', className)}>
                <AlertCircle className="text-destructive mx-auto h-12 w-12" />
                <h1 className="text-destructive text-2xl font-bold">Link Expired</h1>
                <p className="text-muted-foreground text-sm">This link is no longer valid.</p>
                <Button variant="outline" onClick={() => router.push('/forgot-password')}>
                    Request New Link
                </Button>
            </div>
        )
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
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Set New Password</h1>
                    <p className="text-muted-foreground text-sm">
                        Please enter your new password below
                    </p>
                </div>

                <div
                    className={cn(
                        'flex items-center justify-center gap-2 self-center rounded-full border px-4 py-2 text-xs font-medium',
                        timeLeft.startsWith('00')
                            ? 'bg-destructive/10 text-destructive border-destructive/20 animate-pulse'
                            : 'bg-primary/5 text-primary border-primary/10',
                    )}
                >
                    <Timer className="h-3.5 w-3.5" />
                    <span>Expires in: {timeLeft}</span>
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
