'use client'

import { useEffect } from 'react'
import { useAuthContext } from '@/providers/auth-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { userService } from '@/features/user/services/user-service'
import {
    updateUserProfileValidation,
    type UpdateUserProfileDTO,
} from '@/features/user/types/user-type'
import { Button } from '@/components/ui/button'
import { UiFormInput } from '@/components/ui/UiFormInput'
import { UiFormTextarea } from '@/components/ui/UiFormTextarea'

export default function BioForm() {
    const { user } = useAuthContext()
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateUserProfileDTO>({
        resolver: zodResolver(updateUserProfileValidation),
        defaultValues: {
            // Using a fallback to prevent "uncontrolled to controlled" input errors
            bio: user?.bio || '',
        },
    })

    // Sync form when user data is fetched/changed
    useEffect(() => {
        if (user) {
            reset({
                bio: user.bio || '',
            })
        }
    }, [user, reset])

    const { mutate, isPending } = useMutation({
        mutationFn: (data: UpdateUserProfileDTO) => userService.updateProfile(data),
        onSuccess: () => {
            toast.success('Bio updated successfully')
            // This refreshes the user context globally
            queryClient.invalidateQueries({ queryKey: ['authUser'] })
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update bio')
        },
    })

    const onSubmit = (data: UpdateUserProfileDTO) => {
        mutate(data)
    }

    // Optional: Show a skeleton or nothing if user is still loading
    if (!user) {
        return (
            <div className="flex justify-center p-10">
                <Loader2 className="animate-spin" />
            </div>
        )
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12 items-start justify-end gap-8">
                    <div className="col-span-12 space-y-2">
                        <UiFormTextarea
                            id="bio"
                            label="Bio"
                            placeholder="Write a short bio about yourself..."
                            className="text-lg font-medium tracking-tight" // Adjusted for bio style
                            error={errors.bio}
                            isSubmitting={isPending}
                            {...register('bio')}
                        />
                    </div>
                </div>

                <div className="mt-10 flex items-center justify-between">
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="gap-2 rounded-lg px-6 py-5 hover:cursor-pointer"
                    >
                        {isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        {isPending ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
