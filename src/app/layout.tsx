import { Inter } from 'next/font/google'

import './globals.css'

import { AuthProvider } from '@/providers/auth-provider'
import QueryProvider from '@/providers/query-provider'
import { ThemeProvider } from '@/providers/theme-provider'

// import { getCurrentUser } from '@/features/auth/actions/auth'
// import { AuthProvider } from '@/features/auth/context/auth-context'
import { getCurrentUser } from '@/features/user/actions/user'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

// Initialize the Inter font
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter', // Useful if using Tailwind
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning>
            {/* Apply the font to the body */}
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <QueryProvider>
                        <AuthProvider>
                            <TooltipProvider>{children}</TooltipProvider>
                        </AuthProvider>
                    </QueryProvider>
                </ThemeProvider>
                <Toaster />
            </body>
        </html>
    )
}
