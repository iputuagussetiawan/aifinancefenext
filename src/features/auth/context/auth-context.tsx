'use client'

import { createContext, ReactNode, useContext } from 'react'

import type { IUserProfile } from '../types/auth-type'

interface AuthContextType {
    user: IUserProfile
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ user, children }: { user: IUserProfile; children: ReactNode }) {
    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}
