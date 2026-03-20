import { useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Camera, Loader2, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { UserAvatar } from '@/components/user-avatar'

import { handleUpdateProfile } from '../actions/user'
import { profileValidation, type IUser, type profileDTO } from '../types/user-type'
import ManageEmail from './profile-setting/manage-email'

interface ProfileSettingsProps {
    user: IUser
}

type DialogType = 'email' | 'password' | 'edit' | null

export default function ProfileSettings({ user }: ProfileSettingsProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [previewImage, setPreviewImage] = useState<string | null>(user.profilePicture)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [activeDialog, setActiveDialog] = useState<DialogType>(null) // State to control dialog
    const [isProfileSettingDialog, setIsProfileSettingDialog] = useState(false)

    // 2. Initialize form
    const form = useForm<profileDTO>({
        resolver: zodResolver(profileValidation),
        defaultValues: {
            name: user.name,
        },
    })

    // Triggered when user selects a new file
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // 1. Create a local preview
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result as string)
            }
            reader.readAsDataURL(file)

            // 2. Mark form as dirty so Save button enables
            form.setValue('name', form.getValues('name'), { shouldDirty: true })
        }
    }

    // 3. Handle Submit
    async function onSubmit(values: profileDTO) {
        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append('name', values.name)

            if (fileInputRef.current?.files?.[0]) {
                formData.append('profilePicture', fileInputRef.current.files[0])
            }

            await handleUpdateProfile(formData) // Your Server Action
            await new Promise((resolve) => setTimeout(resolve, 1500))

            toast.success('Profile updated!')
            form.reset(values) // Reset dirty state
        } catch (error) {
            toast.error('Update failed')
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="max-w-3xl space-y-8 p-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your profile, login information, and devices
                </p>
            </div>

            {/* Account Section */}
            <section className="space-y-6">
                <header>
                    <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                        Account
                    </h2>
                    <Separator className="mt-2" />
                </header>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex items-center gap-6">
                        {/* Avatar Container with Hover Effect */}
                        <div
                            className="group relative cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <UserAvatar
                                name={user.name}
                                image={previewImage}
                                className="h-16 w-16 transition-opacity group-hover:opacity-80"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                                <Camera className="h-5 w-5 text-white drop-shadow-md" />
                            </div>
                            {/* Hidden File Input */}
                            <input
                                type="file"
                                name="profilePicture"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className="flex-1 space-y-2">
                            <Label htmlFor="name">Preferred name</Label>
                            <Input
                                {...form.register('name')}
                                id="name"
                                className="bg-secondary/50 max-w-md"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="flex justify-start">
                        <Button type="submit" disabled={isLoading} className="gap-2">
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}
                            {isLoading ? 'Save Changes' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </section>

            {/* Account Security Section */}
            <section className="space-y-6">
                <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                    Account security
                </h2>
                <Separator />

                {/* Email Row */}
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base">Email</Label>
                        <p className="text-muted-foreground text-sm">{user.email}</p>
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => setActiveDialog('email')}>
                        Manage emails
                    </Button>
                </div>

                {/* Password Row */}
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base">Password</Label>
                        <p className="text-muted-foreground text-sm">
                            Set a password for your account
                        </p>
                    </div>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setActiveDialog('password')}
                    >
                        Manage password
                    </Button>
                </div>
            </section>

            <Dialog
                open={activeDialog !== null}
                onOpenChange={(open) => !open && setActiveDialog(null)}
            >
                <DialogContent className="sm:max-w-sm">
                    {activeDialog === 'email' && (
                        <ManageEmail user={user} onSuccess={() => setActiveDialog(null)} />
                    )}

                    {activeDialog === 'password' && (
                        <>
                            <DialogHeader>
                                <DialogTitle>Change Password</DialogTitle>
                                <DialogDescription>Choose a strong password.</DialogDescription>
                            </DialogHeader>
                            <FieldGroup className="py-4">
                                <Input type="password" placeholder="New Password" />
                                <Input type="password" placeholder="Confirm Password" />
                            </FieldGroup>
                            <DialogFooter>
                                <Button onClick={() => setActiveDialog(null)}>
                                    Update Password
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
