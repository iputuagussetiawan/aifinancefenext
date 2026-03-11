// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl

    // 1. PROXY LOGIC
    if (pathname.startsWith('/api')) {
        const targetPath = pathname.replace(/^\/api/, '')
        const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000'
        return NextResponse.rewrite(new URL(`${BACKEND_URL}${targetPath}${search}`, request.url))
    }

    // 2. AUTH SETUP
    // Ensure this matches the name you set in handleLogin ('session_token' or 'accessToken')
    const token = request.cookies.get('session_token')?.value

    const isAuthPage =
        pathname.startsWith('/signin') || pathname.startsWith('/register') || pathname === '/'
    const isDashboardPage = pathname.startsWith('/dashboard')

    // 3. LOGIC: If on Dashboard and NO token -> Send to Login
    if (isDashboardPage && !token) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    // 4. LOGIC: If on Login/Register and HAS token -> Send to Dashboard
    // This fixes the "can access login again" bug
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    // 🗝️ Must include login/register in the matcher for this to work!
    matcher: ['/api/:path*', '/dashboard/:path*', '/signin', '/signup'],
}
