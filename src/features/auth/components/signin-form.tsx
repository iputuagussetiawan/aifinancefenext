'use client'

import { useRouter } from 'next/navigation' // 🗝️ For redirecting after login
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

import { handleLogin } from '../actions/auth' // Ensure this exists
import { signinValidation, type SigninInputType } from '../types/auth-type'

export function SignInForm({ className, ...props }: React.ComponentProps<'form'>) {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SigninInputType>({
        resolver: zodResolver(signinValidation),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data: SigninInputType) => {
        const result = await handleLogin(data)

        if (result.success) {
            // 🚀 Move the user to the dashboard or trading floor
            console.log(result.user)
            router.push('/dashboard')
            router.refresh()
        } else {
            // 🗝️ If login fails, highlight both fields or show a specific message
            setError('email', { type: 'manual', message: ' ' }) // Invisible error to turn border red
            setError('password', { type: 'manual', message: result.error || 'Invalid credentials' })
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
                    <h1 className="text-2xl font-bold">Welcome Back</h1>
                    <p className="text-muted-foreground text-sm">
                        Enter your credentials to access your account
                    </p>
                </div>

                {/* Email */}
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...register('email')}
                        disabled={isSubmitting}
                        className={
                            errors.email ? 'border-destructive focus-visible:ring-destructive' : ''
                        }
                    />
                </Field>

                {/* Password */}
                <Field>
                    <div className="flex items-center justify-between">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <a href="/forgot-password" className="text-primary text-xs hover:underline">
                            Forgot password?
                        </a>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        {...register('password')}
                        disabled={isSubmitting}
                        className={
                            errors.password
                                ? 'border-destructive focus-visible:ring-destructive'
                                : ''
                        }
                    />
                    {errors.password && (
                        <p className="text-destructive mt-1 text-xs font-medium">
                            {errors.password.message}
                        </p>
                    )}
                </Field>

                <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Signing in...
                        </span>
                    ) : (
                        'Sign In'
                    )}
                </Button>

                <FieldSeparator>Or login with</FieldSeparator>

                <Button variant="outline" type="button" className="w-full" disabled={isSubmitting}>
                    {/* Github Icon */}
                    Login with GitHub
                </Button>

                <p className="text-muted-foreground mt-2 text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <a href="/signup" className="hover:text-primary underline underline-offset-4">
                        Sign up
                    </a>
                </p>
            </FieldGroup>
        </form>
    )
}
