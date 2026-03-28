'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Globe, Loader2, Mail, MapPin, Phone, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { UiFormInput } from '@/components/ui/UiFormInput'

// 1. Validation Schema
const profileSchema = z.object({
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    jobTitle: z.string().min(1, 'Required'),
    address: z.string().min(1, 'Required'),
    phone: z.string().min(1, 'Required'),
    email: z.string().email('Invalid email'),
    website: z.string().min(1, 'Required'),
})

type ProfileValues = z.infer<typeof profileSchema>

export default function PersonalInfoForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProfileValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: 'BROCK',
            lastName: 'HENRECKS',
            jobTitle: 'GRAPHIC DESIGNER',
            address: 'Address Name, Australia',
            phone: '+457 123 4567 8912',
            email: 'namehere@gmail.com',
            website: 'www.domainname.com',
        },
    })

    const onSubmit = (data: ProfileValues) => {
        console.log('Saving Data:', data)
    }

    return (
        <div>
            {/* A4 Wrapper */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12 items-start justify-end gap-8">
                    {/* LEFT SIDE: Name & Title */}
                    <div className="col-span-12 space-y-2">
                        <UiFormInput
                            id="firstName"
                            label="First Name"
                            placeholder="FIRST NAME"
                            className="border-none py-6 text-5xl font-black tracking-widest uppercase focus-visible:ring-0"
                            error={errors.firstName}
                            isSubmitting={isSubmitting}
                            {...register('firstName')}
                        />
                        <UiFormInput
                            id="lastName"
                            label="Last Name"
                            placeholder="LAST NAME"
                            className="border-none py-6 text-5xl font-black tracking-widest uppercase focus-visible:ring-0"
                            error={errors.lastName}
                            isSubmitting={isSubmitting}
                            {...register('lastName')}
                        />
                        <div className="pt-4">
                            <UiFormInput
                                id="jobTitle"
                                label="Job Title"
                                placeholder="JOB TITLE"
                                className="border-none py-6 text-lg font-medium tracking-[0.3em] text-gray-600 uppercase focus-visible:ring-0"
                                error={errors.jobTitle}
                                isSubmitting={isSubmitting}
                                {...register('jobTitle')}
                            />
                        </div>
                    </div>

                    {/* RIGHT SIDE: Contact Info + Yellow Bar */}
                    <div className="col-span-full col-start-1 flex items-stretch gap-3">
                        {/* The Yellow Icon Sidebar */}
                        <div className="flex w-10 shrink-0 flex-col items-center justify-between rounded-sm bg-[#eab308] py-4">
                            <MapPin size={18} />
                            <Phone size={18} />
                            <Mail size={18} />
                            <Globe size={18} />
                        </div>

                        {/* Contact Inputs */}
                        <div className="flex-1 space-y-3">
                            <UiFormInput
                                id="address"
                                placeholder="Address"
                                className="h-9 border-none py-6 text-right text-sm focus-visible:ring-0"
                                error={errors.address}
                                isSubmitting={isSubmitting}
                                {...register('address')}
                            />
                            <UiFormInput
                                id="phone"
                                placeholder="Phone"
                                className="h-9 border-none py-6 text-right text-sm focus-visible:ring-0"
                                error={errors.phone}
                                isSubmitting={isSubmitting}
                                {...register('phone')}
                            />
                            <UiFormInput
                                id="email"
                                type="email"
                                placeholder="Email"
                                className="h-9 border-none py-6 text-right text-sm focus-visible:ring-0"
                                error={errors.email}
                                isSubmitting={isSubmitting}
                                {...register('email')}
                            />
                            <UiFormInput
                                id="website"
                                placeholder="Website"
                                className="h-9 border-none py-6 text-right text-sm focus-visible:ring-0"
                                error={errors.website}
                                isSubmitting={isSubmitting}
                                {...register('website')}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-10 flex items-center justify-between">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-xl bg-black px-6 py-6 text-white hover:cursor-pointer"
                    >
                        {isSubmitting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-4 w-4" />
                        )}
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    )
}
