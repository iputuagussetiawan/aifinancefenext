// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'

import { AUTH_COOKIE_NAME } from './lib/constants'

// 🗝️ Change: Export as default
export default function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl

    // 1. PROXY LOGIC
    if (pathname.startsWith('/api')) {
        const targetPath = pathname.replace(/^\/api/, '')
        // Ensure BACKEND_URL doesn't have a trailing slash if targetPath starts with one
        const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000'

        return NextResponse.rewrite(new URL(`${BACKEND_URL}${targetPath}${search}`, request.url))
    }

    // 2. AUTH SETUP
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value

    const isAuthPage =
        pathname.startsWith('/signin') ||
        pathname.startsWith('/register') ||
        pathname.startsWith('/signup') || // Added /signup to match your config
        pathname === '/'

    const isDashboardPage = pathname.startsWith('/dashboard')

    // 3. LOGIC: If on Dashboard and NO token -> Send to Login
    if (isDashboardPage && !token) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    // 4. LOGIC: If on Login/Register and HAS token -> Send to Dashboard
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    // 🗝️ FIX: Added '/api/:path*' to the matcher so the proxy logic actually runs!
    matcher: ['/api/:path*', '/dashboard/:path*', '/signin', '/signup', '/register'],
}
