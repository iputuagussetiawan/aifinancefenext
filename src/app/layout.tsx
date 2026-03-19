import { Inter } from 'next/font/google'

import './globals.css'

import QueryProvider from '@/providers/query-provider'

// import { getCurrentUser } from '@/features/auth/actions/auth'
import { AuthProvider } from '@/features/auth/context/auth-context'
import { getCurrentUser } from '@/features/user/actions/user'
import { TooltipProvider } from '@/components/ui/tooltip'

// Initialize the Inter font
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter', // Useful if using Tailwind
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    let user = null
    try {
        // Attempt to get the user
        user = await getCurrentUser(true)
    } catch (error) {
        // If getCurrentUser throws 'UNAUTHORIZED', we just set user to null
        // This allows the Login page to render instead of crashing the app
        console.log('No active session found (User is logged out)')
    }
    return (
        <html lang="en" className={inter.variable}>
            {/* Apply the font to the body */}
            <body className={inter.className}>
                <QueryProvider>
                    <AuthProvider user={user}>
                        <TooltipProvider>{children}</TooltipProvider>
                    </AuthProvider>
                </QueryProvider>
            </body>
        </html>
    )
}
