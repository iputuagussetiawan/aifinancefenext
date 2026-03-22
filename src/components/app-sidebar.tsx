'use client'

import * as React from 'react'
import { useAuthContext } from '@/providers/auth-provider'
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from 'lucide-react'

import { useAuth } from '@/features/auth/context/auth-context'
import { getSidebarData } from '@/lib/sidebar-menu'

import { NavMain } from './nav-main'
import { NavProjects } from './nav-projects'
import { NavUser } from './nav-user'
import { TeamSwitcher } from './team-switcher'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from './ui/sidebar'

// This is sample data.
// const data = {
//     teams: [
//         {
//             name: 'Acme Inc',
//             logo: GalleryVerticalEnd,
//             plan: 'Enterprise',
//         },
//         {
//             name: 'Acme Corp.',
//             logo: AudioWaveform,
//             plan: 'Startup',
//         },
//         {
//             name: 'Evil Corp.',
//             logo: Command,
//             plan: 'Free',
//         },
//     ],
//     navMain: [
//         {
//             title: 'Playground',
//             url: '#',
//             icon: SquareTerminal,
//             isActive: true,
//             items: [
//                 {
//                     title: 'History',
//                     url: '#',
//                 },
//                 {
//                     title: 'Starred',
//                     url: '#',
//                 },
//                 {
//                     title: 'Settings',
//                     url: '#',
//                 },
//             ],
//         },
//         {
//             title: 'Models',
//             url: '#',
//             icon: Bot,
//             items: [
//                 {
//                     title: 'Genesis',
//                     url: '#',
//                 },
//                 {
//                     title: 'Explorer',
//                     url: '#',
//                 },
//                 {
//                     title: 'Quantum',
//                     url: '#',
//                 },
//             ],
//         },
//         {
//             title: 'Documentation',
//             url: '#',
//             icon: BookOpen,
//             items: [
//                 {
//                     title: 'Introduction',
//                     url: '#',
//                 },
//                 {
//                     title: 'Get Started',
//                     url: '#',
//                 },
//                 {
//                     title: 'Tutorials',
//                     url: '#',
//                 },
//                 {
//                     title: 'Changelog',
//                     url: '#',
//                 },
//             ],
//         },
//         {
//             title: 'Settings',
//             url: '#',
//             icon: Settings2,
//             items: [
//                 {
//                     title: 'General',
//                     url: '#',
//                 },
//                 {
//                     title: 'Team',
//                     url: '#',
//                 },
//                 {
//                     title: 'Billing',
//                     url: '#',
//                 },
//                 {
//                     title: 'Limits',
//                     url: '#',
//                 },
//             ],
//         },
//     ],
//     projects: [
//         {
//             name: 'Design Engineering',
//             url: '#',
//             icon: Frame,
//         },
//         {
//             name: 'Sales & Marketing',
//             url: '#',
//             icon: PieChart,
//         },
//         {
//             name: 'Travel',
//             url: '#',
//             icon: Map,
//         },
//     ],
// }

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { isLoading, user } = useAuthContext()
    const sidebarData = getSidebarData(user?.role?.name)
    // const { user } = useAuth()
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={sidebarData.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={sidebarData.navMain} />
                <NavProjects projects={sidebarData.projects} />
            </SidebarContent>
            <SidebarFooter>
                {/* <pre> {JSON.stringify(user, null, 2)}</pre> */}
                <NavUser user={user!} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
