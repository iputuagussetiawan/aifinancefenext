'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

import { InstitutionAutoSuggest } from '@/features/institution/components/InstitutionAutoSuggest'
import { Button } from '@/components/ui/button'
import { UiDatePicker } from '@/components/ui/UiDatePicker'
import { UiDateRangePicker } from '@/components/ui/UiDateRangePicker'
import { UiFormAutoSuggest } from '@/components/ui/UiFormAutoSuggest'
import { UiSelect, type UiSelectItem } from '@/components/ui/UiSelect'

// ─────────────────────────────────────────────
// Schema - Ditambahkan field tanggal agar validasi sinkron
// ─────────────────────────────────────────────

const formSchema = z.object({
    institution: z.string().min(1, 'Harap pilih institusi'),
    skill: z.string().min(1, 'Harap pilih atau ketik keahlian'),
    assignedUsers: z.array(z.string()).min(1, 'Harap pilih minimal 1 anggota'),
    birthDate: z.date({ required_error: 'Tanggal lahir wajib diisi' }),
    recruitmentPeriod: z.object(
        {
            from: z.date(),
            to: z.date(),
        },
        { required_error: 'Periode rekrutmen wajib diisi' },
    ),
})

type FormValues = z.infer<typeof formSchema>

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const SKILLS = [
    { id: 1, name: 'React JS', level: 'Advanced' },
    { id: 2, name: 'Vue JS', level: 'Intermediate' },
    { id: 3, name: 'Tailwind CSS', level: 'Expert' },
    { id: 4, name: 'TypeScript', level: 'Expert' },
]

const Frontend = [
    { id: 1, name: 'Joko', role: 'Frontend Developer', image: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Siti', role: 'UI/UX Designer', image: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Budi', role: 'Backend Developer', image: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, name: 'Rina', role: 'Product Manager', image: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, name: 'Andi', role: 'Mobile Developer', image: 'https://i.pravatar.cc/150?u=5' },
    { id: 6, name: 'Dewi', role: 'QA Engineer', image: 'https://i.pravatar.cc/150?u=6' },
    { id: 7, name: 'Eko', role: 'DevOps Engineer', image: 'https://i.pravatar.cc/150?u=7' },
    { id: 8, name: 'Maya', role: 'Data Scientist', image: 'https://i.pravatar.cc/150?u=8' },
    { id: 9, name: 'Rian', role: 'Technical Writer', image: 'https://i.pravatar.cc/150?u=9' },
    { id: 10, name: 'Lusi', role: 'Scrum Master', image: 'https://i.pravatar.cc/150?u=10' },
]

type MemberItem = UiSelectItem & {
    role: string
    image: string
}

const memberItems: MemberItem[] = Frontend.map((person) => ({
    id: String(person.id),
    label: person.name,
    role: person.role,
    image: person.image,
}))

// ─────────────────────────────────────────────
// Form
// ─────────────────────────────────────────────

export default function RecruitmentForm() {
    const {
        handleSubmit,
        setValue,
        watch,
        control,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            institution: '',
            skill: '',
            assignedUsers: [],
            // recruitmentPeriod & birthDate sengaja dikosongkan agar ditangani Zod
        },
    })

    const selectedSkill = watch('skill')
    const selectedUsers = watch('assignedUsers')

    const selectedPeople = Frontend.filter((p) => selectedUsers.includes(String(p.id)))

    const onSubmit = (data: FormValues) => {
        console.log('Submit Data:', data)
    }

    // Perhitungan batasan umur 17 tahun
    const minimumBirthDate = new Date(1950, 0, 1)
    const maximumBirthDate = new Date()
    maximumBirthDate.setFullYear(maximumBirthDate.getFullYear() - 17)

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card mx-auto max-w-md space-y-6 rounded-xl border p-6 shadow-sm"
        >
            {/* Institution */}
            <InstitutionAutoSuggest
                value={watch('institution')}
                error={errors.institution}
                onValueChange={(val) => setValue('institution', val, { shouldValidate: true })}
                onSelect={(val) => setValue('institution', val, { shouldValidate: true })}
            />

            {/* Skill */}
            <UiFormAutoSuggest
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

            {/* Assigned Members */}
            <div className="space-y-1.5">
                <label className="text-sm leading-none font-medium">Anggota Tim</label>
                <Controller
                    control={control}
                    name="assignedUsers"
                    render={({ field }) => (
                        <UiSelect
                            multiple
                            items={memberItems}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Pilih anggota tim..."
                            searchPlaceholder="Cari nama..."
                            emptyMessage="Anggota tidak ditemukan."
                            renderItem={(person) => (
                                <div className="flex items-center gap-2">
                                    <img
                                        src={person.image}
                                        alt={person.label}
                                        className="h-7 w-7 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col text-left">
                                        <span className="text-sm font-medium">{person.label}</span>
                                        <span className="text-muted-foreground text-[10px]">
                                            {person.role}
                                        </span>
                                    </div>
                                </div>
                            )}
                            renderBadge={(person) => (
                                <div className="flex items-center gap-1">
                                    <img
                                        src={person.image}
                                        alt={person.label}
                                        className="h-4 w-4 rounded-full object-cover"
                                    />
                                    <span className="text-[10px]">{person.label}</span>
                                </div>
                            )}
                        />
                    )}
                />
                {errors.assignedUsers && (
                    <p className="text-destructive text-xs">{errors.assignedUsers.message}</p>
                )}
            </div>

            {/* Recruitment Period (Date Range) */}
            <Controller
                control={control}
                name="recruitmentPeriod"
                render={({ field }) => (
                    <UiDateRangePicker
                        label="Periode Rekrutmen"
                        required
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.recruitmentPeriod?.message}
                        placeholder="Pilih rentang waktu"
                    />
                )}
            />

            {/* Birth Date (Single Date) */}
            <Controller
                control={control}
                name="birthDate"
                render={({ field }) => (
                    <UiDatePicker
                        label="Tanggal Lahir"
                        required
                        value={field.value}
                        onChange={field.onChange}
                        minDate={minimumBirthDate}
                        maxDate={maximumBirthDate}
                        error={errors.birthDate?.message}
                        placeholder="Kapan kamu lahir?"
                    />
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
