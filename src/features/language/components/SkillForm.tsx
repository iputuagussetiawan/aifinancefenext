'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { InstitutionAutoSuggest } from '@/features/institution/components/InstitutionAutoSuggest'
import { Button } from '@/components/ui/button'
import { UiFormAutoSuggest } from '@/components/ui/UiFormAutoSuggest'

const formSchema = z.object({
    institution: z.string().min(1, 'Harap pilih institusi'),
    skill: z.string().min(1, 'Harap pilih atau ketik keahlian'),
    assignedUser: z.string().min(1, 'Harap pilih user'),
})

type FormValues = z.infer<typeof formSchema>

const SKILLS = [
    { id: 1, name: 'React JS', level: 'Advanced' },
    { id: 2, name: 'Vue JS', level: 'Intermediate' },
    { id: 3, name: 'Tailwind CSS', level: 'Expert' },
    { id: 4, name: 'TypeScript', level: 'Expert' },
]

const USERS = [
    { id: 1, name: 'Joko', role: 'Frontend', image: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Siti', role: 'Designer', image: 'https://i.pravatar.cc/150?u=2' },
]

export default function RecruitmentForm() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            institution: '',
            skill: '',
            assignedUser: '',
        },
    })

    const selectedSkill = watch('skill')
    const selectedUser = watch('assignedUser')

    const onSubmit = (data: FormValues) => {
        console.log('Submit Data:', data)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card max-w-md space-y-6 rounded-xl border p-6 shadow-sm"
        >
            {/* Institution — hook is handled inside the component */}
            <InstitutionAutoSuggest
                value={watch('institution')}
                error={errors.institution}
                onValueChange={(val) => setValue('institution', val, { shouldValidate: true })}
                onSelect={(val) => setValue('institution', val, { shouldValidate: true })}
            />

            {/* Skill */}
            <UiFormAutoSuggest
                {...register('skill')}
                label="Keahlian Utama"
                placeholder="Ketik atau pilih skill..."
                items={SKILLS}
                error={errors.skill}
                value={selectedSkill}
                onValueChange={(val) => setValue('skill', val, { shouldValidate: true })}
                onSelect={(item) => setValue('skill', item.name, { shouldValidate: true })}
                getSearchValue={(item) => item.name}
                renderItem={(item) => (
                    <div className="flex flex-col py-1">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-muted-foreground text-[10px]">{item.level}</span>
                    </div>
                )}
            />

            {/* Assigned User */}
            <UiFormAutoSuggest
                {...register('assignedUser')}
                label="Penanggung Jawab"
                placeholder="Pilih staff..."
                items={USERS}
                error={errors.assignedUser}
                value={selectedUser}
                onValueChange={(val) => setValue('assignedUser', val, { shouldValidate: true })}
                onSelect={(user) => setValue('assignedUser', user.name, { shouldValidate: true })}
                getSearchValue={(user) => user.name}
                renderItem={(user) => (
                    <div className="flex items-center gap-3 py-1">
                        <img
                            src={user.image}
                            alt={user.name}
                            className="bg-muted size-8 rounded-full border"
                        />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{user.name}</span>
                            <span className="text-muted-foreground text-[10px]">{user.role}</span>
                        </div>
                    </div>
                )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Memproses...
                    </>
                ) : (
                    'Simpan Data Rekrutmen'
                )}
            </Button>
        </form>
    )
}
