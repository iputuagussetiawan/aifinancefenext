'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GraduationCap, Loader2, Plus, Save, Trash2 } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { educationService } from '@/features/education/services/education-service'
import {
    educationValidation,
    updateEducationListValidation,
    type EducationInputType,
    type IEducation,
} from '@/features/education/types/education-type'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { UiFormInput } from '@/components/ui/UiFormInput'

export default function EducationForm() {
    const queryClient = useQueryClient()

    // 1. Fetch existing data
    const { data: response, isLoading } = useQuery({
        queryKey: ['education'],
        queryFn: educationService.get,
    })

    // 2. Setup Form
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<{ educations: EducationInputType[] }>({
        resolver: zodResolver(updateEducationListValidation), // Note: You might need to wrap this in z.object({ educations: z.array(...) })
        defaultValues: {
            educations: [],
        },
    })

    // 3. Field Array for dynamic rows
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'educations',
    })

    // 4. Sync data when API returns
    React.useEffect(() => {
        if (response?.data) {
            // Map the data to fix the null vs undefined mismatch
            const formattedEducations = response.data.map((edu: IEducation) => ({
                ...edu,
                // If edu.endDate is null, convert it to undefined to satisfy the form type
                endDate: edu.endDate === null ? undefined : edu.endDate,
                // Ensure dates are strings or Date objects as expected by your specific Zod setup
                startDate: edu.startDate,
            }))

            reset({ educations: formattedEducations })
        }
    }, [response, reset])

    // 5. Mutation for Saving
    const { mutate, isPending } = useMutation({
        mutationFn: (data: { educations: EducationInputType[] }) =>
            educationService.updateAll(data.educations), // Assuming you have a bulk update service
        onSuccess: () => {
            toast.success('Education history updated')
            queryClient.invalidateQueries({ queryKey: ['education'] })
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to save updates')
        },
    })

    const onSubmit = (data: { educations: EducationInputType[] }) => {
        mutate(data)
    }

    if (isLoading)
        return (
            <div className="p-10 text-center">
                <Loader2 className="mr-2 inline animate-spin" /> Loading Education...
            </div>
        )

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex items-center justify-between border-b pb-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Education</h2>
                    <p className="text-muted-foreground text-sm">
                        Add your academic background here.
                    </p>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                        append({
                            schoolName: '',
                            degree: '',
                            fieldOfStudy: '',
                            startDate: '',
                            endDate: '',
                            grade: '',
                            activities: '',
                            description: '',
                            orderPosition: fields.length,
                        })
                    }
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Education
                </Button>
            </div>

            <div className="space-y-6">
                {fields.map((field, index) => (
                    <Card
                        key={field.id}
                        className="relative overflow-hidden border-l-4 border-l-[#eab308]"
                    >
                        <CardContent className="pt-6">
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:bg-destructive/10 absolute top-2 right-2"
                                onClick={() => remove(index)}
                            >
                                <Trash2 size={18} />
                            </Button>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <UiFormInput
                                    label="School/University Name"
                                    placeholder="e.g. Stikom Bali"
                                    {...register(`educations.${index}.schoolName`)}
                                    error={errors.educations?.[index]?.schoolName}
                                />
                                <UiFormInput
                                    label="Degree"
                                    placeholder="e.g. S1 Sistem Komputer"
                                    {...register(`educations.${index}.degree`)}
                                    error={errors.educations?.[index]?.degree}
                                />
                                <UiFormInput
                                    label="Field of Study"
                                    placeholder="e.g. Computer Science"
                                    {...register(`educations.${index}.fieldOfStudy`)}
                                    error={errors.educations?.[index]?.fieldOfStudy}
                                />
                                <UiFormInput
                                    label="Grade / GPA"
                                    placeholder="e.g. 3.8"
                                    {...register(`educations.${index}.grade`)}
                                    error={errors.educations?.[index]?.grade}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <UiFormInput
                                        type="text"
                                        label="Start Date"
                                        {...register(`educations.${index}.startDate`)}
                                        error={errors.educations?.[index]?.startDate}
                                    />
                                    <UiFormInput
                                        type="text"
                                        label="End Date (Optional)"
                                        {...register(`educations.${index}.endDate`)}
                                        error={errors.educations?.[index]?.endDate}
                                    />
                                </div>
                                <UiFormInput
                                    label="Description"
                                    placeholder="Briefly describe your studies..."
                                    {...register(`educations.${index}.description`)}
                                    error={errors.educations?.[index]?.description}
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {fields.length > 0 && (
                <div className="flex justify-end pt-6">
                    <Button type="submit" disabled={isPending} className="px-8">
                        {isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-4 w-4" />
                        )}
                        Save Education History
                    </Button>
                </div>
            )}
        </form>
    )
}
