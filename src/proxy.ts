import { NextResponse, type NextRequest } from 'next/server'

import { AUTH_COOKIE_NAME } from './lib/constants'

// Define your route categories
const protectedRoutes = ['/dashboard', '/onboarding']
const authRoutes = ['/signin', '/signup', '/register', '/forgot-password', '/reset-password']

export default function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value

    // 1. PROXY LOGIC (Fixed)
    if (pathname.startsWith('/api')) {
        const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000'

        // Remove '/api' from the start and ensure we don't have double slashes
        const targetPath = pathname.replace(/^\/api/, '')

        // Construct the final destination URL string
        const destination = `${BACKEND_URL}${targetPath}${search}`

        // Create the rewrite
        const response = NextResponse.rewrite(new URL(destination))

        // 🗝️ CRITICAL: If your backend checks the 'host' header,
        // you may need to strip it or set it to the backend host
        response.headers.set('x-forwarded-host', request.headers.get('host') || '')

        return response
    }

    // 2. AUTH SETUP
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

    // 3. LOGIC: Not logged in -> Trying to access protected content
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    // 4. LOGIC: Logged in -> Trying to access login/signup pages
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - Public assets (svg, png, jpg, etc.)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
