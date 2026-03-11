'use client'

import React from 'react'

import { useAuth } from '@/features/auth/context/auth-context'

const UserProfile = () => {
    const { user } = useAuth()
    return (
        <div>
            <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{user?.name}</p>
            </div>
        </div>
    )
}

export default UserProfile
