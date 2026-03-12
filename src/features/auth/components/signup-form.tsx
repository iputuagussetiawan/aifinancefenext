'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { GithubIcon, GoogleIcon } from '@/components/icon/social-icons'
import { Button } from '@/components/ui/button'
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

import { handleRegister } from '../actions/auth'
import { signupValidation, type SignupInputType } from '../types/auth-type'

export function SignupForm({ className, ...props }: React.ComponentProps<'form'>) {
    // 2. Initialize the form
    const {
        register,
        handleSubmit,
        reset,
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

    // 3. Handle Submit
    const onSubmit = async (data: SignupInputType) => {
        const result = await handleRegister(data)

        if (result.success) {
            console.log('susccess')
            reset()
        } else {
            // Set the error on the email field or a global message
            alert(result.error)
        }
    }

    const handleGoogleRegister = () => {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'
        const authUrl = `${apiBaseUrl}/auth/google`
        window.location.assign(authUrl)
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
                        Fill in the form below to create your account
                    </p>
                </div>

                {/* Full Name */}
                <Field>
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <Input
                        id="name"
                        placeholder="John Doe"
                        {...register('name')}
                        className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && (
                        <p className="text-destructive text-sm">{errors.name.message}</p>
                    )}
                </Field>

                {/* Email */}
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...register('email')}
                        className={errors.email ? 'border-destructive' : ''}
                    />
                    <FieldDescription>
                        {errors.email ? (
                            <span className="text-destructive">{errors.email.message}</span>
                        ) : (
                            "We'll use this to contact you."
                        )}
                    </FieldDescription>
                </Field>

                {/* Password */}
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                        id="password"
                        type="password"
                        {...register('password')}
                        className={errors.password ? 'border-destructive' : ''}
                    />
                    {errors.password && (
                        <p className="text-destructive text-sm">{errors.password.message}</p>
                    )}
                </Field>

                {/* Confirm Password */}
                <Field>
                    <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                    <Input
                        id="confirm-password"
                        type="password"
                        {...register('confirmPassword')}
                        className={errors.confirmPassword ? 'border-destructive' : ''}
                    />
                    {errors.confirmPassword && (
                        <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>
                    )}
                </Field>

                <Field>
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? 'Creating...' : 'Create Account'}
                    </Button>
                </Field>

                <FieldSeparator>Or continue with</FieldSeparator>

                <Field>
                    <Button
                        variant="outline"
                        type="button"
                        className="w-full"
                        onClick={handleGoogleRegister}
                    >
                        <GoogleIcon />
                        Sign up with Google
                    </Button>
                    <Button variant="outline" type="button" className="w-full">
                        <GithubIcon />
                        Sign up with GitHub
                    </Button>
                    <p className="text-muted-foreground mt-4 text-center text-sm">
                        Already have an account?{' '}
                        <a href="#" className="hover:text-primary underline underline-offset-4">
                            Sign in
                        </a>
                    </p>
                </Field>
            </FieldGroup>
        </form>
    )
}
