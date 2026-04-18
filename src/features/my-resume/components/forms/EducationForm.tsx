'use client'

import React from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2, Plus, Save } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { educationService } from '@/features/education/services/education-service'
import {
    updateEducationListValidation,
    type EducationInputType,
    type IEducation,
} from '@/features/education/types/education-type'
import { Button } from '@/components/ui/button'
import { UiFormInput } from '@/components/ui/UiFormInput'

import SortableList from '../Sortable'
import { SortableEducationCard } from '../SortableEducationCard'

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
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm<{ educations: EducationInputType[] }>({
        resolver: zodResolver(updateEducationListValidation),
        defaultValues: {
            educations: [],
        },
    })

    // 3. Field Array for dynamic rows
    const {
        fields,
        append,
        remove,
        move: moveField,
    } = useFieldArray({
        control,
        name: 'educations',
    })

    // 4. Sync data when API returns
    React.useEffect(() => {
        if (response?.data) {
            const formattedEducations = response.data
                .sort((a, b) => (a.orderPosition ?? 0) - (b.orderPosition ?? 0)) // Ensure initial sort
                .map((edu: IEducation) => ({
                    ...edu,
                    endDate: edu.endDate === null ? undefined : edu.endDate,
                    startDate: edu.startDate,
                }))

            reset({ educations: formattedEducations })
        }
    }, [response, reset])

    // 5. Mutation for Saving
    const { mutate, isPending } = useMutation({
        mutationFn: (educations: EducationInputType[]) => educationService.updateAll(educations),
        onSuccess: () => {
            toast.success('Education history updated')
            queryClient.invalidateQueries({ queryKey: ['education'] })
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to save updates')
        },
    })

    const onSubmit = (data: { educations: EducationInputType[] }) => {
        // FINAL GUARD: Map index to orderPosition right before sending to backend
        const orderedData = data.educations.map((edu, index) => ({
            ...edu,
            orderPosition: index,
        }))

        mutate(orderedData)
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
                <SortableList />
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

            <DragDropProvider
                onDragEnd={(event) => {
                    const activeId = event.operation.source?.id
                    const overId = event.operation.target?.id

                    if (activeId && overId && activeId !== overId) {
                        const from = fields.findIndex((f) => f.id === activeId)
                        const to = fields.findIndex((f) => f.id === overId)

                        if (from !== -1 && to !== -1) {
                            // Sync visuals
                            moveField(from, to)

                            // Sync orderPosition values in form state
                            const currentValues = getValues('educations')
                            const updatedValues = [...currentValues]
                            const [movedItem] = updatedValues.splice(from, 1)
                            updatedValues.splice(to, 0, movedItem)

                            updatedValues.forEach((_, index) => {
                                setValue(`educations.${index}.orderPosition`, index, {
                                    shouldDirty: true,
                                })
                            })
                        }
                    }
                }}
            >
                <div className="space-y-6">
                    {fields.map((field, index) => (
                        <SortableEducationCard
                            key={field.id}
                            id={field.id}
                            index={index}
                            onRemove={remove}
                        >
                            {/* REGISTER HIDDEN FIELD */}

                            <p>{index}</p>
                            <input
                                type="hidden"
                                {...register(`educations.${index}.orderPosition`)}
                            />

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
                                        type="date"
                                        label="Start Date"
                                        {...register(`educations.${index}.startDate`)}
                                        error={errors.educations?.[index]?.startDate}
                                    />
                                    <UiFormInput
                                        type="date"
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
                        </SortableEducationCard>
                    ))}
                </div>
            </DragDropProvider>

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
