import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { UserAvatar } from '@/components/user-avatar'

import type { IUser } from '../types/user-type'

interface ProfileSettingsProps {
    user: IUser
}

export default function ProfileSettings({ user }: ProfileSettingsProps) {
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
                <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                    Account
                </h2>
                <Separator />

                <div className="flex items-center gap-6">
                    <UserAvatar
                        name={user.name}
                        image={user.profilePicture}
                        className="h-16 w-16"
                    />
                    <div className="flex-1 space-y-2">
                        <Label htmlFor="preferred-name">Preferred name</Label>
                        <Input
                            id="preferred-name"
                            defaultValue={user.name}
                            className="bg-secondary/50 max-w-md"
                        />
                    </div>
                </div>
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
                    <Button variant="secondary" size="sm">
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
                    <Button variant="secondary" size="sm">
                        Add password
                    </Button>
                </div>
            </section>

            {/* Support Section */}
            <section className="space-y-6 pt-4">
                <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                    Support
                </h2>
                <Separator />
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base">Support access</Label>
                        <p className="text-muted-foreground max-w-md text-sm">
                            Grant support team temporary access to your account to help troubleshoot
                            problems.
                        </p>
                    </div>
                    <Switch />
                </div>
            </section>
        </div>
    )
}
