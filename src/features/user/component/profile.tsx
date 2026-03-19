'use client'

import { Bell, Settings, Share2, User } from 'lucide-react'

import { useAuth } from '@/features/auth/context/auth-context'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import PreferencesSettings from './profile-preferences'
import ProfileSettings from './profile-setting'

const Profile = () => {
    const { user } = useAuth()
    return (
        <div className="flex flex-col space-y-6 pb-16 md:block">
            <Tabs
                defaultValue="profile"
                orientation="vertical"
                className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12"
            >
                {/* Vertical Sidebar Tabs */}
                <aside className="m-0 lg:w-1/5">
                    <TabsList className="flex w-full flex-row space-x-2 bg-transparent lg:flex-col lg:space-y-1 lg:space-x-0">
                        <TabsTrigger
                            value="profile"
                            className="data-[state=active]:bg-secondary relative flex justify-start gap-2 bg-transparent px-4 py-2 text-sm font-normal data-[state=active]:shadow-none"
                        >
                            <User className="h-4 w-4" />I Putu Agus Setiawan
                        </TabsTrigger>

                        <TabsTrigger
                            value="preferences"
                            className="data-[state=active]:bg-secondary relative flex justify-start gap-2 bg-transparent px-4 py-2 text-sm font-normal data-[state=active]:shadow-none"
                        >
                            <Settings className="h-4 w-4" />
                            Preferences
                        </TabsTrigger>

                        <TabsTrigger
                            value="connections"
                            className="data-[state=active]:bg-secondary relative flex justify-start gap-2 bg-transparent px-4 py-2 text-sm font-normal data-[state=active]:shadow-none"
                        >
                            <Share2 className="h-4 w-4" />
                            Session / Connections
                        </TabsTrigger>
                    </TabsList>
                </aside>

                {/* Content Area */}
                <div className="flex-1 lg:max-w-4xl">
                    <TabsContent value="profile" className="mt-0 border-none p-0">
                        {user?.user && <ProfileSettings user={user.user} />}
                    </TabsContent>

                    <TabsContent value="preferences">
                        <PreferencesSettings />
                    </TabsContent>

                    {/* Add more TabsContent for other values here */}
                </div>
            </Tabs>
        </div>
    )
}

export default Profile
