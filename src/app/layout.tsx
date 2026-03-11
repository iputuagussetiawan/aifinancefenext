import { Inter } from 'next/font/google'

import './globals.css'

import { getCurrentUser } from '@/features/auth/actions/auth'
import { AuthProvider } from '@/features/auth/context/auth-context'
import { TooltipProvider } from '@/components/ui/tooltip'

// Initialize the Inter font
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter', // Useful if using Tailwind
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const user = await getCurrentUser()
    console.log(user)
    return (
        <html lang="en" className={inter.variable}>
            {/* Apply the font to the body */}
            <body className={inter.className}>
                <AuthProvider user={user}>
                    <TooltipProvider>{children}</TooltipProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
